/*
  Warnings:

  - You are about to alter the column `amount` on the `Member` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(10,2);
