// components/Tabs.js
import { useState } from "react";
import { T, UPLOAD_TIMES, TYPE_COLORS, TYPE_ICONS, fmtDate, callGemini, loadHistory, deleteHistoryItem } from "../lib/theme";
import { Spinner, Card, Btn, TextInput, CopyBtn, ResultBox, Tag, SectionHead, NicheInput, InfoBox, ErrBox } from "./UI";

const month = () => new Date().toLocaleString("default",{month:"long"});
const year  = () => new Date().getFullYear();

const SYS = "You are an expert YouTube SEO strategist and growth expert specializing in Indian devotional (bhakti) content — bhajan, aarti, mantra, kirtan, pravachan. You have deep knowledge of how Indian devotees search on YouTube, including Hinglish and Roman Hindi keywords. Always give practical, specific, actionable advice tailored for Indian creators.";

// ─── TRENDS ──────────────────────────────────────────────────────────────────
export function TrendsTab({ onSave }) {
  const [niche, setNiche] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [err, setErr] = useState("");

  async function go() {
    if (!niche.trim()) return;
    setLoading(true); setResult(null); setErr("");
    try {
      const r = await callGemini(SYS,
        `Today is ${month()} ${year()}. Research YouTube trends for Indian devotional content.
Niche/Topic: "${niche}"

Write a complete trend research report covering:

🔥 TOP 5 TRENDING VIDEO IDEAS RIGHT NOW
For each: give the exact video idea title, explain why it will get views this month, and rate its viral potential (High/Very High/Explosive).

🔑 TOP 12 SEO KEYWORDS
Mix of: high-volume search terms, low-competition hidden gems, Hinglish/Roman Hindi keywords (exactly how Indians type), and English variations. Format as a numbered list.

📱 4 VIRAL SHORTS IDEAS (under 60 seconds each)
For each: topic, first spoken hook line, format type, best upload time.

📈 CONTENT STRATEGY FOR ${month().toUpperCase()} ${year()}
Which video format gets most views this month? Any festivals or occasions to target? What's trending in Indian devotional YouTube right now?

🏆 3 COMPETITOR GAPS
What are popular devotional channels NOT making that you can dominate with?

Be very India-specific. Include actual Hinglish search terms Indians use on YouTube.`
      );
      setResult(r);
      onSave("Trends", niche, r);
    } catch(e) { setErr(e.message); }
    setLoading(false);
  }

  return (
    <div>
      <SectionHead icon="🔥" title="Daily Trend Research" sub="Powered by Gemini — discover what devotees are searching for TODAY"/>
      <InfoBox title="💡 HOW TO USE">
        Type any niche below — deity name, festival, song type, occasion. Gemini will research fresh trends and give you a complete content strategy. Everything is saved to your History automatically.
      </InfoBox>
      <NicheInput value={niche} onChange={setNiche} label="Enter Your Niche or Topic"/>
      <ErrBox msg={err}/>
      <Btn onClick={go} disabled={loading||!niche.trim()} full>
        {loading?"🔍 Gemini is researching…":"🚀 Research Today's Trends"}
      </Btn>
      {loading&&<Spinner/>}
      {result&&<ResultBox content={result}/>}
    </div>
  );
}

