export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // Robust ID extraction from path
  const fullPath = new URL(req.url, `http://${req.headers.host}`).pathname;
  const scriptId = fullPath.split('/').pop().replace('.lua', '');

  if (!scriptId || scriptId === 'hub') {
    return res.status(400).send('-- Vander: Invalid Script ID');
  }
  
  if (req.method === 'POST') {
      try {
          const code = req.body;
          // Using a new dedicated industrial KV storage key
          const dbUrl = `https://kvdb.io/A95k8Z9S8kS8kS8kS8kS8k/${scriptId}`;
          const saveRes = await fetch(dbUrl, {
              method: 'POST',
              body: code
          });
          
          if (!saveRes.ok) throw new Error("DB_SAVE_FAILED");
          return res.status(200).json({ success: true, id: scriptId });
      } catch (e) {
          return res.status(500).json({ success: false, error: e.message });
      }
  }

  // GET: game:HttpGet
  try {
    const dbUrl = `https://kvdb.io/A95k8Z9S8kS8kS8kS8kS8k/${scriptId}`;
    const response = await fetch(dbUrl);
    if (!response.ok) throw new Error("NOT_FOUND");

    const code = await response.text();
    res.setHeader('Content-Type', 'text/plain');
    return res.status(200).send(code);
  } catch (err) {
    res.setHeader('Content-Type', 'text/plain');
    return res.status(200).send(`-- Vander Industrial: Production Source Load Error [404]\n-- Requested ID: ${scriptId}`);
  }
}
