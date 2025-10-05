"""
Script to extract NDVI data from HDF file and convert to GeoJSON
for use in BloomWatch application
"""
import json
import numpy as np
from osgeo import gdal
import sys

def process_hdf_to_geojson(hdf_file_path, output_json_path, sample_rate=10):
    """
    Extract NDVI data from HDF file and create GeoJSON point features
    
    Args:
        hdf_file_path: Path to HDF file
        output_json_path: Path for output JSON file
        sample_rate: Take every Nth pixel (to reduce file size)
    """
    print(f"Processing {hdf_file_path}...")
    
    # Open HDF file
    try:
        dataset = gdal.Open(hdf_file_path)
        if dataset is None:
            print("Error: Could not open HDF file")
            return
    except Exception as e:
        print(f"Error opening file: {e}")
        return
    
    # Get subdatasets (HDF files contain multiple datasets)
    subdatasets = dataset.GetSubDatasets()
    print(f"Found {len(subdatasets)} subdatasets")
    
    for idx, (name, desc) in enumerate(subdatasets):
        print(f"{idx}: {desc}")
    
    # Usually NDVI is the first subdataset
    # Adjust index if needed
    ndvi_dataset_name = subdatasets[0][0]  # Change index if NDVI is elsewhere
    
    print(f"\nOpening NDVI dataset: {ndvi_dataset_name}")
    ndvi_dataset = gdal.Open(ndvi_dataset_name)
    
    if ndvi_dataset is None:
        print("Error: Could not open NDVI subdataset")
        return
    
    # Read NDVI band
    band = ndvi_dataset.GetRasterBand(1)
    ndvi_array = band.ReadAsArray()
    
    # Get geotransform (for converting pixel coords to lat/lon)
    geotransform = ndvi_dataset.GetGeoTransform()
    
    print(f"Array shape: {ndvi_array.shape}")
    print(f"NDVI range: {ndvi_array.min()} to {ndvi_array.max()}")
    
    # MODIS NDVI scale factor (usually stored as integers, need to divide by 10000)
    scale_factor = 0.0001
    
    # Create GeoJSON features
    features = []
    rows, cols = ndvi_array.shape
    
    print(f"Extracting points (sampling every {sample_rate} pixels)...")
    point_count = 0
    
    for i in range(0, rows, sample_rate):
        for j in range(0, cols, sample_rate):
            ndvi_value = ndvi_array[i, j]
            
            # Skip invalid/fill values (typically > 10000 or < -2000)
            if ndvi_value < -2000 or ndvi_value > 10000:
                continue
            
            # Convert to actual NDVI (-1 to 1 range)
            ndvi_normalized = ndvi_value * scale_factor
            
            # Skip very low values (water, clouds)
            if ndvi_normalized < 0:
                continue
            
            # Convert pixel coordinates to lat/lon
            lon = geotransform[0] + j * geotransform[1] + i * geotransform[2]
            lat = geotransform[3] + j * geotransform[4] + i * geotransform[5]
            
            # Filter to Kenya region approximately
            # Kenya bounds: lat -5 to 5, lon 34 to 42
            if not (34 <= lon <= 42 and -5 <= lat <= 5):
                continue
            
            features.append({
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [lon, lat]
                },
                "properties": {
                    "ndvi": round(float(ndvi_normalized), 3),
                    "intensity": round(float(min(1, max(0, ndvi_normalized))), 3)
                }
            })
            
            point_count += 1
            if point_count % 10000 == 0:
                print(f"Processed {point_count} points...")
    
    # Create GeoJSON
    geojson = {
        "type": "FeatureCollection",
        "features": features
    }
    
    # Save to file
    print(f"\nSaving {len(features)} features to {output_json_path}...")
    with open(output_json_path, 'w') as f:
        json.dump(geojson, f)
    
    print(f"✓ Done! Created GeoJSON with {len(features)} points")
    print(f"NDVI range in output: {min(f['properties']['ndvi'] for f in features):.3f} to {max(f['properties']['ndvi'] for f in features):.3f}")
    
    # Close datasets
    ndvi_dataset = None
    dataset = None


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python process_hdf.py <path_to_hdf_file> [output_json_path] [sample_rate]")
        print("\nExample:")
        print("  python process_hdf.py MOD13Q1.A2024001.h21v08.061.hdf bloom_data.json 10")
        sys.exit(1)
    
    hdf_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else "bloom_data.json"
    sample_rate = int(sys.argv[3]) if len(sys.argv) > 3 else 10
    
    process_hdf_to_geojson(hdf_file, output_file, sample_rate)
