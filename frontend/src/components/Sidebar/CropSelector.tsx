import { useState } from 'react';
import { getAllCrops, getCropsByCategory, type CropType } from '../../types/crops';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Leaf, Sprout, Trees } from 'lucide-react';

interface CropSelectorProps {
  selectedCrop: CropType | null;
  onCropSelect: (crop: CropType | null) => void;
}

export default function CropSelector({ selectedCrop, onCropSelect }: CropSelectorProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | CropType['category']>('all');

  const allCrops = getAllCrops();
  const displayCrops = activeCategory === 'all' 
    ? allCrops 
    : getCropsByCategory(activeCategory);

  const getCategoryIcon = (category: CropType['category']) => {
    switch (category) {
      case 'crop':
        return <Sprout className="w-4 h-4" />;
      case 'tree':
        return <Trees className="w-4 h-4" />;
      case 'pasture':
      case 'wildflower':
        return <Leaf className="w-4 h-4" />;
      default:
        return <Leaf className="w-4 h-4" />;
    }
  };

  const formatBloomWindow = (crop: CropType): string => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    if (crop.bloomWindows.length === 1) {
      const window = crop.bloomWindows[0];
      return `${monthNames[window.start - 1]}-${monthNames[window.end - 1]}`;
    } else {
      return crop.bloomWindows
        .map(w => `${monthNames[w.start - 1]}-${monthNames[w.end - 1]}`)
        .join(', ');
    }
  };

  return (
    <Card className="bg-card border border-border rounded-sm">
      <CardContent className="p-3 space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-card-foreground">
            Select Crop/Vegetation
          </h3>
          {selectedCrop && (
            <button
              onClick={() => onCropSelect(null)}
              className="text-xs text-muted-foreground hover:text-foreground underline"
            >
              Clear Selection
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as typeof activeCategory)}>
          <TabsList className="grid grid-cols-4 gap-1">
            <TabsTrigger value="all" className="text-xs">
              All
            </TabsTrigger>
            <TabsTrigger value="crop" className="text-xs">
              Crops
            </TabsTrigger>
            <TabsTrigger value="tree" className="text-xs">
              Trees
            </TabsTrigger>
            <TabsTrigger value="pasture" className="text-xs">
              Pasture
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeCategory} className="mt-2">
            {/* Crop Grid */}
            <div className="grid gap-2 max-h-96 overflow-y-auto">
              {displayCrops.map((crop) => {
                const isSelected = selectedCrop?.id === crop.id;
                
                return (
                  <button
                    key={crop.id}
                    onClick={() => onCropSelect(isSelected ? null : crop)}
                    className={`
                      text-left p-3 rounded-md border-2 transition-all
                      ${isSelected 
                        ? 'border-primary bg-primary/10 shadow-md' 
                        : 'border-border hover:border-primary/50 bg-card'
                      }
                    `}
                  >
                    <div className="flex items-start gap-2">
                      {/* Icon */}
                      <span className="text-2xl flex-shrink-0">{crop.icon}</span>
                      
                      <div className="flex-1 min-w-0">
                        {/* Name */}
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-sm text-card-foreground">
                            {crop.name}
                          </h4>
                          {getCategoryIcon(crop.category)}
                        </div>
                        
                        {/* Scientific Name */}
                        <p className="text-xs text-muted-foreground italic">
                          {crop.scientificName}
                        </p>
                        
                        {/* Bloom Window */}
                        <div className="flex items-center gap-1 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            🌸 {formatBloomWindow(crop)}
                          </Badge>
                        </div>
                        
                        {/* NDVI Threshold */}
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">
                            NDVI: {crop.ndviThreshold.toFixed(2)}
                          </span>
                          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary"
                              style={{ width: `${crop.ndviThreshold * 100}%` }}
                            />
                          </div>
                        </div>

                        {/* Description (only when selected) */}
                        {isSelected && (
                          <p className="text-xs text-muted-foreground mt-2">
                            {crop.description}
                          </p>
                        )}

                        {/* Regions (only when selected) */}
                        {isSelected && crop.commonRegions.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {crop.commonRegions.map((region, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                📍 {region}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Selected Crop Summary */}
        {selectedCrop && (
          <div className="pt-2 border-t border-border">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-muted-foreground">Bloom Threshold:</span>
                <p className="font-semibold text-primary">NDVI ≥ {selectedCrop.ndviThreshold}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Peak NDVI:</span>
                <p className="font-semibold text-primary">{selectedCrop.peakNDVI}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
