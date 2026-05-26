// lib/theme.js
export const T = {
  saffron:"#FF6B00", gold:"#FFB300", deep:"#120600", bg:"#0D0400",
  cream:"#FFF3E0", muted:"rgba(255,243,224,0.5)", faint:"rgba(255,243,224,0.08)",
  card:"rgba(255,255,255,0.04)", border:"rgba(255,179,0,0.18)",
  red:"#C0392B", green:"#27AE60", blue:"#2980B9", purple:"#8E44AD",
};

export const NICHE_SUGGESTIONS = [
  "Hanuman Chalisa","Shiv Bhajan","Laxmi Aarti","Durga Mata","Krishna Bhajan",
  "Ganesh Aarti","Ram Bhajan","Sai Baba","Navratri Special","Sawan Somwar",
  "Morning Aarti","Sandhya Aarti","Bhajan Sangrah","Mantra Chanting","Kirtan",
  "Spiritual Discourse","Devi Stuti","Shiv Tandav","Hare Rama Hare Krishna",
  "Sundar Kand Path","Chalisa Collection","Festival Bhajan","Guruji Pravachan",
  "Aarti Sangrah","Bajrang Baan","Shani Dev Bhajan","Kali Mata","Ramayana",
  "Bhagavad Gita","Vishnu Sahasranama","Om Namah Shivaya","Gayatri Mantra",
  "Mahadev Status","Bhakti Whatsapp Status","Ram Navami Special","Janmashtami",
  "Diwali Bhajan","Holi Bhajan","Mahashivratri","Guru Purnima",
];

export const UPLOAD_TIMES = [
  { time:"5:00–6:30 AM",  label:"Morning Puja Time",   score:98, icon:"🌅" },
  { time:"6:00–7:30 PM",  label:"Evening Aarti Time",  score:95, icon:"🪔" },
  { time:"8:00–9:30 PM",  label:"Night Relaxation",    score:88, icon:"🌙" },
  { time:"12:00–1:00 PM", label:"Lunch Break",         score:72, icon:"☀️" },
];

export const TYPE_COLORS = {
  Trends:"#FF6B00", SEO:"#FFB300", RCA:"#C0392B", Shorts:"#2980B9", Thumbnail:"#8E44AD",
};
export const TYPE_ICONS = {
  Trends:"🔥", SEO:"🎯", RCA:"🔬", Shorts:"📱", Thumbnail:"🖼️",
};

export function fmtDate(ts) {
  return new Date(ts).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})
    + " " + new Date(ts).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"});
}

// Calls Gemini via our secure server-side API route
export async function callGemini(system, user) {
  const res = await fetch("/api/gemini", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ system, user }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.text;
}

// Browser localStorage history (persists across sessions on same device)
export function saveHistory(username, type, niche, content) {
  try {
    const key = `bg_hist_${username}`;
    const arr = JSON.parse(localStorage.getItem(key) || "[]");
    arr.unshift({ id:Date.now(), type, niche, content, ts:Date.now() });
    localStorage.setItem(key, JSON.stringify(arr.slice(0, 300)));
  } catch {}
}
export function loadHistory(username) {
  try { return JSON.parse(localStorage.getItem(`bg_hist_${username}`) || "[]"); }
  catch { return []; }
}
export function deleteHistoryItem(username, id) {
  try {
    const key = `bg_hist_${username}`;
    localStorage.setItem(key, JSON.stringify(
      JSON.parse(localStorage.getItem(key)||"[]").filter(i=>i.id!==id)
    ));
  } catch {}
}
