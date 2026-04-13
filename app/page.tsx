import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { Hero } from '@/components/home/hero';
import { Capabilities } from '@/components/home/capabilities';
import { FeatureSplit } from '@/components/home/feature-split';
import { FeaturedStory } from '@/components/home/featured-story';
import { FinalCTA } from '@/components/home/final-cta';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Capabilities />
        <FeatureSplit />
        <FeaturedStory />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
