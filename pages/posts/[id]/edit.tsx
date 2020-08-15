import {GetServerSideProps, NextPage} from 'next'

type Props = {
  id: number;
}

const PostsEdit: NextPage<Props> = (props) => {
  console.log(props.id)
  return (
    <div>hi</div>
  )
}

export default PostsEdit;

export const getServerSideProps: GetServerSideProps = async (context)=>{
  const {id} = context.params;
  return {
    props: {
      id: parseInt(id.toString())
    }
  }
}
