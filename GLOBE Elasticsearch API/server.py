import os
import json
import csv
from datetime import datetime, timedelta
from flask import Flask, jsonify, request, send_from_directory
import requests

BASE_URL = "https://api.globe.gov/search/v1/measurement/protocol/measureddate/country/"

app = Flask(__name__, static_folder="static")


def fetch_globe(protocols, startdate, enddate, countrycode, geojson="FALSE", sample="FALSE", from_page=0, size=100, timeout=30):
    params = {
        "protocols": protocols,
        "startdate": startdate,
        "enddate": enddate,
        "countrycode": countrycode,
        "geojson": geojson,
        "sample": sample,
        "from": from_page,
        "size": size,
    }
    r = requests.get(BASE_URL, params=params, timeout=timeout)
    r.raise_for_status()
    return r.json()


@app.route("/api/data")
def api_data():
    protocols = request.args.getlist("protocols") or ["air_temps"]
    country = request.args.get("country", "USA")
    enddate = request.args.get(
        "enddate") or datetime.now().strftime("%Y-%m-%d")
    startdate = request.args.get("startdate") or (
        datetime.now() - timedelta(days=365)).strftime("%Y-%m-%d")
    size = int(request.args.get("size", 200))
    try:
        data = fetch_globe(protocols, startdate, enddate,
                           country, geojson="FALSE", sample="FALSE", size=size)
        return jsonify(data)
    except requests.HTTPError as e:
        return jsonify({"error": str(e), "detail": getattr(e.response, 'text', '')}), 502


@app.route("/")
@app.route("/index.html")
def index():
    return send_from_directory(app.static_folder, "index.html")


@app.route("/static/<path:path>")
def static_files(path):
    return send_from_directory(app.static_folder, path)


# -------------- CSV canopy API --------------

CSV_PATH = os.path.join(os.path.dirname(__file__),
                        'AdoptAPixel3km2020_100m_aerialImageryLabels.csv')
_CANOPY_CACHE = None


def _load_canopy_csv():
    global _CANOPY_CACHE
    if _CANOPY_CACHE is not None:
        return _CANOPY_CACHE
    data = []
    if not os.path.exists(CSV_PATH):
        _CANOPY_CACHE = []
        return _CANOPY_CACHE
    with open(CSV_PATH, 'r', newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            try:
                lon = float(row.get('LONGITUDE'))
                lat = float(row.get('LATITUDE'))
                canopy = float(row.get('ceoTREES_CANOPYCOVER'))
            except (TypeError, ValueError):
                continue
            data.append({
                'lat': lat,
                'lon': lon,
                'canopy': canopy,
                'id': row.get('ceoPLOTID')
            })
    _CANOPY_CACHE = data
    return _CANOPY_CACHE


@app.route('/api/csv/canopy')
def api_csv_canopy():
    """
    Returns canopy points from CSV as JSON.
    Query params:
      - minCanopy: threshold to include (if <=1, treated as fraction -> 0.1 == 10%) default 0.1
      - maxCanopy: optional upper bound (same unit rule)
      - limit: max results (default 5000)
      - bbox: optional 'south,west,north,east' filter
    """
    data = _load_canopy_csv()
    if not data:
        return jsonify({'count': 0, 'results': [], 'message': 'No CSV data available'}), 200

    def to_percent(value, default=None):
        try:
            v = float(value)
        except (TypeError, ValueError):
            return default
        # if <= 1 assume fraction, convert to percent
        return v * 100.0 if v <= 1.0 else v

    min_can = to_percent(request.args.get('minCanopy'),
                         0.1 * 100.0)  # default 0.1 => 10%
    max_can = to_percent(request.args.get('maxCanopy'), None)
    limit = request.args.get('limit')
    try:
        limit = int(limit) if limit is not None else 5000
    except ValueError:
        limit = 5000

    bbox = request.args.get('bbox')  # south,west,north,east
    bbox_vals = None
    if bbox:
        try:
            s, w, n, e = [float(x) for x in bbox.split(',')]
            bbox_vals = (s, w, n, e)
        except Exception:
            bbox_vals = None

    results = []
    for p in data:
        c = p['canopy']
        if c is None:
            continue
        if c < min_can:
            continue
        if max_can is not None and c > max_can:
            continue
        if bbox_vals is not None:
            if not (bbox_vals[0] <= p['lat'] <= bbox_vals[2] and bbox_vals[1] <= p['lon'] <= bbox_vals[3]):
                continue
        results.append(p)
        if len(results) >= limit:
            break

    return jsonify({
        'count': len(results),
        'results': results,
        'message': 'success'
    })


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
