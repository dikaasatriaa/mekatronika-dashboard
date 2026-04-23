import { Droplet, Lock, Volume2 } from 'lucide-react';

interface SensorDataPanelProps {
  rgb: { r: number; g: number; b: number };
  clampStatus: 'open' | 'clamped';
  alarmStatus: 'on' | 'off';
}

export function SensorDataPanel({ rgb, clampStatus, alarmStatus }: SensorDataPanelProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Droplet className="text-blue-600" size={24} />
        <h3 className="text-lg font-semibold text-gray-900">Sensor Data</h3>
      </div>

      {/* RGB Color Sensor */}
      <div className="space-y-4">
        <p className="text-sm text-gray-600">TCS3200 Color Sensor Readings</p>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Red (R)</span>
              <span className="text-lg font-bold text-red-600">{rgb.r}</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500 transition-all duration-500"
                style={{ width: `${(rgb.r / 255) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Green (G)</span>
              <span className="text-lg font-bold text-green-600">{rgb.g}</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-500"
                style={{ width: `${(rgb.g / 255) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Blue (B)</span>
              <span className="text-lg font-bold text-blue-600">{rgb.b}</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-500"
                style={{ width: `${(rgb.b / 255) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Color Preview */}
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Current Color</p>
          <div
            className="w-full h-16 rounded-lg border-2 border-gray-200"
            style={{ backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` }}
          />
        </div>
      </div>

      {/* Actuator Status */}
      <div className="pt-6 border-t border-gray-200 space-y-4">
        <p className="text-sm text-gray-600">Actuator Status</p>
        
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Lock size={20} className={clampStatus === 'clamped' ? 'text-red-600' : 'text-gray-400'} />
            <span className="text-sm font-medium text-gray-700">Servo Clamp</span>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              clampStatus === 'clamped'
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
            }`}
          >
            {clampStatus === 'clamped' ? 'Clamped' : 'Open'}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Volume2 size={20} className={alarmStatus === 'on' ? 'text-red-600' : 'text-gray-400'} />
            <span className="text-sm font-medium text-gray-700">Audio Alarm</span>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              alarmStatus === 'on'
                ? 'bg-red-100 text-red-700'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {alarmStatus === 'on' ? 'Active' : 'Off'}
          </span>
        </div>
      </div>
    </div>
  );
}
