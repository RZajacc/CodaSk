# Codask client

The Codask client is a React and TypeScript single-page application for the
Code Academy Berlin community. It uses Vite, React Router, Tailwind CSS, React
Hook Form and Zod, and communicates with the [Codask API](../server/README.md).

## Prerequisites

- Node.js 22.12 or newer and npm. The current Vite dependency also supports
  Node.js 20.19 or newer within the 20.x release line.
- A running Codask API and an isolated MongoDB database for data-backed features.
  See the [server setup](../server/README.md).

## Local setup

Run these commands from `client/`:

```bash
npm ci
npm run dev
```

Open the URL printed by Vite, normally <http://localhost:5173>. If that port is
unavailable, Vite may choose another; add the actual client origin to the
server's `CORS_ORIGINS`.

### API configuration

The client uses `VITE_API_URL` as the API base URL. The tracked
`.env.development` points to the local API at `http://localhost:5000`, while
`.env.production` configures the production build. To use a different local
API, create `client/.env.development.local`:

```dotenv
VITE_API_URL=http://localhost:5000
```

Vite embeds `VITE_` variables in browser code; they are public and must never
contain secrets. Local override files are ignored by Git. Restart the dev server
after changing environment files, and rebuild for changes to affect a
production build.

The API uses credentialed requests and secure authentication cookies. Configure
the server's CORS and cookie domain for your local origin; browser handling of
secure cookies on HTTP depends on the host and browser. See the
[server authentication notes](../server/README.md#authentication-and-local-cookies).

## Commands

Run from `client/`:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Type-check and create the production build in `dist/`. |
| `npm run preview` | Preview an existing production build locally. |
| `npm run lint` | Run ESLint. |

There is currently no frontend test script configured in `package.json`.

## Source layout

- `src/pages/`: route pages.
- `src/components/` and `src/layouts/`: reusable UI and page layouts.
- `src/services/`: API calls and authentication helpers.
- `src/context/` and `src/hooks/`: shared state and hooks.
- `src/schemas/`, `src/types/` and `src/utils/`: validation, types and utilities.
- `public/`: static assets.

Some routes, including polls, student projects and module search, are currently
placeholders or in development.

## Docker Compose

From the repository root, after configuring `server/.env` as described in the
[server README](../server/README.md):

```bash
docker compose up --build
```

Compose starts the client, server and a local MongoDB instance. The database
starts empty and uses a persistent volume; see the
[server README](../server/README.md#docker-compose) for connection details.
The API URL in the client is used by the **browser**, so it must be reachable
from the host, not just from another container. The default development ports
are 5173 for the client and 5000 for the API.

## Deployment

On pushes to `main`, the
[frontend deployment workflow](../.github/workflows/frontend-deploy.yml) builds
the client, syncs `client/dist/` to S3 and invalidates CloudFront. It does not
currently run frontend tests. The production API URL is selected at build time.
