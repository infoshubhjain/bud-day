## Bud Day – Elderly-first Social & Essentials Web App

Bud Day is a production-ready, accessibility-focused web application designed specifically for elderly users to reduce isolation and simplify daily activities.

### Tech stack

- **Frontend**: React 18, Vite, TypeScript, React Router, Socket.IO client, PWA manifest.
- **Backend**: Node.js, TypeScript, Express, Prisma (PostgreSQL), Socket.IO, JWT-based auth.

### Key features

- Phone-number + OTP login, no passwords.
- Simple profile and interest-based **activity matching** with mutual consent.
- 1:1 **messaging** with real-time updates (Socket.IO-ready).
- Simple **scheduling** with preset slots handled by the client and stored in matches.
- Guided **ordering** of essentials with mock third-party delivery integration.
- Global **voice assistant hook** with a persistent microphone button and a clear intent model.
- **Admin dashboard** for user, activity, and report oversight.

### Running locally

1. Install dependencies from the project root:

```bash
npm install
```

2. Configure environment variables (create `server/.env`):

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/budday"
JWT_SECRET="change-me"
WEB_ORIGIN="http://localhost:5173"
```

3. Set up the database (from `server` folder):

```bash
npm run prisma:migrate   # add a package script for `prisma migrate dev`
```

4. Start backend and frontend in separate terminals:

```bash
npm run dev:server
npm run dev:web
```

The web app will be available at `http://localhost:5173`, with the API on `http://localhost:4000`.

### Voice assistant integration

The `web/src/voice/VoiceContext.tsx` file defines a small intent model and a single global microphone button. It is the intended integration point for a cloud speech provider (e.g. Azure, Google, AWS); currently it maintains listening state and is ready for wiring to a speech recognition client.

### Accessibility notes

- Large, high-contrast buttons and text across critical screens.
- No hidden gestures; clear, recognition-based navigation on the home dashboard.
- Minimal choices per screen; single-column layouts tuned for tablet-sized devices.
- ARIA roles on alerts and status messages where appropriate.



