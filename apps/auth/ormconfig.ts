import { ConnectionOptions } from 'typeorm';
const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_SCHEMA || 'auth',
  synchronize: false,
  entities: ['apps/auth/src/**/*.entity.ts'],
  migrations: ['apps/auth/src/db/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'apps/auth/src/db/migrations',
  },
};

export = config;
