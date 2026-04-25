FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

RUN apk add --no-cache curl

EXPOSE 5173

CMD ["npx", "serve", "-s", "dist", "-l", "5173"]