import { UserProfileDto } from "../dtos"

export interface User {
  firstName: string
  lastName: string
  email: string
  userType: 'T' | 'S';
}

export interface AuthUser {
  userInfo: UserProfileDto | null
  userToken: string | null
}