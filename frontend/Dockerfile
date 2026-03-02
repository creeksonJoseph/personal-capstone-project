# Stage 1: Build the React Application
FROM node:20-alpine as build

# Accept build argument for API URL (injected by docker-compose or CI/CD)
ARG VITE_API_URL=http://102.133.146.89/api
ENV VITE_API_URL=$VITE_API_URL

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build the project (Vite will embed VITE_API_URL into the bundle)
RUN npm run build

# Stage 2: Serve the built app with Nginx
FROM nginx:alpine

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React app from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
