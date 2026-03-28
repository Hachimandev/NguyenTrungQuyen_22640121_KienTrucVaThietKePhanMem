# Base image
FROM python:3.9

# Tạo thư mục làm việc
WORKDIR /app

# Copy file vào container
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY app.py .

# Mở port 5000
EXPOSE 5000

# Chạy ứng dụng
CMD ["python", "app.py"]