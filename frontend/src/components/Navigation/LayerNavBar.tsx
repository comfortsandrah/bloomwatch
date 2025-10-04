import { useLayerStore, type LayerType } from '../../state/useLayerStore';
import { Flower2, Leaf, Thermometer, Wind } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const layerConfig = {
  bloom: {
    label: 'Bloom Detection',
    icon: Flower2,
    description: 'Displays areas on map that are blooming flowers',
    color: 'bg-primary',
    bgColor: 'bg-card',
    textColor: 'text-card-foreground',
    borderColor: 'border-primary'
  },
  vegetation: {
    label: 'Vegetation',
    icon: Leaf,
    description: 'Vegetation health and coverage analysis',
    color: 'bg-secondary',
    bgColor: 'bg-card',
    textColor: 'text-card-foreground',
    borderColor: 'border-secondary'
  },
  climate: {
    label: 'Climate',
    icon: Thermometer,
    description: 'Temperature and weather patterns',
    color: 'bg-accent',
    bgColor: 'bg-card',
    textColor: 'text-card-foreground',
    borderColor: 'border-accent'
  },
  pollen: {
    label: 'Pollen',
    icon: Wind,
    description: 'Pollen distribution and dispersal patterns',
    color: 'bg-destructive',
    bgColor: 'bg-card',
    textColor: 'text-card-foreground',
    borderColor: 'border-destructive'
  }
};

export default function LayerNavBar() {
  const { activeLayer, setActiveLayer } = useLayerStore();

  return (
    <div className="bg-muted backdrop-blur-lg px-6 border-b border-border">
      <div className="flex items-center">
        <div className="flex gap-2">
          {(Object.keys(layerConfig) as LayerType[]).map((layerType) => {
            const config = layerConfig[layerType];
            const Icon = config.icon;
            const isActive = activeLayer === layerType;

            return (
              <Button
                key={layerType}
                onClick={() => setActiveLayer(layerType)}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                className={`
                  flex items-center gap-2 transition-all duration-200
                  ${isActive
                    ? `${config.borderColor} border-2 shadow-md`
                    : 'border-2 border-transparent'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{config.label}</span>
                {isActive && (
                  <Badge variant="secondary" className={`w-2 h-2 p-0 ${config.color}`} />
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
