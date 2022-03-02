import { useMemo } from 'react'
import { Row } from 'react-table'

function frmt(value: number) {
  return Number(value.toFixed(2))
}

const Footer = (info: any) => {
  const total = useMemo(
    () => info.rows.reduce((sum: number, row: Row) => row.values[info.column.id] + sum, 0),
    [info.rows]
  )
  return frmt(total)
}

export const headersAndFooters = [
  {
    Header: 'Rank',
    accessor: 'rank' as const,
    Footer: undefined
  },
  {
    Header: 'Nome',
    accessor: 'name' as const,
    Footer: undefined
  },
  {
    Header: 'Preço',
    accessor: 'price' as const,
    Footer: undefined
  },
  {
    Header: 'Preço Teto',
    accessor: 'priceCap' as const,
    Footer: undefined
  },
  {
    Header: 'Objetivo',
    accessor: 'alocation' as const,
    Footer: undefined
  },
  {
    Header: 'ObjetivoF',
    accessor: 'objective' as const,
    Footer
  },
  {
    Header: 'ObjetivoR',
    accessor: 'objectiveR' as const,
    Footer
  },
  {
    Header: 'Atual',
    accessor: 'current' as const,
    Footer: undefined
  },
  {
    Header: 'Atual R$',
    accessor: 'currentR' as const,
    Footer
  },
  {
    Header: 'Atual %',
    accessor: 'currentP' as const,
    Footer
  },
  {
    Header: 'Investir R$',
    accessor: 'investR' as const,
    Footer
  },
  {
    Header: 'Investir',
    accessor: 'invest' as const
  },
  {
    Header: 'InvestirC',
    accessor: 'investC' as const,
    Footer
  }
]
