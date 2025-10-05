// NASA GIBS (Global Imagery Browse Services) Integration
// Documentation: https://wiki.earthdata.nasa.gov/display/GIBS

export type GIBSLayerType = 'NDVI' | 'EVI' | 'VIIRS_NDVI';

export interface GIBSLayer {
  id: string;
  name: string;
  description: string;
  layerId: string; // NASA GIBS layer identifier
  resolution: string;
  updateFrequency: string;
  baseUrl: string;
}

// NASA GIBS Layer Configurations
export const GIBS_LAYERS: Record<GIBSLayerType, GIBSLayer> = {
  NDVI: {
    id: 'MODIS_Terra_NDVI_16Day',
    name: 'MODIS Terra NDVI (16-Day)',
    description: 'Normalized Difference Vegetation Index from MODIS Terra satellite',
    layerId: 'MODIS_Terra_NDVI_16Day',
    resolution: '500m',
    updateFrequency: 'Every 16 days',
    baseUrl: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best'
  },
  
  EVI: {
    id: 'MODIS_Terra_EVI_16Day',
    name: 'MODIS Terra EVI (16-Day)',
    description: 'Enhanced Vegetation Index - more sensitive for dense crops',
    layerId: 'MODIS_Terra_EVI_16Day',
    resolution: '500m',
    updateFrequency: 'Every 16 days',
    baseUrl: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best'
  },
  
  VIIRS_NDVI: {
    id: 'VIIRS_SNPP_NDVI_16Day',
    name: 'VIIRS NDVI (16-Day)',
    description: 'Higher resolution NDVI from VIIRS sensor',
    layerId: 'VIIRS_SNPP_NDVI_16Day',
    resolution: '375m',
    updateFrequency: 'Every 16 days',
    baseUrl: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best'
  }
};

/**
 * Format date for NASA GIBS API (YYYY-MM-DD format)
 */
export const formatGIBSDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Get the nearest 16-day MODIS date for a given date
 * MODIS data is available every 16 days starting from 2000-02-18
 */
export const getNearestMODISDate = (date: Date): Date => {
  // MODIS 16-day cycle starts from 2000-02-18
  const modisStart = new Date('2000-02-18');
  
  // Ensure we don't request future dates - NASA has ~8 day lag
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() - 8);
  
  const targetDate = date > maxDate ? maxDate : date;
  
  const daysSinceStart = Math.floor((targetDate.getTime() - modisStart.getTime()) / (1000 * 60 * 60 * 24));
  const cycleNumber = Math.floor(daysSinceStart / 16);
  
  // Calculate the nearest 16-day date
  const nearestDate = new Date(modisStart);
  nearestDate.setDate(modisStart.getDate() + (cycleNumber * 16));
  
  return nearestDate;
};

/**
 * Generate WMTS tile URL for NASA GIBS
 * Uses Google Maps Compatible tile scheme (EPSG:3857)
 */
export const getGIBSTileUrl = (
  layerType: GIBSLayerType,
  date: Date,
  z: number,
  x: number,
  y: number
): string => {
  const layer = GIBS_LAYERS[layerType];
  const formattedDate = formatGIBSDate(getNearestMODISDate(date));
  
  // WMTS URL pattern for Google Maps Compatible tiles
  return `${layer.baseUrl}/${layer.layerId}/default/${formattedDate}/GoogleMapsCompatible_Level9/${z}/${y}/${x}.png`;
};

/**
 * Generate Mapbox-compatible raster source for NASA GIBS
 */
export const getGIBSRasterSource = (layerType: GIBSLayerType, date: Date) => {
  const layer = GIBS_LAYERS[layerType];
  const nearestDate = getNearestMODISDate(date);
  const formattedDate = formatGIBSDate(nearestDate);
  
  // NASA GIBS WMTS tile URL format
  // WMTS standard: {TileMatrixSet}/{TileMatrix}/{TileCol}/{TileRow}
  // TileCol = x, TileRow = y in WMTS
  // Mapbox uses {z}/{x}/{y} which maps correctly
  
  console.log('NASA GIBS Request:', {
    layer: layer.layerId,
    requestedDate: formatGIBSDate(date),
    nearestDate: formattedDate,
    baseUrl: layer.baseUrl
  });
  
  return {
    type: 'raster' as const,
    tiles: [
      `${layer.baseUrl}/${layer.layerId}/default/${formattedDate}/GoogleMapsCompatible_Level9/{z}/{x}/{y}.png`
    ],
    tileSize: 256,
    attribution: '© NASA EOSDIS GIBS',
    minzoom: 0,
    maxzoom: 9
  };
};

