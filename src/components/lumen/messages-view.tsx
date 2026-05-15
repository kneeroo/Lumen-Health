'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import { Icons } from '@/components/icons';
import { PENDING_QUESTION_KEY, type PendingQuestion } from '@/components/lumen/ask-question-button';
import type { Message, Thread } from '@/lib/mock-messages';
import { useEffect, useMemo, useRef, useState } from 'react';

function initialsFromName(name: string): string {
  return name
    .replace(/^(Dr\.?\s+)/i, '')
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function MessagesView({ initialThreads }: { initialThreads: Thread[] }) {
  const [threads, setThreads] = useState<Thread[]>(initialThreads);
  const [activeId, setActiveId] = useState<string>(initialThreads[0]?.id ?? '');
  const [draft, setDraft] = useState('');
  const composerRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = window.sessionStorage.getItem(PENDING_QUESTION_KEY);
    if (!raw) return;
    let ctx: PendingQuestion;
    try {
      ctx = JSON.parse(raw);
    } catch {
      window.sessionStorage.removeItem(PENDING_QUESTION_KEY);
      return;
    }
    window.sessionStorage.removeItem(PENDING_QUESTION_KEY);

    const newThreadId = `t-question-${ctx.visitId}-${Date.now()}`;
    const newThread: Thread = {
      id: newThreadId,
      from: ctx.clinician,
      role: ctx.clinicianTitle,
      initials: initialsFromName(ctx.clinician),
      topic: `Question about ${ctx.visitTopic}`,
      lastDate: 'Just now',
      messages: []
    };
    setThreads((prev) => [newThread, ...prev]);
    setActiveId(newThreadId);
    setDraft(
      `Hi ${ctx.clinician.split(' ').slice(0, 2).join(' ')}, I had a question about my ${ctx.visitTopic.toLowerCase()} visit on ${ctx.visitDate}: `
    );
    setTimeout(() => composerRef.current?.focus(), 50);
  }, []);

  const active = useMemo(() => threads.find((t) => t.id === activeId), [threads, activeId]);
  const unreadCount = threads.filter((t) => t.unread && t.id !== activeId).length;

  function selectThread(id: string) {
    setActiveId(id);
    setThreads((prev) => prev.map((t) => (t.id === id ? { ...t, unread: false } : t)));
  }

  function startNewConversation() {
    const newThreadId = `t-new-${Date.now()}`;
    const newThread: Thread = {
      id: newThreadId,
      from: 'Care team',
      role: 'Clinic',
      initials: 'CT',
      topic: 'New message',
      lastDate: 'Just now',
      messages: []
    };
    setThreads((prev) => [newThread, ...prev]);
    setActiveId(newThreadId);
    setDraft('');
    setTimeout(() => composerRef.current?.focus(), 50);
  }

  function sendReply() {
    const text = draft.trim();
    if (!text || !active) return;
    const newMessage: Message = {
      id: 'm-' + Date.now(),
      sender: 'patient',
      body: text,
      sentAt: 'Just now'
    };
    setThreads((prev) =>
      prev.map((t) =>
        t.id === active.id
          ? { ...t, messages: [...t.messages, newMessage], lastDate: 'Just now' }
          : t
      )
    );
    setDraft('');
  }

  return (
    <Card className='flex h-[calc(100svh-13rem)] max-h-[640px] min-h-[360px] flex-col overflow-hidden p-0'>
      {/* Thread switcher header */}
      <header className='border-border/60 flex items-center gap-3 border-b px-4 py-3'>
        {active ? (
          <>
            <Avatar className='size-9 shrink-0'>
              <AvatarFallback className='bg-primary/10 text-primary text-xs font-medium'>
                {active.initials}
              </AvatarFallback>
            </Avatar>
            <div className='min-w-0 flex-1'>
              <div className='truncate text-sm font-medium'>{active.from}</div>
              <div className='text-muted-foreground truncate text-xs'>
                {active.role} · {active.topic}
              </div>
            </div>
          </>
        ) : (
          <div className='text-muted-foreground flex-1 text-sm'>No conversation selected</div>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' size='sm' className='shrink-0 gap-1.5'>
              <Icons.chat className='size-3.5' />
              <span className='hidden sm:inline'>Switch</span>
              {unreadCount > 0 && (
                <Badge variant='secondary' className='ml-0.5 h-4 px-1.5 text-[10px]'>
                  {unreadCount}
                </Badge>
              )}
              <Icons.chevronDown className='size-3.5' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-80'>
            <DropdownMenuLabel className='text-muted-foreground text-xs font-normal'>
              Your conversations
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {threads.map((t) => {
              const isActive = t.id === activeId;
              return (
                <DropdownMenuItem
                  key={t.id}
                  onSelect={() => selectThread(t.id)}
                  className={`flex items-start gap-3 py-2 ${isActive ? 'bg-muted/60' : ''}`}
                >
                  <Avatar className='size-8 shrink-0'>
                    <AvatarFallback className='bg-primary/10 text-primary text-xs font-medium'>
                      {t.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className='min-w-0 flex-1'>
                    <div className='flex items-baseline justify-between gap-2'>
                      <span className='truncate text-sm font-medium'>{t.from}</span>
                      {t.unread && (
                        <Badge variant='secondary' className='shrink-0 text-[10px]'>
                          New
                        </Badge>
                      )}
                    </div>
                    <div className='text-muted-foreground truncate text-xs'>{t.topic}</div>
                    <div className='text-muted-foreground/80 mt-0.5 truncate text-[11px]'>
                      {t.lastDate}
                    </div>
                  </div>
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={startNewConversation} className='gap-2 py-2'>
              <Icons.add className='size-4' />
              <span className='text-sm font-medium'>New conversation</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Conversation pane */}
      <section className='flex min-h-0 flex-1 flex-col'>
        {active ? (
          <>
            <div className='min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4'>
              {active.messages.length === 0 ? (
                <div className='text-muted-foreground flex h-full items-center justify-center text-sm'>
                  No messages yet. Start the conversation below.
                </div>
              ) : (
                active.messages.map((m) => (
                  <MessageBubble
                    key={m.id}
                    message={m}
                    fromName={active.from}
                    initials={active.initials}
                  />
                ))
              )}
            </div>

            <footer className='border-border/60 space-y-2 border-t p-3'>
              <Textarea
                ref={composerRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder='Write a reply…'
                className='min-h-[64px] resize-none'
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    sendReply();
                  }
                }}
              />
              <div className='flex items-center justify-between'>
                <div className='text-muted-foreground flex items-center gap-1.5 text-[11px]'>
                  <Icons.lock className='size-3' />
                  End-to-end encrypted · Replies within one business day
                </div>
                <Button size='sm' onClick={sendReply} disabled={!draft.trim()}>
                  <Icons.send className='mr-1.5 size-3' />
                  Send
                </Button>
              </div>
            </footer>
          </>
        ) : (
          <div className='text-muted-foreground flex flex-1 items-center justify-center text-sm'>
            Select a conversation to view messages.
          </div>
        )}
      </section>
    </Card>
  );
}

function MessageBubble({
  message,
  fromName,
  initials
}: {
  message: Message;
  fromName: string;
  initials: string;
}) {
  const isPatient = message.sender === 'patient';
  return (
    <div className={`flex gap-2 ${isPatient ? 'flex-row-reverse' : ''}`}>
      <Avatar className='size-7 shrink-0'>
        <AvatarFallback className='bg-primary/10 text-primary text-[10px] font-medium'>
          {isPatient ? 'DP' : initials}
        </AvatarFallback>
      </Avatar>
      <div className={`flex max-w-[80%] flex-col gap-1 ${isPatient ? 'items-end' : 'items-start'}`}>
        <div className='text-muted-foreground text-[11px]'>
          {isPatient ? 'You' : fromName} · {message.sentAt}
        </div>
        <div
          className={`rounded-lg px-3 py-2 text-sm leading-relaxed ${
            isPatient ? 'bg-primary text-primary-foreground' : 'bg-muted'
          }`}
        >
          {message.body}
        </div>
      </div>
    </div>
  );
}
