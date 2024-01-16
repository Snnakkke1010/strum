import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {

  if (!localStorage.getItem('token')) {
    return <Navigate to='/authentication' />;
  }
  return (
    <Outlet />
  );
};
export default ProtectedRoute;