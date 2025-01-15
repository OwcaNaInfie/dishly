import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from '../../routes';
import { AuthProvider } from '../../context/AuthContext';  // Importujemy AuthProvider

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
