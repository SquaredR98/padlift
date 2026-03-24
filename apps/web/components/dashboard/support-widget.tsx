'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, X, ArrowLeft, Send, Plus } from 'lucide-react';

interface Ticket {
  id: string;
  subject: string;
  status: string;
  updatedAt: string;
  _count?: { messages: number };
}

interface Message {
  id: string;
  sender: 'USER' | 'ADMIN';
  body: string;
  createdAt: string;
}

interface TicketDetail {
  id: string;
  subject: string;
  status: string;
  messages: Message[];
}

type View = 'closed' | 'list' | 'new' | 'thread';

export function SupportWidget() {
  const [view, setView] = useState<View>('closed');
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [activeTicket, setActiveTicket] = useState<TicketDetail | null>(null);

  // New ticket form
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [creating, setCreating] = useState(false);

  // Reply
  const [reply, setReply] = useState('');
  const [replying, setReplying] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchTickets = useCallback(async () => {
    const res = await fetch('/api/support/tickets');
    if (res.ok) {
      const data = await res.json();
      setTickets(data.items);
    }
  }, []);

  const fetchThread = useCallback(async (id: string) => {
    const res = await fetch(`/api/support/tickets/${id}`);
    if (res.ok) {
      const data = await res.json();
      setActiveTicket(data.ticket);
    }
  }, []);

  useEffect(() => {
    if (view === 'list') fetchTickets();
  }, [view, fetchTickets]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeTicket?.messages.length]);

  const handleOpen = () => {
    setView('list');
  };

  const handleNewTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim() || creating) return;
    setCreating(true);
    try {
      const res = await fetch('/api/support/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: subject.trim(), message: message.trim() }),
      });
      if (res.ok) {
        const data = await res.json();
        setSubject('');
        setMessage('');
        setActiveTicket(data.ticket);
        setView('thread');
      }
    } finally {
      setCreating(false);
    }
  };

  const handleReply = async () => {
    if (!reply.trim() || replying || !activeTicket) return;
    setReplying(true);
    try {
      const res = await fetch(`/api/support/tickets/${activeTicket.id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: reply.trim() }),
      });
      if (res.ok) {
        setReply('');
        fetchThread(activeTicket.id);
      }
    } finally {
      setReplying(false);
    }
  };

  const openThread = (ticket: Ticket) => {
    fetchThread(ticket.id);
    setView('thread');
  };

  const statusColor = (s: string) =>
    s === 'RESOLVED' || s === 'CLOSED' ? 'text-green-500' : s === 'IN_PROGRESS' ? 'text-blue-400' : 'text-amber-400';

  if (view === 'closed') {
    return (
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:bg-blue-500 hover:shadow-xl"
        title="Support"
      >
        <MessageCircle className="h-5 w-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex w-80 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl sm:w-96" style={{ maxHeight: '32rem' }}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-3">
        <div className="flex items-center gap-2">
          {(view === 'new' || view === 'thread') && (
            <button onClick={() => { setView('list'); setActiveTicket(null); }} className="text-muted-foreground transition hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
            </button>
          )}
          <h3 className="text-sm font-semibold text-foreground">
            {view === 'new' ? 'New Ticket' : view === 'thread' ? activeTicket?.subject || 'Thread' : 'Support'}
          </h3>
        </div>
        <button onClick={() => setView('closed')} className="text-muted-foreground transition hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* List view */}
      {view === 'list' && (
        <div className="flex-1 overflow-y-auto">
          <div className="p-3">
            <button
              onClick={() => setView('new')}
              className="flex w-full items-center gap-2 rounded-lg border border-dashed border-border p-3 text-sm text-muted-foreground transition hover:border-muted-foreground hover:text-foreground"
            >
              <Plus className="h-4 w-4" />
              New ticket
            </button>
          </div>
          {tickets.length === 0 ? (
            <p className="px-4 pb-4 text-center text-sm text-dimmed-foreground">No tickets yet</p>
          ) : (
            <div className="space-y-1 px-3 pb-3">
              {tickets.map((t) => (
                <button
                  key={t.id}
                  onClick={() => openThread(t)}
                  className="w-full rounded-lg px-3 py-2.5 text-left transition hover:bg-muted"
                >
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-medium text-foreground">{t.subject}</p>
                    <span className={`text-[10px] font-medium ${statusColor(t.status)}`}>{t.status.replace('_', ' ')}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-dimmed-foreground">
                    {new Date(t.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* New ticket form */}
      {view === 'new' && (
        <form onSubmit={handleNewTicket} className="flex flex-1 flex-col p-4">
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              autoFocus
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder-dimmed-foreground focus:outline-none focus:ring-1 focus:ring-border"
            />
            <textarea
              placeholder="Describe your issue..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder-dimmed-foreground focus:outline-none focus:ring-1 focus:ring-border"
            />
          </div>
          <button
            type="submit"
            disabled={!subject.trim() || !message.trim() || creating}
            className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            {creating ? 'Sending...' : 'Submit'}
          </button>
        </form>
      )}

      {/* Thread view */}
      {view === 'thread' && activeTicket && (
        <div className="flex flex-1 flex-col">
          <div className="flex-1 space-y-3 overflow-y-auto p-4" style={{ maxHeight: '20rem' }}>
            {activeTicket.messages.map((msg) => (
              <div
                key={msg.id}
                className={`rounded-lg px-3 py-2 ${
                  msg.sender === 'ADMIN'
                    ? 'ml-4 bg-blue-600/10 text-foreground'
                    : 'mr-4 bg-muted text-foreground'
                }`}
              >
                <p className="text-xs font-medium text-muted-foreground">
                  {msg.sender === 'ADMIN' ? 'Support' : 'You'} &middot; {new Date(msg.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="mt-1 whitespace-pre-wrap text-sm">{msg.body}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Reply input */}
          <div className="flex gap-2 border-t border-border p-3">
            <input
              type="text"
              placeholder="Type a message..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleReply(); } }}
              className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder-dimmed-foreground focus:outline-none focus:ring-1 focus:ring-border"
            />
            <button
              onClick={handleReply}
              disabled={!reply.trim() || replying}
              className="rounded-lg bg-blue-600 px-3 py-2 text-white transition hover:bg-blue-500 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
