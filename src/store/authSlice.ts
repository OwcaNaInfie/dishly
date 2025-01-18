import { createSlice } from '@reduxjs/toolkit';

type AuthState = {
  user: { id: number; username: string } | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signin: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    signout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { signin, signout } = authSlice.actions;
export default authSlice.reducer;
