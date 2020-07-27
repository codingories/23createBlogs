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
            <input type="text"/>
          </label>
        </div>
        <div>
          <label>
            重置密码
            <input type="text"/>
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
