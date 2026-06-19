import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { LandingNavbar } from "@/components/navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { JourneySection } from "@/components/landing/journey-section"
import { NetworkSection } from "@/components/landing/network-section"
import { AgentPreviewSection } from "@/components/landing/agent-preview-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { PricingSection } from "@/components/landing/pricing-section"
import { CommunitySection } from "@/components/landing/community-section"
import { FooterSection } from "@/components/landing/footer-section"

export default async function HomePage() {
  const session = await auth()
  if (session) redirect("/dashboard")

  return (
    <div className="min-h-screen bg-canvas text-body antialiased overflow-x-hidden">
      <LandingNavbar />
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
    </div>
  )
}
