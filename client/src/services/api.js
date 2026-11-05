const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getHeaders = () => {
  const token = localStorage.getItem('skilllearn_token');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Terjadi kesalahan pada permintaan');
  }
  return data;
};

export const authApi = {
  login: async (credentials) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return handleResponse(res);
  },

  register: async (userData) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return handleResponse(res);
  },

  getMe: async () => {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },
};

export const coursesApi = {
  getAll: async ({ category = '', search = '' } = {}) => {
    const params = new URLSearchParams();
    if (category && category !== 'Semua') params.append('category', category);
    if (search) params.append('search', search);

    const res = await fetch(`${API_BASE_URL}/courses?${params.toString()}`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  getById: async (id) => {
    const res = await fetch(`${API_BASE_URL}/courses/${id}`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  getCategories: async () => {
    const res = await fetch(`${API_BASE_URL}/courses/meta/categories`);
    return handleResponse(res);
  },
};

export const favoritesApi = {
  getAll: async () => {
    const res = await fetch(`${API_BASE_URL}/favorites`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  toggle: async (courseId) => {
    const res = await fetch(`${API_BASE_URL}/favorites/toggle/${courseId}`, {
      method: 'POST',
      headers: getHeaders(),
    });
    return handleResponse(res);
  },
};

export const historyApi = {
  getAll: async () => {
    const res = await fetch(`${API_BASE_URL}/history`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  getSummary: async () => {
    const res = await fetch(`${API_BASE_URL}/history/summary`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  update: async (data) => {
    const res = await fetch(`${API_BASE_URL}/history/update`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },
};
