from pystac_client import Client
import planetary_computer as pc
import argparse
import json
from typing import Any, Dict


def item_to_minimal_json(item) -> Dict[str, Any]:
    """Return a compact JSON representation of a STAC item with signed assets."""
    # Sign to get time-limited URLs
    try:
        signed = pc.sign_item(item)
    except Exception:
        signed = item

    assets = {}
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

    props = getattr(signed, "properties", {}) or {}
    dt = props.get("datetime") or props.get("start_datetime")

    return {
        "id": signed.id,
        "collection": getattr(signed, "collection_id", None) or props.get("collection"),
        "bbox": getattr(signed, "bbox", None),
        "datetime": dt,
        "assets": assets,
        "links": [
            {"rel": l.rel, "href": l.target} for l in getattr(signed, "links", []) if hasattr(l, "rel")
        ],
    }


def main():
    parser = argparse.ArgumentParser(
        description="Fetch STAC items from Planetary Computer and output JSON")
    parser.add_argument("--collection", default="modis-13Q1-061",
                        help="Collection ID to search")
    parser.add_argument("--limit", type=int, default=10,
                        help="Max number of items to return")
    parser.add_argument("--out", default="api_output.json",
                        help="Output JSON file path")
    # AOI defaults to your polygon; can override with bbox lon,lat,lon,lat
    parser.add_argument(
        "--bbox", help="Optional bbox 'minLon,minLat,maxLon,maxLat' overrides default AOI")
    args = parser.parse_args()

    # Search against the Planetary Computer STAC API
    catalog = Client.open(
        "https://planetarycomputer.microsoft.com/api/stac/v1")

    # Define area of interest
    if args.bbox:
        try:
            minx, miny, maxx, maxy = [float(x) for x in args.bbox.split(",")]
            aoi = {
                "type": "Polygon",
                "coordinates": [[[minx, miny], [maxx, miny], [maxx, maxy], [minx, maxy], [minx, miny]]],
            }
        except Exception:
            raise SystemExit(
                "Invalid --bbox. Expected 'minLon,minLat,maxLon,maxLat'")
    else:
        aoi = {
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

    # Use simpler intersects/collections parameters
    search = catalog.search(collections=[args.collection], intersects=aoi)

    # Collect up to limit items
    items = []
    for item in search.get_items():
        items.append(item_to_minimal_json(item))
        if len(items) >= args.limit:
            break

    result = {
        "count": len(items),
        "collection": args.collection,
        "aoi": aoi,
        "items": items,
    }

    # Write to file and also print a short message
    with open(args.out, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2)
    print(f"Wrote {len(items)} items to {args.out}")


if __name__ == "__main__":
    main()
