export interface ITask {
  id: number;
  name: string;
  dateStart: Date;
  dateEnd: Date;
  categotyId: number;
}

export interface ICreateTask {
  name: string;
  description: string;
  dateStart: Date | string | null;
  dateEnd: Date | string | null;
  categoryId: number | string;
}
export interface ITaskResponse {
  id: number;
  name: string;
  description: string;
  dateStart: Date | string;
  dateEnd: Date | string;
  categoryId: number;
}

export interface IUpdateTask {
  id: number;
  name: string;
  description: string;
  dateStart: Date;
  dateEnd: Date;
}
