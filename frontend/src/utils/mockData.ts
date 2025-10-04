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

// Mock heat map data for bloom detection
export const mockBloomHeatMapData = {
  type: "FeatureCollection" as const,
  features: [
    // Peak Bloom areas
    { type: "Feature" as const, properties: { intensity: 0.9, stage: "Peak Bloom", color: "#00FF7F" }, geometry: { type: "Point" as const, coordinates: [-122.4194, 37.7749] } },
    { type: "Feature" as const, properties: { intensity: 0.85, stage: "Peak Bloom", color: "#00FF7F" }, geometry: { type: "Point" as const, coordinates: [-122.4094, 37.7849] } },
    { type: "Feature" as const, properties: { intensity: 0.8, stage: "Peak Bloom", color: "#00FF7F" }, geometry: { type: "Point" as const, coordinates: [-122.4294, 37.7649] } },
    
    // Active Growth areas
    { type: "Feature" as const, properties: { intensity: 0.7, stage: "Active Growth", color: "#32CD32" }, geometry: { type: "Point" as const, coordinates: [-122.3994, 37.7949] } },
    { type: "Feature" as const, properties: { intensity: 0.65, stage: "Active Growth", color: "#32CD32" }, geometry: { type: "Point" as const, coordinates: [-122.4394, 37.7549] } },
    
    // Early Growth areas
    { type: "Feature" as const, properties: { intensity: 0.5, stage: "Early Growth", color: "#FFD700" }, geometry: { type: "Point" as const, coordinates: [-122.4144, 37.7699] } },
    { type: "Feature" as const, properties: { intensity: 0.45, stage: "Early Growth", color: "#FFD700" }, geometry: { type: "Point" as const, coordinates: [-122.4044, 37.7799] } },
    
    // Dormant areas
    { type: "Feature" as const, properties: { intensity: 0.1, stage: "Dormant", color: "#8B4513" }, geometry: { type: "Point" as const, coordinates: [-122.4244, 37.7599] } },
    { type: "Feature" as const, properties: { intensity: 0.15, stage: "Dormant", color: "#8B4513" }, geometry: { type: "Point" as const, coordinates: [-122.4344, 37.7499] } },
    
    // Forest Bloom areas
    { type: "Feature" as const, properties: { intensity: 0.75, stage: "Forest Bloom", color: "#228B22" }, geometry: { type: "Point" as const, coordinates: [-122.3944, 37.7899] } },
    { type: "Feature" as const, properties: { intensity: 0.8, stage: "Forest Bloom", color: "#228B22" }, geometry: { type: "Point" as const, coordinates: [-122.3844, 37.7999] } },
    
    // Grassland Bloom areas
    { type: "Feature" as const, properties: { intensity: 0.6, stage: "Grassland Bloom", color: "#7CFC00" }, geometry: { type: "Point" as const, coordinates: [-122.4044, 37.7649] } },
    { type: "Feature" as const, properties: { intensity: 0.55, stage: "Grassland Bloom", color: "#7CFC00" }, geometry: { type: "Point" as const, coordinates: [-122.4144, 37.7549] } },
    
    // Crop Bloom areas
    { type: "Feature" as const, properties: { intensity: 0.7, stage: "Crop Bloom", color: "#ADFF2F" }, geometry: { type: "Point" as const, coordinates: [-122.3894, 37.7699] } },
    { type: "Feature" as const, properties: { intensity: 0.65, stage: "Crop Bloom", color: "#ADFF2F" }, geometry: { type: "Point" as const, coordinates: [-122.3794, 37.7799] } },
    
    // Wetlands Bloom areas
    { type: "Feature" as const, properties: { intensity: 0.6, stage: "Wetlands Bloom", color: "#00CED1" }, geometry: { type: "Point" as const, coordinates: [-122.3944, 37.7549] } },
    { type: "Feature" as const, properties: { intensity: 0.55, stage: "Wetlands Bloom", color: "#00CED1" }, geometry: { type: "Point" as const, coordinates: [-122.3844, 37.7649] } },
  ]
};

