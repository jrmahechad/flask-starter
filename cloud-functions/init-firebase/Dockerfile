FROM python:3.9-slim
LABEL maintainer="balch@google.com"

# Set environment variables
ENV PYTHONUNBUFFERED 1

# Create working directory
RUN mkdir /code
WORKDIR /code

# Copy requirements
#COPY cloud-function-waze-api/dev-requirements.txt .
#COPY cloud-function-waze-api/requirements.txt .
COPY dev-requirements.txt .
COPY requirements.txt .

# Install python dependencies
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir -r dev-requirements.txt
