CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"age" integer NOT NULL,
	"profile_image" varchar(500),
	"bio" text,
	"total_tokens" integer DEFAULT 0 NOT NULL,
	"lifetime_tokens_used" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"plan_type" varchar(50) DEFAULT 'free' NOT NULL,
	"status" varchar(20) DEFAULT 'active' NOT NULL,
	"tokens_included" integer DEFAULT 100 NOT NULL,
	"expiration_date" timestamp NOT NULL,
	"auto_renew" boolean DEFAULT true NOT NULL,
	"features" jsonb DEFAULT '{}' NOT NULL,
	"payment_id" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "subscriptions_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "test_results" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"test_type" varchar(50) NOT NULL,
	"test_name" varchar(255) NOT NULL,
	"score" numeric(5, 2) NOT NULL,
	"max_score" numeric(5, 2) NOT NULL,
	"percentage" numeric(5, 2) NOT NULL,
	"time_spent" integer,
	"questions_total" integer NOT NULL,
	"questions_correct" integer NOT NULL,
	"questions_incorrect" integer NOT NULL,
	"questions_skipped" integer DEFAULT 0 NOT NULL,
	"difficulty" varchar(20) DEFAULT 'medium',
	"subject" varchar(100),
	"is_passed" boolean NOT NULL,
	"tokens_used" integer DEFAULT 0 NOT NULL,
	"detailed_results" jsonb DEFAULT '{}',
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "token_transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"transaction_type" varchar(20) NOT NULL,
	"tokens_added" integer NOT NULL,
	"amount" numeric(10, 2),
	"currency" varchar(3) DEFAULT 'USD',
	"payment_id" varchar(255),
	"description" text,
	"expires_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "user_details" CASCADE;--> statement-breakpoint
DROP TABLE "user_balance" CASCADE;--> statement-breakpoint
DROP TABLE "user_tokens" CASCADE;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test_results" ADD CONSTRAINT "test_results_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "token_transactions" ADD CONSTRAINT "token_transactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
DROP TYPE "public"."token_type";