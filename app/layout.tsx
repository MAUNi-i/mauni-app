import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "U-ACT / MAUNi — Built Since 2015",
  description:
    "U-ACT / MAUNi is an international recovery coaching, systemic wellness, and recovery capital ecosystem operating across the UK, South Africa, the Netherlands, and 27 countries worldwide.",
  openGraph: {
    title: "U-ACT / MAUNi — Built Since 2015",
    description:
      "A decade of building recovery capital, systemic wellness, coaching, and recovery infrastructure across 27 countries.",
    type: "website",
    url: "https://uact.org.za",
    images: ["https://uact.org.za/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "U-ACT / MAUNi — Built Since 2015",
    description:
      "Recovery infrastructure, coaching, systemic wellness, and AI-enabled recovery ecosystems.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <MauniWidget />
      </body>
    </html>
  );
}

function MauniWidget() {
  return (
    <>
      <style>{`
        #mauni-toggle{position:fixed;bottom:24px;right:24px;width:56px;height:56px;background:#2a7a6e;border:none;border-radius:50%;color:white;font-size:20px;cursor:pointer;box-shadow:0 4px 16px rgba(42,122,110,0.4);z-index:1000;display:flex;align-items:center;justify-content:center;transition:transform 0.2s;}
        #mauni-toggle:hover{transform:scale(1.08);}
        #mauni-widget{position:fixed;bottom:90px;right:24px;width:360px;height:500px;background:white;border-radius:18px;box-shadow:0 12px 40px rgba(0,0,0,0.15);display:flex;flex-direction:column;overflow:hidden;z-index:999;opacity:0;transform:translateY(16px) scale(0.97);pointer-events:none;transition:opacity 0.2s,transform 0.2s;}
        #mauni-widget.open{opacity:1;transform:translateY(0) scale(1);p
cat > /tmp/widget_layout_patch.tsx << 'EOF'
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <MauniWidget />
      </body>
    </html>
  );
}

function MauniWidget() {
  return (
    <>
      <style>{`
        #mauni-toggle{position:fixed;bottom:24px;right:24px;width:56px;height:56px;background:#2a7a6e;border:none;border-radius:50%;color:white;font-size:20px;cursor:pointer;box-shadow:0 4px 16px rgba(42,122,110,0.4);z-index:1000;display:flex;align-items:center;justify-content:center;transition:transform 0.2s;}
        #mauni-toggle:hover{transform:scale(1.08);}
        #mauni-widget{position:fixed;bottom:90px;right:24px;width:360px;height:500px;background:white;border-radius:18px;box-shadow:0 12px 40px rgba(0,0,0,0.15);display:flex;flex-direction:column;overflow:hidden;z-index:999;opacity:0;transform:translateY(16px) scale(0.97);pointer-events:none;transition:opacity 0.2s,transform 0.2s;}
        #mauni-widget.open{opacity:1;transform:translateY(0) scale(1);pointer-events:all;}
        .mw-header{background:#2a7a6e;padding:14px 16px;display:flex;align-items:center;gap:10px;flex-shrink:0;}
        .mw-avatar{width:34px;height:34px;background:rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;color:white;font-size:14px;}
        .mw-header h3{font-size:14px;font-weight:600;color:white;margin:0;}
        .mw-header p{font-size:11px;color:rgba(255,255,255,0.8);margin:0;}
        #mw-close{margin-left:auto;background:none;border:none;color:rgba(255,255,255,0.8);font-size:20px;cursor:pointer;}
        #mw-messages{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;background:#f8f7f4;}
        .mw-msg{max-width:82%;padding:10px 13px;border-radius:14px;font-size:13.5px;line-height:1.6;animation:mwrise 0.2s ease;}
        @keyframes mwrise{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        .mw-msg.assistant{background:white;color:#080b12;border-bottom-left-radius:4px;border:0.5px solid #e0ddd6;align-self:flex-start;}
        .mw-msg.user{background:#2a7a6e;color:white;border-bottom-right-radius:4px;align-self:flex-end;}
        .mw-typing{display:flex;align-items:center;gap:4px;padding:10px 13px;background:white;border:0.5px solid #e0ddd6;border-radius:14px;border-bottom-left-radius:4px;align-self:flex-start;}
        .mw-typing span{width:6px;height:6px;background:#2a7a6e;border-radius:50%;animation:mwbounce 1.2s infinite;opacity:0.6;}
        .mw-typing span:nth-child(2){animation-delay:0.2s;}
        .mw-typing span:nth-child(3){animation-delay:0.4s;}
        @keyframes mwbounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}
        .mw-input-area{border-top:0.5px solid #e0ddd6;padding:10px 12px;background:white;display:flex;gap:8px;align-items:flex-end;flex-shrink:0;}
        #mw-input{flex:1;border:0.5px solid #d5d0c8;border-radius:10px;padding:8px 12px;font-size:13.5px;font-family:inherit;resize:none;outline:none;background:#f8f7f4;line-height:1.5;min-height:38px;max-height:90px;}
        #mw-input:focus{border-color:#2a7a6e;background:white;}
        #mw-send{width:38px;height:38px;background:#2a7a6e;border:none;border-radius:10px;color:white;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background 0.15s;}
        #mw-send:hover{background:#1d5c52;}
        #mw-send:disabled{opacity:0.4;cursor:not-allowed;}
      `}</style>

      <button id="mauni-toggle" aria-label="Open MAUNi Assistant">M</button>

      <div id="mauni-widget">
        <div className="mw-header">
          <div className="mw-avatar">M</div>
          <div><h3>MAUNi Assistant</h3><p>Recovery coaching support</p></div>
          <button id="mw-close">✕</button>
        </div>
        <div id="mw-messages">
          <div className="mw-msg assistant">Sawubona. Welcome.<br/>I am here to support you — ask me anything about recovery coaching, Ubuntu, or the MAUNi programme.</div>
        </div>
        <div className="mw-input-area">
          <textarea id="mw-input" placeholder="Ask MAUNi..." rows={1}></textarea>
          <button id="mw-send">➤</button>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{__html: `
        const MAUNI_API='https://mauni-backend.vercel.app';
        let history=[];
        document.getElementById('mauni-toggle').onclick=()=>document.getElementById('mauni-widget').classList.toggle('open');
        document.getElementById('mw-close').onclick=()=>document.getElementById('mauni-widget').classList.remove('open');
        document.getElementById('mw-input').addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();}});
        document.getElementById('mw-send').onclick=send;
        function addMsg(role,text){const d=document.createElement('div');d.className='mw-msg '+role;d.innerHTML=text.replace(/\\*\\*(.*?)\\*\\*/g,'<strong>$1</strong>').replace(/\\n/g,'<br>');document.getElementById('mw-messages').appendChild(d);document.getElementById('mw-messages').scrollTop=99999;}
        function showTyping(){const d=document.createElement('div');d.className='mw-typing';d.id='mw-typing';d.innerHTML='<span></span><span></span><span></span>';document.getElementById('mw-messages').appendChild(d);document.getElementById('mw-messages').scrollTop=99999;}
        function removeTyping(){const t=document.getElementById('mw-typing');if(t)t.remove();}
        async function send(){const input=document.getElementById('mw-input');const text=input.value.trim();if(!text)return;input.value='';document.getElementById('mw-send').disabled=true;addMsg('user',text);history.push({role:'user',content:text});showTyping();try{const res=await fetch(MAUNI_API+'/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:text,section:'dashboard',history})});const data=await res.json();removeTyping();addMsg('assistant',data.reply);history=data.history;}catch(e){removeTyping();addMsg('assistant','Something went wrong. Please try again.');}document.getElementById('mw-send').disabled=false;}
      `}} />
    </>
  );
}

