#!/bin/sh

set -eu

APP_NAME="roadsigns-quiz"
REGION="jnb"
VOLUME_NAME="scores_data"

if ! command -v flyctl >/dev/null 2>&1; then
  echo "flyctl is required: https://fly.io/docs/flyctl/install/"
  exit 1
fi

flyctl auth whoami >/dev/null

if ! flyctl status --app "$APP_NAME" >/dev/null 2>&1; then
  echo "Creating Fly app: $APP_NAME"
  flyctl apps create "$APP_NAME"
fi

if ! flyctl volumes list --app "$APP_NAME" --json |
  grep -Eq "\"name\"[[:space:]]*:[[:space:]]*\"$VOLUME_NAME\""; then
  echo "Creating persistent volume: $VOLUME_NAME"
  flyctl volumes create "$VOLUME_NAME" --app "$APP_NAME" --region "$REGION" --size 1 --yes
fi

flyctl deploy --app "$APP_NAME"
