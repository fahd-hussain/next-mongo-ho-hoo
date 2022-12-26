import SearchIcon from '@mui/icons-material/Search'
import { IconButton, InputAdornment } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { SIContainer, SIInput } from './searchInput.styles'

const SearchInput = ({ handleSearch }: SearchInputProps) => {
  const [text, setText] = useState<string>('')

  const _handleChangeText = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  useEffect(() => {
    const apiCallTimeout = setTimeout(() => {
      handleSearch(text)
    }, 300)

    return () => {
      clearTimeout(apiCallTimeout)
    }
  })

  return (
    <SIContainer>
      <SIInput
        name="searchInput"
        label="Search"
        onChange={_handleChangeText}
        value={text}
        type="text"
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => handleSearch(text)} edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </SIContainer>
  )
}

export default SearchInput

interface SearchInputProps {
  handleSearch: (_text: string) => void
}
