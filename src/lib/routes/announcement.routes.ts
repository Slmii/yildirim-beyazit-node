import { withAuth } from 'src/lib/middlewares/auth.middleware';
import prisma from 'src/lib/prisma';
import { PostAnnouncement } from 'src/lib/types/Announcement.types';
import { Language } from 'src/lib/types/Ayah.types';
import express, { Request, Response } from 'express';

const announcementRoutes = express.Router();

announcementRoutes.get('/', async (_req: Request, res: Response) => {
	const [trAnnouncements, nlAnnouncements, arAnnouncements] = await prisma.$transaction([
		prisma.announcement.findMany({ where: { language: 'TR' }, orderBy: { createdAt: 'asc' } }),
		prisma.announcement.findMany({ where: { language: 'NL' }, orderBy: { createdAt: 'asc' } }),
		prisma.announcement.findMany({ where: { language: 'AR' }, orderBy: { createdAt: 'asc' } })
	]);

	res.status(200).json({
		[Language.TR]: trAnnouncements,
		[Language.NL]: nlAnnouncements,
		[Language.AR]: arAnnouncements
	});
});

announcementRoutes.post('/', withAuth, async (req: Request<any, any, PostAnnouncement[]>, res: Response) => {
	const createManyData: PostAnnouncement[] = [];

	for (const { content, language } of req.body) {
		createManyData.push({ content, language });
	}

	// Delete all announcements before adding new ones
	await prisma.announcement.deleteMany();

	const addedAnnouncements = await prisma.announcement.createMany({
		data: createManyData
	});

	res.status(200).json(addedAnnouncements);
});

announcementRoutes.delete('/', withAuth, async (_req: Request, res: Response) => {
	const deletedAnnouncements = await prisma.announcement.deleteMany();

	res.status(200).json(deletedAnnouncements);
});

export { announcementRoutes };
