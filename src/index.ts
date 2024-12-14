import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { memberRoutes } from '@/lib/routes/member.routes';
import { contactRoutes } from '@/lib/routes/contact.routes';
import { prayerTimeRoutes } from '@/lib/routes/prayer-time.routes';
import { errorHandler } from '@/lib/middlewares/error.middleware';
import { ayahRoutes } from '@/lib/routes/ayah.routes';
import { clerkMiddleware } from '@clerk/express';
// import { env } from '@/lib/env';
import { logger } from '@/lib/middlewares/logger.middleware';
import { announcementRoutes } from '@/lib/routes/announcement.routes';
import { accountingRoutes } from '@/lib/routes/accounting.routes';

dotenv.config();

const app = express();

app.use(logger);
app.use(clerkMiddleware());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/contact', contactRoutes);
app.use('/prayer-times', prayerTimeRoutes);
app.use('/ayahs', ayahRoutes);
app.use('/members', memberRoutes);
app.use('/announcements', announcementRoutes);
app.use('/accounting', accountingRoutes);

app.use(errorHandler);

app.use('/test', (_req, res) => {
	res.status(200).json({ message: 'Success' });
});

// app.listen(env.PORT, () => {
// 	console.log(`Server is running on http://localhost:${env.PORT}`);
// });

export default app;
