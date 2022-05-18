import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../firebase.init';
import Spinner from './Spinner';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const [authUser, authLoading] = useAuthState(auth);

  if (authLoading) {
    return <Spinner />;
  }

  if (!authUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
