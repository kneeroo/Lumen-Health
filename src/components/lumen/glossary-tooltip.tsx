'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { GlossaryTerm } from '@/lib/mock-visits';
import React from 'react';

export function GlossaryTooltipText({ text, terms }: { text: string; terms: GlossaryTerm[] }) {
  if (terms.length === 0) return <>{text}</>;

  // Build a single regex that matches any glossary term (longest first to avoid partial matches).
  const sorted = [...terms].sort((a, b) => b.term.length - a.term.length);
  const escaped = sorted.map((t) => t.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi');

  const parts = text.split(pattern);

  return (
    <TooltipProvider delayDuration={150}>
      {parts.map((part, i) => {
        const matched = sorted.find((t) => t.term.toLowerCase() === part.toLowerCase());
        if (!matched) return <React.Fragment key={i}>{part}</React.Fragment>;
        return (
          <Tooltip key={i}>
            <TooltipTrigger asChild>
              <span className='decoration-primary/50 cursor-help underline decoration-dotted underline-offset-4'>
                {part}
              </span>
            </TooltipTrigger>
            <TooltipContent className='max-w-xs'>
              <p className='text-xs'>{matched.definition}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </TooltipProvider>
  );
}
