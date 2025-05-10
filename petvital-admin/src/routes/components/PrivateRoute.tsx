import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = (permissions: string[]) => {
    return permissions.includes(localStorage.getItem('role') ?? '');
};

const PrivateRoute = (props: any) => {
    return isAuthenticated(props.permissions) ? props.children : <Navigate to="/restricted" />;
};

export default PrivateRoute;