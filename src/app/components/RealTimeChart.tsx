import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { TrendingUp } from 'lucide-react';
import type { SensorReading } from '../pages/Dashboard';

interface RealTimeChartProps {
  data: SensorReading[];
}

export function RealTimeChart({ data }: RealTimeChartProps) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="text-blue-600" size={24} />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Real-Time Sensor Graph</h3>
            <p className="text-sm text-gray-600">Last 60 seconds of RGB readings</p>
          </div>
        </div>
        <div className="h-[300px] flex items-center justify-center text-gray-400">
          <p>Waiting for sensor data...</p>
        </div>
      </div>
    );
  }

  // Create chart data with unique keys including milliseconds
  const chartData = data.map((reading) => ({
    // Use ID as the unique key for Recharts
    name: reading.id,
    time: format(reading.timestamp, 'HH:mm:ss'),
    timestamp: reading.timestamp,
    R: reading.r,
    G: reading.g,
    B: reading.b,
  }));

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="text-blue-600" size={24} />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Real-Time Sensor Graph</h3>
          <p className="text-sm text-gray-600">Last 60 seconds of RGB readings</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="time"
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            interval="preserveStartEnd"
          />
          <YAxis
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            domain={[0, 255]}
            label={{ value: 'RGB Value', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
            labelFormatter={(value) => `Time: ${value}`}
          />
          <Legend />
          <Line
            key="line-R"
            type="monotone"
            dataKey="R"
            stroke="#ef4444"
            strokeWidth={2}
            dot={false}
            name="Red"
            isAnimationActive={false}
          />
          <Line
            key="line-G"
            type="monotone"
            dataKey="G"
            stroke="#22c55e"
            strokeWidth={2}
            dot={false}
            name="Green"
            isAnimationActive={false}
          />
          <Line
            key="line-B"
            type="monotone"
            dataKey="B"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            name="Blue"
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
