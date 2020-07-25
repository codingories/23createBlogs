import {GetServerSideProps, NextPage} from 'next';
import {UAParser} from 'ua-parser-js';
import {useEffect, useState} from 'react';
import {getDatabaseConnection} from '../lib/getDatabaseConnection'
import {Post} from '../src/entity/Post'

console.log('执行了 index.tsx')

type Props = {
  posts: Post[],
}
const index: NextPage<Props> = (props) => {
  const {posts} = props;
  return (
    <div>
      hihihi123
      {posts.map(post => <div key={post.id}>{post.title}</div>)}
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
