import Navbar from '../components/Navbar';
import HeroSection from '../sections/HeroSection';
import FeaturesSection from '../sections/FeaturesSection';
import JourneySection from '../sections/JourneySection';
import NetworkSection from '../sections/NetworkSection';
import AgentPreviewSection from '../sections/AgentPreviewSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import PricingSection from '../sections/PricingSection';
import CommunitySection from '../sections/CommunitySection';
import FooterSection from '../sections/FooterSection';

export default function LandingPage() {
  return (
    <>
      <Navbar transparent />
      <main>
        <HeroSection />
        <FeaturesSection />
        <JourneySection />
        <NetworkSection />
        <AgentPreviewSection />
        <TestimonialsSection />
        <PricingSection />
        <CommunitySection />
      </main>
      <FooterSection />
    </>
  );
}
