import useSWRImmutable from 'swr'
import axios from 'axios'
import { UserFull } from '../types/data'
import { useUser } from '@auth0/nextjs-auth0'

const fetcher = (url: string) => axios.get(url).then((res: { data: UserFull }) => res.data)

export default function useUserData() {
  const { user, error: error1 } = useUser()
  const { data, error: error2 } = useSWRImmutable(() => (user ? `/api/user/${user.sub}` : null), fetcher)

  return {
    userFull: data,
    isLoading: (!error1 || !error2) && !data,
    isError: error1 || error2
  }
}
