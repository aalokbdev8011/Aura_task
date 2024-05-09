import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './login-slice';
import otpReducer from './otp-slice';

export const store = configureStore({
  reducer: {
    login: loginReducer.reducer,
    otp: otpReducer.reducer
  },
});

export default store;