#!/bin/bash

echo 'Starting deploy script'

echo 'stashing git'
git add .

echo 'pulling..'
git commit 

echo 'installing'
pm2 deploy

pm2 monit

echo 'starting server'
#pm2 start dist/server

echo 'bye'
#pm2 monit
