// Mock data for BloomWatch development and testing

export const mockNDVIData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        ndvi: 0.8,
        date: "2025-01-15",
        bloomIntensity: "Peak Bloom"
      },
      geometry: {
        type: "Point",
        coordinates: [-122.4194, 37.7749] // San Francisco
      }
    },
    {
      type: "Feature",
      properties: {
        ndvi: 0.4,
        date: "2025-01-15",
        bloomIntensity: "Early Growth"
      },
      geometry: {
        type: "Point",
        coordinates: [-122.4094, 37.7849] // San Francisco area
      }
    },
    {
      type: "Feature",
      properties: {
        ndvi: 0.9,
        date: "2025-01-15",
        bloomIntensity: "Peak Bloom"
      },
      geometry: {
        type: "Point",
        coordinates: [-122.4294, 37.7649] // San Francisco area
      }
    },
    {
      type: "Feature",
      properties: {
        ndvi: 0.2,
        date: "2025-01-15",
        bloomIntensity: "Dormant"
      },
      geometry: {
        type: "Point",
        coordinates: [-122.4394, 37.7549] // San Francisco area
      }
    },
    {
      type: "Feature",
      properties: {
        ndvi: 0.6,
        date: "2025-01-15",
        bloomIntensity: "Blooming"
      },
      geometry: {
        type: "Point",
        coordinates: [-122.3994, 37.7949] // San Francisco area
      }
    }
  ]
};

export const mockPollenData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        pollenCount: 1200,
        pollenType: "Oak",
        intensity: "High",
        date: "2025-01-15"
      },
      geometry: {
        type: "Point",
        coordinates: [-122.4194, 37.7849] // San Francisco
      }
    },
    {
      type: "Feature",
      properties: {
        pollenCount: 800,
        pollenType: "Pine",
        intensity: "Medium",
        date: "2025-01-15"
      },
      geometry: {
        type: "Point",
        coordinates: [-122.4094, 37.7749] // San Francisco area
      }
    },
    {
      type: "Feature",
      properties: {
        pollenCount: 2000,
        pollenType: "Grass",
        intensity: "Very High",
        date: "2025-01-15"
      },
      geometry: {
        type: "Point",
        coordinates: [-122.4294, 37.7549] // San Francisco area
      }
    },
    {
      type: "Feature",
      properties: {
        pollenCount: 400,
        pollenType: "Birch",
        intensity: "Low",
        date: "2025-01-15"
      },
      geometry: {
        type: "Point",
        coordinates: [-122.3994, 37.7649] // San Francisco area
      }
    }
  ]
};

export const mockLandCoverData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        landCover: "Deciduous Forest",
        cropType: "Oak Woodland",
        bloomPotential: "High"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-122.43, 37.77],
          [-122.40, 37.77],
          [-122.40, 37.79],
          [-122.43, 37.79],
          [-122.43, 37.77]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        landCover: "Grassland",
        cropType: "Native Grass",
        bloomPotential: "Medium"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-122.42, 37.75],
          [-122.39, 37.75],
          [-122.39, 37.77],
          [-122.42, 37.77],
          [-122.42, 37.75]
        ]]
      }
    }
  ]
};

// Global bloom heatmap data covering the entire world
export const mockBloomHeatMapData = {
  type: "FeatureCollection" as const,
  features: generateGlobalBloomData()
};


