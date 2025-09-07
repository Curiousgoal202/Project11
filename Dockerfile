# build stage
FROM node:20-alpine AS build
WORKDIR /app

# copy dependency files
COPY package*.json ./
RUN npm ci --only=production

# copy source code
COPY . .

# production stage
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app ./

EXPOSE 8085
CMD ["node", "app.js"]
