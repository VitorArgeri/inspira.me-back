-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_postagens" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ownerPost" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "numberLikes" INTEGER NOT NULL,
    "numberShares" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "postagens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_postagens" ("createdAt", "description", "id", "numberLikes", "numberShares", "ownerPost", "updatedAt", "userId") SELECT "createdAt", "description", "id", "numberLikes", "numberShares", "ownerPost", "updatedAt", "userId" FROM "postagens";
DROP TABLE "postagens";
ALTER TABLE "new_postagens" RENAME TO "postagens";
CREATE TABLE "new_registrosCategorias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "postId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "background" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "registrosCategorias_postId_fkey" FOREIGN KEY ("postId") REFERENCES "postagens" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "registrosCategorias_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categorias" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_registrosCategorias" ("background", "categoryId", "createdAt", "id", "postId", "updatedAt") SELECT "background", "categoryId", "createdAt", "id", "postId", "updatedAt" FROM "registrosCategorias";
DROP TABLE "registrosCategorias";
ALTER TABLE "new_registrosCategorias" RENAME TO "registrosCategorias";
CREATE TABLE "new_registrosCurtidas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "postId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "registrosCurtidas_postId_fkey" FOREIGN KEY ("postId") REFERENCES "postagens" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "registrosCurtidas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_registrosCurtidas" ("createdAt", "id", "postId", "updatedAt", "userId") SELECT "createdAt", "id", "postId", "updatedAt", "userId" FROM "registrosCurtidas";
DROP TABLE "registrosCurtidas";
ALTER TABLE "new_registrosCurtidas" RENAME TO "registrosCurtidas";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
