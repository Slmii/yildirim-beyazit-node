-- CreateEnum
CREATE TYPE "AnnouncementLanguage" AS ENUM ('NL', 'TR', 'AR');

-- CreateTable
CREATE TABLE "Announcement" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "language" "AnnouncementLanguage" NOT NULL DEFAULT 'NL',
    "index" INTEGER NOT NULL DEFAULT 0,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);
