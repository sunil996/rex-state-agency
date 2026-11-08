# Rex Estate Agents — Development Estimate

**Project:** Approved lettings website + admin → live production build  
**Design:** Included (already completed)  
**Hosting:** Vercel (managed setup)  
**Database:** MongoDB Atlas  
**Images:** Cloudinary  
**Rate:** **£10.00 / hour**  

---

## Summary


| Item                  | Value              |
| --------------------- | ------------------ |
| Total estimated hours | **88 hours**       |
| Hourly rate           | **£10 / hour**     |
| Development subtotal  | **£880**           |
| AI tooling (project)  | **$20 ≈ £15**      |
| **Estimated fee**     | **£895**           |
| Timeline              | **2 – 2.5 weeks**  |


---

## What is covered

### Already completed (counted in this quote)

- Full public website UI (homepage, listings, detail, landlords, tenants, valuation, about, contact, FAQs)
- Admin panel UI (dashboard, properties, enquiries, valuations)
- Brand / layout / responsive design

### Still to complete

- Live APIs + MongoDB
- Wire public site + admin to real data
- Cloudinary image uploads
- Form submissions → DB + email
- Vercel project setup & management configuration
- Security hardening in code
- Testing + handover

### Out of scope

- Rightmove / Zoopla feeds  
- Online payments / tenant portal  
- Major redesign after approval

---

## Hour breakdown


| #     | Work package                                                 | Hours  | Cost @ £10/hr |
| ----- | ------------------------------------------------------------ | ------ | ------------- |
| **A** | **UI / design (completed)**                                  | **10** | **£100**      |
|       | Public pages layout, homepage, listings, detail, forms       | 6      | £60           |
|       | Admin panel screens + brand polish                           | 4      | £40           |
| **B** | **Backend API (Node / Next API + MongoDB)**                  | **22** | **£220**      |
|       | MongoDB models & connection                                  | 4      | £40           |
|       | Properties API (CRUD, search, filters, featured)             | 7      | £70           |
|       | Enquiries, viewings, valuations APIs                         | 5      | £50           |
|       | Admin auth + protected routes                                | 3      | £30           |
|       | Email notifications on form submit                           | 3      | £30           |
| **C** | **Public website wiring with domain and user facing**        | **12** | **£120**      |
|       | Replace mock data with live property APIs                    | 6      | £60           |
|       | Contact / viewing / valuation forms → live API               | 4      | £40           |
|       | Loading, success & error states                              | 2      | £20           |
| **D** | **Admin panel wiring**                                       | **10** | **£100**      |
|       | Real login + live dashboard                                  | 3      | £30           |
|       | Property add / edit / delete + Cloudinary uploads            | 5      | £50           |
|       | Enquiries & valuations inbox (status updates)                | 2      | £20           |
| **E** | **Cloud setup & Vercel management**                          | **14** | **£140**      |
|       | Vercel project, env vars, production deploy pipeline         | 5      | £50           |
|       | Domain / DNS / HTTPS check on Vercel                         | 3      | £30           |
|       | MongoDB Atlas + Cloudinary accounts, keys, folders           | 3      | £30           |
|       | Go-live checklist, restarts, basic monitoring notes          | 3      | £30           |
| **F** | **Security (code-level)**                                    | **12** | **£120**      |
|       | Input validation & sanitisation on APIs/forms                | 3      | £30           |
|       | Auth hardening (secure cookies/JWT, admin route guards)      | 3      | £30           |
|       | Rate limiting / basic abuse protection on public forms       | 2      | £20           |
|       | Security headers, CORS, secret handling (no keys in client)  | 2      | £20           |
|       | Upload safety (file type/size checks via Cloudinary flow)    | 2      | £20           |
| **G** | **Testing & handover**                                       | **8**  | **£80**       |
|       | End-to-end QA (public + admin critical flows)                | 4      | £40           |
|       | Bug fixes from QA                                            | 2      | £20           |
|       | Handover notes (add listing, check enquiries, Vercel basics) | 2      | £20           |
|       | **TOTAL**                                                    | **88** | **£880**      |


---

## Package view (easy for client)


| Package                          | Hours  | Fee      |
| -------------------------------- | ------ | -------- |
| Design (done)                    | 10     | £100     |
| Backend + website + admin (live) | 44     | £440     |
| Vercel / cloud setup & manage    | 14     | £140     |
| Security hardening               | 12     | £120     |
| Testing & handover               | 8      | £80      |
| AI tooling (Cursor / AI assist)  | —      | £15 ($20)|
| **Total**                        | **88** | **£895** |


---

## Timeline (by phase / hours)

Delivery target: **2 – 2.5 weeks** from kick-off (subject to timely client inputs).


| Phase                        | Focus                              | Hours  | Outcome              |
| ---------------------------- | ---------------------------------- | ------ | -------------------- |
| Phase 1                      | Backend API + MongoDB + auth       | 22     | APIs ready           |
| Phase 2                      | Public website wiring              | 12     | Site on live data    |
| Phase 3                      | Admin panel + Cloudinary uploads   | 10     | Admin usable         |
| Phase 4                      | Vercel / cloud setup & manage      | 14     | Production URL ready |
| Phase 5                      | Security + QA + handover           | 20     | Live & handed over   |
| *(Design already completed)* | UI / brand / screens               | 10     | Included in quote    |
| **Total**                    |                                    | **88** | **Go-live**          |


**Client promise:** **2 – 2.5 weeks** to production go-live.

---

## Payment schedule (on £895)


| Milestone                                   | %   | Amount  |
| ------------------------------------------- | --- | ------- |
| Advance on approval                         | 40% | £358.00 |
| Staging ready (live data on Vercel preview) | 35% | £313.25 |
| Go-live + security check + handover         | 25% | £223.75 |


---

## Included tooling cost

| Item | Amount | Notes |
| --- | --- | --- |
| AI tooling (Cursor / AI assist for this project) | **$20 ≈ £15** | Included in the **£895** project fee |

---

## Hosting / third-party costs (client pays separately)

These monthly/platform costs are **not** included in the £895 fee (only setup is):


| Service       | Typical                    | Purpose         |
| ------------- | -------------------------- | --------------- |
| Vercel        | Hobby free / Pro if needed | App hosting     |
| MongoDB Atlas | Free tier to start         | Database        |
| Cloudinary    | Free 25GB to start         | Property images |


Development fee covers **setup + management configuration** of these services for go-live.

---

## Assumptions

1. Approved UI is the baseline — no major redesign.
2. One admin role for v1.
3. Client provides final business details (phone, email, logo, domain access) promptly.
4. Portal feeds, payments, and tenant portals are extra if required later.

---

## One-line summary

> **88 hours × £10 = £880 + $20 AI tooling (≈ £15) = £895** — includes completed design (10h), live website + admin, Vercel/cloud setup & manage, security hardening, testing and handover — delivery in **2 – 2.5 weeks**.

