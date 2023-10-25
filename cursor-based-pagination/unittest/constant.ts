export interface RequestErrorInterface {
  type: string;
  value: any;
  msg: string;
  path: string;
  location: string;
}

export const RequestErrorTemplate: RequestErrorInterface = {
  type: "field",
  value: "",
  msg: "",
  path: "",
  location: "query",
};
