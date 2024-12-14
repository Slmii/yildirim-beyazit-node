/*
  Warnings:

  - You are about to drop the column `index` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `Announcement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Announcement" DROP COLUMN "index",
DROP COLUMN "order";
