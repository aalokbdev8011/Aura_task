import {createSlice} from '@reduxjs/toolkit';

const LoginSlice = createSlice({
  name: 'login',
  initialState: {
    value: '',
    formattedValue: '',
    countryCode: 'IN',
    withCountryNameButton: true,
    toggleCheckBox: null,
    isValidNumber: true,
    isCheckBox: true,
  },
  reducers: {
    addPhoneNumber: (state, action) => {
      state.value = action.payload;
    },
    addFormattedValue: (state, action) => {
      state.formattedValue = action.payload;
    },
    addCountryCode: (state, action) => {
      state.countryCode = action.payload;
    },
    countryNameButton: (state, action) => {
      state.withCountryNameButton = action.payload;
    },
    addtoggleCheckBox: (state, action) => {
      state.toggleCheckBox = action.payload;
    },
    addphoneValidation: (state, action) => {
      state.isValidNumber = action.payload;
    },
    addcheckBoxValidation:(state,action) => {
      state.isCheckBox = action.payload
    }
  },
});

export const {
  addPhoneNumber,
  addFormattedValue,
  addCountryCode,
  countryNameButton,
  addtoggleCheckBox,
  addphoneValidation,
  addcheckBoxValidation
} = LoginSlice.actions;

export default LoginSlice;
