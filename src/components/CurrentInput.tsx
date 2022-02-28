import { useUser } from '@auth0/nextjs-auth0'
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper
} from '@chakra-ui/react'
import axios from 'axios'
import { useContext } from 'react'
import TickersContext from '../contexts/UserMetadataContext'
import { CurrentInputProps } from '../types/components'

export default function CurrentInput({ cell }: CurrentInputProps) {
  const { user } = useUser()
  const { userMetadata, setUserMetadata } = useContext(TickersContext)

  return (
    <NumberInput
      defaultValue={cell.value}
      placeholder={cell.value}
      w={16}
      size='sm'
      borderRadius={'12px'}
      onBlur={e => {
        const currents = [...userMetadata.currents]
        let foundFlag = false
        for (const item of currents) {
          if (item.name === cell.row.values.name) {
            item.current = Number(e.target.value)
            foundFlag = true
          }
        }
        if (!foundFlag) {
          currents.push({ name: cell.row.values.name, current: Number(e.target.value) })
        }
        axios.patch(`api/user/${user?.sub}`, { data: { currents } }).then(res => res.data)
        setUserMetadata(prevState => ({
          ...prevState,
          currents
        }))
        e.target.value = String(Number(e.target.value))
      }}
    >
      <NumberInputField fontSize={12} textAlign='center' pl={1} />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  )
}
