import { FC } from 'react'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { SMFormControl } from './sortMenu.styles'

const SortMenu: FC<SortMenuProps> = ({ handleChange, value }) => {
  return (
    <SMFormControl>
      <InputLabel id="sort-menu-dropdown">Sort By</InputLabel>
      <Select
        labelId="sort-menu-dropdown"
        id="sort-menu-dropdown"
        value={value}
        onChange={handleChange}
        label="Sort By"
      >
        <MenuItem value="name">Alphabetical</MenuItem>
        <MenuItem value="createdAt">Created at</MenuItem>
        <MenuItem value="updatedAt">Updated aty</MenuItem>
      </Select>
    </SMFormControl>
  )
}

export default SortMenu

interface SortMenuProps {
  handleChange: (_value: SelectChangeEvent) => void
  value: string
}
