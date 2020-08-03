import {NextPage} from 'next'
import axios, {AxiosResponse} from 'axios'
import {useForm} from '../../hooks/useForm'

const PostsNew: NextPage = () => {

  const onSubmit = (formData: typeof initFormData)=>{
    axios.post(`/api/v1/posts`, formData)
      .then(()=>{
        alert('提交成功!')
      },(error)=>{
        if(error.response){
          const response: AxiosResponse = error.response;
          // if(response)
          if(response.status === 422){
            setErrors(response.data);
          }
        }
      })
  }// []不加参数参数，表示只在页面第一次创建渲染创建onSubmit函数,其它时候ui怎么变,onSubmit不变

  const initFormData =  {title: '', content: ''}

  const {form, setErrors} = useForm(
    {
      initFormData,
      fields: [
        {label:'标题',type:'text', key: 'title'},
        {label:'内容',type:'textarea', key:'content'},
      ],
      buttons: <button type="submit">提交</button>,
      onSubmit
    }
  );

  return(
    <div>
      {form}
    </div>
  );
}

export default PostsNew;
