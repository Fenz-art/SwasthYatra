import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NarrativeSteps } from "@/components/ui/narrative-steps"
import Link from "next/link"
import { auth } from "@/lib/auth"
import {
  ArrowRight,
  Command,
  Languages,
  MapPin,
  Pill,
  ShieldCheck,
  BarChart3,
  Activity,
  Stethoscope,
  HeartPulse,
  Building2,
  BookOpen,
} from "lucide-react"

export default async function HomePage() {
  const session = await auth()
  if (session) redirect("/dashboard")

  const storySections = [
    {
      id: "Healthcare Abroad Is Uncertain",
      title: "When care is needed abroad, uncertainty becomes the first risk.",
      body: "Travelers rarely know which provider to trust, what medication names mean locally, or how to coordinate safely across language barriers.",
      icon: HeartPulse,
    },
    {
      id: "How SwasthYatra Works",
      title: "A navigation system that coordinates care from first signal to follow-up.",
      body: "SwasthYatra continuously connects traveler context, provider availability, communication support, and next-step guidance in one operational flow.",
      icon: Stethoscope,
    },
    {
      id: "Provider Network",
      title: "Recommended care options are based on fit, not just distance.",
      body: "Language support, availability, traveler context, and previous outcomes guide which provider is contacted first.",
      icon: MapPin,
    },
    {
      id: "Communication Layer",
      title: "Clear communication is prepared before treatment begins.",
      body: "Translation support and care coordination channels are set up so both traveler and provider can move with confidence.",
      icon: Languages,
    },
    {
      id: "Outcomes",
      title: "Every journey strengthens future journeys.",
      body: "Resolved cases improve future recommendations, response quality, and coordination speed across the network.",
      icon: BarChart3,
    },
  ]

  const workflowSteps = [
    {
      label: "Assessment Complete",
      description: "The traveler's symptoms, location, and medical history are reviewed to understand the safest next step.",
      status: "complete" as const,
    },
    {
      label: "Recommended Care Options",
      description: "Nearby providers are evaluated using language support, availability, and previous care outcomes.",
      status: "complete" as const,
    },
    {
      label: "Provider Contacted",
      description: "A nearby provider reviewed the request and is available to assist.",
      status: "complete" as const,
    },
    {
      label: "Communication Ready",
      description: "Translation support is prepared automatically so the traveler and provider can communicate clearly.",
      status: "active" as const,
    },
    {
      label: "Care Journey Completed",
      description: "Treatment and follow-up are recorded to strengthen future care decisions.",
      status: "pending" as const,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#07080A]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-white/[0.1] bg-white/[0.04]">
              <Activity className="h-4 w-4 text-[#00E5FF]" />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-tight text-white/95">SwasthYatra</div>
              <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">Healthcare Navigation</div>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Button asChild variant="raycast" size="sm">
              <Link href="/demo" className="flex items-center gap-2">
                <Command className="h-3.5 w-3.5" />
                Explore demo
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/auth/signin">Sign in</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="border-b border-white/[0.08]">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
            <div className="space-y-7">
              <Badge variant="outline" className="border-white/[0.12] bg-white/[0.035] px-3 py-1 text-[10px] text-white/60">
                Healthcare Navigation Network
              </Badge>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white/95 text-balance sm:text-5xl lg:text-6xl">
                Healthcare, without the uncertainty.
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
                Find trusted care, understand your options, and get help navigating unfamiliar healthcare systems wherever you travel.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-11 px-6 text-sm">
                  <Link href="/auth/signin">
                    Start a journey
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="raycast" size="lg" className="h-11 px-6 text-sm">
                  <Link href="/demo">Explore the platform</Link>
                </Button>
              </div>
              <div className="grid max-w-2xl grid-cols-3 gap-3 border-t border-white/[0.08] pt-5">
                {[
                  ["10,482", "providers in network"],
                  ["32", "countries"],
                  ["18m", "average resolution"],
                ].map(([value, label]) => (
                  <div key={label} className="space-y-1">
                    <div className="text-xl font-semibold tracking-tight text-white/95">{value}</div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-white/40">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="surface-elevated overflow-hidden">
              <CardHeader className="space-y-4 border-b border-white/[0.08]">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Nearby care coordination</CardTitle>
                    <CardDescription>Sarah Johnson · Tokyo, Japan · English support</CardDescription>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-5">
                <NarrativeSteps steps={workflowSteps} />
                <div className="rounded-lg border border-white/[0.08] bg-white/[0.025] p-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/45">Recommended option</span>
                    <span className="text-[#00E5FF]">Tokyo Medical Clinic</span>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <div className="h-full w-[92%] rounded-full bg-[#00E5FF]" />
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-white/45">
                    Language support, availability, and prior outcomes align with the traveler's current context.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Narrative progression</div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {storySections.map((section) => (
              <Card key={section.title} className="group surface-subtle transition-all duration-150 hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-white/[0.035]">
                <CardHeader>
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.03] text-[#00E5FF] transition-colors group-hover:border-[#00E5FF]/30 group-hover:bg-[#00E5FF]/10">
                    <section.icon className="h-4 w-4" />
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-white/40">{section.id}</div>
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.body}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-y border-white/[0.08] bg-white/[0.015]">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="space-y-5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">How the journey unfolds</div>
              <h2 className="text-3xl font-semibold tracking-tight text-white/95">The system works on the traveler's behalf.</h2>
              <p className="max-w-xl text-sm leading-7 text-white/55">
                Each stage reveals what changed, why it matters, and what happens next without exposing technical internals.
              </p>
              <p className="max-w-xl text-sm leading-7 text-white/55">
                Assessment, care options, provider response, communication, treatment, and outcome are presented as one coherent story.
              </p>
            </div>
            <Card className="surface-elevated">
              <CardHeader>
                <CardTitle>Journey progression</CardTitle>
                <CardDescription>Progressive disclosure keeps the traveler informed without overwhelming them.</CardDescription>
              </CardHeader>
              <CardContent>
                <NarrativeSteps steps={workflowSteps} />
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-4 lg:grid-cols-3 mb-4">
            {[
              { title: "The Navigation Network", detail: "Traveler context, journey status, and next action in one coordinated view.", icon: Activity },
              { title: "Platform Views", detail: "Patient OS, Doctor OS, Pharmacist OS, Hospital OS, Organization OS, and Operator OS.", icon: Building2 },
              { title: "Documentation", detail: "Guides, examples, and implementation references designed for trust and clarity.", icon: BookOpen },
            ].map((item) => (
              <div key={item.title} className="surface-subtle rounded-lg p-4">
                <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-[#00E5FF]">
                  <item.icon className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-semibold text-white/90">{item.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-white/50">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-white/[0.1] bg-white/[0.025] p-6 lg:p-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-center">
              <div className="space-y-5">
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Built for trust</div>
                <h2 className="text-3xl font-semibold tracking-tight text-white/95">Healthcare shouldn't become harder because you crossed a border.</h2>
                <p className="max-w-2xl text-sm leading-7 text-white/55">
                  SwasthYatra helps travelers find trusted care, communicate clearly, and move forward with confidence.
                  Every journey strengthens the network, helping future travelers receive better support wherever they are.
                </p>
              </div>
              <div className="space-y-3">
                {["Start a journey", "Explore the platform views", "Read documentation", "Open interactive demo"].map((item, index) => (
                  <div key={item} className="flex items-center justify-between rounded-lg border border-white/[0.08] bg-white/[0.025] px-4 py-3">
                    <span className="text-sm text-white/80">{item}</span>
                    <span className="text-[10px] font-mono text-white/35">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 border-t border-white/[0.08] pt-6">
              <Button asChild size="sm">
                <Link href="/auth/signin">Start a Journey</Link>
              </Button>
              <Button asChild variant="raycast" size="sm">
                <Link href="/demo">Open Demo</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="border-white/[0.12] bg-white/[0.02] hover:bg-white/[0.06]">
                <Link href="/demo/docs">Open Documentation</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.08] py-8 text-center text-xs text-white/40">
        <p>SwasthYatra — Healthcare Navigation Network</p>
      </footer>
    </div>
  )
}
