import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import recipesReducer from './features/recipeSlice';

import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'; 
// import { RecipesState } from './features/recipeSlice'; // Import RecipesState

// Konfiguracja store
export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
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