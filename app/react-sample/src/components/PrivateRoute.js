import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getAuthToken } from '../utils';


const PrivateRoute = () => {
    const checkAuth = () => {
        const token = getAuthToken();
        return token ? true : false;
      };

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return checkAuth() ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;