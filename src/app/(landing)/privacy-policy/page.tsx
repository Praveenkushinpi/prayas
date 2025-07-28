"use client";

import React from "react";
import Logo from "@/components/recreated/Logo/logo";
import GradientText from "@/components/bits/TextAnimations/GradientText/GradientText";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-black text-slate-200">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        <Logo />

        <div className="pt-16 pb-20">
          <GradientText
            colors={["#ffffff", "#000000", "#ffffff"]}
            className="text-4xl md:text-5xl font-bold mb-4 block text-left py-8"
          >
            Privacy&nbsp;Policy
          </GradientText>
          <p className="text-base md:text-lg text-slate-400">
            Last updated: July&nbsp;14,&nbsp;2025
          </p>
        </div>

        <div className="space-y-16 pb-20">
          {[
            {
              title: "1. Introduction",
              content: (
                <p>
                  This Privacy Policy explains how <strong>PRAYASHAKTAM</strong> ("we",
                  "our", or "us") collects, uses, and protects your personal information
                  when you use our web or mobile application.
                </p>
              ),
            },
            {
              title: "2. Information We Collect",
              content: (
                <ul className="space-y-4">
                  {[
                    ["Account Details", "email, username, hashed password"],
                    ["Usage Data", "pages visited, time spent, interactions"],
                    ["Uploaded Content", "notes, answers, preferences"],
                    ["Device & Log Info", "IP address, browser type, OS"],
                  ].map(([label, desc]) => (
                    <li className="flex items-start" key={label}>
                      <span className="text-blue-400 mr-3 mt-1">•</span>
                      <span>
                        <strong>{label}: </strong>
                        {desc}
                      </span>
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              title: "3. How We Use Your Information",
              content: (
                <ul className="space-y-4">
                  {[
                    "Create and manage your PRAYASHAKTAM account",
                    "Generate personalized progress insights",
                    "Improve app features and learning experience",
                    "Send updates, tips, or critical alerts",
                    "Prevent fraud, abuse, or security issues",
                  ].map((item) => (
                    <li className="flex items-start" key={item}>
                      <span className="text-blue-400 mr-3 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              title: "4. Cookies & Tracking",
              content: (
                <p>
                  We use minimal cookies to keep you signed in and to understand how
                  you interact with PRAYASHAKTAM. You can disable cookies via browser
                  settings, but core features might stop working.
                </p>
              ),
            },
            {
              title: "5. Third‑Party Services",
              content: (
                <p>
                  We use trusted third-party services for hosting, analytics, and optional
                  payments. They only access data as needed to provide services under this
                  policy.
                </p>
              ),
            },
            {
              title: "6. Data Security",
              content: (
                <p>
                  Your data is encrypted during transfer (HTTPS) and stored securely.
                  We apply industry-standard safeguards to protect against unauthorized
                  access or disclosure.
                </p>
              ),
            },
            {
              title: "7. Data Retention",
              content: (
                <p>
                  We keep your information only as long as needed for legal, functional,
                  or learning purposes. You may request deletion anytime.
                </p>
              ),
            },
            {
              title: "8. Your Rights",
              content: (
                <ul className="space-y-4">
                  {[
                    "Access, correct, or delete your data",
                    "Withdraw your consent",
                    "Restrict or object to specific processing",
                    "Export your data by emailing support@prayashaktam.app",
                  ].map((item) => (
                    <li className="flex items-start" key={item}>
                      <span className="text-blue-400 mr-3 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              title: "9. Children's Privacy",
              content: (
                <p>
                  PRAYASHAKTAM is not intended for children under 13. We don’t knowingly
                  collect data from minors. If we become aware of such data, we delete
                  it promptly.
                </p>
              ),
            },
            {
              title: "10. Changes to This Policy",
              content: (
                <p>
                  We may revise this Privacy Policy occasionally. We will update the
                  "Last Updated" date and notify users when appropriate.
                </p>
              ),
            },
            {
              title: "11. Contact Us",
              content: (
                <p>
                  Questions or requests? Contact us at{" "}
                  <strong>support@prayashaktam.app</strong>.
                </p>
              ),
            },
          ].map(({ title, content }) => (
            <section className="space-y-6 py-4" key={title}>
              <GradientText
                colors={["#ffffff", "#f8c8dc", "#fff9b0", "#f8c8dc", "#ffffff"]}
                className="text-3xl font-bold text-left block py-6"
              >
                {title}
              </GradientText>
              <div className="text-lg leading-relaxed text-slate-300">{content}</div>
            </section>
          ))}
        </div>
      </div>
    </main>

  );
}
