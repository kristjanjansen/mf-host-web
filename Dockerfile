# Build stage
FROM node:22-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the Vite app
RUN npm run build

# Production stage
FROM nginx:1.27-alpine AS production

# Copy built assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Configure nginx to listen on port 4000
RUN sed -i 's/listen 80;/listen 4000;/g' /etc/nginx/conf.d/default.conf

# Expose HTTP port 4000
EXPOSE 4000

# Run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]