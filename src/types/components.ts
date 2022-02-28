import { Dispatch, SetStateAction } from 'react'
import { Cell, Column } from 'react-table'
import { TickerData, UserMetadata } from './data'

export type TableProps = {
  columns: Column<TickerData>[]
  data: TickerData[]
  isLoadingSk: boolean
  sums: {
    objectiveSum: number
    alocationSum: number
    objectiveRSum: number
    currentRSum: number
    currentPSum: number
    investRSum: number
    investCSum: number
  }
  myId: string
  setUserData: Dispatch<SetStateAction<UserMetadata>>
  userData: UserMetadata
}

export type MyAvatarProps = {
  userName: string | null
}

export type LoginHeaderProps = {
  title: string
  left: number
  link: string
  text: string
  linkText: string
}

export type MyProfileProps = {
  myName: string | null
  setMyName: Dispatch<SetStateAction<string | null>>
}

export type UpdateNameFormProps = {
  myName: string | null
  setMyName: Dispatch<SetStateAction<string | null>>
}

export type CurrentInputProps = {
  cell: Cell<TickerData>
  myId: string
  setUserData: Dispatch<SetStateAction<UserMetadata>>
  userData: UserMetadata
}
