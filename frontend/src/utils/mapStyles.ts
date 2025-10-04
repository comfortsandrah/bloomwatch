// Custom map styles for BloomWatch with intensity-based coloring

export interface BloomMapStyle {
    id: string;
    name: string;
    description: string;
    baseStyle: string;
    layers: any[];
}

// Generate custom map style with bloom intensity coloring
export function generateBloomMapStyle(intensityData: any): BloomMapStyle {
    return {
        id: 'bloom-custom',
        name: 'Bloom Intensity Map',
        description: 'Custom map style showing bloom intensity through terrain coloring',
        baseStyle: 'mapbox://styles/mapbox/satellite-streets-v12',
        layers: [
            {
                id: 'bloom-terrain',
                type: 'fill-extrusion',
                source: 'bloom-data',
                paint: {
                    'fill-extrusion-color': [
                        'interpolate',
                        ['linear'],
                        ['get', 'intensity'],
                        0, '#8B4513',      // Brown for dormant
                        0.2, '#DAA520',    // Gold for early growth
                        0.4, '#9ACD32',    // Yellow-green for active growth
                        0.6, '#32CD32',    // Lime green for blooming
                        0.8, '#FFD700',    // Gold for peak bloom
                        1, '#FF1493'       // Pink for maximum bloom
                    ],
                    'fill-extrusion-height': [
                        'interpolate',
                        ['linear'],
                        ['get', 'intensity'],
                        0, 0,
                        1, 100
                    ],
                    'fill-extrusion-opacity': 0.7
                }
            }
        ]
    };
}

// Generate vegetation map style
export function generateVegetationMapStyle(ndviData: any): BloomMapStyle {
    return {
        id: 'vegetation-custom',
        name: 'Vegetation Health Map',
        description: 'Custom map style showing vegetation health through terrain coloring',
        baseStyle: 'mapbox://styles/mapbox/satellite-streets-v12',
        layers: [
            {
                id: 'vegetation-terrain',
                type: 'fill-extrusion',
                source: 'vegetation-data',
                paint: {
                    'fill-extrusion-color': [
                        'interpolate',
                        ['linear'],
                        ['get', 'ndvi'],
                        0, '#8B4513',      // Brown for bare ground
                        0.2, '#DAA520',    // Gold for sparse vegetation
                        0.4, '#9ACD32',    // Yellow-green for moderate vegetation
                        0.6, '#32CD32',    // Lime green for healthy vegetation
                        0.8, '#228B22',    // Forest green for dense vegetation
                        1, '#006400'       // Dark green for maximum vegetation
                    ],
                    'fill-extrusion-height': [
                        'interpolate',
                        ['linear'],
                        ['get', 'ndvi'],
                        0, 0,
                        1, 80
                    ],
                    'fill-extrusion-opacity': 0.6
                }
            }
        ]
    };
}

// Generate climate map style
export function generateClimateMapStyle(temperatureData: any): BloomMapStyle {
    return {
        id: 'climate-custom',
        name: 'Climate Temperature Map',
        description: 'Custom map style showing temperature through terrain coloring',
        baseStyle: 'mapbox://styles/mapbox/outdoors-v12',
        layers: [
            {
                id: 'climate-terrain',
                type: 'fill-extrusion',
                source: 'climate-data',
                paint: {
                    'fill-extrusion-color': [
                        'interpolate',
                        ['linear'],
                        ['get', 'temperature'],
                        0, '#4169E1',      // Blue for cold
                        10, '#00BFFF',     // Sky blue for cool
                        20, '#32CD32',     // Green for mild
                        30, '#FFD700',     // Gold for warm
                        40, '#FF6347',     // Tomato for hot
                        50, '#DC143C'      // Crimson for very hot
                    ],
                    'fill-extrusion-height': [
                        'interpolate',
                        ['linear'],
                        ['get', 'temperature'],
                        0, 0,
                        50, 120
                    ],
                    'fill-extrusion-opacity': 0.5
                }
            }
        ]
    };
}

