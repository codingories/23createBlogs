import {GetServerSideProps, NextPage} from 'next'
import { useState, useCallback } from 'react';
import axios, { AxiosResponse } from 'axios'
import {withSession} from '../lib/withSession'
import {User} from '../src/entity/User'

const SignUp: NextPage<{user: User}> = (props) => { // 利用NextPage初始化登录页面
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirmation: ''
  })

  const [errors, setErrors] = useState({
    username:[], password:[], passwordConfirmation:[]
  })

  const onSubmit = useCallback((e)=>{
    e.preventDefault()
    axios.post(`/api/v1/sessions`, formData)
      .then(()=>{
        alert('登录成功!')
      },(error)=>{
        if(error.response){
          const response: AxiosResponse = error.response;
          // if(response)
          if(response.status === 422){
            setErrors(response.data);
          }
        }
      })
  },[formData]) // []不加参数参数，表示只在页面第一次创建渲染创建onSubmit函数,其它时候ui怎么变,onSubmit不变
  // [formData] 表示formData变onSubmit也变,不加打印出来就是空，加了才有值
  return (
    <>
      {
        props.user &&
        <div>
          当前登录用户为 {props.user.username}
        </div>
      }
      <h1>登录</h1>
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
            {errors.username?.length > 0 && <div>
              {errors.username.join(',')}
            </div>}
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
          {errors.password?.length > 0 && <div>
            {errors.password.join(',')}
          </div>}
        </div>
        <div>
          <button type="submit">登录</button>
        </div>
      </form>
    </>
  );
}

export default SignUp;

export const getServerSideProps: GetServerSideProps =
  // @ts-ignore
  withSession( async (context) => {
    // @ts-ignore
    const user = context.req.session.get('currentUser')
    return {
      props: {
        user: JSON.parse(JSON.stringify(user))
      }
    }
  });
