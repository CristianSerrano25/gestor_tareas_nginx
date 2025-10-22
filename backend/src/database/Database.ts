import { Pool } from 'pg';
import { config } from '../config';

class Database {
  private static instance: Database;
  private pool: Pool;

  private constructor() {
    this.pool = new Pool(config.database);
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public getPool(): Pool {
    return this.pool;
  }

  public async ensureTablesExist(): Promise<void> {
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        titulo TEXT NOT NULL,
        descripcion TEXT,
        estado TEXT NOT NULL DEFAULT 'pendiente'
      )
    `);
  }

  public async close(): Promise<void> {
    await this.pool.end();
  }
}

export default Database;
