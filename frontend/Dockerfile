# Base image
FROM node:16-alpine

# Set docker's working directory
WORKDIR /app/frontend

# Copy all files from current working directory to docker's working directory
COPY . .

# Install packages from package.json
RUN npm install

# Set port for client application
EXPOSE 3000

# Run application
CMD ["npm", "start"]
