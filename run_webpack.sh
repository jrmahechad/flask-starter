#!/bin/bash
if [ ! -d node_modules ]
then
    echo "node_modules not found. Running npm install..."
    npm update -g npm
    npm install
fi
npm start
