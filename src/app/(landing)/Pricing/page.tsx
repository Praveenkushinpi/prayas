"use client";

import Link from "next/link";
import React, { useState } from "react";
import { ChevronDown, Star, Zap, Crown, Gift } from "lucide-react";
import GradientText from "@/components/bits/TextAnimations/GradientText/GradientText";
import Footer from "@/components/recreated/Footer/footer";
import StarBorder from "@/components/bits/Animations/StarBorder/StarBorder";
import PixelCard from "@/components/bits/PixelCard/PixelCard";
import Logo from "@/components/recreated/Logo/logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqItems = [
  {
    id: "1",
    title: "What happens if I run out of credits?",
    content:
      "You can purchase additional credit packs anytime. Your progress and analytics remain saved and accessible.",
  },
  {
    id: "2",
    title: "Can I share my credits with others?",
    content:
      "Credits are tied to your individual account and cannot be transferred or shared with other users.",
  },
  {
    id: "3",
    title: "Do credits expire?",
    content:
      "Yes, credits have a validity period mentioned in each pack. You'll receive email reminders before expiry.",
  },
  {
    id: "4",
    title: "What if I'm not satisfied?",
    content:
      "We offer a 7-day money-back guarantee if you're not completely satisfied with your purchase.",
  },
];

const PricingPage = () => {
  const [billingPeriod, setBillingPeriod] = useState("credits");

  const pricingPlans = [
    {
      plan: "Starter Pack",
      icon: Zap,
      credits: 100,
      price: 299,
      features: ["100 mock test credits", "Email support", "Valid for 3 months"],
      buttonText: "Get Started",
      buttonVariant: "secondary",
    },
    {
      plan: "Pro Pack",
      icon: Crown,
      credits: 500,
      price: 1299,
      features: [
        "500 mock test credits",
        "Valid for 6 months",
        "Bonus: 50 extra credits",
      ],
      isPopular: true,
      buttonText: "Start Your Journey",
      buttonVariant: "primary",
    },
    {
      plan: "Ultimate Pack",
      icon: Gift,
      credits: 1000,
      price: 2199,
      features: [
        "1000 mock test credits",
        "Complete analytics suite",
        "Valid for 12 months",
      ],
      buttonText: "Go Ultimate",
      buttonVariant: "secondary",
    },
  ];

  return (
    <main className="bg-white dark:bg-black min-h-screen w-full">
      <Logo />

      <section className="flex flex-col items-center justify-center text-center py-16 md:py-20 px-4">
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
          <GradientText
            colors={["#ffffff", "#f8c8dc", "#fff9b0", "#f8c8dc", "#ffffff"]}
            animationSpeed={6}
            showBorder={false}
            className="text-4xl md:text-6xl lg:text-7xl text-center leading-tight"
          >
            SIMPLE PRICING
          </GradientText>
          <p className="mt-6 text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl">
            Choose the perfect credit pack for your exam preparation journey
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <PixelCard
              key={index}
              variant={plan.isPopular ? "yellow" : "pink"}
              className="h-[380px] md:h-[400px] relative"
            >
              <div className="absolute inset-0 flex flex-col p-8">

                <plan.icon className="w-12 h-12 text-primary mb-6" />

                <h3 className="text-2xl font-bold mb-2">{plan.plan}</h3>

                <p className="text-lg text-gray-500 mb-4">{plan.credits} Credits</p>

                <p className="text-3xl font-bold mb-6">₹{plan.price}</p>

                <ul className="space-y-3 flex-1 text-base">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="text-green-500 font-bold">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </PixelCard>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-16 px-6">
        <div className="bg-gray-50 dark:bg-neutral-900 rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-8">
            How Credits Work
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h4 className="font-semibold text-lg mb-3 text-black dark:text-white">
                1 Credit = 1 Mock Test
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Each mock test attempt uses one credit from your account
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-lg mb-3 text-black dark:text-white">
                No Expiry Pressure
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Use your credits at your own pace within the validity period
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-lg mb-3 text-black dark:text-white">
                Instant Access
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Credits are added to your account immediately after purchase
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto py-16 px-6">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-black dark:text-white mb-12">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full" defaultValue="1">
            {faqItems.map((item) => (
              <AccordionItem value={item.id} key={item.id} className="py-2">
                <AccordionTrigger className="py-4 text-[16px] leading-6 hover:no-underline text-left">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 text-[15px] leading-relaxed">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="text-center py-16 bg-gray-50 dark:bg-neutral-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-neutral-800 dark:text-white mb-6">
            Ready to start practicing?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of students who have improved their exam scores with
            our mock tests.
          </p>

          <div className="mt-8">
            <Link href="/signup">
              <StarBorder
                color="pink"
                speed="10s"
                className="group relative inline-flex items-center justify-center overflow-hidden 
              px-8 py-4 md:px-12 md:py-5 rounded-2xl font-bold text-lg md:text-xl text-white 
              transition-transform duration-300 ease-out hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-3 bg-transparent">
                  Choose Your Pack
                  <svg
                    className="w-0 h-6 group-hover:w-6 transition-all duration-300 overflow-hidden"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </StarBorder>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PricingPage;
