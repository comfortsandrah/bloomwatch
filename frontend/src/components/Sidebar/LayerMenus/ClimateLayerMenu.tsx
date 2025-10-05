import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Separator } from '../../ui/separator';

export default function ClimateLayerMenu() {
  return (
    <div className="space-y-2">
      {/* Layer Header */}
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold text-primary">
          Overview
        </h2>
      </div>

      {/* Overview - Climate conditions and weather */}
      <Card className="bg-card border border-border rounded-sm">
        <CardContent className="p-2">
          <div className="flex items-start gap-1">
            <div className="w-full">
              <p className="mb-2 text-card-foreground text-base font-semibold">
                Climate Conditions
              </p>
              <Separator className="mb-2" />
              <p className="mb-1 text-muted-foreground text-sm">
                Weather Status
              </p>
              <Badge variant="secondary" className="mb-2 text-primary bg-primary/10 text-base font-semibold">
                Mild
              </Badge>
              <Separator className="mb-2" />
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="mb-1 text-muted-foreground text-xs">
                    Temperature
                  </p>
                  <p className="font-semibold text-card-foreground text-sm">
                    22°C
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-muted-foreground text-xs">
                    Humidity
                  </p>
                  <p className="font-semibold text-card-foreground text-sm">
                    65%
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-muted-foreground text-xs">
                    Pressure
                  </p>
                  <p className="font-semibold text-card-foreground text-sm">
                    1013 hPa
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
