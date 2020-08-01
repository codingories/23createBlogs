import { withIronSession } from 'next-iron-session'
import {NextApiHandler} from 'next'

export function withSession(handler:NextApiHandler) {
  return withIronSession(handler, {
    // password: process.env.SECRET_COOKIE_PASSWORD,
    password: '8963956d-3de2-45e8-a608-ff08313827a3',
    cookieName: 'blog',
    cookieOptions: {secure: false}
  })
}
