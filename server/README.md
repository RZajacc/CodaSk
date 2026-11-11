# Codask server

The Codask server is a NestJS API backed by MongoDB and Mongoose. It provides
authentication and user, question, answer and tag endpoints for the
[client](../client/README.md). Swagger documentation is available at `/docs`.

## Prerequisites

- Node.js 22.12 or newer and npm. The frontend's current Vite dependency also
  supports Node.js 20.19 or newer within the 20.x release line.
- Docker and Docker Compose to run the local MongoDB service, or another
  reachable MongoDB instance with a separate development database.

## Local setup

From `server/`, install dependencies and create a local `.env` file:

```bash
npm ci
```

For example, use the following as a starting point for the Compose MongoDB
service when running the server on the host:

```dotenv
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/codask-dev
CORS_ORIGINS=http://localhost:5173
ACCESS_TOKEN_SECRET=replace-with-a-unique-local-secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_SECRET=replace-with-a-different-unique-local-secret
REFRESH_TOKEN_EXPIRY=7d
```

Replace the example secrets with distinct local values. Do not commit `.env`,
use production credentials, or point tests at production data.
The file is local to your machine, so each contributor must configure it.
Before starting the server on the host, verify its active `MONGO_URI` points to
the intended local database.

Start just the database from the repository root before starting the API:

```bash
docker compose up -d mongo
```

MongoDB listens on `127.0.0.1:27017` on the host. The database starts empty;
no sample data is loaded automatically.

| Variable | Purpose |
| --- | --- |
| `PORT` | API listening port. Required by startup validation. |
| `MONGO_URI` | MongoDB connection URI. Required by startup validation. |
| `CORS_ORIGINS` | Allowed browser origins, comma-separated without spaces. Required by startup validation. |
| `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET` | Separate signing secrets for access and refresh tokens. Needed for authentication. |
| `ACCESS_TOKEN_EXPIRY`, `REFRESH_TOKEN_EXPIRY` | Token lifetimes, such as `15m` and `7d`. Used when signing tokens. |
| `DOMAIN_NAME` | Optional cookie domain. Omit for host-only cookies in local development. |

The startup schema explicitly validates `PORT`, `MONGO_URI` and
`CORS_ORIGINS`; configure the token values as well to use authentication.
Origins must match the browser's client origin, including its port.

Start the API:

```bash
npm run start:dev
```

With the example configuration, the API is at <http://localhost:5000> and
Swagger UI is at <http://localhost:5000/docs>. Start the
[client](../client/README.md#local-setup) separately.

### Authentication and local cookies

The API sets access and refresh tokens as `HttpOnly`, `Secure`, `SameSite=Lax`
cookies. Browser handling of secure cookies over HTTP depends on the host and
browser; arbitrary HTTP hosts may not work. Ensure the API URL, allowed origin
and optional cookie domain are consistent when diagnosing login or refresh
issues. Avoid setting a production cookie domain for local development.

## Commands

Run from `server/`:

| Command | Purpose |
| --- | --- |
| `npm run start:dev` | Start the API in watch mode. |
| `npm run start` | Start the API without watch mode. |
| `npm run build` | Compile the application into `dist/`. |
| `npm run start:prod` | Run the compiled application; build first. |
| `npm run lint` | Run ESLint with `--fix`; this can modify files. |
| `npm run format` | Run Prettier with `--write`; this can modify files. |
| `npm test` | Run the Jest unit tests. |
| `npm run test:cov` | Run unit tests with coverage and the configured 70% global thresholds. |
| `npm run test:e2e` | Run the separate e2e suite; see the caveat below. |

The existing e2e test imports the full app and requires a configured, reachable
MongoDB instance. It currently expects an outdated root response (`Hello
World!`), so it needs updating before it can reliably pass. Use a separate test
database and test credentials; do not use production resources.

### Isolated test MongoDB

The test MongoDB service is separate from the development database and is not
started with the normal Compose stack. From the repository root, start it with:

```bash
docker compose --profile test up -d --wait mongo-test
```

It is available to host processes at `mongodb://127.0.0.1:27018` and to
containers on the Compose network at `mongodb://mongo-test:27017`. It has no
authentication, is bound to host loopback only, and is for local testing only.
Other local users can still access it. Its data is stored in memory and is lost
when the container stops or restarts. To remove just this service:

```bash
docker compose --profile test rm --stop --force mongo-test
```

The backend deployment workflow also starts an isolated test MongoDB service.
No tests use it yet: the existing unit tests remain database-independent, and
the integration test and fixtures will be added separately. The existing e2e
command does not automatically connect to this service; do not run it against
development or production data.

## Source layout

- `src/auth/` and `src/user/`: authentication and users.
- `src/question/`, `src/answer/` and `src/tag/`: domain endpoints and services.
- `src/config/` and `src/common/`: configuration and shared utilities.
- `src/main.ts`: HTTP bootstrap, Swagger setup and Lambda handler.
- `src/**/*.spec.ts`: Jest unit tests; `test/`: separate e2e configuration and test.

## Docker Compose

After creating `server/.env`, run from the repository root:

```bash
docker compose up --build
```

Compose starts MongoDB, the server and the client. The server waits for MongoDB
to become healthy and uses `mongodb://mongo:27017/codask-dev` inside the
Compose network, overriding `MONGO_URI` from `server/.env`. A server started
on the host instead uses the active URI in its environment or `.env`.

The database uses a named volume, so its data survives normal container restarts
and `docker compose down`. Removing the volume deletes the local data. MongoDB
has no authentication and is intended only for local development; its host
port is bound to loopback, but other local users can still access it. Do not
expose it publicly or use it for production.

Compose maps the server's port 5000 to the host. Set `PORT=5000` for that
mapping, or update the mapping if you use another port. Ensure `CORS_ORIGINS`
matches the client URL opened in the browser.

## Deployment

On pushes to `main`, the
[backend deployment workflow](../.github/workflows/backend-deploy.yml) installs
dependencies, runs unit tests and builds before deploying to AWS Lambda and
creating an API Gateway deployment. A unit-test failure stops the deployment.
The workflow does not run e2e tests or enforce coverage thresholds. It builds
with Node 24 and configures the Lambda runtime as Node 22.
