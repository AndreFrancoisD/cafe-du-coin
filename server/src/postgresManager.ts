import { Pool, QueryResult } from 'pg';
import config from '../config/config.json';

class PoolManager {

  public pool: Pool;

  constructor() {
    this.pool = new Pool(config.postgres)
  }

  query = (text: string, params?: Array<string | number>): Promise<QueryResult<any>> => {

    return new Promise<QueryResult<any>>((resolve, reject) => {
      this.pool.query(text, params)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    })
  }
}

export const poolManager = new PoolManager();

