ALTER TABLE "e_books" RENAME TO "ebooks";--> statement-breakpoint
ALTER TABLE "ebooks" DROP CONSTRAINT "e_books_slug_unique";--> statement-breakpoint
ALTER TABLE "meta_data" DROP CONSTRAINT "meta_data_eBookId_e_books_id_fk";
--> statement-breakpoint
ALTER TABLE "meta_data" ADD CONSTRAINT "meta_data_eBookId_ebooks_id_fk" FOREIGN KEY ("eBookId") REFERENCES "public"."ebooks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ebooks" ADD CONSTRAINT "ebooks_slug_unique" UNIQUE("slug");