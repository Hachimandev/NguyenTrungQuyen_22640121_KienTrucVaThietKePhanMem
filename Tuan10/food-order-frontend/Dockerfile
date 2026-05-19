FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
ARG REACT_APP_USER_SERVICE_URL
ARG REACT_APP_FOOD_SERVICE_URL
ARG REACT_APP_ORDER_SERVICE_URL
ARG REACT_APP_PAYMENT_SERVICE_URL
RUN printf "VITE_USER_SERVICE_URL=%s\nVITE_FOOD_SERVICE_URL=%s\nVITE_ORDER_SERVICE_URL=%s\nVITE_PAYMENT_SERVICE_URL=%s\n" "$REACT_APP_USER_SERVICE_URL" "$REACT_APP_FOOD_SERVICE_URL" "$REACT_APP_ORDER_SERVICE_URL" "$REACT_APP_PAYMENT_SERVICE_URL" > .env
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
