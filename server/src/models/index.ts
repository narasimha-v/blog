import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { Comments } from './Comments';
import { Likes } from './Likes';
import { Posts } from './Posts';
import { Users } from './Users';
dotenv.config();

export const sequelize = new Sequelize({
	database: process.env.DB_NAME,
	dialect: 'mysql',
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	storage: ':memory:',
	models: [Posts, Comments, Users, Likes]
});

export * from './Comments';
export * from './Likes';
export * from './Posts';
export * from './Users';