/**
 * Get all available MODIS dates within a range
 * Returns array of dates at 16-day intervals
 */
export const getMODISDateRange = (startDate: Date, endDate: Date): Date[] => {
  const dates: Date[] = [];
  let currentDate = getNearestMODISDate(startDate);
  const end = endDate.getTime();
  
  while (currentDate.getTime() <= end) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 16);
  }
  
  return dates;
};

/**
 * Check if NASA GIBS data is available for a given date
 * MODIS data available from 2000-02-18 onwards
 * Data typically has a ~3-8 day latency
 */
export const isGIBSDataAvailable = (date: Date): boolean => {
  const modisStart = new Date('2000-02-18');
  const today = new Date();
  const latencyDays = 8; // Conservative estimate
  const latestAvailable = new Date(today);
  latestAvailable.setDate(today.getDate() - latencyDays);
  
  return date >= modisStart && date <= latestAvailable;
};

/**
 * Get color scale for NDVI values
 * NDVI ranges from -1 to 1
 * Typical interpretation:
 *   < 0: Water, clouds, snow
 *   0 - 0.2: Bare soil, rock
 *   0.2 - 0.4: Sparse vegetation
 *   0.4 - 0.6: Moderate vegetation
 *   0.6 - 0.8: Dense vegetation
 *   0.8 - 1.0: Very dense vegetation
 */
export const NDVI_COLOR_SCALE = [
  { value: -1.0, color: '#0000FF', label: 'Water' },
  { value: 0.0, color: '#A52A2A', label: 'Bare Soil' },
  { value: 0.2, color: '#CD853F', label: 'Sparse' },
  { value: 0.4, color: '#DAA520', label: 'Moderate' },
  { value: 0.6, color: '#FFFF00', label: 'Dense' },
  { value: 0.8, color: '#90EE90', label: 'Very Dense' },
  { value: 1.0, color: '#00FF00', label: 'Peak' }
];

/**
 * Get color scale for EVI values
 * EVI ranges from -1 to 1, optimized for high biomass regions
 */
export const EVI_COLOR_SCALE = [
  { value: -1.0, color: '#0000FF', label: 'Water' },
  { value: 0.0, color: '#8B4513', label: 'Bare' },
  { value: 0.2, color: '#CD853F', label: 'Low' },
  { value: 0.4, color: '#F0E68C', label: 'Medium' },
  { value: 0.6, color: '#9ACD32', label: 'High' },
  { value: 0.8, color: '#228B22', label: 'Very High' },
  { value: 1.0, color: '#006400', label: 'Peak' }
];

/**
 * Convert NDVI value to descriptive text
 */
export const getNDVIDescription = (ndvi: number): string => {
  if (ndvi < 0) return 'Water/Cloud';
  if (ndvi < 0.2) return 'Bare Soil';
  if (ndvi < 0.4) return 'Sparse Vegetation';
  if (ndvi < 0.6) return 'Moderate Vegetation';
  if (ndvi < 0.8) return 'Dense Vegetation';
  return 'Very Dense Vegetation';
};

/**
 * Get bloom status based on NDVI threshold
 */
export const getBloomStatus = (ndvi: number, threshold: number): string => {
  if (ndvi < threshold * 0.5) return 'Dormant';
  if (ndvi < threshold * 0.75) return 'Pre-Bloom';
  if (ndvi < threshold) return 'Early Bloom';
  if (ndvi < threshold * 1.2) return 'Active Bloom';
  if (ndvi < threshold * 1.4) return 'Peak Bloom';
  return 'Post-Bloom';
};
