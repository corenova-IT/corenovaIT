import Link from "next/link";
import HeroMockups from "@/components/home/HeroMockups";
import ServicesShowcase from "@/components/home/ServicesShowcase";
import PortfolioCarousel from "@/components/home/PortfolioCarousel";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonial from "@/components/home/Testimonial";
import Stats from "@/components/home/Stats";
import ProcessTeaser from "@/components/home/ProcessTeaser";
import HomeFAQ from "@/components/home/HomeFAQ";
import FinalCTA from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <div>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="pill-badge">Award-Winning White-Label Partner</span>
            <h1>
              We Build Digital
              <br />
              Experiences
            </h1>
            <p className="hero-sub">
              CoreNovaIT is the engine behind agencies that don&apos;t build
              in-house. From a single-page Wix site to full custom
              development with AI integration, we run every engagement in
              the open — sprints you can see, checkpoints you control, and a
              handover with nothing left a mystery.
            </p>
            <div className="hero-cta">
              <Link href="/contact" className="btn btn-solid">
                Start a Project
              </Link>
              <Link href="/services" className="btn btn-ghost">
                View Work
              </Link>
            </div>
          </div>
          <HeroMockups />
        </div>
      </section>

      <ServicesShowcase />
      <PortfolioCarousel />
      <WhyChooseUs />
      <Testimonial />
      <Stats />
      <ProcessTeaser />
      <HomeFAQ />
      <FinalCTA />
    </div>
  );
}
