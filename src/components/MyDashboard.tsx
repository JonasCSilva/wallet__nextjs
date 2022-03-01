import { Flex, Tab, Tabs, TabList, TabPanels, TabPanel, useColorMode } from '@chakra-ui/react'
import MyHeader from './MyHeader'
import { bg3, bgColor } from '../theme'
import MyTable from './Table'

export default function MyDashboard() {
  const { colorMode } = useColorMode()

  const tabStyle = {
    fontSize: 20,
    _selected: {
      color: bg3,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.16)',
      borderBottomColor: bgColor[colorMode]
    }
  }

  return (
    <Flex justify='center' align='center' direction='column'>
      <MyHeader />
      <Tabs isFitted variant='enclosed' width='90%' my={10} isLazy>
        <TabList>
          <Tab {...tabStyle}>Dividendos</Tab>
          <Tab {...tabStyle}>FIIs</Tab>
        </TabList>
        <TabPanels p={0}>
          <TabPanel p={0}>
            <MyTable index={0} />
          </TabPanel>
          <TabPanel p={0}>
            <MyTable index={1} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  )
}
