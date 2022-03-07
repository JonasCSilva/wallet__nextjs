import { useContext } from 'react'

import { UserCurrentsContext } from '../contexts/UserCurrentsContext'

export default function useUserCurrentsContext() {
  return useContext(UserCurrentsContext)
}
