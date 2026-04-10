export default async function handler(req, res) {
  // Bypassing CORS for production reliability
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const scriptId = req.url.split('/').pop().replace('.lua', '');
  
  // POST: Browser sends the script here to be hosted
  if (req.method === 'POST') {
      try {
          const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
          await fetch(`https://kvdb.io/A95k8Z9S8kS8kS8kS8kS8k/${scriptId}`, {
              method: 'POST',
              body: body
          });
          return res.status(200).json({ success: true });
      } catch (e) {
          return res.status(500).json({ success: false });
      }
  }

  // GET: game:HttpGet calls this
  try {
    const response = await fetch(`https://kvdb.io/A95k8Z9S8kS8kS8kS8kS8k/${scriptId}`);
    if (!response.ok) throw new Error("404");

    const code = await response.text();
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(code);
  } catch (err) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(`-- Vander Industrial: Production Source Load Error [404]\n-- Requested ID: ${scriptId}`);
  }
}
