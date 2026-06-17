import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ProviderSidebar } from "@/components/dashboard/provider-sidebar"

export default async function ProviderLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect("/auth/signin")

  const user = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (!user || (user.role !== "DOCTOR" && user.role !== "PHARMACIST" && user.role !== "SUPER_ADMIN")) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen">
      <ProviderSidebar />
      <main className="flex-1 ml-64 p-6">
        <div className="mx-auto max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  )
}
