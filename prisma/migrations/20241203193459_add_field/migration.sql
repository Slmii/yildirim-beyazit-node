/*
  Warnings:

  - Added the required column `language` to the `Ayah` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ayah" ADD COLUMN     "language" VARCHAR(255) NOT NULL;
