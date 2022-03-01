import { useContext } from 'react'
import { SheetDataContext } from '../contexts/SheetDataContext'

export default function useSheetDataContext() {
  return useContext(SheetDataContext)
}
