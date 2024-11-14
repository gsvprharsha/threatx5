import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Github } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0f0f10] text-white">
      <header className="bg-[#0f0f10]/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/images/threatx5/1200x1200.svg"
              alt="ThreatX5 Logo"
              width={32}
              height={32}
              className="mr-4"
            />

            <div className="text-2xl font-bold tracking-tight">
              <Link href="/">Threat X5</Link>
            </div>
          </div>

          <Button asChild className="bg-white hover:bg-[#0f0f10] text-black hover:text-white rounded-full px-6 py-2 transition-colors duration-300">
            <a href='https://github.com/gsvprharsha/threatx5' target='_blank' rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              Contribute
            </a>
          </Button>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <h1 className="text-9xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-8 text-center">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
        <Button asChild className="bg-white text-[#0f0f10] hover:bg-gray-200">
          <Link href="/">
            Return Home
          </Link>
        </Button>
      </main>
    </div>
  )
}