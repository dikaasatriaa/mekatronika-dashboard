import { useState } from 'react';
import { History as HistoryIcon, Download, Filter, Search } from 'lucide-react';
import { format } from 'date-fns';

interface HistoryEvent {
  id: string;
  timestamp: number;
  r: number;
  g: number;
  b: number;
  status: 'backflow' | 'normal';
  clampAction: 'activated' | 'none';
  alarmAction: 'triggered' | 'none';
  location: string;
}

export function History() {
  const [filter, setFilter] = useState<'all' | 'today' | '24h' | 'week'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock historical data
  const events: HistoryEvent[] = [
    {
      id: '1',
      timestamp: Date.now() - 120000,
      r: 235,
      g: 45,
      b: 52,
      status: 'backflow',
      clampAction: 'activated',
      alarmAction: 'triggered',
      location: 'Room 204, IV Line #3',
    },
    {
      id: '2',
      timestamp: Date.now() - 3600000,
      r: 180,
      g: 55,
      b: 48,
      status: 'normal',
      clampAction: 'none',
      alarmAction: 'none',
      location: 'Room 305, IV Line #1',
    },
    {
      id: '3',
      timestamp: Date.now() - 7200000,
      r: 242,
      g: 38,
      b: 41,
      status: 'backflow',
      clampAction: 'activated',
      alarmAction: 'triggered',
      location: 'Room 412, IV Line #2',
    },
    {
      id: '4',
      timestamp: Date.now() - 86400000,
      r: 175,
      g: 62,
      b: 55,
      status: 'normal',
      clampAction: 'none',
      alarmAction: 'none',
      location: 'Room 107, IV Line #4',
    },
    {
      id: '5',
      timestamp: Date.now() - 172800000,
      r: 238,
      g: 42,
      b: 48,
      status: 'backflow',
      clampAction: 'activated',
      alarmAction: 'triggered',
      location: 'Room 521, IV Line #1',
    },
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Event History</h2>
        <p className="text-gray-600 mt-1">View past backflow events and system logs</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Time
            </button>
            <button
              onClick={() => setFilter('today')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'today'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setFilter('24h')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === '24h'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Last 24h
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
            <Download size={20} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Total Events</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{events.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Backflow Detected</p>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {events.filter(e => e.status === 'backflow').length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Clamp Activations</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">
            {events.filter(e => e.clampAction === 'activated').length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Alarm Triggers</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {events.filter(e => e.alarmAction === 'triggered').length}
          </p>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  RGB Values
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions Taken
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEvents.map(event => (
                <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{format(event.timestamp, 'MMM dd, yyyy')}</div>
                    <div className="text-sm text-gray-500">{format(event.timestamp, 'HH:mm:ss')}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{event.location}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="text-sm">
                        <span className="text-red-600 font-medium">R: {event.r}</span>
                        {' | '}
                        <span className="text-green-600 font-medium">G: {event.g}</span>
                        {' | '}
                        <span className="text-blue-600 font-medium">B: {event.b}</span>
                      </div>
                      <div
                        className="w-8 h-8 rounded border border-gray-200"
                        style={{ backgroundColor: `rgb(${event.r}, ${event.g}, ${event.b})` }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        event.status === 'backflow'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {event.status === 'backflow' ? 'Backflow' : 'Normal'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      {event.clampAction === 'activated' && (
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                          Clamp Activated
                        </span>
                      )}
                      {event.alarmAction === 'triggered' && (
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                          Alarm Triggered
                        </span>
                      )}
                      {event.clampAction === 'none' && event.alarmAction === 'none' && (
                        <span className="text-xs text-gray-500">No action</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
