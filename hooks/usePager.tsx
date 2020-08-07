import Link from 'next/link'

type Options = {
  count: number;
  page: number;
  totalPage: number;
}

export const usePager = (options: Options)=>{
  const {count, page, totalPage} = options
  const pager = (
    <div>
      共{count}篇文章,当前是第{page} / {totalPage}页
      {page !== 1 &&  <Link href={`?page=${page-1}`}><a>上一页</a></Link> }
      {page < totalPage && <Link href={`?page=${page+1}`}><a>下一页</a></Link>}
    </div>
  )
  return {pager};
}
