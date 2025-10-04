import chroma from 'chroma-js';

// Enhanced NDVI/Bloom intensity color scale (perceptually uniform)
export const bloomScale = chroma
  .scale(['#8B4513', '#DAA520', '#9ACD32', '#32CD32', '#FFD700', '#FF69B4', '#FF1493'])
  .domain([0, 0.2, 0.4, 0.6, 0.8, 0.9, 1])
  .mode('lab'); // Use LAB color space for better perceptual uniformity

// Enhanced pollen intensity color scale
export const pollenScale = chroma
  .scale(['#F0F8FF', '#90EE90', '#FFD700', '#FF8C00', '#FF4500', '#DC143C'])
  .domain([0, 200, 500, 1000, 1500, 2000])
  .mode('lab');

// Temperature color scale (blue to red)
export const temperatureScale = chroma
  .scale(['#4169E1', '#00BFFF', '#32CD32', '#FFD700', '#FF6347', '#DC143C'])
  .domain([0, 10, 20, 30, 40, 50])
  .mode('lab');

// Vegetation health scale (brown to green)
export const vegetationHealthScale = chroma
  .scale(['#8B4513', '#DAA520', '#9ACD32', '#32CD32', '#228B22'])
  .domain([0, 0.25, 0.5, 0.75, 1])
  .mode('lab');

// Land cover type colors
export const landCoverColors = {
  'Deciduous Forest': '#228B22',
  'Grassland': '#9ACD32',
  'Crop Land': '#DAA520',
  'Urban': '#696969',
  'Water': '#4169E1',
  'Wetland': '#20B2AA'
};

// Bloom status colors
export const bloomStatusColors = {
  'Dormant': '#A0A0A0',
  'Early Growth': '#9ACD32',
  'Blooming': '#FFD700',
  'Peak Bloom': '#FF69B4',
  'Decline': '#FFA500',
  'Senescence': '#8B4513'
};

// Get color for NDVI value
export const getNDVIColor = (ndvi: number): string => {
  return bloomScale(ndvi).hex();
};

// Get color for pollen count
export const getPollenColor = (count: number): string => {
  return pollenScale(Math.min(count, 2000)).hex();
};

// Get color for land cover type
export const getLandCoverColor = (landCover: string): string => {
  return landCoverColors[landCover as keyof typeof landCoverColors] || '#CCCCCC';
};

// Get color for bloom status
export const getBloomStatusColor = (status: string): string => {
  return bloomStatusColors[status as keyof typeof bloomStatusColors] || '#CCCCCC';
};

// Get color for temperature value
export const getTemperatureColor = (temp: number): string => {
  return temperatureScale(Math.max(0, Math.min(50, temp))).hex();
};

// Get color for vegetation health
export const getVegetationHealthColor = (health: number): string => {
  return vegetationHealthScale(Math.max(0, Math.min(1, health))).hex();
};

// Enhanced color mapping utilities
export const colorMappingUtils = {
  // Get color with opacity for heatmap overlays
  getColorWithOpacity: (color: string, opacity: number): string => {
    return chroma(color).alpha(opacity).css();
  },

  // Get contrasting text color (black or white)
  getContrastingTextColor: (backgroundColor: string): string => {
    const luminance = chroma(backgroundColor).luminance();
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  },

  // Generate color palette for categorical data
  generateCategoricalPalette: (count: number): string[] => {
    return chroma.scale(['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'])
      .colors(count);
  },

  // Get color for intensity with better visual distinction
  getIntensityColor: (intensity: number, type: 'bloom' | 'pollen' | 'temperature' | 'vegetation'): string => {
    switch (type) {
      case 'bloom':
        return bloomScale(intensity).hex();
      case 'pollen':
        return pollenScale(intensity * 2000).hex();
      case 'temperature':
        return temperatureScale(intensity * 50).hex();
      case 'vegetation':
        return vegetationHealthScale(intensity).hex();
      default:
        return '#CCCCCC';
    }
  },

  // Create gradient between two colors
  createGradient: (color1: string, color2: string, steps: number): string[] => {
    return chroma.scale([color1, color2]).mode('lab').colors(steps);
  }
};

// Accessibility-friendly color palettes
export const accessiblePalettes = {
  // High contrast palette
  highContrast: {
    primary: '#000000',
    secondary: '#FFFFFF',
    accent: '#FF0000',
    success: '#00FF00',
    warning: '#FFFF00',
    info: '#0000FF'
  },

  // Colorblind-friendly palette
  colorblindFriendly: {
    red: '#D55E00',    // Orange
    blue: '#0072B2',   // Blue
    green: '#009E73',  // Green
    purple: '#CC79A7', // Pink
    yellow: '#F0E442', // Yellow
    brown: '#8B4513'   // Saddle brown
  }
};

// Scientific color scales (perceptually uniform)
export const scientificScales = {
  // Viridis scale (blue to yellow)
  viridis: chroma.scale(['#440154', '#482777', '#3F4A8A', '#31678E', '#26838E', '#1F9D8A', '#6CCE5A', '#B6DE2B', '#FEE825']),

  // Plasma scale (purple to yellow)
  plasma: chroma.scale(['#0D0887', '#6A00A8', '#B12A90', '#E16462', '#FCA636', '#F0F921']),

  // Inferno scale (black to yellow)
  inferno: chroma.scale(['#000004', '#1B0C42', '#4B0A77', '#781C6D', '#A52C60', '#CF4446', '#ED6925', '#FB9A06', '#FCFFA4'])
};
