# syntax=docker/dockerfile:1
FROM python:3.12-alpine  

WORKDIR /app 

ENV FLASK_APP=app.py  

ENV FLASK_RUN_HOST=0.0.0.0
RUN apk add 

COPY requirements.txt .  
RUN pip install -r requirements.txt 
COPY . .

EXPOSE 5000
CMD ["flask", "run", "--debug"]  