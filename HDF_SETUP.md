# Using Your HDF Satellite Data in BloomWatch

## Overview
You have NASA MODIS HDF files which contain real satellite NDVI data. This guide shows you how to convert and use them in BloomWatch.

## Option 1: Quick Process (Using Python Script)

### Prerequisites
```bash
# Install Python dependencies
pip install gdal numpy
```

### Steps

1. **Place your HDF file** in the project root or note its path

2. **Run the processing script:**
```bash
python scripts/process_hdf.py path/to/your/file.hdf frontend/src/utils/realBloomData.json 10
```

Arguments:
- First: Path to your HDF file
- Second: Output JSON file path
- Third: Sample rate (10 = every 10th pixel, lower = more data but larger file)

3. **The script will:**
   - Extract NDVI values from your HDF file
   - Convert to GeoJSON format
   - Filter to Kenya region (lat -5 to 5, lon 34 to 42)
   - Create intensity values for heatmap visualization

4. **Update the frontend** to use your data:

Create/Update `frontend/src/utils/realBloomData.ts`:
```typescript
import realData from './realBloomData.json';

export const realBloomHeatMapData = realData;
```

5. **Update BloomPointsLayer.tsx** to import your real data:
```typescript
// Change this line:
import { mockBloomHeatMapData } from '../../utils/mockData';

// To this:
import { realBloomHeatMapData as mockBloomHeatMapData } from '../../utils/realBloomData';
```

## Option 2: Convert to GeoTIFF (For Tile Server)

If you want to serve the data as map tiles:

### Install GDAL
- **Windows**: Download from https://www.gisinternals.com/
- **Mac**: `brew install gdal`
- **Linux**: `apt-get install gdal-bin`

### Convert HDF to GeoTIFF
```bash
# List subdatasets in your HDF file
gdalinfo your_file.hdf

# Convert NDVI subdataset to GeoTIFF
gdal_translate -of GTiff \
  HDF4_EOS:EOS_GRID:"your_file.hdf":MOD_Grid_MOD13Q1:NDVI \
  ndvi_output.tif

# Create color-mapped version for visualization
# First create color_ramp.txt:
# -2000 0 0 255
# 0 139 69 19
# 2000 205 133 63
# 4000 218 165 32
# 6000 154 205 50
# 8000 50 205 50
# 10000 255 20 147

gdaldem color-relief ndvi_output.tif color_ramp.txt colored_ndvi.tif
```

### Generate Tiles
```bash
# Install gdal2tiles
pip install gdal2tiles

# Generate web tiles
gdal2tiles.py -z 4-10 colored_ndvi.tif tiles/
```

Then serve the tiles folder with a web server.

## Understanding Your HDF File

### Common NASA MODIS HDF File Formats:
- **MOD13Q1**: MODIS/Terra Vegetation Indices 16-Day (250m resolution)
- **MOD13A1**: MODIS/Terra Vegetation Indices 16-Day (500m resolution)
- **MOD09**: Surface Reflectance

### NDVI Scale:
- Raw HDF values: -2000 to 10000 (integers)
- Actual NDVI: Multiply by 0.0001 to get -0.2 to 1.0 range
- Valid range: 0.0 (bare soil) to 1.0 (dense vegetation)

### Bloom Detection Thresholds (for Kenya crops):
- **Coffee**: 0.65 - 0.80
- **Tea**: 0.70 - 0.85
- **Maize**: 0.50 - 0.70
- **Sunflower**: 0.60 - 0.75

## Troubleshooting

### "Could not open HDF file"
- Ensure GDAL is installed: `python -c "from osgeo import gdal; print(gdal.__version__)"`
- Check file path is correct
- Verify file isn't corrupted: `gdalinfo your_file.hdf`

### "No NDVI subdataset found"
- Run `gdalinfo your_file.hdf` to see all subdatasets
- Update the script to use the correct subdataset index
- Look for subdatasets with "NDVI" in the name

### Output file too large
- Increase sample_rate (e.g., 20 or 30)
- Reduce geographical bounds in the script
- Process specific tiles only

## What Your HDF File Contains

Typical MODIS HDF structure:
```
MOD13Q1.A2024001.h21v08.061.hdf
  └── Subdatasets:
      ├── NDVI (Normalized Difference Vegetation Index)
      ├── EVI (Enhanced Vegetation Index)
      ├── Red Reflectance
      ├── NIR Reflectance
      ├── Blue Reflectance
      └── Quality layers
```

## Next Steps

1. ✅ Run the Python script on your HDF file
2. ✅ Import the generated JSON in your frontend
3. ✅ See real bloom patterns in your map!

Need help? Check:
- Your HDF filename (tells us the tile and date)
- GDAL installation: `gdalinfo --version`
- Python packages: `pip list | grep gdal`
