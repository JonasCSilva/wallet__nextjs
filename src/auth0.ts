import { ManagementClient } from 'auth0'

export const auth0Management = new ManagementClient({
  clientId: process.env.AUTH0_CLIENT_ID2,
  clientSecret: process.env.AUTH0_CLIENT_SECRET2,
  domain: 'dev-zodr-hta.us.auth0.com',
  scope: 'read:users update:users'
})
