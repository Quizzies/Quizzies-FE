import { CourseDto } from "./course-list";

export interface UserProfileDto {
  firstName: string;
  lastName: string;
  email: string;
  userType: 'T' | 'S';
  courses?: CourseDto[];
}
