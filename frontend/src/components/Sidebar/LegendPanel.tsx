import { useState } from 'react';
import { useLayerStore } from '../../state/useLayerStore';
import Legend from '../Map/Legend';
import { Map, BarChart3 } from 'lucide-react';

export default function LegendPanel() {
  const { activeLayer } = useLayerStore();
  const [activeLegend, setActiveLegend] = useState<'bloom' | 'vegetation' | 'climate' | 'pollen'>('bloom');

  const legendTabs = [
    { id: 'bloom' as const, label: 'Bloom', icon: BarChart3, enabled: activeLayer === 'bloom' },
    { id: 'vegetation' as const, label: 'Vegetation', icon: BarChart3, enabled: activeLayer === 'vegetation' },
    { id: 'climate' as const, label: 'Climate', icon: BarChart3, enabled: activeLayer === 'climate' },
    { id: 'pollen' as const, label: 'Pollen', icon: Map, enabled: activeLayer === 'pollen' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Map className="w-5 h-5 text-rose-600" />
        <h2 className="text-lg font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
          Legend
        </h2>
      </div>

      <div className="bg-white/60 backdrop-blur-sm rounded-lg border border-gray-100 overflow-hidden">
        {/* Legend Tabs */}
        <div className="flex border-b border-gray-200">
          {legendTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveLegend(tab.id)}
                disabled={!tab.enabled}
                className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium transition-colors ${
                  activeLegend === tab.id
                    ? 'bg-rose-50 text-rose-600 border-b-2 border-rose-500'
                    : tab.enabled
                    ? 'text-gray-600 hover:bg-gray-50'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {!tab.enabled && (
                  <div className="w-2 h-2 bg-gray-300 rounded-full ml-1" />
                )}
              </button>
            );
          })}
        </div>

        {/* Legend Content */}
        <div className="p-4">
          <Legend type={activeLegend === 'bloom' ? 'ndvi' : activeLegend === 'vegetation' ? 'ndvi' : activeLegend === 'climate' ? 'ndvi' : 'pollen'} />
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-3 rounded-lg border border-rose-100">
        <div className="text-xs text-gray-600 space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
            <span>Real-time data updates</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full" />
            <span>Peak bloom season</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>Active monitoring</span>
          </div>
        </div>
      </div>
    </div>
  );
}
