import { bloomStatusColors, landCoverColors } from '../../utils/colorScales';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { useCropStore } from '../../state/useCropStore';

interface LegendProps {
  type: 'ndvi' | 'pollen' | 'landcover' | 'bloom' | 'vegetation' | 'climate';
}

export default function Legend({ type }: LegendProps) {
  const { selectedCrop, useNASAData } = useCropStore();
  
  const renderBloomLegend = () => {
    // If using NASA data and a crop is selected, show crop-specific scale
    if (useNASAData && selectedCrop) {
      const threshold = selectedCrop.ndviThreshold;
      const peak = selectedCrop.peakNDVI;
      
      return (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-card-foreground mb-2">
            {selectedCrop.icon} {selectedCrop.name} Bloom Intensity
          </h3>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="w-4 h-4 p-0 rounded-full bg-[#8B4513] border border-border shadow-sm" />
              <span className="text-xs text-muted-foreground">Bare Soil (0.0)</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="w-4 h-4 p-0 rounded-full bg-[#CD853F] border border-border shadow-sm" />
              <span className="text-xs text-muted-foreground">Pre-Bloom (&lt; {threshold.toFixed(2)})</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="w-4 h-4 p-0 rounded-full bg-[#FFD700] border border-border shadow-sm" />
              <span className="text-xs text-muted-foreground">Early Bloom ({threshold.toFixed(2)})</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="w-4 h-4 p-0 rounded-full bg-[#FFA500] border border-border shadow-sm" />
              <span className="text-xs text-muted-foreground">Active Bloom ({((threshold + peak) / 2).toFixed(2)})</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="w-4 h-4 p-0 rounded-full bg-[#FF69B4] border border-border shadow-sm" />
              <span className="text-xs text-muted-foreground">Full Bloom ({peak.toFixed(2)})</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="w-4 h-4 p-0 rounded-full bg-[#FF1493] border border-border shadow-sm" />
              <span className="text-xs text-muted-foreground">Peak Bloom (&gt; {peak.toFixed(2)})</span>
            </div>
          </div>
          
          {/* Color gradient bar */}
          <div className="mt-3">
            <div className="h-3 rounded-sm" style={{
              background: 'linear-gradient(to right, #8B4513, #CD853F, #FFD700, #FFA500, #FF69B4, #FF1493)'
            }} />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-muted-foreground">Low</span>
              <span className="text-xs text-muted-foreground">High</span>
            </div>
          </div>
          
          <div className="mt-2 p-2 bg-muted/50 rounded-sm">
            <p className="text-xs text-muted-foreground">
              🛰️ NASA {selectedCrop.category === 'crop' ? 'NDVI' : 'EVI'} data
            </p>
          </div>
        </div>
      );
    }
    
    // Default bloom legend
    return (
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-card-foreground mb-2">Bloom Intensity</h3>
        {Object.entries(bloomStatusColors).map(([label, color]) => (
          <div key={label} className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="w-4 h-4 p-0 rounded-full border border-border shadow-sm"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderVegetationLegend = () => (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-card-foreground mb-2">Vegetation Health (NDVI)</h3>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="w-4 h-4 p-0 rounded-full bg-amber-600 border border-border shadow-sm" />
          <span className="text-xs text-muted-foreground">Bare Soil (0.0-0.2)</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="w-4 h-4 p-0 rounded-full bg-yellow-400 border border-border shadow-sm" />
          <span className="text-xs text-muted-foreground">Sparse Vegetation (0.2-0.4)</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="w-4 h-4 p-0 rounded-full bg-yellow-300 border border-border shadow-sm" />
          <span className="text-xs text-muted-foreground">Moderate Vegetation (0.4-0.6)</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="w-4 h-4 p-0 rounded-full bg-green-300 border border-border shadow-sm" />
          <span className="text-xs text-muted-foreground">Dense Vegetation (0.6-0.8)</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="w-4 h-4 p-0 rounded-full bg-green-600 border border-border shadow-sm" />
          <span className="text-xs text-muted-foreground">Very Dense Vegetation (0.8-1.0)</span>
        </div>
      </div>
    </div>
  );

  const renderClimateLegend = () => (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-card-foreground mb-2">Climate Intensity</h3>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="w-4 h-4 p-0 rounded-full bg-blue-500 border border-border shadow-sm" />
          <span className="text-xs text-muted-foreground">Very Low (0.0-0.2)</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="w-4 h-4 p-0 rounded-full bg-cyan-400 border border-border shadow-sm" />
          <span className="text-xs text-muted-foreground">Low (0.2-0.4)</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="w-4 h-4 p-0 rounded-full bg-yellow-400 border border-border shadow-sm" />
          <span className="text-xs text-muted-foreground">Moderate (0.4-0.6)</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="w-4 h-4 p-0 rounded-full bg-orange-500 border border-border shadow-sm" />
          <span className="text-xs text-muted-foreground">High (0.6-0.8)</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="w-4 h-4 p-0 rounded-full bg-red-500 border border-border shadow-sm" />
          <span className="text-xs text-muted-foreground">Very High (0.8-1.0)</span>
        </div>
      </div>
    </div>
  );

  const renderPollenLegend = () => (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-card-foreground mb-2">Pollen Count</h3>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="w-4 h-4 p-0 rounded-full bg-green-200 border border-border shadow-sm" />
          <span className="text-xs text-muted-foreground">Low (0-500)</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="w-4 h-4 p-0 rounded-full bg-yellow-300 border border-border shadow-sm" />
          <span className="text-xs text-muted-foreground">Medium (500-1000)</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="w-4 h-4 p-0 rounded-full bg-orange-400 border border-border shadow-sm" />
          <span className="text-xs text-muted-foreground">High (1000-1500)</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="w-4 h-4 p-0 rounded-full bg-red-500 border border-border shadow-sm" />
          <span className="text-xs text-muted-foreground">Very High (1500+)</span>
        </div>
      </div>
    </div>
  );

  const renderLandCoverLegend = () => (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-card-foreground mb-2">Land Cover</h3>
      {Object.entries(landCoverColors).map(([label, color]) => (
        <div key={label} className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="w-4 h-4 p-0 rounded border border-border shadow-sm"
            style={{ backgroundColor: color }}
          />
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  );

  return (
    <Card className="bg-card/90 backdrop-blur-sm shadow-lg border border-border rounded-sm">
      <CardContent className="p-4">
        {type === 'bloom' && renderBloomLegend()}
        {type === 'vegetation' && renderVegetationLegend()}
        {type === 'climate' && renderClimateLegend()}
        {type === 'pollen' && renderPollenLegend()}
        {type === 'landcover' && renderLandCoverLegend()}
        {type === 'ndvi' && renderBloomLegend()}
      </CardContent>
    </Card>
  );
}
