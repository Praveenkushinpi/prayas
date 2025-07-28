"use client";

import React from "react";
import Logo from "@/components/recreated/Logo/logo";
import GradientText from "@/components/bits/TextAnimations/GradientText/GradientText";

export default function TermsOfServicePage() {
  const termsSections = [
    {
      title: "1. Use of Service",
      content: (
        <p>
          <strong>PRAYASTHANAM</strong> helps users generate mock exams, practice
          effectively, and analyse performance with AI powered insights. By using
          our service, you agree to use it only for lawful and educational purposes.
        </p>
      ),
    },
    {
      title: "2. User Accounts",
      content: (
        <>
          <p>
            You may need an account to access certain features. You are responsible for:
          </p>
          <ul className="space-y-4 mt-4">
            {[
              "Keeping your login credentials secure",
              "Providing accurate, up to date information",
              "Not impersonating others or misrepresenting your identity",
            ].map((item) => (
              <li key={item} className="flex items-start text-lg">
                <span className="text-blue-400 mr-3 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4">Users must be at least 13 years old to use the app.</p>
        </>
      ),
    },
    {
      title: "3. Data Usage & Privacy",
      content: (
        <p>
          We collect only the data necessary to provide and improve our services,
          primarily your email, username, and usage analytics. Your data is handled
          according to our&nbsp;
          <a
            href="/privacy-policy"
            className="underline text-blue-400 hover:text-blue-300 transition-colors"
          >
            Privacy Policy
          </a>
          .
        </p>
      ),
    },
    {
      title: "4. Acceptable Use",
      content: (
        <ul className="space-y-4">
          {[
            "Do not upload harmful, illegal, or copyrighted material you do not own",
            "Do not attempt unauthorised access or reverse‑engineer the platform",
            "Do not spam, harass, or disrupt other users or the service",
          ].map((item) => (
            <li key={item} className="flex items-start text-lg">
              <span className="text-blue-400 mr-3 mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "5. Intellectual Property",
      content: (
        <p>
          All content and branding on MOCKCRACK belong to us or are properly licensed.
          You may use the platform for personal educational purposes only; redistribution
          or commercial exploitation is not permitted without written consent.
        </p>
      ),
    },
    {
      title: "6. Service Availability",
      content: (
        <p>
          We strive to maintain high availability but cannot guarantee uninterrupted
          service. Maintenance, updates, or unforeseen issues may cause temporary
          disruptions. We are not liable for any inconvenience caused by service
          interruptions.
        </p>
      ),
    },
    {
      title: "7. Changes to Service",
      content: (
        <p>
          We may modify, update, or discontinue parts of the service at any time.
          We will attempt to give reasonable notice if changes materially affect your
          usage.
        </p>
      ),
    },
    {
      title: "8. Limitation of Liability",
      content: (
        <p>
          The service is provided &ldquo;as is&rdquo; without warranties of any kind. MOCKCRACK is
          not liable for indirect, incidental, or consequential damages, data loss,
          or interruptions arising from your use of the platform or reliance on
          AI‑generated outputs.
        </p>
      ),
    },
    {
      title: "9. Termination",
      content: (
        <p>
          We reserve the right to suspend or delete accounts that violate these terms.
          You may request account deletion at any time via account settings or by
          contacting us.
        </p>
      ),
    },
    {
      title: "10. Changes to These Terms",
      content: (
        <p>
          We may revise these Terms periodically. Continued use of MOCKCRACK after
          changes take effect constitutes acceptance of the updated terms.
        </p>
      ),
    },
    {
      title: "11. Contact Us",
      content: (
        <p>
          Have questions about these Terms? Email us at{" "}
          <strong>dm@slack</strong>.
        </p>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-black text-slate-200">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        <Logo />

        <div className="pt-16 pb-20">
          <GradientText
            colors={["#ffffff", "#000000", "#ffffff"]}
            className="text-4xl md:text-5xl font-bold mb-2 text-left block"
          >
            Terms&nbsp;of&nbsp;Service
          </GradientText>
          <p className="text-base md:text-lg text-slate-400">
            Last updated:&nbsp;July&nbsp;8,&nbsp;2025
          </p>
        </div>

        <div className="space-y-16 pb-20">
          {termsSections.map(({ title, content }) => (
            <section key={title} className="space-y-6">
              <GradientText
                colors={[
                  "#ffffff",
                  "#f8c8dc",
                  "#fff9b0",
                  "#f8c8dc",
                  "#ffffff",
                ]}
                className="text-3xl font-bold text-left block py-4"
              >
                {title}
              </GradientText>
              <div className="text-lg leading-relaxed text-slate-300 py-8">
                {content}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
