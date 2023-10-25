import { changeHandler } from "../types/app-types";
import { ISelectOptions } from "./app-interfaces";

export interface IInput {
  elementType: 'input' | 'textarea' | 'select' | 'radio' | 'switch' | 'checkbox';
  elementConfig?: {
    type?: 'text' | 'email' | 'password' | 'tel' | 'checkbox' | 'radio' | 'range' | 'search';
    placeholder: string;
  };
  value?: string;
  name?: string;
  validation?: {
    required: boolean;
  }
  invalid?: boolean;
  shouldValidate?: boolean;
  touched?: boolean;
  changed: changeHandler<any>;
  errors?: string[];
  label?: string;
  options?: any[] | ISelectOptions[]
  option?: any
}