FROM node:24-alpine
USER root
COPY package*.json ./
RUN npm ci
RUN npm install --global tsx
COPY . .
CMD ["tsx", "index.ts", "--reload-cmds"]