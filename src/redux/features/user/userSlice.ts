import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register(state, { payload }) {
      state.user = payload;
      state.token = payload.accessToken;
      state.isLoggedIn = true;
    },
    logIn: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.user.accessToken;
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.user = {};
      state.token = null;
      state.isLoggedIn = false;
    },
    refresh: (state, { payload }) => {
      state.user = payload.user;
      state.isLoggedIn = true;
    },
  },
});
export const { register, logIn, logOut, refresh } = userSlice.actions;
export default userSlice.reducer;
