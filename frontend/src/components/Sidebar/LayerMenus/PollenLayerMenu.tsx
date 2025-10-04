import { Wind, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Separator } from '../../ui/separator';

export default function PollenLayerMenu() {
  // Mock pollen concentration data for the last 7 days
  const pollenData = [
    { day: 'Mon', concentration: 800, tree: 600, grass: 200 },
    { day: 'Tue', concentration: 1200, tree: 800, grass: 400 },
    { day: 'Wed', concentration: 1500, tree: 1000, grass: 500 },
    { day: 'Thu', concentration: 1800, tree: 1200, grass: 600 },
    { day: 'Fri', concentration: 2000, tree: 1400, grass: 600 },
    { day: 'Sat', concentration: 1600, tree: 1000, grass: 600 },
    { day: 'Sun', concentration: 1400, tree: 800, grass: 600 }
  ];

  return (
    <div className="space-y-6">
      {/* Layer Header */}
      <div className="flex items-center gap-2">
        <div className="p-2 bg-accent/10 rounded-lg">
          <Wind className="w-5 h-5 text-accent" />
        </div>
        <h2 className="text-xl font-bold text-accent">
          Pollen Layer
        </h2>
      </div>

      {/* Layer Description */}
      <Card className="bg-muted/50 border-border">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Track pollen distribution, dispersal patterns, and concentration levels across different regions and time periods.
          </p>
          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-background text-accent">
              Dispersal Patterns
            </Badge>
            <Badge variant="secondary" className="bg-background text-destructive">
              Concentration Levels
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Pollen Data */}
      <Card className="bg-card backdrop-blur-sm border border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-card-foreground">
            <Activity className="w-4 h-4 text-accent" />
            Pollen Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Tree Pollen</span>
              <Badge variant="destructive" className="text-accent">High</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Grass Pollen</span>
              <Badge variant="secondary" className="text-destructive">Medium</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Weed Pollen</span>
              <span className="text-xs font-mono text-card-foreground">Low</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Dispersal Rate</span>
              <span className="text-xs font-mono text-card-foreground">15 km/h</span>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Pollen Concentration Trend Chart */}
          <div>
            <h4 className="text-xs font-semibold text-card-foreground mb-2">7-Day Pollen Trend</h4>
            <div className="h-20">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={pollenData}>
                  <XAxis dataKey="day" hide />
                  <YAxis hide />
                  <Line
                    type="monotone"
                    dataKey="concentration"
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
