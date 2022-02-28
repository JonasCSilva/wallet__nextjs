import { useEffect, useState, useMemo, useRef } from 'react'
import dummyData from '../lib/dummyData'
import { Flex, Tab, Tabs, TabList, TabPanels, TabPanel, useColorMode } from '@chakra-ui/react'
import { UserData, TickerData, CurrentData, SumsData } from '../types/data'
import MyTable from './Table'
import headers from '../lib/headers'
import { getContributionAndBalance, getCurrents } from '../serverFunctions'
import MyHeader from './MyHeader'
import axios from 'axios'
import { UserProfile } from '@auth0/nextjs-auth0'
import { bg3, bgColor } from '../theme'
import { getCurrent, rounder, total } from '../dashboardFunctions'

export default function MyDashboard({ user }: { user: UserProfile }) {
  const { colorMode } = useColorMode()

  console.log(user)

  const [userData, setUserData] = useState<UserData>({
    contribution: 100,
    currents: [] as CurrentData[],
    balance: 50
  })
  const [isLoadingSk, setIsLoadingSk] = useState(true)
  const renderedRef = useRef(false)
  const sumsD = useRef<SumsData>({
    objectiveSum: 0,
    alocationSum: 0,
    objectiveRSum: 0,
    currentRSum: 0,
    currentPSum: 0,
    investRSum: 0,
    investCSum: 0
  })
  const sumsF = useRef<SumsData>({
    objectiveSum: 0,
    alocationSum: 0,
    objectiveRSum: 0,
    currentRSum: 0,
    currentPSum: 0,
    investRSum: 0,
    investCSum: 0
  })
  const mgcNmb1 = useRef(0)
  const mgcNmb2 = useRef(0)
  const mytickers = useRef<TickerData[][]>()
  const [tickers, setTickers] = useState<{ tickersD: TickerData[]; tickersF: TickerData[] }>({
    tickersD: dummyData as TickerData[],
    tickersF: dummyData as TickerData[]
  })

  const tabStyle = {
    fontSize: 20,
    _selected: {
      color: bg3,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.16)',
      borderBottomColor: bgColor[colorMode]
    }
  }

  useEffect(() => {
    const unsubscribe = async () => {
      const mytickersPromise = axios.get<TickerData[][]>('/api/sheet').then((res: { data: TickerData[][] }) => res.data)
      const ContributionAndBalancePromise = getContributionAndBalance(user.sub as string)
      const currentPromise = getCurrents(user.sub as string)
      const [mytickers2, ContributionAndBalance, currents] = await Promise.all([
        mytickersPromise,
        ContributionAndBalancePromise,
        currentPromise
      ])
      setUserData({
        contribution: ContributionAndBalance.contribution,
        balance: ContributionAndBalance.balance,
        currents
      })
      mytickers.current = mytickers2
      UpdateData(
        mytickers.current[0],
        mytickers.current[1],
        ContributionAndBalance.contribution,
        currents,
        ContributionAndBalance.balance
      )
      renderedRef.current = true
      setIsLoadingSk(false)
    }

    unsubscribe()

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    const unsubscribe = async () => {
      if (renderedRef.current === true && mytickers.current) {
        UpdateData(
          mytickers.current[0],
          mytickers.current[1],
          userData.contribution,
          userData.currents,
          userData.balance
        )
      }
    }
    unsubscribe()
    return () => {
      renderedRef.current = false
      unsubscribe()
    }
  }, [userData])

  function UpdateData(
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
  }

  function setMgcNmbs(t: TickerData[], firstTotal: number, balance2: number) {
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
  }

  function setObjectiveF(t: TickerData, total: number, balance2: number): number {
    if (t.price < t.priceCap) {
      return (t.alocation * balance2 * (100 - mgcNmb1.current)) / mgcNmb2.current
    } else {
      return ((t.price * t.current) / total) * 100
    }
  }

  const dataT = useMemo(() => tickers, [tickers])

  const columns = useMemo(() => headers, [])

  return (
    <Flex justify='center' align='center' direction='column'>
      <MyHeader
        isLoadingSk={isLoadingSk}
        userData={userData}
        setUserData={setUserData}
        myId={user.sub as string}
        tickers={tickers}
        userName={user.name as string}
      />
      <Tabs isFitted variant='enclosed' width='90%' my={10} isLazy>
        <TabList>
          <Tab {...tabStyle}>Dividendos</Tab>
          <Tab {...tabStyle}>FIIs</Tab>
        </TabList>
        <TabPanels p={0}>
          <TabPanel p={0}>
            <MyTable
              columns={columns}
              data={dataT.tickersD}
              isLoadingSk={isLoadingSk}
              sums={sumsD.current}
              myId={user.sub as string}
              setUserData={setUserData}
              userData={userData}
            />
          </TabPanel>
          <TabPanel p={0}>
            <MyTable
              columns={columns}
              data={dataT.tickersF}
              isLoadingSk={isLoadingSk}
              sums={sumsF.current}
              myId={user.sub as string}
              setUserData={setUserData}
              userData={userData}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  )
}
