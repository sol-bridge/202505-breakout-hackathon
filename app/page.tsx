import Link from "next/link"
import { ArrowRight, Calendar, MapPin, Briefcase, Bell, Building, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PrivyAuth } from "@/components/privy-auth"
import { ChatWindow } from "@/components/chat-window"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            SolBridge
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 mr-4">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/services">
            Services
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/business">
            For Businesses
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Rewards
          </Link>
        </nav>
        <PrivyAuth />
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-purple-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  AI-Powered Local Information with Solana Rewards
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get information about local services, events, transportation, jobs, campaigns, and administrative
                  matters. Earn Solana tokens by participating in surveys and job applications.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/wallet">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Connect Wallet
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div>
                <ChatWindow />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Services</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our AI assistant provides various information about your local area
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <MapPin className="h-8 w-8 text-purple-600" />
                  <CardTitle className="text-xl">Local Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Get the latest information about your area, tourist spots, recommended stores, and more.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Calendar className="h-8 w-8 text-purple-600" />
                  <CardTitle className="text-xl">Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Easily search and check information about local festivals, concerts, exhibitions, and more.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Briefcase className="h-8 w-8 text-purple-600" />
                  <CardTitle className="text-xl">Job Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Search and apply for local job opportunities. Earn Solana tokens when you apply.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Bell className="h-8 w-8 text-purple-600" />
                  <CardTitle className="text-xl">Campaigns</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Check campaign information from local stores and services. Never miss a good deal.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Building className="h-8 w-8 text-purple-600" />
                  <CardTitle className="text-xl">Administrative Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Our AI explains local administrative services, procedures, and announcements in an
                    easy-to-understand way.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <FileText className="h-8 w-8 text-purple-600" />
                  <CardTitle className="text-xl">Survey Participation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">Earn Solana tokens by responding to surveys from businesses.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Reward System</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Earn Solana tokens by participating in surveys and job applications
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>How Token Rewards Work</CardTitle>
                  <CardDescription>Receive tokens on the Solana blockchain as rewards</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    When you participate in surveys or apply for jobs provided by businesses, Solana tokens will be
                    automatically sent to your wallet as compensation. Reward amounts vary depending on the business and
                    task.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/rewards">
                    <Button variant="outline">Learn More</Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>How to Connect Your Wallet</CardTitle>
                  <CardDescription>Connect your Solana wallet in 3 easy steps</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    1. Create an account
                    <br />
                    2. Install a wallet like Phantom or Solflare
                    <br />
                    3. Connect your wallet through the Connect Wallet button
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/wallet-guide">
                    <Button variant="outline">View Connection Guide</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t px-4 md:px-6">
        <p className="text-xs text-gray-500">© 2025 Solbridge. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Contact Us
          </Link>
        </nav>
      </footer>
    </div>
  )
}
