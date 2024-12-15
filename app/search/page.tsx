'use client';

import { useEffect, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import Loading from '@/components/ui/loading';
import Image from 'next/image';
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";


const SearchPage = () => {
  const [exactResult, setExactResult] = useState<{ name: string; description: string; category: string } | null>(null);
  const [otherResults, setOtherResults] = useState<{ name: string; description: string; category: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLinkLoading, setIsLinkLoading] = useState(false);
  const { toast } = useToast()

  useEffect(() => {
    const searchQuery = new URLSearchParams(window.location.search).get('threat');
    if (searchQuery) {
      fetchResults(searchQuery);
    } else {
      localStorage.setItem('showNoSearchToast', 'true');
      redirect('/');
      
    }
  }, []);

  const fetchResults = async (query: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/search?threat=${query}`);
      if (!response.ok) {
        setError('Error fetching data');
        return;
      }

      const data = await response.json();

      if (data && data.exactMatch && data.otherResults) {
        setExactResult(data.exactMatch[0] || null);
        setOtherResults(data.otherResults);
      } else {
        setError('Unexpected data format');
      }
    } catch (error) {
      console.log(error)
      setError('An error occurred while fetching the data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLinkClick = () => {
    setIsLinkLoading(true);
  };

  return (
    <div className="min-h-screen bg-[#0f0f10] text-white relative">
      {(isLoading || isLinkLoading) && (
        <div className="fixed inset-0 bg-[#0f0f10] bg-opacity-50 flex justify-center items-center z-50">
          <Loading />
        </div>
      )}

      <header className="bg-[#0f0f10]/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/images/threatx5/1200x1200.svg"
              alt="ThreatX5 Logo"
              width={32}  // Specify the width
              height={32}  // Specify the height
              className="mr-4"
            />
            <div className="text-2xl font-bold tracking-tight">
              <Link href="/">Threat X5</Link>
            </div>
          </div>

          <Button className="bg-white hover:bg-[#0f0f10] text-black hover:text-white rounded-full px-6 py-2 transition-colors duration-300">
            <Github />
            <a href="https://github.com/gsvprharsha/threatx5" target="_blank">Contribute</a>
          </Button>
        </div>
      </header>

      <main className="py-12">
        <div className="min-h-screen bg-[#0f0f10] text-white py-12">
          <div className="max-w-3xl mx-auto px-6 lg:px-10">
            {isLoading ? (
              <p className="text-center mt-0">Loading...</p>
            ) : error ? (
              <div className="flex flex-col items-center justify-center mt-20">
                <h1 className="text-center text-5xl font-medium">Error: {error}</h1>
                <Button variant="secondary" className="justify-center mt-6">
                  <Github />
                  <a href="https://github.com/gsvprharsha" target="_blank">Contribute</a>
                </Button>
              </div>
            ) : (
              <>
                {exactResult ? (
                  <div className="group relative pb-6">
                    <h2 className="text-3xl font-semibold mb-4">Search Results</h2>
                    <h2 className="text-2xl font-semibold mb-2 flex items-center group-hover:text-blue-400">
                      <a
                        href={`/aptvault/${exactResult.category}/${exactResult.name}`}
                        onClick={handleLinkClick}
                        className="hover:underline flex items-center">
                        {exactResult.name}
                      </a>
                      <ExternalLink className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </h2>
                    <p className="text-gray-400">{exactResult.description}</p>
                  </div>
                ) : (
                  <p className="text-center mt-4">No exact match found</p>
                )}

                <h2 className="text-2xl font-semibold mt-8 mb-4">Other APTs</h2>
                {otherResults.length === 0 ? (
                  <p className="text-center">No other results found</p>
                ) : (
                  otherResults.map((result, index) => (
                    <div
                      key={index}
                      className="group relative border-b border-gray-800/50 pb-6 last:border-b-0 transition-all duration-300"
                    >
                      <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors duration-300">
                        <a
                          href={`/aptvault/${result.category}/${result.name}`}
                          onClick={handleLinkClick}
                          className="hover:underline flex items-center mt-4"
                        >
                          {result.name}
                          <ExternalLink className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </a>
                      </h2>
                      <p className="text-gray-400">{result.description}</p>
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchPage;