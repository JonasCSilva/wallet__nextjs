import {
  Flex,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  Heading,
  Skeleton
} from '@chakra-ui/react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import useUserBalanceContext from '../hooks/useUserBalanceContext'
import useUserFullData from '../hooks/useUserFullData'

export default function BalanceSlider() {
  const [userBalance, setUserBalance] = useUserBalanceContext()
  const { isLoading } = useUserFullData()
  const [value, setValue] = useState(50)

  const handleChange = (value: number) => setValue(value)

  useEffect(() => {
    if (userBalance !== value) setValue(userBalance)
  }, [userBalance])

  return (
    <Flex justify='center' align='center'>
      <Skeleton isLoaded={!isLoading}>
        <NumberInput
          w={20}
          inputMode={'numeric'}
          value={value}
          onChange={value => handleChange(Number(value))}
          onBlur={e => {
            const balance = Number(e.target.value)
            axios.patch(`api/user`, { data: { balance } })
            setUserBalance(balance)
          }}
        >
          <NumberInputField fontSize={14} textAlign='center' pl={1} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Skeleton>
      <Heading size='lg' fontWeight={'500'} mx={3}>
        Div
      </Heading>
      <Skeleton isLoaded={!isLoading}>
        <Flex justify='center' align='center'>
          <Slider
            aria-label='slider-ex-1'
            w={48}
            min={0}
            max={100}
            step={5}
            onChangeEnd={balance => {
              axios.patch(`api/user`, { data: { balance } })
              setUserBalance(balance)
            }}
            onChange={handleChange}
            focusThumbOnChange={false}
            value={value}
          >
            <SliderTrack borderRadius={'6px'}>
              <SliderFilledTrack bg='transparent' />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Flex>
      </Skeleton>
      <Heading size='xl' fontWeight={'500'} ml={3}>
        FIIs
      </Heading>
    </Flex>
  )
}
