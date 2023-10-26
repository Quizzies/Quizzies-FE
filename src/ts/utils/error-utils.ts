import { Dispatch, SetStateAction } from "react";

export type optionInputsErrors<T> = {
  [key in keyof T]?: string[];
};

export interface IErrorFields {
  errors: string[];
  field: string;
}

export function setErroMapping(err: any): Record<string, string[]> {
  const _err: IErrorFields[] = JSON.parse(err.message);
  let formErrors: Record<string, string[]> = {};
  _err.forEach((err) => {
    formErrors[err.field] = err.errors;
  });
  return formErrors;
}

export function setErroMappingLegacy(
  err: any,
  setForm: Dispatch<SetStateAction<any>>
): void {
  const _err: IErrorFields[] = JSON.parse(err.message);
  let formErrors: any = {};
  _err.forEach((err) => {
    formErrors[err.field] = err.errors;
  });
  setForm(formErrors);
}
