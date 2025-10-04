import { Leaf, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Separator } from '../../ui/separator';

export default function VegetationLayerMenu() {
  // Mock vegetation health data for the last 7 days
  const vegetationData = [
    { day: 'Mon', ndvi: 0.75, health: 0.82 },
    { day: 'Tue', ndvi: 0.78, health: 0.85 },
    { day: 'Wed', ndvi: 0.72, health: 0.79 },
    { day: 'Thu', ndvi: 0.81, health: 0.88 },
    { day: 'Fri', ndvi: 0.79, health: 0.86 },
    { day: 'Sat', ndvi: 0.83, health: 0.90 },
    { day: 'Sun', ndvi: 0.85, health: 0.92 }
  ];

  return (
    <div className="space-y-6">
      {/* Layer Header */}
      <div className="flex items-center gap-2">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Leaf className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-primary">
          Vegetation Layer
        </h2>
      </div>

      {/* Layer Description */}
      <Card className="bg-muted/50 border-border">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Analyze vegetation health, coverage, and growth patterns using NDVI and other vegetation indices.
          </p>
          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-background text-primary">
              NDVI Analysis
            </Badge>
            <Badge variant="secondary" className="bg-background text-secondary-foreground">
              Health Index
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Vegetation Metrics */}
      <Card className="bg-card backdrop-blur-sm border border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-card-foreground">
            <BarChart3 className="w-4 h-4 text-primary" />
            Vegetation Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">NDVI Range</span>
              <span className="text-xs font-mono text-card-foreground">-1.0 to 1.0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Health Score</span>
              <Badge variant="secondary" className="text-primary">0.85</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Coverage</span>
              <span className="text-xs font-mono text-card-foreground">78%</span>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Vegetation Health Trend Chart */}
          <div>
            <h4 className="text-xs font-semibold text-card-foreground mb-2">7-Day Health Trend</h4>
            <div className="h-20">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={vegetationData}>
                  <XAxis dataKey="day" hide />
                  <YAxis hide />
                  <Line
                    type="monotone"
                    dataKey="health"
                    stroke="hsl(var(--primary))"
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
