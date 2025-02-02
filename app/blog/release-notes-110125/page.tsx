import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Github } from 'lucide-react';

const ReleaseNotes110125 = () => {
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
          <h1 className="text-4xl font-bold mb-10 text-center">Release Note: January 11, 2025</h1>
          <Image
            src="/images/threatx5/logo_light.png"
            alt="Threat X5 Hero"
            height="500"
            width="500"
            className="w-[1000px] h-[auto] rounded-lg shadow-lg mx-auto"
          />

          <Separator className="bg-gray-500 mx-auto" />

          <div className="mt-8 text-lg">
            <p className="mb-4">
              We’ve rolled out some updates to Threat X5 to enhance the user experience and streamline navigation. These improvements build on the foundation of the platform to make it even easier to explore and understand Advanced Persistent Threats (APTs).
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">What’s New?</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Static Blog Page Created:</strong> A dedicated blog page has been added to share insights, updates, and industry trends.
              </li>
              <li>
                <strong>Enhanced UI for APT Cards:</strong> Redesigned the APT card in <code>/aptvault/[category]/[name]/page.tsx</code> to make it visually appealing and user-friendly.
              </li>
              <li>
                <strong>Improved Navigation:</strong> Adjustments were made to the header for smoother navigation across the website.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">What’s Coming Next?</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Further UI Enhancements for APT Vault:</strong> A continued focus on improving the user interface of <code>/aptvault/[category]/[name]/page.tsx</code>.
              </li>
              <li>
                <strong>Enhanced Search Functionality:</strong> Expanding the search feature to include general search capabilities for easier content discovery.
              </li>
              <li>
                <strong>Tag-Based Navigation:</strong> Introducing a page where clicking on a category will display all APTs associated with that tag.
              </li>
              <li>
                <strong>Dynamic Blog Pages:</strong> Transitioning from manually coded blog pages to a dynamic solution where blogs will be generated from either MDX files or pulled from the Supabase database.
              </li>
              <li>
                <strong>Search Blogs Option:</strong> Adding a search feature to easily find specific blog posts from the growing collection.
              </li>
              <li>
                <strong>Separate Docs Page:</strong> A dedicated documentation website to help users and developers about Threat X5.
              </li>
            </ul>

            <p className="mt-6">
              Thank you for your continued support! If you have feedback or suggestions, please visit our <Link href="https://github.com/gsvprharsha/threatx5" target="_blank" className="text-blue-500 hover:underline">GitHub Repository</Link> to contribute or report issues.
            </p>
          </div>
        </section>
        
      </main>
    </div>
  );
};

export default ReleaseNotes110125;