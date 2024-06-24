#!/bin/sh

set -e

if [ ! -f /app/.env ]; then
    env | grep -E "^X_" | sed 's@"@@g;s@^X_@@g' | awk -F"=" '{print $1 "=" $2$3$4 }' | sort > /app/.env
    env -i bash
fi
chmod go+rw /app/.env


npm start


