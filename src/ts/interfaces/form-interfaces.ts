import { FormEvent } from "react";

export interface IForm {
  title?: string;
  submit: (e: FormEvent<HTMLFormElement>) => void;
}