import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => { // Fix: Destructure `children` properly
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('isAuthenticated') === 'true';
    });

    const login = () => {
        setIsAuthenticated(true); // Fix: Use boolean `true` instead of a string
        localStorage.setItem('isAuthenticated', 'true'); // Fix: Pass value when setting in localStorage
    };

    const logout = () => {
        setIsAuthenticated(false); // Fix: Use boolean `false`
        localStorage.removeItem('isAuthenticated');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
