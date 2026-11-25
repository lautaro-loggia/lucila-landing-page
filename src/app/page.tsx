import { Approach } from "@/components/v2/approach";
import { Benefits, Programs } from "@/components/v2/benefits";
import { Choice } from "@/components/v2/choice";
import { ContactFormProvider } from "@/components/v2/contact-form";
import { Footer } from "@/components/v2/footer";
import { Hero } from "@/components/v2/hero";
import { History } from "@/components/v2/history";
import { Gallery, Philosophy } from "@/components/v2/intro";
import { Nav } from "@/components/v2/nav";
import { Offer } from "@/components/v2/offer";
import { Results } from "@/components/v2/results";
import { Testimonials } from "@/components/v2/testimonials";

export default function Home() {
  return (
    <ContactFormProvider>
      <Nav />
      <main>
        <Hero />
        {/* Primero Wonder Program; la historia de Lucila viene después */}
        <Philosophy />
        <Choice />
        <Benefits />
        <Programs />
        <Results />
        <History />
        <Gallery />
        <Approach />
        <Testimonials />
        <Offer />
      </main>
      <Footer />
    </ContactFormProvider>
  );
}
