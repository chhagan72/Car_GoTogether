import {configureStore} from '@reduxjs/toolkit';
import {
  loginDataReducer,
  emailDataReducer,
  searchDataReducer,
} from '../features/data/DataSlice';

export default configureStore({
  reducer: {
    loginData: loginDataReducer,
    emailData: emailDataReducer,
    searchData: searchDataReducer,
  },
});
