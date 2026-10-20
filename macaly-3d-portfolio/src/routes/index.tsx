import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/')({ component: Portfolio })

const projects = [
  {
    number: '01', category: 'brand', type: 'WEB · TECHNICAL PORTFOLIO',
    title: 'Prajjwal Portfolio — Technical Projects',
    description: 'A portfolio concept for presenting software projects, technical learning, and clear project documentation.',
    tags: ['Software projects', 'Web', 'Project documentation'],
    status: 'LIVE · EXTERNAL DEMO', visual: 'sales-growth',
    previewTag: 'TECHNICAL PORTFOLIO', previewTitle: 'Make the work easy to explore.', previewSymbol: '⌘',
    problem: 'Business-facing work needs to communicate its value quickly and make the next step obvious.',
    approach: 'This portfolio direction organizes project summaries and technical work into a focused website.',
    testPlan: 'Review mobile layouts, contact paths, section navigation, and the clarity of every case-study claim.',
    next: 'Keep the public site current with verified outcomes and useful project links.',
    demoUrl: 'https://umvrwkq122sm1oz3eqlgisw8.macaly.app',
    repoUrl: '',
    statusNote: 'A separate portfolio concept focused on presenting software projects and technical work clearly.',
  },
  {
    number: '02', category: 'ai', type: 'PYTHON · APPLIED AI · CUSTOMER SUPPORT',
    title: 'CarePilot — AI Customer Support Assistant',
    description: 'A support assistant project with a self-contained browser demo and Python Streamlit source for FAQ retrieval, evidence-linked reply drafts, sentiment cues, categorization, and human-review escalation.',
    tags: ['Python', 'Streamlit', 'Sentence Transformers', 'ChromaDB', 'RAG'],
    status: 'PUBLIC BROWSER DEMO + SOURCE', visual: 'support',
    previewTag: 'CARE / PILOT · SUPPORT COPILOT', previewTitle: 'Evidence before answers.', previewSymbol: '✳',
    problem: 'Support agents need relevant policy information quickly without presenting an unsupported answer as certain.',
    approach: 'The Python source combines FAQ retrieval, a keyword fallback, optional LLM reply drafting, sentiment/category signals, and an escalation flag. The browser demo uses local rules and sample FAQs.',
    testPlan: 'Check retrieval against expected FAQ IDs, review whether replies are supported by their source, and test unclear, empty, and prompt-injection-style inputs.',
    next: 'Expand the evaluation set, improve confidence calibration, and keep suggested replies subject to human review.',
    demoUrl: 'https://prajjwal-ptl.github.io/prajjwal-portfolio/projects/ai-customer-support-assistant/demo/',
    repoUrl: 'https://github.com/prajjwal-ptl/prajjwal-portfolio/tree/main/projects/ai-customer-support-assistant',
    statusNote: 'The public browser demo uses local rules and a sample FAQ; it does not call the Python backend or an LLM API. The Python app and retrieval engine are separate source files.',
  },
  {
    number: '03', category: 'data', type: 'DATA · CUSTOMER FEEDBACK',
    title: 'Customer Feedback Dashboard',
    description: 'A customer-feedback analytics interface with sample responses, headline metrics, sentiment and category filters, trend visuals, and a feedback-detail panel.',
    tags: ['Analytics', 'Charts', 'Sentiment', 'Feedback ops'],
    status: 'CONCEPT / CASE STUDY', visual: 'feedback',
    previewTag: 'FEEDBACK ANALYTICS', previewTitle: 'Listen. Learn. Improve.', previewSymbol: '▦',
    problem: 'Feedback is harder to act on when scores, trends, filters, and individual comments are disconnected.',
    approach: 'The dashboard groups sample metrics, feedback trends, filters, and detail views in one interface.',
    testPlan: 'Verify every navigation control, confirm filters affect results, and test empty and no-match states.',
    next: 'Finish the functional review and label all sample records and figures before presenting it as a production analytics tool.',
    demoUrl: '',
    repoUrl: '',
    statusNote: 'The dashboard uses illustrative sample records, and its add-feedback control needs review before the interface can be presented as a production analytics tool.',
  },
  {
    number: '04', category: 'product', type: 'SOCIAL IMPACT · PRODUCT DESIGN',
    title: 'FoodRescue — Motion Prototype',
    description: 'A food-rescue product prototype exploring restaurant surplus listings, NGO partner pickups, route coordination, sponsorship, and impact summaries.',
    tags: ['Food rescue', 'Community', 'Product design', 'Impact'],
    status: 'CONCEPT / CASE STUDY', visual: 'food',
    previewTag: 'COMMUNITY NETWORK', previewTitle: 'Good food, better routes.', previewSymbol: '♻',
    problem: 'Surplus food and community needs are difficult to coordinate when people, pickup windows, and routes are disconnected.',
    approach: 'The prototype explores separate journeys for restaurants, NGO partners, and sponsors, with an animated sample impact dashboard.',
    testPlan: 'Test all role switches, onboarding flows, route states, and whether illustrative impact figures are clearly explained.',
    next: 'Run a usability pass on the primary journey and label simulated metrics as demo data.',
    demoUrl: '',
    repoUrl: '',
    statusNote: 'This motion-led product concept explores separate journeys for restaurants, NGO partners, and sponsors, with illustrative sample impact metrics.',
  },
  {
    number: '05', category: 'data', type: 'DATA · DECISION INTELLIGENCE',
    title: 'Real-Time Decision Intelligence Demo',
    description: 'A decision dashboard concept combining KPI cards, anomaly alerts, forecast charts, and scenario controls for exploring operational changes.',
    tags: ['KPIs', 'Forecasting', 'Anomaly signals', 'Scenarios'],
    status: 'CONCEPT / CASE STUDY', visual: 'decision',
    previewTag: 'DECISION INTELLIGENCE', previewTitle: 'See what changes next.', previewSymbol: '◉',
    problem: 'Metrics are less useful if people cannot see unusual movement or compare potential outcomes.',
    approach: 'The demo combines sample metric summaries, exception cues, forecast visuals, and what-if controls.',
    testPlan: 'Check calculations, scenario behavior, chart labeling, and whether sample data is clearly distinguished from live business data.',
    next: 'Document scenario assumptions and validate measures before using the demo for real decisions.',
    demoUrl: '',
    repoUrl: '',
    statusNote: 'This is a dashboard concept using sample metrics, anomaly cues, forecasts, and what-if scenarios; it is not connected to a live data source.',
  },
  {
    number: '06', category: 'ai', type: 'AI · CONVERSATIONAL ANALYTICS',
    title: 'AI Conversational BI Demo',
    description: 'A conversational business-intelligence interface with suggested questions, query-led exploration, charts, and concise insight cards driven by sample data.',
    tags: ['Conversational BI', 'Charts', 'Data insights', 'UI/UX'],
    status: 'CONCEPT / CASE STUDY', visual: 'bi',
    previewTag: 'CONVERSATIONAL BI', previewTitle: 'Ask your data.', previewSymbol: '◌',
    problem: 'People often know the business question they want answered but not which dashboard or filter to start with.',
    approach: 'The prototype pairs a question-led interface with static sample charts and insight cards to show a conversational analytics experience.',
    testPlan: 'Confirm sample queries give predictable answers, labels preserve context, and no insight implies access to a live data source.',
    next: 'Connect a documented dataset and explain the supported questions and model limitations.',
    demoUrl: '',
    repoUrl: '',
    statusNote: 'The prototype uses sample values and local query rules; it is not connected to company data or a live language model.',
  },
  {
    number: '07', category: 'brand', type: 'PROJECT STUDIO · INTERNAL WORKFLOWS',
    title: 'Agyatvyakti Workflow Studio',
    description: 'An internal workflow workspace for organizing contacts, onboarding, projects, tasks, and deliverables.',
    tags: ['Lead management', 'Client operations', 'CRM', 'Workflow design'],
    status: 'INTERNAL TOOL · ACCESS RESTRICTED', visual: 'growth',
    previewTag: 'WORKFLOW STUDIO', previewTitle: 'A clearer operating rhythm.', previewSymbol: '⌘',
    problem: 'Studio operations become fragmented when onboarding, project planning, and delivery live in separate tools.',
    approach: 'The workspace brings contacts, projects, tasks, and deliverables into one operational workspace.',
    testPlan: 'Audit authentication and authorization on every list and mutation, validate environment secrets, and separate sample records from any real customer information.',
    next: 'Complete a security review and create a clean public demo dataset before turning on public access.',
    demoUrl: '',
    repoUrl: '',
    statusNote: 'This project is included in full, but its backend manages lead and client operations. It is intentionally not linked to an unrestricted public preview until access controls and data isolation are checked.',
  },
  {
    number: '08', category: 'product', type: 'PERSONAL FINANCE · PRIVATE WORKSPACE',
    title: 'ClearLedger Personal',
    description: 'A personal finance workspace for tracking income, expenses, debts, repayments, and recent transactions, with owner-token access controls.',
    tags: ['Personal finance', 'Transactions', 'Debt tracking', 'Privacy'],
    status: 'PRIVATE TOOL · ACCESS RESTRICTED', visual: 'ledger',
    previewTag: 'CLEARLEDGER / PERSONAL', previewTitle: 'Your records, protected.', previewSymbol: '◎',
    problem: 'Personal records require a focused way to track balances and activity without exposing financial details to other users.',
    approach: 'The app uses an owner-authenticated workspace and separates debt tracking from income and expense activity.',
    testPlan: 'Review owner-token issuance, unauthorized query and mutation behavior, session handling, and database authorization.',
    next: 'Use synthetic data for testing and keep personal financial records private.',
    demoUrl: '',
    repoUrl: '',
    statusNote: 'Access to this personal-finance tool is restricted; this portfolio shows only a high-level project description.',
  },
  {
    number: '09', category: 'brand', type: 'AI · PORTFOLIO EXPLORATION',
    title: 'Dark Knight AI Portfolio',
    description: 'An alternate portfolio direction exploring a cinematic dark identity, AI-focused storytelling, and project-first visual presentation.',
    tags: ['AI', 'Portfolio design', 'Visual identity', 'Web'],
    status: 'CONCEPT / CASE STUDY', visual: 'dark-portfolio',
    previewTag: 'DARK KNIGHT / AI', previewTitle: 'Technology after dark.', previewSymbol: '✳',
    problem: 'A portfolio needs a memorable identity while keeping the work, skills, and navigation easy to understand.',
    approach: 'This alternate concept explores a darker visual language for presenting technical and AI-oriented work.',
    testPlan: 'Check contrast, keyboard focus, responsive navigation, and whether the theme makes projects easier to evaluate.',
    next: 'Reuse the strongest accessible ideas in the main portfolio while keeping this alternative concept documented separately.',
    demoUrl: '',
    repoUrl: '',
    statusNote: 'An alternate portfolio direction exploring a cinematic dark identity, AI-focused storytelling, and project-first visual presentation.',
  },
  {
    number: '10', category: 'brand', type: 'INTERACTIVE DESIGN · 3D',
    title: 'Prajjwal Portfolio — AI 3D Experience',
    description: 'An alternate three-dimensional portfolio concept using spatial visuals, motion, and interaction to tell a technical project story.',
    tags: ['3D visuals', 'Motion', 'Portfolio UX', 'Interaction'],
    status: 'CONCEPT / CASE STUDY', visual: 'three-d',
    previewTag: '3D EXPERIENCE', previewTitle: 'Ideas in motion.', previewSymbol: '◈',
    problem: 'Interactive visuals can make a portfolio memorable, but must not make navigation or project detail harder to use.',
    approach: 'The experience experiments with a motion-led spatial presentation and project-focused visual hierarchy.',
    testPlan: 'Test load performance, keyboard and touch interaction, reduced-motion preferences, and mobile content hierarchy.',
    next: 'Keep motion purposeful and retain accessible, readable project details on smaller screens.',
    demoUrl: '',
    repoUrl: '',
    statusNote: 'This alternate 3D portfolio explores spatial visuals, motion, and interactive project storytelling.',
  },
  {
    number: '11', category: 'brand', type: 'BRAND · STUDIO WEBSITE',
    title: 'Agyat Vyakti Studio',
    description: 'A studio website concept for communicating a brand identity, services, and a consistent digital presence.',
    tags: ['Studio', 'Brand website', 'Web design', 'Messaging'],
    status: 'CONCEPT / CASE STUDY', visual: 'studio',
    previewTag: 'STUDIO WEBSITE', previewTitle: 'Make the work visible.', previewSymbol: '✦',
    problem: 'A studio presence needs a cohesive identity, a clear service story, and an easy way for visitors to make contact.',
    approach: 'The site concept explores a branded presentation that organizes service messaging and the overall studio story.',
    testPlan: 'Review responsive navigation, content hierarchy, accessibility, and all contact links.',
    next: 'Align the final copy with the intended audience and ensure all contact links work.',
    demoUrl: '',
    repoUrl: '',
    statusNote: 'A studio website concept for presenting a cohesive brand identity, clear service messaging, and easy contact paths.',
  },
  {
    number: '12', category: 'brand', type: 'WEB · VISUAL PORTFOLIO',
    title: 'Prajjwal Patel — Visual Portfolio Concept',
    description: 'A visual portfolio concept exploring layout, visual identity, and a clear presentation of selected work.',
    tags: ['Visual design', 'Portfolio layout', 'Web'],
    status: 'CONCEPT / CASE STUDY', visual: 'adimize',
    previewTag: 'VISUAL PORTFOLIO', previewTitle: 'A clear visual direction.', previewSymbol: '◈',
    problem: 'A portfolio is easier to navigate when visual choices support the work rather than distract from it.',
    approach: 'This concept explores a distinct visual identity for presenting selected projects.',
    testPlan: 'Check readability, responsive layouts, accessibility, and working navigation and contact links.',
    next: 'Retain the visual elements that make project details easier to scan.',
    demoUrl: '',
    repoUrl: '',
    statusNote: 'A visual portfolio concept focused on layout, visual identity, and project presentation.',
  },
  {
    number: '13', category: 'brand', type: 'SOFTWARE · PRODUCT THINKING',
    title: 'Prajjwal Portfolio — Product & Software',
    description: 'A portfolio concept focused on product thinking, user needs, and explaining software projects and their intended outcomes.',
    tags: ['Software projects', 'Product thinking', 'User needs', 'Portfolio'],
    status: 'CONCEPT / CASE STUDY', visual: 'sales-product',
    previewTag: 'PRODUCT / SOFTWARE', previewTitle: 'From need to outcome.', previewSymbol: '⌘',
    problem: 'Project stories can feel fragmented when user needs, design decisions, and implementation are shown separately.',
    approach: 'This portfolio direction connects product thinking and software project narratives in one experience.',
    testPlan: 'Review case-study logic, consistency of claims, mobile readability, and every call to action.',
    next: 'Keep the project descriptions specific and distinguish concepts from publicly accessible work.',
    demoUrl: '',
    repoUrl: '',
    statusNote: 'A separate portfolio concept focused on product thinking, user needs, and software project presentation.',
  },
  {
    number: '14', category: 'product', type: 'CRM · LEAD WORKFLOWS',
    title: 'LeadFlow CRM',
    description: 'A lead-management app concept with a drag-and-drop pipeline, lead records, qualification and follow-up fields, prioritization, and status changes.',
    tags: ['CRM', 'Lead pipeline', 'Follow-up', 'Convex'],
    status: 'INTERNAL APP · REVIEW BEFORE PUBLIC RELEASE', visual: 'crm',
    previewTag: 'LEADFLOW / CRM', previewTitle: 'Every lead has a next step.', previewSymbol: '⌁',
    problem: 'Leads can lose momentum when source, qualification, follow-up owner, and the next action are not tracked together.',
    approach: 'The app organizes leads in a pipeline and lets users filter, edit, qualify, and advance opportunities.',
    testPlan: 'Review database access rules, seed/demo data, mutation authorization, and whether one visitor can see or modify another visitor’s records.',
    next: 'Use synthetic lead records for demos and verify access controls before working with real customer data.',
    demoUrl: '',
    repoUrl: 'https://github.com/prajjwal-ptl/prajjwal-portfolio/blob/main/projects.html',
    statusNote: 'LeadFlow CRM demonstrates lead qualification, ownership, pipeline progression, and follow-up workflows. The public repository also contains a LeadFlow case study.',
  },
  {
    number: '15', category: 'brand', type: 'HTML · CSS · JAVASCRIPT',
    title: 'GitHub Portfolio Website',
    description: 'The existing multi-page static website in your public GitHub repository, with home, projects, about, and contact pages, plus a GitHub Actions workflow.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive design', 'GitHub Pages'],
    status: 'LIVE · GITHUB PAGES', visual: 'github-site',
    previewTag: 'PERSONAL PORTFOLIO / WEB', previewTitle: 'Work with a clear story.', previewSymbol: '◈',
    problem: 'A personal website should make work, skills, positioning, and contact information easy to scan.',
    approach: 'The repository contains separate static pages, a shared stylesheet, JavaScript interactions, and a workflow that deploys the site to GitHub Pages.',
    testPlan: 'Review responsive navigation, page-to-page links, keyboard focus, and whether concept work is distinguished from shipped work.',
    next: 'Keep the repository README, live website, and project directory in sync.',
    demoUrl: 'https://prajjwal-ptl.github.io/prajjwal-portfolio/',
    repoUrl: 'https://github.com/prajjwal-ptl/prajjwal-portfolio',
    statusNote: 'The GitHub Pages website was checked and returned HTTP 200 on 19 October 2026. Its repository also contains the CarePilot browser demo.',
  },
  {
    number: '16', category: 'blockchain', type: 'RUST · STELLAR SOROBAN',
    title: 'Blockchain — Dice Game Smart Contract',
    description: 'A public GitHub repository containing a Rust smart-contract workspace built around Stellar Soroban, with a documented dice-game contract concept.',
    tags: ['Rust', 'Stellar Soroban', 'Smart contracts', 'Blockchain'],
    status: 'PUBLIC GITHUB REPOSITORY', visual: 'blockchain',
    previewTag: 'STELLAR / SOROBAN', previewTitle: 'Code you can inspect.', previewSymbol: '◇',
    problem: 'Smart contracts need transparent, reviewable state transitions and careful handling of randomness and payouts.',
    approach: 'The repository includes a Soroban workspace and documents a dice-game contract concept. The README notes that its random-number generation needs improvement.',
    testPlan: 'Review the contract code and tests, examine authorization and payout logic, and replace weak randomness before any real-value use.',
    next: 'Improve randomness and security, expand test coverage, and document contract behavior and tests.',
    demoUrl: '',
    repoUrl: 'https://github.com/prajjwal-ptl/blockchain',
    statusNote: 'Only the public source repository is linked; this card does not claim the contract is audited, production-ready, or suitable for real-value betting.',
  },
  {
    number: '17', category: 'brand', type: 'PRIVATE REPOSITORY · PORTFOLIO EXPLORATION',
    title: 'Prajjwal Portfolio — V2 Repository',
    description: 'A second portfolio repository exists in the connected GitHub account and is currently marked private. It is included in the portfolio inventory so the repository is not silently omitted.',
    tags: ['Portfolio', 'GitHub', 'Private source'],
    status: 'PRIVATE GITHUB REPOSITORY', visual: 'portfolio-v2',
    previewTag: 'PORTFOLIO / V2', previewTitle: 'An alternate build.', previewSymbol: '◈',
    problem: 'Maintaining multiple portfolio versions can preserve experiments, but visitors need a clear single public entry point.',
    approach: 'This repository is recorded as a separate portfolio version without exposing private source or attempting to change its visibility.',
    testPlan: 'Review the contents and decide which finished work should be migrated into the public portfolio, rather than exposing the private repo.',
    next: 'Keep the source private unless you explicitly choose to make it public; surface any shareable projects through public demos or this portfolio.',
    demoUrl: '',
    repoUrl: '',
    statusNote: 'GitHub confirms this repository is private. The project is shown here for completeness, but its code link is intentionally not exposed to public visitors.',
  },
]