// Function to generate global bloom data with realistic patterns
function generateGlobalBloomData() {
  const features: any[] = [];

  // Define major bloom regions around the world
  const bloomRegions = [
    // North America
    { lat: 40.7128, lng: -74.0060, radius: 0.8, intensity: 0.8, name: "New York Area" },
    { lat: 34.0522, lng: -118.2437, radius: 0.6, intensity: 0.9, name: "Los Angeles" },
    { lat: 41.8781, lng: -87.6298, radius: 0.5, intensity: 0.7, name: "Chicago" },
    { lat: 29.7604, lng: -95.3698, radius: 0.7, intensity: 0.8, name: "Houston" },
    { lat: 25.7617, lng: -80.1918, radius: 0.6, intensity: 0.9, name: "Miami" },
    { lat: 45.5152, lng: -122.6784, radius: 0.5, intensity: 0.6, name: "Portland" },
    { lat: 37.7749, lng: -122.4194, radius: 0.6, intensity: 0.8, name: "San Francisco" },
    { lat: 47.6062, lng: -122.3321, radius: 0.4, intensity: 0.5, name: "Seattle" },

    // Europe
    { lat: 51.5074, lng: -0.1278, radius: 0.5, intensity: 0.6, name: "London" },
    { lat: 48.8566, lng: 2.3522, radius: 0.6, intensity: 0.7, name: "Paris" },
    { lat: 52.5200, lng: 13.4050, radius: 0.5, intensity: 0.6, name: "Berlin" },
    { lat: 41.9028, lng: 12.4964, radius: 0.6, intensity: 0.8, name: "Rome" },
    { lat: 40.4168, lng: -3.7038, radius: 0.5, intensity: 0.7, name: "Madrid" },
    { lat: 55.7558, lng: 37.6176, radius: 0.4, intensity: 0.4, name: "Moscow" },
    { lat: 59.9311, lng: 10.7579, radius: 0.3, intensity: 0.3, name: "Oslo" },
    { lat: 60.1699, lng: 24.9384, radius: 0.3, intensity: 0.3, name: "Helsinki" },

    // Asia
    { lat: 35.6762, lng: 139.6503, radius: 0.7, intensity: 0.8, name: "Tokyo" },
    { lat: 37.5665, lng: 126.9780, radius: 0.6, intensity: 0.7, name: "Seoul" },
    { lat: 39.9042, lng: 116.4074, radius: 0.5, intensity: 0.5, name: "Beijing" },
    { lat: 31.2304, lng: 121.4737, radius: 0.6, intensity: 0.7, name: "Shanghai" },
    { lat: 22.3193, lng: 114.1694, radius: 0.4, intensity: 0.6, name: "Hong Kong" },
    { lat: 1.3521, lng: 103.8198, radius: 0.5, intensity: 0.9, name: "Singapore" },
    { lat: 19.0760, lng: 72.8777, radius: 0.6, intensity: 0.8, name: "Mumbai" },
    { lat: 28.7041, lng: 77.1025, radius: 0.5, intensity: 0.6, name: "Delhi" },
    { lat: 12.9716, lng: 77.5946, radius: 0.4, intensity: 0.7, name: "Bangalore" },
    { lat: 13.0827, lng: 80.2707, radius: 0.4, intensity: 0.6, name: "Chennai" },

    // Africa
    { lat: -26.2041, lng: 28.0473, radius: 0.4, intensity: 0.5, name: "Johannesburg" },
    { lat: -33.9249, lng: 18.4241, radius: 0.4, intensity: 0.6, name: "Cape Town" },
    { lat: 6.5244, lng: 3.3792, radius: 0.5, intensity: 0.8, name: "Lagos" },
    { lat: -1.2921, lng: 36.8219, radius: 0.4, intensity: 0.6, name: "Nairobi" },
    { lat: 30.0444, lng: 31.2357, radius: 0.3, intensity: 0.3, name: "Cairo" },
    { lat: 14.6937, lng: -17.4441, radius: 0.3, intensity: 0.4, name: "Dakar" },

    // South America
    { lat: -23.5505, lng: -46.6333, radius: 0.6, intensity: 0.8, name: "São Paulo" },
    { lat: -22.9068, lng: -43.1729, radius: 0.5, intensity: 0.7, name: "Rio de Janeiro" },
    { lat: -34.6118, lng: -58.3960, radius: 0.4, intensity: 0.6, name: "Buenos Aires" },
    { lat: -12.0464, lng: -77.0428, radius: 0.3, intensity: 0.4, name: "Lima" },
    { lat: 4.7110, lng: -74.0721, radius: 0.4, intensity: 0.7, name: "Bogotá" },
    { lat: -33.4489, lng: -70.6693, radius: 0.3, intensity: 0.5, name: "Santiago" },

    // Australia & Oceania
    { lat: -33.8688, lng: 151.2093, radius: 0.5, intensity: 0.7, name: "Sydney" },
    { lat: -37.8136, lng: 144.9631, radius: 0.5, intensity: 0.6, name: "Melbourne" },
    { lat: -27.4698, lng: 153.0251, radius: 0.4, intensity: 0.8, name: "Brisbane" },
    { lat: -31.9505, lng: 115.8605, radius: 0.3, intensity: 0.5, name: "Perth" },
    { lat: -34.9285, lng: 138.6007, radius: 0.3, intensity: 0.4, name: "Adelaide" },
    { lat: -36.8485, lng: 174.7633, radius: 0.3, intensity: 0.6, name: "Auckland" }
  ];

  // Generate data points for each region
  bloomRegions.forEach(region => {
    const pointsPerRegion = Math.floor(region.radius * 100); // Scale points by region size
    const gridSize = Math.ceil(Math.sqrt(pointsPerRegion));
    const step = (region.radius * 2) / gridSize;

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const lat = region.lat + (i * step) - region.radius;
        const lng = region.lng + (j * step) - region.radius;

        // Skip if outside valid lat/lng bounds
        if (lat < -90 || lat > 90 || lng < -180 || lng > 180) continue;

        // Calculate distance from region center
        const distanceFromCenter = Math.sqrt(
          Math.pow(lat - region.lat, 2) + Math.pow(lng - region.lng, 2)
        );

        // Skip if outside region radius
        if (distanceFromCenter > region.radius) continue;

        // Calculate bloom intensity based on distance and season
        const normalizedDistance = distanceFromCenter / region.radius;
        const seasonalFactor = getSeasonalFactor(lat, new Date());
        const baseIntensity = region.intensity * (1 - normalizedDistance * 0.7);
        const intensity = Math.max(0, Math.min(1, baseIntensity * seasonalFactor + (Math.random() - 0.5) * 0.2));

        // Determine bloom stage
        const stage = getBloomStage(intensity);
        const color = getBloomColor(stage);
        const species = getRandomSpecies(stage, lat);

        features.push({
          type: "Feature" as const,
          properties: {
            intensity: Math.round(intensity * 100) / 100,
            stage,
            color,
            ndvi: intensity * 0.9 + 0.1,
            bloomDensity: Math.round(intensity * 1000),
            species,
            region: region.name,
            latitude: Math.round(lat * 100) / 100,
            longitude: Math.round(lng * 100) / 100,
            // Add scaling properties for proper visualization
            radius: getPointRadius(intensity),
            opacity: getPointOpacity(intensity)
          },
          geometry: {
            type: "Point" as const,
            coordinates: [lng, lat]
          }
        });
      }
    }
  });

  return features;
}

