import { Map } from 'lucide-react';
import { useLayerStore } from '../../state/useLayerStore';
import Legend from '../Map/Legend';

export default function LegendPanel() {
  const { activeLayer } = useLayerStore();

  // Map active layer to legend type
  const getLegendType = (layer: string | null) => {
    switch (layer) {
      case 'bloom':
        return 'bloom';
      case 'vegetation':
        return 'vegetation';
      case 'climate':
        return 'climate';
      case 'pollen':
        return 'pollen';
      default:
        return 'bloom';
    }
  };

  // Get layer display name
  const getLayerDisplayName = (layer: string | null) => {
    switch (layer) {
      case 'bloom':
        return 'Bloom Detection';
      case 'vegetation':
        return 'Vegetation';
      case 'climate':
        return 'Climate';
      case 'pollen':
        return 'Pollen';
      default:
        return 'Legend';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Map className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-bold text-primary">
          {getLayerDisplayName(activeLayer)}
        </h2>
      </div>
      <Legend type={getLegendType(activeLayer)} />
    </div>
  );
}
