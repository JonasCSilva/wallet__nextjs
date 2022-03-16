import { useUser } from '@auth0/nextjs-auth0'
import axios from 'axios'
import { useMemo } from 'react'
import { useQuery } from 'react-query'

import { UserFull } from '../types/data'

const fetcher = () => axios.get('/api/user').then((res: { data: UserFull }) => res.data)

export default function useUserFullData() {
  const { user, error } = useUser()

  const { isLoading, isError, data } = useQuery('user', fetcher, {
    enabled: !!user
  })

  return useMemo(
    () => ({
      userFullData: data,
      isLoading: !error && isLoading,
      isError: error || isError
    }),
    [data, error, isError, isLoading]
  )
}
