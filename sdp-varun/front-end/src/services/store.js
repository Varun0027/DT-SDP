import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../services/AuthSlice'; // Adjust path as necessary

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
