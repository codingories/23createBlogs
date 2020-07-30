import {NextApiHandler} from 'next'
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection'
import {User} from '../../../src/entity/User'
import md5 from 'md5'

const Users: NextApiHandler = async (req, res) => {
  const {username, password, passwordConfirmation} = req.body
  const connection = await getDatabaseConnection() // 连接数据库
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  const user = new User()
  user.username = username.trim()
  // user.password = md5(password) // 和明文存差不多,碰撞，彩虹表，真正做产品不能md5
  user.password = password // 和明文存差不多,碰撞，彩虹表，真正做产品不能md5
  user.passwordConfirmation = passwordConfirmation // 和明文存差不多,碰撞，彩虹表，真正做产品不能md5
  await user.validate()
  if(await user.hasErrors()){
    res.statusCode = 422
    res.write(JSON.stringify(user.errors))
  }else{
    // user.passwordDigest = md5(password) // 和明文存差不多,碰撞，彩虹表，真正做产品不能md5
    await connection.manager.save(user) // 保存用户
    res.statusCode = 200
    res.write(JSON.stringify(user))
  }
  res.end()

};
export default Users;
