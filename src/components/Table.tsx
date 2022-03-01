import { Table, Thead, Tbody, Tr, Th, Td, Text, chakra, Skeleton, Tfoot } from '@chakra-ui/react'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy, Cell } from 'react-table'
import CurrentInput from './CurrentInput'
import { bg3 } from '../theme'
import { useEffect, useMemo, useRef, useState } from 'react'
import headers from '../lib/headers'
import { SumsData, TickerData } from '../types/data'
import useSheetDataContext from '../hooks/useSheetDataContext'

const defaultSumsData = {
  objectiveSum: 0,
  alocationSum: 0,
  objectiveRSum: 0,
  currentRSum: 0,
  currentPSum: 0,
  investRSum: 0,
  investCSum: 0
}

export default function MyTable({ index }: { index: number }) {
  const [sheetDataState] = useSheetDataContext()

  const [isLoading, setIsLoading] = useState(true)

  const sums = useRef<SumsData>(defaultSumsData)

  useEffect(() => {
    if (sheetDataState[0][0].name !== 'DUMMY') {
      const tickers = [...sheetDataState[index]]

      for (const currentSum in sums.current) {
        sums.current[currentSum as 'objectiveSum'] = 0
      }
      tickers.forEach(t => {
        sums.current.alocationSum += t.alocation
        sums.current.currentRSum += t.currentR
        sums.current.currentPSum += t.currentP
        sums.current.objectiveSum += t.objective
        sums.current.objectiveRSum += t.objectiveR
        sums.current.investRSum += t.investR
        sums.current.investCSum += t.investC
      })
      setIsLoading(false)
    }
  }, [sheetDataState])

  const columns = useMemo(() => headers, [])

  const data = useMemo(() => sheetDataState[index], [sheetDataState[index]])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns: columns,
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
        <Tr>
          {rows[0].cells.map((cell: any, index: number) => {
            switch (cell.column.id) {
              case 'objective':
                return (
                  <Th key={index} {...footerStyle}>
                    <Skeleton isLoaded={!isLoading}>
                      <Text {...footerTextStyle}>{frmt(sums.current.objectiveSum)}</Text>
                    </Skeleton>
                  </Th>
                )
              case 'objectiveR':
                return (
                  <Th key={index} {...footerStyle}>
                    <Skeleton isLoaded={!isLoading}>
                      <Text {...footerTextStyle}>{frmt(sums.current.objectiveRSum)}</Text>
                    </Skeleton>
                  </Th>
                )
              case 'currentR':
                return (
                  <Th key={index} {...footerStyle}>
                    <Skeleton isLoaded={!isLoading}>
                      <Text {...footerTextStyle}>{frmt(sums.current.currentRSum)}</Text>
                    </Skeleton>
                  </Th>
                )
              case 'currentP':
                return (
                  <Th key={index} {...footerStyle}>
                    <Skeleton isLoaded={!isLoading}>
                      <Text {...footerTextStyle}>{frmt(sums.current.currentPSum)}</Text>
                    </Skeleton>
                  </Th>
                )
              case 'investR':
                return (
                  <Th key={index} {...footerStyle}>
                    <Skeleton isLoaded={!isLoading}>
                      <Text {...footerTextStyle}>{frmt(sums.current.investRSum)}</Text>
                    </Skeleton>
                  </Th>
                )
              case 'investC':
                return (
                  <Th key={index} {...footerStyle}>
                    <Skeleton isLoaded={!isLoading}>
                      <Text {...footerTextStyle}>{frmt(sums.current.investCSum)}</Text>
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
