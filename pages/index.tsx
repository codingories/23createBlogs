import {NextPage} from 'next'
import Link from 'next/link'

const Home: NextPage = ()=>{
  return (
    <>
    <div className="cover">
      <img src={"/logo.png"} alt=""/>
      <h1>Ories的个人博客</h1>
      <p>好好学习，天天向上</p>
      <p><Link href={"/posts?page=1"}><a>文章列表</a></Link></p>
    </div>
      <style jsx>
        {`
         .cover {
          height: 100vh;
          display:flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
         }
         .cover > img{
            width: 120px; 
            height: 120px;
          }
          `}
      </style>

    </>
  )
}

export default Home;