// Helper function to get seasonal factor based on latitude and date
function getSeasonalFactor(lat: number, date: Date): number {
  const month = date.getMonth() + 1; // 1-12

  // Northern hemisphere bloom season (March-July)
  if (lat > 0) {
    if (month >= 3 && month <= 7) {
      return 0.8 + 0.2 * Math.sin((month - 3) * Math.PI / 4);
    } else {
      return 0.2 + 0.1 * Math.random();
    }
  }
  // Southern hemisphere bloom season (September-January)
  else if (lat < 0) {
    if (month >= 9 || month <= 1) {
      return 0.8 + 0.2 * Math.sin(((month + 3) % 12) * Math.PI / 4);
    } else {
      return 0.2 + 0.1 * Math.random();
    }
  }
  // Equatorial regions (year-round with variations)
  else {
    return 0.6 + 0.3 * Math.sin(month * Math.PI / 6);
  }
}

// Helper function to get bloom stage based on intensity
function getBloomStage(intensity: number): string {
  if (intensity > 0.8) return "Peak Bloom";
  if (intensity > 0.6) return "Active Growth";
  if (intensity > 0.4) return "Early Growth";
  if (intensity > 0.2) return "Dormant";
  return "Dormant";
}

// Helper function to get bloom color based on stage
function getBloomColor(stage: string): string {
  const colors = {
    "Peak Bloom": "#FF1493",
    "Active Growth": "#32CD32",
    "Early Growth": "#FFD700",
    "Dormant": "#8B4513"
  };
  return colors[stage as keyof typeof colors] || "#696969";
}

