import { TestTube, RefreshCw, Download } from 'lucide-react';

interface ActionButtonsProps {
  onManualTest: () => void;
  onRefresh: () => void;
}

export function ActionButtons({ onManualTest, onRefresh }: ActionButtonsProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>

      <button
        onClick={onManualTest}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        <TestTube size={20} />
        Manual Test Actuator
      </button>

      <button
        onClick={onRefresh}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
      >
        <RefreshCw size={20} />
        Refresh Data
      </button>

      <div className="pt-4 border-t border-gray-200">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-50 text-green-700 rounded-lg font-medium hover:bg-green-100 transition-colors">
          <Download size={20} />
          Export Current Data
        </button>
      </div>

      <div className="pt-4 border-t border-gray-200 space-y-3">
        <h4 className="text-sm font-semibold text-gray-700">System Info</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Firmware</span>
            <span className="font-medium text-gray-900">v2.4.1</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Uptime</span>
            <span className="font-medium text-gray-900">23h 14m</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Connection</span>
            <span className="font-medium text-green-600">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
