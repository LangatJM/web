Deployment checklist and commands

1) Set environment variables

- Create a `.env` (or set env vars in host). At minimum set `ADMIN_PASSWORD`.

2) Production build locally

```bash
cd web
npm ci
npm run build
npm run start
```

3) Docker (recommended for self-hosting)

```bash
docker build -t simu-rahisi:latest .
docker run -e ADMIN_PASSWORD=yourStrongPassword -p 3000:3000 -v $(pwd)/data:/app/data simu-rahisi:latest
```

4) Docker Compose

```bash
docker compose up -d --build
```

5) CI: push to GitHub and configure Vercel or use the included GitHub Actions to run build/lint.

6) Data persistence & backups
- If you keep JSON files in `data/`, ensure regular backups (script in `scripts/backup-data.ps1`).
 
Optional: migrate JSON -> SQLite (Prisma)

1. Install dependencies and Prisma CLI:

```bash
cd web
npm install
npx prisma generate
```

2. Configure SQLite (example `.env`):

```text
DATABASE_URL="file:./data/database.db"
```

3. Create DB schema and apply migration:

```bash
cd web
npx prisma migrate dev --name init
```

4. Import existing JSON products into the database:

```bash
cd web
node scripts/import-json.js
```

After this the app will use SQLite when `DATABASE_URL` is set; otherwise it will continue using the JSON fallback in `data/`.
