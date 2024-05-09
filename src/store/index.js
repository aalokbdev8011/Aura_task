import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './LoginSlice';
import otpReducer from './OtpSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer.reducer,
    otp: otpReducer.reducer
  },
});

export default store;