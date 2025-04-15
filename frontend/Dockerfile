# Use the official Node.js image as the base image
FROM node:18.17.1

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage caching
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps
# Copy the rest of the application code
COPY . .

# Build the application (if needed)
RUN npm run build

# Expose the port that your application will use
EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]