import { db } from './firebase'
import { doc, getDoc, setDoc, getDocs, collection, updateDoc } from 'firebase/firestore'
import { CurrentData } from './types/data'

export async function getContributionAndBalance(userId: string): Promise<{ balance: number; contribution: number }> {
  const docSnap = await getDoc(doc(db, 'usersdata', userId))
  if (docSnap.exists()) {
    if (
      (docSnap.data().contribution || docSnap.data().contribution === 0) &&
      (docSnap.data().balance || docSnap.data().balance === 0)
    ) {
      return { balance: Number(docSnap.data().balance), contribution: Number(docSnap.data().contribution) }
    } else if (docSnap.data().contribution || docSnap.data().contribution === 0) {
      await setDoc(doc(db, 'usersdata', userId), { ...docSnap.data(), balance: 50 })
      return { balance: 50, contribution: docSnap.data().contribution }
    } else if (docSnap.data().balance || docSnap.data().balance === 0) {
      await setDoc(doc(db, 'usersdata', userId), { ...docSnap.data(), contribution: 100 })
      return { balance: docSnap.data().balance, contribution: 100 }
    } else {
      await setDoc(doc(db, 'usersdata', userId), { balance: 50, contribution: 100 })
      return { balance: 50, contribution: 100 }
    }
  } else {
    await setDoc(doc(db, 'usersdata', userId), { balance: 50, contribution: 100 })
    return { balance: 50, contribution: 100 }
  }
}

export async function getCurrents(userId: string): Promise<CurrentData[]> {
  const querySnapshot = await getDocs(collection(db, 'usersdata', userId, 'tickers'))
  const test: object[] = []
  querySnapshot.forEach(doc => {
    test.push({ name: doc.id, ...doc.data() })
  })
  return test as CurrentData[]
}

export async function updateContribution(value: number, userId: string) {
  await updateDoc(doc(db, 'usersdata', userId), {
    contribution: value
  })
}

export async function updateCurrent(value: number, userId: string, tickerName: string) {
  await setDoc(doc(db, 'usersdata', userId, 'tickers', tickerName), {
    current: value
  })
}
