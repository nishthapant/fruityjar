export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-api-key");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  try {
    const response = await fetch("https://fruity-proxy.vercel.app/api/fruits", {
      headers: {
        'x-api-key': 'fruit-api-challenge-2025',
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Upstream API error:", errorText);
      return res.status(response.status).json({ error: "API error", details: errorText });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("Fetch error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
