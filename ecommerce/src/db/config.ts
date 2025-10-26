import { Sequelize } from 'sequelize';

const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_DIALECT = (process.env.DATABASE_DIALECT || 'postgres') as any;

if (!DATABASE_URL) {
  console.error('ERROR: DATABASE_URL environment variable is not set!');
  console.error('Please set DATABASE_URL in your Render environment variables');
  throw new Error('DATABASE_URL is required');
}

console.log('Connecting to database...');
console.log('Database dialect:', DATABASE_DIALECT);

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: DATABASE_DIALECT,
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: false
    } : false
  }
});

export default sequelize;