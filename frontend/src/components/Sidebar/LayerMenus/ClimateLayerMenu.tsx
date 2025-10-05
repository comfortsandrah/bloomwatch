import { Thermometer, Cloud } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from '../../ui/card';

export default function ClimateLayerMenu() {
  // Mock temperature data for the last 7 days
  const temperatureData = [
    { day: 'Mon', temp: 18, humidity: 65 },
    { day: 'Tue', temp: 20, humidity: 62 },
    { day: 'Wed', temp: 16, humidity: 70 },
    { day: 'Thu', temp: 22, humidity: 58 },
    { day: 'Fri', temp: 19, humidity: 68 },
    { day: 'Sat', temp: 24, humidity: 55 },
    { day: 'Sun', temp: 25, humidity: 52 }
  ];

  return (
    <div className="space-y-6">
      {/* Layer Header */}
      <div className="flex items-center gap-2">
        <div className="p-2 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg">
          <Thermometer className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Climate Layer
        </h2>
      </div>

      {/* Layer Description */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100">
        <p className="text-sm text-gray-700 leading-relaxed mb-3">
          Monitor temperature patterns, weather conditions, and climate data that affect bloom timing and vegetation health.
        </p>
        <div className="flex gap-2">
          <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm">
            <span className="text-xs font-semibold text-blue-600">Temperature</span>
            <span className="text-xs text-gray-500 ml-1">Maps</span>
          </div>
          <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm">
            <span className="text-xs font-semibold text-cyan-600">Weather</span>
            <span className="text-xs text-gray-500 ml-1">Data</span>
          </div>
        </div>
      </div>


      {/* Climate Data */}
      <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <Cloud className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-semibold text-gray-700">Current Conditions</h3>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Temperature</span>
            <span className="text-xs font-mono text-blue-600">22°C</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Humidity</span>
            <span className="text-xs font-mono text-gray-800">65%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Wind Speed</span>
            <span className="text-xs font-mono text-gray-800">12 km/h</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Precipitation</span>
            <span className="text-xs font-mono text-cyan-600">0.2 mm</span>
          </div>
        </div>

        {/* Temperature Trend Chart */}
        <div className="mt-4">
          <h4 className="text-xs font-semibold text-gray-700 mb-2">7-Day Temperature Trend</h4>
          <div className="h-20">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={temperatureData}>
                <XAxis dataKey="day" hide />
                <YAxis hide />
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="#3b82f6"
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
