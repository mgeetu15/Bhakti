// pages/api/auth.js
const users = {};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { action, username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Missing fields" });
  const key = username.toLowerCase().trim();

  function hash(s) {
    let h = 5381;
    for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
    return Math.abs(h).toString(36);
  }

  if (action === "register") {
    if (users[key]) return res.status(409).json({ error: "Username already taken. Choose another." });
    if (username.length < 3) return res.status(400).json({ error: "Username must be 3+ characters." });
    if (password.length < 6) return res.status(400).json({ error: "Password must be 6+ characters." });
    users[key] = { pw: hash(password), created: Date.now() };
    return res.status(200).json({ success: true, username: key });
  }
  if (action === "login") {
    const u = users[key];
    if (!u) return res.status(404).json({ error: "Account not found. Please register first." });
    if (u.pw !== hash(password)) return res.status(401).json({ error: "Incorrect password." });
    return res.status(200).json({ success: true, username: key });
  }
  return res.status(400).json({ error: "Invalid action" });
}
