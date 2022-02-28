import { Table, Thead, Tbody, Tr, Th, Td, Text, chakra, Skeleton, Tfoot } from '@chakra-ui/react'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy } from 'react-table'
import { TableProps } from '../types/components'
import CurrentInput from './CurrentInput'
import { bg3 } from '../theme'

export default function MyTable({ columns, data, isLoadingSk, sums, myId, setUserData, userData }: TableProps) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns: columns,
      data: data,
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

  function frmt(value: number) {
    return Number(value.toFixed(2))
  }

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
      border={'solid'}
      borderWidth={1}
      borderColor={'rgba(255, 255, 255, 0.16)'}
      borderTopWidth={0}
    >
      <Thead>
        {headerGroups.map(headerGroup => (
          // eslint-disable-next-line react/jsx-key
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
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
                  <Skeleton isLoaded={!isLoadingSk}>
                    {(() => {
                      if (cell.column.id === 'current') {
                        return <CurrentInput cell={cell} myId={myId} setUserData={setUserData} userData={userData} />
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
        <Tr>
          {rows[0].cells.map((item: any, index: number) => {
            switch (index + 1) {
              case 6:
                return (
                  <Th key={index} {...footerStyle}>
                    <Skeleton isLoaded={!isLoadingSk}>
                      <Text {...footerTextStyle}>{frmt(sums.alocationSum)}</Text>
                    </Skeleton>
                  </Th>
                )
              case 7:
                return (
                  <Th key={index} {...footerStyle}>
                    <Skeleton isLoaded={!isLoadingSk}>
                      <Text {...footerTextStyle}>{frmt(sums.objectiveRSum)}</Text>
                    </Skeleton>
                  </Th>
                )
              case 9:
                return (
                  <Th key={index} {...footerStyle}>
                    <Skeleton isLoaded={!isLoadingSk}>
                      <Text {...footerTextStyle}>{frmt(sums.currentRSum)}</Text>
                    </Skeleton>
                  </Th>
                )
              case 10:
                return (
                  <Th key={index} {...footerStyle}>
                    <Skeleton isLoaded={!isLoadingSk}>
                      <Text {...footerTextStyle}>{frmt(sums.currentPSum)}</Text>
                    </Skeleton>
                  </Th>
                )
              case 11:
                return (
                  <Th key={index} {...footerStyle}>
                    <Skeleton isLoaded={!isLoadingSk}>
                      <Text {...footerTextStyle}>{frmt(sums.investRSum)}</Text>
                    </Skeleton>
                  </Th>
                )
              case 13:
                return (
                  <Th key={index} {...footerStyle}>
                    <Skeleton isLoaded={!isLoadingSk}>
                      <Text {...footerTextStyle}>{frmt(sums.investCSum)}</Text>
                    </Skeleton>
                  </Th>
                )
              default:
                return <Th key={index} {...footerStyle} />
            }
          })}
        </Tr>
      </Tfoot>
    </Table>
  )
}
