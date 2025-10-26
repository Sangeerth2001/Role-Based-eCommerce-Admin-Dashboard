import { Sequelize } from 'sequelize';

const DATABASE_URL = process.env.DATABASE_URL || '';
const DATABASE_DIALECT = (process.env.DATABASE_DIALECT || 'postgres') as any;

console.log('=================================================');
console.log('DATABASE CONFIGURATION:');
console.log('DATABASE_URL is set:', !!DATABASE_URL);
console.log('DATABASE_DIALECT:', DATABASE_DIALECT);
console.log('=================================================');

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: DATABASE_DIALECT,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

export default sequelize;