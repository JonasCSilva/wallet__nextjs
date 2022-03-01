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
import useUserFullData from '../hooks/useUserFullData'
import useUserMetadataContext from '../hooks/useUserMetadataContext'

export default function BalanceSlider() {
  const [userMetadata, setUserMetadata] = useUserMetadataContext()
  const { isLoading } = useUserFullData()
  const [value, setValue] = useState(50)
  const handleChange = (value: number) => setValue(value)

  useEffect(() => {
    setValue(userMetadata.balance)
  }, [userMetadata.balance])

  return (
    <Flex justify='center' align='center'>
      <Skeleton isLoaded={!isLoading}>
        <NumberInput
          w={20}
          inputMode={'numeric'}
          value={value}
          onBlur={e => {
            const val = Number(e.target.value)
            axios.patch(`api/user`, val).then(res => res.data)
            setUserMetadata(prevState => ({
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
      <Skeleton isLoaded={!isLoading}>
        <Flex justify='center' align='center'>
          <Slider
            aria-label='slider-ex-1'
            w={48}
            min={0}
            max={100}
            step={5}
            h='100%'
            onChangeEnd={balance => {
              axios.patch(`api/user`, { data: { balance } }).then(res => res.data)
              setUserMetadata(prevState => ({
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
