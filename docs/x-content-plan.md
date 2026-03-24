# X Content Plan — March 17 to April 7, 2026

**Handle**: @SquaredR7284

## Tone & Rules
- **Never**: "Use my product", "Check this out", "You need this"
- **Always**: "I'm trying this", "Here's what I learned", "Not sure if this works but..."
- **Vibe**: Indie hacker building in public. Honest. Vulnerable. Relatable.
- **Format**: Mix of text-only, screenshots, short videos, threads
- **Post time**: 9 AM or 6 PM IST (peak engagement)
- **Hashtags**: `#buildinpublic` `#indiehacker` (1-2 max, never force them)

---

## Week 1: The Origin Story (Mar 17-23)

### Day 1 — Mar 17 (Monday) — The Announcement
```
I'm building a SaaS launch platform from scratch.

No funding. No team. Just me and code.

The idea: help indie hackers go from idea to live landing page in minutes, not days.

Launching April 7. No idea if anyone will care.

Building in public because why not.

#buildinpublic
```

### Day 2 — Mar 18 (Tuesday) — The Problem
```
Every time I wanted to launch a side project, I spent more time on the landing page than the actual product.

Tried Carrd — too limited.
Tried Framer — overkill for a waitlist page.
Tried coding from scratch — took 3 days.

So I started building something in between.

88 blocks. 20 templates. One click publish.

Is this useful or am I solving my own problem?
```

### Day 3 — Mar 19 (Wednesday) — Behind the Scenes
```
Tech stack for anyone curious:

- Next.js 15 (App Router)
- Tailwind CSS 4
- Prisma + Postgres
- Block-based editor (no drag-drop, just compose)
- SSR publishing (sites load instantly)

No AI anywhere. Just clean engineering.

[screenshot of editor with a template loaded]
```

### Day 4 — Mar 20 (Thursday) — The Builder Demo
```
Here's what the page builder looks like right now.

88 blocks across 16 categories:
Heroes, Features, Pricing, Testimonials, FAQ, CTA, Waitlist forms, Stats, Navigation, Footer, Gallery, Comparison...

Pick blocks. Edit content. Publish.

Not Webflow. Not Carrd. Something simpler.

[screenshot of block picker + canvas]
```

### Day 5 — Mar 21 (Friday) — Templates
```
Built 20 templates so far:

SaaS Starter, Viral Waitlist, AI Product, Dev Tool, Agency, Newsletter, Coming Soon...

Each one is fully customizable — swap blocks, edit every word, change colors and fonts.

Which template type would you use? Missing anything?

[screenshot of templates gallery]

#buildinpublic
```

### Day 6 — Mar 22 (Saturday) — Honest Doubt
```
Honest moment:

I have no idea if anyone needs another landing page builder.

Carrd exists. Framer exists. Even just HTML + Tailwind exists.

But I keep building because:
1. I'd use this myself
2. The waitlist + analytics combo doesn't exist at $1/mo
3. Worst case it's a great portfolio project

That's enough reason, right?
```

### Day 7 — Mar 23 (Sunday) — Feature Spotlight: Waitlist
```
The waitlist system is probably the most useful part.

- Email capture with referral tracking
- Auto position numbering (#42 on the waitlist!)
- Copy-paste referral link generation
- Google Sheets sync (every signup goes to your sheet)
- Webhook dispatch (Zapier, Slack, whatever)

All built in. No Mailchimp. No Zapier subscription needed.

[screenshot of waitlist entries in dashboard]
```

---

## Week 2: Building Features Live (Mar 24-30)

### Day 8 — Mar 24 (Monday) — Analytics Preview
```
Working on analytics today.

Every published site will track:
- Page views & unique visitors
- Top referrers
- Waitlist conversion rate
- Device breakdown

No Google Analytics needed (but you can still add GA4 if you want).

This is the feature that makes the premium tier worth it.

[screenshot of analytics dashboard WIP]

#buildinpublic
```

### Day 9 — Mar 25 (Tuesday) — Progress Update
```
Week 1 recap of building in public:

Done:
- 88 blocks, 20 templates
- Waitlist with referral system
- Google Sheets integration
- Theme system (dark/light)
- Custom fonts (Google Fonts)

This week:
- Analytics dashboard
- Billing (Gumroad)
- A/B testing

14 days to launch.
```

### Day 10 — Mar 26 (Wednesday) — Design Decisions
```
Small things that took way too long:

- Dark mode that actually looks good (3 separate theme systems)
- Font pairs that don't clash (10 curated presets)
- Card styles: flat vs outlined vs elevated vs filled
- Making 88 blocks all respect the same design tokens

Nobody will notice these details.

But I'll know.
```

### Day 11 — Mar 27 (Thursday) — The Pricing Debate
```
Struggling with pricing.

Current plan:
- Free: 1 site, 100 waitlist entries
- $1/mo: 3 sites, 1000 entries, custom domain
- $5/mo: unlimited everything + analytics + A/B testing

The $1 tier is basically an impulse buy.
The $5 tier is for people who are serious about launching.

Does this make sense? What would you change?
```

### Day 12 — Mar 28 (Friday) — Feature: A/B Testing
```
Building A/B testing today.

Simple approach:
- Duplicate your page, make changes
- Split traffic 50/50
- See which version converts better

No complex variant system. Just "page A vs page B, which wins?"

Is this enough or do people want per-block testing?

#buildinpublic
```

