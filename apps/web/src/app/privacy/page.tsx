import type { Metadata } from "next";

import LegalPage from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy — ScheduledMate AI",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="August 31, 2026">
      <p>
        This Privacy Policy explains how ScheduledMate AI ("ScheduledMate",
        "we", "us") collects, uses, and protects your information when you use
        our app at https://schedulemateweb.vercel.app.
      </p>

      <h2 className="text-base font-semibold">What we collect</h2>
      <p>
        We collect the information you give us when you sign up, such as your
        name and email address. If you connect your Google Calendar, we access
        your calendar data to help you schedule and manage appointments. We also
        store the conversations and schedules you create in the app.
      </p>

      <h2 className="text-base font-semibold">How we use it</h2>
      <p>
        We use your information only to provide and improve the app, such as
        helping you schedule and manage your appointments. We do not sell your
        data. Your Google Calendar data is used only to provide the calendar
        features you request and is handled according to Google&apos;s API
        Services User Data Policy (Limited Use requirements).
      </p>

      <h2 className="text-base font-semibold">How we share it</h2>
      <p>
        We do not sell or share your personal information with third parties
        except service providers that help us run the app, or when required by
        law.
      </p>

      <h2 className="text-base font-semibold">Security and retention</h2>
      <p>
        We take reasonable steps to protect your information and keep it only as
        long as your account is active. You can disconnect your Google Calendar
        or delete your data at any time through your account settings.
      </p>

      <h2 className="text-base font-semibold">Contact us</h2>
      <p>
        If you have any questions about this policy, contact us at
        manojbelbase56@gmail.com.
      </p>
    </LegalPage>
  );
}
