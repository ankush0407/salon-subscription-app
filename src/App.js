import React, { useState, useCallback, useEffect } from 'react';
import { Calendar, User, Package, ChevronRight, Search, Plus, Check, X } from 'lucide-react';
import { authAPI, customersAPI, subscriptionsAPI, subscriptionTypesAPI } from './services/api';


function AddCustomerModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    try {
      await onSubmit(formData);
      setFormData({ name: '', email: '', phone: '' });
    } catch (error) {
      alert('Error adding customer: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Customer</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300"
            >
              {loading ? 'Adding...' : 'Add Customer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
function ManageSubscriptionTypesModal({ onClose, subscriptionTypes, onAdd, onDelete }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', visits: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.name || !formData.visits) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await onAdd(formData);
      setFormData({ name: '', visits: '' });
      setShowAddForm(false);
    } catch (error) {
      alert('Error adding subscription type: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (typeId) => {
    if (!window.confirm('Are you sure you want to delete this subscription type?')) {
      return;
    }

    try {
      await onDelete(typeId);
    } catch (error) {
      alert('Error deleting subscription type: ' + error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl my-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Manage Subscription Types</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {!showAddForm ? (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full mb-4 flex items-center justify-center gap-2 py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            Add New Subscription Type
          </button>
        ) : (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-4">Add New Subscription Type</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Package Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., 10-Visit Spa Package"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Visits</label>
                <input
                  type="number"
                  value={formData.visits}
                  onChange={(e) => setFormData({ ...formData, visits: e.target.value })}
                  placeholder="e.g., 10"
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setFormData({ name: '', visits: '' });
                  }}
                  className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300"
                >
                  {loading ? 'Adding...' : 'Add Type'}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="max-h-96 overflow-y-auto">
          <h3 className="font-semibold mb-3">Existing Subscription Types</h3>
          {subscriptionTypes.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No subscription types yet</p>
          ) : (
            <div className="space-y-2">
              {subscriptionTypes.map((type) => (
                <div key={type.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{type.name}</p>
                    <p className="text-sm text-gray-600">{type.visits} visits included</p>
                  </div>
                  <button
                    onClick={() => handleDelete(type.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t">
          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
function AddSubscriptionModal({ onClose, onSubmit, subscriptionTypes }) {
  const [selectedType, setSelectedType] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!selectedType) return;
    
    setLoading(true);
    try {
      await onSubmit(selectedType);
    } catch (error) {
      alert('Error adding subscription: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl my-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add Subscription Package</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto pr-2">
          {subscriptionTypes.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No subscription types available. Ask owner to add some.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {subscriptionTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedType?.id === type.id
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{type.name}</h3>
                    {selectedType?.id === type.id && (
                      <Check className="w-5 h-5 text-purple-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{type.visits} visits included</p>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-200 mt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!selectedType || loading || subscriptionTypes.length === 0}
            className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
              selectedType && !loading && subscriptionTypes.length > 0
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {loading ? 'Adding...' : 'Add Subscription'}
          </button>
        </div>
      </div>
    </div>
  );
}
function RedeemVisitModal({ onClose, onSubmit, subscriptionName }) {
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onSubmit(note);
      onClose();
    } catch (error) {
      alert('Error redeeming visit: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Redeem Visit</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 mb-4">
            Redeeming visit for: <strong>{subscriptionName}</strong>
          </p>
          
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Note (Optional)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g., Client requested shorter length, Used special product..."
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            This note will be saved with this visit and only visible to salon owners.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300"
          >
            {loading ? 'Redeeming...' : 'Redeem Visit'}
          </button>
        </div>
      </div>
    </div>
  );
}
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('CUSTOMER');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await authAPI.login(email, password, role);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      onLogin(user.role, user);
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
            <Package className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Salon Tracker</h1>
          <p className="text-gray-600 mt-2">Subscription & Visit Management</p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => setRole('CUSTOMER')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                role === 'CUSTOMER'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => setRole('OWNER')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                role === 'OWNER'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Owner
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={role === 'OWNER' ? 'owner@salon.com' : 'your@email.com'}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:bg-gray-300"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          <div className="text-center mt-4">
            {/* --- NOTE: This 'href' was the first error. You already fixed it in your code! --- */}
            <a href="/forgot-password" className="text-sm text-purple-600 hover:text-purple-700">
              Forgot password?
            </a>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-purple-200">
          <p className="text-sm font-semibold text-gray-800 mb-3">🔑 Demo Credentials</p>
          <p className="text-xs text-gray-600 mb-2">You need to create users in the backend first.</p>
          <p className="text-xs text-gray-600">Run the backend server and use the register endpoint.</p>
        </div>
      </div>
    </div>
  );
}

function CustomerPortal({ customer, onLogout, subscriptions, setSubscriptions }) {
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- FIX 1: Wrap loadSubscriptions in useCallback ---
  const loadSubscriptions = useCallback(async () => {
    try {
      const response = await subscriptionsAPI.getByCustomer(customer.id);
      setSubscriptions(response.data);
    } catch (error) {
      console.error('Error loading subscriptions:', error);
    } finally {
      setLoading(false);
    }
    // --- FIX 1: Add dependencies to useCallback ---
  }, [customer.id, setSubscriptions, setLoading]);

  useEffect(() => {
    loadSubscriptions();
    // --- FIX 1: Update useEffect dependency ---
  }, [loadSubscriptions]);


  if (selectedSubscription) {
    const visitDates = selectedSubscription.visitDates 
      ? selectedSubscription.visitDates.split(',') 
      : [];

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto p-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <button
              onClick={() => setSelectedSubscription(null)}
              className="text-purple-600 hover:text-purple-700 mb-4 flex items-center gap-2"
            >
              ← Back to Dashboard
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedSubscription.name}</h2>
            
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{selectedSubscription.usedVisits} / {selectedSubscription.totalVisits} visits</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-purple-600 h-3 rounded-full transition-all"
                  style={{ width: `${(parseInt(selectedSubscription.usedVisits) / parseInt(selectedSubscription.totalVisits)) * 100}%` }}
                />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-4">Visit History</h3>
            {visitDates.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No visits yet</p>
            ) : (
              <div className="space-y-2">
                {visitDates.map((date, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-purple-600" />
<<<<<<< HEAD
                    <span className="text-gray-700">{new Date(date).toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })}
  </span>
=======
                    <span className="text-gray-700">{new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
>>>>>>> parent of da373af (updated the dates to show the local dates in the frontend)
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8 text-purple-600" />
            <h1 className="text-xl font-bold text-gray-800">My Subscriptions</h1>
          </div>
          <button
            onClick={onLogout}
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome, {customer.name}!</h2>
          <p className="text-gray-600">Track your subscription packages and visit history</p>
        </div>

        {subscriptions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No active subscriptions</p>
            <p className="text-gray-400 text-sm mt-2">Visit the salon to purchase a package</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {subscriptions.map((sub) => {
              const remaining = parseInt(sub.totalVisits) - parseInt(sub.usedVisits);
              const progress = (parseInt(sub.usedVisits) / parseInt(sub.totalVisits)) * 100;
              
              return (
                <div key={sub.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{sub.name}</h3>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{sub.usedVisits} / {sub.totalVisits} visits</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-purple-600 h-3 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-3xl font-bold text-purple-600">{remaining}</p>
                      <p className="text-sm text-gray-600">visits remaining</p>
                    </div>
                    {remaining === 0 && (
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                        Completed
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedSubscription(sub)}
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors font-medium"
                  >
                    View History
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ===================================================================
// START: MODIFIED OWNER PORTAL
// ===================================================================
function OwnerPortal({
  customers,
  setCustomers,
  selectedCustomer,
  setSelectedCustomer,
  searchTerm,
  setSearchTerm,
  showAddCustomer,
  setShowAddCustomer,
  onLogout
}) {
  const [loading, setLoading] = useState(true);
  const [showManageTypes, setShowManageTypes] = useState(false);
  const [subscriptionTypes, setSubscriptionTypes] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [customersRes, typesRes] = await Promise.all([
          customersAPI.getAll(),
          subscriptionTypesAPI.getAll(), // Assumes this API method exists in your services/api.js
        ]);
        setCustomers(customersRes.data);
        setSubscriptionTypes(typesRes.data);
      } catch (error) {
        console.error('Error loading owner data:', error);
        alert('Failed to load data. Please make sure the backend is running.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [setCustomers]);

  const handleAddCustomer = async (customerData) => {
    const response = await customersAPI.create(customerData);
    setCustomers([...customers, response.data]);
    setShowAddCustomer(false);
    alert('Customer added successfully!');
  };

  const handleAddSubscriptionType = async (typeData) => {
    const response = await subscriptionTypesAPI.create(typeData); // Assumes this API method exists
    setSubscriptionTypes([...subscriptionTypes, response.data]);
  };

  const handleDeleteSubscriptionType = async (typeId) => {
    await subscriptionTypesAPI.delete(typeId); // Assumes this API method exists
    setSubscriptionTypes(subscriptionTypes.filter((t) => t.id !== typeId));
  };

  const filteredCustomers = customers.filter(c => 
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone?.includes(searchTerm)
  );

  if (selectedCustomer) {
    return (
      <CustomerDetailView
        customer={selectedCustomer}
        onBack={() => setSelectedCustomer(null)}
      />
    );
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8 text-purple-600" />
            <h1 className="text-xl font-bold text-gray-800">Owner Portal</h1>
          </div>
          <button
            onClick={onLogout}
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Customer Management</h2>
              <p className="text-gray-600">Manage subscriptions and track visits</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowManageTypes(true)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Manage Packages
              </button>
              <button
                onClick={() => setShowAddCustomer(true)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                <Plus className="w-5 h-5" />
                Add Customer
              </button>
            </div>
          </div>

          <div className="relative mt-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {filteredCustomers.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No customers found</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                onClick={() => setSelectedCustomer(customer)}
                className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{customer.name}</h3>
                      <p className="text-sm text-gray-600">{customer.email}</p>
                      <p className="text-sm text-gray-500">{customer.phone}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showAddCustomer && (
        <AddCustomerModal
          onClose={() => setShowAddCustomer(false)}
          onSubmit={handleAddCustomer}
        />
      )}
      
      {showManageTypes && (
        <ManageSubscriptionTypesModal
          onClose={() => setShowManageTypes(false)}
          subscriptionTypes={subscriptionTypes}
          onAdd={handleAddSubscriptionType}
          onDelete={handleDeleteSubscriptionType}
        />
      )}
    </div>
  );
}
// ===================================================================
// END: MODIFIED OWNER PORTAL
// ===================================================================


// ===================================================================
// START: MODIFIED CUSTOMER DETAIL VIEW
// ===================================================================
function CustomerDetailView({ customer, onBack }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscriptionTypes, setSubscriptionTypes] = useState([]);
  const [showAddSubscription, setShowAddSubscription] = useState(false);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [selectedSubscriptionForRedeem, setSelectedSubscriptionForRedeem] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- FIX 2: Wrap loadData in useCallback ---
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [subsRes, typesRes] = await Promise.all([
        subscriptionsAPI.getByCustomer(customer.id),
        subscriptionTypesAPI.getAll(),
      ]);
      setSubscriptions(subsRes.data);
      setSubscriptionTypes(typesRes.data);
    } catch (error) {
      console.error('Error loading customer detail data:', error);
      alert('Error loading customer details.');
    } finally {
      setLoading(false);
    }
    // --- FIX 2: Add dependencies to useCallback ---
  }, [customer.id, setSubscriptions, setSubscriptionTypes, setLoading]);

  useEffect(() => {
    loadData();
    // --- FIX 2: Update useEffect dependency ---
  }, [loadData]);

  const handleAddSubscription = async (subscriptionType) => {
    try {
      await subscriptionsAPI.create({
        customerId: customer.id,
        name: subscriptionType.name,
        totalVisits: subscriptionType.visits,
      });
      
      await loadData();
      setShowAddSubscription(false);
      alert('Subscription added successfully!');
    } catch (error) {
      throw error;
    }
  };

  const handleOpenRedeemModal = (subscription) => {
    setSelectedSubscriptionForRedeem(subscription);
    setShowRedeemModal(true);
  };

  const handleRedeemVisit = async (note) => {
    try {
      await subscriptionsAPI.redeemVisit(selectedSubscriptionForRedeem.id, note);
      await loadData();
      setShowRedeemModal(false);
      setSelectedSubscriptionForRedeem(null);
      alert('Visit redeemed successfully!');
    } catch (error) {
      throw error;
    }
  };

  // Parse visit notes into array - now matches by order/index
  const parseVisitNotes = (visitNotesString) => {
    if (!visitNotesString) return [];
    
    return visitNotesString.split('||').filter(n => n).map(noteEntry => {
      const colonIndex = noteEntry.indexOf(':');
      if (colonIndex === -1) {
        return { date: '', note: noteEntry };
      }
      const date = noteEntry.substring(0, colonIndex);
      const note = noteEntry.substring(colonIndex + 1);
      return { date, note };
    });
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2"
          >
            ← Back to Customers
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{customer.name}</h2>
                <p className="text-gray-600">{customer.email}</p>
                <p className="text-gray-500">{customer.phone}</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddSubscription(true)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium w-full md:w-auto"
            >
              <Plus className="w-5 h-5" />
              Add Subscription
            </button>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-4">Active Subscriptions</h3>

        {subscriptions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No subscriptions yet</p>
            <p className="text-gray-400 text-sm mt-2">Add a subscription to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {subscriptions.map((sub) => {
              const remaining = parseInt(sub.totalVisits) - parseInt(sub.usedVisits);
              const progress = (parseInt(sub.usedVisits) / parseInt(sub.totalVisits)) * 100;
              const visitDates = sub.visitDates ? sub.visitDates.split(',') : [];
              const visitNotes = parseVisitNotes(sub.visitNotes);
              
              return (
                <div key={sub.id} className="bg-white rounded-xl shadow p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{sub.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                        <span>Used: <strong>{sub.usedVisits}</strong></span>
                        <span>Remaining: <strong className="text-purple-600">{remaining}</strong></span>
                        <span>Total: <strong>{sub.totalVisits}</strong></span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleOpenRedeemModal(sub)}
                      disabled={remaining === 0}
                      className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 w-full md:w-auto ${
                        remaining === 0
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-purple-600 text-white hover:bg-purple-700'
                      }`}
                    >
                      <Check className="w-5 h-5" />
                      Redeem Visit
                    </button>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <div
                      className="bg-purple-600 h-3 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {visitDates.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-3">Visit History:</p>
                      <div className="space-y-2">
                        {visitDates.slice().reverse().map((date, idx) => {
                          // Calculate the actual index in the original array
                          const originalIndex = visitDates.length - 1 - idx;
                          const noteForVisit = visitNotes[originalIndex];
                          
                          return (
                            <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">
                                  Visit {originalIndex + 1}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {new Date(date).toLocaleDateString('en-US', { 
<<<<<<< HEAD
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
=======
                                    month: 'short', 
                                    day: 'numeric', 
                                    year: 'numeric' 
                                  })}
>>>>>>> parent of da373af (updated the dates to show the local dates in the frontend)
                                </span>
                              </div>
                              {noteForVisit && noteForVisit.note && (
                                <div className="mt-2 p-2 bg-blue-50 border-l-2 border-blue-400 rounded">
                                  <p className="text-xs text-blue-900">
                                    <span className="font-semibold">Note: </span>
                                    {noteForVisit.note}
                                  </p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showAddSubscription && (
        <AddSubscriptionModal
          onClose={() => setShowAddSubscription(false)}
          onSubmit={handleAddSubscription}
          subscriptionTypes={subscriptionTypes}
        />
      )}

      {showRedeemModal && selectedSubscriptionForRedeem && (
        <RedeemVisitModal
          onClose={() => {
            setShowRedeemModal(false);
            setSelectedSubscriptionForRedeem(null);
          }}
          onSubmit={handleRedeemVisit}
          subscriptionName={selectedSubscriptionForRedeem.name}
        />
      )}
    </div>
  );
}
// ===================================================================
// END: MODIFIED CUSTOMER DETAIL VIEW
// ===================================================================


export default function SalonApp() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [subscriptions, setSubscriptions] =useState([]);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      const parsedUser = JSON.parse(user);
      setCurrentUser(parsedUser);
      setUserRole(parsedUser.role);
    }
  }, []);

  const handleLogin = (role, user) => {
    setUserRole(role);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    setUserRole(null);
    setSelectedCustomer(null);
  };

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (userRole === 'CUSTOMER') {
    return (
      <CustomerPortal 
        customer={currentUser} 
        onLogout={handleLogout}
        subscriptions={subscriptions}
        setSubscriptions={setSubscriptions}
      />
    );
  }

  return (
    <OwnerPortal
      customers={customers}
      setCustomers={setCustomers}
      selectedCustomer={selectedCustomer}
      setSelectedCustomer={setSelectedCustomer}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      showAddCustomer={showAddCustomer}
      setShowAddCustomer={setShowAddCustomer}
      onLogout={handleLogout}
    />
  );
}