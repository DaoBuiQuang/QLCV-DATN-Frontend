// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import notìicationReducer from '../features/notificationSlice';
import { notification } from 'antd';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notìicationReducer,
  },
});
