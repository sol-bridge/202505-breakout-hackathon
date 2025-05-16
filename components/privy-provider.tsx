"use client"

import { PrivyProvider } from "@privy-io/react-auth"
import { useEffect, useState } from "react"
import type { ReactNode } from "react"

export function PrivyClientProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  if (!privyAppId) {
    console.error("NEXT_PUBLIC_PRIVY_APP_ID is not set")
    return <>{children}</>
  }

  return (
    <PrivyProvider 
      appId={privyAppId}
      config={{
        loginMethods: ["email", "google", "wallet"],
        // walletChainType: "solana-only",
        appearance: {
          theme: "light",
          accentColor: "#8b5cf6",
        },
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      {children}
    </PrivyProvider>
  )
}