import { configureStore } from "@reduxjs/toolkit";
import appStoreReducer from './appStoreSlice';

export default configureStore({
  reducer: {
    appStore: appStoreReducer
  },
});