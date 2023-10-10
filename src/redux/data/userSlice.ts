import { createSlice } from "@reduxjs/toolkit";
import { LoginUser } from "../../Types/loginType";

const initialState: LoginUser = {
  token: "",
  loggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, loggedIn } = action.payload;
      state.token = token;
      state.loggedIn = loggedIn;
    },
    logout: (state) => {
      state.token = "";
      state.loggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
