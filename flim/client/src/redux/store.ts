import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";

const store = configureStore({
  reducer: {
    search: searchReducer,
  },
});

export type AppDispatch = typeof store.dispatch

export default store;
