ALTER TABLE "user_subscriptions" RENAME TO "user_balance";--> statement-breakpoint
ALTER TABLE "user_details" ADD COLUMN "email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user_balance" ADD COLUMN "balance" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "user_tokens" ADD COLUMN "tokens" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "user_tokens" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "user_details" DROP COLUMN "avatar_url";--> statement-breakpoint
ALTER TABLE "user_balance" DROP COLUMN "plan";--> statement-breakpoint
ALTER TABLE "user_balance" DROP COLUMN "quota";--> statement-breakpoint
ALTER TABLE "user_balance" DROP COLUMN "used";--> statement-breakpoint
ALTER TABLE "user_balance" DROP COLUMN "renews_at";--> statement-breakpoint
ALTER TABLE "user_tokens" DROP COLUMN "tokens_bought";--> statement-breakpoint
ALTER TABLE "user_tokens" DROP COLUMN "tokens_used";--> statement-breakpoint
ALTER TABLE "user_tokens" DROP COLUMN "purchased_at";