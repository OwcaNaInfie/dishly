import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.ts';
import recipesReducer from './recipesSlice.ts';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
