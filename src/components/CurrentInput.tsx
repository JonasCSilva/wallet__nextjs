import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper
} from '@chakra-ui/react'
import axios from 'axios'
import { Cell } from 'react-table'
import useUserCurrentsContext from '../hooks/useUserCurrentsContext'
import { TickerData } from '../types/data'

export type CurrentInputProps = {
  cell: Cell<TickerData>
}

export default function CurrentInput({ cell }: CurrentInputProps) {
  const [userCurrents, setUserCurrents] = useUserCurrentsContext()

  return (
    <NumberInput
      defaultValue={cell.value}
      placeholder={cell.value}
      w={16}
      size='sm'
      borderRadius={'12px'}
      onBlur={e => {
        const currents = userCurrents
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
        axios.patch(`api/user`, { data: { currents } }).then(res => res.data)
        setUserCurrents(currents)
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
