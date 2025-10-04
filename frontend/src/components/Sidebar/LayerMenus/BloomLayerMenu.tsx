import { Flower2, Info } from 'lucide-react';
// import { useTimelineStore } from '../../state/useTimelineStore';

const bloomColorPalette = [
  { stage: 'Dormant / Bare Soil', description: 'No vegetation activity; pre-growth stage', color: '#8B4513', name: 'Saddle Brown' },
  { stage: 'Early Growth', description: 'Plants starting to sprout', color: '#FFD700', name: 'Golden Yellow' },
  { stage: 'Active Growth', description: 'Vegetation developing steadily', color: '#32CD32', name: 'Lime Green' },
  { stage: 'Peak Bloom', description: 'Full bloom / maximum NDVI', color: '#00FF7F', name: 'Spring Green' },
  { stage: 'Post-Bloom / Overgrowth', description: 'Vegetation starting to fade', color: '#006400', name: 'Dark Green' },
  { stage: 'Water / Cloud / No Data', description: 'Masked or invalid data areas', color: '#1E90FF', name: 'Dodger Blue' },
  { stage: 'Pollen Cloud / Dispersal', description: 'Windborne pollen visualization', color: '#FFFF00AA', name: 'Transparent Yellow' },
  { stage: 'Drought / Stress', description: 'Vegetation under thermal stress', color: '#FF4500', name: 'Orange Red' },
  { stage: 'Forest Bloom', description: 'Dense canopy blooming', color: '#228B22', name: 'Forest Green' },
  { stage: 'Grassland Bloom', description: 'Wide-area bloom cycles', color: '#7CFC00', name: 'Lawn Green' },
  { stage: 'Desert Bloom', description: 'Short-lived, rare flowering', color: '#FFD700', name: 'Gold' },
  { stage: 'Crop Bloom / Agricultural Growth', description: 'Cultivated plant areas', color: '#ADFF2F', name: 'Green Yellow' },
  { stage: 'Wetlands Bloom', description: 'Aquatic vegetation', color: '#00CED1', name: 'Dark Turquoise' },
  { stage: 'Species Highlight (Interactive)', description: 'Specific plant/pollen types', color: '#FF69B4', name: 'Hot Pink' },
  { stage: 'Human Impact / Urban Overlay', description: 'Settlements, deforested zones', color: '#808080', name: 'Gray' }
];

export default function BloomLayerMenu() {
  // const { currentDate } = useTimelineStore();
  const currentDate = new Date(); // Temporary fallback

  return (
    <div className="space-y-6">
      {/* Layer Header */}
      <div className="flex items-center gap-2">
        <div className="p-2 bg-gradient-to-br from-rose-100 to-pink-100 rounded-lg">
          <Flower2 className="w-5 h-5 text-rose-600" />
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
          Bloom Detection Layer
        </h2>
      </div>

      {/* Layer Description */}
      <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-4 rounded-xl border border-rose-100">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              Displays areas on map that are blooming flowers. Detect local/regional bloom onset and visualize bloom "waves" through time.
            </p>
            <div className="text-xs text-rose-600 font-medium">
              Current Date: {currentDate.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </div>
            <div className="flex gap-2">
              <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm">
                <span className="text-xs font-semibold text-rose-600">Real-time</span>
                <span className="text-xs text-gray-500 ml-1">Detection</span>
              </div>
              <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm">
                <span className="text-xs font-semibold text-pink-600">Bloom</span>
                <span className="text-xs text-gray-500 ml-1">Waves</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Color Palette */}
      <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">BloomWatch Color Palette</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {bloomColorPalette.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full" style={{ backgroundColor: item.color }}></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{item.stage}</p>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}