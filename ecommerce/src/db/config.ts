import { Sequelize } from 'sequelize';

const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_DIALECT = (process.env.DATABASE_DIALECT || 'postgres') as any;

if (!DATABASE_URL) {
  console.error('⚠️  WARNING: DATABASE_URL environment variable is not set!');
  console.error('⚠️  Database features will not work until you configure DATABASE_URL');
  console.error('⚠️  Please add a PostgreSQL database on Render and set the DATABASE_URL');
}

console.log('Database configuration:');
console.log('- DATABASE_URL:', DATABASE_URL ? 'Set ✓' : 'Not set ✗');
console.log('- Dialect:', DATABASE_DIALECT);

const sequelize = DATABASE_URL
  ? new Sequelize(DATABASE_URL, {
      dialect: DATABASE_DIALECT,
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
      dialectOptions: {
        ssl: process.env.NODE_ENV === 'production' ? {
          require: true,
          rejectUnauthorized: false
        } : false
      }
    })
  : new Sequelize('sqlite::memory:', { dialect: 'sqlite', logging: false });

export default sequelize;