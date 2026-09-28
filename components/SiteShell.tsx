import Providers from "@/components/Providers";
import PageLoader from "@/components/PageLoader/PageLoader";
import Cursor from "@/components/Cursor/Cursor";
import Navbar from "@/components/navbar/Navbar";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Ambient from "@/components/ui/Ambient";
import Hero from "@/components/Hero/Hero";
import LiveTicker from "@/components/LiveTicker/LiveTicker";
import Work from "@/components/Work/Work";
import Skills from "@/components/Skills/Skills";
import About from "@/components/About/About";
import CreativeLab from "@/components/CreativeLab/CreativeLab";
import Experience from "@/components/Experience/Experience";
import Process from "@/components/Process/Process";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";

/**
 * Page order alternates dark and light "sheets" that slide over each other:
 * dashboard hero (dark) → work (light) → skills (dark) → about (light) → ad library (dark)
 * → journey (light) → process (dark) → contact (colour) → footer.
 */
export default function SiteShell() {
  return (
    <Providers>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-ink-950"
      >
        Skip to content
      </a>
      <Ambient />
      <PageLoader />
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        <LiveTicker />
        <Work />
        <Skills />
        <About />
        <CreativeLab />
        <Experience />
        <Process />
        <Contact />
      </main>
      <Footer />
    </Providers>
  );
}
