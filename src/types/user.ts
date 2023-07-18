export interface User {
  id: number | null;
  email: string;
  role: string | null;
  isVerified: boolean;
}

export interface UserDataResponse {
  data: User;
}

export type Option = {
  label: string;
  value: string;
};
