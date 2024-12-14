import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { memberRoutes } from 'src/lib/routes/member.routes';
import { contactRoutes } from 'src/lib/routes/contact.routes';
import { prayerTimeRoutes } from 'src/lib/routes/prayer-time.routes';
import { errorHandler } from 'src/lib/middlewares/error.middleware';
import { ayahRoutes } from 'src/lib/routes/ayah.routes';
import { clerkMiddleware } from '@clerk/express';
// import { env } from 'src/lib/env';
import { logger } from 'src/lib/middlewares/logger.middleware';
import { announcementRoutes } from 'src/lib/routes/announcement.routes';
import { accountingRoutes } from 'src/lib/routes/accounting.routes';

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
