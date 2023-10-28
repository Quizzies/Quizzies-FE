import { CourseDto } from "./course-list";
import { User } from "../models";

export interface UserProfileDto extends User {
  courses?: CourseDto[];
}
