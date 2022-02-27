export type UserData = {
  contribution: number
  currents: CurrentData[]
  balance: number
}

export type TickerData = {
  name: string
  price: number
  objective: number
  current: number
  priceCap: number
  objectiveR: number
  currentR: number
  currentP: number
  investR: number
  invest: number
  alocation: number
  rank: number
  investC: number
}

export type CurrentData = {
  name: string
  current: number
}

export type SumsData = {
  objectiveSum: number
  alocationSum: number
  objectiveRSum: number
  currentRSum: number
  currentPSum: number
  investRSum: number
  investCSum: number
}
