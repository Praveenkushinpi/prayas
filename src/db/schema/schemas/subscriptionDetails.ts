import { boolean, timestamp, integer ,jsonb, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import {users} from "./userDetails"

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
  planType: varchar('plan_type', { length: 50 }).default('free').notNull(),
  status: varchar('status', { length: 20 }).default('active').notNull(),
  tokensIncluded: integer('tokens_included').default(100).notNull(),
  expirationDate: timestamp('expiration_date').notNull(),
  autoRenew: boolean('auto_renew').default(true).notNull(),
  features: jsonb('features').default('{}').notNull(),
  paymentId: varchar('payment_id', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});