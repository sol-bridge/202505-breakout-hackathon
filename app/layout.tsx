import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { PrivyClientProvider } from "@/components/privy-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SolBridge - AI-Powered Local Information",
  description:
    "AI-powered assistant for local information, events, transportation, jobs, campaigns, and administrative information. Earn Solana tokens by participating in surveys and job applications.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <PrivyClientProvider>
            {children}
          </PrivyClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
