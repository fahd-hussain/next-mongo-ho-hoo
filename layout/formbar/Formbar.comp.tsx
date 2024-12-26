import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import { forwardRef, useImperativeHandle, useReducer } from 'react'

import { SDivider } from '../../styles/components/SDivider'
import { SHeading } from '../../styles/components/SHeadings'
import {
  IModalInitialStateInterface,
  ModalActionEnum,
  ModalActionInterface,
  modalInitialState,
} from '../../types/formBar.types'
import { FormBarBody, FormBarContainer, FormBarHeader } from './formbar.styles'

const FormBar = forwardRef<FormBarRefInterface, FormBarProps>((_props, ref) => {
  const [state, dispatch] = useReducer(modalReducer, modalInitialState)

  const handleOpenFormBar = (_args: Partial<IModalInitialStateInterface>) => {
    dispatch({ type: ModalActionEnum.OPEN_MODAL, payload: _args })
  }

  const handleCloseFormBar = () => {
    dispatch({ type: ModalActionEnum.CLOSE_MODAL })
  }

  useImperativeHandle(
    ref,
    () => ({ handleOpenFormBar, handleCloseFormBar }),
    []
  )

  return (
    <FormBarBody open={state.open}>
      {state.open ? (
        <FormBarContainer>
          <FormBarHeader>
            <IconButton onClick={() => handleCloseFormBar()}>
              <CloseIcon />
            </IconButton>
            <SHeading size="xl">{state.heading}</SHeading>
          </FormBarHeader>
          <SDivider />
          {state.children}
        </FormBarContainer>
      ) : null}
    </FormBarBody>
  )
})

FormBar.displayName = 'FormBar'

export default FormBar

interface FormBarProps {}

export interface FormBarRefInterface {
  handleOpenFormBar: (_args: Partial<IModalInitialStateInterface>) => void
  handleCloseFormBar: () => void
}

const modalReducer = (
  state: IModalInitialStateInterface,
  action: ModalActionInterface
) => {
  switch (action.type) {
    case 'OPEN_MODAL': {
      return {
        ...state,
        open: true,
        children: action?.payload?.children ?? '',
        heading: action?.payload?.heading ?? '',
      }
    }
    case 'CLOSE_MODAL': {
      return { ...state, ...modalInitialState }
    }
    default: {
      return state
    }
  }
}
