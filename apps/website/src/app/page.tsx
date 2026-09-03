"use client";

import { Footer } from "~/components/footer";
import { Navbar } from "~/components/navbar";
import { AppDownload } from "~/components/sections/app-download";
import { DemoPreview } from "~/components/sections/demo-preview";
import { Faq } from "~/components/sections/faq";
import { Features } from "~/components/sections/features";
import { Hero } from "~/components/sections/hero";
import { HowItWorks } from "~/components/sections/how-it-works";
import { Pricing } from "~/components/sections/pricing";
import { Stats } from "~/components/sections/stats";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <DemoPreview />
        <HowItWorks />
        <Pricing />
        <AppDownload />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
