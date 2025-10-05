// Map scaling utilities for proper heatmap visualization at all zoom levels

export interface MapScalingConfig {
    minRadius: number;
    maxRadius: number;
    baseRadius: number;
    zoomFactor: number;
    intensityMultiplier: number;
}

// Default scaling configuration
export const defaultScalingConfig: MapScalingConfig = {
    minRadius: 2,
    maxRadius: 20,
    baseRadius: 5,
    zoomFactor: 1.2,
    intensityMultiplier: 1.0
};

// Calculate proper point radius based on zoom level and intensity
export function calculatePointRadius(
    intensity: number,
    zoomLevel: number,
    config: MapScalingConfig = defaultScalingConfig
): number {
    // Base radius calculation
    const baseRadius = config.baseRadius + (intensity * (config.maxRadius - config.baseRadius));

    // Zoom-based scaling
    const zoomScale = Math.pow(config.zoomFactor, zoomLevel - 10); // 10 is reference zoom level

    // Final radius with bounds
    const finalRadius = baseRadius * zoomScale;

    return Math.max(config.minRadius, Math.min(config.maxRadius, finalRadius));
}

// Calculate proper point opacity based on zoom level and intensity
export function calculatePointOpacity(
    intensity: number,
    zoomLevel: number,
    config: { minOpacity: number; maxOpacity: number } = { minOpacity: 0.2, maxOpacity: 1.0 }
): number {
    // Base opacity from intensity
    const baseOpacity = config.minOpacity + (intensity * (config.maxOpacity - config.minOpacity));

    // Adjust opacity based on zoom level (more opaque when zoomed in)
    const zoomOpacityFactor = Math.min(1, Math.max(0.3, (zoomLevel - 5) / 10));

    return baseOpacity * zoomOpacityFactor;
}

// Calculate cluster size for point clustering
export function calculateClusterSize(
    zoomLevel: number,
    baseClusterSize: number = 50
): number {
    // Cluster size decreases as zoom level increases
    return Math.max(20, baseClusterSize * Math.pow(0.8, zoomLevel - 5));
}

// Calculate maximum points to display based on zoom level
export function calculateMaxPoints(
    zoomLevel: number,
    baseMaxPoints: number = 1000
): number {
    // Show more points when zoomed in
    const zoomFactor = Math.pow(2, Math.max(0, zoomLevel - 5));
    return Math.min(10000, baseMaxPoints * zoomFactor);
}

// Calculate heatmap intensity based on zoom level
export function calculateHeatmapIntensity(
    baseIntensity: number,
    zoomLevel: number,
    config: { minZoom: number; maxZoom: number } = { minZoom: 1, maxZoom: 20 }
): number {
    // Normalize zoom level to 0-1 range
    const normalizedZoom = Math.max(0, Math.min(1, (zoomLevel - config.minZoom) / (config.maxZoom - config.minZoom)));

    // Intensity increases with zoom level
    return baseIntensity * (0.5 + 0.5 * normalizedZoom);
}

// Calculate point density for performance optimization
export function calculatePointDensity(
    zoomLevel: number,
    viewportBounds: { north: number; south: number; east: number; west: number }
): number {
    // Calculate viewport area
    const latRange = viewportBounds.north - viewportBounds.south;
    const lngRange = viewportBounds.east - viewportBounds.west;
    const viewportArea = latRange * lngRange;

    // Base density calculation
    const baseDensity = 1000; // points per unit area
    const zoomDensity = Math.pow(2, Math.max(0, zoomLevel - 5));

    // Adjust density based on viewport size and zoom level
    return Math.min(10000, Math.max(100, baseDensity * zoomDensity / Math.max(0.1, viewportArea)));
}

// Calculate color intensity for heatmap visualization
export function calculateColorIntensity(
    baseIntensity: number,
    zoomLevel: number,
    _maxZoom: number = 20
): number {
    // Color intensity should be more pronounced at higher zoom levels
    const zoomFactor = Math.min(2, Math.max(0.5, zoomLevel / 10));
    return Math.min(1, baseIntensity * zoomFactor);
}

