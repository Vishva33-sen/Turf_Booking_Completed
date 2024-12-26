import React from 'react';
import { useAuth } from './AuthContext.jsx';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) { // Fix: Ensure protected route redirects when not authenticated
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
