"use client";

import { Footer } from "~/components/footer";
import { Navbar } from "~/components/navbar";
import { CtaBanner } from "~/components/sections/cta-banner";
import { Faq } from "~/components/sections/faq";
import { Features } from "~/components/sections/features";
import { Hero } from "~/components/sections/hero";
import { HowItWorks } from "~/components/sections/how-it-works";
import { Pricing } from "~/components/sections/pricing";
import { ProductGallery } from "~/components/sections/product-gallery";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <ProductGallery />
        <HowItWorks />
        <Pricing />
        <Faq />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
