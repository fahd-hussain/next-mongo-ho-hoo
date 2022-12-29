import Skeleton from '@mui/material/Skeleton'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

import PaginationController from '../../components/paginationController/PaginationController.comp'
import SearchInput from '../../components/searchInput/SearchInput.comp'
import { SButton } from '../../styles/components/SButton'
import {
  STable,
  STableBody,
  STableCell,
  STableContainer,
  STableHead,
  STableRow,
} from '../../styles/components/STable'
import {
  CategoryContainer,
  CategoryContent,
  CategoryHeader,
} from '../../styles/pages/application/category.styles'
import { ICategoryInterface } from '../../types/category.types'
import appendQueryToURL from '../../utils/appendQueryToURL.util'

const PAGE_SIZE = process.env.NEXT_PUBLIC_DATA_SIZE || 5

const CategoryPage = () => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [name, setName] = useState<string>('')
  const [url, setUrl] = useState<string>('')

  const { data, isLoading } = useSWR(url)

  const _handlePageChange = (prev?: boolean) => {
    if (prev && pageNumber > 1) {
      setPageNumber(pageNumber - 1)
    } else if (
      !prev &&
      pageNumber < data?.pagination?.totalRecords / +PAGE_SIZE
    ) {
      setPageNumber(pageNumber + 1)
    }
  }

  const _handleSearch = (text: string) => setName(text)

  useEffect(() => {
    setUrl(
      appendQueryToURL('/category', {
        pageNumber,
        name,
        pageSize: PAGE_SIZE,
      })
    )
  }, [pageNumber, name])

  return (
    <CategoryContainer>
      <CategoryHeader>
        <SearchInput handleSearch={_handleSearch} />
        <SButton>Add Category</SButton>
      </CategoryHeader>
      {isLoading ? (
        <Skeleton
          variant="rectangular"
          animation="wave"
          style={{ height: '100%' }}
        />
      ) : (
        <CategoryContent>
          <STableContainer>
            <STable aria-label="simple table">
              <STableHead>
                <STableRow>
                  <STableCell>Name</STableCell>
                  <STableCell>Description</STableCell>
                  <STableCell align="right">Author</STableCell>
                </STableRow>
              </STableHead>
              <STableBody>
                {data?.document?.map((row: ICategoryInterface) => (
                  <STableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <STableCell component="th" scope="row">
                      {row.name}
                    </STableCell>
                    <STableCell>{row.description}</STableCell>
                    <STableCell align="right">{row.author.username}</STableCell>
                  </STableRow>
                ))}
              </STableBody>
            </STable>
          </STableContainer>
          <PaginationController
            pageNumber={pageNumber}
            pageSize={+PAGE_SIZE}
            totalRecords={data?.pagination?.totalRecords}
            handleNext={() => _handlePageChange()}
            handlePrev={() => _handlePageChange(true)}
          />
        </CategoryContent>
      )}
    </CategoryContainer>
  )
}

export default CategoryPage
