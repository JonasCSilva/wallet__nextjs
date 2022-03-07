import { useContext } from 'react'

import { UserBalanceContext } from '../contexts/UserBalanceContext'

export default function useUserBalanceContext() {
  return useContext(UserBalanceContext)
}
