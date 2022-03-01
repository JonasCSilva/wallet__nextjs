import { useContext } from 'react'
import { UserMetadataContext } from '../contexts/UserMetadataContext'

export default function useUserMetadataContext() {
  return useContext(UserMetadataContext)
}
