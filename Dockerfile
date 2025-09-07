# build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY app/package*.json ./
RUN npm ci --only=production
COPY app/ ./

# production stage
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app ./
EXPOSE 8000
CMD ["node", "app.js"]
