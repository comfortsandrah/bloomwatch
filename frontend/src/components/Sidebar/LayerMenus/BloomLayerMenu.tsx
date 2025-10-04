// import { useTimelineStore } from '../../state/useTimelineStore';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Separator } from '../../ui/separator';
import { ScrollArea } from '../../ui/scroll-area';

const bloomColorPalette = [
  { stage: 'Dormant / Bare Soil', description: 'No vegetation activity; pre-growth stage', color: '#8B949E', name: 'Muted Gray' },
  { stage: 'Early Growth', description: 'Plants starting to sprout', color: '#56D364', name: 'Success Green' },
  { stage: 'Active Growth', description: 'Vegetation developing steadily', color: '#6ECF68', name: 'Map Gradient Start' },
  { stage: 'Peak Bloom', description: 'Full bloom / maximum NDVI', color: '#F85149', name: 'Alert Red' },
  { stage: 'Post-Bloom / Overgrowth', description: 'Vegetation starting to fade', color: '#E3B341', name: 'Warning Yellow' },
  { stage: 'Water / Cloud / No Data', description: 'Masked or invalid data areas', color: '#8B949E', name: 'Muted Gray' },
  { stage: 'Pollen Cloud / Dispersal', description: 'Windborne pollen visualization', color: '#F5A623', name: 'Accent Orange' },
  { stage: 'Drought / Stress', description: 'Vegetation under thermal stress', color: '#F85149', name: 'Alert Red' },
  { stage: 'Forest Bloom', description: 'Dense canopy blooming', color: '#56D364', name: 'Success Green' },
  { stage: 'Grassland Bloom', description: 'Wide-area bloom cycles', color: '#6ECF68', name: 'Map Gradient Start' },
  { stage: 'Desert Bloom', description: 'Short-lived, rare flowering', color: '#F5A623', name: 'Accent Orange' },
  { stage: 'Crop Bloom / Agricultural Growth', description: 'Cultivated plant areas', color: '#56D364', name: 'Success Green' },
  { stage: 'Wetlands Bloom', description: 'Aquatic vegetation', color: '#6ECF68', name: 'Map Gradient Start' },
  { stage: 'Species Highlight (Interactive)', description: 'Specific plant/pollen types', color: '#F5A623', name: 'Accent Orange' },
  { stage: 'Human Impact / Urban Overlay', description: 'Settlements, deforested zones', color: '#8B949E', name: 'Muted Gray' }
];

export default function BloomLayerMenu() {
  // const { currentDate } = useTimelineStore();

  return (
    <div className="space-y-2">
      {/* Layer Header */}
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold text-primary">
          Overview
        </h2>
      </div>
      {/* Overview - Country/Region that bloom event is happening in */}
      <Card className="bg-card border border-border">
        <CardContent className="p-2">
          <div className="flex items-start gap-1">
            <div className="w-full">
              <p className="mb-2 text-card-foreground text-base font-semibold">
                Canada
              </p>
              <Separator className="mb-2" />
              <p className="mb-1 text-muted-foreground text-sm">
                Bloom Status
              </p>
              <Badge variant="secondary" className="mb-2 text-primary bg-primary/10 text-base font-semibold">
                Onset
              </Badge>
              <Separator className="mb-2" />
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="mb-1 text-muted-foreground text-xs">
                    Start
                  </p>
                  <p className="font-semibold text-card-foreground text-sm">
                    March 12, 2025
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-muted-foreground text-xs">
                    Peak
                  </p>
                  <p className="font-semibold text-card-foreground text-sm">
                    March 25, 2025
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-muted-foreground text-xs">
                    End
                  </p>
                  <p className="font-semibold text-card-foreground text-sm">
                    March 31, 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}