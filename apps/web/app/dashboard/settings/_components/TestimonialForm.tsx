'use client';

import { useState } from 'react';
import { Star, Send, Check } from 'lucide-react';

export function TestimonialForm() {
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quote.trim() || submitting) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quote: quote.trim(), rating }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Something went wrong');
        return;
      }
      setQuote('');
      setRating(5);
      setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border px-5 py-3">
          <Star className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-sm font-semibold text-foreground">Share Your Experience</h2>
        </div>
        <div className="flex items-center gap-3 p-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10">
            <Check className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-sm text-muted-foreground">Thank you! Your testimonial is pending review.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-5 py-3">
        <Star className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-sm font-semibold text-foreground">Share Your Experience</h2>
      </div>
      <form onSubmit={handleSubmit} className="p-5">
        <div className="space-y-4">
          {/* Star rating */}
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">Rating</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  onMouseEnter={() => setHover(n)}
                  onMouseLeave={() => setHover(0)}
                  className="transition"
                >
                  <Star
                    className={`h-5 w-5 ${
                      n <= (hover || rating)
                        ? 'fill-amber-500 text-amber-500'
                        : 'text-muted-foreground'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Quote */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Your testimonial</label>
            <textarea
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              rows={3}
              placeholder="What do you love about Padlift?"
              className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder-dimmed-foreground transition focus:border-border focus:outline-none focus:ring-1 focus:ring-border"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={!quote.trim() || submitting}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}
