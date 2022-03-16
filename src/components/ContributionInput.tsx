import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Skeleton
} from '@chakra-ui/react'
import { useState, useContext, useEffect } from 'react'

import { UserFullContext } from '../contexts/UserFullContext'
import useUserFullData from '../hooks/useUserFullData'

export default function ContributionInput() {
  const { userFull, updateUserContribution } = useContext(UserFullContext)
  const [value, setValue] = useState<number | string>(100)
  const { isLoading } = useUserFullData()

  useEffect(() => {
    if (userFull.contribution !== value) setValue(userFull.contribution)
  }, [userFull.contribution])

  return (
    <Skeleton isLoaded={!isLoading}>
      <NumberInput
        min={0}
        max={9999}
        w={28}
        value={value}
        onChange={newValue => {
          setValue(newValue)
        }}
        onBlur={e => {
          const newValue = e.target.value
          if (newValue === '') {
            setValue(newValue)
          } else if (newValue.search(/\D/) && Number(newValue) <= 9999) {
            const contribution = Number(newValue)
            if (contribution <= 0) {
              setValue('')
            } else {
              setValue(contribution)
            }
          }
          const contribution = Number(newValue)
          updateUserContribution(contribution)
        }}
      >
        <NumberInputField placeholder='Aporte' borderLeftRadius={0} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Skeleton>
  )
}