// ─── SEO ─────────────────────────────────────────────────────────────────────
export function SEOTab({ onSave }) {
  const [niche, setNiche]     = useState("");
  const [topic, setTopic]     = useState("");
  const [vtype, setVtype]     = useState("Long Video (8–15 min)");
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState(null);
  const [err, setErr]         = useState("");

  const VTYPES = ["Short (under 60s)","Long Video (8–15 min)","Aarti Video","Mantra Chanting","Bhajan Compilation","Pravachan / Katha","Festival Special","Whatsapp Status Video"];

  async function go() {
    if (!topic.trim()) return;
    setLoading(true); setResult(null); setErr("");
    try {
      const r = await callGemini(SYS,
        `Generate a complete YouTube SEO package for an Indian devotional video.
Channel Niche: ${niche||"General Devotional / Bhakti"}
Video Topic: "${topic}"
Video Type: ${vtype}
Month: ${month()} ${year()}

📌 3 TITLE OPTIONS:
• Title 1: Keyword-first (most important Hinglish keyword at the very start)
• Title 2: Emotional/devotional angle (triggers feeling)
• Title 3: Trending/curiosity angle (with year or festival if relevant)

📝 YOUTUBE DESCRIPTION (380–420 words):
• Line 1–2: Super catchy hook (these show BEFORE "show more" — make them irresistible)
• Body: Natural keyword usage, 5–7 keywords woven in
• Timestamps: [0:00] Intro etc.
• Subscribe CTA + bell icon request
• 10 relevant hashtags at the very end

🏷️ 30 TAGS (comma-separated):
Mix: exact match, broad match, Hinglish spellings, English spellings, related deity/festival tags, trending tags, channel niche tags

#️⃣ TOP 10 HASHTAGS for this video

🖼️ THUMBNAIL TEXT SUGGESTION (4–6 bold words to put on thumbnail)

🎬 VIRAL HOOK SCRIPT (first 8 seconds spoken — must make viewer stay)

⏰ BEST UPLOAD TIME & DAY for this specific content type`
      );
      setResult(r);
      onSave("SEO", `${topic} (${vtype})`, r);
    } catch(e) { setErr(e.message); }
    setLoading(false);
  }

  return (
    <div>
      <SectionHead icon="🎯" title="SEO Content Generator" sub="Complete title, description, tags & hashtags — paste directly into YouTube"/>
      <NicheInput value={niche} onChange={setNiche} label="Channel Niche (optional — helps Gemini personalise)"/>
      <TextInput label="Video Topic / Song Name" value={topic} onChange={e=>setTopic(e.target.value)}
        placeholder="e.g. hanuman chalisa fast version, sawan somwar special aarti…"/>
      <div style={{marginBottom:16}}>
        <div style={{color:T.muted,fontSize:12,marginBottom:8}}>Video Type</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
          {VTYPES.map(t=><Tag key={t} children={t} active={vtype===t} onClick={()=>setVtype(t)}/>)}
        </div>
      </div>
      <ErrBox msg={err}/>
      <Btn onClick={go} disabled={loading||!topic.trim()} full>
        {loading?"✨ Generating SEO package…":"⚡ Generate Full SEO Package"}
      </Btn>
      {loading&&<Spinner/>}
      {result&&<ResultBox content={result}/>}
    </div>
  );
}

// ─── RCA ─────────────────────────────────────────────────────────────────────
export function RCATab({ onSave }) {
  const [url, setUrl]         = useState("");
  const [ctx, setCtx]         = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState(null);
  const [err, setErr]         = useState("");

  async function go() {
    if (!ctx.trim()) return;
    setLoading(true); setResult(null); setErr("");
    try {
      const r = await callGemini(SYS,
        `Do a detailed Root Cause Analysis for an Indian devotional YouTube video that is NOT getting views.

Video URL: ${url||"Not provided"}
Creator's description: "${ctx}"

Be completely honest. Cover every possible reason:

🔍 TITLE DIAGNOSIS
• Keyword score out of 10
• Missing power words or emotional triggers
• Hinglish vs English balance — what's wrong?
• Better alternatives

🖼️ THUMBNAIL ANALYSIS
• Likely mistakes based on the description
• What makes devotional thumbnails get high CTR
• Specific improvements

🏷️ SEO AUDIT
• Missing high-volume Hinglish keywords
• Tag strategy errors
• Description hook quality
• Hashtag issues

⏰ TIMING ANALYSIS
• Was upload time wrong for this content type?
• Best days and times for this niche

📉 COMPETITION ISSUES
• How bigger devotional channels cover this topic
• Why viewers might choose them over this video

🎯 AUDIENCE MISMATCH
• Is the content attracting the right viewers?
• Search intent vs content mismatch

📱 FORMAT CHECK
• Was Long vs Short the right choice?
• Would this perform better as a different format?

💊 TOP 5 IMMEDIATE ACTION STEPS (numbered, very specific)

📈 3 IMPROVED TITLE OPTIONS (write them out fully)`
      );
      setResult(r);
      onSave("RCA", url||"Video Analysis", r);
    } catch(e) { setErr(e.message); }
    setLoading(false);
  }

  return (
    <div>
      <SectionHead icon="🔬" title="Video RCA Analyzer" sub="Find out exactly WHY your video isn't getting views"/>
      <InfoBox type="warn" title="⚠️ Note">
        Gemini cannot access YouTube's internal analytics. The more details you share about your video (title, time uploaded, view count, tags used, thumbnail description), the more accurate the diagnosis will be.
      </InfoBox>
      <TextInput label="YouTube Video URL (optional)" value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://youtube.com/watch?v=…"/>
      <TextInput label="Describe your video in detail — title, upload time, views in 48hrs, tags, thumbnail description"
        value={ctx} onChange={e=>setCtx(e.target.value)} rows={5}
        placeholder="e.g. Title was 'Hanuman Chalisa', uploaded Tuesday at 2pm, got 47 views in 48 hours. Tags: hanuman chalisa bhajan prayer. Thumbnail is orange with Hanuman ji image and text 'Hanuman Chalisa'…"/>
      <ErrBox msg={err}/>
      <Btn onClick={go} disabled={loading||!ctx.trim()} variant="danger" full>
        {loading?"🔬 Analyzing with Gemini…":"🔬 Run Root Cause Analysis"}
      </Btn>
      {loading&&<Spinner/>}
      {result&&<ResultBox content={result}/>}
    </div>
  );
}

