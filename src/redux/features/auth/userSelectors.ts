import { RootState } from "../../store";

export const getUserSelector = (state: RootState) => state.userState.user;
export const getTokenSelector = (state: RootState) => state.userState.token;
export const getIsLoggedInSelector = (state: RootState) =>
  state.userState.isLoggedIn;
