import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Separator } from '../../ui/separator';

export default function PollenLayerMenu() {
  return (
    <div className="space-y-2">
      {/* Layer Header */}
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold text-primary">
          Overview
        </h2>
      </div>

      {/* Overview - Pollen activity and concentration */}
      <Card className="bg-card border border-border rounded-sm">
        <CardContent className="p-2">
          <div className="flex items-start gap-1">
            <div className="w-full">
              <p className="mb-2 text-card-foreground text-base font-semibold">
                Pollen Activity
              </p>
              <Separator className="mb-2" />
              <p className="mb-1 text-muted-foreground text-sm">
                Allergy Risk
              </p>
              <Badge variant="secondary" className="mb-2 text-primary bg-primary/10 text-base font-semibold">
                Moderate
              </Badge>
              <Separator className="mb-2" />
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="mb-1 text-muted-foreground text-xs">
                    Concentration
                  </p>
                  <p className="font-semibold text-card-foreground text-sm">
                    1,200
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-muted-foreground text-xs">
                    Pollen Type
                  </p>
                  <p className="font-semibold text-card-foreground text-sm">
                    Tree
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-muted-foreground text-xs">
                    Dispersal
                  </p>
                  <p className="font-semibold text-card-foreground text-sm">
                    15 km/h
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
