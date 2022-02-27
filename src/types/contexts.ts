import { User } from '@firebase/auth'
import { Dispatch, SetStateAction } from 'react'

export type LoggedContextData = {
  isLogged: boolean
  setIsLogged: Dispatch<SetStateAction<boolean>>
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
}

export type ColorsContextData = {
  topBg: string
  bg3: string
  switchBg: string
  hoverGray: string
  buttonHoverColor: string
  bgColor: string
}
