# Use an official Node.js runtime as a parent image
FROM mcr.microsoft.com/azure-functions/node:4

# Set the working directory inside the container
WORKDIR /home/site/wwwroot

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies (including Puppeteer and Chromium dependencies)
RUN apt-get update && apt-get install -y \
    curl \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libxkbcommon-x11-0 \
    libgbm-dev \
    libasound2 \
    libxrandr2 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libfontconfig1 \
    libpango1.0-0 \
    libharfbuzz0b \
    libfreetype6 \
    libjpeg62-turbo \
    libpng16-16 \
    libglib2.0-0 \
    libcairo2 \
    libstdc++6 \
    unzip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Download Chromium manually
RUN curl -LO https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && apt-get update && apt-get install -y ./google-chrome-stable_current_amd64.deb \
    && rm google-chrome-stable_current_amd64.deb

# Set Puppeteer to use the manually installed Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Install Azure Functions Core Tools using npm
RUN npm install -g azure-functions-core-tools@4 --unsafe-perm=true

# Verify the installation of Azure Functions Core Tools
RUN func --version || echo "Azure Functions Core Tools not found"

# Copy the rest of the application code
COPY . .

# Expose the port Azure Functions runtime listens to
ENV PORT=7071
EXPOSE 7071

# Start the Azure Functions runtime
CMD ["func", "start", "--javascript"]
