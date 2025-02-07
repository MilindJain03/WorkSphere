import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = ({ isLoggedIn, setIsLoggedIn }) => {
    const [showHelp, setShowHelp] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <>
            <div className="sidebar">
                <div className="sidebar-header">
                    <h3 className="logo">WorkSphere</h3>
                </div>
                <div className="sidebar-content">
                    <div className="menu-items">
                        {isLoggedIn ? (
                            <>
                                <button 
                                    className={`menu-button ${location.pathname === '/employees' ? 'active' : ''}`}
                                    onClick={() => navigate('/employees')}
                                >
                                    <span>Dashboard</span>
                                </button>
                                <button onClick={handleLogout}>
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => navigate('/login')}>
                                    <span>Login</span>
                                </button>
                                <button onClick={() => navigate('/register')}>
                                    <span>Register</span>
                                </button>
                            </>
                        )}
                        <button className="help-btn" onClick={() => setShowHelp(true)}>
                            <span>Help</span>
                        </button>
                    </div>
                </div>
            </div>

            {showHelp && (
                <div className="help-popup" onClick={() => setShowHelp(false)}>
                    <div className="help-content" onClick={e => e.stopPropagation()}>
                        <h3>Navigation Help</h3>
                        <p>- Use "Login" to access your account</p>
                        <p>- "Register" to create a new account</p>
                        <p>- Manage employees in the Employees section</p>
                        <p>- "Logout" to sign out</p>
                        <button onClick={() => setShowHelp(false)}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;