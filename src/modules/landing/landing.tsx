import React, {useEffect} from 'react'
import {GrayTableHead, Col, LandingContainer} from './style'
import ReactTable from 'react-table'
import {StyledTable} from '../../shared/components/table/styledTable'
import {useDispatch, useSelector} from 'react-redux'
import {getAllFeedbacks} from '../../Redux/Root/actions'
import toast from 'react-hot-toast'

const Landing = () => {
  const dispatch = useDispatch()
  const {allFeedbacks, feedbacksLoading} = useSelector(
    (state: any) => state.feedback
  )
  const [tableData, setTableData] = React.useState([])
  const [deskResponsive, setDeskResponsive] = React.useState(false)

  useEffect(() => {
    dispatch(getAllFeedbacks())
  }, [])
  useEffect(() => {
    if (allFeedbacks) {
      setTableData(allFeedbacks)
    }
  }, [allFeedbacks])
  useEffect(() => {
    if (feedbacksLoading) {
      toast.loading('Loading...')
    } else {
      toast.dismiss()
    }
  }, [feedbacksLoading])

  const renderTableHeading = (heading: any) => {
    return (
      <GrayTableHead style={{fontFamily: 'Regular'}}>{heading}</GrayTableHead>
    )
  }
  return (
    <>
      <LandingContainer>
        <StyledTable>
          {/* @ts-ignore */}
          <ReactTable
            data={tableData}
            columns={[
              {
                Header: <div>{renderTableHeading('Name')}</div>,
                accessor: 'date',
                Cell: (row: any) => (
                  <Col>
                    <div>{row.original.name}</div>
                  </Col>
                ),
                sortMethod: (a: any, b: any) => Number(b) - Number(a),
                width: deskResponsive ? 130 : 140,
              },
              {
                Header: <div>{renderTableHeading('Email')}</div>,
                accessor: 'pair',
                Cell: (row: any) => (
                  <Col>
                    <div>{row.original.email}</div>
                  </Col>
                ),
                sortMethod: (a: any, b: any) => Number(b) - Number(a),
                width: deskResponsive ? 90 : 140,
              },
              {
                Header: renderTableHeading(`Category`),
                accessor: 'side',
                Cell: (row: any) => (
                  <Col>
                    <div>{row.original.category}</div>
                  </Col>
                ),
                sortMethod: (a: any, b: any) => Number(b) - Number(a),
                width: deskResponsive ? 90 : 120,
              },
              {
                Header: renderTableHeading(`Message`),
                accessor: 'side',
                Cell: (row: any) => (
                  <Col>
                    <div>{row.original.feedback}</div>
                  </Col>
                ),
                sortMethod: (a: any, b: any) => Number(b) - Number(a),
                width: deskResponsive ? 90 : 120,
              },
            ]}
            showPagination={true}
            // defaultPageSize={10}
            minRows={0}
            resizable={false}
            // sortable={true}
            // multiSort={true}
            showFilters={true}
          />
        </StyledTable>
      </LandingContainer>
    </>
  )
}
export default Landing
