export interface IUser {
  id: number;
  email: string;
  role: string;
}

export interface RegisterData {
  email: string;
  password: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  user: IUser;
  token: string;
}

export interface MessageResponse {
  message: string;
}

// export interface UserDataResponse {
//   data: IUser;
// }

// export type Option = {
//   label: string;
//   value: string;
// };
