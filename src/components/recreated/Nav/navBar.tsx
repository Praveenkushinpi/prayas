"use client";

import Image from "next/image";
import GooeyNav from "@/components/bits/GooeyNav/GooeyNav";
import Link from "next/link";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Quick Links", href: "#footer"},
  { label: "Pricing", href: "/Pricing" },
  { label: "Login", href: "/login" },
  { label: "Get Started", href: "/signup", highlight: true }
];

export default function Navbar() {
  return (
    <header
      className="
        fixed inset-x-0 top-0 z-30
        flex items-center justify-between
        h-14 md:h-15          
        px-4 md:px-6
      "
    >
      {/* —— Logo —— */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/icons/check.png"
          alt="MockCrack"
          width={32}            /* ↓ 40 → 32 px */
          height={32}
          priority
          className="filter invert"
        />
        <span className="sr-only">MockCrack</span>
      </Link>
      {/* —— Gooey links —— */}
      <div className="relative h-12 md:h-14 w-fit mt-2">
        <GooeyNav
          items={navItems}
          particleCount={15}
          particleDistances={[90, 50]}
          particleR={100}
          initialActiveIndex={-1}
          animationTime={600}
          timeVariance={300}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        />
      </div>
    </header>
  );
}