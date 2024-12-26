import { ReactNode } from 'react'

export interface IModalInitialStateInterface {
  children: ReactNode | ''
  open: boolean
  heading: string
}

export const modalInitialState: IModalInitialStateInterface = {
  children: '',
  open: false,
  heading: '',
}

export enum ModalActionEnum {
  // eslint-disable-next-line no-unused-vars
  OPEN_MODAL = 'OPEN_MODAL',
  // eslint-disable-next-line no-unused-vars
  CLOSE_MODAL = 'CLOSE_MODAL',
}

export interface ModalActionInterface {
  type: ModalActionEnum
  payload?: Partial<IModalInitialStateInterface>
}
