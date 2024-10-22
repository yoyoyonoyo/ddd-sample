import { pgTable, varchar, integer, text } from "drizzle-orm/pg-core";

export const participant = pgTable("participant", {
  id: varchar("id").primaryKey(),
  name: varchar("name").notNull(),
  mailaddress: varchar("mailaddress").unique().notNull(),
  participant_status_id: integer("participant_status_id").references(
    () => participant_status.id
  ),
});

export const participant_status = pgTable("participant_status", {
  id: integer("id").primaryKey(),
  name: varchar("name").unique().notNull(),
});

export const team = pgTable("team", {
  id: varchar("id").primaryKey(),
  name: varchar("name").notNull(),
});

export const team_member = pgTable("team_member", {
  participant_id: varchar("participant_id").references(() => participant.id),
  team_id: varchar("team_id").references(() => team.id),
});

export const task = pgTable("task", {
  participant_id: varchar("participant_id").references(() => participant.id),
  task_content_id: varchar("task_content_id").references(() => task_content.id),
  task_status_id: integer("task_status_id").references(() => task_status.id),
});

export const task_content = pgTable("task_content", {
  id: varchar("id").primaryKey(),
  title: varchar("title").notNull(),
  content: text("content"),
});

export const task_status = pgTable("task_status", {
  id: integer("id").primaryKey(),
  name: varchar("name").unique().notNull(),
});
