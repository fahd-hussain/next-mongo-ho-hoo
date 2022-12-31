import Skeleton from '@mui/material/Skeleton'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

import { SelectChangeEvent } from '@mui/material'
import { FormikHelpers } from 'formik'
import CategoryForm from '../../components/forms/category/CategoryForm.comp'
import PaginationController from '../../components/paginationController/PaginationController.comp'
import SearchInput from '../../components/searchInput/SearchInput.comp'
import SortMenu from '../../components/sortMenu/SortMenu.comp'
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
  ICategoryAddFormType,
  ICategoryEditFormType,
  ICategoryInterface,
} from '../../types/category.types'
import appendQueryToURL from '../../utils/appendQueryToURL.util'
import {
  deleteRequest,
  patchRequest,
  postRequest,
} from '../../utils/requestHandler.util'

const PAGE_SIZE = process.env.NEXT_PUBLIC_DATA_SIZE || 10

const CategoryPage = () => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [name, setName] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [sortedBy, setSortedBy] = useState('name')

  const { data, isLoading, mutate } = useSWR(url)

  const initialValues: ICategoryAddFormType = {
    name: '',
    description: '',
  }

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

  const _handleSortByChange = (event: SelectChangeEvent) =>
    setSortedBy(event.target.value)

  const _handleCreateCategory = async (
    values: ICategoryAddFormType | ICategoryEditFormType,
    formikHelpers: FormikHelpers<ICategoryAddFormType | ICategoryEditFormType>
  ) => {
    if ((values as ICategoryEditFormType)._id) {
      await patchRequest(`/category/${values._id}`, values)
    } else {
      await postRequest('/category', values)
    }

    mutate(undefined, {
      revalidate: true,
    })
    formikHelpers.resetForm()
    handleCloseForm()
  }

  const _handleOpenModal = (values?: ICategoryInterface) => {
    handleOpenForm({
      children: (
        <CategoryForm
          initialValues={values ? values : initialValues}
          onSubmit={_handleCreateCategory}
        />
      ),
      heading: `${values ? 'Edit' : 'Create'} Category`,
    })
  }

  const _handleDeleteCategory = async (categoryId: string, index: number) => {
    if (!data?.document) return

    await deleteRequest(`/category/${categoryId}`)

    const updatedData = [...data.document]
    updatedData.splice(index, 1)
    mutate(undefined, { revalidate: true })
  }

  useEffect(() => {
    setUrl(
      appendQueryToURL('/category', {
        pageNumber,
        name,
        sortedBy,
        pageSize: PAGE_SIZE,
      })
    )
  }, [pageNumber, name, sortedBy])

  return (
    <CategoryContainer>
      <CategoryHeader>
        <div style={{ display: 'flex' }}>
          <SearchInput handleSearch={_handleSearch} />
          <SortMenu handleChange={_handleSortByChange} value={sortedBy} />
        </div>
        <SButton onClick={() => _handleOpenModal()}>Add Category</SButton>
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
                  <STableCell align="right">Actions</STableCell>
                </STableRow>
              </STableHead>
              <STableBody>
                {data?.document?.map(
                  (row: ICategoryInterface, index: number) => (
                    <STableRow
                      key={row._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <STableCell component="th" scope="row">
                        {row.name}
                      </STableCell>
                      <STableCell>{row.description}</STableCell>
                      <STableCell align="right">
                        {row?.author?.username}
                      </STableCell>
                      <STableCell align="right">
                        <SButton
                          onClick={() => {
                            _handleOpenModal(row)
                          }}
                        >
                          Edit
                        </SButton>
                        <SButton
                          color_type="danger"
                          onClick={() => {
                            _handleDeleteCategory(row._id, index)
                          }}
                        >
                          Delete
                        </SButton>
                      </STableCell>
                    </STableRow>
                  )
                )}
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
