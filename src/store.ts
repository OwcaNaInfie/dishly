import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import recipesReducer from './features/recipeSlice';
import profileReducer from './features/profileSlice'; // Import nowego slice

import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'; 

// Konfiguracja store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipesReducer,
    profile: profileReducer, // Dodanie nowego slice
  },
});

// Typy dla Redux
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

// Typowany hook useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Typowany hook useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;