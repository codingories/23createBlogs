import {NextPage} from 'next'
import { useState } from 'react';

const SignUp: NextPage = () => { // 利用NextPage初始化注册页面
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirmation: ''
  })

  return (
    <>
      <h1>注册</h1>
      {JSON.stringify(formData)}
      <form>
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
            <input type="text" value={formData.password}
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
            <input type="text" value={formData.passwordConfirmation}
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
