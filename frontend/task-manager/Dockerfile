# Step 1: Build the Angular app
FROM node:18 as angular

WORKDIR /app

# Copy package.json and package-lock.json (or npm-shrinkwrap.json)
COPY ..
RUN npm install
RUN npm run build

# Install dependencies
RUN npm install

# Copy the rest of the app source code


# Step 2: Serve the app using NGINX
FROM nginx:alpine

# Copy built files to the NGINX html folder

COPY --from=build /app/dist/task-manager






