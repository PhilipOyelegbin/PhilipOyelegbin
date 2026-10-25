FROM node:24-alpine3.21 AS builder
WORKDIR .
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
WORKDIR /app
COPY --from=builder ./.next /app
EXPOSE 3030
USER nonroot:nonroot
CMD ["npm", "run", "start"]