// Helper function to get species based on stage and latitude
function getRandomSpecies(stage: string, lat: number): string {
  const speciesByLatitude = {
    tropical: ["Orchid", "Hibiscus", "Bougainvillea", "Frangipani", "Bird of Paradise"],
    temperate: ["Cherry Blossom", "Apple", "Plum", "Magnolia", "Dogwood"],
    boreal: ["Pine", "Cedar", "Spruce", "Fir", "Hemlock"]
  };

  let region: keyof typeof speciesByLatitude;
  if (Math.abs(lat) < 23.5) region = "tropical";
  else if (Math.abs(lat) < 60) region = "temperate";
  else region = "boreal";

  const species = speciesByLatitude[region];

  // Filter species based on bloom stage for more realistic results
  if (stage === "Dormant") {
    return species.filter(s => ["Pine", "Cedar", "Spruce", "Fir", "Hemlock"].includes(s))[0] || species[0];
  }

  return species[Math.floor(Math.random() * species.length)];
}

// Helper function to get point radius for proper scaling
function getPointRadius(intensity: number): number {
  // Base radius that scales with intensity
  return Math.max(2, Math.min(20, 5 + intensity * 15));
}

// Helper function to get point opacity for proper scaling
function getPointOpacity(intensity: number): number {
  // Opacity that scales with intensity
  return Math.max(0.3, Math.min(1, 0.5 + intensity * 0.5));
}


// Global vegetation heatmap data covering the entire world
export const mockVegetationHeatMapData = {
  type: "FeatureCollection" as const,
  features: generateGlobalVegetationData()
};

// Global vegetation GeoJSON data with polygon features
export const mockVegetationGeoJSON = {
  type: "FeatureCollection" as const,
  features: generateVegetationPolygons()
};

