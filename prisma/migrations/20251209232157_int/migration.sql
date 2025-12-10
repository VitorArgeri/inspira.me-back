-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_postagens" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ownerPost" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "numberLikes" INTEGER NOT NULL DEFAULT 0,
    "numberShares" INTEGER NOT NULL DEFAULT 0,
    "backgroundColor" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "postagens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_postagens" ("backgroundColor", "createdAt", "description", "id", "numberLikes", "numberShares", "ownerPost", "updatedAt", "userId") SELECT "backgroundColor", "createdAt", "description", "id", "numberLikes", "numberShares", "ownerPost", "updatedAt", "userId" FROM "postagens";
DROP TABLE "postagens";
ALTER TABLE "new_postagens" RENAME TO "postagens";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
