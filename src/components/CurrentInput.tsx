import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper
} from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { Cell } from 'react-table'

import { UserFullContext } from '../contexts/UserFullContext'
import { getCurrent } from '../dashboardFunctions'
import { TickerData } from '../types/data'

export type CurrentInputProps = {
  cell: Cell<TickerData>
}

export default function CurrentInput({ cell }: CurrentInputProps) {
  const { userFull, updateUserCurrents } = useContext(UserFullContext)
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (cell.row.values.name !== 'DUMMY') {
      const current = getCurrent(cell.row.values.name, userFull.currents)
      if (current && current !== value) {
        setValue(current)
      }
    }
  }, [userFull.currents, cell.row.values.name])

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
        const currents = [...userFull.currents]
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
        updateUserCurrents(currents)
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
