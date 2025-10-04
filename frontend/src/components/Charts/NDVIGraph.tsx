import { useTimelineStore } from '../../state/useTimelineStore';
import { mockTimeSeriesData } from '../../utils/mockData';
import { TrendingUp, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function NDVIGraph() {
  const { currentDate } = useTimelineStore();
  
  // Get current month data
  const currentMonth = currentDate.toISOString().slice(0, 7); // YYYY-MM format
  const currentData = mockTimeSeriesData[currentMonth as keyof typeof mockTimeSeriesData] || 
    { avgNDVI: 0.5, bloomStatus: 'Unknown' };

  // Convert time series data to chart format
  const chartData = Object.entries(mockTimeSeriesData).map(([date, data]) => ({
    month: new Date(date).toLocaleDateString('en-US', { month: 'short' }),
    ndvi: data.avgNDVI,
    status: data.bloomStatus
  }));

  const maxNDVI = Math.max(...chartData.map(d => d.ndvi));
  const minNDVI = Math.min(...chartData.map(d => d.ndvi));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-rose-600" />
        <h2 className="text-lg font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
          NDVI Trends
        </h2>
      </div>

      <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-gray-100">
        {/* Current Status */}
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-gray-800">
            {currentData.avgNDVI.toFixed(2)}
          </div>
          <div className="text-sm text-gray-500 capitalize">
            {currentData.bloomStatus}
          </div>
        </div>

        {/* Recharts Line Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={[minNDVI - 0.1, maxNDVI + 0.1]}
                tickFormatter={(value: number) => value.toFixed(2)}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: number) => [
                  <div key="ndvi">
                    <span className="font-medium text-rose-600">{value.toFixed(2)}</span>
                  </div>
                ]}
                labelFormatter={(label) => (
                  <div className="font-semibold text-gray-800">{label}</div>
                )}
              />
              <ReferenceLine 
                y={0.5} 
                stroke="#9ca3af" 
                strokeDasharray="2 2" 
                label={{ value: "Baseline", position: "top" }}
              />
              <Line
                type="monotone"
                dataKey="ndvi"
                stroke="#ec4899"
                strokeWidth={3}
                dot={{ fill: '#ec4899', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#ec4899', strokeWidth: 2, fill: '#fff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Chart Info */}
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>NDVI Range: {minNDVI.toFixed(2)} - {maxNDVI.toFixed(2)}</span>
          <span>Peak: {maxNDVI.toFixed(2)}</span>
        </div>

        {/* Legend */}
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>Monthly NDVI progression</span>
          </div>
        </div>
      </div>
    </div>
  );
}
