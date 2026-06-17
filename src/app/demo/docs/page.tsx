import Link from "next/link"

export default function DocsPage() {
  return (
    <div className="max-w-5xl mx-auto pt-4">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-white">Documentation Hub</h1>
        <p className="text-sm text-white/40 mt-1.5">Context, examples, and outcomes for each journey workflow</p>
      </div>

      {/* 1. Quick Start */}
      <section className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-sm font-semibold text-white mb-4 tracking-wide">Quick Start</h2>
        <div className="bg-black/40 rounded-lg p-4 overflow-x-auto mb-4">
          <pre className="text-[13px] font-mono leading-relaxed">
            <span className="text-cyan-400">swasthyatra</span>{' '}
            <span className="text-white/80">demo:start --scenario tokyo-food-poisoning</span>
            {'\n'}
            <span className="text-emerald-400"># → Journey created for Sarah Johnson</span>
            {'\n'}
            <span className="text-emerald-400"># → Severity: MEDIUM</span>
            {'\n'}
            <span className="text-emerald-400"># → Pathway: PHARMACY</span>
          </pre>
        </div>
        <div className="bg-black/40 rounded-lg p-4 overflow-x-auto">
          <pre className="text-[13px] font-mono leading-relaxed">
            <span className="text-cyan-400">const</span>{' '}
            <span className="text-white/80">journey = </span>
            <span className="text-cyan-400">await</span>{' '}
            <span className="text-white/80">swasthyatra.journey.</span>
            <span className="text-amber-300">create</span>
            <span className="text-white/80">({'{'}</span>
            {'\n'}
            {'  '}<span className="text-purple-300">country</span>: <span className="text-emerald-300">&quot;Japan&quot;</span>,{'\n'}
            {'  '}<span className="text-purple-300">symptoms</span>: [<span className="text-emerald-300">&quot;vomiting&quot;</span>, <span className="text-emerald-300">&quot;diarrhea&quot;</span>]{'\n'}
            <span className="text-white/80">{'}'})</span>
            {'\n'}{'\n'}
            <span className="text-cyan-400">const</span>{' '}
            <span className="text-white/80">{'{'} severity, pathway {'}'} = </span>
            <span className="text-cyan-400">await</span>{' '}
            <span className="text-white/80">swasthyatra.severity.</span>
            <span className="text-amber-300">assess</span>
            <span className="text-white/80">({'{'}</span>
            {'\n'}
            {'  '}<span className="text-purple-300">symptoms</span>: journey.symptoms,{'\n'}
            {'  '}<span className="text-purple-300">travelHistory</span>: journey.country{'\n'}
            <span className="text-white/80">{'}'})</span>
            {'\n'}
            <span className="text-emerald-400">// → severity: &quot;MEDIUM&quot;, pathway: &quot;PHARMACY&quot;</span>
          </pre>
        </div>
      </section>

      <div className="border-t border-white/10 pt-8 mt-8" />

      {/* 2. Platform Flow */}
      <section className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-sm font-semibold text-white mb-4 tracking-wide">Platform Flow</h2>
        <div className="bg-black/40 rounded-lg p-4 overflow-x-auto">
          <pre className="text-[13px] font-mono leading-relaxed text-white/70">
{`┌─────────────────────────────────────────┐
│           Healthcare Navigation         │
│  ┌──────────┐  ┌────────────────────┐   │
│  │ Traveler  │→│  Severity Review    │   │
│  └──────────┘  └────────┬───────────┘   │
│                         ▼                │
│  ┌────────────────────────────────┐      │
│  │      Provider Coordination     │      │
│  │  Search → Rank → Match → Send  │      │
│  └────────────────┬───────────────┘      │
│                   ▼                      │
│  ┌────────────────────────────────┐      │
│  │    Communication Network       │      │
│  │  WhatsApp → Voice → SMS        │      │
│  └────────────────┬───────────────┘      │
│                   ▼                      │
│  ┌────────────────────────────────┐      │
│  │      Provider OS / Care        │      │
│  │  Assign → Treat → Follow-up    │      │
│  └────────────────┬───────────────┘      │
│                   ▼                      │
│  ┌────────────────────────────────┐      │
│  │          Care Outcomes         │      │
│  │  Record → Analyze → Learn      │      │
│  └────────────────────────────────┘      │
└─────────────────────────────────────────┘`}
          </pre>
        </div>
      </section>

      <div className="border-t border-white/10 pt-8 mt-8" />

      {/* 3. Navigation Activity */}
      <section className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-sm font-semibold text-white mb-4 tracking-wide">Navigation Activity</h2>
        <div className="bg-black/40 rounded-lg p-4">
          {[
            { step: 'Load Context', result: 'Context loaded for Sarah Johnson' },
            { step: 'Assess Severity', result: 'Severity: MEDIUM (score: 4.2)' },
            { step: 'Route Pathway', result: 'Pathway: PHARMACY (confidence: 91%)' },
            { step: 'Search Providers', result: 'Found 24 providers in Tokyo' },
            { step: 'Rank Providers', result: 'Top score: Tokyo Medical Clinic (92)' },
            { step: 'Send Outreach', result: 'WhatsApp sent ✓' },
            { step: 'Create Assignment', result: 'Assigned to Tokyo Medical Clinic' },
            { step: 'Record Outcome', result: 'Recovered (6h) ✓' },
          ].map((item, i) => (
            <div key={i} className={`font-mono text-[13px] ${i < 7 ? 'border-b border-white/10 pb-2 mb-2' : ''}`}>
              <span className="text-cyan-400">▶</span>{' '}
              <span className="text-white font-medium">{item.step}</span>
              <span className="text-white/40 ml-3">{item.result}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-white/10 pt-8 mt-8" />

      {/* 4. Workflow Library */}
      <section>
        <h2 className="text-sm font-semibold text-white mb-4 tracking-wide">Workflow Library</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: '01', title: 'Food Poisoning Workflow', desc: 'Complete navigation for food poisoning: triage -> pharmacy -> rehydration -> follow-up' },
            { icon: '02', title: 'Medication Refill Workflow', desc: 'Prescription verification -> local equivalent lookup -> provider assignment -> fulfillment' },
            { icon: '03', title: 'Emergency Escalation Workflow', desc: 'High severity detected -> urgent care routing -> concierge coordination' },
            { icon: '04', title: 'Provider Assignment Workflow', desc: 'Provider search -> ranking -> outreach -> acceptance -> onboarding' },
            { icon: '05', title: 'Interpreter Workflow', desc: 'Language detection -> interpreter matching -> real-time translation -> session recording' },
          ].map((card, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/[0.03] p-5 flex flex-col">
              <div className="mb-3 inline-flex h-7 w-7 items-center justify-center rounded border border-white/15 bg-white/[0.04] text-[10px] font-mono text-white/60">{card.icon}</div>
              <h3 className="text-sm font-semibold text-white mb-2">{card.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed mb-4 flex-1">{card.desc}</p>
              <Link href="/demo/architecture" className="text-xs text-cyan-400 hover:text-cyan-300 transition font-medium">
                View →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-white/10 pt-8 mt-8" />

      {/* 5. API Reference */}
      <section className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-sm font-semibold text-white mb-4 tracking-wide">API Reference</h2>
        <div className="space-y-4">
          {[
            {
              endpoint: 'POST /api/journey/create',
              body: `{\n  "country": "Japan",\n  "symptoms": ["vomiting", "diarrhea"]\n}`,
              response: `→ { "journeyId": "jrn_abc", "severity": "MEDIUM", "pathway": "PHARMACY" }`,
            },
            {
              endpoint: 'POST /api/provider/search',
              body: `{\n  "city": "Tokyo",\n  "specialty": "PHARMACY",\n  "language": "English"\n}`,
              response: `→ [{ "id": "prov_1", "name": "Tokyo Medical Clinic", "score": 92 }]`,
            },
            {
              endpoint: 'POST /api/outcome/record',
              body: `{\n  "journeyId": "jrn_abc",\n  "result": "RECOVERED",\n  "recoveryHours": 6\n}`,
              response: `→ { "recorded": true, "careOutcomesUpdated": true }`,
            },
          ].map((api, i) => (
            <div key={i} className="bg-black/40 rounded-lg p-4 overflow-x-auto">
              <pre className="text-[13px] font-mono leading-relaxed">
                <span className="text-cyan-400">{api.endpoint}</span>
                {'\n'}
                <span className="text-white/70">{api.body}</span>
                {'\n'}
                <span className="text-emerald-400">{api.response}</span>
              </pre>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-white/10 pt-8 mt-8" />

      {/* 6. SDK Reference */}
      <section className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-sm font-semibold text-white mb-4 tracking-wide">SDK Reference</h2>
        <div className="bg-black/40 rounded-lg p-4 overflow-x-auto">
          <pre className="text-[13px] font-mono leading-relaxed">
            <span className="text-emerald-400">// Provider Search</span>
            {'\n'}
            <span className="text-cyan-400">await</span>{' '}
            <span className="text-white/80">swasthyatra.provider.</span>
            <span className="text-amber-300">search</span>
            <span className="text-white/80">({'{'} city, specialty, language {'}'})</span>
            {'\n'}
            <span className="text-cyan-400">await</span>{' '}
            <span className="text-white/80">swasthyatra.provider.</span>
            <span className="text-amber-300">rank</span>
            <span className="text-white/80">(providers, {'{'} openNow, acceptsInsurance {'}'})</span>
            {'\n'}
            <span className="text-cyan-400">await</span>{' '}
            <span className="text-white/80">swasthyatra.provider.</span>
            <span className="text-amber-300">outreach</span>
            <span className="text-white/80">({'{'} providerId, channel {'}'})</span>
            {'\n'}
            <span className="text-cyan-400">await</span>{' '}
            <span className="text-white/80">swasthyatra.provider.</span>
            <span className="text-amber-300">assign</span>
            <span className="text-white/80">({'{'} providerId, journeyId {'}'})</span>
            {'\n'}{'\n'}
            <span className="text-emerald-400">// Communication</span>
            {'\n'}
            <span className="text-cyan-400">await</span>{' '}
            <span className="text-white/80">swasthyatra.communication.</span>
            <span className="text-amber-300">send</span>
            <span className="text-white/80">({'{'} conversationId, message {'}'})</span>
            {'\n'}
            <span className="text-cyan-400">await</span>{' '}
            <span className="text-white/80">swasthyatra.communication.</span>
            <span className="text-amber-300">translate</span>
            <span className="text-white/80">({'{'} text, source, target {'}'})</span>
            {'\n'}{'\n'}
            <span className="text-emerald-400">// Outcomes</span>
            {'\n'}
            <span className="text-cyan-400">await</span>{' '}
            <span className="text-white/80">swasthyatra.outcome.</span>
            <span className="text-amber-300">record</span>
            <span className="text-white/80">({'{'} assignmentId, result, recoveryHours {'}'})</span>
            {'\n'}
            <span className="text-cyan-400">await</span>{' '}
            <span className="text-white/80">swasthyatra.outcome.</span>
            <span className="text-amber-300">stats</span>
            <span className="text-white/80">({'{'} providerId {'}'})</span>
          </pre>
        </div>
      </section>
    </div>
  )
}
