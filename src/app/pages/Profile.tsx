import { User, Mail, Phone, Building, Shield, LogOut, HelpCircle, FileText } from 'lucide-react';

export function Profile() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Profile & Help</h2>
        <p className="text-gray-600 mt-1">Manage your account and access help resources</p>
      </div>

      {/* User Profile Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
            <User size={48} className="text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">Dr. Sarah Johnson</h3>
            <p className="text-gray-600">Registered Nurse</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                Staff
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                Verified
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Mail size={20} className="text-gray-600" />
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-900">sarah.johnson@hospital.com</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Phone size={20} className="text-gray-600" />
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium text-gray-900">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Building size={20} className="text-gray-600" />
            <div>
              <p className="text-sm text-gray-600">Department</p>
              <p className="font-medium text-gray-900">ICU - Floor 3</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Shield size={20} className="text-gray-600" />
            <div>
              <p className="text-sm text-gray-600">Employee ID</p>
              <p className="font-medium text-gray-900">EMP-2024-5612</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Edit Profile
          </button>
          <button className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
            Change Password
          </button>
        </div>
      </div>

      {/* Help & Tutorial */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="text-blue-600" size={24} />
          <h3 className="text-lg font-semibold text-gray-900">Help & Resources</h3>
        </div>

        <div className="space-y-3">
          <a
            href="#"
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileText size={20} className="text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Quick Start Guide</p>
                <p className="text-sm text-gray-600">Learn the basics of InfuSafe</p>
              </div>
            </div>
            <span className="text-blue-600">→</span>
          </a>

          <a
            href="#"
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileText size={20} className="text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Understanding Alerts</p>
                <p className="text-sm text-gray-600">How to respond to backflow alerts</p>
              </div>
            </div>
            <span className="text-blue-600">→</span>
          </a>

          <a
            href="#"
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileText size={20} className="text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Sensor Calibration</p>
                <p className="text-sm text-gray-600">How to adjust sensor thresholds</p>
              </div>
            </div>
            <span className="text-blue-600">→</span>
          </a>

          <a
            href="#"
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileText size={20} className="text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Troubleshooting</p>
                <p className="text-sm text-gray-600">Common issues and solutions</p>
              </div>
            </div>
            <span className="text-blue-600">→</span>
          </a>

          <a
            href="#"
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <HelpCircle size={20} className="text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Contact Support</p>
                <p className="text-sm text-gray-600">Get help from our technical team</p>
              </div>
            </div>
            <span className="text-blue-600">→</span>
          </a>
        </div>
      </div>

      {/* System Tutorial */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">InfuSafe Tutorial</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
              1
            </div>
            <div>
              <p className="font-medium text-gray-900">Monitor Dashboard</p>
              <p className="text-sm text-gray-600">
                Keep an eye on real-time sensor readings and system status
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
              2
            </div>
            <div>
              <p className="font-medium text-gray-900">Respond to Alerts</p>
              <p className="text-sm text-gray-600">
                When backflow is detected, acknowledge alerts and check the affected IV line
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
              3
            </div>
            <div>
              <p className="font-medium text-gray-900">Review History</p>
              <p className="text-sm text-gray-600">
                Check past events to identify patterns and maintain patient safety records
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
              4
            </div>
            <div>
              <p className="font-medium text-gray-900">Configure Settings</p>
              <p className="text-sm text-gray-600">
                Adjust sensor thresholds and notification preferences as needed
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
          <LogOut size={20} />
          Logout from InfuSafe
        </button>
      </div>
    </div>
  );
}
