// pages/index.js
import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import { T, saveHistory } from "../lib/theme";
import AuthScreen from "../components/AuthScreen";
import { TrendsTab, SEOTab, RCATab, ShortsTab, ThumbnailTab, HistoryTab, RoadmapTab } from "../components/Tabs";

const TABS = [
  { id:"trends",    label:"🔥 Trends"    },
  { id:"seo",       label:"🎯 SEO"       },
  { id:"rca",       label:"🔬 RCA"       },
  { id:"shorts",    label:"📱 Shorts"    },
  { id:"thumbnail", label:"🖼️ Thumbnail" },
  { id:"history",   label:"📂 History"   },
  { id:"roadmap",   label:"🗺️ Roadmap"   },
];

export default function Home() {
  const [user, setUser]       = useState(null);
  const [tab, setTab]         = useState("trends");
  const [badge, setBadge]     = useState(0);
  const [ready, setReady]     = useState(false);

  useEffect(()=>{
    try { const s=localStorage.getItem("bg_session"); if(s) setUser(s); } catch {}
    setReady(true);
  },[]);

  function login(u)  { setUser(u); try{localStorage.setItem("bg_session",u);}catch{} }
  function logout()  { setUser(null); try{localStorage.removeItem("bg_session");}catch{} }

  const onSave = useCallback((type,niche,content)=>{
    if(!user) return;
    saveHistory(user,type,niche,content);
    setBadge(b=>b+1);
  },[user]);

  function goTab(id){ setTab(id); if(id==="history") setBadge(0); }

  if(!ready) return null;
  if(!user) return <AuthScreen onLogin={login}/>;

  const props = { username:user, onSave };

  return (
    <>
      <Head>
        <title>BhaktiGrow AI — YouTube Growth Tool</title>
        <meta name="description" content="AI-powered YouTube SEO and growth tool for Indian devotional creators. Powered by Google Gemini."/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🪔</text></svg>"/>
      </Head>

      <div style={{minHeight:"100vh",background:`radial-gradient(ellipse at top,#2D0900 0%,${T.bg} 55%,#080200 100%)`}}>

        {/* HEADER */}
        <div style={{background:"rgba(0,0,0,0.65)",backdropFilter:"blur(20px)",borderBottom:`1px solid ${T.border}`,position:"sticky",top:0,zIndex:100}}>
          <div style={{maxWidth:860,margin:"0 auto",padding:"0 16px",display:"flex",alignItems:"center",justifyContent:"space-between",height:54}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:24,background:`linear-gradient(135deg,${T.saffron},${T.gold})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>ॐ</span>
              <div>
                <div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:15,background:`linear-gradient(135deg,${T.saffron},${T.gold})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>BhaktiGrow AI</div>
                <div style={{color:T.muted,fontSize:9,letterSpacing:0.5}}>POWERED BY GOOGLE GEMINI</div>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{background:"rgba(255,107,0,0.1)",border:`1px solid ${T.saffron}33`,borderRadius:6,padding:"3px 10px",color:T.saffron,fontSize:11,fontWeight:600}}>
                👤 {user}
              </div>
              <button onClick={logout} style={{background:"rgba(255,255,255,0.05)",border:`1px solid ${T.border}`,borderRadius:6,padding:"4px 10px",color:T.muted,cursor:"pointer",fontSize:11}}>
                Sign Out
              </button>
            </div>
          </div>

          {/* TABS */}
          <div style={{overflowX:"auto",borderTop:`1px solid ${T.faint}`,scrollbarWidth:"none"}}>
            <style>{`.tab-bar::-webkit-scrollbar{display:none}`}</style>
            <div className="tab-bar" style={{display:"flex",maxWidth:860,margin:"0 auto",padding:"0 16px"}}>
              {TABS.map(t=>(
                <button key={t.id} onClick={()=>goTab(t.id)} style={{
                  padding:"11px 13px",border:"none",background:"transparent",
                  cursor:"pointer",whiteSpace:"nowrap",
                  color:tab===t.id?T.gold:T.muted,
                  fontWeight:tab===t.id?700:400,fontSize:12.5,
                  borderBottom:`2px solid ${tab===t.id?T.gold:"transparent"}`,
                  transition:"all .15s",position:"relative",
                }}>
                  {t.label}
                  {t.id==="history"&&badge>0&&(
                    <span style={{position:"absolute",top:7,right:4,background:T.saffron,color:T.deep,borderRadius:10,fontSize:9,fontWeight:700,padding:"1px 5px",minWidth:14,textAlign:"center"}}>{badge}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{maxWidth:860,margin:"0 auto",padding:"24px 16px 70px"}}>
          {tab==="trends"    && <TrendsTab    {...props}/>}
          {tab==="seo"       && <SEOTab       {...props}/>}
          {tab==="rca"       && <RCATab       {...props}/>}
          {tab==="shorts"    && <ShortsTab    {...props}/>}
          {tab==="thumbnail" && <ThumbnailTab {...props}/>}
          {tab==="history"   && <HistoryTab   username={user}/>}
          {tab==="roadmap"   && <RoadmapTab/>}
        </div>

        <div style={{textAlign:"center",padding:"20px 16px",borderTop:`1px solid ${T.faint}`,color:"rgba(255,255,255,0.18)",fontSize:11}}>
          BhaktiGrow AI • @bhaktibhajan_geet • Google Gemini 1.5 Flash 🙏
        </div>
      </div>
    </>
  );
}
