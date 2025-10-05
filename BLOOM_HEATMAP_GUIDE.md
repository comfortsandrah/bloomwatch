# BloomWatch - Crop-Specific Bloom Heatmap Enhancement

## 🎯 Overview

BloomWatch has been enhanced with **crop-specific bloom pattern visualization** using NASA satellite data. The map now displays bloom intensity as color-coded heatmaps based on real NDVI (Normalized Difference Vegetation Index) data from NASA's GIBS service.

## ✨ New Features

### 1. **Crop-Specific Bloom Heatmaps**
- Real-time NASA satellite data (NDVI, EVI, VIIRS)
- Color-coded by bloom intensity relative to each crop's thresholds
- Dynamic color mapping based on crop characteristics
- Automatic bloom season detection

### 2. **Bloom Hotspot Visualization**
- Overlay points showing specific bloom locations
- Intensity-based sizing and coloring
- Glow effects for peak bloom areas
- Zoom-responsive scaling

### 3. **Enhanced Legend**
- Crop-specific NDVI threshold display
- Color gradient visualization
- Real-time bloom stage indicators
- Data source information

## 🚀 How to Use

### Step 1: Select the Bloom Layer
Click on the **"Bloom"** tab in the navigation bar at the top of the screen.

### Step 2: Choose a Crop
In the right sidebar, select a crop from the dropdown menu:
- 🌻 Sunflower
- ☕ Coffee
- 🍵 Tea
- 🌽 Maize
- 🌾 Pasture
- 🌺 Wildflowers
- 🌾 Wheat
- 🌹 Horticultural Crops
- 🥑 Avocado
- 🥭 Mango

### Step 3: Enable NASA Satellite Data
In the "Bloom Data Source" section:
1. Click **"🛰️ NASA Satellite"** button
2. Choose a satellite layer:
   - **NDVI** - Standard vegetation index (500m resolution)
   - **EVI** - Enhanced for dense crops (500m resolution)
   - **VIIRS** - Higher resolution (375m resolution)

### Step 4: Interpret the Heatmap

The map will display bloom patterns using this color scheme:

| Color | NDVI Range | Bloom Stage | Description |
|-------|-----------|-------------|-------------|
| 🟤 Brown | 0.0 | Bare Soil | No vegetation |
| 🟫 Tan | < Threshold | Pre-Bloom | Below bloom threshold |
| 🟡 Gold | = Threshold | Early Bloom | Bloom starting |
| 🟠 Orange | Mid-range | Active Bloom | Active blooming |
| 💗 Hot Pink | = Peak | Full Bloom | Full bloom |
| 💖 Deep Pink | > Peak | Peak Bloom | Peak intensity |

### Step 5: Use the Timeline
- Scrub through dates using the timeline at the bottom
- Click play to animate bloom patterns over time
- Watch how bloom intensity changes throughout the year

## 📊 Understanding the Data

### NDVI Thresholds (Examples)

Each crop has specific NDVI thresholds for bloom detection:

- **Sunflower**: Threshold 0.60, Peak 0.75
- **Coffee**: Threshold 0.65, Peak 0.80
- **Tea**: Threshold 0.70, Peak 0.85
- **Maize**: Threshold 0.50, Peak 0.70

### Bloom Windows

Crops have specific bloom seasons in Kenya:
- **Sunflower**: Jan-Mar (peak in Feb)
- **Coffee**: Sept-Nov (peak in Oct)
- **Tea**: Feb-Apr & Aug-Oct (two seasons)
- **Maize**: Mar-May & Oct-Dec (two seasons)

The heatmap intensity automatically increases during each crop's bloom window!

## 🎨 Color Mapping Logic

The heatmap uses **dynamic color mapping** based on each crop's characteristics:

1. **Below Threshold**: Brown/Tan colors indicate areas not yet blooming
2. **At Threshold**: Gold indicates bloom initiation
3. **Mid-Range**: Orange shows active blooming
4. **At Peak**: Hot pink indicates full bloom
5. **Above Peak**: Deep pink shows peak bloom intensity

## 🔍 Advanced Features

