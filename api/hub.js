export default async function handler(req, res) {
  const scriptId = req.url.split('/').pop().replace('.lua', '');

  // If the query has 'p', it's the old legacy Base64 method (fallback)
  if (req.query.p) {
      try {
          const decoded = Buffer.from(req.query.p, 'base64').toString('utf8');
          res.setHeader('Content-Type', 'text/plain');
          return res.status(200).send(decoded);
      } catch (e) {}
  }

  try {
    // Fetch from the Vander Industrial Production KV Store
    const response = await fetch(`https://kvdb.io/A95k8Z9S8kS8kS8kS8kS8k/${scriptId}`);
    
    if (!response.ok) {
        throw new Error("NOT_FOUND");
    }

    const code = await response.text();
    
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(code);
  } catch (err) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send("-- Vander Industrial: Production Source Load Error [404]\n-- Ensure the script was correctly hosted.");
  }
}
