export interface StudentAnswer {
  answerId: number[] | string[]; // handles both answer types as well as default ansers (string)
  quizId: number;
  questionId: number;
}

export const createStudentAnswerDTO = (quizId: number, questionId: number, answerId: number[] | string[]): StudentAnswer => {
  return {
    answerId,
    quizId,
    questionId
  };
};
