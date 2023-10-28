import { CourseDto, CourseOverview, QuizDetail, QuizInput, RegisterInput } from "../../domain/dtos";
import { AuthUser, Quiz } from "../../domain/models";
import { optionInputsErrors } from "../utils/error-utils";

export type AppState<T> = {
  loading: boolean;
  errors: optionInputsErrors<T>;
  success: boolean;
};

export type AuthState = AuthUser & AppState<RegisterInput>;
export type CoursesState = { courses: CourseDto[] } & AppState<{}>;
export type CourseDetailState = CourseOverview & AppState<{}>;
export type QuizState = QuizDetail & AppState<QuizInput>;
