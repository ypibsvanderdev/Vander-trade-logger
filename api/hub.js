export default function handler(req, res) {
  const { p } = req.query;

  if (!p) {
    res.setHeader('Content-Type', 'text/plain');
    return res.status(200).send("-- Vander Industrial: No payload detected.");
  }

  try {
    // Decode the Base64 payload from the URL
    const decoded = Buffer.from(p, 'base64').toString('utf8');
    
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(decoded);
  } catch (err) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(500).send("-- Vander Industrial: Decryption Error.");
  }
}
