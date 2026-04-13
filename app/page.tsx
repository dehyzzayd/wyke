import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { Hero } from '@/components/home/hero';
import { ValueProps } from '@/components/home/value-props';
import { Process } from '@/components/home/process';
import { FeatureSplit } from '@/components/home/feature-split';
import { SocialProof } from '@/components/home/social-proof';
import { FinalCTA } from '@/components/home/final-cta';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ValueProps />
        <Process />
        <FeatureSplit />
        <SocialProof />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
