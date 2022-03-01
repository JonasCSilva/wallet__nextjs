import { Input } from '@chakra-ui/react'
import axios from 'axios'
import useUserMetadataContext from '../hooks/useUserMetadataContext'

export default function ContributionInput() {
  const [userMetadata, setUserMetadata] = useUserMetadataContext()

  return (
    <Input
      borderLeftRadius={0}
      h='full'
      p={2}
      w={32}
      fontSize={14}
      maxLength={9}
      placeholder='Aporte'
      type='number'
      value={userMetadata.contribution === 0 ? '' : userMetadata.contribution}
      onChange={e =>
        setUserMetadata(prevState => ({
          ...prevState,
          contribution: Number(e.target.value)
        }))
      }
      onBlur={e => {
        const contribution = Number(e.target.value)
        axios.patch(`api/user`, { data: { contribution } }).then(res => res.data)
        if (contribution == 0) {
          e.target.value = ''
        } else {
          e.target.value = String(contribution)
        }
      }}
    />
  )
}
