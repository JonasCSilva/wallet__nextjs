import { NextApiRequest, NextApiResponse } from 'next'
import { auth0Management } from '../../../auth0'

const defaultMetadata = { balance: 50, contribution: 100, currents: [] }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { userId },
    method
  } = req

  const userId2 = Array.isArray(userId) ? userId[0] : userId

  switch (method) {
    case 'GET':
      try {
        const user = await auth0Management.getUser({ id: userId2 })

        const metadata = user.user_metadata

        if (metadata) {
          metadata.balance ??= 50
          metadata.contribution ??= 100
          metadata.currents ??= []
          user.user_metadata = metadata
          res.status(200).json(user)
        } else {
          user.user_metadata = defaultMetadata
          res.status(200).json(user)
        }
      } catch (error) {
        res.status(500).json(error)
      }
      break
    case 'PATCH':
      const newMetadata = req.body.data

      try {
        await auth0Management.updateUserMetadata({ id: userId2 }, { ...newMetadata })

        res.status(200).json({
          newMetadata
        })
      } catch (error) {
        res.status(500).json(error)
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'PATCH'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

/*   
const cutUserId = userId.slice(6) + process.env.SALT
const hash = await createHash('md5').update(cutUserId).digest('hex')

const documentSnapshot = await getDoc(doc(db, 'usersdata', hash))
const currents = documentSnapshot.data() as DocumentData

await setDoc(doc(db, 'usersdata', hash), {
  currents
})
*/