// Function to generate global vegetation data with realistic patterns
function generateGlobalVegetationData() {
  const features: any[] = [];

  // Define major vegetation regions around the world
  const vegetationRegions = [
    // North American forests
    { lat: 45.0, lng: -100.0, radius: 2.0, ndvi: 0.8, type: "Boreal Forest", name: "Canadian Boreal" },
    { lat: 40.0, lng: -80.0, radius: 1.5, ndvi: 0.7, type: "Deciduous Forest", name: "Eastern US Forest" },
    { lat: 35.0, lng: -120.0, radius: 1.0, ndvi: 0.6, type: "Mediterranean", name: "California Coast" },
    { lat: 30.0, lng: -90.0, radius: 1.2, ndvi: 0.8, type: "Subtropical Forest", name: "Southeast US" },

    // European forests
    { lat: 50.0, lng: 10.0, radius: 1.0, ndvi: 0.6, type: "Temperate Forest", name: "Central Europe" },
    { lat: 60.0, lng: 20.0, radius: 1.5, ndvi: 0.7, type: "Boreal Forest", name: "Scandinavian Forest" },
    { lat: 45.0, lng: 5.0, radius: 0.8, ndvi: 0.5, type: "Mediterranean", name: "Mediterranean Basin" },

    // Asian forests
    { lat: 50.0, lng: 120.0, radius: 2.0, ndvi: 0.8, type: "Boreal Forest", name: "Siberian Taiga" },
    { lat: 35.0, lng: 140.0, radius: 0.8, ndvi: 0.7, type: "Temperate Forest", name: "Japanese Forest" },
    { lat: 20.0, lng: 100.0, radius: 1.5, ndvi: 0.9, type: "Tropical Rainforest", name: "Southeast Asia" },
    { lat: 10.0, lng: 80.0, radius: 1.0, ndvi: 0.8, type: "Tropical Forest", name: "Indian Subcontinent" },

    // African vegetation
    { lat: 0.0, lng: 20.0, radius: 2.0, ndvi: 0.9, type: "Tropical Rainforest", name: "Congo Basin" },
    { lat: -5.0, lng: 15.0, radius: 1.5, ndvi: 0.8, type: "Tropical Forest", name: "West Africa" },
    { lat: -20.0, lng: 30.0, radius: 1.0, ndvi: 0.6, type: "Savanna", name: "Southern Africa" },
    { lat: 10.0, lng: 40.0, radius: 1.2, ndvi: 0.7, type: "Tropical Forest", name: "East Africa" },

    // South American forests
    { lat: -5.0, lng: -60.0, radius: 2.5, ndvi: 0.9, type: "Tropical Rainforest", name: "Amazon Basin" },
    { lat: -15.0, lng: -45.0, radius: 1.0, ndvi: 0.7, type: "Tropical Forest", name: "Brazilian Atlantic" },
    { lat: -35.0, lng: -60.0, radius: 0.8, ndvi: 0.5, type: "Temperate Forest", name: "Patagonian Forest" },

    // Australian vegetation
    { lat: -15.0, lng: 130.0, radius: 1.5, ndvi: 0.8, type: "Tropical Forest", name: "Northern Australia" },
    { lat: -35.0, lng: 150.0, radius: 1.0, ndvi: 0.6, type: "Temperate Forest", name: "Southeast Australia" },
    { lat: -25.0, lng: 120.0, radius: 1.2, ndvi: 0.4, type: "Desert", name: "Australian Outback" }
  ];

  // Generate data points for each region
  vegetationRegions.forEach(region => {
    const pointsPerRegion = Math.floor(region.radius * 50); // Scale points by region size
    const gridSize = Math.ceil(Math.sqrt(pointsPerRegion));
    const step = (region.radius * 2) / gridSize;

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const lat = region.lat + (i * step) - region.radius;
        const lng = region.lng + (j * step) - region.radius;

        // Skip if outside valid lat/lng bounds
        if (lat < -90 || lat > 90 || lng < -180 || lng > 180) continue;

        // Calculate distance from region center
        const distanceFromCenter = Math.sqrt(
          Math.pow(lat - region.lat, 2) + Math.pow(lng - region.lng, 2)
        );

        // Skip if outside region radius
        if (distanceFromCenter > region.radius) continue;

        // Calculate NDVI based on distance and vegetation type
        const normalizedDistance = distanceFromCenter / region.radius;
        const seasonalFactor = getVegetationSeasonalFactor(lat, new Date());
        const baseNDVI = region.ndvi * (1 - normalizedDistance * 0.5);
        const ndvi = Math.max(0, Math.min(1, baseNDVI * seasonalFactor + (Math.random() - 0.5) * 0.1));

        // Determine vegetation type based on NDVI and latitude
        const vegetationType = getVegetationType(ndvi, lat);
        const healthIndex = Math.round(ndvi * 100);
        const biomass = Math.round(ndvi * 1000);

        features.push({
          type: "Feature" as const,
          properties: {
            ndvi: Math.round(ndvi * 100) / 100,
            intensity: Math.round(ndvi * 100) / 100,
            vegetationType,
            healthIndex,
            biomass,
            region: region.name,
            latitude: Math.round(lat * 100) / 100,
            longitude: Math.round(lng * 100) / 100,
            // Add scaling properties
            radius: getVegetationPointRadius(ndvi),
            opacity: getVegetationPointOpacity(ndvi)
          },
          geometry: {
            type: "Point" as const,
            coordinates: [lng, lat]
          }
        });
      }
    }
  });

  return features;
}

// Helper function to get vegetation seasonal factor
function getVegetationSeasonalFactor(lat: number, date: Date): number {
  const month = date.getMonth() + 1;
  const absLat = Math.abs(lat);

  // Tropical regions (year-round vegetation)
  if (absLat < 23.5) {
    return 0.8 + 0.2 * Math.sin(month * Math.PI / 6);
  }
  // Temperate regions (seasonal variation)
  else if (absLat < 60) {
    if (lat > 0) {
      // Northern hemisphere
      return 0.6 + 0.4 * Math.sin((month - 3) * Math.PI / 6);
    } else {
      // Southern hemisphere
      return 0.6 + 0.4 * Math.sin(((month + 3) % 12) * Math.PI / 6);
    }
  }
  // Boreal regions (strong seasonal variation)
  else {
    if (lat > 0) {
      return 0.3 + 0.7 * Math.sin((month - 3) * Math.PI / 6);
    } else {
      return 0.3 + 0.7 * Math.sin(((month + 3) % 12) * Math.PI / 6);
    }
  }
}

