export interface UserResponse {
  id: number;
  username: string;
  created_at: Date;
}

export type ResponseData = UserResponse[];

export interface ResponseBody {
  message: string;
  data?: ResponseData;
}
