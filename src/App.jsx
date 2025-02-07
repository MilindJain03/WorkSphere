import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import EmployeeList from './components/EmployeeList';
import Login from './components/Login';
import Register from './components/Register';
import Sidebar from './components/Sidebar';
import Logout from './components/Logout';  // Add this import
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('user');
        setIsLoggedIn(!!token);
    }, []);

    // Protected Route component
    const ProtectedRoute = ({ children }) => {
        if (!isLoggedIn) {
            return <Navigate to="/login" replace />;
        }
        return children;
    };

    const hideSidebar = location.pathname === "/login" || location.pathname === "/register";

    return (
        <div className="app-container">
            {!hideSidebar && <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
            <div className={`main-content ${!hideSidebar ? 'with-sidebar' : ''}`}>
                <Routes>
                    <Route path="/" element={
                        isLoggedIn ? <Navigate to="/employees" /> : <Navigate to="/login" />
                    } />
                    <Route path="/login" element={
                        isLoggedIn ? <Navigate to="/employees" /> : <Login setIsLoggedIn={setIsLoggedIn} />
                    } />
                    <Route path="/register" element={<Register />} />
                    <Route path="/employees" element={
                        <ProtectedRoute>
                            <EmployeeList />
                        </ProtectedRoute>
                    } />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
