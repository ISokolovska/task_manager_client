import { ICategoryResponse } from "./category";
export interface ITask {
  id: number;
  name: string;
  dateStart: Date;
  dateEnd: Date;
  categotyId: number;
}

export interface ITaskRequest {
  name: string;
}
export interface ITaskResponse {
  id: number;
  name: string;
  description: string;
  dateStart: Date;
  dateEnd: Date;
  category: ICategoryResponse;
}

export interface IUpdateTask {
  id: number;
  name: string;
  // Description;
  dateStart: Date;
  dateEnd: Date;
}
