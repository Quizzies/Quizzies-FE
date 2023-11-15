export interface StudentAnswer {
    quizId: number;
    userId: number;
    answers: {
      questionId: number;
      answerValue: string | boolean;
    }[];
  }