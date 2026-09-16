-- Custom SQL migration file, put your code below! --
INSERT INTO "roles" ("name", "description")
VALUES ('author', 'Can author and manage blog content.')
ON CONFLICT ("name") DO NOTHING;
--> statement-breakpoint
INSERT INTO "user_roles" ("user_id", "role_id")
SELECT a."author_id", r."id"
FROM "authors" a
JOIN "roles" r ON r."name" = 'author'
ON CONFLICT DO NOTHING;
--> statement-breakpoint
ALTER TABLE "posts_authors" DROP CONSTRAINT "posts_authors_author_id_authors_id_fk";
--> statement-breakpoint
UPDATE "posts_authors" pa
SET "author_id" = a."author_id"
FROM "authors" a
WHERE pa."author_id" = a."id";
