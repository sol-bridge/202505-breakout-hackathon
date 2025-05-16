import Link from "next/link"
import { ArrowLeft, Check, Code, Settings, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AIEmbedPage() {
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
            <div className="flex flex-col items-start space-y-4">
              <Link href="/business" className="flex items-center text-sm text-purple-600 mb-2">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Business Services
              </Link>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                AI Agent Embedding Service
              </h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Embed customized AI agents into your business website to provide 24/7 customer support.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-2 lg:gap-12 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Service Features</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-purple-100 p-1 rounded-full">
                      <Check className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Customizable AI Agent</h3>
                      <p className="text-gray-500 text-sm">
                        Customize the AI agent's knowledge base to match your business characteristics and services.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-purple-100 p-1 rounded-full">
                      <Check className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Simple Implementation</h3>
                      <p className="text-gray-500 text-sm">
                        Embed the AI agent into your existing website with just a few lines of code.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-purple-100 p-1 rounded-full">
                      <Check className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Point System Integration</h3>
                      <p className="text-gray-500 text-sm">
                        Award points for AI interactions to enhance customer loyalty.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-purple-100 p-1 rounded-full">
                      <Check className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Multilingual Support</h3>
                      <p className="text-gray-500 text-sm">
                        Support for multiple languages including English and Japanese to serve international businesses.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-4">Case Studies</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-purple-600">Restaurant "Sakura Dining"</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      AI handles reservation inquiries and menu recommendations 24/7. Reservations increased by 30% and
                      staff phone handling time was reduced.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-purple-600">Real Estate Agency "Future Homes"</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      AI responds to initial property inquiries, resulting in increased property viewings and improved
                      efficiency for sales representatives.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-purple-600">Online Shop "Tech Galaxy"</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      AI provides detailed product explanations and comparisons, reducing customer support inquiries by
                      40%.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold text-center mb-12">Implementation Process</h2>
            <div className="grid gap-8 md:grid-cols-4">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>1. Free Consultation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Consult with our specialists about your business needs and goals for free.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <Settings className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>2. Customization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Customize the AI agent's knowledge base and features to suit your business.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <Code className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>3. Implementation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Embed the AI agent into your website using the provided code snippet.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>4. Launch</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Launch the AI agent and monitor its effectiveness with regular analytics reports.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Pricing Plans</h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Flexible pricing plans to suit businesses of all sizes
                </p>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-3 lg:gap-12 mt-8">
              <Card className="border-2 border-gray-200">
                <CardHeader>
                  <CardTitle>Starter Plan</CardTitle>
                  <CardDescription>For small businesses</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">$199</span>
                    <span className="text-gray-500 ml-1">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Basic AI agent features
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      5,000 interactions per month
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Basic customization
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Email support
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">Subscribe</Button>
                </CardContent>
              </Card>
              <Card className="border-2 border-purple-600 relative">
                <div className="absolute top-0 right-0 bg-purple-600 text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
                  Popular
                </div>
                <CardHeader>
                  <CardTitle>Business Plan</CardTitle>
                  <CardDescription>For medium-sized businesses</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">$499</span>
                    <span className="text-gray-500 ml-1">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Advanced AI agent features
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      20,000 interactions per month
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Detailed customization
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Point system integration
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Priority email & phone support
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">Subscribe</Button>
                </CardContent>
              </Card>
              <Card className="border-2 border-gray-200">
                <CardHeader>
                  <CardTitle>Enterprise Plan</CardTitle>
                  <CardDescription>For large businesses</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">Contact Us</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      State-of-the-art AI agent features
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Unlimited interactions
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Complete customization
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Advanced point system integration
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Dedicated account manager
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      API integration
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">Contact Us</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-purple-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Contact Us</h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  For more information about our AI Agent Embedding Service, please feel free to contact us
                </p>
              </div>
              <div className="mx-auto max-w-sm w-full">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Contact Form</Button>
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
