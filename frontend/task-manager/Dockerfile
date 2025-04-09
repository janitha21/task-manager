# Step 1: Build the Angular app
FROM node:22.14.0 AS build

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install -g @angular/cli
RUN npm install

# Copy the rest of the app files
COPY . .

# Build the Angular app in production mode
RUN npm run build --prod

# Step 2: Serve the app using NGINX
FROM nginx:alpine

# Copy the built files to NGINX html folder
COPY --from=build /app/dist/task-manager /usr/share/nginx/html

# Expose port 80 to allow access to the app
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
