// components/UI.js
import { useState, useRef, useEffect } from "react";
import { T, NICHE_SUGGESTIONS } from "../lib/theme";

export function Spinner() {
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:14,padding:"40px 0"}}>
      <div style={{fontSize:46,animation:"omSpin 2s linear infinite",background:`linear-gradient(135deg,${T.saffron},${T.gold})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",display:"inline-block"}}>ॐ</div>
      <div style={{color:T.gold,fontSize:11,letterSpacing:3,fontFamily:"Georgia,serif"}}>GEMINI IS THINKING…</div>
    </div>
  );
}

export function Card({children,style={},accent}) {
  return <div style={{background:T.card,backdropFilter:"blur(10px)",border:`1px solid ${accent||T.border}`,borderRadius:14,padding:20,...style}}>{children}</div>;
}

export function Btn({children,onClick,disabled,variant="primary",full,small,style={}}) {
  const map={
    primary:{bg:disabled?"rgba(255,107,0,0.22)":`linear-gradient(135deg,${T.saffron},${T.gold})`,color:T.deep,sh:`0 4px 20px rgba(255,107,0,0.35)`},
    danger: {bg:`linear-gradient(135deg,${T.red},#E74C3C)`,color:"#fff",sh:`0 4px 20px rgba(192,57,43,0.35)`},
    ghost:  {bg:"rgba(255,255,255,0.07)",color:T.muted,sh:"none"},
  };
  const v=map[variant]||map.primary;
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background:v.bg,border:"none",borderRadius:10,
      padding:small?"7px 14px":"12px 22px",
      cursor:disabled?"not-allowed":"pointer",color:v.color,
      fontWeight:700,fontSize:small?12:14,
      width:full?"100%":"auto",
      boxShadow:!disabled?v.sh:"none",
      transition:"all .2s",...style,
    }}>{children}</button>
  );
}

export function TextInput({label,value,onChange,placeholder,type="text",rows}) {
  const base={width:"100%",background:"rgba(0,0,0,0.38)",border:`1px solid ${T.border}`,borderRadius:10,padding:"11px 14px",color:T.cream,fontSize:14,outline:"none",fontFamily:"inherit",transition:"border-color .2s"};
  return (
    <div style={{marginBottom:14}}>
      {label&&<div style={{color:T.muted,fontSize:12,marginBottom:6}}>{label}</div>}
      {rows
        ?<textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows} style={{...base,resize:"vertical"}}/>
        :<input type={type} value={value} onChange={onChange} placeholder={placeholder} style={base}/>}
    </div>
  );
}

export function CopyBtn({text}) {
  const [ok,setOk]=useState(false);
  return (
    <button onClick={()=>{try{navigator.clipboard.writeText(text)}catch{}setOk(true);setTimeout(()=>setOk(false),2000);}}
      style={{background:ok?T.green:"rgba(255,107,0,0.12)",border:`1px solid ${ok?T.green:T.saffron}`,color:ok?"#fff":T.saffron,borderRadius:7,padding:"4px 12px",cursor:"pointer",fontSize:11,fontWeight:700,transition:"all .2s"}}>
      {ok?"✓ Copied":"Copy"}
    </button>
  );
}

export function ResultBox({content}) {
  return (
    <Card style={{marginTop:20}} className="fade-up">
      <div style={{display:"flex",justifyContent:"flex-end",marginBottom:10}}><CopyBtn text={content}/></div>
      <div style={{color:T.cream,fontSize:13.5,lineHeight:1.9,whiteSpace:"pre-wrap"}}>{content}</div>
    </Card>
  );
}

export function Tag({children,active,onClick,color}) {
  return (
    <button onClick={onClick} style={{padding:"5px 13px",borderRadius:20,border:`1px solid ${active?(color||T.saffron):T.border}`,background:active?`${color||T.saffron}22`:"transparent",color:active?(color||T.saffron):T.muted,fontSize:12,fontWeight:active?700:400,cursor:"pointer",transition:"all .15s"}}>
      {children}
    </button>
  );
}

