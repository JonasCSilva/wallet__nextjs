import { CurrentData, TickerData } from './types/data'

export function rounder(investR: number, price: number) {
  const test = investR / price
  if (Math.sign(test) === 1 && test % 1 > 0.66) {
    return Math.ceil(test)
  } else if (Math.sign(test) === 1 && test % 1 < 0.66) {
    return Math.floor(test)
  } else if (Math.sign(test) === -1 && test % 1 > -0.66) {
    return Math.ceil(test)
  } else if (Math.sign(test) === -1 && test % 1 < -0.66) {
    return Math.floor(test)
  } else {
    return test
  }
}

export function getCurrent(name: string, currents: CurrentData[]): number {
  for (let index = 0; index < currents.length; index++) {
    if (currents[index].name == name) {
      return currents[index].current
    }
  }
  return 0
}

export function total(tickers: TickerData[]) {
  let sum = 0
  tickers.map(t => (sum += t.current * t.price))
  return sum
}
