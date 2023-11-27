import { Pool } from 'pg';
import config from '../config/config.json';
import { logger } from './logManager';

class PoolManager {

  public pool: Pool;

  constructor() {
    this.pool = new Pool(config.postgres)
  }

  query = async (text: string, params?: Array<string | number>) => {
    console.log(text);
    try {
      const result = await this.pool.query(text, params);
      return result;
    }
    catch (error: unknown) {
      logger.error(error);
    }
  }

}

export const poolManager = new PoolManager();

