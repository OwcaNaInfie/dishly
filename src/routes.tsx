import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import RecipeList from './components/RecipeList/RecipeList';
// import UserProfile from './components/UserProfile/UserProfile';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Publiczne trasy */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Chronione trasy */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
              <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recipes"
        element={
          <ProtectedRoute>
              <RecipeList />
          </ProtectedRoute>
        }
      />
      {/* <Route
        path="/profile"
        element={
          <ProtectedRoute>
              <UserProfile />
          </ProtectedRoute>
        }
      /> */}
    </Routes>
  );
};

export default AppRoutes;
