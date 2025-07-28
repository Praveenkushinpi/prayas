"use client";

import Link from "next/link";
import GradientText from "@/components/bits/TextAnimations/GradientText/GradientText";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="relative text-slate-100 pt-20 pb-12  px-12 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          <GradientText
            colors={["#ffffff", "#f8c8dc", "#fff9b0", "#f8c8dc", "#ffffff"]}
            animationSpeed={5}
            showBorder={false}
            className="text-3xl font-extrabold"
          >
            PRAYASTHANAM
          </GradientText>

          <p className="font-medium leading-relaxed text-slate-300">
            Prayasthanam is a movement — a collective step toward empowerment,
            creativity, and impact. Join us to learn, build, and shape the
            future through knowledge, collaboration, and action.
          </p>

          <div className="mt-2">
            <h3 className="font-semibold text-lg bg-gradient-to-r from-pink-400 to-yellow-300 bg-clip-text text-transparent mb-3">
              What we stand for
            </h3>
            <ul className="list-disc list-inside font-medium space-y-2 text-slate-300">
              <li>Open learning, accessible to all</li>
              <li>Projects with real-world impact</li>
              <li>Community-driven innovation</li>
              <li>Cultural roots, global vision</li>
            </ul>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4 items-start md:items-end text-left md:text-right">
          <h3 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-2 font-medium">
            <li>
              <Link href="#about" className="hover:underline transition-all duration-200">
                About
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:underline transition-all duration-200">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-of-service" className="hover:underline transition-all duration-200">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* —— Bottom strip —— */}
      <div className="w-full mt-16">
        <hr className="border-t border-white/20" />
        <div className="max-w-6xl mx-auto mt-6 flex flex-col md:flex-row justify-between items-start md:items-center text-sm text-slate-400 gap-2">
          <p>
            Made with{" "}
            <span className="text-pink-500 font-semibold inline-block animate-pulse">
              🩷
            </span>{" "}
            by the Prayasthanam Collective
          </p>
          <p className="font-medium">
            &copy; {year} Prayasthanam. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
