"use client";

import React from "react";
import { Carousel, Card } from "@/components/ace/ui/apple-cards-carousel";
import Navbar from "@/components/recreated/Nav/navBar";
import GradientText from "@/components/bits/TextAnimations/GradientText/GradientText";
import StarBorder from "@/components/bits/Animations/StarBorder/StarBorder";
import Link from "next/link";
import Footer from "@/components/recreated/Footer/footer";
import { SparklesCore } from "@/components/ace/sparkles.tsx/sparkle";

const data = [
  {
    category: "Mock Tests",
    title: "Ace Competitive Exams",
    src: "/images/pexels-vlada-karpovich-4050287.jpg",
    content: (
      <div className="flex flex-col items-center text-center gap-6">
        <p className="text-neutral-700 dark:text-neutral-300 text-lg md:text-xl font-sans">
          Prepare smarter with an exam-like experience designed to boost your confidence.
        </p>
        <ul className="text-neutral-700 dark:text-neutral-300 text-lg md:text-xl font-sans text-left space-y-2">
          <li>Realistic test patterns and time limits</li>
          <li>Detailed solutions with instant feedback</li>
          <li>Adaptive difficulty based on your performance</li>
          <li>Performance ranking to track improvements</li>
        </ul>
      </div>
    ),
  },
  {
    category: "Productivity",
    title: "Focused Learning Tools",
    src: "/images/pexels-pixabay-261651.jpg",
    content: (
      <div className="flex flex-col items-center text-center gap-6">
        <p className="text-neutral-700 dark:text-neutral-300 text-lg md:text-xl font-sans">
          Eliminate distractions and study with intention using built-in productivity boosters.
        </p>
        <ul className="text-neutral-700 dark:text-neutral-300 text-lg md:text-xl font-sans text-left space-y-2">
          <li>Focus mode with a distraction-free interface</li>
          <li>Pomodoro timers to maintain study flow</li>
          <li>Smart reminders for revisions</li>
          <li>Goal tracking to stay consistent</li>
        </ul>
      </div>
    ),
  },
  {
    category: "Analytics",
    title: "Track Progress Over Time",
    src: "/images/pexels-n-voitkevich-5554650.jpg",
    content: (
      <div className="flex flex-col items-center text-center gap-6">
        <p className="text-neutral-700 dark:text-neutral-300 text-lg md:text-xl font-sans">
          Understand your learning curve with clear analytics and insights.
        </p>
        <ul className="text-neutral-700 dark:text-neutral-300 text-lg md:text-xl font-sans text-left space-y-2">
          <li>Visual dashboards for your performance</li>
          <li>Topic-wise strength & weakness analysis</li>
          <li>Progress charts to track improvement</li>
          <li>AI suggestions for smarter practice</li>
        </ul>
      </div>
    ),
  },
  {
    category: "Mock Tests",
    title: "Simulate Exam Environments",
    src: "/images/pexels-mikhail-nilov-7594219.jpg",
    content: (
      <div className="flex flex-col items-center text-center gap-6">
        <p className="text-neutral-700 dark:text-neutral-300 text-lg md:text-xl font-sans">
          Train your mind for real exam conditions and build resilience.
        </p>
        <ul className="text-neutral-700 dark:text-neutral-300 text-lg md:text-xl font-sans text-left space-y-2">
          <li>Timed mock tests for exam-like pressure</li>
          <li>Question banks based on actual patterns</li>
          <li>Instant scoring with detailed analysis</li>
          <li>Confidence-building through practice</li>
        </ul>
      </div>
    ),
  },
  {
    category: "Productivity",
    title: "Built-in Focus Mode",
    src: "/images/pexels-lina-2253928.jpg",
    content: (
      <div className="flex flex-col items-center text-center gap-6">
        <p className="text-neutral-700 dark:text-neutral-300 text-lg md:text-xl font-sans">
          Stay distraction-free with a study space optimized for deep focus.
        </p>
        <ul className="text-neutral-700 dark:text-neutral-300 text-lg md:text-xl font-sans text-left space-y-2">
          <li>Noise-free immersive learning mode</li>
          <li>Customizable study sessions & schedules</li>
          <li>Built-in background sounds for focus</li>
          <li>Study streaks & motivation boosters</li>
        </ul>
      </div>
    ),
  },
  {
    category: "Analytics",
    title: "Your Journey, Visualized",
    src: "/images/pexels-julia-m-cameron-4144100.jpg",
    content: (
      <div className="flex flex-col items-center text-center gap-6">
        <p className="text-neutral-700 dark:text-neutral-300 text-lg md:text-xl font-sans">
          See your progress in a way that keeps you motivated and consistent.
        </p>
        <ul className="text-neutral-700 dark:text-neutral-300 text-lg md:text-xl font-sans text-left space-y-2">
          <li>Weekly & monthly performance reports</li>
          <li>Smart insights for better planning</li>
          <li>Achievements to celebrate milestones</li>
          <li>Goal tracking with personalized tips</li>
        </ul>
      </div>
    ),
  },
];

// ✅ Define the component inside the default export function
const Landingpage = () => {
  // Move AppleCardsCarouselDemo inside the main component
  const AppleCardsCarouselDemo = () => {
    const cards = data.map((card, index) => (
      <Card key={card.src} card={card} index={index} />
    ));
    return <Carousel items={cards} />;
  };

  return (
    <main className="bg-white dark:bg-black min-h-screen w-full">
      <Navbar />

      <section className="relative flex flex-col items-center justify-center text-center py-20 md:py-28 overflow-hidden">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          particleColor="#FFFFFF"
          className="absolute inset-0 w-full h-full z-0"
        />

        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center py-20">
          <GradientText
            colors={["#ffffff", "#f8c8dc", "#fff9b0", "#f8c8dc", "#ffffff"]}
            animationSpeed={6}
            showBorder={false}
            className="text-5xl md:text-6xl lg:text-8xl xl:text-9xl text-center leading-tight"
          >
            PRAYASTHANAM
          </GradientText>
          <p className="mt-6 text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl py-8">
            Practice Makes Perfect — Mock Tests for the Modern Learner
          </p>
        </div>
      </section>

      <section id="features" className="max-w-7xl mx-auto py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black dark:text-white">
          Everything You Need to Succeed
        </h2>
        <AppleCardsCarouselDemo />
      </section>

      <section className="text-center py-20 bg-gray-50 dark:bg-neutral-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-neutral-800 dark:text-white mb-4">
            Ready to crack your exam?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join Mockcrack and access real mock test environments, performance stats, and more.
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
                <span
                  className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100
                 bg-gradient-to-r from-pink-600 via-pink-500 to-red-500
                 blur-sm transition-opacity duration-300"
                  aria-hidden="true"
                />
                <span
                  className="absolute inset-0 rounded-[inherit] border border-pink-400/30"
                  aria-hidden="true"
                />
                <span className="relative z-10 flex items-center gap-3 bg-transparent">
                  Start Your Journey
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

export default Landingpage;
