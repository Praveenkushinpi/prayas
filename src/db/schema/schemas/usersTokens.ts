import { pgTable, varchar, uuid, timestamp, decimal, text, integer } from "drizzle-orm/pg-core";
import { users} from "./userDetails"

export const tokenTransactions = pgTable('token_transactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  transactionType: varchar('transaction_type', { length: 20 }).notNull(), // 'purchase', 'subscription_renewal', 'bonus', 'refund'
  tokensAdded: integer('tokens_added').notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }), // Money spent (if applicable)
  currency: varchar('currency', { length: 3 }).default('USD'),
  paymentId: varchar('payment_id', { length: 255 }),
  description: text('description'),
  expiresAt: timestamp('expires_at'), // If tokens have expiration
  createdAt: timestamp('created_at').defaultNow().notNull(),
});