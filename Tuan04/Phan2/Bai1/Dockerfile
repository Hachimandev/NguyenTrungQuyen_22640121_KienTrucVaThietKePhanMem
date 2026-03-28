# Base image
FROM node:18

# Tạo thư mục làm việc trong container
WORKDIR /app

# Copy file vào container
COPY package.json .
COPY app.js .

# Mở port 3000
EXPOSE 3000

# Chạy ứng dụng
CMD ["node", "app.js"]