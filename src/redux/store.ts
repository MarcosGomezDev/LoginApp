import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./data/userSlice";
import fetchReducer from "./data/dataSlice";

export const store = configureStore({
  reducer: {
    userLog: userReducer,
    data: fetchReducer,
  },
});

export default store;
