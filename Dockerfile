FROM node:22-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the source code
COPY . .

# Expose Vite dev server port
EXPOSE 4000

# Run Vite dev server listening on all interfaces
CMD ["npm", "run", "dev", "--", "--port", "4000", "--host", "0.0.0.0"]
