import { withIronSession } from 'next-iron-session'
import {NextApiHandler} from 'next'

export function withSession(handler:NextApiHandler) {
  return withIronSession(handler, {
    // password: process.env.SECRET_COOKIE_PASSWORD,
    password: '2608786672099914',
    cookieName: 'blog',
  })
}