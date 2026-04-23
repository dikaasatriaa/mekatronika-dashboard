import { useState, useEffect, useRef } from 'react';
import { SystemStatus } from '../components/SystemStatus';
import { SensorDataPanel } from '../components/SensorDataPanel';
import { RealTimeChart } from '../components/RealTimeChart';
import { AlertPanel } from '../components/AlertPanel';
import { ActionButtons } from '../components/ActionButtons';

export interface SensorReading {
  id: string;
  timestamp: number;
  r: number;
  g: number;
  b: number;
  status: 'safe' | 'alert';
}

export interface Alert {
  id: string;
  timestamp: number;
  severity: 'high' | 'medium' | 'low';
  message: string;
  acknowledged: boolean;
}

export function Dashboard() {
  const counterRef = useRef(0);
  
  // Initialize with some data points for immediate display
  const generateInitialData = () => {
    const initial: SensorReading[] = [];
    const now = Date.now();
    for (let i = 10; i >= 0; i--) {
      counterRef.current++;
      initial.push({
        id: `data-${counterRef.current}`,
        timestamp: now - (i * 2000),
        r: Math.floor(Math.random() * 100 + 150),
        g: Math.floor(Math.random() * 100 + 30),
        b: Math.floor(Math.random() * 100 + 30),
        status: 'safe',
      });
    }
    return initial;
  };

  const [sensorData, setSensorData] = useState<SensorReading[]>(generateInitialData());
  const [currentReading, setCurrentReading] = useState({ r: 180, g: 50, b: 50 });
  const [systemStatus, setSystemStatus] = useState<'safe' | 'alert'>('safe');
  const [clampStatus, setClampStatus] = useState<'open' | 'clamped'>('open');
  const [alarmStatus, setAlarmStatus] = useState<'on' | 'off'>('off');
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      timestamp: Date.now() - 120000,
      severity: 'high',
      message: 'Backflow detected in IV Line #3 - Patient Room 204',
      acknowledged: false,
    },
  ]);

  // Simulate real-time sensor data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      counterRef.current++;
      
      const newReading: SensorReading = {
        id: `data-${counterRef.current}`,
        timestamp: now,
        r: Math.floor(Math.random() * 255),
        g: Math.floor(Math.random() * 255),
        b: Math.floor(Math.random() * 255),
        status: 'safe',
      };

      // Simulate backflow detection (low probability)
      if (Math.random() < 0.05) {
        newReading.r = Math.floor(Math.random() * 50 + 200); // High red value
        newReading.g = Math.floor(Math.random() * 80);
        newReading.b = Math.floor(Math.random() * 80);
        newReading.status = 'alert';
        
        setSystemStatus('alert');
        setClampStatus('clamped');
        setAlarmStatus('on');
        
        // Add new alert
        const newAlert: Alert = {
          id: Date.now().toString(),
          timestamp: Date.now(),
          severity: 'high',
          message: 'Backflow detected! RGB anomaly detected in sensor readings.',
          acknowledged: false,
        };
        setAlerts(prev => [newAlert, ...prev].slice(0, 10));
      } else {
        // Normal readings
        newReading.r = Math.floor(Math.random() * 100 + 150);
        newReading.g = Math.floor(Math.random() * 100 + 30);
        newReading.b = Math.floor(Math.random() * 100 + 30);
        
        if (systemStatus === 'alert') {
          // Auto-resolve after some time
          const hasUnacknowledged = alerts.some(a => !a.acknowledged);
          if (!hasUnacknowledged) {
            setSystemStatus('safe');
            setClampStatus('open');
            setAlarmStatus('off');
          }
        }
      }

      setCurrentReading({ r: newReading.r, g: newReading.g, b: newReading.b });
      setSensorData(prev => [...prev.slice(-59), newReading]);
    }, 2000);

    return () => clearInterval(interval);
  }, [systemStatus, alerts]);

  const handleAcknowledgeAlert = (id: string) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === id ? { ...alert, acknowledged: true } : alert
      )
    );
  };

  const handleManualTest = () => {
    const testAlert: Alert = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      severity: 'medium',
      message: 'Manual actuator test initiated by staff',
      acknowledged: false,
    };
    setAlerts(prev => [testAlert, ...prev]);
    setClampStatus('clamped');
    setAlarmStatus('on');
    
    setTimeout(() => {
      setClampStatus('open');
      setAlarmStatus('off');
    }, 3000);
  };

  const handleRefresh = () => {
    counterRef.current = 0;
    setSensorData(generateInitialData());
    setCurrentReading({ r: 180, g: 50, b: 50 });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Real-Time Monitoring</h2>
        <p className="text-gray-600 mt-1">Dashboard</p>
      </div>

      {/* System Status Overview */}
      <SystemStatus status={systemStatus} lastUpdated={Date.now()} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sensor Data Panel */}
        <div className="lg:col-span-1">
          <SensorDataPanel
            rgb={currentReading}
            clampStatus={clampStatus}
            alarmStatus={alarmStatus}
          />
        </div>

        {/* Real-Time Chart */}
        <div className="lg:col-span-2">
          <RealTimeChart data={sensorData} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alert Panel */}
        <div className="lg:col-span-2">
          <AlertPanel
            alerts={alerts}
            onAcknowledge={handleAcknowledgeAlert}
          />
        </div>

        {/* Action Buttons */}
        <div className="lg:col-span-1">
          <ActionButtons
            onManualTest={handleManualTest}
            onRefresh={handleRefresh}
          />
        </div>
      </div>
    </div>
  );
}