import {GetServerSideProps, NextPage} from 'next';
import {getDatabaseConnection} from '../lib/getDatabaseConnection'
import {Post} from '../src/entity/Post'
import Link from 'next/link'

console.log('执行了 index.tsx')

type Props = {
  posts: Post[],
}
const index: NextPage<Props> = (props) => {
  const {posts} = props;
  return (
    <div>
      <h1>文章列表</h1>
      {posts.map(post =>
        <Link key={post.id} href={`/posts/${post.id}`}>
          <a>
            {post.title}
          </a>
        </Link>
        // <div key={post.id}>{post.title}</div>
      )}
    </div>
  );
};
export default index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const connection = await getDatabaseConnection()
  const posts = await connection.manager.find(Post)
  // console.log('connect1')
  return {
    props: {
      posts : JSON.parse(JSON.stringify(posts))
    }
  };
};
