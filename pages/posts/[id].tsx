import React, {useCallback} from 'react'
import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next'
import {getDatabaseConnection} from '../../lib/getDatabaseConnection'
import {Post} from '../../src/entity/Post'
import marked from 'marked'
import Link from 'next/link'
import {withSession} from '../../lib/withSession'
import axios from 'axios'
import {useRouter} from 'next/router'
import {useForm} from '../../hooks/useForm'
import {Comment} from '../../src/entity/Comment'
type Props = {
  id: number;
  post: Post,
  currentUser: User | null,
  comments: Comment[]
}
const postsShow: NextPage<Props> = (props) => {
  const {post, currentUser, id, comments} = props
  // console.log('fuck', comments)
  const router = useRouter()
  const onRemove = useCallback(()=>{
     axios.delete(`/api/v1/posts/${id}`).then(()=>{
        window.alert('删除成功')
       router.push('/posts')
     },()=>{
       window.alert('删除失败')
     })
  },[id])
  const {form} = useForm(
    {
      initFormData: {content: ''},
      fields: [
        {label: '评论内容', type: 'textarea', key: 'content'},
      ],
      buttons: <div className={"actions"}><button type="submit">提交评论</button></div>,
      submit: {
        request: formData => axios.post(`/api/v1/comments`, {...formData, id}),
        success: () => {
          window.alert('提交成功')
          // window.location.href = '/posts'
          location.reload()
        }
      }
    }
  )
  return (
    <>
      <div className="wrapper">
        <h1>{post.title}</h1>
        {/*<h1>{JSON.stringify(comments)}</h1>*/}
        {/*<div>{JSON.stringify(comments)}</div>*/}

        { currentUser &&
        <p className="actions">
          <Link href="/posts/[id]/edit" as={`/posts/${post.id}/edit`}><a>编辑</a></Link>
          {/*<Link href="/posts/[id]/edit" as={`/posts/${post.id}/edit`}><a>编辑</a></Link>*/}
          <button onClick={onRemove} >删除</button>
        </p>
        }
        <article className="markdown-body" dangerouslySetInnerHTML={{__html: marked(post.content)}}>
        </article>
        <h4>评论</h4>
        {comments.map((comment,key) =>
          <div className="onePost" key={key}>
              <div>
                第{key+1}楼
              </div>
              <div>
                {comment.content}
              </div>
          </div>
        )}
        <div>
          {form}
        </div>
      </div>

      <style jsx>{` 
        .actions > *{
          margin: 4px;
        }
        .actions > *:first-child{
          margin-left: 0;
        }
        .wrapper {
          max-width: 800px;
          margin: 16px auto;
          padding: 0 16px;   
        }
        h1{padding-bottom:16px;border-bottom: 1px solid #666}
      `}
      </style>
    </>
  )
}

export default postsShow

export const getServerSideProps: GetServerSideProps<any, { id: string }> = withSession(async (context: GetServerSidePropsContext) => {
  const connection = await getDatabaseConnection()
  const id = context.params.id
  const post = await connection.manager.findOne('Post', id)
  // const [posts, count] = await connection.manager.findAndCount(Post,
  //   {skip:(page-1)*perPage, take:perPage});
  const comments = await connection.manager.query(`select * from comments where "postId" = ${id}`) //,{where: {id:1}}
  console.log('fuck',comments)
  const currentUser = (context.req as any).session.get('currentUser') || null;

  return {
    props: {
      id: parseInt(id.toString()),
      post: JSON.parse(JSON.stringify(post)),
      currentUser,
      comments:JSON.parse(JSON.stringify(comments)),
    }
  }
})
