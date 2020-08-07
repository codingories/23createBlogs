import Link from 'next/link'
import {number} from 'prop-types'
import _ from 'lodash'

type Options = {
  page: number;
  totalPage: number;
}

export const usePager = (options: Options)=>{
  const { page, totalPage} = options
  const numbers = [];
  numbers.push(1);
  for (let i = page - 3; i<= page + 3; i++){
    numbers.push(i);
  }
  numbers.push(totalPage);
  // x= [1,2,3,4,5,7]
  // y = [1,2,3,4,5,-1,7]
  const pageNumbers = _.uniq(numbers).sort().filter(n=> n>=1 && n < totalPage).reduce((result,n)=> n - (result[result.length-1]|| 0) === 1?
    result.concat(n): result.concat(-1,n),[]);

  const pager = (
    <div>
      {page !== 1 &&  <Link href={`?page=${page-1}`}><a>上一页</a></Link> }
      {pageNumbers.map(n => n === -1 ?
        <span>...</span>:
        <Link href={`?page=${n}`}>
          <a>{n}</a>
        </Link>
      )}
      {page < totalPage && <Link href={`?page=${page+1}`}><a>下一页</a></Link>}
      <span>
        第{page} / {totalPage}页
      </span>
    </div>
  )
  return {pager};
}
