import {NextPage} from 'next'
import axios, {AxiosResponse} from 'axios'
import {useForm} from '../../hooks/useForm'

const PostsNew: NextPage = () => {
  const {form} = useForm(
    {
      initFormData: {title: '', content: ''},
      fields: [
        {label: '标题', type: 'text', key: 'title'},
        {label: '内容', type: 'textarea', key: 'content'},
      ],
      buttons: <button type="submit">提交</button>,
      submit: {
        request: formData => axios.post(`/api/v1/posts`, formData),
        success: () => {
          window.alert('提交成功')
          window.location.href = '/posts'
        }
      }
    }
  )
  return (
    <div className="postsNew">
      {form}
      <style jsx global>{`
          
            
          .postsNew .field-content textarea{
            height: 20em;
          }  
      `}</style>
    </div>
  )
}

export default PostsNew
