import { IUser } from "./user";
export interface ICategory {
  id: number;
  // id: string;
  name: string;
  dateCreated: Date;
  userId: number;
}
export interface ICategoryRequest {
  name: string;
}
export interface ICategoryResponse {
  id: number;
  // id: string;
  name: string;
  dateCreated: Date;
  user: IUser;
}
