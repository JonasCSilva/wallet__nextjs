export type UserFull = {
  name: string
  user_metadata: {
    balance: number
    contribution: number
    currents: CurrentData[]
  }
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
