import { clickHandler } from "../types/app-types"


export interface IButton {
  dataTestId?: string
  type?: 'submit'
  onClick?: clickHandler
  color?: string
  redirectTo?: string
}
