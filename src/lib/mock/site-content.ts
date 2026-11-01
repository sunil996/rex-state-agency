export const coverageAreas = [
  { name: "Hayes & Southall", city: "London" },
  { name: "Canary Wharf", city: "London" },
  { name: "Clapham", city: "London" },
  { name: "Islington", city: "London" },
  { name: "Southampton City Centre", city: "Southampton" },
  { name: "Bitterne", city: "Southampton" },
  { name: "Portswood", city: "Southampton" },
  { name: "Shirley", city: "Southampton" },
] as const;

export const howItWorksSteps = [
  {
    who: "Landlords",
    steps: [
      {
        title: "Valuation",
        body: "We assess your property and advise on realistic rent and presentation.",
      },
      {
        title: "Market",
        body: "Professional listing, portals and viewings to attract strong applicants.",
      },
      {
        title: "Let",
        body: "Referencing, agreements and move-in handled with clear updates.",
      },
      {
        title: "Manage",
        body: "Rent collection, tenancy support and maintenance coordination ongoing.",
      },
    ],
  },
  {
    who: "Tenants",
    steps: [
      {
        title: "Search",
        body: "Browse available homes across London and Southampton.",
      },
      {
        title: "View",
        body: "Book a viewing that suits you — we confirm promptly.",
      },
      {
        title: "Apply",
        body: "Straightforward referencing with clear next steps.",
      },
      {
        title: "Move in",
        body: "Agreements, keys and ongoing support once you’re settled.",
      },
    ],
  },
] as const;

export const testimonials = [
  {
    quote:
      "Clear updates throughout the letting and a tenant found quickly. Exactly the personal service we wanted.",
    name: "James R.",
    role: "Landlord · London",
  },
  {
    quote:
      "Viewing was easy to arrange and the team were honest about the property. Moving in felt organised.",
    name: "Priya S.",
    role: "Tenant · Southampton",
  },
  {
    quote:
      "Rent collection and maintenance are handled without drama. We always know where things stand.",
    name: "Helen & Mark T.",
    role: "Landlords · Southampton",
  },
] as const;

export const landlordPackages = [
  {
    name: "Let only",
    tagline: "Find the right tenant",
    points: [
      "Rental valuation & marketing",
      "Viewings & applicant handling",
      "Referencing & tenancy setup",
      "Handover to you at move-in",
    ],
  },
  {
    name: "Rent collect",
    tagline: "Let + monthly rent care",
    featured: true,
    points: [
      "Everything in Let only",
      "Rent collection & chasing",
      "Clear landlord reporting",
      "Tenancy administration support",
    ],
  },
  {
    name: "Fully managed",
    tagline: "Complete day-to-day care",
    points: [
      "Everything in Rent collect",
      "Maintenance coordination",
      "Tenant liaison ongoing",
      "Periodic property checks",
    ],
  },
] as const;
