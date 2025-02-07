import axios from './axiosConfig';

const API_URL = "/api/employees";

const EmployeeService = {
  getAllEmployees: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching employees:", error);
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        window.location.href = '/login';
      }
      return [];
    }
  },

  createEmployee: async (employee) => {
    try {
        const response = await axios.post(API_URL, {
            name: employee.name,
            email: employee.email,
            role: employee.role,
            phone: employee.phone || '' // Ensure phone is included
        });
        return response.data;
    } catch (error) {
        throw error;
    }
  },

  updateEmployee: async (id, employee) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, {
            name: employee.name,
            email: employee.email,
            role: employee.role,
            phone: employee.phone || '' // Ensure phone is included
        });
        return response.data;
    } catch (error) {
        throw error;
    }
  },

  deleteEmployee: async (id) => {
    await axios.delete(`${API_URL}/${id}`);
  },

  searchEmployees: async (query) => {
    const response = await axios.get(`${API_URL}/search?query=${query}`);
    return response.data;
  },
};

export default EmployeeService;
