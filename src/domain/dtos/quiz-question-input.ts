import { QuizQuestionDetail } from "./quiz-question-detail";


export type QuizQuestionInput = Omit<QuizQuestionDetail, "courseName" | "quizName">