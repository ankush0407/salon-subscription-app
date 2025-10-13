import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://salon-backend-5jn9.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email, password, role) => 
    api.post('/auth/login', { email, password, role }),
  register: (email, password, role) => 
    api.post('/auth/register', { email, password, role }),
};

export const customersAPI = {
  getAll: () => api.get('/customers'),
  create: (customerData) => api.post('/customers', customerData),
  getById: (id) => api.get(`/customers/${id}`),
};

export const subscriptionsAPI = {
  getByCustomer: (customerId) => api.get(`/subscriptions/customer/${customerId}`),
  create: (subscriptionData) => api.post('/subscriptions', subscriptionData),
  redeemVisit: (subscriptionId) => api.post(`/subscriptions/${subscriptionId}/redeem`),
};

export const subscriptionTypesAPI = {
  getAll: () => api.get('/subscription-types'),
  create: (typeData) => api.post('/subscription-types', typeData),
  delete: (typeId) => api.delete(`/subscription-types/${typeId}`),
};

export default api;