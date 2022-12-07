import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from '../reducers/AuthSlice';
import ProfileSlice from '../reducers/ProfileSlice';
import RegisterSlice from '../reducers/RegisterSlice';

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    register: RegisterSlice,
    profile: ProfileSlice
  }
});