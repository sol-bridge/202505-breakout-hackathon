"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Wallet, User } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="container mx-auto py-6 px-4 md:px-6">Loading...</div>
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-6 w-6 text-purple-600" />
              User Profile
            </CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-4">
              <img src="/abstract-geometric-shapes.png" alt="Profile" className="w-24 h-24 rounded-full" />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Login Methods</h3>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-center">
                    <User className="mr-2 h-4 w-4 text-purple-600" />
                    <span>Demo User</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4">
                <Link href="/">
                  <Button variant="outline" className="w-full" size="sm">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wallet className="mr-2 h-6 w-6 text-purple-600" />
              Wallet Status
            </CardTitle>
            <CardDescription>Your connected wallets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert className="bg-amber-50 border-amber-200">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <AlertTitle>No Wallet Connected</AlertTitle>
                <AlertDescription>Connect a wallet to receive token rewards</AlertDescription>
              </Alert>
              <div className="pt-2">
                <Link href="/wallet">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">Connect Wallet</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
