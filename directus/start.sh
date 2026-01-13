#!/bin/bash
set -e

# Parse database credentials from PLATFORM_RELATIONSHIPS
if [ -n "$PLATFORM_RELATIONSHIPS" ]; then
  export DB_HOST=$(echo $PLATFORM_RELATIONSHIPS | base64 --decode | jq -r '.database[0].host')
  export DB_PORT=$(echo $PLATFORM_RELATIONSHIPS | base64 --decode | jq -r '.database[0].port')
  export DB_DATABASE=$(echo $PLATFORM_RELATIONSHIPS | base64 --decode | jq -r '.database[0].path')
  export DB_USER=$(echo $PLATFORM_RELATIONSHIPS | base64 --decode | jq -r '.database[0].username')
  export DB_PASSWORD=$(echo $PLATFORM_RELATIONSHIPS | base64 --decode | jq -r '.database[0].password')
fi

# Start Directus
exec npx directus start