// Calculate stroke width for point borders
export function calculateStrokeWidth(
    pointRadius: number,
    zoomLevel: number
): number {
    // Stroke width should be proportional to point radius and zoom level
    const baseStrokeWidth = Math.max(0.5, pointRadius * 0.1);
    const zoomStrokeFactor = Math.max(0.5, Math.min(2, zoomLevel / 10));

    return baseStrokeWidth * zoomStrokeFactor;
}

// Calculate label size for point labels
export function calculateLabelSize(
    zoomLevel: number,
    baseSize: number = 12
): number {
    // Label size increases with zoom level
    const zoomFactor = Math.max(0.5, Math.min(2, zoomLevel / 10));
    return Math.max(8, baseSize * zoomFactor);
}

// Calculate animation duration based on zoom level
export function calculateAnimationDuration(
    zoomLevel: number,
    baseDuration: number = 300
): number {
    // Faster animations at higher zoom levels
    const zoomFactor = Math.max(0.5, Math.min(1.5, 15 / zoomLevel));
    return Math.max(100, baseDuration * zoomFactor);
}

// Calculate heatmap blur radius
export function calculateBlurRadius(
    zoomLevel: number,
    baseBlur: number = 20
): number {
    // Blur radius decreases with zoom level for sharper details
    const zoomFactor = Math.max(0.3, Math.min(1, 10 / zoomLevel));
    return Math.max(5, baseBlur * zoomFactor);
}

// Calculate heatmap weight based on intensity and zoom
export function calculateHeatmapWeight(
    intensity: number,
    zoomLevel: number,
    maxWeight: number = 1.0
): number {
    // Weight increases with intensity and zoom level
    const zoomWeight = Math.min(1, Math.max(0.1, zoomLevel / 15));
    return Math.min(maxWeight, intensity * zoomWeight);
}

// Utility to get optimal rendering settings for current zoom level
export function getOptimalRenderingSettings(zoomLevel: number) {
    return {
        pointRadius: (intensity: number) => calculatePointRadius(intensity, zoomLevel),
        pointOpacity: (intensity: number) => calculatePointOpacity(intensity, zoomLevel),
        clusterSize: calculateClusterSize(zoomLevel),
        maxPoints: calculateMaxPoints(zoomLevel),
        colorIntensity: (intensity: number) => calculateColorIntensity(intensity, zoomLevel),
        strokeWidth: (radius: number) => calculateStrokeWidth(radius, zoomLevel),
        labelSize: calculateLabelSize(zoomLevel),
        animationDuration: calculateAnimationDuration(zoomLevel),
        blurRadius: calculateBlurRadius(zoomLevel),
        heatmapWeight: (intensity: number) => calculateHeatmapWeight(intensity, zoomLevel)
    };
}

// Utility to determine if clustering should be enabled
export function shouldEnableClustering(zoomLevel: number, pointCount: number): boolean {
    const clusterThreshold = calculateClusterSize(zoomLevel);
    return pointCount > clusterThreshold && zoomLevel < 12;
}

// Utility to determine if heatmap mode should be used
export function shouldUseHeatmapMode(zoomLevel: number, pointCount: number): boolean {
    return zoomLevel < 8 || pointCount > 5000;
}

// Utility to get performance-optimized settings
export function getPerformanceSettings(zoomLevel: number, pointCount: number) {
    const settings = getOptimalRenderingSettings(zoomLevel);

    return {
        ...settings,
        enableClustering: shouldEnableClustering(zoomLevel, pointCount),
        useHeatmapMode: shouldUseHeatmapMode(zoomLevel, pointCount),
        maxPoints: Math.min(settings.maxPoints, pointCount),
        pointDensity: calculatePointDensity(zoomLevel, {
            north: 90,
            south: -90,
            east: 180,
            west: -180
        })
    };
}
