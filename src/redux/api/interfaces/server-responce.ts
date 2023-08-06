import { HttpStatus } from "../../../utils/constants/httpStatus";

export interface IServerResponse<T = object> {
  statusCode: HttpStatus;
  message?: string | string[];
  data?: T;
}
