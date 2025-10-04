import { Wind, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

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
        <div className="p-2 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg">
          <Wind className="w-5 h-5 text-yellow-600" />
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
          Pollen Layer
        </h2>
      </div>

      {/* Layer Description */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-100">
        <p className="text-sm text-gray-700 leading-relaxed mb-3">
          Track pollen distribution, dispersal patterns, and concentration levels across different regions and time periods.
        </p>
        <div className="flex gap-2">
          <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm">
            <span className="text-xs font-semibold text-yellow-600">Dispersal</span>
            <span className="text-xs text-gray-500 ml-1">Patterns</span>
          </div>
          <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm">
            <span className="text-xs font-semibold text-orange-600">Concentration</span>
            <span className="text-xs text-gray-500 ml-1">Levels</span>
          </div>
        </div>
      </div>


      {/* Pollen Data */}
      <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-4 h-4 text-yellow-600" />
          <h3 className="text-sm font-semibold text-gray-700">Pollen Activity</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Tree Pollen</span>
            <span className="text-xs font-mono text-yellow-600">High</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Grass Pollen</span>
            <span className="text-xs font-mono text-orange-600">Medium</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Weed Pollen</span>
            <span className="text-xs font-mono text-gray-800">Low</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Dispersal Rate</span>
            <span className="text-xs font-mono text-gray-800">15 km/h</span>
          </div>
        </div>
        
        {/* Pollen Concentration Trend Chart */}
        <div className="mt-4">
          <h4 className="text-xs font-semibold text-gray-700 mb-2">7-Day Pollen Trend</h4>
          <div className="h-20">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pollenData}>
                <XAxis dataKey="day" hide />
                <YAxis hide />
                <Line
                  type="monotone"
                  dataKey="concentration"
                  stroke="#f59e0b"
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
