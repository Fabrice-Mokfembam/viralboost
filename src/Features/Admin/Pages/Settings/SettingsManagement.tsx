import React, { useEffect, useState } from 'react';
import { Save, RefreshCw, DollarSign, Globe, Bitcoin, CreditCard, Coins, Plus, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAdminPaymentDetails, useUpdatePaymentDetails } from './Hooks';
import { useAdmins } from '../../Hooks/useAdmins';

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
    withdrawalProcessingFee: 2.50
  });

  const {data} = useAdmins()

  useEffect(()=>{
      console.log('admins',data)
  },[data])

  // Payment Details hooks
  const { data: paymentDetailsResponse, isLoading: paymentDetailsLoading, error: paymentDetailsError } = useAdminPaymentDetails();
  const updatePaymentDetailsMutation = useUpdatePaymentDetails();

  // Get the first payment details record (assuming there's only one active set)
  const paymentDetails = paymentDetailsResponse?.data?.[0];

  console.log(paymentDetails);
  
  // Payment details form state
  const [paymentFormData, setPaymentFormData] = useState({
    bitcoin_address: '',
    bitcoin_instructions: [] as string[],
    ethereum_address: '',
    ethereum_instructions: [] as string[],
    usdt_address_TRC20: '',
    usdt_trc20_instructions: [] as string[],
    usdt_address_ERC20: '',
    usdt_erc20_instructions: [] as string[]
  });

  // Instruction management state
  const [activeInstructionTab, setActiveInstructionTab] = useState<'bitcoin' | 'ethereum' | 'usdt_trc20' | 'usdt_erc20'>('bitcoin');
  const [newInstruction, setNewInstruction] = useState('');

  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  // Initialize payment form data when payment details are loaded
  React.useEffect(() => {
    if (paymentDetails) {
      setPaymentFormData({
        bitcoin_address: paymentDetails.bitcoin_address || '',
        bitcoin_instructions: paymentDetails.bitcoin_instructions || [],
        ethereum_address: paymentDetails.ethereum_address || '',
        ethereum_instructions: paymentDetails.ethereum_instructions || [],
        usdt_address_TRC20: paymentDetails.usdt_address_TRC20 || '',
        usdt_trc20_instructions: paymentDetails.usdt_trc20_instructions || [],
        usdt_address_ERC20: paymentDetails.usdt_address_ERC20 || '',
        usdt_erc20_instructions: paymentDetails.usdt_erc20_instructions || []
      });
    }
  }, [paymentDetails]);

  const handleInputChange = (field: keyof SettingsData, value: string | number | boolean) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentInputChange = (field: keyof typeof paymentFormData, value: string) => {
    setPaymentFormData(prev => ({ ...prev, [field]: value }));
  };

  // Instruction management functions
  const addInstruction = () => {
    if (!newInstruction.trim()) {
      toast.error('Please enter an instruction');
      return;
    }

    const instructionField = `${activeInstructionTab}_instructions` as keyof typeof paymentFormData;
    setPaymentFormData(prev => ({
      ...prev,
      [instructionField]: [...(prev[instructionField] as string[]), newInstruction.trim()]
    }));
    setNewInstruction('');
    toast.success('Instruction added successfully');
  };

  const removeInstruction = (index: number) => {
    const instructionField = `${activeInstructionTab}_instructions` as keyof typeof paymentFormData;
    setPaymentFormData(prev => ({
      ...prev,
      [instructionField]: (prev[instructionField] as string[]).filter((_, i) => i !== index)
    }));
    toast.success('Instruction removed successfully');
  };

  const getCurrentInstructions = () => {
    const instructionField = `${activeInstructionTab}_instructions` as keyof typeof paymentFormData;
    return paymentFormData[instructionField] as string[];
  };

  const handleSave = async () => {
    if (activeTab === 'financial') {
      // Save payment details
      if (!paymentDetails?.id) {
        toast.error('No payment details found to update');
        return;
      }

      if (!paymentFormData.bitcoin_address || !paymentFormData.ethereum_address || !paymentFormData.usdt_address_TRC20 || !paymentFormData.usdt_address_ERC20) {
        toast.error('Please fill in all payment address fields');
        return;
      }

      try {
        await updatePaymentDetailsMutation.mutateAsync({
          id: paymentDetails.id,
          payload: paymentFormData
        });
        toast.success('Payment details updated successfully!');
      } catch (err) {
        console.error('Payment details update error:', err);
        toast.error('Failed to update payment details');
      }
    } else {
      // Save general settings
      setIsSaving(true);
      
      // Simulate API call
      setTimeout(() => {
        toast.success('Settings saved successfully!');
        setIsSaving(false);
      }, 1500);
    }
  };

  const handleReset = () => {
    // Reset to default values
    toast.info('Settings reset to default values');
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'financial', label: 'Financial', icon: DollarSign }
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

  const renderFinancialSettings = () => {
    if (paymentDetailsLoading) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
        </div>
      );
    }

    if (paymentDetailsError) {
      return (
        <div className="text-center py-12">
          <p className="text-red-400">Error loading payment details</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
          >
            Retry
          </button>
        </div>
      );
    }

    if (!paymentDetails) {
      return (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard size={32} className="text-gray-500" />
          </div>
          <h3 className="text-text-primary font-semibold mb-2">No Payment Details Found</h3>
          <p className="text-text-muted text-sm">
            Payment details need to be created first before they can be managed here.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="bg-bg-tertiary rounded-lg p-4 border border-gray-600/50">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Payment Addresses</h3>
          <p className="text-text-muted text-sm mb-6">
            Update the cryptocurrency addresses used for payments and withdrawals.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                <div className="flex items-center gap-2">
                  <Bitcoin size={16} className="text-orange-500" />
                  Bitcoin Address
                </div>
              </label>
              <input
                type="text"
                value={paymentFormData.bitcoin_address}
                onChange={(e) => handlePaymentInputChange('bitcoin_address', e.target.value)}
                placeholder="Enter Bitcoin address"
                className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                <div className="flex items-center gap-2">
                  <CreditCard size={16} className="text-blue-500" />
                  Ethereum Address
                </div>
              </label>
              <input
                type="text"
                value={paymentFormData.ethereum_address}
                onChange={(e) => handlePaymentInputChange('ethereum_address', e.target.value)}
                placeholder="Enter Ethereum address"
                className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
              />
            </div>
          </div>

          {/* USDT Addresses Section */}
          <div className="mt-6">
            <h4 className="text-md font-semibold text-text-primary mb-4 flex items-center gap-2">
              <Coins size={18} className="text-green-500" />
              USDT Addresses
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  <div className="flex items-center gap-2">
                    <Coins size={16} className="text-green-500" />
                    USDT TRC20 Address
                  </div>
                </label>
                <input
                  type="text"
                  value={paymentFormData.usdt_address_TRC20}
                  onChange={(e) => handlePaymentInputChange('usdt_address_TRC20', e.target.value)}
                  placeholder="Enter USDT TRC20 address"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                />
                <p className="text-xs text-text-muted mt-1">Tron network USDT address</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  <div className="flex items-center gap-2">
                    <Coins size={16} className="text-green-500" />
                    USDT ERC20 Address
                  </div>
                </label>
                <input
                  type="text"
                  value={paymentFormData.usdt_address_ERC20}
                  onChange={(e) => handlePaymentInputChange('usdt_address_ERC20', e.target.value)}
                  placeholder="Enter USDT ERC20 address"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                />
                <p className="text-xs text-text-muted mt-1">Ethereum network USDT address</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Instructions Management */}
        <div className="bg-bg-tertiary rounded-lg p-4 border border-gray-600/50 mt-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Payment Instructions</h3>
          <p className="text-text-muted text-sm mb-6">
            Add step-by-step instructions for each payment method to help users complete their transactions.
          </p>
          
          {/* Instruction Tabs */}
          <div className="bg-bg-secondary rounded-xl p-1 mb-6 border border-gray-700/50">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
              <button
                onClick={() => setActiveInstructionTab('bitcoin')}
                className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  activeInstructionTab === 'bitcoin'
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                    : 'text-text-muted hover:text-text-primary hover:bg-bg-tertiary'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Bitcoin size={18} />
                  <span>Bitcoin</span>
                </div>
              </button>
              <button
                onClick={() => setActiveInstructionTab('ethereum')}
                className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  activeInstructionTab === 'ethereum'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                    : 'text-text-muted hover:text-text-primary hover:bg-bg-tertiary'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <CreditCard size={18} />
                  <span>Ethereum</span>
                </div>
              </button>
              <button
                onClick={() => setActiveInstructionTab('usdt_trc20')}
                className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  activeInstructionTab === 'usdt_trc20'
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                    : 'text-text-muted hover:text-text-primary hover:bg-bg-tertiary'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Coins size={18} />
                  <span>USDT TRC20</span>
                </div>
              </button>
              <button
                onClick={() => setActiveInstructionTab('usdt_erc20')}
                className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  activeInstructionTab === 'usdt_erc20'
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                    : 'text-text-muted hover:text-text-primary hover:bg-bg-tertiary'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Coins size={18} />
                  <span>USDT ERC20</span>
                </div>
              </button>
            </div>
          </div>

          {/* Current Instructions Display */}
          <div className="mb-6">
            <h4 className="text-md font-semibold text-text-primary mb-3">
              Current Instructions ({getCurrentInstructions().length})
            </h4>
            {getCurrentInstructions().length === 0 ? (
              <div className="bg-bg-secondary rounded-lg p-6 text-center border border-gray-600/50">
                <p className="text-text-muted">No instructions added yet. Add your first instruction below.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {getCurrentInstructions().map((instruction, index) => (
                  <div key={index} className="bg-bg-secondary rounded-lg p-4 border border-gray-600/50 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400 text-sm font-semibold">
                        {index + 1}
                      </div>
                      <p className="text-text-primary">{instruction}</p>
                    </div>
                    <button
                      onClick={() => removeInstruction(index)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add New Instruction */}
          <div className="bg-bg-secondary rounded-lg p-4 border border-gray-600/50">
            <h4 className="text-md font-semibold text-text-primary mb-3">Add New Instruction</h4>
            <div className="flex gap-3">
              <input
                type="text"
                value={newInstruction}
                onChange={(e) => setNewInstruction(e.target.value)}
                placeholder={`Enter instruction for ${activeInstructionTab.replace('_', ' ').toUpperCase()}`}
                className="flex-1 px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                onKeyPress={(e) => e.key === 'Enter' && addInstruction()}
              />
              <button
                onClick={addInstruction}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg hover:from-cyan-600 hover:to-cyan-700 transition-all duration-300 flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };


  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'financial':
        return renderFinancialSettings();
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
            disabled={isSaving || updatePaymentDetailsMutation.isPending}
            className="flex items-center gap-2 px-4 py-2 bg-accent-cyan text-text-primary rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50"
          >
            <Save size={16} />
            {isSaving || updatePaymentDetailsMutation.isPending ? 'Saving...' : 'Save Changes'}
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

