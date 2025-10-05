/**
 * Sentinel Hub API for real satellite NDVI data
 * Easier alternative to NASA GIBS - more reliable
 */

const SENTINEL_HUB_URL = 'https://services.sentinel-hub.com/ogc/wms/';

export interface SentinelConfig {
  instanceId: string; // Get free at https://www.sentinel-hub.com/
}

/**
 * Get NDVI WMS tile URL for Sentinel-2 data
 * More reliable than NASA GIBS
 */
export function getSentinelNDVIUrl(
  config: SentinelConfig,
  date: Date,
  bounds: { minLat: number; maxLat: number; minLon: number; maxLon: number }
) {
  const dateStr = date.toISOString().split('T')[0];
  
  return `${SENTINEL_HUB_URL}${config.instanceId}?` +
    `SERVICE=WMS&` +
    `REQUEST=GetMap&` +
    `LAYERS=NDVI&` +
    `MAXCC=20&` + // Max cloud coverage 20%
    `WIDTH=512&` +
    `HEIGHT=512&` +
    `FORMAT=image/png&` +
    `BBOX=${bounds.minLon},${bounds.minLat},${bounds.maxLon},${bounds.maxLat}&` +
    `TIME=${dateStr}/${dateStr}`;
}

/**
 * Kenya bounds for Sentinel Hub requests
 */
export const KENYA_BOUNDS = {
  minLat: -5,
  maxLat: 5,
  minLon: 34,
  maxLon: 42
};

/**
 * Get Sentinel Hub instance ID:
 * 1. Sign up free at https://www.sentinel-hub.com/
 * 2. Create a configuration
 * 3. Get your instance ID
 * 4. Add to .env: VITE_SENTINEL_HUB_ID=your-id-here
 */
export const sentinelConfig: SentinelConfig = {
  instanceId: import.meta.env.VITE_SENTINEL_HUB_ID || ''
};
