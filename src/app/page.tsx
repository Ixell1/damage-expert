import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Authority from '@/components/Authority';
import Calculator from '@/components/Calculator';
import UspBanner from '@/components/UspBanner';
import Services from '@/components/Services';
import CarDiagram from '@/components/CarDiagram';
import Process from '@/components/Process';
import AboutUs from '@/components/AboutUs';
import ClaimWizard from '@/components/ClaimWizard';
import BeforeAfter from '@/components/BeforeAfter';
import Faq from '@/components/Faq';
import BlogTeaser from '@/components/BlogTeaser';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Calculator />
        <Authority />
        <UspBanner />
        <Services />
        <CarDiagram />
        <Process />
        <AboutUs />
        <BeforeAfter />
        <ClaimWizard />
        <Faq />
        <BlogTeaser />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
