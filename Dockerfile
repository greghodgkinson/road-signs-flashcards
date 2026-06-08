# ── Stage 1: Build native deps (needs python3/make/g++ for better-sqlite3) ──
FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY package*.json ./
RUN npm ci --omit=dev

# ── Stage 2: Build Vite frontend ─────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ── Stage 3: Runtime ─────────────────────────────────────────────────────────
FROM node:20-alpine AS runtime
WORKDIR /app

COPY --from=deps     /app/node_modules ./node_modules
COPY --from=builder  /app/dist         ./dist
COPY package.json    ./
COPY server/         ./server/

ENV PORT=8080
ENV DATA_DIR=/data
EXPOSE 8080

CMD ["node", "server/index.js"]
