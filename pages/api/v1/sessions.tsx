import {NextApiHandler} from 'next'
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection'
import {User} from '../../../src/entity/User'
import md5 from 'md5'
import { SignIn } from 'src/model/Signin'

const Sessions: NextApiHandler = async (req, res)=> {
  const {username, password} = req.body

  // const connection = await getDatabaseConnection() // 连接数据库
  // const user = await connection.manager.findOne(User, {where: {username}})
  res.setHeader('Content-Type', 'application/json; charset=utf-8')

  const signIn = new SignIn();
  signIn.username = username;
  signIn.password = password;
  await signIn.validate();
  if (signIn.hasErrors()){
    res.statusCode = 422;
    res.end(JSON.stringify(signIn.errors));
  } else {
    res.statusCode = 200;
    res.end(JSON.stringify(signIn.user));
  }



  // res.setHeader('Content-Type', 'application/json; charset=utf-8')
  // res.statusCode = 200
  // res.write('')
  // res.end();
}

export default Sessions;
