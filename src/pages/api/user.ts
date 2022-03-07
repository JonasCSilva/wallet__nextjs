import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'

import { auth0Management } from '../../auth0'

const defaultMetadata = { balance: 50, contribution: 100, currents: [] }

export default withApiAuthRequired(async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  const session = getSession(req, res)

  const userId = session?.user.sub

  switch (method) {
    case 'GET':
      try {
        const user = await auth0Management.getUser({ id: userId })

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
      ;(async () => {
        const newMetadata = req.body.data

        try {
          await auth0Management.updateUserMetadata({ id: userId }, { ...newMetadata })

          res.status(200).json({
            newMetadata
          })
        } catch (error) {
          res.status(500).json(error)
        }
      })()
      break
    default:
      res.setHeader('Allow', ['GET', 'PATCH'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
})

/*   
const cutUserId = userId.slice(6) + process.env.SALT
const hash = await createHash('md5').update(cutUserId).digest('hex')

const documentSnapshot = await getDoc(doc(db, 'usersdata', hash))
const currents = documentSnapshot.data() as DocumentData

await setDoc(doc(db, 'usersdata', hash), {
  currents
})
*/
