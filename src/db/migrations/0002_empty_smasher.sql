CREATE TYPE "public"."token_type" AS ENUM('purchase', 'usage', 'free', 'refund');--> statement-breakpoint
ALTER TABLE "user_details" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user_balance" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user_tokens" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user_details" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "user_details" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "user_balance" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "user_tokens" ADD COLUMN "type" "token_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "user_tokens" ADD COLUMN "context" text;