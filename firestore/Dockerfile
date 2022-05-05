FROM node:16-slim
LABEL maintainer="balch@google.com"

# Install system dependencies
RUN apt update -y \
  && apt install --no-install-recommends -y \
    default-jdk

# Create working directory
RUN mkdir /code
WORKDIR /code

# Install Firestore
RUN npm install -g firebase-tools
