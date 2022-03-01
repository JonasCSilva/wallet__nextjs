import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper
} from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Cell } from 'react-table'
import { getCurrent } from '../dashboardFunctions'
import useUserCurrentsContext from '../hooks/useUserCurrentsContext'
import { TickerData } from '../types/data'

export type CurrentInputProps = {
  cell: Cell<TickerData>
}

export default function CurrentInput({ cell }: CurrentInputProps) {
  const [userCurrents, setUserCurrents] = useUserCurrentsContext()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (cell.row.values.name !== 'DUMMY') {
      const current = getCurrent(cell.row.values.name, userCurrents)
      if (current && current !== value) {
        setValue(current)
      }
    }
  }, [userCurrents, cell.row.values.name])

  return (
    <NumberInput
      // defaultValue={cell.value}
      // placeholder={cell.value}
      w={16}
      size='sm'
      value={value}
      onChange={newValue => {
        if (newValue.search(/\D/) && Number(newValue) <= 9999) {
          setValue(Number(newValue))
        }
      }}
      onBlur={e => {
        const newValue = Number(e.target.value)
        const currents = [...userCurrents]
        let foundFlag = false
        for (const item of currents) {
          if (item.name === cell.row.values.name) {
            item.current = newValue
            foundFlag = true
          }
        }
        if (!foundFlag) {
          currents.push({ name: cell.row.values.name, current: newValue })
        }
        axios.patch(`api/user`, { data: { currents } })
        setUserCurrents(currents)
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
