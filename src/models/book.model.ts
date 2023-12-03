import { Sequelize, DataTypes } from 'sequelize';
import db from '.';

const Book = db.sequelize.define(
  'Book',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

export default Book;
