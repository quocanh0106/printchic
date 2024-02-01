import { ComponentType } from 'react'
import { IPath } from './InterfaceRouter'

export type PathName = keyof IPath

export interface IRouter {
  path: PathName
  exact?: boolean
  element: ComponentType
  isAuth: boolean
}
