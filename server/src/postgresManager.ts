import { Pool, Client } from 'pg';

class PoolManager {

  public pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'postgres',
      password: 'postgres',
      port: 8080,
    })
  }

  query = async (text: string, params?:Array<string|number>) => {
    console.log(text);
    try {
      const result = await this.pool.query(text, params);
      return result;
    }
    catch (error) {
      console.log(error);
    }
  }

}

export const poolManager = new PoolManager();
