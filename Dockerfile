FROM ubuntu:20.04

# Non-interactive for apt
ENV DEBIAN_FRONTEND=noninteractive
ENV DISPLAY=:99

# 1) Install base dependencies
RUN apt-get update && apt-get install -y \
    wget curl apt-transport-https gnupg gnupg2 software-properties-common lsb-release \
    x11vnc xvfb fluxbox novnc websockify net-tools supervisor git

# 2) Install Node.js 18.x
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
 && apt-get install -y nodejs

# 3) Install Chromium
RUN apt-get install -y chromium-browser

# 4) Install Puppeteer dependencies
RUN apt-get install -y \
    libx11-xcb1 libxcomposite1 libxcursor1 libxdamage1 libxi6 libxtst6 \
    libnss3 libxrandr2 libasound2 libpangocairo-1.0-0 libatk1.0-0 libcups2

# 5) Install noVNC (for web-based VNC)
RUN git clone https://github.com/novnc/noVNC.git /root/noVNC
RUN git clone https://github.com/novnc/websockify.git /root/noVNC/utils/websockify

# 6) Copy app files
WORKDIR /app
COPY . /app

# 7) Install npm deps
RUN npm install

# 8) Supervisor config
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 8080

CMD ["/usr/bin/supervisord"]
