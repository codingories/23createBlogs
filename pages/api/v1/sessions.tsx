import {NextApiHandler} from 'next'

const Sessions: NextApiHandler = async (req, res)=> {

  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.statusCode = 200
  res.write('')
  res.end();
}

export default Sessions;
