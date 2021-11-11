FROM node:alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN npm install
RUN npm install -D concurrently
COPY . .
CMD ["npm", "run", "watch"]