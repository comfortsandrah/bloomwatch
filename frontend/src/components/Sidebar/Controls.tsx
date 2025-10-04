import { useLayerStore } from '../../state/useLayerStore';
import { Eye, EyeOff, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Slider } from '../ui/slider';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

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
          <Settings className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-primary">
            Layer Controls
          </h2>
        </div>
        <Button
          onClick={resetLayers}
          variant="outline"
          size="sm"
        >
          Reset
        </Button>
      </div>

      <div className="space-y-3">
        {layerControls.map((layer) => (
          <Card key={layer.id} className="bg-card backdrop-blur-sm border border-border">
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Button
                    onClick={layer.toggle}
                    variant={layer.enabled ? "default" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                  >
                    {layer.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                  <span className="text-sm font-medium text-card-foreground">{layer.label}</span>
                </div>
                <Badge
                  variant="secondary"
                  className={`w-3 h-3 p-0 rounded-full bg-gradient-to-r ${layer.color} ${layer.enabled ? 'opacity-100' : 'opacity-30'
                    }`}
                />
              </div>

              {layer.opacity !== undefined && layer.enabled && (
                <div className="space-y-2">
                  <Separator />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Opacity</span>
                    <span>{Math.round(layer.opacity * 100)}%</span>
                  </div>
                  <Slider
                    min={0}
                    max={1}
                    step={0.1}
                    value={[layer.opacity]}
                    onValueChange={(value) => layer.setOpacity(value[0])}
                    className="w-full"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
