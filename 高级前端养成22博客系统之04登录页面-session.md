---
title: 高级前端养成22博客系统之04登录页面 & session
date: 2020-07-28 22:17:27
tags: 高级前端
category: 数据库 博客系统
---

1. 安装 并使用 WebStorm 数据库插件 Database Navigator

- 1 连接数据库
  - ![1连接数据库.png](https://i.loli.net/2020/07/28/lxPmAJK2L8rjZQq.png)
- 2 配置数据库连接

  - ![2配置数据库连接.png](https://i.loli.net/2020/07/28/NnvAFLaIHsEUg3R.png)

- 3 选择对应表

  - ![3选择对应表.png](https://i.loli.net/2020/07/28/uqTDJywkLBfUOYQ.png)

- 4 修改对应表

  - ![4修改对应表.png](https://i.loli.net/2020/07/28/lI3fnwKU56gNRVW.png)

- 5 修改数据

  - ![5修改数据.png](https://i.loli.net/2020/07/28/MfUanOcmJLEPpbh.png)

- 6 删除数据

  - ![6删除数据.png](https://i.loli.net/2020/07/28/c7UyoIVZR4LqKT9.png)

- 7 使用 sql 命令
  - ![7使用sql命令.png](https://i.loli.net/2020/07/28/LftkU51A4gThWHi.png)
- 8 清空数据

2. 制作登录模块

- 登录的实质是创建 session
- 编写 live template 代码段
- 前端代码

```
import {NextApiHandler} from 'next'
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection'
import {User} from '../../../src/entity/User'
import md5 from 'md5'

const Sessions: NextApiHandler = async (req, res)=> {
  const {username, password} = req.body

  const connection = await getDatabaseConnection() // 连接数据库
  const user = await connection.manager.findOne(User, {where: {username}})
  res.setHeader('Content-Type', 'application/json; charset=utf-8')

  if (user){
    const passwordDigest = md5(password)
    if(user.passwordDigest === passwordDigest){
      res.statusCode = 200;
      res.end(JSON.stringify(user))
    }else{
      res.statusCode = 422 ;
      res.end(JSON.stringify({password: ['密码不匹配']}));
    }
    // console.log(user)
  } else {
    res.statusCode = 422 ;
    res.end(JSON.stringify( {username: ['用户名不存在']}));
  }


  // res.setHeader('Content-Type', 'application/json; charset=utf-8')
  // res.statusCode = 200
  // res.write('')
  // res.end();
}

export default Sessions;
```

- 处理 react 显示错误的 bug，实现每次只显示对应错误

```
axios.post(`/api/v1/sessions`, formData)
      .then(()=>{
        alert('登录成功!')
        window.location.href = '/sign_in'
      },(error)=>{
        if(error.response){
          const response: AxiosResponse = error.response;
          // if(response)
          if(response.status === 422){
            console.log('response.data')
            console.log(response.data)
            setErrors(response.data);
          }
        }
      })
  },[formData]) // []不加参数参数，表示只在页面第一次创建渲染创建onSubmit函数,其它时候ui怎么变,onSubmit不变
```

3. 通过新建 model/signIn.ts 封装后台登录逻辑

- SignIn.ts

```
import {getDatabaseConnection} from '../../lib/getDatabaseConnection'
import {User} from '../entity/User'
import md5 from 'md5'

export class SignIn {
  username : string;
  password: string;
  user: User;

  errors = {
    username: [] as string[], password: [] as string[],
    passwordConfirmation: [] as string[]
  }
  async validate(){
    if(this.username.trim() === ''){
      this.errors.username.push('请填写用户名')
    }
    const connection = await getDatabaseConnection()
    const user = await connection.manager.findOne(User, {where: {username:this.username}})
    this.user = user;
    if(user){
      if(user.passwordDigest !== md5(this.password)){
        this.errors.password.push('密码与用户名不匹配')
      }
    } else {
      this.errors.username.push('用户名不存在')
    }
  }
  hasErrors(){
    return !!Object.values(this.errors).find(v => v.length > 0)
  }
}
```

- session.tsx

```
import {NextApiHandler} from 'next'
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection'
import {User} from '../../../src/entity/User'
import md5 from 'md5'
import { SignIn } from 'src/model/Signin'

const Sessions: NextApiHandler = async (req, res)=> {
  const {username, password} = req.body
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
```

4. 登录功能如何实现阶段总结

   1. 创建登录页面
   2. 创建 posts sessions API
   3. 使用 SignIn Model 来校验数据
   4. 使用 session 记录登录状态

5. 开始加 session

   1. 封装 lib/withSession.tsx

   ```
      import { withIronSession } from 'next-iron-session'
      import {NextApiHandler} from 'next'

      export function withSession(handler:NextApiHandler) {
        return withIronSession(handler, {
          // password: process.env.SECRET_COOKIE_PASSWORD,
          password: '2608786672099914',
          cookieName: 'blog',
        })
      }
   ```

   2. 利用 withSession。成功为 sessions.tsx 加上 session

   ```
     import {NextApiHandler} from 'next'
     import {getDatabaseConnection} from '../../../lib/getDatabaseConnection'
     import {User} from '../../../src/entity/User'
     import md5 from 'md5'
     import { SignIn } from 'src/model/SignIn'
     import { withSession } from 'lib/withSession'

     const Sessions: NextApiHandler = async (req, res)=> {
       const {username, password} = req.body
       // @ts-ignore
       console.log('req.session',req.session)
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
     }

     export default withSession(Sessions);
   ```

6. 为 req 增加 session 类型

```
import * as next from 'next'
// 这种写法会导致Post从全局类型变成非全局类型，我们之后再解决这个额外问题


declare module 'next'{
  import {Session} from 'next-iron-session'

  interface NextApiRequest {
    session : Session;
  }
}
```

7. 什么是 session

   - 这样设置后，浏览器的 header 里就有 set-cookie,对应服务器上的一小块内存或者文件，保存登录了的 user
   - 后台就可以知道用户的登录信息了

8. session的整个过程
  - 第一次登录成功，下发随机数，服务器记下来发的对应号码的user是什么
  - 下次再刷新页面session会自动带上cookie，在请求头里面
  - 服务器通过这个cookie找到user

9. 图解session
   - ![图解session.png](https://i.loli.net/2020/08/01/God7px1uhyQntTc.png)

10. [相关代码](https://github.com/codingories/18nextjs-typeorm-1/)