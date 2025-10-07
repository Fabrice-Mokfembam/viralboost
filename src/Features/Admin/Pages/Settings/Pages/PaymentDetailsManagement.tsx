import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Bitcoin, CreditCard, Coins } from 'lucide-react';
import { toast } from 'react-toastify';
import {
  useAdminPaymentDetails,
  useCreatePaymentDetails,
  useUpdatePaymentDetails,
  useDeletePaymentDetails
} from '../Hooks';
import type { PaymentDetails } from '../Types';

const PaymentDetailsManagement: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    bitcoin_address: '',
    ethereum_address: '',
    usdt_address: ''
  });

  // Hooks
  const { data: paymentDetailsResponse, isLoading, error } = useAdminPaymentDetails();
  const createMutation = useCreatePaymentDetails();
  const updateMutation = useUpdatePaymentDetails();
  const deleteMutation = useDeletePaymentDetails();

  const paymentDetails = paymentDetailsResponse?.data || [];

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreate = async () => {
    if (!formData.bitcoin_address || !formData.ethereum_address || !formData.usdt_address) {
      toast.error('Please fill in all address fields');
      return;
    }

    try {
      await createMutation.mutateAsync(formData);
      toast.success('Payment details created successfully!');
      setIsCreating(false);
      setFormData({ bitcoin_address: '', ethereum_address: '', usdt_address: '' });
    } catch (error) {
      toast.error('Failed to create payment details');
    }
  };

  const handleUpdate = async (id: number) => {
    if (!formData.bitcoin_address || !formData.ethereum_address || !formData.usdt_address) {
      toast.error('Please fill in all address fields');
      return;
    }

    try {
      await updateMutation.mutateAsync({ id, payload: formData });
      toast.success('Payment details updated successfully!');
      setEditingId(null);
      setFormData({ bitcoin_address: '', ethereum_address: '', usdt_address: '' });
    } catch (error) {
      toast.error('Failed to update payment details');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete these payment details?')) {
      try {
        await deleteMutation.mutateAsync(id);
        toast.success('Payment details deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete payment details');
      }
    }
  };

  const handleEdit = (details: PaymentDetails) => {
    setEditingId(details.id);
    setFormData({
      bitcoin_address: details.bitcoin_address,
      ethereum_address: details.ethereum_address,
      usdt_address: details.usdt_address
    });
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setFormData({ bitcoin_address: '', ethereum_address: '', usdt_address: '' });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400">Error loading payment details</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-text-primary">Payment Details Management</h2>
          <p className="text-text-muted text-sm">Manage cryptocurrency payment addresses</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
        >
          <Plus size={16} />
          Add Payment Details
        </button>
      </div>

      {/* Create Form */}
      {isCreating && (
        <div className="bg-bg-secondary rounded-lg p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Create Payment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                <div className="flex items-center gap-2">
                  <Bitcoin size={16} className="text-orange-500" />
                  Bitcoin Address
                </div>
              </label>
              <input
                type="text"
                value={formData.bitcoin_address}
                onChange={(e) => handleInputChange('bitcoin_address', e.target.value)}
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
                value={formData.ethereum_address}
                onChange={(e) => handleInputChange('ethereum_address', e.target.value)}
                placeholder="Enter Ethereum address"
                className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                <div className="flex items-center gap-2">
                  <Coins size={16} className="text-green-500" />
                  USDT Address
                </div>
              </label>
              <input
                type="text"
                value={formData.usdt_address}
                onChange={(e) => handleInputChange('usdt_address', e.target.value)}
                placeholder="Enter USDT address"
                className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleCreate}
              disabled={createMutation.isPending}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
            >
              <Save size={16} />
              {createMutation.isPending ? 'Creating...' : 'Create'}
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Payment Details List */}
      <div className="space-y-4">
        {paymentDetails.map((details) => (
          <div key={details.id} className="bg-bg-secondary rounded-lg p-6 border border-gray-700/50">
            {editingId === details.id ? (
              // Edit Form
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">Edit Payment Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      <div className="flex items-center gap-2">
                        <Bitcoin size={16} className="text-orange-500" />
                        Bitcoin Address
                      </div>
                    </label>
                    <input
                      type="text"
                      value={formData.bitcoin_address}
                      onChange={(e) => handleInputChange('bitcoin_address', e.target.value)}
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
                      value={formData.ethereum_address}
                      onChange={(e) => handleInputChange('ethereum_address', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      <div className="flex items-center gap-2">
                        <Coins size={16} className="text-green-500" />
                        USDT Address
                      </div>
                    </label>
                    <input
                      type="text"
                      value={formData.usdt_address}
                      onChange={(e) => handleInputChange('usdt_address', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-bg-main text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleUpdate(details.id)}
                    disabled={updateMutation.isPending}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                  >
                    <Save size={16} />
                    {updateMutation.isPending ? 'Updating...' : 'Update'}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // Display Mode
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">Payment Details #{details.id}</h3>
                    <p className="text-text-muted text-sm">
                      Created: {new Date(details.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(details)}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                    >
                      <Edit size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(details.id)}
                      disabled={deleteMutation.isPending}
                      className="flex items-center gap-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm disabled:opacity-50"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-bg-tertiary rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Bitcoin size={16} className="text-orange-500" />
                      <span className="text-sm font-medium text-text-primary">Bitcoin</span>
                    </div>
                    <p className="text-text-muted text-sm font-mono break-all">{details.bitcoin_address}</p>
                  </div>
                  <div className="bg-bg-tertiary rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard size={16} className="text-blue-500" />
                      <span className="text-sm font-medium text-text-primary">Ethereum</span>
                    </div>
                    <p className="text-text-muted text-sm font-mono break-all">{details.ethereum_address}</p>
                  </div>
                  <div className="bg-bg-tertiary rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Coins size={16} className="text-green-500" />
                      <span className="text-sm font-medium text-text-primary">USDT</span>
                    </div>
                    <p className="text-text-muted text-sm font-mono break-all">{details.usdt_address}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {paymentDetails.length === 0 && !isCreating && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard size={32} className="text-gray-500" />
          </div>
          <h3 className="text-text-primary font-semibold mb-2">No Payment Details Found</h3>
          <p className="text-text-muted text-sm mb-4">
            Get started by adding payment details for cryptocurrency addresses.
          </p>
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors mx-auto"
          >
            <Plus size={16} />
            Add Payment Details
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentDetailsManagement;
