import os
import json
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


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
