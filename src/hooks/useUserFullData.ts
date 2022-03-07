import { useUser } from '@auth0/nextjs-auth0'
import axios from 'axios'
import { useMemo } from 'react'
import useSWRImmutable from 'swr'

import { UserFull } from '../types/data'

const fetcher = (url: string) => axios.get(url).then((res: { data: UserFull }) => res.data)

export default function useUserFullData() {
  const { user, error: error1 } = useUser()
  const { data, error: error2 } = useSWRImmutable(() => (user ? `/api/user` : null), fetcher)

  return useMemo(
    () => ({
      userFullData: data,
      isLoading: (!error1 || !error2) && !data,
      isError: error1 || error2
    }),
    [data, error1, error2]
  )
}