const leetcodeBadges = [
  {
    "name": "500 Days Badge",
    "date": "3 Nov 2025",
    "group": "consistency",
    "icon": "https://assets.leetcode.com/static_assets/marketing/lg500.png"
  },
  {
    "name": "365 Days Badge",
    "date": "16 Jun 2025",
    "group": "consistency",
    "icon": "https://assets.leetcode.com/static_assets/marketing/lg365.png"
  },
  {
    "name": "200 Days Badge 2026",
    "date": "1 Aug 2026",
    "group": "consistency",
    "icon": "https://assets.leetcode.com/static_assets/others/200_1080_1080.png"
  },
  {
    "name": "100 Days Badge 2026",
    "date": "16 Apr 2026",
    "group": "consistency",
    "icon": "https://assets.leetcode.com/static_assets/others/100_1080_1080.png"
  },
  {
    "name": "50 Days Badge 2026",
    "date": "22 Feb 2026",
    "group": "consistency",
    "icon": "https://assets.leetcode.com/static_assets/others/50_1080_1080.png"
  },
  {
    "name": "Annual Badge 2025",
    "date": "10 Nov 2025",
    "group": "consistency",
    "icon": "https://assets.leetcode.com/static_assets/others/2025_lg.png"
  },
  {
    "name": "200 Days Badge 2025",
    "date": "29 Jul 2025",
    "group": "consistency",
    "icon": "https://assets.leetcode.com/static_assets/others/lg200.png"
  },
  {
    "name": "100 Days Badge 2025",
    "date": "14 Apr 2025",
    "group": "consistency",
    "icon": "https://assets.leetcode.com/static_assets/others/lg25100.png"
  },
  {
    "name": "50 Days Badge 2025",
    "date": "20 Feb 2025",
    "group": "consistency",
    "icon": "https://assets.leetcode.com/static_assets/others/lg2550.png"
  },
  {
    "name": "200 Days Badge 2024",
    "date": "24 Dec 2024",
    "group": "consistency",
    "icon": "https://assets.leetcode.com/static_assets/marketing/2024-200-lg.png"
  },
  {
    "name": "100 Days Badge 2024",
    "date": "9 Sep 2024",
    "group": "consistency",
    "icon": "https://assets.leetcode.com/static_assets/marketing/2024-100-lg.png"
  },
  {
    "name": "50 Days Badge 2024",
    "date": "20 Jul 2024",
    "group": "consistency",
    "icon": "https://assets.leetcode.com/static_assets/marketing/2024-50-lg.png"
  },
  {
    "name": "Sep LeetCoding Challenge 2026",
    "date": "30 Sep 2026",
    "group": "daily",
    "icon": "https://leetcode.com/static/images/badges/dcc-2026-9.png"
  },
  {
    "name": "Aug LeetCoding Challenge 2026",
    "date": "31 Aug 2026",
    "group": "daily",
    "icon": "https://leetcode.com/static/images/badges/dcc-2026-8.png"
  },
  {
    "name": "Jul LeetCoding Challenge 2026",
    "date": "31 Jul 2026",
    "group": "daily",
    "icon": "https://leetcode.com/static/images/badges/dcc-2026-7.png"
  },
  {
    "name": "Jun LeetCoding Challenge 2026",
    "date": "30 Jun 2026",
    "group": "daily",
    "icon": "https://leetcode.com/static/images/badges/dcc-2026-6.png"
  },
  {
    "name": "May LeetCoding Challenge 2026",
    "date": "5 Jun 2026",
    "group": "daily",
    "icon": "https://leetcode.com/static/images/badges/dcc-2026-5.png"
  },
  {
    "name": "Apr LeetCoding Challenge 2026",
    "date": "30 Apr 2026",
    "group": "daily",
    "icon": "https://leetcode.com/static/images/badges/dcc-2026-4.png"
  },
  {
    "name": "Mar LeetCoding Challenge 2026",
    "date": "31 Mar 2026",
    "group": "daily",
    "icon": "https://leetcode.com/static/images/badges/dcc-2026-3.png"
  },
  {
    "name": "Feb LeetCoding Challenge 2026",
    "date": "28 Feb 2026",
    "group": "daily",
    "icon": "https://leetcode.com/static/images/badges/dcc-2026-2.png"
  },
  {
    "name": "Jan LeetCoding Challenge 2026",
    "date": "31 Jan 2026",
    "group": "daily",
    "icon": "https://leetcode.com/static/images/badges/dcc-2026-1.png"
  },
  {
    "name": "Dec LeetCoding Challenge 2025",
    "date": "31 Dec 2025",
    "group": "daily",
    "icon": "https://leetcode.com/static/images/badges/dcc-2025-12.png"
  },
  {
    "name": "Nov LeetCoding Challenge 2025",
    "date": "30 Nov 2025",
    "group": "daily",
    "icon": "https://leetcode.com/static/images/badges/dcc-2025-11.png"
  },
  {
    "name": "Oct LeetCoding Challenge 2025",
    "date": "31 Oct 2025",
    "group": "daily",
    "icon": "https://leetcode.com/static/images/badges/dcc-2025-10.png"
  },
  {
    "name": "Sep LeetCoding Challenge 2025",
    "date": "30 Sep 2025",
    "group": "daily",
    "icon": "https://leetcode.com/static/images/badges/dcc-2025-9.png"
  },
  {
    "name": "Aug LeetCoding Challenge 2025",
    "date": "31 Aug 2025",
    "group": "daily",
    "icon": "https://leetcode.com/static/images/badges/dcc-2025-8.png"
  },
  {
    "name": "Jul LeetCoding Challenge 2025",
    "date": "31 Jul 2025",
    "group": "daily",
    "icon": "https://leetcode.com/static/images/badges/dcc-2025-7.png"
  },
  {
    "name": "Jun LeetCoding Challenge 2025",
    "date": "30 Jun 2025",
    "group": "daily",
    "icon": "https://leetcode.com/static/images/badges/dcc-2025-6.png"
  },
  {
    "name": "May LeetCoding Challenge 2025",
    "date": "1 Jun 2025",
    "group": "daily",
    "icon": "https://leetcode.com/static/images/badges/dcc-2025-5.png"
  },
  {
    "name": "Apr LeetCoding Challenge 2025",
    "date": "30 Apr 2025",
    "group": "daily",
    "icon": "https://leetcode.com/static/images/badges/dcc-2025-4.png"
  },
  {
    "name": "Mar LeetCoding Challenge 2025",
    "date": "31 Mar 2025",
    "group": "daily",
    "icon": "https://leetcode.com/static/images/badges/dcc-2025-3.png"
  },
  {
    "name": "Feb LeetCoding Challenge 2025",
    "date": "28 Feb 2025",
    "group": "daily",
    "icon": "https://leetcode.com/static/images/badges/dcc-2025-2.png"
  },
  {
    "name": "Jan LeetCoding Challenge 2025",
    "date": "31 Jan 2025",
    "group": "daily",
    "icon": "https://leetcode.com/static/images/badges/dcc-2025-1.png"
  },
  {
    "name": "Dec LeetCoding Challenge 2024",
    "date": "1 Jan 2025",
    "group": "daily",
    "icon": "https://leetcode.com/static/images/badges/dcc-2024-12.png"
  },
  {
    "name": "Nov LeetCoding Challenge 2024",
    "date": "30 Nov 2024",
    "group": "daily",
    "icon": "https://leetcode.com/static/images/badges/dcc-2024-11.png"
  },
  {
    "name": "Oct LeetCoding Challenge 2024",
    "date": "31 Oct 2024",
    "group": "daily",
    "icon": "https://leetcode.com/static/images/badges/dcc-2024-10.png"
  },
  {
    "name": "Sep LeetCoding Challenge 2024",
    "date": "30 Sep 2024",
    "group": "daily",
    "icon": "https://leetcode.com/static/images/badges/dcc-2024-9.png"
  },
  {
    "name": "Aug LeetCoding Challenge 2024",
    "date": "31 Aug 2024",
    "group": "daily",
    "icon": "https://leetcode.com/static/images/badges/dcc-2024-8.png"
  },
  {
    "name": "Jul LeetCoding Challenge 2024",
    "date": "31 Jul 2024",
    "group": "daily",
    "icon": "https://leetcode.com/static/images/badges/dcc-2024-7.png"
  },
  {
    "name": "Jun LeetCoding Challenge 2024",
    "date": "30 Jun 2024",
    "group": "daily",
    "icon": "https://leetcode.com/static/images/badges/dcc-2024-6.png"
  },
  {
    "name": "Introduction to Pandas",
    "date": "9 Sep 2024",
    "group": "study",
    "icon": "https://assets.leetcode.com/static_assets/others/Introduction_to_Pandas_Badge.png"
  },
  {
    "name": "Top SQL 50",
    "date": "8 Sep 2024",
    "group": "study",
    "icon": "https://assets.leetcode.com/static_assets/others/Top_SQL_50.png"
  },
  {
    "name": "LeetCode 75",
    "date": "5 Sep 2024",
    "group": "study",
    "icon": "https://assets.leetcode.com/static_assets/others/LeetCode_75.png"
  }
] as const

