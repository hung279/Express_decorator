import { Sequelize } from 'sequelize';
import dbconfig from '../common/configs/db';

const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD, {
  host: dbconfig.HOST,
  port: dbconfig.PORT,
  dialect: 'postgres',
});

// (async () => {
//   await sequelize.sync();
// })();

const db = {
  sequelize: sequelize,
  Sequelize: Sequelize,
};

export default db;
