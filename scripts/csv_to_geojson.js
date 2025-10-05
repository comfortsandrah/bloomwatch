/**
 * Convert CSV satellite data to GeoJSON
 * CSV format: latitude,longitude,ndvi,date
 * 
 * Usage: node csv_to_geojson.js input.csv output.json
 */

const fs = require('fs');
const path = require('path');

function csvToGeoJSON(csvPath, outputPath) {
  console.log(`Reading ${csvPath}...`);
  
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const lines = csvContent.trim().split('\n');
  
  // Skip header
  const header = lines[0].split(',').map(h => h.trim());
  console.log('CSV columns:', header);
  
  const features = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    
    if (values.length < 3) continue;
    
    const lat = parseFloat(values[0]);
    const lon = parseFloat(values[1]);
    const ndvi = parseFloat(values[2]);
    
    // Skip invalid values
    if (isNaN(lat) || isNaN(lon) || isNaN(ndvi)) continue;
    
    // Filter to Kenya region (optional)
    if (lon < 34 || lon > 42 || lat < -5 || lat > 5) continue;
    
    // Skip invalid NDVI (should be between -0.2 and 1.0)
    if (ndvi < -0.2 || ndvi > 1.0) continue;
    
    // Normalize to 0-1 for intensity
    const intensity = Math.max(0, Math.min(1, ndvi));
    
    features.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [lon, lat]
      },
      properties: {
        ndvi: Math.round(ndvi * 1000) / 1000,
        intensity: Math.round(intensity * 1000) / 1000,
        date: values[3] || new Date().toISOString().split('T')[0]
      }
    });
    
    if (i % 10000 === 0) {
      console.log(`Processed ${i} rows...`);
    }
  }
  
  const geojson = {
    type: 'FeatureCollection',
    features: features
  };
  
  fs.writeFileSync(outputPath, JSON.stringify(geojson, null, 2));
  
  console.log(`✓ Created ${outputPath} with ${features.length} points`);
  console.log(`NDVI range: ${Math.min(...features.map(f => f.properties.ndvi)).toFixed(3)} to ${Math.max(...features.map(f => f.properties.ndvi)).toFixed(3)}`);
}

// Command line usage
if (process.argv.length < 4) {
  console.log('Usage: node csv_to_geojson.js input.csv output.json');
  console.log('\nCSV format should be:');
  console.log('latitude,longitude,ndvi,date');
  console.log('-1.2921,36.8219,0.654,2024-01-01');
  process.exit(1);
}

const inputFile = process.argv[2];
const outputFile = process.argv[3];

csvToGeoJSON(inputFile, outputFile);
