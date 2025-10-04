import chroma from 'chroma-js';

// NDVI/Bloom intensity color scale
export const bloomScale = chroma
  .scale(['#A0A0A0', '#9ACD32', '#FFD700', '#FF69B4', '#FFA500', '#8B4513'])
  .domain([0, 1]);

// Pollen intensity color scale
export const pollenScale = chroma
  .scale(['#E8F5E8', '#90EE90', '#FFD700', '#FF8C00', '#FF4500'])
  .domain([0, 2000]);

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