### Bloom Season Detection
- The system automatically detects if the current date is within the selected crop's bloom window
- During bloom season, the heatmap opacity increases for better visibility
- Outside bloom season, opacity decreases to show dormant areas

### Multi-Layer Visualization
When NASA data is enabled, you see:
1. **Base Heatmap**: Color-coded NASA satellite data
2. **Bloom Points**: Overlay showing specific bloom hotspots
3. **Glow Effect**: Subtle glow during peak bloom season

### Satellite Data Options

**NDVI (Normalized Difference Vegetation Index)**
- Best for: General vegetation monitoring
- Resolution: 500m
- Update: Every 16 days
- Good for: Most crops

**EVI (Enhanced Vegetation Index)**
- Best for: Dense crop areas
- Resolution: 500m
- Update: Every 16 days
- Good for: Tea, Coffee, Dense plantations

**VIIRS NDVI**
- Best for: Detailed analysis
- Resolution: 375m (higher detail)
- Update: Every 16 days
- Good for: Smaller farms, precise monitoring

## 💡 Tips for Best Results

1. **Choose the Right Satellite Layer**
   - Use NDVI for general monitoring
   - Use EVI for dense crops like tea and coffee
   - Use VIIRS for detailed small-area analysis

2. **Match Crop to Season**
   - Select crops during their bloom windows for best visualization
   - Example: View Coffee in September-November

3. **Zoom In for Detail**
   - Bloom points scale with zoom level
   - Zoom in to see individual bloom hotspots
   - Zoom out for regional patterns

4. **Compare Dates**
   - Use the timeline to compare bloom intensity across dates
   - Watch seasonal progression
   - Identify bloom peaks

5. **Combine with Other Layers**
   - Switch to Vegetation layer to see raw NDVI data
   - Compare bloom patterns with climate data
   - Cross-reference with pollen data

## 🛠️ Technical Details

### Components Created

1. **`CropBloomHeatmap.tsx`**
   - Main heatmap rendering component
   - Applies crop-specific color mapping to NASA raster data
   - Handles bloom season detection and opacity adjustment

2. **`BloomPointsLayer.tsx`**
   - Renders bloom hotspot overlay
   - Calculates crop-specific bloom intensity
   - Provides glow effects for high-intensity areas

### Data Flow

```
NASA GIBS API → NDVI Raster Tiles → Crop Threshold Mapping → Color-Coded Heatmap
                                                            ↓
                                                    Bloom Points Overlay
```

### Color Interpolation

The system uses Mapbox's raster color interpolation:
```javascript
'raster-color': [
  'interpolate', ['linear'], ['raster-value'],
  threshold * 0.5, '#A0522D',  // Below threshold
  threshold, '#FFD700',         // Early bloom
  peakNDVI, '#FF1493'          // Peak bloom
]
```

## 🌍 Kenya-Specific Features

All crop data is tailored for Kenya:
- Bloom windows match Kenya's bimodal rainfall pattern
- Long rains (March-May) and short rains (October-December)
- Regional data includes common growing areas
- NDVI thresholds calibrated for Kenyan climate

## 📈 Future Enhancements

Potential additions:
- Historical bloom pattern analysis
- Bloom prediction using ML
- Export bloom intensity data
- Multi-crop comparison view
- Alert system for optimal bloom viewing times

## 🐛 Troubleshooting

**Heatmap not showing?**
- Ensure "NASA Satellite" is selected
- Check that a crop is selected
- Verify internet connection (NASA data requires online access)

**Colors look wrong?**
- Different crops have different color scales
- Check the legend for current crop's scale
- Ensure you're viewing during the crop's bloom season

**Slow performance?**
- NASA tiles may take time to load
- Try zooming in to a specific region
- Check your internet connection speed

## 📚 Resources

- [NASA GIBS Documentation](https://wiki.earthdata.nasa.gov/display/GIBS)
- [NDVI Explained](https://en.wikipedia.org/wiki/Normalized_difference_vegetation_index)
- [Kenya Agricultural Calendar](https://www.fao.org/kenya)

---

**Enjoy exploring bloom patterns across Kenya! 🌸🌍**
