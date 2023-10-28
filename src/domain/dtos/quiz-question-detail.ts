import { QuizQuestion } from "../models";

export interface QuizQuestionDetail extends QuizQuestion {
  courseName: string;
}