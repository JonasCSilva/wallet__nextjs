import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper
} from '@chakra-ui/react'
import { CurrentInputProps } from '../types/components'
import { updateCurrent } from '../serverFunctions'

export default function CurrentInput({ cell, myId, userData, setUserData }: CurrentInputProps) {
  return (
    <NumberInput
      defaultValue={cell.value}
      placeholder={cell.value}
      w={16}
      size='sm'
      borderRadius={'12px'}
      onBlur={e => {
        updateCurrent(Number(e.target.value), myId, cell.row.values.name)
        const currents = [...userData.currents]
        currents.map(item => {
          if (item.name == cell.row.values.name) {
            item.current = Number(e.target.value)
          }
        })
        setUserData(prevState => ({
          ...prevState,
          current: currents
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
