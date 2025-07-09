FROM node:24-alpine
USER root
COPY package*.json ./
RUN npm ci
RUN npm install --global tsx
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 novabot
COPY --chown=novabot:nodejs . .

USER novabot
CMD ["tsx", "index.ts", "--reload-cmds"]