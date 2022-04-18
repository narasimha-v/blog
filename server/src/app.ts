import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { errorHandler, notFound } from './middleware';
import { sequelize } from './models';
import { commentsRouter, postsRouter, usersRouter } from './routes';
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =>
	res.send({ msg: `Hello human. Request from IP address ${req.ip} logged.` })
);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
app.use('/auth', usersRouter);
app.use(errorHandler);
app.use(notFound);

const start = async () => {
	try {
		await sequelize.sync();
		console.log('Connection to database has been established successfully.');
		app.listen(PORT, () =>
			console.log(`Server running on http://localhost:${PORT}`)
		);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

start();
