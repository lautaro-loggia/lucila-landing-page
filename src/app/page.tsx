import { Approach } from "@/components/v2/approach";
import { Benefits, Programs } from "@/components/v2/benefits";
import { ContactFormProvider } from "@/components/v2/contact-form";
import { Footer } from "@/components/v2/footer";
import { Hero } from "@/components/v2/hero";
import { History } from "@/components/v2/history";
import { Gallery, Philosophy, Rating } from "@/components/v2/intro";
import { Nav } from "@/components/v2/nav";
import { Offer } from "@/components/v2/offer";
import { Testimonials } from "@/components/v2/testimonials";

export default function Home() {
  return (
    <ContactFormProvider>
      <Nav />
      <main>
        <Hero />
        <Rating />
        <Philosophy />
        <History />
        <Gallery />
        <Benefits />
        <Programs />
        <Approach />
        <Testimonials />
        <Offer />
      </main>
      <Footer />
    </ContactFormProvider>
  );
}
