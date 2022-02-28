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

/* function UpdateData(
    tickersD2: TickerData[],
    tickersF2: TickerData[],
    contribution2: number,
    myCurrent: CurrentData[],
    balance: number
  ) {
    const tickersD22 = [...tickersD2]
    const tickersF22 = [...tickersF2]
    for (const currentSum in sumsD.current) {
      sumsD.current[currentSum as 'objectiveSum'] = 0
    }
    for (const currentSum in sumsF.current) {
      sumsF.current[currentSum as 'objectiveSum'] = 0
    }
    mgcNmb1.current = 0
    mgcNmb2.current = 0
    tickersD22.forEach(t => {
      t.current = getCurrent(t.name, myCurrent)
      t.currentR = Number((t.price * t.current).toFixed(2))
      sumsD.current.alocationSum += t.alocation
      sumsD.current.currentRSum += t.currentR
    })
    tickersF22.forEach(t => {
      t.current = getCurrent(t.name, myCurrent)
      t.currentR = Number((t.price * t.current).toFixed(2))
      sumsF.current.alocationSum += t.alocation
      sumsF.current.currentRSum += t.currentR
    })
    const totalD = total(tickersD22)
    const totalF = total(tickersF22)
    const firstTotal = totalD + totalF
    setMgcNmbs([...tickersD22], firstTotal, 1 - balance / 100)
    setMgcNmbs([...tickersF22], firstTotal, balance / 100)
    tickersD22.forEach(t => {
      t.currentP = ((t.price * t.current) / (firstTotal + contribution2)) * 100
      sumsD.current.currentPSum += t.currentP
      t.objective = setObjectiveF(t, firstTotal + contribution2, 1 - balance / 100)
      sumsD.current.objectiveSum += t.objective
      t.objectiveR = (t.objective * (firstTotal + contribution2)) / 100
      sumsD.current.objectiveRSum += t.objectiveR
      t.investR = t.objectiveR - t.currentR
      sumsD.current.investRSum += t.investR
      t.invest = rounder(t.investR, t.price)
      t.investC = t.invest * t.price
      sumsD.current.investCSum += t.investC
    })
    tickersF22.forEach(t => {
      t.currentP = ((t.price * t.current) / (firstTotal + contribution2)) * 100
      sumsF.current.currentPSum += t.currentP
      t.objective = setObjectiveF(t, firstTotal + contribution2, balance / 100)
      sumsF.current.objectiveSum += t.objective
      t.objectiveR = (t.objective * (firstTotal + contribution2)) / 100
      sumsF.current.objectiveRSum += t.objectiveR
      t.investR = t.objectiveR - t.currentR
      sumsF.current.investRSum += t.investR
      t.invest = rounder(t.investR, t.price)
      t.investC = t.invest * t.price
      sumsF.current.investCSum += t.investC
    })
    setTickers({ tickersD: tickersD22, tickersF: tickersF22 })
  } */

/* function setMgcNmbs(t: TickerData[], firstTotal: number, balance2: number) {
    t.forEach(t => {
      if (t.alocation === 0) {
      } else if (t.price < t.priceCap) {
        mgcNmb2.current += t.alocation * balance2
      } else if (t.price >= t.priceCap) {
        if (firstTotal > 1) {
          mgcNmb1.current += ((t.price * t.current) / firstTotal) * 100
        } else {
          mgcNmb1.current += 0
        }
      } else {
        console.log('error')
      }
    })
  } */

/* function setObjectiveF(t: TickerData, total: number, balance2: number): number {
    if (t.price < t.priceCap) {
      return (t.alocation * balance2 * (100 - mgcNmb1.current)) / mgcNmb2.current
    } else {
      return ((t.price * t.current) / total) * 100
    }
  } */
