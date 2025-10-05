import time
import json
import requests
import pandas as pd

# ------------------------------
# CONFIGURATION
# ------------------------------
USERNAME = "jaymogee"
PASSWORD = "JamesKaranja44."

BASE_URL = "https://appeears.earthdatacloud.nasa.gov/api"


def login(username, password):
    """Authenticate and return Bearer token"""
    auth = requests.auth.HTTPBasicAuth(username, password)
    r = requests.post(f"{BASE_URL}/login", auth=auth)
    r.raise_for_status()
    token = r.json()['token']
    print("✅ Logged in successfully")
    return token


def create_task(token):
    """Create NDVI task"""
    headers = {"Authorization": f"Bearer {token}",
               "Content-Type": "application/json"}
    with open("task.json") as f:
        task = json.load(f)

    r = requests.post(f"{BASE_URL}/task", headers=headers, json=task)
    r.raise_for_status()
    task_id = r.json()['task_id']
    print(f"🛰️  Task created: {task_id}")
    return task_id


def wait_for_completion(token, task_id):
    """Poll task status until done"""
    headers = {"Authorization": f"Bearer {token}"}
    while True:
        r = requests.get(f"{BASE_URL}/status/{task_id}", headers=headers)
        r.raise_for_status()
        data = r.json()

        # Debug print so we can see what’s going on
        print("🔍 Response:", data)

        # Sometimes the response has no 'status' yet
        status = data.get("status")
        if not status:
            print("⚠️  No 'status' field found yet. Waiting 30s...")
            time.sleep(30)
            continue

        print(f"⏳ Task status: {status}")
        if status == "done":
            print("✅ Task completed!")
            return
        elif status == "failed":
            print("❌ Task failed!")
            print(json.dumps(data, indent=2))
            raise SystemExit(1)

        time.sleep(30)



def get_bundle_info(token, task_id):
    """Get bundle info (list of result files)"""
    headers = {"Authorization": f"Bearer {token}"}
    r = requests.get(f"{BASE_URL}/bundle/{task_id}", headers=headers)
    r.raise_for_status()
    data = r.json()
    print("📦 Bundle info received:")
    print(json.dumps(data, indent=2))
    return data


if __name__ == "__main__":
    # 1️⃣ Login
    token = login(USERNAME, PASSWORD)

    # 2️⃣ Create Task
    task_id = create_task(token)

    # 3️⃣ Wait for completion
    wait_for_completion(token, task_id)

    # 4️⃣ List available result files
    bundle = get_bundle_info(token, task_id)

    # Some responses wrap files inside bundle["files"], others not
    files = bundle.get("files") or bundle

    # Inspect for available keys
    if isinstance(files, dict):
        files = files.get("files", [])

    print("🧾 Files detected:", [f.get("file_name") for f in files])

    # Match .csv files flexibly
    csv_file = next(
        (f for f in files if any(
            k in f and "csv" in str(f[k]).lower()
            for k in ("file_ext", "file_type", "file_name")
        )),
        None
    )

    if not csv_file:
        print("❌ No CSV file found in bundle.")
        exit()

    file_id = csv_file.get("file_id") or csv_file.get("id")
    print(f"📄 Found CSV file: {csv_file.get('file_name', 'unknown')}")

    # 5️⃣ Load into pandas
    df = get_csv_data(token, task_id, file_id)
    print("✅ NDVI Data Sample:")
    print(df.head())



def get_csv_data(token, task_id, file_id):
    """Read CSV result directly into pandas"""
    headers = {"Authorization": f"Bearer {token}"}
    url = f"{BASE_URL}/bundle/{task_id}/{file_id}"
    print("📦 Fetching NDVI CSV data ...")
    r = requests.get(url, headers=headers)
    r.raise_for_status()
    df = pd.read_csv(pd.compat.StringIO(r.text))
    return df


if __name__ == "__main__":
    # 1️⃣ Login
    token = login(USERNAME, PASSWORD)

    # 2️⃣ Create Task
    task_id = create_task(token)

    # 3️⃣ Wait for completion
    wait_for_completion(token, task_id)

    # 4️⃣ List available result files
    bundle = get_bundle_info(token, task_id)
    files = bundle.get("files", [])
    csv_file = next((f for f in files if f["file_ext"] == "csv"), None)

    if not csv_file:
        print("❌ No CSV file found in bundle.")
    else:
        file_id = csv_file["file_id"]
        print(f"📄 Found CSV file: {csv_file['file_name']}")

        # 5️⃣ Load into pandas
        df = get_csv_data(token, task_id, file_id)
        print("✅ NDVI Data Sample:")
        print(df.head())
