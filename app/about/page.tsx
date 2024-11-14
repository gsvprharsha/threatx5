import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { Github } from 'lucide-react';
import Image from 'next/image';

const AboutPage = () => {
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

        {/* Intro Section */}
        <section className="w-full max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight">About</h1>
          <Image
            src="/images/threatx5/hero.png"
            alt="Threat X5 Hero"
            height="1200"
            width="1200"
            className="w-full h-auto rounded-lg shadow-lg"
          />
          <p className="mt-4 text-lg text-gray-300">
            Threat X5 is an open-source APT search engine and encyclopedia designed to provide detailed information on Advanced Persistent Threats (APTs).
          </p>
        </section>

        {/* What We Offer Section */}
        <section className="w-full max-w-3xl py-10 px-4">
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <ul className="space-y-3 text-gray-400 text-justify">
            <li><strong>Comprehensive APT Profiles:</strong> Detailed profiles on hundreds of APT groups, covering their origins, motives, targets, and attack techniques.</li>
            <li><strong>Search & Filtering Capabilities:</strong> Advanced search options to quickly find relevant APT information based on region, industry, malware, and more.</li>
            <li><strong>Real-Time Updates:</strong> Regular updates to ensure access to the latest APT campaigns, emerging threat actors, and changes in tactics.</li>
            <li><strong>Educational Insights and Resources:</strong> Articles, research papers, and guides on cyber threat intelligence and defense against APTs.</li>
          </ul>
        </section>

        {/* Why Choose Section */}
        <section className="w-full max-w-3xl py-10 px-4">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Threat X5?</h2>
          <ul className="space-y-3 text-gray-400 text-justify">
            <li><strong>Accuracy and Transparency:</strong> The platform is built on publicly available information and community contributions.</li>
            <li><strong>User-Centric Design:</strong> Clean, intuitive interface designed for both professionals and beginners in cybersecurity.</li>
            <li><strong>Community and Collaboration:</strong> We encourage community participation to enrich the understanding of global cyber threats. Your feedback and contributions are always welcome.</li>
          </ul>
        </section>

        {/* Who is it for Section */}
        <section className="w-full max-w-3xl py-10 px-4">
          <h2 className="text-2xl font-semibold mb-4">Who is ThreatX5 for?</h2>
          <p className="text-gray-400 leading-relaxed text-justify">
            Threat X5 is designed for cybersecurity professionals, researchers, analysts, students, and anyone interested in learning more about APTs. Whether you are conducting analysis, preparing reports, or expanding your knowledge, our platform is a valuable resource.
          </p>
        </section>

        {/* Call to Action */}
        <footer className="w-full max-w-3xl text-center py-12 px-4 border-t border-gray-700 mt-10">
          <h3 className="text-xl font-semibold mb-4">Join Us in Contributing to Cybersecurity</h3>
          <p className="text-gray-300">Your expertise and contributions are vital in enhancing our knowledge base. Contribute to Threat X5 and make a real impact.</p>
          <Button variant="secondary" className='mt-6'>
            <Link href="https://github.com/gsvprharsha/threatx5">Contribute Now</Link>
          </Button>
        </footer>
      </main>
    </div>
  );
};

export default AboutPage;