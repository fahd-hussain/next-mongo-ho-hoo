import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import IconButton from '@mui/material/IconButton'

import {
  PaginationControllerContainer,
  PaginationControllerLabels,
} from './paginationController.styles'

const PaginationController = ({
  pageNumber,
  pageSize,
  totalRecords,
  handleNext,
  handlePrev,
}: PaginationControllerProps) => {
  return (
    <PaginationControllerContainer>
      <PaginationControllerLabels>
        {pageNumber} - {Math.ceil(totalRecords / pageSize)} of {totalRecords}
      </PaginationControllerLabels>
      <IconButton onClick={handlePrev}>
        <ArrowBackIosIcon fontSize="small" />
      </IconButton>
      <IconButton onClick={handleNext}>
        <ArrowForwardIosIcon fontSize="small" />
      </IconButton>
    </PaginationControllerContainer>
  )
}

export default PaginationController

interface PaginationControllerProps {
  pageSize: number
  pageNumber: number
  totalRecords: number
  handleNext: () => void
  handlePrev: () => void
}
