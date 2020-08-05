import {NextPage} from 'next'
import { useState, useCallback } from 'react';
import axios, { AxiosResponse } from 'axios'
import { useForm } from 'hooks/useForm';

const SignUp: NextPage = () => { // 利用NextPage初始化注册页面
  const {form} = useForm({
    initFormData:{
      username: '',
      password: '',
      passwordConfirmation: ''
    },
    fields:[
      {
        label:'用户名',type:'text', key: 'username',
       },
      {
        label: '密码', type: 'password', key: 'password',
      },
      {
        label:'确认密码',type:'password', key: 'passwordConfirmation'
      },
    ],
    buttons:<button type="submit">登录</button>,
    submit: {
      request: formData => axios.post(`/api/v1/users`, formData),
      message: `注册成功`
    }
  })

  return (
    <>
      <h1>注册</h1>
      {form}
    </>
  );
}

export default SignUp;
