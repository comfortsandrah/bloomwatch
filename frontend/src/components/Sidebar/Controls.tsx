import { useLayerStore } from '../../state/useLayerStore';
import { Settings } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

export default function Controls() {
  const { activeLayer, setActiveLayer } = useLayerStore();

  const layerControls = [
    {
      id: 'bloom' as const,
      label: 'Bloom Detection',
      color: 'from-red-400 to-green-400'
    },
    {
      id: 'vegetation' as const,
      label: 'Vegetation',
      color: 'from-amber-600 to-green-600'
    },
    {
      id: 'climate' as const,
      label: 'Climate',
      color: 'from-blue-500 to-red-500'
    },
    {
      id: 'pollen' as const,
      label: 'Pollen',
      color: 'from-green-400 to-red-500'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Settings className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-bold text-primary">
          Layer Selection
        </h2>
      </div>

      <div className="space-y-2">
        {layerControls.map((layer) => (
          <Card
            key={layer.id}
            className={`bg-card backdrop-blur-sm border cursor-pointer transition-all ${activeLayer === layer.id
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
              }`}
            onClick={() => setActiveLayer(layer.id)}
          >
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-card-foreground">{layer.label}</span>
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${layer.color} ${activeLayer === layer.id ? 'opacity-100' : 'opacity-50'
                  }`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
