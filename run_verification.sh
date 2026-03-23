npm run dev -- -H 0.0.0.0 -p 3000 &
SERVER_PID=$!

echo "Waiting for Next.js dev server to start..."
while ! curl -s http://localhost:3000 > /dev/null; do
  sleep 1
done
echo "Server is up!"

python /home/jules/verification/verify_feature.py

pkill -f "next"
echo "Done."
