export interface StudentAnswerInput {
  answerId: number[];
  direction: string; // 'F' moves forward in questions, 'B' backward
}

export const createStudAnswer = (answerId: number[], direction: string): StudentAnswerInput => {
  return {
    answerId,
    direction
  };
};
