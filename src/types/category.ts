import { IUser } from "./user";
export interface ICategory {
  // id: number;
  id: string;
  name: string;
  dateCreated: string;
  userId: number;
}
export interface ICategoryRequest {
  name: string;
}
export interface ICategoryResponse {
  // id: number;
  id: string;
  name: string;
  dateCreated: string;
  user: IUser;
}
