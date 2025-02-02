import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

const BlogMainPage = () => {
  return (
    <div className="min-h-screen bg-[#0f0f10] text-white">
      <header className="bg-[#0f0f10]/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/images/threatx5/1200x1200.svg"
              alt="ThreatX5 Logo"
              height="100"
              width="100"
              className="h-8 w-8 mr-4"
            />
            <div className="text-2xl font-bold tracking-tight"><Link href="/">Threat X5</Link></div>
          </div>

          <Button className="bg-white hover:bg-[#0f0f10] text-black hover:text-white rounded-full px-6 py-2 transition-colors duration-300">
            <Github /><Link href='https://github.com/gsvprharsha/threatx5' target='_blank'>Contribute</Link>
          </Button>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-4 py-16">

        {/* Blogs Section */}
        <section className="w-full max-w-4xl">
          <h1 className="text-4xl font-bold mb-10 text-center">Blogs</h1>
          <Image
            src="/images/threatx5/logo_light.png"
            alt="Threat X5 Hero"
            height="1000"
            width="1000"
            className="w-[1000px] h-[auto] rounded-lg shadow-lg mx-auto"
          />
          <Link className="text-3xl font-semibold mt-4 ml-3 group flex items-center text-white hover:underline" href="/blog/release-notes-110125">
            
            Release Notes: Threat X5 - January 11, 2025

          <ExternalLink className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          </Link>
          <p className="space-y-3 ml-3 mt-2 text-gray-400"> We’ve rolled out some updates to Threat X5 to enhance the user experience and streamline navigation. These improvements build on the foundation of the platform to make it even easier to explore and understand Advanced Persistent Threats (APTs).</p>
         
          <div className="flex justify-between items-center mt-2 mb-5 text-gray-400 text-sm">
            <p className="ml-3">Author: GSV Prharsha</p>
            <p className="mr-3">Date Posted: 12/12/2024</p>
          </div>

          <Separator className="bg-gray-500 mx-auto" />
        </section>

      </main>
    </div>
  );
};

export default BlogMainPage;