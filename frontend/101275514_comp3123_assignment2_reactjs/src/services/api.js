import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const getEmployees = () => API.get('/employees');
export const getEmployeeById = (id) => API.get(`/employees/${id}`);
export const addEmployee = (employee) => API.post('/employees', employee);
export const updateEmployee = (id, employee) => API.put(`/employees/${id}`, employee);
export const deleteEmployee = (id) => API.delete(`/employees/${id}`);

export const login = (credentials) => API.post('/login', credentials);
export const signup = (userData) => API.post('/users/signup', userData);