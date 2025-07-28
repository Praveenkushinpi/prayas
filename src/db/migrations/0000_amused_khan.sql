CREATE TABLE "user_details" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"full_name" text,
	"avatar_url" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_subscriptions" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"plan" text DEFAULT 'free' NOT NULL,
	"quota" integer DEFAULT 10 NOT NULL,
	"used" integer DEFAULT 0 NOT NULL,
	"renews_at" timestamp DEFAULT now() + interval '30 days',
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"tokens_bought" integer NOT NULL,
	"tokens_used" integer DEFAULT 0 NOT NULL,
	"purchased_at" timestamp DEFAULT now()
);