### Day 13 — Mar 29 (Saturday) — Shipping Fast
```
Things I'm NOT building:

- Drag and drop (compose blocks instead)
- Custom CSS editor
- CMS / blog system
- E-commerce checkout
- Team collaboration

Every feature I say no to is a week I save.

Ship small. Ship fast. Add later if people ask.
```

### Day 14 — Mar 30 (Sunday) — Gumroad Integration
```
Wired up Gumroad payments today.

$1/mo -> webhook hits my API -> user plan upgrades instantly.

No Stripe integration nightmare. No billing portal to build.
Gumroad handles refunds, invoices, tax.

I handle the product.

Sometimes the boring solution is the right one.
```

---

## Week 3: Polish & Landing Page (Mar 31 - Apr 6)

### Day 15 — Mar 31 (Monday) — Landing Page
```
Building the landing page for my landing page builder.

The irony is not lost on me.

Yes, I'm using my own tool to build it.

If I can't make a good page with my own product, nobody can.

[screenshot of landing page in the editor]

#buildinpublic
```

### Day 16 — Apr 1 (Tuesday) — Dogfooding
```
Dogfooding update:

Built my own landing page using the builder and found bugs.

This is exactly why you use your own product.

Fixed today:
- [list actual bugs found]
- [list actual bugs found]
- [list actual bugs found]

6 days to launch.
```

### Day 17 — Apr 2 (Wednesday) — The Stack Thread
```
Full stack breakdown for the nerds (thread):

1/ Frontend: Next.js 15 App Router
Server components for dashboard. Client components for editor.

2/ Styling: Tailwind CSS 4
3 theme namespaces. CSS variables for dynamic brand colors.

3/ Database: Prisma + Postgres
15 models. JSON fields for block content.

4/ Auth: Supabase Auth
Email/password + Google OAuth ready.

5/ Publishing: Static HTML generation
SSR renders blocks to HTML. Zero JS on published pages.

6/ Payments: Gumroad
Webhook auto-upgrade. No billing UI to maintain.
```

### Day 18 — Apr 3 (Thursday) — Real Numbers
```
Honest numbers after 2.5 weeks of building in public:

- X followers gained: [actual number]
- People who said "I'd use this": [actual number]
- Pre-signups: [actual number]
- Lines of code: ~15,000
- Blocks built: 88
- Templates: 20
- Coffees consumed: too many

4 days to launch.
```

### Day 19 — Apr 4 (Friday) — What Could Go Wrong
```
Things that might kill this project:

1. Nobody wants another page builder
2. $1/mo is too cheap to be sustainable
3. Free tier is too generous
4. I'm a solo dev, can't handle support
5. Bigger players ship AI and make this irrelevant

But also:

1. Some people just want simple
2. $1/mo is an impulse buy
3. Free tier drives word of mouth
4. Community can self-serve
5. Not everyone wants AI touching their copy

Launching anyway.
```

### Day 20 — Apr 5 (Saturday) — Demo Video
```
Recorded a 60-second demo.

0:00 - Pick a template
0:15 - Customize branding (name, colors, fonts)
0:30 - Swap blocks, edit content
0:45 - Hit publish
0:55 - Live site, working waitlist form

Under a minute from nothing to live.

[attach video]

#buildinpublic
```

### Day 21 — Apr 6 (Sunday) — Eve of Launch
```
Tomorrow is launch day.

Built this in 21 days.
No team. No funding. No audience.

Could be 0 users.
Could be 10.
Could be 100.

Doesn't matter.

I proved I could build a full SaaS product from scratch.
Everything after that is bonus.

See you tomorrow, 9 AM.
```

---

## Week 4: Launch (Apr 7+)

### Day 22 — Apr 7 (Monday) — LAUNCH DAY (Morning)
```
It's live.

[Product Name] — build and launch your next project in minutes.

Free to start. $1/mo if you need more.

- 88 blocks, 20 templates
- Built-in waitlist with referral tracking
- One-click publish
- Custom domains
- Analytics (Pro)

Link in bio.

Built this in 21 days, solo.
Not sure if anyone needs it.
But it exists now.

What do you think?
```

### Day 22 — Apr 7 (Monday) — LAUNCH DAY (Evening)
```
Launch day update:

[X] signups in the first [X] hours.

Bugs found: [honest number]
Bugs fixed: [honest number]

Best feedback so far: "[quote actual feedback]"
Worst feedback so far: "[quote actual feedback]"

Building in public means sharing both.

Thank you to everyone who tried it. Genuinely.
```

### Day 23 — Apr 8 (Tuesday) — Day After
```
Day 1 after launch:

Total signups: [number]
Sites created: [number]
Pages published: [number]

Top template: [name]
Most used block: [name]

What I'm fixing today based on feedback:
1. [thing]
2. [thing]
3. [thing]

Keep the feedback coming. Every bug report makes this better.

#buildinpublic
```

---

## Content Types to Rotate
- **Screenshots**: Editor, templates, published sites, analytics
- **Numbers**: Signups, sites created, conversion rates
- **Decisions**: Pricing, features to cut, stack choices
- **Vulnerability**: Doubts, what might fail, honest reactions
- **Technical**: Stack details, architecture decisions
- **Questions**: Ask followers what they'd want, poll pricing

## Engagement Rules
1. Reply to EVERY comment in the first 2 weeks
2. Quote-tweet anyone who tries the product
3. Don't argue with critics — thank them
4. Share other indie hackers' launches too (karma)
5. Never delete a post, even if it flops
