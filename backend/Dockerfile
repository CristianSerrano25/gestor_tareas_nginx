FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json ./
# install all deps (including dev) to build
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY package.json ./
# install only production deps
RUN npm install --production
COPY --from=builder /app/dist ./dist
EXPOSE 4000
CMD ["node","dist/index.js"]
