import axios from 'axios';

const API_URL = 'http://localhost:8080/auth';

export const register = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        if (response.data === "Login successful") {
            localStorage.setItem('isLoggedIn', 'true');
            return true;
        }
        return false;
    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('isLoggedIn');
};