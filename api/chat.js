module.exports=async function(req,res){
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='POST')return res.status(405).json({error:'POST required'});
 const key=process.env.GEMINI_API_KEY;
 if(!key)return res.status(503).json({error:'GEMINI_API_KEY missing in Vercel environment variables',code:'MISSING_KEY'});
 const {message,language,history}=req.body||{};
 if(typeof message!=='string'||!message.trim()||message.length>350)return res.status(400).json({error:'Please enter a short message'});
 const instruction=`You are Yuaan AI Buddy, a friendly fictional robot for a parent-supervised preschooler. Reply in ${language==='ml'?'simple Malayalam':'simple English'} in 1-3 short sentences. Be playful, teach colors, numbers, animals, and play gentle games. Do not request personal information, secrets or photos. Never suggest dangerous actions. Encourage asking a parent when appropriate.`;
 const contents=(Array.isArray(history)?history.slice(-6):[]).filter(x=>x&&['user','model'].includes(x.role)&&typeof x.text==='string').map(x=>({role:x.role,parts:[{text:x.text.slice(0,350)}]}));
 contents.push({role:'user',parts:[{text:message.trim()}]});
 try{
  const controller=new AbortController(), timer=setTimeout(()=>controller.abort(),20000);let response;
  try{response=await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':key},body:JSON.stringify({systemInstruction:{parts:[{text:instruction}]},contents,generationConfig:{temperature:.7,maxOutputTokens:600,thinkingConfig:{thinkingBudget:0}}}),signal:controller.signal})}finally{clearTimeout(timer)}
  const data=await response.json().catch(()=>({}));
  if(!response.ok){const providerCode=String(data.error?.status||'PROVIDER_ERROR').slice(0,60);console.error('Gemini API HTTP',response.status,providerCode);return res.status(502).json({error:`Gemini returned HTTP ${response.status} (${providerCode}). Check API key, API access and quota.`,code:providerCode});}
  const reply=(data.candidates?.[0]?.content?.parts||[]).map(x=>x.text||'').join('').trim();
  if(!reply){console.error('Gemini empty response',data.candidates?.[0]?.finishReason);return res.status(502).json({error:'Gemini returned an empty answer. Please try again.',code:'EMPTY_RESPONSE'});}
  return res.status(200).json({reply:reply.slice(0,1200)});
 }catch(e){console.error('Gemini request failed',e?.name);return res.status(502).json({error:'AI connection timed out or failed.',code:'NETWORK_ERROR'});}
};
