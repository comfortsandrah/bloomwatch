import requests
import json
import argparse
from datetime import datetime, timedelta

# Base URL for the API (replace with actual base URL)
BASE_URL = "https://api.globe.gov/search/v1/measurement/protocol/measureddate/country/"


def fetch_measurements(protocols, start_date, end_date, country_code="KEN", geojson="FALSE", sample="FALSE", from_page=0, size=100, *, timeout=30, debug=False):
    """
    Fetch protocol measurements from the API for a given country and date range.

    Args:
        protocols (list): List of protocol names to query
        start_date (str): Start date in YYYY-MM-DD format
        end_date (str): End date in YYYY-MM-DD format
        country_code (str): ISO3 country code (default: KEN)
        geojson (str): Return GeoJSON format if TRUE (default: FALSE)
        sample (str): Return sample results if TRUE (default: FALSE)
        from_page (int): Starting page for pagination (default: 0)
        size (int): Number of records to return (default: 100)

    Returns:
        dict: API response data or None if request fails
    """
    params = {
        "protocols": protocols,
        "startdate": start_date,
        "enddate": end_date,
        "countrycode": country_code,
        "geojson": geojson,
        "sample": sample,
        "from": from_page,
        "size": size
    }

    try:
        response = requests.get(BASE_URL, params=params, timeout=timeout)
        if debug:
            # requests builds the final URL with params; useful for debugging
            print(f"DEBUG request url: {response.url}")

        # Check for successful response
        if response.status_code == 200:
            data = response.json()
            if debug:
                print(
                    f"DEBUG status=200, count={data.get('count')}, message={data.get('message')}")
            return data
        elif response.status_code == 401:
            print("Error: Unauthorized access. Check API credentials.")
        elif response.status_code == 403:
            print("Error: Forbidden. You don't have permission to access this resource.")
        elif response.status_code == 404:
            print("Error: Resource not found. Check the API endpoint or parameters.")
        else:
            print(f"Error: Received status code {response.status_code}")

        return None

    except requests.exceptions.RequestException as e:
        print(f"Error: Failed to make API request: {str(e)}")
        return None


def parse_args():
    parser = argparse.ArgumentParser(
        description="Query GLOBE measurements by country/date/protocols")
    parser.add_argument("--protocols", nargs="+", default=[
                        "air_temps", "precipitations"], help="Protocol(s) to query. Space-separated list.")
    parser.add_argument("--country", default="KEN",
                        help="ISO3 country code (e.g., KEN, USA)")
    parser.add_argument(
        "--startdate", help="Start date YYYY-MM-DD. Defaults to today-30d")
    parser.add_argument(
        "--enddate", help="End date YYYY-MM-DD. Defaults to today")
    parser.add_argument("--geojson", default="FALSE", choices=[
                        "TRUE", "FALSE", "True", "False"], help="Return GeoJSON format results if TRUE")
    parser.add_argument("--sample", default="FALSE", choices=[
                        "TRUE", "FALSE", "True", "False"], help="Return sample results if TRUE")
    parser.add_argument("--from", dest="from_page", type=int,
                        default=0, help="Paging start (from)")
    parser.add_argument("--size", type=int, default=100, help="Page size")
    parser.add_argument("--timeout", type=int, default=30,
                        help="HTTP timeout seconds")
    parser.add_argument("--debug", action="store_true",
                        help="Enable debug logging")
    parser.add_argument("--probe", action="store_true",
                        help="If zero results, try wider ranges and/or sample to help debug")
    return parser.parse_args()


def main():
    args = parse_args()

    # Resolve dates
    end_date = args.enddate or datetime.now().strftime("%Y-%m-%d")
    start_date = args.startdate or (
        datetime.now() - timedelta(days=30)).strftime("%Y-%m-%d")

    # Normalize booleans as expected by API (uppercase strings)
    geojson = str(args.geojson).upper()
    sample = str(args.sample).upper()

    # Fetch data
    data = fetch_measurements(
        protocols=args.protocols,
        start_date=start_date,
        end_date=end_date,
        country_code=args.country,
        geojson=geojson,
        sample=sample,
        from_page=args.from_page,
        size=args.size,
        timeout=args.timeout,
        debug=args.debug,
    )

    # If probing requested and got zero results, try helpful alternates
    if args.probe and data and isinstance(data, dict) and data.get("count", 0) == 0:
        if args.debug:
            print(
                "DEBUG probe: initial query returned 0 results. Trying wider date range (last 365 days)...")
        wide_start = (datetime.now() - timedelta(days=365)
                      ).strftime("%Y-%m-%d")
        data2 = fetch_measurements(
            protocols=args.protocols,
            start_date=wide_start,
            end_date=end_date,
            country_code=args.country,
            geojson=geojson,
            sample=sample,
            from_page=0,
            size=min(args.size, 100),
            timeout=args.timeout,
            debug=args.debug,
        )
        if data2 and data2.get("count", 0) > 0:
            data = data2
        else:
            if args.debug:
                print("DEBUG probe: still 0. Trying sample=TRUE...")
            data3 = fetch_measurements(
                protocols=args.protocols,
                start_date=wide_start,
                end_date=end_date,
                country_code=args.country,
                geojson=geojson,
                sample="TRUE",
                from_page=0,
                size=10,
                timeout=args.timeout,
                debug=args.debug,
            )
            # sample returns up to 10 if available
            if data3 and data3.get("count", 0) >= 0:
                data = data3

    # Process and display results
    if data:
        print("Successfully retrieved data:")
        print(json.dumps(data, indent=2))
        if isinstance(data, dict) and data.get("count", 0) == 0:
            print(
                "Note: API returned zero results for the given filters. "
                "Try widening the date range, switching protocols, or using --probe to auto-try alternatives."
            )
    else:
        print("No data retrieved.")


if __name__ == "__main__":
    main()
