import { IUserInterface } from './user.types'

export interface ICategoryInterface {
  _id: string
  name: string
  description: string
  author: IUserInterface
}

export type ICategoryAddFormType = Pick<
  ICategoryInterface,
  'name' | 'description'
> & { _id?: string }

export type ICategoryEditFormType = ICategoryAddFormType & { _id: string }
