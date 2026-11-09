(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();const lt="second-mind.json",Xe="daily-report.json",bn="second-mind-corrupt",ei="daily-report-fs",Et="kv",ha=["dataDir","backupDir"];function Ut(){return typeof window<"u"&&typeof window.showDirectoryPicker=="function"&&typeof indexedDB<"u"}function ai(){return window.showDirectoryPicker({id:"second-mind-data",mode:"readwrite"})}function ni(t){return!t||typeof t.queryPermission!="function"?Promise.resolve("granted"):t.queryPermission({mode:"readwrite"}).then(e=>["granted","denied","prompt"].includes(e)?e:"prompt",()=>"prompt")}function Fa(t){return!t||typeof t.requestPermission!="function"?Promise.resolve("granted"):t.requestPermission({mode:"readwrite"}).then(e=>["granted","denied","prompt"].includes(e)?e:"prompt",()=>"prompt")}function ba(){return new Promise((t,e)=>{if(typeof indexedDB>"u"){e(new Error("no-indexeddb"));return}const a=indexedDB.open(ei,1);a.onupgradeneeded=()=>{try{a.result.createObjectStore(Et)}catch{}},a.onsuccess=()=>t(a.result),a.onerror=()=>e(a.error)})}function ii(t){return ba().then(e=>new Promise((a,i)=>{const n=e.transaction(Et,"readonly").objectStore(Et).get(t);n.onsuccess=()=>a(n.result),n.onerror=()=>i(n.error)}))}function si(t,e){return ba().then(a=>new Promise((i,n)=>{const s=a.transaction(Et,"readwrite");s.objectStore(Et).put(e,t),s.oncomplete=()=>i(),s.onerror=()=>n(s.error),s.onabort=()=>n(s.error)}))}function oi(t){return ba().then(e=>new Promise((a,i)=>{const n=e.transaction(Et,"readwrite");n.objectStore(Et).delete(t),n.oncomplete=()=>a(),n.onerror=()=>i(n.error),n.onabort=()=>i(n.error)}))}async function ri(){for(const t of ha)try{const e=await ii(t);if(e)return e}catch{}return null}async function di(t){await si(ha[0],t)}async function li(){await Promise.all(ha.map(t=>oi(t).catch(()=>{})))}async function Ze(t,e){if(!t)return{missing:!0,raw:"",modified:0,error:"no-folder"};try{const i=await(await t.getFileHandle(e)).getFile();return{missing:!1,raw:await i.text(),modified:Number(i.lastModified)||0,error:""}}catch(a){return a&&(a.name==="NotFoundError"||a.name==="TypeMismatchError")?{missing:!0,raw:"",modified:0,error:""}:{missing:!1,raw:"",modified:0,error:String(a&&a.message||a)}}}async function ci(t){const e=await Ze(t,lt);if(!e.missing)return{...e,name:lt};const a=await Ze(t,Xe);return!a.missing&&!a.error?{...a,name:Xe}:{...e,name:lt}}async function ya(t,e,a){if(!t)return{ok:!1,denied:!1,error:"no-folder"};try{const n=await(await t.getFileHandle(e,{create:!0})).createWritable();return await n.write(a),await n.close(),{ok:!0,denied:!1,error:""}}catch(i){return{ok:!1,denied:!!(i&&(i.name==="NotAllowedError"||i.name==="SecurityError")),error:String(i&&i.message||i)}}}function ui(t,e){return ya(t,`${bn}-${Date.now()}.json`,e)}async function pi(t){const e=[];if(!t||typeof t.values!="function")return e;try{for await(const a of t.values())if(!(!a||a.kind!=="file"||!/\.json$/i.test(a.name)))try{const i=await a.getFile();e.push({name:a.name,modified:Number(i.lastModified)||0})}catch{}}catch{return e}return e}function fi(t){const e=String(t||"");return!(!/\.json$/i.test(e)||e===lt||e===Xe||e.startsWith(bn))}function gi(){return typeof navigator<"u"&&navigator.storage&&typeof navigator.storage.getDirectory=="function"}let de=null,Ra=!1;async function va(){if(Ra)return de;if(Ra=!0,!gi())return null;try{de=await navigator.storage.getDirectory()}catch{de=null}return de}async function mi(t,e){const a=await va();if(!a)return{ok:!1,error:"unsupported"};try{const n=await(await a.getFileHandle(t,{create:!0})).createWritable();return await n.write(e),await n.close(),{ok:!0,error:""}}catch(i){return{ok:!1,error:String(i&&i.message||i)}}}async function hi(t){const e=await va();if(!e)return{missing:!0,raw:"",modified:0,error:"unsupported"};try{const i=await(await e.getFileHandle(t)).getFile();return{missing:!1,raw:await i.text(),modified:Number(i.lastModified)||0,error:""}}catch(a){return a&&(a.name==="NotFoundError"||a.name==="TypeMismatchError")?{missing:!0,raw:"",modified:0,error:""}:{missing:!1,raw:"",modified:0,error:String(a&&a.message||a)}}}const bi={BASE_URL:"./",DEV:!1,MODE:"production",PROD:!0,SSR:!1},yi="https://www.googleapis.com/auth/drive.appdata",yn="https://www.googleapis.com/drive/v3/files",Oa="https://www.googleapis.com/upload/drive/v3/files",Ke="second-mind-drive-client-id",ka="second-mind-drive-token",ta="second-mind-drive-off",vi="https://accounts.google.com/gsi/client",vn=60*1e3;function $a(t){try{return typeof localStorage>"u"?null:localStorage.getItem(t)}catch{return null}}function wa(t,e){try{if(typeof localStorage>"u")return;localStorage.setItem(t,e)}catch{}}function Sa(t){try{if(typeof localStorage>"u")return;localStorage.removeItem(t)}catch{}}function je(){const t=$a(Ke);if(t&&t.trim())return t.trim();try{const e=bi&&void 0;e&&String(e).trim()}catch{}return""}function ki(t){const e=String(t||"").trim();return e?wa(Ke,e):Sa(Ke),pe=null,je()}function wt(){return!!je()}function ja(){return $a(ta)==="1"}function le(t){t?wa(ta,"1"):Sa(ta)}function kn(){const t=$a(ka);if(!t)return null;try{const e=JSON.parse(t);return!e||typeof e.access_token!="string"?null:e}catch{return null}}function $i(t){const e=Number(t&&t.expires_in)||3600,a={access_token:String(t.access_token),expires_at:Date.now()+e*1e3};return wa(ka,JSON.stringify(a)),a}function Ba(){const t=kn();return!!(t&&t.expires_at-vn>Date.now())}function $n(){Sa(ka)}let ce=null;function wi(){if(typeof window>"u")return Promise.reject(new Error("no-window"));const t=window.google&&window.google.accounts&&window.google.accounts.oauth2;return t&&typeof t.initTokenClient=="function"?Promise.resolve(t):typeof document>"u"?Promise.reject(new Error("no-document")):ce||(ce=new Promise((e,a)=>{const i=document.createElement("script");i.src=vi,i.async=!0,i.onload=()=>{const n=window.google&&window.google.accounts&&window.google.accounts.oauth2;n&&typeof n.initTokenClient=="function"?e(n):a(new Error("gis-unavailable"))},i.onerror=()=>a(new Error("gis-load-failed")),document.head.appendChild(i)}),ce)}let pe=null,Ga="",At=null;function Si(){const t=je();if(!t)return null;if(pe&&Ga===t)return pe;let e=null;try{e=window.google.accounts.oauth2.initTokenClient({client_id:t,scope:yi,callback:a=>{const i=At;At=null,i&&(a&&a.access_token?($i(a),i.resolve(a)):i.reject(new Error(a&&a.error||"access_denied")))},error_callback:a=>{const i=At;At=null,i&&i.reject(new Error(a&&a.type||"popup-closed"))}})}catch{return null}return!e||typeof e.requestAccessToken!="function"?null:(pe=e,Ga=t,e)}function ea(t){return wi().then(()=>new Promise((e,a)=>{let i=null;try{i=Si()}catch(n){a(n);return}if(!i){a(new Error(wt()?"gis-unavailable":"no-client-id"));return}if(At){a(new Error("busy"));return}At={resolve:e,reject:a};try{i.requestAccessToken({prompt:t||""})}catch(n){At=null,a(n)}}))}async function _a(){const t=kn();return t&&t.expires_at-vn>Date.now()?t.access_token:(await ea("")).access_token}async function Ai(){if(!wt())throw new Error("no-client-id");try{await ea("")}catch(t){if(!wn(t))throw t;await ea("consent")}return{ok:!0}}function wn(t){const e=String(t&&t.message||t||"");return e.includes("no-client-id")||e.includes("interaction_required")||e.includes("popup_closed")||e.includes("popup-closed")||e.includes("access_denied")||e.includes("login_required")||e.includes("gis-unavailable")}async function Ae(t,e){const a=await _a(),i=await fetch(t,{...e,headers:{...e&&e.headers,Authorization:`Bearer ${a}`}});if(i.status===401){$n();const n=await _a();return fetch(t,{...e,headers:{...e&&e.headers,Authorization:`Bearer ${n}`}})}return i}async function Sn(){const t=`name='${lt}' and 'appDataFolder' in parents`,e=`${yn}?q=${encodeURIComponent(t)}&spaces=appDataFolder&pageSize=1&fields=files(id,name,modifiedTime)`,a=await Ae(e,{method:"GET"});if(!a.ok)throw new Error(`drive-list-${a.status}`);const i=await a.json().catch(()=>({})),n=i&&Array.isArray(i.files)?i.files[0]:null;return n?{id:String(n.id),modified:Date.parse(n.modifiedTime)||0}:null}async function xi(){const t=await Sn();if(!t)return{missing:!0,raw:"",modified:0};const e=await Ae(`${yn}/${t.id}?alt=media`,{method:"GET"});if(!e.ok)throw new Error(`drive-read-${e.status}`);return{missing:!1,raw:await e.text(),modified:t.modified||Date.now()}}async function Ti(t){const e=await Sn();if(e){const o=await Ae(`${Oa}/${e.id}?uploadType=media`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:String(t)});if(!o.ok)throw new Error(`drive-write-${o.status}`);const l=await o.json().catch(()=>({}));return{ok:!0,id:e.id,modified:Date.parse(l.modifiedTime)||Date.now()}}const a=`secondmind${Date.now().toString(36)}`,i=JSON.stringify({name:lt,parents:["appDataFolder"]}),n=[`--${a}`,"Content-Type: application/json; charset=UTF-8","",i,`--${a}`,"Content-Type: application/json; charset=UTF-8","",String(t),`--${a}--`,""].join(`\r
`),s=await Ae(`${Oa}?uploadType=multipart`,{method:"POST",headers:{"Content-Type":`multipart/related; boundary=${a}`},body:n});if(!s.ok)throw new Error(`drive-create-${s.status}`);const r=await s.json().catch(()=>({}));return{ok:!0,id:String(r.id||""),modified:Date.parse(r.modifiedTime)||Date.now()}}const Aa=wn,An="daily-report-v2",xn="daily-report-v2-meta",ne=[{id:"mentally",label:"Mentally"},{id:"psychology",label:"Psychology"},{id:"physically",label:"Physically"},{id:"spiritually",label:"Spiritually"},{id:"socially",label:"Socially"}];ne.map(t=>t.id);const Tn=[{id:"h1",name:"Wake up early",points:10,icon:"sunrise",category:"physically",pin:{mode:"forever"}},{id:"h2",name:"Drink water",points:5,icon:"drop",category:"physically",pin:{mode:"forever"}},{id:"h3",name:"Exercise",points:15,icon:"bolt",category:"physically",pin:{mode:"forever"}},{id:"h4",name:"Read 20 minutes",points:10,icon:"book",category:"mentally",pin:{mode:"forever"}},{id:"h5",name:"No junk food",points:10,icon:"leaf",category:"physically",pin:{mode:"forever"}}],Dn={lockTime:"21:00",autoLock:!0,showConscious:!0,habitSort:"default",taskSort:"default",theme:"dark",habitOrder:[],pinnedTaskOrder:[],homeView:"compact",weekStart:1};function aa(t){const e=Number(t);return Number.isInteger(e)&&e>=0&&e<=6?e:1}const ie=[{id:"iron",label:"Iron",medal:"🥉",rank:1},{id:"bronze",label:"Bronze",medal:"🥉",rank:2},{id:"silver",label:"Silver",medal:"🥈",rank:3},{id:"gold",label:"Gold",medal:"🥇",rank:4}],Cn=[{id:"habit-streak",label:"Habit streak"},{id:"task-streak",label:"Pinned task streak"},{id:"perfect-days",label:"Perfect days (100%)"},{id:"task-list",label:"List of tasks goal"}];function qa(t){var e;return((e=ie.find(a=>a.id===t))==null?void 0:e.rank)||0}function xe(t){var e;return((e=ie.find(a=>a.id===t))==null?void 0:e.medal)||"🏅"}function Pn(t){var e;return((e=ie.find(a=>a.id===t))==null?void 0:e.label)||t||"Badge"}function E(t){const e=Array.isArray(t)?t:String(t||"").split(","),a=[];return e.forEach(i=>{const n=String(i||"").trim().slice(0,20);n&&!a.some(s=>s.toLowerCase()===n.toLowerCase())&&a.push(n),a.length>=10}),a.slice(0,10)}function We(t,e){const a=[...t];return e==="points"?a.sort((i,n)=>(Number(n.points)||0)-(Number(i.points)||0)):e==="category"?a.sort((i,n)=>gt(N(i.category)).localeCompare(gt(N(n.category)))):e==="tags"&&a.sort((i,n)=>(i.tags&&i.tags[0]||"~~~").localeCompare(n.tags&&n.tags[0]||"~~~")),a}const xt=[{value:1,label:"Mon"},{value:2,label:"Tue"},{value:3,label:"Wed"},{value:4,label:"Thu"},{value:5,label:"Fri"},{value:6,label:"Sat"},{value:0,label:"Sun"}];function F(t=new Date){const e=t.getFullYear(),a=String(t.getMonth()+1).padStart(2,"0"),i=String(t.getDate()).padStart(2,"0");return`${e}-${a}-${i}`}function xa(){return{habits:{},habitRatings:{},habitMissed:{},habitForwarded:{},tasks:[],note:"",locked:!1,lockOverride:null,submittedAt:null,lockedHabits:null,skippedPins:[]}}var V=[],ct={};function Di(t){const e=ct[t.id];return e?{...t,color:e.color||t.color,goals:e.goals!==void 0?e.goals:t.goals}:t}function ut(){return[...ne.map(Di),...V]}function N(t){return ut().map(a=>a.id).includes(t)?t:"mentally"}function gt(t){var e;return((e=ut().find(a=>a.id===t))==null?void 0:e.label)||"Mentally"}const fe=7e5;function Y(t){const e=String(t||"");return e.startsWith("data:image/")?e.length>fe?"":e:""}function Wa(t){const e=Math.max(0,Math.min(5,Number(t.rating)||0)),a=n=>/^\d{4}-\d{2}-\d{2}$/.test(String(n||""))?String(n):"",i=n=>Array.isArray(n)?n.filter(s=>/^\d{4}-\d{2}-\d{2}$/.test(String(s))).map(String).slice(0,50):[];return{...t,description:t.description||"",category:N(t.category),tags:E(t.tags),rating:e,done:!!t.done,missed:!!t.missed,forwardedFrom:a(t.forwardedFrom),forwardedHabitId:String(t.forwardedHabitId||""),forwardedTo:i(t.forwardedTo),image:Y(t.image)}}function Z(t){const e=Number(t);return!Number.isFinite(e)||e<0?0:Math.min(100,Math.round(e))}function Ta(t){return t==="degree"?"degree":"count"}function ge(t,e){if(t==null||t==="")return null;if(Ta(e)==="degree")return String(t).trim().slice(0,40)||null;const a=Number(t);return!Number.isFinite(a)||a<=0?null:Math.min(9999,Math.round(a))}function Ci(t){if(!t||typeof t!="object")return null;const e=tt(t.from);if(!e)return null;const a=Ta(t.type);return{from:e,type:a,value:ge(t.value!=null?t.value:t.text,a)}}function yt(t){if(!Array.isArray(t))return[];const e=new Map;return t.forEach(a=>{const i=Ci(a);i&&e.set(i.from,i)}),[...e.values()].sort((a,i)=>a.from<i.from?-1:1).slice(-1e3)}function Pi(t,e){const a=yt(t&&t.upgradeHistory),i=tt(e)||F();let n=null;for(const s of a){if(s.from>i)break;n=s.value==null?null:s}return n}function Ua(t,e,a){const i=tt(a)||F();let n;e&&typeof e=="object"?n={from:i,type:Ta(e.type),value:ge(e.value!=null?e.value:e.text,e.type)}:typeof e=="string"&&e.trim()&&Number.isNaN(Number(e))?n={from:i,type:"degree",value:ge(e,"degree")}:n={from:i,type:"count",value:ge(e,"count")};const s=yt(t&&t.upgradeHistory).filter(r=>r.from!==i);return s.push(n),yt(s)}function Da(t){const e=Number(t);return!Number.isFinite(e)||e<=0?null:Math.max(1,Math.min(100,Math.round(e)))}function vt(t){if(!Array.isArray(t))return[];const e=new Map;return t.forEach(a=>{if(!a||typeof a!="object")return;const i=tt(a.from),n=Da(a.value!=null?a.value:a.points);!i||n==null||e.set(i,{from:i,value:n})}),[...e.values()].sort((a,i)=>a.from<i.from?-1:1).slice(-1e3)}function st(t,e){const a=Da(t&&t.points)||10,i=vt(t&&t.pointsHistory);if(!i.length)return a;const n=tt(e)||F();let s=null;for(const r of i){if(r.from>n)break;s=r.value}return s??a}function Ei(t,e,a){const i=tt(a)||F(),n=Da(e);if(n==null)return vt(t&&t.pointsHistory);const s=vt(t&&t.pointsHistory).filter(r=>r.from!==i);return s.length||s.push({from:tt(t&&t.startFrom)||"1970-01-01",value:st(t,i)}),s.push({from:i,value:n}),vt(s)}function tt(t){const e=String(t??"").slice(0,10);return/^\d{4}-\d{2}-\d{2}$/.test(e)?e:""}function se(t,e){const a=tt(t&&t.startFrom);return a?String(e)>=a:!0}function Ca(t,e,a){return{id:String(t.id||""),name:String(t.name||"").slice(0,80),description:String(t.description||"").slice(0,2e3),points:a?st(t,a):Number(t.points)||0,pointsHistory:vt(t.pointsHistory),icon:t.icon||"star",category:N(t.category),consciousPoints:Z(t.consciousPoints),upgradeHistory:yt(t.upgradeHistory),tags:E(t.tags),pin:W(t.pin),startFrom:tt(t.startFrom),archivedAt:e||t.archivedAt||null}}function En(t,e,a){const i=/^\d{4}-\d{2}-\d{2}$/.test(String(a||""))?String(a):"",n=/^\d{4}-\d{2}-\d{2}$/.test(String(t&&t.forwardedFrom||""))?String(t.forwardedFrom):i;return{id:String(t.id||""),title:String(t.title||"Task").slice(0,120),points:Number(t.points)||0,description:String(t.description||"").slice(0,500),category:N(t.category),tags:E(t.tags),image:Y(t.image),fromDate:i,originDate:n,archivedAt:e||t.archivedAt||null,sourcePinId:String(t.sourcePinId||"")}}function Li(t){return Array.isArray(t)?t.filter(e=>e&&typeof e=="object"&&e.id).map(e=>En(e,e.archivedAt||null,e.fromDate)).filter(e=>e.id.length<=80).slice(0,500):[]}function W(t){if(!t||!t.mode)return null;const e=(n,s,r)=>Array.isArray(n)?n.map(Number).filter(o=>Number.isFinite(o)&&o>=s&&o<=r):[],a=n=>Array.isArray(n)?n.filter(s=>/^\d{4}-\d{2}-\d{2}$/.test(String(s))).map(String).slice(0,365):[],i=n=>Array.isArray(n)?n.filter(s=>/^\d{2}-\d{2}$/.test(String(s))).map(String).slice(0,366):[];return{mode:["forever","until","weekly","monthly","yearly","custom"].includes(t.mode)?t.mode:"forever",until:t.until||"",weekdays:e(t.weekdays,0,6),monthDays:e(t.monthDays,1,31),yearDays:i(t.yearDays),customDates:a(t.customDates),exceptDates:a(t.exceptDates||t.exceptions)}}function Ni(t,e){const a=`${t} ${e}`.toLowerCase();return a.includes("read")||a.includes("study")||a.includes("learn")?"mentally":a.includes("meditat")||a.includes("pray")||a.includes("journal")?"spiritually":a.includes("mood")||a.includes("calm")||a.includes("therapy")?"psychology":a.includes("friend")||a.includes("family")||a.includes("social")||a.includes("call")||a.includes("visit")?"socially":"physically"}function Mi(t){if(!Array.isArray(t))return[];const e=[];return t.forEach(a=>{if(!a||typeof a!="object")return;const i=String(a.title||a.text||"").trim().slice(0,120);i&&e.push({id:String(a.id||nt("gt")),title:i,done:!!a.done,doneAt:a.doneAt||null,checked:Array.isArray(a.checked)?[...new Set(a.checked.map(String).filter(n=>n.length<=24))].slice(0,64):[]})}),e.slice(0,100)}function na(t){const e=Cn.some(n=>n.id===t.kind)?t.kind:"habit-streak",a=e==="task-list",i=a?Mi(t.tasks):[];return{id:String(t.id||`g${Date.now()}`),title:String(t.title||"").trim().slice(0,60)||"My goal",kind:e,targetId:String(t.targetId||""),targetDays:Math.max(1,Math.min(365,Number(t.targetDays)||7)),tier:ie.some(n=>n.id===t.tier)?t.tier:"bronze",rewardTitle:String(t.rewardTitle||"").trim().slice(0,60)||"Reward",createdAt:t.createdAt||new Date().toISOString(),tasks:i,locked:a?!!t.locked:!1,terminated:a?!!t.terminated:!1}}function Hi(t){if(!Array.isArray(t))return[];const e=new Set(ne.map(i=>i.id)),a=[];return t.forEach(i=>{if(!i||typeof i!="object")return;const n=String(i.id||"").trim().slice(0,40),s=String(i.label||"").trim().slice(0,30);!n||!s||e.has(n.toLowerCase())||(e.add(n.toLowerCase()),a.push({id:n,label:s,color:String(i.color||"").slice(0,20),goals:String(i.goals||"").slice(0,1e3)}))}),a.slice(0,20)}function Ii(t){const e=t&&typeof t=="object"?t:{},a={};return ne.forEach(i=>{const n=e[i.id];if(!n||typeof n!="object")return;const s=String(n.color||"").trim().slice(0,20),r=n.goals===void 0?void 0:String(n.goals||"").slice(0,1e3);!s&&r===void 0||(a[i.id]={},s&&(a[i.id].color=s),r!==void 0&&(a[i.id].goals=r))}),a}const ia={name:80,wantToBe:1e3,vision:1e3,values:1e3,ideas:4e3},sa=["short","medium","long"],Yt={short:["1 Week","2 Weeks","3 Weeks","4 Weeks"],medium:["1 Month","2 Months","3 Months"],long:["1 Year","2 Years","3 Years","5 Years","10+ Years"]};function J(t){return`${t||"id"}${Date.now().toString(36)}${Math.floor(Math.random()*9999)}`}function Fi(t){return Array.isArray(t)?t.map(e=>{if(typeof e=="string")return{id:J("w"),text:e.trim().slice(0,120)};if(!e||typeof e!="object")return null;const a=String(e.text||e.label||e.name||"").trim().slice(0,120);return a?{id:String(e.id||J("w")),text:a}:null}).filter(Boolean).slice(0,50):[]}function Ri(t){return typeof t=="string"?t.split(`
`).map(e=>e.trim().replace(/^[-•*]\s+/,"")).filter(Boolean).slice(0,20).map(e=>({id:J("a"),title:e.slice(0,60),description:""})):Array.isArray(t)?t.map(e=>{if(typeof e=="string"){const i=e.trim().slice(0,60);return i?{id:J("a"),title:i,description:""}:null}if(!e||typeof e!="object")return null;const a=String(e.title||e.name||"").trim().slice(0,60);return a?{id:String(e.id||J("a")),title:a,description:String(e.description||"").slice(0,1e3)}:null}).filter(Boolean).slice(0,20):[]}function Oi(t){return Array.isArray(t)?t.map(e=>{if(typeof e=="string"){const r=e.trim().slice(0,200);return r?{id:J("g"),text:r,term:"short",duration:"1 Week",createdAt:new Date().toISOString()}:null}if(!e||typeof e!="object")return null;const a=String(e.text||e.title||"").trim().slice(0,200);if(!a)return null;const i=sa.includes(e.term)?e.term:"short",n=Yt[i],s=n.includes(e.duration)?e.duration:n[0];return{id:String(e.id||J("g")),text:a,term:i,duration:s,createdAt:e.createdAt||new Date().toISOString()}}).filter(Boolean).slice(0,100):[]}function ji(t){return Array.isArray(t)?t.map(e=>{if(typeof e=="string"){const i=e.trim().slice(0,500);return i?{id:J("q"),text:i,author:"",fav:!1,createdAt:new Date().toISOString()}:null}if(!e||typeof e!="object")return null;const a=String(e.text||e.quote||"").trim().slice(0,500);return a?{id:String(e.id||J("q")),text:a,author:String(e.author||"").trim().slice(0,80),fav:!!(e.fav||e.favorite),createdAt:e.createdAt||new Date().toISOString()}:null}).filter(Boolean).slice(0,200):[]}function Qt(t){const e=t&&typeof t=="object"?t:{},a={};Object.entries(ia).forEach(([n,s])=>{n==="wantToBe"&&!e.wantToBe&&e.about?a[n]=String(e.about||"").slice(0,s):a[n]=String(e[n]||"").slice(0,s)}),a.locked=!!e.locked,a.whoAmI=Fi(e.whoAmI||e.whoIAm||[]),a.lifeAreas=Ri(Array.isArray(e.lifeAreas)||typeof e.lifeAreas=="string"?e.lifeAreas:[]);let i=Oi(e.pGoals||e.goalsList||e.profileGoals||[]);return i.length||[["goalsShort","short","1 Week"],["goalsMid","medium","1 Month"],["goalsLong","long","1 Year"]].forEach(([s,r,o])=>{const l=String(e[s]||"");l.trim()&&l.split(`
`).map(c=>c.trim().replace(/^[-•*]\s+/,"")).filter(Boolean).forEach(c=>{i.length>=100||i.push({id:J("g"),text:c.slice(0,200),term:r,duration:o,createdAt:new Date().toISOString()})})}),a.pGoals=i,a.quotes=ji(e.quotes||e.favQuotes||[]),a}function Bi(t,e){const a=String(t&&t.installedAt||"");if(/^\d{4}-\d{2}-\d{2}/.test(a))return a;const i=Object.keys(e||{}).sort();return i.length?`${i[0]}T00:00:00.000`:new Date().toISOString()}function Gi(t,e){if(!t)return!1;if(Ge(t,e)>0)return!0;const a=t.habitForwarded&&t.habitForwarded[e];return Array.isArray(a)&&a.length>0?!0:Array.isArray(t.tasks)&&t.tasks.some(i=>String(i&&i.forwardedHabitId||"")===String(e))}function _i(t,e){return!t||!Array.isArray(t.lockedHabits)?!1:t.lockedHabits.some(a=>String(a&&a.id||"")===String(e))}function qi(t,e,a){const i=String(t||"");for(const n of e){const s=a[n];if(Gi(s,i)||_i(s,i))return n}return""}function Wi(t,e){const a=Object.keys(e).sort(),i=a[0]||"";return t.map(n=>{const s=tt(n&&n.startFrom);return s?{...n,startFrom:s}:{...n,startFrom:qi(n&&n.id,a,e)||i}})}function Ui(t,e){const a=Object.keys(e).sort(),i=a[0]||"",n={};return a.forEach(s=>{const r=e[s]&&e[s].tasks;Array.isArray(r)&&r.forEach(o=>{const l=String(o&&o.sourcePinId||"");!l||n[l]||(n[l]=s)})}),t.map(s=>{const r=tt(s&&s.startFrom);if(r)return{...s,startFrom:r};const o=String(s&&s.id||"");return{...s,startFrom:n[o]||i}})}function Ln(t){const e=new Set,a=new Set,i=new Set;return t.filter(n=>{if(!n||typeof n!="object")return!1;const s=String(n.id||"");if(s&&e.has(s))return!1;s&&e.add(s);const r=String(n.sourcePinId||"");if(r){if(a.has(r))return!1;a.add(r)}const o=`${String(n.title||"").trim().toLowerCase()}|${Number(n.points)||0}|${String(n.category||"")}`;return i.has(o)?!1:(i.add(o),!0)})}function Be(t){V=Hi(t.customCategories||[]),ct=Ii(t.categoryOverrides);const e={};Object.entries(t.days||{}).forEach(([o,l])=>{e[o]={...xa(),habits:l.habits||{},habitRatings:l.habitRatings||{},habitMissed:l.habitMissed||{},habitForwarded:l.habitForwarded&&typeof l.habitForwarded=="object"?l.habitForwarded:{},tasks:Ln(Array.isArray(l.tasks)?l.tasks.map(Wa):[]),note:l.note||"",locked:!!l.locked,lockOverride:l.lockOverride||(l.locked?"locked":null),submittedAt:l.submittedAt||null,lockedHabits:Array.isArray(l.lockedHabits)?l.lockedHabits:null,skippedPins:Array.isArray(l.skippedPins)?l.skippedPins.map(String).filter(c=>c.length<=60).slice(0,100):[]}});const a=Wi(Array.isArray(t.habits)&&t.habits.length?t.habits:Tn,e).map(o=>({...o,description:String(o.description||"").slice(0,2e3),category:N(o.category||Ni(o.id,o.name)),consciousPoints:Z(o.consciousPoints),upgradeHistory:yt(o.upgradeHistory),pointsHistory:vt(o.pointsHistory),tags:E(o.tags),pin:W(o.pin)})),i=(Array.isArray(t.archivedHabits)?t.archivedHabits:[]).filter(o=>o&&typeof o=="object"&&o.id).map(o=>Ca(o,o.archivedAt||null)).filter(o=>o.id.length<=60).slice(0,500),n=Ui(Array.isArray(t.pinnedTasks)?t.pinnedTasks.map(o=>({...Wa(o),pin:W(o.pin)})):[],e),s=new Map(n.map(o=>[String(o.id),o])),r=new Map;return Object.entries(e).sort(([o],[l])=>o.localeCompare(l)).forEach(([o,l])=>{l.tasks.forEach(c=>{const f=W(c.pin);if(!f)return;const b=String(c.sourcePinId||""),g=b?s.get(b):null;if(g){g.pin||(g.pin=f);return}const k=[String(c.title||"").trim().toLowerCase(),Number(c.points)||0,String(c.category||""),String(c.description||""),JSON.stringify(E(c.tags)),Y(c.image),JSON.stringify(f)].join("|"),A=r.get(b||k);if(A){c.sourcePinId=A.id;return}const $=b||`legacy-pin-${String(c.id||"task").slice(0,48)}`,v={id:$,title:String(c.title||"Task").slice(0,120),points:Number(c.points)||0,description:String(c.description||"").slice(0,500),category:N(c.category),tags:E(c.tags),pin:f,startFrom:o,image:Y(c.image)};n.push(v),s.set($,v),r.set(b||k,v),c.sourcePinId=$})}),{habits:a,archivedHabits:i,archivedTasks:Li(t.archivedTasks),customCategories:V,categoryOverrides:ct,installedAt:Bi(t,e),profile:Qt(t.profile),pinnedTasks:n,days:e,goals:Array.isArray(t.goals)?t.goals.map(na):[],badges:Array.isArray(t.badges)?t.badges.filter(o=>o&&o.id&&o.goalId).map(o=>({id:String(o.id),goalId:String(o.goalId),title:String(o.title||""),tier:o.tier||"bronze",rewardTitle:String(o.rewardTitle||""),earnedAt:o.earnedAt||new Date().toISOString()})):[],settings:{lockTime:t.settings&&t.settings.lockTime||Dn.lockTime,autoLock:!t.settings||t.settings.autoLock!==!1,showConscious:!t.settings||t.settings.showConscious!==!1,habitSort:["default","points","category","tags","custom"].includes(t.settings&&t.settings.habitSort)?t.settings.habitSort:"default",taskSort:["default","points","category","tags","custom"].includes(t.settings&&t.settings.taskSort)?t.settings.taskSort:"default",theme:["light","dark"].includes(t.settings&&t.settings.theme)?t.settings.theme:"dark",homeView:t.settings&&t.settings.homeView==="full"?"full":"compact",weekStart:aa(t.settings&&t.settings.weekStart),habitOrder:Array.isArray(t.settings&&t.settings.habitOrder)?t.settings.habitOrder.map(String).filter(Boolean).slice(0,300):[],pinnedTaskOrder:Array.isArray(t.settings&&t.settings.pinnedTaskOrder)?t.settings.pinnedTaskOrder.map(String).filter(Boolean).slice(0,300):[]}}}function za(){const t=F();return{habits:Tn.map(e=>({...e,description:"",tags:[],startFrom:t})),archivedHabits:[],archivedTasks:[],customCategories:[],categoryOverrides:{},installedAt:new Date().toISOString(),profile:Qt({}),pinnedTasks:[],days:{},goals:[],badges:[],settings:{...Dn}}}function zi(){try{const t=localStorage.getItem(An)||localStorage.getItem("daily-report-v1");return t?Be(JSON.parse(t)):za()}catch{return za()}}let u=zi();V=u.customCategories||[];u.customCategories=V;ct=u.categoryOverrides||{};u.categoryOverrides=ct;function me(){u.goals.forEach(t=>{t.kind!=="task-list"||!Array.isArray(t.tasks)||t.tasks.forEach(e=>{if(!e||!e.done||Array.isArray(e.checked)&&e.checked.length)return;const a=In(e);a&&(e.checked=a.slots.map(i=>i.key))})})}me();let M=null,P="boot",Bt=Vi(),Pa=0,ot=!1,Ea=0,Kt=!1,K=!1,C="off",at="",Nn=0,Mn=0,U=null,he=0,Va=Promise.resolve(),be=0,te=0,Tt=null,ye=0,Ya=Promise.resolve();function Vi(){try{const t=JSON.parse(localStorage.getItem(xn)||"null"),e=t&&Number(t.savedAt);return Number.isFinite(e)&&e>0?e:0}catch{return 0}}function La(t){u=t,V=u.customCategories||[],u.customCategories=V,ct=u.categoryOverrides||{},u.categoryOverrides=ct}function Dt(){return!!M&&P==="granted"}function Yi(){if(!Dt()&&!ot)return;const t=Date.now();ye||(ye=t);const e=t-ye,a=e>=3e3?0:Math.max(400,Math.min(900,900-e));Tt&&clearTimeout(Tt),Tt=setTimeout(()=>{Tt=null,Te().catch(()=>{})},a)}function Te(){Tt&&(clearTimeout(Tt),Tt=null),ye=0;const t=Dt(),e=ot;if(!t&&!e||!Kt)return Promise.resolve(!1);const a=te;let i="";try{i=JSON.stringify(u)}catch{return Promise.resolve(!1)}const n=M,s=Ya.then(async()=>{let r=!0;if(t)try{const o=await ya(n,lt,i);o.ok?Pa=Date.now():(r=!1,o.denied&&(P="prompt"))}catch{r=!1}return e&&((await mi(lt,i)).ok?Ea=Date.now():r=!1),r&&te===a&&(Kt=!1),r});return Ya=s.then(()=>{},()=>{}),s}function Ji(){return Math.max(Bt,Pa,Ea)}function oa(t){if(!K)return;if(typeof t=="number"){U&&clearTimeout(U),U=setTimeout(()=>{U=null,Ft().catch(()=>{})},Math.max(0,t));return}const e=Date.now();he||(he=e);const a=e-he,i=a>=15e3?0:Math.max(1500,Math.min(6e3,6e3-a));U&&clearTimeout(U),U=setTimeout(()=>{U=null,Ft().catch(()=>{})},i)}function Ft(){if(!K)return Promise.resolve(!1);U&&(clearTimeout(U),U=null),he=0;let t="";try{t=JSON.stringify(u)}catch{return Promise.resolve(!1)}const e=te,a=Va.then(async()=>{C="syncing";try{const i=await Ti(t);return Nn=Date.now(),C="ok",at="",be=0,te!==e&&oa(),!!(i&&i.ok)}catch(i){return at=String(i&&i.message||i),Aa(i)?(K=!1,C="needs-signin"):(C="error",be+=1,oa(Math.min(6e4,5e3*be))),!1}});return Va=a.then(()=>{},()=>{}),a}async function Ue(){if(!K)return{status:C};C="syncing";try{const t=await xi();if(Mn=Date.now(),t.missing)return C="ok",at="",{status:"ok",seeded:!0,pushed:await Ft()};C="ok",at="";const e=Ji();if(e&&t.modified<=e+2e3)return{status:"ok",pushed:!0,uploaded:await Ft()};let a=null;try{a=JSON.parse(t.raw)}catch{a=null}if(!a||d.backupKind(a)!=="ok")return{status:"ok",corrupt:!0,uploaded:await Ft()};const i=a.data&&typeof a.data=="object"&&!Array.isArray(a.data)?a.data:a;return La(Be(i)),S(),{status:"ok",replaced:!0}}catch(t){return at=String(t&&t.message||t),Aa(t)?(K=!1,C="needs-signin"):C="error",{status:C,error:at}}}async function Lt(){const t=Dt();if(!t&&!ot)return{status:P};const e=[];let a=!1;if(t){const s=await ci(M);if(s.error)return{status:"granted",error:s.error};if(!s.missing){let r=null;try{r=JSON.parse(s.raw)}catch{r=null}!r||d.backupKind(r)!=="ok"?(await ui(M,s.raw),a=!0):e.push({raw:s.raw,parsed:r,modified:Number(s.modified)||0})}}if(ot){const s=await hi(lt);if(!s.missing&&!s.error&&s.raw){let r=null;try{r=JSON.parse(s.raw)}catch{r=null}r&&d.backupKind(r)==="ok"&&e.push({raw:s.raw,parsed:r,modified:Number(s.modified)||0})}}const i=t?"granted":P;if(!e.length)return Kt=!0,await Te(),{status:i,seeded:!0,corrupt:a};e.sort((s,r)=>s.modified-r.modified);const n=e[e.length-1];if(!Bt||n.modified>Bt+2e3){const s=n.parsed.data&&typeof n.parsed.data=="object"&&!Array.isArray(n.parsed.data)?n.parsed.data:n.parsed;return La(Be(s)),S(),{status:i,replaced:!0,corrupt:a}}return Kt=!0,await Te(),{status:i,pushed:!0,corrupt:a}}let Hn=0,ze={key:null,value:null},ra=0;function Na(){return ra>0}function mt(t){ra+=1;try{return t()}finally{ra-=1}}function S(){Hn+=1,te+=1,Kt=!0;try{localStorage.setItem(An,JSON.stringify(u)),Bt=Date.now(),localStorage.setItem(xn,JSON.stringify({savedAt:Bt}))}catch{}Yi(),oa()}let Ja=0;function nt(t){return Ja+=1,`${t||"id"}${Date.now().toString(36)}${Ja.toString(36)}${Math.floor(Math.random()*1296).toString(36)}`}function Qi(t){return new Date(`${t}T00:00:00`).getDay()}function De(t){const e=new Date(`${t}T00:00:00`);return e.setDate(e.getDate()+1),F(e)}function zt(t){const e=new Date(`${t}T00:00:00`);return e.setDate(e.getDate()-1),F(e)}function oe(t,e){if(!t)return!0;if(Array.isArray(t.exceptDates)&&t.exceptDates.includes(e)||Array.isArray(t.exceptions)&&t.exceptions.includes(e))return!1;if((Array.isArray(t.customDates)?t.customDates:[]).includes(e)||t.mode==="forever")return!0;if(t.mode==="until")return!!t.until&&e<=t.until;if(t.mode==="weekly")return Array.isArray(t.weekdays)&&t.weekdays.includes(Qi(e));if(t.mode==="monthly"){const i=Array.isArray(t.monthDays)?t.monthDays.map(Number):[];return i.length?i.includes(Number(String(e).slice(8,10))):!0}if(t.mode==="yearly"){const i=Array.isArray(t.yearDays)?t.yearDays:[];return i.length?i.includes(String(e).slice(5,10)):!0}return t.mode!=="custom"}function Rt(t){if(!t)return"Not pinned";const e=(t.exceptDates||t.exceptions||[]).length,a=e?` · ⛔ ${e} exception${e>1?"s":""}`:"",i=t.mode==="custom"?0:Array.isArray(t.customDates)?t.customDates.length:0,n=i?` +${i} custom`:"";if(t.mode==="forever")return`Pinned forever${n}${a}`;if(t.mode==="until")return`${t.until?`Pinned until ${t.until}`:"Pinned until a date"}${n}${a}`;if(t.mode==="weekly"){const s=Array.isArray(t.weekdays)?t.weekdays:[],r=xt.filter(o=>s.includes(o.value)).map(o=>o.label);return`${r.length?`Weekly: ${r.join(", ")}`:"Weekly (no days)"}${n}${a}`}if(t.mode==="monthly"){const s=Array.isArray(t.monthDays)?t.monthDays:[];return`${s.length?`Monthly: day${s.length>1?"s":""} ${[...s].sort((r,o)=>r-o).join(", ")}`:"Monthly"}${n}${a}`}if(t.mode==="yearly"){const s=Array.isArray(t.yearDays)?t.yearDays:[];return`${s.length?`Yearly: ${[...s].sort().join(", ")}`:"Yearly"}${n}${a}`}if(t.mode==="custom"){const s=Array.isArray(t.customDates)?t.customDates:[];return`${s.length?`Custom: ${s.length} date${s.length>1?"s":""}`:"Custom dates"}${a}`}return"Pinned"}function Xi(t){if(!t)return[];const e=[],a=(n,s)=>{e.some(r=>r.key===n)||e.push({key:n,label:s})},i=n=>(xt.find(s=>s.value===n)||{label:`Day ${n}`}).label;return t.mode==="forever"?a("daily","Every day"):t.mode==="until"?a("daily",t.until?`Daily until ${t.until}`:"Daily"):t.mode==="weekly"?[...t.weekdays||[]].sort((n,s)=>(n+6)%7-(s+6)%7).forEach(n=>a(`w${n}`,i(n))):t.mode==="monthly"?[...t.monthDays||[]].sort((n,s)=>n-s).forEach(n=>a(`m${n}`,`Day ${n}`)):t.mode==="yearly"&&[...t.yearDays||[]].sort().forEach(n=>a(`y${n}`,n)),(t.customDates||[]).forEach(n=>a(`d${n}`,String(n).slice(5))),e}function In(t){if(!t||typeof t!="object")return null;const e=String(t.title||"").trim().toLowerCase();if(!e)return null;const a=u.pinnedTasks.find(n=>String(n&&n.title||"").trim().toLowerCase()===e);if(!a)return null;const i=Xi(a.pin);return i.length?{pin:a.pin,title:a.title,slots:i}:null}function da(t){const[e,a]=(u.settings.lockTime||"21:00").split(":").map(Number),i=new Date(`${t}T00:00:00`);return i.setHours(e||0,a||0,0,0),i}function Ce(t){const e=u.days[t];return e?e.lockOverride==="locked"||e.locked===!0:!1}function Ge(t,e){return t?t.habitRatings&&t.habitRatings[e]!=null?Number(t.habitRatings[e])||0:t.habits&&t.habits[e]?5:0:0}function la(t,e){return Ge(u.days[t],e)}function Zi(t,e){if(!t)return!1;if(Ge(t,e)>0||t.habitMissed&&t.habitMissed[e])return!0;const i=t.habitForwarded&&t.habitForwarded[e];return Array.isArray(i)&&i.length>0?!0:Array.isArray(t.tasks)&&t.tasks.some(n=>String(n&&n.forwardedHabitId||"")===String(e))}function Fn(t){if(!t)return[...u.habits];const e=u.habits.filter(i=>se(i,t)&&oe(i.pin,t)),a=u.days[t];if(a){const i=new Set(e.map(s=>s.id)),n=s=>{!s||i.has(s.id)||Zi(a,s.id)&&(i.add(s.id),e.push(s))};u.habits.forEach(n),Ce(t)&&u.archivedHabits&&u.archivedHabits.length&&u.archivedHabits.forEach(n)}return e}function ue(t,e){if(!Array.isArray(e)||!e.length)return t;const a=new Map(e.map((i,n)=>[String(i),n]));return t.some(i=>a.has(String(i&&i.id)))?t.map((i,n)=>({item:i,i:n})).sort((i,n)=>{const s=a.has(String(i.item&&i.item.id))?a.get(String(i.item.id)):Number.MAX_SAFE_INTEGER,r=a.has(String(n.item&&n.item.id))?a.get(String(n.item.id)):Number.MAX_SAFE_INTEGER;return s===r?i.i-n.i:s-r}).map(i=>i.item):t}function Ve(t){const e=u.habits.find(a=>a.id===t);return e||(u.archivedHabits||[]).find(a=>a.id===t)||null}function Ki(t){u.archivedHabits||(u.archivedHabits=[]),!u.archivedHabits.some(e=>e.id===t.id)&&(u.archivedHabits.push(Ca(t,new Date().toISOString())),u.archivedHabits.length>500&&u.archivedHabits.splice(0,u.archivedHabits.length-500))}function ca(t){const e=I(t),a=Fn(t);e.lockedHabits=a.map(i=>Ca(i,null,t)),e.habitMissed={},a.forEach(i=>{la(t,i.id)<=0&&(e.habitMissed[i.id]=!0)}),e.tasks.forEach(i=>{i.missed=!i.done})}function kt(t){const e=u.days[t];return!e||e.lockOverride==="unlocked"?!1:e.lockOverride==="locked"||e.locked===!0?!0:u.settings.autoLock?Date.now()>=da(t).getTime():!1}function Qa(t){if(Na())return kt(t);const e=I(t);return e.lockOverride==="unlocked"?!1:e.lockOverride==="locked"||e.locked?((!Array.isArray(e.lockedHabits)||!e.habitMissed)&&ca(t),!0):u.settings.autoLock&&Date.now()>=da(t).getTime()?(e.locked=!0,e.lockOverride="locked",e.submittedAt=e.submittedAt||da(t).toISOString(),ca(t),S(),!0):!1}function I(t){if(!u.days[t]){const e=xa();if(Na())return e;u.days[t]=e}return u.days[t]}function Ye(t){const e=String(t);Object.values(u.days).forEach(a=>{!Array.isArray(a.skippedPins)||!a.skippedPins.includes(e)||(a.skippedPins=a.skippedPins.filter(i=>i!==e))})}function Xa(t){const e=I(t);if(Ce(t)||Na())return e;let a=!1;const i=new Set(Array.isArray(e.skippedPins)?e.skippedPins.map(String):[]);if(e.tasks.length>1){const n=Ln(e.tasks);n.length!==e.tasks.length&&(e.tasks=n,a=!0)}return u.pinnedTasks.forEach(n=>{se(n,t)&&oe(n.pin,t)&&(i.has(String(n.id))||e.tasks.some(s=>s.sourcePinId===n.id)||(e.tasks.push({id:`ptask-${n.id}-${t}`,title:n.title,points:n.points,description:n.description||"",category:N(n.category),tags:E(n.tags),rating:0,done:!1,missed:!1,sourcePinId:n.id,image:Y(n.image)}),a=!0))}),a&&S(),e}function Rn(t){return!(!t||t.pin&&t.pin.mode==="forever")}function ts(t,e){let a=De(e),i=0;for(;i<800;){if(i+=1,se(t,a)&&oe(t.pin,a))return a;a=De(a)}return""}function Pe(t,e,a=[],i=[]){if(!t||!/^\d{4}-\d{2}-\d{2}$/.test(String(e||"")))return{allowed:!1,next:"",days:[]};let n=t;if(a.length||i.length){const c=a.map(String),f=i.map(String),b=W(t.pin);b.exceptDates=(b.exceptDates||[]).filter(g=>!c.includes(g)),b.customDates=(b.customDates||[]).filter(g=>!f.includes(g)),n={...t,pin:b}}if(!Rn(n))return{allowed:!1,next:"",days:[]};if(!se(n,e)||!oe(n.pin,e))return{allowed:!1,next:"",days:[]};const s=ts(n,e);if(!s)return{allowed:!1,next:"",days:[]};const r=[];let o=De(e),l=0;for(;o<s&&l<400;)l+=1,r.push(o),o=De(o);return r.length?{allowed:!0,next:s,days:r}:{allowed:!1,next:s,days:[]}}function es(t,e){const a=t.pin||{},i=Array.isArray(a.exceptDates)?a.exceptDates:[];return i.includes(e)&&(Array.isArray(a.customDates)?a.customDates:[]).filter(s=>s>e).filter(s=>!i.includes(s)).sort().find(s=>Pe(t,e,[e],[s]).days.includes(s))||""}function as(t,e){const a=t.pin||{};if(!(Array.isArray(a.customDates)?a.customDates:[]).includes(e))return"";const n=Array.isArray(a.exceptDates)?a.exceptDates:[];let s="";return n.forEach(r=>{r>=e||Pe(t,r,[r],[e]).days.includes(e)&&(!s||r>s)&&(s=r)}),s}function Q(t){return!d.isLocked(t)}function Za(t){const e=ut().find(a=>a.label.toLowerCase()===String(t||"").trim().toLowerCase());return e?e.id:"mentally"}function Ka(t){return!t||typeof t!="object"||Array.isArray(t)?[]:Array.isArray(t.days)?t.days.filter(e=>e&&/^\d{4}-\d{2}-\d{2}$/.test(String(e.date||""))):[]}const d={todayKey:F,exportBackup(){return JSON.stringify({app:"Second Mind",kind:"full-backup",version:1,exportedAt:new Date().toISOString(),data:u},null,2)},backupKind(t){if(!t||typeof t!="object"||Array.isArray(t))return"invalid";const e=t.data&&typeof t.data=="object"&&!Array.isArray(t.data)?t.data:t;return Array.isArray(e.days)?"report-export":Array.isArray(e.categories)||Array.isArray(e.plans)||Array.isArray(e.schedule)?"wrong-app":typeof e!="object"||e===null||e.habits!==void 0&&!Array.isArray(e.habits)||e.days!==void 0&&(typeof e.days!="object"||e.days===null||Array.isArray(e.days))||e.settings!==void 0&&(typeof e.settings!="object"||e.settings===null||Array.isArray(e.settings))||!["habits","pinnedTasks","days","goals","badges","settings"].some(i=>e[i]!==void 0)?"invalid":"ok"},importBackup(t){if(this.backupKind(t)!=="ok")return!1;const e=t.data&&typeof t.data=="object"&&!Array.isArray(t.data)?t.data:t;return La(Be(e)),S(),!0},folderStatus(){return P},folderName(){return M&&M.name?String(M.name):""},folderFileName(){return lt},lastFileSavedAt(){return Pa},lastCacheSavedAt(){return Bt},deviceSaveReady(){return ot},lastDeviceSavedAt(){return Ea},autoSaveStatus(){const t=Dt(),e=ot;return t&&e?"both":t?"folder":e?"device":"none"},driveStatus(){return C!=="off"?C:wt()?ja()?"off":Ba()?K?"ok":"ready":"needs-signin":"needs-client"},driveError(){return at},driveLastPushAt(){return Nn},driveLastPullAt(){return Mn},driveConfigured(){return wt()},driveClientId(){return je()},setDriveClientId(t){const e=ki(t);return e&&le(!1),!e&&K?(K=!1,C="off"):e&&(C==="needs-client"||C==="off")&&(C="needs-signin"),e},async connectDrive(){if(!wt())return C="needs-client",{status:"needs-client"};le(!1),C="syncing";try{await Ai()}catch(e){return at=String(e&&e.message||e),C=Aa(e)?"needs-signin":"error",{status:C,error:at}}K=!0,at="",be=0;const t=await Ue();return{status:C,...t}},disconnectDrive(){return $n(),le(!0),U&&(clearTimeout(U),U=null),K=!1,C="off",at="",{status:"off"}},resumeDriveSetup(){return le(!1),C=wt()?"needs-signin":"needs-client",{status:C}},async initDriveSync(){if(ja())return C="off",{status:"off"};if(!wt())return C="needs-client",{status:"needs-client"};if(!Ba())return C="needs-signin",{status:"needs-signin"};K=!0;const t=await Ue();return{status:C,...t}},async syncDriveNow(){if(!K){const t=await this.connectDrive();if(t.status!=="ok"&&t.status!=="syncing")return t}return Ue()},flushDriveWrite(){return K?Ft().catch(()=>!1):Promise.resolve(!1)},getFolderHandle(){return M},async initFolderSync(){try{const e=typeof navigator<"u"&&navigator.storage&&navigator.storage.persist?navigator.storage.persist():null;e&&typeof e.catch=="function"&&e.catch(()=>{})}catch{}try{ot=!!await va()}catch{ot=!1}if(!Ut())return P="unsupported",ot?Lt():{status:"unsupported"};const t=await this.refreshFolder();if(t==="granted")return Lt();if(t==="prompt"||t==="denied"){try{P=await Fa(M)}catch{P="prompt"}if(P==="granted")return Lt()}return ot?Lt():{status:P}},async refreshFolder(){if(!Ut())return P="unsupported",P;if(!M)try{M=await ri()}catch{M=null}return M?(P=await ni(M),P):(P="unset",P)},async chooseDataFolder(){if(!Ut())return P="unsupported",{status:"unsupported"};let t=null;try{t=await ai()}catch(a){return a&&a.name==="AbortError"?{status:P,cancelled:!0}:{status:P,error:String(a&&a.message||a)}}if(!t)return{status:P,error:"no-folder"};try{await di(t)}catch{}return M=t,P="granted",{...await Lt(),name:String(t.name||"")}},async grantFolderAccess(){if(!Ut())return P="unsupported",{status:"unsupported"};if(!M){const e=await this.refreshFolder();if(e!=="granted")return{status:e}}return P=await Fa(M),P!=="granted"?{status:P}:{...await Lt(),name:this.folderName()}},async forgetDataFolder(){try{await li()}catch{}return M=null,P=Ut()?"unset":"unsupported",{status:P}},async writeFolderFile(t,e){if(!Dt())return{ok:!1,denied:!1,error:"no-folder"};const a=await ya(M,t,e);return a.denied&&(P="prompt"),a},async readFolderFile(t){return Dt()?Ze(M,t):{missing:!0,raw:"",modified:0,error:"no-folder"}},async listFolderBackups(){return Dt()?(await pi(M)).filter(e=>fi(e.name)).sort((e,a)=>a.modified-e.modified).map(e=>({name:e.name,modified:e.modified})):[]},flushFolderWrite(){return Te()},previewReport(t){const e=Ka(t);if(!e.length)return{days:0,start:"",end:"",newHabits:0};const a=new Set(u.habits.map(s=>String(s.name||"").trim().toLowerCase())),i=new Set;e.forEach(s=>{(Array.isArray(s.habits)?s.habits:[]).forEach(r=>{const o=String(r&&r.name||"").trim().toLowerCase();o&&!a.has(o)&&i.add(o)})});const n=e.map(s=>String(s.date)).sort();return{days:e.length,start:n[0],end:n[n.length-1],newHabits:i.size}},importReport(t){const e=Ka(t);if(!e.length)return!1;const a=e.map(o=>String(o.date)).sort(),i=a[a.length-1],n={};u.habits.forEach(o=>{n[String(o.name||"").trim().toLowerCase()]=o});let s=0;const r=Date.now();return e.forEach((o,l)=>{const c=String(o.date);(Array.isArray(o.habits)?o.habits:[]).forEach(g=>{const k=String(g&&g.name||"").trim().slice(0,80);if(!k)return;const A=k.toLowerCase();if(!n[A]){const $={id:`h${r}_${s}`,name:k,description:String(g&&g.description||"").slice(0,2e3),points:Number(g&&g.points||10)||10,icon:"star",category:Za(g&&g.category),consciousPoints:Z(g&&g.consciousPoints),tags:E(g&&g.tags),pin:{mode:"until",until:i,weekdays:[],monthDays:[],yearDays:[],customDates:[],exceptDates:[]},startFrom:a[0]};u.habits.push($),n[A]=$,s+=1}});const f=xa();f.note=String(o.note||""),f.locked=!0,f.lockOverride="locked",f.submittedAt=null;const b=[];(Array.isArray(o.habits)?o.habits:[]).forEach(g=>{const k=n[String(g&&g.name||"").trim().toLowerCase()];if(!k)return;const A=Math.max(0,Math.min(5,Number(g&&g.rating||0)));f.habitRatings[k.id]=A,f.habits[k.id]=A>0,A<=0&&(f.habitMissed[k.id]=!0),k.startFrom&&c<k.startFrom&&(k.startFrom=c),b.push({id:k.id,name:k.name,description:k.description,points:st(k,c),pointsHistory:vt(k.pointsHistory),icon:k.icon||"star",category:N(k.category),consciousPoints:Z(k.consciousPoints),upgradeHistory:yt(k.upgradeHistory),tags:E(k.tags),pin:W(k.pin)})}),f.lockedHabits=b,f.tasks=(Array.isArray(o.tasks)?o.tasks:[]).map((g,k)=>({id:`t${r}_${l}_${k}`,title:String(g&&g.title||"Task").slice(0,120),points:Number(g&&g.points||5)||5,description:String(g&&g.description||""),category:Za(g&&g.category),tags:E(g&&g.tags),rating:Math.max(0,Math.min(5,Number(g&&g.rating||0))),done:!!(g&&g.done),missed:!(g&&g.done),image:"",forwardedFrom:/^\d{4}-\d{2}-\d{2}$/.test(String(g&&g.forwardedFrom||""))?String(g.forwardedFrom):"",forwardedHabitId:"",forwardedTo:Array.isArray(g&&g.forwardedTo)?g.forwardedTo.filter(A=>/^\d{4}-\d{2}-\d{2}$/.test(String(A))).map(String).slice(0,50):[]})),u.days[c]=f}),S(),{days:e.length,habits:s}},getSettings(){return u.settings},setLockTime(t){u.settings.lockTime=t||"21:00",S()},setAutoLock(t){u.settings.autoLock=!!t,S()},setShowConscious(t){u.settings.showConscious=!!t,S()},consciousEnabled(){return u.settings.showConscious!==!1},setHabitSort(t){u.settings.habitSort=["default","points","category","tags","custom"].includes(t)?t:"default",S()},setTaskSort(t){u.settings.taskSort=["default","points","category","tags","custom"].includes(t)?t:"default",S()},getHomeView(){return u.settings.homeView==="full"?"full":"compact"},setHomeView(t){u.settings.homeView=t==="full"?"full":"compact",S()},getWeekStart(){return aa(u.settings.weekStart)},setWeekStart(t){u.settings.weekStart=aa(t),S()},getTheme(){return u.settings.theme==="light"?"light":"dark"},setTheme(t){u.settings.theme=t==="light"?"light":"dark",S()},getHabits(t,e){if(t&&Ce(t)){const s=u.days[t];if(s&&Array.isArray(s.lockedHabits)){const r=e||u.settings.habitSort||"default",o=[...s.lockedHabits];return r==="default"||r==="custom"?ue(o,u.settings.habitOrder):We(o,r)}}const a=e||u.settings.habitSort||"default",i=Fn(t),n=a==="default"||a==="custom"?ue(i,u.settings.habitOrder):We(i,a);return a==="default"||a==="custom"?n.slice().sort((s,r)=>+!!r.pin-+!!s.pin):n},getTasks(t,e){const a=this.getDay(t),i=e||u.settings.taskSort||"default";return i==="default"||i==="custom"?a.tasks:We(a.tasks,i)},getAllHabits(){return u.habits},getPinnedHabits(){return ue(u.habits.filter(t=>!!t.pin),u.settings.habitOrder)},setPinnedHabitOrder(t){const e=new Set(u.habits.filter(s=>s.pin).map(s=>String(s.id))),a=(Array.isArray(t)?t:[]).map(String).filter(s=>e.has(s)),i=new Set(a);e.forEach(s=>{i.has(s)||a.push(s)});const n=u.settings.habitOrder.filter(s=>!e.has(s));u.settings.habitOrder=[...a,...n].slice(0,300),S()},getHabitActivity(t,e=30){const a=String(t||"");return a?Object.keys(u.days).sort().reverse().flatMap(i=>{const n=u.days[i],s=n.habitForwarded&&n.habitForwarded[a],r=!!(n.habits&&n.habits[a])||!!(n.habitMissed&&n.habitMissed[a])||[n.habitRatings,n.habitMissed].some(c=>c&&Object.prototype.hasOwnProperty.call(c,a))||Array.isArray(s)&&s.length>0,o=Array.isArray(n.lockedHabits)&&n.lockedHabits.some(c=>String(c.id)===a);if(!r&&!o)return[];const l=Ge(n,a);return[{date:i,rating:l,status:l?"Completed":n.habitMissed[a]||o&&kt(i)?"Missed":"Not rated",locked:kt(i)}]}).slice(0,Math.max(1,Math.min(365,Number(e)||30))):[]},getPinnedTasks(){return ue(u.pinnedTasks,u.settings.pinnedTaskOrder)},setPinnedTaskOrder(t){const e=new Set(u.pinnedTasks.map(n=>String(n.id))),a=(Array.isArray(t)?t:[]).map(String).filter(n=>e.has(n)),i=new Set(a);u.pinnedTasks.forEach(n=>{const s=String(n.id);i.has(s)||a.push(s)}),u.settings.pinnedTaskOrder=a.slice(0,300),S()},getDay(t){return Qa(t),Xa(t)},isLocked(t){return Qa(t)},submitDay(t){const e=I(t);e.locked=!0,e.lockOverride="locked",e.submittedAt=new Date().toISOString(),ca(t),S(),this.checkGoals(t)},unlockDay(t){const e=I(t);e.locked=!1,e.lockOverride="unlocked",e.habitMissed={},e.lockedHabits=null,e.tasks.forEach(a=>{a.missed=!1}),S()},isHabitMissed(t,e){const a=u.days[t];return!a||!(a.locked||a.lockOverride==="locked")||!this.getHabits(t).some(i=>i.id===e)||la(t,e)>0?!1:(a.habitMissed&&a.habitMissed[e],!0)},isTaskMissed(t,e){const a=u.days[t];if(!a)return!1;const i=(a.tasks||[]).find(n=>n.id===e);return i?i.missed===!0?!0:i.missed===!1?!1:!!(a.locked||a.lockOverride==="locked")&&!i.done:!1},missedCounts(t){return mt(()=>{const e=this.getDay(t),a=this.getHabits(t),i=kt(t);return{habits:a.filter(n=>e.habitMissed&&e.habitMissed[n.id]?!0:i&&la(t,n.id)<=0).length,tasks:e.tasks.filter(n=>n.done?!1:n.missed===!0?!0:n.missed===!1?!1:i).length}})},lockDay(t){this.submitDay(t)},lockDays(t){let e=0;return t.forEach(a=>{this.isLocked(a)||(this.submitDay(a),e+=1)}),e},unlockDays(t){let e=0;return t.forEach(a=>{this.isLocked(a)&&(this.unlockDay(a),e+=1)}),e},lockedReports(){return mt(()=>Object.keys(u.days).sort().reverse().filter(t=>kt(t)).map(t=>({date:t,submittedAt:u.days[t].submittedAt,...this.scoreFor(t)})))},habitRating(t,e){const a=u.days[t];return a?a.habitRatings&&a.habitRatings[e]!=null?Number(a.habitRatings[e])||0:a.habits&&a.habits[e]?5:0:0},setHabitRating(t,e,a){if(!Q(t))return;const i=I(t),n=Math.max(0,Math.min(5,Number(a)||0));i.habitRatings[e]=n,i.habits[e]=n>0,S(),this.checkGoals(t)},toggleHabit(t,e){if(!Q(t))return;const a=this.habitRating(t,e)>0?0:5;this.setHabitRating(t,e,a)},addTask(t,e,a,i={}){if(!Q(t))return;I(t).tasks.push({id:nt("t"),title:e.trim(),points:Number(a)||5,description:String(i.description||"").trim(),category:N(i.category),tags:E(i.tags),rating:Math.max(0,Math.min(5,Number(i.rating)||0)),done:!1,missed:!1,forwardedFrom:/^\d{4}-\d{2}-\d{2}$/.test(String(i.forwardedFrom||""))?String(i.forwardedFrom):"",forwardedHabitId:String(i.forwardedHabitId||""),forwardedTo:[],image:Y(i.image)}),S(),this.checkGoals(t)},setTaskRating(t,e,a){if(!Q(t))return;const n=I(t).tasks.find(r=>r.id===e);if(!n)return;const s=Math.max(0,Math.min(5,Number(a)||0));n.rating=s,S()},setTaskOrder(t,e){if(!Q(t))return;const a=I(t),i=(Array.isArray(e)?e:[]).map(String).filter(Boolean);if(!i.length)return;const n=new Map(i.map((r,o)=>[r,o])),s=a.tasks.slice().sort((r,o)=>{const l=n.has(r.id)?n.get(r.id):Number.MAX_SAFE_INTEGER,c=n.has(o.id)?n.get(o.id):Number.MAX_SAFE_INTEGER;return l-c});a.tasks=s,S()},setHabitOrder(t){const e=(Array.isArray(t)?t:[]).map(String).filter(Boolean);e.length&&(u.settings.habitOrder=e.slice(0,300),S())},toggleTask(t,e){if(!Q(t))return;const i=I(t).tasks.find(n=>n.id===e);i&&(i.done=!i.done,S(),this.checkGoals(t))},removeTask(t,e){if(!Q(t))return;const a=I(t),i=a.tasks.find(s=>s.id===e);a.tasks=a.tasks.filter(s=>s.id!==e);const n=i&&i.sourcePinId?String(i.sourcePinId):"";n&&(Array.isArray(a.skippedPins)||(a.skippedPins=[]),a.skippedPins.includes(n)||a.skippedPins.push(n),a.skippedPins.length>100&&a.skippedPins.splice(0,a.skippedPins.length-100)),S()},forwardTask(t,e,a){if(!/^\d{4}-\d{2}-\d{2}$/.test(String(a||"")))return{ok:!1,reason:"Pick a valid date"};if(t===a)return{ok:!1,reason:"Already on that day"};if(!Q(t))return{ok:!1,reason:"Source day is locked"};if(this.isLocked(a))return{ok:!1,reason:"Target day is locked"};const n=I(t).tasks.find(l=>l.id===e);if(!n)return{ok:!1,reason:"Task not found"};const s=I(a),r=String(n.title||"").trim().toLowerCase();if(s.tasks.some(l=>String(l.title||"").trim().toLowerCase()===r))return{ok:!1,reason:"That task is already on that day"};s.tasks.push({id:nt("t"),title:n.title,points:Number(n.points)||5,description:String(n.description||""),category:N(n.category),tags:E(n.tags),rating:0,done:!1,missed:!1,forwardedFrom:t,forwardedHabitId:String(n.forwardedHabitId||""),forwardedTo:[],image:Y(n.image)});const o=Array.isArray(n.forwardedTo)?n.forwardedTo:[];return o.includes(a)||o.push(a),n.forwardedTo=o.slice(0,50),S(),this.checkGoals(a),{ok:!0}},habitForwardedTo(t,e){const a=u.days[t];if(!a||!a.habitForwarded)return[];const i=a.habitForwarded[e];return Array.isArray(i)?i:[]},habitReplaceDays(t,e){const a=u.habits.find(n=>n.id===e),i=Pe(a,t);return{allowed:i.allowed,next:i.next,days:i.days.slice()}},replaceHabit(t,e,a){if(!/^\d{4}-\d{2}-\d{2}$/.test(String(a||"")))return{ok:!1,reason:"Pick a valid date"};if(String(a)===String(t))return{ok:!1,reason:"Already on that day"};const i=u.habits.find(r=>r.id===e);if(!i)return{ok:!1,reason:"Habit not found"};if(!Rn(i))return{ok:!1,reason:"This habit is pinned forever — every day is already its day"};if(!Q(t))return{ok:!1,reason:"That day is locked"};if(this.isLocked(a))return{ok:!1,reason:"That day is locked"};const n=Pe(i,t);if(!n.allowed)return{ok:!1,reason:"No replace days available for this habit"};if(!n.days.includes(a))return{ok:!1,reason:`Pick a day before ${n.next}`};const s=W(i.pin);return s.exceptDates.includes(t)||(s.exceptDates=[...s.exceptDates,t].sort()),s.customDates.includes(a)||(s.customDates=[...s.customDates,a].sort()),i.pin=s,S(),this.checkGoals(a),{ok:!0,from:t,to:a}},undoReplaceHabit(t,e,a){const i=u.habits.find(s=>s.id===t);if(!i)return{ok:!1,reason:"Habit not found"};const n=W(i.pin);return n.exceptDates=(n.exceptDates||[]).filter(s=>s!==e),n.customDates=(n.customDates||[]).filter(s=>s!==a),i.pin=n,S(),{ok:!0}},habitReplacedTo(t,e){const a=u.habits.find(i=>i.id===e);return a?es(a,t):""},habitReplacedFrom(t,e){const a=u.habits.find(i=>i.id===e);return a?as(a,t):""},setNote(t,e){Q(t)&&(I(t).note=e,S())},noteFor(t){const e=u.days[String(t||"")];return e?String(e.note||""):""},notedDays(t){const e=t?`${t}-`:"";return Object.keys(u.days).filter(a=>a.startsWith(e)&&String(u.days[a].note||"").trim()).sort()},addHabit(t,e,a={}){u.habits.push({id:nt("h"),name:t.trim(),description:String(a.description||"").trim().slice(0,2e3),points:Number(e)||10,icon:"star",category:N(a.category||"physically"),consciousPoints:Z(a.consciousPoints),upgradeHistory:a.upgrade!==void 0&&a.upgrade!==null&&a.upgrade!==""?Ua({},a.upgrade,tt(a.startFrom)||F()):yt(a.upgradeHistory),pointsHistory:[],tags:E(a.tags),pin:W({mode:"forever"}),startFrom:tt(a.startFrom)||F()}),S()},updateHabit(t,e,a){const i=u.habits.find(n=>n.id===t);i&&(e.name!=null&&(i.name=String(e.name).trim()||i.name),e.description!=null&&(i.description=String(e.description).trim().slice(0,2e3)),e.points!=null&&(i.pointsHistory=Ei(i,e.points,a)),e.category!=null&&(i.category=N(e.category)),e.consciousPoints!=null&&(i.consciousPoints=Z(e.consciousPoints)),e.upgrade!==void 0&&(i.upgradeHistory=Ua(i,e.upgrade,a)),e.tags!=null&&(i.tags=E(e.tags)),S())},habitUpgradeEntry(t,e){const a=t&&typeof t=="object"?t:Ve(t);return a?Pi(a,e):null},habitUpgrade(t,e){const a=this.habitUpgradeEntry(t,e);return a?a.value:null},habitPoints(t,e){const a=t&&typeof t=="object"?t:Ve(t);return a?st(a,e):0},updateTask(t,e,a){if(!Q(t))return;const n=I(t).tasks.find(s=>s.id===e);if(n){if(a.title!=null&&(n.title=String(a.title).trim()||n.title),a.points!=null&&(n.points=Number(a.points)||n.points),a.description!=null&&(n.description=String(a.description).trim()),a.category!=null&&(n.category=N(a.category)),a.tags!=null&&(n.tags=E(a.tags)),a.image!==void 0&&(n.image=Y(a.image)),a.rating!=null&&(n.rating=Math.max(0,Math.min(5,Number(a.rating)||0))),n.sourcePinId){const s=u.pinnedTasks.find(r=>r.id===n.sourcePinId);s&&(s.title=n.title,s.points=n.points,s.description=n.description,s.category=n.category,a.tags!=null&&(s.tags=E(a.tags)),a.image!==void 0&&(s.image=Y(a.image)))}S()}},habitStreak(t,e){const a=Ve(t);if(!a)return 0;let i=e,n=0;this.habitRating(i,t)===0&&(i=zt(i));let s=0;for(;n<400;){if(n+=1,!se(a,i)||!oe(a.pin,i)){i=zt(i);continue}if(this.habitRating(i,t)>0){s+=1,i=zt(i);continue}break}return s},categoryBreakdown(t){const e=this.getDay(t),a=this.getHabits(t);return ut().map(i=>{const n=a.filter($=>N($.category)===i.id),s=e.tasks.filter($=>N($.category)===i.id),r=n.reduce(($,v)=>{const T=this.habitRating(t,v.id);return $+Math.round(st(v,t)*T/5)},0),o=u.settings.showConscious!==!1,l=o?n.reduce(($,v)=>$+(this.habitRating(t,v.id)>0?Z(v.consciousPoints):0),0):0,c=n.reduce(($,v)=>$+st(v,t),0),f=o?n.reduce(($,v)=>$+Z(v.consciousPoints),0):0,b=s.reduce(($,v)=>$+(v.done?v.points:0),0),g=s.reduce(($,v)=>$+v.points,0),k=n.map($=>this.habitRating(t,$.id)),A=k.length?Math.round(k.reduce(($,v)=>$+v,0)/k.length*10)/10:0;return{...i,habits:n,tasks:s,earned:r+l+b,max:c+f+g,habitAvg:A,consciousEarned:l,consciousMax:f,completed:n.filter($=>this.habitRating(t,$.id)>0).length+s.filter($=>$.done).length,total:n.length+s.length}})},removeHabit(t){const e=u.habits.find(a=>a.id===t);e&&Ki(e),u.habits=u.habits.filter(a=>a.id!==t),S()},getArchivedHabits(){return(u.archivedHabits||[]).map(t=>({...t}))},deleteArchivedHabit(t){const e=(u.archivedHabits||[]).length;return u.archivedHabits=(u.archivedHabits||[]).filter(a=>a.id!==t),u.archivedHabits.length===e?{ok:!1,reason:"That habit is no longer archived"}:(S(),{ok:!0})},archiveTask(t,e){if(!Q(t))return{ok:!1,reason:"Day is locked"};const a=I(t),i=a.tasks.find(s=>s.id===e);if(!i)return{ok:!1,reason:"Task not found"};u.archivedTasks||(u.archivedTasks=[]),u.archivedTasks.unshift(En(i,new Date().toISOString(),t)),u.archivedTasks.length>500&&(u.archivedTasks.length=500),a.tasks=a.tasks.filter(s=>s.id!==e);const n=i.sourcePinId?String(i.sourcePinId):"";return n&&(Array.isArray(a.skippedPins)||(a.skippedPins=[]),a.skippedPins.includes(n)||a.skippedPins.push(n)),S(),{ok:!0}},getArchivedTasks(){return(u.archivedTasks||[]).map(t=>({...t}))},restoreTask(t,e){const a=(u.archivedTasks||[]).findIndex(c=>c.id===t);if(a<0)return{ok:!1,reason:"That task is no longer archived"};const i=u.archivedTasks[a],n=e||F();Xa(n);const s=I(n),r=String(i.title||"").trim().toLowerCase();if(s.tasks.some(c=>String(c.title||"").trim().toLowerCase()===r))return{ok:!1,reason:"That task is already on that day"};const l=/^\d{4}-\d{2}-\d{2}$/.test(String(i.originDate||""))?String(i.originDate):"";return s.tasks.push({id:nt("t"),title:i.title,points:Number(i.points)||5,description:String(i.description||""),category:N(i.category),tags:E(i.tags),rating:0,done:!1,missed:!1,forwardedFrom:l&&l!==n?l:"",forwardedHabitId:"",forwardedTo:[],image:Y(i.image),sourcePinId:String(i.sourcePinId||"")}),u.archivedTasks.splice(a,1),S(),{ok:!0,from:l,to:n}},deleteArchivedTask(t){const e=(u.archivedTasks||[]).length;return u.archivedTasks=(u.archivedTasks||[]).filter(a=>a.id!==t),u.archivedTasks.length===e?{ok:!1,reason:"That task is no longer archived"}:(S(),{ok:!0})},restoreHabit(t){const e=(u.archivedHabits||[]).findIndex(n=>n.id===t);if(e<0)return{ok:!1,reason:"That habit is no longer archived"};const a=u.archivedHabits[e];if(u.habits.some(n=>n.id===a.id))return u.archivedHabits.splice(e,1),S(),{ok:!0};const i={...a,description:String(a.description||"").slice(0,2e3),category:N(a.category),consciousPoints:Z(a.consciousPoints),upgradeHistory:yt(a.upgradeHistory),pointsHistory:vt(a.pointsHistory),tags:E(a.tags),pin:W(a.pin),archivedAt:null};return u.habits.push(i),u.archivedHabits.splice(e,1),S(),{ok:!0,habit:{...i}}},pinHabit(t,e){const a=u.habits.find(i=>i.id===t);a&&(a.pin=W(e),S())},updatePinnedTaskDetails(t,e){const a=u.pinnedTasks.find(i=>i.id===t);if(a){if(e.title!=null&&(a.title=String(e.title).trim().slice(0,120)||a.title),e.points!=null){const i=Number(e.points);Number.isFinite(i)&&(a.points=Math.max(0,i))}e.description!=null&&(a.description=String(e.description).trim().slice(0,2e3)),e.category!=null&&(a.category=N(e.category)),e.tags!=null&&(a.tags=E(e.tags)),e.image!==void 0&&(a.image=Y(e.image)),Ye(t),S()}},unpinHabit(t){const e=u.habits.find(a=>a.id===t);e&&(e.pin=null,S())},pinTask(t,e,a){if(!Q(t))return;const n=I(t).tasks.find(o=>o.id===e);if(!n)return;const s=n.sourcePinId?u.pinnedTasks.find(o=>o.id===n.sourcePinId):null;if(s){s.pin=W(a),Ye(s.id),me(),S();return}const r=nt("p");u.pinnedTasks.push({id:r,title:n.title,points:n.points,description:n.description||"",category:N(n.category),tags:E(n.tags),pin:W(a),startFrom:t,image:Y(n.image)}),n.sourcePinId=r,me(),S()},unpinTaskTemplate(t){u.pinnedTasks=u.pinnedTasks.filter(a=>a.id!==t);const e=String(t);Object.entries(u.days).forEach(([a,i])=>{if(!Array.isArray(i.tasks)||!i.tasks.length||Ce(a))return;const n=i.tasks.length;i.tasks=i.tasks.filter(s=>String(s&&s.sourcePinId||"")!==e),i.tasks.length!==n&&(Array.isArray(i.skippedPins)||(i.skippedPins=[]),i.skippedPins=i.skippedPins.filter(s=>s!==e))}),S()},updatePinnedTask(t,e){const a=u.pinnedTasks.find(i=>i.id===t);a&&(a.pin=W(e),Ye(t),me(),S())},findHabit(t){return u.habits.find(e=>e.id===t)||null},findTask(t,e){return I(t).tasks.find(a=>a.id===e)||null},findPinnedTask(t){return u.pinnedTasks.find(e=>e.id===t)||null},getInstalledAt(){return String(u.installedAt||new Date().toISOString())},getProfile(){const t=Qt(u.profile);return u.profile=t,JSON.parse(JSON.stringify(t))},setProfileField(t,e){return!Object.prototype.hasOwnProperty.call(ia,t)||u.profile.locked?!1:((!u.profile||typeof u.profile!="object")&&(u.profile=Qt({})),u.profile[t]=String(e||"").slice(0,ia[t]),S(),!0)},setProfileLocked(t){(!u.profile||typeof u.profile!="object")&&(u.profile=Qt({})),u.profile.locked=!!t,S()},isProfileLocked(){return!!(u.profile&&u.profile.locked)},profileGoalDurations(){return JSON.parse(JSON.stringify(Yt))},addWhoAmI(t){if(u.profile.locked)return{ok:!1,reason:"Profile is locked"};const e=String(t||"").trim().slice(0,120);return e?(u.profile.whoAmI||[]).length>=50?{ok:!1,reason:"List is full (50)"}:(u.profile.whoAmI.push({id:J("w"),text:e}),S(),{ok:!0}):{ok:!1,reason:"Type something first"}},updateWhoAmI(t,e){if(u.profile.locked)return;const a=(u.profile.whoAmI||[]).find(n=>n.id===t);if(!a)return;const i=String(e||"").trim().slice(0,120);i?a.text=i:u.profile.whoAmI=u.profile.whoAmI.filter(n=>n.id!==t),S()},moveWhoAmI(t,e){if(u.profile.locked)return;const a=u.profile.whoAmI||[],i=a.findIndex(r=>r.id===t),n=i+e;if(i<0||n<0||n>=a.length)return;const[s]=a.splice(i,1);a.splice(n,0,s),S()},removeWhoAmI(t){u.profile.locked||(u.profile.whoAmI=(u.profile.whoAmI||[]).filter(e=>e.id!==t),S())},addLifeArea(t){if(u.profile.locked)return{ok:!1,reason:"Profile is locked"};const e=String(t||"").trim().slice(0,60);if(!e)return{ok:!1,reason:"Name the life area"};if((u.profile.lifeAreas||[]).length>=20)return{ok:!1,reason:"Max 20 areas"};const a={id:J("a"),title:e,description:""};return u.profile.lifeAreas.push(a),S(),{ok:!0,id:a.id}},updateLifeArea(t,e={}){if(u.profile.locked)return;const a=(u.profile.lifeAreas||[]).find(i=>i.id===t);a&&(e.title!=null&&(a.title=String(e.title).trim().slice(0,60)||a.title),e.description!=null&&(a.description=String(e.description).slice(0,1e3)),S())},moveLifeArea(t,e){if(u.profile.locked)return;const a=u.profile.lifeAreas||[],i=a.findIndex(r=>r.id===t),n=i+e;if(i<0||n<0||n>=a.length)return;const[s]=a.splice(i,1);a.splice(n,0,s),S()},removeLifeArea(t){u.profile.locked||(u.profile.lifeAreas=(u.profile.lifeAreas||[]).filter(e=>e.id!==t),S())},addProfileGoal(t,e,a){if(u.profile.locked)return{ok:!1,reason:"Profile is locked"};const i=String(t||"").trim().slice(0,200);if(!i)return{ok:!1,reason:"Write your goal first"};const n=sa.includes(e)?e:"short",s=Yt[n],r=s.includes(a)?a:s[0];if((u.profile.pGoals||[]).length>=100)return{ok:!1,reason:"Too many goals (100)"};const o={id:J("g"),text:i,term:n,duration:r,createdAt:new Date().toISOString()};return u.profile.pGoals.push(o),S(),{ok:!0,id:o.id}},updateProfileGoal(t,e={}){if(u.profile.locked)return;const a=(u.profile.pGoals||[]).find(i=>i.id===t);if(a){if(e.text!=null&&(a.text=String(e.text).trim().slice(0,200)||a.text),e.term!=null&&sa.includes(e.term)){a.term=e.term;const i=Yt[a.term];i.includes(a.duration)||(a.duration=i[0])}e.duration!=null&&Yt[a.term].includes(e.duration)&&(a.duration=e.duration),S()}},removeProfileGoal(t){u.profile.locked||(u.profile.pGoals=(u.profile.pGoals||[]).filter(e=>e.id!==t),S())},addQuote(t,e){if(u.profile.locked)return{ok:!1,reason:"Profile is locked"};const a=String(t||"").trim().slice(0,500);if(!a)return{ok:!1,reason:"Write the quote first"};if((u.profile.quotes||[]).length>=200)return{ok:!1,reason:"Too many quotes (200)"};const i={id:J("q"),text:a,author:String(e||"").trim().slice(0,80),fav:!1,createdAt:new Date().toISOString()};return u.profile.quotes.push(i),S(),{ok:!0,id:i.id}},updateQuote(t,e={}){if(u.profile.locked)return;const a=(u.profile.quotes||[]).find(i=>i.id===t);a&&(e.text!=null&&(a.text=String(e.text).trim().slice(0,500)||a.text),e.author!=null&&(a.author=String(e.author).trim().slice(0,80)),S())},toggleQuoteFav(t){if(u.profile.locked)return;const e=(u.profile.quotes||[]).find(a=>a.id===t);e&&(e.fav=!e.fav,S())},removeQuote(t){u.profile.locked||(u.profile.quotes=(u.profile.quotes||[]).filter(e=>e.id!==t),S())},getCategories(){return ut().map(t=>({...t}))},getCustomCategories(){return V.map(t=>({...t}))},addCategory(t){const e=String(t||"").trim().slice(0,30);if(!e)return{ok:!1,reason:"Type a category name"};if(ut().some(n=>n.label.toLowerCase()===e.toLowerCase()))return{ok:!1,reason:"That category already exists"};if(V.length>=20)return{ok:!1,reason:"Too many categories (max 20 custom)"};let i=`c${Date.now().toString(36)}`;return ut().some(n=>n.id===i)&&(i=`c${Date.now().toString(36)}${Math.floor(Math.random()*99)}`),V.push({id:i,label:e}),S(),{ok:!0,id:i}},renameCategory(t,e){const a=V.find(s=>s.id===t);if(!a)return{ok:!1,reason:"Built-in categories can’t be renamed"};const i=String(e||"").trim().slice(0,30);return i?ut().some(s=>s.id!==t&&s.label.toLowerCase()===i.toLowerCase())?{ok:!1,reason:"That category already exists"}:(a.label=i,S(),{ok:!0}):{ok:!1,reason:"Type a category name"}},updateCategory(t,e={}){const a=V.find(i=>i.id===t);if(!a){if(!ne.find(s=>s.id===t))return{ok:!1,reason:"Category not found"};const n={...ct[t]||{}};return e.color!==void 0&&(n.color=String(e.color).slice(0,20)),e.goals!==void 0&&(n.goals=String(e.goals).slice(0,1e3)),ct[t]=n,u.categoryOverrides=ct,S(),{ok:!0}}return e.color!==void 0&&(a.color=String(e.color).slice(0,20)),e.goals!==void 0&&(a.goals=String(e.goals).slice(0,1e3)),S(),{ok:!0}},deleteCategory(t){const e=V.findIndex(a=>a.id===t);return e<0?{ok:!1,reason:"Built-in categories can’t be deleted"}:(V.splice(e,1),u.habits.forEach(a=>{a.category===t&&(a.category="mentally")}),(u.archivedHabits||[]).forEach(a=>{a.category===t&&(a.category="mentally")}),u.pinnedTasks.forEach(a=>{a.category===t&&(a.category="mentally")}),Object.values(u.days).forEach(a=>{(a.tasks||[]).forEach(i=>{i.category===t&&(i.category="mentally")})}),S(),{ok:!0})},getAllTags(){const t=new Map,e=a=>{E(a).forEach(i=>{t.set(i,(t.get(i)||0)+1)})};return u.habits.forEach(a=>e(a.tags)),(u.archivedHabits||[]).forEach(a=>e(a.tags)),u.pinnedTasks.forEach(a=>e(a.tags)),Object.values(u.days).forEach(a=>{(a.tasks||[]).forEach(i=>e(i.tags))}),[...t.entries()].map(([a,i])=>({tag:a,count:i})).sort((a,i)=>i.count-a.count||a.tag.localeCompare(i.tag))},renameTag(t,e){const a=String(t||"").trim(),i=E(e)[0]||"";if(!a||!i)return{ok:!1,reason:"Type a tag name"};if(a.toLowerCase()===i.toLowerCase()){const r=o=>E((o||[]).map(l=>String(l).toLowerCase()===a.toLowerCase()?i:l));return u.habits.forEach(o=>{o.tags=r(o.tags)}),(u.archivedHabits||[]).forEach(o=>{o.tags=r(o.tags)}),u.pinnedTasks.forEach(o=>{o.tags=r(o.tags)}),Object.values(u.days).forEach(o=>{(o.tasks||[]).forEach(l=>{l.tags=r(l.tags)})}),S(),{ok:!0}}const n=this.getAllTags().some(r=>r.tag.toLowerCase()===i.toLowerCase()),s=r=>{const o=(r||[]).map(l=>String(l).toLowerCase()===a.toLowerCase()?i:l);return E(o)};return u.habits.forEach(r=>{r.tags=s(r.tags)}),(u.archivedHabits||[]).forEach(r=>{r.tags=s(r.tags)}),u.pinnedTasks.forEach(r=>{r.tags=s(r.tags)}),Object.values(u.days).forEach(r=>{(r.tasks||[]).forEach(o=>{o.tags=s(o.tags)})}),S(),{ok:!0,merged:n}},deleteTag(t){const e=String(t||"").trim().toLowerCase();if(!e)return{ok:!1,reason:"Pick a tag first"};const a=i=>(i||[]).filter(n=>String(n).toLowerCase()!==e);return u.habits.forEach(i=>{i.tags=a(i.tags)}),(u.archivedHabits||[]).forEach(i=>{i.tags=a(i.tags)}),u.pinnedTasks.forEach(i=>{i.tags=a(i.tags)}),Object.values(u.days).forEach(i=>{(i.tasks||[]).forEach(n=>{n.tags=a(n.tags)})}),S(),{ok:!0}},addTagToHabit(t,e){const a=u.habits.find(n=>n.id===t);if(!a)return{ok:!1,reason:"Pick a habit first"};const i=E(e)[0]||"";return i?(a.tags=E([...a.tags||[],i]),S(),{ok:!0}):{ok:!1,reason:"Type a tag name"}},categoryChart(t,e){const a=["week","month","year"].includes(t)?t:"week",i=`${a}|${e}|${Hn}`;return ze.key===i?ze.value:mt(()=>this._buildCategoryChart(a,e,i))},_buildCategoryChart(t,e,a){const i=ut(),n=[];if(t==="year"){const f=String(e).slice(0,4);for(let b=0;b<12;b++){const g=String(b+1).padStart(2,"0"),k=new Date(Number(f),b+1,0).getDate();n.push({label:new Date(Number(f),b,1).toLocaleDateString(void 0,{month:"short"}),title:new Date(Number(f),b,1).toLocaleDateString(void 0,{month:"long",year:"numeric"}),keys:this.rangeKeys(`${f}-${g}-01`,`${f}-${g}-${String(k).padStart(2,"0")}`)})}}else{const[f,b]=this.resolveRange(t,e);this.rangeKeys(f,b).forEach(g=>{const k=new Date(`${g}T00:00:00`);n.push({label:t==="week"?k.toLocaleDateString(void 0,{weekday:"narrow"}):String(k.getDate()),title:g,keys:[g]})})}const s={},r={};i.forEach(f=>{s[f.id]=n.map(()=>0),r[f.id]=0}),n.forEach((f,b)=>{f.keys.forEach(g=>{this.categoryBreakdown(g).forEach(k=>{k.id in s||(s[k.id]=n.map(()=>0),r[k.id]=0),s[k.id][b]+=k.earned||0,r[k.id]+=k.earned||0})})});const o=n.map((f,b)=>i.reduce((g,k)=>g+(s[k.id]?s[k.id][b]:0),0)),l=Math.max(1,...o),c={kind:t,labels:n.map(f=>f.label),titles:n.map(f=>f.title),cats:i.map(f=>({...f})),perCat:s,totals:r,max:l,grandTotal:o.reduce((f,b)=>f+b,0)};return ze={key:a,value:c},c},getGoals(){return u.goals},getBadges(){return[...u.badges].sort((t,e)=>{const a=qa(e.tier)-qa(t.tier);return a!==0?a:String(e.earnedAt).localeCompare(String(t.earnedAt))})},topBadges(t=3){return this.getBadges().slice(0,t)},addGoal(t={}){const e=na({...t,id:nt("g")});return u.goals.push(e),S(),this.checkGoals(F()),e},updateGoal(t,e={}){const a=u.goals.find(n=>n.id===t);if(!a)return;const i=na({...a,...e,id:t});Object.assign(a,i),S(),this.checkGoals(F())},removeGoal(t){u.goals=u.goals.filter(e=>e.id!==t),S()},findGoal(t){return u.goals.find(e=>e.id===t)||null},taskListGoals(){return u.goals.filter(t=>t.kind==="task-list")},openTaskListGoals(){return u.goals.filter(t=>t.kind==="task-list"&&!t.locked)},undoneDayTasks(t=60){const e=[],a=new Set;return Object.keys(u.days).sort().reverse().forEach(i=>{(u.days[i]&&u.days[i].tasks||[]).forEach(s=>{if(!s||s.done)return;const r=String(s.title||"").trim();if(!r)return;const o=r.toLowerCase();a.has(o)||(a.add(o),e.push({title:r,category:s.category,points:Number(s.points)||0,date:i}))})}),e.slice(0,t)},addGoalItem(t,e){const a=u.goals.find(n=>n.id===t);if(!a||a.kind!=="task-list")return{ok:!1,reason:"No such goal"};if(a.locked||a.terminated)return{ok:!1,reason:"This goal is locked — unlock it first"};const i=String(e||"").trim().slice(0,120);return i?a.tasks.length>=100?{ok:!1,reason:"Goal list is full (100 tasks)"}:(a.tasks.push({id:nt("gt"),title:i,done:!1,doneAt:null}),S(),{ok:!0}):{ok:!1,reason:"Type a task first"}},addGoalItems(t,e){const a=u.goals.find(s=>s.id===t);if(!a||a.kind!=="task-list")return{ok:!1,reason:"No such goal"};if(a.locked||a.terminated)return{ok:!1,reason:"This goal is locked — unlock it first"};const i=new Set(a.tasks.map(s=>s.title.toLowerCase())),n=[];return(Array.isArray(e)?e:[]).forEach(s=>{const r=String(s||"").trim().slice(0,120);if(!r)return;const o=r.toLowerCase();i.has(o)||a.tasks.length>=100||(i.add(o),a.tasks.push({id:nt("gt"),title:r,done:!1,doneAt:null}),n.push(r))}),S(),{ok:!0,added:n.length}},removeGoalItem(t,e){const a=u.goals.find(i=>i.id===t);return!a||a.kind!=="task-list"||a.locked?{ok:!1,reason:"Unlock the goal to edit its tasks"}:(a.tasks=a.tasks.filter(i=>i.id!==e),S(),{ok:!0})},goalTaskSchedule(t){return In(t)},goalTaskDone(t){const e=this.goalTaskSchedule(t);if(!e)return!!(t&&t.done);const a=t&&Array.isArray(t.checked)?t.checked:[];return e.slots.every(i=>a.includes(i.key))},_goalDoneCount(t){return(t.tasks||[]).filter(e=>this.goalTaskDone(e)).length},setGoalItemDone(t,e,a){const i=u.goals.find(c=>c.id===t);if(!i||i.kind!=="task-list")return{ok:!1,reason:"No such goal"};if(i.locked)return{ok:!1,reason:"Unlock the goal to edit its tasks"};const n=i.tasks.find(c=>c.id===e);if(!n)return{ok:!1,reason:"No such task in the goal"};const s=this.goalTaskSchedule(n);if(s){if(a){const c=Array.isArray(n.checked)?n.checked:[];return{ok:!1,reason:`Tick every pinned day first: ${s.slots.filter(b=>!c.includes(b.key)).map(b=>b.label).join(", ")}`}}n.checked=[],n.done=!1,n.doneAt=null}else n.done=!!a,n.doneAt=a?new Date().toISOString():null;const r=this._refreshTaskListGoal(i),{awarded:o,revoked:l}=this.checkGoalsDetailed();return S(),{ok:!0,autoLocked:r,awarded:o,revoked:l}},setGoalItemSlot(t,e,a,i){const n=u.goals.find(b=>b.id===t);if(!n||n.kind!=="task-list")return{ok:!1,reason:"No such goal"};if(n.locked)return{ok:!1,reason:"Unlock the goal to edit its tasks"};const s=n.tasks.find(b=>b.id===e);if(!s)return{ok:!1,reason:"No such task in the goal"};const r=this.goalTaskSchedule(s);if(!r)return{ok:!1,reason:"This task has no repeat schedule"};if(!r.slots.some(b=>b.key===a))return{ok:!1,reason:"Not a day of this task"};const o=new Set(Array.isArray(s.checked)?s.checked:[]);i?o.add(a):o.delete(a),s.checked=[...o],s.done=r.slots.every(b=>s.checked.includes(b.key)),s.doneAt=s.done?s.doneAt||new Date().toISOString():null;const l=this._refreshTaskListGoal(n),{awarded:c,revoked:f}=this.checkGoalsDetailed();return S(),{ok:!0,autoLocked:l,done:s.done,awarded:c,revoked:f}},setGoalLocked(t,e){const a=u.goals.find(i=>i.id===t);return!a||a.kind!=="task-list"?{ok:!1,reason:"No such goal"}:(e?(a.locked=!0,a.tasks.length>0&&a.tasks.every(n=>this.goalTaskDone(n))||(a.terminated=!0)):a.locked=!1,S(),{ok:!0})},_refreshTaskListGoal(t){return t.tasks.length>0&&t.tasks.every(a=>this.goalTaskDone(a))&&!t.locked?(t.locked=!0,!0):!1},removeBadge(t){u.badges=u.badges.filter(e=>e.id!==t),S()},perfectDaysCount(){return mt(()=>Object.keys(u.days).filter(t=>{const e=this.scoreFor(t);return e.max>0&&e.percent===100}).length)},taskStreak(t,e){let a=e,i=0;(r=>{const o=u.days[r];return!o||!Array.isArray(o.tasks)?!1:o.tasks.some(l=>l.sourcePinId===t&&l.done)})(a)||(a=zt(a));let s=0;for(;i<400;){i+=1;const r=u.days[a];if(!r||!Array.isArray(r.tasks))break;if(r.tasks.some(o=>o.sourcePinId===t&&o.done)){s+=1,a=zt(a);continue}break}return s},goalProgress(t,e){const a=e||F();if(t.kind==="habit-streak"){const n=this.habitStreak(t.targetId,a);return{current:n,target:t.targetDays,done:n>=t.targetDays}}if(t.kind==="task-streak"){const n=this.taskStreak(t.targetId,a);return{current:n,target:t.targetDays,done:n>=t.targetDays}}if(t.kind==="task-list"){const n=t.tasks||[],s=this._goalDoneCount(t);return{current:s,target:Math.max(n.length,1),done:n.length>0&&s===n.length}}const i=this.perfectDaysCount();return{current:i,target:t.targetDays,done:i>=t.targetDays}},checkGoalsDetailed(t){const e=t||F(),a=[],i=[];return u.goals.forEach(n=>{const s=this.goalProgress(n,e),r=u.badges.find(o=>o.goalId===n.id);if(s.done){if(r)return;const o={id:nt("b"),goalId:n.id,title:n.title,tier:n.tier,rewardTitle:n.rewardTitle,earnedAt:new Date().toISOString()};u.badges.push(o),a.push(o);return}r&&(u.badges=u.badges.filter(o=>o.goalId!==n.id),i.push(r))}),(a.length||i.length)&&S(),{awarded:a,revoked:i}},checkGoals(t){return this.checkGoalsDetailed(t).awarded},scoreFor(t){return mt(()=>this._scoreFor(t))},_scoreFor(t){const e=this.getDay(t),a=this.getHabits(t),i=this.isLocked(t),n=u.settings.showConscious!==!1,s=a.reduce(($,v)=>{const T=this.habitRating(t,v.id);return $+Math.round(st(v,t)*T/5)},0),r=n?a.reduce(($,v)=>$+(this.habitRating(t,v.id)>0?Z(v.consciousPoints):0),0):0,o=e.tasks.reduce(($,v)=>$+(v.done?v.points:0),0),l=a.reduce(($,v)=>$+st(v,t),0),c=n?a.reduce(($,v)=>$+Z(v.consciousPoints),0):0,f=e.tasks.reduce(($,v)=>$+v.points,0),b=s+r+o,g=l+c+f,k=a.filter($=>e.habitMissed&&e.habitMissed[$.id]?!0:i&&this.habitRating(t,$.id)<=0).length,A=e.tasks.filter($=>$.done?!1:$.missed===!0?!0:$.missed===!1?!1:i).length;return{earned:b,max:g,habitScore:s,consciousScore:r,maxConscious:c,taskScore:o,completedHabits:a.filter($=>this.habitRating(t,$.id)>0).length,habitAvg:a.length?Math.round(a.reduce(($,v)=>$+this.habitRating(t,v.id),0)/a.length*10)/10:0,totalHabits:a.length,completedTasks:e.tasks.filter($=>$.done).length,totalTasks:e.tasks.length,missedHabits:k,missedTasks:A,percent:g?Math.round(b/g*100):0,locked:i,submittedAt:e.submittedAt}},monthKeys(t){const e=String(t).slice(0,7);return Object.keys(u.days).filter(a=>a.startsWith(e)).sort()},rangeKeys(t,e){const a=[],i=new Date(`${t}T00:00:00`),n=new Date(`${e}T00:00:00`);let s=0;for(;i<=n&&s<732;)s+=1,a.push(F(i)),i.setDate(i.getDate()+1);return a},resolveRange(t,e){if(t==="day")return[e,e];if(t==="week"){const i=new Date(`${e}T00:00:00`),n=new Date(i);n.setDate(i.getDate()-(i.getDay()-this.getWeekStart()+7)%7);const s=new Date(n);return s.setDate(n.getDate()+6),[F(n),F(s)]}if(t==="month"){const[i,n]=e.split("-").map(Number),s=`${i}-${String(n).padStart(2,"0")}-01`,r=new Date(i,n,0).getDate(),o=`${i}-${String(n).padStart(2,"0")}-${String(r).padStart(2,"0")}`;return[s,o]}if(t==="year"){const i=e.slice(0,4);return[`${i}-01-01`,`${i}-12-31`]}const a=Object.keys(u.days).sort();return a.length?[a[0],a[a.length-1]>e?a[a.length-1]:e]:[e,e]},exportRows(t,e){return mt(()=>this._exportRows(t,e))},_exportRows(t,e){return this.rangeKeys(t,e).map(a=>{const i=this.getDay(a),n=this.getHabits(a),s=this.scoreFor(a),r=this.isLocked(a),o=(c,f)=>f>0?"done":r?"missed":"pending",l=c=>c.done?"done":r?"missed":"pending";return{date:a,earned:s.earned,max:s.max,percent:s.percent,habitScore:s.habitScore,consciousScore:s.consciousScore||0,taskScore:s.taskScore,locked:r,missedHabits:s.missedHabits||0,missedTasks:s.missedTasks||0,note:i.note||"",habits:n.map(c=>{const f=this.habitRating(a,c.id);return{name:c.name,description:String(c.description||""),category:gt(N(c.category)),tags:E(c.tags),points:st(c,a),consciousPoints:this.consciousEnabled()?Z(c.consciousPoints):0,upgrade:this.habitUpgrade(c.id,a),upgradeType:(this.habitUpgradeEntry(c.id,a)||{}).type||null,rating:f,earned:Math.round(st(c,a)*f/5)+(f>0&&this.consciousEnabled()?Z(c.consciousPoints):0),status:o(c.id,f)}}),tasks:i.tasks.map(c=>({title:c.title,category:gt(N(c.category)),tags:E(c.tags),points:c.points,rating:Math.max(0,Math.min(5,Number(c.rating)||0)),done:!!c.done,earned:c.done?c.points:0,status:c.forwardedFrom?`forwarded from ${c.forwardedFrom}`:l(c),forwardedFrom:c.forwardedFrom||"",forwardedTo:Array.isArray(c.forwardedTo)?c.forwardedTo:[],description:c.description||"",hasImage:!!c.image}))}})},history(t=14){return mt(()=>Object.keys(u.days).sort().reverse().slice(0,t).map(a=>({date:a,...this.scoreFor(a),note:u.days[a].note,locked:kt(a),submittedAt:u.days[a].submittedAt})))},week(t){return mt(()=>{const e=new Date(t);return e.setDate(e.getDate()-(e.getDay()-this.getWeekStart()+7)%7),e.setHours(0,0,0,0),Array.from({length:7},(a,i)=>{const n=new Date(e);n.setDate(e.getDate()+i);const s=F(n),r=u.days[s];return{date:s,label:n.toLocaleDateString(void 0,{weekday:"short"}),dayOfMonth:n.getDate(),hasRecord:!!r,note:String(r&&r.note||""),locked:kt(s),...this.scoreFor(s)}})})}};function On(t){return t>=90?"Excellent":t>=75?"Great day":t>=50?"Keep going":t>0?"Started":"No score yet"}function O(t){return new Date(`${t}T00:00:00`).toLocaleDateString(void 0,{weekday:"long",month:"short",day:"numeric"})}function ns(t){return t?new Date(t).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}):""}function Ee(t){return t>=5?"Excellent":t>=4?"Great":t>=3?"Good":t>=2?"Fair":t>=1?"Low":"Not rated"}const Je=document.getElementById("app"),jn="daily-report-2026-11-09T19-55-00-mw9okc7p",tn=`v1.1 — Auto-update · Offline · Backup (${jn.slice(-8)})`;let y=d.todayKey(),R="today",x=null,w=null,B=!1,St=!1;const ve=new Set;let Ct=!1,Le=!1,It=null,ht=!1,Ne=!1,ua=null,bt="Idle.",et="week",it="all",dt=0,Me=null,z="month",He=null,_=[],pt=0,Nt=null;const $t=new Set,Ot=new Map;let Xt=!1,ke="all",rt="short",jt="1 Week";const Jt=new Set;let $e=null;const we=new Set,Zt=new Set;let pa=null,Mt=null;window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),It=t});window.addEventListener("appinstalled",()=>{It=null,m("Second Mind installed"),h()});const is=[["default","Default"],["points","Points"],["category","Category"],["tags","Tags"],["custom","Custom"]];function en(t){const e=new Date(`${y}T00:00:00`);e.setDate(e.getDate()+t),y=d.todayKey(e)}let Qe=d.todayKey();function Ma(){const t=d.todayKey();if(t===Qe)return!1;const e=Qe;return Qe=t,y===e&&(y=t),Me=null,He=null,_=[],pt=0,dt=0,!0}function L(t){return{home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z"/></svg>',profile:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/></svg>',history:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8v5l3 2"/><circle cx="12" cy="12" r="9"/></svg>',settings:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H8a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V8c.3.7.9 1.2 1.6 1.3H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1.7z"/></svg>',pin:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4h6l-1 7 3 3v2H7v-2l3-3z" fill="currentColor" stroke="none"/><path d="M12 16v5"/></svg>',forward:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',swap:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h13l-3.5-3.5M20 16H7l3.5 3.5"/></svg>',undo:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h11a5 5 0 0 1 0 10H8"/><path d="M8 5 4 9l4 4"/></svg>',habit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h10M4 17h13"/></svg>',archive:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h18v4H3zM5 11v9h14v-9M9.5 15h5"/></svg>',trash:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg>',grip:'<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><circle cx="9" cy="6" r="1.7"/><circle cx="15" cy="6" r="1.7"/><circle cx="9" cy="12" r="1.7"/><circle cx="15" cy="12" r="1.7"/><circle cx="9" cy="18" r="1.7"/><circle cx="15" cy="18" r="1.7"/></svg>'}[t]}function Bn(t,e,a){return`
    <div class="stars" data-habit="${t}">
      ${[1,2,3,4,5].map(i=>`
            <button type="button" class="star ${i<=e?"on":""}" data-action="rate-habit" data-id="${t}" data-rating="${i}" ${a?"disabled":""} aria-label="${i} star">★</button>
          `).join("")}
    </div>
  `}function Gn(t,e,a){return`
    <div class="stars stars-small" data-task="${t}">
      ${[1,2,3,4,5].map(i=>`
            <button type="button" class="star small ${i<=e?"on":""}" data-action="rate-task" data-id="${t}" data-rating="${i}" ${a?"disabled":""} aria-label="${i} star">★</button>
          `).join("")}
    </div>
  `}function _n(t){const e=Number(t)||0;return e?`<span class="conscious-badge">🧠 +${e}</span>`:'<span class="item-meta">No conscious pts</span>'}function Ie(t,e){const a=d.habitUpgradeEntry(t,e);return a?a.type==="degree"?`<span class="upgrade-badge">🎯 ${p(a.value)}</span>`:`<span class="upgrade-badge">🎯 ${a.value}/day</span>`:""}const ss=["mentally","psychology","physically","spiritually","socially"];function Pt(t){const a=d.getCategories().find(s=>s.id===t),i=a&&a.color?a.color:q(t);return`<span class="cat-badge ${ss.includes(t)?`cat-${t}`:"cat-custom"}" style="background:${i}22;color:${i};box-shadow:inset 0 0 0 1px ${i}55">${p(gt(t))}</span>`}function qn(t){const e=t||document,a=e.querySelector(".upgrade-points-preview");if(!a)return;const i=e.querySelector('input[name="points"]'),n=e.querySelector('input[name="upgradePointsDelta"]'),s=e.querySelector('input[name="upgradeDirection"]'),r=Math.max(1,Math.min(100,Number(i?i.value:0)||0)),o=Math.max(0,Math.min(100,Number(n?n.value:0)||0)),l=s&&s.value==="degrade",c=Math.max(1,Math.min(100,l?r-o:r+o));a.textContent=`Points from ${O(y)}: ${r} → ${c}`}document.addEventListener("input",t=>{t.target&&t.target.name==="upgradePointsDelta"&&qn(t.target.closest(".sheet")||document)});function fa(t){const e=String(t||"");if(!e)return"Deleted";const a=new Date(e);return Number.isNaN(a.getTime())?"Deleted":`Deleted ${a.toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}`}const an={mentally:"#5b8cff",psychology:"#a06bff",physically:"#22b07d",spiritually:"#e8a51c",socially:"#14b8a6"},nn=["#f472b6","#38bdf8","#fb923c","#a3e635","#facc15","#e879f9"];function q(t,e){const i=d.getCategories().find(n=>n.id===t);return i&&i.color?i.color:an[t]?an[t]:nn[(e??0)%nn.length]}function ft(t){const e=Array.isArray(t)?t.filter(Boolean):[];return e.length?`<div class="tag-row">${e.map(a=>`<span class="tag-chip">#${p(a)}</span>`).join("")}</div>`:""}function Wn(t){return!t||!t.image?"":`<button type="button" class="task-img-thumb" data-action="view-task-image" data-id="${t.id}" aria-label="View attached photo"><img src="${t.image}" alt="Task photo" loading="lazy" /></button>`}function Un(t){const e=String(t||"");if(!e.trim())return"";const a=e.split(`
`),i=/^\s*(?:•|-|[*])\s+(.*)$/,n=/^\s*\d+[.)]\s+(.*)$/;let s="",r=null;const o=()=>{r&&(s+=r==="ul"?"</ul>":"</ol>",r=null)};return a.forEach(l=>{const c=i.exec(l),f=!c&&n.exec(l);c?(r!=="ul"&&(o(),s+='<ul class="note-list">',r="ul"),s+=`<li>${p(c[1])||"&nbsp;"}</li>`):f?(r!=="ol"&&(o(),s+='<ol class="note-list">',r="ol"),s+=`<li>${p(f[1])||"&nbsp;"}</li>`):l.trim()?(o(),s+=`<p class="note-text">${p(l)}</p>`):(o(),s+='<p class="note-text">&nbsp;</p>')}),o(),s}function os(t){const e=Un(t);return e?`<div class="note" style="margin-top:10px">${e}</div>`:""}function ee(t){return String(t||"").split(`
`).map(e=>e.replace(/^\s*(?:•|-|\*|\d+[.)])\s*/,"").trim()).filter(Boolean)}function ae(t){return t.map(e=>`• ${e}`).join(`
`)}function sn(t,e){const a=String(t||"").split(`
`).map(i=>i.replace(/^\s*(?:•|-|\*)\s+/,"").trim()).filter(Boolean);return a.length?`<ul class="note-list idea-list">${a.map((i,n)=>`
        <li>
          <span>${p(i)}</span>
          ${e?"":`<button class="idea-remove" data-action="remove-idea" data-index="${n}" title="Remove idea" aria-label="Remove idea">✕</button>`}
        </li>`).join("")}</ul>`:""}function zn(t,e,a){if(!t||t.disabled)return;const i=t.value||"",n=i.split(`
`),s=i.slice(0,t.selectionStart).split(`
`).length-1,r=i.slice(0,t.selectionEnd).split(`
`).length-1,o=t.selectionStart!==t.selectionEnd,l=o?s:0,c=o?r:n.length-1;if(e==="bullets"){const f=n.slice(l,c+1).every(b=>/^\s*(?:•|-|[*])\s+/.test(b)||!b.trim());for(let b=l;b<=c;b++)n[b].trim()&&(f?n[b]=n[b].replace(/^\s*(?:•|-|[*])\s+/,""):/^\s*(?:•|-|[*])\s+/.test(n[b])||(n[b]=`• ${n[b].replace(/^\s*/,"")}`))}else{const f=n.slice(l,c+1).every(g=>/^\s*\d+[.)]\s+/.test(g)||!g.trim());let b=1;for(let g=l;g<=c;g++){if(!n[g].trim())continue;const k=n[g].replace(/^\s*(?:\d+[.)]|•|-|[*])\s+/,"").replace(/^\s*/,"");n[g]=f?k:`${b}. ${k}`,b+=1}}t.value=n.join(`
`),a&&a(t.value);try{t.focus()}catch{}}function on(t){zn(document.getElementById("day-note"),t,e=>d.setNote(y,e))}function rn(t){zn(document.getElementById("profile-values"),t,e=>d.setProfileField("values",e))}function rs(t){return new Promise(e=>{if(!t||!String(t.type||"").startsWith("image/"))return e(null);const a=URL.createObjectURL(t),i=new Image,n=()=>{try{URL.revokeObjectURL(a)}catch{}},s=(r,o)=>new Promise(l=>{let c=i.naturalWidth||0,f=i.naturalHeight||0;if(!c||!f)return l(null);const b=Math.min(1,r/Math.max(c,f));c=Math.max(1,Math.round(c*b)),f=Math.max(1,Math.round(f*b));const g=document.createElement("canvas");g.width=c,g.height=f;try{g.getContext("2d").drawImage(i,0,0,c,f),l(g.toDataURL("image/jpeg",o))}catch{l(null)}});i.onload=async()=>{try{let r=await s(900,.72);r&&r.length>fe&&(r=await s(600,.62)),r&&r.length>fe&&(r=await s(400,.55)),n(),e(r&&r.length<=fe?r:null)}catch{n(),e(null)}},i.onerror=()=>{n(),e(null)},i.src=a})}function dn(t,e){return`
    <select class="sort-select" data-sort-kind="${t}" aria-label="Sort ${t}">
      ${is.map(([a,i])=>`<option value="${a}" ${e===a?"selected":""}>${i}</option>`).join("")}
    </select>
  `}function ds(t){const e=d.getBadges(),a=d.topBadges(3),i=t.max>0&&t.percent===100,n=Le?e:a;return`
    <section class="section rewards-section">
      <div class="section-head">
        <h2>Rewards</h2>
        ${e.length>3?`<button class="ghost-btn compact" data-action="toggle-badges">${Le?"Show less":`More (${e.length}) ›`}</button>`:""}
      </div>
      ${i?`
        <div class="trophy-card">
          <div class="trophy-cup">🏆</div>
          <div>
            <div class="item-title">Gold Cup — Perfect day!</div>
            <div class="item-meta">100% of points on ${O(y)}</div>
          </div>
        </div>
      `:""}
      ${e.length?`
        <div class="rewards-grid">
          ${n.map(s=>`
            <article class="reward-card tier-${s.tier}">
              <div class="reward-medal">${xe(s.tier)}</div>
              <div>
                <div class="item-title">${p(s.rewardTitle||s.title)}</div>
                <div class="item-meta">${p(s.title)} · ${Pn(s.tier)} · ${O((s.earnedAt||"").slice(0,10))}</div>
              </div>
            </article>
          `).join("")}
        </div>
      `:'<div class="empty">No rewards yet. Set a goal in Settings → Goals &amp; Rewards.</div>'}
    </section>
  `}function Fe(t){return`<span class="streak-badge">${t} day streak</span>`}function Vn(t){return t?`<span class="forward-badge from">↩ Forwarded from ${p(t)}</span>`:""}function Re(t){const e=Array.isArray(t)?t.filter(Boolean):[];return e.length?`<span class="forward-badge to">↪ Forwarded to ${p(e[e.length-1])}</span>`:""}function Yn(t){return t?`<span class="forward-badge replace from">⇄ Replaced from ${p(t)}</span>`:""}function ls(t){const e=d.getAllHabits().map(a=>({habit:a,to:d.habitReplacedTo(y,a.id)})).filter(a=>a.to);return e.length?`
    <div class="replaced-away">
      ${e.map(({habit:a,to:i})=>`
        <button type="button" class="forward-badge replace undo" data-action="undo-replace-habit" data-id="${a.id}" data-from="${y}" data-to="${i}" ${t?"disabled":""} title="${t?"Unlock the day to undo this":`Put ${p(a.name)} back on ${p(y)}`}">
          ⇄ ${p(a.name)} → ${p(i)}
        </button>`).join("")}
    </div>
  `:""}function Jn(t,e){if(e)return`<button class="mini-btn" data-action="open-replace-habit" data-id="${t}" disabled title="Unlock the day to replace it">${L("swap")}</button>`;const a=d.habitReplaceDays(y,t);if(!a.allowed){const i=d.findHabit(t),n=i&&i.pin&&i.pin.mode==="forever"?"Pinned forever — no replace option":"No replace days before its next due day";return`<button class="mini-btn" data-action="open-replace-habit" data-id="${t}" disabled title="${n}">${L("swap")}</button>`}return`<button class="mini-btn" data-action="open-replace-habit" data-id="${t}" title="Replace this day with one of the ${a.days.length} day${a.days.length===1?"":"s"} before ${a.next}">${L("swap")}</button>`}function cs(t){const e=new Date(`${t}T00:00:00`);return e.setDate(e.getDate()+1),d.todayKey(e)}function ga(){return`<button class="ghost-btn compact ${B?"on":""}" data-action="toggle-edit">${B?"Done":"Edit Mode"}</button>`}function us(t){return t?'<span class="lock-badge">Locked</span>':'<span class="open-badge">Open</span>'}function ps(){d.checkGoals(y);const t=d.getDay(y),e=d.getSettings(),a=e.showConscious!==!1,i=d.getHabits(y),n=d.getTasks(y),s=d.scoreFor(y),r=On(s.percent),o=y===d.todayKey(),l=d.isLocked(y);return`
    <div class="topbar">
      <div>
        <p class="kicker">${o?"Today":"Daily report"}</p>
        <h1>${O(y)}</h1>
      </div>
      <div class="date-nav">
        <button class="ghost-btn compact" data-action="toggle-home-view" title="Switch between titles-only and full cards">${d.getHomeView()==="compact"?"View: Titles":"View: Full"}</button>
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
          ${us(l)}
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
        ${l?`Submitted${t.submittedAt?` at ${ns(t.submittedAt)}`:""}.${(s.missedHabits||0)+(s.missedTasks||0)>0?` ${(s.missedHabits||0)+(s.missedTasks||0)} missed (${s.missedHabits||0} habits, ${s.missedTasks||0} tasks) — unchecked items count as missed.`:" Nothing missed — all done."} Unlock in Settings to edit.`:`Auto-locks at ${e.lockTime}. Submit when the day is done. Unchecked items will count as missed once locked.`}
      </p>
      ${l?'<button class="ghost-btn full" data-action="goto-settings">Unlock in Settings</button>':'<button class="primary-btn full" data-action="submit-day">Submit and lock report</button>'}
      <div class="export-row">
        <span class="muted">Export:</span>
        <button class="ghost-btn compact" data-action="open-export">Excel / JSON / PDF</button>
      </div>
    </section>

    ${ds(s)}

    <section class="section">
      <div class="section-head">
        <h2>Habits</h2>
        <div class="head-actions">
          ${dn("habit",e.habitSort||"default")}
          ${ga()}
          <span class="points">+${s.habitScore}${a&&s.consciousScore?` +${s.consciousScore}🧠`:""} pts</span>
        </div>
      </div>
      ${["default","custom"].includes(e.habitSort||"default")&&i.length>1?'<p class="muted tight">Hold the grip button on a card, then drag it to a new spot.</p>':""}
      <div class="list">
        ${i.length?i.map(c=>{const f=d.habitRating(y,c.id),b=f>0,g=!b&&l,k=d.habitStreak(c.id,y),A=a&&Number(c.consciousPoints)||0,$=d.getHomeView(),v=$==="full"||Zt.has(`habit:${c.id}`),T=v||B;return`
                    <article class="item-card ${b?"done":""} ${g?"missed":""} ${l?"is-locked":""} ${v?"":"is-compact"}" style="border-left:3px solid ${q(c.category)}" data-sortable="habit" data-id="${c.id}">
                      <button class="check" data-action="toggle-habit" data-id="${c.id}" ${l?"disabled":""}>✓</button>
                      <div class="item-body">
                        ${$==="compact"?`<button type="button" class="item-title-btn" data-action="toggle-home-card" data-id="habit:${c.id}" aria-expanded="${v?"true":"false"}" title="${v?"Hide details":"Show details"}">
                                <span class="item-title">${p(c.name)} ${g?'<span class="missed-badge">Missed</span>':""}</span>
                                <span class="home-card-chev" aria-hidden="true">${v?"▾":"▸"}</span>
                              </button>`:`<div class="item-title">${p(c.name)} ${g?'<span class="missed-badge">Missed</span>':""}</div>`}
                        ${v?`
                          <div class="item-meta">${Pt(c.category)} ${c.pin?Rt(c.pin):"Not pinned"} · ${f?`${f}/5 ${Ee(f)}`:l?"Missed":"Not rated"} ${Ie(c,y)}</div>
                          ${c.description?`<p class="item-desc">${p(c.description)}</p>`:""}
                          ${a?`<div class="item-meta">${Fe(k)} ${_n(A)}</div>`:`<div class="item-meta">${Fe(k)}</div>`}
                          ${Re(d.habitForwardedTo(y,c.id))}
                          ${Yn(d.habitReplacedFrom(y,c.id))}
                          ${ft(c.tags)}
                          ${Bn(c.id,f,l)}
                        `:`${Ie(c,y)}`}
                      </div>
                      <div class="item-side">
                        <div class="points">+${d.habitPoints(c,y)}${A?` +${A}🧠`:""}</div>
                      </div>
                      ${T?`
                      <div class="item-actions">
                        <button class="drag-handle" aria-label="Hold and drag to reorder" title="Hold and drag to reorder" ${l?"disabled":""}>${L("grip")}</button>
                        <div class="mini-actions">
                          ${B?`<button class="mini-btn" data-action="open-upgrade-habit" data-id="${c.id}" ${l?"disabled":""} title="Upgrade or Degrade" aria-label="Upgrade or Degrade ${p(c.name)}">▲</button>`:""}
                          ${B?`<button class="mini-btn on" data-action="open-edit-habit" data-id="${c.id}" ${l?"disabled":""}>Edit</button>`:""}
                          ${Jn(c.id,l)}
                          <button class="mini-btn ${c.pin?"on":""}" data-action="open-pin-habit" data-id="${c.id}" ${l?"disabled":""} title="Pin habit">${L("pin")}</button>
                          <button class="mini-btn" data-action="archive-habit" data-id="${c.id}" ${l?"disabled":""} title="Archive habit" aria-label="Archive habit">${L("archive")}</button>
                        </div>
                      </div>
                        `:""}
                    </article>
                  `}).join(""):'<div class="empty">No habits for this day. Tap + to add one.</div>'}
      </div>
      ${ls(l)}
    </section>

    <section class="section">
      <div class="section-head">
        <h2>Tasks</h2>
        <div class="head-actions">
          ${dn("task",e.taskSort||"default")}
          ${ga()}
          <span class="points">+${s.taskScore} pts</span>
        </div>
      </div>
      ${["default","custom"].includes(e.taskSort||"default")&&n.length>1?'<p class="muted tight">Hold the grip button on a card, then drag it to a new spot.</p>':""}
      <div class="list">
        ${n.length?n.map(c=>{const f=!!c.sourcePinId,b=f?d.findPinnedTask(c.sourcePinId):null,g=Math.max(0,Math.min(5,Number(c.rating)||0)),k=!c.done&&l,A=d.getHomeView(),$=A==="full"||Zt.has(`task:${c.id}`),v=$||B;return`
                    <article class="item-card ${c.done?"done":""} ${k?"missed":""} ${l?"is-locked":""} ${$?"":"is-compact"}" style="border-left:3px solid ${q(c.category)}" data-sortable="task" data-id="${c.id}">
                      <button class="check" data-action="toggle-task" data-id="${c.id}" ${l?"disabled":""}>✓</button>
                      <div class="item-body">
                        ${A==="compact"?`<button type="button" class="item-title-btn" data-action="toggle-home-card" data-id="task:${c.id}" aria-expanded="${$?"true":"false"}" title="${$?"Hide details":"Show details"}">
                                <span class="item-title">${p(c.title)} ${k?'<span class="missed-badge">Missed</span>':""}</span>
                                <span class="home-card-chev" aria-hidden="true">${$?"▾":"▸"}</span>
                              </button>`:`<div class="item-title">${p(c.title)} ${k?'<span class="missed-badge">Missed</span>':""}</div>`}
                        ${$?`
                          <div class="item-meta">${Pt(c.category)} ${b?Rt(b.pin):"One-time task"} · ${c.done?"Done":l?"Missed":"Pending"} · ${g?`${g}/5 ${Ee(g)}`:"No rating"}</div>
                          ${c.description?`<p class="item-desc">${p(c.description)}</p>`:""}
                          ${Vn(c.forwardedFrom)}
                          ${Re(c.forwardedTo)}
                          ${ft(c.tags)}
                          ${c.image?'<span class="task-img-badge">📷 Photo attached</span>':""}
                          ${Wn(c)}
                          ${Gn(c.id,g,l)}
                        `:""}
                      </div>
                      <div class="item-side">
                        <div class="points">+${c.points}</div>
                      </div>
                      ${v?`
                      <div class="item-actions">
                        <button class="drag-handle" aria-label="Hold and drag to reorder" title="Hold and drag to reorder" ${l?"disabled":""}>${L("grip")}</button>
                        <div class="mini-actions">
                          ${B?`<button class="mini-btn on" data-action="open-edit-task" data-id="${c.id}" ${l?"disabled":""}>Edit</button>`:""}
                          <button class="mini-btn" data-action="open-forward-task" data-id="${c.id}" ${l?"disabled":""} title="Forward task to another day">${L("forward")}</button>
                          <button class="mini-btn ${f?"on":""}" data-action="open-pin-task" data-id="${c.id}" ${l?"disabled":""} title="Pin task">${L("pin")}</button>
                          <button class="mini-btn" data-action="archive-task" data-id="${c.id}" ${l?"disabled":""} title="Archive task" aria-label="Archive task">${L("archive")}</button>
                          ${B?`<button class="mini-btn danger" data-action="remove-task" data-id="${c.id}" ${l?"disabled":""} title="Delete task" aria-label="Delete task">${L("trash")}</button>`:""}
                        </div>
                      </div>
                          `:""}
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
      <textarea id="day-note" placeholder="How did today go? Tip: use • Bullets for lists." ${l?"disabled":""}>${p(t.note)}</textarea>
    </section>

    ${fs()}
  `}function fs(){const t=d.getArchivedHabits(),e=d.getArchivedTasks(),a=t.length+e.length,i=[...e.map(n=>`
      <article class="manage-card archived" style="border-left:4px solid ${q(n.category)}">
        <div class="section-head">
          <div>
            <div class="item-title">${p(n.title)} <span class="archive-kind">Task</span></div>
            <div class="item-meta">${Pt(n.category)} · +${n.points} pts${n.fromDate?` · from ${p(n.fromDate)}`:""}${n.originDate&&n.originDate!==n.fromDate?` · created ${p(n.originDate)}`:""} · ${fa(n.archivedAt)}</div>
            ${n.description?`<p class="item-desc">${p(n.description)}</p>`:""}
            ${ft(n.tags)}
          </div>
          <div class="mini-actions">
            <button class="mini-btn on" data-action="restore-task" data-id="${n.id}" title="Restore task to the selected day" aria-label="Restore task">${L("undo")}</button>
            ${B?`<button class="mini-btn danger" data-action="delete-archived-task" data-id="${n.id}" title="Delete permanently" aria-label="Delete permanently">${L("trash")}</button>`:""}
          </div>
        </div>
      </article>
    `),...t.map(n=>`
      <article class="manage-card archived" style="border-left:4px solid ${q(n.category)}">
        <div class="section-head">
          <div>
            <div class="item-title">${p(n.name)} <span class="archive-kind">Habit</span></div>
            <div class="item-meta">${Pt(n.category)} · +${d.habitPoints(n,(n.archivedAt||"").slice(0,10))} pts${n.pin?` · ${Rt(n.pin)}`:" · Pin ended"} · ${fa(n.archivedAt)}</div>
            ${n.description?`<p class="item-desc">${p(n.description)}</p>`:""}
            ${ft(n.tags)}
          </div>
          <div class="mini-actions">
            <button class="mini-btn on" data-action="restore-habit" data-id="${n.id}" title="Restore habit" aria-label="Restore habit">${L("undo")}</button>
            <button class="mini-btn danger" data-action="delete-archived-habit" data-id="${n.id}" title="Delete permanently" aria-label="Delete permanently">${L("trash")}</button>
          </div>
        </div>
      </article>
    `)];return`
    <section class="section archive-section">
      <button type="button" class="archive-head" data-action="toggle-archive" aria-expanded="${Ct}">
        <span class="archive-title">${L("archive")} Archive</span>
        <span class="archive-count">${a}</span>
        <span class="archive-chevron" aria-hidden="true">${Ct?"▾":"▸"}</span>
      </button>
      ${Ct?`<div class="archive-list">${a?i.join(""):'<div class="empty">Nothing archived yet. Use the archive button on a habit or task to set it aside here.</div>'}</div>`:""}
    </section>
  `}function Se(t){return t==="short"?"#short":t==="medium"?"#medium":"#long"}function gs(){const t=d.getProfile(),e=!!t.locked,a=e?"disabled":"",i=Array.isArray(t.whoAmI)?t.whoAmI:[],n=Array.isArray(t.lifeAreas)?t.lifeAreas:[],s=Array.isArray(t.pGoals)?t.pGoals:[],r=Array.isArray(t.quotes)?t.quotes:[],o=d.profileGoalDurations();o[rt].includes(jt)||(jt=o[rt][0]);const l=v=>s.filter(T=>T.term===v).length,c=(ke==="all"?s:s.filter(v=>v.term===ke)).slice().sort((v,T)=>String(v.createdAt).localeCompare(String(T.createdAt))),f=r.slice().sort((v,T)=>!!v.fav!=!!T.fav?v.fav?-1:1:String(T.createdAt).localeCompare(String(v.createdAt))),b=f.slice(0,3),g=f.slice(3),k=String(t.name||"?").trim().slice(0,1).toUpperCase()||"?",$=String(t.ideas||"").split(`
`).map(v=>v.replace(/^\s*(?:•|-|\*)\s+/,"").trim()).filter(Boolean).length;return`
    <div class="topbar">
      <div>
        <p class="kicker">Profile</p>
        <h1>${p(t.name)||"My profile"}</h1>
      </div>
      <div class="date-nav">
        ${e?'<span class="lock-badge">🔒 Locked</span>':'<span class="open-badge">Open</span>'}
        <button class="ghost-btn compact" data-action="${e?"unlock-profile":"lock-profile"}">${e?"Unlock":"Lock"}</button>
      </div>
    </div>

    ${e?'<div class="profile-lock-banner">🔒 Profile is locked — read only. Tap <b>Unlock</b> to edit.</div>':'<p class="muted tight" style="margin-bottom:14px">Everything here saves automatically on this device and is included in backups. Tap <b>Lock</b> when your profile is final.</p>'}

    <section class="score-hero profile-hero">
      <div class="profile-hero-row">
        <div class="profile-avatar">${p(k)}</div>
        <div style="flex:1;min-width:0">
          <div class="item-title" style="font-size:18px">${p(t.name)||"Your name"}</div>
          <div class="item-meta">${i.length?`${i.length} identities`:"No identities yet"} · ${n.length} life areas · ${s.length} goals · ${r.length} quotes</div>
          ${t.wantToBe?`<p class="item-desc" style="margin-top:6px">“${p(t.wantToBe.slice(0,140))}${t.wantToBe.length>140?"…":""}”</p>`:""}
        </div>
      </div>
    </section>

    <section class="manage-card" style="margin-bottom:10px">
      <h2>Identity</h2>
      <p class="muted tight">Your display name and who you want to be.</p>
      <label>Name
        <input data-profile="name" maxlength="80" value="${p(t.name)}" placeholder="Your name…" ${a} />
      </label>
      <label>Want to be
        <textarea data-profile="wantToBe" maxlength="1000" placeholder="The person I want to be…" style="min-height:76px" ${a}>${p(t.wantToBe)}</textarea>
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
        ${i.length?i.map((v,T)=>`
          <article class="manage-card whoami-row">
            <span class="whoami-num">${T+1}</span>
            <input class="whoami-input" data-whoami="${v.id}" maxlength="120" value="${p(v.text)}" ${a} aria-label="Who I am ${T+1}" />
            ${e?"":`
              <div class="mini-actions">
                <button class="mini-btn" data-action="move-whoami" data-id="${v.id}" data-dir="-1" ${T===0?"disabled":""} title="Move up">↑</button>
                <button class="mini-btn" data-action="move-whoami" data-id="${v.id}" data-dir="1" ${T===i.length-1?"disabled":""} title="Move down">↓</button>
                <button class="mini-btn" data-action="remove-whoami" data-id="${v.id}" title="Remove">✕</button>
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
          ${n.map((v,T)=>{const H=Nt===v.id;return`
              <article class="life-card ${H?"open":""}">
                <div class="life-head">
                  <button type="button" class="life-toggle" data-action="toggle-lifearea" data-id="${v.id}" aria-expanded="${H?"true":"false"}">
                    <b>${p(v.title)}</b>
                    <span>${H?"▾":"▸"}</span>
                  </button>
                  ${e?"":`
                    <div class="mini-actions">
                      <button class="mini-btn" data-action="move-lifearea" data-id="${v.id}" data-dir="-1" ${T===0?"disabled":""} title="Move up">↑</button>
                      <button class="mini-btn" data-action="move-lifearea" data-id="${v.id}" data-dir="1" ${T===n.length-1?"disabled":""} title="Move down">↓</button>
                    </div>
                  `}
                </div>
                ${H?`
                  <div class="life-body">
                    ${e?v.description?`<p class="item-desc">${p(v.description)}</p>`:'<p class="item-meta">No description yet.</p>':`
                      <label>Title
                        <input data-lifearea-title="${v.id}" maxlength="60" value="${p(v.title)}" />
                      </label>
                      <label>Description
                        <textarea data-lifearea-desc="${v.id}" maxlength="1000" placeholder="What does this area mean to you? What is going well?" style="min-height:70px">${p(v.description)}</textarea>
                      </label>
                      <button class="ghost-btn compact danger" data-action="remove-lifearea" data-id="${v.id}">Remove area</button>
                    `}
                  </div>
                `:v.description?`<p class="item-desc life-preview">${p(v.description.slice(0,90))}${v.description.length>90?"…":""}</p>`:""}
              </article>
            `}).join("")}
        </div>
      `:'<div class="empty">No life areas yet — add Health, Family, Career, Faith…</div>'}
    </section>

    <div class="profile-duo">
      <section class="manage-card">
        <h2>My Vision</h2>
        <p class="muted tight">The future you are working toward.</p>
        <textarea data-profile="vision" maxlength="1000" placeholder="Describe your vision…" style="min-height:110px" ${a}>${p(t.vision)}</textarea>
      </section>
      <section class="manage-card">
        <h2>Core &amp; Personal Values</h2>
        <p class="muted tight">The principles you live by — one per line.</p>
        ${e?t.values.trim()?`<div class="values-list">${Un(t.values)}</div>`:'<p class="item-meta">No values yet.</p>':`
            <div class="note-toolbar">
              <button type="button" class="ghost-btn compact" data-action="values-bullets" title="Bullet list (select lines or all values)">• Bullets</button>
              <button type="button" class="ghost-btn compact" data-action="values-numbered" title="Numbered list (select lines or all values)">1. Numbered</button>
            </div>
            <textarea id="profile-values" data-profile="values" maxlength="1000" placeholder="e.g.&#10;• Honesty&#10;• Discipline&#10;• Mercy" style="min-height:110px">${p(t.values)}</textarea>
          `}
      </section>
    </div>

    <section class="manage-card" style="margin-bottom:10px;margin-top:10px">
      <div class="section-head">
        <div>
          <h2>Personal Ideas</h2>
          <p class="muted tight">Write down ideas, one per line — they show as bullet points. Tap a bullet to delete it.</p>
        </div>
        <span class="item-meta">${$}</span>
      </div>
      ${e?$?sn(t.ideas,!0):'<p class="item-meta">No ideas yet.</p>':`
          <div class="form" style="margin-bottom:10px">
            <label>New idea
              <input id="new-idea" maxlength="200" placeholder="e.g. Build a habit tracker app" />
            </label>
            <div style="display:flex;gap:8px">
              <button class="primary-btn compact-btn" data-action="add-idea">Add idea</button>
            </div>
          </div>
          ${$?`${sn(t.ideas,!1)}
               <p class="item-meta">Edit the text below — it saves itself.</p>
               <textarea data-profile="ideas" maxlength="4000" placeholder="• Idea one&#10;• Idea two" style="min-height:110px">${p(t.ideas)}</textarea>`:'<p class="item-meta">Empty — add your first idea above.</p>'}
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
              ${["short","medium","long"].map(v=>`<button type="button" class="chip hashtag-${v} ${rt===v?"on":""}" data-action="set-pgoal-term" data-term="${v}">${Se(v)}</button>`).join("")}
            </div>
          </div>
          <div class="row-2">
            <label>Timeframe
              <select id="new-pgoal-duration">
                ${o[rt].map(v=>`<option value="${p(v)}" ${jt===v?"selected":""}>${p(v)}</option>`).join("")}
              </select>
            </label>
            <label style="justify-content:flex-end">&nbsp;
              <button class="primary-btn compact-btn" data-action="add-pgoal">Add goal</button>
            </label>
          </div>
          <p class="item-meta">${rt==="short"?"Short term → pick a week (1–4 weeks).":rt==="medium"?"Medium term → pick a month up to 3 months.":"Long term → a year or more."}</p>
        </div>
      `}
      <div class="chip-row" style="margin-bottom:10px">
        ${[["all",`All (${s.length})`],["short",`#short (${l("short")})`],["medium",`#medium (${l("medium")})`],["long",`#long (${l("long")})`]].map(([v,T])=>`<button type="button" class="chip ${ke===v?"on":""}" data-action="set-pgoal-filter" data-filter="${v}">${T}</button>`).join("")}
      </div>
      <div class="habit-manage">
        ${c.length?c.map(v=>`
          <article class="manage-card pgoal-card term-${v.term}">
            <div class="pgoal-top">
              <span class="hashtag hashtag-${v.term}">${Se(v.term)}</span>
              <span class="duration-pill">⏳ ${p(v.duration)}</span>
              ${e?"":`<button class="mini-btn" data-action="remove-pgoal" data-id="${v.id}" title="Remove goal">✕</button>`}
            </div>
            ${e?`<div class="item-title" style="margin-top:6px">${p(v.text)}</div>`:`
                <input data-pgoal-text="${v.id}" maxlength="200" value="${p(v.text)}" style="margin-top:8px" aria-label="Goal text" />
                <div class="row-2" style="margin-top:8px">
                  <select data-pgoal-term="${v.id}" aria-label="Goal term">
                    ${["short","medium","long"].map(T=>`<option value="${T}" ${v.term===T?"selected":""}>${Se(T)}</option>`).join("")}
                  </select>
                  <select data-pgoal-duration="${v.id}" aria-label="Goal duration">
                    ${o[v.term].map(T=>`<option value="${p(T)}" ${v.duration===T?"selected":""}>${p(T)}</option>`).join("")}
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
        <span class="item-meta">★ ${r.filter(v=>v.fav).length} · ${r.length} total</span>
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
          ${b.map(v=>ln(v,e)).join("")}
        </div>
        ${g.length?`
          <button class="ghost-btn compact full" data-action="toggle-quotes">${Xt?"Show less ▴":`More (${g.length}) — see the rest ▾`}</button>
          ${Xt?`<div class="habit-manage" style="margin-top:8px">${g.map(v=>ln(v,e)).join("")}</div>`:""}
        `:Xt&&!g.length?'<p class="item-meta">No more quotes — that is all of them.</p>':""}
      `:'<div class="empty">No quotes yet — add the words that move you.</div>'}
    </section>
  `}function ln(t,e){return`
    <article class="manage-card quote-card ${t.fav?"is-fav":""}">
      <p class="quote-text">“${p(t.text)}”</p>
      ${t.author?`<p class="item-meta">— ${p(t.author)}</p>`:""}
      <div class="quote-foot">
        ${e?`<span class="item-meta">${t.fav?"★ Favourite":""}</span>`:`
            <button class="mini-btn ${t.fav?"on":""}" data-action="toggle-quote-fav" data-id="${t.id}" title="Toggle favourite">★</button>
            <button class="mini-btn" data-action="remove-quote" data-id="${t.id}" title="Remove quote">✕</button>
          `}
      </div>
    </article>
  `}function ms(){document.querySelectorAll("[data-profile]").forEach(t=>{t.addEventListener("input",()=>{d.setProfileField(t.dataset.profile,t.value)||h()})}),document.querySelectorAll("[data-lifearea-title]").forEach(t=>{t.addEventListener("change",()=>{d.updateLifeArea(t.dataset.lifeareaTitle,{title:t.value}),h()})}),document.querySelectorAll("[data-lifearea-desc]").forEach(t=>{t.addEventListener("input",()=>{d.updateLifeArea(t.dataset.lifeareaDesc,{description:t.value})})}),document.querySelectorAll("[data-pgoal-text]").forEach(t=>{t.addEventListener("change",()=>{d.updateProfileGoal(t.dataset.pgoalText,{text:t.value}),h()})}),document.querySelectorAll("[data-pgoal-term]").forEach(t=>{t.addEventListener("change",()=>{d.updateProfileGoal(t.dataset.pgoalTerm,{term:t.value}),h()})}),document.querySelectorAll("[data-pgoal-duration]").forEach(t=>{t.addEventListener("change",()=>{d.updateProfileGoal(t.dataset.pgoalDuration,{duration:t.value}),h()})})}function hs(){const t=Qn(y,dt*7),e=d.week(new Date(`${t}T00:00:00`)),a=e.reduce((s,r)=>s+r.earned,0),i=Math.round(a/7),n=dt===0?"This week":dt===-1?"1 week back":`${-dt} weeks back`;return`
    <section class="section">
      <div class="section-head">
        <h2>Weekly score</h2>
        <div class="date-nav">
          <button class="icon-btn" data-action="week-nav" data-dir="-1" aria-label="Previous week">‹</button>
          <button class="icon-btn" data-action="week-nav" data-dir="1" aria-label="Next week" ${dt>=0?"disabled":""}>›</button>
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
        <p class="lock-hint week-range">Week starting <b>${O(e[0].date)}</b> · ${e[0].label} – ${e[6].label}, ${O(e[6].date)}</p>
        <div class="week-days">
          ${e.map(s=>`
                <button class="day-cell ${s.date===y?"active":""} ${s.earned>0?"done":""}" data-action="pick-date" data-date="${s.date}" title="${p(s.date)}: ${s.earned} pts">
                  <span>${s.label.slice(0,2)}</span>
                  <b>${s.earned}</b>
                  ${s.locked?'<i class="dot-lock"></i>':""}
                </button>
              `).join("")}
        </div>
      </section>
    </section>
  `}function bs(){const t=Me||j(y),e=qe(t),a=d.todayKey();return`
    <section class="section">
      <div class="section-head">
        <h2>Reports calendar</h2>
        <div class="date-nav">
          <button class="icon-btn" data-action="history-cal-nav" data-dir="-1" aria-label="Previous month">‹</button>
          <button class="icon-btn" data-action="history-cal-nav" data-dir="1" aria-label="Next month">›</button>
        </div>
      </div>
      <div class="pin-cal">
        <div class="pin-cal-head"><b>${Gt(t)}</b></div>
        <div class="pin-cal-grid pin-cal-week">
          ${_e().map(i=>`<span>${i.label.slice(0,1)}</span>`).join("")}
        </div>
        <div class="pin-cal-grid">
          ${e.map(i=>{if(!i)return"<span></span>";const n=d.scoreFor(i),s=i===y?"on-selected":n.percent>=100?"on-perfect":n.earned>0?"on":"",r=n.locked?'<i class="dot-lock"></i>':"";return`<button type="button" class="pin-cal-day hist-cal-day ${s} ${i===a?"is-today":""}" data-action="pick-date" data-date="${i}" title="${p(i)}: ${n.earned}/${n.max} pts (${n.percent}%)"><b>${Number(i.slice(8,10))}</b><span>${n.earned}</span>${r}</button>`}).join("")}
        </div>
      </div>
    </section>
  `}function ys(t){const e=new Map((t||[]).map(s=>[s.date,s])),a=He||j(y),i=qe(a),n=d.todayKey();return`
    <div class="pin-cal">
      <div class="pin-cal-head"><b>${Gt(a)}</b><span class="item-meta">${e.size} locked</span></div>
      <div class="pin-cal-grid pin-cal-week">
        ${_e().map(s=>`<span>${s.label.slice(0,1)}</span>`).join("")}
      </div>
      <div class="pin-cal-grid">
        ${i.map(s=>{if(!s)return"<span></span>";const r=e.get(s),o=!!r,l=_.includes(s)?"on-selected":o?"on-locked":"on-open",c=d.scoreFor(s),f=r?r.earned:c.earned;return`<button type="button" class="pin-cal-day hist-cal-day ${l} ${s===n?"is-today":""}" data-action="toggle-locked-day" data-date="${s}" title="${p(s)}: ${o?"Locked":"Open"} — ${f} pts"><b>${Number(s.slice(8,10))}</b><span>${f}</span></button>`}).join("")}
      </div>
    </div>
  `}function vs(){const t=pa||j(y),e=qe(t),a=d.todayKey(),i=new Set(d.notedDays(t)),s=Mt&&Mt.startsWith(`${t}-`)&&i.has(Mt)?Mt:[...i].sort().pop()||null;Mt=s;const r=s?d.noteFor(s):"";return`
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
        <div class="pin-cal-head"><b>${Gt(t)}</b><span class="item-meta">${i.size} noted</span></div>
        <div class="pin-cal-grid pin-cal-week">
          ${_e().map(o=>`<span>${o.label.slice(0,1)}</span>`).join("")}
        </div>
        <div class="pin-cal-grid">
          ${e.map(o=>{if(!o)return"<span></span>";const l=i.has(o),c=o===s?"on-selected":l?"on-noted":"",f=l?`${o}: note`:`${o}: no note`;return`<button type="button" class="pin-cal-day notes-cal-day ${c} ${o===a?"is-today":""}" data-action="show-day-note" data-date="${o}" ${l?"":"disabled"} title="${p(f)}"><b>${Number(o.slice(8,10))}</b><span class="note-dot ${l?"":"off"}">●</span></button>`}).join("")}
        </div>
      </div>
      <div class="notes-cal-note">
        ${s?`
              <div class="notes-cal-note-head">
                <span class="item-title">${O(s)}</span>
                <span class="badge">Note</span>
              </div>
              <p class="notes-cal-note-body">${p(r)}</p>
            `:`<p class="item-meta">No notes in ${Gt(t)} yet — write one on a day’s report and it will appear here.</p>`}
      </div>
    </section>
  `}function ks(){return`
    <section class="manage-card export-card">
      <div class="section-head">
        <div>
          <div class="item-title">Select &amp; export</div>
          <div class="item-meta">Pick a day, week, month or year, then a format.</div>
        </div>
      </div>
      <div class="chip-row" style="margin-bottom:10px">
        ${["day","week","month","year"].map(t=>`<button type="button" class="chip ${z===t?"on":""}" data-action="set-histexp-range" data-range="${t}">${t[0].toUpperCase()}${t.slice(1)}</button>`).join("")}
      </div>
      ${z==="day"||z==="week"?`
        <label>Which ${z==="day"?"day":"week (pick any day in it)"}
          <input id="histexp-date" type="date" value="${y}" />
        </label>
      `:""}
      ${z==="month"?`
        <label>Which month
          <input id="histexp-month" type="month" value="${y.slice(0,7)}" />
        </label>
      `:""}
      ${z==="year"?`
        <label>Which year
          <input id="histexp-year" type="number" min="2000" max="2100" value="${y.slice(0,4)}" />
        </label>
      `:""}
      <div class="export-grid" style="margin-top:10px">
        <button class="choose-card" data-action="histexp-do" data-format="csv"><b>Excel (CSV)</b><span>Opens in Excel / Sheets</span></button>
        <button class="choose-card" data-action="histexp-do" data-format="json"><b>JSON</b><span>Raw data backup</span></button>
        <button class="choose-card" data-action="histexp-do" data-format="pdf"><b>PDF</b><span>Print / save as PDF</span></button>
      </div>
    </section>
  `}function $s(){const t=d.week(new Date(`${y}T00:00:00`)),e=d.todayKey(),a=`${O(t[0].date)} – ${O(t[6].date)}`,i=t.reduce((r,o)=>r+(o.earned||0),0),n=t.reduce((r,o)=>r+(o.max||0),0),s=t.filter(r=>r.hasRecord).length;return`
    <div class="topbar">
      <div>
        <p class="kicker">Archive</p>
        <h1>Past reports</h1>
      </div>
      <button class="ghost-btn compact" data-action="open-export">Export</button>
    </div>
    ${bs()}
    ${hs()}
    ${ks()}
    <section class="section">
      <div class="section-head">
        <h2>Week</h2>
        <span class="item-meta">${a}</span>
      </div>
      <p class="item-meta">${s} of 7 days reported · ${i} of ${n} pts</p>
      <div class="history-list">
        ${t.map(r=>{const o=!r.hasRecord,l=(r.missedHabits||0)+(r.missedTasks||0),c=o?"No report":`${r.locked?"Locked":"Open"} · ${On(r.percent)} · ${r.earned}/${r.max} pts (${r.percent}%)${r.locked&&l>0?` · ❌ ${l} missed`:""}`;return`
              <article class="history-card ${o?"is-empty":""} ${r.date===e?"is-today":""} ${r.date===y?"is-selected":""}">
                <div class="section-head">
                  <div>
                    <div class="item-title">${p(r.label)} ${O(r.date)}</div>
                    <div class="item-meta">${p(c)}</div>
                  </div>
                  <button class="ghost-btn compact" data-action="pick-date" data-date="${r.date}">${o?"Add":"Open"}</button>
                </div>
                <div class="bar"><span style="width:${r.percent}%"></span></div>
                ${r.note?os(r.note):`<p class="item-meta">${o?"Nothing recorded this day.":"No note."}</p>`}
              </article>
            `}).join("")}
      </div>
    </section>
  `}function Qn(t,e){const a=new Date(`${t}T00:00:00`);return a.setDate(a.getDate()+e),d.todayKey(a)}function ws(){return et==="month"?`${Ht(j(y),pt)}-15`:et==="year"?`${Number(y.slice(0,4))+pt}-06-15`:Qn(y,pt*7)}function Ss(t){const[e,a]=d.resolveRange(et,t);return et==="week"?`${O(e)} – ${O(a)}`:et==="month"?Gt(e.slice(0,7)):e.slice(0,4)}function As(){var c;const t=ws(),e=d.categoryChart(et,t);it!=="all"&&!e.cats.some(f=>f.id===it)&&(it="all");const a=it==="all"?e.cats:e.cats.filter(f=>f.id===it),i=Math.max(1,...e.labels.map((f,b)=>a.reduce((g,k)=>g+(e.perCat[k.id]?e.perCat[k.id][b]:0),0))),n=a.reduce((f,b)=>f+(e.totals[b.id]||0),0),s=it==="all"?"All categories":((c=e.cats.find(f=>f.id===it))==null?void 0:c.label)||"",r=pt===0?et==="week"?"This week":et==="month"?"This month":"This year":Ss(t),o=e.labels.map((f,b)=>{const g=a.reduce((A,$)=>A+(e.perCat[$.id]?e.perCat[$.id][b]:0),0),k=a.map(A=>({cat:A,value:e.perCat[A.id]?e.perCat[A.id][b]:0})).filter(A=>A.value>0).map((A,$)=>`<span class="chart-seg" style="height:${Math.max(2,Math.round(A.value/i*100))}%;background:${q(A.cat.id,$)}" title="${p(A.cat.label)}: ${A.value} pts"></span>`).join("");return`
      <div class="chart-col" title="${p(e.titles[b])}: ${g} pts">
        <div class="chart-bar">${k||'<span class="chart-empty"></span>'}</div>
        <span class="chart-x">${p(f)}</span>
      </div>
    `}).join(""),l=a.map((f,b)=>`
      <span class="chart-legend-item"><i style="background:${q(f.id,b)}"></i>${p(f.label)} <b>${e.totals[f.id]||0}</b></span>
    `).join("");return`
    <section class="score-hero">
      <div class="section-head" style="margin-bottom:4px">
        <div>
          <div class="item-title">Progress chart</div>
          <div class="item-meta">${r} · ${n} pts total · ${p(s)}</div>
        </div>
      </div>
      <div class="chart-nav-row">
        <button type="button" class="mini-btn" data-action="chart-nav" data-dir="-1" aria-label="Previous ${et}">‹</button>
        <div class="chip-row">
          ${["week","month","year"].map(f=>`<button type="button" class="chip ${et===f?"on":""}" data-action="set-chart-range" data-range="${f}">${f[0].toUpperCase()}${f.slice(1)}</button>`).join("")}
        </div>
        <button type="button" class="mini-btn" data-action="chart-nav" data-dir="1" aria-label="Next ${et}">›</button>
      </div>
      <div class="chip-row chart-cat-row">
        <button type="button" class="chip chart-cat-chip ${it==="all"?"on":""}" data-action="set-chart-cat" data-cat="all">All categories</button>
        ${e.cats.map((f,b)=>`
            <button type="button" class="chip chart-cat-chip ${it===f.id?"on":""}" data-action="set-chart-cat" data-cat="${f.id}">
              <i style="background:${q(f.id,b)}"></i>${p(f.label)}
            </button>
          `).join("")}
      </div>
      <div class="chart-wrap${e.labels.length>12?" scroll-x":""}">${o}</div>
      <div class="chart-legend">${l}</div>
    </section>
  `}function xs(t,e){const{locked:a,showC:i}=e,n=t.habits.map(r=>{const o=d.habitRating(y,r.id),l=!o&&a,c=d.habitStreak(r.id,y),f=i&&Number(r.consciousPoints)||0,b=o>0?f:0,g=d.habitPoints(r,y),k=Math.round(g*o/5)+b,A=g+f;return`
        <article class="item-card ${o?"done":""} ${l?"missed":""} ${a?"is-locked":""}" style="border-left:3px solid ${q(r.category)}">
          <button class="check" data-action="toggle-habit" data-id="${r.id}" ${a?"disabled":""}>✓</button>
          <div class="item-body">
            <div class="item-title">${p(r.name)} ${l?'<span class="missed-badge">Missed</span>':""}</div>
            <div class="item-meta">Habit · ${o?`${o}/5 ${Ee(o)}`:a?"Missed":"Not rated"} · ${Fe(c)}${i?` ${_n(f)}`:""} ${Ie(r,y)}</div>
            ${r.description?`<p class="item-desc">${p(r.description)}</p>`:""}
            ${Re(d.habitForwardedTo(y,r.id))}
            ${Yn(d.habitReplacedFrom(y,r.id))}
            ${ft(r.tags)}
            ${Bn(r.id,o,a)}
          </div>
          <div class="item-side">
            <div class="points">${k}/${A}</div>
            <div class="mini-actions">
              ${B?`<button class="mini-btn" data-action="open-upgrade-habit" data-id="${r.id}" ${a?"disabled":""} title="Upgrade or Degrade" aria-label="Upgrade or Degrade ${p(r.name)}">▲</button>`:""}
              ${B?`<button class="mini-btn on" data-action="open-edit-habit" data-id="${r.id}" ${a?"disabled":""}>Edit</button>`:""}
              ${Jn(r.id,a)}
            </div>
          </div>
        </article>
      `}).join(""),s=t.tasks.map(r=>{const o=Math.max(0,Math.min(5,Number(r.rating)||0)),l=!r.done&&a;return`
        <article class="item-card ${r.done?"done":""} ${l?"missed":""} ${a?"is-locked":""}" style="border-left:3px solid ${q(r.category)}">
          <button class="check" data-action="toggle-task" data-id="${r.id}" ${a?"disabled":""}>✓</button>
          <div class="item-body">
            <div class="item-title">${p(r.title)} ${l?'<span class="missed-badge">Missed</span>':""}</div>
            <div class="item-meta">Task · ${r.done?"Done":a?"Missed":"Pending"} · ${o?`${o}/5 ${Ee(o)}`:"No rating"}${r.description?` · ${p(r.description)}`:""}</div>
            ${Vn(r.forwardedFrom)}
            ${Re(r.forwardedTo)}
            ${ft(r.tags)}
            ${r.image?'<span class="task-img-badge">📷 Photo attached</span>':""}
            ${Wn(r)}
            ${Gn(r.id,o,a)}
          </div>
          <div class="item-side">
            <div class="points">+${r.points}</div>
            <div class="mini-actions">
              ${B?`<button class="mini-btn on" data-action="open-edit-task" data-id="${r.id}" ${a?"disabled":""}>Edit</button>`:""}
              <button class="mini-btn" data-action="open-forward-task" data-id="${r.id}" ${a?"disabled":""} title="Forward task to another day">${L("forward")}</button>
            </div>
          </div>
        </article>
      `}).join("");return`${n}${s}`}function Ts(){d.getDay(y);const t=d.isLocked(y),e=d.consciousEnabled(),a=d.categoryBreakdown(y),i=a.reduce((s,r)=>s+r.earned,0),n=a.reduce((s,r)=>s+r.max,0);return`
    <div class="topbar">
      <div>
        <p class="kicker">Activities</p>
        <h1>By category</h1>
      </div>
      <div class="date-nav">
        ${ga()}
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
        <div class="grade-pill">${O(y)}</div>
      </div>
      <p class="lock-hint">Habits and tasks grouped by category.</p>
    </section>
    ${As()}
    ${vs()}
    ${a.map(s=>{const r=s.max?Math.round(s.earned/s.max*100):0,o=q(s.id),l=we.has(s.id);return`
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
              ${s.habits.length||s.tasks.length?xs(s,{locked:t,showC:e}):'<div class="empty">No activities in this category.</div>'}
            </div>
                `:""}
          </section>
        `}).join("")}
    <section class="section">
      <div class="section-head">
        <h2>🏅 Goals &amp; Rewards</h2>
        <span class="points">${d.getGoals().length} goals · ${d.getBadges().length} badges</span>
      </div>
      ${Xs()}
    </section>
  `}function Oe(t){return`${t||"second-mind-backup"}-${d.todayKey()}.json`}function Ds(){const t=d.getInstalledAt(),e=String(t).slice(0,10),a=new Date(`${e}T00:00:00`),i=new Date(`${d.todayKey()}T00:00:00`),n=Number.isNaN(a.getTime())?1:Math.max(1,Math.round((i-a)/864e5)+1),s=String(Number(e.slice(8,10))).padStart(2,"0"),r=e.slice(5,7),o=e.slice(2,4),l=/^\d{4}-\d{2}-\d{2}$/.test(e)?`${s}/${r}/${o}`:e,c=Math.floor((n-1)/365)+1;return`Using Second Mind since ${l} · day ${n} · year ${c}`}function Cs(){const t=d.autoSaveStatus(),e=d.folderStatus();return e==="boot"?"Checking how your data is saved…":t==="both"?"✅ Auto-save on (folder + device)":t==="device"?"✅ Auto-save on (this device)":t==="folder"?"✅ Auto-save on":e==="unsupported"?"⚠️ Browser storage only":"⚠️ Not connected"}function Ps(){const t=d.folderStatus(),e=d.autoSaveStatus(),a=d.lastDeviceSavedAt(),i=a?new Date(a).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit",second:"2-digit"}):"not yet";if(t==="boot")return"Checking for a connected data folder…";if(e==="device")return t==="unsupported"?`Saved automatically in this device's private storage — no permission needed, nothing to click · last saved ${i}. Use Export backup for a file you can keep.`:t==="prompt"||t==="denied"?`Auto-saving to this device's private storage (no permission needed) · last saved ${i}. Your folder is waiting for access — tap Allow to write <b>${d.folderFileName()}</b> there too.`:`Auto-saving to this device's private storage (no permission needed) · last saved ${i}.`;if(t==="unset")return"No data folder chosen yet — your data lives in this browser and in the device copy above.";if(t==="prompt")return"Tap Allow access so the app can keep saving to your folder.";if(t==="denied")return"Access was denied — choose the folder again.";if(t==="granted"){const n=d.lastFileSavedAt(),s=n?new Date(n).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit",second:"2-digit"}):"not yet",r=e==="both"?` · device copy ${i}`:"";return`Auto-saving to ${d.folderName()}/${d.folderFileName()} · last saved ${s}${r}`}return"Checking…"}function Es(){const t=d.folderStatus();return!d.getFolderHandle()||t!=="prompt"&&t!=="denied"?"":`
      <div class="reconnect-banner" role="status">
        <span>📁 Your folder needs access again to keep saving <b>${p(d.folderFileName())}</b> there.</span>
        <button type="button" class="primary-btn compact" data-action="grant-folder">Allow</button>
      </div>
    `}function Ls(){const t=d.driveStatus();return t==="needs-client"?"Not set up":t==="needs-signin"?"Tap Connect":t==="off"?"Turned off":t==="syncing"?"Syncing…":t==="ok"||t==="ready"?"✅ On":"⚠️ Error"}function Ns(){const t=d.driveStatus();if(t==="needs-client")return"Sync is off. Paste a Google OAuth Client ID below (one-time setup, exact steps underneath) and it turns on.";if(t==="off")return"Sync is turned off. Your data is still saved on this device — turn it back on whenever you like.";if(t==="needs-signin")return"Ready — tap Connect once to sign in to Google. After that it syncs by itself.";if(t==="syncing")return"Syncing with Google Drive…";if(t==="ok"||t==="ready"){const e=d.driveLastPushAt();return`Two-way sync on — every save uploads second-mind.json to a private Drive folder, and opening the app takes whichever copy is newer — Drive, your data folder or this browser · last pushed ${e?new Date(e).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}):"not yet"}`}return t==="error"?`Sync hit a problem (${d.driveError()||"network"}) — your data is safe locally and it will retry on the next save.`:"Checking…"}function Ms(){const t=d.driveStatus(),e=d.driveConfigured(),a=t==="ok"||t==="ready";return`
      <p class="muted tight"><b>Automatic two-way sync.</b> Sign in once and every save is also uploaded to a hidden Google Drive folder; opening the app pulls whichever copy is newer — Drive, your data folder or this browser. Nothing to press afterwards, and it works across devices.</p>
      <p class="item-meta">${p(Ns())}</p>
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
        <input type="text" id="drive-client-id" value="${p(d.driveClientId())}" placeholder="1234567890-abcdefg.apps.googleusercontent.com" autocomplete="off" spellcheck="false" />
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
            <li>Under <b>Authorized JavaScript origins</b> press <b>Add URI</b> and enter exactly the address this app runs on — for the installed app that is <b>${p(typeof location<"u"?location.origin:"http://localhost:5173")}</b>. No redirect URI is needed.</li>
            <li>Press <b>Create</b>, copy the <b>Client ID</b> it shows (it ends in <code>.apps.googleusercontent.com</code>), paste it above and press <b>Save Client ID</b>.</li>
            <li>Press <b>Connect Google Drive</b>, choose your account and allow access. Sync is now on for good.</li>
          </ol>
          <p class="item-meta">Your Client ID is only a public label for the app — it is not a password. The data file lives in Google's per-app <i>app data</i> folder, which never appears in My Drive and cannot collide with your own files.</p>
        </details>
      </div>
    `}async function Hs(){const t=await d.chooseDataFolder();if(t.status==="unsupported"){m("Folder access needs Chrome or Edge"),h();return}if(t.cancelled){h();return}if(t.status!=="granted"){m("Couldn't open that folder"),h();return}t.corrupt?m("Folder connected — the old file was unreadable, a copy was saved aside"):t.replaced?m("Folder connected — data loaded from the file"):m("Data folder set — auto-save on"),h(),Wt()}async function Is(){await d.forgetDataFolder(),m("Folder unlinked — data stays in the browser"),h(),Wt()}async function Fs(){const t=await d.grantFolderAccess();if(t.status!=="granted"){m("Access denied"),h();return}t.corrupt?m("Access granted — the old file was unreadable, a copy was saved aside"):t.replaced?m("Access granted — data loaded from the file"):m("Folder access granted — auto-save on"),h(),Wt()}async function Rs(){const t=await d.connectDrive();if(t.status==="ok"||t.status==="syncing"){t.replaced?m("Google Drive data loaded — it was newer than this device"):t.corrupt?m("Connected — the Drive copy was unreadable, yours was uploaded instead"):t.seeded?m("Connected — your data was uploaded to Google Drive"):m("Google Drive connected — sync on"),t.replaced&&_t(),h();return}if(t.status==="needs-client"){m("Save a Client ID first — the steps are in this section"),h();return}m(t.error==="popup_closed"?"Sign-in window was closed — try again":"Could not sign in to Google"),h()}async function Os(){m("Syncing with Google Drive…");const t=await d.syncDriveNow();if(t.status==="ok"){t.replaced?(_t(),m("Google Drive data loaded — it was newer"),h()):t.corrupt?m("The Drive copy was unreadable — yours was uploaded instead"):t.pushed?m("Uploading to Google Drive…"):m("Everything is in sync"),t.replaced||h();return}m("Sync failed — will retry on the next save"),h()}async function js(){const t=d.exportBackup(),e=Oe();if(d.folderStatus()==="granted"&&d.getFolderHandle())try{if((await d.writeFolderFile(e,t)).ok){m("Backup saved to your folder"),Wt();return}}catch{}qt(e,t,"application/json"),m("Backup downloaded")}async function Bs(){return d.listFolderBackups()}async function Wt(){const t=document.getElementById("folder-backup-list");if(!t)return;if(d.folderStatus()!=="granted"||!d.getFolderHandle()){t.innerHTML='<button class="ghost-btn compact" data-action="trigger-import">Import from a file instead</button>';return}t.innerHTML='<p class="item-meta">Loading backups…</p>';const e=await Bs();if(!document.getElementById("folder-backup-list"))return;e.length?t.innerHTML=e.map(i=>`
            <div style="display:flex;gap:8px;align-items:center;margin-bottom:6px">
              <span class="item-meta" style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${p(i.name)}</span>
              <button class="ghost-btn compact" data-action="restore-backup" data-name="${p(i.name)}">Restore</button>
            </div>
          `).join(""):t.innerHTML='<p class="item-meta">Folder has no backups yet — press Export backup now to create one. The live data file is saved here automatically.</p>';const a=document.createElement("div");a.innerHTML='<button class="ghost-btn compact" data-action="trigger-import">Import from a file instead</button>',t.appendChild(a)}async function Gs(t){try{const e=await d.readFolderFile(t);if(e.missing||e.error||!e.raw){m("Couldn't read that backup");return}Xn(e.raw,t)}catch{m("Couldn't read that backup")}}function Xn(t,e){let a;try{a=JSON.parse(t)}catch{m("That file isn't valid JSON.");return}const i=d.backupKind(a);if(i==="ok"){if(!window.confirm(`Replace ALL app data with "${e}"?`))return;qt(Oe("second-mind-pre-import"),d.exportBackup(),"application/json"),d.importBackup(a),m("Backup imported"),h();return}if(i==="report-export"){const n=d.previewReport(a);if(!n.days){m("That report file has no day rows to import.");return}if(!window.confirm(`Import ${n.days} day(s) (${n.start} → ${n.end}) from "${e}" as locked history?

${n.newHabits} new habit(s) will be added to your list.
Days already in the app on those dates will be overwritten.`))return;qt(Oe("second-mind-pre-import"),d.exportBackup(),"application/json");const r=d.importReport(a);if(!r){m("That file doesn't look like a valid Second Mind backup.");return}m(`Imported ${r.days} day(s)${r.habits?` + ${r.habits} new habit(s)`:""}`),h();return}if(i==="wrong-app"){m("That backup belongs to another app (e.g. Iron Log) — it can’t be imported into Second Mind.");return}m("That file doesn't look like a valid Second Mind backup.")}async function _s(){if(!It){m("Use the browser menu: Install / Add to Home Screen");return}try{It.prompt();const t=await It.userChoice;t&&t.outcome==="accepted"&&m("Installing Second Mind…")}catch{}It=null,h()}async function qs(){const t=`./version.json?v=${Date.now()}`,e=await fetch(t,{cache:"no-store"});if(!e.ok)throw new Error(`http ${e.status}`);const a=await e.json(),i=a&&(a.version||a.v)||null;if(!i)throw new Error("no version field");return String(i)}async function Ws(){ht=!0,Ne=!1,bt="Checking for updates… (needs internet)",h();try{if("serviceWorker"in navigator&&navigator.serviceWorker.getRegistration){const e=await navigator.serviceWorker.getRegistration().catch(()=>null);e&&e.update&&e.update().catch(()=>{})}}catch{}if(typeof fetch>"u"){ht=!1,bt="This browser can’t check — but the app itself works offline. Use Export backup to protect your data.",h();return}const t=setTimeout(()=>{ht&&(ht=!1,bt="Couldn't reach the server — offline? The app itself works offline; updating needs internet.",h())},15e3);try{const e=await qs();if(clearTimeout(t),ht=!1,ua=e,e&&e!==jn){Ne=!0,bt="Update found — updating automatically…",h(),await Zn(!0);return}bt="You're on the latest version. The app works offline."}catch{clearTimeout(t),ht=!1,bt="Couldn't reach the server — offline, or this file wasn't opened from the installed/hosted app. The app itself works offline; updating needs internet."}h()}function cn(t){return new Promise(e=>{if(!("serviceWorker"in navigator))return e();const a=()=>e(),i=setTimeout(()=>{try{navigator.serviceWorker.removeEventListener("controllerchange",a)}catch{}e()},t||4e3),n=()=>{clearTimeout(i);try{navigator.serviceWorker.removeEventListener("controllerchange",n)}catch{}e()};try{navigator.serviceWorker.addEventListener("controllerchange",n)}catch{e()}})}async function Zn(t){var a;try{qt(Oe("second-mind-pre-update"),d.exportBackup(),"application/json")}catch{}m("Backup saved — updating app…"),bt=`Backup saved — updating${ua?` to ${String(ua).slice(-8)}`:""}…`,h();const e=()=>{const i=window.location.href.includes("?")?"&":"?";try{window.location.replace(`${window.location.href.split("#")[0]}${i}v=${Date.now()}#updated`)}catch{window.location.reload()}setTimeout(()=>{try{window.location.reload()}catch{}},2500)};try{if("serviceWorker"in navigator&&navigator.serviceWorker.getRegistration){const i=await navigator.serviceWorker.getRegistration().catch(()=>null);if(i){const n=i.waiting;if(n){try{n.postMessage("SKIP_WAITING")}catch{try{i.waiting.postMessage({type:"SKIP_WAITING"})}catch{}}await cn(4e3),e();return}try{await i.update()}catch{}const s=await navigator.serviceWorker.getRegistration().catch(()=>i),r=(s||i).waiting||(s||i).installing;if(r){try{r.postMessage("SKIP_WAITING")}catch{}try{(a=(s||i).waiting)==null||a.postMessage("SKIP_WAITING")}catch{}await cn(5e3),e();return}try{const o=navigator.serviceWorker.controller;o&&o.postMessage({type:"CLEAR_APP_CACHES"})}catch{}try{if(typeof caches<"u"){const o=await caches.keys().catch(()=>[]);await Promise.all(o.filter(l=>l.startsWith("daily-report-")).map(l=>caches.delete(l).catch(()=>!1)))}}catch{}try{await fetch(`./index.html?v=${Date.now()}`,{cache:"reload"})}catch{}try{await fetch(`./version.json?v=${Date.now()}`,{cache:"reload"})}catch{}try{await(s||i).unregister()}catch{}e();return}}}catch{}try{await fetch(`./index.html?v=${Date.now()}`,{cache:"reload"})}catch{}setTimeout(e,600)}const Us=[{id:"start",icon:"🚀",title:"Getting started",summary:"How the app works in one minute",steps:[["📱","The app has five tabs at the bottom: <b>Today</b>, <b>Profile</b>, <b>History</b>, <b>Activities</b> and <b>Settings</b> — tap a tab to switch."],["⭐","Every habit and task has a <b>points value</b>. Checking it earns those points for that day."],["🧠","Some habits also award <b>conscious points</b> (🧠) on top of their normal points."],["📈","The big card on Today shows your day as points, percent and a <b>letter grade</b>."],["🔒","At your lock time the day locks itself — press <b>Submit and lock report</b> while the day is open."],["💾","Everything is saved on this device only and works fully offline."]]},{id:"today",icon:"✅",title:"Track your day (Today tab)",summary:"Habits, tasks, stars, photos and the FAB",steps:[["☑️","Tap the <b>circle check</b> on a habit or task to mark it done and earn its points."],["⭐","Tap the <b>stars</b> (1–5) to rate how well it went — a rating also counts it as done."],["🟢","Done items turn green. Unchecked items turn red as <b>Missed</b> once the day is locked."],["📷","Tasks can carry a photo — tap the thumbnail to view it full size."],["➕","Tap the big <b>+</b> button to add a habit or task for this day."],["↔️","Use the <b>‹ ›</b> arrows in the top bar to move between days."]]},{id:"edit",icon:"✏️",title:"Edit, sort & reorder",summary:"Edit Mode, drag order and archiving",steps:[["✏️","Tap <b>Edit Mode</b> in a section header to reveal the <b>Edit</b> and delete buttons."],["✋","Hold a card’s <b>grip button</b> for a moment, then drag it to a new spot in the list."],["🔃","The <b>Sort</b> selector orders the list by Points, Category, Tags or your custom drag order."],["🗂️","The <b>archive</b> button sets a habit or task aside — its history is kept and you can restore it any time from the <b>Archive</b> panel at the bottom of Today."]]},{id:"forward",icon:"🔁",title:"Forward, Replace & Pin",summary:"Moving habits and tasks between days",steps:[["↪️","<b>Forward</b> an unfinished task (➟ button) to another day — it moves there with a badge showing where it came from."],["⇄","<b>Replace</b> moves a habit’s rating to a free day before its next due date."],["📌","<b>Pin</b> a habit or task to a repeat schedule — weekly days, month dates or a custom date list — so it appears automatically. Pin it <b>forever</b> for daily essentials."],["↩️","Badges on the card (↩ Forwarded from / ⇄ Replaced from) show what moved and where — tap a badge to undo it."]]},{id:"notes",icon:"📝",title:"Day notes",summary:"Bullet and numbered lists that save themselves",steps:[["📝","The <b>Day note</b> box at the bottom of Today records how the day went."],["•","Select lines and press <b>• Bullets</b> (or <b>1. Numbered</b>) to make a list — press it again to remove the list markers."],["💾","The note saves automatically with the day and is included in exports and backups."]]},{id:"profile",icon:"👤",title:"Profile tab",summary:"Identity, life areas, goals, quotes & locking",steps:[["🪪","<b>Identity</b> — your display name and the person you want to be."],["🧬","<b>Who I am</b> — a numbered list of your roles; reorder with ↑ ↓."],["🗺️","<b>Life Areas</b> — tap a card to open it, describe it, and reorder with ↑ ↓."],["🌅","<b>My Vision</b> and <b>Core & Personal Values</b> — one value per line as a bullet list."],["💡","<b>Personal Ideas</b> — one idea per line, shown as bullets."],["🎯","<b>Goals</b> — hashtag each one: <b>#short</b> = weeks, <b>#medium</b> = 1–3 months, <b>#long</b> = a year or more."],["💬","<b>Quotes</b> — save quotes you live by and star your top 3 favourites."],["🔒","<b>Lock</b> makes the whole profile read-only; Unlock to edit again."]]},{id:"history",icon:"🕘",title:"History tab",summary:"Calendar of past days and exporting",steps:[["🗓️","History shows a month calendar colour-coded by each day’s score."],["👆","Tap any day to jump straight into that day’s report."],["📤","<b>Select & Export</b> picks a date range and exports it as <b>Excel / JSON / PDF</b> — a later import adds it back as locked history."],["☰","The list below shows recent reports with their grades."]]},{id:"activities",icon:"📊",title:"Activities tab",summary:"Charts over a week, month or year",steps:[["📊","The Activities tab charts your weekly score and progress per category."],["🗓️","Switch between <b>Week / Month / Year</b> and use <b>‹ ›</b> to step back in time."],["📝","Below the chart, <b>Noted days</b> is a month calendar of every day that carries a note — marked days have a gold dot. Press one and its date and note appear right under the calendar; use ‹ › to move between months."],["🎨","Each category keeps its chosen colour everywhere — charts, badges and cards."]]},{id:"rewards",icon:"🏆",title:"Goals & Rewards",summary:"Streak goals, tiers and badges",steps:[["➕","In the <b>Activities</b> tab → <b>Goals &amp; Rewards</b> tap <b>Add goal</b>."],["🎯","Pick the target: a <b>habit or pinned-task streak of N days</b>, <b>N perfect (100%) days</b>, or a <b>List of tasks goal</b> (a checklist — no target needed)."],["📝","<b>List of tasks goal</b>: no target needed — in the goal form the <b>Attach tasks</b> picker lists <b>Archived</b> and <b>Undone</b> tasks to tick onto the goal. More can be added later from the task form’s <b>Select Goal</b>, <b>Attach to Goal List</b> when editing a task, or the goal card. When every task is done the goal shows <b>Done</b> and locks itself."],["🔁","A goal task whose title matches one of your <b>pinned tasks</b> shows that task’s <b>repeat times</b> — e.g. <b>↻ Mon, Wed, Fri · 3×/week</b> — and its days as chips. Tick <b>every pinned day</b> before the task counts as done; the row’s ✓ only clears it again."],["⛔","Locking a list goal manually before its tasks are finished <b>terminates</b> it — locked goals take no new tasks until you unlock."],["🥇","Choose the tier — <b>Iron, Bronze, Silver or Gold</b> — and write the reward title you’ll earn."],["🎁","Progress bars track each goal; earned rewards become <b>badges</b> on Today’s Rewards strip. A badge only exists while its goal is still complete — un-tick a task or break a streak and it drops back to <b>Not earned yet</b>, and returns when you earn it again."],["🏆","Any day that reaches 100% wins the <b>Gold Cup</b> on the spot."]]},{id:"cats",icon:"🗂️",title:"Categories & tags",summary:"Custom categories, colours, goals and tags",steps:[["🌈","Settings → <b>Categories</b>: add your own, tap one to open it, and pick its colour."],["📝","Type the category’s <b>goals</b> as bullet points and press Save — they reach forms, Activities and exports."],["🏷️","Tags group habits and tasks. From Settings → <b>Tags</b> you can rename or delete a tag everywhere at once."],["➕","New tags are added inside any habit or task form, or from the Tags section itself."]]},{id:"backup",icon:"💾",title:"Backup, updates & install",summary:"Keeping your data safe and the app fresh",steps:[["📁","Settings → <b>Data backup</b>: choose a folder once (desktop Chrome/Edge) and <b>Export backup now</b> saves a JSON straight into it."],["📥","<b>Import backup</b> accepts full backups (<b>second-mind-backup-*.json</b>) or month/week exports, which are added as locked history."],["🔄","<b>Check for updates</b> installs the newest version in place — a backup is saved first. Only this check needs internet."],["📲","<b>Install app</b> puts Second Mind on your home screen as a fullscreen offline app."]]},{id:"locking",icon:"🔐",title:"Locking & unlocking days",summary:"Auto-lock, submit and batch unlock",steps:[["⏰","Set the <b>auto-lock time</b> in Settings → Report lock; after that time today locks itself."],["🚫","A locked day is read-only, and anything unchecked already counted as <b>Missed</b> at lock time."],["📅","Settings → <b>Locked reports</b>: red days are locked, green days are open."],["☝️","Tap days to select them, then <b>Lock</b> or <b>Unlock</b> them all in one go."]]}];function zs(t){return`<div class="tut-steps">${t.map(e=>`
        <div class="tut-step">
          <span class="tut-step-ico" aria-hidden="true">${e[0]}</span>
          <p>${e[1]}</p>
        </div>`).join("")}</div>`}function Vs(){return`
    <div class="tut-grid">
      ${Us.map(t=>{const e=$e===t.id;return`
          <article class="tut-card ${e?"open":""}">
            <button type="button" class="tut-head" data-action="open-tutorial" data-id="${t.id}" aria-expanded="${e?"true":"false"}">
              <span class="tut-ico" aria-hidden="true">${t.icon}</span>
              <span class="tut-titles">
                <span class="tut-title">${p(t.title)}</span>
                <span class="tut-summary">${p(t.summary)}</span>
              </span>
              <span class="tut-chev" aria-hidden="true">${e?"▾":"▸"}</span>
            </button>
            ${e?`<div class="tut-body">${zs(t.steps)}</div>`:""}
          </article>
        `}).join("")}
    </div>
  `}function Kn(t){if(!t||t.kind!=="task-list")return"";const e=t.tasks||[];return e.length>0&&e.every(i=>d.goalTaskDone(i))?`Done ✅${t.locked?" 🔒":""}`:t.terminated?`Terminated ⛔${t.locked?" 🔒":""}`:t.locked?`Locked${t.locked?" 🔒":""}`:"Open"}function Ys(t){const{pin:e,slots:a}=t,i=a.map(n=>n.label);return e.mode==="forever"?"↻ Every day · 1×/day":e.mode==="until"?`↻ ${i.join(", ")}`:e.mode==="weekly"?`↻ ${i.join(", ")} · ${a.length}×/week`:e.mode==="monthly"?`↻ ${i.join(", ")} · ${a.length}×/month`:e.mode==="yearly"?`↻ ${i.join(", ")} · ${a.length}×/year`:`↻ ${i.join(", ")} · ${a.length} date${a.length===1?"":"s"}`}function Js(t,e,a){const i=d.goalTaskDone(e),n=d.goalTaskSchedule(e),s=Array.isArray(e.checked)?e.checked:[],r=a?'disabled title="Unlock the goal to edit its tasks"':"";return`
    <div class="goal-task-row ${i?"done":""}">
      <div class="goal-task-head">
        <button type="button" class="goal-task-check ${i?"on":""}" data-action="toggle-goal-item" data-id="${t.id}" data-item="${e.id}" data-done="${i?"true":"false"}" ${r} aria-label="${i?"Mark not done":"Mark done"}">${i?"✓":""}</button>
        <span class="goal-task-title">${p(e.title)}</span>
        ${a?"":`<button class="mini-btn" data-action="remove-goal-item" data-id="${t.id}" data-item="${e.id}" title="Remove from goal" aria-label="Remove from goal">✕</button>`}
      </div>
      ${n?`
            <div class="goal-task-repeat">
              <span class="repeat-line">${Ys(n)} — tick all ${n.slots.length} to finish</span>
              <div class="repeat-chips">
                ${n.slots.map(o=>{const l=s.includes(o.key);return`<button type="button" class="repeat-chip ${l?"on":""}" data-action="toggle-goal-slot" data-id="${t.id}" data-item="${e.id}" data-slot="${p(o.key)}" data-on="${l?"true":"false"}" aria-pressed="${l?"true":"false"}" ${r}>${l?"✓ ":""}${p(o.label)}</button>`}).join("")}
              </div>
            </div>
          `:""}
    </div>
  `}function Qs(t){const e=t.tasks||[],a=e.filter(b=>d.goalTaskDone(b)).length,i=e.length>0&&a===e.length,n=!!t.locked,s=!!t.terminated,r=!n&&!s,o=Kn(t),l=e.length?Math.round(a/e.length*100):0,c=i?"gstatus-done":s?"gstatus-term":n?"gstatus-locked":"gstatus-open",f=d.getBadges().some(b=>b.goalId===t.id);return`
    <article class="manage-card task-list-goal ${i?"goal-earned":""}">
      <div class="section-head">
        <div>
          <div class="item-title">${xe(t.tier)} ${p(t.title)} <span class="gstatus ${c}">${o}</span></div>
          <div class="item-meta">“${p(t.rewardTitle)}” · ${a}/${e.length} tasks · ${f?"Badge earned ✓":"Not earned yet"}${i?" · All done ✓":s?" · list closed":""}</div>
          <div class="bar"><span style="width:${l}%"></span></div>
        </div>
        <div class="mini-actions">
          ${n?"":`<button class="mini-btn on" data-action="open-edit-goal" data-id="${t.id}">Edit</button>`}
          ${n?`<button class="mini-btn" data-action="unlock-goal" data-id="${t.id}" title="Unlock to edit the goal${s?" (terminated goals still take no new tasks)":""}">🔓 Unlock</button>`:`<button class="mini-btn" data-action="lock-goal" data-id="${t.id}"${e.length&&!i?' title="Lock now — an unfinished goal stays terminated"':""}>🔒 Lock</button>`}
          <button class="mini-btn" data-action="remove-goal" data-id="${t.id}">✕</button>
        </div>
      </div>
      <div class="goal-task-list">
        ${e.length?e.map(b=>Js(t,b,n)).join(""):'<p class="item-meta">No tasks yet — add the first one below, or attach tasks from the task form (Select Goal).</p>'}
      </div>
      ${r?`
            <div class="goal-task-add">
              <input id="goal-item-input-${t.id}" maxlength="120" placeholder="New task for this goal…" aria-label="New task for ${p(t.title)}" />
              <button class="primary-btn compact-btn" data-action="add-goal-item" data-id="${t.id}">Add</button>
            </div>
          `:s?'<p class="item-meta">⛔ Terminated before the list was finished — no more tasks can be added, even after unlocking.</p>':'<p class="item-meta">🔒 Goal is done — unlock it to add or edit tasks.</p>'}
    </article>
  `}function X(t,{icon:e,title:a,hint:i},n){const s=Jt.has(t);return`
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
  `}function Xs(){return`      <div class="section-head goals-intro">
        <p class="muted tight" style="max-width:270px">Do a habit / pinned task N days in a row, or collect N perfect (100%) days — earn an Iron, Bronze, Silver or Gold badge with your own title.</p>
        <button class="ghost-btn compact" data-action="open-goal">Add goal</button>
      </div>
      <div class="habit-manage">
        ${d.getGoals().length?d.getGoals().map(t=>{var n,s;if(t.kind==="task-list")return Qs(t);const e=d.goalProgress(t,y),a=d.getBadges().some(r=>r.goalId===t.id),i=t.kind==="habit-streak"?((n=d.findHabit(t.targetId))==null?void 0:n.name)||"Deleted habit":t.kind==="task-streak"?((s=d.findPinnedTask(t.targetId))==null?void 0:s.title)||"Deleted task":"Any day at 100%";return`
                    <article class="manage-card goal-card ${a?"goal-earned":""}">
                      <div class="section-head">
                        <div>
                          <div class="item-title">${xe(t.tier)} ${p(t.title)}</div>
                          <div class="item-meta">${Pn(t.tier)} · “${p(t.rewardTitle)}” · ${p(i)}</div>
                          <div class="item-meta">${e.current}/${e.target} days · ${a?"Earned ✓":"Not earned yet"}</div>
                          <div class="bar"><span style="width:${Math.min(100,Math.round(e.current/e.target*100))}%"></span></div>
                        </div>
                        <div class="mini-actions">
                          <button class="mini-btn on" data-action="open-edit-goal" data-id="${t.id}">Edit</button>
                          <button class="mini-btn" data-action="remove-goal" data-id="${t.id}">✕</button>
                        </div>
                      </div>
                    </article>
                  `}).join(""):'<div class="empty">No goals yet. Tap Add goal to create your first reward.</div>'}
      </div>
      ${d.getBadges().length?`
            <div class="section-head" style="margin-top:14px"><h2>Earned badges</h2></div>
            <div class="rewards-grid">
              ${d.getBadges().map(t=>`
                <article class="reward-card tier-${t.tier}">
                  <div class="reward-medal">${xe(t.tier)}</div>
                  <div>
                    <div class="item-title">${p(t.rewardTitle||t.title)}</div>
                    <div class="item-meta">${p(t.title)} · ${O((t.earnedAt||"").slice(0,10))}</div>
                  </div>
                  <button class="mini-btn" data-action="remove-badge" data-id="${t.id}">✕</button>
                </article>
              `).join("")}
            </div>
          `:""}
`}function Zs(){const t=d.getSettings(),e=d.getAllHabits(),a=d.getPinnedHabits(),i=[...a,...e.filter(o=>!o.pin)],n=d.getArchivedHabits(),s=d.getPinnedTasks(),r=d.lockedReports();return`
    <div class="topbar">
      <div>
        <p class="kicker">Admin rules</p>
        <h1>Settings</h1>
      </div>
      <button class="ghost-btn compact ${St?"on":""}" data-action="toggle-settings-edit" aria-pressed="${St}">${St?"Done":"Edit Mode"}</button>
    </div>
    <p class="muted tight settings-sec-lead">Sections are closed by default — tap a title to open and edit it.</p>

    ${X("tutorials",{icon:"📚",title:"Tutorials",hint:"Illustrated guide to the app & its usage"},Vs())}

    ${X("report-lock",{icon:"🔒",title:"Report lock",hint:`Auto-lock at ${t.lockTime}`},`
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

    ${X("appearance",{icon:"🎨",title:"Appearance",hint:d.getTheme()==="dark"?"🌙 Dark mode":"☀️ Light mode"},`
      <p class="muted tight">Pick Dark or Light mode. It applies everywhere, instantly.</p>
      <div class="chip-row">
        <button type="button" class="chip ${d.getTheme()==="dark"?"on":""}" data-action="set-theme" data-theme="dark">🌙 Dark</button>
        <button type="button" class="chip ${d.getTheme()==="light"?"on":""}" data-action="set-theme" data-theme="light">☀️ Light</button>
      </div>
    `)}

    ${X("install",{icon:"📲",title:"Install app",hint:window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches?"Installed ✓":"Add to home screen"},`
      <p class="muted tight">Put Second Mind on your home screen for fullscreen offline use. Open it over http://localhost or https — it cannot install from a file:// page.</p>
      ${window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches?'<p class="item-meta">Installed — running as app ✓</p>':'<button class="primary-btn full" data-action="install-app">Install Second Mind</button>'}
    `)}

    ${X("updates",{icon:"🔄",title:"App updates",hint:`${Ne?"Update ready":p(tn)}`},`
      <p class="muted tight">The app works fully offline. Only checking for updates needs internet. Tapping Check for updates installs the newest version automatically (a JSON backup of your data is saved first). Your data stays on this device.</p>
      <p class="item-meta">Version: ${p(tn)}</p>
      <p class="item-meta">📅 ${p(Ds())}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
        <button class="primary-btn" data-action="check-updates" ${ht?"disabled":""}>${ht?"Checking…":"Check for updates"}</button>
        ${Ne?'<button class="primary-btn" data-action="apply-update">Restart with update</button>':""}
      </div>
      <p class="item-meta">${p(bt)}</p>
    `)}

    ${X("backup",{icon:"💾",title:"Data backup",hint:Cs()},`
      <p class="muted tight"><b>Auto-save:</b> pick a folder once (Chrome/Edge on desktop) and every change is written straight to <b>second-mind.json</b> inside it — your data lives on disk and no longer depends on browser storage. The browser keeps only a fast copy; if it is ever cleared, choose the same folder again and everything comes back. On phones no folder is available, so data stays in the browser — use Export backup there. Import accepts full backups (<b>second-mind-backup-*.json</b>) or month/week report exports, which are added as locked history.</p>
      <p class="item-meta">${p(Ps())}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
        ${d.folderStatus()==="prompt"||d.folderStatus()==="denied"?'<button class="primary-btn" data-action="grant-folder">Allow access</button>':""}
        ${d.folderStatus()==="unsupported"?"":d.getFolderHandle()?'<button class="ghost-btn compact" data-action="choose-folder">Change folder</button><button class="ghost-btn compact" data-action="forget-folder">Unlink</button>':'<button class="primary-btn" data-action="choose-folder">Choose data folder</button>'}
        <button class="primary-btn" data-action="backup-now">Export backup now</button>
        <button class="ghost-btn compact" data-action="trigger-import">Import backup</button>
      </div>
      <input type="file" id="backup-file" accept="application/json,.json" hidden />
      <div id="folder-backup-list" style="margin-top:10px"></div>
    `)}

    ${X("drive",{icon:"☁️",title:"Google Drive sync",hint:Ls()},Ms())}

    ${X("categories",{icon:"🗂️",title:"Categories",hint:`${d.getCategories().length}`},`
      <p class="muted tight">Add your own categories — they appear in forms, Activities and exports. Tap a category to open it, set its colour, then type its goals as bullet points and press Save.</p>
      <div class="cat-expand-row">
        <button class="mini-btn" data-action="expand-cats">Expand all</button>
        <button class="mini-btn" data-action="collapse-cats">Collapse all</button>
      </div>
      <div class="habit-manage">
        ${d.getCategories().map(o=>{const l=d.getCustomCategories().some($=>$.id===o.id),c=o.color||q(o.id),f=o.goals||"",b=ee(f),g=Ot.has(o.id)?Ot.get(o.id):f,k=ae(ee(g))!==ae(b),A=$t.has(o.id);return`
              <article class="manage-card cat-manage-card ${A?"open":""}">
                <div class="cat-manage-head">
                  <button type="button" class="cat-manage-toggle" data-action="toggle-cat" data-id="${o.id}" aria-expanded="${A?"true":"false"}" aria-controls="cat-editor-${o.id}">
                    <span class="cat-chevron" aria-hidden="true">${A?"▾":"▸"}</span>
                    <i class="cat-swatch" style="background:${p(c)}"></i>
                    <span class="cat-manage-name">${p(gt(o.id))}</span>
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
                            <input type="color" data-cat-color="${o.id}" value="${p(c)}" aria-label="Colour for ${p(o.label||gt(o.id))}" />
                          </label>
                          <div class="cat-goals-wrap">
                            <label>Goals — one per line
                              <textarea data-cat-goals="${o.id}" maxlength="1000" placeholder="• Goal one&#10;• Goal two&#10;• Goal three" style="min-height:90px">${p(g)}</textarea>
                            </label>
                            <div class="cat-save-row">
                              <button class="primary-btn compact-btn" data-action="save-cat-goals" data-id="${o.id}">${k?"Save goals":"Saved"}</button>
                              <button class="ghost-btn compact" data-action="reset-cat-goals" data-id="${o.id}" ${k?"":"hidden"}>Discard</button>
                            </div>
                            <p class="item-meta cat-goal-hint">${k?"Unsaved changes — press Save to keep them offline and in backups.":"Saved on this device and included in every backup."}</p>
                          </div>
                        </div>
                      </div>
                    `:b.length?`<ul class="note-list cat-goal-preview">${b.map($=>`<li>${p($)}</li>`).join("")}</ul>`:'<p class="item-meta">No goals yet — open this category to add some.</p>'}
              </article>
            `}).join("")}
      </div>
      <div style="display:flex;gap:8px;margin-top:10px">
        <input id="new-category" maxlength="30" placeholder="New category name…" style="flex:1;min-width:0" />
        <button class="primary-btn compact-btn" data-action="add-category">Add</button>
      </div>
    `)}

    ${X("tags",{icon:"🏷️",title:"Tags",hint:`${d.getAllTags().length}`},`
      <p class="muted tight">Rename a tag everywhere at once, or delete it from all habits and tasks. New tags are added inside any habit/task form.</p>
      <div class="habit-manage">
        ${(()=>{const o=d.getAllTags();return o.length?o.map(({tag:l,count:c})=>`
              <article class="manage-card">
                <div class="section-head">
                  <div>
                    <div class="item-title">#${p(l)}</div>
                    <div class="item-meta">Used ${c} time${c===1?"":"s"}</div>
                  </div>
                  <div class="mini-actions">
                    <button class="mini-btn on" data-action="rename-tag" data-tag="${p(l)}">Rename</button>
                    <button class="mini-btn" data-action="delete-tag" data-tag="${p(l)}">✕</button>
                  </div>
                </div>
              </article>
            `).join(""):'<div class="empty">No tags yet — add some in a habit or task form.</div>'})()}
      </div>
      <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">
        <select id="tag-habit-pick" style="flex:1;min-width:0">
          ${d.getAllHabits().map(o=>`<option value="${o.id}">${p(o.name)}</option>`).join("")}
        </select>
        <input id="new-tag" maxlength="20" placeholder="New tag…" style="flex:1;min-width:0" />
        <button class="primary-btn compact-btn" data-action="add-tag">Add</button>
      </div>
    `)}


    ${X("locked-reports",{icon:"📅",title:"Locked reports",hint:`${r.length} locked`},`
      <div class="section-head">
        <p class="muted tight" style="max-width:260px">Red = locked, green = open. Tap days to select them, then lock or unlock all at once.</p>
        <div class="date-nav">
          <button class="icon-btn" data-action="locked-cal-nav" data-dir="-1" aria-label="Previous month">‹</button>
          <button class="icon-btn" data-action="locked-cal-nav" data-dir="1" aria-label="Next month">›</button>
        </div>
      </div>
      ${ys(r)}
      ${_.length?`
        <div class="chip-row" style="margin-top:10px">
          ${[..._].sort().map(o=>`<button type="button" class="chip on" data-action="toggle-locked-day" data-date="${o}" title="Tap to remove">${o} ✕</button>`).join("")}
        </div>
        <div style="display:flex;gap:8px;margin-top:10px">
          <button class="primary-btn" style="flex:1" data-action="lock-selected">🔒 Lock ${_.length} day${_.length===1?"":"s"}</button>
          <button class="ghost-btn" style="flex:1" data-action="unlock-selected">🔓 Unlock ${_.length} day${_.length===1?"":"s"}</button>
        </div>
      `:""}
    `)}

    ${X("habits",{icon:"✅",title:"Habits",hint:`${i.length}`},`
      <div class="section-head">
        <p class="muted tight" style="max-width:280px">Tap a habit to see its activity. In Edit Mode, edit habits and reorder pinned habits.</p>
        <button class="ghost-btn compact" data-action="open-add-habit">Add</button>
      </div>
      <div class="habit-manage">
        ${i.length?i.map(o=>{const l=ve.has(o.id),c=o.pin?a.findIndex(b=>b.id===o.id):-1,f=l?d.getHabitActivity(o.id,20):[];return`
                    <article class="manage-card setting-habit-card ${l?"open":""}" style="${o.pin?`border-left:4px solid ${q(o.category)}`:""}">
                      <div class="section-head">
                        <button type="button" class="setting-habit-toggle" data-action="toggle-setting-habit" data-id="${o.id}" aria-expanded="${l?"true":"false"}">
                          <span class="setting-habit-chevron" aria-hidden="true">${l?"▾":"▸"}</span>
                          <span class="setting-habit-heading">
                            <span class="item-title">${p(o.name)}</span>
                            <span class="item-meta">${Pt(o.category)} · ${o.pin?Rt(o.pin):"Not pinned"} · +${d.habitPoints(o,y)} pts ${t.showConscious!==!1?Number(o.consciousPoints)?`· 🧠 +${o.consciousPoints}`:"· No conscious pts":""} ${Ie(o,y)} · ${Fe(d.habitStreak(o.id,y))}</span>
                          </span>
                        </button>
                        <div class="mini-actions">
                          ${St?`
                            <button class="mini-btn on" data-action="open-edit-habit" data-id="${o.id}" aria-label="Edit ${p(o.name)}">Edit</button>
                            ${o.pin?`
                              <button class="mini-btn" data-action="move-pinned-habit" data-id="${o.id}" data-dir="-1" ${c===0?"disabled":""} aria-label="Move ${p(o.name)} up" title="Move up">↑</button>
                              <button class="mini-btn" data-action="move-pinned-habit" data-id="${o.id}" data-dir="1" ${c===a.length-1?"disabled":""} aria-label="Move ${p(o.name)} down" title="Move down">↓</button>
                            `:""}
                            <button class="mini-btn ${o.pin?"on":""}" data-action="open-pin-habit" data-id="${o.id}" aria-label="${o.pin?"Change pin schedule":"Pin habit"}">${L("pin")}</button>
                            <button class="mini-btn" data-action="remove-habit" data-id="${o.id}" aria-label="Remove ${p(o.name)}">✕</button>
                          `:""}
                        </div>
                      </div>
                      ${l?`
                        <div class="setting-habit-details">
                          ${o.description?`<p class="item-desc">${p(o.description)}</p>`:'<p class="item-meta">No description yet.</p>'}
                          ${ft(o.tags)}
                          <div class="setting-habit-activity">
                            <div class="item-title">Recent activity</div>
                            ${f.length?f.map(b=>`
                              <button type="button" class="setting-habit-activity-row" data-action="open-habit-activity-date" data-date="${b.date}">
                                <span>${O(b.date)}</span>
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

    ${n.length?X("deleted-habits",{icon:"🗑️",title:"Deleted habits",hint:`${n.length} — history kept`},`
      <p class="muted tight">Deleting a habit never erases history: days that already recorded it keep it and its points. Restore a habit to bring it back on future days.</p>
      <div class="habit-manage">
        ${n.map(o=>`
                    <article class="manage-card archived" style="border-left:4px solid ${q(o.category)}">
                      <div class="section-head">
                        <div>
                          <div class="item-title">${p(o.name)}</div>
                          <div class="item-meta">${Pt(o.category)} · +${d.habitPoints(o,(o.archivedAt||"").slice(0,10))} pts${o.pin?` · ${Rt(o.pin)}`:" · Pin ended"} · ${fa(o.archivedAt)}</div>
                          ${o.description?`<p class="item-desc">${p(o.description)}</p>`:""}
                          ${ft(o.tags)}
                        </div>
                        <div class="mini-actions">
                          <button class="mini-btn on" data-action="restore-habit" data-id="${o.id}">${L("undo")}</button>
                        </div>
                      </div>
                    </article>
                  `).join("")}
      </div>
    `):""}

    ${X("pinned-tasks",{icon:"📌",title:"Pinned tasks",hint:`${s.length}`},`
      <p class="muted tight">Pinned tasks appear automatically on matching days.</p>
      <div class="habit-manage">
        ${s.length?s.map(o=>`
                    <article class="manage-card" style="border-left:4px solid ${q(o.category)}">
                      <div class="section-head">
                        <div>
                          <div class="item-title">${p(o.title)}</div>
                          <div class="item-meta">${Pt(o.category)} · ${Rt(o.pin)} · +${o.points} pts</div>
                          ${o.description?`<p class="item-desc">${p(o.description)}</p>`:""}
                          ${ft(o.tags)}
                        </div>
                        <div class="mini-actions">
                          ${St?`
                            <button class="mini-btn on" data-action="open-edit-pinned-task" data-id="${o.id}" aria-label="Edit ${p(o.title)}">Edit</button>
                            <button class="mini-btn" data-action="move-pinned-task" data-id="${o.id}" data-dir="-1" ${s.indexOf(o)===0?"disabled":""} aria-label="Move ${p(o.title)} up" title="Move up">↑</button>
                            <button class="mini-btn" data-action="move-pinned-task" data-id="${o.id}" data-dir="1" ${s.indexOf(o)===s.length-1?"disabled":""} aria-label="Move ${p(o.title)} down" title="Move down">↓</button>
                            <button class="mini-btn on" data-action="open-pin-template" data-id="${o.id}" aria-label="Change repeat schedule">${L("pin")}</button>
                            <button class="mini-btn" data-action="unpin-template" data-id="${o.id}" aria-label="Unpin ${p(o.title)}">✕</button>
                          `:""}
                        </div>
                      </div>
                    </article>
                  `).join(""):'<div class="empty">Pin a task from Today to repeat it.</div>'}
      </div>
    `)}
  `}function j(t){if(/^\d{4}-\d{2}$/.test(String(t||"")))return String(t);if(/^\d{4}-\d{2}-\d{2}$/.test(String(t||"")))return String(t).slice(0,7);const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}`}function Ht(t,e){const[a,i]=String(t).split("-").map(Number),n=new Date(a,(i||1)-1+e,1);return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`}function Gt(t){const[e,a]=String(t).split("-").map(Number);return new Date(e,(a||1)-1,1).toLocaleDateString(void 0,{month:"long",year:"numeric"})}function _e(){const t=d.getWeekStart(),e=xt.findIndex(a=>a.value===t);return e<=0?xt:[...xt.slice(e),...xt.slice(0,e)]}function qe(t){const[e,a]=String(t).split("-").map(Number),n=(new Date(e,a-1,1).getDay()-d.getWeekStart()+7)%7,s=new Date(e,a,0).getDate(),r=[];for(let o=0;o<n;o++)r.push(null);for(let o=1;o<=s;o++)r.push(`${e}-${String(a).padStart(2,"0")}-${String(o).padStart(2,"0")}`);return r}function un(t,e,a){const i=new Set(a||[]),n=qe(e);return`
    <div class="pin-cal" data-cal="${t}">
      <div class="pin-cal-head">
        <button type="button" class="mini-btn" data-action="pin-cal-nav" data-target="${t}" data-dir="-1" aria-label="Previous month">‹</button>
        <b>${Gt(e)}</b>
        <button type="button" class="mini-btn" data-action="pin-cal-nav" data-target="${t}" data-dir="1" aria-label="Next month">›</button>
      </div>
      <div class="pin-cal-grid pin-cal-week">
        ${_e().map(s=>`<span>${s.label.slice(0,1)}</span>`).join("")}
      </div>
      <div class="pin-cal-grid">
        ${n.map(s=>s?`<button type="button" class="pin-cal-day ${i.has(s)?"on":""}" data-action="toggle-pin-date" data-target="${t}" data-date="${s}">${Number(s.slice(8,10))}</button>`:"<span></span>").join("")}
      </div>
    </div>
  `}function Ks(t,e){const a=(t==null?void 0:t.mode)||"forever",i=(t==null?void 0:t.until)||"",n=((t==null?void 0:t.weekdays)||[]).map(Number),s=((t==null?void 0:t.monthDays)||[]).map(Number),r=Array.isArray(t==null?void 0:t.yearDays)?[...t.yearDays].sort():[],o=Array.isArray(t==null?void 0:t.customDates)?[...t.customDates].sort():[],l=Array.isArray(t==null?void 0:t.exceptDates)?[...t.exceptDates].sort():Array.isArray(t==null?void 0:t.exceptions)?[...t.exceptions].sort():[],c=e&&e._exceptCal||j(y),f=e&&e._customCal||j(y),b=e&&e._yearMonth||"01";return`
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
        ${xt.map(g=>`
            <button type="button" class="chip weekday ${n.includes(g.value)?"on":""}" data-action="toggle-weekday" data-day="${g.value}">
              ${g.label}
            </button>
          `).join("")}
      </div>
    </div>
    <div class="pin-monthdays" style="${a==="monthly"?"":"display:none"}">
      <p class="item-meta">Repeat every month on day</p>
      <div class="chip-row">
        ${Array.from({length:31},(g,k)=>k+1).map(g=>`<button type="button" class="chip monthday ${s.includes(g)?"on":""}" data-action="toggle-monthday" data-day="${g}">${g}</button>`).join("")}
      </div>
    </div>
    <div class="pin-yeardays" style="${a==="yearly"?"":"display:none"}">
      <p class="item-meta">Repeat every year on (month + day)</p>
      <div class="row-2">
        <label>Month
          <select id="year-month-select">
            ${Array.from({length:12},(g,k)=>k+1).map(g=>`<option value="${String(g).padStart(2,"0")}" ${b===String(g).padStart(2,"0")?"selected":""}>${new Date(2e3,g-1,1).toLocaleDateString(void 0,{month:"long"})}</option>`).join("")}
          </select>
        </label>
        <label>Day
          <select id="year-day-select">
            ${Array.from({length:31},(g,k)=>k+1).map(g=>`<option value="${String(g).padStart(2,"0")}">${g}</option>`).join("")}
          </select>
        </label>
      </div>
      <button type="button" class="ghost-btn compact" data-action="add-year-day" style="margin-top:8px">Add yearly date</button>
      <div class="chip-row" style="margin-top:8px">
        ${r.length?r.map(g=>`<button type="button" class="chip on" data-action="remove-year-day" data-date="${g}" title="Tap to remove">${g} ✕</button>`).join(""):'<span class="item-meta">No yearly dates yet.</span>'}
      </div>
    </div>
    <div class="pin-customdays" style="margin-top:4px">
      <p class="item-meta"><b style="color:var(--text)">Extra custom dates</b> — also show on these days. Combines with Weekly / Monthly / Yearly; pick the <b style="color:var(--text)">Custom</b> mode to show <i>only</i> on these days. Tap days on the calendar.</p>
      ${un("custom",f,o)}
      <div class="chip-row" style="margin-top:8px">
        ${o.length?o.map(g=>`<button type="button" class="chip on" data-action="toggle-pin-date" data-target="custom" data-date="${g}" title="Tap to remove">${g} ✕</button>`).join(""):'<span class="item-meta">No extra custom dates.</span>'}
      </div>
    </div>
    <div class="pin-exceptions" style="margin-top:4px">
      <p class="item-meta"><b style="color:var(--text)">Exceptions</b> — skip these days (tap days on the calendar). Applies to every repeat mode.</p>
      ${un("except",c,l)}
      <div class="chip-row" style="margin-top:8px">
        ${l.length?l.map(g=>`<button type="button" class="chip on" data-action="toggle-pin-date" data-target="except" data-date="${g}" title="Tap to remove">${g} ✕</button>`).join(""):'<span class="item-meta">No exceptions.</span>'}
      </div>
    </div>
  `}function to(){if(!x)return"";if(x==="choose")return`
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
    `;if(x==="habit"||x==="task"||x==="edit-habit"||x==="edit-task"||x==="edit-pinned-task"){const t=x==="habit"||x==="edit-habit",e=x.startsWith("edit-"),a=w||{},i=a.category||(t?"physically":"mentally"),n=Math.max(0,Math.min(5,Number(a.rating)||0)),s=Array.isArray(a.tags)?a.tags.join(", "):a.tags||"",r=a.consciousPoints!=null?Number(a.consciousPoints):a.conscious!=null?Number(a.conscious):0,o=t?d.habitUpgradeEntry(a.id||"",y):null,l=a.upgradeType||(o?o.type:"count"),c=a.upgradeValue!==void 0&&a.upgradeValue!==""?a.upgradeValue:o?o.value:"",f=a._upgradeDirection||"upgrade",b=!!a._upgradePanel,g=Number(a.points)||(t?10:5);return`
      <div class="modal-backdrop open" data-action="close-modal">
        <form class="sheet" data-form="${x}" data-id="${a.id||""}">
          <div class="handle"></div>
          <h2>${e?"Edit":"New"} ${t?"habit":"task"}</h2>
          <div class="form" style="margin-top:14px">
            <label>
              ${t?"Habit name":"Task name"}
              <input name="title" required maxlength="60" value="${p(a.title||a.name||"")}" placeholder="${t?"Meditate":"Finish report"}" />
            </label>
            ${(()=>{const k=x==="edit-task";if(t||!(x==="task"||k)||!d.taskListGoals().length)return"";const A=k?d.openTaskListGoals():d.taskListGoals(),$=k?"Attach to Goal List":"Select Goal",v=k?"Not attached to a goal":"No goal — add to today's task list",T=k?"Picking a goal adds this task to that goal’s list as well (open goals only).":"A goal attached here puts the task on that goal’s list instead of today’s list.";return`
                <div>
                  <p class="item-meta">${$}</p>
                  ${k&&!A.length?'<p class="item-meta">No open list-of-tasks goals — unlock a goal first to attach to it.</p>':`
                  <label style="margin-top:6px">
                    Attach this task to a list-of-tasks goal (optional)
                    <select name="goalTarget">
                      <option value="">${v}</option>
                      ${A.map(H=>{const re=!H.locked;return`<option value="${H.id}" ${re?"":"disabled"}>${p(H.title)} — ${Kn(H)}</option>`}).join("")}
                    </select>
                  </label>`}
                  <p class="item-meta">${T}</p>
                </div>
              `})()}
            ${t?`
                  <label>
                    Description (optional)
                    <textarea name="description" maxlength="2000" placeholder="Why this habit matters, extra notes...">${p(a.description||"")}</textarea>
                  </label>
                `:`
                  <label>
                    Description (optional)
                    <textarea name="description" maxlength="240" placeholder="Why this matters, extra notes...">${p(a.description||"")}</textarea>
                  </label>
                  <div>
                    <p class="item-meta">Rating (optional, info only — does not change points)</p>
                    <div class="chip-row rating-row">
                      <button type="button" class="chip ${n===0?"on":""}" data-action="set-rating" data-rating="0">No rating</button>
                      ${[1,2,3,4,5].map(k=>`
                            <button type="button" class="chip ${n===k?"on":""}" data-action="set-rating" data-rating="${k}">${k}★</button>
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
                ${d.getCategories().map(k=>`
                    <button type="button" class="chip ${i===k.id?"on":""}" data-action="set-category" data-category="${k.id}">${p(k.label)}</button>
                  `).join("")}
              </div>
              <input type="hidden" name="category" value="${i}" />
            </div>
            <label>
              Tags (optional, comma separated)
              <input name="tags" maxlength="120" value="${p(s)}" placeholder="morning, health" />
            </label>
            ${t?`
                  <div>
                    <p class="item-meta">Upgrade — what kind of target?</p>
                    <div class="chip-row upgrade-type-row">
                      <button type="button" class="chip ${l==="count"?"on":""}" data-action="set-upgrade-type" data-type="count">Level / Count (number)</button>
                      <button type="button" class="chip ${l==="degree"?"on":""}" data-action="set-upgrade-type" data-type="degree">Degree (text)</button>
                    </div>
                    <input type="hidden" name="upgradeType" value="${l}" />
                  </div>
                  <label>
                    ${l==="degree"?"Upgrade — degree (optional)":"Upgrade — level / count (optional)"}
                    ${l==="degree"?`<input name="upgrade" type="text" maxlength="40" value="${p(c??"")}" placeholder="e.g. Advanced" />`:`<input name="upgrade" type="number" min="1" max="9999" step="1" inputmode="numeric" value="${c??""}" placeholder="e.g. 20" />`}
                  </label>
                  <p class="item-meta">The level / count or degree you aim for each day. Changing it applies from ${p(O(y))} onward — earlier days keep their old target. Leave blank for no target.</p>
                  ${e?`
                        <button type="button" class="ghost-btn" data-action="toggle-upgrade-panel" aria-expanded="${b?"true":"false"}">↗ Upgrade or Degrade</button>
                        <div class="upgrade-panel" ${b?"":"hidden"}>
                          <p class="item-meta">Choose one, then add the updated value above. Afterwards you are asked about points: Upgrade adds, Degrade subtracts.</p>
                          <div class="chip-row upgrade-dir-row">
                            <button type="button" class="chip ${f==="upgrade"?"on":""}" data-action="set-upgrade-direction" data-direction="upgrade">↗ Upgrade</button>
                            <button type="button" class="chip ${f==="degrade"?"on":""}" data-action="set-upgrade-direction" data-direction="degrade">↘ Degrade</button>
                          </div>
                          <input type="hidden" name="upgradeDirection" value="${f}" />
                          <label style="margin-top:8px">
                            Change points? Type how many to ${f==="degrade"?"subtract":"add"} (blank = keep ${g} pts)
                            <input name="upgradePointsDelta" type="number" min="0" max="100" step="1" inputmode="numeric" placeholder="0" />
                          </label>
                          <p class="item-meta upgrade-points-preview">Points from ${p(O(y))}: ${g} → ${g}</p>
                        </div>
                      `:""}
                `:""}
            <label>
              Points${t&&e?" (use Upgrade or Degrade above to change from this day onward)":""}
              <input name="points" type="number" min="1" max="100" value="${a.points||(t?10:5)}" ${t&&e?"readonly":""} />
            </label>
            <div class="chip-row">
              ${(t?[5,10,15,20]:[5,10,15,25]).map(k=>`<button type="button" class="chip" data-action="set-points" data-points="${k}" ${t&&e?"disabled":""}>${k} pts</button>`).join("")}
            </div>
            ${t?`
                  <div>
                    <p class="item-meta">Conscious points (bonus when habit is done, 0 = Never)</p>
                    <div class="chip-row conscious-row">
                      ${[0,5,10,15,20].map(k=>`
                            <button type="button" class="chip ${r===k?"on":""}" data-action="set-conscious" data-conscious="${k}">${k===0?"Never":`+${k}🧠`}</button>
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
    `}if(x==="export"){const t=w&&w.range||"day";return`
      <div class="modal-backdrop open" data-action="close-modal">
        <div class="sheet">
          <div class="handle"></div>
          <h2>Export report</h2>
          <p class="muted tight">Date: ${O(y)}. Pick a range, then a format.</p>
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
    `}if(x==="goal"||x==="edit-goal"){const t=x==="edit-goal",e=w||{},a=e.kind||"habit-streak",i=d.getAllHabits(),n=d.getPinnedTasks(),s=e.targetId||"",r=a==="task-list"?(e.tasks||[]).filter(c=>!d.goalTaskDone(c)).length:0,o=a==="task-list"?d.getArchivedTasks():[],l=a==="task-list"?d.undoneDayTasks():[];return`
      <div class="modal-backdrop open" data-action="close-modal">
        <form class="sheet" data-form="${x}" data-id="${e.id||""}">
          <div class="handle"></div>
          <h2>${t?"Edit":"New"} goal</h2>
          <div class="form" style="margin-top:14px">
            <label>
              Goal title
              <input name="title" required maxlength="60" value="${p(e.title||"")}" placeholder="Exercise every day" />
            </label>
            <div>
              <p class="item-meta">Goal type</p>
              <div class="chip-row goal-kind-row">
                ${Cn.map(c=>`<button type="button" class="chip ${a===c.id?"on":""}" data-action="set-goal-kind" data-kind="${c.id}">${c.label}</button>`).join("")}
              </div>
              <input type="hidden" name="kind" value="${a}" />
              ${a==="task-list"?'<p class="item-meta">No target needed — pick the tasks to attach below. You can add more later from the task form (Select Goal) or inside Goals &amp; Rewards.</p>':""}
            </div>
            <div class="goal-attach" style="${a==="task-list"?"":"display:none"}">
              <p class="item-meta"><b style="color:var(--text)">Attach tasks</b> — tick the tasks that belong to this goal's list${r?` · already on the goal: ${r} unfinished`:""}.</p>
              ${(()=>{const c=(f,b,g)=>{const k=b.map(A=>{const $=String(A.title||"").trim();if(!$)return"";const v=A.category?`${A.category.charAt(0).toUpperCase()}${A.category.slice(1)}${A.date?` · ${A.date}`:""}`:A.date||"";return`
                        <label class="goal-attach-row">
                          <input type="checkbox" name="attachTask" value="${p($)}" />
                          <span class="goal-attach-title">${p($)}</span>
                          ${v?`<span class="goal-attach-meta">${p(v)}</span>`:""}
                        </label>
                      `}).filter(Boolean);return`
                    <div class="goal-attach-group">
                      <p class="goal-attach-heading">${f}</p>
                      ${k.length?k.join(""):`<p class="item-meta">${g}</p>`}
                    </div>
                  `};return`${c("Archived tasks",o,"No archived tasks yet.")}${c("Undone tasks",l,"No undone day tasks.")}`})()}
            </div>
            <label class="goal-target-habit" style="${a==="habit-streak"?"":"display:none"}">
              Habit
              <select name="habitTarget">
                ${i.map(c=>`<option value="${c.id}" ${s===c.id?"selected":""}>${p(c.name)}</option>`).join("")}
              </select>
            </label>
            <label class="goal-target-task" style="${a==="task-streak"?"":"display:none"}">
              Pinned task
              <select name="taskTarget">
                ${n.length?n.map(c=>`<option value="${c.id}" ${s===c.id?"selected":""}>${p(c.title)}</option>`).join(""):'<option value="">No pinned tasks yet</option>'}
              </select>
            </label>
            <label class="goal-target-days" style="${a==="task-list"?"display:none":""}">
              Number of days
              <input name="targetDays" type="number" min="1" max="365" value="${e.targetDays||7}" />
            </label>
            <div>
              <p class="item-meta">Badge</p>
              <div class="chip-row goal-tier-row">
                ${ie.map(c=>`<button type="button" class="chip ${(e.tier||"bronze")===c.id?"on":""}" data-action="set-goal-tier" data-tier="${c.id}">${c.medal} ${c.label}</button>`).join("")}
              </div>
              <input type="hidden" name="tier" value="${e.tier||"bronze"}" />
            </div>
            <label>
              Reward title (yours)
              <input name="rewardTitle" required maxlength="60" value="${p(e.rewardTitle||"")}" placeholder="Champion" />
            </label>
            <button class="primary-btn" type="submit">Save goal</button>
            <button class="ghost-btn" type="button" data-action="close-modal">Cancel</button>
          </div>
        </form>
      </div>
    `}if(x==="pin"){const{kind:t,id:e,title:a,pin:i}=w||{};return`
      <div class="modal-backdrop open" data-action="close-modal">
        <form class="sheet sheet-wide" data-form="pin" data-kind="${t}" data-id="${e}">
          <div class="handle"></div>
          <h2>Pin ${t==="habit"?"habit":"task"}</h2>
          <p class="muted tight">${p(a||"")}</p>
          <div class="form" style="margin-top:14px">
            ${Ks(i,w)}
            <button class="primary-btn" type="submit">Save pin</button>
            ${i?'<button class="ghost-btn danger" type="button" data-action="clear-pin">Unpin</button>':""}
            <button class="ghost-btn" type="button" data-action="close-modal">Cancel</button>
          </div>
        </form>
      </div>
    `}if(x==="forward"){const{kind:t,id:e,title:a,from:i}=w||{};return`
      <div class="modal-backdrop open" data-action="close-modal">
        <form class="sheet" data-form="forward" data-kind="${t}" data-id="${e}">
          <div class="handle"></div>
          <h2>Forward task</h2>
          <p class="muted tight">${p(a||"")}</p>
          <p class="item-meta">From ${p(i||y)} — a copy will be created on the day you pick, marked “↩ Forwarded from ${p(i||y)}”.</p>
          <div class="form" style="margin-top:14px">
            <label>
              Forward to day
              <input name="targetDate" type="date" required value="${cs(i||y)}" />
            </label>
            <button class="primary-btn" type="submit">Forward task →</button>
            <button class="ghost-btn" type="button" data-action="close-modal">Cancel</button>
          </div>
        </form>
      </div>
    `}if(x==="replace"){const{id:t,title:e,from:a,info:i}=w||{},n=i&&i.days||[];return`
      <div class="modal-backdrop open" data-action="close-modal">
        <form class="sheet" data-form="replace" data-id="${t}">
          <div class="handle"></div>
          <h2>Replace habit day</h2>
          <p class="muted tight">${p(e||"")}</p>
          <p class="item-meta">Currently due on <b>${p(a||y)}</b>. Its next direct day is <b>${p(i&&i.next||"")}</b>, so the day may only move to one of the ${n.length} day${n.length===1?"":"s"} in between — the allowable replace days.</p>
          <div class="form" style="margin-top:14px">
            <div class="replace-day-grid">
              ${n.map(s=>`<button type="button" class="chip replace-day-chip" data-action="pick-replace-day" data-date="${s}">${p(s)}</button>`).join("")}
            </div>
            <input type="hidden" name="targetDate" value="${n[0]||""}" />
            <button class="primary-btn" type="submit" ${n.length?"":"disabled"}>Replace day ⇄</button>
            <button class="ghost-btn" type="button" data-action="close-modal">Cancel</button>
          </div>
        </form>
      </div>
    `}if(x==="image"){const{image:t,title:e}=w||{};return t?`
      <div class="lightbox-backdrop" data-action="close-modal">
        <img src="${t}" alt="${p(e||"Task photo")}" />
        <button type="button" class="ghost-btn compact lightbox-close" data-action="close-modal">✕ Close</button>
      </div>
    `:""}return""}function h(){if(Je){Ma();try{const t=d.isLocked(y);Je.innerHTML=`
    <div class="app-shell">
      ${Es()}
      <main class="screen active">
        ${R==="today"?ps():""}
        ${R==="profile"?gs():""}
        ${R==="history"?$s():""}
        ${R==="habits"?Ts():""}
        ${R==="settings"?Zs():""}
      </main>
      ${["today","habits"].includes(R)&&!t?'<button class="fab" data-action="open-add" aria-label="Add">+</button>':""}
      ${R==="settings"?'<button class="fab" data-action="open-add-habit" aria-label="Add habit">+</button>':""}
      <nav class="tabbar tabs-5">
        <button class="tab ${R==="today"?"active":""}" data-screen="today">${L("home")}Today</button>
        <button class="tab ${R==="profile"?"active":""}" data-screen="profile">${L("profile")}Profile</button>
        <button class="tab ${R==="history"?"active":""}" data-screen="history">${L("history")}History</button>
        <button class="tab ${R==="habits"?"active":""}" data-screen="habits">${L("habit")}Activities</button>
        <button class="tab ${R==="settings"?"active":""}" data-screen="settings">${L("settings")}Settings</button>
      </nav>
    </div>
    ${to()}
    <div class="toast" id="toast"></div>
  `,ao(),ms(),oo(),so(),Wt(),eo()}catch(t){const e=t&&t.stack?String(t.stack).slice(0,400):t&&t.message?t.message:"Unknown error";Je.innerHTML=`<div class="app-shell"><section class="manage-card"><h2>Could not load (Error B)</h2><p class="muted tight">${p(e)}</p><button class="primary-btn full" data-action="reload-app">Reload</button></section></div>`}}}function eo(){if(x!=="habit"&&x!=="task")return;const t=document.querySelector(".sheet");t&&(t.scrollTop=0);const e=document.querySelector('.sheet input[name="title"]');if(e)try{e.focus({preventScroll:!0})}catch{try{e.focus()}catch{}}}function ao(){const t=document.getElementById("day-note");t&&t.addEventListener("input",()=>{d.isLocked(y)||d.setNote(y,t.value)})}const no=3e3,io=180,pn=10,D={list:null,card:null,timer:null,startX:0,startY:0,dragging:!1,order0:"",swallowClick:!1,fromHandle:!1,bound:!1};function ma(){D.timer&&(clearTimeout(D.timer),D.timer=null),D.card=null,D.fromHandle=!1}function ti(t,e){return[...t.querySelectorAll(".item-card[data-sortable]")].filter(a=>a.dataset.sortable===e).map(a=>a.dataset.id)}function fn(t){const e=D.card,a=D.list;if(ma(),D.list=null,D.dragging=!1,!e||(e.classList.remove("is-dragging"),a&&a.classList.remove("is-reordering"),document.body.classList.remove("is-reordering-body"),!t))return;const i=e.dataset.sortable,n=ti(a,i);n.join("|")!==D.order0&&(D.swallowClick=!0,setTimeout(()=>{D.swallowClick=!1},400),i==="habit"?(d.setHabitOrder(n),d.setHabitSort("custom")):i==="task"&&(d.setTaskOrder(y,n),d.setTaskSort("custom")),h(),m("Order saved"))}function so(){D.bound||(D.bound=!0,document.addEventListener("pointerdown",t=>{if(t.button!=null&&t.button!==0||t.target.closest("input, textarea, select, img, video, .stars, .mini-btn, .check, .fab, .tabbar"))return;const e=t.target.closest(".item-card[data-sortable]");if(!e)return;const a=e.closest(".list");if(!a||d.isLocked(y))return;const i=e.dataset.sortable,n=d.getSettings(),s=(i==="habit"?n.habitSort:n.taskSort)||"default";s!=="default"&&s!=="custom"&&(i==="habit"?d.setHabitSort("custom"):d.setTaskSort("custom"),m("Switched to Custom order so your drag sticks"));const r=t.target.closest(".drag-handle");r&&t.preventDefault(),ma(),D.list=a,D.card=e,D.fromHandle=!!r,D.startX=t.clientX,D.startY=t.clientY,D.order0=ti(a,i).join("|"),D.timer=setTimeout(()=>{D.timer=null,!(!D.card||!D.card.isConnected)&&(D.dragging=!0,navigator.vibrate&&navigator.vibrate(15),D.card.classList.add("is-dragging"),D.list.classList.add("is-reordering"),document.body.classList.add("is-reordering-body"),m("Drag to reorder, lift to drop"))},r?io:no)},!0),document.addEventListener("pointermove",t=>{if(D.timer&&D.card&&!D.fromHandle&&(Math.abs(t.clientX-D.startX)>pn||Math.abs(t.clientY-D.startY)>pn)){ma(),D.list=null;return}if(!D.dragging||!D.card)return;t.preventDefault();const e=D.card,a=D.list;if(!a)return;const i=t.clientY,n=e.dataset.sortable,s=[...a.querySelectorAll(".item-card[data-sortable]")].filter(o=>o!==e&&o.dataset.sortable===n);let r=!1;for(const o of s){const l=o.getBoundingClientRect();if(i<l.top+l.height/2){a.insertBefore(e,o),r=!0;break}}r||a.appendChild(e)},{passive:!1}),document.addEventListener("pointerup",()=>fn(D.dragging)),document.addEventListener("pointercancel",()=>fn(!1)),document.addEventListener("contextmenu",t=>{(D.dragging||D.card)&&t.preventDefault()}),document.addEventListener("touchmove",t=>{D.dragging&&t.preventDefault()},{passive:!1}),document.addEventListener("click",t=>{D.swallowClick&&(t.stopPropagation(),t.preventDefault())},!0))}function oo(){const t=document.getElementById("lock-time"),e=document.getElementById("auto-lock");t&&t.addEventListener("change",()=>{d.setLockTime(t.value),m(`Lock time set to ${t.value}`),h()}),e&&e.addEventListener("change",()=>{d.setAutoLock(e.checked),m(e.checked?"Auto-lock on":"Auto-lock off"),h()}),document.querySelectorAll("[data-cat-color]").forEach(i=>{i.addEventListener("input",()=>{var s;d.updateCategory(i.dataset.catColor,{color:i.value});const n=(s=i.closest(".cat-manage-card"))==null?void 0:s.querySelector(".cat-swatch");n&&(n.style.background=i.value)})}),document.querySelectorAll("[data-cat-goals]").forEach(i=>{const n=()=>{const s=i.dataset.catGoals,r=i.closest(".cat-manage-card");if(!r)return;const o=ee((d.getCategories().find(g=>g.id===s)||{}).goals||""),l=ae(ee(i.value))!==ae(o),c=r.querySelector('[data-action="save-cat-goals"]');c&&(c.textContent=l?"Save goals":"Saved");const f=r.querySelector('[data-action="reset-cat-goals"]');f&&(f.hidden=!l);const b=r.querySelector(".cat-goal-hint");b&&(b.textContent=l?"Unsaved changes — press Save to keep them offline and in backups.":"Saved on this device and included in every backup.")};i.addEventListener("input",()=>{Ot.set(i.dataset.catGoals,i.value),n()}),i.addEventListener("change",n)});const a=document.getElementById("backup-file");a&&a.addEventListener("change",()=>{const i=a.files[0];if(!i)return;const n=new FileReader;n.onload=()=>{Xn(String(n.result||""),i.name),a.value=""},n.onerror=()=>{m("Couldn't read that file."),a.value=""},n.readAsText(i)})}function m(t){const e=document.getElementById("toast");e&&(e.textContent=t,e.classList.add("show"),setTimeout(()=>e.classList.remove("show"),1800))}function _t(){const t=d.getTheme();document.documentElement.dataset.theme=t;const e=document.querySelector('meta[name="theme-color"]');e&&(e.content=t==="light"?"#f3f1ea":"#0e1116")}function p(t){return String(t||"").split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;").split('"').join("&quot;")}function G(){return d.isLocked(y)?(m("This report is locked. Unlock it in Settings."),!0):!1}function Ha(t){return{mode:(t==null?void 0:t.mode)||"forever",until:(t==null?void 0:t.until)||"",weekdays:Array.isArray(t==null?void 0:t.weekdays)?t.weekdays.map(Number):[],monthDays:Array.isArray(t==null?void 0:t.monthDays)?t.monthDays.map(Number):[],yearDays:Array.isArray(t==null?void 0:t.yearDays)?[...t.yearDays]:[],customDates:Array.isArray(t==null?void 0:t.customDates)?[...t.customDates]:[],exceptDates:Array.isArray(t==null?void 0:t.exceptDates)?[...t.exceptDates]:Array.isArray(t==null?void 0:t.exceptions)?[...t.exceptions]:[]}}function ro(t){const e=d.findHabit(t);e&&(x="pin",w={kind:"habit",id:t,title:e.name,pin:e.pin?Ha(e.pin):{mode:"forever",until:"",weekdays:[],monthDays:[],yearDays:[],customDates:[],exceptDates:[]},_exceptCal:j(y),_customCal:j(y),_yearMonth:"01"})}function lo(t){const e=d.findTask(y,t);if(!e)return;const a=e.sourcePinId?d.findPinnedTask(e.sourcePinId):null;x="pin",w={kind:"task",id:t,title:e.title,pin:a!=null&&a.pin?Ha(a.pin):{mode:"forever",until:"",weekdays:[],monthDays:[],yearDays:[],customDates:[],exceptDates:[]},_exceptCal:j(y),_customCal:j(y),_yearMonth:"01"}}function co(t){const e=d.findPinnedTask(t);e&&(x="pin",w={kind:"template",id:t,title:e.title,pin:e.pin?Ha(e.pin):{mode:"forever",until:"",weekdays:[],monthDays:[],yearDays:[],customDates:[],exceptDates:[]},_exceptCal:j(y),_customCal:j(y),_yearMonth:"01"})}function uo(t){var c;const e=t.querySelector('input[name="mode"]').value,a=((c=t.querySelector('input[name="until"]'))==null?void 0:c.value)||"",i=[...t.querySelectorAll(".weekday.on")].map(f=>Number(f.dataset.day)),n=[...t.querySelectorAll(".monthday.on")].map(f=>Number(f.dataset.day)),s=w&&w.pin||{},r=Array.isArray(s.yearDays)?s.yearDays:[],o=Array.isArray(s.customDates)?s.customDates:[],l=Array.isArray(s.exceptDates)?s.exceptDates:[];return e==="until"&&!a?(m("Pick an until date"),null):e==="weekly"&&!i.length?(m("Pick at least one weekday"),null):e==="monthly"&&!n.length?(m("Pick at least one day of month"),null):e==="yearly"&&!r.length?(m("Add at least one yearly date"),null):e==="custom"&&!o.length?(m("Pick at least one custom date"),null):{mode:e,until:a,weekdays:i,monthDays:n,yearDays:r,customDates:o,exceptDates:l}}function qt(t,e,a){const i=e instanceof Blob?e:new Blob([e],{type:a||"text/plain;charset=utf-8"}),n=URL.createObjectURL(i),s=document.createElement("a");s.href=n,s.download=t,document.body.appendChild(s),s.click(),setTimeout(()=>{document.body.removeChild(s),URL.revokeObjectURL(n)},500)}function Vt(t){const e=String(t??"");return/[",\n]/.test(e)?`"${e.replace(/"/g,'""')}"`:e}function Ia(t,e){const[a,i]=d.resolveRange(t,e||y);return{range:t,start:a,end:i,rows:d.exportRows(a,i)}}function gn(t,e){const a=t||w&&w.range||"day",{start:i,end:n,rows:s}=Ia(a,e),r=[];r.push(["Second Mind export",`${i} to ${n}`].map(Vt).join(",")),r.push(["Date","Type","Name","Category","Tags","Points","Rating","Earned","ConsciousPts","Status","Note/Description"].map(Vt).join(",")),s.forEach(o=>{o.habits.forEach(l=>{r.push([o.date,"Habit",l.name,l.category,(l.tags||[]).join("|"),l.points,l.rating,l.earned,l.consciousPoints,l.status||(l.rating>0?"done":o.locked?"missed":"pending"),l.description||""].map(Vt).join(","))}),o.tasks.forEach(l=>{r.push([o.date,"Task",l.hasImage?`${l.title} [photo]`:l.title,l.category,(l.tags||[]).join("|"),l.points,l.rating||"",l.earned,"",l.status||(l.done?"done":o.locked?"missed":"pending"),l.description||""].map(Vt).join(","))}),r.push([o.date,"Summary",`Earned ${o.earned}/${o.max} (${o.percent}%)`,"","","","","","",o.locked?"locked":"open",o.note||""].map(Vt).join(","))}),qt(`second-mind-${a}-${i}-to-${n}.csv`,"\uFEFF"+r.join(`
`),"text/csv;charset=utf-8"),m("Excel (CSV) exported")}function mn(t,e){const a=t||w&&w.range||"day",{start:i,end:n,rows:s}=Ia(a,e),r={app:"Second Mind",exportedAt:new Date().toISOString(),range:a,start:i,end:n,days:s};qt(`second-mind-${a}-${i}-to-${n}.json`,JSON.stringify(r,null,2),"application/json"),m("JSON exported")}function hn(t,e){const a=t||w&&w.range||"day",{start:i,end:n,rows:s}=Ia(a,e),r=s.map(l=>`
        <section style="margin-bottom:18px;border:1px solid #ddd;border-radius:12px;padding:12px">
          <h2 style="margin:0 0 4px;font-size:16px">${p(l.date)} — ${l.earned}/${l.max} pts (${l.percent}%)</h2>
          <p style="margin:0 0 8px;font-size:12px;color:#555">Habits ${l.habitScore} + Conscious ${l.consciousScore} + Tasks ${l.taskScore} · ${l.locked?"Locked":"Open"}${l.note?` · Note: ${p(l.note)}`:""}</p>
          <table style="width:100%;border-collapse:collapse;font-size:12px">
            <thead><tr><th align="left">Type</th><th align="left">Name</th><th align="left">Category</th><th>Points</th><th>Rating</th><th>Earned</th><th>Status</th></tr></thead>
            <tbody>
              ${l.habits.map(c=>`<tr><td>Habit</td><td>${p(c.name)}${c.description?` (${p(c.description)})`:""}</td><td>${p(c.category)}</td><td align="center">${c.points}${c.consciousPoints?`+${c.consciousPoints}🧠`:""}</td><td align="center">${c.rating||"-"}/5</td><td align="center">${c.earned}</td><td align="center">${c.status||(c.rating>0?"done":l.locked?"missed":"pending")}</td></tr>`).join("")}
              ${l.tasks.map(c=>`<tr><td>Task</td><td>${p(c.title)}${c.hasImage?" 📷":""}${c.description?` (${p(c.description)})`:""}</td><td>${p(c.category)}</td><td align="center">${c.points}</td><td align="center">${c.rating?`${c.rating}/5`:"-"}</td><td align="center">${c.earned}</td><td align="center">${c.status||(c.done?"done":l.locked?"missed":"pending")}</td></tr>`).join("")}
            </tbody>
          </table>
        </section>
      `).join(""),o=window.open("","_blank");if(!o){m("Popup blocked — allow popups to export PDF");return}o.document.write(`<!DOCTYPE html><html><head><title>Second Mind ${i} to ${n}</title></head><body style="font-family:sans-serif;padding:24px"><h1>Second Mind — ${i} to ${n}</h1>${r}<script>window.onload=function(){window.print()}<\/script></body></html>`),o.document.close(),m("PDF print view opened")}document.addEventListener("click",t=>{const e=t.target.closest("[data-screen]");if(e){R=e.dataset.screen,h();return}const a=t.target.closest("[data-action]");if(!a)return;const i=a.dataset.action;if(i==="close-modal"){if(x==="image"){x=null,w=null,h();return}(t.target.classList.contains("modal-backdrop")||a.classList.contains("ghost-btn"))&&(x=null,w=null,h());return}if(i==="note-bullets"){on("bullets");return}if(i==="note-numbered"){on("numbered");return}if(i==="values-bullets"){rn("bullets");return}if(i==="values-numbered"){rn("numbered");return}if(i==="pick-task-image"){const n=document.getElementById("task-image-input");n?n.click():m("Photo picking needs a browser file picker");return}if(i==="remove-task-image"){w&&(w._image="",h(),m("Photo removed — save to apply"));return}if(i==="view-task-image"){const n=d.findTask(y,a.dataset.id),s=n&&n.image?n.image:w&&(w._image||w.image)||"";if(!s){m("No photo on this task");return}x="image",w={image:s,title:n&&n.title||"Task photo"},h();return}if(i==="prev-day"&&en(-1),i==="next-day"&&en(1),i==="reload-app"){window.location.reload();return}if(i==="set-theme"){const n=a.dataset.theme==="light"?"light":"dark";d.setTheme(n),_t(),m(n==="light"?"Light mode on":"Dark mode on")}if(i==="install-app"){_s();return}if(i==="check-updates"){Ws();return}if(i==="apply-update"){Zn();return}if(i==="backup-now"){js();return}if(i==="trigger-import"){const n=document.getElementById("backup-file");n&&n.click();return}if(i==="choose-folder"){Hs();return}if(i==="grant-folder"){Fs();return}if(i==="forget-folder"){Is();return}if(i==="drive-save-id"){const n=document.getElementById("drive-client-id"),s=d.setDriveClientId(n?n.value:"");m(s?"Client ID saved — press Connect to turn sync on":"That does not look like a Client ID"),h();return}if(i==="drive-clear-id"){d.setDriveClientId(""),m("Client ID cleared — sync is off"),h();return}if(i==="drive-connect"){Rs();return}if(i==="drive-disconnect"){d.disconnectDrive(),m("Drive sync turned off — your data stays where it is"),h();return}if(i==="drive-enable"){d.resumeDriveSetup(),h();return}if(i==="drive-sync-now"){Os();return}if(i==="restore-backup"){Gs(a.dataset.name);return}if(i==="goto-settings"&&(R="settings"),i==="open-add-habit"&&(x="habit",w=null),i==="open-add-task"){if(G())return;x="task",w={category:"mentally"}}if(i==="open-add"){if(G())return;x="choose",w={category:"mentally"}}if(i==="toggle-edit"&&(B=!B),i==="toggle-settings-edit"){St=!St,h();return}if(i==="toggle-setting-habit"){const n=a.dataset.id;ve.has(n)?ve.delete(n):ve.add(n),h();return}if(i==="toggle-settings-section"){const n=a.dataset.id;Jt.has(n)?Jt.delete(n):Jt.add(n),n==="tutorials"&&!Jt.has("tutorials")&&($e=null),h();return}if(i==="open-tutorial"){$e=$e===a.dataset.id?null:a.dataset.id,h();return}if(i==="toggle-activity-cat"){const n=a.dataset.id;we.has(n)?we.delete(n):we.add(n),h();return}if(i==="toggle-home-view"){d.setHomeView(d.getHomeView()==="full"?"compact":"full"),h();return}if(i==="toggle-home-card"){const n=a.dataset.id;Zt.has(n)?Zt.delete(n):Zt.add(n),h();return}if(i==="add-goal-item"){const n=a.dataset.id,s=document.getElementById(`goal-item-input-${n}`),r=d.addGoalItem(n,s?s.value:"");r.ok?m("Task added to goal"):m(r.reason||"Could not add a task"),h();return}if(i==="toggle-goal-item"){const{id:n,item:s,done:r}=a.dataset,o=d.setGoalItemDone(n,s,r!=="true");if(!o.ok){m(o.reason||"Could not update the task"),h();return}const l=o.awarded&&o.awarded.length?o.awarded:d.checkGoals(y);l.length?m(`🏅 Reward earned: ${l[0].rewardTitle}!`):o.revoked&&o.revoked.length?m("Badge returned — not earned yet"):o.autoLocked&&m("All tasks done — goal completed and locked 🔒"),h();return}if(i==="toggle-goal-slot"){const{id:n,item:s,slot:r,on:o}=a.dataset,l=d.setGoalItemSlot(n,s,r,o!=="true");if(!l.ok){m(l.reason||"Could not update the day"),h();return}const c=l.awarded||[];c.length?m(`🏅 Reward earned: ${c[0].rewardTitle}!`):l.autoLocked?m("All days ticked — goal completed and locked 🔒"):l.revoked&&l.revoked.length?m("Badge returned — not earned yet"):l.done&&m("Task complete ✓ — every pinned day ticked"),h();return}if(i==="remove-goal-item"){const n=d.removeGoalItem(a.dataset.id,a.dataset.item);m(n.ok?"Task removed from goal":n.reason||"Could not remove"),h();return}if(i==="lock-goal"){const n=d.findGoal(a.dataset.id),s=d.setGoalLocked(a.dataset.id,!0),r=n&&s.ok&&n.tasks.length>0&&!n.tasks.every(o=>d.goalTaskDone(o));s.ok?m(r?"Goal locked and terminated ⛔":"Goal locked 🔒"):m(s.reason||"Could not lock"),h();return}if(i==="unlock-goal"){const n=d.setGoalLocked(a.dataset.id,!1);m(n.ok?"Goal unlocked":n.reason||"Could not unlock"),h();return}if(i==="move-pinned-habit"){const n=d.getPinnedHabits(),s=n.findIndex(o=>o.id===a.dataset.id),r=s+(Number(a.dataset.dir)||0);if(s>=0&&r>=0&&r<n.length){const o=n[s];n[s]=n[r],n[r]=o,d.setPinnedHabitOrder(n.map(l=>l.id))}h();return}if(i==="move-pinned-task"){const n=d.getPinnedTasks(),s=n.findIndex(o=>o.id===a.dataset.id),r=s+(Number(a.dataset.dir)||0);if(s>=0&&r>=0&&r<n.length){const o=n[s];n[s]=n[r],n[r]=o,d.setPinnedTaskOrder(n.map(l=>l.id))}h();return}if(i==="open-habit-activity-date"){y=a.dataset.date,R="today",h();return}if(i==="open-edit-habit"){const n=d.findHabit(a.dataset.id);if(!n)return;x="edit-habit";const s=d.habitUpgradeEntry(n.id,y);w={id:n.id,name:n.name,description:n.description||"",points:d.habitPoints(n.id,y),category:n.category,tags:n.tags||[],consciousPoints:Number(n.consciousPoints)||0,upgradeType:s?s.type:"count",upgradeValue:s?s.value:"",_upgradeDirection:"upgrade",_upgradePanel:!1}}if(i==="open-upgrade-habit"){const n=d.findHabit(a.dataset.id);if(!n)return;x="edit-habit";const s=d.habitUpgradeEntry(n.id,y);w={id:n.id,name:n.name,description:n.description||"",points:d.habitPoints(n.id,y),category:n.category,tags:n.tags||[],consciousPoints:Number(n.consciousPoints)||0,upgradeType:s?s.type:"count",upgradeValue:s?s.value:"",_upgradeDirection:"upgrade",_upgradePanel:!0}}if(i==="open-edit-task"){if(G())return;const n=d.findTask(y,a.dataset.id);if(!n)return;x="edit-task",w={id:n.id,title:n.title,points:n.points,description:n.description,category:n.category,tags:n.tags||[],rating:Number(n.rating)||0,image:n.image||"",_image:void 0}}if(i==="open-edit-pinned-task"){const n=d.findPinnedTask(a.dataset.id);if(!n)return;x="edit-pinned-task",w={id:n.id,title:n.title,points:n.points,description:n.description||"",category:n.category,tags:n.tags||[],rating:0,image:n.image||"",_image:void 0}}if(i==="toggle-badges"&&(Le=!Le),i==="open-goal"&&(x="goal",w={kind:"habit-streak",targetDays:7,tier:"bronze"}),i==="open-edit-goal"){const n=d.getGoals().find(s=>s.id===a.dataset.id);if(!n)return;x="edit-goal",w={...n}}if(i==="remove-goal"&&(d.removeGoal(a.dataset.id),m("Goal removed")),i==="remove-badge"&&(d.removeBadge(a.dataset.id),m("Badge removed")),i==="rate-habit"){if(G())return;const s=d.habitRating(y,a.dataset.id)===Number(a.dataset.rating)?0:Number(a.dataset.rating);d.setHabitRating(y,a.dataset.id,s)}if(i==="rate-task"){if(G())return;const n=d.findTask(y,a.dataset.id);if(!n)return;const r=(Number(n.rating)||0)===Number(a.dataset.rating)?0:Number(a.dataset.rating);d.setTaskRating(y,a.dataset.id,r)}if(i==="open-export"&&(x="export",w={range:w&&w.range||"day"}),i==="set-export-range"){x="export",w={range:a.dataset.range||"day"},h();return}if(i==="do-export"){const n=a.dataset.format,s=w&&w.range||"day";n==="csv"&&gn(s,y),n==="json"&&mn(s,y),n==="pdf"&&hn(s,y),x=null,w=null}if(i==="set-histexp-range"){z=["day","week","month","year"].includes(a.dataset.range)?a.dataset.range:"day",h();return}if(i==="histexp-do"){const n=a.dataset.format;let s=y;if(z==="day"||z==="week"){const r=document.getElementById("histexp-date");r&&/^\d{4}-\d{2}-\d{2}$/.test(r.value)&&(s=r.value)}else if(z==="month"){const r=document.getElementById("histexp-month");r&&/^\d{4}-\d{2}$/.test(r.value)&&(s=`${r.value}-15`)}else if(z==="year"){const r=document.getElementById("histexp-year"),o=Number(r&&r.value);Number.isInteger(o)&&o>=2e3&&o<=2100&&(s=`${String(o)}-06-15`)}n==="csv"&&gn(z,s),n==="json"&&mn(z,s),n==="pdf"&&hn(z,s);return}if(i==="history-cal-nav"){const n=Me||j(y);Me=Ht(n,Number(a.dataset.dir)||0),h();return}if(i==="locked-cal-nav"){const n=He||j(y);He=Ht(n,Number(a.dataset.dir)||0),h();return}if(i==="notes-cal-nav"){const n=pa||j(y);pa=Ht(n,Number(a.dataset.dir)||0),h();return}if(i==="show-day-note"){const n=a.dataset.date;if(!d.noteFor(n))return;Mt=n,h();return}if(i==="toggle-locked-day"){const n=a.dataset.date,s=_.indexOf(n);s>=0?_.splice(s,1):_.push(n),h();return}if(i==="lock-selected"){const n=[..._].sort();if(!n.length)return;const s=d.lockDays(n);_=[],m(s===1?`Locked ${s} day`:`Locked ${s} days`),h();return}if(i==="unlock-selected"){const n=[..._].sort();if(!n.length)return;const s=d.unlockDays(n);_=[],m(s===1?`Unlocked ${s} day`:`Unlocked ${s} days`),h();return}if(i==="submit-day"&&(d.submitDay(y),m("Report submitted and locked")),i==="unlock-day"&&(d.unlockDay(a.dataset.date),m("Report unlocked")),i==="toggle-habit"){if(G())return;d.toggleHabit(y,a.dataset.id),h()}if(i==="toggle-task"){if(G())return;d.toggleTask(y,a.dataset.id),h()}if(i==="remove-task"){if(!B||G())return;d.removeTask(y,a.dataset.id),h()}if(i==="remove-habit"&&(d.removeHabit(a.dataset.id),h()),i==="restore-habit"){const n=d.restoreHabit(a.dataset.id);m(n.ok?"Habit restored":n.reason||"Could not restore that habit"),h()}if(i==="toggle-archive"){Ct=!Ct,h();return}if(i==="archive-habit"){d.removeHabit(a.dataset.id),Ct=!0,m("Habit archived — restore it from the Archive"),h();return}if(i==="archive-task"){if(G())return;const n=d.archiveTask(y,a.dataset.id);if(!n.ok){m(n.reason||"Could not archive that task");return}Ct=!0,m("Task archived — restore it from the Archive"),h();return}if(i==="restore-task"){const n=d.isLocked(y)?d.todayKey():y,s=d.restoreTask(a.dataset.id,n);s.ok?m(s.from&&s.from!==n?`Task restored to ${n} — forwarded from ${s.from}`:`Task restored to ${n}`):m(s.reason||"Could not restore that task"),n!==y&&(y=n),h();return}if(i==="delete-archived-task"){if(!B||!window.confirm("Delete this archived task permanently? This cannot be undone."))return;const n=d.deleteArchivedTask(a.dataset.id);m(n.ok?"Task deleted permanently":n.reason||"Could not delete"),h();return}if(i==="delete-archived-habit"){if(!window.confirm("Delete this archived habit permanently? This cannot be undone."))return;const n=d.deleteArchivedHabit(a.dataset.id);m(n.ok?"Habit deleted permanently":n.reason||"Could not delete"),h();return}if(i==="open-pin-habit"&&ro(a.dataset.id),i==="open-replace-habit"){if(G())return;const n=d.findHabit(a.dataset.id);if(!n)return;const s=d.habitReplaceDays(y,n.id);x="replace",w={id:n.id,title:n.name,from:y,info:s};return}if(i==="pick-replace-day"){const n=document.querySelector('.sheet input[name="targetDate"]');n&&(n.value=a.dataset.date),document.querySelectorAll(".replace-day-chip").forEach(s=>{s.classList.toggle("on",s.dataset.date===a.dataset.date)});return}if(i==="undo-replace-habit"){if(G())return;const n=d.undoReplaceHabit(a.dataset.id,a.dataset.from,a.dataset.to);m(n.ok?"Habit is due on this day again":n.reason||"Could not undo that"),h();return}if(i==="open-forward-task"){if(G())return;const n=d.findTask(y,a.dataset.id);if(!n)return;x="forward",w={kind:"task",id:n.id,title:n.title,from:y}}if(i==="open-pin-task"){if(G())return;lo(a.dataset.id)}if(i==="open-pin-template"&&co(a.dataset.id),i==="unpin-template"&&(d.unpinTaskTemplate(a.dataset.id),m("Task unpinned — removed from today and all upcoming days")),i==="pick-date"&&(y=a.dataset.date,dt=0,R="today"),i==="set-chart-range"){et=["week","month","year"].includes(a.dataset.range)?a.dataset.range:"week",pt=0,h();return}if(i==="set-chart-cat"){it=a.dataset.cat||"all",h();return}if(i==="week-nav"){dt+=Number(a.dataset.dir)||0,dt>0&&(dt=0),h();return}if(i==="chart-nav"){pt+=Number(a.dataset.dir)||0,pt>0&&(pt=0),h();return}if(i==="add-category"){const n=document.getElementById("new-category"),s=d.addCategory(n?n.value:"");m(s.ok?"Category added":s.reason||"Couldn't add category"),h();return}if(i==="rename-category"){const n=d.getCustomCategories().find(o=>o.id===a.dataset.id),s=window.prompt("Rename category",n?n.label:"");if(s==null)return;const r=d.renameCategory(a.dataset.id,s);m(r.ok?"Category renamed":r.reason||"Couldn't rename"),h();return}if(i==="delete-category"){if(!window.confirm("Delete this category? Its habits and tasks move to Mentally."))return;const n=d.deleteCategory(a.dataset.id);n.ok&&$t.delete(a.dataset.id),m(n.ok?"Category deleted":n.reason||"Couldn't delete"),h();return}if(i==="rename-tag"){const n=window.prompt("Rename tag everywhere",a.dataset.tag||"");if(n==null)return;const s=d.renameTag(a.dataset.tag,n);m(s.ok?s.merged?"Tags merged":"Tag renamed everywhere":s.reason||"Couldn't rename"),h();return}if(i==="delete-tag"){if(!window.confirm(`Delete tag "#${a.dataset.tag}" from all habits and tasks?`))return;d.deleteTag(a.dataset.tag),m("Tag deleted everywhere"),h();return}if(i==="add-tag"){const n=document.getElementById("tag-habit-pick"),s=document.getElementById("new-tag"),r=d.addTagToHabit(n?n.value:"",s?s.value:"");m(r.ok?"Tag added to habit":r.reason||"Couldn't add tag"),h();return}if(i==="set-points"){const n=document.querySelector('input[name="points"]');n&&(n.value=a.dataset.points),document.querySelectorAll(".chip-row .chip[data-points]").forEach(s=>s.classList.remove("on")),a.classList.add("on");return}if(i==="set-category"){const n=a.closest("form")||a.closest(".sheet"),s=n.querySelector('input[name="category"]');s&&(s.value=a.dataset.category),n.querySelectorAll(".cat-row .chip").forEach(r=>r.classList.remove("on")),a.classList.add("on");return}if(i==="set-rating"){const n=a.closest(".sheet")||a.closest("form")||document,s=n.querySelector('input[name="rating"]');s&&(s.value=a.dataset.rating),n.querySelectorAll(".rating-row .chip").forEach(r=>r.classList.remove("on")),a.classList.add("on");return}if(i==="set-conscious"){const n=a.closest(".sheet")||a.closest("form")||document,s=n.querySelector('input[name="consciousPoints"]');s&&(s.value=a.dataset.conscious),n.querySelectorAll(".conscious-row .chip").forEach(r=>r.classList.remove("on")),a.classList.add("on");return}if(i==="set-upgrade-type"){const n=a.closest(".sheet")||a.closest("form")||document,s=a.dataset.type==="degree"?"degree":"count",r=n.querySelector('input[name="upgradeType"]');r&&(r.value=s),n.querySelectorAll(".upgrade-type-row .chip").forEach(l=>l.classList.remove("on")),a.classList.add("on");const o=n.querySelector('input[name="upgrade"]');o&&(o.type=s==="degree"?"text":"number",o.placeholder=s==="degree"?"e.g. Advanced":"e.g. 20",s==="degree"?(o.removeAttribute("min"),o.removeAttribute("max"),o.removeAttribute("step"),o.removeAttribute("inputmode"),o.maxLength=40):(o.min="1",o.max="9999",o.step="1",o.inputMode="numeric",o.removeAttribute("maxlength")));return}if(i==="toggle-upgrade-panel"){const s=(a.closest(".sheet")||a.closest("form")||document).querySelector(".upgrade-panel");s&&(s.hidden=!s.hidden,a.setAttribute("aria-expanded",s.hidden?"false":"true"));return}if(i==="set-upgrade-direction"){const n=a.closest(".sheet")||a.closest("form")||document,s=a.dataset.direction==="degrade"?"degrade":"upgrade",r=n.querySelector('input[name="upgradeDirection"]');r&&(r.value=s),n.querySelectorAll(".upgrade-dir-row .chip").forEach(o=>o.classList.remove("on")),a.classList.add("on"),qn(n);return}if(i==="set-goal-kind"){const n=a.closest(".sheet")||document,s=n.querySelector('input[name="kind"]');s&&(s.value=a.dataset.kind),n.querySelectorAll(".goal-kind-row .chip").forEach(f=>f.classList.remove("on")),a.classList.add("on");const r=a.dataset.kind,o=n.querySelector(".goal-target-habit"),l=n.querySelectorAll(".goal-target-task, .goal-target-days"),c=n.querySelector(".goal-attach");o&&(o.style.display=r==="habit-streak"?"":"none"),l.forEach(f=>{f.style.display=r==="task-streak"||r==="perfect-days"?"":"none"}),c&&(c.style.display=r==="task-list"?"":"none"),w&&(w.kind=r);return}if(i==="set-goal-tier"){const n=a.closest(".sheet")||document,s=n.querySelector('input[name="tier"]');s&&(s.value=a.dataset.tier),n.querySelectorAll(".goal-tier-row .chip").forEach(r=>r.classList.remove("on")),a.classList.add("on");return}if(i==="pin-mode"){const n=a.closest("form"),s=a.dataset.mode;n.querySelector('input[name="mode"]').value=s,n.querySelectorAll(".pin-modes .chip").forEach(o=>o.classList.remove("on")),a.classList.add("on");const r=(o,l)=>{const c=n.querySelector(o);c&&(c.style.display=l?"":"none")};r(".pin-until",s==="until"),r(".pin-weekdays",s==="weekly"),r(".pin-monthdays",s==="monthly"),r(".pin-yeardays",s==="yearly"),w&&w.pin&&(w.pin.mode=s);return}if(i==="toggle-weekday"){a.classList.toggle("on");return}if(i==="toggle-monthday"){a.classList.toggle("on");return}if(i==="pin-cal-nav"){if(!w)return;const n=a.dataset.target,s=Number(a.dataset.dir)||0;n==="except"?w._exceptCal=Ht(w._exceptCal||j(y),s):w._customCal=Ht(w._customCal||j(y),s),h();return}if(i==="toggle-pin-date"){if(!w||!w.pin)return;const n=a.dataset.target,s=a.dataset.date,r=n==="custom"?"customDates":"exceptDates",o=Array.isArray(w.pin[r])?[...w.pin[r]]:[],l=o.indexOf(s);l>=0?o.splice(l,1):(o.push(s),o.length>365&&o.shift()),w.pin[r]=o.sort(),h();return}if(i==="add-year-day"){if(!w||!w.pin)return;const n=a.closest("form")||document,s=n.querySelector("#year-month-select"),r=n.querySelector("#year-day-select");s&&(w._yearMonth=s.value);const o=`${s?s.value:"01"}-${r?r.value:"01"}`,l=Array.isArray(w.pin.yearDays)?[...w.pin.yearDays]:[];l.includes(o)||l.push(o),w.pin.yearDays=l.sort(),h();return}if(i==="remove-year-day"){if(!w||!w.pin)return;const n=a.dataset.date;w.pin.yearDays=(w.pin.yearDays||[]).filter(s=>s!==n),h();return}if(i==="clear-pin"){const n=a.closest("form"),s=n.dataset.kind,r=n.dataset.id;let o=!1;if(s==="habit"&&d.unpinHabit(r),s==="task"){const l=d.findTask(y,r);l!=null&&l.sourcePinId&&(d.unpinTaskTemplate(l.sourcePinId),o=!0)}s==="template"&&(d.unpinTaskTemplate(r),o=!0),x=null,w=null,m(o?"Task unpinned — removed from today and all upcoming days":"Unpinned"),h();return}if(i==="lock-profile"){d.setProfileLocked(!0),m("Profile locked — read only"),h();return}if(i==="unlock-profile"){d.setProfileLocked(!1),m("Profile unlocked"),h();return}if(i==="add-whoami"){const n=document.getElementById("new-whoami"),s=d.addWhoAmI(n?n.value:"");m(s.ok?"Added":s.reason||"Couldn't add"),h();return}if(i==="move-whoami"){d.moveWhoAmI(a.dataset.id,Number(a.dataset.dir)||0),h();return}if(i==="remove-whoami"){d.removeWhoAmI(a.dataset.id),m("Removed"),h();return}if(i==="add-lifearea"){const n=document.getElementById("new-lifearea"),s=d.addLifeArea(n?n.value:"");s.ok?(Nt=s.id,m("Life area added")):m(s.reason||"Couldn't add"),h();return}if(i==="toggle-lifearea"){const n=a.dataset.id;Nt=Nt===n?null:n,h();return}if(i==="move-lifearea"){d.moveLifeArea(a.dataset.id,Number(a.dataset.dir)||0),h();return}if(i==="toggle-cat"){const n=a.dataset.id;$t.has(n)?$t.delete(n):$t.add(n),h();const s=document.querySelector(`[data-action="toggle-cat"][data-id="${CSS.escape(n)}"]`);s&&s.focus({preventScroll:!0});return}if(i==="expand-cats"){d.getCategories().forEach(n=>$t.add(n.id)),h();return}if(i==="collapse-cats"){$t.clear(),h();return}if(i==="save-cat-goals"){const n=a.dataset.id,s=document.querySelector(`[data-cat-goals="${CSS.escape(n)}"]`),r=s?s.value:Ot.get(n)||"",o=ee(r);d.updateCategory(n,{goals:ae(o)}),Ot.delete(n),m(o.length?`Saved ${o.length} goal${o.length===1?"":"s"} for ${gt(n)}`:`Cleared goals for ${gt(n)}`),h();return}if(i==="reset-cat-goals"){const n=a.dataset.id;Ot.delete(n),h();return}if(i==="remove-lifearea"){d.removeLifeArea(a.dataset.id),Nt===a.dataset.id&&(Nt=null),m("Life area removed"),h();return}if(i==="set-pgoal-term"){rt=["short","medium","long"].includes(a.dataset.term)?a.dataset.term:"short",jt=d.profileGoalDurations()[rt][0],h();return}if(i==="set-pgoal-filter"){ke=["all","short","medium","long"].includes(a.dataset.filter)?a.dataset.filter:"all",h();return}if(i==="add-pgoal"){const n=document.getElementById("new-pgoal"),s=document.getElementById("new-pgoal-duration"),r=d.addProfileGoal(n?n.value:"",rt,s?s.value:jt);m(r.ok?`Goal added ${Se(rt)}`:r.reason||"Couldn't add"),h();return}if(i==="remove-pgoal"){d.removeProfileGoal(a.dataset.id),m("Goal removed"),h();return}if(i==="add-idea"){const n=document.getElementById("new-idea"),s=String(n?n.value:"").trim().slice(0,200);if(!s){m("Write an idea first");return}if(d.isProfileLocked()){m("Profile is locked");return}const r=String(d.getProfile().ideas||"").split(`
`).map(o=>o.trim()).filter(Boolean);r.push(`• ${s}`),d.setProfileField("ideas",r.join(`
`)),m("Idea added"),h();return}if(i==="remove-idea"){if(d.isProfileLocked())return;const n=Number(a.dataset.index),s=String(d.getProfile().ideas||"").split(`
`).filter(r=>r.trim());if(!Number.isInteger(n)||n<0||n>=s.length)return;s.splice(n,1),d.setProfileField("ideas",s.join(`
`)),m("Idea removed"),h();return}if(i==="add-quote"){const n=document.getElementById("new-quote"),s=document.getElementById("new-quote-author"),r=d.addQuote(n?n.value:"",s?s.value:"");m(r.ok?"Quote added":r.reason||"Couldn't add"),h();return}if(i==="toggle-quote-fav"){d.toggleQuoteFav(a.dataset.id),h();return}if(i==="remove-quote"){d.removeQuote(a.dataset.id),m("Quote removed"),h();return}if(i==="toggle-quotes"){Xt=!Xt,h();return}h()});document.addEventListener("submit",t=>{const e=t.target.closest("[data-form]");if(!e)return;t.preventDefault();const a=e.dataset.form;if(a==="habit"||a==="task"||a==="edit-habit"||a==="edit-task"||a==="edit-pinned-task"){const i=new FormData(e),n=String(i.get("title")||""),s=Number(i.get("points")||0),r=String(i.get("category")||"mentally"),o=String(i.get("description")||""),l=String(i.get("tags")||""),c=Math.max(0,Math.min(5,Number(i.get("rating")||0))),f=Math.max(0,Math.min(100,Number(i.get("consciousPoints")||0))),b=i.get("upgradeType")==="degree"?"degree":"count",g=String(i.get("upgrade")||"").trim(),k=g===""?null:b==="degree"?{type:"degree",value:g.slice(0,40)}:{type:"count",value:Math.max(1,Math.min(9999,Math.round(Number(g)||0)))||null},A=i.get("upgradeDirection")==="degrade"?"degrade":"upgrade",$=Math.max(0,Math.min(100,Number(i.get("upgradePointsDelta")||0)||0));if(!n.trim())return;const v=w&&w._image!==void 0?Y(w._image):Y(w&&w.image);if(a==="habit")d.addHabit(n,s,{description:o,category:r,consciousPoints:f,upgrade:k,tags:l,startFrom:y}),m("Habit added");else if(a==="task"){const T=String(i.get("goalTarget")||"");if(T){const H=d.addGoalItem(T,n);if(!H.ok){m(H.reason||"Could not add the task to the goal");return}const re=d.findGoal(T);m(`Added to goal “${re?re.title:n}”`)}else{if(G())return;d.addTask(y,n,s,{description:o,category:r,rating:c,tags:l,image:v}),m("Task added")}}else if(a==="edit-habit"){const T={name:n,description:o,category:r,consciousPoints:f,upgrade:k,tags:l};if($>0){const H=d.habitPoints(e.dataset.id,y);T.points=Math.max(1,Math.min(100,A==="degrade"?H-$:H+$))}d.updateHabit(e.dataset.id,T,y),m($>0?`Habit updated — points ${A==="degrade"?"decreased":"increased"} to ${T.points}`:"Habit updated")}else if(a==="edit-pinned-task")d.updatePinnedTaskDetails(e.dataset.id,{title:n,description:o,points:s,category:r,tags:l,image:v}),m("Pinned task updated");else{if(G())return;d.updateTask(y,e.dataset.id,{title:n,points:s,description:o,category:r,rating:c,tags:l,image:v}),m("Task updated");const T=String(i.get("goalTarget")||"");if(T){const H=d.addGoalItems(T,[n]);H.ok&&H.added?m(`Attached to goal “${(d.findGoal(T)||{}).title}”`):H.ok?m("Already on that goal’s list"):m(H.reason||"Could not attach to the goal")}}x=null,w=null,h();return}if(a==="pin"){const i=uo(e);if(!i)return;const n=e.dataset.kind,s=e.dataset.id;n==="habit"&&d.pinHabit(s,i),n==="task"&&d.pinTask(y,s,i),n==="template"&&d.updatePinnedTask(s,i),x=null,w=null,m("Pin saved"),h();return}if(a==="replace"){const i=new FormData(e),n=String(i.get("targetDate")||""),s=e.dataset.id,r=w&&w.from||y,o=d.replaceHabit(r,s,n);if(!o.ok){m(o.reason||"Could not replace that habit day");return}x=null,w=null,m(`Habit moved from ${o.from} to ${o.to}`),h();return}if(a==="goal"||a==="edit-goal"){const i=new FormData(e),n=String(i.get("title")||"").trim(),s=String(i.get("kind")||"habit-streak"),r=String(i.get("tier")||"bronze"),o=String(i.get("rewardTitle")||"").trim(),l=Math.max(1,Math.min(365,Number(i.get("targetDays")||7)));if(!n||!o){m("Goal title and reward title are required");return}let c="";if(s==="habit-streak"&&(c=String(i.get("habitTarget")||"")),s==="task-streak"&&(c=String(i.get("taskTarget")||"")),(s==="habit-streak"||s==="task-streak")&&!c){m(s==="habit-streak"?"Pick a habit":"Pin a task first, then pick it");return}if(a==="goal"){const b=d.addGoal({title:n,kind:s,targetId:c,targetDays:l,tier:r,rewardTitle:o});if(s==="task-list"){const g=Array.from(e.querySelectorAll('input[name="attachTask"]:checked')).map(A=>A.value),k=d.addGoalItems(b.id,g);m(k.added?`Goal added with ${k.added} task(s)`:"Goal added")}else m("Goal added")}else if(d.updateGoal(e.dataset.id,{title:n,kind:s,targetId:c,targetDays:l,tier:r,rewardTitle:o}),s==="task-list"){const b=Array.from(e.querySelectorAll('input[name="attachTask"]:checked')).map(k=>k.value),g=d.addGoalItems(e.dataset.id,b);m(g.added?`Goal updated — ${g.added} task(s) attached`:"Goal updated")}else m("Goal updated");const f=d.checkGoals(y);f.length&&m(`🏅 Reward earned: ${f[0].rewardTitle}!`),x=null,w=null,h()}});document.addEventListener("change",t=>{const e=t.target.closest(".sort-select");if(e){const a=e.dataset.sortKind;a==="habit"&&d.setHabitSort(e.value),a==="task"&&d.setTaskSort(e.value),h()}if(t.target&&t.target.id==="show-conscious"&&(d.setShowConscious(t.target.checked),m(t.target.checked?"Conscious points on":"Conscious points hidden"),h()),t.target&&t.target.id==="week-start"&&(d.setWeekStart(Number(t.target.value)),m("Week starts on "+t.target.selectedOptions[0].textContent),h()),t.target&&t.target.id==="new-pgoal-duration"){jt=t.target.value;return}if(t.target&&t.target.id==="year-month-select"&&w&&(w._yearMonth=t.target.value),t.target&&t.target.id==="task-image-input"){const a=t.target.files&&t.target.files[0];if(!a)return;if(!String(a.type||"").startsWith("image/")){m("Please pick an image file"),t.target.value="";return}m("Processing photo…"),rs(a).then(i=>{if(t.target.value="",!i){m("Photo too large or unreadable — try a smaller one");return}w&&(w._image=i,h(),m("Photo attached — save to apply"))})}});function po(){const t=window.visualViewport;if(!t)return;const e=document.documentElement,a=()=>{e.style.setProperty("--vvh",`${Math.max(0,Math.round(t.height))}px`);const i=window.innerHeight-t.height>120;e.classList.toggle("vk-open",i)};t.addEventListener("resize",a),t.addEventListener("scroll",a),a()}po();if("serviceWorker"in navigator){window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js").catch(()=>{})});let t=!1;try{const e=Number(sessionStorage.getItem("dr-reload-at")||0);Date.now()-e<8e3&&(t=!0)}catch{}navigator.serviceWorker.addEventListener("controllerchange",()=>{if(!t){t=!0;try{sessionStorage.setItem("dr-reload-at",String(Date.now()))}catch{}window.location.reload()}})}function fo(){const t=document.getElementById("boot-error");t&&(t.style.display="none")}fo();_t();h();d.initFolderSync().then(t=>{if(t)return t.replaced&&(_t(),m(t.status==="granted"?"Data loaded from your data folder":"Data restored from this device")),t.corrupt&&m("The data file was unreadable — a copy was saved aside, the newest good copy is in use"),Wt(),(R==="settings"||t.replaced||t.corrupt)&&h(),d.initDriveSync().then(e=>{e&&(e.replaced?(_t(),m("Google Drive had newer data — it has been loaded"),h()):R==="settings"&&h())})}).catch(()=>{});window.addEventListener("pagehide",()=>{d.flushFolderWrite().catch(()=>{}),d.flushDriveWrite().catch(()=>{})});document.addEventListener("visibilitychange",()=>{document.hidden&&(d.flushFolderWrite().catch(()=>{}),d.flushDriveWrite().catch(()=>{}))});setInterval(()=>{!document.hidden&&Ma()&&h()},6e4);document.addEventListener("visibilitychange",()=>{!document.hidden&&Ma()&&h()});
