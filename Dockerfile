# Use the official Node.js image as the base image
FROM node:18.18.0-alpine AS base

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Use a smaller Node.js image to serve the application
FROM node:18.18.0-alpine

# Set working directory
WORKDIR /app

# Copy the built application from the previous stage
COPY --from=base /app/public ./public
COPY --from=base /app/.next ./.next
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json

# Expose port
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
