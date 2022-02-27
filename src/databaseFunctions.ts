import { db } from './firebase'
import { doc, getDocs, collection, setDoc } from 'firebase/firestore'
import { CurrentData } from './types/data'
import { createHash } from 'crypto'
import { auth0Management } from './auth0'

export async function getContributionAndBalance(userId: string): Promise<{ balance: number; contribution: number }> {
  const returnFlag = { balance: 50, contribution: 100 }

  auth0Management.getUser(userId, (error, user) => {
    if (error) {
      console.log(error)
    } else {
      const metadata = user.user_metadata
      returnFlag.balance = metadata.balance ?? 50
      returnFlag.contribution = metadata.contribution ?? 100
    }
  })

  return returnFlag
}

export async function updateCurrent(value: number, userId: string, tickerName: string) {
  const cutUserId = userId.slice(6) + process.env.SALT
  const hash = await createHash('md5').update(cutUserId).digest('hex')

  await setDoc(doc(db, 'usersdata', hash, 'tickers', tickerName), {
    current: value
  })
}

export async function getCurrents(userId: string): Promise<CurrentData[]> {
  const cutUserId = userId.slice(6) + process.env.SALT
  const hash = await createHash('md5').update(cutUserId).digest('hex')

  const querySnapshot = await getDocs(collection(db, 'usersdata', hash, 'tickers'))
  const currentsArray: object[] = []
  querySnapshot.forEach(doc => {
    currentsArray.push({ name: doc.id, ...doc.data() })
  })
  return currentsArray as CurrentData[]
}

export async function updateContribution(value: number, userId: string) {
  auth0Management.patchUserMetadata(userId, { contribution: value }, error => {
    if (error) console.log(error)
  })
}

export async function updateBalance(value: number, userId: string) {
  auth0Management.patchUserMetadata(userId, { balance: value }, error => {
    if (error) console.log(error)
  })
}
