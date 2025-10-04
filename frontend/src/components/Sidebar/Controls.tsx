import { useLayerStore } from '../../state/useLayerStore';
import { Eye, EyeOff, Settings } from 'lucide-react';

export default function Controls() {
  const {
    showNDVI,
    showPollen,
    showLandCover,
    showPhenology,
    showTemperature,
    showTerrain,
    toggleNDVI,
    togglePollen,
    toggleLandCover,
    togglePhenology,
    toggleTemperature,
    toggleTerrain,
    ndviOpacity,
    pollenOpacity,
    landCoverOpacity,
    setNDVIOpacity,
    setPollenOpacity,
    setLandCoverOpacity,
    resetLayers
  } = useLayerStore();

  const layerControls = [
    {
      id: 'ndvi',
      label: 'NDVI / Bloom Index',
      enabled: showNDVI,
      toggle: toggleNDVI,
      opacity: ndviOpacity,
      setOpacity: setNDVIOpacity,
      color: 'from-green-400 to-yellow-400'
    },
    {
      id: 'pollen',
      label: 'Pollen Sources',
      enabled: showPollen,
      toggle: togglePollen,
      opacity: pollenOpacity,
      setOpacity: setPollenOpacity,
      color: 'from-yellow-400 to-red-400'
    },
    {
      id: 'landcover',
      label: 'Land Cover',
      enabled: showLandCover,
      toggle: toggleLandCover,
      opacity: landCoverOpacity,
      setOpacity: setLandCoverOpacity,
      color: 'from-green-600 to-blue-600'
    },
    {
      id: 'phenology',
      label: 'Phenology Timeline',
      enabled: showPhenology,
      toggle: togglePhenology,
      color: 'from-purple-400 to-pink-400'
    },
    {
      id: 'temperature',
      label: 'Temperature',
      enabled: showTemperature,
      toggle: toggleTemperature,
      color: 'from-blue-400 to-red-400'
    },
    {
      id: 'terrain',
      label: '3D Terrain',
      enabled: showTerrain,
      toggle: toggleTerrain,
      color: 'from-gray-400 to-gray-600'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-rose-600" />
          <h2 className="text-lg font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            Layer Controls
          </h2>
        </div>
        <button
          onClick={resetLayers}
          className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="space-y-3">
        {layerControls.map((layer) => (
          <div key={layer.id} className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={layer.toggle}
                  className={`p-1 rounded-md transition-colors ${
                    layer.enabled 
                      ? 'bg-rose-100 text-rose-600 hover:bg-rose-200' 
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  {layer.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <span className="text-sm font-medium text-gray-700">{layer.label}</span>
              </div>
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${layer.color} ${
                layer.enabled ? 'opacity-100' : 'opacity-30'
              }`} />
            </div>
            
            {layer.opacity !== undefined && layer.enabled && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Opacity</span>
                  <span>{Math.round(layer.opacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={layer.opacity}
                  onChange={(e) => layer.setOpacity(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
