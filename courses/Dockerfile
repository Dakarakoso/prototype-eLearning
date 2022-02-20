FROM node:16-alpine

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm","start"]

# 538aa8f72816227ded6534cab523f7a0