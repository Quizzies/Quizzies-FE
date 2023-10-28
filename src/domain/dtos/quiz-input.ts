import { QuizDetail } from "./quiz-detail";

export type QuizInput = Omit<QuizDetail, "quizId" | "courseName">