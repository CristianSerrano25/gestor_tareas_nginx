import dotenv from 'dotenv';

dotenv.config();

export const config = {
  database: {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  server: {
    port: Number(process.env.BACKEND_PORT),
    nodeEnv: process.env.NODE_ENV
  },
};
