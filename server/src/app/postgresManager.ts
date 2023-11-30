import { Pool, QueryResult } from 'pg';
import config from '../../config/config.json';
import { logger } from './logManager';
import ProcessManager from './processManager';

/**
 * @description
 * Creates a pool to connect postgresql database and to manage clients.
 * Returns a singleton used in the application.
 */
export default class PoolManager {

  public pool: Pool;

  constructor() {

    try {
      //Ensure env variables are set.
      ProcessManager.setEnvironmentVariables();

      this.pool = new Pool({
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASENAME,
        password: process.env.PG_PASSWORD,
        port: parseInt(process.env.PG_HOST as string)
      })
    }
    catch (error) {
      logger.error(error);
      //Mieux vaut ne pas laisser l'appli dans un état instable
      process.exit(1);
    }

  }

  /**
   * Executes pg query and resturns the result or manages the errors
   * @param text SQL query
   * @param params 
   * @returns Promise<QueryResult<any>>
   */
  query = (text: string, params?: Array<string | number>): Promise<QueryResult<any>> => {

    return new Promise<QueryResult<any>>((resolve, reject) => {
      this.pool.query(text, params)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          logger.error(error);
          reject(error);
        });
    })
  }
}

export const poolManager = new PoolManager();

