import { CurrentData, TickerData, UserFull } from './types/data'

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
  if (!currents || !(currents.length > 0)) return 0
  for (let index = 0; index < currents.length; index++) {
    if (currents[index].name === name) {
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

export function UpdateData(sheetData: TickerData[][], userFullData: UserFull['user_metadata']) {
  const tickersD = [...sheetData[0]]
  const tickersF = [...sheetData[1]]
  tickersD.forEach(t => {
    t.current = getCurrent(t.name, userFullData.currents)
    t.currentR = Number((t.price * t.current).toFixed(2))
  })
  tickersF.forEach(t => {
    t.current = getCurrent(t.name, userFullData.currents)
    t.currentR = Number((t.price * t.current).toFixed(2))
  })
  const totalD = total(tickersD)
  const totalF = total(tickersF)
  const totalCurrent = totalD + totalF
  const [mgcNmb11, mgcNmb12] = setMgcNmbs([...tickersD], totalCurrent, 1 - userFullData.balance / 100)
  const [mgcNmb21, mgcNmb22] = setMgcNmbs([...tickersF], totalCurrent, userFullData.balance / 100, mgcNmb11, mgcNmb12)
  tickersD.forEach(t => {
    t.currentP = ((t.price * t.current) / (totalCurrent + userFullData.contribution)) * 100
    t.objective = setObjectiveF(
      t,
      totalCurrent + userFullData.contribution,
      1 - userFullData.balance / 100,
      mgcNmb21,
      mgcNmb22
    )
    t.objectiveR = (t.objective * (totalCurrent + userFullData.contribution)) / 100
    t.investR = t.objectiveR - t.currentR
    t.invest = rounder(t.investR, t.price)
    t.investC = t.invest * t.price
  })
  tickersF.forEach(t => {
    t.currentP = ((t.price * t.current) / (totalCurrent + userFullData.contribution)) * 100
    t.objective = setObjectiveF(
      t,
      totalCurrent + userFullData.contribution,
      userFullData.balance / 100,
      mgcNmb21,
      mgcNmb22
    )
    t.objectiveR = (t.objective * (totalCurrent + userFullData.contribution)) / 100
    t.investR = t.objectiveR - t.currentR
    t.invest = rounder(t.investR, t.price)
    t.investC = t.invest * t.price
  })
  return [tickersD, tickersF]
}

function setMgcNmbs(t: TickerData[], totalCurrent: number, balance2: number, mgcNmb1 = 0, mgcNmb2 = 0) {
  t.forEach(t => {
    if (t.alocation === 0) {
    } else if (t.price < t.priceCap) {
      mgcNmb2 += t.alocation * balance2
    } else if (t.price >= t.priceCap) {
      if (totalCurrent > 1) {
        mgcNmb1 += ((t.price * t.current) / totalCurrent) * 100
      } else {
        mgcNmb1 += 0
      }
    } else {
      console.error('error')
    }
  })
  return [mgcNmb1, mgcNmb2]
}

function setObjectiveF(t: TickerData, total: number, balance2: number, mgcNmb1: number, mgcNmb2: number): number {
  if (t.price < t.priceCap) {
    return (t.alocation * balance2 * (100 - mgcNmb1)) / mgcNmb2
  } else {
    return ((t.price * t.current) / total) * 100
  }
}
