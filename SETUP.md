# PhishGuard Frontend Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **pnpm** 8+ (Install: `npm install -g pnpm`)
- **Git** ([Download](https://git-scm.com/downloads))

## Quick Start

### 1. Install Dependencies

```bash
# Install all dependencies for the monorepo
pnpm install
```

### 2. Start Development Server

```bash
# Start the frontend development server
pnpm dev
```

This will start:
- **Frontend (Next.js)**: http://localhost:3000

## Project Structure

```
phishguard/
├── apps/
│   └── web/              # Next.js frontend (Port 3000)
│       ├── src/
│       │   ├── app/      # Next.js App Router pages
│       │   ├── components/ # React components
│       │   └── lib/      # Utilities
│       └── package.json
│
├── packages/
│   └── typescript-config/ # Shared TS configs
│
├── package.json          # Root package.json
├── turbo.json           # Turborepo config
└── pnpm-workspace.yaml  # pnpm workspace config
```

## Available Scripts

### Root Level
- `pnpm dev` - Start frontend dev server
- `pnpm build` - Build frontend for production
- `pnpm lint` - Lint code
- `pnpm clean` - Clean all build artifacts

### Frontend (@phishguard/web)
- `pnpm --filter @phishguard/web dev` - Start Next.js dev server
- `pnpm --filter @phishguard/web build` - Build for production
- `pnpm --filter @phishguard/web lint` - Lint code

## Troubleshooting

### Port Already in Use

If port 3000 is already in use:

1. Kill the process using the port:
   ```bash
   # On macOS/Linux
   lsof -ti:3000 | xargs kill -9
   ```

2. Or change the port in `apps/web/package.json` (change dev script)

## Next Steps

1. **UI Components**: Continue building out the frontend pages
2. **State Management**: Add state management (if needed)
3. **API Integration**: Connect to backend API when ready
4. **Authentication**: Implement authentication flow
5. **Responsive Design**: Ensure mobile responsiveness

## Production Build

```bash
# Build the frontend
pnpm build

# Start frontend in production mode
cd apps/web && pnpm start
```

## Support

For issues or questions:
- Check the [README.md](./README.md)
- Open an issue on the repository
- Contact the development team

## License

Proprietary - All rights reserved
