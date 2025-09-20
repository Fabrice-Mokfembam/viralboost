import React, { useState } from 'react';
import { Save, RefreshCw, Shield, DollarSign, Users, Bell, Globe, Database } from 'lucide-react';
import { toast } from 'react-toastify';

interface SettingsData {
  // General Settings
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  maintenanceMode: boolean;
  
  // Financial Settings
  pointsToCurrencyRate: number;
  minimumPayoutThreshold: number;
  maximumPayoutAmount: number;
  withdrawalProcessingFee: number;
  
  // User Settings
  allowUserRegistration: boolean;
  requireEmailVerification: boolean;
  requirePhoneVerification: boolean;
  maxDailyTasksPerUser: number;
  
  // Notification Settings
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  adminEmailNotifications: boolean;
  
  // Security Settings
  sessionTimeout: number;
  maxLoginAttempts: number;
  twoFactorAuth: boolean;
  passwordMinLength: number;
  
  // API Settings
  apiRateLimit: number;
  apiKeyExpiration: number;
  enableApiLogging: boolean;
}

const SettingsManagement: React.FC = () => {
  const [settings, setSettings] = useState<SettingsData>({
    // General Settings
    siteName: 'ViralBoost',
    siteDescription: 'Earn money by completing micro-tasks on social media',
    siteUrl: 'https://viralboost.com',
    maintenanceMode: false,
    
    // Financial Settings
    pointsToCurrencyRate: 0.01,
    minimumPayoutThreshold: 10.00,
    maximumPayoutAmount: 1000.00,
    withdrawalProcessingFee: 2.50,
    
    // User Settings
    allowUserRegistration: true,
    requireEmailVerification: true,
    requirePhoneVerification: false,
    maxDailyTasksPerUser: 50,
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    adminEmailNotifications: true,
    
    // Security Settings
    sessionTimeout: 24,
    maxLoginAttempts: 5,
    twoFactorAuth: false,
    passwordMinLength: 8,
    
    // API Settings
    apiRateLimit: 1000,
    apiKeyExpiration: 30,
    enableApiLogging: true
  });

  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const handleInputChange = (field: keyof SettingsData, value: string | number | boolean) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Settings saved successfully!');
      setIsSaving(false);
    }, 1500);
  };

  const handleReset = () => {
    // Reset to default values
    toast.info('Settings reset to default values');
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'financial', label: 'Financial', icon: DollarSign },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'api', label: 'API', icon: Database }
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Site Name</label>
          <input
            type="text"
            value={settings.siteName}
            onChange={(e) => handleInputChange('siteName', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Site URL</label>
          <input
            type="url"
            value={settings.siteUrl}
            onChange={(e) => handleInputChange('siteUrl', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Site Description</label>
        <textarea
          value={settings.siteDescription}
          onChange={(e) => handleInputChange('siteDescription', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
        />
      </div>

      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="maintenanceMode"
          checked={settings.maintenanceMode}
          onChange={(e) => handleInputChange('maintenanceMode', e.target.checked)}
          className="w-4 h-4 text-accent-cyan bg-bg-main border-border rounded focus:ring-accent-cyan"
        />
        <label htmlFor="maintenanceMode" className="text-sm font-medium text-text-primary">
          Enable Maintenance Mode
        </label>
      </div>
    </div>
  );

  const renderFinancialSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Points to Currency Rate ($)</label>
          <input
            type="number"
            step="0.01"
            value={settings.pointsToCurrencyRate}
            onChange={(e) => handleInputChange('pointsToCurrencyRate', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Minimum Payout Threshold ($)</label>
          <input
            type="number"
            step="0.01"
            value={settings.minimumPayoutThreshold}
            onChange={(e) => handleInputChange('minimumPayoutThreshold', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Maximum Payout Amount ($)</label>
          <input
            type="number"
            step="0.01"
            value={settings.maximumPayoutAmount}
            onChange={(e) => handleInputChange('maximumPayoutAmount', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Withdrawal Processing Fee ($)</label>
          <input
            type="number"
            step="0.01"
            value={settings.withdrawalProcessingFee}
            onChange={(e) => handleInputChange('withdrawalProcessingFee', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
          />
        </div>
      </div>
    </div>
  );

  const renderUserSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="allowUserRegistration"
            checked={settings.allowUserRegistration}
            onChange={(e) => handleInputChange('allowUserRegistration', e.target.checked)}
            className="w-4 h-4 text-accent-cyan bg-bg-main border-border rounded focus:ring-accent-cyan"
          />
          <label htmlFor="allowUserRegistration" className="text-sm font-medium text-text-primary">
            Allow User Registration
          </label>
        </div>
        
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="requireEmailVerification"
            checked={settings.requireEmailVerification}
            onChange={(e) => handleInputChange('requireEmailVerification', e.target.checked)}
            className="w-4 h-4 text-accent-cyan bg-bg-main border-border rounded focus:ring-accent-cyan"
          />
          <label htmlFor="requireEmailVerification" className="text-sm font-medium text-text-primary">
            Require Email Verification
          </label>
        </div>
        
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="requirePhoneVerification"
            checked={settings.requirePhoneVerification}
            onChange={(e) => handleInputChange('requirePhoneVerification', e.target.checked)}
            className="w-4 h-4 text-accent-cyan bg-bg-main border-border rounded focus:ring-accent-cyan"
          />
          <label htmlFor="requirePhoneVerification" className="text-sm font-medium text-text-primary">
            Require Phone Verification
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Max Daily Tasks Per User</label>
        <input
          type="number"
          value={settings.maxDailyTasksPerUser}
          onChange={(e) => handleInputChange('maxDailyTasksPerUser', parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
        />
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="emailNotifications"
          checked={settings.emailNotifications}
          onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
          className="w-4 h-4 text-accent-cyan bg-bg-main border-border rounded focus:ring-accent-cyan"
        />
        <label htmlFor="emailNotifications" className="text-sm font-medium text-text-primary">
          Email Notifications
        </label>
      </div>
      
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="smsNotifications"
          checked={settings.smsNotifications}
          onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
          className="w-4 h-4 text-accent-cyan bg-bg-main border-border rounded focus:ring-accent-cyan"
        />
        <label htmlFor="smsNotifications" className="text-sm font-medium text-text-primary">
          SMS Notifications
        </label>
      </div>
      
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="pushNotifications"
          checked={settings.pushNotifications}
          onChange={(e) => handleInputChange('pushNotifications', e.target.checked)}
          className="w-4 h-4 text-accent-cyan bg-bg-main border-border rounded focus:ring-accent-cyan"
        />
        <label htmlFor="pushNotifications" className="text-sm font-medium text-text-primary">
          Push Notifications
        </label>
      </div>
      
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="adminEmailNotifications"
          checked={settings.adminEmailNotifications}
          onChange={(e) => handleInputChange('adminEmailNotifications', e.target.checked)}
          className="w-4 h-4 text-accent-cyan bg-bg-main border-border rounded focus:ring-accent-cyan"
        />
        <label htmlFor="adminEmailNotifications" className="text-sm font-medium text-text-primary">
          Admin Email Notifications
        </label>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Session Timeout (hours)</label>
          <input
            type="number"
            value={settings.sessionTimeout}
            onChange={(e) => handleInputChange('sessionTimeout', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Max Login Attempts</label>
          <input
            type="number"
            value={settings.maxLoginAttempts}
            onChange={(e) => handleInputChange('maxLoginAttempts', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Password Min Length</label>
          <input
            type="number"
            value={settings.passwordMinLength}
            onChange={(e) => handleInputChange('passwordMinLength', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
          />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="twoFactorAuth"
          checked={settings.twoFactorAuth}
          onChange={(e) => handleInputChange('twoFactorAuth', e.target.checked)}
          className="w-4 h-4 text-accent-cyan bg-bg-main border-border rounded focus:ring-accent-cyan"
        />
        <label htmlFor="twoFactorAuth" className="text-sm font-medium text-text-primary">
          Enable Two-Factor Authentication
        </label>
      </div>
    </div>
  );

  const renderApiSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">API Rate Limit (requests/hour)</label>
          <input
            type="number"
            value={settings.apiRateLimit}
            onChange={(e) => handleInputChange('apiRateLimit', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">API Key Expiration (days)</label>
          <input
            type="number"
            value={settings.apiKeyExpiration}
            onChange={(e) => handleInputChange('apiKeyExpiration', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
          />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="enableApiLogging"
          checked={settings.enableApiLogging}
          onChange={(e) => handleInputChange('enableApiLogging', e.target.checked)}
          className="w-4 h-4 text-accent-cyan bg-bg-main border-border rounded focus:ring-accent-cyan"
        />
        <label htmlFor="enableApiLogging" className="text-sm font-medium text-text-primary">
          Enable API Logging
        </label>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'financial':
        return renderFinancialSettings();
      case 'users':
        return renderUserSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'api':
        return renderApiSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Settings Management</h1>
          <p className="text-text-secondary mt-1">
            Configure system settings and preferences
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <RefreshCw size={16} />
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 bg-accent-cyan text-text-primary rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50"
          >
            <Save size={16} />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Settings Tabs */}
      <div className="bg-bg-secondary rounded-lg">
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-accent-cyan text-accent-cyan'
                      : 'border-transparent text-text-muted hover:text-text-primary hover:border-gray-300'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default SettingsManagement;

