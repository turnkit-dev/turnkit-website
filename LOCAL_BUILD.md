mkdir -p public && mv assets public/ 2>/dev/null || true
rm -rf .next node_modules package-lock.json
npm install
npm run build && npm run start
