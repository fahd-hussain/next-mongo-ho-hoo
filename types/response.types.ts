export interface IPaginationInterface {
  pageSize: number
  pageNumber: number
  totalRecords: number
}

export interface IResponseInterface<T> {
  document: T[]
  pagination: IPaginationInterface
}
