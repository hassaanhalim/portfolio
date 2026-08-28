# Modern Developer Portfolio & Admin CMS

A high-performance, aesthetically refined portfolio website inspired by [Magic UI](https://portfolio-magicui.vercel.app/). Built with **React 18**, **TypeScript**, **Vite**, and a bespoke **Vanilla CSS Design System**, featuring a protected in-browser CMS dashboard at `/#/admin` for real-time content management without touching code.

---

## Key Features

### Visual Design & Aesthetics
- **Interactive Dot Matrix Background**: High-performance HTML5 Canvas wave motion background with multi-layered atmospheric lighting mesh.
- **Dual Themes (Light & Dark)**:
  - **Dark Mode**: Sleek obsidian background (`#08090a`), frosted glass blur (`18px`), and subtle neon sky-blue accents.
  - **High-Impact Light Mode**: Deep black-slate typography (`#090d16`), elevated pure white surfaces, multi-tier soft shadows, and vibrant emerald indicators.
- **Sticky Glassmorphic Navbar**: Matches the 760px main content width, tracks active page sections, and provides a tactile theme switch.
- **Authentic Vector Tech Icons**: Crisp scalable SVG icons for major languages, frameworks, databases, and developer tools (React, TypeScript, Next.js, Node.js, Python, PostgreSQL, Docker, AWS, etc.).

### Projects & Live Website Preview Engine
- **Direct Live Website Iframe Previews**: Embed interactive live sites directly into project cards inside a scaled 16:9 mini browser container with traffic light window controls.
- **16:9 Proportional Aspect Ratio**: Standardized responsive aspect ratios across all devices to prevent distortion or misalignment.
- **Multiple Preview Modes**: Support for **Live Iframe**, **Image Snapshots**, and auto-looping **MP4/WebM Video Demos**.

### Direct Protocol Dispatch & Contact
- **Direct Mail Composer Dispatch**: Automatically cleans, formats, and launches visitor email clients (Gmail, Outlook, Apple Mail) with recipient pre-filled in the `To:` line without opening empty browser tabs.
- **Integrated Contact Inbox**: Contact form submissions are routed directly into the protected admin inbox with unread tracking and instant email reply triggers.

---

## In-Browser Admin Management Suite (/#/admin)

The portfolio includes a protected administration panel accessible exclusively via `/#/admin` (completely hidden from regular visitors).

### Default Credentials
- **Username**: `hassaanhalim`
- **Password**: `hassaan1996`

### Admin Modules
1. **Profile & Hero**: Edit name, title, bio, location, status badge ("Available for projects"), resume URL, and social media handles.
2. **Work Experience**: Manage timeline entries, company logos, roles, date ranges, achievements, and tech tags.
3. **Projects Showcase**: Add/edit projects, toggle featured badges, select preview modes (Live Iframe / Image / Video), and drag/reorder items.
4. **Skills & Tech Stack**: Add custom skills with category tags (Frontend, Backend, Languages, Database, DevOps, Tools).
5. **Education**: Manage academic credentials, institutions, and degrees.
6. **Hackathons & Awards**: Showcase competitive programming achievements, hackathon placements, and dates.
7. **Messages Inbox**: View visitor inquiries sent through the contact form, mark as read, or reply directly via email.
8. **Backup & JSON Sync**: Export entire portfolio state as a single JSON file, restore backups, or reset to original defaults.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Bundler & Dev Server** | [Vite 5](https://vitejs.dev/) |
| **Styling** | Vanilla CSS Design System with CSS Tokens & Variables |
| **Icons** | [Lucide React](https://lucide.dev/) + Authentic Vector SVG Engine |
| **State & Storage** | React Context API with LocalStorage Synchronization |

---

## Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` or `pnpm` or `yarn`

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone <your-repository-url>
cd Portfolio
npm install
```

### 3. Development Server
Start the local development server:
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) to view the live portfolio.

### 4. Admin Dashboard
Navigate to [http://localhost:5173/#/admin](http://localhost:5173/#/admin) and log in with:
- **Username**: `hassaanhalim`
- **Password**: `hassaan1996`

### 5. Production Build
Generate an optimized production bundle:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## Project Structure

```
Portfolio/
├── index.html                   # HTML entry point with geometric 'H' monogram favicon
├── package.json                 # Project dependencies and npm scripts
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite configuration
└── src/
    ├── main.tsx                 # React application root
    ├── App.tsx                  # Hash routing between portfolio and protected /admin
    ├── index.css                # Global design tokens, animations, and component styles
    ├── types/
    │   └── portfolio.ts         # TypeScript definitions for all portfolio data entities
    ├── data/
    │   └── defaultPortfolioData.ts # Initial default profile, projects, and experience data
    ├── context/
    │   └── PortfolioContext.tsx # Reactive CRUD state management & LocalStorage persistence
    ├── components/
    │   ├── DotBackground.tsx    # Interactive canvas dot matrix with atmospheric lighting
    │   ├── Navbar.tsx           # Sticky glassmorphic navbar with active section detection
    │   ├── Hero.tsx             # Profile hero, enlarged avatar, and direct email dispatch
    │   ├── About.tsx            # Personal bio section
    │   ├── WorkExperience.tsx   # Accordion work experience timeline
    │   ├── Education.tsx        # Degree credentials showcase
    │   ├── Skills.tsx           # Categorized skill badges with SVG tech icons
    │   ├── TechIcons.tsx        # High-resolution vector SVG icon rendering engine
    │   ├── Projects.tsx         # Responsive 16:9 projects with live iframe preview
    │   ├── Hackathons.tsx       # Hackathons and awards timeline
    │   ├── Contact.tsx          # Contact form connected to admin inbox
    │   └── Footer.tsx           # Copyright footer
    └── admin/
        ├── AdminLogin.tsx       # Secure credential authentication portal
        ├── AdminDashboard.tsx   # Tabbed administration management interface
        ├── ProfileEditor.tsx    # Bio and hero customization editor
        ├── ExperienceEditor.tsx # Work experience CRUD editor
        ├── ProjectsEditor.tsx   # Projects showcase editor with preview mode selector
        ├── SkillsEditor.tsx     # Skills taxonomy editor with quick presets
        ├── EducationEditor.tsx  # Academic timeline editor
        ├── HackathonsEditor.tsx # Awards editor
        └── MessagesViewer.tsx   # Contact form inbox with direct reply actions
```

---

## License

This project is open source and available under the [MIT License](LICENSE).
