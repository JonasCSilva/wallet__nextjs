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
import { BalanceSliderProps } from '../types/components'

export default function BalanceSlider({ setUserData, userData, id, isLoadingSk }: BalanceSliderProps) {
  const [value, setValue] = useState(50)
  const handleChange = (value: number) => setValue(value)

  useEffect(() => {
    setValue(userData.balance)
  }, [userData.balance])

  return (
    <Flex justify='center' align='center'>
      <Skeleton isLoaded={!isLoadingSk}>
        <NumberInput
          w={20}
          inputMode={'numeric'}
          value={value}
          onBlur={e => {
            const val = Number(e.target.value)
            axios.patch(`api/userdata/${id}`, val).then(res => res.data)
            setUserData(prevState => ({
              ...prevState,
              balance: val
            }))
            handleChange(val)
          }}
          onChange={e => handleChange(Number(e))}
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
      <Skeleton isLoaded={!isLoadingSk}>
        <Flex justify='center' align='center'>
          <Slider
            aria-label='slider-ex-1'
            w={48}
            min={0}
            max={100}
            step={5}
            h='100%'
            onChangeEnd={balance => {
              axios.patch(`api/userdata/${id}`, { data: { balance } }).then(res => res.data)
              setUserData(prevState => ({
                ...prevState,
                balance
              }))
              handleChange(balance)
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
