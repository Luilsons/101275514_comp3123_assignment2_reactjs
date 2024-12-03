# Backend Dockerfile
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy all files into the container
COPY . .

# Expose the backend service port (default 5000)
EXPOSE 5000

# Command to start the backend server
CMD ["node", "server.js"]
