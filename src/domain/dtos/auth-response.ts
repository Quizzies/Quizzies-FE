export interface AuthResponse {
  firstName: string
  lastName: string
  email: string
  userType: 'T' | 'S'
  userToken: string
}