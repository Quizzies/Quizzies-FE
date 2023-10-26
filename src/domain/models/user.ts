import { optionInputsErrors } from "../../ts/utils/error-utils"
import { RegisterInput } from "../dtos"

export interface User {
  loading: boolean,
  userInfo: {
    firstName: string
    lastName: string
    email: string
    userType: string
  } | null
  userToken: string | null
  errors: optionInputsErrors<RegisterInput> | null
  success: boolean
}