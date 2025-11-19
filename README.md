# PhishGuard Frontend

Modern phishing simulation platform frontend for security awareness training.

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS + shadcn/ui
- **Monorepo**: Turborepo

## Project Structure

```
phishguard/
├── apps/
│   └── web/          # Next.js frontend application
├── packages/
│   └── typescript-config/  # Shared TypeScript configurations
└── turbo.json        # Turborepo configuration
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

### Development

```bash
# Run frontend in development mode
pnpm dev

# Run specific app
pnpm --filter @phishguard/web dev

# Build for production
pnpm build

# Run linting
pnpm lint

# Format code
pnpm format
```

## Features

- Dashboard with campaign metrics visualization
- Campaign management interface
- Email template management
- Landing page management
- User & group management
- Comprehensive reporting interface

## Frontend Application

Access the frontend at: **http://localhost:3000**

## License

Proprietary - All rights reserved
