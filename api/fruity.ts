let cachedData = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 1000 * 60 * 5;

export default async function handler(req, res) {
  try {
    const now = Date.now();

    if (cachedData && now - cacheTimestamp < CACHE_DURATION) {
      return res.status(200).json(cachedData);
    }

    const response = await fetch("https://fruity-proxy.vercel.app/api/fruits", {
      headers: { "x-api-key": "fruit-api-challenge-2025" },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "API error" });
    }

    const data = await response.json();
    cachedData = data;
    cacheTimestamp = now;

    res.status(200).json(data);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}