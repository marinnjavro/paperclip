#!/bin/sh
set -e

# Ensure /paperclip directory structure exists and is owned by node
chown -R node:node /paperclip
su -s /bin/sh node -c '
  mkdir -p /paperclip/instances/default/logs

  # Auto-onboard if no config exists
  if [ ! -f /paperclip/instances/default/config.json ]; then
    echo "[entrypoint] No config found, running onboard..."
    npx paperclipai onboard --yes 2>&1 || true
  fi

  # Auto-bootstrap if in authenticated mode and no admin exists
  if [ ! -f /paperclip/.bootstrapped ]; then
    echo "[entrypoint] Running bootstrap-ceo..."
    npx paperclipai auth bootstrap-ceo --force 2>&1 | tee /tmp/bootstrap-output.txt || true
    if grep -q "Invite URL:" /tmp/bootstrap-output.txt 2>/dev/null; then
      echo ""
      echo "============================================="
      echo "  BOOTSTRAP INVITE URL (check logs above)"
      echo "============================================="
      echo ""
      grep "Invite URL:" /tmp/bootstrap-output.txt
      echo ""
      touch /paperclip/.bootstrapped
    fi
  fi

  # Start the server
  exec node --import ./server/node_modules/tsx/dist/loader.mjs server/dist/index.js
'
