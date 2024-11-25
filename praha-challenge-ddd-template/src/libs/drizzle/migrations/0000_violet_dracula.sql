CREATE TABLE IF NOT EXISTS "students" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"mail_address" varchar NOT NULL,
	"status" varchar NOT NULL,
	CONSTRAINT "students_mail_address_unique" UNIQUE("mail_address")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task_contents" (
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
CREATE TABLE IF NOT EXISTS "tasks" (
	"task_content_id" varchar,
	"task_status_id" integer,
	"student_id" varchar,
	CONSTRAINT "tasks_task_content_id_student_id_pk" PRIMARY KEY("task_content_id","student_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "team_member" (
	"students_id" varchar,
	"team_id" varchar,
	CONSTRAINT "team_member_students_id_team_id_pk" PRIMARY KEY("students_id","team_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "teams" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT "teams_name_unique" UNIQUE("name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_task_content_id_task_contents_id_fk" FOREIGN KEY ("task_content_id") REFERENCES "public"."task_contents"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_task_status_id_task_status_id_fk" FOREIGN KEY ("task_status_id") REFERENCES "public"."task_status"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_member" ADD CONSTRAINT "team_member_students_id_students_id_fk" FOREIGN KEY ("students_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_member" ADD CONSTRAINT "team_member_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
