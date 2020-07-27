import {NextApiHandler} from 'next'
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection'
import {User} from '../../../src/entity/User'

const Posts: NextApiHandler = async (req, res) => {
  const {username, password, passwordConfirmation} = req.body
  const connection = await getDatabaseConnection() // 连接数据库
  const user = new User()
  user.username = username

  if(password !== passwordConfirmation){
    const errors = {passwordConfirmation: ['密码不匹配']}
    res.statusCode = 422  // 无法创建的实体
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(errors));
    res.end();
  }
};
export default Posts;