// Mock heat map data for vegetation (NDVI)
export const mockVegetationHeatMapData = {
  type: "FeatureCollection" as const,
  features: [
    { type: "Feature" as const, properties: { ndvi: 0.9, intensity: 0.9 }, geometry: { type: "Point" as const, coordinates: [-122.4194, 37.7749] } },
    { type: "Feature" as const, properties: { ndvi: 0.8, intensity: 0.8 }, geometry: { type: "Point" as const, coordinates: [-122.4094, 37.7849] } },
    { type: "Feature" as const, properties: { ndvi: 0.7, intensity: 0.7 }, geometry: { type: "Point" as const, coordinates: [-122.4294, 37.7649] } },
    { type: "Feature" as const, properties: { ndvi: 0.6, intensity: 0.6 }, geometry: { type: "Point" as const, coordinates: [-122.3994, 37.7949] } },
    { type: "Feature" as const, properties: { ndvi: 0.5, intensity: 0.5 }, geometry: { type: "Point" as const, coordinates: [-122.4394, 37.7549] } },
    { type: "Feature" as const, properties: { ndvi: 0.4, intensity: 0.4 }, geometry: { type: "Point" as const, coordinates: [-122.4144, 37.7699] } },
    { type: "Feature" as const, properties: { ndvi: 0.3, intensity: 0.3 }, geometry: { type: "Point" as const, coordinates: [-122.4044, 37.7799] } },
    { type: "Feature" as const, properties: { ndvi: 0.2, intensity: 0.2 }, geometry: { type: "Point" as const, coordinates: [-122.4244, 37.7599] } },
    { type: "Feature" as const, properties: { ndvi: 0.1, intensity: 0.1 }, geometry: { type: "Point" as const, coordinates: [-122.4344, 37.7499] } },
  ]
};

// Mock heat map data for climate (temperature)
export const mockClimateHeatMapData = {
  type: "FeatureCollection" as const,
  features: [
    { type: "Feature" as const, properties: { temperature: 25, intensity: 0.9 }, geometry: { type: "Point" as const, coordinates: [-122.4194, 37.7749] } },
    { type: "Feature" as const, properties: { temperature: 23, intensity: 0.8 }, geometry: { type: "Point" as const, coordinates: [-122.4094, 37.7849] } },
    { type: "Feature" as const, properties: { temperature: 21, intensity: 0.7 }, geometry: { type: "Point" as const, coordinates: [-122.4294, 37.7649] } },
    { type: "Feature" as const, properties: { temperature: 19, intensity: 0.6 }, geometry: { type: "Point" as const, coordinates: [-122.3994, 37.7949] } },
    { type: "Feature" as const, properties: { temperature: 17, intensity: 0.5 }, geometry: { type: "Point" as const, coordinates: [-122.4394, 37.7549] } },
    { type: "Feature" as const, properties: { temperature: 15, intensity: 0.4 }, geometry: { type: "Point" as const, coordinates: [-122.4144, 37.7699] } },
    { type: "Feature" as const, properties: { temperature: 13, intensity: 0.3 }, geometry: { type: "Point" as const, coordinates: [-122.4044, 37.7799] } },
    { type: "Feature" as const, properties: { temperature: 11, intensity: 0.2 }, geometry: { type: "Point" as const, coordinates: [-122.4244, 37.7599] } },
    { type: "Feature" as const, properties: { temperature: 9, intensity: 0.1 }, geometry: { type: "Point" as const, coordinates: [-122.4344, 37.7499] } },
  ]
};

// Mock heat map data for pollen concentration
export const mockPollenHeatMapData = {
  type: "FeatureCollection" as const,
  features: [
    { type: "Feature" as const, properties: { concentration: 2000, intensity: 0.9, type: "Grass" }, geometry: { type: "Point" as const, coordinates: [-122.4194, 37.7749] } },
    { type: "Feature" as const, properties: { concentration: 1800, intensity: 0.8, type: "Oak" }, geometry: { type: "Point" as const, coordinates: [-122.4094, 37.7849] } },
    { type: "Feature" as const, properties: { concentration: 1600, intensity: 0.7, type: "Pine" }, geometry: { type: "Point" as const, coordinates: [-122.4294, 37.7649] } },
    { type: "Feature" as const, properties: { concentration: 1400, intensity: 0.6, type: "Birch" }, geometry: { type: "Point" as const, coordinates: [-122.3994, 37.7949] } },
    { type: "Feature" as const, properties: { concentration: 1200, intensity: 0.5, type: "Grass" }, geometry: { type: "Point" as const, coordinates: [-122.4394, 37.7549] } },
    { type: "Feature" as const, properties: { concentration: 1000, intensity: 0.4, type: "Oak" }, geometry: { type: "Point" as const, coordinates: [-122.4144, 37.7699] } },
    { type: "Feature" as const, properties: { concentration: 800, intensity: 0.3, type: "Pine" }, geometry: { type: "Point" as const, coordinates: [-122.4044, 37.7799] } },
    { type: "Feature" as const, properties: { concentration: 600, intensity: 0.2, type: "Birch" }, geometry: { type: "Point" as const, coordinates: [-122.4244, 37.7599] } },
    { type: "Feature" as const, properties: { concentration: 400, intensity: 0.1, type: "Grass" }, geometry: { type: "Point" as const, coordinates: [-122.4344, 37.7499] } },
  ]
};

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
