(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();const ot="second-mind.json",qe="daily-report.json",on="second-mind-corrupt",qn="daily-report-fs",xt="kv",da=["dataDir","backupDir"];function Bt(){return typeof window<"u"&&typeof window.showDirectoryPicker=="function"&&typeof indexedDB<"u"}function Wn(){return window.showDirectoryPicker({id:"second-mind-data",mode:"readwrite"})}function Un(t){return!t||typeof t.queryPermission!="function"?Promise.resolve("granted"):t.queryPermission({mode:"readwrite"}).then(e=>["granted","denied","prompt"].includes(e)?e:"prompt",()=>"prompt")}function Ta(t){return!t||typeof t.requestPermission!="function"?Promise.resolve("granted"):t.requestPermission({mode:"readwrite"}).then(e=>["granted","denied","prompt"].includes(e)?e:"prompt",()=>"prompt")}function la(){return new Promise((t,e)=>{if(typeof indexedDB>"u"){e(new Error("no-indexeddb"));return}const a=indexedDB.open(qn,1);a.onupgradeneeded=()=>{try{a.result.createObjectStore(xt)}catch{}},a.onsuccess=()=>t(a.result),a.onerror=()=>e(a.error)})}function zn(t){return la().then(e=>new Promise((a,i)=>{const n=e.transaction(xt,"readonly").objectStore(xt).get(t);n.onsuccess=()=>a(n.result),n.onerror=()=>i(n.error)}))}function Yn(t,e){return la().then(a=>new Promise((i,n)=>{const s=a.transaction(xt,"readwrite");s.objectStore(xt).put(e,t),s.oncomplete=()=>i(),s.onerror=()=>n(s.error),s.onabort=()=>n(s.error)}))}function Jn(t){return la().then(e=>new Promise((a,i)=>{const n=e.transaction(xt,"readwrite");n.objectStore(xt).delete(t),n.oncomplete=()=>a(),n.onerror=()=>i(n.error),n.onabort=()=>i(n.error)}))}async function Vn(){for(const t of da)try{const e=await zn(t);if(e)return e}catch{}return null}async function Qn(t){await Yn(da[0],t)}async function Xn(){await Promise.all(da.map(t=>Jn(t).catch(()=>{})))}async function We(t,e){if(!t)return{missing:!0,raw:"",modified:0,error:"no-folder"};try{const i=await(await t.getFileHandle(e)).getFile();return{missing:!1,raw:await i.text(),modified:Number(i.lastModified)||0,error:""}}catch(a){return a&&(a.name==="NotFoundError"||a.name==="TypeMismatchError")?{missing:!0,raw:"",modified:0,error:""}:{missing:!1,raw:"",modified:0,error:String(a&&a.message||a)}}}async function Zn(t){const e=await We(t,ot);if(!e.missing)return{...e,name:ot};const a=await We(t,qe);return!a.missing&&!a.error?{...a,name:qe}:{...e,name:ot}}async function ca(t,e,a){if(!t)return{ok:!1,denied:!1,error:"no-folder"};try{const n=await(await t.getFileHandle(e,{create:!0})).createWritable();return await n.write(a),await n.close(),{ok:!0,denied:!1,error:""}}catch(i){return{ok:!1,denied:!!(i&&(i.name==="NotAllowedError"||i.name==="SecurityError")),error:String(i&&i.message||i)}}}function Kn(t,e){return ca(t,`${on}-${Date.now()}.json`,e)}async function ti(t){const e=[];if(!t||typeof t.values!="function")return e;try{for await(const a of t.values())if(!(!a||a.kind!=="file"||!/\.json$/i.test(a.name)))try{const i=await a.getFile();e.push({name:a.name,modified:Number(i.lastModified)||0})}catch{}}catch{return e}return e}function ei(t){const e=String(t||"");return!(!/\.json$/i.test(e)||e===ot||e===qe||e.startsWith(on))}function ai(){return typeof navigator<"u"&&navigator.storage&&typeof navigator.storage.getDirectory=="function"}let ne=null,Da=!1;async function ua(){if(Da)return ne;if(Da=!0,!ai())return null;try{ne=await navigator.storage.getDirectory()}catch{ne=null}return ne}async function ni(t,e){const a=await ua();if(!a)return{ok:!1,error:"unsupported"};try{const n=await(await a.getFileHandle(t,{create:!0})).createWritable();return await n.write(e),await n.close(),{ok:!0,error:""}}catch(i){return{ok:!1,error:String(i&&i.message||i)}}}async function ii(t){const e=await ua();if(!e)return{missing:!0,raw:"",modified:0,error:"unsupported"};try{const i=await(await e.getFileHandle(t)).getFile();return{missing:!1,raw:await i.text(),modified:Number(i.lastModified)||0,error:""}}catch(a){return a&&(a.name==="NotFoundError"||a.name==="TypeMismatchError")?{missing:!0,raw:"",modified:0,error:""}:{missing:!1,raw:"",modified:0,error:String(a&&a.message||a)}}}const si={BASE_URL:"./",DEV:!1,MODE:"production",PROD:!0,SSR:!1},oi="https://www.googleapis.com/auth/drive.appdata",rn="https://www.googleapis.com/drive/v3/files",Ca="https://www.googleapis.com/upload/drive/v3/files",Ue="second-mind-drive-client-id",pa="second-mind-drive-token",ze="second-mind-drive-off",ri="https://accounts.google.com/gsi/client",dn=60*1e3;function fa(t){try{return typeof localStorage>"u"?null:localStorage.getItem(t)}catch{return null}}function ma(t,e){try{if(typeof localStorage>"u")return;localStorage.setItem(t,e)}catch{}}function ga(t){try{if(typeof localStorage>"u")return;localStorage.removeItem(t)}catch{}}function Ne(){const t=fa(Ue);if(t&&t.trim())return t.trim();try{const e=si&&void 0;e&&String(e).trim()}catch{}return""}function di(t){const e=String(t||"").trim();return e?ma(Ue,e):ga(Ue),re=null,Ne()}function bt(){return!!Ne()}function Ea(){return fa(ze)==="1"}function ie(t){t?ma(ze,"1"):ga(ze)}function ln(){const t=fa(pa);if(!t)return null;try{const e=JSON.parse(t);return!e||typeof e.access_token!="string"?null:e}catch{return null}}function li(t){const e=Number(t&&t.expires_in)||3600,a={access_token:String(t.access_token),expires_at:Date.now()+e*1e3};return ma(pa,JSON.stringify(a)),a}function Pa(){const t=ln();return!!(t&&t.expires_at-dn>Date.now())}function cn(){ga(pa)}let se=null;function ci(){if(typeof window>"u")return Promise.reject(new Error("no-window"));const t=window.google&&window.google.accounts&&window.google.accounts.oauth2;return t&&typeof t.initTokenClient=="function"?Promise.resolve(t):typeof document>"u"?Promise.reject(new Error("no-document")):se||(se=new Promise((e,a)=>{const i=document.createElement("script");i.src=ri,i.async=!0,i.onload=()=>{const n=window.google&&window.google.accounts&&window.google.accounts.oauth2;n&&typeof n.initTokenClient=="function"?e(n):a(new Error("gis-unavailable"))},i.onerror=()=>a(new Error("gis-load-failed")),document.head.appendChild(i)}),se)}let re=null,La="",vt=null;function ui(){const t=Ne();if(!t)return null;if(re&&La===t)return re;let e=null;try{e=window.google.accounts.oauth2.initTokenClient({client_id:t,scope:oi,callback:a=>{const i=vt;vt=null,i&&(a&&a.access_token?(li(a),i.resolve(a)):i.reject(new Error(a&&a.error||"access_denied")))},error_callback:a=>{const i=vt;vt=null,i&&i.reject(new Error(a&&a.type||"popup-closed"))}})}catch{return null}return!e||typeof e.requestAccessToken!="function"?null:(re=e,La=t,e)}function Ye(t){return ci().then(()=>new Promise((e,a)=>{let i=null;try{i=ui()}catch(n){a(n);return}if(!i){a(new Error(bt()?"gis-unavailable":"no-client-id"));return}if(vt){a(new Error("busy"));return}vt={resolve:e,reject:a};try{i.requestAccessToken({prompt:t||""})}catch(n){vt=null,a(n)}}))}async function Na(){const t=ln();return t&&t.expires_at-dn>Date.now()?t.access_token:(await Ye("")).access_token}async function pi(){if(!bt())throw new Error("no-client-id");try{await Ye("")}catch(t){if(!un(t))throw t;await Ye("consent")}return{ok:!0}}function un(t){const e=String(t&&t.message||t||"");return e.includes("no-client-id")||e.includes("interaction_required")||e.includes("popup_closed")||e.includes("popup-closed")||e.includes("access_denied")||e.includes("login_required")||e.includes("gis-unavailable")}async function ye(t,e){const a=await Na(),i=await fetch(t,{...e,headers:{...e&&e.headers,Authorization:`Bearer ${a}`}});if(i.status===401){cn();const n=await Na();return fetch(t,{...e,headers:{...e&&e.headers,Authorization:`Bearer ${n}`}})}return i}async function pn(){const t=`name='${ot}' and 'appDataFolder' in parents`,e=`${rn}?q=${encodeURIComponent(t)}&spaces=appDataFolder&pageSize=1&fields=files(id,name,modifiedTime)`,a=await ye(e,{method:"GET"});if(!a.ok)throw new Error(`drive-list-${a.status}`);const i=await a.json().catch(()=>({})),n=i&&Array.isArray(i.files)?i.files[0]:null;return n?{id:String(n.id),modified:Date.parse(n.modifiedTime)||0}:null}async function fi(){const t=await pn();if(!t)return{missing:!0,raw:"",modified:0};const e=await ye(`${rn}/${t.id}?alt=media`,{method:"GET"});if(!e.ok)throw new Error(`drive-read-${e.status}`);return{missing:!1,raw:await e.text(),modified:t.modified||Date.now()}}async function mi(t){const e=await pn();if(e){const o=await ye(`${Ca}/${e.id}?uploadType=media`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:String(t)});if(!o.ok)throw new Error(`drive-write-${o.status}`);const l=await o.json().catch(()=>({}));return{ok:!0,id:e.id,modified:Date.parse(l.modifiedTime)||Date.now()}}const a=`secondmind${Date.now().toString(36)}`,i=JSON.stringify({name:ot,parents:["appDataFolder"]}),n=[`--${a}`,"Content-Type: application/json; charset=UTF-8","",i,`--${a}`,"Content-Type: application/json; charset=UTF-8","",String(t),`--${a}--`,""].join(`\r
`),s=await ye(`${Ca}?uploadType=multipart`,{method:"POST",headers:{"Content-Type":`multipart/related; boundary=${a}`},body:n});if(!s.ok)throw new Error(`drive-create-${s.status}`);const r=await s.json().catch(()=>({}));return{ok:!0,id:String(r.id||""),modified:Date.parse(r.modifiedTime)||Date.now()}}const ha=un,fn="daily-report-v2",mn="daily-report-v2-meta",Xt=[{id:"mentally",label:"Mentally"},{id:"psychology",label:"Psychology"},{id:"physically",label:"Physically"},{id:"spiritually",label:"Spiritually"},{id:"socially",label:"Socially"}];Xt.map(t=>t.id);const gn=[{id:"h1",name:"Wake up early",points:10,icon:"sunrise",category:"physically",pin:{mode:"forever"}},{id:"h2",name:"Drink water",points:5,icon:"drop",category:"physically",pin:{mode:"forever"}},{id:"h3",name:"Exercise",points:15,icon:"bolt",category:"physically",pin:{mode:"forever"}},{id:"h4",name:"Read 20 minutes",points:10,icon:"book",category:"mentally",pin:{mode:"forever"}},{id:"h5",name:"No junk food",points:10,icon:"leaf",category:"physically",pin:{mode:"forever"}}],hn={lockTime:"21:00",autoLock:!0,showConscious:!0,habitSort:"default",taskSort:"default",theme:"dark",habitOrder:[],pinnedTaskOrder:[],weekStart:1};function Je(t){const e=Number(t);return Number.isInteger(e)&&e>=0&&e<=6?e:1}const Zt=[{id:"iron",label:"Iron",medal:"🥉",rank:1},{id:"bronze",label:"Bronze",medal:"🥉",rank:2},{id:"silver",label:"Silver",medal:"🥈",rank:3},{id:"gold",label:"Gold",medal:"🥇",rank:4}],bn=[{id:"habit-streak",label:"Habit streak"},{id:"task-streak",label:"Pinned task streak"},{id:"perfect-days",label:"Perfect days (100%)"},{id:"task-list",label:"List of tasks goal"}];function Ia(t){var e;return((e=Zt.find(a=>a.id===t))==null?void 0:e.rank)||0}function ve(t){var e;return((e=Zt.find(a=>a.id===t))==null?void 0:e.medal)||"🏅"}function yn(t){var e;return((e=Zt.find(a=>a.id===t))==null?void 0:e.label)||t||"Badge"}function P(t){const e=Array.isArray(t)?t:String(t||"").split(","),a=[];return e.forEach(i=>{const n=String(i||"").trim().slice(0,20);n&&!a.some(s=>s.toLowerCase()===n.toLowerCase())&&a.push(n),a.length>=10}),a.slice(0,10)}function Re(t,e){const a=[...t];return e==="points"?a.sort((i,n)=>(Number(n.points)||0)-(Number(i.points)||0)):e==="category"?a.sort((i,n)=>ut(N(i.category)).localeCompare(ut(N(n.category)))):e==="tags"&&a.sort((i,n)=>(i.tags&&i.tags[0]||"~~~").localeCompare(n.tags&&n.tags[0]||"~~~")),a}const kt=[{value:1,label:"Mon"},{value:2,label:"Tue"},{value:3,label:"Wed"},{value:4,label:"Thu"},{value:5,label:"Fri"},{value:6,label:"Sat"},{value:0,label:"Sun"}];function _(t=new Date){const e=t.getFullYear(),a=String(t.getMonth()+1).padStart(2,"0"),i=String(t.getDate()).padStart(2,"0");return`${e}-${a}-${i}`}function ba(){return{habits:{},habitRatings:{},habitMissed:{},habitForwarded:{},tasks:[],note:"",locked:!1,lockOverride:null,submittedAt:null,lockedHabits:null,skippedPins:[]}}var z=[],rt={};function gi(t){const e=rt[t.id];return e?{...t,color:e.color||t.color,goals:e.goals!==void 0?e.goals:t.goals}:t}function dt(){return[...Xt.map(gi),...z]}function N(t){return dt().map(a=>a.id).includes(t)?t:"mentally"}function ut(t){var e;return((e=dt().find(a=>a.id===t))==null?void 0:e.label)||"Mentally"}const de=7e5;function Y(t){const e=String(t||"");return e.startsWith("data:image/")?e.length>de?"":e:""}function Ma(t){const e=Math.max(0,Math.min(5,Number(t.rating)||0)),a=n=>/^\d{4}-\d{2}-\d{2}$/.test(String(n||""))?String(n):"",i=n=>Array.isArray(n)?n.filter(s=>/^\d{4}-\d{2}-\d{2}$/.test(String(s))).map(String).slice(0,50):[];return{...t,description:t.description||"",category:N(t.category),tags:P(t.tags),rating:e,done:!!t.done,missed:!!t.missed,forwardedFrom:a(t.forwardedFrom),forwardedHabitId:String(t.forwardedHabitId||""),forwardedTo:i(t.forwardedTo),image:Y(t.image)}}function Q(t){const e=Number(t);return!Number.isFinite(e)||e<0?0:Math.min(100,Math.round(e))}function Kt(t){const e=String(t??"").slice(0,10);return/^\d{4}-\d{2}-\d{2}$/.test(e)?e:""}function te(t,e){const a=Kt(t&&t.startFrom);return a?String(e)>=a:!0}function ya(t,e){return{id:String(t.id||""),name:String(t.name||"").slice(0,80),description:String(t.description||"").slice(0,2e3),points:Number(t.points)||0,icon:t.icon||"star",category:N(t.category),consciousPoints:Q(t.consciousPoints),tags:P(t.tags),pin:q(t.pin),startFrom:Kt(t.startFrom),archivedAt:e||t.archivedAt||null}}function vn(t,e,a){const i=/^\d{4}-\d{2}-\d{2}$/.test(String(a||""))?String(a):"",n=/^\d{4}-\d{2}-\d{2}$/.test(String(t&&t.forwardedFrom||""))?String(t.forwardedFrom):i;return{id:String(t.id||""),title:String(t.title||"Task").slice(0,120),points:Number(t.points)||0,description:String(t.description||"").slice(0,500),category:N(t.category),tags:P(t.tags),image:Y(t.image),fromDate:i,originDate:n,archivedAt:e||t.archivedAt||null,sourcePinId:String(t.sourcePinId||"")}}function hi(t){return Array.isArray(t)?t.filter(e=>e&&typeof e=="object"&&e.id).map(e=>vn(e,e.archivedAt||null,e.fromDate)).filter(e=>e.id.length<=80).slice(0,500):[]}function q(t){if(!t||!t.mode)return null;const e=(n,s,r)=>Array.isArray(n)?n.map(Number).filter(o=>Number.isFinite(o)&&o>=s&&o<=r):[],a=n=>Array.isArray(n)?n.filter(s=>/^\d{4}-\d{2}-\d{2}$/.test(String(s))).map(String).slice(0,365):[],i=n=>Array.isArray(n)?n.filter(s=>/^\d{2}-\d{2}$/.test(String(s))).map(String).slice(0,366):[];return{mode:["forever","until","weekly","monthly","yearly","custom"].includes(t.mode)?t.mode:"forever",until:t.until||"",weekdays:e(t.weekdays,0,6),monthDays:e(t.monthDays,1,31),yearDays:i(t.yearDays),customDates:a(t.customDates),exceptDates:a(t.exceptDates||t.exceptions)}}function bi(t,e){const a=`${t} ${e}`.toLowerCase();return a.includes("read")||a.includes("study")||a.includes("learn")?"mentally":a.includes("meditat")||a.includes("pray")||a.includes("journal")?"spiritually":a.includes("mood")||a.includes("calm")||a.includes("therapy")?"psychology":a.includes("friend")||a.includes("family")||a.includes("social")||a.includes("call")||a.includes("visit")?"socially":"physically"}function yi(t){if(!Array.isArray(t))return[];const e=[];return t.forEach(a=>{if(!a||typeof a!="object")return;const i=String(a.title||a.text||"").trim().slice(0,120);i&&e.push({id:String(a.id||et("gt")),title:i,done:!!a.done,doneAt:a.doneAt||null,checked:Array.isArray(a.checked)?[...new Set(a.checked.map(String).filter(n=>n.length<=24))].slice(0,64):[]})}),e.slice(0,100)}function Ve(t){const e=bn.some(n=>n.id===t.kind)?t.kind:"habit-streak",a=e==="task-list",i=a?yi(t.tasks):[];return{id:String(t.id||`g${Date.now()}`),title:String(t.title||"").trim().slice(0,60)||"My goal",kind:e,targetId:String(t.targetId||""),targetDays:Math.max(1,Math.min(365,Number(t.targetDays)||7)),tier:Zt.some(n=>n.id===t.tier)?t.tier:"bronze",rewardTitle:String(t.rewardTitle||"").trim().slice(0,60)||"Reward",createdAt:t.createdAt||new Date().toISOString(),tasks:i,locked:a?!!t.locked:!1,terminated:a?!!t.terminated:!1}}function vi(t){if(!Array.isArray(t))return[];const e=new Set(Xt.map(i=>i.id)),a=[];return t.forEach(i=>{if(!i||typeof i!="object")return;const n=String(i.id||"").trim().slice(0,40),s=String(i.label||"").trim().slice(0,30);!n||!s||e.has(n.toLowerCase())||(e.add(n.toLowerCase()),a.push({id:n,label:s,color:String(i.color||"").slice(0,20),goals:String(i.goals||"").slice(0,1e3)}))}),a.slice(0,20)}function ki(t){const e=t&&typeof t=="object"?t:{},a={};return Xt.forEach(i=>{const n=e[i.id];if(!n||typeof n!="object")return;const s=String(n.color||"").trim().slice(0,20),r=n.goals===void 0?void 0:String(n.goals||"").slice(0,1e3);!s&&r===void 0||(a[i.id]={},s&&(a[i.id].color=s),r!==void 0&&(a[i.id].goals=r))}),a}const Qe={name:80,wantToBe:1e3,vision:1e3,values:1e3,ideas:4e3},Xe=["short","medium","long"],qt={short:["1 Week","2 Weeks","3 Weeks","4 Weeks"],medium:["1 Month","2 Months","3 Months"],long:["1 Year","2 Years","3 Years","5 Years","10+ Years"]};function J(t){return`${t||"id"}${Date.now().toString(36)}${Math.floor(Math.random()*9999)}`}function $i(t){return Array.isArray(t)?t.map(e=>{if(typeof e=="string")return{id:J("w"),text:e.trim().slice(0,120)};if(!e||typeof e!="object")return null;const a=String(e.text||e.label||e.name||"").trim().slice(0,120);return a?{id:String(e.id||J("w")),text:a}:null}).filter(Boolean).slice(0,50):[]}function wi(t){return typeof t=="string"?t.split(`
`).map(e=>e.trim().replace(/^[-•*]\s+/,"")).filter(Boolean).slice(0,20).map(e=>({id:J("a"),title:e.slice(0,60),description:""})):Array.isArray(t)?t.map(e=>{if(typeof e=="string"){const i=e.trim().slice(0,60);return i?{id:J("a"),title:i,description:""}:null}if(!e||typeof e!="object")return null;const a=String(e.title||e.name||"").trim().slice(0,60);return a?{id:String(e.id||J("a")),title:a,description:String(e.description||"").slice(0,1e3)}:null}).filter(Boolean).slice(0,20):[]}function Si(t){return Array.isArray(t)?t.map(e=>{if(typeof e=="string"){const r=e.trim().slice(0,200);return r?{id:J("g"),text:r,term:"short",duration:"1 Week",createdAt:new Date().toISOString()}:null}if(!e||typeof e!="object")return null;const a=String(e.text||e.title||"").trim().slice(0,200);if(!a)return null;const i=Xe.includes(e.term)?e.term:"short",n=qt[i],s=n.includes(e.duration)?e.duration:n[0];return{id:String(e.id||J("g")),text:a,term:i,duration:s,createdAt:e.createdAt||new Date().toISOString()}}).filter(Boolean).slice(0,100):[]}function Ai(t){return Array.isArray(t)?t.map(e=>{if(typeof e=="string"){const i=e.trim().slice(0,500);return i?{id:J("q"),text:i,author:"",fav:!1,createdAt:new Date().toISOString()}:null}if(!e||typeof e!="object")return null;const a=String(e.text||e.quote||"").trim().slice(0,500);return a?{id:String(e.id||J("q")),text:a,author:String(e.author||"").trim().slice(0,80),fav:!!(e.fav||e.favorite),createdAt:e.createdAt||new Date().toISOString()}:null}).filter(Boolean).slice(0,200):[]}function Ut(t){const e=t&&typeof t=="object"?t:{},a={};Object.entries(Qe).forEach(([n,s])=>{n==="wantToBe"&&!e.wantToBe&&e.about?a[n]=String(e.about||"").slice(0,s):a[n]=String(e[n]||"").slice(0,s)}),a.locked=!!e.locked,a.whoAmI=$i(e.whoAmI||e.whoIAm||[]),a.lifeAreas=wi(Array.isArray(e.lifeAreas)||typeof e.lifeAreas=="string"?e.lifeAreas:[]);let i=Si(e.pGoals||e.goalsList||e.profileGoals||[]);return i.length||[["goalsShort","short","1 Week"],["goalsMid","medium","1 Month"],["goalsLong","long","1 Year"]].forEach(([s,r,o])=>{const l=String(e[s]||"");l.trim()&&l.split(`
`).map(c=>c.trim().replace(/^[-•*]\s+/,"")).filter(Boolean).forEach(c=>{i.length>=100||i.push({id:J("g"),text:c.slice(0,200),term:r,duration:o,createdAt:new Date().toISOString()})})}),a.pGoals=i,a.quotes=Ai(e.quotes||e.favQuotes||[]),a}function xi(t,e){const a=String(t&&t.installedAt||"");if(/^\d{4}-\d{2}-\d{2}/.test(a))return a;const i=Object.keys(e||{}).sort();return i.length?`${i[0]}T00:00:00.000`:new Date().toISOString()}function Ti(t,e){if(!t)return!1;if(Me(t,e)>0)return!0;const a=t.habitForwarded&&t.habitForwarded[e];return Array.isArray(a)&&a.length>0?!0:Array.isArray(t.tasks)&&t.tasks.some(i=>String(i&&i.forwardedHabitId||"")===String(e))}function Di(t,e){return!t||!Array.isArray(t.lockedHabits)?!1:t.lockedHabits.some(a=>String(a&&a.id||"")===String(e))}function Ci(t,e,a){const i=String(t||"");for(const n of e){const s=a[n];if(Ti(s,i)||Di(s,i))return n}return""}function Ei(t,e){const a=Object.keys(e).sort(),i=a[0]||"";return t.map(n=>{const s=Kt(n&&n.startFrom);return s?{...n,startFrom:s}:{...n,startFrom:Ci(n&&n.id,a,e)||i}})}function Pi(t,e){const a=Object.keys(e).sort(),i=a[0]||"",n={};return a.forEach(s=>{const r=e[s]&&e[s].tasks;Array.isArray(r)&&r.forEach(o=>{const l=String(o&&o.sourcePinId||"");!l||n[l]||(n[l]=s)})}),t.map(s=>{const r=Kt(s&&s.startFrom);if(r)return{...s,startFrom:r};const o=String(s&&s.id||"");return{...s,startFrom:n[o]||i}})}function kn(t){const e=new Set,a=new Set,i=new Set;return t.filter(n=>{if(!n||typeof n!="object")return!1;const s=String(n.id||"");if(s&&e.has(s))return!1;s&&e.add(s);const r=String(n.sourcePinId||"");if(r){if(a.has(r))return!1;a.add(r)}const o=`${String(n.title||"").trim().toLowerCase()}|${Number(n.points)||0}|${String(n.category||"")}`;return i.has(o)?!1:(i.add(o),!0)})}function Ie(t){z=vi(t.customCategories||[]),rt=ki(t.categoryOverrides);const e={};Object.entries(t.days||{}).forEach(([o,l])=>{e[o]={...ba(),habits:l.habits||{},habitRatings:l.habitRatings||{},habitMissed:l.habitMissed||{},habitForwarded:l.habitForwarded&&typeof l.habitForwarded=="object"?l.habitForwarded:{},tasks:kn(Array.isArray(l.tasks)?l.tasks.map(Ma):[]),note:l.note||"",locked:!!l.locked,lockOverride:l.lockOverride||(l.locked?"locked":null),submittedAt:l.submittedAt||null,lockedHabits:Array.isArray(l.lockedHabits)?l.lockedHabits:null,skippedPins:Array.isArray(l.skippedPins)?l.skippedPins.map(String).filter(c=>c.length<=60).slice(0,100):[]}});const a=Ei(Array.isArray(t.habits)&&t.habits.length?t.habits:gn,e).map(o=>({...o,description:String(o.description||"").slice(0,2e3),category:N(o.category||bi(o.id,o.name)),consciousPoints:Q(o.consciousPoints),tags:P(o.tags),pin:q(o.pin)})),i=(Array.isArray(t.archivedHabits)?t.archivedHabits:[]).filter(o=>o&&typeof o=="object"&&o.id).map(o=>ya(o,o.archivedAt||null)).filter(o=>o.id.length<=60).slice(0,500),n=Pi(Array.isArray(t.pinnedTasks)?t.pinnedTasks.map(o=>({...Ma(o),pin:q(o.pin)})):[],e),s=new Map(n.map(o=>[String(o.id),o])),r=new Map;return Object.entries(e).sort(([o],[l])=>o.localeCompare(l)).forEach(([o,l])=>{l.tasks.forEach(c=>{const f=q(c.pin);if(!f)return;const b=String(c.sourcePinId||""),p=b?s.get(b):null;if(p){p.pin||(p.pin=f);return}const k=[String(c.title||"").trim().toLowerCase(),Number(c.points)||0,String(c.category||""),String(c.description||""),JSON.stringify(P(c.tags)),Y(c.image),JSON.stringify(f)].join("|"),A=r.get(b||k);if(A){c.sourcePinId=A.id;return}const S=b||`legacy-pin-${String(c.id||"task").slice(0,48)}`,y={id:S,title:String(c.title||"Task").slice(0,120),points:Number(c.points)||0,description:String(c.description||"").slice(0,500),category:N(c.category),tags:P(c.tags),pin:f,startFrom:o,image:Y(c.image)};n.push(y),s.set(S,y),r.set(b||k,y),c.sourcePinId=S})}),{habits:a,archivedHabits:i,archivedTasks:hi(t.archivedTasks),customCategories:z,categoryOverrides:rt,installedAt:xi(t,e),profile:Ut(t.profile),pinnedTasks:n,days:e,goals:Array.isArray(t.goals)?t.goals.map(Ve):[],badges:Array.isArray(t.badges)?t.badges.filter(o=>o&&o.id&&o.goalId).map(o=>({id:String(o.id),goalId:String(o.goalId),title:String(o.title||""),tier:o.tier||"bronze",rewardTitle:String(o.rewardTitle||""),earnedAt:o.earnedAt||new Date().toISOString()})):[],settings:{lockTime:t.settings&&t.settings.lockTime||hn.lockTime,autoLock:!t.settings||t.settings.autoLock!==!1,showConscious:!t.settings||t.settings.showConscious!==!1,habitSort:["default","points","category","tags","custom"].includes(t.settings&&t.settings.habitSort)?t.settings.habitSort:"default",taskSort:["default","points","category","tags","custom"].includes(t.settings&&t.settings.taskSort)?t.settings.taskSort:"default",theme:["light","dark"].includes(t.settings&&t.settings.theme)?t.settings.theme:"dark",weekStart:Je(t.settings&&t.settings.weekStart),habitOrder:Array.isArray(t.settings&&t.settings.habitOrder)?t.settings.habitOrder.map(String).filter(Boolean).slice(0,300):[],pinnedTaskOrder:Array.isArray(t.settings&&t.settings.pinnedTaskOrder)?t.settings.pinnedTaskOrder.map(String).filter(Boolean).slice(0,300):[]}}}function Ha(){const t=_();return{habits:gn.map(e=>({...e,description:"",tags:[],startFrom:t})),archivedHabits:[],archivedTasks:[],customCategories:[],categoryOverrides:{},installedAt:new Date().toISOString(),profile:Ut({}),pinnedTasks:[],days:{},goals:[],badges:[],settings:{...hn}}}function Li(){try{const t=localStorage.getItem(fn)||localStorage.getItem("daily-report-v1");return t?Ie(JSON.parse(t)):Ha()}catch{return Ha()}}let u=Li();z=u.customCategories||[];u.customCategories=z;rt=u.categoryOverrides||{};u.categoryOverrides=rt;function le(){u.goals.forEach(t=>{t.kind!=="task-list"||!Array.isArray(t.tasks)||t.tasks.forEach(e=>{if(!e||!e.done||Array.isArray(e.checked)&&e.checked.length)return;const a=An(e);a&&(e.checked=a.slots.map(i=>i.key))})})}le();let I=null,E="boot",Ht=Ni(),va=0,nt=!1,ka=0,Yt=!1,X=!1,D="off",tt="",$n=0,wn=0,W=null,ce=0,Fa=Promise.resolve(),ue=0,Jt=0,$t=null,pe=0,Ra=Promise.resolve();function Ni(){try{const t=JSON.parse(localStorage.getItem(mn)||"null"),e=t&&Number(t.savedAt);return Number.isFinite(e)&&e>0?e:0}catch{return 0}}function $a(t){u=t,z=u.customCategories||[],u.customCategories=z,rt=u.categoryOverrides||{},u.categoryOverrides=rt}function wt(){return!!I&&E==="granted"}function Ii(){if(!wt()&&!nt)return;const t=Date.now();pe||(pe=t);const e=t-pe,a=e>=3e3?0:Math.max(400,Math.min(900,900-e));$t&&clearTimeout($t),$t=setTimeout(()=>{$t=null,ke().catch(()=>{})},a)}function ke(){$t&&(clearTimeout($t),$t=null),pe=0;const t=wt(),e=nt;if(!t&&!e||!Yt)return Promise.resolve(!1);const a=Jt;let i="";try{i=JSON.stringify(u)}catch{return Promise.resolve(!1)}const n=I,s=Ra.then(async()=>{let r=!0;if(t)try{const o=await ca(n,ot,i);o.ok?va=Date.now():(r=!1,o.denied&&(E="prompt"))}catch{r=!1}return e&&((await ni(ot,i)).ok?ka=Date.now():r=!1),r&&Jt===a&&(Yt=!1),r});return Ra=s.then(()=>{},()=>{}),s}function Mi(){return Math.max(Ht,va,ka)}function Ze(t){if(!X)return;if(typeof t=="number"){W&&clearTimeout(W),W=setTimeout(()=>{W=null,Lt().catch(()=>{})},Math.max(0,t));return}const e=Date.now();ce||(ce=e);const a=e-ce,i=a>=15e3?0:Math.max(1500,Math.min(6e3,6e3-a));W&&clearTimeout(W),W=setTimeout(()=>{W=null,Lt().catch(()=>{})},i)}function Lt(){if(!X)return Promise.resolve(!1);W&&(clearTimeout(W),W=null),ce=0;let t="";try{t=JSON.stringify(u)}catch{return Promise.resolve(!1)}const e=Jt,a=Fa.then(async()=>{D="syncing";try{const i=await mi(t);return $n=Date.now(),D="ok",tt="",ue=0,Jt!==e&&Ze(),!!(i&&i.ok)}catch(i){return tt=String(i&&i.message||i),ha(i)?(X=!1,D="needs-signin"):(D="error",ue+=1,Ze(Math.min(6e4,5e3*ue))),!1}});return Fa=a.then(()=>{},()=>{}),a}async function Oe(){if(!X)return{status:D};D="syncing";try{const t=await fi();if(wn=Date.now(),t.missing)return D="ok",tt="",{status:"ok",seeded:!0,pushed:await Lt()};D="ok",tt="";const e=Mi();if(e&&t.modified<=e+2e3)return{status:"ok",pushed:!0,uploaded:await Lt()};let a=null;try{a=JSON.parse(t.raw)}catch{a=null}if(!a||d.backupKind(a)!=="ok")return{status:"ok",corrupt:!0,uploaded:await Lt()};const i=a.data&&typeof a.data=="object"&&!Array.isArray(a.data)?a.data:a;return $a(Ie(i)),w(),{status:"ok",replaced:!0}}catch(t){return tt=String(t&&t.message||t),ha(t)?(X=!1,D="needs-signin"):D="error",{status:D,error:tt}}}async function Tt(){const t=wt();if(!t&&!nt)return{status:E};const e=[];let a=!1;if(t){const s=await Zn(I);if(s.error)return{status:"granted",error:s.error};if(!s.missing){let r=null;try{r=JSON.parse(s.raw)}catch{r=null}!r||d.backupKind(r)!=="ok"?(await Kn(I,s.raw),a=!0):e.push({raw:s.raw,parsed:r,modified:Number(s.modified)||0})}}if(nt){const s=await ii(ot);if(!s.missing&&!s.error&&s.raw){let r=null;try{r=JSON.parse(s.raw)}catch{r=null}r&&d.backupKind(r)==="ok"&&e.push({raw:s.raw,parsed:r,modified:Number(s.modified)||0})}}const i=t?"granted":E;if(!e.length)return Yt=!0,await ke(),{status:i,seeded:!0,corrupt:a};e.sort((s,r)=>s.modified-r.modified);const n=e[e.length-1];if(!Ht||n.modified>Ht+2e3){const s=n.parsed.data&&typeof n.parsed.data=="object"&&!Array.isArray(n.parsed.data)?n.parsed.data:n.parsed;return $a(Ie(s)),w(),{status:i,replaced:!0,corrupt:a}}return Yt=!0,await ke(),{status:i,pushed:!0,corrupt:a}}let Sn=0,je={key:null,value:null},Ke=0;function wa(){return Ke>0}function pt(t){Ke+=1;try{return t()}finally{Ke-=1}}function w(){Sn+=1,Jt+=1,Yt=!0;try{localStorage.setItem(fn,JSON.stringify(u)),Ht=Date.now(),localStorage.setItem(mn,JSON.stringify({savedAt:Ht}))}catch{}Ii(),Ze()}let Oa=0;function et(t){return Oa+=1,`${t||"id"}${Date.now().toString(36)}${Oa.toString(36)}${Math.floor(Math.random()*1296).toString(36)}`}function Hi(t){return new Date(`${t}T00:00:00`).getDay()}function $e(t){const e=new Date(`${t}T00:00:00`);return e.setDate(e.getDate()+1),_(e)}function Gt(t){const e=new Date(`${t}T00:00:00`);return e.setDate(e.getDate()-1),_(e)}function ee(t,e){if(!t)return!0;if(Array.isArray(t.exceptDates)&&t.exceptDates.includes(e)||Array.isArray(t.exceptions)&&t.exceptions.includes(e))return!1;if((Array.isArray(t.customDates)?t.customDates:[]).includes(e)||t.mode==="forever")return!0;if(t.mode==="until")return!!t.until&&e<=t.until;if(t.mode==="weekly")return Array.isArray(t.weekdays)&&t.weekdays.includes(Hi(e));if(t.mode==="monthly"){const i=Array.isArray(t.monthDays)?t.monthDays.map(Number):[];return i.length?i.includes(Number(String(e).slice(8,10))):!0}if(t.mode==="yearly"){const i=Array.isArray(t.yearDays)?t.yearDays:[];return i.length?i.includes(String(e).slice(5,10)):!0}return t.mode!=="custom"}function Nt(t){if(!t)return"Not pinned";const e=(t.exceptDates||t.exceptions||[]).length,a=e?` · ⛔ ${e} exception${e>1?"s":""}`:"",i=t.mode==="custom"?0:Array.isArray(t.customDates)?t.customDates.length:0,n=i?` +${i} custom`:"";if(t.mode==="forever")return`Pinned forever${n}${a}`;if(t.mode==="until")return`${t.until?`Pinned until ${t.until}`:"Pinned until a date"}${n}${a}`;if(t.mode==="weekly"){const s=Array.isArray(t.weekdays)?t.weekdays:[],r=kt.filter(o=>s.includes(o.value)).map(o=>o.label);return`${r.length?`Weekly: ${r.join(", ")}`:"Weekly (no days)"}${n}${a}`}if(t.mode==="monthly"){const s=Array.isArray(t.monthDays)?t.monthDays:[];return`${s.length?`Monthly: day${s.length>1?"s":""} ${[...s].sort((r,o)=>r-o).join(", ")}`:"Monthly"}${n}${a}`}if(t.mode==="yearly"){const s=Array.isArray(t.yearDays)?t.yearDays:[];return`${s.length?`Yearly: ${[...s].sort().join(", ")}`:"Yearly"}${n}${a}`}if(t.mode==="custom"){const s=Array.isArray(t.customDates)?t.customDates:[];return`${s.length?`Custom: ${s.length} date${s.length>1?"s":""}`:"Custom dates"}${a}`}return"Pinned"}function Fi(t){if(!t)return[];const e=[],a=(n,s)=>{e.some(r=>r.key===n)||e.push({key:n,label:s})},i=n=>(kt.find(s=>s.value===n)||{label:`Day ${n}`}).label;return t.mode==="forever"?a("daily","Every day"):t.mode==="until"?a("daily",t.until?`Daily until ${t.until}`:"Daily"):t.mode==="weekly"?[...t.weekdays||[]].sort((n,s)=>(n+6)%7-(s+6)%7).forEach(n=>a(`w${n}`,i(n))):t.mode==="monthly"?[...t.monthDays||[]].sort((n,s)=>n-s).forEach(n=>a(`m${n}`,`Day ${n}`)):t.mode==="yearly"&&[...t.yearDays||[]].sort().forEach(n=>a(`y${n}`,n)),(t.customDates||[]).forEach(n=>a(`d${n}`,String(n).slice(5))),e}function An(t){if(!t||typeof t!="object")return null;const e=String(t.title||"").trim().toLowerCase();if(!e)return null;const a=u.pinnedTasks.find(n=>String(n&&n.title||"").trim().toLowerCase()===e);if(!a)return null;const i=Fi(a.pin);return i.length?{pin:a.pin,title:a.title,slots:i}:null}function ta(t){const[e,a]=(u.settings.lockTime||"21:00").split(":").map(Number),i=new Date(`${t}T00:00:00`);return i.setHours(e||0,a||0,0,0),i}function we(t){const e=u.days[t];return e?e.lockOverride==="locked"||e.locked===!0:!1}function Me(t,e){return t?t.habitRatings&&t.habitRatings[e]!=null?Number(t.habitRatings[e])||0:t.habits&&t.habits[e]?5:0:0}function ea(t,e){return Me(u.days[t],e)}function Ri(t,e){if(!t)return!1;if(Me(t,e)>0||t.habitMissed&&t.habitMissed[e])return!0;const i=t.habitForwarded&&t.habitForwarded[e];return Array.isArray(i)&&i.length>0?!0:Array.isArray(t.tasks)&&t.tasks.some(n=>String(n&&n.forwardedHabitId||"")===String(e))}function xn(t){if(!t)return[...u.habits];const e=u.habits.filter(i=>te(i,t)&&ee(i.pin,t)),a=u.days[t];if(a){const i=new Set(e.map(s=>s.id)),n=s=>{!s||i.has(s.id)||Ri(a,s.id)&&(i.add(s.id),e.push(s))};u.habits.forEach(n),we(t)&&u.archivedHabits&&u.archivedHabits.length&&u.archivedHabits.forEach(n)}return e}function oe(t,e){if(!Array.isArray(e)||!e.length)return t;const a=new Map(e.map((i,n)=>[String(i),n]));return t.some(i=>a.has(String(i&&i.id)))?t.map((i,n)=>({item:i,i:n})).sort((i,n)=>{const s=a.has(String(i.item&&i.item.id))?a.get(String(i.item.id)):Number.MAX_SAFE_INTEGER,r=a.has(String(n.item&&n.item.id))?a.get(String(n.item.id)):Number.MAX_SAFE_INTEGER;return s===r?i.i-n.i:s-r}).map(i=>i.item):t}function Oi(t){const e=u.habits.find(a=>a.id===t);return e||(u.archivedHabits||[]).find(a=>a.id===t)||null}function ji(t){u.archivedHabits||(u.archivedHabits=[]),!u.archivedHabits.some(e=>e.id===t.id)&&(u.archivedHabits.push(ya(t,new Date().toISOString())),u.archivedHabits.length>500&&u.archivedHabits.splice(0,u.archivedHabits.length-500))}function aa(t){const e=M(t),a=xn(t);e.lockedHabits=a.map(i=>ya(i)),e.habitMissed={},a.forEach(i=>{ea(t,i.id)<=0&&(e.habitMissed[i.id]=!0)}),e.tasks.forEach(i=>{i.missed=!i.done})}function gt(t){const e=u.days[t];return!e||e.lockOverride==="unlocked"?!1:e.lockOverride==="locked"||e.locked===!0?!0:u.settings.autoLock?Date.now()>=ta(t).getTime():!1}function ja(t){if(wa())return gt(t);const e=M(t);return e.lockOverride==="unlocked"?!1:e.lockOverride==="locked"||e.locked?((!Array.isArray(e.lockedHabits)||!e.habitMissed)&&aa(t),!0):u.settings.autoLock&&Date.now()>=ta(t).getTime()?(e.locked=!0,e.lockOverride="locked",e.submittedAt=e.submittedAt||ta(t).toISOString(),aa(t),w(),!0):!1}function M(t){if(!u.days[t]){const e=ba();if(wa())return e;u.days[t]=e}return u.days[t]}function Be(t){const e=String(t);Object.values(u.days).forEach(a=>{!Array.isArray(a.skippedPins)||!a.skippedPins.includes(e)||(a.skippedPins=a.skippedPins.filter(i=>i!==e))})}function Ba(t){const e=M(t);if(we(t)||wa())return e;let a=!1;const i=new Set(Array.isArray(e.skippedPins)?e.skippedPins.map(String):[]);if(e.tasks.length>1){const n=kn(e.tasks);n.length!==e.tasks.length&&(e.tasks=n,a=!0)}return u.pinnedTasks.forEach(n=>{te(n,t)&&ee(n.pin,t)&&(i.has(String(n.id))||e.tasks.some(s=>s.sourcePinId===n.id)||(e.tasks.push({id:`ptask-${n.id}-${t}`,title:n.title,points:n.points,description:n.description||"",category:N(n.category),tags:P(n.tags),rating:0,done:!1,missed:!1,sourcePinId:n.id,image:Y(n.image)}),a=!0))}),a&&w(),e}function Tn(t){return!(!t||t.pin&&t.pin.mode==="forever")}function Bi(t,e){let a=$e(e),i=0;for(;i<800;){if(i+=1,te(t,a)&&ee(t.pin,a))return a;a=$e(a)}return""}function Se(t,e,a=[],i=[]){if(!t||!/^\d{4}-\d{2}-\d{2}$/.test(String(e||"")))return{allowed:!1,next:"",days:[]};let n=t;if(a.length||i.length){const c=a.map(String),f=i.map(String),b=q(t.pin);b.exceptDates=(b.exceptDates||[]).filter(p=>!c.includes(p)),b.customDates=(b.customDates||[]).filter(p=>!f.includes(p)),n={...t,pin:b}}if(!Tn(n))return{allowed:!1,next:"",days:[]};if(!te(n,e)||!ee(n.pin,e))return{allowed:!1,next:"",days:[]};const s=Bi(n,e);if(!s)return{allowed:!1,next:"",days:[]};const r=[];let o=$e(e),l=0;for(;o<s&&l<400;)l+=1,r.push(o),o=$e(o);return r.length?{allowed:!0,next:s,days:r}:{allowed:!1,next:s,days:[]}}function Gi(t,e){const a=t.pin||{},i=Array.isArray(a.exceptDates)?a.exceptDates:[];return i.includes(e)&&(Array.isArray(a.customDates)?a.customDates:[]).filter(s=>s>e).filter(s=>!i.includes(s)).sort().find(s=>Se(t,e,[e],[s]).days.includes(s))||""}function _i(t,e){const a=t.pin||{};if(!(Array.isArray(a.customDates)?a.customDates:[]).includes(e))return"";const n=Array.isArray(a.exceptDates)?a.exceptDates:[];let s="";return n.forEach(r=>{r>=e||Se(t,r,[r],[e]).days.includes(e)&&(!s||r>s)&&(s=r)}),s}function V(t){return!d.isLocked(t)}function Ga(t){const e=dt().find(a=>a.label.toLowerCase()===String(t||"").trim().toLowerCase());return e?e.id:"mentally"}function _a(t){return!t||typeof t!="object"||Array.isArray(t)?[]:Array.isArray(t.days)?t.days.filter(e=>e&&/^\d{4}-\d{2}-\d{2}$/.test(String(e.date||""))):[]}const d={todayKey:_,exportBackup(){return JSON.stringify({app:"Second Mind",kind:"full-backup",version:1,exportedAt:new Date().toISOString(),data:u},null,2)},backupKind(t){if(!t||typeof t!="object"||Array.isArray(t))return"invalid";const e=t.data&&typeof t.data=="object"&&!Array.isArray(t.data)?t.data:t;return Array.isArray(e.days)?"report-export":Array.isArray(e.categories)||Array.isArray(e.plans)||Array.isArray(e.schedule)?"wrong-app":typeof e!="object"||e===null||e.habits!==void 0&&!Array.isArray(e.habits)||e.days!==void 0&&(typeof e.days!="object"||e.days===null||Array.isArray(e.days))||e.settings!==void 0&&(typeof e.settings!="object"||e.settings===null||Array.isArray(e.settings))||!["habits","pinnedTasks","days","goals","badges","settings"].some(i=>e[i]!==void 0)?"invalid":"ok"},importBackup(t){if(this.backupKind(t)!=="ok")return!1;const e=t.data&&typeof t.data=="object"&&!Array.isArray(t.data)?t.data:t;return $a(Ie(e)),w(),!0},folderStatus(){return E},folderName(){return I&&I.name?String(I.name):""},folderFileName(){return ot},lastFileSavedAt(){return va},lastCacheSavedAt(){return Ht},deviceSaveReady(){return nt},lastDeviceSavedAt(){return ka},autoSaveStatus(){const t=wt(),e=nt;return t&&e?"both":t?"folder":e?"device":"none"},driveStatus(){return D!=="off"?D:bt()?Ea()?"off":Pa()?X?"ok":"ready":"needs-signin":"needs-client"},driveError(){return tt},driveLastPushAt(){return $n},driveLastPullAt(){return wn},driveConfigured(){return bt()},driveClientId(){return Ne()},setDriveClientId(t){const e=di(t);return e&&ie(!1),!e&&X?(X=!1,D="off"):e&&(D==="needs-client"||D==="off")&&(D="needs-signin"),e},async connectDrive(){if(!bt())return D="needs-client",{status:"needs-client"};ie(!1),D="syncing";try{await pi()}catch(e){return tt=String(e&&e.message||e),D=ha(e)?"needs-signin":"error",{status:D,error:tt}}X=!0,tt="",ue=0;const t=await Oe();return{status:D,...t}},disconnectDrive(){return cn(),ie(!0),W&&(clearTimeout(W),W=null),X=!1,D="off",tt="",{status:"off"}},resumeDriveSetup(){return ie(!1),D=bt()?"needs-signin":"needs-client",{status:D}},async initDriveSync(){if(Ea())return D="off",{status:"off"};if(!bt())return D="needs-client",{status:"needs-client"};if(!Pa())return D="needs-signin",{status:"needs-signin"};X=!0;const t=await Oe();return{status:D,...t}},async syncDriveNow(){if(!X){const t=await this.connectDrive();if(t.status!=="ok"&&t.status!=="syncing")return t}return Oe()},flushDriveWrite(){return X?Lt().catch(()=>!1):Promise.resolve(!1)},getFolderHandle(){return I},async initFolderSync(){try{const e=typeof navigator<"u"&&navigator.storage&&navigator.storage.persist?navigator.storage.persist():null;e&&typeof e.catch=="function"&&e.catch(()=>{})}catch{}try{nt=!!await ua()}catch{nt=!1}if(!Bt())return E="unsupported",nt?Tt():{status:"unsupported"};const t=await this.refreshFolder();if(t==="granted")return Tt();if(t==="prompt"||t==="denied"){try{E=await Ta(I)}catch{E="prompt"}if(E==="granted")return Tt()}return nt?Tt():{status:E}},async refreshFolder(){if(!Bt())return E="unsupported",E;if(!I)try{I=await Vn()}catch{I=null}return I?(E=await Un(I),E):(E="unset",E)},async chooseDataFolder(){if(!Bt())return E="unsupported",{status:"unsupported"};let t=null;try{t=await Wn()}catch(a){return a&&a.name==="AbortError"?{status:E,cancelled:!0}:{status:E,error:String(a&&a.message||a)}}if(!t)return{status:E,error:"no-folder"};try{await Qn(t)}catch{}return I=t,E="granted",{...await Tt(),name:String(t.name||"")}},async grantFolderAccess(){if(!Bt())return E="unsupported",{status:"unsupported"};if(!I){const e=await this.refreshFolder();if(e!=="granted")return{status:e}}return E=await Ta(I),E!=="granted"?{status:E}:{...await Tt(),name:this.folderName()}},async forgetDataFolder(){try{await Xn()}catch{}return I=null,E=Bt()?"unset":"unsupported",{status:E}},async writeFolderFile(t,e){if(!wt())return{ok:!1,denied:!1,error:"no-folder"};const a=await ca(I,t,e);return a.denied&&(E="prompt"),a},async readFolderFile(t){return wt()?We(I,t):{missing:!0,raw:"",modified:0,error:"no-folder"}},async listFolderBackups(){return wt()?(await ti(I)).filter(e=>ei(e.name)).sort((e,a)=>a.modified-e.modified).map(e=>({name:e.name,modified:e.modified})):[]},flushFolderWrite(){return ke()},previewReport(t){const e=_a(t);if(!e.length)return{days:0,start:"",end:"",newHabits:0};const a=new Set(u.habits.map(s=>String(s.name||"").trim().toLowerCase())),i=new Set;e.forEach(s=>{(Array.isArray(s.habits)?s.habits:[]).forEach(r=>{const o=String(r&&r.name||"").trim().toLowerCase();o&&!a.has(o)&&i.add(o)})});const n=e.map(s=>String(s.date)).sort();return{days:e.length,start:n[0],end:n[n.length-1],newHabits:i.size}},importReport(t){const e=_a(t);if(!e.length)return!1;const a=e.map(o=>String(o.date)).sort(),i=a[a.length-1],n={};u.habits.forEach(o=>{n[String(o.name||"").trim().toLowerCase()]=o});let s=0;const r=Date.now();return e.forEach((o,l)=>{const c=String(o.date);(Array.isArray(o.habits)?o.habits:[]).forEach(p=>{const k=String(p&&p.name||"").trim().slice(0,80);if(!k)return;const A=k.toLowerCase();if(!n[A]){const S={id:`h${r}_${s}`,name:k,description:String(p&&p.description||"").slice(0,2e3),points:Number(p&&p.points||10)||10,icon:"star",category:Ga(p&&p.category),consciousPoints:Q(p&&p.consciousPoints),tags:P(p&&p.tags),pin:{mode:"until",until:i,weekdays:[],monthDays:[],yearDays:[],customDates:[],exceptDates:[]},startFrom:a[0]};u.habits.push(S),n[A]=S,s+=1}});const f=ba();f.note=String(o.note||""),f.locked=!0,f.lockOverride="locked",f.submittedAt=null;const b=[];(Array.isArray(o.habits)?o.habits:[]).forEach(p=>{const k=n[String(p&&p.name||"").trim().toLowerCase()];if(!k)return;const A=Math.max(0,Math.min(5,Number(p&&p.rating||0)));f.habitRatings[k.id]=A,f.habits[k.id]=A>0,A<=0&&(f.habitMissed[k.id]=!0),k.startFrom&&c<k.startFrom&&(k.startFrom=c),b.push({id:k.id,name:k.name,description:k.description,points:k.points,icon:k.icon||"star",category:N(k.category),consciousPoints:Q(k.consciousPoints),tags:P(k.tags),pin:q(k.pin)})}),f.lockedHabits=b,f.tasks=(Array.isArray(o.tasks)?o.tasks:[]).map((p,k)=>({id:`t${r}_${l}_${k}`,title:String(p&&p.title||"Task").slice(0,120),points:Number(p&&p.points||5)||5,description:String(p&&p.description||""),category:Ga(p&&p.category),tags:P(p&&p.tags),rating:Math.max(0,Math.min(5,Number(p&&p.rating||0))),done:!!(p&&p.done),missed:!(p&&p.done),image:"",forwardedFrom:/^\d{4}-\d{2}-\d{2}$/.test(String(p&&p.forwardedFrom||""))?String(p.forwardedFrom):"",forwardedHabitId:"",forwardedTo:Array.isArray(p&&p.forwardedTo)?p.forwardedTo.filter(A=>/^\d{4}-\d{2}-\d{2}$/.test(String(A))).map(String).slice(0,50):[]})),u.days[c]=f}),w(),{days:e.length,habits:s}},getSettings(){return u.settings},setLockTime(t){u.settings.lockTime=t||"21:00",w()},setAutoLock(t){u.settings.autoLock=!!t,w()},setShowConscious(t){u.settings.showConscious=!!t,w()},consciousEnabled(){return u.settings.showConscious!==!1},setHabitSort(t){u.settings.habitSort=["default","points","category","tags","custom"].includes(t)?t:"default",w()},setTaskSort(t){u.settings.taskSort=["default","points","category","tags","custom"].includes(t)?t:"default",w()},getWeekStart(){return Je(u.settings.weekStart)},setWeekStart(t){u.settings.weekStart=Je(t),w()},getTheme(){return u.settings.theme==="light"?"light":"dark"},setTheme(t){u.settings.theme=t==="light"?"light":"dark",w()},getHabits(t,e){if(t&&we(t)){const s=u.days[t];if(s&&Array.isArray(s.lockedHabits)){const r=e||u.settings.habitSort||"default",o=[...s.lockedHabits];return r==="default"||r==="custom"?oe(o,u.settings.habitOrder):Re(o,r)}}const a=e||u.settings.habitSort||"default",i=xn(t),n=a==="default"||a==="custom"?oe(i,u.settings.habitOrder):Re(i,a);return a==="default"||a==="custom"?n.slice().sort((s,r)=>+!!r.pin-+!!s.pin):n},getTasks(t,e){const a=this.getDay(t),i=e||u.settings.taskSort||"default";return i==="default"||i==="custom"?a.tasks:Re(a.tasks,i)},getAllHabits(){return u.habits},getPinnedHabits(){return oe(u.habits.filter(t=>!!t.pin),u.settings.habitOrder)},setPinnedHabitOrder(t){const e=new Set(u.habits.filter(s=>s.pin).map(s=>String(s.id))),a=(Array.isArray(t)?t:[]).map(String).filter(s=>e.has(s)),i=new Set(a);e.forEach(s=>{i.has(s)||a.push(s)});const n=u.settings.habitOrder.filter(s=>!e.has(s));u.settings.habitOrder=[...a,...n].slice(0,300),w()},getHabitActivity(t,e=30){const a=String(t||"");return a?Object.keys(u.days).sort().reverse().flatMap(i=>{const n=u.days[i],s=n.habitForwarded&&n.habitForwarded[a],r=!!(n.habits&&n.habits[a])||!!(n.habitMissed&&n.habitMissed[a])||[n.habitRatings,n.habitMissed].some(c=>c&&Object.prototype.hasOwnProperty.call(c,a))||Array.isArray(s)&&s.length>0,o=Array.isArray(n.lockedHabits)&&n.lockedHabits.some(c=>String(c.id)===a);if(!r&&!o)return[];const l=Me(n,a);return[{date:i,rating:l,status:l?"Completed":n.habitMissed[a]||o&&gt(i)?"Missed":"Not rated",locked:gt(i)}]}).slice(0,Math.max(1,Math.min(365,Number(e)||30))):[]},getPinnedTasks(){return oe(u.pinnedTasks,u.settings.pinnedTaskOrder)},setPinnedTaskOrder(t){const e=new Set(u.pinnedTasks.map(n=>String(n.id))),a=(Array.isArray(t)?t:[]).map(String).filter(n=>e.has(n)),i=new Set(a);u.pinnedTasks.forEach(n=>{const s=String(n.id);i.has(s)||a.push(s)}),u.settings.pinnedTaskOrder=a.slice(0,300),w()},getDay(t){return ja(t),Ba(t)},isLocked(t){return ja(t)},submitDay(t){const e=M(t);e.locked=!0,e.lockOverride="locked",e.submittedAt=new Date().toISOString(),aa(t),w(),this.checkGoals(t)},unlockDay(t){const e=M(t);e.locked=!1,e.lockOverride="unlocked",e.habitMissed={},e.lockedHabits=null,e.tasks.forEach(a=>{a.missed=!1}),w()},isHabitMissed(t,e){const a=u.days[t];return!a||!(a.locked||a.lockOverride==="locked")||!this.getHabits(t).some(i=>i.id===e)||ea(t,e)>0?!1:(a.habitMissed&&a.habitMissed[e],!0)},isTaskMissed(t,e){const a=u.days[t];if(!a)return!1;const i=(a.tasks||[]).find(n=>n.id===e);return i?i.missed===!0?!0:i.missed===!1?!1:!!(a.locked||a.lockOverride==="locked")&&!i.done:!1},missedCounts(t){return pt(()=>{const e=this.getDay(t),a=this.getHabits(t),i=gt(t);return{habits:a.filter(n=>e.habitMissed&&e.habitMissed[n.id]?!0:i&&ea(t,n.id)<=0).length,tasks:e.tasks.filter(n=>n.done?!1:n.missed===!0?!0:n.missed===!1?!1:i).length}})},lockDay(t){this.submitDay(t)},lockDays(t){let e=0;return t.forEach(a=>{this.isLocked(a)||(this.submitDay(a),e+=1)}),e},unlockDays(t){let e=0;return t.forEach(a=>{this.isLocked(a)&&(this.unlockDay(a),e+=1)}),e},lockedReports(){return pt(()=>Object.keys(u.days).sort().reverse().filter(t=>gt(t)).map(t=>({date:t,submittedAt:u.days[t].submittedAt,...this.scoreFor(t)})))},habitRating(t,e){const a=u.days[t];return a?a.habitRatings&&a.habitRatings[e]!=null?Number(a.habitRatings[e])||0:a.habits&&a.habits[e]?5:0:0},setHabitRating(t,e,a){if(!V(t))return;const i=M(t),n=Math.max(0,Math.min(5,Number(a)||0));i.habitRatings[e]=n,i.habits[e]=n>0,w(),this.checkGoals(t)},toggleHabit(t,e){if(!V(t))return;const a=this.habitRating(t,e)>0?0:5;this.setHabitRating(t,e,a)},addTask(t,e,a,i={}){if(!V(t))return;M(t).tasks.push({id:et("t"),title:e.trim(),points:Number(a)||5,description:String(i.description||"").trim(),category:N(i.category),tags:P(i.tags),rating:Math.max(0,Math.min(5,Number(i.rating)||0)),done:!1,missed:!1,forwardedFrom:/^\d{4}-\d{2}-\d{2}$/.test(String(i.forwardedFrom||""))?String(i.forwardedFrom):"",forwardedHabitId:String(i.forwardedHabitId||""),forwardedTo:[],image:Y(i.image)}),w(),this.checkGoals(t)},setTaskRating(t,e,a){if(!V(t))return;const n=M(t).tasks.find(r=>r.id===e);if(!n)return;const s=Math.max(0,Math.min(5,Number(a)||0));n.rating=s,w()},setTaskOrder(t,e){if(!V(t))return;const a=M(t),i=(Array.isArray(e)?e:[]).map(String).filter(Boolean);if(!i.length)return;const n=new Map(i.map((r,o)=>[r,o])),s=a.tasks.slice().sort((r,o)=>{const l=n.has(r.id)?n.get(r.id):Number.MAX_SAFE_INTEGER,c=n.has(o.id)?n.get(o.id):Number.MAX_SAFE_INTEGER;return l-c});a.tasks=s,w()},setHabitOrder(t){const e=(Array.isArray(t)?t:[]).map(String).filter(Boolean);e.length&&(u.settings.habitOrder=e.slice(0,300),w())},toggleTask(t,e){if(!V(t))return;const i=M(t).tasks.find(n=>n.id===e);i&&(i.done=!i.done,w(),this.checkGoals(t))},removeTask(t,e){if(!V(t))return;const a=M(t),i=a.tasks.find(s=>s.id===e);a.tasks=a.tasks.filter(s=>s.id!==e);const n=i&&i.sourcePinId?String(i.sourcePinId):"";n&&(Array.isArray(a.skippedPins)||(a.skippedPins=[]),a.skippedPins.includes(n)||a.skippedPins.push(n),a.skippedPins.length>100&&a.skippedPins.splice(0,a.skippedPins.length-100)),w()},forwardTask(t,e,a){if(!/^\d{4}-\d{2}-\d{2}$/.test(String(a||"")))return{ok:!1,reason:"Pick a valid date"};if(t===a)return{ok:!1,reason:"Already on that day"};if(!V(t))return{ok:!1,reason:"Source day is locked"};if(this.isLocked(a))return{ok:!1,reason:"Target day is locked"};const n=M(t).tasks.find(l=>l.id===e);if(!n)return{ok:!1,reason:"Task not found"};const s=M(a),r=String(n.title||"").trim().toLowerCase();if(s.tasks.some(l=>String(l.title||"").trim().toLowerCase()===r))return{ok:!1,reason:"That task is already on that day"};s.tasks.push({id:et("t"),title:n.title,points:Number(n.points)||5,description:String(n.description||""),category:N(n.category),tags:P(n.tags),rating:0,done:!1,missed:!1,forwardedFrom:t,forwardedHabitId:String(n.forwardedHabitId||""),forwardedTo:[],image:Y(n.image)});const o=Array.isArray(n.forwardedTo)?n.forwardedTo:[];return o.includes(a)||o.push(a),n.forwardedTo=o.slice(0,50),w(),this.checkGoals(a),{ok:!0}},habitForwardedTo(t,e){const a=u.days[t];if(!a||!a.habitForwarded)return[];const i=a.habitForwarded[e];return Array.isArray(i)?i:[]},habitReplaceDays(t,e){const a=u.habits.find(n=>n.id===e),i=Se(a,t);return{allowed:i.allowed,next:i.next,days:i.days.slice()}},replaceHabit(t,e,a){if(!/^\d{4}-\d{2}-\d{2}$/.test(String(a||"")))return{ok:!1,reason:"Pick a valid date"};if(String(a)===String(t))return{ok:!1,reason:"Already on that day"};const i=u.habits.find(r=>r.id===e);if(!i)return{ok:!1,reason:"Habit not found"};if(!Tn(i))return{ok:!1,reason:"This habit is pinned forever — every day is already its day"};if(!V(t))return{ok:!1,reason:"That day is locked"};if(this.isLocked(a))return{ok:!1,reason:"That day is locked"};const n=Se(i,t);if(!n.allowed)return{ok:!1,reason:"No replace days available for this habit"};if(!n.days.includes(a))return{ok:!1,reason:`Pick a day before ${n.next}`};const s=q(i.pin);return s.exceptDates.includes(t)||(s.exceptDates=[...s.exceptDates,t].sort()),s.customDates.includes(a)||(s.customDates=[...s.customDates,a].sort()),i.pin=s,w(),this.checkGoals(a),{ok:!0,from:t,to:a}},undoReplaceHabit(t,e,a){const i=u.habits.find(s=>s.id===t);if(!i)return{ok:!1,reason:"Habit not found"};const n=q(i.pin);return n.exceptDates=(n.exceptDates||[]).filter(s=>s!==e),n.customDates=(n.customDates||[]).filter(s=>s!==a),i.pin=n,w(),{ok:!0}},habitReplacedTo(t,e){const a=u.habits.find(i=>i.id===e);return a?Gi(a,t):""},habitReplacedFrom(t,e){const a=u.habits.find(i=>i.id===e);return a?_i(a,t):""},setNote(t,e){V(t)&&(M(t).note=e,w())},noteFor(t){const e=u.days[String(t||"")];return e?String(e.note||""):""},notedDays(t){const e=t?`${t}-`:"";return Object.keys(u.days).filter(a=>a.startsWith(e)&&String(u.days[a].note||"").trim()).sort()},addHabit(t,e,a={}){u.habits.push({id:et("h"),name:t.trim(),description:String(a.description||"").trim().slice(0,2e3),points:Number(e)||10,icon:"star",category:N(a.category||"physically"),consciousPoints:Q(a.consciousPoints),tags:P(a.tags),pin:q({mode:"forever"}),startFrom:Kt(a.startFrom)||_()}),w()},updateHabit(t,e){const a=u.habits.find(i=>i.id===t);a&&(e.name!=null&&(a.name=String(e.name).trim()||a.name),e.description!=null&&(a.description=String(e.description).trim().slice(0,2e3)),e.points!=null&&(a.points=Number(e.points)||a.points),e.category!=null&&(a.category=N(e.category)),e.consciousPoints!=null&&(a.consciousPoints=Q(e.consciousPoints)),e.tags!=null&&(a.tags=P(e.tags)),w())},updateTask(t,e,a){if(!V(t))return;const n=M(t).tasks.find(s=>s.id===e);if(n){if(a.title!=null&&(n.title=String(a.title).trim()||n.title),a.points!=null&&(n.points=Number(a.points)||n.points),a.description!=null&&(n.description=String(a.description).trim()),a.category!=null&&(n.category=N(a.category)),a.tags!=null&&(n.tags=P(a.tags)),a.image!==void 0&&(n.image=Y(a.image)),a.rating!=null&&(n.rating=Math.max(0,Math.min(5,Number(a.rating)||0))),n.sourcePinId){const s=u.pinnedTasks.find(r=>r.id===n.sourcePinId);s&&(s.title=n.title,s.points=n.points,s.description=n.description,s.category=n.category,a.tags!=null&&(s.tags=P(a.tags)),a.image!==void 0&&(s.image=Y(a.image)))}w()}},habitStreak(t,e){const a=Oi(t);if(!a)return 0;let i=e,n=0;this.habitRating(i,t)===0&&(i=Gt(i));let s=0;for(;n<400;){if(n+=1,!te(a,i)||!ee(a.pin,i)){i=Gt(i);continue}if(this.habitRating(i,t)>0){s+=1,i=Gt(i);continue}break}return s},categoryBreakdown(t){const e=this.getDay(t),a=this.getHabits(t);return dt().map(i=>{const n=a.filter(S=>N(S.category)===i.id),s=e.tasks.filter(S=>N(S.category)===i.id),r=n.reduce((S,y)=>{const C=this.habitRating(t,y.id);return S+Math.round(y.points*C/5)},0),o=u.settings.showConscious!==!1,l=o?n.reduce((S,y)=>S+(this.habitRating(t,y.id)>0?Q(y.consciousPoints):0),0):0,c=n.reduce((S,y)=>S+y.points,0),f=o?n.reduce((S,y)=>S+Q(y.consciousPoints),0):0,b=s.reduce((S,y)=>S+(y.done?y.points:0),0),p=s.reduce((S,y)=>S+y.points,0),k=n.map(S=>this.habitRating(t,S.id)),A=k.length?Math.round(k.reduce((S,y)=>S+y,0)/k.length*10)/10:0;return{...i,habits:n,tasks:s,earned:r+l+b,max:c+f+p,habitAvg:A,consciousEarned:l,consciousMax:f,completed:n.filter(S=>this.habitRating(t,S.id)>0).length+s.filter(S=>S.done).length,total:n.length+s.length}})},removeHabit(t){const e=u.habits.find(a=>a.id===t);e&&ji(e),u.habits=u.habits.filter(a=>a.id!==t),w()},getArchivedHabits(){return(u.archivedHabits||[]).map(t=>({...t}))},deleteArchivedHabit(t){const e=(u.archivedHabits||[]).length;return u.archivedHabits=(u.archivedHabits||[]).filter(a=>a.id!==t),u.archivedHabits.length===e?{ok:!1,reason:"That habit is no longer archived"}:(w(),{ok:!0})},archiveTask(t,e){if(!V(t))return{ok:!1,reason:"Day is locked"};const a=M(t),i=a.tasks.find(s=>s.id===e);if(!i)return{ok:!1,reason:"Task not found"};u.archivedTasks||(u.archivedTasks=[]),u.archivedTasks.unshift(vn(i,new Date().toISOString(),t)),u.archivedTasks.length>500&&(u.archivedTasks.length=500),a.tasks=a.tasks.filter(s=>s.id!==e);const n=i.sourcePinId?String(i.sourcePinId):"";return n&&(Array.isArray(a.skippedPins)||(a.skippedPins=[]),a.skippedPins.includes(n)||a.skippedPins.push(n)),w(),{ok:!0}},getArchivedTasks(){return(u.archivedTasks||[]).map(t=>({...t}))},restoreTask(t,e){const a=(u.archivedTasks||[]).findIndex(c=>c.id===t);if(a<0)return{ok:!1,reason:"That task is no longer archived"};const i=u.archivedTasks[a],n=e||_();Ba(n);const s=M(n),r=String(i.title||"").trim().toLowerCase();if(s.tasks.some(c=>String(c.title||"").trim().toLowerCase()===r))return{ok:!1,reason:"That task is already on that day"};const l=/^\d{4}-\d{2}-\d{2}$/.test(String(i.originDate||""))?String(i.originDate):"";return s.tasks.push({id:et("t"),title:i.title,points:Number(i.points)||5,description:String(i.description||""),category:N(i.category),tags:P(i.tags),rating:0,done:!1,missed:!1,forwardedFrom:l&&l!==n?l:"",forwardedHabitId:"",forwardedTo:[],image:Y(i.image),sourcePinId:String(i.sourcePinId||"")}),u.archivedTasks.splice(a,1),w(),{ok:!0,from:l,to:n}},deleteArchivedTask(t){const e=(u.archivedTasks||[]).length;return u.archivedTasks=(u.archivedTasks||[]).filter(a=>a.id!==t),u.archivedTasks.length===e?{ok:!1,reason:"That task is no longer archived"}:(w(),{ok:!0})},restoreHabit(t){const e=(u.archivedHabits||[]).findIndex(n=>n.id===t);if(e<0)return{ok:!1,reason:"That habit is no longer archived"};const a=u.archivedHabits[e];if(u.habits.some(n=>n.id===a.id))return u.archivedHabits.splice(e,1),w(),{ok:!0};const i={...a,description:String(a.description||"").slice(0,2e3),category:N(a.category),consciousPoints:Q(a.consciousPoints),tags:P(a.tags),pin:q(a.pin),archivedAt:null};return u.habits.push(i),u.archivedHabits.splice(e,1),w(),{ok:!0,habit:{...i}}},pinHabit(t,e){const a=u.habits.find(i=>i.id===t);a&&(a.pin=q(e),w())},updatePinnedTaskDetails(t,e){const a=u.pinnedTasks.find(i=>i.id===t);if(a){if(e.title!=null&&(a.title=String(e.title).trim().slice(0,120)||a.title),e.points!=null){const i=Number(e.points);Number.isFinite(i)&&(a.points=Math.max(0,i))}e.description!=null&&(a.description=String(e.description).trim().slice(0,2e3)),e.category!=null&&(a.category=N(e.category)),e.tags!=null&&(a.tags=P(e.tags)),e.image!==void 0&&(a.image=Y(e.image)),Be(t),w()}},unpinHabit(t){const e=u.habits.find(a=>a.id===t);e&&(e.pin=null,w())},pinTask(t,e,a){if(!V(t))return;const n=M(t).tasks.find(o=>o.id===e);if(!n)return;const s=n.sourcePinId?u.pinnedTasks.find(o=>o.id===n.sourcePinId):null;if(s){s.pin=q(a),Be(s.id),le(),w();return}const r=et("p");u.pinnedTasks.push({id:r,title:n.title,points:n.points,description:n.description||"",category:N(n.category),tags:P(n.tags),pin:q(a),startFrom:t,image:Y(n.image)}),n.sourcePinId=r,le(),w()},unpinTaskTemplate(t){u.pinnedTasks=u.pinnedTasks.filter(a=>a.id!==t);const e=String(t);Object.entries(u.days).forEach(([a,i])=>{if(!Array.isArray(i.tasks)||!i.tasks.length||we(a))return;const n=i.tasks.length;i.tasks=i.tasks.filter(s=>String(s&&s.sourcePinId||"")!==e),i.tasks.length!==n&&(Array.isArray(i.skippedPins)||(i.skippedPins=[]),i.skippedPins=i.skippedPins.filter(s=>s!==e))}),w()},updatePinnedTask(t,e){const a=u.pinnedTasks.find(i=>i.id===t);a&&(a.pin=q(e),Be(t),le(),w())},findHabit(t){return u.habits.find(e=>e.id===t)||null},findTask(t,e){return M(t).tasks.find(a=>a.id===e)||null},findPinnedTask(t){return u.pinnedTasks.find(e=>e.id===t)||null},getInstalledAt(){return String(u.installedAt||new Date().toISOString())},getProfile(){const t=Ut(u.profile);return u.profile=t,JSON.parse(JSON.stringify(t))},setProfileField(t,e){return!Object.prototype.hasOwnProperty.call(Qe,t)||u.profile.locked?!1:((!u.profile||typeof u.profile!="object")&&(u.profile=Ut({})),u.profile[t]=String(e||"").slice(0,Qe[t]),w(),!0)},setProfileLocked(t){(!u.profile||typeof u.profile!="object")&&(u.profile=Ut({})),u.profile.locked=!!t,w()},isProfileLocked(){return!!(u.profile&&u.profile.locked)},profileGoalDurations(){return JSON.parse(JSON.stringify(qt))},addWhoAmI(t){if(u.profile.locked)return{ok:!1,reason:"Profile is locked"};const e=String(t||"").trim().slice(0,120);return e?(u.profile.whoAmI||[]).length>=50?{ok:!1,reason:"List is full (50)"}:(u.profile.whoAmI.push({id:J("w"),text:e}),w(),{ok:!0}):{ok:!1,reason:"Type something first"}},updateWhoAmI(t,e){if(u.profile.locked)return;const a=(u.profile.whoAmI||[]).find(n=>n.id===t);if(!a)return;const i=String(e||"").trim().slice(0,120);i?a.text=i:u.profile.whoAmI=u.profile.whoAmI.filter(n=>n.id!==t),w()},moveWhoAmI(t,e){if(u.profile.locked)return;const a=u.profile.whoAmI||[],i=a.findIndex(r=>r.id===t),n=i+e;if(i<0||n<0||n>=a.length)return;const[s]=a.splice(i,1);a.splice(n,0,s),w()},removeWhoAmI(t){u.profile.locked||(u.profile.whoAmI=(u.profile.whoAmI||[]).filter(e=>e.id!==t),w())},addLifeArea(t){if(u.profile.locked)return{ok:!1,reason:"Profile is locked"};const e=String(t||"").trim().slice(0,60);if(!e)return{ok:!1,reason:"Name the life area"};if((u.profile.lifeAreas||[]).length>=20)return{ok:!1,reason:"Max 20 areas"};const a={id:J("a"),title:e,description:""};return u.profile.lifeAreas.push(a),w(),{ok:!0,id:a.id}},updateLifeArea(t,e={}){if(u.profile.locked)return;const a=(u.profile.lifeAreas||[]).find(i=>i.id===t);a&&(e.title!=null&&(a.title=String(e.title).trim().slice(0,60)||a.title),e.description!=null&&(a.description=String(e.description).slice(0,1e3)),w())},moveLifeArea(t,e){if(u.profile.locked)return;const a=u.profile.lifeAreas||[],i=a.findIndex(r=>r.id===t),n=i+e;if(i<0||n<0||n>=a.length)return;const[s]=a.splice(i,1);a.splice(n,0,s),w()},removeLifeArea(t){u.profile.locked||(u.profile.lifeAreas=(u.profile.lifeAreas||[]).filter(e=>e.id!==t),w())},addProfileGoal(t,e,a){if(u.profile.locked)return{ok:!1,reason:"Profile is locked"};const i=String(t||"").trim().slice(0,200);if(!i)return{ok:!1,reason:"Write your goal first"};const n=Xe.includes(e)?e:"short",s=qt[n],r=s.includes(a)?a:s[0];if((u.profile.pGoals||[]).length>=100)return{ok:!1,reason:"Too many goals (100)"};const o={id:J("g"),text:i,term:n,duration:r,createdAt:new Date().toISOString()};return u.profile.pGoals.push(o),w(),{ok:!0,id:o.id}},updateProfileGoal(t,e={}){if(u.profile.locked)return;const a=(u.profile.pGoals||[]).find(i=>i.id===t);if(a){if(e.text!=null&&(a.text=String(e.text).trim().slice(0,200)||a.text),e.term!=null&&Xe.includes(e.term)){a.term=e.term;const i=qt[a.term];i.includes(a.duration)||(a.duration=i[0])}e.duration!=null&&qt[a.term].includes(e.duration)&&(a.duration=e.duration),w()}},removeProfileGoal(t){u.profile.locked||(u.profile.pGoals=(u.profile.pGoals||[]).filter(e=>e.id!==t),w())},addQuote(t,e){if(u.profile.locked)return{ok:!1,reason:"Profile is locked"};const a=String(t||"").trim().slice(0,500);if(!a)return{ok:!1,reason:"Write the quote first"};if((u.profile.quotes||[]).length>=200)return{ok:!1,reason:"Too many quotes (200)"};const i={id:J("q"),text:a,author:String(e||"").trim().slice(0,80),fav:!1,createdAt:new Date().toISOString()};return u.profile.quotes.push(i),w(),{ok:!0,id:i.id}},updateQuote(t,e={}){if(u.profile.locked)return;const a=(u.profile.quotes||[]).find(i=>i.id===t);a&&(e.text!=null&&(a.text=String(e.text).trim().slice(0,500)||a.text),e.author!=null&&(a.author=String(e.author).trim().slice(0,80)),w())},toggleQuoteFav(t){if(u.profile.locked)return;const e=(u.profile.quotes||[]).find(a=>a.id===t);e&&(e.fav=!e.fav,w())},removeQuote(t){u.profile.locked||(u.profile.quotes=(u.profile.quotes||[]).filter(e=>e.id!==t),w())},getCategories(){return dt().map(t=>({...t}))},getCustomCategories(){return z.map(t=>({...t}))},addCategory(t){const e=String(t||"").trim().slice(0,30);if(!e)return{ok:!1,reason:"Type a category name"};if(dt().some(n=>n.label.toLowerCase()===e.toLowerCase()))return{ok:!1,reason:"That category already exists"};if(z.length>=20)return{ok:!1,reason:"Too many categories (max 20 custom)"};let i=`c${Date.now().toString(36)}`;return dt().some(n=>n.id===i)&&(i=`c${Date.now().toString(36)}${Math.floor(Math.random()*99)}`),z.push({id:i,label:e}),w(),{ok:!0,id:i}},renameCategory(t,e){const a=z.find(s=>s.id===t);if(!a)return{ok:!1,reason:"Built-in categories can’t be renamed"};const i=String(e||"").trim().slice(0,30);return i?dt().some(s=>s.id!==t&&s.label.toLowerCase()===i.toLowerCase())?{ok:!1,reason:"That category already exists"}:(a.label=i,w(),{ok:!0}):{ok:!1,reason:"Type a category name"}},updateCategory(t,e={}){const a=z.find(i=>i.id===t);if(!a){if(!Xt.find(s=>s.id===t))return{ok:!1,reason:"Category not found"};const n={...rt[t]||{}};return e.color!==void 0&&(n.color=String(e.color).slice(0,20)),e.goals!==void 0&&(n.goals=String(e.goals).slice(0,1e3)),rt[t]=n,u.categoryOverrides=rt,w(),{ok:!0}}return e.color!==void 0&&(a.color=String(e.color).slice(0,20)),e.goals!==void 0&&(a.goals=String(e.goals).slice(0,1e3)),w(),{ok:!0}},deleteCategory(t){const e=z.findIndex(a=>a.id===t);return e<0?{ok:!1,reason:"Built-in categories can’t be deleted"}:(z.splice(e,1),u.habits.forEach(a=>{a.category===t&&(a.category="mentally")}),(u.archivedHabits||[]).forEach(a=>{a.category===t&&(a.category="mentally")}),u.pinnedTasks.forEach(a=>{a.category===t&&(a.category="mentally")}),Object.values(u.days).forEach(a=>{(a.tasks||[]).forEach(i=>{i.category===t&&(i.category="mentally")})}),w(),{ok:!0})},getAllTags(){const t=new Map,e=a=>{P(a).forEach(i=>{t.set(i,(t.get(i)||0)+1)})};return u.habits.forEach(a=>e(a.tags)),(u.archivedHabits||[]).forEach(a=>e(a.tags)),u.pinnedTasks.forEach(a=>e(a.tags)),Object.values(u.days).forEach(a=>{(a.tasks||[]).forEach(i=>e(i.tags))}),[...t.entries()].map(([a,i])=>({tag:a,count:i})).sort((a,i)=>i.count-a.count||a.tag.localeCompare(i.tag))},renameTag(t,e){const a=String(t||"").trim(),i=P(e)[0]||"";if(!a||!i)return{ok:!1,reason:"Type a tag name"};if(a.toLowerCase()===i.toLowerCase()){const r=o=>P((o||[]).map(l=>String(l).toLowerCase()===a.toLowerCase()?i:l));return u.habits.forEach(o=>{o.tags=r(o.tags)}),(u.archivedHabits||[]).forEach(o=>{o.tags=r(o.tags)}),u.pinnedTasks.forEach(o=>{o.tags=r(o.tags)}),Object.values(u.days).forEach(o=>{(o.tasks||[]).forEach(l=>{l.tags=r(l.tags)})}),w(),{ok:!0}}const n=this.getAllTags().some(r=>r.tag.toLowerCase()===i.toLowerCase()),s=r=>{const o=(r||[]).map(l=>String(l).toLowerCase()===a.toLowerCase()?i:l);return P(o)};return u.habits.forEach(r=>{r.tags=s(r.tags)}),(u.archivedHabits||[]).forEach(r=>{r.tags=s(r.tags)}),u.pinnedTasks.forEach(r=>{r.tags=s(r.tags)}),Object.values(u.days).forEach(r=>{(r.tasks||[]).forEach(o=>{o.tags=s(o.tags)})}),w(),{ok:!0,merged:n}},deleteTag(t){const e=String(t||"").trim().toLowerCase();if(!e)return{ok:!1,reason:"Pick a tag first"};const a=i=>(i||[]).filter(n=>String(n).toLowerCase()!==e);return u.habits.forEach(i=>{i.tags=a(i.tags)}),(u.archivedHabits||[]).forEach(i=>{i.tags=a(i.tags)}),u.pinnedTasks.forEach(i=>{i.tags=a(i.tags)}),Object.values(u.days).forEach(i=>{(i.tasks||[]).forEach(n=>{n.tags=a(n.tags)})}),w(),{ok:!0}},addTagToHabit(t,e){const a=u.habits.find(n=>n.id===t);if(!a)return{ok:!1,reason:"Pick a habit first"};const i=P(e)[0]||"";return i?(a.tags=P([...a.tags||[],i]),w(),{ok:!0}):{ok:!1,reason:"Type a tag name"}},categoryChart(t,e){const a=["week","month","year"].includes(t)?t:"week",i=`${a}|${e}|${Sn}`;return je.key===i?je.value:pt(()=>this._buildCategoryChart(a,e,i))},_buildCategoryChart(t,e,a){const i=dt(),n=[];if(t==="year"){const f=String(e).slice(0,4);for(let b=0;b<12;b++){const p=String(b+1).padStart(2,"0"),k=new Date(Number(f),b+1,0).getDate();n.push({label:new Date(Number(f),b,1).toLocaleDateString(void 0,{month:"short"}),title:new Date(Number(f),b,1).toLocaleDateString(void 0,{month:"long",year:"numeric"}),keys:this.rangeKeys(`${f}-${p}-01`,`${f}-${p}-${String(k).padStart(2,"0")}`)})}}else{const[f,b]=this.resolveRange(t,e);this.rangeKeys(f,b).forEach(p=>{const k=new Date(`${p}T00:00:00`);n.push({label:t==="week"?k.toLocaleDateString(void 0,{weekday:"narrow"}):String(k.getDate()),title:p,keys:[p]})})}const s={},r={};i.forEach(f=>{s[f.id]=n.map(()=>0),r[f.id]=0}),n.forEach((f,b)=>{f.keys.forEach(p=>{this.categoryBreakdown(p).forEach(k=>{k.id in s||(s[k.id]=n.map(()=>0),r[k.id]=0),s[k.id][b]+=k.earned||0,r[k.id]+=k.earned||0})})});const o=n.map((f,b)=>i.reduce((p,k)=>p+(s[k.id]?s[k.id][b]:0),0)),l=Math.max(1,...o),c={kind:t,labels:n.map(f=>f.label),titles:n.map(f=>f.title),cats:i.map(f=>({...f})),perCat:s,totals:r,max:l,grandTotal:o.reduce((f,b)=>f+b,0)};return je={key:a,value:c},c},getGoals(){return u.goals},getBadges(){return[...u.badges].sort((t,e)=>{const a=Ia(e.tier)-Ia(t.tier);return a!==0?a:String(e.earnedAt).localeCompare(String(t.earnedAt))})},topBadges(t=3){return this.getBadges().slice(0,t)},addGoal(t={}){const e=Ve({...t,id:et("g")});return u.goals.push(e),w(),this.checkGoals(_()),e},updateGoal(t,e={}){const a=u.goals.find(n=>n.id===t);if(!a)return;const i=Ve({...a,...e,id:t});Object.assign(a,i),w(),this.checkGoals(_())},removeGoal(t){u.goals=u.goals.filter(e=>e.id!==t),w()},findGoal(t){return u.goals.find(e=>e.id===t)||null},taskListGoals(){return u.goals.filter(t=>t.kind==="task-list")},openTaskListGoals(){return u.goals.filter(t=>t.kind==="task-list"&&!t.locked)},undoneDayTasks(t=60){const e=[],a=new Set;return Object.keys(u.days).sort().reverse().forEach(i=>{(u.days[i]&&u.days[i].tasks||[]).forEach(s=>{if(!s||s.done)return;const r=String(s.title||"").trim();if(!r)return;const o=r.toLowerCase();a.has(o)||(a.add(o),e.push({title:r,category:s.category,points:Number(s.points)||0,date:i}))})}),e.slice(0,t)},addGoalItem(t,e){const a=u.goals.find(n=>n.id===t);if(!a||a.kind!=="task-list")return{ok:!1,reason:"No such goal"};if(a.locked||a.terminated)return{ok:!1,reason:"This goal is locked — unlock it first"};const i=String(e||"").trim().slice(0,120);return i?a.tasks.length>=100?{ok:!1,reason:"Goal list is full (100 tasks)"}:(a.tasks.push({id:et("gt"),title:i,done:!1,doneAt:null}),w(),{ok:!0}):{ok:!1,reason:"Type a task first"}},addGoalItems(t,e){const a=u.goals.find(s=>s.id===t);if(!a||a.kind!=="task-list")return{ok:!1,reason:"No such goal"};if(a.locked||a.terminated)return{ok:!1,reason:"This goal is locked — unlock it first"};const i=new Set(a.tasks.map(s=>s.title.toLowerCase())),n=[];return(Array.isArray(e)?e:[]).forEach(s=>{const r=String(s||"").trim().slice(0,120);if(!r)return;const o=r.toLowerCase();i.has(o)||a.tasks.length>=100||(i.add(o),a.tasks.push({id:et("gt"),title:r,done:!1,doneAt:null}),n.push(r))}),w(),{ok:!0,added:n.length}},removeGoalItem(t,e){const a=u.goals.find(i=>i.id===t);return!a||a.kind!=="task-list"||a.locked?{ok:!1,reason:"Unlock the goal to edit its tasks"}:(a.tasks=a.tasks.filter(i=>i.id!==e),w(),{ok:!0})},goalTaskSchedule(t){return An(t)},goalTaskDone(t){const e=this.goalTaskSchedule(t);if(!e)return!!(t&&t.done);const a=t&&Array.isArray(t.checked)?t.checked:[];return e.slots.every(i=>a.includes(i.key))},_goalDoneCount(t){return(t.tasks||[]).filter(e=>this.goalTaskDone(e)).length},setGoalItemDone(t,e,a){const i=u.goals.find(c=>c.id===t);if(!i||i.kind!=="task-list")return{ok:!1,reason:"No such goal"};if(i.locked)return{ok:!1,reason:"Unlock the goal to edit its tasks"};const n=i.tasks.find(c=>c.id===e);if(!n)return{ok:!1,reason:"No such task in the goal"};const s=this.goalTaskSchedule(n);if(s){if(a){const c=Array.isArray(n.checked)?n.checked:[];return{ok:!1,reason:`Tick every pinned day first: ${s.slots.filter(b=>!c.includes(b.key)).map(b=>b.label).join(", ")}`}}n.checked=[],n.done=!1,n.doneAt=null}else n.done=!!a,n.doneAt=a?new Date().toISOString():null;const r=this._refreshTaskListGoal(i),{awarded:o,revoked:l}=this.checkGoalsDetailed();return w(),{ok:!0,autoLocked:r,awarded:o,revoked:l}},setGoalItemSlot(t,e,a,i){const n=u.goals.find(b=>b.id===t);if(!n||n.kind!=="task-list")return{ok:!1,reason:"No such goal"};if(n.locked)return{ok:!1,reason:"Unlock the goal to edit its tasks"};const s=n.tasks.find(b=>b.id===e);if(!s)return{ok:!1,reason:"No such task in the goal"};const r=this.goalTaskSchedule(s);if(!r)return{ok:!1,reason:"This task has no repeat schedule"};if(!r.slots.some(b=>b.key===a))return{ok:!1,reason:"Not a day of this task"};const o=new Set(Array.isArray(s.checked)?s.checked:[]);i?o.add(a):o.delete(a),s.checked=[...o],s.done=r.slots.every(b=>s.checked.includes(b.key)),s.doneAt=s.done?s.doneAt||new Date().toISOString():null;const l=this._refreshTaskListGoal(n),{awarded:c,revoked:f}=this.checkGoalsDetailed();return w(),{ok:!0,autoLocked:l,done:s.done,awarded:c,revoked:f}},setGoalLocked(t,e){const a=u.goals.find(i=>i.id===t);return!a||a.kind!=="task-list"?{ok:!1,reason:"No such goal"}:(e?(a.locked=!0,a.tasks.length>0&&a.tasks.every(n=>this.goalTaskDone(n))||(a.terminated=!0)):a.locked=!1,w(),{ok:!0})},_refreshTaskListGoal(t){return t.tasks.length>0&&t.tasks.every(a=>this.goalTaskDone(a))&&!t.locked?(t.locked=!0,!0):!1},removeBadge(t){u.badges=u.badges.filter(e=>e.id!==t),w()},perfectDaysCount(){return pt(()=>Object.keys(u.days).filter(t=>{const e=this.scoreFor(t);return e.max>0&&e.percent===100}).length)},taskStreak(t,e){let a=e,i=0;(r=>{const o=u.days[r];return!o||!Array.isArray(o.tasks)?!1:o.tasks.some(l=>l.sourcePinId===t&&l.done)})(a)||(a=Gt(a));let s=0;for(;i<400;){i+=1;const r=u.days[a];if(!r||!Array.isArray(r.tasks))break;if(r.tasks.some(o=>o.sourcePinId===t&&o.done)){s+=1,a=Gt(a);continue}break}return s},goalProgress(t,e){const a=e||_();if(t.kind==="habit-streak"){const n=this.habitStreak(t.targetId,a);return{current:n,target:t.targetDays,done:n>=t.targetDays}}if(t.kind==="task-streak"){const n=this.taskStreak(t.targetId,a);return{current:n,target:t.targetDays,done:n>=t.targetDays}}if(t.kind==="task-list"){const n=t.tasks||[],s=this._goalDoneCount(t);return{current:s,target:Math.max(n.length,1),done:n.length>0&&s===n.length}}const i=this.perfectDaysCount();return{current:i,target:t.targetDays,done:i>=t.targetDays}},checkGoalsDetailed(t){const e=t||_(),a=[],i=[];return u.goals.forEach(n=>{const s=this.goalProgress(n,e),r=u.badges.find(o=>o.goalId===n.id);if(s.done){if(r)return;const o={id:et("b"),goalId:n.id,title:n.title,tier:n.tier,rewardTitle:n.rewardTitle,earnedAt:new Date().toISOString()};u.badges.push(o),a.push(o);return}r&&(u.badges=u.badges.filter(o=>o.goalId!==n.id),i.push(r))}),(a.length||i.length)&&w(),{awarded:a,revoked:i}},checkGoals(t){return this.checkGoalsDetailed(t).awarded},scoreFor(t){return pt(()=>this._scoreFor(t))},_scoreFor(t){const e=this.getDay(t),a=this.getHabits(t),i=this.isLocked(t),n=u.settings.showConscious!==!1,s=a.reduce((S,y)=>{const C=this.habitRating(t,y.id);return S+Math.round(y.points*C/5)},0),r=n?a.reduce((S,y)=>S+(this.habitRating(t,y.id)>0?Q(y.consciousPoints):0),0):0,o=e.tasks.reduce((S,y)=>S+(y.done?y.points:0),0),l=a.reduce((S,y)=>S+y.points,0),c=n?a.reduce((S,y)=>S+Q(y.consciousPoints),0):0,f=e.tasks.reduce((S,y)=>S+y.points,0),b=s+r+o,p=l+c+f,k=a.filter(S=>e.habitMissed&&e.habitMissed[S.id]?!0:i&&this.habitRating(t,S.id)<=0).length,A=e.tasks.filter(S=>S.done?!1:S.missed===!0?!0:S.missed===!1?!1:i).length;return{earned:b,max:p,habitScore:s,consciousScore:r,maxConscious:c,taskScore:o,completedHabits:a.filter(S=>this.habitRating(t,S.id)>0).length,habitAvg:a.length?Math.round(a.reduce((S,y)=>S+this.habitRating(t,y.id),0)/a.length*10)/10:0,totalHabits:a.length,completedTasks:e.tasks.filter(S=>S.done).length,totalTasks:e.tasks.length,missedHabits:k,missedTasks:A,percent:p?Math.round(b/p*100):0,locked:i,submittedAt:e.submittedAt}},monthKeys(t){const e=String(t).slice(0,7);return Object.keys(u.days).filter(a=>a.startsWith(e)).sort()},rangeKeys(t,e){const a=[],i=new Date(`${t}T00:00:00`),n=new Date(`${e}T00:00:00`);let s=0;for(;i<=n&&s<732;)s+=1,a.push(_(i)),i.setDate(i.getDate()+1);return a},resolveRange(t,e){if(t==="day")return[e,e];if(t==="week"){const i=new Date(`${e}T00:00:00`),n=new Date(i);n.setDate(i.getDate()-(i.getDay()-this.getWeekStart()+7)%7);const s=new Date(n);return s.setDate(n.getDate()+6),[_(n),_(s)]}if(t==="month"){const[i,n]=e.split("-").map(Number),s=`${i}-${String(n).padStart(2,"0")}-01`,r=new Date(i,n,0).getDate(),o=`${i}-${String(n).padStart(2,"0")}-${String(r).padStart(2,"0")}`;return[s,o]}if(t==="year"){const i=e.slice(0,4);return[`${i}-01-01`,`${i}-12-31`]}const a=Object.keys(u.days).sort();return a.length?[a[0],a[a.length-1]>e?a[a.length-1]:e]:[e,e]},exportRows(t,e){return pt(()=>this._exportRows(t,e))},_exportRows(t,e){return this.rangeKeys(t,e).map(a=>{const i=this.getDay(a),n=this.getHabits(a),s=this.scoreFor(a),r=this.isLocked(a),o=(c,f)=>f>0?"done":r?"missed":"pending",l=c=>c.done?"done":r?"missed":"pending";return{date:a,earned:s.earned,max:s.max,percent:s.percent,habitScore:s.habitScore,consciousScore:s.consciousScore||0,taskScore:s.taskScore,locked:r,missedHabits:s.missedHabits||0,missedTasks:s.missedTasks||0,note:i.note||"",habits:n.map(c=>{const f=this.habitRating(a,c.id);return{name:c.name,description:String(c.description||""),category:ut(N(c.category)),tags:P(c.tags),points:c.points,consciousPoints:this.consciousEnabled()?Q(c.consciousPoints):0,rating:f,earned:Math.round(c.points*f/5)+(f>0&&this.consciousEnabled()?Q(c.consciousPoints):0),status:o(c.id,f)}}),tasks:i.tasks.map(c=>({title:c.title,category:ut(N(c.category)),tags:P(c.tags),points:c.points,rating:Math.max(0,Math.min(5,Number(c.rating)||0)),done:!!c.done,earned:c.done?c.points:0,status:c.forwardedFrom?`forwarded from ${c.forwardedFrom}`:l(c),forwardedFrom:c.forwardedFrom||"",forwardedTo:Array.isArray(c.forwardedTo)?c.forwardedTo:[],description:c.description||"",hasImage:!!c.image}))}})},history(t=14){return pt(()=>Object.keys(u.days).sort().reverse().slice(0,t).map(a=>({date:a,...this.scoreFor(a),note:u.days[a].note,locked:gt(a),submittedAt:u.days[a].submittedAt})))},week(t){return pt(()=>{const e=new Date(t);return e.setDate(e.getDate()-(e.getDay()-this.getWeekStart()+7)%7),e.setHours(0,0,0,0),Array.from({length:7},(a,i)=>{const n=new Date(e);n.setDate(e.getDate()+i);const s=_(n),r=u.days[s];return{date:s,label:n.toLocaleDateString(void 0,{weekday:"short"}),dayOfMonth:n.getDate(),hasRecord:!!r,note:String(r&&r.note||""),locked:gt(s),...this.scoreFor(s)}})})}};function Dn(t){return t>=90?"Excellent":t>=75?"Great day":t>=50?"Keep going":t>0?"Started":"No score yet"}function B(t){return new Date(`${t}T00:00:00`).toLocaleDateString(void 0,{weekday:"long",month:"short",day:"numeric"})}function qi(t){return t?new Date(t).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}):""}function Ae(t){return t>=5?"Excellent":t>=4?"Great":t>=3?"Good":t>=2?"Fair":t>=1?"Low":"Not rated"}const Ge=document.getElementById("app"),Cn="daily-report-2026-11-09T17-11-10-mw9ipnil",qa=`v1.1 — Auto-update · Offline · Backup (${Cn.slice(-8)})`;let v=d.todayKey(),H="today",x=null,$=null,K=!1,yt=!1;const fe=new Set;let St=!1,xe=!1,Pt=null,ft=!1,Te=!1,na=null,mt="Idle.",Z="week",at="all",st=0,De=null,U="month",Ce=null,O=[],lt=0,Dt=null;const ht=new Set,It=new Map;let zt=!1,me="all",it="short",Mt="1 Week";const Wt=new Set;let ge=null;const he=new Set;let ia=null,Ct=null;window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),Pt=t});window.addEventListener("appinstalled",()=>{Pt=null,g("Second Mind installed"),h()});const Wi=[["default","Default"],["points","Points"],["category","Category"],["tags","Tags"],["custom","Custom"]];function Wa(t){const e=new Date(`${v}T00:00:00`);e.setDate(e.getDate()+t),v=d.todayKey(e)}let _e=d.todayKey();function Sa(){const t=d.todayKey();if(t===_e)return!1;const e=_e;return _e=t,v===e&&(v=t),De=null,Ce=null,O=[],lt=0,st=0,!0}function L(t){return{home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z"/></svg>',profile:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/></svg>',history:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8v5l3 2"/><circle cx="12" cy="12" r="9"/></svg>',settings:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H8a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V8c.3.7.9 1.2 1.6 1.3H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1.7z"/></svg>',pin:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4h6l-1 7 3 3v2H7v-2l3-3z" fill="currentColor" stroke="none"/><path d="M12 16v5"/></svg>',forward:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',swap:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h13l-3.5-3.5M20 16H7l3.5 3.5"/></svg>',undo:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h11a5 5 0 0 1 0 10H8"/><path d="M8 5 4 9l4 4"/></svg>',habit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h10M4 17h13"/></svg>',archive:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h18v4H3zM5 11v9h14v-9M9.5 15h5"/></svg>',trash:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg>',grip:'<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><circle cx="9" cy="6" r="1.7"/><circle cx="15" cy="6" r="1.7"/><circle cx="9" cy="12" r="1.7"/><circle cx="15" cy="12" r="1.7"/><circle cx="9" cy="18" r="1.7"/><circle cx="15" cy="18" r="1.7"/></svg>'}[t]}function En(t,e,a){return`
    <div class="stars" data-habit="${t}">
      ${[1,2,3,4,5].map(i=>`
            <button type="button" class="star ${i<=e?"on":""}" data-action="rate-habit" data-id="${t}" data-rating="${i}" ${a?"disabled":""} aria-label="${i} star">★</button>
          `).join("")}
    </div>
  `}function Pn(t,e,a){return`
    <div class="stars stars-small" data-task="${t}">
      ${[1,2,3,4,5].map(i=>`
            <button type="button" class="star small ${i<=e?"on":""}" data-action="rate-task" data-id="${t}" data-rating="${i}" ${a?"disabled":""} aria-label="${i} star">★</button>
          `).join("")}
    </div>
  `}function Ln(t){const e=Number(t)||0;return e?`<span class="conscious-badge">🧠 +${e}</span>`:'<span class="item-meta">No conscious pts</span>'}const Ui=["mentally","psychology","physically","spiritually","socially"];function At(t){const a=d.getCategories().find(s=>s.id===t),i=a&&a.color?a.color:j(t);return`<span class="cat-badge ${Ui.includes(t)?`cat-${t}`:"cat-custom"}" style="background:${i}22;color:${i};box-shadow:inset 0 0 0 1px ${i}55">${m(ut(t))}</span>`}function sa(t){const e=String(t||"");if(!e)return"Deleted";const a=new Date(e);return Number.isNaN(a.getTime())?"Deleted":`Deleted ${a.toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}`}const Ua={mentally:"#5b8cff",psychology:"#a06bff",physically:"#22b07d",spiritually:"#e8a51c",socially:"#14b8a6"},za=["#f472b6","#38bdf8","#fb923c","#a3e635","#facc15","#e879f9"];function j(t,e){const i=d.getCategories().find(n=>n.id===t);return i&&i.color?i.color:Ua[t]?Ua[t]:za[(e??0)%za.length]}function ct(t){const e=Array.isArray(t)?t.filter(Boolean):[];return e.length?`<div class="tag-row">${e.map(a=>`<span class="tag-chip">#${m(a)}</span>`).join("")}</div>`:""}function Nn(t){return!t||!t.image?"":`<button type="button" class="task-img-thumb" data-action="view-task-image" data-id="${t.id}" aria-label="View attached photo"><img src="${t.image}" alt="Task photo" loading="lazy" /></button>`}function In(t){const e=String(t||"");if(!e.trim())return"";const a=e.split(`
`),i=/^\s*(?:•|-|[*])\s+(.*)$/,n=/^\s*\d+[.)]\s+(.*)$/;let s="",r=null;const o=()=>{r&&(s+=r==="ul"?"</ul>":"</ol>",r=null)};return a.forEach(l=>{const c=i.exec(l),f=!c&&n.exec(l);c?(r!=="ul"&&(o(),s+='<ul class="note-list">',r="ul"),s+=`<li>${m(c[1])||"&nbsp;"}</li>`):f?(r!=="ol"&&(o(),s+='<ol class="note-list">',r="ol"),s+=`<li>${m(f[1])||"&nbsp;"}</li>`):l.trim()?(o(),s+=`<p class="note-text">${m(l)}</p>`):(o(),s+='<p class="note-text">&nbsp;</p>')}),o(),s}function zi(t){const e=In(t);return e?`<div class="note" style="margin-top:10px">${e}</div>`:""}function Vt(t){return String(t||"").split(`
`).map(e=>e.replace(/^\s*(?:•|-|\*|\d+[.)])\s*/,"").trim()).filter(Boolean)}function Qt(t){return t.map(e=>`• ${e}`).join(`
`)}function Ya(t,e){const a=String(t||"").split(`
`).map(i=>i.replace(/^\s*(?:•|-|\*)\s+/,"").trim()).filter(Boolean);return a.length?`<ul class="note-list idea-list">${a.map((i,n)=>`
        <li>
          <span>${m(i)}</span>
          ${e?"":`<button class="idea-remove" data-action="remove-idea" data-index="${n}" title="Remove idea" aria-label="Remove idea">✕</button>`}
        </li>`).join("")}</ul>`:""}function Mn(t,e,a){if(!t||t.disabled)return;const i=t.value||"",n=i.split(`
`),s=i.slice(0,t.selectionStart).split(`
`).length-1,r=i.slice(0,t.selectionEnd).split(`
`).length-1,o=t.selectionStart!==t.selectionEnd,l=o?s:0,c=o?r:n.length-1;if(e==="bullets"){const f=n.slice(l,c+1).every(b=>/^\s*(?:•|-|[*])\s+/.test(b)||!b.trim());for(let b=l;b<=c;b++)n[b].trim()&&(f?n[b]=n[b].replace(/^\s*(?:•|-|[*])\s+/,""):/^\s*(?:•|-|[*])\s+/.test(n[b])||(n[b]=`• ${n[b].replace(/^\s*/,"")}`))}else{const f=n.slice(l,c+1).every(p=>/^\s*\d+[.)]\s+/.test(p)||!p.trim());let b=1;for(let p=l;p<=c;p++){if(!n[p].trim())continue;const k=n[p].replace(/^\s*(?:\d+[.)]|•|-|[*])\s+/,"").replace(/^\s*/,"");n[p]=f?k:`${b}. ${k}`,b+=1}}t.value=n.join(`
`),a&&a(t.value);try{t.focus()}catch{}}function Ja(t){Mn(document.getElementById("day-note"),t,e=>d.setNote(v,e))}function Va(t){Mn(document.getElementById("profile-values"),t,e=>d.setProfileField("values",e))}function Yi(t){return new Promise(e=>{if(!t||!String(t.type||"").startsWith("image/"))return e(null);const a=URL.createObjectURL(t),i=new Image,n=()=>{try{URL.revokeObjectURL(a)}catch{}},s=(r,o)=>new Promise(l=>{let c=i.naturalWidth||0,f=i.naturalHeight||0;if(!c||!f)return l(null);const b=Math.min(1,r/Math.max(c,f));c=Math.max(1,Math.round(c*b)),f=Math.max(1,Math.round(f*b));const p=document.createElement("canvas");p.width=c,p.height=f;try{p.getContext("2d").drawImage(i,0,0,c,f),l(p.toDataURL("image/jpeg",o))}catch{l(null)}});i.onload=async()=>{try{let r=await s(900,.72);r&&r.length>de&&(r=await s(600,.62)),r&&r.length>de&&(r=await s(400,.55)),n(),e(r&&r.length<=de?r:null)}catch{n(),e(null)}},i.onerror=()=>{n(),e(null)},i.src=a})}function Qa(t,e){return`
    <select class="sort-select" data-sort-kind="${t}" aria-label="Sort ${t}">
      ${Wi.map(([a,i])=>`<option value="${a}" ${e===a?"selected":""}>${i}</option>`).join("")}
    </select>
  `}function Ji(t){const e=d.getBadges(),a=d.topBadges(3),i=t.max>0&&t.percent===100,n=xe?e:a;return`
    <section class="section rewards-section">
      <div class="section-head">
        <h2>Rewards</h2>
        ${e.length>3?`<button class="ghost-btn compact" data-action="toggle-badges">${xe?"Show less":`More (${e.length}) ›`}</button>`:""}
      </div>
      ${i?`
        <div class="trophy-card">
          <div class="trophy-cup">🏆</div>
          <div>
            <div class="item-title">Gold Cup — Perfect day!</div>
            <div class="item-meta">100% of points on ${B(v)}</div>
          </div>
        </div>
      `:""}
      ${e.length?`
        <div class="rewards-grid">
          ${n.map(s=>`
            <article class="reward-card tier-${s.tier}">
              <div class="reward-medal">${ve(s.tier)}</div>
              <div>
                <div class="item-title">${m(s.rewardTitle||s.title)}</div>
                <div class="item-meta">${m(s.title)} · ${yn(s.tier)} · ${B((s.earnedAt||"").slice(0,10))}</div>
              </div>
            </article>
          `).join("")}
        </div>
      `:'<div class="empty">No rewards yet. Set a goal in Settings → Goals &amp; Rewards.</div>'}
    </section>
  `}function Ee(t){return`<span class="streak-badge">${t} day streak</span>`}function Hn(t){return t?`<span class="forward-badge from">↩ Forwarded from ${m(t)}</span>`:""}function Pe(t){const e=Array.isArray(t)?t.filter(Boolean):[];return e.length?`<span class="forward-badge to">↪ Forwarded to ${m(e[e.length-1])}</span>`:""}function Fn(t){return t?`<span class="forward-badge replace from">⇄ Replaced from ${m(t)}</span>`:""}function Vi(t){const e=d.getAllHabits().map(a=>({habit:a,to:d.habitReplacedTo(v,a.id)})).filter(a=>a.to);return e.length?`
    <div class="replaced-away">
      ${e.map(({habit:a,to:i})=>`
        <button type="button" class="forward-badge replace undo" data-action="undo-replace-habit" data-id="${a.id}" data-from="${v}" data-to="${i}" ${t?"disabled":""} title="${t?"Unlock the day to undo this":`Put ${m(a.name)} back on ${m(v)}`}">
          ⇄ ${m(a.name)} → ${m(i)}
        </button>`).join("")}
    </div>
  `:""}function Rn(t,e){if(e)return`<button class="mini-btn" data-action="open-replace-habit" data-id="${t}" disabled title="Unlock the day to replace it">${L("swap")}</button>`;const a=d.habitReplaceDays(v,t);if(!a.allowed){const i=d.findHabit(t),n=i&&i.pin&&i.pin.mode==="forever"?"Pinned forever — no replace option":"No replace days before its next due day";return`<button class="mini-btn" data-action="open-replace-habit" data-id="${t}" disabled title="${n}">${L("swap")}</button>`}return`<button class="mini-btn" data-action="open-replace-habit" data-id="${t}" title="Replace this day with one of the ${a.days.length} day${a.days.length===1?"":"s"} before ${a.next}">${L("swap")}</button>`}function Qi(t){const e=new Date(`${t}T00:00:00`);return e.setDate(e.getDate()+1),d.todayKey(e)}function oa(){return`<button class="ghost-btn compact ${K?"on":""}" data-action="toggle-edit">${K?"Done":"Edit Mode"}</button>`}function Xi(t){return t?'<span class="lock-badge">Locked</span>':'<span class="open-badge">Open</span>'}function Zi(){d.checkGoals(v);const t=d.getDay(v),e=d.getSettings(),a=e.showConscious!==!1,i=d.getHabits(v),n=d.getTasks(v),s=d.scoreFor(v),r=Dn(s.percent),o=v===d.todayKey(),l=d.isLocked(v);return`
    <div class="topbar">
      <div>
        <p class="kicker">${o?"Today":"Daily report"}</p>
        <h1>${B(v)}</h1>
      </div>
      <div class="date-nav">
        <button class="icon-btn" data-action="prev-day" aria-label="Previous day">‹</button>
        <button class="icon-btn" data-action="next-day" aria-label="Next day">›</button>
      </div>
    </div>

    <section class="score-hero ${l?"is-locked":""}">
      <div class="score-row">
        <div>
          <div class="score-value">${s.earned}</div>
          <div class="score-unit">of ${s.max||0} points</div>
        </div>
        <div class="hero-side">
          ${Xi(l)}
          <div class="grade-pill">${r}</div>
        </div>
      </div>
      <div class="progress-track"><div class="progress-fill" style="width:${s.percent}%"></div></div>
      <div class="stats-grid ${a?"stats-4":"stats-3"}">
        <div class="stat"><span class="muted">Habits</span><b>${s.completedHabits}/${s.totalHabits}</b></div>
        <div class="stat"><span class="muted">Tasks</span><b>${s.completedTasks}/${s.totalTasks}</b></div>
        ${a?`<div class="stat"><span class="muted">Conscious</span><b>+${s.consciousScore||0}</b></div>`:""}
        <div class="stat"><span class="muted">Score</span><b>${s.percent}%</b></div>
      </div>
      <p class="lock-hint">
        ${l?`Submitted${t.submittedAt?` at ${qi(t.submittedAt)}`:""}.${(s.missedHabits||0)+(s.missedTasks||0)>0?` ${(s.missedHabits||0)+(s.missedTasks||0)} missed (${s.missedHabits||0} habits, ${s.missedTasks||0} tasks) — unchecked items count as missed.`:" Nothing missed — all done."} Unlock in Settings to edit.`:`Auto-locks at ${e.lockTime}. Submit when the day is done. Unchecked items will count as missed once locked.`}
      </p>
      ${l?'<button class="ghost-btn full" data-action="goto-settings">Unlock in Settings</button>':'<button class="primary-btn full" data-action="submit-day">Submit and lock report</button>'}
      <div class="export-row">
        <span class="muted">Export:</span>
        <button class="ghost-btn compact" data-action="open-export">Excel / JSON / PDF</button>
      </div>
    </section>

    ${Ji(s)}

    <section class="section">
      <div class="section-head">
        <h2>Habits</h2>
        <div class="head-actions">
          ${Qa("habit",e.habitSort||"default")}
          ${oa()}
          <span class="points">+${s.habitScore}${a&&s.consciousScore?` +${s.consciousScore}🧠`:""} pts</span>
        </div>
      </div>
      ${["default","custom"].includes(e.habitSort||"default")&&i.length>1?'<p class="muted tight">Hold the grip button on a card, then drag it to a new spot.</p>':""}
      <div class="list">
        ${i.length?i.map(c=>{const f=d.habitRating(v,c.id),b=f>0,p=!b&&l,k=d.habitStreak(c.id,v),A=a&&Number(c.consciousPoints)||0;return`
                    <article class="item-card ${b?"done":""} ${p?"missed":""} ${l?"is-locked":""}" style="border-left:3px solid ${j(c.category)}" data-sortable="habit" data-id="${c.id}">
                      <button class="check" data-action="toggle-habit" data-id="${c.id}" ${l?"disabled":""}>✓</button>
                      <div class="item-body">
                        <div class="item-title">${m(c.name)} ${p?'<span class="missed-badge">Missed</span>':""}</div>
                        <div class="item-meta">${At(c.category)} ${c.pin?Nt(c.pin):"Not pinned"} · ${f?`${f}/5 ${Ae(f)}`:l?"Missed":"Not rated"}</div>
                        ${c.description?`<p class="item-desc">${m(c.description)}</p>`:""}
                        ${a?`<div class="item-meta">${Ee(k)} ${Ln(A)}</div>`:`<div class="item-meta">${Ee(k)}</div>`}
                        ${Pe(d.habitForwardedTo(v,c.id))}
                        ${Fn(d.habitReplacedFrom(v,c.id))}
                        ${ct(c.tags)}
                        ${En(c.id,f,l)}
                      </div>
                      <div class="item-side">
                        <div class="points">+${c.points}${A?` +${A}🧠`:""}</div>
                      </div>
                      <div class="item-actions">
                        <button class="drag-handle" aria-label="Hold and drag to reorder" title="Hold and drag to reorder" ${l?"disabled":""}>${L("grip")}</button>
                        <div class="mini-actions">
                          ${K?`<button class="mini-btn on" data-action="open-edit-habit" data-id="${c.id}" ${l?"disabled":""}>Edit</button>`:""}
                          ${Rn(c.id,l)}
                          <button class="mini-btn ${c.pin?"on":""}" data-action="open-pin-habit" data-id="${c.id}" ${l?"disabled":""} title="Pin habit">${L("pin")}</button>
                          <button class="mini-btn" data-action="archive-habit" data-id="${c.id}" ${l?"disabled":""} title="Archive habit" aria-label="Archive habit">${L("archive")}</button>
                        </div>
                      </div>
                    </article>
                  `}).join(""):'<div class="empty">No habits for this day. Tap + to add one.</div>'}
      </div>
      ${Vi(l)}
    </section>

    <section class="section">
      <div class="section-head">
        <h2>Tasks</h2>
        <div class="head-actions">
          ${Qa("task",e.taskSort||"default")}
          ${oa()}
          <span class="points">+${s.taskScore} pts</span>
        </div>
      </div>
      ${["default","custom"].includes(e.taskSort||"default")&&n.length>1?'<p class="muted tight">Hold the grip button on a card, then drag it to a new spot.</p>':""}
      <div class="list">
        ${n.length?n.map(c=>{const f=!!c.sourcePinId,b=f?d.findPinnedTask(c.sourcePinId):null,p=Math.max(0,Math.min(5,Number(c.rating)||0)),k=!c.done&&l;return`
                    <article class="item-card ${c.done?"done":""} ${k?"missed":""} ${l?"is-locked":""}" style="border-left:3px solid ${j(c.category)}" data-sortable="task" data-id="${c.id}">
                      <button class="check" data-action="toggle-task" data-id="${c.id}" ${l?"disabled":""}>✓</button>
                      <div class="item-body">
                        <div class="item-title">${m(c.title)} ${k?'<span class="missed-badge">Missed</span>':""}</div>
                        <div class="item-meta">${At(c.category)} ${b?Nt(b.pin):"One-time task"} · ${c.done?"Done":l?"Missed":"Pending"} · ${p?`${p}/5 ${Ae(p)}`:"No rating"}</div>
                        ${c.description?`<p class="item-desc">${m(c.description)}</p>`:""}
                        ${Hn(c.forwardedFrom)}
                        ${Pe(c.forwardedTo)}
                        ${ct(c.tags)}
                        ${c.image?'<span class="task-img-badge">📷 Photo attached</span>':""}
                        ${Nn(c)}
                        ${Pn(c.id,p,l)}
                      </div>
                      <div class="item-side">
                        <div class="points">+${c.points}</div>
                      </div>
                      <div class="item-actions">
                        <button class="drag-handle" aria-label="Hold and drag to reorder" title="Hold and drag to reorder" ${l?"disabled":""}>${L("grip")}</button>
                        <div class="mini-actions">
                          ${K?`<button class="mini-btn on" data-action="open-edit-task" data-id="${c.id}" ${l?"disabled":""}>Edit</button>`:""}
                          <button class="mini-btn" data-action="open-forward-task" data-id="${c.id}" ${l?"disabled":""} title="Forward task to another day">${L("forward")}</button>
                          <button class="mini-btn ${f?"on":""}" data-action="open-pin-task" data-id="${c.id}" ${l?"disabled":""} title="Pin task">${L("pin")}</button>
                          <button class="mini-btn" data-action="archive-task" data-id="${c.id}" ${l?"disabled":""} title="Archive task" aria-label="Archive task">${L("archive")}</button>
                          ${K?`<button class="mini-btn danger" data-action="remove-task" data-id="${c.id}" ${l?"disabled":""} title="Delete task" aria-label="Delete task">${L("trash")}</button>`:""}
                        </div>
                      </div>
                    </article>
                  `}).join(""):'<div class="empty">No tasks yet. Tap + to add one.</div>'}
      </div>
    </section>

    <section class="section">
      <div class="section-head"><h2>Day note</h2></div>
      ${l?"":`
        <div class="note-toolbar">
          <button type="button" class="ghost-btn compact" data-action="note-bullets" title="Bullet list (select lines or whole note)">• Bullets</button>
          <button type="button" class="ghost-btn compact" data-action="note-numbered" title="Numbered list (select lines or whole note)">1. Numbered</button>
        </div>
      `}
      <textarea id="day-note" placeholder="How did today go? Tip: use • Bullets for lists." ${l?"disabled":""}>${m(t.note)}</textarea>
    </section>

    ${Ki()}
  `}function Ki(){const t=d.getArchivedHabits(),e=d.getArchivedTasks(),a=t.length+e.length,i=[...e.map(n=>`
      <article class="manage-card archived" style="border-left:4px solid ${j(n.category)}">
        <div class="section-head">
          <div>
            <div class="item-title">${m(n.title)} <span class="archive-kind">Task</span></div>
            <div class="item-meta">${At(n.category)} · +${n.points} pts${n.fromDate?` · from ${m(n.fromDate)}`:""}${n.originDate&&n.originDate!==n.fromDate?` · created ${m(n.originDate)}`:""} · ${sa(n.archivedAt)}</div>
            ${n.description?`<p class="item-desc">${m(n.description)}</p>`:""}
            ${ct(n.tags)}
          </div>
          <div class="mini-actions">
            <button class="mini-btn on" data-action="restore-task" data-id="${n.id}" title="Restore task to the selected day" aria-label="Restore task">${L("undo")}</button>
            ${K?`<button class="mini-btn danger" data-action="delete-archived-task" data-id="${n.id}" title="Delete permanently" aria-label="Delete permanently">${L("trash")}</button>`:""}
          </div>
        </div>
      </article>
    `),...t.map(n=>`
      <article class="manage-card archived" style="border-left:4px solid ${j(n.category)}">
        <div class="section-head">
          <div>
            <div class="item-title">${m(n.name)} <span class="archive-kind">Habit</span></div>
            <div class="item-meta">${At(n.category)} · +${n.points} pts${n.pin?` · ${Nt(n.pin)}`:" · Pin ended"} · ${sa(n.archivedAt)}</div>
            ${n.description?`<p class="item-desc">${m(n.description)}</p>`:""}
            ${ct(n.tags)}
          </div>
          <div class="mini-actions">
            <button class="mini-btn on" data-action="restore-habit" data-id="${n.id}" title="Restore habit" aria-label="Restore habit">${L("undo")}</button>
            <button class="mini-btn danger" data-action="delete-archived-habit" data-id="${n.id}" title="Delete permanently" aria-label="Delete permanently">${L("trash")}</button>
          </div>
        </div>
      </article>
    `)];return`
    <section class="section archive-section">
      <button type="button" class="archive-head" data-action="toggle-archive" aria-expanded="${St}">
        <span class="archive-title">${L("archive")} Archive</span>
        <span class="archive-count">${a}</span>
        <span class="archive-chevron" aria-hidden="true">${St?"▾":"▸"}</span>
      </button>
      ${St?`<div class="archive-list">${a?i.join(""):'<div class="empty">Nothing archived yet. Use the archive button on a habit or task to set it aside here.</div>'}</div>`:""}
    </section>
  `}function be(t){return t==="short"?"#short":t==="medium"?"#medium":"#long"}function ts(){const t=d.getProfile(),e=!!t.locked,a=e?"disabled":"",i=Array.isArray(t.whoAmI)?t.whoAmI:[],n=Array.isArray(t.lifeAreas)?t.lifeAreas:[],s=Array.isArray(t.pGoals)?t.pGoals:[],r=Array.isArray(t.quotes)?t.quotes:[],o=d.profileGoalDurations();o[it].includes(Mt)||(Mt=o[it][0]);const l=y=>s.filter(C=>C.term===y).length,c=(me==="all"?s:s.filter(y=>y.term===me)).slice().sort((y,C)=>String(y.createdAt).localeCompare(String(C.createdAt))),f=r.slice().sort((y,C)=>!!y.fav!=!!C.fav?y.fav?-1:1:String(C.createdAt).localeCompare(String(y.createdAt))),b=f.slice(0,3),p=f.slice(3),k=String(t.name||"?").trim().slice(0,1).toUpperCase()||"?",S=String(t.ideas||"").split(`
`).map(y=>y.replace(/^\s*(?:•|-|\*)\s+/,"").trim()).filter(Boolean).length;return`
    <div class="topbar">
      <div>
        <p class="kicker">Profile</p>
        <h1>${m(t.name)||"My profile"}</h1>
      </div>
      <div class="date-nav">
        ${e?'<span class="lock-badge">🔒 Locked</span>':'<span class="open-badge">Open</span>'}
        <button class="ghost-btn compact" data-action="${e?"unlock-profile":"lock-profile"}">${e?"Unlock":"Lock"}</button>
      </div>
    </div>

    ${e?'<div class="profile-lock-banner">🔒 Profile is locked — read only. Tap <b>Unlock</b> to edit.</div>':'<p class="muted tight" style="margin-bottom:14px">Everything here saves automatically on this device and is included in backups. Tap <b>Lock</b> when your profile is final.</p>'}

    <section class="score-hero profile-hero">
      <div class="profile-hero-row">
        <div class="profile-avatar">${m(k)}</div>
        <div style="flex:1;min-width:0">
          <div class="item-title" style="font-size:18px">${m(t.name)||"Your name"}</div>
          <div class="item-meta">${i.length?`${i.length} identities`:"No identities yet"} · ${n.length} life areas · ${s.length} goals · ${r.length} quotes</div>
          ${t.wantToBe?`<p class="item-desc" style="margin-top:6px">“${m(t.wantToBe.slice(0,140))}${t.wantToBe.length>140?"…":""}”</p>`:""}
        </div>
      </div>
    </section>

    <section class="manage-card" style="margin-bottom:10px">
      <h2>Identity</h2>
      <p class="muted tight">Your display name and who you want to be.</p>
      <label>Name
        <input data-profile="name" maxlength="80" value="${m(t.name)}" placeholder="Your name…" ${a} />
      </label>
      <label>Want to be
        <textarea data-profile="wantToBe" maxlength="1000" placeholder="The person I want to be…" style="min-height:76px" ${a}>${m(t.wantToBe)}</textarea>
      </label>
    </section>

    <section class="manage-card" style="margin-bottom:10px">
      <div class="section-head">
        <div>
          <h2>Who I am</h2>
          <p class="muted tight">A list — reorder with ↑ ↓.</p>
        </div>
        <span class="item-meta">${i.length}/50</span>
      </div>
      ${e?"":`
        <div style="display:flex;gap:8px;margin-bottom:10px">
          <input id="new-whoami" maxlength="120" placeholder="e.g. A disciplined father…" style="flex:1;min-width:0" />
          <button class="primary-btn compact-btn" data-action="add-whoami">Add</button>
        </div>
      `}
      <div class="habit-manage">
        ${i.length?i.map((y,C)=>`
          <article class="manage-card whoami-row">
            <span class="whoami-num">${C+1}</span>
            <input class="whoami-input" data-whoami="${y.id}" maxlength="120" value="${m(y.text)}" ${a} aria-label="Who I am ${C+1}" />
            ${e?"":`
              <div class="mini-actions">
                <button class="mini-btn" data-action="move-whoami" data-id="${y.id}" data-dir="-1" ${C===0?"disabled":""} title="Move up">↑</button>
                <button class="mini-btn" data-action="move-whoami" data-id="${y.id}" data-dir="1" ${C===i.length-1?"disabled":""} title="Move down">↓</button>
                <button class="mini-btn" data-action="remove-whoami" data-id="${y.id}" title="Remove">✕</button>
              </div>
            `}
          </article>
        `).join(""):'<div class="empty">Empty — add the roles and identities that define you.</div>'}
      </div>
    </section>

    <section class="manage-card" style="margin-bottom:10px">
      <div class="section-head">
        <div>
          <h2>Life Areas</h2>
          <p class="muted tight">Cards — tap one to open and describe it. Reorder with ↑ ↓.</p>
        </div>
        <span class="item-meta">${n.length}/20</span>
      </div>
      ${e?"":`
        <div style="display:flex;gap:8px;margin-bottom:10px">
          <input id="new-lifearea" maxlength="60" placeholder="e.g. Health, Family, Career…" style="flex:1;min-width:0" />
          <button class="primary-btn compact-btn" data-action="add-lifearea">Add</button>
        </div>
      `}
      ${n.length?`
        <div class="life-grid">
          ${n.map((y,C)=>{const ae=Dt===y.id;return`
              <article class="life-card ${ae?"open":""}">
                <div class="life-head">
                  <button type="button" class="life-toggle" data-action="toggle-lifearea" data-id="${y.id}" aria-expanded="${ae?"true":"false"}">
                    <b>${m(y.title)}</b>
                    <span>${ae?"▾":"▸"}</span>
                  </button>
                  ${e?"":`
                    <div class="mini-actions">
                      <button class="mini-btn" data-action="move-lifearea" data-id="${y.id}" data-dir="-1" ${C===0?"disabled":""} title="Move up">↑</button>
                      <button class="mini-btn" data-action="move-lifearea" data-id="${y.id}" data-dir="1" ${C===n.length-1?"disabled":""} title="Move down">↓</button>
                    </div>
                  `}
                </div>
                ${ae?`
                  <div class="life-body">
                    ${e?y.description?`<p class="item-desc">${m(y.description)}</p>`:'<p class="item-meta">No description yet.</p>':`
                      <label>Title
                        <input data-lifearea-title="${y.id}" maxlength="60" value="${m(y.title)}" />
                      </label>
                      <label>Description
                        <textarea data-lifearea-desc="${y.id}" maxlength="1000" placeholder="What does this area mean to you? What is going well?" style="min-height:70px">${m(y.description)}</textarea>
                      </label>
                      <button class="ghost-btn compact danger" data-action="remove-lifearea" data-id="${y.id}">Remove area</button>
                    `}
                  </div>
                `:y.description?`<p class="item-desc life-preview">${m(y.description.slice(0,90))}${y.description.length>90?"…":""}</p>`:""}
              </article>
            `}).join("")}
        </div>
      `:'<div class="empty">No life areas yet — add Health, Family, Career, Faith…</div>'}
    </section>

    <div class="profile-duo">
      <section class="manage-card">
        <h2>My Vision</h2>
        <p class="muted tight">The future you are working toward.</p>
        <textarea data-profile="vision" maxlength="1000" placeholder="Describe your vision…" style="min-height:110px" ${a}>${m(t.vision)}</textarea>
      </section>
      <section class="manage-card">
        <h2>Core &amp; Personal Values</h2>
        <p class="muted tight">The principles you live by — one per line.</p>
        ${e?t.values.trim()?`<div class="values-list">${In(t.values)}</div>`:'<p class="item-meta">No values yet.</p>':`
            <div class="note-toolbar">
              <button type="button" class="ghost-btn compact" data-action="values-bullets" title="Bullet list (select lines or all values)">• Bullets</button>
              <button type="button" class="ghost-btn compact" data-action="values-numbered" title="Numbered list (select lines or all values)">1. Numbered</button>
            </div>
            <textarea id="profile-values" data-profile="values" maxlength="1000" placeholder="e.g.&#10;• Honesty&#10;• Discipline&#10;• Mercy" style="min-height:110px">${m(t.values)}</textarea>
          `}
      </section>
    </div>

    <section class="manage-card" style="margin-bottom:10px;margin-top:10px">
      <div class="section-head">
        <div>
          <h2>Personal Ideas</h2>
          <p class="muted tight">Write down ideas, one per line — they show as bullet points. Tap a bullet to delete it.</p>
        </div>
        <span class="item-meta">${S}</span>
      </div>
      ${e?S?Ya(t.ideas,!0):'<p class="item-meta">No ideas yet.</p>':`
          <div class="form" style="margin-bottom:10px">
            <label>New idea
              <input id="new-idea" maxlength="200" placeholder="e.g. Build a habit tracker app" />
            </label>
            <div style="display:flex;gap:8px">
              <button class="primary-btn compact-btn" data-action="add-idea">Add idea</button>
            </div>
          </div>
          ${S?`${Ya(t.ideas,!1)}
               <p class="item-meta">Edit the text below — it saves itself.</p>
               <textarea data-profile="ideas" maxlength="4000" placeholder="• Idea one&#10;• Idea two" style="min-height:110px">${m(t.ideas)}</textarea>`:'<p class="item-meta">Empty — add your first idea above.</p>'}
        `}
    </section>

    <section class="manage-card" style="margin-bottom:10px;margin-top:10px">
      <div class="section-head">
        <div>
          <h2>Goals</h2>
          <p class="muted tight">One goal, one hashtag: <b>#short</b> = weeks · <b>#medium</b> = 1–3 months · <b>#long</b> = a year or more.</p>
        </div>
      </div>
      ${e?"":`
        <div class="form" style="margin-bottom:10px">
          <label>Goal
            <input id="new-pgoal" maxlength="200" placeholder="e.g. Read 12 books…" />
          </label>
          <div>
            <p class="item-meta">Hashtag it</p>
            <div class="chip-row">
              ${["short","medium","long"].map(y=>`<button type="button" class="chip hashtag-${y} ${it===y?"on":""}" data-action="set-pgoal-term" data-term="${y}">${be(y)}</button>`).join("")}
            </div>
          </div>
          <div class="row-2">
            <label>Timeframe
              <select id="new-pgoal-duration">
                ${o[it].map(y=>`<option value="${m(y)}" ${Mt===y?"selected":""}>${m(y)}</option>`).join("")}
              </select>
            </label>
            <label style="justify-content:flex-end">&nbsp;
              <button class="primary-btn compact-btn" data-action="add-pgoal">Add goal</button>
            </label>
          </div>
          <p class="item-meta">${it==="short"?"Short term → pick a week (1–4 weeks).":it==="medium"?"Medium term → pick a month up to 3 months.":"Long term → a year or more."}</p>
        </div>
      `}
      <div class="chip-row" style="margin-bottom:10px">
        ${[["all",`All (${s.length})`],["short",`#short (${l("short")})`],["medium",`#medium (${l("medium")})`],["long",`#long (${l("long")})`]].map(([y,C])=>`<button type="button" class="chip ${me===y?"on":""}" data-action="set-pgoal-filter" data-filter="${y}">${C}</button>`).join("")}
      </div>
      <div class="habit-manage">
        ${c.length?c.map(y=>`
          <article class="manage-card pgoal-card term-${y.term}">
            <div class="pgoal-top">
              <span class="hashtag hashtag-${y.term}">${be(y.term)}</span>
              <span class="duration-pill">⏳ ${m(y.duration)}</span>
              ${e?"":`<button class="mini-btn" data-action="remove-pgoal" data-id="${y.id}" title="Remove goal">✕</button>`}
            </div>
            ${e?`<div class="item-title" style="margin-top:6px">${m(y.text)}</div>`:`
                <input data-pgoal-text="${y.id}" maxlength="200" value="${m(y.text)}" style="margin-top:8px" aria-label="Goal text" />
                <div class="row-2" style="margin-top:8px">
                  <select data-pgoal-term="${y.id}" aria-label="Goal term">
                    ${["short","medium","long"].map(C=>`<option value="${C}" ${y.term===C?"selected":""}>${be(C)}</option>`).join("")}
                  </select>
                  <select data-pgoal-duration="${y.id}" aria-label="Goal duration">
                    ${o[y.term].map(C=>`<option value="${m(C)}" ${y.duration===C?"selected":""}>${m(C)}</option>`).join("")}
                  </select>
                </div>
              `}
          </article>
        `).join(""):'<div class="empty">No goals here yet — add your first one above.</div>'}
      </div>
    </section>

    <section class="manage-card" style="margin-bottom:10px">
      <div class="section-head">
        <div>
          <h2>Quotes</h2>
          <p class="muted tight">Star your best 3 favourites — tap below to see the rest.</p>
        </div>
        <span class="item-meta">★ ${r.filter(y=>y.fav).length} · ${r.length} total</span>
      </div>
      ${e?"":`
        <div class="form" style="margin-bottom:10px">
          <label>Quote
            <textarea id="new-quote" maxlength="500" placeholder="Write a quote you live by…" style="min-height:64px"></textarea>
          </label>
          <div style="display:flex;gap:8px">
            <input id="new-quote-author" maxlength="80" placeholder="Author (optional)" style="flex:1;min-width:0" />
            <button class="primary-btn compact-btn" data-action="add-quote">Add</button>
          </div>
        </div>
      `}
      ${f.length?`
        <div class="quote-fav-head"><span class="item-title">★ Top 3 favourites</span></div>
        <div class="habit-manage" style="margin-bottom:8px">
          ${b.map(y=>Xa(y,e)).join("")}
        </div>
        ${p.length?`
          <button class="ghost-btn compact full" data-action="toggle-quotes">${zt?"Show less ▴":`More (${p.length}) — see the rest ▾`}</button>
          ${zt?`<div class="habit-manage" style="margin-top:8px">${p.map(y=>Xa(y,e)).join("")}</div>`:""}
        `:zt&&!p.length?'<p class="item-meta">No more quotes — that is all of them.</p>':""}
      `:'<div class="empty">No quotes yet — add the words that move you.</div>'}
    </section>
  `}function Xa(t,e){return`
    <article class="manage-card quote-card ${t.fav?"is-fav":""}">
      <p class="quote-text">“${m(t.text)}”</p>
      ${t.author?`<p class="item-meta">— ${m(t.author)}</p>`:""}
      <div class="quote-foot">
        ${e?`<span class="item-meta">${t.fav?"★ Favourite":""}</span>`:`
            <button class="mini-btn ${t.fav?"on":""}" data-action="toggle-quote-fav" data-id="${t.id}" title="Toggle favourite">★</button>
            <button class="mini-btn" data-action="remove-quote" data-id="${t.id}" title="Remove quote">✕</button>
          `}
      </div>
    </article>
  `}function es(){document.querySelectorAll("[data-profile]").forEach(t=>{t.addEventListener("input",()=>{d.setProfileField(t.dataset.profile,t.value)||h()})}),document.querySelectorAll("[data-lifearea-title]").forEach(t=>{t.addEventListener("change",()=>{d.updateLifeArea(t.dataset.lifeareaTitle,{title:t.value}),h()})}),document.querySelectorAll("[data-lifearea-desc]").forEach(t=>{t.addEventListener("input",()=>{d.updateLifeArea(t.dataset.lifeareaDesc,{description:t.value})})}),document.querySelectorAll("[data-pgoal-text]").forEach(t=>{t.addEventListener("change",()=>{d.updateProfileGoal(t.dataset.pgoalText,{text:t.value}),h()})}),document.querySelectorAll("[data-pgoal-term]").forEach(t=>{t.addEventListener("change",()=>{d.updateProfileGoal(t.dataset.pgoalTerm,{term:t.value}),h()})}),document.querySelectorAll("[data-pgoal-duration]").forEach(t=>{t.addEventListener("change",()=>{d.updateProfileGoal(t.dataset.pgoalDuration,{duration:t.value}),h()})})}function as(){const t=On(v,st*7),e=d.week(new Date(`${t}T00:00:00`)),a=e.reduce((s,r)=>s+r.earned,0),i=Math.round(a/7),n=st===0?"This week":st===-1?"1 week back":`${-st} weeks back`;return`
    <section class="section">
      <div class="section-head">
        <h2>Weekly score</h2>
        <div class="date-nav">
          <button class="icon-btn" data-action="week-nav" data-dir="-1" aria-label="Previous week">‹</button>
          <button class="icon-btn" data-action="week-nav" data-dir="1" aria-label="Next week" ${st>=0?"disabled":""}>›</button>
        </div>
      </div>
      <section class="score-hero">
        <div class="score-row">
          <div>
            <div class="score-value">${a}</div>
            <div class="score-unit">points · ${n}</div>
          </div>
          <div class="grade-pill">Avg ${i} pts</div>
        </div>
        <p class="lock-hint week-range">Week starting <b>${B(e[0].date)}</b> · ${e[0].label} – ${e[6].label}, ${B(e[6].date)}</p>
        <div class="week-days">
          ${e.map(s=>`
                <button class="day-cell ${s.date===v?"active":""} ${s.earned>0?"done":""}" data-action="pick-date" data-date="${s.date}" title="${m(s.date)}: ${s.earned} pts">
                  <span>${s.label.slice(0,2)}</span>
                  <b>${s.earned}</b>
                  ${s.locked?'<i class="dot-lock"></i>':""}
                </button>
              `).join("")}
        </div>
      </section>
    </section>
  `}function ns(){const t=De||F(v),e=Fe(t),a=d.todayKey();return`
    <section class="section">
      <div class="section-head">
        <h2>Reports calendar</h2>
        <div class="date-nav">
          <button class="icon-btn" data-action="history-cal-nav" data-dir="-1" aria-label="Previous month">‹</button>
          <button class="icon-btn" data-action="history-cal-nav" data-dir="1" aria-label="Next month">›</button>
        </div>
      </div>
      <div class="pin-cal">
        <div class="pin-cal-head"><b>${Ft(t)}</b></div>
        <div class="pin-cal-grid pin-cal-week">
          ${He().map(i=>`<span>${i.label.slice(0,1)}</span>`).join("")}
        </div>
        <div class="pin-cal-grid">
          ${e.map(i=>{if(!i)return"<span></span>";const n=d.scoreFor(i),s=i===v?"on-selected":n.percent>=100?"on-perfect":n.earned>0?"on":"",r=n.locked?'<i class="dot-lock"></i>':"";return`<button type="button" class="pin-cal-day hist-cal-day ${s} ${i===a?"is-today":""}" data-action="pick-date" data-date="${i}" title="${m(i)}: ${n.earned}/${n.max} pts (${n.percent}%)"><b>${Number(i.slice(8,10))}</b><span>${n.earned}</span>${r}</button>`}).join("")}
        </div>
      </div>
    </section>
  `}function is(t){const e=new Map((t||[]).map(s=>[s.date,s])),a=Ce||F(v),i=Fe(a),n=d.todayKey();return`
    <div class="pin-cal">
      <div class="pin-cal-head"><b>${Ft(a)}</b><span class="item-meta">${e.size} locked</span></div>
      <div class="pin-cal-grid pin-cal-week">
        ${He().map(s=>`<span>${s.label.slice(0,1)}</span>`).join("")}
      </div>
      <div class="pin-cal-grid">
        ${i.map(s=>{if(!s)return"<span></span>";const r=e.get(s),o=!!r,l=O.includes(s)?"on-selected":o?"on-locked":"on-open",c=d.scoreFor(s),f=r?r.earned:c.earned;return`<button type="button" class="pin-cal-day hist-cal-day ${l} ${s===n?"is-today":""}" data-action="toggle-locked-day" data-date="${s}" title="${m(s)}: ${o?"Locked":"Open"} — ${f} pts"><b>${Number(s.slice(8,10))}</b><span>${f}</span></button>`}).join("")}
      </div>
    </div>
  `}function ss(){const t=ia||F(v),e=Fe(t),a=d.todayKey(),i=new Set(d.notedDays(t)),s=Ct&&Ct.startsWith(`${t}-`)&&i.has(Ct)?Ct:[...i].sort().pop()||null;Ct=s;const r=s?d.noteFor(s):"";return`
    <section class="section notes-cal">
      <div class="section-head">
        <div>
          <h2>Noted days</h2>
          <p class="item-meta">Tap a marked day to read its note.</p>
        </div>
        <div class="date-nav">
          <button class="icon-btn" data-action="notes-cal-nav" data-dir="-1" aria-label="Previous month">‹</button>
          <button class="icon-btn" data-action="notes-cal-nav" data-dir="1" aria-label="Next month">›</button>
        </div>
      </div>
      <div class="pin-cal">
        <div class="pin-cal-head"><b>${Ft(t)}</b><span class="item-meta">${i.size} noted</span></div>
        <div class="pin-cal-grid pin-cal-week">
          ${He().map(o=>`<span>${o.label.slice(0,1)}</span>`).join("")}
        </div>
        <div class="pin-cal-grid">
          ${e.map(o=>{if(!o)return"<span></span>";const l=i.has(o),c=o===s?"on-selected":l?"on-noted":"",f=l?`${o}: note`:`${o}: no note`;return`<button type="button" class="pin-cal-day notes-cal-day ${c} ${o===a?"is-today":""}" data-action="show-day-note" data-date="${o}" ${l?"":"disabled"} title="${m(f)}"><b>${Number(o.slice(8,10))}</b><span class="note-dot ${l?"":"off"}">●</span></button>`}).join("")}
        </div>
      </div>
      <div class="notes-cal-note">
        ${s?`
              <div class="notes-cal-note-head">
                <span class="item-title">${B(s)}</span>
                <span class="badge">Note</span>
              </div>
              <p class="notes-cal-note-body">${m(r)}</p>
            `:`<p class="item-meta">No notes in ${Ft(t)} yet — write one on a day’s report and it will appear here.</p>`}
      </div>
    </section>
  `}function os(){return`
    <section class="manage-card export-card">
      <div class="section-head">
        <div>
          <div class="item-title">Select &amp; export</div>
          <div class="item-meta">Pick a day, week, month or year, then a format.</div>
        </div>
      </div>
      <div class="chip-row" style="margin-bottom:10px">
        ${["day","week","month","year"].map(t=>`<button type="button" class="chip ${U===t?"on":""}" data-action="set-histexp-range" data-range="${t}">${t[0].toUpperCase()}${t.slice(1)}</button>`).join("")}
      </div>
      ${U==="day"||U==="week"?`
        <label>Which ${U==="day"?"day":"week (pick any day in it)"}
          <input id="histexp-date" type="date" value="${v}" />
        </label>
      `:""}
      ${U==="month"?`
        <label>Which month
          <input id="histexp-month" type="month" value="${v.slice(0,7)}" />
        </label>
      `:""}
      ${U==="year"?`
        <label>Which year
          <input id="histexp-year" type="number" min="2000" max="2100" value="${v.slice(0,4)}" />
        </label>
      `:""}
      <div class="export-grid" style="margin-top:10px">
        <button class="choose-card" data-action="histexp-do" data-format="csv"><b>Excel (CSV)</b><span>Opens in Excel / Sheets</span></button>
        <button class="choose-card" data-action="histexp-do" data-format="json"><b>JSON</b><span>Raw data backup</span></button>
        <button class="choose-card" data-action="histexp-do" data-format="pdf"><b>PDF</b><span>Print / save as PDF</span></button>
      </div>
    </section>
  `}function rs(){const t=d.week(new Date(`${v}T00:00:00`)),e=d.todayKey(),a=`${B(t[0].date)} – ${B(t[6].date)}`,i=t.reduce((r,o)=>r+(o.earned||0),0),n=t.reduce((r,o)=>r+(o.max||0),0),s=t.filter(r=>r.hasRecord).length;return`
    <div class="topbar">
      <div>
        <p class="kicker">Archive</p>
        <h1>Past reports</h1>
      </div>
      <button class="ghost-btn compact" data-action="open-export">Export</button>
    </div>
    ${ns()}
    ${as()}
    ${os()}
    <section class="section">
      <div class="section-head">
        <h2>Week</h2>
        <span class="item-meta">${a}</span>
      </div>
      <p class="item-meta">${s} of 7 days reported · ${i} of ${n} pts</p>
      <div class="history-list">
        ${t.map(r=>{const o=!r.hasRecord,l=(r.missedHabits||0)+(r.missedTasks||0),c=o?"No report":`${r.locked?"Locked":"Open"} · ${Dn(r.percent)} · ${r.earned}/${r.max} pts (${r.percent}%)${r.locked&&l>0?` · ❌ ${l} missed`:""}`;return`
              <article class="history-card ${o?"is-empty":""} ${r.date===e?"is-today":""} ${r.date===v?"is-selected":""}">
                <div class="section-head">
                  <div>
                    <div class="item-title">${m(r.label)} ${B(r.date)}</div>
                    <div class="item-meta">${m(c)}</div>
                  </div>
                  <button class="ghost-btn compact" data-action="pick-date" data-date="${r.date}">${o?"Add":"Open"}</button>
                </div>
                <div class="bar"><span style="width:${r.percent}%"></span></div>
                ${r.note?zi(r.note):`<p class="item-meta">${o?"Nothing recorded this day.":"No note."}</p>`}
              </article>
            `}).join("")}
      </div>
    </section>
  `}function On(t,e){const a=new Date(`${t}T00:00:00`);return a.setDate(a.getDate()+e),d.todayKey(a)}function ds(){return Z==="month"?`${Et(F(v),lt)}-15`:Z==="year"?`${Number(v.slice(0,4))+lt}-06-15`:On(v,lt*7)}function ls(t){const[e,a]=d.resolveRange(Z,t);return Z==="week"?`${B(e)} – ${B(a)}`:Z==="month"?Ft(e.slice(0,7)):e.slice(0,4)}function cs(){var c;const t=ds(),e=d.categoryChart(Z,t);at!=="all"&&!e.cats.some(f=>f.id===at)&&(at="all");const a=at==="all"?e.cats:e.cats.filter(f=>f.id===at),i=Math.max(1,...e.labels.map((f,b)=>a.reduce((p,k)=>p+(e.perCat[k.id]?e.perCat[k.id][b]:0),0))),n=a.reduce((f,b)=>f+(e.totals[b.id]||0),0),s=at==="all"?"All categories":((c=e.cats.find(f=>f.id===at))==null?void 0:c.label)||"",r=lt===0?Z==="week"?"This week":Z==="month"?"This month":"This year":ls(t),o=e.labels.map((f,b)=>{const p=a.reduce((A,S)=>A+(e.perCat[S.id]?e.perCat[S.id][b]:0),0),k=a.map(A=>({cat:A,value:e.perCat[A.id]?e.perCat[A.id][b]:0})).filter(A=>A.value>0).map((A,S)=>`<span class="chart-seg" style="height:${Math.max(2,Math.round(A.value/i*100))}%;background:${j(A.cat.id,S)}" title="${m(A.cat.label)}: ${A.value} pts"></span>`).join("");return`
      <div class="chart-col" title="${m(e.titles[b])}: ${p} pts">
        <div class="chart-bar">${k||'<span class="chart-empty"></span>'}</div>
        <span class="chart-x">${m(f)}</span>
      </div>
    `}).join(""),l=a.map((f,b)=>`
      <span class="chart-legend-item"><i style="background:${j(f.id,b)}"></i>${m(f.label)} <b>${e.totals[f.id]||0}</b></span>
    `).join("");return`
    <section class="score-hero">
      <div class="section-head" style="margin-bottom:4px">
        <div>
          <div class="item-title">Progress chart</div>
          <div class="item-meta">${r} · ${n} pts total · ${m(s)}</div>
        </div>
      </div>
      <div class="chart-nav-row">
        <button type="button" class="mini-btn" data-action="chart-nav" data-dir="-1" aria-label="Previous ${Z}">‹</button>
        <div class="chip-row">
          ${["week","month","year"].map(f=>`<button type="button" class="chip ${Z===f?"on":""}" data-action="set-chart-range" data-range="${f}">${f[0].toUpperCase()}${f.slice(1)}</button>`).join("")}
        </div>
        <button type="button" class="mini-btn" data-action="chart-nav" data-dir="1" aria-label="Next ${Z}">›</button>
      </div>
      <div class="chip-row chart-cat-row">
        <button type="button" class="chip chart-cat-chip ${at==="all"?"on":""}" data-action="set-chart-cat" data-cat="all">All categories</button>
        ${e.cats.map((f,b)=>`
            <button type="button" class="chip chart-cat-chip ${at===f.id?"on":""}" data-action="set-chart-cat" data-cat="${f.id}">
              <i style="background:${j(f.id,b)}"></i>${m(f.label)}
            </button>
          `).join("")}
      </div>
      <div class="chart-wrap${e.labels.length>12?" scroll-x":""}">${o}</div>
      <div class="chart-legend">${l}</div>
    </section>
  `}function us(t,e){const{locked:a,showC:i}=e,n=t.habits.map(r=>{const o=d.habitRating(v,r.id),l=!o&&a,c=d.habitStreak(r.id,v),f=i&&Number(r.consciousPoints)||0,b=o>0?f:0,p=Math.round(r.points*o/5)+b,k=r.points+f;return`
        <article class="item-card ${o?"done":""} ${l?"missed":""} ${a?"is-locked":""}" style="border-left:3px solid ${j(r.category)}">
          <button class="check" data-action="toggle-habit" data-id="${r.id}" ${a?"disabled":""}>✓</button>
          <div class="item-body">
            <div class="item-title">${m(r.name)} ${l?'<span class="missed-badge">Missed</span>':""}</div>
            <div class="item-meta">Habit · ${o?`${o}/5 ${Ae(o)}`:a?"Missed":"Not rated"} · ${Ee(c)}${i?` ${Ln(f)}`:""}</div>
            ${r.description?`<p class="item-desc">${m(r.description)}</p>`:""}
            ${Pe(d.habitForwardedTo(v,r.id))}
            ${Fn(d.habitReplacedFrom(v,r.id))}
            ${ct(r.tags)}
            ${En(r.id,o,a)}
          </div>
          <div class="item-side">
            <div class="points">${p}/${k}</div>
            <div class="mini-actions">
              ${K?`<button class="mini-btn on" data-action="open-edit-habit" data-id="${r.id}" ${a?"disabled":""}>Edit</button>`:""}
              ${Rn(r.id,a)}
            </div>
          </div>
        </article>
      `}).join(""),s=t.tasks.map(r=>{const o=Math.max(0,Math.min(5,Number(r.rating)||0)),l=!r.done&&a;return`
        <article class="item-card ${r.done?"done":""} ${l?"missed":""} ${a?"is-locked":""}" style="border-left:3px solid ${j(r.category)}">
          <button class="check" data-action="toggle-task" data-id="${r.id}" ${a?"disabled":""}>✓</button>
          <div class="item-body">
            <div class="item-title">${m(r.title)} ${l?'<span class="missed-badge">Missed</span>':""}</div>
            <div class="item-meta">Task · ${r.done?"Done":a?"Missed":"Pending"} · ${o?`${o}/5 ${Ae(o)}`:"No rating"}${r.description?` · ${m(r.description)}`:""}</div>
            ${Hn(r.forwardedFrom)}
            ${Pe(r.forwardedTo)}
            ${ct(r.tags)}
            ${r.image?'<span class="task-img-badge">📷 Photo attached</span>':""}
            ${Nn(r)}
            ${Pn(r.id,o,a)}
          </div>
          <div class="item-side">
            <div class="points">+${r.points}</div>
            <div class="mini-actions">
              ${K?`<button class="mini-btn on" data-action="open-edit-task" data-id="${r.id}" ${a?"disabled":""}>Edit</button>`:""}
              <button class="mini-btn" data-action="open-forward-task" data-id="${r.id}" ${a?"disabled":""} title="Forward task to another day">${L("forward")}</button>
            </div>
          </div>
        </article>
      `}).join("");return`${n}${s}`}function ps(){d.getDay(v);const t=d.isLocked(v),e=d.consciousEnabled(),a=d.categoryBreakdown(v),i=a.reduce((s,r)=>s+r.earned,0),n=a.reduce((s,r)=>s+r.max,0);return`
    <div class="topbar">
      <div>
        <p class="kicker">Activities</p>
        <h1>By category</h1>
      </div>
      <div class="date-nav">
        ${oa()}
        <button class="icon-btn" data-action="prev-day" aria-label="Previous day">‹</button>
        <button class="icon-btn" data-action="next-day" aria-label="Next day">›</button>
      </div>
    </div>
    <section class="score-hero">
      <div class="score-row">
        <div>
          <div class="score-value">${i}</div>
          <div class="score-unit">of ${n||0} category points</div>
        </div>
        <div class="grade-pill">${B(v)}</div>
      </div>
      <p class="lock-hint">Habits and tasks grouped by category.</p>
    </section>
    ${cs()}
    ${ss()}
    ${a.map(s=>{const r=s.max?Math.round(s.earned/s.max*100):0,o=j(s.id),l=he.has(s.id);return`
          <section class="section">
            <article class="manage-card cat-card cat-${s.id} ${l?"open":""}" style="border-left:4px solid ${o};background:linear-gradient(180deg, ${o}2e, ${o}14 55%, var(--card) 100%)">
              <button type="button" class="cat-activity-head" data-action="toggle-activity-cat" data-id="${s.id}" aria-expanded="${l?"true":"false"}">
                <span class="cat-activity-chev" aria-hidden="true">${l?"▾":"▸"}</span>
                <span class="cat-activity-titles">
                  <span class="item-title">${s.label}</span>
                  <span class="item-meta">${s.completed}/${s.total} done · rating ${s.habitAvg||0}/5</span>
                </span>
                <span class="points">${s.earned}/${s.max} pts</span>
              </button>
              ${l?`
                    <div class="cat-activity-body">
                      <div class="bar"><span style="width:${r}%;background:${o}"></span></div>
                    </div>`:""}
            </article>
            ${l?`
            <div class="list" style="margin-top:10px">
              ${s.habits.length||s.tasks.length?us(s,{locked:t,showC:e}):'<div class="empty">No activities in this category.</div>'}
            </div>
                `:""}
          </section>
        `}).join("")}
  `}function Le(t){return`${t||"second-mind-backup"}-${d.todayKey()}.json`}function fs(){const t=d.getInstalledAt(),e=String(t).slice(0,10),a=new Date(`${e}T00:00:00`),i=new Date(`${d.todayKey()}T00:00:00`),n=Number.isNaN(a.getTime())?1:Math.max(1,Math.round((i-a)/864e5)+1),s=String(Number(e.slice(8,10))).padStart(2,"0"),r=e.slice(5,7),o=e.slice(2,4),l=/^\d{4}-\d{2}-\d{2}$/.test(e)?`${s}/${r}/${o}`:e,c=Math.floor((n-1)/365)+1;return`Using Second Mind since ${l} · day ${n} · year ${c}`}function ms(){const t=d.autoSaveStatus(),e=d.folderStatus();return e==="boot"?"Checking how your data is saved…":t==="both"?"✅ Auto-save on (folder + device)":t==="device"?"✅ Auto-save on (this device)":t==="folder"?"✅ Auto-save on":e==="unsupported"?"⚠️ Browser storage only":"⚠️ Not connected"}function gs(){const t=d.folderStatus(),e=d.autoSaveStatus(),a=d.lastDeviceSavedAt(),i=a?new Date(a).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit",second:"2-digit"}):"not yet";if(t==="boot")return"Checking for a connected data folder…";if(e==="device")return t==="unsupported"?`Saved automatically in this device's private storage — no permission needed, nothing to click · last saved ${i}. Use Export backup for a file you can keep.`:t==="prompt"||t==="denied"?`Auto-saving to this device's private storage (no permission needed) · last saved ${i}. Your folder is waiting for access — tap Allow to write <b>${d.folderFileName()}</b> there too.`:`Auto-saving to this device's private storage (no permission needed) · last saved ${i}.`;if(t==="unset")return"No data folder chosen yet — your data lives in this browser and in the device copy above.";if(t==="prompt")return"Tap Allow access so the app can keep saving to your folder.";if(t==="denied")return"Access was denied — choose the folder again.";if(t==="granted"){const n=d.lastFileSavedAt(),s=n?new Date(n).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit",second:"2-digit"}):"not yet",r=e==="both"?` · device copy ${i}`:"";return`Auto-saving to ${d.folderName()}/${d.folderFileName()} · last saved ${s}${r}`}return"Checking…"}function hs(){const t=d.folderStatus();return!d.getFolderHandle()||t!=="prompt"&&t!=="denied"?"":`
      <div class="reconnect-banner" role="status">
        <span>📁 Your folder needs access again to keep saving <b>${m(d.folderFileName())}</b> there.</span>
        <button type="button" class="primary-btn compact" data-action="grant-folder">Allow</button>
      </div>
    `}function bs(){const t=d.driveStatus();return t==="needs-client"?"Not set up":t==="needs-signin"?"Tap Connect":t==="off"?"Turned off":t==="syncing"?"Syncing…":t==="ok"||t==="ready"?"✅ On":"⚠️ Error"}function ys(){const t=d.driveStatus();if(t==="needs-client")return"Sync is off. Paste a Google OAuth Client ID below (one-time setup, exact steps underneath) and it turns on.";if(t==="off")return"Sync is turned off. Your data is still saved on this device — turn it back on whenever you like.";if(t==="needs-signin")return"Ready — tap Connect once to sign in to Google. After that it syncs by itself.";if(t==="syncing")return"Syncing with Google Drive…";if(t==="ok"||t==="ready"){const e=d.driveLastPushAt();return`Two-way sync on — every save uploads second-mind.json to a private Drive folder, and opening the app takes whichever copy is newer — Drive, your data folder or this browser · last pushed ${e?new Date(e).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}):"not yet"}`}return t==="error"?`Sync hit a problem (${d.driveError()||"network"}) — your data is safe locally and it will retry on the next save.`:"Checking…"}function vs(){const t=d.driveStatus(),e=d.driveConfigured(),a=t==="ok"||t==="ready";return`
      <p class="muted tight"><b>Automatic two-way sync.</b> Sign in once and every save is also uploaded to a hidden Google Drive folder; opening the app pulls whichever copy is newer — Drive, your data folder or this browser. Nothing to press afterwards, and it works across devices.</p>
      <p class="item-meta">${m(ys())}</p>
      ${a?`<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
               <button class="ghost-btn compact" data-action="drive-sync-now">Sync now</button>
               <button class="ghost-btn compact" data-action="drive-disconnect">Turn off sync</button>
             </div>`:`<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
               ${e&&t!=="off"?'<button class="primary-btn" data-action="drive-connect">Connect Google Drive</button>':""}
               ${t==="off"?`<button class="primary-btn" data-action="${e?"drive-connect":"drive-enable"}">${e?"Turn sync back on":"Set up sync"}</button>`:""}
               ${t==="error"?'<button class="ghost-btn compact" data-action="drive-connect">Retry</button>':""}
             </div>`}
      <div class="drive-setup">
        <label for="drive-client-id">OAuth Client ID <span class="item-meta">(from your Google Cloud project)</span></label>
        <input type="text" id="drive-client-id" value="${m(d.driveClientId())}" placeholder="1234567890-abcdefg.apps.googleusercontent.com" autocomplete="off" spellcheck="false" />
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
          <button class="ghost-btn compact" data-action="drive-save-id">Save Client ID</button>
          ${e?'<button class="ghost-btn compact" data-action="drive-clear-id">Clear</button>':""}
        </div>
        <details class="drive-guide">
          <summary>How do I get a Client ID? (step by step)</summary>
          <ol>
            <li>Go to <b>console.cloud.google.com</b> and sign in with the same Google account you want to sync.</li>
            <li>At the top-left, open the project dropdown → <b>New Project</b> → name it <b>Second Mind</b> → <b>Create</b>, then make sure it is selected.</li>
            <li>In the left menu open <b>APIs &amp; Services → Library</b>, search for <b>Google Drive API</b>, open it and press <b>Enable</b>.</li>
            <li>Back in <b>APIs &amp; Services</b>, open <b>OAuth consent screen</b> → <b>External</b> → <b>Create</b>. Fill in the app name (e.g. Second Mind), your email, then save. You can skip the optional scopes/questions pages.</li>
            <li>Still under <b>APIs &amp; Services</b>, open <b>Credentials</b> → <b>Create Credentials → OAuth client ID</b>.</li>
            <li>Application type: <b>Web application</b>. Give it any name.</li>
            <li>Under <b>Authorized JavaScript origins</b> press <b>Add URI</b> and enter exactly the address this app runs on — for the installed app that is <b>${m(typeof location<"u"?location.origin:"http://localhost:5173")}</b>. No redirect URI is needed.</li>
            <li>Press <b>Create</b>, copy the <b>Client ID</b> it shows (it ends in <code>.apps.googleusercontent.com</code>), paste it above and press <b>Save Client ID</b>.</li>
            <li>Press <b>Connect Google Drive</b>, choose your account and allow access. Sync is now on for good.</li>
          </ol>
          <p class="item-meta">Your Client ID is only a public label for the app — it is not a password. The data file lives in Google's per-app <i>app data</i> folder, which never appears in My Drive and cannot collide with your own files.</p>
        </details>
      </div>
    `}async function ks(){const t=await d.chooseDataFolder();if(t.status==="unsupported"){g("Folder access needs Chrome or Edge"),h();return}if(t.cancelled){h();return}if(t.status!=="granted"){g("Couldn't open that folder"),h();return}t.corrupt?g("Folder connected — the old file was unreadable, a copy was saved aside"):t.replaced?g("Folder connected — data loaded from the file"):g("Data folder set — auto-save on"),h(),jt()}async function $s(){await d.forgetDataFolder(),g("Folder unlinked — data stays in the browser"),h(),jt()}async function ws(){const t=await d.grantFolderAccess();if(t.status!=="granted"){g("Access denied"),h();return}t.corrupt?g("Access granted — the old file was unreadable, a copy was saved aside"):t.replaced?g("Access granted — data loaded from the file"):g("Folder access granted — auto-save on"),h(),jt()}async function Ss(){const t=await d.connectDrive();if(t.status==="ok"||t.status==="syncing"){t.replaced?g("Google Drive data loaded — it was newer than this device"):t.corrupt?g("Connected — the Drive copy was unreadable, yours was uploaded instead"):t.seeded?g("Connected — your data was uploaded to Google Drive"):g("Google Drive connected — sync on"),t.replaced&&Rt(),h();return}if(t.status==="needs-client"){g("Save a Client ID first — the steps are in this section"),h();return}g(t.error==="popup_closed"?"Sign-in window was closed — try again":"Could not sign in to Google"),h()}async function As(){g("Syncing with Google Drive…");const t=await d.syncDriveNow();if(t.status==="ok"){t.replaced?(Rt(),g("Google Drive data loaded — it was newer"),h()):t.corrupt?g("The Drive copy was unreadable — yours was uploaded instead"):t.pushed?g("Uploading to Google Drive…"):g("Everything is in sync"),t.replaced||h();return}g("Sync failed — will retry on the next save"),h()}async function xs(){const t=d.exportBackup(),e=Le();if(d.folderStatus()==="granted"&&d.getFolderHandle())try{if((await d.writeFolderFile(e,t)).ok){g("Backup saved to your folder"),jt();return}}catch{}Ot(e,t,"application/json"),g("Backup downloaded")}async function Ts(){return d.listFolderBackups()}async function jt(){const t=document.getElementById("folder-backup-list");if(!t)return;if(d.folderStatus()!=="granted"||!d.getFolderHandle()){t.innerHTML='<button class="ghost-btn compact" data-action="trigger-import">Import from a file instead</button>';return}t.innerHTML='<p class="item-meta">Loading backups…</p>';const e=await Ts();if(!document.getElementById("folder-backup-list"))return;e.length?t.innerHTML=e.map(i=>`
            <div style="display:flex;gap:8px;align-items:center;margin-bottom:6px">
              <span class="item-meta" style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${m(i.name)}</span>
              <button class="ghost-btn compact" data-action="restore-backup" data-name="${m(i.name)}">Restore</button>
            </div>
          `).join(""):t.innerHTML='<p class="item-meta">Folder has no backups yet — press Export backup now to create one. The live data file is saved here automatically.</p>';const a=document.createElement("div");a.innerHTML='<button class="ghost-btn compact" data-action="trigger-import">Import from a file instead</button>',t.appendChild(a)}async function Ds(t){try{const e=await d.readFolderFile(t);if(e.missing||e.error||!e.raw){g("Couldn't read that backup");return}jn(e.raw,t)}catch{g("Couldn't read that backup")}}function jn(t,e){let a;try{a=JSON.parse(t)}catch{g("That file isn't valid JSON.");return}const i=d.backupKind(a);if(i==="ok"){if(!window.confirm(`Replace ALL app data with "${e}"?`))return;Ot(Le("second-mind-pre-import"),d.exportBackup(),"application/json"),d.importBackup(a),g("Backup imported"),h();return}if(i==="report-export"){const n=d.previewReport(a);if(!n.days){g("That report file has no day rows to import.");return}if(!window.confirm(`Import ${n.days} day(s) (${n.start} → ${n.end}) from "${e}" as locked history?

