# Step 1: Build the React app
FROM node:18-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) files into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project into the container
COPY . .

# Build the React app for production
RUN npm run build

# Step 2: Serve the app with a lightweight HTTP server (nginx)
FROM nginx:alpine

# Copy the build output to the nginx public directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for nginx to listen on
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
