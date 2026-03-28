# ===== Stage 1: Build React =====
FROM node:18-alpine AS build

WORKDIR /app

# Copy package trước để cache
COPY package.json package-lock.json ./
RUN npm install

# Copy toàn bộ source
COPY . .

# Build project
RUN npm run build


# ===== Stage 2: Serve bằng nginx =====
FROM nginx:alpine

# Copy build sang nginx
COPY --from=build /app/build /usr/share/nginx/html

# Mở port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]