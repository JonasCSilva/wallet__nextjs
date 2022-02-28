import { useEffect, useState } from 'react'
import { Flex, Tab, Tabs, TabList, TabPanels, TabPanel, useColorMode } from '@chakra-ui/react'
import { TickerData, CurrentData, UserFull } from '../types/data'
import MyHeader from './MyHeader'
import { bg3, bgColor } from '../theme'
import useUserData from '../hooks/useUserData'

const defaultSumsData = {
  objectiveSum: 0,
  alocationSum: 0,
  objectiveRSum: 0,
  currentRSum: 0,
  currentPSum: 0,
  investRSum: 0,
  investCSum: 0
}

export default function MyDashboard() {
  const { userFull, isLoading } = useUserData()

  const { colorMode } = useColorMode()

  /* const sumsD = useRef<SumsData>(defaultSumsData)
  const sumsF = useRef<SumsData>(defaultSumsData)
  const mgcNmb1 = useRef(0)
  const mgcNmb2 = useRef(0)
  const mytickers = useRef<TickerData[][]>()
  const [tickers, setTickers] = useState<{ tickersD: TickerData[]; tickersF: TickerData[] }>({
    tickersD: dummyData as TickerData[],
    tickersF: dummyData as TickerData[]
  }) */

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
      // const mytickers2 = await axios.get<TickerData[][]>('/api/sheet').then(res => res.data)
      // const usermetadataPromise = axios.get<UserFull>(`/api/user/${user.sub}`).then(res => res.data)
      // const [mytickers2, userMetadata] = await Promise.all([mytickersPromise, usermetadataPromise])
      // setUserData(userMetadata)
      // mytickers.current = mytickers2
      /* UpdateData(
        mytickers.current[0],
        mytickers.current[1],
        userMetadata.contribution,
        userMetadata.currents,
        userMetadata.balance
      ) */
    }

    unsubscribe()

    return () => {
      unsubscribe()
    }
  }, [])

  // const dataT = useMemo(() => tickers, [tickers])

  // const columns = useMemo(() => headers, [])

  return (
    <Flex justify='center' align='center' direction='column'>
      <MyHeader
        tickers={
          /* tickers */ [] as unknown as {
            tickersD: TickerData[]
            tickersF: TickerData[]
          }
        }
      />
      <Tabs isFitted variant='enclosed' width='90%' my={10} isLazy>
        <TabList>
          <Tab {...tabStyle}>Dividendos</Tab>
          <Tab {...tabStyle}>FIIs</Tab>
        </TabList>
        <TabPanels p={0}>
          <TabPanel p={0}>
            {/* <MyTable
              columns={columns}
              data={dataT.tickersD}
              isLoadingSk={isLoadingSk}
              sums={sumsD.current}
              setUserData={setUserData}
              userData={userData}
            /> */}
          </TabPanel>
          <TabPanel p={0}>
            {/* <MyTable
              columns={columns}
              data={dataT.tickersF}
              isLoadingSk={isLoadingSk}
              sums={sumsF.current}
              setUserData={setUserData}
              userData={userData}
            /> */}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  )
}
