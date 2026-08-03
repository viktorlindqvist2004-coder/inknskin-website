import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Intro from "@/components/Intro";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Artists from "@/components/Artists";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Hero />
      <Ticker />
      <Intro />
      <Services />
      <Gallery />
      <Artists />
      <Reviews />
      <Faq />
      <Contact />
      <Footer />
    </>
  );
}
