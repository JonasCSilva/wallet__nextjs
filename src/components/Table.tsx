import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { Table, Thead, Tbody, Tr, Th, Td, Text, chakra, Skeleton, Tfoot } from '@chakra-ui/react'
import { useEffect, useMemo, useState, useContext } from 'react'
import { useTable, useSortBy, Cell } from 'react-table'

import { SheetDataContext } from '../contexts/SheetDataContext'
import { headersAndFooters } from '../headerAndFooters'
import { bg3 } from '../theme'
import { TickerData } from '../types/data'
import CurrentInput from './CurrentInput'

export default function MyTable({ index }: { index: number }) {
  const [sheetDataState] = useContext(SheetDataContext)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (sheetDataState[0][0].name !== 'DUMMY' && isLoading) {
      setIsLoading(false)
    }
  }, [sheetDataState])

  function frmt(value: number) {
    return Number(value.toFixed(2))
  }

  const columns = useMemo(() => headersAndFooters, [])

  const data = useMemo(() => sheetDataState[index], [sheetDataState[index]])

  const { getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: [
          {
            id: 'name',
            desc: false
          }
        ]
      },
      disableSortRemove: true,
      autoResetSortBy: false
    },
    useSortBy
  )

  const footerStyle = {
    fontSize: 12,
    color: bg3,
    py: 4,
    textAlign: 'center' as const
  }

  const footerTextStyle = {
    pr: 4 as const
  }

  return (
    <Table
      {...getTableProps()}
      size='sm'
      border='solid'
      borderWidth={1}
      borderColor='rgba(255, 255, 255, 0.16)'
      borderTopWidth={0}
    >
      <Thead>
        {headerGroups.map(group => (
          // eslint-disable-next-line react/jsx-key
          <Tr {...group.getHeaderGroupProps()}>
            {group.headers.map(column => (
              // eslint-disable-next-line react/jsx-key
              <Th {...column.getHeaderProps(column.getSortByToggleProps())} fontSize={10} py={4} textAlign='center'>
                {column.render('Header')}
                <chakra.span pl={2}>
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <TriangleDownIcon aria-label='sorted descending' />
                    ) : (
                      <TriangleUpIcon aria-label='sorted ascending' />
                    )
                  ) : (
                    // TODO: Change
                    <TriangleUpIcon aria-label='hidden' color='transparent' />
                  )}
                </chakra.span>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            // eslint-disable-next-line react/jsx-key
            <Tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                // eslint-disable-next-line react/jsx-key
                <Td
                  {...cell.getCellProps()}
                  fontSize={12}
                  py={4}
                  color={cell.column.id === 'invest' && cell.value > 0 ? bg3 : undefined}
                  textAlign='center'
                >
                  <Skeleton isLoaded={!isLoading}>
                    {(() => {
                      if (cell.column.id === 'current') {
                        return <CurrentInput cell={cell as Cell<TickerData>} />
                      } else if (typeof cell.value === 'number') {
                        return <Text pr={4}>{frmt(cell.value)}</Text>
                      } else {
                        return <Text pr={4}>{cell.render('Cell')}</Text>
                      }
                    })()}
                  </Skeleton>
                </Td>
              ))}
            </Tr>
          )
        })}
      </Tbody>
      <Tfoot>
        {footerGroups.map(group => (
          // eslint-disable-next-line react/jsx-key
          <Tr {...group.getFooterGroupProps()}>
            {group.headers.map(column => (
              // eslint-disable-next-line react/jsx-key
              <Th {...column.getFooterProps()} {...footerStyle}>
                {column.Footer ? (
                  <Skeleton isLoaded={!isLoading}>
                    <Text {...footerTextStyle}>{column.render('Footer')}</Text>
                  </Skeleton>
                ) : null}
              </Th>
            ))}
          </Tr>
        ))}
      </Tfoot>
    </Table>
  )
}
