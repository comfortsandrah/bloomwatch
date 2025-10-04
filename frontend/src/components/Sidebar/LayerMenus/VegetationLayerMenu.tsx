import { Leaf, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

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
        <div className="p-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg">
          <Leaf className="w-5 h-5 text-green-600" />
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Vegetation Layer
        </h2>
      </div>

      {/* Layer Description */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
        <p className="text-sm text-gray-700 leading-relaxed mb-3">
          Analyze vegetation health, coverage, and growth patterns using NDVI and other vegetation indices.
        </p>
        <div className="flex gap-2">
          <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm">
            <span className="text-xs font-semibold text-green-600">NDVI</span>
            <span className="text-xs text-gray-500 ml-1">Analysis</span>
          </div>
          <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm">
            <span className="text-xs font-semibold text-emerald-600">Health</span>
            <span className="text-xs text-gray-500 ml-1">Index</span>
          </div>
        </div>
      </div>


      {/* Vegetation Metrics */}
      <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="w-4 h-4 text-green-600" />
          <h3 className="text-sm font-semibold text-gray-700">Vegetation Metrics</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">NDVI Range</span>
            <span className="text-xs font-mono text-gray-800">-1.0 to 1.0</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Health Score</span>
            <span className="text-xs font-mono text-green-600">0.85</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Coverage</span>
            <span className="text-xs font-mono text-gray-800">78%</span>
          </div>
        </div>
        
        {/* Vegetation Health Trend Chart */}
        <div className="mt-4">
          <h4 className="text-xs font-semibold text-gray-700 mb-2">7-Day Health Trend</h4>
          <div className="h-20">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={vegetationData}>
                <XAxis dataKey="day" hide />
                <YAxis hide />
                <Line
                  type="monotone"
                  dataKey="health"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
