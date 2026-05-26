// components/AuthScreen.js
import { useState } from "react";
import { T } from "../lib/theme";
import { Card, Btn, TextInput } from "./UI";

export default function AuthScreen({ onLogin }) {
  const [mode, setMode]         = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  async function submit() {
    if (!username.trim()||!password.trim()) return setError("Please fill in all fields.");
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/auth",{
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({action:mode,username:username.trim(),password}),
      });
      const data = await res.json();
      if(!res.ok){setError(data.error||"Something went wrong.");setLoading(false);return;}
      onLogin(data.username);
    } catch { setError("Network error. Please try again."); }
    setLoading(false);
  }

  return (
    <div style={{minHeight:"100vh",background:`radial-gradient(ellipse at top,#2D0900,#0D0400)`,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{width:"100%",maxWidth:400}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{fontSize:62,background:`linear-gradient(135deg,${T.saffron},${T.gold})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",display:"inline-block",lineHeight:1.1}}>ॐ</div>
          <h1 style={{margin:"10px 0 4px",color:T.gold,fontFamily:"Georgia,serif",fontSize:26}}>BhaktiGrow AI</h1>
          <p style={{color:T.muted,fontSize:13}}>YouTube Growth Tool • Powered by Google Gemini</p>
        </div>

        <Card>
          <div style={{display:"flex",gap:0,marginBottom:22,background:"rgba(0,0,0,0.3)",borderRadius:8,padding:3}}>
            {[["login","🔑 Sign In"],["register","✨ Register"]].map(([m,l])=>(
              <button key={m} onClick={()=>{setMode(m);setError("");}}
                style={{flex:1,padding:"9px",border:"none",borderRadius:6,cursor:"pointer",background:mode===m?`linear-gradient(135deg,${T.saffron},${T.gold})`:"transparent",color:mode===m?T.deep:T.muted,fontWeight:700,fontSize:13,transition:"all .2s"}}>
                {l}
              </button>
            ))}
          </div>

          <TextInput label="Username" value={username} onChange={e=>setUsername(e.target.value)} placeholder="e.g. bhaktibhajan_geet"/>
          <TextInput label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Min 6 characters"/>

          {error&&<div style={{background:"rgba(192,57,43,0.15)",border:`1px solid ${T.red}44`,borderRadius:8,padding:"10px 14px",marginBottom:14,color:"#E74C3C",fontSize:13}}>{error}</div>}

          <Btn onClick={submit} disabled={loading} full>
            {loading?"Please wait…":mode==="login"?"🚀 Sign In":"🎉 Create Account"}
          </Btn>

          <div style={{color:T.muted,fontSize:11,textAlign:"center",marginTop:18,lineHeight:1.8}}>
            🔒 Secure login · Works on all devices<br/>
            📱 Mobile · Tablet · Laptop · Desktop<br/>
            🌐 Access from anywhere with just a browser
          </div>
        </Card>

        <div style={{textAlign:"center",marginTop:20,color:"rgba(255,255,255,0.2)",fontSize:11}}>
          Powered by Google Gemini 1.5 Flash (Free Tier) 🙏
        </div>
      </div>
    </div>
  );
}
