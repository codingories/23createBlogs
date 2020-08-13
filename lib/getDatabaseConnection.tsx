import {createConnection, getConnectionManager} from 'typeorm'
import 'reflect-metadata'
import {Post} from 'src/entity/Post';
import {User} from 'src/entity/User'
import {Comment} from 'src/entity/Comment'
import config from 'ormconfig.json'

const create = async ()=>{
  console.log('process.env.Node_ENV',process.env.Node_ENV)
  // @ts-ignore
  return createConnection({
    ...config,
    host: process.env.Node_ENV === 'production' ? 'localhost' : config.host,
    entities: [Post, User, Comment]
  });
}

const promise = (async function() {
  const manager = getConnectionManager()
  const current = manager.has('default') && manager.get('default');
  if(current ){await current.close()}
  return create()

})();

export const getDatabaseConnection = async ()=>{
  return promise
}

