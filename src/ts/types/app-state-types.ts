import { CourseDto, RegisterInput } from "../../domain/dtos";
import { User } from "../../domain/models";
import { optionInputsErrors } from "../utils/error-utils";

export type AppState<T> = {
  loading: boolean;
  errors: optionInputsErrors<T> | null;
  success: boolean;
};

export type AuthState = User & AppState<RegisterInput>;
export type CoursesState = { courses: CourseDto[] } & AppState<void>;
