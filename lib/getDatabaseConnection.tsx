import {createConnection, getConnectionManager} from 'typeorm'

const promise = (async function() {
  const manager = getConnectionManager()
  if(!manager.has('default')){
    console.log('创建connection.')
    return createConnection();
  }else{
    console.log('复用connection.')
    const current = manager.get('default');
    if(current.isConnected){
      return current
    } else {
      return createConnection();
    }
  }
})();

export const getDatabaseConnection = async ()=>{
  return promise
}

