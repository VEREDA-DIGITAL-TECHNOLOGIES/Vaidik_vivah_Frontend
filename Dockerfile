# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm ci

# Copy all files and build
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app

# Copy built files
COPY --from=builder /app/dist ./dist

# Copy .env to the root if it exists
COPY .env ./.env


# Install serve for serving static files
RUN npm install -g serve

# Expose port and run the app
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]
