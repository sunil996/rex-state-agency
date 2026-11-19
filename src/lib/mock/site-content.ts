export const coverageAreas = [
  { name: "Greater London", city: "London" },
  { name: "Southampton City Centre", city: "Southampton" },
  { name: "Eastleigh", city: "Southampton" },
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

export const landlordTestimonials = [
  {
    quote:
      "Clear updates throughout the letting and a tenant found quickly. Exactly the personal service we wanted.",
    name: "James R.",
    role: "Landlord · London",
  },
  {
    quote:
      "Rent collection and maintenance are handled without drama. We always know where things stand.",
    name: "Helen & Mark T.",
    role: "Landlords · Southampton",
  },
  {
    quote:
      "They marketed our flat properly, vetted applicants carefully, and kept us informed — no chasing required.",
    name: "David K.",
    role: "Landlord · London",
  },
  {
    quote:
      "Switching to fully managed took the stress away. Repairs get sorted and reporting is always clear.",
    name: "Sarah L.",
    role: "Landlord · Southampton",
  },
] as const;

export const landlordPackages: {
  name: string;
  tagline: string;
  featured?: boolean;
  points: string[];
}[] = [
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
    name: "Fully managed",
    tagline: "Complete day-to-day care",
    featured: true,
    points: [
      "Everything in Rent collect",
      "Maintenance coordination",
      "Tenant liaison ongoing",
      "Periodic property checks",
    ],
    
  },
   {
    name: "Rent collect",
    tagline: "Let + monthly rent care",
    points: [
      "Everything in Let only",
      "Rent collection & chasing",
      "Clear landlord reporting",
      "Tenancy administration support",
    ],
  },
];
