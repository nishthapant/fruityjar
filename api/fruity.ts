export default async function handler(req, res) {
  try {
    const response = await fetch("https://fruity-proxy.vercel.app/api/fruits", {
      headers: {
        "x-api-key": "fruit-api-challenge-2025",
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "API Error" });
    }

    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}