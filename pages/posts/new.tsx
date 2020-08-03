import {NextPage} from 'next'
import {Form} from '../../components/form'
import {useCallback, useState} from 'react'
import axios, {AxiosResponse} from 'axios'
import {useForm} from '../../hooks/useForm'

const PostsNew: NextPage = () => {



  // const onSubmit = (formData) => {
  //   axios.post().then(()=>{
  //     window.alert()
  //   },(e)=>{
  //     setErrors(e.response.data)
  //   })
  // };
  // initFormData,initErrors,fields,onSubmit
  const {form} = useForm(
    {title: '', content: ''}
  );

  return(
    <div>
      {form}
    </div>
  );





  // const [formData, setFormData] = useState({
  //   title: '',
  //   content:[]
  // })
  //
  // const [errors, setErrors] = useState({
  //   title:[], content:[]
  // })
  //
  // const onChange = useCallback((key, value)=>{
  //   setFormData({
  //     ...formData,
  //     [key]: value // [key]如果不加[]，就是"key"
  //   })
  // },[formData])
  //
  // const onSubmit = useCallback((e)=>{
  //   e.preventDefault()
  //   axios.post(`/api/v1/posts`, formData)
  //     .then(()=>{
  //       alert('提交成功!')
  //     },(error)=>{
  //       if(error.response){
  //         const response: AxiosResponse = error.response;
  //         // if(response)
  //         if(response.status === 422){
  //           setErrors(response.data);
  //         }
  //       }
  //     })
  // },[formData]) // []不加参数参数，表示只在页面第一次创建渲染创建onSubmit函数,其它时候ui怎么变,onSubmit不变
  //
  //
  // return (
  //   <div>
  //     <Form fields={[
  //       {label:'标题',type:'text', value: formData.title,
  //         onChange: e=>onChange('username', e.target.value)
  //         , errors: errors.title },
  //       {label:'内容',type:'textarea', value: formData.title,
  //         onChange: e=>onChange('username', e.target.value)
  //         , errors: errors.title },
  //     ]
  //     } onSubmit={onSubmit} buttons={<>
  //       <button type="submit">提交</button>
  //     </>} />
  //   </div>
  // )
}

export default PostsNew;
