// build protectedRoute.js
//
import React, { useEffect, useState } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AUTH_ACTIONS } from '../redux/action';
const ProtectedRoute = () => {
    const dispatch = useDispatch()
    const isAuthenticated  = useState(localStorage.getItem('token') && localStorage.getItem('user'))
    useEffect(() => {
        dispatch({ type: AUTH_ACTIONS.SET_USER_DATA , payload: {
            token: localStorage.getItem('token'),
            user: JSON.parse(localStorage.getItem('user'))
        }})
       
    }, [])
    return (
        isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    );
}
export default ProtectedRoute;