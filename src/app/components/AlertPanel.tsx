import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';
import type { Alert } from '../pages/Dashboard';

interface AlertPanelProps {
  alerts: Alert[];
  onAcknowledge: (id: string) => void;
}

export function AlertPanel({ alerts, onAcknowledge }: AlertPanelProps) {
  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'high':
        return 'bg-red-50 border-red-200 text-red-700';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'low':
        return 'bg-blue-50 border-blue-200 text-blue-700';
    }
  };

  const getSeverityIcon = (severity: Alert['severity']) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle size={20} className="text-red-600" />;
      case 'medium':
        return <Clock size={20} className="text-yellow-600" />;
      case 'low':
        return <AlertTriangle size={20} className="text-blue-600" />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <AlertTriangle className="text-red-600" size={24} />
          <h3 className="text-lg font-semibold text-gray-900">Alerts & Notifications</h3>
        </div>
        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
          {alerts.filter(a => !a.acknowledged).length} Active
        </span>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle size={48} className="mx-auto text-green-500 mb-3" />
            <p className="text-gray-600">No alerts at this time</p>
            <p className="text-sm text-gray-500">System is operating normally</p>
          </div>
        ) : (
          alerts.map(alert => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                alert.acknowledged
                  ? 'bg-gray-50 border-gray-200 opacity-60'
                  : getSeverityColor(alert.severity)
              }`}
            >
              <div className="flex items-start gap-3">
                {getSeverityIcon(alert.severity)}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{alert.message}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {format(alert.timestamp, 'MMM dd, yyyy HH:mm:ss')}
                  </p>
                  {alert.acknowledged && (
                    <div className="flex items-center gap-1 mt-2">
                      <CheckCircle size={14} className="text-green-600" />
                      <span className="text-xs text-green-600 font-medium">Acknowledged</span>
                    </div>
                  )}
                </div>
                {!alert.acknowledged && (
                  <button
                    onClick={() => onAcknowledge(alert.id)}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Acknowledge
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
