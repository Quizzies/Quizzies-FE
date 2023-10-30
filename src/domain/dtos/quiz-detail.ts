import { Quiz } from "../models";

export interface QuizDetail extends Quiz {
  courseName:      string;
  questions?:       Question[];
}

interface Question {
  questionId:     number;
  questionTypeId: number;
  questionTxt:    string;
  answers:        Answer[];
}

interface Answer {
  answerId:    number;
  answerValue: string;
  isCorrect:   boolean;
}
