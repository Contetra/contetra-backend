# ---------- BUILD ----------
FROM node:20-alpine3.19 AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


# ---------- RUN ----------
FROM node:20-alpine3.19

WORKDIR /app

# 👇 COPY EVERYTHING
COPY --from=build /app ./


EXPOSE 3000

CMD ["node", "dist/src/main.js"]