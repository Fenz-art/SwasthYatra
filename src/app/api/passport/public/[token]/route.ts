import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const passport = await prisma.healthPassport.findUnique({ where: { shareToken: token } })
  
  if (!passport) return NextResponse.json({ error: "Not found" }, { status: 404 })
  if (passport.expiresAt && passport.expiresAt < new Date()) return NextResponse.json({ error: "Link expired" }, { status: 403 })

  await prisma.passportAuditLog.create({
    data: { passportId: passport.id, action: "VIEWED", accessorIp: req.headers.get("x-forwarded-for") || "unknown" }
  })

  return NextResponse.json({ data: passport.data })
}
