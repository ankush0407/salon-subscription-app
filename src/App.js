import React, { useState } from 'react';
import { Calendar, User, Package, ChevronRight, Search, Plus, Check, X } from 'lucide-react';

const INITIAL_DATA = {
  customers: [
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex@email.com',
      phone: '(555) 123-4567',
      subscriptions: [
        {
          id: 1,
          name: '6-Visit Haircut Package',
          totalVisits: 6,
          usedVisits: 2,
          visitDates: ['2025-09-15', '2025-10-01']
        }
      ]
    },
    {
      id: 2,
      name: 'Maria Garcia',
      email: 'maria@email.com',
      phone: '(555) 234-5678',
      subscriptions: [
        {
          id: 2,
          name: '10-Visit Manicure Package',
          totalVisits: 10,
          usedVisits: 5,
          visitDates: ['2025-08-10', '2025-08-24', '2025-09-07', '2025-09-21', '2025-10-05']
        }
      ]
    }
  ]
};

const SUBSCRIPTION_TYPES = [
  { id: 1, name: '6-Visit Haircut Package', visits: 6 },
  { id: 2, name: '10-Visit Haircut Package', visits: 10 },
  { id: 3, name: '6-Visit Manicure Package', visits: 6 },
  { id: 4, name: '10-Visit Manicure Package', visits: 10 },
  { id: 5, name: '6-Visit Massage Package', visits: 6 },
  { id: 6, name: '10-Visit Massage Package', visits: 10 }
];

function AddCustomerModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all fields');
      return;
    }
    onSubmit(formData);
    setFormData({ name: '', email: '', phone: '' });
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
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Add Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddSubscriptionModal({ onClose, onSubmit }) {
  const [selectedType, setSelectedType] = useState(null);

  const handleSubmit = () => {
    if (selectedType) {
      onSubmit(selectedType);
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {SUBSCRIPTION_TYPES.map((type) => (
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
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-200 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!selectedType}
            className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
              selectedType
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Add Subscription
          </button>
        </div>
      </div>
    </div>
  );
}

function LoginScreen({ onLogin, customers }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('CUSTOMER');

  const handleSubmit = () => {
    if (role === 'OWNER') {
      if (password === 'salon123') {
        onLogin('OWNER', 'owner@salon.com');
        return;
      } else {
        alert('Incorrect password for Owner. Use: salon123');
        return;
      }
    }
    
    if (role === 'CUSTOMER') {
      const customer = customers.find(c => c.email === email);
      if (customer) {
        if (password === 'customer123') {
          onLogin('CUSTOMER', email);
          return;
        } else {
          alert('Incorrect password for Customer. Use: customer123');
          return;
        }
      } else {
        alert('Customer not found. Use: alex@email.com or maria@email.com');
        return;
      }
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
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Sign In
          </button>

          <div className="text-center mt-4">
            <a href="#" className="text-sm text-purple-600 hover:text-purple-700">
              Forgot password?
            </a>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-purple-200">
          <p className="text-sm font-semibold text-gray-800 mb-3">🔑 Demo Credentials</p>
          {role === 'OWNER' ? (
            <div className="space-y-2">
              <div className="bg-white rounded p-2 border border-purple-100">
                <p className="text-xs text-gray-600">Email:</p>
                <p className="text-sm font-mono text-purple-700">owner@salon.com</p>
              </div>
              <div className="bg-white rounded p-2 border border-purple-100">
                <p className="text-xs text-gray-600">Password:</p>
                <p className="text-sm font-mono text-purple-700">salon123</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="bg-white rounded p-2 border border-purple-100">
                <p className="text-xs text-gray-600">Email (choose one):</p>
                <p className="text-sm font-mono text-purple-700">alex@email.com</p>
                <p className="text-sm font-mono text-purple-700">maria@email.com</p>
              </div>
              <div className="bg-white rounded p-2 border border-purple-100">
                <p className="text-xs text-gray-600">Password:</p>
                <p className="text-sm font-mono text-purple-700">customer123</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CustomerPortal({ customer, onLogout, selectedSubscription, setSelectedSubscription }) {
  if (selectedSubscription) {
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
                  style={{ width: `${(selectedSubscription.usedVisits / selectedSubscription.totalVisits) * 100}%` }}
                />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-4">Visit History</h3>
            {selectedSubscription.visitDates.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No visits yet</p>
            ) : (
              <div className="space-y-2">
                {selectedSubscription.visitDates.map((date, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-700">{new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
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

        {customer.subscriptions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No active subscriptions</p>
            <p className="text-gray-400 text-sm mt-2">Visit the salon to purchase a package</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {customer.subscriptions.map((sub) => {
              const remaining = sub.totalVisits - sub.usedVisits;
              const progress = (sub.usedVisits / sub.totalVisits) * 100;
              
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

function CustomerDetailView({
  customer,
  onBack,
  onAddSubscription,
  onRedeemVisit,
  showAddSubscription,
  setShowAddSubscription,
  onAddSubscriptionSubmit
}) {
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
          <div className="flex items-start justify-between mb-4">
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
              onClick={onAddSubscription}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              Add Subscription
            </button>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-4">Active Subscriptions</h3>

        {customer.subscriptions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No subscriptions yet</p>
            <p className="text-gray-400 text-sm mt-2">Add a subscription to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {customer.subscriptions.map((sub) => {
              const remaining = sub.totalVisits - sub.usedVisits;
              const progress = (sub.usedVisits / sub.totalVisits) * 100;
              
              return (
                <div key={sub.id} className="bg-white rounded-xl shadow p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{sub.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Used: <strong>{sub.usedVisits}</strong></span>
                        <span>Remaining: <strong className="text-purple-600">{remaining}</strong></span>
                        <span>Total: <strong>{sub.totalVisits}</strong></span>
                      </div>
                    </div>
                    <button
                      onClick={() => onRedeemVisit(customer.id, sub.id)}
                      disabled={remaining === 0}
                      className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
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

                  {sub.visitDates.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Recent Visits:</p>
                      <div className="flex flex-wrap gap-2">
                        {sub.visitDates.slice(-5).reverse().map((date, idx) => (
                          <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                            {new Date(date).toLocaleDateString()}
                          </span>
                        ))}
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
          onSubmit={(subType) => onAddSubscriptionSubmit(customer.id, subType)}
        />
      )}
    </div>
  );
}

function OwnerPortal({
  customers,
  selectedCustomer,
  setSelectedCustomer,
  searchTerm,
  setSearchTerm,
  showAddCustomer,
  setShowAddCustomer,
  showAddSubscription,
  setShowAddSubscription,
  onAddCustomer,
  onAddSubscription,
  onRedeemVisit,
  onLogout
}) {
  if (selectedCustomer) {
    return (
      <CustomerDetailView
        customer={selectedCustomer}
        onBack={() => setSelectedCustomer(null)}
        onAddSubscription={() => setShowAddSubscription(true)}
        onRedeemVisit={onRedeemVisit}
        showAddSubscription={showAddSubscription}
        setShowAddSubscription={setShowAddSubscription}
        onAddSubscriptionSubmit={onAddSubscription}
      />
    );
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
            <button
              onClick={() => setShowAddCustomer(true)}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              Add Customer
            </button>
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

        {customers.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No customers found</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {customers.map((customer) => (
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
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-purple-600">{customer.subscriptions.length}</p>
                      <p className="text-sm text-gray-600">subscriptions</p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showAddCustomer && (
        <AddCustomerModal
          onClose={() => setShowAddCustomer(false)}
          onSubmit={onAddCustomer}
        />
      )}
    </div>
  );
}

export default function SalonApp() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [customers, setCustomers] = useState(INITIAL_DATA.customers);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [showAddSubscription, setShowAddSubscription] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  const handleLogin = (role, email) => {
    setUserRole(role);
    if (role === 'CUSTOMER') {
      const customer = customers.find(c => c.email === email);
      setCurrentUser(customer);
    } else {
      setCurrentUser({ email: 'owner@salon.com', name: 'Salon Owner' });
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserRole(null);
    setSelectedCustomer(null);
  };

  const handleAddCustomer = (customerData) => {
    const newCustomer = {
      id: Date.now(),
      ...customerData,
      subscriptions: []
    };
    const updatedCustomers = [...customers, newCustomer];
    setCustomers(updatedCustomers);
    setShowAddCustomer(false);
    alert(`Customer ${customerData.name} added successfully!`);
  };

  const handleAddSubscription = (customerId, subscriptionType) => {
    const updatedCustomers = customers.map(customer => {
      if (customer.id === customerId) {
        const newSub = {
          id: Date.now(),
          name: subscriptionType.name,
          totalVisits: subscriptionType.visits,
          usedVisits: 0,
          visitDates: []
        };
        return {
          ...customer,
          subscriptions: [...customer.subscriptions, newSub]
        };
      }
      return customer;
    });
    setCustomers(updatedCustomers);
    setShowAddSubscription(false);
    
    if (selectedCustomer && selectedCustomer.id === customerId) {
      const updated = updatedCustomers.find(c => c.id === customerId);
      setSelectedCustomer(updated);
    }
    alert('Subscription added successfully!');
  };

  const handleRedeemVisit = (customerId, subscriptionId) => {
    const today = new Date().toISOString().split('T')[0];
    const updatedCustomers = customers.map(customer => {
      if (customer.id === customerId) {
        return {
          ...customer,
          subscriptions: customer.subscriptions.map(sub => {
            if (sub.id === subscriptionId && sub.usedVisits < sub.totalVisits) {
              return {
                ...sub,
                usedVisits: sub.usedVisits + 1,
                visitDates: [...sub.visitDates, today]
              };
            }
            return sub;
          })
        };
      }
      return customer;
    });
    
    setCustomers(updatedCustomers);
    
    if (selectedCustomer && selectedCustomer.id === customerId) {
      const updated = updatedCustomers.find(c => c.id === customerId);
      setSelectedCustomer(updated);
    }
    alert('Visit redeemed successfully!');
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} customers={customers} />;
  }

  if (userRole === 'CUSTOMER') {
    return (
      <CustomerPortal 
        customer={currentUser} 
        onLogout={handleLogout}
        selectedSubscription={selectedSubscription}
        setSelectedSubscription={setSelectedSubscription}
      />
    );
  }

  return (
    <OwnerPortal
      customers={filteredCustomers}
      selectedCustomer={selectedCustomer}
      setSelectedCustomer={setSelectedCustomer}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      showAddCustomer={showAddCustomer}
      setShowAddCustomer={setShowAddCustomer}
      showAddSubscription={showAddSubscription}
      setShowAddSubscription={setShowAddSubscription}
      onAddCustomer={handleAddCustomer}
      onAddSubscription={handleAddSubscription}
      onRedeemVisit={handleRedeemVisit}
      onLogout={handleLogout}
    />
  );
}