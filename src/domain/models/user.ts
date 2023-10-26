
export interface User {
  userInfo: {
    firstName: string
    lastName: string
    email: string
    userType: string
  } | null
  userToken: string | null
}