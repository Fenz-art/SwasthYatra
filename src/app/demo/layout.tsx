import Link from "next/link"
import DemoControls from "@/components/demo-controls"

export const metadata = {
  title: "SwasthYatra Demo",
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#07080A] text-white">
      <nav className="border-b border-white/10 px-6 py-3 flex items-center justify-between">
        <Link href="/demo" className="flex items-center gap-2">
          <span className="text-xl font-bold text-[#E6FBFF]">SwasthYatra</span>
          <span className="text-xs text-white/40 border border-white/20 px-2 py-0.5 rounded-full">Demo</span>
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/demo/scenarios" className="text-white/60 hover:text-white transition">Scenarios</Link>
          <Link href="/demo/agent-workspace" className="text-white/60 hover:text-white transition">Assistant</Link>
          <Link href="/demo/architecture" className="text-white/60 hover:text-white transition">Architecture</Link>
          <Link href="/demo/pitch" className="text-white/60 hover:text-white transition">Pitch</Link>
          <Link href="/demo/judge" className="text-white/60 hover:text-white transition">Judge</Link>
          <Link href="/demo/judge-script" className="text-white/60 hover:text-white transition">Script</Link>
          <Link href="/demo/system" className="text-white/60 hover:text-white transition">System</Link>
          <Link href="/demo/tech-stack" className="text-white/60 hover:text-white transition">Stack</Link>
          <Link href="/demo/docs" className="text-white/60 hover:text-white transition">Docs</Link>
          <Link href="/demo/testing-guide" className="text-white/60 hover:text-white transition">Test</Link>
        </div>
      </nav>
      <main className="p-6">{children}</main>
      <DemoControls />
    </div>
  )
}