// ─── SHORTS ──────────────────────────────────────────────────────────────────
export function ShortsTab({ onSave }) {
  const [niche, setNiche]     = useState("");
  const [days, setDays]       = useState(7);
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState(null);
  const [err, setErr]         = useState("");

  async function go() {
    setLoading(true); setResult(null); setErr("");
    try {
      const r = await callGemini(SYS,
        `Create a ${days}-day YouTube Shorts content calendar for an Indian devotional channel.
Niche: "${niche||"General Devotional / Bhajan"}"
Month: ${month()} ${year()}
Schedule: 2 Shorts per day = ${days*2} total Shorts

For EACH day use this exact format:
━━━ DAY [N] — [Date/Day name] ━━━
SHORT 1:
• Topic: [specific topic]
• Hook (first spoken line): "[exact words to say in first 2 seconds]"
• Format: [type: chanting clip / story snippet / quote / fact / aarti / etc.]
• Keywords to use: [3 Hinglish keywords]
• Upload at: [specific time]
• Duration: [seconds]

SHORT 2:
• Topic: [specific topic]
• Hook (first spoken line): "[exact words]"
• Format: [type]
• Keywords to use: [3 keywords]
• Upload at: [specific time]
• Duration: [seconds]

Mix these formats across all days: mantra chanting with lyrics, 30-sec devotional story, spiritual quote card, festival special (if ${month()} has any), behind-scenes puja ritual, bhajan clip with captions, mythological fact, "did you know" spiritual trivia, God's blessings message.

End with:
🏆 TOP 3 PERFORMANCE TIPS FOR DEVOTIONAL SHORTS this month`
      );
      setResult(r);
      onSave("Shorts", niche||"General", r);
    } catch(e) { setErr(e.message); }
    setLoading(false);
  }

  return (
    <div>
      <SectionHead icon="📱" title="Shorts Content Planner" sub="Plan 2 daily Shorts with viral hooks and perfect timing"/>
      <div style={{background:"rgba(0,0,0,0.25)",borderRadius:12,padding:16,marginBottom:18,border:`1px solid ${T.border}`}}>
        <div style={{color:T.gold,fontSize:12,fontWeight:700,marginBottom:10}}>⏰ Best Upload Times for Devotional Shorts (India)</div>
        {UPLOAD_TIMES.map(t=>(
          <div key={t.time} style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
            <div style={{width:40,height:40,borderRadius:8,background:"rgba(255,107,0,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{t.icon}</div>
            <div>
              <div style={{color:T.cream,fontSize:13,fontWeight:600}}>{t.time} <span style={{color:T.saffron,fontSize:11}}>({t.score}/100)</span></div>
              <div style={{color:T.muted,fontSize:11}}>{t.label}</div>
            </div>
          </div>
        ))}
      </div>
      <NicheInput value={niche} onChange={setNiche}/>
      <div style={{marginBottom:16}}>
        <div style={{color:T.muted,fontSize:12,marginBottom:8}}>Plan Duration</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {[3,7,14,30].map(d=><Tag key={d} children={`${d} Days`} active={days===d} onClick={()=>setDays(d)}/>)}
        </div>
      </div>
      <ErrBox msg={err}/>
      <Btn onClick={go} disabled={loading} full>
        {loading?"📅 Gemini is planning…":`📅 Generate ${days}-Day Shorts Calendar`}
      </Btn>
      {loading&&<Spinner/>}
      {result&&<ResultBox content={result}/>}
    </div>
  );
}

// ─── THUMBNAIL ────────────────────────────────────────────────────────────────
export function ThumbnailTab({ onSave }) {
  const [topic, setTopic]     = useState("");
  const [niche, setNiche]     = useState("");
  const [mood, setMood]       = useState("Devotional/Peaceful");
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState(null);
  const [err, setErr]         = useState("");

  const MOODS = ["Devotional/Peaceful","Powerful/Bold","Festival Joy","Emotional/Touching","Mysterious/Spiritual","Vibrant/Energetic"];

  async function go() {
    if (!topic.trim()) return;
    setLoading(true); setResult(null); setErr("");
    try {
      const r = await callGemini(SYS,
        `Design 3 high-CTR YouTube thumbnail concepts for an Indian devotional video.
Video Topic: "${topic}"
Niche: ${niche||"General Devotional"}
Desired Mood: ${mood}
Target Audience: Indian devotees, mostly mobile viewers

For EACH concept follow this exact structure:

━━━━━━━━━━━━━━━━━━━━━━━━
🖼️ CONCEPT [N] — "[Concept Name]"
━━━━━━━━━━━━━━━━━━━━━━━━
📐 LAYOUT: [Describe exactly — what element goes where: deity left, text right, etc.]
🎨 BACKGROUND: [Specific gradient, color, or scene — include hex codes]
✍️ MAIN TEXT ON THUMBNAIL: [Exact 3–6 bold words to display — in Hindi/Hinglish if appropriate]
🔤 TEXT STYLE: [Size, color, glow/shadow, position on screen]
🖼️ MAIN IMAGE: [Exact description of deity/scene/symbol to use]
✨ SPECIAL EFFECTS: [Flames, lotus petals, divine light rays, mandala, etc.]
😮 CLICK TRIGGER: [What psychological emotion makes a devotee click this?]
📊 CTR POTENTIAL: [Very High / High / Medium + reason why]

🖌️ CANVA STEP-BY-STEP (how to make this in Canva):
1. [Step 1]
2. [Step 2]
3. [Step 3]
4. [Step 4]
5. [Step 5 — final polish]

🎨 COLOUR PALETTE:
• Primary: #XXXXXX — [purpose]
• Secondary: #XXXXXX — [purpose]
• Text: #XXXXXX — [purpose]
• Accent: #XXXXXX — [purpose]

━━━━━━━━━━━━━━━━━━━━━━━━

After all 3 concepts, add:
❌ 5 COMMON THUMBNAIL MISTAKES devotional creators make
✅ 3 GOLDEN RULES for high-CTR devotional thumbnails
📱 MOBILE OPTIMISATION TIPS (since 75% of Indian viewers are on mobile)`
      );
      setResult(r);
      onSave("Thumbnail", topic, r);
    } catch(e) { setErr(e.message); }
    setLoading(false);
  }

  return (
    <div>
      <SectionHead icon="🖼️" title="Thumbnail Creator" sub="3 AI-designed concepts to maximise your Click-Through Rate"/>
      <InfoBox title="🎯 WHY THIS MATTERS">
        90% of top YouTube videos use custom thumbnails. A great thumbnail can increase views by 300–500% on the exact same content. Each concept comes with a complete Canva creation guide.
      </InfoBox>
      <NicheInput value={niche} onChange={setNiche} label="Channel Niche (optional)"/>
      <TextInput label="Video Topic / Title" value={topic} onChange={e=>setTopic(e.target.value)}
        placeholder="e.g. Hanuman Chalisa, Navratri Bhajan 2025, Sawan Somwar Aarti…"/>
      <div style={{marginBottom:16}}>
        <div style={{color:T.muted,fontSize:12,marginBottom:8}}>Thumbnail Mood</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
          {MOODS.map(m=><Tag key={m} children={m} active={mood===m} onClick={()=>setMood(m)} color={T.gold}/>)}
        </div>
      </div>
      <ErrBox msg={err}/>
      <Btn onClick={go} disabled={loading||!topic.trim()} full>
        {loading?"🎨 Gemini is designing…":"🎨 Generate 3 Thumbnail Concepts"}
      </Btn>
      <div style={{color:T.muted,fontSize:11,textAlign:"center",marginTop:6,marginBottom:4}}>Includes Canva guide + hex color palette for each concept</div>
      {loading&&<Spinner/>}
      {result&&<ResultBox content={result}/>}
    </div>
  );
}

// ─── HISTORY ─────────────────────────────────────────────────────────────────
export function HistoryTab({ username }) {
  const [items, setItems]   = useState(()=>typeof window!=="undefined"?loadHistory(username):[]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [expanded, setExp]  = useState(null);

  function refresh() { setItems(loadHistory(username)); }

  function del(id) {
    deleteHistoryItem(username, id);
    setItems(p=>p.filter(i=>i.id!==id));
    if(expanded===id) setExp(null);
  }

  const filtered = items.filter(i=>{
    const mt = filter==="All"||i.type===filter;
    const ms = !search||i.niche.toLowerCase().includes(search.toLowerCase())||i.content.toLowerCase().includes(search.toLowerCase());
    return mt&&ms;
  });

  const types=["All",...Object.keys(TYPE_COLORS)];

  return (
    <div>
      <SectionHead icon="📂" title="Activity History" sub="All your past research, SEO packages, and generated content"/>

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <div style={{color:T.muted,fontSize:12}}>{items.length} items saved on this device</div>
        <button onClick={refresh} style={{background:"transparent",border:`1px solid ${T.border}`,borderRadius:6,padding:"4px 10px",color:T.muted,cursor:"pointer",fontSize:11}}>↻ Refresh</button>
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:18}}>
        <input value={search} onChange={e=>setSearch(e.target.value)}
          placeholder="🔍  Search by topic, niche, or keyword…"
          style={{width:"100%",background:"rgba(0,0,0,0.38)",border:`1px solid ${T.border}`,borderRadius:10,padding:"10px 14px",color:T.cream,fontSize:13.5,outline:"none"}}/>
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
          {types.map(t=>(
            <Tag key={t} children={`${t==="All"?"📋":TYPE_ICONS[t]} ${t}`}
              active={filter===t} onClick={()=>setFilter(t)}
              color={t==="All"?T.saffron:TYPE_COLORS[t]}/>
          ))}
        </div>
      </div>

      {filtered.length===0?(
        <Card style={{textAlign:"center",padding:"44px 20px"}}>
          <div style={{fontSize:38,marginBottom:12}}>📂</div>
          <div style={{color:T.muted,fontSize:14}}>
            {items.length===0?"No history yet. Start with the Trends tab!":"No results match your search."}
          </div>
        </Card>
      ):(
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <div style={{color:T.muted,fontSize:11}}>{filtered.length} item{filtered.length!==1?"s":""} found</div>
          {filtered.map(item=>(
            <Card key={item.id} style={{borderColor:`${TYPE_COLORS[item.type]||T.border}33`}}>
              <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:10}}>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap"}}>
                    <span style={{background:`${TYPE_COLORS[item.type]}22`,border:`1px solid ${TYPE_COLORS[item.type]}44`,color:TYPE_COLORS[item.type],borderRadius:4,padding:"2px 8px",fontSize:11,fontWeight:700}}>
                      {TYPE_ICONS[item.type]} {item.type}
                    </span>
                    <span style={{color:T.muted,fontSize:11}}>{fmtDate(item.ts)}</span>
                  </div>
                  <div style={{color:T.cream,fontSize:14,fontWeight:600,marginBottom:4}}>{item.niche}</div>
                  {expanded!==item.id&&(
                    <div style={{color:T.muted,fontSize:12,overflow:"hidden",maxHeight:36,lineHeight:1.5}}>
                      {item.content.substring(0,130)}…
                    </div>
                  )}
                </div>
                <div style={{display:"flex",gap:6,flexShrink:0}}>
                  <button onClick={()=>setExp(expanded===item.id?null:item.id)}
                    style={{background:"rgba(255,255,255,0.07)",border:`1px solid ${T.border}`,borderRadius:6,padding:"5px 10px",color:T.muted,cursor:"pointer",fontSize:11}}>
                    {expanded===item.id?"▲":"▼"}
                  </button>
                  <CopyBtn text={item.content}/>
                  <button onClick={()=>del(item.id)}
                    style={{background:"rgba(192,57,43,0.1)",border:`1px solid ${T.red}44`,borderRadius:6,padding:"5px 10px",color:T.red,cursor:"pointer",fontSize:11}}>
                    🗑
                  </button>
                </div>
              </div>
              {expanded===item.id&&(
                <div style={{marginTop:14,paddingTop:14,borderTop:`1px solid ${T.border}`,color:T.cream,fontSize:13,lineHeight:1.85,whiteSpace:"pre-wrap",maxHeight:420,overflowY:"auto"}}>
                  {item.content}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── ROADMAP ─────────────────────────────────────────────────────────────────
export function RoadmapTab() {
  const PHASES = [
    { phase:"Phase 1", title:"Right Now — Free", color:T.saffron, cost:"₹0",
      steps:["Use this tool daily before every upload","Copy AI output into YouTube Studio","Track results in Google Sheets","Learn what your audience clicks on"],
      tools:["This Web App (Gemini-powered)","YouTube Studio","Canva","Google Sheets"] },
    { phase:"Phase 2", title:"Month 2–3", color:T.gold, cost:"₹500–2,000/mo",
      steps:["Chrome Extension to auto-fill YouTube upload form","Competitor channel tracker","Festival content calendar automation","Weekly email digest of trending topics"],
      tools:["Chrome Extension","Google Trends API","Resend Email","YouTube Data API"] },
    { phase:"Phase 3", title:"Month 4–6 — SaaS", color:"#E67E22", cost:"₹5K–15K setup",
      steps:["Launch as paid tool for other devotional creators","Add YouTube Analytics integration","Multi-niche support","AI thumbnail image generator"],
      tools:["Supabase","Razorpay","Vercel","Google Imagen API"] },
  ];

  return (
    <div>
      <SectionHead icon="🗺️" title="Growth Roadmap" sub="Your journey from free MVP to full SaaS platform"/>

      <InfoBox title="🎁 YOUR GEMINI FREE TIER LIMITS">
        gemini-1.5-flash: <strong style={{color:T.cream}}>15 requests/minute · 1,500 requests/day · completely FREE</strong>. At 10 requests a day for your content work, your API key will last forever at zero cost. No credit card needed.
      </InfoBox>

      {PHASES.map((p,i)=>(
        <Card key={i} style={{marginBottom:18,borderColor:`${p.color}33`}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14,flexWrap:"wrap"}}>
            <div style={{background:`linear-gradient(135deg,${p.color},${p.color}88)`,borderRadius:6,padding:"3px 10px",color:T.deep,fontWeight:700,fontSize:11}}>{p.phase}</div>
            <div style={{color:p.color,fontWeight:700,fontSize:15,fontFamily:"Georgia,serif"}}>{p.title}</div>
            <div style={{marginLeft:"auto",color:T.green,fontWeight:700,fontSize:13}}>{p.cost}</div>
          </div>
          {p.steps.map((s,j)=>(
            <div key={j} style={{display:"flex",gap:10,marginBottom:8}}>
              <div style={{width:20,height:20,borderRadius:"50%",background:p.color,color:T.deep,fontSize:10,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>{j+1}</div>
              <div style={{color:T.cream,fontSize:13.5}}>{s}</div>
            </div>
          ))}
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:12}}>
            {p.tools.map(t=><span key={t} style={{background:`${p.color}15`,border:`1px solid ${p.color}33`,borderRadius:4,padding:"3px 9px",color:T.cream,fontSize:11}}>{t}</span>)}
          </div>
        </Card>
      ))}

      <Card style={{borderColor:`${T.gold}44`,background:"rgba(255,179,0,0.04)"}}>
        <div style={{color:T.gold,fontWeight:700,fontSize:15,marginBottom:14,fontFamily:"Georgia,serif"}}>💰 Monetization Plan for Your Tool</div>
        {[
          {plan:"Free",    desc:"5 AI generations/day — build user base",        price:"₹0"},
          {plan:"Creator", desc:"Unlimited + Shorts calendar + RCA + History",   price:"₹299/mo"},
          {plan:"Pro",     desc:"All features + competitor analysis + extension", price:"₹799/mo"},
          {plan:"Agency",  desc:"10+ channels + white-label",                    price:"₹2,999/mo"},
        ].map(m=>(
          <div key={m.plan} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:`1px solid ${T.faint}`}}>
            <div>
              <div style={{color:T.cream,fontWeight:600,fontSize:13}}>{m.plan}</div>
              <div style={{color:T.muted,fontSize:11}}>{m.desc}</div>
            </div>
            <div style={{color:T.gold,fontWeight:700}}>{m.price}</div>
          </div>
        ))}
      </Card>
    </div>
  );
}
