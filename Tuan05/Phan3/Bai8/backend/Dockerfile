# Base image
FROM python:3.11-slim

# Set workdir
WORKDIR /app

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy Django project
COPY . .

# Expose port 8000
EXPOSE 8000

# Default command: run Django server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]