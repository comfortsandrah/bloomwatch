import { bloomStatusColors, landCoverColors } from '../../utils/colorScales';

interface LegendProps {
  type: 'ndvi' | 'pollen' | 'landcover';
}

export default function Legend({ type }: LegendProps) {
  const renderNDVILegend = () => (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Bloom Intensity</h3>
      {Object.entries(bloomStatusColors).map(([label, color]) => (
        <div key={label} className="flex items-center gap-2">
          <div 
            className="w-4 h-4 rounded-full border border-white shadow-sm" 
            style={{ backgroundColor: color }}
          />
          <span className="text-xs text-gray-600">{label}</span>
        </div>
      ))}
    </div>
  );

  const renderPollenLegend = () => (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Pollen Count</h3>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-200 border border-white shadow-sm" />
          <span className="text-xs text-gray-600">Low (0-500)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-yellow-300 border border-white shadow-sm" />
          <span className="text-xs text-gray-600">Medium (500-1000)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-orange-400 border border-white shadow-sm" />
          <span className="text-xs text-gray-600">High (1000-1500)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500 border border-white shadow-sm" />
          <span className="text-xs text-gray-600">Very High (1500+)</span>
        </div>
      </div>
    </div>
  );

  const renderLandCoverLegend = () => (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Land Cover</h3>
      {Object.entries(landCoverColors).map(([label, color]) => (
        <div key={label} className="flex items-center gap-2">
          <div 
            className="w-4 h-4 rounded border border-white shadow-sm" 
            style={{ backgroundColor: color }}
          />
          <span className="text-xs text-gray-600">{label}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
      {type === 'ndvi' && renderNDVILegend()}
      {type === 'pollen' && renderPollenLegend()}
      {type === 'landcover' && renderLandCoverLegend()}
    </div>
  );
}
