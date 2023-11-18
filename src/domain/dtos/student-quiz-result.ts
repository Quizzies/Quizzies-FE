export interface studQuizGradeDto {
    questionTxt: string;
    responseValue?: string; 
    responseMark: string; 
    answerValue: string;
  }
  
  export interface studQuizResultdto {
    fullName: string; 
    quizId: number;
    quizName: string;
    totalScore: number;
    questions: studQuizGradeDto[];
  }
  