'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle, Info, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link"; 
import { useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

interface BadgeType {
  text: string;
  urls: string;
}

export default function Home() {
  const [badges, setBadges] = useState<BadgeType[]>([]);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const response = await fetch("/api/badges");
        if (!response.ok) {
          throw new Error("Failed to fetch badges");
        }
        const data: BadgeType[] = await response.json(); 
        setBadges(data);
      } catch (error) {
        console.error("Error fetching badges:", error);
      }
    };
    fetchBadges();
  }, []);

  const inputRef = useRef<HTMLInputElement>(null)

  const [isSearching, startTransition] = useTransition()

  const router = useRouter()

  const [threat, setQuery] = useState<string>('')
  const searchThreat = () => {
      startTransition(() => {
          router.push(`/search?threat=${threat}`)
      })
  }

  return (
    <div className="dark min-h-screen flex flex-col items-center justify-center px-6 bg-[#0f0f10]">
      <div className="mb-4">
        <Image
          src="/images/threatx5/hero.png"
          alt="Threat X5 Logo"
          width={300}
          height={120}
        />
      </div>
      <h1 className="text-white text-5xl font-bold mb-2">
        Discover Every APT
      </h1>

      <p className="text-gray-400 font-medium text-lg mb-4">
        Unlock comprehensive intelligence and detailed profiles on global APTs.
      </p>

      <div className="w-full max-w-2xl mb-6">
      <div className="relative flex items-center gap-2 rounded-full border border-gray-800 bg-[#0c0c0c] focus:outline-none px-2 py-1">
        <Input
            type="text"
            disabled={isSearching}
            ref = {inputRef}
            value={threat}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
                if(e.key === "Enter"){
                    searchThreat()
                }
                if(e.key === "Escape") {
                    inputRef?.current?.blur()
                }
            }}
            placeholder="Search"
            className="flex-1 border-0 bg-transparent p-2 text-sm text-gray-100 focus-visible:ring-0 rounded-full font-geist-sans"
            aria-label="Search APT"
        />
        <div className="flex items-center gap-2">
            <Button disabled={ isSearching } onClick={ searchThreat } variant="default" size="icon" className="rounded-full">
            {isSearching ? <Loader2 className="h-4 w-4 animate-spin"/> : <ArrowRightCircle className="h-4 w-4" />}
            </Button>
        </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 w-full max-w-2xl mb-8">
        {badges.length > 0 ? (
          badges.map((badge, index) => (
            <Badge key={index} variant="default" className="rounded-full">
              <a href={badge.urls}>{badge.text}</a>
            </Badge>
          ))
        ) : (
          <p className="text-white">Loading latest news</p>
        )}
      </div>

      <div className="absolute top-6 right-6 flex items-center space-x-2">
        <Button variant="default" className="rounded-full h-[30px] w-[85px]">
          <a href="https://forms.gle/mskcBjzrrMLKDbuZ7" target="_blank" rel="noopener noreferrer">Feedback</a>
        </Button>
        <Button variant="outline" className="rounded-full h-[35px] w-[35px]" aria-label="Info">
        <a href="/about"><Info className="text-white" /></a>
        </Button>
        <Button variant="outline" className="rounded-full h-[35px] w-[35px]" aria-label="Github">
          <a href="https://github.com/gsvprharsha/threatx5" target="_blank" rel="noopener noreferrer"><Github className="text-white" /></a>
        </Button>
      </div>

      <div className="absolute bottom-4 w-full text-center">
        <div className="flex justify-center space-x-12">          
          <Link href="https://github.com/gsvprharsha/threatx5" className="group flex items-center text-sm text-white hover:underline">
            Github
            <ExternalLink className="ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
          
          <Link href="/about" className="group flex items-center text-sm text-white hover:underline">
            About
            <ExternalLink className="ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          <Link href="#" className="group flex items-center text-sm text-white">
            Blog (Coming soon)
          </Link>

        </div>
      </div>
    </div>
  );
}