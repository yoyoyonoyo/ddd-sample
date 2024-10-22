import { boolean, pgTable, varchar } from "drizzle-orm/pg-core";

export const team = pgTable("team", {
  id: varchar("id").notNull(),
  name: varchar("title").notNull(),
});

export const participant = pgTable("participant", {
  id: varchar("id").notNull(),
  name: varchar("name").notNull(),
  mailAddress: varchar("mailAddress").notNull(),
  status: boolean("done").notNull(),
});

export const tasks = pgTable("tasks", {
  id: varchar("id").notNull(),
  title: varchar("title").notNull(),
  done: boolean("done").notNull(),
});