export function SectionHead({icon,title,sub}) {
  return (
    <div style={{marginBottom:22}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:3}}>
        <span style={{fontSize:22}}>{icon}</span>
        <h2 style={{margin:0,color:T.gold,fontFamily:"Georgia,serif",fontSize:20}}>{title}</h2>
      </div>
      {sub&&<p style={{margin:0,color:T.muted,fontSize:12.5,paddingLeft:32}}>{sub}</p>}
    </div>
  );
}

export function InfoBox({title,children,type="info"}) {
  const c={info:T.saffron,warn:T.gold,danger:T.red}[type]||T.saffron;
  return (
    <div style={{background:`${c}10`,border:`1px solid ${c}33`,borderRadius:12,padding:"13px 16px",marginBottom:18}}>
      {title&&<div style={{color:c,fontSize:12,fontWeight:700,marginBottom:5}}>{title}</div>}
      <div style={{color:T.muted,fontSize:12.5,lineHeight:1.7}}>{children}</div>
    </div>
  );
}

export function NicheInput({value,onChange,label="Your Niche / Topic"}) {
  const [open,setOpen]=useState(false);
  const [list,setList]=useState([]);
  const ref=useRef(null);

  useEffect(()=>{
    const h=(e)=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};
    document.addEventListener("mousedown",h);
    return()=>document.removeEventListener("mousedown",h);
  },[]);

  function handle(v) {
    onChange(v);
    const f=v?NICHE_SUGGESTIONS.filter(s=>s.toLowerCase().includes(v.toLowerCase())).slice(0,8):NICHE_SUGGESTIONS.slice(0,10);
    setList(f); setOpen(true);
  }

  return (
    <div ref={ref} style={{position:"relative",marginBottom:14}}>
      {label&&<div style={{color:T.muted,fontSize:12,marginBottom:6}}>{label}</div>}
      <input value={value} onChange={e=>handle(e.target.value)}
        onFocus={()=>{setList(value?list:NICHE_SUGGESTIONS.slice(0,10));setOpen(true);}}
        placeholder="Type any niche, deity, festival, song… e.g. hanuman bhajan, navratri 2025"
        style={{width:"100%",background:"rgba(0,0,0,0.38)",border:`1px solid ${T.border}`,borderRadius:10,padding:"11px 14px",color:T.cream,fontSize:14,outline:"none"}}
      />
      {open&&list.length>0&&(
        <div style={{position:"absolute",top:"calc(100% + 4px)",left:0,right:0,zIndex:300,background:"#1A0800",border:`1px solid ${T.border}`,borderRadius:10,maxHeight:220,overflowY:"auto",boxShadow:"0 8px 32px rgba(0,0,0,0.7)"}}>
          <div style={{padding:"6px 12px",color:T.muted,fontSize:10,letterSpacing:1}}>SUGGESTIONS</div>
          {list.map(s=>(
            <div key={s} onMouseDown={()=>{onChange(s);setOpen(false);}}
              style={{padding:"9px 14px",cursor:"pointer",color:T.cream,fontSize:13}}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,107,0,0.12)"}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              {s}
            </div>
          ))}
          {value&&!list.find(f=>f.toLowerCase()===value.toLowerCase())&&(
            <div onMouseDown={()=>{onChange(value);setOpen(false);}}
              style={{padding:"9px 14px",cursor:"pointer",color:T.saffron,fontSize:13,borderTop:`1px solid ${T.border}`}}>
              ✦ Use "<strong>{value}</strong>" as custom niche
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function ErrBox({msg}) {
  if(!msg) return null;
  return <div style={{color:T.red,fontSize:13,marginBottom:14,background:"rgba(192,57,43,0.1)",padding:"10px 14px",borderRadius:8}}>⚠️ {msg}</div>;
}
