export interface QuizOverview {
  quizName: string;
  dueDate: string;
}

export interface CourseOverview {
  courseId: number;
  courseName: string;
  quizzes: QuizOverview[]
}