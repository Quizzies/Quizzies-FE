export interface QuizOverview {
  quizId: number;
  quizName: string;
  dueDate: string;
  isPosted: boolean;
  isPassedDeadline: boolean
}

export interface CourseOverview {
  courseId: number;
  courseName: string;
  quizzes: QuizOverview[]
}