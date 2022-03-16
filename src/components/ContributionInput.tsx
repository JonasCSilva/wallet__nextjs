import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Skeleton
} from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState, useContext } from 'react'

import { UserFullContext } from '../contexts/UserFullContext'
import useUserData from '../hooks/useUserFullData'

export default function ContributionInput() {
  const [userFull, setUserFull] = useContext(UserFullContext)
  const [value, setValue] = useState<number | string>(100)
  const { isLoading } = useUserData()

  useEffect(() => {
    if (userFull.contribution !== value) setValue(userFull.contribution)
  }, [userFull.contribution])

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
            if (contribution <= 0) {
              setValue('')
            } else {
              setValue(contribution)
            }
          }
        }}
        onBlur={e => {
          const contribution = Number(e.target.value)
          axios.patch(`api/user`, { data: { contribution } })
          setUserFull(prevState => ({ ...prevState, contribution }))
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
