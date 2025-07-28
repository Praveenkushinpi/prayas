import { boolean, uuid, varchar, decimal, integer , jsonb, timestamp, pgTable } from "drizzle-orm/pg-core";
import {users} from "./userDetails"
export const testResults = pgTable('test_results', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  testType: varchar('test_type', { length: 50 }).notNull(), // 'mock_test', 'practice_quiz', 'subject_test'
  testName: varchar('test_name', { length: 255 }).notNull(),
  score: decimal('score', { precision: 5, scale: 2 }).notNull(),
  maxScore: decimal('max_score', { precision: 5, scale: 2 }).notNull(),
  percentage: decimal('percentage', { precision: 5, scale: 2 }).notNull(),
  timeSpent: integer('time_spent'), // Time in minutes
  questionsTotal: integer('questions_total').notNull(),
  questionsCorrect: integer('questions_correct').notNull(),
  questionsIncorrect: integer('questions_incorrect').notNull(),
  questionsSkipped: integer('questions_skipped').default(0).notNull(),
  difficulty: varchar('difficulty', { length: 20 }).default('medium'), // 'easy', 'medium', 'hard'
  subject: varchar('subject', { length: 100 }), // Subject/category of the test
  isPassed: boolean('is_passed').notNull(),
  tokensUsed: integer('tokens_used').default(0).notNull(), // Tokens consumed for this test
  detailedResults: jsonb('detailed_results').default('{}'), // Store question-wise results
  createdAt: timestamp('created_at').defaultNow().notNull(),
});


