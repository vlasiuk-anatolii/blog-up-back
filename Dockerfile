FROM node:23-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:23-alpine AS production

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

RUN mkdir -p /app/public/images/comments
RUN mkdir -p /app/public/text-files/comments

EXPOSE 3001

ENV NODE_ENV=production

CMD ["node", "dist/main"]
