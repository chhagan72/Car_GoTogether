import {createSlice} from '@reduxjs/toolkit';

export const loginData = createSlice({
  name: 'loginData',
  initialState: {
    value: {data: 'vaibhav'},
  },
  reducers: {
    setLoginDataRedux: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const emailData = createSlice({
  name: 'emailData',
  initialState: {
    value: 'he he working',
  },
  reducers: {
    setEmailRedux: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const searchRide = createSlice({
  name: 'searchRide',
  initialState: {
    value: {data: 'ride'},
  },
  reducers: {
    setSerachRideData: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Exporting the reducers separately
export const {setLoginDataRedux} = loginData.actions;
export const {setEmailRedux} = emailData.actions;
export const {setSerachRideData} = searchRide.actions;

export const loginDataReducer = loginData.reducer;
export const emailDataReducer = emailData.reducer;
export const searchDataReducer = searchRide.reducer;
