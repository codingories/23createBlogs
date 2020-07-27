import {NextApiHandler} from 'next'
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection'
import {User} from '../../../src/entity/User'
import md5 from 'md5'

const Posts: NextApiHandler = async (req, res) => {
  const {username, password, passwordConfirmation} = req.body

  const errors = {
    username: [] as string[], password: [] as string[], passwordConfirmation: [] as string[]
  }

  if(username.trim()===''){
    errors.username.push('不能为空')
  }
  if(!/[a-zA-Z0-9]/.test(username.trim())){
    errors.username.push('格式不合法')
  }
  if(username.trim()>42){
    errors.username.push('太长')
  }
  if(username.trim()<=3){
    errors.username.push('太短')
  }

  if(password ===''){
    errors.passwordConfirmation.push('不能为空')
  }

  if(password !== passwordConfirmation){
    errors.passwordConfirmation.push('两次密码不一致')
  }

  const hasErrors = Object.values(errors).find(v=>v.length>0)
  res.setHeader('Content-Type', 'application/json; charset=utf-8')

  if(hasErrors){
    res.statusCode = 422
    res.write(JSON.stringify(errors))
  }else{
    const connection = await getDatabaseConnection() // 连接数据库
    const user = new User()
    user.username = username.trim()
    user.passwordDigest = md5(password) // 和明文存差不多,碰撞，彩虹表，真正做产品不能md5
    await connection.manager.save(user) // 保存用户
    res.statusCode = 200
    res.write(JSON.stringify(user))
  }
  res.end()

};
export default Posts;
