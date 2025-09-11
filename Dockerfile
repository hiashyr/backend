# Use the official Node.js image as a base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Create the logs directory
RUN mkdir -p /app/logs

# Build the TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 5001

# Start the application
CMD ["npm", "run", "dev"]
