import * as auth0 from 'auth0-js'

export const auth0Management = new auth0.Management({
  domain: 'dev-zodr-hta.us.auth0.com',
  token: process.env.NEXT_PUBLIC_AUTH0_API_TOKEN
})
