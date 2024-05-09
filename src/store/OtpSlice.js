import {createSlice} from '@reduxjs/toolkit';

const otpSlice = createSlice({
  name: 'otp',
  initialState: {
    otpValue: '',
    successMsg: false,
    errorMsg: false,
  },
  reducers: {
    addOtpValue: (state, action) => {
      state.otpValue = action.payload;
    },
    showSuccessMsg: (state, action) => {
      state.successMsg = action.payload;
    },
    showErrorMsg: (state, action) => {
      state.errorMsg = action.payload;
    },
  },
});

export const {addOtpValue, showErrorMsg, showSuccessMsg} = otpSlice.actions;

export default otpSlice;
