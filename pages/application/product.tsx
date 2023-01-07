import { SelectChangeEvent } from '@mui/material'
import { FormikHelpers } from 'formik'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

import { useRouter } from 'next/router'
import ProductForm from '../../components/forms/product/ProductForm.comp'
import PaginationController from '../../components/paginationController/PaginationController.comp'
import SearchInput from '../../components/searchInput/SearchInput.comp'
import SortMenu from '../../components/sortMenu/SortMenu.comp'
import { handleCloseForm, handleOpenForm } from '../../layout/Dashboard.layout'
import { SButton } from '../../styles/components/SButton'
import { SLoader } from '../../styles/components/SLoader'
import {
  STable,
  STableBody,
  STableCell,
  STableContainer,
  STableHead,
  STableRow,
} from '../../styles/components/STable'
import {
  ProductContainer,
  ProductContent,
  ProductHeader,
} from '../../styles/pages/application/product.styles'
import {
  IProductAddFormType,
  IProductEditFormType,
  IProductInterface,
} from '../../types/product.types'
import appendQueryToURL from '../../utils/appendQueryToURL.util'
import {
  deleteRequest,
  patchRequest,
  postRequest,
} from '../../utils/requestHandler.util'

const PAGE_SIZE = process.env.NEXT_PUBLIC_DATA_SIZE || 10

const ProductPage = () => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [name, setName] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [sortedBy, setSortedBy] = useState('name')

  const { data, isLoading, mutate } = useSWR(url)
  useSWR('/category?pageNumber=1&sortedBy=name&pageSize=100')

  const { query } = useRouter()

  const initialValues: IProductAddFormType = {
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

  const _handleCreateProduct = async (
    values: IProductAddFormType | IProductEditFormType,
    formikHelpers: FormikHelpers<IProductAddFormType | IProductEditFormType>
  ) => {
    // eslint-disable-next-line no-debugger
    debugger
    if ((values as IProductEditFormType)._id) {
      await patchRequest(`/product/${values._id}`, values)
    } else {
      await postRequest('/product', values)
    }

    mutate(undefined, {
      revalidate: true,
    })
    formikHelpers.resetForm()
    handleCloseForm()
  }

  const _handleOpenModal = (values?: IProductInterface) => {
    handleOpenForm({
      children: (
        <ProductForm
          initialValues={values ? values : initialValues}
          onSubmit={_handleCreateProduct}
        />
      ),
      heading: `${values ? 'Edit' : 'Create'} Product`,
    })
  }

  const _handleDeleteProduct = async (productId: string, index: number) => {
    if (!data?.document) return

    await deleteRequest(`/product/${productId}`)

    const updatedData = [...data.document]
    updatedData.splice(index, 1)
    mutate(undefined, { revalidate: true })
  }

  useEffect(() => {
    setUrl(
      appendQueryToURL('/product', {
        pageNumber,
        name,
        sortedBy,
        pageSize: PAGE_SIZE,
        ...(query.category_id && { categoryId: query.category_id }),
      })
    )

    return () => {
      handleCloseForm()
    }
  }, [pageNumber, name, sortedBy, query])

  return (
    <ProductContainer>
      <ProductHeader>
        <div style={{ display: 'flex' }}>
          <SearchInput handleSearch={_handleSearch} />
          <SortMenu handleChange={_handleSortByChange} value={sortedBy} />
        </div>
        <SButton onClick={() => _handleOpenModal()}>Add Product</SButton>
      </ProductHeader>
      <ProductContent loading={+isLoading}>
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
              {data?.document?.map((row: IProductInterface, index: number) => (
                <STableRow
                  key={row._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <STableCell component="th" scope="row">
                    {row.name}
                  </STableCell>
                  <STableCell>{row.description}</STableCell>
                  <STableCell align="right">{row?.author?.username}</STableCell>
                  <STableCell align="right">
                    <SButton
                      onClick={() => {
                        _handleOpenModal(row)
                      }}
                      disabled={isLoading}
                    >
                      Edit
                    </SButton>
                    <SButton
                      color_type="danger"
                      onClick={() => {
                        _handleDeleteProduct(row._id, index)
                      }}
                      disabled={isLoading}
                    >
                      Delete
                    </SButton>
                  </STableCell>
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
        {isLoading ? <SLoader /> : null}
      </ProductContent>
    </ProductContainer>
  )
}

export default ProductPage
