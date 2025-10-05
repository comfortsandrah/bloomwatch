import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Separator } from '../../ui/separator';

export default function VegetationLayerMenu() {
  return (
    <div className="space-y-2">
      {/* Layer Header */}
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold text-primary">
          Overview
        </h2>
      </div>
      
      {/* Overview - Vegetation health and coverage */}
      <Card className="bg-card border border-border rounded-sm">
        <CardContent className="p-2">
          <div className="flex items-start gap-1">
            <div className="w-full">
              <p className="mb-2 text-card-foreground text-base font-semibold">
                Vegetation Health
              </p>
              <Separator className="mb-2" />
              <p className="mb-1 text-muted-foreground text-sm">
                NDVI Status
              </p>
              <Badge variant="secondary" className="mb-2 text-primary bg-primary/10 text-base font-semibold">
                Good
              </Badge>
              <Separator className="mb-2" />
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="mb-1 text-muted-foreground text-xs">
                    NDVI
                  </p>
                  <p className="font-semibold text-card-foreground text-sm">
                    0.75
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-muted-foreground text-xs">
                    Coverage
                  </p>
                  <p className="font-semibold text-card-foreground text-sm">
                    78%
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-muted-foreground text-xs">
                    Biomass
                  </p>
                  <p className="font-semibold text-card-foreground text-sm">
                    850 kg/m²
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
