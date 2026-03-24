# Community Features

Three community-facing systems: testimonials, feature requests, and support tickets.

## Testimonials

### Public Submission
Users submit testimonials via `POST /api/testimonials`:
- Fields: `quote` (min 10 chars), `rating` (1-5, default 5), `role`, `company`
- Linked to the submitter's profile
- Default status: pending (awaiting moderation)

### Admin Moderation
Admin dashboard (`/dashboard/admin`) provides:
- **Approve / Reject** — change testimonial status
- **Feature / Unfeature** — mark for homepage display
- **Reorder** — update display position
- **Delete** — remove testimonial

### Public Display
`GET /api/testimonials` returns approved + featured testimonials. Used by the landing page testimonials section.

### Service: `TestimonialsService`
```
submit(input) → Create testimonial
list(opts?) → Paginated list (filter by status)
getApprovedFeatured() → Homepage testimonials
approve(id) / reject(id) → Moderate
toggleFeatured(id) → Feature toggle
updatePosition(id, position) → Reorder
delete(id)
```

## Feature Requests

### Public Board
The feature request board is a public page at `/feature-requests`. Users can:
- Browse all feature requests
- Filter by status (Open, In Progress, Completed)
- Sort by votes or newest
- Submit new requests (auth required)
- Vote on existing requests (auth required)

### Submission
`POST /api/feature-requests`:
- Fields: `title` (min 5 chars), `description` (min 10 chars)
- Linked to submitter's profile
- Default status: `OPEN`

### Voting
`POST /api/feature-requests/{id}/vote`:
- **Toggle vote** — clicking again removes the vote
- Each user can vote once per request
- `voteCount` is maintained on the request (denormalized for sorting)
- Votes stored in `FeatureVote` table (unique: `requestId` + `profileId`)

### Admin Management
Admins can:
- Change status: `OPEN` → `IN_PROGRESS` → `COMPLETED` or `REJECTED`
- Delete requests

### Service: `FeatureRequestsService`
```
submit(input) → Create request
list(opts?) → Paginated, filterable, sortable
vote(requestId, profileId) → Toggle vote
hasVoted(requestId, profileId) → Check status
getUserVotes(profileId) → Set of voted request IDs
updateStatus(id, status) → Change status
delete(id)
```

## Support Tickets

### User Flow
1. User submits a ticket via `POST /api/support/tickets`:
   - Fields: `subject` (min 3 chars), `message` (min 10 chars)
   - Creates ticket + initial message (sender: `USER`)
2. User views their tickets in the dashboard
3. User replies to tickets via `POST /api/support/tickets/{id}/messages`

### Admin Flow
1. Admin views all tickets in the admin dashboard
2. Admin replies (sender: `ADMIN`)
3. Admin changes ticket status: `OPEN` → `IN_PROGRESS` → `RESOLVED` → `CLOSED`
4. Admin changes priority: `LOW` / `MEDIUM` / `HIGH` / `URGENT`

### Access Control
- Users can only see their own tickets
- Users can only reply to their own tickets
- Admins can see and reply to all tickets

### Service: `SupportService`
```
createTicket(input) → Create with initial message
listTickets(opts?) → Paginated, filterable by profileId + status
getTicket(id, profileId?) → Retrieve with messages
reply(ticketId, sender, body, profileId?) → Add message
updateStatus(ticketId, status) → Change status
updatePriority(ticketId, priority) → Change priority
```

## Database Models

### Testimonial
```
id, profileId, quote, rating (1-5), role, company,
status (PENDING/APPROVED/REJECTED), featured, position,
createdAt, updatedAt
```

### FeatureRequest
```
id, profileId, title, description,
status (OPEN/IN_PROGRESS/COMPLETED/REJECTED),
voteCount, createdAt, updatedAt
```

### FeatureVote
```
id, featureRequestId, profileId
@@unique([featureRequestId, profileId])
```

### SupportTicket
```
id, profileId, subject,
status (OPEN/IN_PROGRESS/RESOLVED/CLOSED),
priority (LOW/MEDIUM/HIGH/URGENT),
createdAt, updatedAt
```

### SupportMessage
```
id, ticketId, sender (USER/ADMIN), body,
profileId (nullable — admin replies may not have one),
createdAt
```
