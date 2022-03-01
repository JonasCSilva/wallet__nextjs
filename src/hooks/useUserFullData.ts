import useSWRImmutable from 'swr'
import axios from 'axios'
import { UserFull } from '../types/data'
import { useUser } from '@auth0/nextjs-auth0'
import { useMemo } from 'react'

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
