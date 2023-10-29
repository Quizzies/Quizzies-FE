import {
  CourseDto,
  CourseOverview,
  QuizDetail,
  QuizInput,
  RegisterInput,
} from "../../domain/dtos";
import { QuizQuestionInput } from "../../domain/dtos/quiz-question-input";
import {
  AuthUser,
  QuestionType,
  QuizAnswer,
  QuizQuestion,
} from "../../domain/models";
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
export type QuizQuestionState = QuizQuestion & AppState<QuizQuestionInput>;
export type QuestionTypeState = {
  questionTypes: QuestionType[];
} & AppState<{}>;
export type QuizAnswerState = { questionAnswers: QuizAnswer[], submitted: boolean } & AppState<{}>;
