import {
  CourseDto,
  CourseOverview,
  QuizDetail,
  QuizInput,
  QuizQuestionDetail,
  RegisterInput,
} from "../../domain/dtos";
import { QuizQuestionInput } from "../../domain/dtos/quiz-question-input";
import { AuthUser, QuestionType } from "../../domain/models";
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
export type QuizQuestionState = QuizQuestionDetail &
  AppState<QuizQuestionInput>;
export type QuestionTypeState = { questionTypes: QuestionType[] } & AppState<{}>