// Generate pollen map style
export function generatePollenMapStyle(pollenData: any): BloomMapStyle {
    return {
        id: 'pollen-custom',
        name: 'Pollen Concentration Map',
        description: 'Custom map style showing pollen concentration through terrain coloring',
        baseStyle: 'mapbox://styles/mapbox/light-v11',
        layers: [
            {
                id: 'pollen-terrain',
                type: 'fill-extrusion',
                source: 'pollen-data',
                paint: {
                    'fill-extrusion-color': [
                        'interpolate',
                        ['linear'],
                        ['get', 'concentration'],
                        0, '#F0F8FF',      // Alice blue for no pollen
                        500, '#90EE90',    // Light green for low pollen
                        1000, '#FFD700',   // Gold for medium pollen
                        1500, '#FF8C00',   // Dark orange for high pollen
                        2000, '#FF4500'    // Orange red for very high pollen
                    ],
                    'fill-extrusion-height': [
                        'interpolate',
                        ['linear'],
                        ['get', 'concentration'],
                        0, 0,
                        2000, 60
                    ],
                    'fill-extrusion-opacity': 0.4
                }
            }
        ]
    };
}

// Get map style based on active layer
export function getMapStyleForLayer(layer: string, data: any): string {
    switch (layer) {
        case 'bloom':
            return 'mapbox://styles/mapbox/satellite-streets-v12';
        case 'vegetation':
            return 'mapbox://styles/mapbox/satellite-streets-v12';
        case 'climate':
            return 'mapbox://styles/mapbox/outdoors-v12';
        case 'pollen':
            return 'mapbox://styles/mapbox/light-v11';
        default:
            return 'mapbox://styles/mapbox/satellite-streets-v12';
    }
}

// Create custom map style with intensity-based terrain coloring
export function createIntensityMapStyle(layer: string, data: any): any {
    const baseStyle = getMapStyleForLayer(layer, data);

    return {
        version: 8,
        sources: {
            'mapbox': {
                type: 'raster',
                tiles: ['https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/{z}/{x}/{y}?access_token=YOUR_TOKEN'],
                tileSize: 256
            },
            'bloom-data': {
                type: 'geojson',
                data: data
            }
        },
        layers: [
            {
                id: 'background',
                type: 'raster',
                source: 'mapbox'
            },
            {
                id: 'intensity-layer',
                type: 'fill-extrusion',
                source: 'bloom-data',
                paint: {
                    'fill-extrusion-color': [
                        'interpolate',
                        ['linear'],
                        ['get', 'intensity'],
                        0, '#8B4513',
                        0.2, '#DAA520',
                        0.4, '#9ACD32',
                        0.6, '#32CD32',
                        0.8, '#FFD700',
                        1, '#FF1493'
                    ],
                    'fill-extrusion-height': [
                        'interpolate',
                        ['linear'],
                        ['get', 'intensity'],
                        0, 0,
                        1, 100
                    ],
                    'fill-extrusion-opacity': 0.7
                }
            }
        ]
    };
}

// Utility to create grid-based intensity visualization
export function createGridIntensityStyle(data: any, gridSize: number = 0.1): any {
    // Convert point data to grid
    const grid: { [key: string]: { intensity: number; count: number; coordinates: [number, number] } } = {};

    data.features.forEach((feature: any) => {
        const [lng, lat] = feature.geometry.coordinates;
        const gridKey = `${Math.floor(lat / gridSize)}_${Math.floor(lng / gridSize)}`;

        if (!grid[gridKey]) {
            grid[gridKey] = {
                intensity: 0,
                count: 0,
                coordinates: [Math.floor(lng / gridSize) * gridSize + gridSize / 2, Math.floor(lat / gridSize) * gridSize + gridSize / 2]
            };
        }

        grid[gridKey].intensity += feature.properties.intensity;
        grid[gridKey].count += 1;
    });

    // Convert to polygons
    const polygons = Object.values(grid).map(cell => ({
        type: "Feature",
        properties: {
            intensity: cell.intensity / cell.count,
            count: cell.count
        },
        geometry: {
            type: "Polygon",
            coordinates: [[
                [cell.coordinates[0] - gridSize / 2, cell.coordinates[1] - gridSize / 2],
                [cell.coordinates[0] + gridSize / 2, cell.coordinates[1] - gridSize / 2],
                [cell.coordinates[0] + gridSize / 2, cell.coordinates[1] + gridSize / 2],
                [cell.coordinates[0] - gridSize / 2, cell.coordinates[1] + gridSize / 2],
                [cell.coordinates[0] - gridSize / 2, cell.coordinates[1] - gridSize / 2]
            ]]
        }
    }));

    return {
        type: "FeatureCollection",
        features: polygons
    };
}
