export interface QuizAnswer {
  answerId?: number;
  questionId?: number;
  answerValue: string;
  isCorrect: boolean;
}