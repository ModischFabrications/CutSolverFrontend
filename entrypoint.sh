#!/bin/sh

# called from Docker container, not meant for manual consumption
# make sure to keep LF endings!

echo "substituting env vars"
if [ -z "$VUE_APP_BACKEND_SOLVER_URL" ]; then
    echo "ERROR: VUE_APP_BACKEND_SOLVER_URL is not set!"
else
    echo "occurrences of VUE_APP_BACKEND_SOLVER_URL will be set to $VUE_APP_BACKEND_SOLVER_URL"
fi

for file in /usr/share/nginx/html/js/app.*.js;
do
  if [ ! -f $file.tmpl.js ]; then
    cp $file $file.tmpl.js
  fi
  envsubst '$VUE_APP_BACKEND_SOLVER_URL' < $file.tmpl.js > $file
done
echo "Starting Nginx"
nginx -g 'daemon off;'
