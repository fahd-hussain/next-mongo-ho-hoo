import { IUserInterface } from './user.types'

export interface ICategoryInterface {
  _id: string
  name: string
  description: string
  author: IUserInterface
}

export type ICategoryFormType = Pick<ICategoryInterface, 'name' | 'description'>
