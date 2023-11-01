import { QuizResult } from "../models";

export interface QuizResultDto {
  quizId: number;
  quizName: string
  courseName: string;
  studentResults: StudentResult[]
}

type StudentResult = Omit<QuizResult, 'quizId' | 'userId'> & { 
  fullName: string
};