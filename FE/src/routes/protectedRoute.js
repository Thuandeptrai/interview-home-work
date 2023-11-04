// build protectedRoute.js
//
import React, { useEffect, useState } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AUTH_ACTIONS } from '../redux/action';
const ProtectedRoute = () => {
    const dispatch = useDispatch()
    const isAuthenticated  = useSelector(state => state.auth.user !== null);
  
    return (
        isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    );
}
export default ProtectedRoute;