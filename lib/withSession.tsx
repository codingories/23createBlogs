import { withIronSession } from 'next-iron-session'
import {GetServerSideProps, NextApiHandler} from 'next'

console.log('process.env.SECRET',process.env.SECRET)

// | GetServerSideProps

export function withSession(handler:NextApiHandler | GetServerSideProps) {
  return withIronSession(handler, {
    // password: process.env.SECRET_COOKIE_PASSWORD,
    password: process.env.SECRET,
    cookieName: 'blog',
    cookieOptions: {secure: false}
  })
}
