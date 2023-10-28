export interface QuizQuestion {
  questionId?: number;
  quizId?: number;
  questionTypeId: number | null;
  questionTxt: string;
}