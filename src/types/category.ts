import { IUser } from "./user";

export interface ICategoryRequest {
  name: string;
}
export interface ICategoryResponse {
  id: number;
  name: string;
  dateCreated: Date;
  user: IUser;
}

export interface IUpdateCategory {
  id: number;
  name: string;
}
