# Base Node environment
FROM node:lts AS base
WORKDIR /app

# Dependencies
FROM base AS deps
COPY package*.json ./
RUN npm install

# Build
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Deploy with Node runtime
FROM node:lts AS deploy
WORKDIR /app

# Copy build output and dependencies
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./

# Optional: If using .env file
COPY --from=build /app/.env .env

# Environment and port
ENV PORT=4321
EXPOSE 4321

# Start the Astro server
CMD ["node", "./dist/server/entry.mjs"]

