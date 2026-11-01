# Rex Estate Agents — Premium UI Presentation

Independent lettings & property management website UI for client review (London & Southampton). **Rent / valuation only** — no buy/sell.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion + Lucide icons
- Mock data + `localStorage` demo store (no backend yet)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Admin demo: [http://localhost:3000/admin](http://localhost:3000/admin) → **Continue to dashboard**.

## Design previews (for client choice)

Same layout, different colour systems. Bottom-right **Designs** panel also switches these.

| Route | Direction |
|---|---|
| `/` | **Current** — warm cream + metallic gold |
| `/design-1` | **British Editorial** — pure white + antique brass |
| `/design-2` | **Mayfair Noir** — full dark + bright gold |
| `/design-3` | **Harbour Cool** — cool blue-grey + teal accents |

Chosen theme persists while browsing other pages (localStorage).

## Public pages

| Route | Purpose |
|---|---|
| `/` | Homepage (Vedant-inspired hero + featured rentals) |
| `/properties` | Searchable rental listings (Century 21–style cards) |
| `/properties/[slug]` | Property detail + gallery + viewing form (Charters-inspired) |
| `/landlords` | Landlord services |
| `/tenants` | Tenant services |
| `/valuation` | Rental valuation request form |
| `/about` | Company story |
| `/contact` | Contact + enquiry form |
| `/faqs` | Landlord / tenant FAQs |

## Admin screens

| Route | Purpose |
|---|---|
| `/admin` | Soft login gate + KPI dashboard |
| `/admin/properties` | List / delete listings |
| `/admin/properties/new` | Add listing + photo picker/upload preview |
| `/admin/properties/[id]` | Edit listing |
| `/admin/enquiries` | Inbox + reply-via-email compose |
| `/admin/valuations` | Valuation request list |

Forms on the public site write into the same demo store, so new enquiries/valuations appear in admin during the session.

## Client demo walkthrough

1. Land on the dark gold hero → search or open a featured property.
2. Filter listings → open detail → browse gallery → book a viewing.
3. Submit a landlord valuation and/or contact form.
4. Open `/admin` → review new enquiry → edit a property gallery.
5. Collect feedback on brand, density and missing fields before backend work.

## Notes

- Phone/email/addresses are placeholders — replace with client details.
- Image uploads in admin are local previews only (demo).
- Phase 2: real auth, database, email delivery, image storage, live maps.
