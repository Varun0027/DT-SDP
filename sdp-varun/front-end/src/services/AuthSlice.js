import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  token: null,
  role: null,
  isTech: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, isAdmin, token, role, isTech } = action.payload;
      state.user = { email };
      state.isAuthenticated = true;
      state.isAdmin = isAdmin;
      state.token = token;
      state.role = role;
      state.isTech = isTech;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.token = null;
      state.role = null;
      state.isTech = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
