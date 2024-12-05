# Use an official Node.js runtime as a parent image
FROM mcr.microsoft.com/azure-functions/node:4

# Set the working directory inside the container
WORKDIR /home/site/wwwroot

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies (including Puppeteer's system dependencies)
RUN apt-get update && apt-get install -y \
    curl \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libxkbcommon-x11-0 \
    libgbm-dev \
    unzip \
    && npm install --only=production \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Azure Functions Core Tools using npm
RUN npm install -g azure-functions-core-tools@4 --unsafe-perm=true

# Verify the installation of Azure Functions Core Tools
RUN func --version || echo "Azure Functions Core Tools not found"

# Copy the rest of the application code
COPY . .

# Expose the port Azure Functions runtime listens to
ENV PORT=8080
EXPOSE 8080

# Start the Azure Functions runtime
CMD ["func", "start", "--javascript"]
