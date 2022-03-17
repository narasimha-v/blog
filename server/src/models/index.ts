import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { Posts } from './Posts';
dotenv.config();

export const sequelize = new Sequelize({
	database: process.env.DB_NAME,
	dialect: 'mysql',
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	storage: ':memory:',
	models: [Posts]
});

export * from './Posts';
