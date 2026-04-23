import { CheckCircle, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';

interface SystemStatusProps {
  status: 'safe' | 'alert';
  lastUpdated: number;
}

export function SystemStatus({ status, lastUpdated }: SystemStatusProps) {
  const isSafe = status === 'safe';

  return (
    <div
      className={`rounded-xl p-6 border-2 transition-all ${
        isSafe
          ? 'bg-green-50 border-green-200'
          : 'bg-red-50 border-red-300 animate-pulse'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {isSafe ? (
            <CheckCircle size={48} className="text-green-600" />
          ) : (
            <AlertTriangle size={48} className="text-red-600" />
          )}
          <div>
            <h3 className={`text-3xl font-bold ${isSafe ? 'text-green-700' : 'text-red-700'}`}>
              {isSafe ? 'System Safe' : 'Backflow Detected'}
            </h3>
            <p className={`mt-1 ${isSafe ? 'text-green-600' : 'text-red-600'}`}>
              {isSafe
                ? 'All IV lines operating normally'
                : 'Immediate attention required - Safety clamp activated'}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Last Updated</p>
          <p className="text-lg font-semibold text-gray-700">
            {format(lastUpdated, 'HH:mm:ss')}
          </p>
          <p className="text-xs text-gray-500">{format(lastUpdated, 'MMM dd, yyyy')}</p>
        </div>
      </div>
    </div>
  );
}
