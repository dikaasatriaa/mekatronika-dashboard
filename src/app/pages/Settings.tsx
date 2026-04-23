import { useState } from 'react';
import { Settings as SettingsIcon, Wifi, Database, Bell, TestTube, Info } from 'lucide-react';

export function Settings() {
  const [wifiStatus, setWifiStatus] = useState<'connected' | 'disconnected'>('connected');
  const [mqttStatus, setMqttStatus] = useState<'connected' | 'disconnected'>('connected');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [thresholds, setThresholds] = useState({
    r: 200,
    g: 80,
    b: 80,
  });

  const handleTestActuator = () => {
    alert('Manual actuator test initiated. Clamp will activate for 3 seconds.');
  };

  const handleSaveThresholds = () => {
    alert('Threshold settings saved successfully.');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Settings & Configuration</h2>
        <p className="text-gray-600 mt-1">Manage system settings and preferences</p>
      </div>

      {/* Connection Status */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Wifi className="text-blue-600" size={24} />
          <h3 className="text-lg font-semibold text-gray-900">Connection Status</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Wifi size={20} className="text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Wi-Fi Connection</p>
                <p className="text-sm text-gray-600">Hospital Network</p>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                wifiStatus === 'connected'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {wifiStatus === 'connected' ? 'Connected' : 'Disconnected'}
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Database size={20} className="text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">MQTT Broker</p>
                <p className="text-sm text-gray-600">mqtt.hospital.local:1883</p>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                mqttStatus === 'connected'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {mqttStatus === 'connected' ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
      </div>

      {/* Sensor Thresholds */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <SettingsIcon className="text-blue-600" size={24} />
          <h3 className="text-lg font-semibold text-gray-900">Sensor Thresholds</h3>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Adjust RGB sensor thresholds for backflow detection. Values above these thresholds will trigger alerts.
        </p>

        <div className="space-y-6">
          <div>
            <label className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Red Threshold (R)</span>
              <span className="text-lg font-bold text-red-600">{thresholds.r}</span>
            </label>
            <input
              type="range"
              min="0"
              max="255"
              value={thresholds.r}
              onChange={(e) => setThresholds({ ...thresholds, r: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
            />
          </div>

          <div>
            <label className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Green Threshold (G)</span>
              <span className="text-lg font-bold text-green-600">{thresholds.g}</span>
            </label>
            <input
              type="range"
              min="0"
              max="255"
              value={thresholds.g}
              onChange={(e) => setThresholds({ ...thresholds, g: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
          </div>

          <div>
            <label className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Blue Threshold (B)</span>
              <span className="text-lg font-bold text-blue-600">{thresholds.b}</span>
            </label>
            <input
              type="range"
              min="0"
              max="255"
              value={thresholds.b}
              onChange={(e) => setThresholds({ ...thresholds, b: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <button
            onClick={handleSaveThresholds}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Save Threshold Settings
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notification Preferences */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="text-blue-600" size={24} />
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Alert Notifications</p>
                <p className="text-sm text-gray-600">Receive backflow alerts</p>
              </div>
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  notificationsEnabled ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    notificationsEnabled ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg opacity-50">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-600">Send alerts via email</p>
              </div>
              <button className="relative w-12 h-6 rounded-full transition-colors bg-gray-300">
                <span className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full" />
              </button>
            </div>
          </div>
        </div>

        {/* Manual Testing */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <TestTube className="text-blue-600" size={24} />
            <h3 className="text-lg font-semibold text-gray-900">Manual Testing</h3>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Test system actuators manually to verify functionality.
          </p>

          <div className="space-y-3">
            <button
              onClick={handleTestActuator}
              className="w-full px-4 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors"
            >
              Test Servo Clamp
            </button>
            <button
              onClick={() => alert('Audio alarm test initiated.')}
              className="w-full px-4 py-3 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors"
            >
              Test Audio Alarm
            </button>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Info className="text-blue-600" size={24} />
          <h3 className="text-lg font-semibold text-gray-900">System Information</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Firmware Version</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">v2.4.1</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Hardware Version</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">InfuSafe Pro v3</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Hospital</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">General Hospital</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Department</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">ICU - Floor 3</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Device ID</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">IS-2024-0312</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Last Maintenance</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">March 15, 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
