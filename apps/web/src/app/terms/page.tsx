import type { Metadata } from "next";

import LegalPage from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service — ScheduledMate AI",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" lastUpdated="August 31, 2026">
      <p>
        These Terms of Service ("Terms") govern your use of the ScheduledMate AI
        app at https://schedulemateweb.vercel.app. By using the app, you agree
        to these Terms.
      </p>

      <h2 className="text-base font-semibold">Use of the app</h2>
      <p>
        You may use ScheduledMate AI to create, manage, and coordinate your
        appointments and schedules. You must be at least 13 years old to use the
        app, and you are responsible for activity under your account.
      </p>

      <h2 className="text-base font-semibold">Google Calendar</h2>
      <p>
        You may choose to connect your Google Calendar. We use your calendar
        data only to provide the features you request. You can disconnect your
        calendar at any time. Our use of Google API data follows the Google API
        Services User Data Policy (Limited Use requirements).
      </p>

      <h2 className="text-base font-semibold">AI assistant</h2>
      <p>
        Our AI assistant helps with scheduling tasks. AI results may not always
        be accurate, so you are responsible for confirming any appointments or
        changes made through the app.
      </p>

      <h2 className="text-base font-semibold">No warranties</h2>
      <p>
        The app is provided "as is" without warranties of any kind. To the
        maximum extent allowed by law, we are not liable for any damages related
        to your use of the app.
      </p>

      <h2 className="text-base font-semibold">Changes</h2>
      <p>
        We may update these Terms from time to time. Continued use of the app
        after changes are posted means you accept the updated Terms.
      </p>

      <h2 className="text-base font-semibold">Contact us</h2>
      <p>
        If you have any questions about these Terms, contact us at
        manojbelbase56@gmail.com.
      </p>
    </LegalPage>
  );
}