// Helper function to get vegetation type based on NDVI and latitude
function getVegetationType(ndvi: number, lat: number): string {
  const absLat = Math.abs(lat);

  if (ndvi > 0.8) {
    if (absLat < 23.5) return "Tropical Rainforest";
    if (absLat < 60) return "Dense Forest";
    return "Boreal Forest";
  } else if (ndvi > 0.6) {
    if (absLat < 23.5) return "Tropical Forest";
    if (absLat < 60) return "Temperate Forest";
    return "Mixed Forest";
  } else if (ndvi > 0.4) {
    return "Grassland";
  } else if (ndvi > 0.2) {
    return "Sparse Vegetation";
  } else {
    return "Desert/Bare";
  }
}

// Helper function to get vegetation point radius
function getVegetationPointRadius(ndvi: number): number {
  return Math.max(1, Math.min(15, 3 + ndvi * 12));
}

// Helper function to get vegetation point opacity
function getVegetationPointOpacity(ndvi: number): number {
  return Math.max(0.2, Math.min(1, 0.4 + ndvi * 0.6));
}

// Function to generate vegetation polygon data for GeoJSON visualization
function generateVegetationPolygons() {
  const features: any[] = [];

  // Define major vegetation regions as polygons
  const vegetationRegions = [
    // North American forests
    {
      name: "Canadian Boreal Forest",
      coordinates: [[-140, 50], [-100, 50], [-100, 70], [-140, 70], [-140, 50]],
      ndvi: 0.8,
      type: "Boreal Forest"
    },
    {
      name: "Eastern US Forest",
      coordinates: [[-85, 35], [-70, 35], [-70, 45], [-85, 45], [-85, 35]],
      ndvi: 0.7,
      type: "Deciduous Forest"
    },
    {
      name: "California Coast",
      coordinates: [[-125, 32], [-118, 32], [-118, 38], [-125, 38], [-125, 32]],
      ndvi: 0.6,
      type: "Mediterranean"
    },
    {
      name: "Southeast US",
      coordinates: [[-95, 25], [-75, 25], [-75, 35], [-95, 35], [-95, 25]],
      ndvi: 0.8,
      type: "Subtropical Forest"
    },

    // European forests
    {
      name: "Scandinavian Forest",
      coordinates: [[5, 55], [25, 55], [25, 70], [5, 70], [5, 55]],
      ndvi: 0.7,
      type: "Boreal Forest"
    },
    {
      name: "Central European Forest",
      coordinates: [[8, 45], [20, 45], [20, 55], [8, 55], [8, 45]],
      ndvi: 0.6,
      type: "Temperate Forest"
    },

    // Asian forests
    {
      name: "Siberian Taiga",
      coordinates: [[60, 50], [140, 50], [140, 70], [60, 70], [60, 50]],
      ndvi: 0.8,
      type: "Boreal Forest"
    },
    {
      name: "Southeast Asian Forest",
      coordinates: [[95, 0], [120, 0], [120, 15], [95, 15], [95, 0]],
      ndvi: 0.9,
      type: "Tropical Rainforest"
    },

    // African vegetation
    {
      name: "Congo Basin",
      coordinates: [[15, -5], [30, -5], [30, 5], [15, 5], [15, -5]],
      ndvi: 0.9,
      type: "Tropical Rainforest"
    },
    {
      name: "West African Forest",
      coordinates: [[-15, 5], [5, 5], [5, 15], [-15, 15], [-15, 5]],
      ndvi: 0.8,
      type: "Tropical Forest"
    },
    {
      name: "Southern African Savanna",
      coordinates: [[15, -30], [35, -30], [35, -15], [15, -15], [15, -30]],
      ndvi: 0.6,
      type: "Savanna"
    },

    // South American forests
    {
      name: "Amazon Rainforest",
      coordinates: [[-75, -10], [-50, -10], [-50, 5], [-75, 5], [-75, -10]],
      ndvi: 0.9,
      type: "Tropical Rainforest"
    },
    {
      name: "Atlantic Forest",
      coordinates: [[-50, -25], [-40, -25], [-40, -15], [-50, -15], [-50, -25]],
      ndvi: 0.8,
      type: "Tropical Forest"
    },

    // Australian vegetation
    {
      name: "Northern Australia",
      coordinates: [[120, -20], [140, -20], [140, -10], [120, -10], [120, -20]],
      ndvi: 0.8,
      type: "Tropical Forest"
    },
    {
      name: "Southeast Australia",
      coordinates: [[140, -40], [155, -40], [155, -30], [140, -30], [140, -40]],
      ndvi: 0.6,
      type: "Temperate Forest"
    }
  ];

  vegetationRegions.forEach(region => {
    features.push({
      type: "Feature" as const,
      properties: {
        ndvi: region.ndvi,
        vegetationType: region.type,
        name: region.name,
        healthIndex: Math.round(region.ndvi * 100),
        biomass: Math.round(region.ndvi * 1000)
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [region.coordinates]
      }
    });
  });

  return features;
}

