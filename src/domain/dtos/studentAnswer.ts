export interface StudentAnswer {
  answerIds: number[]; // reminder to change it back to number of does not work out
  quizId: number;
  questionId: number;
}
//Optional ?
export const createStudentAnswerDTO = (quizId: number, questionId: number, answerIds: number[]): StudentAnswer => {
  return {
    answerIds,
    quizId,
    questionId
  };
};