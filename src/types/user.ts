export interface IUser {
  email: string;
  role: string;
  id: string;
  // isLoggedIn: boolean;
}

export interface IGenericResponse {
  status: string;
  message: string;
}

// export interface RegisterData {
//   email: string;
//   password: string;
//   role: string;
// }

// export interface LoginRequest {
//   email: string;
//   password: string;
// }

// export interface UserResponse {
//   user: IUser;
//   token: string;
// }

// export interface MessageResponse {
//   message: string;
// }

// export interface UserDataResponse {
//   data: IUser;
// }

// export type Option = {
//   label: string;
//   value: string;
// };
