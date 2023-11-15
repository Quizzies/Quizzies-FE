export interface StudentAnswer {
    firstName: string
    lastName: string
    email: string
    userType:'S';
    quizId: number;
    answers: {
      questionId: number;
      answerValue: string | boolean;
    }[];
  }