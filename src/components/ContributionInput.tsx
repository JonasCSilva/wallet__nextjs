import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Skeleton
} from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import useUserData from '../hooks/useUserFullData'
import useUserContributionContext from '../hooks/useUserContributionContext'

export default function ContributionInput() {
  const [userContribution, setUserContribution] = useUserContributionContext()
  const [value, setValue] = useState<number | string>(100)
  const { isLoading } = useUserData()

  useEffect(() => {
    if (userContribution !== value) setValue(userContribution)
  }, [userContribution])

  return (
    <Skeleton isLoaded={!isLoading}>
      <NumberInput
        min={0}
        max={9999}
        w={28}
        value={value === 0 ? '' : value}
        onChange={newValue => {
          if (newValue === '') {
            setValue(newValue)
          } else if (newValue.search(/\D/) && Number(newValue) <= 9999) {
            const contribution = Number(newValue)
            contribution <= 0 ? setValue('') : setValue(contribution)
          }
        }}
        onBlur={e => {
          const contribution = Number(e.target.value)
          axios.patch(`api/user`, { data: { contribution } })
          setUserContribution(contribution)
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
