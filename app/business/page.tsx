import Link from "next/link"
import { ArrowRight, Globe, ShoppingBag, Megaphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function BusinessPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            SolBridge
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 mr-4">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
            Home
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/business">
            <span className="text-purple-600">For Business</span>
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/chat">
            AI Chat
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-purple-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Business Solutions</h1>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Accelerate your business growth with Solbridge's technology
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-1 lg:grid-cols-3 lg:gap-12">
              {/* Service 1: AI Agent Embedding */}
              <Card className="flex flex-col h-full">
                <CardHeader className="pb-2">
                  <div className="mb-3 w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Globe className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-2xl">AI Agent Embedding</CardTitle>
                  <CardDescription>Embed customized AI agents into your business website</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-gray-500">
                    Our AI agents provide customer sales support based on your business website content and pre-entered
                    information. The integrated point system helps you increase loyal customers.
                  </p>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-purple-600 mr-2"></div>
                      <span className="text-sm">24/7 customer support</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-purple-600 mr-2"></div>
                      <span className="text-sm">Customized with business-specific information</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-purple-600 mr-2"></div>
                      <span className="text-sm">Point system to acquire repeat customers</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              {/* Service 2: Information Listing */}
              <Card className="flex flex-col h-full">
                <CardHeader className="pb-2">
                  <div className="mb-3 w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-2xl">Information Listing Service</CardTitle>
                  <CardDescription>
                    List job openings, events, and C2C sales information on our AI agent
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-gray-500">
                    Effectively promote your business's job openings and event information through Solbridge's platform.
                    Individual businesses can also list C2C sales information, salon services, and personal trainer
                    information.
                  </p>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-purple-600 mr-2"></div>
                      <span className="text-sm">Location-specific information distribution</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-purple-600 mr-2"></div>
                      <span className="text-sm">Plans for small businesses and freelancers</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-purple-600 mr-2"></div>
                      <span className="text-sm">AI-powered optimal user matching</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              {/* Service 3: Incentivized Advertising */}
              <Card className="flex flex-col h-full">
                <CardHeader className="pb-2">
                  <div className="mb-3 w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Megaphone className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-2xl">Incentivized Advertising</CardTitle>
                  <CardDescription>Innovative advertising with NFTs and crypto assets for users</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-gray-500">
                    Place advertisements with NFT or cryptocurrency incentives on the Solbridge platform. Create buzz
                    and achieve effective marketing by providing direct value to users.
                  </p>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-purple-600 mr-2"></div>
                      <span className="text-sm">Reward system using NFTs and crypto assets</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-purple-600 mr-2"></div>
                      <span className="text-sm">Transparency through blockchain technology</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-purple-600 mr-2"></div>
                      <span className="text-sm">Enhanced user engagement</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Supporting Business Growth
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Maximize your business potential with Solbridge's technology
                </p>
              </div>
              <div className="mx-auto max-w-3xl">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t px-4 md:px-6">
        <p className="text-xs text-gray-500">© 2025 SolBridge. All rights reserved.</p>
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
