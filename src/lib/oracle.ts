import { DataSource } from 'typeorm';
import { User } from '../entities/PUser';  // Import User entity
import { Games } from '../entities/Games'

// Set up the TypeORM DataSource
export const AppDataSource = new DataSource({
  type: 'oracle',  // For Oracle DB
  host: process.env.DB_HOST,  // Replace with your Oracle DB host
  port: parseInt(process.env.DB_PORT || '1521'),  // Replace with your DB port
  username: process.env.DB_USER,  // Oracle DB username
  password: process.env.DB_PASSWORD,  // Oracle DB password
  sid: process.env.DB_SID,  // SID of your Oracle DB (if applicable)
  entities: [User, Games],  // Add your User entity here
  synchronize: false,  // Don't auto sync in production, use migrations instead
  logging: true,  // Enable logging to debug queries (optional)
});
