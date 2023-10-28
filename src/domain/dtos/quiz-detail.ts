export interface QuizDetail {
  quizId?: number;
  courseId?: number;
  courseName: string;
  quizName: string;
  quizDescription: string;
  timeLimit: number;
  dueDate: string;
}