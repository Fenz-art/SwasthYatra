const categories = [
  {
    emoji: "\uD83C\uDFA8",
    name: "Frontend",
    techs: [
      { name: "Next.js 16", color: "bg-black", description: "React framework with App Router and server components" },
      { name: "React 19", color: "bg-cyan-400", description: "UI library with concurrent features" },
      { name: "Tailwind CSS", color: "bg-sky-400", description: "Utility-first styling with dark theme" },
      { name: "TypeScript", color: "bg-blue-500", description: "Type-safe code across the entire stack" },
    ],
  },
  {
    emoji: "\u2699\uFE0F",
    name: "Backend",
    techs: [
      { name: "Auth.js", color: "bg-emerald-400", description: "Authentication and session management" },
      { name: "Prisma ORM", color: "bg-teal-400", description: "Type-safe database client with auto-generated types" },
      { name: "PlanetScale (Aurora PostgreSQL)", color: "bg-green-500", description: "Serverless SQL database" },
    ],
  },
  {
    emoji: "03",
    name: "Navigation Intelligence",
    techs: [
      { name: "Gemini API", color: "bg-violet-400", description: "Supports severity assessment and care plan generation" },
      { name: "LangGraph", color: "bg-purple-500", description: "Orchestration framework for multi-step care workflows" },
      { name: "Navigation Coordinator", color: "bg-fuchsia-400", description: "Custom autonomous coordination system with goal management" },
    ],
  },
  {
    emoji: "\uD83D\uDCE1",
    name: "Infrastructure & Services",
    techs: [
      { name: "Upstash Redis", color: "bg-red-400", description: "Rate limiting, caching, and queue management" },
      { name: "Twilio", color: "bg-rose-400", description: "WhatsApp messaging and voice communication" },
      { name: "LiveKit", color: "bg-pink-400", description: "Real-time video and audio for interpreter sessions" },
      { name: "AWS S3 (Tigris)", color: "bg-orange-400", description: "File storage for medical records and documents" },
    ],
  },
  {
    emoji: "\uD83D\uDCCA",
    name: "Observability",
    techs: [
      { name: "OpenTelemetry", color: "bg-amber-400", description: "Distributed tracing across all services" },
      { name: "Sentry", color: "bg-yellow-400", description: "Error tracking and performance monitoring" },
      { name: "PostHog", color: "bg-orange-500", description: "Product analytics and user behavior tracking" },
      { name: "Custom Metrics", color: "bg-lime-400", description: "Provider network KPIs and outcome tracking" },
    ],
  },
  {
    emoji: "\uD83D\uDD27",
    name: "Developer Experience",
    techs: [
      { name: "Turbopack", color: "bg-stone-400", description: "Lightning-fast local development server" },
      { name: "ESLint + Prettier", color: "bg-indigo-400", description: "Consistent code quality and formatting" },
      { name: "pnpm", color: "bg-amber-500", description: "Fast, disk-efficient package management" },
    ],
  },
]

export default function TechStackPage() {
  return (
    <div className="max-w-4xl mx-auto pt-4">
      <h1 className="text-3xl font-bold mb-2">Built With</h1>
      <p className="text-sm text-white/50 mb-8">
        The technology stack powering SwasthYatra
      </p>

      {categories.map((category) => (
        <section key={category.name} className="mb-10">
          <h2 className="text-lg font-semibold text-white mb-4">
            <span className="inline-block text-white/90">
              {category.emoji} {category.name}
            </span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {category.techs.map((tech) => (
              <div
                key={tech.name}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`inline-block w-2 h-2 rounded-full ${tech.color}`} />
                  <span className="text-sm font-semibold text-white/90">{tech.name}</span>
                </div>
                <p className="text-xs text-white/60">{tech.description}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
