import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { memberRoutes } from '@/lib/routes/member.routes';
import { prayerTimeRoutes } from '@/lib/routes/prayer-time.routes';
import { contactRoutes } from '@/lib/routes/contact.routes';
import { errorHandler } from '@/lib/middlewares/error.middleware';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/member', memberRoutes);
app.use('/contact', contactRoutes);
app.use('/prayer-times', prayerTimeRoutes);
app.use(errorHandler);

app.use('/test', (_req, res) => {
	res.status(200).json({ message: 'Success' });
});

export default app;
