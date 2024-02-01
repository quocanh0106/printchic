import { Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { styled } from 'styled-components'
import { Colors } from '~/Themes'
import CustomText, { TEXT_TYPE } from '../CustomText'

interface SimpleTableProps {
  data: Array<any>
  headerCells: string[]
  dataKeys: string[]
  pageCount: number
  setCurrentPage?: (newPage: number) => void
  noPagination?: boolean
  styleHeader?: any
}

const CustomTable: React.FC<SimpleTableProps> = ({
  data,
  headerCells,
  pageCount,
  dataKeys,
  setCurrentPage,
  styleHeader,
  noPagination
}) => {
  const handleChangePage = (event: unknown, newPage: number) => {
    console.log('event', event)
    setCurrentPage && setCurrentPage(newPage)
  }

  return (
    <>
      <TableContainer
        sx={{
          borderRadius: '8px',
          boxShadow: '0px 4px 4px 0px #00000040'
        }}
        component={Paper}
      >
        <Table>
          <TableHead
            sx={{
              background: Colors.primary
            }}
          >
            <TableRow>
              {headerCells.map((headerCell, index) => (
                <TableCell
                  sx={
                    styleHeader
                      ? {
                          padding: '12px',
                          textAlign: 'center',
                          ...styleHeader[index]
                        }
                      : {
                          padding: '12px',
                          textAlign: 'center'
                        }
                  }
                  key={headerCell}
                >
                  <CustomText type={TEXT_TYPE.white_16_600}>{headerCell}</CustomText>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length >= 1 && data[0].id ? (
              data.map((row) => (
                <TableRow key={Math.random()}>
                  {dataKeys.map((key) => (
                    <TableCell
                      sx={{
                        borderBottom: 'unset',
                        padding: '12px',
                        textAlign: 'center'
                      }}
                      key={key}
                    >
                      <CustomText type={TEXT_TYPE.primary_16_400}>{row[key]}</CustomText>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <CustomText
                block
                type={TEXT_TYPE.primary_18_700}
                customStyle={{
                  margin: '15px 0',
                  position: 'sticky',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)'
                }}
              >
                Không có bản ghi nào
              </CustomText>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {noPagination ? (
        <></>
      ) : (
        <PaginationContainer>
          <Pagination
            sx={{
              '& .MuiPaginationItem-previousNext': {
                color: Colors.primary
              },
              '& .MuiPaginationItem-root': {
                color: Colors.primary
              },
              '& .Mui-selected': {
                color: `${Colors.white} !important`,
                background: `${Colors.primary} !important`,
                '&:hover': {
                  background: `${Colors.primary} !important`
                }
              }
            }}
            count={pageCount}
            variant='outlined'
            shape='rounded'
            onChange={handleChangePage}
          />
        </PaginationContainer>
      )}
    </>
  )
}

export default CustomTable

const PaginationContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
`
