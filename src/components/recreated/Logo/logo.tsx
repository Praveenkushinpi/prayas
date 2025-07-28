"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="fixed top-4 left-4 z-50 flex items-center"
      aria-label="Go to homepage"
    >
      
      <Image
        src="/icons/check.png"
        alt="MockCrack"
        width={44}
        height={44}
        priority
        className="filter invert"
      />
    </Link>
  );
}
