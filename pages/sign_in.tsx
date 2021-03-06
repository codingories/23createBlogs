import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next'
import axios, { AxiosResponse } from 'axios'
import {withSession} from '../lib/withSession'
import {User} from '../src/entity/User'
import {useForm} from '../hooks/useForm'
import qs from 'querystring'
import Link from 'next/link'

const SignIn: NextPage<{user: User}> = (props) => { // 利用NextPage初始化登录页面
  const {form} = useForm({
    initFormData: {
      username: '',
      password: '',
    },
    fields:[
      {label:'用户名',type:'text', key: 'username'},
      { label:'密码',type:'password', key: 'password'}],
    buttons:<button type="submit">登录</button>,
    submit: {
      request: formData => axios.post(`/api/v1/sessions`, formData),
      success: () => {
        window.alert('登录成功')
        const query = qs.parse(window.location.search.substr(1))
        window.location.href = query.returnTo?query.returnTo.toString():"/"
      }
    }
  })
  return (
    <>
      {
        props.user &&
        <div>
          当前登录用户为 {props.user.username}
        </div>
      }
      <h1>登录</h1>
      {form}
      <Link href={"/sign_up"}><a>没有账号，点我去注册</a></Link>
    </>
  );
}

export default SignIn;

export const getServerSideProps: GetServerSideProps =
  withSession( async (context:GetServerSidePropsContext) => {
    // @ts-ignore
    const user = context.req.session.get('currentUser')
    return {
      props: {
        user: JSON.parse(JSON.stringify(user||''))
      }
    }
  });
