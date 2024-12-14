import { AnnouncementLanguage } from '@prisma/client';

export interface PostAnnouncement {
	content: string;
	language: AnnouncementLanguage;
}
