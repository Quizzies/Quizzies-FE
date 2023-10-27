import { CourseDto } from "../dtos"

export interface User {
  userInfo: {
    firstName: string
    lastName: string
    email: string
    userType: 'T' | 'S';
    courses?: CourseDto[];
  } | null
  userToken: string | null
}