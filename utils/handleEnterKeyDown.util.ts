import { KeyboardEvent } from 'react'

const handleEnterKeyDown = (
  event: KeyboardEvent<HTMLDivElement>,
  callback: () => void
) => {
  const { key, shiftKey, altKey, ctrlKey } = event

  if (key === 'Enter' && !shiftKey && !altKey && !ctrlKey) {
    callback()
  }
}

export default handleEnterKeyDown
