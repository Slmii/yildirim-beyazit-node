-- CreateTable
CREATE TABLE "Ayah" (
    "id" SERIAL NOT NULL,
    "surah" INTEGER NOT NULL,
    "ayah" INTEGER NOT NULL,
    "language" VARCHAR(255) NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ayah_pkey" PRIMARY KEY ("id")
);
