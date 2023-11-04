// build protectedRoute.js
//
import React, { useEffect } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AUTH_ACTIONS } from '../redux/action';
const ProtectedRoute = () => {
    const dispatch = useDispatch()
    let isAuthenticated = useSelector(state => state.auth.user !== null)
   

    return (
        // react Router dom v6

        isAuthenticated ? <Outlet /> : <Navigate to="/login" />

    );
}
export default ProtectedRoute;