export function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState(0)
  const [heroPointer, setHeroPointer] = useState({ x: 0, y: 0 })
  const [activeFilter, setActiveFilter] = useState<'all' | 'ai' | 'data' | 'product' | 'brand' | 'blockchain'>('all')
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null)
  useEffect(() => {
    if (!selectedProject) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProject(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [selectedProject])
  const visibleProjects = projects.filter((project) => activeFilter === 'all' || project.category === activeFilter)

  return (
    <main className="portfolio-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar">
        <a href="#home" className="brand" aria-label="Prajjwal Patel home">
          <span className="brand-mark">P<span>.</span></span>
          <span className="brand-name">PRAJJWAL PATEL <small>PORTFOLIO / 2026</small></span>
        </a>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">{menuOpen ? 'CLOSE −' : 'MENU +'}</button>
        <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'}>
          <a href="#work" onClick={() => setMenuOpen(false)}>Selected work</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#toolkit" onClick={() => setMenuOpen(false)}>Toolkit</a>
          <a href="#leetcode" onClick={() => setMenuOpen(false)}>LeetCode</a>
          <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>Let’s connect <span>↗</span></a>
        </nav>
      </header>

      <section className="hero-section" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot" /> TARGETING JUNIOR GENAI · PYTHON · AI / ML ROLES <span className="eyebrow-line" /></div>
          <h1>Junior GenAI<br />developer with <em>Python</em><span className="title-period">.</span></h1>
          <p className="hero-lede">I’m Prajjwal, a 2026 B.Tech CSE graduate building toward GenAI, AI/ML, and data science roles, with Java as my main problem-solving language on LeetCode.</p>
          <div className="hero-actions">
            <a className="button-primary" href="#work">Explore my work <span>↘</span></a>
            <a className="button-text" href="#about">A little about me <span>↗</span></a>
          </div>
          <div className="hero-meta">
            <div><span className="meta-label">BASE</span><strong>Bengaluru, India <i>↗</i></strong></div>
            <div><span className="meta-label">BACKGROUND</span><strong>B.Tech CSE · 2026</strong></div>
            <div><span className="meta-label">TARGET ROLE</span><strong>Junior GenAI · Python · AI/ML</strong></div>
          </div>
        </div>

        <div className="hero-stage" aria-label="Interactive abstract 3D orbit illustration" onMouseMove={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect()
          const x = (event.clientX - bounds.left) / bounds.width - 0.5
          const y = (event.clientY - bounds.top) / bounds.height - 0.5
          setHeroPointer({ x: Math.round(x * 22), y: Math.round(y * 22) })
        }} onMouseLeave={() => setHeroPointer({ x: 0, y: 0 })}>
          <div className="stage-grid" />
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />
          <div className="planet" style={{ translate: `${heroPointer.x}px ${heroPointer.y}px` }}> 
            <div className="planet-shine" />
            <div className="planet-ring" />
            <div className="planet-cut" />
          </div>
          <div className="floating-chip chip-python"><span className="chip-icon">J</span><span>JAVA <small>LEETCODE · DSA</small></span></div>
          <div className="floating-chip chip-ai"><span className="chip-symbol">Py</span><span>PYTHON <small>GENAI LEARNING FOCUS</small></span></div>
          <div className="floating-chip chip-api"><span className="chip-symbol">✳</span><span>GENAI · AI / ML <small>LEARNING BY BUILDING</small></span></div>
          <div className="stage-caption"><span>FIG. 01</span><span>IDEAS → WORKING SOFTWARE</span></div>
          <div className="stage-cross cross-one">+</div><div className="stage-cross cross-two">+</div>
        </div>
        <div className="hero-bottomline"><span>CURIOUS BY DEFAULT. PRACTICAL BY DESIGN.</span><a href="#work">SCROLL TO EXPLORE ↓</a></div>
      </section>

      <section className="workflow-strip" aria-labelledby="workflow-title">
        <div className="workflow-head">
          <div><span className="workflow-kicker">THE BUILD LOOP / 04 STEPS</span><h2 id="workflow-title">How I turn a problem into <em>working software.</em></h2></div>
          <span className="workflow-side">CLARITY → CODE → CONFIDENCE</span>
        </div>
        <div className="workflow-steps">
          <article className="workflow-step"><span className="workflow-index">01</span><span className="workflow-icon">⌕</span><h3>Understand</h3><p>Define the real problem, the user, and a useful outcome.</p></article>
          <span className="workflow-arrow" aria-hidden="true">↗</span>
          <article className="workflow-step"><span className="workflow-index">02</span><span className="workflow-icon">{'{ }'}</span><h3>Plan</h3><p>Break the solution into small, testable tasks.</p></article>
          <span className="workflow-arrow" aria-hidden="true">↗</span>
          <article className="workflow-step"><span className="workflow-index">03</span><span className="workflow-icon">⌘</span><h3>Build</h3><p>Write readable code and connect only what is needed.</p></article>
          <span className="workflow-arrow" aria-hidden="true">↗</span>
          <article className="workflow-step"><span className="workflow-index">04</span><span className="workflow-icon">✓</span><h3>Validate</h3><p>Test edge cases, document limits, and improve with feedback.</p></article>
        </div>
      </section>

      <section className="proof-strip" aria-label="Portfolio highlights">
        <div className="proof-intro"><span className="section-kicker">A FEW FACTS, NO FLUFF</span><p>Grounded in fundamentals.<br /><em>Built by learning.</em></p></div>
        <div className="proof-item"><strong>1,023</strong><span>LeetCode problems solved</span></div>
        <div className="proof-item"><strong>43</strong><span>LeetCode badges earned</span></div>
        <div className="proof-item"><strong>7.73</strong><span>CGPA · B.Tech CSE</span></div>
      </section>

      <section className="manifesto" id="about">
        <div className="section-kicker"><span>01 / THE PERSON BEHIND THE PROJECTS</span><span className="kicker-rule" /></div>
        <div className="manifesto-grid">
          <h2>Technology should<br />make things feel<br /><em>less complicated.</em></h2>
          <div className="manifesto-copy">
            <p>I’m a 2026 Computer Science graduate from Oriental College of Technology, Bhopal. I enjoy breaking down problems, understanding what people actually need, and turning that understanding into useful digital tools.</p>
            <p>My interest in customer-support workflows has led me toward applied AI: tools that can find the right information, assist with repetitive tasks, and keep people in control when a situation needs human judgement.</p>
            <div className="education-stamp"><span className="stamp-icon">✳</span><span><small>EDUCATION</small><strong>B.Tech · Computer Science Engineering</strong><small>ORIENTAL COLLEGE OF TECHNOLOGY, BHOPAL · CGPA 7.73</small></span></div>
          </div>
        </div>
      </section>

      <section className="leetcode-section" id="leetcode" aria-labelledby="leetcode-heading">
        <div className="section-kicker"><span>02 / LEETCODE ACHIEVEMENTS</span><span className="kicker-rule" /><span className="section-side-note">PUBLIC PROFILE SNAPSHOT · 19 OCT 2026</span></div>
        <div className="leetcode-heading-row">
          <div className="leetcode-heading-copy">
            <span className="leetcode-eyebrow"><span className="leetcode-pulse" /> PROFILE VERIFIED FROM LEETCODE PUBLIC DATA</span>
            <h2 id="leetcode-heading">A thousand problems.<br /><em>Years of consistency.</em></h2>
            <p>My problem-solving record spans interview-style algorithms, database queries, data manipulation, and repeated daily practice. The numbers and badge list below were read from my public LeetCode profile.</p>
          </div>
          <a className="leetcode-profile-button" href="https://leetcode.com/u/_Prajjwal_39_/" target="_blank" rel="noreferrer">View live LeetCode profile <span>↗</span></a>
        </div>
        <div className="leetcode-stat-grid">
          <article className="leetcode-stat leetcode-stat-featured"><span>PROBLEMS SOLVED</span><strong>1,023</strong><small>323 Easy · 528 Medium · 172 Hard</small><div className="leetcode-stat-mark">LC / 001</div></article>
          <article className="leetcode-stat"><span>GLOBAL RANK</span><strong>#32,674</strong><small>Public profile rank at snapshot time</small></article>
          <article className="leetcode-stat"><span>BADGES EARNED</span><strong>43</strong><small>Consistency, daily challenges, study plans</small></article>
          <article className="leetcode-stat"><span>LONG-RUN MILESTONE</span><strong>500 days</strong><small>Also earned the 365 Days Badge</small></article>
        </div>
        <div className="leetcode-insights-grid">
          <article className="leetcode-panel">
            <div className="leetcode-panel-heading"><div><span>01 / PROBLEM MIX</span><h3>Difficulty breakdown</h3></div><span className="leetcode-panel-icon">▥</span></div>
            <p className="leetcode-panel-copy">Medium problems make up just over half of the solved set.</p>
            <div className="difficulty-list">
              <div className="difficulty-line"><div><span>Easy</span><strong>323 <small>· 31.6%</small></strong></div><div className="difficulty-track"><i className="difficulty-easy" style={{ width: '31.6%' }} /></div></div>
              <div className="difficulty-line"><div><span>Medium</span><strong>528 <small>· 51.6%</small></strong></div><div className="difficulty-track"><i className="difficulty-medium" style={{ width: '51.6%' }} /></div></div>
              <div className="difficulty-line"><div><span>Hard</span><strong>172 <small>· 16.8%</small></strong></div><div className="difficulty-track"><i className="difficulty-hard" style={{ width: '16.8%' }} /></div></div>
            </div>
            <div className="leetcode-divider" />
            <div className="leetcode-panel-heading"><div><span>02 / LANGUAGES</span><h3>Tools used to solve</h3></div><span className="leetcode-panel-icon">{'{ }'}</span></div>
            <div className="language-achievement-list">
              <div><span className="language-token token-java">J</span><span className="language-name">Java</span><strong>958</strong><small>problems</small></div>
              <div><span className="language-token token-sql">SQL</span><span className="language-name">MySQL</span><strong>50</strong><small>problems</small></div>
              <div><span className="language-token token-pandas">Pd</span><span className="language-name">Pandas</span><strong>15</strong><small>problems</small></div>
            </div>
          </article>
          <article className="leetcode-panel topic-panel">
            <div className="leetcode-panel-heading"><div><span>03 / TOPIC STRENGTHS</span><h3>Areas I’ve practised most</h3></div><span className="leetcode-panel-icon">✳</span></div>
            <p className="leetcode-panel-copy">Topic counts can overlap because a problem may have more than one tag.</p>
            <div className="topic-achievement-list">
              <div><span>Array</span><div className="topic-track"><i style={{ width: '100%' }} /></div><strong>599</strong></div>
              <div><span>Hash Table</span><div className="topic-track"><i style={{ width: '37.6%' }} /></div><strong>225</strong></div>
              <div><span>String</span><div className="topic-track"><i style={{ width: '40.7%' }} /></div><strong>244</strong></div>
              <div><span>Math</span><div className="topic-track"><i style={{ width: '29.0%' }} /></div><strong>174</strong></div>
              <div><span>Dynamic Programming</span><div className="topic-track"><i style={{ width: '25.0%' }} /></div><strong>150</strong></div>
              <div><span>Sorting</span><div className="topic-track"><i style={{ width: '24.9%' }} /></div><strong>149</strong></div>
              <div><span>Greedy</span><div className="topic-track"><i style={{ width: '22.2%' }} /></div><strong>133</strong></div>
              <div><span>Binary Search</span><div className="topic-track"><i style={{ width: '16.2%' }} /></div><strong>97</strong></div>
            </div>
          </article>
        </div>
        <div className="badge-collection-heading"><div><span>04 / COMPLETE COLLECTION</span><h3>Every badge, in one place.</h3><p>43 earned badges from the public profile: consistency milestones, monthly challenges, and structured study plans.</p></div><span className="badge-total">43 <small>BADGES</small></span></div>
        <details className="badge-group" open>
          <summary><span><i className="badge-group-dot" />Consistency & annual milestones</span><b>12 badges <span>＋</span></b></summary>
          <div className="badge-grid">{leetcodeBadges.filter(badge => badge.group === 'consistency').map(badge => <article className="leetcode-badge-card" key={badge.name}><div className="leetcode-badge-art"><img src={badge.icon} alt="" loading="lazy" /></div><div><strong>{badge.name}</strong><small>{badge.date}</small></div></article>)}</div>
        </details>
        <details className="badge-group">
          <summary><span><i className="badge-group-dot" />Daily LeetCoding Challenges</span><b>28 badges <span>＋</span></b></summary>
          <div className="badge-grid">{leetcodeBadges.filter(badge => badge.group === 'daily').map(badge => <article className="leetcode-badge-card" key={badge.name}><div className="leetcode-badge-art"><img src={badge.icon} alt="" loading="lazy" /></div><div><strong>{badge.name}</strong><small>{badge.date}</small></div></article>)}</div>
        </details>
        <details className="badge-group">
          <summary><span><i className="badge-group-dot" />Study-plan awards</span><b>3 badges <span>＋</span></b></summary>
          <div className="badge-grid">{leetcodeBadges.filter(badge => badge.group === 'study').map(badge => <article className="leetcode-badge-card" key={badge.name}><div className="leetcode-badge-art"><img src={badge.icon} alt="" loading="lazy" /></div><div><strong>{badge.name}</strong><small>{badge.date}</small></div></article>)}</div>
        </details>
        <div className="leetcode-footnote"><span>i</span><p>Stats are a snapshot retrieved on 19 October 2026 and can change as new submissions or awards are recorded. The submission calendar and contest rating were not available from the public query, so they are intentionally not claimed here.</p><a href="https://leetcode.com/u/_Prajjwal_39_/" target="_blank" rel="noreferrer">Check latest stats ↗</a></div>
      </section>

      <section className="work-section" id="work">
        <div className="section-kicker"><span>03 / SELECTED WORK</span><span className="kicker-rule" /><span className="section-side-note">EARLY BUILDS, REAL LEARNING</span></div>
        <div className="work-heading"><h2>Every project.<br /><em>One place.</em></h2><p>A complete collection of projects across AI, web, data, products, and business workflows. Open public demos and source repositories where available, or explore each project case study.</p></div>
        <div className="project-filters" role="group" aria-label="Filter projects">
          <button type="button" className={activeFilter === 'all' ? 'filter-chip filter-active' : 'filter-chip'} onClick={() => setActiveFilter('all')} aria-pressed={activeFilter === 'all'}>All projects <span>17</span></button>
          <button type="button" className={activeFilter === 'ai' ? 'filter-chip filter-active' : 'filter-chip'} onClick={() => setActiveFilter('ai')} aria-pressed={activeFilter === 'ai'}>AI & support <span>02</span></button>
          <button type="button" className={activeFilter === 'data' ? 'filter-chip filter-active' : 'filter-chip'} onClick={() => setActiveFilter('data')} aria-pressed={activeFilter === 'data'}>Data & intelligence <span>02</span></button>
          <button type="button" className={activeFilter === 'product' ? 'filter-chip filter-active' : 'filter-chip'} onClick={() => setActiveFilter('product')} aria-pressed={activeFilter === 'product'}>Product & workflow <span>03</span></button>
          <button type="button" className={activeFilter === 'brand' ? 'filter-chip filter-active' : 'filter-chip'} onClick={() => setActiveFilter('brand')} aria-pressed={activeFilter === 'brand'}>Brands & portfolios <span>09</span></button>
          <button type="button" className={activeFilter === 'blockchain' ? 'filter-chip filter-active' : 'filter-chip'} onClick={() => setActiveFilter('blockchain')} aria-pressed={activeFilter === 'blockchain'}>Blockchain <span>01</span></button>
        </div>
        <div className="project-grid">
          {visibleProjects.map((project) => (
            <article className={activeProject === Number(project.number) - 1 ? 'project-card project-active' : 'project-card'} key={project.number} onMouseEnter={() => setActiveProject(Number(project.number) - 1)}>
              <div className={'project-art ' + project.visual}>
                <div className="art-window">
                  <div className="portfolio-preview">
                    <div className="preview-top"><span className="mini-dot" /><span>{project.previewTag}</span><span className="ui-pill">{project.category.toUpperCase()}</span></div>
                    <div className="preview-main">
                      <span className="preview-symbol">{project.previewSymbol}</span>
                      <div><small>{project.type}</small><strong>{project.previewTitle}</strong></div>
                    </div>
                    <div className="preview-bars"><i /><i /><i /></div>
                    <div className="preview-bottom"><span>{project.tags[0]}</span><span>{project.tags[1]}</span></div>
                  </div>
                </div>
                <span className="art-index">{project.number} / {String(projects.length).padStart(2, '0')}</span>
                <span className="art-orb" />
              </div>
              <div className="project-content">
                <div className="project-meta"><span>{project.type}</span><span className={(project.demoUrl || project.repoUrl) ? "in-progress live-status" : "in-progress"}><i /> {project.status}</span></div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                <div className="project-actions">{project.demoUrl && <a className="project-action project-action-primary" href={project.demoUrl} target="_blank" rel="noreferrer">{project.title === 'Digital Growth Portfolio Website' || project.title === 'GitHub Portfolio Website' ? 'Open portfolio site' : 'Open live demo'} <span>↗</span></a>}{project.repoUrl && <a className="project-action" href={project.repoUrl} target="_blank" rel="noreferrer">View GitHub source <span>↗</span></a>}</div><button type="button" className="project-link" onClick={() => setSelectedProject(project)}>Read case study details <span>↗</span></button>
              </div>
            </article>
          ))}

        </div>
        <div className="honesty-note"><span>✳</span><p><strong>Project access, clearly labeled.</strong> Public demo and source links are provided where available. Concept work and restricted tools are labeled so visitors can distinguish case studies from publicly accessible demos.</p></div>
      </section>

      <section className="toolkit-section" id="toolkit">
        <div className="section-kicker"><span>04 / MY TOOLKIT</span><span className="kicker-rule" /><span className="section-side-note">LEARNING BY BUILDING</span></div>
        <div className="toolkit-heading"><h2>Core skills.<br /><em>Focused next steps.</em></h2><p>Java is my strongest documented language through LeetCode practice. I’m building my Python foundation and learning toward GenAI, AI/ML, and data science roles.</p></div>
        <div className="toolkit-grid">
          <div className="toolkit-card"><span className="tool-number">01</span><div className="tool-icon api-icon">J</div><h3>Java & problem solving</h3><p>My main LeetCode language, backed by consistent practice with algorithmic problems.</p><div className="tool-tags"><span>Java</span><span>DSA practice</span><span>LeetCode</span></div></div>
          <div className="toolkit-card"><span className="tool-number">02</span><div className="tool-icon python-icon">Py</div><h3>Python foundations</h3><p>Developing programming, scripting, and data-handling fundamentals for AI-focused work.</p><div className="tool-tags"><span>Python</span><span>JSON</span><span>Data basics</span></div></div>
          <div className="toolkit-card"><span className="tool-number">03</span><div className="tool-icon ai-icon">✳</div><h3>GenAI & AI/ML learning</h3><p>Exploring LLM and retrieval concepts while building toward practical AI/ML projects.</p><div className="tool-tags"><span>LLM concepts</span><span>RAG concepts</span><span>ML foundations</span></div></div>
          <div className="toolkit-card"><span className="tool-number">04</span><div className="tool-icon git-icon">▦</div><h3>Data science foundations</h3><p>Practising database queries and data manipulation through structured problem solving.</p><div className="tool-tags"><span>MySQL</span><span>Pandas</span><span>Data basics</span></div></div>
        </div>
      </section>


      {selectedProject && (
        <div className="case-overlay" onClick={() => setSelectedProject(null)}>
          <section className="case-modal" role="dialog" aria-modal="true" aria-labelledby="case-modal-title" tabIndex={-1} onClick={(event) => event.stopPropagation()}>
            <div className="case-modal-top"><span className="case-overline">CASE FILE / {selectedProject.number} · {selectedProject.status}</span><button type="button" className="case-close" aria-label="Close case study" onClick={() => setSelectedProject(null)}>×</button></div>
            <div className="case-modal-body">
              <span className="case-category">{selectedProject.type}</span>
              <h2 id="case-modal-title">{selectedProject.title}<span>.</span></h2>
              <p className="case-lede">{selectedProject.description}</p>
              <div className="project-tags case-tags">{selectedProject.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              <div className="case-grid">
                <article><span>01 / THE PROBLEM</span><h3>Why this work matters</h3><p>{selectedProject.problem}</p></article>
                <article><span>02 / THE APPROACH</span><h3>Designed around the user</h3><p>{selectedProject.approach}</p></article>
                <article><span>03 / WHAT TO TEST</span><h3>Verify before sharing</h3><p>{selectedProject.testPlan}</p></article>
                <article><span>04 / NEXT MILESTONE</span><h3>The next practical step</h3><p>{selectedProject.next}</p></article>
              </div>
              <div className="case-reality"><span className="case-reality-mark">i</span><p><strong>Project access & status:</strong> {selectedProject.statusNote}</p></div>
              <div className="case-actions"><button type="button" className="case-secondary" onClick={() => setSelectedProject(null)}>Close details</button>{selectedProject.demoUrl && <a className="button-primary" href={selectedProject.demoUrl} target="_blank" rel="noreferrer">{selectedProject.title === 'Digital Growth Portfolio Website' || selectedProject.title === 'GitHub Portfolio Website' ? 'Open portfolio site' : 'Open live demo'} <span>↗</span></a>}{selectedProject.repoUrl && <a className="button-outline" href={selectedProject.repoUrl} target="_blank" rel="noreferrer">View GitHub source ↗</a>}</div>
            </div>
          </section>
        </div>
      )}

      <section className="contact-section" id="contact">
        <div className="contact-orbit"><div className="contact-orbit-ring" /><div className="contact-orbit-core">P<span>.</span></div><span className="contact-star">✳</span></div>
        <div className="contact-copy"><div className="section-kicker"><span>05 / LET’S CONNECT</span></div><h2>Ready to build<br /><em>and keep learning.</em></h2><p>I’m seeking junior GenAI and Python-focused opportunities, with an interest in AI/ML and data science. I bring a strong Java problem-solving foundation and am continuing to build my Python and applied-AI skills.</p><div className="contact-actions"><a className="button-primary" href="mailto:patelprajjwal7@gmail.com">Email me <span>↗</span></a><a className="button-outline" href="https://github.com/prajjwal-ptl" target="_blank" rel="noreferrer">GitHub profile ↗</a><a className="button-outline" href="https://www.linkedin.com/in/prajjwalpatel/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a className="button-outline" href="https://prajjwal-ptl.github.io/prajjwal-portfolio/macaly-3d-portfolio/resume.pdf" download="Prajjwal_Patel_Resume.pdf">Download résumé ↓</a></div></div>
      </section>
      <footer className="footer"><a href="#home" className="footer-brand">P<span>.</span> PRAJJWAL PATEL</a><span>BUILT THROUGH PRACTICE.</span><a href="#home">BACK TO TOP ↑</a><span>© 2026</span></footer>
    </main>
  )
}
