import {createConnection} from 'typeorm'

const promise = (async function() {
  console.log('')
  return await createConnection()
})();

export const getDatabaseConnection = async ()=>{
  return promise
}

