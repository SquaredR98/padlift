'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Send, ChevronDown } from 'lucide-react';
import { PageHeader } from '../../../components/ui/page-header';
import { Badge } from '../../../components/ui/badge';

interface Message {
  id: string;
  sender: 'USER' | 'ADMIN';
  body: string;
  createdAt: string;
}

interface Ticket {
  id: string;
  subject: string;
  status: string;
  priority: string;
  createdAt: string;
  profile: { name: string | null; email: string };
  messages: Message[];
}

const STATUSES = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'] as const;
const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH'] as const;

export default function AdminTicketDetailPage() {
  const { ticketId } = useParams<{ ticketId: string }>();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchTicket = useCallback(async () => {
    const res = await fetch(`/api/admin/support/${ticketId}`);
    if (res.ok) {
      const data = await res.json();
      setTicket(data.ticket);
    }
  }, [ticketId]);

  useEffect(() => { fetchTicket(); }, [fetchTicket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [ticket?.messages.length]);

  const handleReply = async () => {
    if (!reply.trim() || sending) return;
    setSending(true);
    try {
      await fetch(`/api/admin/support/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: reply.trim() }),
      });
      setReply('');
      fetchTicket();
    } finally {
      setSending(false);
    }
  };

  const handleUpdate = async (field: 'status' | 'priority', value: string) => {
    await fetch(`/api/admin/support/${ticketId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: value }),
    });
    fetchTicket();
  };

  if (!ticket) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">Loading...</div>
    );
  }

  return (
    <div>
      <PageHeader
        title={ticket.subject}
        badge={
          <Badge variant={ticket.status === 'OPEN' ? 'warning' : ticket.status === 'RESOLVED' ? 'success' : 'info'}>
            {ticket.status.replace('_', ' ')}
          </Badge>
        }
      />

      <div className="px-5 pb-8 pt-5">
        <Link href="/dashboard/admin/support" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to tickets
        </Link>

        {/* Controls */}
        <div className="mb-6 flex flex-wrap items-center gap-4 rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">From:</span>
            <span className="text-sm font-medium text-foreground">{ticket.profile.name || ticket.profile.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Status:</span>
            <div className="relative">
              <select
                value={ticket.status}
                onChange={(e) => handleUpdate('status', e.target.value)}
                className="appearance-none rounded-md border border-border bg-background px-2.5 py-1 pr-7 text-xs font-medium text-foreground focus:outline-none"
              >
                {STATUSES.map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 text-dimmed-foreground" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Priority:</span>
            <div className="relative">
              <select
                value={ticket.priority}
                onChange={(e) => handleUpdate('priority', e.target.value)}
                className="appearance-none rounded-md border border-border bg-background px-2.5 py-1 pr-7 text-xs font-medium text-foreground focus:outline-none"
              >
                {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 text-dimmed-foreground" />
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="space-y-4">
          {ticket.messages.map((msg) => (
            <div
              key={msg.id}
              className={`rounded-lg border p-4 ${
                msg.sender === 'ADMIN'
                  ? 'ml-8 border-blue-800/30 bg-blue-950/20'
                  : 'mr-8 border-border bg-card'
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className={`text-xs font-medium ${msg.sender === 'ADMIN' ? 'text-blue-400' : 'text-muted-foreground'}`}>
                  {msg.sender === 'ADMIN' ? 'Admin' : ticket.profile.name || ticket.profile.email}
                </span>
                <span className="text-xs text-dimmed-foreground">
                  {new Date(msg.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="whitespace-pre-wrap text-sm text-foreground">{msg.body}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Reply */}
        <div className="mt-6 flex gap-3">
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Type your reply..."
            rows={3}
            className="flex-1 resize-none rounded-lg border border-border bg-card p-3 text-sm text-foreground placeholder-dimmed-foreground transition focus:border-border focus:outline-none focus:ring-1 focus:ring-border"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                handleReply();
              }
            }}
          />
          <button
            onClick={handleReply}
            disabled={!reply.trim() || sending}
            className="self-end rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
