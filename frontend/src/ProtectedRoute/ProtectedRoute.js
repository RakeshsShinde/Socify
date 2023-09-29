import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ProtectedRoute = ({ children }) => {
    const { loading, isAuthenticate } = useSelector((state) => state.Login)
    return (
        <>
            {loading === false && (
                isAuthenticate === false ? <Navigate to={'/'} /> : children
            )}
        </>
    )
}

export default ProtectedRoute;
