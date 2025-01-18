import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser } = useAuth();

  // Jeśli użytkownik nie jest zalogowany, przekieruj na /signin
  if (!currentUser) {
  // if (currentUser) {
  
    return <Navigate to="/signin" replace />;
  }

  // Jeśli użytkownik jest zalogowany, renderuj zawartość
  return <>{children}</>;
};

export default ProtectedRoute;
