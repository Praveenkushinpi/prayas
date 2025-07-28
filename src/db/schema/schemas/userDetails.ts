import { integer, timestamp, text } from "drizzle-orm/pg-core";
import { pgTable, uuid , varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  age: integer('age').notNull(),
  profileImage: varchar('profile_image', { length: 500 }),
  bio: text('bio'), // Make sure this line exists
  totalTokens: integer('total_tokens').default(0).notNull(),
  lifetimeTokensUsed: integer('lifetime_tokens_used').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
