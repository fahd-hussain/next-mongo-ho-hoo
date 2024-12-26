import { ICategoryInterface } from './category.types'
import { IUserInterface } from './user.types'

export interface IProductInterface {
  _id: string
  name: string
  description: string
  author: IUserInterface
  category?: ICategoryInterface
  averagePrice: number
}

export type IProductAddFormType = Pick<
  IProductInterface,
  'name' | 'description' | 'category'
> & { _id?: string }

export type IProductEditFormType = IProductAddFormType & { _id: string }
