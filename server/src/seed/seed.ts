import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { Project } from '../models/Project';
import { Blog } from '../models/Blog';

dotenv.config();

const seedData = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/orbitly-studio';
    await mongoose.connect(connStr);
    console.log('[Seed] Connected to database');

    // Clear existing collections
    await User.deleteMany({});
    await Project.deleteMany({});
    await Blog.deleteMany({});
    console.log('[Seed] Cleared existing data');

    // 1. Seed Admin User
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    const adminUser = await User.create({
      email: 'admin@orbitly.studio',
      password: hashedPassword,
      role: 'admin',
    });
    console.log(`[Seed] Admin user created: ${adminUser.email}`);

    // 2. Seed Projects
    const projects = [
      {
        title: 'FinFlow — Next-Gen Fintech Ecosystem',
        slug: 'finflow-fintech-ecosystem',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        shortDescription: 'Unified wealth management and real-time transaction engine for digital-first retail banking.',
        problem: 'Legacy banking platforms suffer from fragmented user experiences, high transaction latency, and opaque fee structures that alienation modern retail investors.',
        solution: 'Orbitly Studio architected a zero-friction mobile and web interface backed by a high-throughput micro-frontend design system, reducing onboard drop-off by 62%.',
        outcome: 'Secured $14M Series A funding post-launch, achieving 4.9 stars across 120k App Store reviews in the first quarter.',
        tags: ['Fintech', 'UI/UX Design', 'Web Development', 'Design System'],
        status: 'published',
      },
      {
        title: 'NovaHealth — AI-Powered Patient Triage Platform',
        slug: 'novahealth-patient-triage',
        thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
        shortDescription: 'Intelligent triage software connecting emergency rooms with pre-hospital emergency care teams.',
        problem: 'Emergency care workers lacked real-time patient status synchronization during transit, resulting in critical diagnostic bottlenecks at hospital intake.',
        solution: 'Designed and engineered an ultra-responsive, offline-first tablet app for paramedics that streams vital sign diagnostics directly to clinical trauma bays.',
        outcome: 'Decreased patient admission processing time by 34 minutes per emergency case across 48 regional trauma networks.',
        tags: ['Healthcare', 'Product Strategy', 'App Development', 'AI Integration'],
        status: 'published',
      },
      {
        title: 'Loomly — Collaborative Workspace for Remote Teams',
        slug: 'loomly-collaborative-workspace',
        thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
        shortDescription: 'Spatial collaboration canvas combining async voice notes, real-time whiteboards, and task workflows.',
        problem: 'Remote distributed teams suffered from tool fatigue and fragmented communication across 5+ disconnected SaaS applications.',
        solution: 'Built an all-in-one spatial workspace with canvas rendering, contextual voice clips, and automated sprint velocity tracking.',
        outcome: 'Grew from 0 to 85,000 monthly active teams within 8 months, earning Product Hunt Product of the Year.',
        tags: ['SaaS', 'Brand Identity', 'UI/UX Design', 'Full-Stack'],
        status: 'published',
      },
      {
        title: 'Arc Commerce — High-Conversion Direct-to-Consumer Engine',
        slug: 'arc-commerce-dtc-platform',
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        shortDescription: 'Sub-second headless storefront for premium sustainable fashion and luxury lifestyle brands.',
        problem: 'Monolithic legacy e-commerce stores suffered from 4.8s average load times and poor mobile conversion rates under peak drop traffic.',
        solution: 'Developed a headless storefront leveraging Edge rendering, instant page prefetching, and an interactive 3D product visualizer.',
        outcome: 'Boosted conversion rates by 41% and reduced mobile cart abandonment by 28% during Black Friday peak volume.',
        tags: ['E-Commerce', 'Web Development', 'Headless', 'Brand Identity'],
        status: 'published',
      },
      {
        title: 'Aether Logistics — Predictive Fleet Management [DRAFT]',
        slug: 'aether-logistics-fleet-management',
        thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
        shortDescription: 'Internal logistics dashboard optimizing cargo routes and fuel efficiency for maritime transit.',
        problem: 'Maritime cargo operators relied on manual spreadsheet tracking, leading to route inefficiencies and excessive carbon footprints.',
        solution: 'Created an intelligent telemetry dashboard that computes optimal oceanic transit lanes using historical weather and current vectors.',
        outcome: 'Internal beta trial demonstrated an 11% reduction in fuel consumption across trans-Pacific freight routes.',
        tags: ['Logistics', 'Enterprise UI', 'Product Strategy'],
        status: 'draft',
      },
    ];

    await Project.insertMany(projects);
    console.log(`[Seed] ${projects.length} projects seeded (4 published, 1 draft)`);

    // 3. Seed Blogs
    const blogs = [
      {
        title: 'The Art of Crafting High-Conversion Digital Products in 2026',
        slug: 'art-of-crafting-high-conversion-digital-products',
        excerpt: 'Why minimalism, micro-interactions, and psychological visual hierarchy outperform flashy trends every single time.',
        coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
        content: `### Introduction

In an era saturated with digital noise, users make subconscious decisions about your product within **50 milliseconds**. Winning products don't just solve functional problems—they evoke trust, clarity, and delight through precise craftsmanship.

---

### Key Principles of Craft-Driven Design

#### 1. Visual Hierarchy Over Decorative Noise
Great design is about what you *remove*, not what you decorate. Strong typographic rhythm, generous negative space, and strict color palettes guide the user's eye naturally toward core value propositions.

#### 2. Performance Is a Feature
No matter how beautiful your user interface is, a 3-second delay will decimate conversion rates. Modern web products must aim for instantaneous interaction states (<100ms response times).

#### 3. Purposeful Micro-Animations
Subtle layout transitions and tactile button states provide vital feedback to the user, reinforcing system responsiveness without cluttering the screen.

---

### Conclusion

When building for scale, focus on foundational usability, performance, and craft before chasing fleeting design trends. Orbitly Studio builds products engineered to convert and endure.`,
        featured: true,
        status: 'published',
      },
      {
        title: 'Building Scalable Full-Stack Architectures with TypeScript and Node.js',
        slug: 'scalable-fullstack-architecture-typescript-nodejs',
        excerpt: 'A deep dive into clean folder structure, strict type safety, centralized error handling, and robust database schemas.',
        coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
        content: `### Clean Code & Architecture

Maintaining full-stack codebases requires strict architectural boundaries between data layers, business logic, and presentation views.

#### 1. End-to-End Type Safety
By enforcing TypeScript across both frontend and backend environments, shared interfaces and schemas prevent entire classes of runtime errors.

#### 2. Modular Controller and Middleware Patterns
Decoupling authorization, payload validation (via Zod), and rate limiting ensures that HTTP handlers remain concise and readable.

#### 3. Defensive Database Layering
Always filter public queries at the database layer (e.g., \`{ status: 'published' }\`) to guarantee that unreleased features or draft content never leak into client bundles.`,
        featured: false,
        status: 'published',
      },
      {
        title: 'Design Systems for Ambitious Startups: From MVP to Scale',
        slug: 'design-systems-ambitious-startups-mvp-to-scale',
        excerpt: 'How early-stage teams can standardize tokenized colors, typography, and reusable UI components without slowing down ship velocity.',
        coverImage: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80',
        content: `### Why Design Systems Matter Early

Startups often treat design systems as luxury assets reserved for tech giants. In reality, a light component library created during the MVP stage accelerates feature deployment exponentially.

#### Core Design Tokens
* **Typography Scale**: Standardized display, heading, and body styles.
* **Neutral Color Palette**: Rich slates and dark mode contrast ratios.
* **Component Primitives**: Standard buttons, inputs, modals, and card containers.

Investing 3 days upfront saves months of UI tech debt down the line.`,
        featured: false,
        status: 'published',
      },
      {
        title: 'Why AI-Native Interfaces Require New UI Patterns',
        slug: 'ai-native-interfaces-new-ui-patterns',
        excerpt: 'Exploring conversational UI, streaming state indicators, and generative canvases in modern web applications.',
        coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        content: `### Beyond the Chatbot Box

AI integration is evolving beyond simple chat sidebars into contextual, inline generative tools that feel native to user workflows.

#### Designing for Non-Deterministic Output
Unlike traditional CRUD apps where outputs are deterministic, AI interfaces must handle variable latency, streaming responses, and user verification steps elegantly.`,
        featured: false,
        status: 'published',
      },
      {
        title: 'Behind the Scenes: Refining Orbitly Studio\'s Internal Workflow [DRAFT]',
        slug: 'behind-the-scenes-orbitly-studio-internal-workflow',
        excerpt: 'An internal draft reviewing our client onboarding playbook and sprint velocity rituals.',
        coverImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
        content: `### Internal Draft Document

This article is currently under internal review by the leadership team and should remain unpublished until final approval.`,
        featured: false,
        status: 'draft',
      },
    ];

    await Blog.insertMany(blogs);
    console.log(`[Seed] ${blogs.length} blogs seeded (4 published, 1 draft)`);

    console.log('\n========================================');
    console.log('SEEDING COMPLETED SUCCESSFULLY!');
    console.log('Admin Credentials: admin@orbitly.studio / Admin@123');
    console.log('========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('[Seed] Error during seeding:', error);
    process.exit(1);
  }
};

seedData();
