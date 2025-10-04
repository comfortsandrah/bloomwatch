import { useLayerStore, type LayerType } from '../../state/useLayerStore';
import { Flower2, Leaf, Thermometer, Wind } from 'lucide-react';

const layerConfig = {
  bloom: {
    label: 'Bloom Detection',
    icon: Flower2,
    description: 'Displays areas on map that are blooming flowers',
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-700',
    borderColor: 'border-rose-200'
  },
  vegetation: {
    label: 'Vegetation',
    icon: Leaf,
    description: 'Vegetation health and coverage analysis',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-200'
  },
  climate: {
    label: 'Climate',
    icon: Thermometer,
    description: 'Temperature and weather patterns',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200'
  },
  pollen: {
    label: 'Pollen',
    icon: Wind,
    description: 'Pollen distribution and dispersal patterns',
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    borderColor: 'border-yellow-200'
  }
};

export default function LayerNavBar() {
  const { activeLayer, setActiveLayer } = useLayerStore();

  return (
    <div className="bg-white/90 backdrop-blur-lg border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-800">BloomWatch Layers</h2>
          <span className="text-sm text-gray-500">Select a layer to display</span>
        </div>
        
        <div className="flex gap-2">
          {(Object.keys(layerConfig) as LayerType[]).map((layerType) => {
            const config = layerConfig[layerType];
            const Icon = config.icon;
            const isActive = activeLayer === layerType;
            
            return (
              <button
                key={layerType}
                onClick={() => setActiveLayer(layerType)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
                  ${isActive 
                    ? `${config.bgColor} ${config.textColor} ${config.borderColor} border-2 shadow-md` 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-2 border-transparent'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{config.label}</span>
                {isActive && (
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${config.color}`} />
                )}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Active layer description */}
      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${layerConfig[activeLayer].color}`} />
          <span className="text-sm font-medium text-gray-700">
            {layerConfig[activeLayer].label} Layer
          </span>
        </div>
        <p className="text-xs text-gray-600 mt-1">
          {layerConfig[activeLayer].description}
        </p>
      </div>
    </div>
  );
}
