'use client';

import { useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

export function NoSearchToast() {
  const { toast } = useToast();

  useEffect(() => {
    const showNoSearchToast = localStorage.getItem('showNoSearchToast');
    if (showNoSearchToast === 'true') {
      toast({
        title: "Uh oh! No APT provided",
        description: "A search term required to find results",
        className: "bg-gradient-to-r from-[#000000] via-[#1a1a1a] to-[#0b1215] border-[#0f0f10] text-white custom-toast",
      });
      localStorage.removeItem('showNoSearchToast');
    }
  }, [toast]);

  return null;
}