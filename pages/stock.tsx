import { SelectChangeEvent } from '@mui/material'
import { FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

import StockForm from '../components/forms/stock/StockForm.comp'
import PaginationController from '../components/paginationController/PaginationController.comp'
import SearchInput from '../components/searchInput/SearchInput.comp'
import SortMenu from '../components/sortMenu/SortMenu.comp'
import { handleCloseForm, handleOpenForm } from '../layout/Dashboard.layout'
import { SButton } from '../styles/components/SButton'
import { SLoader } from '../styles/components/SLoader'
import {
  STable,
  STableBody,
  STableCell,
  STableContainer,
  STableHead,
  STableRow,
} from '../styles/components/STable'
import {
  StockContainer,
  StockContent,
  StockHeader,
} from '../styles/pages/stock.styles'
import {
  IStockAddFormType,
  IStockEditFormType,
  IStockInterface,
} from '../types/stock.types'
import appendQueryToURL from '../utils/appendQueryToURL.util'
import {
  deleteRequest,
  patchRequest,
  postRequest,
} from '../utils/requestHandler.util'

const PAGE_SIZE = process.env.NEXT_PUBLIC_DATA_SIZE || 10

const StockPage = () => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [name, setName] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [sortedBy, setSortedBy] = useState('name')

  const { data, isLoading, mutate } = useSWR(url)
  useSWR('/product?pageNumber=1&sortedBy=name&pageSize=100')
  const { query } = useRouter()

  const initialValues: IStockAddFormType = {
    unit: 0,
    unitPrice: 0,
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

  const _handleCreateStock = async (
    values: IStockAddFormType | IStockEditFormType,
    formikHelpers: FormikHelpers<IStockAddFormType | IStockEditFormType>
  ) => {
    if ((values as IStockEditFormType)._id) {
      await patchRequest(`/stock/${values._id}`, values)
    } else {
      await postRequest('/stock', values)
    }

    mutate(undefined, {
      revalidate: true,
    })
    formikHelpers.resetForm()
    handleCloseForm()
  }

  const _handleOpenModal = (values?: IStockInterface) => {
    handleOpenForm({
      children: (
        <StockForm
          initialValues={values ? values : initialValues}
          onSubmit={_handleCreateStock}
        />
      ),
      heading: `${values ? 'Edit' : 'Create'} Stock`,
    })
  }

  const _handleDeleteStock = async (stockId: string, index: number) => {
    if (!data?.document) return

    await deleteRequest(`/stock/${stockId}`)

    const updatedData = [...data.document]
    updatedData.splice(index, 1)
    mutate(undefined, { revalidate: true })
  }

  useEffect(() => {
    setUrl(
      appendQueryToURL('/stock', {
        pageNumber,
        name,
        sortedBy,
        pageSize: PAGE_SIZE,
        ...(query.product_id && { productId: query.product_id }),
      })
    )

    return () => {
      handleCloseForm()
    }
  }, [pageNumber, name, sortedBy, query])

  return (
    <StockContainer>
      <StockHeader>
        <div style={{ display: 'flex' }}>
          <SearchInput handleSearch={_handleSearch} />
          <SortMenu handleChange={_handleSortByChange} value={sortedBy} />
        </div>
        <SButton onClick={() => _handleOpenModal()}>Add Stock</SButton>
      </StockHeader>
      <StockContent loading={+isLoading}>
        <STableContainer>
          <STable aria-label="simple table">
            <STableHead>
              <STableRow>
                <STableCell>Product</STableCell>
                <STableCell>Unit</STableCell>
                <STableCell>Unit Price</STableCell>
                <STableCell>Price</STableCell>
                <STableCell align="right">Actions</STableCell>
              </STableRow>
            </STableHead>
            <STableBody>
              {data?.document?.map((row: IStockInterface, index: number) => (
                <STableRow
                  key={row._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <STableCell component="th" scope="row">
                    {row?.product?.name ?? ''}
                  </STableCell>
                  <STableCell>{row.unit}</STableCell>
                  <STableCell>{row.unitPrice}</STableCell>
                  <STableCell>{row.price}</STableCell>
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
                        _handleDeleteStock(row._id, index)
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
      </StockContent>
    </StockContainer>
  )
}

export default StockPage
