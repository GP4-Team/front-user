# 1️⃣ Build stage
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with caching
RUN npm install --frozen-lockfile

# Copy all project files
COPY . .

# Build the React app
RUN npm run build

# 2️⃣ Production stage with Nginx
FROM nginx:alpine

# Copy the built files to Nginx's serving directory
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]