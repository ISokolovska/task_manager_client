import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../../types/user";

interface IUserState {
  user: IUser | null;
  // token: string | null;
  // isLoggedIn: boolean;
}

// export const initialState: IUserState = {
//   user: {
//     id: null,
//     email: "",
//     role: null,
//     isLoggedIn: false,
//   },
//   token: null,
//   isLoggedIn: false,
// };

export const initialState: IUserState = {
  user: null,
  // token: null,
  // isLoggedIn: false,
};

export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    // setCredentials: (
    //   state,
    //   {
    //     payload: { user, token },
    //   }: PayloadAction<{ user: IUser; token: string }>
    // ) => {
    //   state.user = user;
    //   state.token = token;
    // },
    // setToken: (state, action: PayloadAction<string>) => {
    //   state.token = action.payload;
    // },
    // setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
    //   state.isLoggedIn = action.payload;
    // },
  },
});

export default userSlice.reducer;

export const { logout, setUser } = userSlice.actions;

// export const selectCurrentUser = (state: RootState) => state.auth.user;
