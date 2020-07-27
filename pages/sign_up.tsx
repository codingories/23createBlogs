import {NextPage} from 'next'
import { useState, useCallback } from 'react';
import axios from 'axios'

const SignUp: NextPage = () => { // 利用NextPage初始化注册页面

  const {username, passowd, passwordConfirmation} = req.body

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirmation: ''
  })
  const onSubmit = useCallback((e)=>{
    e.preventDefault()
    axios.post(`/api/v1/users`, formData)
  },[formData]) // []不加参数参数，表示只在页面第一次创建渲染创建onSubmit函数,其它时候ui怎么变,onSubmit不变
  // [formData] 表示formData变onSubmit也变,不加打印出来就是空，加了才有值
  return (
    <>
      <h1>注册</h1>
      {JSON.stringify(formData)}
      <form onSubmit={onSubmit}>
        <div>
          <label>
            用户名
            <input type="text" value={formData.username}
                   onChange={e=> setFormData({
                     ...formData,
                     username: e.target.value
                   })}
            />
          </label>
        </div>
        <div>
          <label>
            密码
            <input type="password" value={formData.password}
                   onChange={e=> setFormData({
                     ...formData,
                     password: e.target.value
                   })}
            />
          </label>
        </div>
        <div>
          <label>
            重置密码
            <input type="password" value={formData.passwordConfirmation}
                   onChange={e=> setFormData({
                     ...formData,
                     passwordConfirmation: e.target.value
                   })}
            />
          </label>
        </div>
        <div>
          <button type="submit">注册</button>
        </div>
      </form>
    </>
  );
}

export default SignUp;
