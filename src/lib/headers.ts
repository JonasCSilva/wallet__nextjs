const headers = [
  {
    Header: 'Rank',
    accessor: 'rank' as const
  },
  {
    Header: 'Nome',
    accessor: 'name' as const
  },
  {
    Header: 'Preço',
    accessor: 'price' as const
  },
  {
    Header: 'Preço Teto',
    accessor: 'priceCap' as const
  },
  {
    Header: 'Objetivo',
    accessor: 'alocation' as const
  },
  {
    Header: 'ObjetivoF',
    accessor: 'objective' as const
  },
  {
    Header: 'ObjetivoR',
    accessor: 'objectiveR' as const
  },
  {
    Header: 'Atual',
    accessor: 'current' as const
  },
  {
    Header: 'Atual R$',
    accessor: 'currentR' as const
  },
  {
    Header: 'Atual %',
    accessor: 'currentP' as const
  },
  {
    Header: 'Investir R$',
    accessor: 'investR' as const
  },
  {
    Header: 'Investir',
    accessor: 'invest' as const
  },
  {
    Header: 'InvestirC',
    accessor: 'investC' as const
  }
]

export default headers