${n.newHabits} new habit(s) will be added to your list.
Days already in the app on those dates will be overwritten.`))return;Ot(Le("second-mind-pre-import"),d.exportBackup(),"application/json");const r=d.importReport(a);if(!r){g("That file doesn't look like a valid Second Mind backup.");return}g(`Imported ${r.days} day(s)${r.habits?` + ${r.habits} new habit(s)`:""}`),h();return}if(i==="wrong-app"){g("That backup belongs to another app (e.g. Iron Log) — it can’t be imported into Second Mind.");return}g("That file doesn't look like a valid Second Mind backup.")}async function Cs(){if(!Pt){g("Use the browser menu: Install / Add to Home Screen");return}try{Pt.prompt();const t=await Pt.userChoice;t&&t.outcome==="accepted"&&g("Installing Second Mind…")}catch{}Pt=null,h()}async function Es(){const t=`./version.json?v=${Date.now()}`,e=await fetch(t,{cache:"no-store"});if(!e.ok)throw new Error(`http ${e.status}`);const a=await e.json(),i=a&&(a.version||a.v)||null;if(!i)throw new Error("no version field");return String(i)}async function Ps(){ft=!0,Te=!1,mt="Checking for updates… (needs internet)",h();try{if("serviceWorker"in navigator&&navigator.serviceWorker.getRegistration){const e=await navigator.serviceWorker.getRegistration().catch(()=>null);e&&e.update&&e.update().catch(()=>{})}}catch{}if(typeof fetch>"u"){ft=!1,mt="This browser can’t check — but the app itself works offline. Use Export backup to protect your data.",h();return}const t=setTimeout(()=>{ft&&(ft=!1,mt="Couldn't reach the server — offline? The app itself works offline; updating needs internet.",h())},15e3);try{const e=await Es();if(clearTimeout(t),ft=!1,na=e,e&&e!==Cn){Te=!0,mt="Update found — updating automatically…",h(),await Bn(!0);return}mt="You're on the latest version. The app works offline."}catch{clearTimeout(t),ft=!1,mt="Couldn't reach the server — offline, or this file wasn't opened from the installed/hosted app. The app itself works offline; updating needs internet."}h()}function Za(t){return new Promise(e=>{if(!("serviceWorker"in navigator))return e();const a=()=>e(),i=setTimeout(()=>{try{navigator.serviceWorker.removeEventListener("controllerchange",a)}catch{}e()},t||4e3),n=()=>{clearTimeout(i);try{navigator.serviceWorker.removeEventListener("controllerchange",n)}catch{}e()};try{navigator.serviceWorker.addEventListener("controllerchange",n)}catch{e()}})}async function Bn(t){var a;try{Ot(Le("second-mind-pre-update"),d.exportBackup(),"application/json")}catch{}g("Backup saved — updating app…"),mt=`Backup saved — updating${na?` to ${String(na).slice(-8)}`:""}…`,h();const e=()=>{const i=window.location.href.includes("?")?"&":"?";try{window.location.replace(`${window.location.href.split("#")[0]}${i}v=${Date.now()}#updated`)}catch{window.location.reload()}setTimeout(()=>{try{window.location.reload()}catch{}},2500)};try{if("serviceWorker"in navigator&&navigator.serviceWorker.getRegistration){const i=await navigator.serviceWorker.getRegistration().catch(()=>null);if(i){const n=i.waiting;if(n){try{n.postMessage("SKIP_WAITING")}catch{try{i.waiting.postMessage({type:"SKIP_WAITING"})}catch{}}await Za(4e3),e();return}try{await i.update()}catch{}const s=await navigator.serviceWorker.getRegistration().catch(()=>i),r=(s||i).waiting||(s||i).installing;if(r){try{r.postMessage("SKIP_WAITING")}catch{}try{(a=(s||i).waiting)==null||a.postMessage("SKIP_WAITING")}catch{}await Za(5e3),e();return}try{const o=navigator.serviceWorker.controller;o&&o.postMessage({type:"CLEAR_APP_CACHES"})}catch{}try{if(typeof caches<"u"){const o=await caches.keys().catch(()=>[]);await Promise.all(o.filter(l=>l.startsWith("daily-report-")).map(l=>caches.delete(l).catch(()=>!1)))}}catch{}try{await fetch(`./index.html?v=${Date.now()}`,{cache:"reload"})}catch{}try{await fetch(`./version.json?v=${Date.now()}`,{cache:"reload"})}catch{}try{await(s||i).unregister()}catch{}e();return}}}catch{}try{await fetch(`./index.html?v=${Date.now()}`,{cache:"reload"})}catch{}setTimeout(e,600)}const Ls=[{id:"start",icon:"🚀",title:"Getting started",summary:"How the app works in one minute",steps:[["📱","The app has five tabs at the bottom: <b>Today</b>, <b>Profile</b>, <b>History</b>, <b>Activities</b> and <b>Settings</b> — tap a tab to switch."],["⭐","Every habit and task has a <b>points value</b>. Checking it earns those points for that day."],["🧠","Some habits also award <b>conscious points</b> (🧠) on top of their normal points."],["📈","The big card on Today shows your day as points, percent and a <b>letter grade</b>."],["🔒","At your lock time the day locks itself — press <b>Submit and lock report</b> while the day is open."],["💾","Everything is saved on this device only and works fully offline."]]},{id:"today",icon:"✅",title:"Track your day (Today tab)",summary:"Habits, tasks, stars, photos and the FAB",steps:[["☑️","Tap the <b>circle check</b> on a habit or task to mark it done and earn its points."],["⭐","Tap the <b>stars</b> (1–5) to rate how well it went — a rating also counts it as done."],["🟢","Done items turn green. Unchecked items turn red as <b>Missed</b> once the day is locked."],["📷","Tasks can carry a photo — tap the thumbnail to view it full size."],["➕","Tap the big <b>+</b> button to add a habit or task for this day."],["↔️","Use the <b>‹ ›</b> arrows in the top bar to move between days."]]},{id:"edit",icon:"✏️",title:"Edit, sort & reorder",summary:"Edit Mode, drag order and archiving",steps:[["✏️","Tap <b>Edit Mode</b> in a section header to reveal the <b>Edit</b> and delete buttons."],["✋","Hold a card’s <b>grip button</b> for a moment, then drag it to a new spot in the list."],["🔃","The <b>Sort</b> selector orders the list by Points, Category, Tags or your custom drag order."],["🗂️","The <b>archive</b> button sets a habit or task aside — its history is kept and you can restore it any time from the <b>Archive</b> panel at the bottom of Today."]]},{id:"forward",icon:"🔁",title:"Forward, Replace & Pin",summary:"Moving habits and tasks between days",steps:[["↪️","<b>Forward</b> an unfinished task (➟ button) to another day — it moves there with a badge showing where it came from."],["⇄","<b>Replace</b> moves a habit’s rating to a free day before its next due date."],["📌","<b>Pin</b> a habit or task to a repeat schedule — weekly days, month dates or a custom date list — so it appears automatically. Pin it <b>forever</b> for daily essentials."],["↩️","Badges on the card (↩ Forwarded from / ⇄ Replaced from) show what moved and where — tap a badge to undo it."]]},{id:"notes",icon:"📝",title:"Day notes",summary:"Bullet and numbered lists that save themselves",steps:[["📝","The <b>Day note</b> box at the bottom of Today records how the day went."],["•","Select lines and press <b>• Bullets</b> (or <b>1. Numbered</b>) to make a list — press it again to remove the list markers."],["💾","The note saves automatically with the day and is included in exports and backups."]]},{id:"profile",icon:"👤",title:"Profile tab",summary:"Identity, life areas, goals, quotes & locking",steps:[["🪪","<b>Identity</b> — your display name and the person you want to be."],["🧬","<b>Who I am</b> — a numbered list of your roles; reorder with ↑ ↓."],["🗺️","<b>Life Areas</b> — tap a card to open it, describe it, and reorder with ↑ ↓."],["🌅","<b>My Vision</b> and <b>Core & Personal Values</b> — one value per line as a bullet list."],["💡","<b>Personal Ideas</b> — one idea per line, shown as bullets."],["🎯","<b>Goals</b> — hashtag each one: <b>#short</b> = weeks, <b>#medium</b> = 1–3 months, <b>#long</b> = a year or more."],["💬","<b>Quotes</b> — save quotes you live by and star your top 3 favourites."],["🔒","<b>Lock</b> makes the whole profile read-only; Unlock to edit again."]]},{id:"history",icon:"🕘",title:"History tab",summary:"Calendar of past days and exporting",steps:[["🗓️","History shows a month calendar colour-coded by each day’s score."],["👆","Tap any day to jump straight into that day’s report."],["📤","<b>Select & Export</b> picks a date range and exports it as <b>Excel / JSON / PDF</b> — a later import adds it back as locked history."],["☰","The list below shows recent reports with their grades."]]},{id:"activities",icon:"📊",title:"Activities tab",summary:"Charts over a week, month or year",steps:[["📊","The Activities tab charts your weekly score and progress per category."],["🗓️","Switch between <b>Week / Month / Year</b> and use <b>‹ ›</b> to step back in time."],["📝","Below the chart, <b>Noted days</b> is a month calendar of every day that carries a note — marked days have a gold dot. Press one and its date and note appear right under the calendar; use ‹ › to move between months."],["🎨","Each category keeps its chosen colour everywhere — charts, badges and cards."]]},{id:"rewards",icon:"🏆",title:"Goals & Rewards",summary:"Streak goals, tiers and badges",steps:[["➕","In Settings → Goals &amp; Rewards tap <b>Add goal</b>."],["🎯","Pick the target: a <b>habit or pinned-task streak of N days</b>, <b>N perfect (100%) days</b>, or a <b>List of tasks goal</b> (a checklist — no target needed)."],["📝","<b>List of tasks goal</b>: no target needed — in the goal form the <b>Attach tasks</b> picker lists <b>Archived</b> and <b>Undone</b> tasks to tick onto the goal. More can be added later from the task form’s <b>Select Goal</b>, <b>Attach to Goal List</b> when editing a task, or the goal card. When every task is done the goal shows <b>Done</b> and locks itself."],["🔁","A goal task whose title matches one of your <b>pinned tasks</b> shows that task’s <b>repeat times</b> — e.g. <b>↻ Mon, Wed, Fri · 3×/week</b> — and its days as chips. Tick <b>every pinned day</b> before the task counts as done; the row’s ✓ only clears it again."],["⛔","Locking a list goal manually before its tasks are finished <b>terminates</b> it — locked goals take no new tasks until you unlock."],["🥇","Choose the tier — <b>Iron, Bronze, Silver or Gold</b> — and write the reward title you’ll earn."],["🎁","Progress bars track each goal; earned rewards become <b>badges</b> on Today’s Rewards strip. A badge only exists while its goal is still complete — un-tick a task or break a streak and it drops back to <b>Not earned yet</b>, and returns when you earn it again."],["🏆","Any day that reaches 100% wins the <b>Gold Cup</b> on the spot."]]},{id:"cats",icon:"🗂️",title:"Categories & tags",summary:"Custom categories, colours, goals and tags",steps:[["🌈","Settings → <b>Categories</b>: add your own, tap one to open it, and pick its colour."],["📝","Type the category’s <b>goals</b> as bullet points and press Save — they reach forms, Activities and exports."],["🏷️","Tags group habits and tasks. From Settings → <b>Tags</b> you can rename or delete a tag everywhere at once."],["➕","New tags are added inside any habit or task form, or from the Tags section itself."]]},{id:"backup",icon:"💾",title:"Backup, updates & install",summary:"Keeping your data safe and the app fresh",steps:[["📁","Settings → <b>Data backup</b>: choose a folder once (desktop Chrome/Edge) and <b>Export backup now</b> saves a JSON straight into it."],["📥","<b>Import backup</b> accepts full backups (<b>second-mind-backup-*.json</b>) or month/week exports, which are added as locked history."],["🔄","<b>Check for updates</b> installs the newest version in place — a backup is saved first. Only this check needs internet."],["📲","<b>Install app</b> puts Second Mind on your home screen as a fullscreen offline app."]]},{id:"locking",icon:"🔐",title:"Locking & unlocking days",summary:"Auto-lock, submit and batch unlock",steps:[["⏰","Set the <b>auto-lock time</b> in Settings → Report lock; after that time today locks itself."],["🚫","A locked day is read-only, and anything unchecked already counted as <b>Missed</b> at lock time."],["📅","Settings → <b>Locked reports</b>: red days are locked, green days are open."],["☝️","Tap days to select them, then <b>Lock</b> or <b>Unlock</b> them all in one go."]]}];function Ns(t){return`<div class="tut-steps">${t.map(e=>`
        <div class="tut-step">
          <span class="tut-step-ico" aria-hidden="true">${e[0]}</span>
          <p>${e[1]}</p>
        </div>`).join("")}</div>`}function Is(){return`
    <div class="tut-grid">
      ${Ls.map(t=>{const e=ge===t.id;return`
          <article class="tut-card ${e?"open":""}">
            <button type="button" class="tut-head" data-action="open-tutorial" data-id="${t.id}" aria-expanded="${e?"true":"false"}">
              <span class="tut-ico" aria-hidden="true">${t.icon}</span>
              <span class="tut-titles">
                <span class="tut-title">${m(t.title)}</span>
                <span class="tut-summary">${m(t.summary)}</span>
              </span>
              <span class="tut-chev" aria-hidden="true">${e?"▾":"▸"}</span>
            </button>
            ${e?`<div class="tut-body">${Ns(t.steps)}</div>`:""}
          </article>
        `}).join("")}
    </div>
  `}function Gn(t){if(!t||t.kind!=="task-list")return"";const e=t.tasks||[];return e.length>0&&e.every(i=>d.goalTaskDone(i))?`Done ✅${t.locked?" 🔒":""}`:t.terminated?`Terminated ⛔${t.locked?" 🔒":""}`:t.locked?`Locked${t.locked?" 🔒":""}`:"Open"}function Ms(t){const{pin:e,slots:a}=t,i=a.map(n=>n.label);return e.mode==="forever"?"↻ Every day · 1×/day":e.mode==="until"?`↻ ${i.join(", ")}`:e.mode==="weekly"?`↻ ${i.join(", ")} · ${a.length}×/week`:e.mode==="monthly"?`↻ ${i.join(", ")} · ${a.length}×/month`:e.mode==="yearly"?`↻ ${i.join(", ")} · ${a.length}×/year`:`↻ ${i.join(", ")} · ${a.length} date${a.length===1?"":"s"}`}function Hs(t,e,a){const i=d.goalTaskDone(e),n=d.goalTaskSchedule(e),s=Array.isArray(e.checked)?e.checked:[],r=a?'disabled title="Unlock the goal to edit its tasks"':"";return`
    <div class="goal-task-row ${i?"done":""}">
      <div class="goal-task-head">
        <button type="button" class="goal-task-check ${i?"on":""}" data-action="toggle-goal-item" data-id="${t.id}" data-item="${e.id}" data-done="${i?"true":"false"}" ${r} aria-label="${i?"Mark not done":"Mark done"}">${i?"✓":""}</button>
        <span class="goal-task-title">${m(e.title)}</span>
        ${a?"":`<button class="mini-btn" data-action="remove-goal-item" data-id="${t.id}" data-item="${e.id}" title="Remove from goal" aria-label="Remove from goal">✕</button>`}
      </div>
      ${n?`
            <div class="goal-task-repeat">
              <span class="repeat-line">${Ms(n)} — tick all ${n.slots.length} to finish</span>
              <div class="repeat-chips">
                ${n.slots.map(o=>{const l=s.includes(o.key);return`<button type="button" class="repeat-chip ${l?"on":""}" data-action="toggle-goal-slot" data-id="${t.id}" data-item="${e.id}" data-slot="${m(o.key)}" data-on="${l?"true":"false"}" aria-pressed="${l?"true":"false"}" ${r}>${l?"✓ ":""}${m(o.label)}</button>`}).join("")}
              </div>
            </div>
          `:""}
    </div>
  `}function Fs(t){const e=t.tasks||[],a=e.filter(b=>d.goalTaskDone(b)).length,i=e.length>0&&a===e.length,n=!!t.locked,s=!!t.terminated,r=!n&&!s,o=Gn(t),l=e.length?Math.round(a/e.length*100):0,c=i?"gstatus-done":s?"gstatus-term":n?"gstatus-locked":"gstatus-open",f=d.getBadges().some(b=>b.goalId===t.id);return`
    <article class="manage-card task-list-goal ${i?"goal-earned":""}">
      <div class="section-head">
        <div>
          <div class="item-title">${ve(t.tier)} ${m(t.title)} <span class="gstatus ${c}">${o}</span></div>
          <div class="item-meta">“${m(t.rewardTitle)}” · ${a}/${e.length} tasks · ${f?"Badge earned ✓":"Not earned yet"}${i?" · All done ✓":s?" · list closed":""}</div>
          <div class="bar"><span style="width:${l}%"></span></div>
        </div>
        <div class="mini-actions">
          ${n?"":`<button class="mini-btn on" data-action="open-edit-goal" data-id="${t.id}">Edit</button>`}
          ${n?`<button class="mini-btn" data-action="unlock-goal" data-id="${t.id}" title="Unlock to edit the goal${s?" (terminated goals still take no new tasks)":""}">🔓 Unlock</button>`:`<button class="mini-btn" data-action="lock-goal" data-id="${t.id}"${e.length&&!i?' title="Lock now — an unfinished goal stays terminated"':""}>🔒 Lock</button>`}
          <button class="mini-btn" data-action="remove-goal" data-id="${t.id}">✕</button>
        </div>
      </div>
      <div class="goal-task-list">
        ${e.length?e.map(b=>Hs(t,b,n)).join(""):'<p class="item-meta">No tasks yet — add the first one below, or attach tasks from the task form (Select Goal).</p>'}
      </div>
      ${r?`
            <div class="goal-task-add">
              <input id="goal-item-input-${t.id}" maxlength="120" placeholder="New task for this goal…" aria-label="New task for ${m(t.title)}" />
              <button class="primary-btn compact-btn" data-action="add-goal-item" data-id="${t.id}">Add</button>
            </div>
          `:s?'<p class="item-meta">⛔ Terminated before the list was finished — no more tasks can be added, even after unlocking.</p>':'<p class="item-meta">🔒 Goal is done — unlock it to add or edit tasks.</p>'}
    </article>
  `}function G(t,{icon:e,title:a,hint:i},n){const s=Wt.has(t);return`
    <section class="settings-sec ${s?"open":""}">
      <button type="button" class="settings-sec-head" data-action="toggle-settings-section" data-id="${t}" aria-expanded="${s?"true":"false"}">
        <span class="settings-sec-ico" aria-hidden="true">${e}</span>
        <span class="settings-sec-titles">
          <span class="settings-sec-name">${a}</span>
          ${i?`<span class="settings-sec-hint">${i}</span>`:""}
        </span>
        <span class="settings-sec-chev" aria-hidden="true">${s?"▾":"▸"}</span>
      </button>
      ${s?`<div class="settings-sec-body">${n}</div>`:""}
    </section>
  `}function Rs(){const t=d.getSettings(),e=d.getAllHabits(),a=d.getPinnedHabits(),i=[...a,...e.filter(o=>!o.pin)],n=d.getArchivedHabits(),s=d.getPinnedTasks(),r=d.lockedReports();return`
    <div class="topbar">
      <div>
        <p class="kicker">Admin rules</p>
        <h1>Settings</h1>
      </div>
      <button class="ghost-btn compact ${yt?"on":""}" data-action="toggle-settings-edit" aria-pressed="${yt}">${yt?"Done":"Edit Mode"}</button>
    </div>
    <p class="muted tight settings-sec-lead">Sections are closed by default — tap a title to open and edit it.</p>

    ${G("tutorials",{icon:"📚",title:"Tutorials",hint:"Illustrated guide to the app & its usage"},Is())}

    ${G("report-lock",{icon:"🔒",title:"Report lock",hint:`Auto-lock at ${t.lockTime}`},`
      <p class="muted tight">When a past day is submitted and locked, it cannot be edited until you unlock it here.</p>
      <label>
        Auto lock time
        <input id="lock-time" type="time" value="${t.lockTime}" />
      </label>
      <label class="switch-row">
        <span>Auto-lock after that time</span>
        <input id="auto-lock" type="checkbox" ${t.autoLock?"checked":""} />
      </label>
      <p class="item-meta">Today still editable until ${t.lockTime}. After that, the day locks automatically.</p>
      <label class="switch-row" style="margin-top:12px">
        <span>Show conscious points 🧠</span>
        <input id="show-conscious" type="checkbox" ${t.showConscious!==!1?"checked":""} />
      </label>
      <p class="item-meta">Turn off to hide conscious points everywhere (scoring ignores them).</p>
      <label style="margin-top:12px">
        Week starts on
        <select id="week-start">
          ${[0,1,2,3,4,5,6].map(o=>{const l=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];return`<option value="${o}" ${d.getWeekStart()===o?"selected":""}>${l[o]}</option>`}).join("")}
        </select>
      </label>
      <p class="item-meta">Applies to the Week tab, week exports, and pin calendars.</p>
    `)}

    ${G("appearance",{icon:"🎨",title:"Appearance",hint:d.getTheme()==="dark"?"🌙 Dark mode":"☀️ Light mode"},`
      <p class="muted tight">Pick Dark or Light mode. It applies everywhere, instantly.</p>
      <div class="chip-row">
        <button type="button" class="chip ${d.getTheme()==="dark"?"on":""}" data-action="set-theme" data-theme="dark">🌙 Dark</button>
        <button type="button" class="chip ${d.getTheme()==="light"?"on":""}" data-action="set-theme" data-theme="light">☀️ Light</button>
      </div>
    `)}

    ${G("install",{icon:"📲",title:"Install app",hint:window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches?"Installed ✓":"Add to home screen"},`
      <p class="muted tight">Put Second Mind on your home screen for fullscreen offline use. Open it over http://localhost or https — it cannot install from a file:// page.</p>
      ${window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches?'<p class="item-meta">Installed — running as app ✓</p>':'<button class="primary-btn full" data-action="install-app">Install Second Mind</button>'}
    `)}

    ${G("updates",{icon:"🔄",title:"App updates",hint:`${Te?"Update ready":m(qa)}`},`
      <p class="muted tight">The app works fully offline. Only checking for updates needs internet. Tapping Check for updates installs the newest version automatically (a JSON backup of your data is saved first). Your data stays on this device.</p>
      <p class="item-meta">Version: ${m(qa)}</p>
      <p class="item-meta">📅 ${m(fs())}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
        <button class="primary-btn" data-action="check-updates" ${ft?"disabled":""}>${ft?"Checking…":"Check for updates"}</button>
        ${Te?'<button class="primary-btn" data-action="apply-update">Restart with update</button>':""}
      </div>
      <p class="item-meta">${m(mt)}</p>
    `)}

    ${G("backup",{icon:"💾",title:"Data backup",hint:ms()},`
      <p class="muted tight"><b>Auto-save:</b> pick a folder once (Chrome/Edge on desktop) and every change is written straight to <b>second-mind.json</b> inside it — your data lives on disk and no longer depends on browser storage. The browser keeps only a fast copy; if it is ever cleared, choose the same folder again and everything comes back. On phones no folder is available, so data stays in the browser — use Export backup there. Import accepts full backups (<b>second-mind-backup-*.json</b>) or month/week report exports, which are added as locked history.</p>
      <p class="item-meta">${m(gs())}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
        ${d.folderStatus()==="prompt"||d.folderStatus()==="denied"?'<button class="primary-btn" data-action="grant-folder">Allow access</button>':""}
        ${d.folderStatus()==="unsupported"?"":d.getFolderHandle()?'<button class="ghost-btn compact" data-action="choose-folder">Change folder</button><button class="ghost-btn compact" data-action="forget-folder">Unlink</button>':'<button class="primary-btn" data-action="choose-folder">Choose data folder</button>'}
        <button class="primary-btn" data-action="backup-now">Export backup now</button>
        <button class="ghost-btn compact" data-action="trigger-import">Import backup</button>
      </div>
      <input type="file" id="backup-file" accept="application/json,.json" hidden />
      <div id="folder-backup-list" style="margin-top:10px"></div>
    `)}

    ${G("drive",{icon:"☁️",title:"Google Drive sync",hint:bs()},vs())}

    ${G("categories",{icon:"🗂️",title:"Categories",hint:`${d.getCategories().length}`},`
      <p class="muted tight">Add your own categories — they appear in forms, Activities and exports. Tap a category to open it, set its colour, then type its goals as bullet points and press Save.</p>
      <div class="cat-expand-row">
        <button class="mini-btn" data-action="expand-cats">Expand all</button>
        <button class="mini-btn" data-action="collapse-cats">Collapse all</button>
      </div>
      <div class="habit-manage">
        ${d.getCategories().map(o=>{const l=d.getCustomCategories().some(S=>S.id===o.id),c=o.color||j(o.id),f=o.goals||"",b=Vt(f),p=It.has(o.id)?It.get(o.id):f,k=Qt(Vt(p))!==Qt(b),A=ht.has(o.id);return`
              <article class="manage-card cat-manage-card ${A?"open":""}">
                <div class="cat-manage-head">
                  <button type="button" class="cat-manage-toggle" data-action="toggle-cat" data-id="${o.id}" aria-expanded="${A?"true":"false"}" aria-controls="cat-editor-${o.id}">
                    <span class="cat-chevron" aria-hidden="true">${A?"▾":"▸"}</span>
                    <i class="cat-swatch" style="background:${m(c)}"></i>
                    <span class="cat-manage-name">${m(ut(o.id))}</span>
                    ${b.length?`<span class="cat-goal-flag">${b.length} goal${b.length===1?"":"s"}</span>`:""}
                  </button>
                  <div class="mini-actions">
                    ${l?`<button class="mini-btn on" data-action="rename-category" data-id="${o.id}">Rename</button>`:""}
                    ${l?`<button class="mini-btn" data-action="delete-category" data-id="${o.id}">✕</button>`:""}
                  </div>
                </div>
                ${A?`
                      <div class="cat-manage-body" id="cat-editor-${o.id}">
                        <div class="cat-manage-row">
                          <label>Colour
                            <input type="color" data-cat-color="${o.id}" value="${m(c)}" aria-label="Colour for ${m(o.label||ut(o.id))}" />
                          </label>
                          <div class="cat-goals-wrap">
                            <label>Goals — one per line
                              <textarea data-cat-goals="${o.id}" maxlength="1000" placeholder="• Goal one&#10;• Goal two&#10;• Goal three" style="min-height:90px">${m(p)}</textarea>
                            </label>
                            <div class="cat-save-row">
                              <button class="primary-btn compact-btn" data-action="save-cat-goals" data-id="${o.id}">${k?"Save goals":"Saved"}</button>
                              <button class="ghost-btn compact" data-action="reset-cat-goals" data-id="${o.id}" ${k?"":"hidden"}>Discard</button>
                            </div>
                            <p class="item-meta cat-goal-hint">${k?"Unsaved changes — press Save to keep them offline and in backups.":"Saved on this device and included in every backup."}</p>
                          </div>
                        </div>
                      </div>
                    `:b.length?`<ul class="note-list cat-goal-preview">${b.map(S=>`<li>${m(S)}</li>`).join("")}</ul>`:'<p class="item-meta">No goals yet — open this category to add some.</p>'}
              </article>
            `}).join("")}
      </div>
      <div style="display:flex;gap:8px;margin-top:10px">
        <input id="new-category" maxlength="30" placeholder="New category name…" style="flex:1;min-width:0" />
        <button class="primary-btn compact-btn" data-action="add-category">Add</button>
      </div>
    `)}

    ${G("tags",{icon:"🏷️",title:"Tags",hint:`${d.getAllTags().length}`},`
      <p class="muted tight">Rename a tag everywhere at once, or delete it from all habits and tasks. New tags are added inside any habit/task form.</p>
      <div class="habit-manage">
        ${(()=>{const o=d.getAllTags();return o.length?o.map(({tag:l,count:c})=>`
              <article class="manage-card">
                <div class="section-head">
                  <div>
                    <div class="item-title">#${m(l)}</div>
                    <div class="item-meta">Used ${c} time${c===1?"":"s"}</div>
                  </div>
                  <div class="mini-actions">
                    <button class="mini-btn on" data-action="rename-tag" data-tag="${m(l)}">Rename</button>
                    <button class="mini-btn" data-action="delete-tag" data-tag="${m(l)}">✕</button>
                  </div>
                </div>
              </article>
            `).join(""):'<div class="empty">No tags yet — add some in a habit or task form.</div>'})()}
      </div>
      <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">
        <select id="tag-habit-pick" style="flex:1;min-width:0">
          ${d.getAllHabits().map(o=>`<option value="${o.id}">${m(o.name)}</option>`).join("")}
        </select>
        <input id="new-tag" maxlength="20" placeholder="New tag…" style="flex:1;min-width:0" />
        <button class="primary-btn compact-btn" data-action="add-tag">Add</button>
      </div>
    `)}

    ${G("goals",{icon:"🏅",title:"Goals & Rewards",hint:`${d.getGoals().length} goals · ${d.getBadges().length} badges`},`
      <div class="section-head goals-intro">
        <p class="muted tight" style="max-width:270px">Do a habit / pinned task N days in a row, or collect N perfect (100%) days — earn an Iron, Bronze, Silver or Gold badge with your own title.</p>
        <button class="ghost-btn compact" data-action="open-goal">Add goal</button>
      </div>
      <div class="habit-manage">
        ${d.getGoals().length?d.getGoals().map(o=>{var b,p;if(o.kind==="task-list")return Fs(o);const l=d.goalProgress(o,v),c=d.getBadges().some(k=>k.goalId===o.id),f=o.kind==="habit-streak"?((b=d.findHabit(o.targetId))==null?void 0:b.name)||"Deleted habit":o.kind==="task-streak"?((p=d.findPinnedTask(o.targetId))==null?void 0:p.title)||"Deleted task":"Any day at 100%";return`
                    <article class="manage-card goal-card ${c?"goal-earned":""}">
                      <div class="section-head">
                        <div>
                          <div class="item-title">${ve(o.tier)} ${m(o.title)}</div>
                          <div class="item-meta">${yn(o.tier)} · “${m(o.rewardTitle)}” · ${m(f)}</div>
                          <div class="item-meta">${l.current}/${l.target} days · ${c?"Earned ✓":"Not earned yet"}</div>
                          <div class="bar"><span style="width:${Math.min(100,Math.round(l.current/l.target*100))}%"></span></div>
                        </div>
                        <div class="mini-actions">
                          <button class="mini-btn on" data-action="open-edit-goal" data-id="${o.id}">Edit</button>
                          <button class="mini-btn" data-action="remove-goal" data-id="${o.id}">✕</button>
                        </div>
                      </div>
                    </article>
                  `}).join(""):'<div class="empty">No goals yet. Tap Add goal to create your first reward.</div>'}
      </div>
      ${d.getBadges().length?`
            <div class="section-head" style="margin-top:14px"><h2>Earned badges</h2></div>
            <div class="rewards-grid">
              ${d.getBadges().map(o=>`
                <article class="reward-card tier-${o.tier}">
                  <div class="reward-medal">${ve(o.tier)}</div>
                  <div>
                    <div class="item-title">${m(o.rewardTitle||o.title)}</div>
                    <div class="item-meta">${m(o.title)} · ${B((o.earnedAt||"").slice(0,10))}</div>
                  </div>
                  <button class="mini-btn" data-action="remove-badge" data-id="${o.id}">✕</button>
                </article>
              `).join("")}
            </div>
          `:""}
    `)}

    ${G("locked-reports",{icon:"📅",title:"Locked reports",hint:`${r.length} locked`},`
      <div class="section-head">
        <p class="muted tight" style="max-width:260px">Red = locked, green = open. Tap days to select them, then lock or unlock all at once.</p>
        <div class="date-nav">
          <button class="icon-btn" data-action="locked-cal-nav" data-dir="-1" aria-label="Previous month">‹</button>
          <button class="icon-btn" data-action="locked-cal-nav" data-dir="1" aria-label="Next month">›</button>
        </div>
      </div>
      ${is(r)}
      ${O.length?`
        <div class="chip-row" style="margin-top:10px">
          ${[...O].sort().map(o=>`<button type="button" class="chip on" data-action="toggle-locked-day" data-date="${o}" title="Tap to remove">${o} ✕</button>`).join("")}
        </div>
        <div style="display:flex;gap:8px;margin-top:10px">
          <button class="primary-btn" style="flex:1" data-action="lock-selected">🔒 Lock ${O.length} day${O.length===1?"":"s"}</button>
          <button class="ghost-btn" style="flex:1" data-action="unlock-selected">🔓 Unlock ${O.length} day${O.length===1?"":"s"}</button>
        </div>
      `:""}
    `)}

    ${G("habits",{icon:"✅",title:"Habits",hint:`${i.length}`},`
      <div class="section-head">
        <p class="muted tight" style="max-width:280px">Tap a habit to see its activity. In Edit Mode, edit habits and reorder pinned habits.</p>
        <button class="ghost-btn compact" data-action="open-add-habit">Add</button>
      </div>
      <div class="habit-manage">
        ${i.length?i.map(o=>{const l=fe.has(o.id),c=o.pin?a.findIndex(b=>b.id===o.id):-1,f=l?d.getHabitActivity(o.id,20):[];return`
                    <article class="manage-card setting-habit-card ${l?"open":""}" style="${o.pin?`border-left:4px solid ${j(o.category)}`:""}">
                      <div class="section-head">
                        <button type="button" class="setting-habit-toggle" data-action="toggle-setting-habit" data-id="${o.id}" aria-expanded="${l?"true":"false"}">
                          <span class="setting-habit-chevron" aria-hidden="true">${l?"▾":"▸"}</span>
                          <span class="setting-habit-heading">
                            <span class="item-title">${m(o.name)}</span>
                            <span class="item-meta">${At(o.category)} · ${o.pin?Nt(o.pin):"Not pinned"} · +${o.points} pts ${t.showConscious!==!1?Number(o.consciousPoints)?`· 🧠 +${o.consciousPoints}`:"· No conscious pts":""} · ${Ee(d.habitStreak(o.id,v))}</span>
                          </span>
                        </button>
                        <div class="mini-actions">
                          ${yt?`
                            <button class="mini-btn on" data-action="open-edit-habit" data-id="${o.id}" aria-label="Edit ${m(o.name)}">Edit</button>
                            ${o.pin?`
                              <button class="mini-btn" data-action="move-pinned-habit" data-id="${o.id}" data-dir="-1" ${c===0?"disabled":""} aria-label="Move ${m(o.name)} up" title="Move up">↑</button>
                              <button class="mini-btn" data-action="move-pinned-habit" data-id="${o.id}" data-dir="1" ${c===a.length-1?"disabled":""} aria-label="Move ${m(o.name)} down" title="Move down">↓</button>
                            `:""}
                            <button class="mini-btn ${o.pin?"on":""}" data-action="open-pin-habit" data-id="${o.id}" aria-label="${o.pin?"Change pin schedule":"Pin habit"}">${L("pin")}</button>
                            <button class="mini-btn" data-action="remove-habit" data-id="${o.id}" aria-label="Remove ${m(o.name)}">✕</button>
                          `:""}
                        </div>
                      </div>
                      ${l?`
                        <div class="setting-habit-details">
                          ${o.description?`<p class="item-desc">${m(o.description)}</p>`:'<p class="item-meta">No description yet.</p>'}
                          ${ct(o.tags)}
                          <div class="setting-habit-activity">
                            <div class="item-title">Recent activity</div>
                            ${f.length?f.map(b=>`
                              <button type="button" class="setting-habit-activity-row" data-action="open-habit-activity-date" data-date="${b.date}">
                                <span>${B(b.date)}</span>
                                <span>${b.rating?`${b.rating}/5 · ${b.status}`:b.status}</span>
                                ${b.locked?'<span class="lock-badge">Locked</span>':""}
                              </button>
                            `).join(""):'<p class="item-meta">No recorded activity yet.</p>'}
                          </div>
                        </div>
                      `:""}
                    </article>
                  `}).join(""):'<div class="empty">No habits yet.</div>'}
      </div>
    `)}

    ${n.length?G("deleted-habits",{icon:"🗑️",title:"Deleted habits",hint:`${n.length} — history kept`},`
      <p class="muted tight">Deleting a habit never erases history: days that already recorded it keep it and its points. Restore a habit to bring it back on future days.</p>
      <div class="habit-manage">
        ${n.map(o=>`
                    <article class="manage-card archived" style="border-left:4px solid ${j(o.category)}">
                      <div class="section-head">
                        <div>
                          <div class="item-title">${m(o.name)}</div>
                          <div class="item-meta">${At(o.category)} · +${o.points} pts${o.pin?` · ${Nt(o.pin)}`:" · Pin ended"} · ${sa(o.archivedAt)}</div>
                          ${o.description?`<p class="item-desc">${m(o.description)}</p>`:""}
                          ${ct(o.tags)}
                        </div>
                        <div class="mini-actions">
                          <button class="mini-btn on" data-action="restore-habit" data-id="${o.id}">${L("undo")}</button>
                        </div>
                      </div>
                    </article>
                  `).join("")}
      </div>
    `):""}

    ${G("pinned-tasks",{icon:"📌",title:"Pinned tasks",hint:`${s.length}`},`
      <p class="muted tight">Pinned tasks appear automatically on matching days.</p>
      <div class="habit-manage">
        ${s.length?s.map(o=>`
                    <article class="manage-card" style="border-left:4px solid ${j(o.category)}">
                      <div class="section-head">
                        <div>
                          <div class="item-title">${m(o.title)}</div>
                          <div class="item-meta">${At(o.category)} · ${Nt(o.pin)} · +${o.points} pts</div>
                          ${o.description?`<p class="item-desc">${m(o.description)}</p>`:""}
                          ${ct(o.tags)}
                        </div>
                        <div class="mini-actions">
                          ${yt?`
                            <button class="mini-btn on" data-action="open-edit-pinned-task" data-id="${o.id}" aria-label="Edit ${m(o.title)}">Edit</button>
                            <button class="mini-btn" data-action="move-pinned-task" data-id="${o.id}" data-dir="-1" ${s.indexOf(o)===0?"disabled":""} aria-label="Move ${m(o.title)} up" title="Move up">↑</button>
                            <button class="mini-btn" data-action="move-pinned-task" data-id="${o.id}" data-dir="1" ${s.indexOf(o)===s.length-1?"disabled":""} aria-label="Move ${m(o.title)} down" title="Move down">↓</button>
                            <button class="mini-btn on" data-action="open-pin-template" data-id="${o.id}" aria-label="Change repeat schedule">${L("pin")}</button>
                            <button class="mini-btn" data-action="unpin-template" data-id="${o.id}" aria-label="Unpin ${m(o.title)}">✕</button>
                          `:""}
                        </div>
                      </div>
                    </article>
                  `).join(""):'<div class="empty">Pin a task from Today to repeat it.</div>'}
      </div>
    `)}
  `}function F(t){if(/^\d{4}-\d{2}$/.test(String(t||"")))return String(t);if(/^\d{4}-\d{2}-\d{2}$/.test(String(t||"")))return String(t).slice(0,7);const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}`}function Et(t,e){const[a,i]=String(t).split("-").map(Number),n=new Date(a,(i||1)-1+e,1);return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`}function Ft(t){const[e,a]=String(t).split("-").map(Number);return new Date(e,(a||1)-1,1).toLocaleDateString(void 0,{month:"long",year:"numeric"})}function He(){const t=d.getWeekStart(),e=kt.findIndex(a=>a.value===t);return e<=0?kt:[...kt.slice(e),...kt.slice(0,e)]}function Fe(t){const[e,a]=String(t).split("-").map(Number),n=(new Date(e,a-1,1).getDay()-d.getWeekStart()+7)%7,s=new Date(e,a,0).getDate(),r=[];for(let o=0;o<n;o++)r.push(null);for(let o=1;o<=s;o++)r.push(`${e}-${String(a).padStart(2,"0")}-${String(o).padStart(2,"0")}`);return r}function Ka(t,e,a){const i=new Set(a||[]),n=Fe(e);return`
    <div class="pin-cal" data-cal="${t}">
      <div class="pin-cal-head">
        <button type="button" class="mini-btn" data-action="pin-cal-nav" data-target="${t}" data-dir="-1" aria-label="Previous month">‹</button>
        <b>${Ft(e)}</b>
        <button type="button" class="mini-btn" data-action="pin-cal-nav" data-target="${t}" data-dir="1" aria-label="Next month">›</button>
      </div>
      <div class="pin-cal-grid pin-cal-week">
        ${He().map(s=>`<span>${s.label.slice(0,1)}</span>`).join("")}
      </div>
      <div class="pin-cal-grid">
        ${n.map(s=>s?`<button type="button" class="pin-cal-day ${i.has(s)?"on":""}" data-action="toggle-pin-date" data-target="${t}" data-date="${s}">${Number(s.slice(8,10))}</button>`:"<span></span>").join("")}
      </div>
    </div>
  `}function Os(t,e){const a=(t==null?void 0:t.mode)||"forever",i=(t==null?void 0:t.until)||"",n=((t==null?void 0:t.weekdays)||[]).map(Number),s=((t==null?void 0:t.monthDays)||[]).map(Number),r=Array.isArray(t==null?void 0:t.yearDays)?[...t.yearDays].sort():[],o=Array.isArray(t==null?void 0:t.customDates)?[...t.customDates].sort():[],l=Array.isArray(t==null?void 0:t.exceptDates)?[...t.exceptDates].sort():Array.isArray(t==null?void 0:t.exceptions)?[...t.exceptions].sort():[],c=e&&e._exceptCal||F(v),f=e&&e._customCal||F(v),b=e&&e._yearMonth||"01";return`
    <div class="chip-row pin-modes">
      <button type="button" class="chip ${a==="forever"?"on":""}" data-action="pin-mode" data-mode="forever">Forever</button>
      <button type="button" class="chip ${a==="until"?"on":""}" data-action="pin-mode" data-mode="until">Until date</button>
      <button type="button" class="chip ${a==="weekly"?"on":""}" data-action="pin-mode" data-mode="weekly">Weekly</button>
      <button type="button" class="chip ${a==="monthly"?"on":""}" data-action="pin-mode" data-mode="monthly">Monthly</button>
      <button type="button" class="chip ${a==="yearly"?"on":""}" data-action="pin-mode" data-mode="yearly">Yearly</button>
      <button type="button" class="chip ${a==="custom"?"on":""}" data-action="pin-mode" data-mode="custom">Custom</button>
    </div>
    <input type="hidden" name="mode" value="${a}" />
    <label class="pin-until" style="${a==="until"?"":"display:none"}">
      Until
      <input name="until" type="date" value="${i}" />
    </label>
    <div class="pin-weekdays" style="${a==="weekly"?"":"display:none"}">
      <p class="item-meta">Repeat every</p>
      <div class="chip-row">
        ${kt.map(p=>`
            <button type="button" class="chip weekday ${n.includes(p.value)?"on":""}" data-action="toggle-weekday" data-day="${p.value}">
              ${p.label}
            </button>
          `).join("")}
      </div>
    </div>
    <div class="pin-monthdays" style="${a==="monthly"?"":"display:none"}">
      <p class="item-meta">Repeat every month on day</p>
      <div class="chip-row">
        ${Array.from({length:31},(p,k)=>k+1).map(p=>`<button type="button" class="chip monthday ${s.includes(p)?"on":""}" data-action="toggle-monthday" data-day="${p}">${p}</button>`).join("")}
      </div>
    </div>
    <div class="pin-yeardays" style="${a==="yearly"?"":"display:none"}">
      <p class="item-meta">Repeat every year on (month + day)</p>
      <div class="row-2">
        <label>Month
          <select id="year-month-select">
            ${Array.from({length:12},(p,k)=>k+1).map(p=>`<option value="${String(p).padStart(2,"0")}" ${b===String(p).padStart(2,"0")?"selected":""}>${new Date(2e3,p-1,1).toLocaleDateString(void 0,{month:"long"})}</option>`).join("")}
          </select>
        </label>
        <label>Day
          <select id="year-day-select">
            ${Array.from({length:31},(p,k)=>k+1).map(p=>`<option value="${String(p).padStart(2,"0")}">${p}</option>`).join("")}
          </select>
        </label>
      </div>
      <button type="button" class="ghost-btn compact" data-action="add-year-day" style="margin-top:8px">Add yearly date</button>
      <div class="chip-row" style="margin-top:8px">
        ${r.length?r.map(p=>`<button type="button" class="chip on" data-action="remove-year-day" data-date="${p}" title="Tap to remove">${p} ✕</button>`).join(""):'<span class="item-meta">No yearly dates yet.</span>'}
      </div>
    </div>
    <div class="pin-customdays" style="margin-top:4px">
      <p class="item-meta"><b style="color:var(--text)">Extra custom dates</b> — also show on these days. Combines with Weekly / Monthly / Yearly; pick the <b style="color:var(--text)">Custom</b> mode to show <i>only</i> on these days. Tap days on the calendar.</p>
      ${Ka("custom",f,o)}
      <div class="chip-row" style="margin-top:8px">
        ${o.length?o.map(p=>`<button type="button" class="chip on" data-action="toggle-pin-date" data-target="custom" data-date="${p}" title="Tap to remove">${p} ✕</button>`).join(""):'<span class="item-meta">No extra custom dates.</span>'}
      </div>
    </div>
    <div class="pin-exceptions" style="margin-top:4px">
      <p class="item-meta"><b style="color:var(--text)">Exceptions</b> — skip these days (tap days on the calendar). Applies to every repeat mode.</p>
      ${Ka("except",c,l)}
      <div class="chip-row" style="margin-top:8px">
        ${l.length?l.map(p=>`<button type="button" class="chip on" data-action="toggle-pin-date" data-target="except" data-date="${p}" title="Tap to remove">${p} ✕</button>`).join(""):'<span class="item-meta">No exceptions.</span>'}
      </div>
    </div>
  `}function js(){if(!x)return"";if(x==="choose")return`
      <div class="modal-backdrop open" data-action="close-modal">
        <div class="sheet">
          <div class="handle"></div>
          <h2>Add to today</h2>
          <p class="muted tight">Choose what you want to record.</p>
          <div class="choose-grid">
            <button class="choose-card" data-action="open-add-task">
              <b>Task</b>
              <span>One-time work with category and optional description</span>
            </button>
            <button class="choose-card" data-action="open-add-habit">
              <b>Habit</b>
              <span>Repeats on pinned days and can be rated 1 to 5</span>
            </button>
          </div>
          <button class="ghost-btn full" type="button" data-action="close-modal">Cancel</button>
        </div>
      </div>
    `;if(x==="habit"||x==="task"||x==="edit-habit"||x==="edit-task"||x==="edit-pinned-task"){const t=x==="habit"||x==="edit-habit",e=x.startsWith("edit-"),a=$||{},i=a.category||(t?"physically":"mentally"),n=Math.max(0,Math.min(5,Number(a.rating)||0)),s=Array.isArray(a.tags)?a.tags.join(", "):a.tags||"",r=a.consciousPoints!=null?Number(a.consciousPoints):a.conscious!=null?Number(a.conscious):0;return`
      <div class="modal-backdrop open" data-action="close-modal">
        <form class="sheet" data-form="${x}" data-id="${a.id||""}">
          <div class="handle"></div>
          <h2>${e?"Edit":"New"} ${t?"habit":"task"}</h2>
          <div class="form" style="margin-top:14px">
            <label>
              ${t?"Habit name":"Task name"}
              <input name="title" required maxlength="60" value="${m(a.title||a.name||"")}" placeholder="${t?"Meditate":"Finish report"}" />
            </label>
            ${(()=>{const o=x==="edit-task";if(t||!(x==="task"||o)||!d.taskListGoals().length)return"";const l=o?d.openTaskListGoals():d.taskListGoals(),c=o?"Attach to Goal List":"Select Goal",f=o?"Not attached to a goal":"No goal — add to today's task list",b=o?"Picking a goal adds this task to that goal’s list as well (open goals only).":"A goal attached here puts the task on that goal’s list instead of today’s list.";return`
                <div>
                  <p class="item-meta">${c}</p>
                  ${o&&!l.length?'<p class="item-meta">No open list-of-tasks goals — unlock a goal first to attach to it.</p>':`
                  <label style="margin-top:6px">
                    Attach this task to a list-of-tasks goal (optional)
                    <select name="goalTarget">
                      <option value="">${f}</option>
                      ${l.map(p=>{const k=!p.locked;return`<option value="${p.id}" ${k?"":"disabled"}>${m(p.title)} — ${Gn(p)}</option>`}).join("")}
                    </select>
                  </label>`}
                  <p class="item-meta">${b}</p>
                </div>
              `})()}
            ${t?`
                  <label>
                    Description (optional)
                    <textarea name="description" maxlength="2000" placeholder="Why this habit matters, extra notes...">${m(a.description||"")}</textarea>
                  </label>
                `:`
                  <label>
                    Description (optional)
                    <textarea name="description" maxlength="240" placeholder="Why this matters, extra notes...">${m(a.description||"")}</textarea>
                  </label>
                  <div>
                    <p class="item-meta">Rating (optional, info only — does not change points)</p>
                    <div class="chip-row rating-row">
                      <button type="button" class="chip ${n===0?"on":""}" data-action="set-rating" data-rating="0">No rating</button>
                      ${[1,2,3,4,5].map(o=>`
                            <button type="button" class="chip ${n===o?"on":""}" data-action="set-rating" data-rating="${o}">${o}★</button>
                          `).join("")}
                    </div>
                    <input type="hidden" name="rating" value="${n}" />
                  </div>
                  <div>
                    <p class="item-meta">Photo (optional — stored on this device, exported with backups)</p>
                    <div style="display:flex;gap:8px;flex-wrap:wrap">
                      <button type="button" class="ghost-btn compact" data-action="pick-task-image">📷 ${(a._image!==void 0?a._image:a.image)?"Change photo":"Attach photo"}</button>
                      ${(a._image!==void 0?a._image:a.image)?'<button type="button" class="ghost-btn compact danger" data-action="remove-task-image">Remove</button>':""}
                    </div>
                    <input type="file" id="task-image-input" accept="image/*" hidden />
                    ${(a._image!==void 0?a._image:a.image)?`<div class="img-picker-preview"><img src="${a._image!==void 0?a._image:a.image}" alt="Attached photo preview" /><button type="button" class="mini-btn" data-action="remove-task-image" title="Remove photo">✕</button></div>`:""}
                  </div>
                `}
            <div>
              <p class="item-meta">Category</p>
              <div class="chip-row cat-row">
                ${d.getCategories().map(o=>`
                    <button type="button" class="chip ${i===o.id?"on":""}" data-action="set-category" data-category="${o.id}">${m(o.label)}</button>
                  `).join("")}
              </div>
              <input type="hidden" name="category" value="${i}" />
            </div>
            <label>
              Tags (optional, comma separated)
              <input name="tags" maxlength="120" value="${m(s)}" placeholder="morning, health" />
            </label>
            <label>
              Points
              <input name="points" type="number" min="1" max="100" value="${a.points||(t?10:5)}" />
            </label>
            <div class="chip-row">
              ${(t?[5,10,15,20]:[5,10,15,25]).map(o=>`<button type="button" class="chip" data-action="set-points" data-points="${o}">${o} pts</button>`).join("")}
            </div>
            ${t?`
                  <div>
                    <p class="item-meta">Conscious points (bonus when habit is done, 0 = Never)</p>
                    <div class="chip-row conscious-row">
                      ${[0,5,10,15,20].map(o=>`
                            <button type="button" class="chip ${r===o?"on":""}" data-action="set-conscious" data-conscious="${o}">${o===0?"Never":`+${o}🧠`}</button>
                          `).join("")}
                    </div>
                    <label style="margin-top:8px">
                      Custom conscious points
                      <input name="consciousPoints" type="number" min="0" max="100" value="${r||0}" />
                    </label>
                  </div>
                `:""}
            <button class="primary-btn" type="submit">Save ${t?"habit":"task"}</button>
            <button class="ghost-btn" type="button" data-action="close-modal">Cancel</button>
          </div>
        </form>
      </div>
    `}if(x==="export"){const t=$&&$.range||"day";return`
      <div class="modal-backdrop open" data-action="close-modal">
        <div class="sheet">
          <div class="handle"></div>
          <h2>Export report</h2>
          <p class="muted tight">Date: ${B(v)}. Pick a range, then a format.</p>
          <div class="form" style="margin-top:14px">
            <div class="chip-row">
              ${[["day","Day"],["week","Week"],["month","Month"],["year","Year"],["all","All"]].map(([e,a])=>`<button type="button" class="chip ${t===e?"on":""}" data-action="set-export-range" data-range="${e}">${a}</button>`).join("")}
            </div>
            <div class="export-grid">
              <button class="choose-card" data-action="do-export" data-format="csv"><b>Excel (CSV)</b><span>Opens in Excel / Sheets</span></button>
              <button class="choose-card" data-action="do-export" data-format="json"><b>JSON</b><span>Raw data backup</span></button>
              <button class="choose-card" data-action="do-export" data-format="pdf"><b>PDF</b><span>Print / save as PDF</span></button>
            </div>
            <button class="ghost-btn" type="button" data-action="close-modal">Cancel</button>
          </div>
        </div>
      </div>
    `}if(x==="goal"||x==="edit-goal"){const t=x==="edit-goal",e=$||{},a=e.kind||"habit-streak",i=d.getAllHabits(),n=d.getPinnedTasks(),s=e.targetId||"",r=a==="task-list"?(e.tasks||[]).filter(c=>!d.goalTaskDone(c)).length:0,o=a==="task-list"?d.getArchivedTasks():[],l=a==="task-list"?d.undoneDayTasks():[];return`
      <div class="modal-backdrop open" data-action="close-modal">
        <form class="sheet" data-form="${x}" data-id="${e.id||""}">
          <div class="handle"></div>
          <h2>${t?"Edit":"New"} goal</h2>
          <div class="form" style="margin-top:14px">
            <label>
              Goal title
              <input name="title" required maxlength="60" value="${m(e.title||"")}" placeholder="Exercise every day" />
            </label>
            <div>
              <p class="item-meta">Goal type</p>
              <div class="chip-row goal-kind-row">
                ${bn.map(c=>`<button type="button" class="chip ${a===c.id?"on":""}" data-action="set-goal-kind" data-kind="${c.id}">${c.label}</button>`).join("")}
              </div>
              <input type="hidden" name="kind" value="${a}" />
              ${a==="task-list"?'<p class="item-meta">No target needed — pick the tasks to attach below. You can add more later from the task form (Select Goal) or inside Goals &amp; Rewards.</p>':""}
            </div>
            <div class="goal-attach" style="${a==="task-list"?"":"display:none"}">
              <p class="item-meta"><b style="color:var(--text)">Attach tasks</b> — tick the tasks that belong to this goal's list${r?` · already on the goal: ${r} unfinished`:""}.</p>
              ${(()=>{const c=(f,b,p)=>{const k=b.map(A=>{const S=String(A.title||"").trim();if(!S)return"";const y=A.category?`${A.category.charAt(0).toUpperCase()}${A.category.slice(1)}${A.date?` · ${A.date}`:""}`:A.date||"";return`
                        <label class="goal-attach-row">
                          <input type="checkbox" name="attachTask" value="${m(S)}" />
                          <span class="goal-attach-title">${m(S)}</span>
                          ${y?`<span class="goal-attach-meta">${m(y)}</span>`:""}
                        </label>
                      `}).filter(Boolean);return`
                    <div class="goal-attach-group">
                      <p class="goal-attach-heading">${f}</p>
                      ${k.length?k.join(""):`<p class="item-meta">${p}</p>`}
                    </div>
                  `};return`${c("Archived tasks",o,"No archived tasks yet.")}${c("Undone tasks",l,"No undone day tasks.")}`})()}
            </div>
            <label class="goal-target-habit" style="${a==="habit-streak"?"":"display:none"}">
              Habit
              <select name="habitTarget">
                ${i.map(c=>`<option value="${c.id}" ${s===c.id?"selected":""}>${m(c.name)}</option>`).join("")}
              </select>
            </label>
            <label class="goal-target-task" style="${a==="task-streak"?"":"display:none"}">
              Pinned task
              <select name="taskTarget">
                ${n.length?n.map(c=>`<option value="${c.id}" ${s===c.id?"selected":""}>${m(c.title)}</option>`).join(""):'<option value="">No pinned tasks yet</option>'}
              </select>
            </label>
            <label class="goal-target-days" style="${a==="task-list"?"display:none":""}">
              Number of days
              <input name="targetDays" type="number" min="1" max="365" value="${e.targetDays||7}" />
            </label>
            <div>
              <p class="item-meta">Badge</p>
              <div class="chip-row goal-tier-row">
                ${Zt.map(c=>`<button type="button" class="chip ${(e.tier||"bronze")===c.id?"on":""}" data-action="set-goal-tier" data-tier="${c.id}">${c.medal} ${c.label}</button>`).join("")}
              </div>
              <input type="hidden" name="tier" value="${e.tier||"bronze"}" />
            </div>
            <label>
              Reward title (yours)
              <input name="rewardTitle" required maxlength="60" value="${m(e.rewardTitle||"")}" placeholder="Champion" />
            </label>
            <button class="primary-btn" type="submit">Save goal</button>
            <button class="ghost-btn" type="button" data-action="close-modal">Cancel</button>
          </div>
        </form>
      </div>
    `}if(x==="pin"){const{kind:t,id:e,title:a,pin:i}=$||{};return`
      <div class="modal-backdrop open" data-action="close-modal">
        <form class="sheet sheet-wide" data-form="pin" data-kind="${t}" data-id="${e}">
          <div class="handle"></div>
          <h2>Pin ${t==="habit"?"habit":"task"}</h2>
          <p class="muted tight">${m(a||"")}</p>
          <div class="form" style="margin-top:14px">
            ${Os(i,$)}
            <button class="primary-btn" type="submit">Save pin</button>
            ${i?'<button class="ghost-btn danger" type="button" data-action="clear-pin">Unpin</button>':""}
            <button class="ghost-btn" type="button" data-action="close-modal">Cancel</button>
          </div>
        </form>
      </div>
    `}if(x==="forward"){const{kind:t,id:e,title:a,from:i}=$||{};return`
      <div class="modal-backdrop open" data-action="close-modal">
        <form class="sheet" data-form="forward" data-kind="${t}" data-id="${e}">
          <div class="handle"></div>
          <h2>Forward task</h2>
          <p class="muted tight">${m(a||"")}</p>
          <p class="item-meta">From ${m(i||v)} — a copy will be created on the day you pick, marked “↩ Forwarded from ${m(i||v)}”.</p>
          <div class="form" style="margin-top:14px">
            <label>
              Forward to day
              <input name="targetDate" type="date" required value="${Qi(i||v)}" />
            </label>
            <button class="primary-btn" type="submit">Forward task →</button>
            <button class="ghost-btn" type="button" data-action="close-modal">Cancel</button>
          </div>
        </form>
      </div>
    `}if(x==="replace"){const{id:t,title:e,from:a,info:i}=$||{},n=i&&i.days||[];return`
      <div class="modal-backdrop open" data-action="close-modal">
        <form class="sheet" data-form="replace" data-id="${t}">
          <div class="handle"></div>
          <h2>Replace habit day</h2>
          <p class="muted tight">${m(e||"")}</p>
          <p class="item-meta">Currently due on <b>${m(a||v)}</b>. Its next direct day is <b>${m(i&&i.next||"")}</b>, so the day may only move to one of the ${n.length} day${n.length===1?"":"s"} in between — the allowable replace days.</p>
          <div class="form" style="margin-top:14px">
            <div class="replace-day-grid">
              ${n.map(s=>`<button type="button" class="chip replace-day-chip" data-action="pick-replace-day" data-date="${s}">${m(s)}</button>`).join("")}
            </div>
            <input type="hidden" name="targetDate" value="${n[0]||""}" />
            <button class="primary-btn" type="submit" ${n.length?"":"disabled"}>Replace day ⇄</button>
            <button class="ghost-btn" type="button" data-action="close-modal">Cancel</button>
          </div>
        </form>
      </div>
    `}if(x==="image"){const{image:t,title:e}=$||{};return t?`
      <div class="lightbox-backdrop" data-action="close-modal">
        <img src="${t}" alt="${m(e||"Task photo")}" />
        <button type="button" class="ghost-btn compact lightbox-close" data-action="close-modal">✕ Close</button>
      </div>
    `:""}return""}function h(){if(Ge){Sa();try{const t=d.isLocked(v);Ge.innerHTML=`
    <div class="app-shell">
      ${hs()}
      <main class="screen active">
        ${H==="today"?Zi():""}
        ${H==="profile"?ts():""}
        ${H==="history"?rs():""}
        ${H==="habits"?ps():""}
        ${H==="settings"?Rs():""}
      </main>
      ${["today","habits"].includes(H)&&!t?'<button class="fab" data-action="open-add" aria-label="Add">+</button>':""}
      ${H==="settings"?'<button class="fab" data-action="open-add-habit" aria-label="Add habit">+</button>':""}
      <nav class="tabbar tabs-5">
        <button class="tab ${H==="today"?"active":""}" data-screen="today">${L("home")}Today</button>
        <button class="tab ${H==="profile"?"active":""}" data-screen="profile">${L("profile")}Profile</button>
        <button class="tab ${H==="history"?"active":""}" data-screen="history">${L("history")}History</button>
        <button class="tab ${H==="habits"?"active":""}" data-screen="habits">${L("habit")}Activities</button>
        <button class="tab ${H==="settings"?"active":""}" data-screen="settings">${L("settings")}Settings</button>
      </nav>
    </div>
    ${js()}
    <div class="toast" id="toast"></div>
  `,Gs(),es(),Us(),Ws(),jt(),Bs()}catch(t){const e=t&&t.stack?String(t.stack).slice(0,400):t&&t.message?t.message:"Unknown error";Ge.innerHTML=`<div class="app-shell"><section class="manage-card"><h2>Could not load (Error B)</h2><p class="muted tight">${m(e)}</p><button class="primary-btn full" data-action="reload-app">Reload</button></section></div>`}}}function Bs(){if(x!=="habit"&&x!=="task")return;const t=document.querySelector(".sheet");t&&(t.scrollTop=0);const e=document.querySelector('.sheet input[name="title"]');if(e)try{e.focus({preventScroll:!0})}catch{try{e.focus()}catch{}}}function Gs(){const t=document.getElementById("day-note");t&&t.addEventListener("input",()=>{d.isLocked(v)||d.setNote(v,t.value)})}const _s=3e3,qs=180,tn=10,T={list:null,card:null,timer:null,startX:0,startY:0,dragging:!1,order0:"",swallowClick:!1,fromHandle:!1,bound:!1};function ra(){T.timer&&(clearTimeout(T.timer),T.timer=null),T.card=null,T.fromHandle=!1}function _n(t,e){return[...t.querySelectorAll(".item-card[data-sortable]")].filter(a=>a.dataset.sortable===e).map(a=>a.dataset.id)}function en(t){const e=T.card,a=T.list;if(ra(),T.list=null,T.dragging=!1,!e||(e.classList.remove("is-dragging"),a&&a.classList.remove("is-reordering"),document.body.classList.remove("is-reordering-body"),!t))return;const i=e.dataset.sortable,n=_n(a,i);n.join("|")!==T.order0&&(T.swallowClick=!0,setTimeout(()=>{T.swallowClick=!1},400),i==="habit"?(d.setHabitOrder(n),d.setHabitSort("custom")):i==="task"&&(d.setTaskOrder(v,n),d.setTaskSort("custom")),h(),g("Order saved"))}function Ws(){T.bound||(T.bound=!0,document.addEventListener("pointerdown",t=>{if(t.button!=null&&t.button!==0||t.target.closest("input, textarea, select, img, video, .stars, .mini-btn, .check, .fab, .tabbar"))return;const e=t.target.closest(".item-card[data-sortable]");if(!e)return;const a=e.closest(".list");if(!a||d.isLocked(v))return;const i=e.dataset.sortable,n=d.getSettings(),s=(i==="habit"?n.habitSort:n.taskSort)||"default";s!=="default"&&s!=="custom"&&(i==="habit"?d.setHabitSort("custom"):d.setTaskSort("custom"),g("Switched to Custom order so your drag sticks"));const r=t.target.closest(".drag-handle");r&&t.preventDefault(),ra(),T.list=a,T.card=e,T.fromHandle=!!r,T.startX=t.clientX,T.startY=t.clientY,T.order0=_n(a,i).join("|"),T.timer=setTimeout(()=>{T.timer=null,!(!T.card||!T.card.isConnected)&&(T.dragging=!0,navigator.vibrate&&navigator.vibrate(15),T.card.classList.add("is-dragging"),T.list.classList.add("is-reordering"),document.body.classList.add("is-reordering-body"),g("Drag to reorder, lift to drop"))},r?qs:_s)},!0),document.addEventListener("pointermove",t=>{if(T.timer&&T.card&&!T.fromHandle&&(Math.abs(t.clientX-T.startX)>tn||Math.abs(t.clientY-T.startY)>tn)){ra(),T.list=null;return}if(!T.dragging||!T.card)return;t.preventDefault();const e=T.card,a=T.list;if(!a)return;const i=t.clientY,n=e.dataset.sortable,s=[...a.querySelectorAll(".item-card[data-sortable]")].filter(o=>o!==e&&o.dataset.sortable===n);let r=!1;for(const o of s){const l=o.getBoundingClientRect();if(i<l.top+l.height/2){a.insertBefore(e,o),r=!0;break}}r||a.appendChild(e)},{passive:!1}),document.addEventListener("pointerup",()=>en(T.dragging)),document.addEventListener("pointercancel",()=>en(!1)),document.addEventListener("contextmenu",t=>{(T.dragging||T.card)&&t.preventDefault()}),document.addEventListener("touchmove",t=>{T.dragging&&t.preventDefault()},{passive:!1}),document.addEventListener("click",t=>{T.swallowClick&&(t.stopPropagation(),t.preventDefault())},!0))}function Us(){const t=document.getElementById("lock-time"),e=document.getElementById("auto-lock");t&&t.addEventListener("change",()=>{d.setLockTime(t.value),g(`Lock time set to ${t.value}`),h()}),e&&e.addEventListener("change",()=>{d.setAutoLock(e.checked),g(e.checked?"Auto-lock on":"Auto-lock off"),h()}),document.querySelectorAll("[data-cat-color]").forEach(i=>{i.addEventListener("input",()=>{var s;d.updateCategory(i.dataset.catColor,{color:i.value});const n=(s=i.closest(".cat-manage-card"))==null?void 0:s.querySelector(".cat-swatch");n&&(n.style.background=i.value)})}),document.querySelectorAll("[data-cat-goals]").forEach(i=>{const n=()=>{const s=i.dataset.catGoals,r=i.closest(".cat-manage-card");if(!r)return;const o=Vt((d.getCategories().find(p=>p.id===s)||{}).goals||""),l=Qt(Vt(i.value))!==Qt(o),c=r.querySelector('[data-action="save-cat-goals"]');c&&(c.textContent=l?"Save goals":"Saved");const f=r.querySelector('[data-action="reset-cat-goals"]');f&&(f.hidden=!l);const b=r.querySelector(".cat-goal-hint");b&&(b.textContent=l?"Unsaved changes — press Save to keep them offline and in backups.":"Saved on this device and included in every backup.")};i.addEventListener("input",()=>{It.set(i.dataset.catGoals,i.value),n()}),i.addEventListener("change",n)});const a=document.getElementById("backup-file");a&&a.addEventListener("change",()=>{const i=a.files[0];if(!i)return;const n=new FileReader;n.onload=()=>{jn(String(n.result||""),i.name),a.value=""},n.onerror=()=>{g("Couldn't read that file."),a.value=""},n.readAsText(i)})}function g(t){const e=document.getElementById("toast");e&&(e.textContent=t,e.classList.add("show"),setTimeout(()=>e.classList.remove("show"),1800))}function Rt(){const t=d.getTheme();document.documentElement.dataset.theme=t;const e=document.querySelector('meta[name="theme-color"]');e&&(e.content=t==="light"?"#f3f1ea":"#0e1116")}function m(t){return String(t||"").split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;").split('"').join("&quot;")}function R(){return d.isLocked(v)?(g("This report is locked. Unlock it in Settings."),!0):!1}function Aa(t){return{mode:(t==null?void 0:t.mode)||"forever",until:(t==null?void 0:t.until)||"",weekdays:Array.isArray(t==null?void 0:t.weekdays)?t.weekdays.map(Number):[],monthDays:Array.isArray(t==null?void 0:t.monthDays)?t.monthDays.map(Number):[],yearDays:Array.isArray(t==null?void 0:t.yearDays)?[...t.yearDays]:[],customDates:Array.isArray(t==null?void 0:t.customDates)?[...t.customDates]:[],exceptDates:Array.isArray(t==null?void 0:t.exceptDates)?[...t.exceptDates]:Array.isArray(t==null?void 0:t.exceptions)?[...t.exceptions]:[]}}function zs(t){const e=d.findHabit(t);e&&(x="pin",$={kind:"habit",id:t,title:e.name,pin:e.pin?Aa(e.pin):{mode:"forever",until:"",weekdays:[],monthDays:[],yearDays:[],customDates:[],exceptDates:[]},_exceptCal:F(v),_customCal:F(v),_yearMonth:"01"})}function Ys(t){const e=d.findTask(v,t);if(!e)return;const a=e.sourcePinId?d.findPinnedTask(e.sourcePinId):null;x="pin",$={kind:"task",id:t,title:e.title,pin:a!=null&&a.pin?Aa(a.pin):{mode:"forever",until:"",weekdays:[],monthDays:[],yearDays:[],customDates:[],exceptDates:[]},_exceptCal:F(v),_customCal:F(v),_yearMonth:"01"}}function Js(t){const e=d.findPinnedTask(t);e&&(x="pin",$={kind:"template",id:t,title:e.title,pin:e.pin?Aa(e.pin):{mode:"forever",until:"",weekdays:[],monthDays:[],yearDays:[],customDates:[],exceptDates:[]},_exceptCal:F(v),_customCal:F(v),_yearMonth:"01"})}function Vs(t){var c;const e=t.querySelector('input[name="mode"]').value,a=((c=t.querySelector('input[name="until"]'))==null?void 0:c.value)||"",i=[...t.querySelectorAll(".weekday.on")].map(f=>Number(f.dataset.day)),n=[...t.querySelectorAll(".monthday.on")].map(f=>Number(f.dataset.day)),s=$&&$.pin||{},r=Array.isArray(s.yearDays)?s.yearDays:[],o=Array.isArray(s.customDates)?s.customDates:[],l=Array.isArray(s.exceptDates)?s.exceptDates:[];return e==="until"&&!a?(g("Pick an until date"),null):e==="weekly"&&!i.length?(g("Pick at least one weekday"),null):e==="monthly"&&!n.length?(g("Pick at least one day of month"),null):e==="yearly"&&!r.length?(g("Add at least one yearly date"),null):e==="custom"&&!o.length?(g("Pick at least one custom date"),null):{mode:e,until:a,weekdays:i,monthDays:n,yearDays:r,customDates:o,exceptDates:l}}function Ot(t,e,a){const i=e instanceof Blob?e:new Blob([e],{type:a||"text/plain;charset=utf-8"}),n=URL.createObjectURL(i),s=document.createElement("a");s.href=n,s.download=t,document.body.appendChild(s),s.click(),setTimeout(()=>{document.body.removeChild(s),URL.revokeObjectURL(n)},500)}function _t(t){const e=String(t??"");return/[",\n]/.test(e)?`"${e.replace(/"/g,'""')}"`:e}function xa(t,e){const[a,i]=d.resolveRange(t,e||v);return{range:t,start:a,end:i,rows:d.exportRows(a,i)}}function an(t,e){const a=t||$&&$.range||"day",{start:i,end:n,rows:s}=xa(a,e),r=[];r.push(["Second Mind export",`${i} to ${n}`].map(_t).join(",")),r.push(["Date","Type","Name","Category","Tags","Points","Rating","Earned","ConsciousPts","Status","Note/Description"].map(_t).join(",")),s.forEach(o=>{o.habits.forEach(l=>{r.push([o.date,"Habit",l.name,l.category,(l.tags||[]).join("|"),l.points,l.rating,l.earned,l.consciousPoints,l.status||(l.rating>0?"done":o.locked?"missed":"pending"),l.description||""].map(_t).join(","))}),o.tasks.forEach(l=>{r.push([o.date,"Task",l.hasImage?`${l.title} [photo]`:l.title,l.category,(l.tags||[]).join("|"),l.points,l.rating||"",l.earned,"",l.status||(l.done?"done":o.locked?"missed":"pending"),l.description||""].map(_t).join(","))}),r.push([o.date,"Summary",`Earned ${o.earned}/${o.max} (${o.percent}%)`,"","","","","","",o.locked?"locked":"open",o.note||""].map(_t).join(","))}),Ot(`second-mind-${a}-${i}-to-${n}.csv`,"\uFEFF"+r.join(`
`),"text/csv;charset=utf-8"),g("Excel (CSV) exported")}function nn(t,e){const a=t||$&&$.range||"day",{start:i,end:n,rows:s}=xa(a,e),r={app:"Second Mind",exportedAt:new Date().toISOString(),range:a,start:i,end:n,days:s};Ot(`second-mind-${a}-${i}-to-${n}.json`,JSON.stringify(r,null,2),"application/json"),g("JSON exported")}function sn(t,e){const a=t||$&&$.range||"day",{start:i,end:n,rows:s}=xa(a,e),r=s.map(l=>`
        <section style="margin-bottom:18px;border:1px solid #ddd;border-radius:12px;padding:12px">
          <h2 style="margin:0 0 4px;font-size:16px">${m(l.date)} — ${l.earned}/${l.max} pts (${l.percent}%)</h2>
          <p style="margin:0 0 8px;font-size:12px;color:#555">Habits ${l.habitScore} + Conscious ${l.consciousScore} + Tasks ${l.taskScore} · ${l.locked?"Locked":"Open"}${l.note?` · Note: ${m(l.note)}`:""}</p>
          <table style="width:100%;border-collapse:collapse;font-size:12px">
            <thead><tr><th align="left">Type</th><th align="left">Name</th><th align="left">Category</th><th>Points</th><th>Rating</th><th>Earned</th><th>Status</th></tr></thead>
            <tbody>
              ${l.habits.map(c=>`<tr><td>Habit</td><td>${m(c.name)}${c.description?` (${m(c.description)})`:""}</td><td>${m(c.category)}</td><td align="center">${c.points}${c.consciousPoints?`+${c.consciousPoints}🧠`:""}</td><td align="center">${c.rating||"-"}/5</td><td align="center">${c.earned}</td><td align="center">${c.status||(c.rating>0?"done":l.locked?"missed":"pending")}</td></tr>`).join("")}
              ${l.tasks.map(c=>`<tr><td>Task</td><td>${m(c.title)}${c.hasImage?" 📷":""}${c.description?` (${m(c.description)})`:""}</td><td>${m(c.category)}</td><td align="center">${c.points}</td><td align="center">${c.rating?`${c.rating}/5`:"-"}</td><td align="center">${c.earned}</td><td align="center">${c.status||(c.done?"done":l.locked?"missed":"pending")}</td></tr>`).join("")}
            </tbody>
          </table>
        </section>
      `).join(""),o=window.open("","_blank");if(!o){g("Popup blocked — allow popups to export PDF");return}o.document.write(`<!DOCTYPE html><html><head><title>Second Mind ${i} to ${n}</title></head><body style="font-family:sans-serif;padding:24px"><h1>Second Mind — ${i} to ${n}</h1>${r}<script>window.onload=function(){window.print()}<\/script></body></html>`),o.document.close(),g("PDF print view opened")}document.addEventListener("click",t=>{const e=t.target.closest("[data-screen]");if(e){H=e.dataset.screen,h();return}const a=t.target.closest("[data-action]");if(!a)return;const i=a.dataset.action;if(i==="close-modal"){if(x==="image"){x=null,$=null,h();return}(t.target.classList.contains("modal-backdrop")||a.classList.contains("ghost-btn"))&&(x=null,$=null,h());return}if(i==="note-bullets"){Ja("bullets");return}if(i==="note-numbered"){Ja("numbered");return}if(i==="values-bullets"){Va("bullets");return}if(i==="values-numbered"){Va("numbered");return}if(i==="pick-task-image"){const n=document.getElementById("task-image-input");n?n.click():g("Photo picking needs a browser file picker");return}if(i==="remove-task-image"){$&&($._image="",h(),g("Photo removed — save to apply"));return}if(i==="view-task-image"){const n=d.findTask(v,a.dataset.id),s=n&&n.image?n.image:$&&($._image||$.image)||"";if(!s){g("No photo on this task");return}x="image",$={image:s,title:n&&n.title||"Task photo"},h();return}if(i==="prev-day"&&Wa(-1),i==="next-day"&&Wa(1),i==="reload-app"){window.location.reload();return}if(i==="set-theme"){const n=a.dataset.theme==="light"?"light":"dark";d.setTheme(n),Rt(),g(n==="light"?"Light mode on":"Dark mode on")}if(i==="install-app"){Cs();return}if(i==="check-updates"){Ps();return}if(i==="apply-update"){Bn();return}if(i==="backup-now"){xs();return}if(i==="trigger-import"){const n=document.getElementById("backup-file");n&&n.click();return}if(i==="choose-folder"){ks();return}if(i==="grant-folder"){ws();return}if(i==="forget-folder"){$s();return}if(i==="drive-save-id"){const n=document.getElementById("drive-client-id"),s=d.setDriveClientId(n?n.value:"");g(s?"Client ID saved — press Connect to turn sync on":"That does not look like a Client ID"),h();return}if(i==="drive-clear-id"){d.setDriveClientId(""),g("Client ID cleared — sync is off"),h();return}if(i==="drive-connect"){Ss();return}if(i==="drive-disconnect"){d.disconnectDrive(),g("Drive sync turned off — your data stays where it is"),h();return}if(i==="drive-enable"){d.resumeDriveSetup(),h();return}if(i==="drive-sync-now"){As();return}if(i==="restore-backup"){Ds(a.dataset.name);return}if(i==="goto-settings"&&(H="settings"),i==="open-add-habit"&&(x="habit",$=null),i==="open-add-task"){if(R())return;x="task",$={category:"mentally"}}if(i==="open-add"){if(R())return;x="choose",$={category:"mentally"}}if(i==="toggle-edit"&&(K=!K),i==="toggle-settings-edit"){yt=!yt,h();return}if(i==="toggle-setting-habit"){const n=a.dataset.id;fe.has(n)?fe.delete(n):fe.add(n),h();return}if(i==="toggle-settings-section"){const n=a.dataset.id;Wt.has(n)?Wt.delete(n):Wt.add(n),n==="tutorials"&&!Wt.has("tutorials")&&(ge=null),h();return}if(i==="open-tutorial"){ge=ge===a.dataset.id?null:a.dataset.id,h();return}if(i==="toggle-activity-cat"){const n=a.dataset.id;he.has(n)?he.delete(n):he.add(n),h();return}if(i==="add-goal-item"){const n=a.dataset.id,s=document.getElementById(`goal-item-input-${n}`),r=d.addGoalItem(n,s?s.value:"");r.ok?g("Task added to goal"):g(r.reason||"Could not add a task"),h();return}if(i==="toggle-goal-item"){const{id:n,item:s,done:r}=a.dataset,o=d.setGoalItemDone(n,s,r!=="true");if(!o.ok){g(o.reason||"Could not update the task"),h();return}const l=o.awarded&&o.awarded.length?o.awarded:d.checkGoals(v);l.length?g(`🏅 Reward earned: ${l[0].rewardTitle}!`):o.revoked&&o.revoked.length?g("Badge returned — not earned yet"):o.autoLocked&&g("All tasks done — goal completed and locked 🔒"),h();return}if(i==="toggle-goal-slot"){const{id:n,item:s,slot:r,on:o}=a.dataset,l=d.setGoalItemSlot(n,s,r,o!=="true");if(!l.ok){g(l.reason||"Could not update the day"),h();return}const c=l.awarded||[];c.length?g(`🏅 Reward earned: ${c[0].rewardTitle}!`):l.autoLocked?g("All days ticked — goal completed and locked 🔒"):l.revoked&&l.revoked.length?g("Badge returned — not earned yet"):l.done&&g("Task complete ✓ — every pinned day ticked"),h();return}if(i==="remove-goal-item"){const n=d.removeGoalItem(a.dataset.id,a.dataset.item);g(n.ok?"Task removed from goal":n.reason||"Could not remove"),h();return}if(i==="lock-goal"){const n=d.findGoal(a.dataset.id),s=d.setGoalLocked(a.dataset.id,!0),r=n&&s.ok&&n.tasks.length>0&&!n.tasks.every(o=>d.goalTaskDone(o));s.ok?g(r?"Goal locked and terminated ⛔":"Goal locked 🔒"):g(s.reason||"Could not lock"),h();return}if(i==="unlock-goal"){const n=d.setGoalLocked(a.dataset.id,!1);g(n.ok?"Goal unlocked":n.reason||"Could not unlock"),h();return}if(i==="move-pinned-habit"){const n=d.getPinnedHabits(),s=n.findIndex(o=>o.id===a.dataset.id),r=s+(Number(a.dataset.dir)||0);if(s>=0&&r>=0&&r<n.length){const o=n[s];n[s]=n[r],n[r]=o,d.setPinnedHabitOrder(n.map(l=>l.id))}h();return}if(i==="move-pinned-task"){const n=d.getPinnedTasks(),s=n.findIndex(o=>o.id===a.dataset.id),r=s+(Number(a.dataset.dir)||0);if(s>=0&&r>=0&&r<n.length){const o=n[s];n[s]=n[r],n[r]=o,d.setPinnedTaskOrder(n.map(l=>l.id))}h();return}if(i==="open-habit-activity-date"){v=a.dataset.date,H="today",h();return}if(i==="open-edit-habit"){const n=d.findHabit(a.dataset.id);if(!n)return;x="edit-habit",$={id:n.id,name:n.name,description:n.description||"",points:n.points,category:n.category,tags:n.tags||[],consciousPoints:Number(n.consciousPoints)||0}}if(i==="open-edit-task"){if(R())return;const n=d.findTask(v,a.dataset.id);if(!n)return;x="edit-task",$={id:n.id,title:n.title,points:n.points,description:n.description,category:n.category,tags:n.tags||[],rating:Number(n.rating)||0,image:n.image||"",_image:void 0}}if(i==="open-edit-pinned-task"){const n=d.findPinnedTask(a.dataset.id);if(!n)return;x="edit-pinned-task",$={id:n.id,title:n.title,points:n.points,description:n.description||"",category:n.category,tags:n.tags||[],rating:0,image:n.image||"",_image:void 0}}if(i==="toggle-badges"&&(xe=!xe),i==="open-goal"&&(x="goal",$={kind:"habit-streak",targetDays:7,tier:"bronze"}),i==="open-edit-goal"){const n=d.getGoals().find(s=>s.id===a.dataset.id);if(!n)return;x="edit-goal",$={...n}}if(i==="remove-goal"&&(d.removeGoal(a.dataset.id),g("Goal removed")),i==="remove-badge"&&(d.removeBadge(a.dataset.id),g("Badge removed")),i==="rate-habit"){if(R())return;const s=d.habitRating(v,a.dataset.id)===Number(a.dataset.rating)?0:Number(a.dataset.rating);d.setHabitRating(v,a.dataset.id,s)}if(i==="rate-task"){if(R())return;const n=d.findTask(v,a.dataset.id);if(!n)return;const r=(Number(n.rating)||0)===Number(a.dataset.rating)?0:Number(a.dataset.rating);d.setTaskRating(v,a.dataset.id,r)}if(i==="open-export"&&(x="export",$={range:$&&$.range||"day"}),i==="set-export-range"){x="export",$={range:a.dataset.range||"day"},h();return}if(i==="do-export"){const n=a.dataset.format,s=$&&$.range||"day";n==="csv"&&an(s,v),n==="json"&&nn(s,v),n==="pdf"&&sn(s,v),x=null,$=null}if(i==="set-histexp-range"){U=["day","week","month","year"].includes(a.dataset.range)?a.dataset.range:"day",h();return}if(i==="histexp-do"){const n=a.dataset.format;let s=v;if(U==="day"||U==="week"){const r=document.getElementById("histexp-date");r&&/^\d{4}-\d{2}-\d{2}$/.test(r.value)&&(s=r.value)}else if(U==="month"){const r=document.getElementById("histexp-month");r&&/^\d{4}-\d{2}$/.test(r.value)&&(s=`${r.value}-15`)}else if(U==="year"){const r=document.getElementById("histexp-year"),o=Number(r&&r.value);Number.isInteger(o)&&o>=2e3&&o<=2100&&(s=`${String(o)}-06-15`)}n==="csv"&&an(U,s),n==="json"&&nn(U,s),n==="pdf"&&sn(U,s);return}if(i==="history-cal-nav"){const n=De||F(v);De=Et(n,Number(a.dataset.dir)||0),h();return}if(i==="locked-cal-nav"){const n=Ce||F(v);Ce=Et(n,Number(a.dataset.dir)||0),h();return}if(i==="notes-cal-nav"){const n=ia||F(v);ia=Et(n,Number(a.dataset.dir)||0),h();return}if(i==="show-day-note"){const n=a.dataset.date;if(!d.noteFor(n))return;Ct=n,h();return}if(i==="toggle-locked-day"){const n=a.dataset.date,s=O.indexOf(n);s>=0?O.splice(s,1):O.push(n),h();return}if(i==="lock-selected"){const n=[...O].sort();if(!n.length)return;const s=d.lockDays(n);O=[],g(s===1?`Locked ${s} day`:`Locked ${s} days`),h();return}if(i==="unlock-selected"){const n=[...O].sort();if(!n.length)return;const s=d.unlockDays(n);O=[],g(s===1?`Unlocked ${s} day`:`Unlocked ${s} days`),h();return}if(i==="submit-day"&&(d.submitDay(v),g("Report submitted and locked")),i==="unlock-day"&&(d.unlockDay(a.dataset.date),g("Report unlocked")),i==="toggle-habit"){if(R())return;d.toggleHabit(v,a.dataset.id),h()}if(i==="toggle-task"){if(R())return;d.toggleTask(v,a.dataset.id),h()}if(i==="remove-task"){if(!K||R())return;d.removeTask(v,a.dataset.id),h()}if(i==="remove-habit"&&(d.removeHabit(a.dataset.id),h()),i==="restore-habit"){const n=d.restoreHabit(a.dataset.id);g(n.ok?"Habit restored":n.reason||"Could not restore that habit"),h()}if(i==="toggle-archive"){St=!St,h();return}if(i==="archive-habit"){d.removeHabit(a.dataset.id),St=!0,g("Habit archived — restore it from the Archive"),h();return}if(i==="archive-task"){if(R())return;const n=d.archiveTask(v,a.dataset.id);if(!n.ok){g(n.reason||"Could not archive that task");return}St=!0,g("Task archived — restore it from the Archive"),h();return}if(i==="restore-task"){const n=d.isLocked(v)?d.todayKey():v,s=d.restoreTask(a.dataset.id,n);s.ok?g(s.from&&s.from!==n?`Task restored to ${n} — forwarded from ${s.from}`:`Task restored to ${n}`):g(s.reason||"Could not restore that task"),n!==v&&(v=n),h();return}if(i==="delete-archived-task"){if(!K||!window.confirm("Delete this archived task permanently? This cannot be undone."))return;const n=d.deleteArchivedTask(a.dataset.id);g(n.ok?"Task deleted permanently":n.reason||"Could not delete"),h();return}if(i==="delete-archived-habit"){if(!window.confirm("Delete this archived habit permanently? This cannot be undone."))return;const n=d.deleteArchivedHabit(a.dataset.id);g(n.ok?"Habit deleted permanently":n.reason||"Could not delete"),h();return}if(i==="open-pin-habit"&&zs(a.dataset.id),i==="open-replace-habit"){if(R())return;const n=d.findHabit(a.dataset.id);if(!n)return;const s=d.habitReplaceDays(v,n.id);x="replace",$={id:n.id,title:n.name,from:v,info:s};return}if(i==="pick-replace-day"){const n=document.querySelector('.sheet input[name="targetDate"]');n&&(n.value=a.dataset.date),document.querySelectorAll(".replace-day-chip").forEach(s=>{s.classList.toggle("on",s.dataset.date===a.dataset.date)});return}if(i==="undo-replace-habit"){if(R())return;const n=d.undoReplaceHabit(a.dataset.id,a.dataset.from,a.dataset.to);g(n.ok?"Habit is due on this day again":n.reason||"Could not undo that"),h();return}if(i==="open-forward-task"){if(R())return;const n=d.findTask(v,a.dataset.id);if(!n)return;x="forward",$={kind:"task",id:n.id,title:n.title,from:v}}if(i==="open-pin-task"){if(R())return;Ys(a.dataset.id)}if(i==="open-pin-template"&&Js(a.dataset.id),i==="unpin-template"&&(d.unpinTaskTemplate(a.dataset.id),g("Task unpinned — removed from today and all upcoming days")),i==="pick-date"&&(v=a.dataset.date,st=0,H="today"),i==="set-chart-range"){Z=["week","month","year"].includes(a.dataset.range)?a.dataset.range:"week",lt=0,h();return}if(i==="set-chart-cat"){at=a.dataset.cat||"all",h();return}if(i==="week-nav"){st+=Number(a.dataset.dir)||0,st>0&&(st=0),h();return}if(i==="chart-nav"){lt+=Number(a.dataset.dir)||0,lt>0&&(lt=0),h();return}if(i==="add-category"){const n=document.getElementById("new-category"),s=d.addCategory(n?n.value:"");g(s.ok?"Category added":s.reason||"Couldn't add category"),h();return}if(i==="rename-category"){const n=d.getCustomCategories().find(o=>o.id===a.dataset.id),s=window.prompt("Rename category",n?n.label:"");if(s==null)return;const r=d.renameCategory(a.dataset.id,s);g(r.ok?"Category renamed":r.reason||"Couldn't rename"),h();return}if(i==="delete-category"){if(!window.confirm("Delete this category? Its habits and tasks move to Mentally."))return;const n=d.deleteCategory(a.dataset.id);n.ok&&ht.delete(a.dataset.id),g(n.ok?"Category deleted":n.reason||"Couldn't delete"),h();return}if(i==="rename-tag"){const n=window.prompt("Rename tag everywhere",a.dataset.tag||"");if(n==null)return;const s=d.renameTag(a.dataset.tag,n);g(s.ok?s.merged?"Tags merged":"Tag renamed everywhere":s.reason||"Couldn't rename"),h();return}if(i==="delete-tag"){if(!window.confirm(`Delete tag "#${a.dataset.tag}" from all habits and tasks?`))return;d.deleteTag(a.dataset.tag),g("Tag deleted everywhere"),h();return}if(i==="add-tag"){const n=document.getElementById("tag-habit-pick"),s=document.getElementById("new-tag"),r=d.addTagToHabit(n?n.value:"",s?s.value:"");g(r.ok?"Tag added to habit":r.reason||"Couldn't add tag"),h();return}if(i==="set-points"){const n=document.querySelector('input[name="points"]');n&&(n.value=a.dataset.points),document.querySelectorAll(".chip-row .chip[data-points]").forEach(s=>s.classList.remove("on")),a.classList.add("on");return}if(i==="set-category"){const n=a.closest("form")||a.closest(".sheet"),s=n.querySelector('input[name="category"]');s&&(s.value=a.dataset.category),n.querySelectorAll(".cat-row .chip").forEach(r=>r.classList.remove("on")),a.classList.add("on");return}if(i==="set-rating"){const n=a.closest(".sheet")||a.closest("form")||document,s=n.querySelector('input[name="rating"]');s&&(s.value=a.dataset.rating),n.querySelectorAll(".rating-row .chip").forEach(r=>r.classList.remove("on")),a.classList.add("on");return}if(i==="set-conscious"){const n=a.closest(".sheet")||a.closest("form")||document,s=n.querySelector('input[name="consciousPoints"]');s&&(s.value=a.dataset.conscious),n.querySelectorAll(".conscious-row .chip").forEach(r=>r.classList.remove("on")),a.classList.add("on");return}if(i==="set-goal-kind"){const n=a.closest(".sheet")||document,s=n.querySelector('input[name="kind"]');s&&(s.value=a.dataset.kind),n.querySelectorAll(".goal-kind-row .chip").forEach(f=>f.classList.remove("on")),a.classList.add("on");const r=a.dataset.kind,o=n.querySelector(".goal-target-habit"),l=n.querySelectorAll(".goal-target-task, .goal-target-days"),c=n.querySelector(".goal-attach");o&&(o.style.display=r==="habit-streak"?"":"none"),l.forEach(f=>{f.style.display=r==="task-streak"||r==="perfect-days"?"":"none"}),c&&(c.style.display=r==="task-list"?"":"none"),$&&($.kind=r);return}if(i==="set-goal-tier"){const n=a.closest(".sheet")||document,s=n.querySelector('input[name="tier"]');s&&(s.value=a.dataset.tier),n.querySelectorAll(".goal-tier-row .chip").forEach(r=>r.classList.remove("on")),a.classList.add("on");return}if(i==="pin-mode"){const n=a.closest("form"),s=a.dataset.mode;n.querySelector('input[name="mode"]').value=s,n.querySelectorAll(".pin-modes .chip").forEach(o=>o.classList.remove("on")),a.classList.add("on");const r=(o,l)=>{const c=n.querySelector(o);c&&(c.style.display=l?"":"none")};r(".pin-until",s==="until"),r(".pin-weekdays",s==="weekly"),r(".pin-monthdays",s==="monthly"),r(".pin-yeardays",s==="yearly"),$&&$.pin&&($.pin.mode=s);return}if(i==="toggle-weekday"){a.classList.toggle("on");return}if(i==="toggle-monthday"){a.classList.toggle("on");return}if(i==="pin-cal-nav"){if(!$)return;const n=a.dataset.target,s=Number(a.dataset.dir)||0;n==="except"?$._exceptCal=Et($._exceptCal||F(v),s):$._customCal=Et($._customCal||F(v),s),h();return}if(i==="toggle-pin-date"){if(!$||!$.pin)return;const n=a.dataset.target,s=a.dataset.date,r=n==="custom"?"customDates":"exceptDates",o=Array.isArray($.pin[r])?[...$.pin[r]]:[],l=o.indexOf(s);l>=0?o.splice(l,1):(o.push(s),o.length>365&&o.shift()),$.pin[r]=o.sort(),h();return}if(i==="add-year-day"){if(!$||!$.pin)return;const n=a.closest("form")||document,s=n.querySelector("#year-month-select"),r=n.querySelector("#year-day-select");s&&($._yearMonth=s.value);const o=`${s?s.value:"01"}-${r?r.value:"01"}`,l=Array.isArray($.pin.yearDays)?[...$.pin.yearDays]:[];l.includes(o)||l.push(o),$.pin.yearDays=l.sort(),h();return}if(i==="remove-year-day"){if(!$||!$.pin)return;const n=a.dataset.date;$.pin.yearDays=($.pin.yearDays||[]).filter(s=>s!==n),h();return}if(i==="clear-pin"){const n=a.closest("form"),s=n.dataset.kind,r=n.dataset.id;let o=!1;if(s==="habit"&&d.unpinHabit(r),s==="task"){const l=d.findTask(v,r);l!=null&&l.sourcePinId&&(d.unpinTaskTemplate(l.sourcePinId),o=!0)}s==="template"&&(d.unpinTaskTemplate(r),o=!0),x=null,$=null,g(o?"Task unpinned — removed from today and all upcoming days":"Unpinned"),h();return}if(i==="lock-profile"){d.setProfileLocked(!0),g("Profile locked — read only"),h();return}if(i==="unlock-profile"){d.setProfileLocked(!1),g("Profile unlocked"),h();return}if(i==="add-whoami"){const n=document.getElementById("new-whoami"),s=d.addWhoAmI(n?n.value:"");g(s.ok?"Added":s.reason||"Couldn't add"),h();return}if(i==="move-whoami"){d.moveWhoAmI(a.dataset.id,Number(a.dataset.dir)||0),h();return}if(i==="remove-whoami"){d.removeWhoAmI(a.dataset.id),g("Removed"),h();return}if(i==="add-lifearea"){const n=document.getElementById("new-lifearea"),s=d.addLifeArea(n?n.value:"");s.ok?(Dt=s.id,g("Life area added")):g(s.reason||"Couldn't add"),h();return}if(i==="toggle-lifearea"){const n=a.dataset.id;Dt=Dt===n?null:n,h();return}if(i==="move-lifearea"){d.moveLifeArea(a.dataset.id,Number(a.dataset.dir)||0),h();return}if(i==="toggle-cat"){const n=a.dataset.id;ht.has(n)?ht.delete(n):ht.add(n),h();const s=document.querySelector(`[data-action="toggle-cat"][data-id="${CSS.escape(n)}"]`);s&&s.focus({preventScroll:!0});return}if(i==="expand-cats"){d.getCategories().forEach(n=>ht.add(n.id)),h();return}if(i==="collapse-cats"){ht.clear(),h();return}if(i==="save-cat-goals"){const n=a.dataset.id,s=document.querySelector(`[data-cat-goals="${CSS.escape(n)}"]`),r=s?s.value:It.get(n)||"",o=Vt(r);d.updateCategory(n,{goals:Qt(o)}),It.delete(n),g(o.length?`Saved ${o.length} goal${o.length===1?"":"s"} for ${ut(n)}`:`Cleared goals for ${ut(n)}`),h();return}if(i==="reset-cat-goals"){const n=a.dataset.id;It.delete(n),h();return}if(i==="remove-lifearea"){d.removeLifeArea(a.dataset.id),Dt===a.dataset.id&&(Dt=null),g("Life area removed"),h();return}if(i==="set-pgoal-term"){it=["short","medium","long"].includes(a.dataset.term)?a.dataset.term:"short",Mt=d.profileGoalDurations()[it][0],h();return}if(i==="set-pgoal-filter"){me=["all","short","medium","long"].includes(a.dataset.filter)?a.dataset.filter:"all",h();return}if(i==="add-pgoal"){const n=document.getElementById("new-pgoal"),s=document.getElementById("new-pgoal-duration"),r=d.addProfileGoal(n?n.value:"",it,s?s.value:Mt);g(r.ok?`Goal added ${be(it)}`:r.reason||"Couldn't add"),h();return}if(i==="remove-pgoal"){d.removeProfileGoal(a.dataset.id),g("Goal removed"),h();return}if(i==="add-idea"){const n=document.getElementById("new-idea"),s=String(n?n.value:"").trim().slice(0,200);if(!s){g("Write an idea first");return}if(d.isProfileLocked()){g("Profile is locked");return}const r=String(d.getProfile().ideas||"").split(`
`).map(o=>o.trim()).filter(Boolean);r.push(`• ${s}`),d.setProfileField("ideas",r.join(`
`)),g("Idea added"),h();return}if(i==="remove-idea"){if(d.isProfileLocked())return;const n=Number(a.dataset.index),s=String(d.getProfile().ideas||"").split(`
`).filter(r=>r.trim());if(!Number.isInteger(n)||n<0||n>=s.length)return;s.splice(n,1),d.setProfileField("ideas",s.join(`
`)),g("Idea removed"),h();return}if(i==="add-quote"){const n=document.getElementById("new-quote"),s=document.getElementById("new-quote-author"),r=d.addQuote(n?n.value:"",s?s.value:"");g(r.ok?"Quote added":r.reason||"Couldn't add"),h();return}if(i==="toggle-quote-fav"){d.toggleQuoteFav(a.dataset.id),h();return}if(i==="remove-quote"){d.removeQuote(a.dataset.id),g("Quote removed"),h();return}if(i==="toggle-quotes"){zt=!zt,h();return}h()});document.addEventListener("submit",t=>{const e=t.target.closest("[data-form]");if(!e)return;t.preventDefault();const a=e.dataset.form;if(a==="habit"||a==="task"||a==="edit-habit"||a==="edit-task"||a==="edit-pinned-task"){const i=new FormData(e),n=String(i.get("title")||""),s=Number(i.get("points")||0),r=String(i.get("category")||"mentally"),o=String(i.get("description")||""),l=String(i.get("tags")||""),c=Math.max(0,Math.min(5,Number(i.get("rating")||0))),f=Math.max(0,Math.min(100,Number(i.get("consciousPoints")||0)));if(!n.trim())return;const b=$&&$._image!==void 0?Y($._image):Y($&&$.image);if(a==="habit")d.addHabit(n,s,{description:o,category:r,consciousPoints:f,tags:l,startFrom:v}),g("Habit added");else if(a==="task"){const p=String(i.get("goalTarget")||"");if(p){const k=d.addGoalItem(p,n);if(!k.ok){g(k.reason||"Could not add the task to the goal");return}const A=d.findGoal(p);g(`Added to goal “${A?A.title:n}”`)}else{if(R())return;d.addTask(v,n,s,{description:o,category:r,rating:c,tags:l,image:b}),g("Task added")}}else if(a==="edit-habit")d.updateHabit(e.dataset.id,{name:n,description:o,points:s,category:r,consciousPoints:f,tags:l}),g("Habit updated");else if(a==="edit-pinned-task")d.updatePinnedTaskDetails(e.dataset.id,{title:n,description:o,points:s,category:r,tags:l,image:b}),g("Pinned task updated");else{if(R())return;d.updateTask(v,e.dataset.id,{title:n,points:s,description:o,category:r,rating:c,tags:l,image:b}),g("Task updated");const p=String(i.get("goalTarget")||"");if(p){const k=d.addGoalItems(p,[n]);k.ok&&k.added?g(`Attached to goal “${(d.findGoal(p)||{}).title}”`):k.ok?g("Already on that goal’s list"):g(k.reason||"Could not attach to the goal")}}x=null,$=null,h();return}if(a==="pin"){const i=Vs(e);if(!i)return;const n=e.dataset.kind,s=e.dataset.id;n==="habit"&&d.pinHabit(s,i),n==="task"&&d.pinTask(v,s,i),n==="template"&&d.updatePinnedTask(s,i),x=null,$=null,g("Pin saved"),h();return}if(a==="replace"){const i=new FormData(e),n=String(i.get("targetDate")||""),s=e.dataset.id,r=$&&$.from||v,o=d.replaceHabit(r,s,n);if(!o.ok){g(o.reason||"Could not replace that habit day");return}x=null,$=null,g(`Habit moved from ${o.from} to ${o.to}`),h();return}if(a==="goal"||a==="edit-goal"){const i=new FormData(e),n=String(i.get("title")||"").trim(),s=String(i.get("kind")||"habit-streak"),r=String(i.get("tier")||"bronze"),o=String(i.get("rewardTitle")||"").trim(),l=Math.max(1,Math.min(365,Number(i.get("targetDays")||7)));if(!n||!o){g("Goal title and reward title are required");return}let c="";if(s==="habit-streak"&&(c=String(i.get("habitTarget")||"")),s==="task-streak"&&(c=String(i.get("taskTarget")||"")),(s==="habit-streak"||s==="task-streak")&&!c){g(s==="habit-streak"?"Pick a habit":"Pin a task first, then pick it");return}if(a==="goal"){const b=d.addGoal({title:n,kind:s,targetId:c,targetDays:l,tier:r,rewardTitle:o});if(s==="task-list"){const p=Array.from(e.querySelectorAll('input[name="attachTask"]:checked')).map(A=>A.value),k=d.addGoalItems(b.id,p);g(k.added?`Goal added with ${k.added} task(s)`:"Goal added")}else g("Goal added")}else if(d.updateGoal(e.dataset.id,{title:n,kind:s,targetId:c,targetDays:l,tier:r,rewardTitle:o}),s==="task-list"){const b=Array.from(e.querySelectorAll('input[name="attachTask"]:checked')).map(k=>k.value),p=d.addGoalItems(e.dataset.id,b);g(p.added?`Goal updated — ${p.added} task(s) attached`:"Goal updated")}else g("Goal updated");const f=d.checkGoals(v);f.length&&g(`🏅 Reward earned: ${f[0].rewardTitle}!`),x=null,$=null,h()}});document.addEventListener("change",t=>{const e=t.target.closest(".sort-select");if(e){const a=e.dataset.sortKind;a==="habit"&&d.setHabitSort(e.value),a==="task"&&d.setTaskSort(e.value),h()}if(t.target&&t.target.id==="show-conscious"&&(d.setShowConscious(t.target.checked),g(t.target.checked?"Conscious points on":"Conscious points hidden"),h()),t.target&&t.target.id==="week-start"&&(d.setWeekStart(Number(t.target.value)),g("Week starts on "+t.target.selectedOptions[0].textContent),h()),t.target&&t.target.id==="new-pgoal-duration"){Mt=t.target.value;return}if(t.target&&t.target.id==="year-month-select"&&$&&($._yearMonth=t.target.value),t.target&&t.target.id==="task-image-input"){const a=t.target.files&&t.target.files[0];if(!a)return;if(!String(a.type||"").startsWith("image/")){g("Please pick an image file"),t.target.value="";return}g("Processing photo…"),Yi(a).then(i=>{if(t.target.value="",!i){g("Photo too large or unreadable — try a smaller one");return}$&&($._image=i,h(),g("Photo attached — save to apply"))})}});function Qs(){const t=window.visualViewport;if(!t)return;const e=document.documentElement,a=()=>{e.style.setProperty("--vvh",`${Math.max(0,Math.round(t.height))}px`);const i=window.innerHeight-t.height>120;e.classList.toggle("vk-open",i)};t.addEventListener("resize",a),t.addEventListener("scroll",a),a()}Qs();if("serviceWorker"in navigator){window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js").catch(()=>{})});let t=!1;try{const e=Number(sessionStorage.getItem("dr-reload-at")||0);Date.now()-e<8e3&&(t=!0)}catch{}navigator.serviceWorker.addEventListener("controllerchange",()=>{if(!t){t=!0;try{sessionStorage.setItem("dr-reload-at",String(Date.now()))}catch{}window.location.reload()}})}function Xs(){const t=document.getElementById("boot-error");t&&(t.style.display="none")}Xs();Rt();h();d.initFolderSync().then(t=>{if(t)return t.replaced&&(Rt(),g(t.status==="granted"?"Data loaded from your data folder":"Data restored from this device")),t.corrupt&&g("The data file was unreadable — a copy was saved aside, the newest good copy is in use"),jt(),(H==="settings"||t.replaced||t.corrupt)&&h(),d.initDriveSync().then(e=>{e&&(e.replaced?(Rt(),g("Google Drive had newer data — it has been loaded"),h()):H==="settings"&&h())})}).catch(()=>{});window.addEventListener("pagehide",()=>{d.flushFolderWrite().catch(()=>{}),d.flushDriveWrite().catch(()=>{})});document.addEventListener("visibilitychange",()=>{document.hidden&&(d.flushFolderWrite().catch(()=>{}),d.flushDriveWrite().catch(()=>{}))});setInterval(()=>{!document.hidden&&Sa()&&h()},6e4);document.addEventListener("visibilitychange",()=>{!document.hidden&&Sa()&&h()});
