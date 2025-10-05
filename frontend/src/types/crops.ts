// Crop and vegetation type definitions for BloomWatch
// Kenya-specific agricultural data with bloom windows and NDVI thresholds

export interface BloomWindow {
  start: number; // Month (1-12)
  end: number;   // Month (1-12)
  peakMonth: number; // Month of peak bloom
}

export interface CropType {
  id: string;
  name: string;
  scientificName: string;
  bloomWindows: BloomWindow[]; // Can have multiple bloom seasons
  ndviThreshold: number; // Minimum NDVI to consider "blooming"
  peakNDVI: number; // Typical peak NDVI value
  category: 'crop' | 'tree' | 'pasture' | 'wildflower';
  description: string;
  commonRegions: string[]; // Regions in Kenya where commonly grown
  icon: string; // Emoji or icon identifier
}

export const KENYA_CROPS: Record<string, CropType> = {
  sunflower: {
    id: 'sunflower',
    name: 'Sunflower',
    scientificName: 'Helianthus annuus',
    bloomWindows: [
      { start: 1, end: 3, peakMonth: 2 } // Jan-Mar, peak in Feb
    ],
    ndviThreshold: 0.6,
    peakNDVI: 0.75,
    category: 'crop',
    description: 'Commercial sunflower cultivation with distinctive yellow blooms',
    commonRegions: ['Rift Valley', 'Western Kenya', 'Eastern Kenya'],
    icon: '🌻'
  },
  
  coffee: {
    id: 'coffee',
    name: 'Coffee',
    scientificName: 'Coffea arabica',
    bloomWindows: [
      { start: 9, end: 11, peakMonth: 10 } // Sept-Nov, peak in Oct
    ],
    ndviThreshold: 0.65,
    peakNDVI: 0.8,
    category: 'tree',
    description: 'Coffee plantations with white blooms following rains',
    commonRegions: ['Central Kenya', 'Mount Kenya Region', 'Rift Valley'],
    icon: '☕'
  },
  
  tea: {
    id: 'tea',
    name: 'Tea',
    scientificName: 'Camellia sinensis',
    bloomWindows: [
      { start: 2, end: 4, peakMonth: 3 },  // Feb-Apr
      { start: 8, end: 10, peakMonth: 9 }  // Aug-Oct
    ],
    ndviThreshold: 0.7,
    peakNDVI: 0.85,
    category: 'tree',
    description: 'Tea estates with small white flowers during rainy seasons',
    commonRegions: ['Kericho', 'Nandi Hills', 'Mount Kenya Slopes'],
    icon: '🍵'
  },
  
  maize: {
    id: 'maize',
    name: 'Maize (Corn)',
    scientificName: 'Zea mays',
    bloomWindows: [
      { start: 3, end: 5, peakMonth: 4 },  // Long rains season
      { start: 10, end: 12, peakMonth: 11 } // Short rains season
    ],
    ndviThreshold: 0.5,
    peakNDVI: 0.7,
    category: 'crop',
    description: 'Staple crop with tasseling and silking as bloom indicators',
    commonRegions: ['Rift Valley', 'Western Kenya', 'Eastern Kenya', 'Central Kenya'],
    icon: '🌽'
  },
  
  pasture: {
    id: 'pasture',
    name: 'Pasture & Grasslands',
    scientificName: 'Mixed grasses',
    bloomWindows: [
      { start: 3, end: 6, peakMonth: 4 },  // Long rains
      { start: 10, end: 12, peakMonth: 11 } // Short rains
    ],
    ndviThreshold: 0.45,
    peakNDVI: 0.65,
    category: 'pasture',
    description: 'Natural and managed grasslands responding to rainfall',
    commonRegions: ['Narok', 'Laikipia', 'Kajiado', 'Samburu'],
    icon: '🌾'
  },
  
  wildflowers: {
    id: 'wildflowers',
    name: 'Wildflowers',
    scientificName: 'Various species',
    bloomWindows: [
      { start: 3, end: 4, peakMonth: 3 },   // After long rains
      { start: 10, end: 11, peakMonth: 10 } // After short rains
    ],
    ndviThreshold: 0.55,
    peakNDVI: 0.7,
    category: 'wildflower',
    description: 'Native wildflower species blooming after rainfall',
    commonRegions: ['Nairobi National Park', 'Tsavo', 'Lake Naivasha', 'Hell\'s Gate'],
    icon: '🌺'
  },
  
  wheat: {
    id: 'wheat',
    name: 'Wheat',
    scientificName: 'Triticum aestivum',
    bloomWindows: [
      { start: 5, end: 7, peakMonth: 6 }
    ],
    ndviThreshold: 0.55,
    peakNDVI: 0.72,
    category: 'crop',
    description: 'Wheat fields with flowering heads during dry season',
    commonRegions: ['Nakuru', 'Uasin Gishu', 'Trans Nzoia'],
    icon: '🌾'
  },
  
  horticultural: {
    id: 'horticultural',
    name: 'Horticultural Crops',
    scientificName: 'Various vegetables & flowers',
    bloomWindows: [
      { start: 1, end: 12, peakMonth: 6 } // Year-round with irrigation
    ],
    ndviThreshold: 0.6,
    peakNDVI: 0.78,
    category: 'crop',
    description: 'Greenhouse and open-field vegetables, cut flowers (roses, carnations)',
    commonRegions: ['Naivasha', 'Thika', 'Kiambu', 'Mount Kenya Region'],
    icon: '🌹'
  },
  
  avocado: {
    id: 'avocado',
    name: 'Avocado',
    scientificName: 'Persea americana',
    bloomWindows: [
      { start: 8, end: 10, peakMonth: 9 }
    ],
    ndviThreshold: 0.68,
    peakNDVI: 0.82,
    category: 'tree',
    description: 'Avocado orchards with small greenish-yellow flowers',
    commonRegions: ['Central Kenya', 'Murang\'a', 'Kiambu'],
    icon: '🥑'
  },
  
  mango: {
    id: 'mango',
    name: 'Mango',
    scientificName: 'Mangifera indica',
    bloomWindows: [
      { start: 7, end: 9, peakMonth: 8 }
    ],
    ndviThreshold: 0.62,
    peakNDVI: 0.77,
    category: 'tree',
    description: 'Mango trees with panicles of small flowers',
    commonRegions: ['Coast Province', 'Lower Eastern', 'Machakos'],
    icon: '🥭'
  }
};

// Helper function to get crop by ID
export const getCropById = (id: string): CropType | undefined => {
  return KENYA_CROPS[id];
};

// Helper function to get all crops
export const getAllCrops = (): CropType[] => {
  return Object.values(KENYA_CROPS);
};

// Helper function to check if a month is within bloom window
export const isInBloomWindow = (crop: CropType, month: number): boolean => {
  return crop.bloomWindows.some(window => {
    if (window.start <= window.end) {
      // Normal case: e.g., March (3) to May (5)
      return month >= window.start && month <= window.end;
    } else {
      // Wraps around year: e.g., Nov (11) to Jan (1)
      return month >= window.start || month <= window.end;
    }
  });
};

// Helper function to get crops by category
export const getCropsByCategory = (category: CropType['category']): CropType[] => {
  return getAllCrops().filter(crop => crop.category === category);
};

// Kenya geographic center for default map view
export const KENYA_CENTER = {
  latitude: -0.0236,
  longitude: 37.9062,
  zoom: 6
};

// Kenya bounding box
export const KENYA_BOUNDS = {
  north: 5.0,
  south: -5.0,
  east: 42.0,
  west: 33.5
};
