import axios from 'axios';

const API_BASE = 'http://localhost:9090';

const api = axios.create({
  baseURL: API_BASE,
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// --- Auth ---
export const login = async (username, password) => {
  const res = await api.post('/auth/login', { username, password });
  localStorage.setItem('token', res.data.token);
  return res;
};

// --- Employees ---
export const getEmployees = () => api.get('/api/employees');
export const addEmployee = (data) => api.post('/api/employees', data);
export const updateEmployee = (id, data) => api.put(`/api/employees/${id}`, data);
export const deleteEmployee = (id) => api.delete(`/api/employees/${id}`);
export const searchEmployees = (name) => api.get(`/api/employees/search?name=${encodeURIComponent(name)}`);
export const filterEmployees = (department) => api.get(`/api/employees/filter?department=${encodeURIComponent(department)}`);
// --- Projects ---
export const getProjects = () => api.get('/api/projects');
export const addProject = (data) => api.post('/api/projects', data);
export const updateProject = (id, data) => api.put(`/api/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/api/projects/${id}`);