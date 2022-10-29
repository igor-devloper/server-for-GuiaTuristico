/*
  Warnings:

  - Added the required column `description` to the `Attractions` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Attractions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "bannerUrl" TEXT NOT NULL
);
INSERT INTO "new_Attractions" ("bannerUrl", "id", "title") SELECT "bannerUrl", "id", "title" FROM "Attractions";
DROP TABLE "Attractions";
ALTER TABLE "new_Attractions" RENAME TO "Attractions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
