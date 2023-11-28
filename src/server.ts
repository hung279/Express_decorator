import 'reflect-metadata';
import db from '../src/models/index';
import { App } from './app';

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

const app = new App(8000);

app.listen();