import { Sequelize, DataTypes } from 'sequelize';
import db from '.';

const User = db.sequelize.define(
  'User',
  {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM('male', 'famale', 'other'),
      defaultValue: 'other',
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

export default User;