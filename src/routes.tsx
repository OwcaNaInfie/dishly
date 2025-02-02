import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import RecipeList from './components/RecipeList/RecipeList';
import UserProfile from './pages/UserProfile';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AddRecipePage from './pages/AddRecipePage';
import RecipeDetails from './pages/RecipeDetails'


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
      <Route
        path="/recipe-details/:id"
        element={
          <ProtectedRoute>
            <RecipeDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
              <UserProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-recipe"
        element={
          <ProtectedRoute>
              <AddRecipePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
