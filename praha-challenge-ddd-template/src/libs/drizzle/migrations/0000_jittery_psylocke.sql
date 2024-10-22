CREATE TABLE IF NOT EXISTS "participant" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"mailaddress" varchar NOT NULL,
	"participant_status_id" integer,
	CONSTRAINT "participant_mailaddress_unique" UNIQUE("mailaddress")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "participant_status" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT "participant_status_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task" (
	"participant_id" varchar,
	"task_content_id" varchar,
	"task_status_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task_content" (
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"content" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task_status" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT "task_status_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "team" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "team_member" (
	"participant_id" varchar,
	"team_id" varchar
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "participant" ADD CONSTRAINT "participant_participant_status_id_participant_status_id_fk" FOREIGN KEY ("participant_status_id") REFERENCES "public"."participant_status"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task" ADD CONSTRAINT "task_participant_id_participant_id_fk" FOREIGN KEY ("participant_id") REFERENCES "public"."participant"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task" ADD CONSTRAINT "task_task_content_id_task_content_id_fk" FOREIGN KEY ("task_content_id") REFERENCES "public"."task_content"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task" ADD CONSTRAINT "task_task_status_id_task_status_id_fk" FOREIGN KEY ("task_status_id") REFERENCES "public"."task_status"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_member" ADD CONSTRAINT "team_member_participant_id_participant_id_fk" FOREIGN KEY ("participant_id") REFERENCES "public"."participant"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_member" ADD CONSTRAINT "team_member_team_id_team_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
