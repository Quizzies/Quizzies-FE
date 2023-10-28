import { CourseDto, CourseOverview, RegisterInput } from "../../domain/dtos";
import { AuthUser } from "../../domain/models";
import { optionInputsErrors } from "../utils/error-utils";

export type AppState<T> = {
  loading: boolean;
  errors: optionInputsErrors<T> | null;
  success: boolean;
};

export type AuthState = AuthUser & AppState<RegisterInput>;
export type CoursesState = { courses: CourseDto[] } & AppState<void>;
export type CourseDetailState = CourseOverview & AppState<void>;