// Enhanced mock heat map data for climate (temperature) with intensive data points
export const mockClimateHeatMapData = {
  type: "FeatureCollection" as const,
  features: generateClimateHeatMapData()
};

// Function to generate intensive climate heatmap data
function generateClimateHeatMapData() {
  const features = [];
  const centerLat = 37.7749;
  const centerLng = -122.4194;
  const radius = 0.05;

  const gridSize = 20; // 20x20 grid = 400 points
  const step = (radius * 2) / gridSize;

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const lat = centerLat + (i * step) - radius;
      const lng = centerLng + (j * step) - radius;

      // Create realistic temperature patterns
      const distanceFromCenter = Math.sqrt(
        Math.pow(lat - centerLat, 2) + Math.pow(lng - centerLng, 2)
      );

      // Simulate urban heat island effect and elevation
      let temperature, intensity, climateZone;

      if (distanceFromCenter < 0.01) {
        // Urban heat island - warmer
        temperature = 22 + Math.random() * 4;
        intensity = (temperature - 10) / 20; // Normalize to 0-1
        climateZone = "Urban Heat Island";
      } else if (distanceFromCenter < 0.02) {
        // Suburban - moderate
        temperature = 18 + Math.random() * 4;
        intensity = (temperature - 10) / 20;
        climateZone = "Suburban";
      } else if (distanceFromCenter < 0.03) {
        // Rural - cooler
        temperature = 15 + Math.random() * 3;
        intensity = (temperature - 10) / 20;
        climateZone = "Rural";
      } else if (distanceFromCenter < 0.04) {
        // Forest - coolest
        temperature = 12 + Math.random() * 3;
        intensity = (temperature - 10) / 20;
        climateZone = "Forest";
      } else {
        // Coastal - moderate with sea breeze
        temperature = 16 + Math.random() * 2;
        intensity = (temperature - 10) / 20;
        climateZone = "Coastal";
      }

      // Add realistic microclimate variations
      temperature += (Math.random() - 0.5) * 2;
      intensity = Math.max(0, Math.min(1, (temperature - 10) / 20));

      features.push({
        type: "Feature" as const,
        properties: {
          temperature: Math.round(temperature * 10) / 10,
          intensity: Math.round(intensity * 100) / 100,
          climateZone,
          humidity: Math.round((60 + Math.random() * 30) * 10) / 10,
          windSpeed: Math.round((5 + Math.random() * 15) * 10) / 10,
          pressure: Math.round((1010 + Math.random() * 20) * 10) / 10
        },
        geometry: {
          type: "Point" as const,
          coordinates: [lng, lat]
        }
      });
    }
  }

  return features;
}

// Enhanced mock heat map data for pollen concentration with intensive data points
export const mockPollenHeatMapData = {
  type: "FeatureCollection" as const,
  features: generatePollenHeatMapData()
};

