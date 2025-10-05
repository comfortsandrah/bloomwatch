import os
import json
from flask import Flask, jsonify, send_from_directory, request

# Optional live fetch deps
try:
    from pystac_client import Client
    import planetary_computer as pc
except Exception:  # Deps may not be installed yet; endpoint will error with guidance
    Client = None
    pc = None

HERE = os.path.dirname(__file__)
DATA_PATH = os.path.join(HERE, 'api_output.json')

app = Flask(__name__, static_folder='static')


@app.route('/api/items')
def api_items():
    if not os.path.exists(DATA_PATH):
        return jsonify({'error': 'api_output.json not found. Run main.py first.'}), 404
    try:
        with open(DATA_PATH, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/')
@app.route('/index.html')
def index():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/static/<path:path>')
def static_files(path):
    return send_from_directory(app.static_folder, path)


@app.route('/favicon.ico')
def favicon():
    # Avoid noisy 404 in console; return empty response
    return ('', 204)


def _default_aoi_polygon():
    # Same default AOI used in main.py
    return {
        "type": "Polygon",
        "coordinates": [
            [
                [30.573305609585958, -5.21294994354399],
                [48.78177292453017, -5.21294994354399],
                [48.78177292453017, 6.046964947732917],
                [30.573305609585958, 6.046964947732917],
                [30.573305609585958, -5.21294994354399],
            ]
        ],
    }


def _item_to_minimal_json(item):
    # Mirror main.py's structure and sign assets when possible
    signed = item
    if pc is not None:
        try:
            signed = pc.sign_item(item)
        except Exception:
            signed = item
    assets = {}
    try:
        for k, a in signed.assets.items():
            try:
                assets[k] = {
                    "href": a.href,
                    "type": getattr(a, "media_type", None),
                    "roles": getattr(a, "roles", None),
                    "title": getattr(a, "title", None),
                }
            except Exception:
                continue
    except Exception:
        pass

    props = getattr(signed, "properties", {}) or {}
    dt = props.get("datetime") or props.get("start_datetime")
    return {
        "id": getattr(signed, 'id', None),
        "collection": getattr(signed, "collection_id", None) or props.get("collection"),
        "bbox": getattr(signed, "bbox", None),
        "datetime": dt,
        "assets": assets,
        "links": [
            {"rel": getattr(l, 'rel', None),
             "href": getattr(l, 'target', None)}
            for l in getattr(signed, "links", []) if hasattr(l, "rel")
        ],
    }


@app.route('/api/live_items')
def api_live_items():
    # Only require pystac-client for live fetching; signing with planetary_computer is optional
    if Client is None:
        return jsonify({
            'error': 'pystac-client not installed. Install dependencies or use /api/items (file-based).',
            'hint': 'pip install pystac-client'
        }), 500

    collection = request.args.get('collection', 'modis-13Q1-061')
    try:
        limit = int(request.args.get('limit', '10'))
    except ValueError:
        limit = 10

    bbox = request.args.get('bbox')  # minLon,minLat,maxLon,maxLat
    if bbox:
        try:
            minx, miny, maxx, maxy = [float(x) for x in bbox.split(',')]
            aoi = {
                "type": "Polygon",
                "coordinates": [[[minx, miny], [maxx, miny], [maxx, maxy], [minx, maxy], [minx, miny]]],
            }
        except Exception:
            return jsonify({'error': "Invalid bbox. Use 'minLon,minLat,maxLon,maxLat'"}), 400
    else:
        aoi = _default_aoi_polygon()

    try:
        catalog = Client.open(
            "https://planetarycomputer.microsoft.com/api/stac/v1")
        search = catalog.search(collections=[collection], intersects=aoi)
        items = []
        for item in search.get_items():
            items.append(_item_to_minimal_json(item))
            if len(items) >= limit:
                break
        result = {
            'count': len(items),
            'collection': collection,
            'aoi': aoi,
            'items': items,
        }
        return jsonify(result)
    except Exception as e:
        # Attempt to fall back to local file if available so the map can still render something
        fallback = None
        if os.path.exists(DATA_PATH):
            try:
                with open(DATA_PATH, 'r', encoding='utf-8') as f:
                    fallback = json.load(f)
            except Exception:
                fallback = None
        payload = {
            'error': str(e),
            'collection': collection,
            'bbox': bbox,
            'limit': limit,
            'fallback_used': bool(fallback),
            'source': 'file' if fallback else 'live'
        }
        if fallback:
            # Match the live schema keys if possible
            resp = {
                'count': len(fallback.get('items', [])),
                'collection': fallback.get('collection'),
                'aoi': fallback.get('aoi'),
                'items': fallback.get('items', []),
                'note': 'Live fetch failed; returned local api_output.json instead.',
                'debug': payload
            }
            return jsonify(resp)
        return jsonify(payload), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5050))
    app.run(host='0.0.0.0', port=port, debug=True)
