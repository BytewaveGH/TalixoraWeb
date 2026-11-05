/**
 * Talixora website content — the single source of truth for copy, products, services and team.
 * Pages and components read from here; update this file to change what the site says.
 */

export const site = {
  name: 'Talixora',
  tagline: 'Software that runs serious businesses.',
  description:
    'Talixora is a software company in Accra, Ghana. We build Sellix — ERPs for real estate, eateries and high-volume retail — and Bidchale, Ghana’s online bidding marketplace. We also provide software consultancy and dedicated developers.',
  url: 'https://talixora.com',
  email: 'hello@talixora.com',
  location: 'Accra, Ghana',
  socials: {
    linkedin: '#',
    x: '#',
    instagram: '#',
    github: 'https://github.com/BytewaveGH',
  },
} as const

export const links = {
  sellixApp: 'https://sellix.bidchale.com',
  bidchale: 'https://www.bidchale.com',
  bidchaleEmail: 'hello@bidchale.com',
} as const

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export type NavLink = { label: string; href: string; description?: string }
export type NavGroup = { label: string; href: string; items?: NavLink[] }

export const nav: NavGroup[] = [
  {
    label: 'Products',
    href: '/#products',
    items: [
      { label: 'Sellix', href: '/products/sellix', description: 'ERPs for real estate, eateries and enterprise POS' },
      { label: 'Bidchale', href: '/products/bidchale', description: 'Ghana’s online bidding marketplace' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    items: [
      { label: 'Software consultancy', href: '/services#consultancy', description: 'Architecture, strategy and project rescue' },
      { label: 'Dedicated developers', href: '/services#developers', description: 'Talixora engineers released to your team' },
      { label: 'Custom development', href: '/services#development', description: 'Your project — or the part you need' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

/* ------------------------------------------------------------------ */
/* Sellix                                                              */
/* ------------------------------------------------------------------ */

export type ModuleKey = 'real-estate' | 'eatery' | 'pos'

export const sellixModules: {
  key: ModuleKey
  name: string
  short: string
  tagline: string
  summary: string
  image: string
  imageAlt: string
  features: { title: string; body: string }[]
}[] = [
  {
    key: 'real-estate',
    name: 'Sellix Real Estate',
    short: 'Real Estate',
    tagline: 'Property management, end to end',
    summary:
      'Manage properties, units, tenants and leases in one place — from listing to rent collection and maintenance.',
    image: '/images/photos/real-estate.jpg',
    imageAlt: 'Modern apartment building with palm trees',
    features: [
      { title: 'Properties & units', body: 'Every property, block and unit, with occupancy at a glance.' },
      { title: 'Tenants & leases', body: 'Onboard tenants, track lease terms and get renewal reminders.' },
      { title: 'Rent & arrears', body: 'Automated invoices and reminders with clear arrears reports.' },
      { title: 'Maintenance', body: 'Log requests, assign vendors and track work orders to completion.' },
    ],
  },
  {
    key: 'eatery',
    name: 'Sellix Eatery',
    short: 'Eatery',
    tagline: 'Front of house and kitchen, in sync',
    summary:
      'Run dine-in, takeaway and delivery from one system — orders flow straight to the kitchen and stock updates itself.',
    image: '/images/photos/eatery-serving.jpg',
    imageAlt: 'Restaurant team plating food in a busy kitchen',
    features: [
      { title: 'Orders, your way', body: 'Dine-in, takeaway and delivery in one queue.' },
      { title: 'Kitchen routing', body: 'Orders reach the kitchen instantly and update as they’re prepared.' },
      { title: 'Menus & recipe costing', body: 'Menus with modifiers and ingredient-level stock deduction.' },
      { title: 'Shift reports', body: 'Cashier, shift and daily sales reports the moment the day closes.' },
    ],
  },
  {
    key: 'pos',
    name: 'Sellix POS',
    short: 'Enterprise POS',
    tagline: 'Point of sale for bigger, busier businesses',
    summary:
      'A point of sale built for high volume — many tills, many branches and thousands of products without slowing down.',
    image: '/images/photos/pos-checkout.jpg',
    imageAlt: 'Cashier serving customers at a point-of-sale terminal',
    features: [
      { title: 'Built for volume', body: 'Fast checkout across many tills and branches, even at peak hours.' },
      { title: 'Barcode, batch & expiry', body: 'Track thousands of SKUs with barcodes, batches and expiry dates.' },
      { title: 'Central pricing', body: 'Prices, promotions, returns and suppliers managed from head office.' },
      { title: 'Control & audit', body: 'Role-based access and a full audit trail of every transaction.' },
    ],
  },
]

export const sellixCore = [
  { title: 'Accounting & reports', body: 'Sales, expenses and profit roll up into clear, exportable reports.' },
  { title: 'Inventory & procurement', body: 'One stock ledger across stores and warehouses, with transfers and reorder alerts.' },
  { title: 'Multi-branch control', body: 'Add locations as you grow and see each branch — or the whole business — at once.' },
  { title: 'Your own business workspace', body: 'Each business gets its own secure Sellix workspace, with users, roles and an audit trail.' },
]

/* ------------------------------------------------------------------ */
/* Bidchale (facts from bidchale.com)                                  */
/* ------------------------------------------------------------------ */

export const bidchale = {
  headline: 'Discover amazing deals. Bid smart, win big & shop with confidence.',
  summary:
    'Bidchale is Ghana’s online bidding marketplace. Buyers bid in real time on electronics, phones, home goods, clothing, office products and car parts — or buy instantly — from vendors whose listings are reviewed before they go live.',
  steps: [
    { title: 'Create an account', body: 'Sign up for free and verify your account to start bidding.' },
    { title: 'Browse and bid', body: 'Explore thousands of items and place your bids.' },
    { title: 'Win the auction', body: 'Be the highest bidder when the timer runs out.' },
    { title: 'Pay & receive', body: 'Complete payment and get your item delivered.' },
  ],
  categories: [
    { name: 'Electronics', image: '/images/bidchale/electronics.png' },
    { name: 'Phones & Accessories', image: '/images/bidchale/phone-accessories.png' },
    { name: 'Home & Kitchen', image: '/images/bidchale/utensils.png' },
    { name: 'Clothing', image: '/images/bidchale/clothing.png' },
    { name: 'Office Products', image: '/images/bidchale/office.png' },
    { name: 'Car Parts', image: '/images/bidchale/car.png' },
  ],
  ways: [
    { title: 'Live auctions', body: 'Bid in real time on items ending soon and win at the price you choose.' },
    { title: 'Buy Now', body: 'Prefer not to wait? Many items can be bought instantly at a fixed price.' },
    { title: 'Auction Warehouse', body: 'Browse a deep catalogue of lots waiting for their next owner.' },
    { title: 'BidStream', body: 'Follow the action as bids land, live.' },
  ],
  payments: ['MTN Mobile Money', 'Vodafone Cash', 'AirtelTigo Money', 'Bank transfer'],
  protection: [
    { title: 'Escrow-protected payments', body: 'Your payment is held in escrow until you confirm you’ve received your item.' },
    { title: 'Reviewed vendor listings', body: 'Every vendor listing is reviewed by the Bidchale team before it goes live.' },
    { title: 'Fair payment window', body: 'Winners typically have 24–48 hours to pay before the item goes to the next highest bidder.' },
    { title: 'Dispute support', body: 'Raise a dispute within 48 hours of the expected delivery date and the team will step in.' },
  ],
  cities: ['Accra', 'Kumasi', 'Tamale', 'Takoradi', 'and beyond'],
}

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export const services = [
  {
    key: 'consultancy',
    name: 'Software consultancy',
    body: 'Architecture reviews, technology selection, digital-transformation roadmaps and project rescue — practical advice from engineers who ship.',
  },
  {
    key: 'developers',
    name: 'Dedicated developers',
    body: 'Need extra hands? We release experienced Talixora developers to work inside your team — part-time, full-time or for a fixed engagement.',
  },
  {
    key: 'development',
    name: 'Custom software development',
    body: 'Bespoke systems built around your process — internal tools, integrations, portals and complete ERP solutions.',
  },
  {
    key: 'apps',
    name: 'Web & mobile apps',
    body: 'Fast, reliable web platforms and Android / iOS apps, from the team behind Sellix and Bidchale.',
  },
  {
    key: 'design',
    name: 'UI/UX & product design',
    body: 'Research, wireframes and polished interfaces that make complex software simple from day one.',
  },
  {
    key: 'support',
    name: 'Maintenance, support & DevOps',
    body: 'Monitoring, fixes, upgrades, cloud deployment and CI/CD so your software keeps running after launch.',
  },
] as const

export const engagementModels = [
  { title: 'The whole project', body: 'We take on a defined scope, timeline and budget, and deliver the finished product.' },
  { title: 'A part of the project', body: 'We join your project for a specific piece — a module, an integration, the mobile app or the design.' },
  { title: 'A developer on request', body: 'We release a dedicated Talixora developer to work within your team, on your tools and your schedule.' },
]

export const developerRoles = [
  'Full-stack developer',
  'Frontend developer',
  'Backend developer',
  'React / Next.js developer',
  'Node.js developer',
  'Mobile app developer',
  'Flutter developer',
  'React Native developer',
  'Android / Kotlin developer',
  'Java developer',
  '.NET developer',
  'Laravel / PHP developer',
  'Python / Django developer',
  'Go developer',
  'UI/UX designer',
  'QA / test engineer',
  'DevOps engineer',
]

export const techStack = [
  { group: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Angular', 'Tailwind CSS'] },
  { group: 'Mobile', items: ['Flutter', 'React Native', 'Kotlin', 'Swift'] },
  { group: 'Backend', items: ['Node.js', '.NET / C#', 'Java', 'Laravel / PHP', 'Django / Python', 'Go'] },
  { group: 'Data', items: ['PostgreSQL', 'MySQL', 'SQL Server', 'MongoDB', 'Redis', 'Firebase'] },
  { group: 'Design', items: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator'] },
]

export const workflow = [
  { step: '01', title: 'Discover', body: 'We learn how your business works and where time and money are being lost.' },
  { step: '02', title: 'Scope', body: 'We agree on scope, milestones and cost up front — and sign an NDA if you need one.' },
  { step: '03', title: 'Build & launch', body: 'Short iterations, regular demos and testing at every step, then a supported go-live.' },
  { step: '04', title: 'Grow', body: 'We keep improving with you — new modules, integrations, branches and features.' },
]

/* ------------------------------------------------------------------ */
/* Company                                                             */
/* ------------------------------------------------------------------ */

export const values = [
  {
    title: 'Built for real operations',
    body: 'We design for how businesses actually run — the lunchtime rush, month-end close, the branch with weak internet.',
  },
  {
    title: 'Craft over shortcuts',
    body: 'Fast, well-tested software with interfaces your staff can learn in an afternoon.',
  },
  {
    title: 'Partners, not vendors',
    body: 'You speak directly with the people doing the work, and we stay close long after launch.',
  },
  {
    title: 'Trust by default',
    body: 'Role-based access, audit trails, escrow and careful handling of data are built into what we ship.',
  },
]

export type TeamMember = { name: string; role: string; note?: string }

export const team: TeamMember[] = [
  { name: 'Michael Opoku', role: 'Founding Team' },
  { name: 'Derrick Daves', role: 'Founding Team' },
  { name: 'Samuel Owusu', role: 'Founding Team' },
  { name: 'Joseph Arthur', role: 'Founding Team' },
  { name: 'Misbahu Ahmed', role: 'Founding Team' },
  { name: 'Melvin Adongo', role: 'Strategic Partner', note: 'CEO, Melit Trade' },
]

export const faqs = [
  {
    title: 'Products',
    items: [
      {
        q: 'What is Sellix?',
        a: 'Sellix is Talixora’s suite of business ERPs, with modules for real estate, eateries and enterprise point of sale. Each business gets its own secure workspace, with inventory, accounting, branches and user roles built in.',
      },
      {
        q: 'Can Sellix handle multiple branches and tills?',
        a: 'Yes. Sellix is built for bigger, busier businesses — manage many branches and tills from one dashboard, with a single stock ledger and consolidated reports.',
      },
      {
        q: 'What is Bidchale and how do payments work?',
        a: 'Bidchale is Ghana’s online bidding marketplace. You can pay with MTN Mobile Money, Vodafone Cash, AirtelTigo Money or bank transfer, and your payment is held in escrow until you confirm you’ve received your item.',
      },
    ],
  },
  {
    title: 'Consultancy & developers',
    items: [
      {
        q: 'Do you work on projects for other companies?',
        a: 'Yes. Alongside our own products, we provide software consultancy and development — the whole project, or just the part you need help with.',
      },
      {
        q: 'Can I request a dedicated developer?',
        a: 'Yes. On request, we release an experienced Talixora developer to work with your team, part-time or full-time, for as long as you need.',
      },
      {
        q: 'Will you sign an NDA?',
        a: 'Yes. If your project needs confidentiality, we’re happy to sign an NDA before we discuss the details.',
      },
    ],
  },
  {
    title: 'Getting started',
    items: [
      {
        q: 'How do I book a Sellix demo?',
        a: 'Send us a message through the Contact page and choose the Sellix module you’re interested in. We reply within one business day to schedule a demo.',
      },
      {
        q: 'Do you help with setup and training?',
        a: 'Yes. We import your data, configure Sellix around your workflows and train your staff before go-live — then stay on hand for support.',
      },
      {
        q: 'I already use Sellix. Where do I sign in?',
        a: 'Go to sellix.bidchale.com and enter your business name to reach your workspace.',
      },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Contact form                                                        */
/* ------------------------------------------------------------------ */

export const enquiryTopics = [
  { value: 'sellix-real-estate', label: 'Sellix Real Estate' },
  { value: 'sellix-eatery', label: 'Sellix Eatery' },
  { value: 'sellix-pos', label: 'Sellix POS' },
  { value: 'bidchale', label: 'Bidchale' },
  { value: 'consultancy', label: 'Software consultancy' },
  { value: 'developer', label: 'Hire a dedicated developer' },
  { value: 'project', label: 'Custom software project' },
  { value: 'other', label: 'Something else' },
] as const

export const budgetRanges = [
  'Not sure yet',
  'Under GH₵ 10,000',
  'GH₵ 10,000 – 50,000',
  'GH₵ 50,000 – 150,000',
  'Above GH₵ 150,000',
]

export function contactHref(topic: (typeof enquiryTopics)[number]['value'], extra?: Record<string, string>) {
  const params = new URLSearchParams({ topic, ...(extra ?? {}) })
  return `/contact?${params.toString()}`
}

export function mailtoLink(subject: string, body: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
