import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card } from "@/components/ui/card"

const STATUS_COLORS: Record<string, string> = {
  NEW: "bg-gray-100 text-gray-700",
  QUALIFIED: "bg-blue-100 text-blue-700",
  CONTACTED: "bg-yellow-100 text-yellow-700",
  RESPONDED: "bg-purple-100 text-purple-700",
  ONBOARDED: "bg-indigo-100 text-indigo-700",
  ACTIVE: "bg-green-100 text-green-700",
  DECLINED: "bg-red-100 text-red-700",
  DUPLICATE: "bg-orange-100 text-orange-700",
  INVALID: "bg-gray-100 text-gray-500",
  ARCHIVED: "bg-gray-100 text-gray-400",
}

export default async function AdminProviderLeads() {
  const session = await auth()
  if (!session?.user) return null

  const [leads, statusCounts] = await Promise.all([
    prisma.providerLead.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    }),
    prisma.providerLead.groupBy({ by: ["status"], _count: true }),
  ])

  const statusMap = Object.fromEntries(statusCounts.map((s) => [s.status, s._count]))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Provider Leads</h1>
        <p className="text-muted-foreground">Manage the provider lead pipeline.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {Object.entries(statusMap).map(([status, count]) => (
          <div key={status} className={`text-xs px-3 py-1.5 rounded-full font-medium ${STATUS_COLORS[status] ?? "bg-gray-100"}`}>
            {status} — {count}
          </div>
        ))}
        <div className="text-xs px-3 py-1.5 rounded-full font-medium bg-gray-100 text-gray-700">
          Total — {leads.length}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-muted-foreground">
              <th className="pb-3 font-medium">Name</th>
              <th className="pb-3 font-medium">City</th>
              <th className="pb-3 font-medium">Type</th>
              <th className="pb-3 font-medium">Source</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Phone</th>
              <th className="pb-3 font-medium">Contacted</th>
              <th className="pb-3 font-medium">Created</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b hover:bg-muted/50">
                <td className="py-2.5 font-medium">{lead.name}</td>
                <td className="py-2.5 text-muted-foreground">{lead.city ?? "—"}</td>
                <td className="py-2.5 text-muted-foreground">{lead.type}</td>
                <td className="py-2.5 text-muted-foreground">{lead.source}</td>
                <td className="py-2.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[lead.status] ?? ""}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="py-2.5 text-muted-foreground font-mono text-xs">{lead.phone ?? "—"}</td>
                <td className="py-2.5 text-muted-foreground">
                  {lead.contactedAt ? lead.contactedAt.toLocaleDateString() : "—"}
                </td>
                <td className="py-2.5 text-muted-foreground">{lead.createdAt.toLocaleDateString()}</td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={8} className="py-8 text-center text-muted-foreground">
                  No leads yet. Run a provider sync to populate the pipeline.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
