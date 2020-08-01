import {NextPage} from 'next'
import { useState, useCallback } from 'react';
import axios, { AxiosResponse } from 'axios'
import {Form} from '../components/form'

const SignUp: NextPage = () => { // 利用NextPage初始化注册页面
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
    axios.post(`/api/v1/users`, formData)
      .then(()=>{
        alert('注册成功!')
        window.location.href = '/sign_in'
      },(error)=>{
        if(error.response){
          const response: AxiosResponse = error.response;
          if(response.status === 422){
            setErrors( response.data);
          }
        }
      })
  },[formData]) // []不加参数参数，表示只在页面第一次创建渲染创建onSubmit函数,其它时候ui怎么变,onSubmit不变
  // [formData] 表示formData变onSubmit也变,不加打印出来就是空，加了才有值

  const onChange = useCallback((key, value)=>{
    setFormData({
      ...formData,
      [key]: value // [key]如果不加[]，就是"key"
    })
  },[formData])


  return (
    <>
      <h1>注册</h1>
      <Form fields={[
        {label:'用户名',type:'text', value: formData.username,
          onChange: e=>onChange('username', e.target.value)
          , errors: errors.username },
        { label:'密码',type:'password', value: formData.password,
          onChange: e=>onChange('password', e.target.value)
          , errors: errors.password},
        { label:'确认密码',type:'password', value: formData.passwordConfirmation,
          onChange: e=>onChange('passwordConfirmation', e.target.value)
          , errors: errors.passwordConfirmation},
      ]
      } onSubmit={onSubmit} buttons={<>
        <button type="submit">登录</button>
      </>} />
    </>
  );
}

export default SignUp;
