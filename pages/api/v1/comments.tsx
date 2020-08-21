import {NextApiHandler} from 'next';
import {getPosts} from 'lib/posts';
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection'
// import {Post} from '../../../src/entity/Post'
import {Comment} from '../../../src/entity/Comment'

import {withSession} from '../../../lib/withSession'


const Posts: NextApiHandler = withSession(async (req, res) => {
  if(req.method==='POST'){
    const {id, content} = req.body;
    // const post = new Post();
    // post.content = content;
    console.log('进入comment')
    const connection = await getDatabaseConnection();
    const user = req.session.get('currentUser');
    if(!user){
      res.statusCode = 401 // 未登录
      res.end();
      return;
    }
    const comment = new Comment();
    console.log(comment)
    console.log(user.id,id,content)
    comment.user = user.id
    comment.post = id
    comment.content = content
    console.log('000')
    console.log(comment)
    await connection.manager.save(comment);
    // res.end('hey')
    res.end(JSON.stringify(comment))
  }
})
export default Posts;
