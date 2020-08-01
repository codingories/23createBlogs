import { withIronSession } from 'next-iron-session'
import {NextApiHandler} from 'next'

console.log('process.env.SECRET',process.env.SECRET)

export function withSession(handler:NextApiHandler) {
  return withIronSession(handler, {
    // password: process.env.SECRET_COOKIE_PASSWORD,
    password: process.env.SECRET,
    cookieName: 'blog',
    cookieOptions: {secure: false}
  })
}
