# Etap 1 - budowanie aplikacji
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etap 2 - uruchomienie aplikacji
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/dist/tickedBookingSystem ./dist/tickedBookingSystem
COPY --from=build /app/package*.json ./

RUN npm install --omit=dev

EXPOSE 4000

CMD ["node", "dist/tickedBookingSystem/server/server.mjs"]
