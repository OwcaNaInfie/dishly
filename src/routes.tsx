import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import { useAuth } from './context/AuthContext';
import RecipeList from './components/RecipeList/RecipeList';
import UserProfile from './components/UserProfile/UserProfile';
import HomePage from './pages/HomePage';


const AppRoutes: React.FC = () => {
  const { currentUser } = useAuth();  // Zmienna, która trzyma aktualnego użytkownika (np. z Firebase)

  return (
    <Routes>
      {/* Jeśli użytkownik jest zalogowany */}
      {currentUser ? (
        <>
          <Route path="/" element={<Dashboard />} />  {/* Strona główna po zalogowaniu */}
        </>
      ) : (
        <>
          {/* Jeśli użytkownik nie jest zalogowany */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/profile" element={<UserProfile />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
