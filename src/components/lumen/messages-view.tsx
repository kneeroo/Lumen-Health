'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Icons } from '@/components/icons';
import type { Message, Thread } from '@/lib/mock-messages';
import { useMemo, useState } from 'react';

export function MessagesView({ initialThreads }: { initialThreads: Thread[] }) {
  const [threads, setThreads] = useState<Thread[]>(initialThreads);
  const [activeId, setActiveId] = useState<string>(initialThreads[0]?.id ?? '');
  const [draft, setDraft] = useState('');

  const active = useMemo(() => threads.find((t) => t.id === activeId), [threads, activeId]);

  function selectThread(id: string) {
    setActiveId(id);
    setThreads((prev) => prev.map((t) => (t.id === id ? { ...t, unread: false } : t)));
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
    <Card className='grid h-[640px] grid-cols-[280px_1fr] overflow-hidden p-0'>
      {/* Thread list */}
      <aside className='border-border/60 overflow-y-auto border-r'>
        <ul>
          {threads.map((t) => {
            const isActive = t.id === activeId;
            return (
              <li key={t.id}>
                <button
                  type='button'
                  onClick={() => selectThread(t.id)}
                  className={`hover:bg-muted/50 flex w-full items-start gap-3 border-b border-border/60 p-3 text-left transition-colors ${
                    isActive ? 'bg-muted/60' : ''
                  }`}
                >
                  <Avatar className='size-9 shrink-0'>
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
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Conversation pane */}
      <section className='flex min-h-0 flex-col'>
        {active ? (
          <>
            <header className='border-border/60 flex items-center gap-3 border-b px-4 py-3'>
              <Avatar className='size-9'>
                <AvatarFallback className='bg-primary/10 text-primary text-xs font-medium'>
                  {active.initials}
                </AvatarFallback>
              </Avatar>
              <div className='min-w-0 flex-1'>
                <div className='text-sm font-medium'>{active.from}</div>
                <div className='text-muted-foreground text-xs'>
                  {active.role} · {active.topic}
                </div>
              </div>
            </header>

            <div className='min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4'>
              {active.messages.map((m) => (
                <MessageBubble
                  key={m.id}
                  message={m}
                  fromName={active.from}
                  initials={active.initials}
                />
              ))}
            </div>

            <footer className='border-border/60 space-y-2 border-t p-3'>
              <Textarea
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
