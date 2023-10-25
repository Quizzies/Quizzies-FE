import { Dispatch, SetStateAction } from 'react';

export type optionInputsErrors<T> = {
  [key in keyof T]?: string[];
}

export interface IErrorFields {
  errors: string[];
  field: string;
}

interface ServerErrors {
  message: IErrorFields[];
}

export function setErroMapping(
  err: any, 
  setForm: Dispatch<SetStateAction<any>>): void {
  const _err: ServerErrors = err;
  let formErrors: any = {};
  _err.message.forEach(err => {
    formErrors[err.field] = err.errors;
  })
  setForm(formErrors);
}
