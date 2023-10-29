export interface Quiz {
  quizId?: number;
  courseId?: number;
  quizName: string;
  quizDescription: string;
  timeLimit: number;
  isPosted?: boolean;
  dueDate: string;
}