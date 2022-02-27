import { TickerData } from '../types/data'

const dummyData: TickerData[] = []

for (let index = 0; index < 20; index++) {
  dummyData[index] = {
    name: 'DUMMY',
    rank: -4,
    alocation: -6,
    priceCap: -100,
    price: -2,
    current: -5,
    currentR: -20,
    currentP: -0.5,
    objective: -4.5,
    objectiveR: -350,
    investR: -50,
    invest: -3,
    investC: -60
  }
}

export default dummyData
