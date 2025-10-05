import { useTimelineStore } from '../../state/useTimelineStore';
import { mockTimeSeriesData } from '../../utils/mockData';
import { TrendingUp, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

export default function NDVIGraph() {
  const { currentDate } = useTimelineStore();

  // Get current month data - find the closest month in the data
  const currentMonth = currentDate.toISOString().slice(0, 7); // YYYY-MM format
  const currentMonthKey = `${currentMonth}-01`; // Convert to YYYY-MM-DD format
  const currentData = mockTimeSeriesData[currentMonthKey as keyof typeof mockTimeSeriesData] ||
    { avgNDVI: 0.5, bloomStatus: 'Unknown' };

  // Convert time series data to chart format
  const chartData = Object.entries(mockTimeSeriesData)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .map(([date, data]) => ({
      month: new Date(date).toLocaleDateString('en-US', { month: 'short' }),
      ndvi: data.avgNDVI,
      status: data.bloomStatus
    }));

  const maxNDVI = Math.max(...chartData.map(d => d.ndvi));
  const minNDVI = Math.min(...chartData.map(d => d.ndvi));

  // Debug: Log chart data to console
  console.log('Chart Data:', chartData);
  console.log('Min NDVI:', minNDVI, 'Max NDVI:', maxNDVI);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        <TrendingUp className="w-4 h-4 text-primary" />
        <h2 className="text-base font-bold text-primary">
          NDVI Trends
        </h2>
      </div>

      <Card className="bg-card backdrop-blur-sm border border-border">
        <CardContent className="p-2">
          {/* Current Status */}
          <div className="text-center mb-2">
            <div className="text-xl font-bold text-card-foreground">
              {currentData.avgNDVI.toFixed(2)}
            </div>
            <Badge variant="secondary" className="mt-0.5 capitalize">
              {currentData.bloomStatus}
            </Badge>
          </div>

          {/* Recharts Line Chart */}
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 2, right: 16, left: 8, bottom: 2 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
                <XAxis
                  dataKey="month"
                  stroke="#6b7280"
                  fontSize={11}
                  tickLine={true}
                  axisLine={true}
                  tick={{ fill: '#6b7280' }}
                />
                <YAxis
                  stroke="#6b7280"
                  fontSize={11}
                  tickLine={true}
                  axisLine={true}
                  domain={[minNDVI - 0.1, maxNDVI + 0.1]}
                  tickFormatter={(value: number) => value.toFixed(2)}
                  tick={{ fill: '#6b7280' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
                    color: '#374151'
                  }}
                  formatter={(value: number) => [
                    <div key="ndvi">
                      <span className="font-medium text-blue-600">{value.toFixed(2)}</span>
                    </div>
                  ]}
                  labelFormatter={(label) => (
                    <div className="font-semibold text-gray-700">{label}</div>
                  )}
                />
                <Line
                  type="monotone"
                  dataKey="ndvi"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2, fill: '#ffffff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Chart Info */}
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>NDVI Range: {minNDVI.toFixed(2)} - {maxNDVI.toFixed(2)}</span>
            <span>Peak: {maxNDVI.toFixed(2)}</span>
          </div>

          {/* Legend */}
          <Separator className="mt-2" />
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
            <Calendar className="w-3 h-3" />
            <span>Monthly NDVI progression</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
