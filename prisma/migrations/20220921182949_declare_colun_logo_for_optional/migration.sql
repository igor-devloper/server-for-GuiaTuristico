-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ad" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "attractionsId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "logo" TEXT,
    "name" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "weekDays" TEXT NOT NULL,
    "hourStart" INTEGER NOT NULL,
    "hourEnd" INTEGER NOT NULL,
    "useVoiceChannel" BOOLEAN NOT NULL,
    "creatAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Ad_attractionsId_fkey" FOREIGN KEY ("attractionsId") REFERENCES "Attractions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ad" ("attractionsId", "creatAt", "hourEnd", "hourStart", "id", "instagram", "location", "logo", "name", "useVoiceChannel", "weekDays") SELECT "attractionsId", "creatAt", "hourEnd", "hourStart", "id", "instagram", "location", "logo", "name", "useVoiceChannel", "weekDays" FROM "Ad";
DROP TABLE "Ad";
ALTER TABLE "new_Ad" RENAME TO "Ad";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
