# Frontend Dockerfile
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy all files into the container
COPY . .

# Expose the frontend port (default 3000)
EXPOSE 3000

# Start the React development server
CMD ["npm", "start"]