// Function to generate intensive pollen heatmap data
function generatePollenHeatMapData() {
  const features = [];
  const centerLat = 37.7749;
  const centerLng = -122.4194;
  const radius = 0.05;

  const gridSize = 22; // 22x22 grid = 484 points
  const step = (radius * 2) / gridSize;

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const lat = centerLat + (i * step) - radius;
      const lng = centerLng + (j * step) - radius;

      // Create realistic pollen distribution patterns
      const distanceFromCenter = Math.sqrt(
        Math.pow(lat - centerLat, 2) + Math.pow(lng - centerLng, 2)
      );

      // Simulate different pollen source zones
      let concentration, intensity, pollenType, sourceType;

      if (distanceFromCenter < 0.012) {
        // High pollen source area (parks, gardens)
        concentration = 1500 + Math.random() * 1000;
        intensity = concentration / 3000; // Normalize to 0-1
        pollenType = getRandomPollenType("high");
        sourceType = "Urban Gardens";
      } else if (distanceFromCenter < 0.025) {
        // Medium pollen area (mixed vegetation)
        concentration = 800 + Math.random() * 700;
        intensity = concentration / 3000;
        pollenType = getRandomPollenType("medium");
        sourceType = "Mixed Vegetation";
      } else if (distanceFromCenter < 0.035) {
        // Forest pollen area
        concentration = 400 + Math.random() * 600;
        intensity = concentration / 3000;
        pollenType = getRandomPollenType("forest");
        sourceType = "Forest";
      } else if (distanceFromCenter < 0.045) {
        // Low pollen area (urban)
        concentration = 100 + Math.random() * 300;
        intensity = concentration / 3000;
        pollenType = getRandomPollenType("low");
        sourceType = "Urban";
      } else {
        // Very low pollen area (water, bare ground)
        concentration = Math.random() * 200;
        intensity = concentration / 3000;
        pollenType = "None";
        sourceType = "Water/Bare";
      }

      // Add wind dispersal effects
      intensity += (Math.random() - 0.5) * 0.1;
      intensity = Math.max(0, Math.min(1, intensity));

      features.push({
        type: "Feature" as const,
        properties: {
          concentration: Math.round(concentration),
          intensity: Math.round(intensity * 100) / 100,
          type: pollenType,
          sourceType,
          allergenLevel: getAllergenLevel(concentration),
          dispersalRate: Math.round((5 + Math.random() * 15) * 10) / 10
        },
        geometry: {
          type: "Point" as const,
          coordinates: [lng, lat]
        }
      });
    }
  }

  return features;
}

// Helper function to get random pollen type based on concentration
function getRandomPollenType(level: string): string {
  const pollenMap = {
    "high": ["Oak", "Grass", "Ragweed", "Birch", "Maple"],
    "medium": ["Pine", "Cedar", "Elm", "Ash", "Willow"],
    "forest": ["Pine", "Cedar", "Spruce", "Fir", "Hemlock"],
    "low": ["Grass", "Weed", "Mold", "Dust", "None"]
  };

  const types = pollenMap[level as keyof typeof pollenMap] || ["Unknown"];
  return types[Math.floor(Math.random() * types.length)];
}

// Helper function to determine allergen level
function getAllergenLevel(concentration: number): string {
  if (concentration > 1500) return "Very High";
  if (concentration > 1000) return "High";
  if (concentration > 500) return "Medium";
  if (concentration > 100) return "Low";
  return "Very Low";
}

// Time series data for animation
export const mockTimeSeriesData = {
  "2025-01-01": { avgNDVI: 0.3, bloomStatus: "Dormant" },
  "2025-02-01": { avgNDVI: 0.4, bloomStatus: "Early Growth" },
  "2025-03-01": { avgNDVI: 0.6, bloomStatus: "Blooming" },
  "2025-04-01": { avgNDVI: 0.8, bloomStatus: "Peak Bloom" },
  "2025-05-01": { avgNDVI: 0.9, bloomStatus: "Peak Bloom" },
  "2025-06-01": { avgNDVI: 0.7, bloomStatus: "Decline" },
  "2025-07-01": { avgNDVI: 0.5, bloomStatus: "Senescence" },
  "2025-08-01": { avgNDVI: 0.4, bloomStatus: "Dormant" },
  "2025-09-01": { avgNDVI: 0.3, bloomStatus: "Dormant" },
  "2025-10-01": { avgNDVI: 0.2, bloomStatus: "Dormant" },
  "2025-11-01": { avgNDVI: 0.2, bloomStatus: "Dormant" },
  "2025-12-01": { avgNDVI: 0.3, bloomStatus: "Dormant" }
};
