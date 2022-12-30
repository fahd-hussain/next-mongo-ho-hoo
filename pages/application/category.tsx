import Skeleton from '@mui/material/Skeleton'
import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'

import CategoryForm from '../../components/forms/category/CategoryForm.comp'
import PaginationController from '../../components/paginationController/PaginationController.comp'
import SearchInput from '../../components/searchInput/SearchInput.comp'
import { handleCloseForm, handleOpenForm } from '../../layout/Dashboard.layout'
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
import {
  ICategoryFormType,
  ICategoryInterface,
} from '../../types/category.types'
import appendQueryToURL from '../../utils/appendQueryToURL.util'
import { postRequest } from '../../utils/requestHandler.util'

const PAGE_SIZE = process.env.NEXT_PUBLIC_DATA_SIZE || 10

const CategoryPage = () => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [name, setName] = useState<string>('')
  const [url, setUrl] = useState<string>('')

  const { data, isLoading, mutate } = useSWR(url)

  const initialValues: ICategoryFormType = {
    name: '',
    description: '',
  }

  const containerRef = useRef<HTMLDivElement>(null)

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

  const _handleSubmit = async (values: any, formikHelpers: any) => {
    try {
      mutate([values, ...data.document], {
        rollbackOnError: true,
        populateCache: true,
      })
      await postRequest('/category', values)
      formikHelpers.resetForm()
      handleCloseForm()
    } catch (error) {
      console.log(error)
    }
  }

  const _toggleOpenModal = () => {
    handleOpenForm({
      children: (
        <CategoryForm initialValues={initialValues} onSubmit={_handleSubmit} />
      ),
      heading: 'Category Form',
    })
  }

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
    <CategoryContainer ref={containerRef}>
      <CategoryHeader>
        <SearchInput handleSearch={_handleSearch} />
        <SButton onClick={_toggleOpenModal}>Add Category</SButton>
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
