import { useContext } from 'react'
import { UserContributionContext } from '../contexts/UserContributionContext'

export default function useUserContributionContext() {
  return useContext(UserContributionContext)
}
