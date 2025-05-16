import Link from "next/link"
import { siteConfig } from "@/lib/site-config"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SlidePage() {
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
            Services
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/business">
            For Business
          </Link>
        </nav>
      </header>

      <main className="flex-1 container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">SolBridge Presentation Slides</h1>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>English Version</CardTitle>
              <CardDescription>Presentation slides in English</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-gray-500">
                Access our English presentation slides with detailed information about SolBridge platform, features, and
                business model.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                <a
                  href={siteConfig.slides.english}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  View Slides <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Japanese Version</CardTitle>
              <CardDescription>Presentation slides in Japanese</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-gray-500">
                Access our Japanese presentation slides with detailed information about SolBridge platform, features,
                and business model.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                <a
                  href={siteConfig.slides.japanese}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  View Slides <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>
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
