import { useLayerStore } from '../../state/useLayerStore';
import { useCropStore } from '../../state/useCropStore';
import BloomLayerMenu from './LayerMenus/BloomLayerMenu';
import VegetationLayerMenu from './LayerMenus/VegetationLayerMenu';
import ClimateLayerMenu from './LayerMenus/ClimateLayerMenu';
import PollenLayerMenu from './LayerMenus/PollenLayerMenu';
import CropSelector from './CropSelector';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

export default function DynamicSideMenu() {
  const { activeLayer } = useLayerStore();
  const { 
    selectedCrop, 
    setSelectedCrop, 
    nasaLayerType, 
    setNASALayerType, 
    useNASAData, 
    setUseNASAData 
  } = useCropStore();

  const renderLayerMenu = () => {
    switch (activeLayer) {
      case 'bloom':
        return <BloomLayerMenu />;
      case 'vegetation':
        return <VegetationLayerMenu />;
      case 'climate':
        return <ClimateLayerMenu />;
      case 'pollen':
        return <PollenLayerMenu />;
      default:
        return <BloomLayerMenu />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Show crop selector for vegetation and bloom layers */}
      {(activeLayer === 'vegetation' || activeLayer === 'bloom') && (
        <CropSelector 
          selectedCrop={selectedCrop}
          onCropSelect={setSelectedCrop}
        />
      )}
      
      {/* NASA Data Source Selector for Bloom Layer */}
      {activeLayer === 'bloom' && (
        <Card className="bg-card border border-border rounded-sm">
          <CardContent className="p-3 space-y-3">
            <h4 className="font-semibold text-card-foreground">Bloom Data Source</h4>
            
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={useNASAData ? "default" : "outline"}
                onClick={() => setUseNASAData(true)}
                className="flex-1"
              >
                🛰️ NASA Satellite
              </Button>
              <Button
                size="sm"
                variant={!useNASAData ? "default" : "outline"}
                onClick={() => setUseNASAData(false)}
                className="flex-1"
              >
                📊 Simulated
              </Button>
            </div>
            
            {useNASAData && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Satellite Layer:</p>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    size="sm"
                    variant={nasaLayerType === 'NDVI' ? "default" : "outline"}
                    onClick={() => setNASALayerType('NDVI')}
                    className="text-xs"
                  >
                    NDVI
                  </Button>
                  <Button
                    size="sm"
                    variant={nasaLayerType === 'EVI' ? "default" : "outline"}
                    onClick={() => setNASALayerType('EVI')}
                    className="text-xs"
                  >
                    EVI
                  </Button>
                  <Button
                    size="sm"
                    variant={nasaLayerType === 'VIIRS_NDVI' ? "default" : "outline"}
                    onClick={() => setNASALayerType('VIIRS_NDVI')}
                    className="text-xs"
                  >
                    VIIRS
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {nasaLayerType === 'NDVI' && '🌿 Standard vegetation index'}
                  {nasaLayerType === 'EVI' && '🌾 Enhanced for dense crops'}
                  {nasaLayerType === 'VIIRS_NDVI' && '🎯 Higher resolution'}
                </p>
                {selectedCrop && (
                  <div className="mt-2 p-2 bg-muted rounded-sm">
                    <p className="text-xs font-medium text-card-foreground">
                      {selectedCrop.icon} {selectedCrop.name} Bloom Detection
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Threshold: {selectedCrop.ndviThreshold.toFixed(2)} • Peak: {selectedCrop.peakNDVI.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
      
      {/* NASA Layer Type Selector for Vegetation Layer */}
      {activeLayer === 'vegetation' && (
        <Card className="bg-card border border-border rounded-sm">
          <CardContent className="p-3 space-y-3">
            <h4 className="font-semibold text-card-foreground">Data Source</h4>
            
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={useNASAData ? "default" : "outline"}
                onClick={() => setUseNASAData(true)}
                className="flex-1"
              >
                🛰️ NASA Satellite
              </Button>
              <Button
                size="sm"
                variant={!useNASAData ? "default" : "outline"}
                onClick={() => setUseNASAData(false)}
                className="flex-1"
              >
                📊 Simulated
              </Button>
            </div>
            
            {useNASAData && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Satellite Layer:</p>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    size="sm"
                    variant={nasaLayerType === 'NDVI' ? "default" : "outline"}
                    onClick={() => setNASALayerType('NDVI')}
                    className="text-xs"
                  >
                    NDVI
                  </Button>
                  <Button
                    size="sm"
                    variant={nasaLayerType === 'EVI' ? "default" : "outline"}
                    onClick={() => setNASALayerType('EVI')}
                    className="text-xs"
                  >
                    EVI
                  </Button>
                  <Button
                    size="sm"
                    variant={nasaLayerType === 'VIIRS_NDVI' ? "default" : "outline"}
                    onClick={() => setNASALayerType('VIIRS_NDVI')}
                    className="text-xs"
                  >
                    VIIRS
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {nasaLayerType === 'NDVI' && '500m resolution • 16-day composite'}
                  {nasaLayerType === 'EVI' && '500m resolution • Dense crops'}
                  {nasaLayerType === 'VIIRS_NDVI' && '375m resolution • High detail'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
      
      {/* Existing layer menus */}
      {renderLayerMenu()}
    </div>
  );
}
