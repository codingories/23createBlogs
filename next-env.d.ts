/// <reference types="next" />
/// <reference types="next/types/global" />

import * as next from 'next'
// 这种写法会导致Post从全局类型变成非全局类型，我们之后再解决这个额外问题

declare module "*.png" {
  const value: string;
  export default value;
}



declare module 'next'{
  import {Session} from 'next-iron-session'

  interface NextApiRequest {
    session : Session;
  }
}
