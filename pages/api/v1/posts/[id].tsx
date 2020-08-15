import {NextApiHandler} from 'next';
import {getPosts} from 'lib/posts';
import {withSession} from '../../../../lib/withSession'
import {getDatabaseConnection} from '../../../../lib/getDatabaseConnection'



const Posts: NextApiHandler = withSession(async (req, res) => {
  if(req.method==='PATCH'){
    const connection = await getDatabaseConnection();
    const {title, content, id} = req.body;
    const post = await connection.manager.findOne<Post>('Post', id)
    post.title = title;
    post.content = content;
    const user = req.session.get('currentUser');
    if(!user){
      res.statusCode = 401 // 未登录
      res.end();
      return;
    }
    await connection.manager.save(post);
    res.json(post)
  }
})
export default Posts;
