FROM python:3.9-slim
LABEL maintainer="balch@google.com"

# Set environment variables
ENV PYTHONUNBUFFERED 1

# Install system dependencies
RUN apt update -y \
 && apt install --no-install-recommends -y \
   apt-transport-https \
   ca-certificates \
   gnupg \
   build-essential

## AppEngine Install
#RUN echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] http://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list && curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg  add - && apt-get update -y
#
#RUN apt-get install -y \
#  google-cloud-sdk \
#  google-cloud-sdk-app-engine-python \
#  google-cloud-sdk-app-engine-python-extras \
#  google-cloud-sdk-datastore-emulator \
#  google-cloud-sdk-firestore-emulator

# Create working directory
RUN mkdir /code
WORKDIR /code

# Copy requirements
COPY dev-requirements.txt .
COPY requirements.txt .

# Install python dependencies
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir -r dev-requirements.txt
