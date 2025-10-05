import { useLayerStore } from '../../state/useLayerStore';
import { useCropStore } from '../../state/useCropStore';
import { useTimelineStore } from '../../state/useTimelineStore';
import { formatGIBSDate, getNearestMODISDate } from '../../utils/nasaGIBS';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';

export default function LayerStatus() {
  const { activeLayer } = useLayerStore();
  const { selectedCrop, nasaLayerType, useNASAData } = useCropStore();
  const { currentDate } = useTimelineStore();
  
  const modisDate = getNearestMODISDate(currentDate);
  
  return (
    <Card className="absolute top-4 left-4 z-10 bg-card/90 backdrop-blur-sm border border-border shadow-lg">
      <CardContent className="p-3 space-y-2">
        <div className="text-sm font-semibold text-card-foreground">
          🗺️ Layer Status
        </div>
        
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Active Layer:</span>
            <Badge variant="default">{activeLayer}</Badge>
          </div>
          
          {activeLayer === 'vegetation' && (
            <>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Data Source:</span>
                <Badge variant={useNASAData ? "default" : "secondary"}>
                  {useNASAData ? '🛰️ NASA' : '📊 Mock'}
                </Badge>
              </div>
              
              {useNASAData && (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Satellite:</span>
                  <Badge variant="outline">{nasaLayerType}</Badge>
                </div>
              )}
            </>
          )}
          
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Date:</span>
            <span className="font-mono text-card-foreground">
              {formatGIBSDate(currentDate)}
            </span>
          </div>
          
          {useNASAData && activeLayer === 'vegetation' && (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">MODIS Date:</span>
              <span className="font-mono text-primary">
                {formatGIBSDate(modisDate)}
              </span>
            </div>
          )}
          
          {selectedCrop && (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Crop:</span>
              <Badge variant="secondary">
                {selectedCrop.icon} {selectedCrop.name}
              </Badge>
            </div>
          )}
        </div>
        
        <div className="text-xs text-muted-foreground pt-2 border-t border-border">
          {useNASAData && activeLayer === 'vegetation' ? (
            <span className="text-green-500">✓ Loading NASA tiles...</span>
          ) : (
            <span>Switch to Vegetation + NASA to see satellite data</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
