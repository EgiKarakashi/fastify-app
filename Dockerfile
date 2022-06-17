FROM node:16.15.0

# Create app directory
WORKDIR /usr/src/app

# Install depedencies
# Wildcard for all packages in package.json and package-lock.json
COPY package*.json ./

RUN npm install

# Install depedencies for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080

CMD ["node", "src/server.js"]