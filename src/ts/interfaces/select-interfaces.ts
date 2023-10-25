import { ISelectOptions } from "./app-interfaces";

export interface ISelect {
  value?: string;
  items: any | ISelectOptions[];
  multiSelect?: boolean;
  tags?: ISelectOptions[];
}
