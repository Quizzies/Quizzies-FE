import { QuizAnswer } from "./quiz-answers";

export interface QuizQuestion {
  questionId?: number;
  quizId?: number;
  questionTypeId: number | undefined;
  questionTxt: string;
  answers?: QuizAnswer[]
}