import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../../types/user";

interface IUserState {
  user: IUser | null;
  token: string | null;
  isLoggedIn: boolean;
}

export const initialState: IUserState = {
  user: null,
  token: null,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { logout, setUser, setToken } = userSlice.actions;

// export const selectCurrentUser = (state: RootState) => state.auth.user;
