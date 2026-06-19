import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { auth } from "@/lib/auth"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", weight: ["300", "400", "500", "600", "700"] })

export const metadata: Metadata = {
  title: "SwasthYatra | Global Healthcare Navigation OS",
  description: "Navigate healthcare anywhere in the world. Find medications, providers, and care across borders.",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-[#07080A] text-[#f2f2f3]`}>
        {children}
      </body>
    </html>
  )
}
