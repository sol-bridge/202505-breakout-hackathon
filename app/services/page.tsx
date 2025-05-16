import Link from "next/link"
import { ArrowRight, MessageSquare, MapPin, Gift, Globe, Users, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ServicesPage() {
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
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/services">
            <span className="text-purple-600">Services</span>
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/business">
            For Business
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/chat">
            AI Chat
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-purple-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Connecting People and Communities
                </h1>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  SolBridge is a new type of platform that provides local information using AI and revitalizes
                  communities. Rediscover the charm of your area through conversations with AI and enjoy new experiences
                  while earning points.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/chat">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Chat with AI Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* AI and Points Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Chat with AI and Earn Points</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  With SolBridge, you can not only get local information through conversations with AI but also earn
                  points. These points can be exchanged for various rewards.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="flex flex-col h-full">
                <CardHeader>
                  <div className="mb-3 w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>AI Conversation</CardTitle>
                  <CardDescription>Chat with AI specialized in local information</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-gray-500">
                    Ask our AI about local information, events, transportation, job opportunities, and more. The AI will
                    provide you with the most relevant answers.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/chat">
                    <Button variant="outline">Chat with AI</Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="flex flex-col h-full">
                <CardHeader>
                  <div className="mb-3 w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Gift className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Earn Points</CardTitle>
                  <CardDescription>Accumulate points through conversations and actions</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-gray-500">
                    Earn points through conversations with AI, responding to surveys, participating in events, and more.
                    Points are stored as Solana tokens.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/wallet">
                    <Button variant="outline">Check Wallet</Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="flex flex-col h-full">
                <CardHeader>
                  <div className="mb-3 w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Redeem Rewards</CardTitle>
                  <CardDescription>Exchange points for rewards</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-gray-500">
                    Exchange your points for discount coupons at local stores, exclusive NFTs, event participation
                    rights, and various other rewards.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/rewards">
                    <Button variant="outline">View Rewards</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Connecting People and Communities Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  A New Media Connecting People and Communities
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  SolBridge is not just a platform that provides local information, but a new form of media that
                  connects people and communities and revitalizes them.
                </p>
              </div>
            </div>

            <div className="grid gap-10 md:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 bg-purple-100 p-2 rounded-full">
                    <MapPin className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Aggregation of Local Information</h3>
                    <p className="text-gray-500 mt-2">
                      We provide a centralized source for various information such as local events, transportation,
                      tourist spots, restaurants, and administrative services. Our AI selects the most relevant
                      information and presents it to you in a personalized way.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 mr-4 bg-purple-100 p-2 rounded-full">
                    <Globe className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Multilingual Support</h3>
                    <p className="text-gray-500 mt-2">
                      We support multiple languages including English and Japanese, allowing people of various
                      nationalities to access local information. We break down language barriers to share the charm of
                      local areas with the world.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 mr-4 bg-purple-100 p-2 rounded-full">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Community Building</h3>
                    <p className="text-gray-500 mt-2">
                      We provide a place for users with the same interests or from the same area to connect and exchange
                      information. We support the revitalization of local areas and the formation of new communities.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4">SolBridge Features</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="min-w-[24px] mr-2 text-purple-600">✓</div>
                    <p className="text-gray-700">
                      <span className="font-medium">Optimal Information Provision by AI: </span>
                      We provide the most relevant local information based on your questions and interests.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-[24px] mr-2 text-purple-600">✓</div>
                    <p className="text-gray-700">
                      <span className="font-medium">Utilization of Blockchain Technology: </span>
                      We use Solana blockchain to implement a transparent point system.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-[24px] mr-2 text-purple-600">✓</div>
                    <p className="text-gray-700">
                      <span className="font-medium">Collaboration with Local Businesses: </span>
                      We collaborate with local stores and services to provide users with rewards and discounts.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-[24px] mr-2 text-purple-600">✓</div>
                    <p className="text-gray-700">
                      <span className="font-medium">Continuously Evolving Platform: </span>
                      We continuously improve our features and expand our information based on user feedback.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">How to Use SolBridge</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Here's how to get local information and earn points using SolBridge.
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-4">
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-purple-600">1</span>
                  </div>
                  <CardTitle>Create Account</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 text-center">
                    Create an account with a simple registration. You can start with just an email address.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-purple-600">2</span>
                  </div>
                  <CardTitle>Connect Wallet</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 text-center">Connect your Solana wallet to receive points.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-purple-600">3</span>
                  </div>
                  <CardTitle>Chat with AI</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 text-center">
                    Select a location, ask questions to the AI, and earn points while getting information.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-purple-600">4</span>
                  </div>
                  <CardTitle>Redeem Rewards</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 text-center">
                    Use your points to receive various rewards and discounts.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center mt-10">
              <Link href="/chat">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Here are some frequently asked questions and answers about SolBridge.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle>Can I use SolBridge for free?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Yes, basic features are available for free. Conversations with AI, viewing local information,
                    earning points, and other main features are free. Some reward exchanges or advanced features may be
                    paid.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>How can I earn points?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    You can earn points through conversations with AI, responding to surveys, participating in events,
                    referring friends, and more. You can also earn points just by logging in regularly.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Do I need a Solana wallet?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    You need a Solana wallet to receive points as Solana tokens. However, you can use basic features
                    without a wallet. We provide instructions on how to create a wallet on our site.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>What kind of local information can I get?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    We provide a wide range of local information including events, tourist spots, restaurants,
                    transportation, administrative services, job opportunities, and more. You can get the information
                    you want by asking the AI.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Which areas are supported?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Currently, we support major cities in Japan, the United States, the United Kingdom, Singapore,
                    Malaysia, UAE, and more. We plan to expand our coverage to more areas in the future.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Are there services for businesses?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Yes, we offer services for businesses including AI agent embedding, information listing services,
                    and incentivized advertising. Please see the "For Business" page for details.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-purple-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Start Using SolBridge Today
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Chat with AI to get local information while earning points to receive rewards.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/chat">
                  <Button className="bg-white text-purple-600 hover:bg-gray-100">
                    Chat with AI
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
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
