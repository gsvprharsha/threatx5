'use client'
import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Github } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { redirect, useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useRouter } from 'next/navigation';
import Loading from '@/components/ui/loading';

const AptPage = () => {
  const { category, name } = useParams();
  const [data, setData] = useState<{
    name: string;
    status: string;
    category: string;
    threatLevel: string;
    toolsUsed: { tools: string[] };
    notableIncidents: { notableIncidents: string[] };
    x5Code: string | null;
    aptLogo: string | null;
    dateDiscovered: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [sections, setSections] = useState<{ section: string, subsections: string[] }[]>([]);
  const router = useRouter();
  console.log(router)

  useEffect(() => {
    if (category && name) {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/aptData?category=${category}&name=${name}`);
          const result = await response.json();

          if (response.ok && result.length > 0) {
            setData(result[0]);
          } else {
            redirect('/404/');
          }
        } catch (err) {
          console.log(err)
          redirect('/404/');
        } finally {
          setLoading(false);
        }
      };

      const fetchMarkdown = async () => {
        try {
          const mdResponse = await fetch(`/maindata/${category}/${name}.md`);
          if (!mdResponse.ok) throw new Error('Markdown file not found');
          const mdText = await mdResponse.text();
          setMarkdownContent(mdText);
          const parsedSections = parseMarkdown(mdText);
          setSections(parsedSections);
        } catch (err) {
          console.log(err)
          redirect('/404/');
        }
      };

      fetchData();
      fetchMarkdown();
    }
  }, [category, name]);

  const parseMarkdown = (mdText: string) => {
    const lines = mdText.split('\n');
    const tempSections: { section: string, subsections: string[] }[] = [];
    let currentSection: { section: string, subsections: string[] } | null = null;

    lines.forEach((line) => {
      if (line.startsWith('# ')) {
        if (currentSection) tempSections.push(currentSection);
        currentSection = { section: line.slice(2).trim(), subsections: [] };
      } else if (line.startsWith('## ') && currentSection) {
        currentSection.subsections.push(line.slice(3).trim());
      }
    });

    if (currentSection) tempSections.push(currentSection);
    return tempSections;
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const badgeVariant = data?.status === 'Inactive' ? 'lowthreat' : 'destructive';

  const threatLevelBadge = data?.threatLevel === 'High'
    ? 'destructive'
    : data?.threatLevel === 'Medium'
    ? 'mediumthreat'
    : 'lowthreat';

  return (
    <div className="min-h-screen bg-[#0f0f10] text-gray-300">
      <header className="bg-[#0f0f10]/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="w-full px-6 lg:px-10 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src='/images/threatx5/1200x1200.svg'
              alt="Logo"
              height="100"
              width="100"
              className="h-8 w-8 mr-4"
            />
            <div className="text-2xl font-bold tracking-tight text-white"><Link href='/'>Threat X5</Link></div>
          </div>
          <Button className="bg-white hover:bg-[#0f0f10] text-black hover:text-white rounded-full px-6 py-2 transition-colors duration-300">
          <Github /><a href="https://github.com/gsvprharsha/threatx5">Contribute</a>
          </Button>
        </div>
      </header>

      <main className="py-1">
        <div className="grid grid-cols-[250px_1fr_300px] divide-x divide-gray-700">
          <div className="h-screen overflow-auto sticky top-[50px] z-20 p-6 max-h-[calc(100vh-64px)]">
            <h2 className="text-lg font-semibold mb-4 text-white">Table of Contents</h2>
            <nav className="space-y-1">
              {sections.map((section, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="font-semibold text-gray-300">{section.section}</div>
                  <ul className="space-y-1 pl-4 text-gray-400">
                    {section.subsections.map((subsection, subIdx) => (
                      <li key={subIdx}>
                        <Link href={`#${subsection.replace(/\s+/g, '-')}`} className="hover:text-white">{subsection}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <div className="min-h-screen p-6 lg:p-10">
            <div className="space-y-2 mb-8">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <p>{data?.category ? data?.category.charAt(0).toUpperCase() + data?.category.slice(1) : ''}</p>
                <ChevronRight className="h-4 w-4" />
                <span>{data?.name}</span>
              </div>
            </div>

            <div className="prose prose-invert max-w-none text-justify">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]} 
                rehypePlugins={[rehypeRaw]}
                components={{
                  h1: ({ ...props }) => <h1 className="text-3xl font-bold leading-relaxed" {...props} />,
                  h2: ({ ...props }) => <h2 className="text-2xl font-semibold leading-relaxed" {...props} />,
                  h3: ({ ...props }) => <h3 className="text-xl font-semibold leading-relaxed" {...props} />,
                  p: ({ ...props }) => <p className="text-sm leading-[2.0]" {...props} />,
                  ol: ({ ...props }) => <ol className="list-decimal list-inside leading-[2.0]" {...props} />
                }}
              >
                {markdownContent}
              </ReactMarkdown>
            </div>
          </div>
          
          <div className="h-screen overflow-hidden sticky top-[50px] z-20 p-6 max-h-[calc(100vh-64px)]">
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <Image
                  src="/images/threatx5/1200x1200.svg"
                  alt="Profile"
                  width={150}
                  height={150}
                  className="rounded-full"
                />
                <h2 className="text-lg font-semibold mt-4 text-white">{data?.name}</h2>
                <Badge variant={badgeVariant} className="mt-2 rounded-full">{data?.status}</Badge>
              </div>

              <Separator className="bg-gray-800" />

              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-gray-400">Threat level:</span>
                  <Badge variant={threatLevelBadge} className="w-fit rounded-full">{data?.threatLevel}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-gray-400">Date Discovered:</span>
                  <span>{data?.dateDiscovered}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-gray-400">Tools used:</span>
                  <div>
                    <ul className="list-disc list-inside text-sm">
                      {data?.toolsUsed?.tools && data.toolsUsed.tools.length > 0 ? (
                        data.toolsUsed.tools.map((tool, index) => (
                          <li key={index} className="text-sm">{tool}</li>
                        ))
                      ) : (
                        <li>Loading tools...</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              <Separator className="bg-gray-800" />

              <div>
                <h3 className="font-semibold text-white mb-2 text-center bg-gray-800">Notable incidents</h3>
                <ul className="space-y-2 text-sm flex flex-col items-center justify-center">
                  {data?.notableIncidents?.notableIncidents && data.notableIncidents.notableIncidents.length > 0 ? (
                    data.notableIncidents.notableIncidents.map((incident, index) => (
                      <li key={index} className="text-sm text-center">{incident}</li>
                    ))
                  ) : (
                    <li>Loading incidents...</li>
                  )}
                </ul>
              </div>

              <Separator className="bg-gray-800" />

              <div className="grid grid-cols-2 text-sm text-center">
                <span className="text-white">X5 Code</span>
                <span className="flex justify-start">{data?.x5Code}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AptPage;
