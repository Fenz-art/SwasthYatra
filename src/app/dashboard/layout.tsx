import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { ToastContainer } from "@/components/ui/toast"
import { CommandPalette } from "@/components/dashboard/command-palette"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect("/auth/signin")

  if (!session.user.onboardingCompleted) {
    redirect("/onboarding/steps/profile")
  }

  return (
    <div className="flex min-h-screen bg-[#07080A]">
      <DashboardSidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="mx-auto max-w-6xl">
          {children}
        </div>
      </main>
      <CommandPalette />
      <ToastContainer />
    </div>
  )
}
