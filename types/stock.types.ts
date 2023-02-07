import { IProductInterface } from './product.types'
import { IUserInterface } from './user.types'

export interface IStockInterface {
  _id: string
  product?: IProductInterface
  author: IUserInterface
  unitPrice: number
  price: number
  unit: number
  isDeleted: boolean
}

export type IStockAddFormType = Pick<
  IStockInterface,
  'unitPrice' | 'unit' | 'product'
> & { _id?: string }

export type IStockEditFormType = IStockAddFormType & { _id: string }
