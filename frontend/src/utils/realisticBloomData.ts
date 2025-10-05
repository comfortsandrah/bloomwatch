/**
 * Realistic NDVI data for Kenya based on typical vegetation patterns
 * Use this while processing your HDF file
 */

export const realisticKenyaNDVIData = {
  type: 'FeatureCollection' as const,
  features: [
    // Coffee regions (Central Kenya - Kiambu, Muranga)
    ...generateRegionPoints(-0.9, 37.0, 0.65, 0.80, 'coffee', 100),
    
    // Tea regions (Kericho, Nandi Hills)
    ...generateRegionPoints(-0.3, 35.3, 0.70, 0.85, 'tea', 120),
    
    // Maize belt (Rift Valley)
    ...generateRegionPoints(0.5, 35.5, 0.50, 0.70, 'maize', 150),
    
    // Horticultural (Naivasha area)
    ...generateRegionPoints(-0.7, 36.4, 0.60, 0.75, 'horticulture', 80),
    
    // Wheat regions (Nakuru, Uasin Gishu)
    ...generateRegionPoints(0.3, 36.0, 0.55, 0.72, 'wheat', 90),
    
    // Mount Kenya forests (High NDVI)
    ...generateRegionPoints(-0.15, 37.3, 0.75, 0.90, 'forest', 60),
    
    // Nairobi urban/suburban
    ...generateRegionPoints(-1.3, 36.8, 0.40, 0.65, 'urban', 70),
    
    // Coastal regions (Mombasa area)
    ...generateRegionPoints(-4.0, 39.7, 0.45, 0.68, 'coastal', 80),
    
    // Arid regions (Northern Kenya)
    ...generateRegionPoints(2.0, 37.5, 0.10, 0.35, 'arid', 100),
    
    // Pasture lands (Kajiado)
    ...generateRegionPoints(-2.0, 36.8, 0.35, 0.55, 'pasture', 110),
  ]
};

/**
 * Generate points for a region with realistic variation
 */
function generateRegionPoints(
  centerLat: number,
  centerLon: number,
  minNDVI: number,
  maxNDVI: number,
  landType: string,
  count: number
) {
  const points = [];
  const spread = 0.5; // degrees
  
  for (let i = 0; i < count; i++) {
    // Random position around center
    const lat = centerLat + (Math.random() - 0.5) * spread;
    const lon = centerLon + (Math.random() - 0.5) * spread;
    
    // NDVI with realistic variation
    const ndvi = minNDVI + Math.random() * (maxNDVI - minNDVI);
    
    // Add some spatial clustering
    const cluster = Math.sin(lat * 10) * Math.cos(lon * 10) * 0.1;
    const finalNDVI = Math.max(0, Math.min(1, ndvi + cluster));
    
    points.push({
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: [lon, lat]
      },
      properties: {
        ndvi: Math.round(finalNDVI * 1000) / 1000,
        intensity: Math.round(finalNDVI * 1000) / 1000,
        landType,
        region: getRegionName(lat, lon)
      }
    });
  }
  
  return points;
}

function getRegionName(lat: number, lon: number): string {
  if (lat > 1) return 'Northern Kenya';
  if (lat < -3) return 'Coastal Kenya';
  if (lon < 35.5) return 'Rift Valley';
  if (lon > 37.5) return 'Eastern Kenya';
  if (lat < -1 && lat > -1.5) return 'Nairobi Region';
  return 'Central Kenya';
}
