import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { contactRoutes, memberRoutes } from './lib/routes';
import { errorHandler } from './lib/middlewares';

dotenv.config();
const app = express();
// const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/member', memberRoutes);
app.use('/contact', contactRoutes);
app.use(errorHandler);

app.use('/test', (_req, res) => {
	res.status(200).json({ message: 'Success' });
});

// Server setup
// app.listen(PORT, () => {
// 	console.log(`Example app is listening on port ${PORT}.`);
// });

export default app;
