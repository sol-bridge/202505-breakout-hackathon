"use client"

import { useState } from "react"
import Link from "next/link"
import { Wallet, ArrowRight, CheckCircle, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function WalletPage() {
  const [connected, setConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  const connectWallet = () => {
    // In a real app, this would connect to a Solana wallet
    setWalletAddress("7X3cqKeSYxPU5FeznWMGxmJWLxhGt2dQ8SZEGekiY1nZ")
    setConnected(true)
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Wallet Management</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wallet className="mr-2 h-6 w-6 text-purple-600" />
            Solana Wallet Connection
          </CardTitle>
          <CardDescription>Connect your Solana wallet to receive token rewards</CardDescription>
        </CardHeader>
        <CardContent>
          {connected ? (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle>Wallet Connected</AlertTitle>
              <AlertDescription>
                Wallet Address: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="bg-amber-50 border-amber-200">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertTitle>Wallet Not Connected</AlertTitle>
              <AlertDescription>You need to connect a wallet to receive token rewards</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          {connected ? (
            <Button variant="outline" className="w-full" disabled>
              Connected
            </Button>
          ) : (
            <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={connectWallet}>
              Connect Wallet
            </Button>
          )}
        </CardFooter>
      </Card>

      <Tabs defaultValue="rewards">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="rewards">Reward History</TabsTrigger>
          <TabsTrigger value="guide">Wallet Guide</TabsTrigger>
        </TabsList>
        <TabsContent value="rewards" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Reward History</CardTitle>
              <CardDescription>History of token rewards you've earned</CardDescription>
            </CardHeader>
            <CardContent>
              {connected ? (
                <div className="space-y-4">
                  <RewardItem title="Survey Response: Product Satisfaction Survey" date="2025/05/10" amount="100 SOL" />
                  <RewardItem title="Job Application: Web Designer" date="2025/05/05" amount="500 SOL" />
                  <RewardItem
                    title="Survey Response: Local Transportation Awareness Survey"
                    date="2025/04/28"
                    amount="200 SOL"
                  />
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Connect your wallet to view reward history</p>
                  <Button className="bg-purple-600 hover:bg-purple-700" onClick={connectWallet}>
                    Connect Wallet
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="guide" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Wallet Connection Guide</CardTitle>
              <CardDescription>How to create and connect a Solana wallet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">1. Install a Wallet</h3>
                  <p className="text-sm text-gray-500">
                    Install a compatible wallet like Phantom or Solflare as a browser extension or mobile app.
                  </p>
                  <div className="flex gap-4 mt-2">
                    <Link href="https://phantom.app/" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        Phantom
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="https://solflare.com/" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        Solflare
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">2. Create a Wallet</h3>
                  <p className="text-sm text-gray-500">
                    Follow the instructions in the wallet app to create a new wallet. Store your seed phrase in a safe
                    place.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">3. Connect Your Wallet</h3>
                  <p className="text-sm text-gray-500">
                    Click the "Connect Wallet" button on our site and approve the connection in the popup.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">4. Receive Rewards</h3>
                  <p className="text-sm text-gray-500">
                    When you participate in surveys or job applications, tokens will be automatically sent to your
                    connected wallet.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function RewardItem({ title, date, amount }: { title: string; date: string; amount: string }) {
  return (
    <div className="flex justify-between items-center border-b pb-3">
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
      <div className="text-right">
        <p className="font-medium text-purple-600">{amount}</p>
        <p className="text-xs text-gray-500">Completed</p>
      </div>
    </div>
  )
}
