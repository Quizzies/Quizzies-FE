export interface studQuizGradeDto {
  questionTxt: string;
  responseValue?: string; 
  responseMark: string; 
  answerValue: string;
}

export interface studQuizResultdto {
	courseId: number;
	courseName: string;
	questions: [
		{
			questionName: string,
			isCorrect: boolean
		}
	],
	totalScore: number;
}