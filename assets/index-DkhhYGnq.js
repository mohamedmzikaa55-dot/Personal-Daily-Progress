(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function a(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=a(i);fetch(i.href,n)}})();const vt="second-mind.json",ve="daily-report.json",va="second-mind-corrupt",Ja="daily-report-fs",ft="kv",He=["dataDir","backupDir"];function Dt(){return typeof window<"u"&&typeof window.showDirectoryPicker=="function"&&typeof indexedDB<"u"}function Qa(){return window.showDirectoryPicker({id:"second-mind-data",mode:"readwrite"})}function Xa(t){return!t||typeof t.queryPermission!="function"?Promise.resolve("granted"):t.queryPermission({mode:"readwrite"}).then(e=>["granted","denied","prompt"].includes(e)?e:"prompt",()=>"prompt")}function Ye(t){return!t||typeof t.requestPermission!="function"?Promise.resolve("granted"):t.requestPermission({mode:"readwrite"}).then(e=>["granted","denied","prompt"].includes(e)?e:"prompt",()=>"prompt")}function Ie(){return new Promise((t,e)=>{if(typeof indexedDB>"u"){e(new Error("no-indexeddb"));return}const a=indexedDB.open(Ja,1);a.onupgradeneeded=()=>{try{a.result.createObjectStore(ft)}catch{}},a.onsuccess=()=>t(a.result),a.onerror=()=>e(a.error)})}function Za(t){return Ie().then(e=>new Promise((a,s)=>{const i=e.transaction(ft,"readonly").objectStore(ft).get(t);i.onsuccess=()=>a(i.result),i.onerror=()=>s(i.error)}))}function Ka(t,e){return Ie().then(a=>new Promise((s,i)=>{const n=a.transaction(ft,"readwrite");n.objectStore(ft).put(e,t),n.oncomplete=()=>s(),n.onerror=()=>i(n.error),n.onabort=()=>i(n.error)}))}function ti(t){return Ie().then(e=>new Promise((a,s)=>{const i=e.transaction(ft,"readwrite");i.objectStore(ft).delete(t),i.oncomplete=()=>a(),i.onerror=()=>s(i.error),i.onabort=()=>s(i.error)}))}async function ei(){for(const t of He)try{const e=await Za(t);if(e)return e}catch{}return null}async function ai(t){await Ka(He[0],t)}async function ii(){await Promise.all(He.map(t=>ti(t).catch(()=>{})))}async function ke(t,e){if(!t)return{missing:!0,raw:"",modified:0,error:"no-folder"};try{const s=await(await t.getFileHandle(e)).getFile();return{missing:!1,raw:await s.text(),modified:Number(s.lastModified)||0,error:""}}catch(a){return a&&(a.name==="NotFoundError"||a.name==="TypeMismatchError")?{missing:!0,raw:"",modified:0,error:""}:{missing:!1,raw:"",modified:0,error:String(a&&a.message||a)}}}async function si(t){const e=await ke(t,vt);if(!e.missing)return{...e,name:vt};const a=await ke(t,ve);return!a.missing&&!a.error?{...a,name:ve}:{...e,name:vt}}async function Fe(t,e,a){if(!t)return{ok:!1,denied:!1,error:"no-folder"};try{const i=await(await t.getFileHandle(e,{create:!0})).createWritable();return await i.write(a),await i.close(),{ok:!0,denied:!1,error:""}}catch(s){return{ok:!1,denied:!!(s&&(s.name==="NotAllowedError"||s.name==="SecurityError")),error:String(s&&s.message||s)}}}function ni(t,e){return Fe(t,`${va}-${Date.now()}.json`,e)}async function oi(t){const e=[];if(!t||typeof t.values!="function")return e;try{for await(const a of t.values())if(!(!a||a.kind!=="file"||!/\.json$/i.test(a.name)))try{const s=await a.getFile();e.push({name:a.name,modified:Number(s.lastModified)||0})}catch{}}catch{return e}return e}function ri(t){const e=String(t||"");return!(!/\.json$/i.test(e)||e===vt||e===ve||e.startsWith(va))}const ka="daily-report-v2",$a="daily-report-v2-meta",jt=[{id:"mentally",label:"Mentally"},{id:"psychology",label:"Psychology"},{id:"physically",label:"Physically"},{id:"spiritually",label:"Spiritually"},{id:"socially",label:"Socially"}];jt.map(t=>t.id);const wa=[{id:"h1",name:"Wake up early",points:10,icon:"sunrise",category:"physically",pin:{mode:"forever"}},{id:"h2",name:"Drink water",points:5,icon:"drop",category:"physically",pin:{mode:"forever"}},{id:"h3",name:"Exercise",points:15,icon:"bolt",category:"physically",pin:{mode:"forever"}},{id:"h4",name:"Read 20 minutes",points:10,icon:"book",category:"mentally",pin:{mode:"forever"}},{id:"h5",name:"No junk food",points:10,icon:"leaf",category:"physically",pin:{mode:"forever"}}],Sa={lockTime:"21:00",autoLock:!0,showConscious:!0,habitSort:"default",taskSort:"default",theme:"dark",habitOrder:[],pinnedTaskOrder:[],weekStart:1};function $e(t){const e=Number(t);return Number.isInteger(e)&&e>=0&&e<=6?e:1}const Bt=[{id:"iron",label:"Iron",medal:"🥉",rank:1},{id:"bronze",label:"Bronze",medal:"🥉",rank:2},{id:"silver",label:"Silver",medal:"🥈",rank:3},{id:"gold",label:"Gold",medal:"🥇",rank:4}],xa=[{id:"habit-streak",label:"Habit streak"},{id:"task-streak",label:"Pinned task streak"},{id:"perfect-days",label:"Perfect days (100%)"},{id:"task-list",label:"List of tasks goal"}];function Ve(t){var e;return((e=Bt.find(a=>a.id===t))==null?void 0:e.rank)||0}function te(t){var e;return((e=Bt.find(a=>a.id===t))==null?void 0:e.medal)||"🏅"}function Aa(t){var e;return((e=Bt.find(a=>a.id===t))==null?void 0:e.label)||t||"Badge"}function C(t){const e=Array.isArray(t)?t:String(t||"").split(","),a=[];return e.forEach(s=>{const i=String(s||"").trim().slice(0,20);i&&!a.some(n=>n.toLowerCase()===i.toLowerCase())&&a.push(i),a.length>=10}),a.slice(0,10)}function ge(t,e){const a=[...t];return e==="points"?a.sort((s,i)=>(Number(i.points)||0)-(Number(s.points)||0)):e==="category"?a.sort((s,i)=>nt(L(s.category)).localeCompare(nt(L(i.category)))):e==="tags"&&a.sort((s,i)=>(s.tags&&s.tags[0]||"~~~").localeCompare(i.tags&&i.tags[0]||"~~~")),a}const bt=[{value:1,label:"Mon"},{value:2,label:"Tue"},{value:3,label:"Wed"},{value:4,label:"Thu"},{value:5,label:"Fri"},{value:6,label:"Sat"},{value:0,label:"Sun"}];function j(t=new Date){const e=t.getFullYear(),a=String(t.getMonth()+1).padStart(2,"0"),s=String(t.getDate()).padStart(2,"0");return`${e}-${a}-${s}`}function Re(){return{habits:{},habitRatings:{},habitMissed:{},habitForwarded:{},tasks:[],note:"",locked:!1,lockOverride:null,submittedAt:null,lockedHabits:null,skippedPins:[]}}var _=[],et={};function di(t){const e=et[t.id];return e?{...t,color:e.color||t.color,goals:e.goals!==void 0?e.goals:t.goals}:t}function at(){return[...jt.map(di),..._]}function L(t){return at().map(a=>a.id).includes(t)?t:"mentally"}function nt(t){var e;return((e=at().find(a=>a.id===t))==null?void 0:e.label)||"Mentally"}const Yt=7e5;function q(t){const e=String(t||"");return e.startsWith("data:image/")?e.length>Yt?"":e:""}function Je(t){const e=Math.max(0,Math.min(5,Number(t.rating)||0)),a=i=>/^\d{4}-\d{2}-\d{2}$/.test(String(i||""))?String(i):"",s=i=>Array.isArray(i)?i.filter(n=>/^\d{4}-\d{2}-\d{2}$/.test(String(n))).map(String).slice(0,50):[];return{...t,description:t.description||"",category:L(t.category),tags:C(t.tags),rating:e,done:!!t.done,missed:!!t.missed,forwardedFrom:a(t.forwardedFrom),forwardedHabitId:String(t.forwardedHabitId||""),forwardedTo:s(t.forwardedTo),image:q(t.image)}}function V(t){const e=Number(t);return!Number.isFinite(e)||e<0?0:Math.min(100,Math.round(e))}function Gt(t){const e=String(t??"").slice(0,10);return/^\d{4}-\d{2}-\d{2}$/.test(e)?e:""}function _t(t,e){const a=Gt(t&&t.startFrom);return a?String(e)>=a:!0}function Oe(t,e){return{id:String(t.id||""),name:String(t.name||"").slice(0,80),description:String(t.description||"").slice(0,2e3),points:Number(t.points)||0,icon:t.icon||"star",category:L(t.category),consciousPoints:V(t.consciousPoints),tags:C(t.tags),pin:B(t.pin),startFrom:Gt(t.startFrom),archivedAt:e||t.archivedAt||null}}function Ta(t,e,a){const s=/^\d{4}-\d{2}-\d{2}$/.test(String(a||""))?String(a):"",i=/^\d{4}-\d{2}-\d{2}$/.test(String(t&&t.forwardedFrom||""))?String(t.forwardedFrom):s;return{id:String(t.id||""),title:String(t.title||"Task").slice(0,120),points:Number(t.points)||0,description:String(t.description||"").slice(0,500),category:L(t.category),tags:C(t.tags),image:q(t.image),fromDate:s,originDate:i,archivedAt:e||t.archivedAt||null,sourcePinId:String(t.sourcePinId||"")}}function li(t){return Array.isArray(t)?t.filter(e=>e&&typeof e=="object"&&e.id).map(e=>Ta(e,e.archivedAt||null,e.fromDate)).filter(e=>e.id.length<=80).slice(0,500):[]}function B(t){if(!t||!t.mode)return null;const e=(i,n,r)=>Array.isArray(i)?i.map(Number).filter(o=>Number.isFinite(o)&&o>=n&&o<=r):[],a=i=>Array.isArray(i)?i.filter(n=>/^\d{4}-\d{2}-\d{2}$/.test(String(n))).map(String).slice(0,365):[],s=i=>Array.isArray(i)?i.filter(n=>/^\d{2}-\d{2}$/.test(String(n))).map(String).slice(0,366):[];return{mode:["forever","until","weekly","monthly","yearly","custom"].includes(t.mode)?t.mode:"forever",until:t.until||"",weekdays:e(t.weekdays,0,6),monthDays:e(t.monthDays,1,31),yearDays:s(t.yearDays),customDates:a(t.customDates),exceptDates:a(t.exceptDates||t.exceptions)}}function ci(t,e){const a=`${t} ${e}`.toLowerCase();return a.includes("read")||a.includes("study")||a.includes("learn")?"mentally":a.includes("meditat")||a.includes("pray")||a.includes("journal")?"spiritually":a.includes("mood")||a.includes("calm")||a.includes("therapy")?"psychology":a.includes("friend")||a.includes("family")||a.includes("social")||a.includes("call")||a.includes("visit")?"socially":"physically"}function ui(t){if(!Array.isArray(t))return[];const e=[];return t.forEach(a=>{if(!a||typeof a!="object")return;const s=String(a.title||a.text||"").trim().slice(0,120);s&&e.push({id:String(a.id||X("gt")),title:s,done:!!a.done,doneAt:a.doneAt||null})}),e.slice(0,100)}function we(t){const e=xa.some(i=>i.id===t.kind)?t.kind:"habit-streak",a=e==="task-list",s=a?ui(t.tasks):[];return{id:String(t.id||`g${Date.now()}`),title:String(t.title||"").trim().slice(0,60)||"My goal",kind:e,targetId:String(t.targetId||""),targetDays:Math.max(1,Math.min(365,Number(t.targetDays)||7)),tier:Bt.some(i=>i.id===t.tier)?t.tier:"bronze",rewardTitle:String(t.rewardTitle||"").trim().slice(0,60)||"Reward",createdAt:t.createdAt||new Date().toISOString(),tasks:s,locked:a?!!t.locked:!1,terminated:a?!!t.terminated:!1}}function pi(t){if(!Array.isArray(t))return[];const e=new Set(jt.map(s=>s.id)),a=[];return t.forEach(s=>{if(!s||typeof s!="object")return;const i=String(s.id||"").trim().slice(0,40),n=String(s.label||"").trim().slice(0,30);!i||!n||e.has(i.toLowerCase())||(e.add(i.toLowerCase()),a.push({id:i,label:n,color:String(s.color||"").slice(0,20),goals:String(s.goals||"").slice(0,1e3)}))}),a.slice(0,20)}function mi(t){const e=t&&typeof t=="object"?t:{},a={};return jt.forEach(s=>{const i=e[s.id];if(!i||typeof i!="object")return;const n=String(i.color||"").trim().slice(0,20),r=i.goals===void 0?void 0:String(i.goals||"").slice(0,1e3);!n&&r===void 0||(a[s.id]={},n&&(a[s.id].color=n),r!==void 0&&(a[s.id].goals=r))}),a}const Se={name:80,wantToBe:1e3,vision:1e3,values:1e3,ideas:4e3},xe=["short","medium","long"],Et={short:["1 Week","2 Weeks","3 Weeks","4 Weeks"],medium:["1 Month","2 Months","3 Months"],long:["1 Year","2 Years","3 Years","5 Years","10+ Years"]};function W(t){return`${t||"id"}${Date.now().toString(36)}${Math.floor(Math.random()*9999)}`}function gi(t){return Array.isArray(t)?t.map(e=>{if(typeof e=="string")return{id:W("w"),text:e.trim().slice(0,120)};if(!e||typeof e!="object")return null;const a=String(e.text||e.label||e.name||"").trim().slice(0,120);return a?{id:String(e.id||W("w")),text:a}:null}).filter(Boolean).slice(0,50):[]}function fi(t){return typeof t=="string"?t.split(`
`).map(e=>e.trim().replace(/^[-•*]\s+/,"")).filter(Boolean).slice(0,20).map(e=>({id:W("a"),title:e.slice(0,60),description:""})):Array.isArray(t)?t.map(e=>{if(typeof e=="string"){const s=e.trim().slice(0,60);return s?{id:W("a"),title:s,description:""}:null}if(!e||typeof e!="object")return null;const a=String(e.title||e.name||"").trim().slice(0,60);return a?{id:String(e.id||W("a")),title:a,description:String(e.description||"").slice(0,1e3)}:null}).filter(Boolean).slice(0,20):[]}function hi(t){return Array.isArray(t)?t.map(e=>{if(typeof e=="string"){const r=e.trim().slice(0,200);return r?{id:W("g"),text:r,term:"short",duration:"1 Week",createdAt:new Date().toISOString()}:null}if(!e||typeof e!="object")return null;const a=String(e.text||e.title||"").trim().slice(0,200);if(!a)return null;const s=xe.includes(e.term)?e.term:"short",i=Et[s],n=i.includes(e.duration)?e.duration:i[0];return{id:String(e.id||W("g")),text:a,term:s,duration:n,createdAt:e.createdAt||new Date().toISOString()}}).filter(Boolean).slice(0,100):[]}function bi(t){return Array.isArray(t)?t.map(e=>{if(typeof e=="string"){const s=e.trim().slice(0,500);return s?{id:W("q"),text:s,author:"",fav:!1,createdAt:new Date().toISOString()}:null}if(!e||typeof e!="object")return null;const a=String(e.text||e.quote||"").trim().slice(0,500);return a?{id:String(e.id||W("q")),text:a,author:String(e.author||"").trim().slice(0,80),fav:!!(e.fav||e.favorite),createdAt:e.createdAt||new Date().toISOString()}:null}).filter(Boolean).slice(0,200):[]}function Nt(t){const e=t&&typeof t=="object"?t:{},a={};Object.entries(Se).forEach(([i,n])=>{i==="wantToBe"&&!e.wantToBe&&e.about?a[i]=String(e.about||"").slice(0,n):a[i]=String(e[i]||"").slice(0,n)}),a.locked=!!e.locked,a.whoAmI=gi(e.whoAmI||e.whoIAm||[]),a.lifeAreas=fi(Array.isArray(e.lifeAreas)||typeof e.lifeAreas=="string"?e.lifeAreas:[]);let s=hi(e.pGoals||e.goalsList||e.profileGoals||[]);return s.length||[["goalsShort","short","1 Week"],["goalsMid","medium","1 Month"],["goalsLong","long","1 Year"]].forEach(([n,r,o])=>{const l=String(e[n]||"");l.trim()&&l.split(`
`).map(c=>c.trim().replace(/^[-•*]\s+/,"")).filter(Boolean).forEach(c=>{s.length>=100||s.push({id:W("g"),text:c.slice(0,200),term:r,duration:o,createdAt:new Date().toISOString()})})}),a.pGoals=s,a.quotes=bi(e.quotes||e.favQuotes||[]),a}function yi(t,e){const a=String(t&&t.installedAt||"");if(/^\d{4}-\d{2}-\d{2}/.test(a))return a;const s=Object.keys(e||{}).sort();return s.length?`${s[0]}T00:00:00.000`:new Date().toISOString()}function vi(t,e){if(!t)return!1;if(pe(t,e)>0)return!0;const a=t.habitForwarded&&t.habitForwarded[e];return Array.isArray(a)&&a.length>0?!0:Array.isArray(t.tasks)&&t.tasks.some(s=>String(s&&s.forwardedHabitId||"")===String(e))}function ki(t,e){return!t||!Array.isArray(t.lockedHabits)?!1:t.lockedHabits.some(a=>String(a&&a.id||"")===String(e))}function $i(t,e,a){const s=String(t||"");for(const i of e){const n=a[i];if(vi(n,s)||ki(n,s))return i}return""}function wi(t,e){const a=Object.keys(e).sort(),s=a[0]||"";return t.map(i=>{const n=Gt(i&&i.startFrom);return n?{...i,startFrom:n}:{...i,startFrom:$i(i&&i.id,a,e)||s}})}function Si(t,e){const a=Object.keys(e).sort(),s=a[0]||"",i={};return a.forEach(n=>{const r=e[n]&&e[n].tasks;Array.isArray(r)&&r.forEach(o=>{const l=String(o&&o.sourcePinId||"");!l||i[l]||(i[l]=n)})}),t.map(n=>{const r=Gt(n&&n.startFrom);if(r)return{...n,startFrom:r};const o=String(n&&n.id||"");return{...n,startFrom:i[o]||s}})}function Da(t){const e=new Set,a=new Set,s=new Set;return t.filter(i=>{if(!i||typeof i!="object")return!1;const n=String(i.id||"");if(n&&e.has(n))return!1;n&&e.add(n);const r=String(i.sourcePinId||"");if(r){if(a.has(r))return!1;a.add(r)}const o=`${String(i.title||"").trim().toLowerCase()}|${Number(i.points)||0}|${String(i.category||"")}`;return s.has(o)?!1:(s.add(o),!0)})}function je(t){_=pi(t.customCategories||[]),et=mi(t.categoryOverrides);const e={};Object.entries(t.days||{}).forEach(([o,l])=>{e[o]={...Re(),habits:l.habits||{},habitRatings:l.habitRatings||{},habitMissed:l.habitMissed||{},habitForwarded:l.habitForwarded&&typeof l.habitForwarded=="object"?l.habitForwarded:{},tasks:Da(Array.isArray(l.tasks)?l.tasks.map(Je):[]),note:l.note||"",locked:!!l.locked,lockOverride:l.lockOverride||(l.locked?"locked":null),submittedAt:l.submittedAt||null,lockedHabits:Array.isArray(l.lockedHabits)?l.lockedHabits:null,skippedPins:Array.isArray(l.skippedPins)?l.skippedPins.map(String).filter(c=>c.length<=60).slice(0,100):[]}});const a=wi(Array.isArray(t.habits)&&t.habits.length?t.habits:wa,e).map(o=>({...o,description:String(o.description||"").slice(0,2e3),category:L(o.category||ci(o.id,o.name)),consciousPoints:V(o.consciousPoints),tags:C(o.tags),pin:B(o.pin)})),s=(Array.isArray(t.archivedHabits)?t.archivedHabits:[]).filter(o=>o&&typeof o=="object"&&o.id).map(o=>Oe(o,o.archivedAt||null)).filter(o=>o.id.length<=60).slice(0,500),i=Si(Array.isArray(t.pinnedTasks)?t.pinnedTasks.map(o=>({...Je(o),pin:B(o.pin)})):[],e),n=new Map(i.map(o=>[String(o.id),o])),r=new Map;return Object.entries(e).sort(([o],[l])=>o.localeCompare(l)).forEach(([o,l])=>{l.tasks.forEach(c=>{const m=B(c.pin);if(!m)return;const b=String(c.sourcePinId||""),p=b?n.get(b):null;if(p){p.pin||(p.pin=m);return}const k=[String(c.title||"").trim().toLowerCase(),Number(c.points)||0,String(c.category||""),String(c.description||""),JSON.stringify(C(c.tags)),q(c.image),JSON.stringify(m)].join("|"),x=r.get(b||k);if(x){c.sourcePinId=x.id;return}const S=b||`legacy-pin-${String(c.id||"task").slice(0,48)}`,y={id:S,title:String(c.title||"Task").slice(0,120),points:Number(c.points)||0,description:String(c.description||"").slice(0,500),category:L(c.category),tags:C(c.tags),pin:m,startFrom:o,image:q(c.image)};i.push(y),n.set(S,y),r.set(b||k,y),c.sourcePinId=S})}),{habits:a,archivedHabits:s,archivedTasks:li(t.archivedTasks),customCategories:_,categoryOverrides:et,installedAt:yi(t,e),profile:Nt(t.profile),pinnedTasks:i,days:e,goals:Array.isArray(t.goals)?t.goals.map(we):[],badges:Array.isArray(t.badges)?t.badges.filter(o=>o&&o.id&&o.goalId).map(o=>({id:String(o.id),goalId:String(o.goalId),title:String(o.title||""),tier:o.tier||"bronze",rewardTitle:String(o.rewardTitle||""),earnedAt:o.earnedAt||new Date().toISOString()})):[],settings:{lockTime:t.settings&&t.settings.lockTime||Sa.lockTime,autoLock:!t.settings||t.settings.autoLock!==!1,showConscious:!t.settings||t.settings.showConscious!==!1,habitSort:["default","points","category","tags","custom"].includes(t.settings&&t.settings.habitSort)?t.settings.habitSort:"default",taskSort:["default","points","category","tags","custom"].includes(t.settings&&t.settings.taskSort)?t.settings.taskSort:"default",theme:["light","dark"].includes(t.settings&&t.settings.theme)?t.settings.theme:"dark",weekStart:$e(t.settings&&t.settings.weekStart),habitOrder:Array.isArray(t.settings&&t.settings.habitOrder)?t.settings.habitOrder.map(String).filter(Boolean).slice(0,300):[],pinnedTaskOrder:Array.isArray(t.settings&&t.settings.pinnedTaskOrder)?t.settings.pinnedTaskOrder.map(String).filter(Boolean).slice(0,300):[]}}}function Qe(){const t=j();return{habits:wa.map(e=>({...e,description:"",tags:[],startFrom:t})),archivedHabits:[],archivedTasks:[],customCategories:[],categoryOverrides:{},installedAt:new Date().toISOString(),profile:Nt({}),pinnedTasks:[],days:{},goals:[],badges:[],settings:{...Sa}}}function xi(){try{const t=localStorage.getItem(ka)||localStorage.getItem("daily-report-v1");return t?je(JSON.parse(t)):Qe()}catch{return Qe()}}let u=xi();_=u.customCategories||[];u.customCategories=_;et=u.categoryOverrides||{};u.categoryOverrides=et;let M=null,P="boot",Ft=Ai(),Ca=0,kt=!1,Ae=0,pt=null,Vt=0,Xe=Promise.resolve();function Ai(){try{const t=JSON.parse(localStorage.getItem($a)||"null"),e=t&&Number(t.savedAt);return Number.isFinite(e)&&e>0?e:0}catch{return 0}}function Pa(t){u=t,_=u.customCategories||[],u.customCategories=_,et=u.categoryOverrides||{},u.categoryOverrides=et}function $t(){return!!M&&P==="granted"}function Ti(){if(!$t())return;const t=Date.now();Vt||(Vt=t);const e=t-Vt,a=e>=3e3?0:Math.max(400,Math.min(900,900-e));pt&&clearTimeout(pt),pt=setTimeout(()=>{pt=null,Ht().catch(()=>{})},a)}function Ht(){if(pt&&(clearTimeout(pt),pt=null),Vt=0,!$t()||!kt)return Promise.resolve(!1);const t=Ae;let e="";try{e=JSON.stringify(u)}catch{return Promise.resolve(!1)}const a=M,s=Xe.then(async()=>{try{const i=await Fe(a,vt,e);return i.ok?(Ca=Date.now(),Ae===t&&(kt=!1),!0):(i.denied&&(P="prompt"),!1)}catch{return!1}});return Xe=s.then(()=>{},()=>{}),s}async function Ut(){if(!$t())return{status:P};const t=await si(M);if(t.error)return{status:"granted",error:t.error};if(t.missing)return kt=!0,await Ht(),{status:"granted",seeded:!0};let e=null;try{e=JSON.parse(t.raw)}catch{e=null}if(!e||d.backupKind(e)!=="ok")return await ni(M,t.raw),kt=!0,await Ht(),{status:"granted",corrupt:!0};const a=Number(t.modified)||0;if(!Ft||a>Ft+2e3){const s=e.data&&typeof e.data=="object"&&!Array.isArray(e.data)?e.data:e;return Pa(je(s)),w(),{status:"granted",replaced:!0}}return kt=!0,await Ht(),{status:"granted",pushed:!0}}let Ea=0,fe={key:null,value:null},Te=0;function Be(){return Te>0}function ot(t){Te+=1;try{return t()}finally{Te-=1}}function w(){Ea+=1,Ae+=1,kt=!0;try{localStorage.setItem(ka,JSON.stringify(u)),Ft=Date.now(),localStorage.setItem($a,JSON.stringify({savedAt:Ft}))}catch{}Ti()}let Ze=0;function X(t){return Ze+=1,`${t||"id"}${Date.now().toString(36)}${Ze.toString(36)}${Math.floor(Math.random()*1296).toString(36)}`}function Di(t){return new Date(`${t}T00:00:00`).getDay()}function ee(t){const e=new Date(`${t}T00:00:00`);return e.setDate(e.getDate()+1),j(e)}function Ct(t){const e=new Date(`${t}T00:00:00`);return e.setDate(e.getDate()-1),j(e)}function qt(t,e){if(!t)return!0;if(Array.isArray(t.exceptDates)&&t.exceptDates.includes(e)||Array.isArray(t.exceptions)&&t.exceptions.includes(e))return!1;if((Array.isArray(t.customDates)?t.customDates:[]).includes(e)||t.mode==="forever")return!0;if(t.mode==="until")return!!t.until&&e<=t.until;if(t.mode==="weekly")return Array.isArray(t.weekdays)&&t.weekdays.includes(Di(e));if(t.mode==="monthly"){const s=Array.isArray(t.monthDays)?t.monthDays.map(Number):[];return s.length?s.includes(Number(String(e).slice(8,10))):!0}if(t.mode==="yearly"){const s=Array.isArray(t.yearDays)?t.yearDays:[];return s.length?s.includes(String(e).slice(5,10)):!0}return t.mode!=="custom"}function wt(t){if(!t)return"Not pinned";const e=(t.exceptDates||t.exceptions||[]).length,a=e?` · ⛔ ${e} exception${e>1?"s":""}`:"",s=t.mode==="custom"?0:Array.isArray(t.customDates)?t.customDates.length:0,i=s?` +${s} custom`:"";if(t.mode==="forever")return`Pinned forever${i}${a}`;if(t.mode==="until")return`${t.until?`Pinned until ${t.until}`:"Pinned until a date"}${i}${a}`;if(t.mode==="weekly"){const n=Array.isArray(t.weekdays)?t.weekdays:[],r=bt.filter(o=>n.includes(o.value)).map(o=>o.label);return`${r.length?`Weekly: ${r.join(", ")}`:"Weekly (no days)"}${i}${a}`}if(t.mode==="monthly"){const n=Array.isArray(t.monthDays)?t.monthDays:[];return`${n.length?`Monthly: day${n.length>1?"s":""} ${[...n].sort((r,o)=>r-o).join(", ")}`:"Monthly"}${i}${a}`}if(t.mode==="yearly"){const n=Array.isArray(t.yearDays)?t.yearDays:[];return`${n.length?`Yearly: ${[...n].sort().join(", ")}`:"Yearly"}${i}${a}`}if(t.mode==="custom"){const n=Array.isArray(t.customDates)?t.customDates:[];return`${n.length?`Custom: ${n.length} date${n.length>1?"s":""}`:"Custom dates"}${a}`}return"Pinned"}function De(t){const[e,a]=(u.settings.lockTime||"21:00").split(":").map(Number),s=new Date(`${t}T00:00:00`);return s.setHours(e||0,a||0,0,0),s}function ae(t){const e=u.days[t];return e?e.lockOverride==="locked"||e.locked===!0:!1}function pe(t,e){return t?t.habitRatings&&t.habitRatings[e]!=null?Number(t.habitRatings[e])||0:t.habits&&t.habits[e]?5:0:0}function Ce(t,e){return pe(u.days[t],e)}function Ci(t,e){if(!t)return!1;if(pe(t,e)>0||t.habitMissed&&t.habitMissed[e])return!0;const s=t.habitForwarded&&t.habitForwarded[e];return Array.isArray(s)&&s.length>0?!0:Array.isArray(t.tasks)&&t.tasks.some(i=>String(i&&i.forwardedHabitId||"")===String(e))}function La(t){if(!t)return[...u.habits];const e=u.habits.filter(s=>_t(s,t)&&qt(s.pin,t)),a=u.days[t];if(a){const s=new Set(e.map(n=>n.id)),i=n=>{!n||s.has(n.id)||Ci(a,n.id)&&(s.add(n.id),e.push(n))};u.habits.forEach(i),ae(t)&&u.archivedHabits&&u.archivedHabits.length&&u.archivedHabits.forEach(i)}return e}function zt(t,e){if(!Array.isArray(e)||!e.length)return t;const a=new Map(e.map((s,i)=>[String(s),i]));return t.some(s=>a.has(String(s&&s.id)))?t.map((s,i)=>({item:s,i})).sort((s,i)=>{const n=a.has(String(s.item&&s.item.id))?a.get(String(s.item.id)):Number.MAX_SAFE_INTEGER,r=a.has(String(i.item&&i.item.id))?a.get(String(i.item.id)):Number.MAX_SAFE_INTEGER;return n===r?s.i-i.i:n-r}).map(s=>s.item):t}function Pi(t){const e=u.habits.find(a=>a.id===t);return e||(u.archivedHabits||[]).find(a=>a.id===t)||null}function Ei(t){u.archivedHabits||(u.archivedHabits=[]),!u.archivedHabits.some(e=>e.id===t.id)&&(u.archivedHabits.push(Oe(t,new Date().toISOString())),u.archivedHabits.length>500&&u.archivedHabits.splice(0,u.archivedHabits.length-500))}function Pe(t){const e=N(t),a=La(t);e.lockedHabits=a.map(s=>Oe(s)),e.habitMissed={},a.forEach(s=>{Ce(t,s.id)<=0&&(e.habitMissed[s.id]=!0)}),e.tasks.forEach(s=>{s.missed=!s.done})}function lt(t){const e=u.days[t];return!e||e.lockOverride==="unlocked"?!1:e.lockOverride==="locked"||e.locked===!0?!0:u.settings.autoLock?Date.now()>=De(t).getTime():!1}function Ke(t){if(Be())return lt(t);const e=N(t);return e.lockOverride==="unlocked"?!1:e.lockOverride==="locked"||e.locked?((!Array.isArray(e.lockedHabits)||!e.habitMissed)&&Pe(t),!0):u.settings.autoLock&&Date.now()>=De(t).getTime()?(e.locked=!0,e.lockOverride="locked",e.submittedAt=e.submittedAt||De(t).toISOString(),Pe(t),w(),!0):!1}function N(t){if(!u.days[t]){const e=Re();if(Be())return e;u.days[t]=e}return u.days[t]}function he(t){const e=String(t);Object.values(u.days).forEach(a=>{!Array.isArray(a.skippedPins)||!a.skippedPins.includes(e)||(a.skippedPins=a.skippedPins.filter(s=>s!==e))})}function ta(t){const e=N(t);if(ae(t)||Be())return e;let a=!1;const s=new Set(Array.isArray(e.skippedPins)?e.skippedPins.map(String):[]);if(e.tasks.length>1){const i=Da(e.tasks);i.length!==e.tasks.length&&(e.tasks=i,a=!0)}return u.pinnedTasks.forEach(i=>{_t(i,t)&&qt(i.pin,t)&&(s.has(String(i.id))||e.tasks.some(n=>n.sourcePinId===i.id)||(e.tasks.push({id:`ptask-${i.id}-${t}`,title:i.title,points:i.points,description:i.description||"",category:L(i.category),tags:C(i.tags),rating:0,done:!1,missed:!1,sourcePinId:i.id,image:q(i.image)}),a=!0))}),a&&w(),e}function Ma(t){return!(!t||t.pin&&t.pin.mode==="forever")}function Li(t,e){let a=ee(e),s=0;for(;s<800;){if(s+=1,_t(t,a)&&qt(t.pin,a))return a;a=ee(a)}return""}function ie(t,e,a=[],s=[]){if(!t||!/^\d{4}-\d{2}-\d{2}$/.test(String(e||"")))return{allowed:!1,next:"",days:[]};let i=t;if(a.length||s.length){const c=a.map(String),m=s.map(String),b=B(t.pin);b.exceptDates=(b.exceptDates||[]).filter(p=>!c.includes(p)),b.customDates=(b.customDates||[]).filter(p=>!m.includes(p)),i={...t,pin:b}}if(!Ma(i))return{allowed:!1,next:"",days:[]};if(!_t(i,e)||!qt(i.pin,e))return{allowed:!1,next:"",days:[]};const n=Li(i,e);if(!n)return{allowed:!1,next:"",days:[]};const r=[];let o=ee(e),l=0;for(;o<n&&l<400;)l+=1,r.push(o),o=ee(o);return r.length?{allowed:!0,next:n,days:r}:{allowed:!1,next:n,days:[]}}function Mi(t,e){const a=t.pin||{},s=Array.isArray(a.exceptDates)?a.exceptDates:[];return s.includes(e)&&(Array.isArray(a.customDates)?a.customDates:[]).filter(n=>n>e).filter(n=>!s.includes(n)).sort().find(n=>ie(t,e,[e],[n]).days.includes(n))||""}function Ni(t,e){const a=t.pin||{};if(!(Array.isArray(a.customDates)?a.customDates:[]).includes(e))return"";const i=Array.isArray(a.exceptDates)?a.exceptDates:[];let n="";return i.forEach(r=>{r>=e||ie(t,r,[r],[e]).days.includes(e)&&(!n||r>n)&&(n=r)}),n}function z(t){return!d.isLocked(t)}function ea(t){const e=at().find(a=>a.label.toLowerCase()===String(t||"").trim().toLowerCase());return e?e.id:"mentally"}function aa(t){return!t||typeof t!="object"||Array.isArray(t)?[]:Array.isArray(t.days)?t.days.filter(e=>e&&/^\d{4}-\d{2}-\d{2}$/.test(String(e.date||""))):[]}const d={todayKey:j,exportBackup(){return JSON.stringify({app:"Second Mind",kind:"full-backup",version:1,exportedAt:new Date().toISOString(),data:u},null,2)},backupKind(t){if(!t||typeof t!="object"||Array.isArray(t))return"invalid";const e=t.data&&typeof t.data=="object"&&!Array.isArray(t.data)?t.data:t;return Array.isArray(e.days)?"report-export":Array.isArray(e.categories)||Array.isArray(e.plans)||Array.isArray(e.schedule)?"wrong-app":typeof e!="object"||e===null||e.habits!==void 0&&!Array.isArray(e.habits)||e.days!==void 0&&(typeof e.days!="object"||e.days===null||Array.isArray(e.days))||e.settings!==void 0&&(typeof e.settings!="object"||e.settings===null||Array.isArray(e.settings))||!["habits","pinnedTasks","days","goals","badges","settings"].some(s=>e[s]!==void 0)?"invalid":"ok"},importBackup(t){if(this.backupKind(t)!=="ok")return!1;const e=t.data&&typeof t.data=="object"&&!Array.isArray(t.data)?t.data:t;return Pa(je(e)),w(),!0},folderStatus(){return P},folderName(){return M&&M.name?String(M.name):""},folderFileName(){return vt},lastFileSavedAt(){return Ca},lastCacheSavedAt(){return Ft},getFolderHandle(){return M},async initFolderSync(){if(!Dt())return P="unsupported",{status:"unsupported"};try{const e=typeof navigator<"u"&&navigator.storage&&navigator.storage.persist?navigator.storage.persist():null;e&&typeof e.catch=="function"&&e.catch(()=>{})}catch{}const t=await this.refreshFolder();if(t==="granted")return Ut();if(t==="prompt"||t==="denied"){try{P=await Ye(M)}catch{P="prompt"}if(P==="granted")return Ut()}return{status:P}},async refreshFolder(){if(!Dt())return P="unsupported",P;if(!M)try{M=await ei()}catch{M=null}return M?(P=await Xa(M),P):(P="unset",P)},async chooseDataFolder(){if(!Dt())return P="unsupported",{status:"unsupported"};let t=null;try{t=await Qa()}catch(a){return a&&a.name==="AbortError"?{status:P,cancelled:!0}:{status:P,error:String(a&&a.message||a)}}if(!t)return{status:P,error:"no-folder"};try{await ai(t)}catch{}return M=t,P="granted",{...await Ut(),name:String(t.name||"")}},async grantFolderAccess(){if(!Dt())return P="unsupported",{status:"unsupported"};if(!M){const e=await this.refreshFolder();if(e!=="granted")return{status:e}}return P=await Ye(M),P!=="granted"?{status:P}:{...await Ut(),name:this.folderName()}},async forgetDataFolder(){try{await ii()}catch{}return M=null,P=Dt()?"unset":"unsupported",{status:P}},async writeFolderFile(t,e){if(!$t())return{ok:!1,denied:!1,error:"no-folder"};const a=await Fe(M,t,e);return a.denied&&(P="prompt"),a},async readFolderFile(t){return $t()?ke(M,t):{missing:!0,raw:"",modified:0,error:"no-folder"}},async listFolderBackups(){return $t()?(await oi(M)).filter(e=>ri(e.name)).sort((e,a)=>a.modified-e.modified).map(e=>({name:e.name,modified:e.modified})):[]},flushFolderWrite(){return Ht()},previewReport(t){const e=aa(t);if(!e.length)return{days:0,start:"",end:"",newHabits:0};const a=new Set(u.habits.map(n=>String(n.name||"").trim().toLowerCase())),s=new Set;e.forEach(n=>{(Array.isArray(n.habits)?n.habits:[]).forEach(r=>{const o=String(r&&r.name||"").trim().toLowerCase();o&&!a.has(o)&&s.add(o)})});const i=e.map(n=>String(n.date)).sort();return{days:e.length,start:i[0],end:i[i.length-1],newHabits:s.size}},importReport(t){const e=aa(t);if(!e.length)return!1;const a=e.map(o=>String(o.date)).sort(),s=a[a.length-1],i={};u.habits.forEach(o=>{i[String(o.name||"").trim().toLowerCase()]=o});let n=0;const r=Date.now();return e.forEach((o,l)=>{const c=String(o.date);(Array.isArray(o.habits)?o.habits:[]).forEach(p=>{const k=String(p&&p.name||"").trim().slice(0,80);if(!k)return;const x=k.toLowerCase();if(!i[x]){const S={id:`h${r}_${n}`,name:k,description:String(p&&p.description||"").slice(0,2e3),points:Number(p&&p.points||10)||10,icon:"star",category:ea(p&&p.category),consciousPoints:V(p&&p.consciousPoints),tags:C(p&&p.tags),pin:{mode:"until",until:s,weekdays:[],monthDays:[],yearDays:[],customDates:[],exceptDates:[]},startFrom:a[0]};u.habits.push(S),i[x]=S,n+=1}});const m=Re();m.note=String(o.note||""),m.locked=!0,m.lockOverride="locked",m.submittedAt=null;const b=[];(Array.isArray(o.habits)?o.habits:[]).forEach(p=>{const k=i[String(p&&p.name||"").trim().toLowerCase()];if(!k)return;const x=Math.max(0,Math.min(5,Number(p&&p.rating||0)));m.habitRatings[k.id]=x,m.habits[k.id]=x>0,x<=0&&(m.habitMissed[k.id]=!0),k.startFrom&&c<k.startFrom&&(k.startFrom=c),b.push({id:k.id,name:k.name,description:k.description,points:k.points,icon:k.icon||"star",category:L(k.category),consciousPoints:V(k.consciousPoints),tags:C(k.tags),pin:B(k.pin)})}),m.lockedHabits=b,m.tasks=(Array.isArray(o.tasks)?o.tasks:[]).map((p,k)=>({id:`t${r}_${l}_${k}`,title:String(p&&p.title||"Task").slice(0,120),points:Number(p&&p.points||5)||5,description:String(p&&p.description||""),category:ea(p&&p.category),tags:C(p&&p.tags),rating:Math.max(0,Math.min(5,Number(p&&p.rating||0))),done:!!(p&&p.done),missed:!(p&&p.done),image:"",forwardedFrom:/^\d{4}-\d{2}-\d{2}$/.test(String(p&&p.forwardedFrom||""))?String(p.forwardedFrom):"",forwardedHabitId:"",forwardedTo:Array.isArray(p&&p.forwardedTo)?p.forwardedTo.filter(x=>/^\d{4}-\d{2}-\d{2}$/.test(String(x))).map(String).slice(0,50):[]})),u.days[c]=m}),w(),{days:e.length,habits:n}},getSettings(){return u.settings},setLockTime(t){u.settings.lockTime=t||"21:00",w()},setAutoLock(t){u.settings.autoLock=!!t,w()},setShowConscious(t){u.settings.showConscious=!!t,w()},consciousEnabled(){return u.settings.showConscious!==!1},setHabitSort(t){u.settings.habitSort=["default","points","category","tags","custom"].includes(t)?t:"default",w()},setTaskSort(t){u.settings.taskSort=["default","points","category","tags","custom"].includes(t)?t:"default",w()},getWeekStart(){return $e(u.settings.weekStart)},setWeekStart(t){u.settings.weekStart=$e(t),w()},getTheme(){return u.settings.theme==="light"?"light":"dark"},setTheme(t){u.settings.theme=t==="light"?"light":"dark",w()},getHabits(t,e){if(t&&ae(t)){const n=u.days[t];if(n&&Array.isArray(n.lockedHabits)){const r=e||u.settings.habitSort||"default",o=[...n.lockedHabits];return r==="default"||r==="custom"?zt(o,u.settings.habitOrder):ge(o,r)}}const a=e||u.settings.habitSort||"default",s=La(t),i=a==="default"||a==="custom"?zt(s,u.settings.habitOrder):ge(s,a);return a==="default"||a==="custom"?i.slice().sort((n,r)=>+!!r.pin-+!!n.pin):i},getTasks(t,e){const a=this.getDay(t),s=e||u.settings.taskSort||"default";return s==="default"||s==="custom"?a.tasks:ge(a.tasks,s)},getAllHabits(){return u.habits},getPinnedHabits(){return zt(u.habits.filter(t=>!!t.pin),u.settings.habitOrder)},setPinnedHabitOrder(t){const e=new Set(u.habits.filter(n=>n.pin).map(n=>String(n.id))),a=(Array.isArray(t)?t:[]).map(String).filter(n=>e.has(n)),s=new Set(a);e.forEach(n=>{s.has(n)||a.push(n)});const i=u.settings.habitOrder.filter(n=>!e.has(n));u.settings.habitOrder=[...a,...i].slice(0,300),w()},getHabitActivity(t,e=30){const a=String(t||"");return a?Object.keys(u.days).sort().reverse().flatMap(s=>{const i=u.days[s],n=i.habitForwarded&&i.habitForwarded[a],r=!!(i.habits&&i.habits[a])||!!(i.habitMissed&&i.habitMissed[a])||[i.habitRatings,i.habitMissed].some(c=>c&&Object.prototype.hasOwnProperty.call(c,a))||Array.isArray(n)&&n.length>0,o=Array.isArray(i.lockedHabits)&&i.lockedHabits.some(c=>String(c.id)===a);if(!r&&!o)return[];const l=pe(i,a);return[{date:s,rating:l,status:l?"Completed":i.habitMissed[a]||o&&lt(s)?"Missed":"Not rated",locked:lt(s)}]}).slice(0,Math.max(1,Math.min(365,Number(e)||30))):[]},getPinnedTasks(){return zt(u.pinnedTasks,u.settings.pinnedTaskOrder)},setPinnedTaskOrder(t){const e=new Set(u.pinnedTasks.map(i=>String(i.id))),a=(Array.isArray(t)?t:[]).map(String).filter(i=>e.has(i)),s=new Set(a);u.pinnedTasks.forEach(i=>{const n=String(i.id);s.has(n)||a.push(n)}),u.settings.pinnedTaskOrder=a.slice(0,300),w()},getDay(t){return Ke(t),ta(t)},isLocked(t){return Ke(t)},submitDay(t){const e=N(t);e.locked=!0,e.lockOverride="locked",e.submittedAt=new Date().toISOString(),Pe(t),w(),this.checkGoals(t)},unlockDay(t){const e=N(t);e.locked=!1,e.lockOverride="unlocked",e.habitMissed={},e.lockedHabits=null,e.tasks.forEach(a=>{a.missed=!1}),w()},isHabitMissed(t,e){const a=u.days[t];return!a||!(a.locked||a.lockOverride==="locked")||!this.getHabits(t).some(s=>s.id===e)||Ce(t,e)>0?!1:(a.habitMissed&&a.habitMissed[e],!0)},isTaskMissed(t,e){const a=u.days[t];if(!a)return!1;const s=(a.tasks||[]).find(i=>i.id===e);return s?s.missed===!0?!0:s.missed===!1?!1:!!(a.locked||a.lockOverride==="locked")&&!s.done:!1},missedCounts(t){return ot(()=>{const e=this.getDay(t),a=this.getHabits(t),s=lt(t);return{habits:a.filter(i=>e.habitMissed&&e.habitMissed[i.id]?!0:s&&Ce(t,i.id)<=0).length,tasks:e.tasks.filter(i=>i.done?!1:i.missed===!0?!0:i.missed===!1?!1:s).length}})},lockDay(t){this.submitDay(t)},lockDays(t){let e=0;return t.forEach(a=>{this.isLocked(a)||(this.submitDay(a),e+=1)}),e},unlockDays(t){let e=0;return t.forEach(a=>{this.isLocked(a)&&(this.unlockDay(a),e+=1)}),e},lockedReports(){return ot(()=>Object.keys(u.days).sort().reverse().filter(t=>lt(t)).map(t=>({date:t,submittedAt:u.days[t].submittedAt,...this.scoreFor(t)})))},habitRating(t,e){const a=u.days[t];return a?a.habitRatings&&a.habitRatings[e]!=null?Number(a.habitRatings[e])||0:a.habits&&a.habits[e]?5:0:0},setHabitRating(t,e,a){if(!z(t))return;const s=N(t),i=Math.max(0,Math.min(5,Number(a)||0));s.habitRatings[e]=i,s.habits[e]=i>0,w(),this.checkGoals(t)},toggleHabit(t,e){if(!z(t))return;const a=this.habitRating(t,e)>0?0:5;this.setHabitRating(t,e,a)},addTask(t,e,a,s={}){if(!z(t))return;N(t).tasks.push({id:X("t"),title:e.trim(),points:Number(a)||5,description:String(s.description||"").trim(),category:L(s.category),tags:C(s.tags),rating:Math.max(0,Math.min(5,Number(s.rating)||0)),done:!1,missed:!1,forwardedFrom:/^\d{4}-\d{2}-\d{2}$/.test(String(s.forwardedFrom||""))?String(s.forwardedFrom):"",forwardedHabitId:String(s.forwardedHabitId||""),forwardedTo:[],image:q(s.image)}),w(),this.checkGoals(t)},setTaskRating(t,e,a){if(!z(t))return;const i=N(t).tasks.find(r=>r.id===e);if(!i)return;const n=Math.max(0,Math.min(5,Number(a)||0));i.rating=n,w()},setTaskOrder(t,e){if(!z(t))return;const a=N(t),s=(Array.isArray(e)?e:[]).map(String).filter(Boolean);if(!s.length)return;const i=new Map(s.map((r,o)=>[r,o])),n=a.tasks.slice().sort((r,o)=>{const l=i.has(r.id)?i.get(r.id):Number.MAX_SAFE_INTEGER,c=i.has(o.id)?i.get(o.id):Number.MAX_SAFE_INTEGER;return l-c});a.tasks=n,w()},setHabitOrder(t){const e=(Array.isArray(t)?t:[]).map(String).filter(Boolean);e.length&&(u.settings.habitOrder=e.slice(0,300),w())},toggleTask(t,e){if(!z(t))return;const s=N(t).tasks.find(i=>i.id===e);s&&(s.done=!s.done,w(),this.checkGoals(t))},removeTask(t,e){if(!z(t))return;const a=N(t),s=a.tasks.find(n=>n.id===e);a.tasks=a.tasks.filter(n=>n.id!==e);const i=s&&s.sourcePinId?String(s.sourcePinId):"";i&&(Array.isArray(a.skippedPins)||(a.skippedPins=[]),a.skippedPins.includes(i)||a.skippedPins.push(i),a.skippedPins.length>100&&a.skippedPins.splice(0,a.skippedPins.length-100)),w()},forwardTask(t,e,a){if(!/^\d{4}-\d{2}-\d{2}$/.test(String(a||"")))return{ok:!1,reason:"Pick a valid date"};if(t===a)return{ok:!1,reason:"Already on that day"};if(!z(t))return{ok:!1,reason:"Source day is locked"};if(this.isLocked(a))return{ok:!1,reason:"Target day is locked"};const i=N(t).tasks.find(l=>l.id===e);if(!i)return{ok:!1,reason:"Task not found"};const n=N(a),r=String(i.title||"").trim().toLowerCase();if(n.tasks.some(l=>String(l.title||"").trim().toLowerCase()===r))return{ok:!1,reason:"That task is already on that day"};n.tasks.push({id:X("t"),title:i.title,points:Number(i.points)||5,description:String(i.description||""),category:L(i.category),tags:C(i.tags),rating:0,done:!1,missed:!1,forwardedFrom:t,forwardedHabitId:String(i.forwardedHabitId||""),forwardedTo:[],image:q(i.image)});const o=Array.isArray(i.forwardedTo)?i.forwardedTo:[];return o.includes(a)||o.push(a),i.forwardedTo=o.slice(0,50),w(),this.checkGoals(a),{ok:!0}},habitForwardedTo(t,e){const a=u.days[t];if(!a||!a.habitForwarded)return[];const s=a.habitForwarded[e];return Array.isArray(s)?s:[]},habitReplaceDays(t,e){const a=u.habits.find(i=>i.id===e),s=ie(a,t);return{allowed:s.allowed,next:s.next,days:s.days.slice()}},replaceHabit(t,e,a){if(!/^\d{4}-\d{2}-\d{2}$/.test(String(a||"")))return{ok:!1,reason:"Pick a valid date"};if(String(a)===String(t))return{ok:!1,reason:"Already on that day"};const s=u.habits.find(r=>r.id===e);if(!s)return{ok:!1,reason:"Habit not found"};if(!Ma(s))return{ok:!1,reason:"This habit is pinned forever — every day is already its day"};if(!z(t))return{ok:!1,reason:"That day is locked"};if(this.isLocked(a))return{ok:!1,reason:"That day is locked"};const i=ie(s,t);if(!i.allowed)return{ok:!1,reason:"No replace days available for this habit"};if(!i.days.includes(a))return{ok:!1,reason:`Pick a day before ${i.next}`};const n=B(s.pin);return n.exceptDates.includes(t)||(n.exceptDates=[...n.exceptDates,t].sort()),n.customDates.includes(a)||(n.customDates=[...n.customDates,a].sort()),s.pin=n,w(),this.checkGoals(a),{ok:!0,from:t,to:a}},undoReplaceHabit(t,e,a){const s=u.habits.find(n=>n.id===t);if(!s)return{ok:!1,reason:"Habit not found"};const i=B(s.pin);return i.exceptDates=(i.exceptDates||[]).filter(n=>n!==e),i.customDates=(i.customDates||[]).filter(n=>n!==a),s.pin=i,w(),{ok:!0}},habitReplacedTo(t,e){const a=u.habits.find(s=>s.id===e);return a?Mi(a,t):""},habitReplacedFrom(t,e){const a=u.habits.find(s=>s.id===e);return a?Ni(a,t):""},setNote(t,e){z(t)&&(N(t).note=e,w())},addHabit(t,e,a={}){u.habits.push({id:X("h"),name:t.trim(),description:String(a.description||"").trim().slice(0,2e3),points:Number(e)||10,icon:"star",category:L(a.category||"physically"),consciousPoints:V(a.consciousPoints),tags:C(a.tags),pin:B({mode:"forever"}),startFrom:Gt(a.startFrom)||j()}),w()},updateHabit(t,e){const a=u.habits.find(s=>s.id===t);a&&(e.name!=null&&(a.name=String(e.name).trim()||a.name),e.description!=null&&(a.description=String(e.description).trim().slice(0,2e3)),e.points!=null&&(a.points=Number(e.points)||a.points),e.category!=null&&(a.category=L(e.category)),e.consciousPoints!=null&&(a.consciousPoints=V(e.consciousPoints)),e.tags!=null&&(a.tags=C(e.tags)),w())},updateTask(t,e,a){if(!z(t))return;const i=N(t).tasks.find(n=>n.id===e);if(i){if(a.title!=null&&(i.title=String(a.title).trim()||i.title),a.points!=null&&(i.points=Number(a.points)||i.points),a.description!=null&&(i.description=String(a.description).trim()),a.category!=null&&(i.category=L(a.category)),a.tags!=null&&(i.tags=C(a.tags)),a.image!==void 0&&(i.image=q(a.image)),a.rating!=null&&(i.rating=Math.max(0,Math.min(5,Number(a.rating)||0))),i.sourcePinId){const n=u.pinnedTasks.find(r=>r.id===i.sourcePinId);n&&(n.title=i.title,n.points=i.points,n.description=i.description,n.category=i.category,a.tags!=null&&(n.tags=C(a.tags)),a.image!==void 0&&(n.image=q(a.image)))}w()}},habitStreak(t,e){const a=Pi(t);if(!a)return 0;let s=e,i=0;this.habitRating(s,t)===0&&(s=Ct(s));let n=0;for(;i<400;){if(i+=1,!_t(a,s)||!qt(a.pin,s)){s=Ct(s);continue}if(this.habitRating(s,t)>0){n+=1,s=Ct(s);continue}break}return n},categoryBreakdown(t){const e=this.getDay(t),a=this.getHabits(t);return at().map(s=>{const i=a.filter(S=>L(S.category)===s.id),n=e.tasks.filter(S=>L(S.category)===s.id),r=i.reduce((S,y)=>{const D=this.habitRating(t,y.id);return S+Math.round(y.points*D/5)},0),o=u.settings.showConscious!==!1,l=o?i.reduce((S,y)=>S+(this.habitRating(t,y.id)>0?V(y.consciousPoints):0),0):0,c=i.reduce((S,y)=>S+y.points,0),m=o?i.reduce((S,y)=>S+V(y.consciousPoints),0):0,b=n.reduce((S,y)=>S+(y.done?y.points:0),0),p=n.reduce((S,y)=>S+y.points,0),k=i.map(S=>this.habitRating(t,S.id)),x=k.length?Math.round(k.reduce((S,y)=>S+y,0)/k.length*10)/10:0;return{...s,habits:i,tasks:n,earned:r+l+b,max:c+m+p,habitAvg:x,consciousEarned:l,consciousMax:m,completed:i.filter(S=>this.habitRating(t,S.id)>0).length+n.filter(S=>S.done).length,total:i.length+n.length}})},removeHabit(t){const e=u.habits.find(a=>a.id===t);e&&Ei(e),u.habits=u.habits.filter(a=>a.id!==t),w()},getArchivedHabits(){return(u.archivedHabits||[]).map(t=>({...t}))},deleteArchivedHabit(t){const e=(u.archivedHabits||[]).length;return u.archivedHabits=(u.archivedHabits||[]).filter(a=>a.id!==t),u.archivedHabits.length===e?{ok:!1,reason:"That habit is no longer archived"}:(w(),{ok:!0})},archiveTask(t,e){if(!z(t))return{ok:!1,reason:"Day is locked"};const a=N(t),s=a.tasks.find(n=>n.id===e);if(!s)return{ok:!1,reason:"Task not found"};u.archivedTasks||(u.archivedTasks=[]),u.archivedTasks.unshift(Ta(s,new Date().toISOString(),t)),u.archivedTasks.length>500&&(u.archivedTasks.length=500),a.tasks=a.tasks.filter(n=>n.id!==e);const i=s.sourcePinId?String(s.sourcePinId):"";return i&&(Array.isArray(a.skippedPins)||(a.skippedPins=[]),a.skippedPins.includes(i)||a.skippedPins.push(i)),w(),{ok:!0}},getArchivedTasks(){return(u.archivedTasks||[]).map(t=>({...t}))},restoreTask(t,e){const a=(u.archivedTasks||[]).findIndex(c=>c.id===t);if(a<0)return{ok:!1,reason:"That task is no longer archived"};const s=u.archivedTasks[a],i=e||j();ta(i);const n=N(i),r=String(s.title||"").trim().toLowerCase();if(n.tasks.some(c=>String(c.title||"").trim().toLowerCase()===r))return{ok:!1,reason:"That task is already on that day"};const l=/^\d{4}-\d{2}-\d{2}$/.test(String(s.originDate||""))?String(s.originDate):"";return n.tasks.push({id:X("t"),title:s.title,points:Number(s.points)||5,description:String(s.description||""),category:L(s.category),tags:C(s.tags),rating:0,done:!1,missed:!1,forwardedFrom:l&&l!==i?l:"",forwardedHabitId:"",forwardedTo:[],image:q(s.image),sourcePinId:String(s.sourcePinId||"")}),u.archivedTasks.splice(a,1),w(),{ok:!0,from:l,to:i}},deleteArchivedTask(t){const e=(u.archivedTasks||[]).length;return u.archivedTasks=(u.archivedTasks||[]).filter(a=>a.id!==t),u.archivedTasks.length===e?{ok:!1,reason:"That task is no longer archived"}:(w(),{ok:!0})},restoreHabit(t){const e=(u.archivedHabits||[]).findIndex(i=>i.id===t);if(e<0)return{ok:!1,reason:"That habit is no longer archived"};const a=u.archivedHabits[e];if(u.habits.some(i=>i.id===a.id))return u.archivedHabits.splice(e,1),w(),{ok:!0};const s={...a,description:String(a.description||"").slice(0,2e3),category:L(a.category),consciousPoints:V(a.consciousPoints),tags:C(a.tags),pin:B(a.pin),archivedAt:null};return u.habits.push(s),u.archivedHabits.splice(e,1),w(),{ok:!0,habit:{...s}}},pinHabit(t,e){const a=u.habits.find(s=>s.id===t);a&&(a.pin=B(e),w())},updatePinnedTaskDetails(t,e){const a=u.pinnedTasks.find(s=>s.id===t);if(a){if(e.title!=null&&(a.title=String(e.title).trim().slice(0,120)||a.title),e.points!=null){const s=Number(e.points);Number.isFinite(s)&&(a.points=Math.max(0,s))}e.description!=null&&(a.description=String(e.description).trim().slice(0,2e3)),e.category!=null&&(a.category=L(e.category)),e.tags!=null&&(a.tags=C(e.tags)),e.image!==void 0&&(a.image=q(e.image)),he(t),w()}},unpinHabit(t){const e=u.habits.find(a=>a.id===t);e&&(e.pin=null,w())},pinTask(t,e,a){if(!z(t))return;const i=N(t).tasks.find(o=>o.id===e);if(!i)return;const n=i.sourcePinId?u.pinnedTasks.find(o=>o.id===i.sourcePinId):null;if(n){n.pin=B(a),he(n.id),w();return}const r=X("p");u.pinnedTasks.push({id:r,title:i.title,points:i.points,description:i.description||"",category:L(i.category),tags:C(i.tags),pin:B(a),startFrom:t,image:q(i.image)}),i.sourcePinId=r,w()},unpinTaskTemplate(t){u.pinnedTasks=u.pinnedTasks.filter(a=>a.id!==t);const e=String(t);Object.entries(u.days).forEach(([a,s])=>{if(!Array.isArray(s.tasks)||!s.tasks.length||ae(a))return;const i=s.tasks.length;s.tasks=s.tasks.filter(n=>String(n&&n.sourcePinId||"")!==e),s.tasks.length!==i&&(Array.isArray(s.skippedPins)||(s.skippedPins=[]),s.skippedPins=s.skippedPins.filter(n=>n!==e))}),w()},updatePinnedTask(t,e){const a=u.pinnedTasks.find(s=>s.id===t);a&&(a.pin=B(e),he(t),w())},findHabit(t){return u.habits.find(e=>e.id===t)||null},findTask(t,e){return N(t).tasks.find(a=>a.id===e)||null},findPinnedTask(t){return u.pinnedTasks.find(e=>e.id===t)||null},getInstalledAt(){return String(u.installedAt||new Date().toISOString())},getProfile(){const t=Nt(u.profile);return u.profile=t,JSON.parse(JSON.stringify(t))},setProfileField(t,e){return!Object.prototype.hasOwnProperty.call(Se,t)||u.profile.locked?!1:((!u.profile||typeof u.profile!="object")&&(u.profile=Nt({})),u.profile[t]=String(e||"").slice(0,Se[t]),w(),!0)},setProfileLocked(t){(!u.profile||typeof u.profile!="object")&&(u.profile=Nt({})),u.profile.locked=!!t,w()},isProfileLocked(){return!!(u.profile&&u.profile.locked)},profileGoalDurations(){return JSON.parse(JSON.stringify(Et))},addWhoAmI(t){if(u.profile.locked)return{ok:!1,reason:"Profile is locked"};const e=String(t||"").trim().slice(0,120);return e?(u.profile.whoAmI||[]).length>=50?{ok:!1,reason:"List is full (50)"}:(u.profile.whoAmI.push({id:W("w"),text:e}),w(),{ok:!0}):{ok:!1,reason:"Type something first"}},updateWhoAmI(t,e){if(u.profile.locked)return;const a=(u.profile.whoAmI||[]).find(i=>i.id===t);if(!a)return;const s=String(e||"").trim().slice(0,120);s?a.text=s:u.profile.whoAmI=u.profile.whoAmI.filter(i=>i.id!==t),w()},moveWhoAmI(t,e){if(u.profile.locked)return;const a=u.profile.whoAmI||[],s=a.findIndex(r=>r.id===t),i=s+e;if(s<0||i<0||i>=a.length)return;const[n]=a.splice(s,1);a.splice(i,0,n),w()},removeWhoAmI(t){u.profile.locked||(u.profile.whoAmI=(u.profile.whoAmI||[]).filter(e=>e.id!==t),w())},addLifeArea(t){if(u.profile.locked)return{ok:!1,reason:"Profile is locked"};const e=String(t||"").trim().slice(0,60);if(!e)return{ok:!1,reason:"Name the life area"};if((u.profile.lifeAreas||[]).length>=20)return{ok:!1,reason:"Max 20 areas"};const a={id:W("a"),title:e,description:""};return u.profile.lifeAreas.push(a),w(),{ok:!0,id:a.id}},updateLifeArea(t,e={}){if(u.profile.locked)return;const a=(u.profile.lifeAreas||[]).find(s=>s.id===t);a&&(e.title!=null&&(a.title=String(e.title).trim().slice(0,60)||a.title),e.description!=null&&(a.description=String(e.description).slice(0,1e3)),w())},moveLifeArea(t,e){if(u.profile.locked)return;const a=u.profile.lifeAreas||[],s=a.findIndex(r=>r.id===t),i=s+e;if(s<0||i<0||i>=a.length)return;const[n]=a.splice(s,1);a.splice(i,0,n),w()},removeLifeArea(t){u.profile.locked||(u.profile.lifeAreas=(u.profile.lifeAreas||[]).filter(e=>e.id!==t),w())},addProfileGoal(t,e,a){if(u.profile.locked)return{ok:!1,reason:"Profile is locked"};const s=String(t||"").trim().slice(0,200);if(!s)return{ok:!1,reason:"Write your goal first"};const i=xe.includes(e)?e:"short",n=Et[i],r=n.includes(a)?a:n[0];if((u.profile.pGoals||[]).length>=100)return{ok:!1,reason:"Too many goals (100)"};const o={id:W("g"),text:s,term:i,duration:r,createdAt:new Date().toISOString()};return u.profile.pGoals.push(o),w(),{ok:!0,id:o.id}},updateProfileGoal(t,e={}){if(u.profile.locked)return;const a=(u.profile.pGoals||[]).find(s=>s.id===t);if(a){if(e.text!=null&&(a.text=String(e.text).trim().slice(0,200)||a.text),e.term!=null&&xe.includes(e.term)){a.term=e.term;const s=Et[a.term];s.includes(a.duration)||(a.duration=s[0])}e.duration!=null&&Et[a.term].includes(e.duration)&&(a.duration=e.duration),w()}},removeProfileGoal(t){u.profile.locked||(u.profile.pGoals=(u.profile.pGoals||[]).filter(e=>e.id!==t),w())},addQuote(t,e){if(u.profile.locked)return{ok:!1,reason:"Profile is locked"};const a=String(t||"").trim().slice(0,500);if(!a)return{ok:!1,reason:"Write the quote first"};if((u.profile.quotes||[]).length>=200)return{ok:!1,reason:"Too many quotes (200)"};const s={id:W("q"),text:a,author:String(e||"").trim().slice(0,80),fav:!1,createdAt:new Date().toISOString()};return u.profile.quotes.push(s),w(),{ok:!0,id:s.id}},updateQuote(t,e={}){if(u.profile.locked)return;const a=(u.profile.quotes||[]).find(s=>s.id===t);a&&(e.text!=null&&(a.text=String(e.text).trim().slice(0,500)||a.text),e.author!=null&&(a.author=String(e.author).trim().slice(0,80)),w())},toggleQuoteFav(t){if(u.profile.locked)return;const e=(u.profile.quotes||[]).find(a=>a.id===t);e&&(e.fav=!e.fav,w())},removeQuote(t){u.profile.locked||(u.profile.quotes=(u.profile.quotes||[]).filter(e=>e.id!==t),w())},getCategories(){return at().map(t=>({...t}))},getCustomCategories(){return _.map(t=>({...t}))},addCategory(t){const e=String(t||"").trim().slice(0,30);if(!e)return{ok:!1,reason:"Type a category name"};if(at().some(i=>i.label.toLowerCase()===e.toLowerCase()))return{ok:!1,reason:"That category already exists"};if(_.length>=20)return{ok:!1,reason:"Too many categories (max 20 custom)"};let s=`c${Date.now().toString(36)}`;return at().some(i=>i.id===s)&&(s=`c${Date.now().toString(36)}${Math.floor(Math.random()*99)}`),_.push({id:s,label:e}),w(),{ok:!0,id:s}},renameCategory(t,e){const a=_.find(n=>n.id===t);if(!a)return{ok:!1,reason:"Built-in categories can’t be renamed"};const s=String(e||"").trim().slice(0,30);return s?at().some(n=>n.id!==t&&n.label.toLowerCase()===s.toLowerCase())?{ok:!1,reason:"That category already exists"}:(a.label=s,w(),{ok:!0}):{ok:!1,reason:"Type a category name"}},updateCategory(t,e={}){const a=_.find(s=>s.id===t);if(!a){if(!jt.find(n=>n.id===t))return{ok:!1,reason:"Category not found"};const i={...et[t]||{}};return e.color!==void 0&&(i.color=String(e.color).slice(0,20)),e.goals!==void 0&&(i.goals=String(e.goals).slice(0,1e3)),et[t]=i,u.categoryOverrides=et,w(),{ok:!0}}return e.color!==void 0&&(a.color=String(e.color).slice(0,20)),e.goals!==void 0&&(a.goals=String(e.goals).slice(0,1e3)),w(),{ok:!0}},deleteCategory(t){const e=_.findIndex(a=>a.id===t);return e<0?{ok:!1,reason:"Built-in categories can’t be deleted"}:(_.splice(e,1),u.habits.forEach(a=>{a.category===t&&(a.category="mentally")}),(u.archivedHabits||[]).forEach(a=>{a.category===t&&(a.category="mentally")}),u.pinnedTasks.forEach(a=>{a.category===t&&(a.category="mentally")}),Object.values(u.days).forEach(a=>{(a.tasks||[]).forEach(s=>{s.category===t&&(s.category="mentally")})}),w(),{ok:!0})},getAllTags(){const t=new Map,e=a=>{C(a).forEach(s=>{t.set(s,(t.get(s)||0)+1)})};return u.habits.forEach(a=>e(a.tags)),(u.archivedHabits||[]).forEach(a=>e(a.tags)),u.pinnedTasks.forEach(a=>e(a.tags)),Object.values(u.days).forEach(a=>{(a.tasks||[]).forEach(s=>e(s.tags))}),[...t.entries()].map(([a,s])=>({tag:a,count:s})).sort((a,s)=>s.count-a.count||a.tag.localeCompare(s.tag))},renameTag(t,e){const a=String(t||"").trim(),s=C(e)[0]||"";if(!a||!s)return{ok:!1,reason:"Type a tag name"};if(a.toLowerCase()===s.toLowerCase()){const r=o=>C((o||[]).map(l=>String(l).toLowerCase()===a.toLowerCase()?s:l));return u.habits.forEach(o=>{o.tags=r(o.tags)}),(u.archivedHabits||[]).forEach(o=>{o.tags=r(o.tags)}),u.pinnedTasks.forEach(o=>{o.tags=r(o.tags)}),Object.values(u.days).forEach(o=>{(o.tasks||[]).forEach(l=>{l.tags=r(l.tags)})}),w(),{ok:!0}}const i=this.getAllTags().some(r=>r.tag.toLowerCase()===s.toLowerCase()),n=r=>{const o=(r||[]).map(l=>String(l).toLowerCase()===a.toLowerCase()?s:l);return C(o)};return u.habits.forEach(r=>{r.tags=n(r.tags)}),(u.archivedHabits||[]).forEach(r=>{r.tags=n(r.tags)}),u.pinnedTasks.forEach(r=>{r.tags=n(r.tags)}),Object.values(u.days).forEach(r=>{(r.tasks||[]).forEach(o=>{o.tags=n(o.tags)})}),w(),{ok:!0,merged:i}},deleteTag(t){const e=String(t||"").trim().toLowerCase();if(!e)return{ok:!1,reason:"Pick a tag first"};const a=s=>(s||[]).filter(i=>String(i).toLowerCase()!==e);return u.habits.forEach(s=>{s.tags=a(s.tags)}),(u.archivedHabits||[]).forEach(s=>{s.tags=a(s.tags)}),u.pinnedTasks.forEach(s=>{s.tags=a(s.tags)}),Object.values(u.days).forEach(s=>{(s.tasks||[]).forEach(i=>{i.tags=a(i.tags)})}),w(),{ok:!0}},addTagToHabit(t,e){const a=u.habits.find(i=>i.id===t);if(!a)return{ok:!1,reason:"Pick a habit first"};const s=C(e)[0]||"";return s?(a.tags=C([...a.tags||[],s]),w(),{ok:!0}):{ok:!1,reason:"Type a tag name"}},categoryChart(t,e){const a=["week","month","year"].includes(t)?t:"week",s=`${a}|${e}|${Ea}`;return fe.key===s?fe.value:ot(()=>this._buildCategoryChart(a,e,s))},_buildCategoryChart(t,e,a){const s=at(),i=[];if(t==="year"){const m=String(e).slice(0,4);for(let b=0;b<12;b++){const p=String(b+1).padStart(2,"0"),k=new Date(Number(m),b+1,0).getDate();i.push({label:new Date(Number(m),b,1).toLocaleDateString(void 0,{month:"short"}),title:new Date(Number(m),b,1).toLocaleDateString(void 0,{month:"long",year:"numeric"}),keys:this.rangeKeys(`${m}-${p}-01`,`${m}-${p}-${String(k).padStart(2,"0")}`)})}}else{const[m,b]=this.resolveRange(t,e);this.rangeKeys(m,b).forEach(p=>{const k=new Date(`${p}T00:00:00`);i.push({label:t==="week"?k.toLocaleDateString(void 0,{weekday:"narrow"}):String(k.getDate()),title:p,keys:[p]})})}const n={},r={};s.forEach(m=>{n[m.id]=i.map(()=>0),r[m.id]=0}),i.forEach((m,b)=>{m.keys.forEach(p=>{this.categoryBreakdown(p).forEach(k=>{k.id in n||(n[k.id]=i.map(()=>0),r[k.id]=0),n[k.id][b]+=k.earned||0,r[k.id]+=k.earned||0})})});const o=i.map((m,b)=>s.reduce((p,k)=>p+(n[k.id]?n[k.id][b]:0),0)),l=Math.max(1,...o),c={kind:t,labels:i.map(m=>m.label),titles:i.map(m=>m.title),cats:s.map(m=>({...m})),perCat:n,totals:r,max:l,grandTotal:o.reduce((m,b)=>m+b,0)};return fe={key:a,value:c},c},getGoals(){return u.goals},getBadges(){return[...u.badges].sort((t,e)=>{const a=Ve(e.tier)-Ve(t.tier);return a!==0?a:String(e.earnedAt).localeCompare(String(t.earnedAt))})},topBadges(t=3){return this.getBadges().slice(0,t)},addGoal(t={}){const e=we({...t,id:X("g")});return u.goals.push(e),w(),this.checkGoals(j()),e},updateGoal(t,e={}){const a=u.goals.find(i=>i.id===t);if(!a)return;const s=we({...a,...e,id:t});Object.assign(a,s),w(),this.checkGoals(j())},removeGoal(t){u.goals=u.goals.filter(e=>e.id!==t),w()},findGoal(t){return u.goals.find(e=>e.id===t)||null},taskListGoals(){return u.goals.filter(t=>t.kind==="task-list")},openTaskListGoals(){return u.goals.filter(t=>t.kind==="task-list"&&!t.locked)},undoneDayTasks(t=60){const e=[],a=new Set;return Object.keys(u.days).sort().reverse().forEach(s=>{(u.days[s]&&u.days[s].tasks||[]).forEach(n=>{if(!n||n.done)return;const r=String(n.title||"").trim();if(!r)return;const o=r.toLowerCase();a.has(o)||(a.add(o),e.push({title:r,category:n.category,points:Number(n.points)||0,date:s}))})}),e.slice(0,t)},addGoalItem(t,e){const a=u.goals.find(i=>i.id===t);if(!a||a.kind!=="task-list")return{ok:!1,reason:"No such goal"};if(a.locked||a.terminated)return{ok:!1,reason:"This goal is locked — unlock it first"};const s=String(e||"").trim().slice(0,120);return s?a.tasks.length>=100?{ok:!1,reason:"Goal list is full (100 tasks)"}:(a.tasks.push({id:X("gt"),title:s,done:!1,doneAt:null}),w(),{ok:!0}):{ok:!1,reason:"Type a task first"}},addGoalItems(t,e){const a=u.goals.find(n=>n.id===t);if(!a||a.kind!=="task-list")return{ok:!1,reason:"No such goal"};if(a.locked||a.terminated)return{ok:!1,reason:"This goal is locked — unlock it first"};const s=new Set(a.tasks.map(n=>n.title.toLowerCase())),i=[];return(Array.isArray(e)?e:[]).forEach(n=>{const r=String(n||"").trim().slice(0,120);if(!r)return;const o=r.toLowerCase();s.has(o)||a.tasks.length>=100||(s.add(o),a.tasks.push({id:X("gt"),title:r,done:!1,doneAt:null}),i.push(r))}),w(),{ok:!0,added:i.length}},removeGoalItem(t,e){const a=u.goals.find(s=>s.id===t);return!a||a.kind!=="task-list"||a.locked?{ok:!1,reason:"Unlock the goal to edit its tasks"}:(a.tasks=a.tasks.filter(s=>s.id!==e),w(),{ok:!0})},setGoalItemDone(t,e,a){const s=u.goals.find(o=>o.id===t);if(!s||s.kind!=="task-list")return{ok:!1,reason:"No such goal"};if(s.locked)return{ok:!1,reason:"Unlock the goal to edit its tasks"};const i=s.tasks.find(o=>o.id===e);if(!i)return{ok:!1,reason:"No such task in the goal"};i.done=!!a,i.doneAt=a?new Date().toISOString():null;const n=this._refreshTaskListGoal(s);let r=[];return n&&(r=this.checkGoals()),w(),{ok:!0,autoLocked:n,awarded:r}},setGoalLocked(t,e){const a=u.goals.find(s=>s.id===t);return!a||a.kind!=="task-list"?{ok:!1,reason:"No such goal"}:(e?(a.locked=!0,a.tasks.length>0&&a.tasks.every(i=>i.done)||(a.terminated=!0)):a.locked=!1,w(),{ok:!0})},_refreshTaskListGoal(t){return t.tasks.length>0&&t.tasks.every(a=>a.done)&&!t.locked?(t.locked=!0,!0):!1},removeBadge(t){u.badges=u.badges.filter(e=>e.id!==t),w()},perfectDaysCount(){return ot(()=>Object.keys(u.days).filter(t=>{const e=this.scoreFor(t);return e.max>0&&e.percent===100}).length)},taskStreak(t,e){let a=e,s=0;(r=>{const o=u.days[r];return!o||!Array.isArray(o.tasks)?!1:o.tasks.some(l=>l.sourcePinId===t&&l.done)})(a)||(a=Ct(a));let n=0;for(;s<400;){s+=1;const r=u.days[a];if(!r||!Array.isArray(r.tasks))break;if(r.tasks.some(o=>o.sourcePinId===t&&o.done)){n+=1,a=Ct(a);continue}break}return n},goalProgress(t,e){const a=e||j();if(t.kind==="habit-streak"){const i=this.habitStreak(t.targetId,a);return{current:i,target:t.targetDays,done:i>=t.targetDays}}if(t.kind==="task-streak"){const i=this.taskStreak(t.targetId,a);return{current:i,target:t.targetDays,done:i>=t.targetDays}}if(t.kind==="task-list"){const i=t.tasks||[],n=i.filter(r=>r.done).length;return{current:n,target:Math.max(i.length,1),done:i.length>0&&n===i.length}}const s=this.perfectDaysCount();return{current:s,target:t.targetDays,done:s>=t.targetDays}},checkGoals(t){const e=t||j();let a=[];return u.goals.forEach(s=>{if(u.badges.some(n=>n.goalId===s.id))return;if(this.goalProgress(s,e).done){const n={id:X("b"),goalId:s.id,title:s.title,tier:s.tier,rewardTitle:s.rewardTitle,earnedAt:new Date().toISOString()};u.badges.push(n),a.push(n)}}),a.length&&w(),a},scoreFor(t){return ot(()=>this._scoreFor(t))},_scoreFor(t){const e=this.getDay(t),a=this.getHabits(t),s=this.isLocked(t),i=u.settings.showConscious!==!1,n=a.reduce((S,y)=>{const D=this.habitRating(t,y.id);return S+Math.round(y.points*D/5)},0),r=i?a.reduce((S,y)=>S+(this.habitRating(t,y.id)>0?V(y.consciousPoints):0),0):0,o=e.tasks.reduce((S,y)=>S+(y.done?y.points:0),0),l=a.reduce((S,y)=>S+y.points,0),c=i?a.reduce((S,y)=>S+V(y.consciousPoints),0):0,m=e.tasks.reduce((S,y)=>S+y.points,0),b=n+r+o,p=l+c+m,k=a.filter(S=>e.habitMissed&&e.habitMissed[S.id]?!0:s&&this.habitRating(t,S.id)<=0).length,x=e.tasks.filter(S=>S.done?!1:S.missed===!0?!0:S.missed===!1?!1:s).length;return{earned:b,max:p,habitScore:n,consciousScore:r,maxConscious:c,taskScore:o,completedHabits:a.filter(S=>this.habitRating(t,S.id)>0).length,habitAvg:a.length?Math.round(a.reduce((S,y)=>S+this.habitRating(t,y.id),0)/a.length*10)/10:0,totalHabits:a.length,completedTasks:e.tasks.filter(S=>S.done).length,totalTasks:e.tasks.length,missedHabits:k,missedTasks:x,percent:p?Math.round(b/p*100):0,locked:s,submittedAt:e.submittedAt}},monthKeys(t){const e=String(t).slice(0,7);return Object.keys(u.days).filter(a=>a.startsWith(e)).sort()},rangeKeys(t,e){const a=[],s=new Date(`${t}T00:00:00`),i=new Date(`${e}T00:00:00`);let n=0;for(;s<=i&&n<732;)n+=1,a.push(j(s)),s.setDate(s.getDate()+1);return a},resolveRange(t,e){if(t==="day")return[e,e];if(t==="week"){const s=new Date(`${e}T00:00:00`),i=new Date(s);i.setDate(s.getDate()-(s.getDay()-this.getWeekStart()+7)%7);const n=new Date(i);return n.setDate(i.getDate()+6),[j(i),j(n)]}if(t==="month"){const[s,i]=e.split("-").map(Number),n=`${s}-${String(i).padStart(2,"0")}-01`,r=new Date(s,i,0).getDate(),o=`${s}-${String(i).padStart(2,"0")}-${String(r).padStart(2,"0")}`;return[n,o]}if(t==="year"){const s=e.slice(0,4);return[`${s}-01-01`,`${s}-12-31`]}const a=Object.keys(u.days).sort();return a.length?[a[0],a[a.length-1]>e?a[a.length-1]:e]:[e,e]},exportRows(t,e){return ot(()=>this._exportRows(t,e))},_exportRows(t,e){return this.rangeKeys(t,e).map(a=>{const s=this.getDay(a),i=this.getHabits(a),n=this.scoreFor(a),r=this.isLocked(a),o=(c,m)=>m>0?"done":r?"missed":"pending",l=c=>c.done?"done":r?"missed":"pending";return{date:a,earned:n.earned,max:n.max,percent:n.percent,habitScore:n.habitScore,consciousScore:n.consciousScore||0,taskScore:n.taskScore,locked:r,missedHabits:n.missedHabits||0,missedTasks:n.missedTasks||0,note:s.note||"",habits:i.map(c=>{const m=this.habitRating(a,c.id);return{name:c.name,description:String(c.description||""),category:nt(L(c.category)),tags:C(c.tags),points:c.points,consciousPoints:this.consciousEnabled()?V(c.consciousPoints):0,rating:m,earned:Math.round(c.points*m/5)+(m>0&&this.consciousEnabled()?V(c.consciousPoints):0),status:o(c.id,m)}}),tasks:s.tasks.map(c=>({title:c.title,category:nt(L(c.category)),tags:C(c.tags),points:c.points,rating:Math.max(0,Math.min(5,Number(c.rating)||0)),done:!!c.done,earned:c.done?c.points:0,status:c.forwardedFrom?`forwarded from ${c.forwardedFrom}`:l(c),forwardedFrom:c.forwardedFrom||"",forwardedTo:Array.isArray(c.forwardedTo)?c.forwardedTo:[],description:c.description||"",hasImage:!!c.image}))}})},history(t=14){return ot(()=>Object.keys(u.days).sort().reverse().slice(0,t).map(a=>({date:a,...this.scoreFor(a),note:u.days[a].note,locked:lt(a),submittedAt:u.days[a].submittedAt})))},week(t){return ot(()=>{const e=new Date(t);return e.setDate(e.getDate()-(e.getDay()-this.getWeekStart()+7)%7),e.setHours(0,0,0,0),Array.from({length:7},(a,s)=>{const i=new Date(e);i.setDate(e.getDate()+s);const n=j(i),r=u.days[n];return{date:n,label:i.toLocaleDateString(void 0,{weekday:"short"}),dayOfMonth:i.getDate(),hasRecord:!!r,note:String(r&&r.note||""),locked:lt(n),...this.scoreFor(n)}})})}};function Na(t){return t>=90?"Excellent":t>=75?"Great day":t>=50?"Keep going":t>0?"Started":"No score yet"}function U(t){return new Date(`${t}T00:00:00`).toLocaleDateString(void 0,{weekday:"long",month:"short",day:"numeric"})}function Hi(t){return t?new Date(t).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}):""}function se(t){return t>=5?"Excellent":t>=4?"Great":t>=3?"Good":t>=2?"Fair":t>=1?"Low":"Not rated"}const be=document.getElementById("app"),Ha="daily-report-2026-11-06T21-05-46-mw5grsus",ia=`v1.1 — Auto-update · Offline · Backup (${Ha.slice(-8)})`;let v=d.todayKey(),H="today",A=null,$=null,Q=!1,ut=!1;const Jt=new Set;let mt=!1,ne=!1,yt=null,rt=!1,oe=!1,Ee=null,dt="Idle.",J="week",Z="all",tt=0,re=null,G="month",de=null,F=[],it=0,ht=null;const ct=new Set,St=new Map;let It=!1,Qt="all",K="short",xt="1 Week";const Lt=new Set;let Xt=null;const Zt=new Set;window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),yt=t});window.addEventListener("appinstalled",()=>{yt=null,f("Second Mind installed"),h()});const Ii=[["default","Default"],["points","Points"],["category","Category"],["tags","Tags"],["custom","Custom"]];function sa(t){const e=new Date(`${v}T00:00:00`);e.setDate(e.getDate()+t),v=d.todayKey(e)}let ye=d.todayKey();function Ge(){const t=d.todayKey();if(t===ye)return!1;const e=ye;return ye=t,v===e&&(v=t),re=null,de=null,F=[],it=0,tt=0,!0}function E(t){return{home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z"/></svg>',profile:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/></svg>',history:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8v5l3 2"/><circle cx="12" cy="12" r="9"/></svg>',settings:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H8a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V8c.3.7.9 1.2 1.6 1.3H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1.7z"/></svg>',pin:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4h6l-1 7 3 3v2H7v-2l3-3z" fill="currentColor" stroke="none"/><path d="M12 16v5"/></svg>',forward:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',swap:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h13l-3.5-3.5M20 16H7l3.5 3.5"/></svg>',undo:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h11a5 5 0 0 1 0 10H8"/><path d="M8 5 4 9l4 4"/></svg>',habit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h10M4 17h13"/></svg>',archive:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h18v4H3zM5 11v9h14v-9M9.5 15h5"/></svg>',trash:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg>',grip:'<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><circle cx="9" cy="6" r="1.7"/><circle cx="15" cy="6" r="1.7"/><circle cx="9" cy="12" r="1.7"/><circle cx="15" cy="12" r="1.7"/><circle cx="9" cy="18" r="1.7"/><circle cx="15" cy="18" r="1.7"/></svg>'}[t]}function Ia(t,e,a){return`
    <div class="stars" data-habit="${t}">
      ${[1,2,3,4,5].map(s=>`
            <button type="button" class="star ${s<=e?"on":""}" data-action="rate-habit" data-id="${t}" data-rating="${s}" ${a?"disabled":""} aria-label="${s} star">★</button>
          `).join("")}
    </div>
  `}function Fa(t,e,a){return`
    <div class="stars stars-small" data-task="${t}">
      ${[1,2,3,4,5].map(s=>`
            <button type="button" class="star small ${s<=e?"on":""}" data-action="rate-task" data-id="${t}" data-rating="${s}" ${a?"disabled":""} aria-label="${s} star">★</button>
          `).join("")}
    </div>
  `}function Ra(t){const e=Number(t)||0;return e?`<span class="conscious-badge">🧠 +${e}</span>`:'<span class="item-meta">No conscious pts</span>'}const Fi=["mentally","psychology","physically","spiritually","socially"];function gt(t){const a=d.getCategories().find(n=>n.id===t),s=a&&a.color?a.color:R(t);return`<span class="cat-badge ${Fi.includes(t)?`cat-${t}`:"cat-custom"}" style="background:${s}22;color:${s};box-shadow:inset 0 0 0 1px ${s}55">${g(nt(t))}</span>`}function Le(t){const e=String(t||"");if(!e)return"Deleted";const a=new Date(e);return Number.isNaN(a.getTime())?"Deleted":`Deleted ${a.toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}`}const na={mentally:"#5b8cff",psychology:"#a06bff",physically:"#22b07d",spiritually:"#e8a51c",socially:"#14b8a6"},oa=["#f472b6","#38bdf8","#fb923c","#a3e635","#facc15","#e879f9"];function R(t,e){const s=d.getCategories().find(i=>i.id===t);return s&&s.color?s.color:na[t]?na[t]:oa[(e??0)%oa.length]}function st(t){const e=Array.isArray(t)?t.filter(Boolean):[];return e.length?`<div class="tag-row">${e.map(a=>`<span class="tag-chip">#${g(a)}</span>`).join("")}</div>`:""}function Oa(t){return!t||!t.image?"":`<button type="button" class="task-img-thumb" data-action="view-task-image" data-id="${t.id}" aria-label="View attached photo"><img src="${t.image}" alt="Task photo" loading="lazy" /></button>`}function ja(t){const e=String(t||"");if(!e.trim())return"";const a=e.split(`
`),s=/^\s*(?:•|-|[*])\s+(.*)$/,i=/^\s*\d+[.)]\s+(.*)$/;let n="",r=null;const o=()=>{r&&(n+=r==="ul"?"</ul>":"</ol>",r=null)};return a.forEach(l=>{const c=s.exec(l),m=!c&&i.exec(l);c?(r!=="ul"&&(o(),n+='<ul class="note-list">',r="ul"),n+=`<li>${g(c[1])||"&nbsp;"}</li>`):m?(r!=="ol"&&(o(),n+='<ol class="note-list">',r="ol"),n+=`<li>${g(m[1])||"&nbsp;"}</li>`):l.trim()?(o(),n+=`<p class="note-text">${g(l)}</p>`):(o(),n+='<p class="note-text">&nbsp;</p>')}),o(),n}function Ri(t){const e=ja(t);return e?`<div class="note" style="margin-top:10px">${e}</div>`:""}function Rt(t){return String(t||"").split(`
`).map(e=>e.replace(/^\s*(?:•|-|\*|\d+[.)])\s*/,"").trim()).filter(Boolean)}function Ot(t){return t.map(e=>`• ${e}`).join(`
`)}function ra(t,e){const a=String(t||"").split(`
`).map(s=>s.replace(/^\s*(?:•|-|\*)\s+/,"").trim()).filter(Boolean);return a.length?`<ul class="note-list idea-list">${a.map((s,i)=>`
        <li>
          <span>${g(s)}</span>
          ${e?"":`<button class="idea-remove" data-action="remove-idea" data-index="${i}" title="Remove idea" aria-label="Remove idea">✕</button>`}
        </li>`).join("")}</ul>`:""}function Ba(t,e,a){if(!t||t.disabled)return;const s=t.value||"",i=s.split(`
`),n=s.slice(0,t.selectionStart).split(`
`).length-1,r=s.slice(0,t.selectionEnd).split(`
`).length-1,o=t.selectionStart!==t.selectionEnd,l=o?n:0,c=o?r:i.length-1;if(e==="bullets"){const m=i.slice(l,c+1).every(b=>/^\s*(?:•|-|[*])\s+/.test(b)||!b.trim());for(let b=l;b<=c;b++)i[b].trim()&&(m?i[b]=i[b].replace(/^\s*(?:•|-|[*])\s+/,""):/^\s*(?:•|-|[*])\s+/.test(i[b])||(i[b]=`• ${i[b].replace(/^\s*/,"")}`))}else{const m=i.slice(l,c+1).every(p=>/^\s*\d+[.)]\s+/.test(p)||!p.trim());let b=1;for(let p=l;p<=c;p++){if(!i[p].trim())continue;const k=i[p].replace(/^\s*(?:\d+[.)]|•|-|[*])\s+/,"").replace(/^\s*/,"");i[p]=m?k:`${b}. ${k}`,b+=1}}t.value=i.join(`
`),a&&a(t.value);try{t.focus()}catch{}}function da(t){Ba(document.getElementById("day-note"),t,e=>d.setNote(v,e))}function la(t){Ba(document.getElementById("profile-values"),t,e=>d.setProfileField("values",e))}function Oi(t){return new Promise(e=>{if(!t||!String(t.type||"").startsWith("image/"))return e(null);const a=URL.createObjectURL(t),s=new Image,i=()=>{try{URL.revokeObjectURL(a)}catch{}},n=(r,o)=>new Promise(l=>{let c=s.naturalWidth||0,m=s.naturalHeight||0;if(!c||!m)return l(null);const b=Math.min(1,r/Math.max(c,m));c=Math.max(1,Math.round(c*b)),m=Math.max(1,Math.round(m*b));const p=document.createElement("canvas");p.width=c,p.height=m;try{p.getContext("2d").drawImage(s,0,0,c,m),l(p.toDataURL("image/jpeg",o))}catch{l(null)}});s.onload=async()=>{try{let r=await n(900,.72);r&&r.length>Yt&&(r=await n(600,.62)),r&&r.length>Yt&&(r=await n(400,.55)),i(),e(r&&r.length<=Yt?r:null)}catch{i(),e(null)}},s.onerror=()=>{i(),e(null)},s.src=a})}function ca(t,e){return`
    <select class="sort-select" data-sort-kind="${t}" aria-label="Sort ${t}">
      ${Ii.map(([a,s])=>`<option value="${a}" ${e===a?"selected":""}>${s}</option>`).join("")}
    </select>
  `}function ji(t){const e=d.getBadges(),a=d.topBadges(3),s=t.max>0&&t.percent===100,i=ne?e:a;return`
    <section class="section rewards-section">
      <div class="section-head">
        <h2>Rewards</h2>
        ${e.length>3?`<button class="ghost-btn compact" data-action="toggle-badges">${ne?"Show less":`More (${e.length}) ›`}</button>`:""}
      </div>
      ${s?`
        <div class="trophy-card">
          <div class="trophy-cup">🏆</div>
          <div>
            <div class="item-title">Gold Cup — Perfect day!</div>
            <div class="item-meta">100% of points on ${U(v)}</div>
          </div>
        </div>
      `:""}
      ${e.length?`
        <div class="rewards-grid">
          ${i.map(n=>`
            <article class="reward-card tier-${n.tier}">
              <div class="reward-medal">${te(n.tier)}</div>
              <div>
                <div class="item-title">${g(n.rewardTitle||n.title)}</div>
                <div class="item-meta">${g(n.title)} · ${Aa(n.tier)} · ${U((n.earnedAt||"").slice(0,10))}</div>
              </div>
            </article>
          `).join("")}
        </div>
      `:'<div class="empty">No rewards yet. Set a goal in Settings → Goals &amp; Rewards.</div>'}
    </section>
  `}function le(t){return`<span class="streak-badge">${t} day streak</span>`}function Ga(t){return t?`<span class="forward-badge from">↩ Forwarded from ${g(t)}</span>`:""}function ce(t){const e=Array.isArray(t)?t.filter(Boolean):[];return e.length?`<span class="forward-badge to">↪ Forwarded to ${g(e[e.length-1])}</span>`:""}function _a(t){return t?`<span class="forward-badge replace from">⇄ Replaced from ${g(t)}</span>`:""}function Bi(t){const e=d.getAllHabits().map(a=>({habit:a,to:d.habitReplacedTo(v,a.id)})).filter(a=>a.to);return e.length?`
    <div class="replaced-away">
      ${e.map(({habit:a,to:s})=>`
        <button type="button" class="forward-badge replace undo" data-action="undo-replace-habit" data-id="${a.id}" data-from="${v}" data-to="${s}" ${t?"disabled":""} title="${t?"Unlock the day to undo this":`Put ${g(a.name)} back on ${g(v)}`}">
          ⇄ ${g(a.name)} → ${g(s)}
        </button>`).join("")}
    </div>
  `:""}function qa(t,e){if(e)return`<button class="mini-btn" data-action="open-replace-habit" data-id="${t}" disabled title="Unlock the day to replace it">${E("swap")}</button>`;const a=d.habitReplaceDays(v,t);if(!a.allowed){const s=d.findHabit(t),i=s&&s.pin&&s.pin.mode==="forever"?"Pinned forever — no replace option":"No replace days before its next due day";return`<button class="mini-btn" data-action="open-replace-habit" data-id="${t}" disabled title="${i}">${E("swap")}</button>`}return`<button class="mini-btn" data-action="open-replace-habit" data-id="${t}" title="Replace this day with one of the ${a.days.length} day${a.days.length===1?"":"s"} before ${a.next}">${E("swap")}</button>`}function Gi(t){const e=new Date(`${t}T00:00:00`);return e.setDate(e.getDate()+1),d.todayKey(e)}function Me(){return`<button class="ghost-btn compact ${Q?"on":""}" data-action="toggle-edit">${Q?"Done":"Edit Mode"}</button>`}function _i(t){return t?'<span class="lock-badge">Locked</span>':'<span class="open-badge">Open</span>'}function qi(){d.checkGoals(v);const t=d.getDay(v),e=d.getSettings(),a=e.showConscious!==!1,s=d.getHabits(v),i=d.getTasks(v),n=d.scoreFor(v),r=Na(n.percent),o=v===d.todayKey(),l=d.isLocked(v);return`
    <div class="topbar">
      <div>
        <p class="kicker">${o?"Today":"Daily report"}</p>
        <h1>${U(v)}</h1>
      </div>
      <div class="date-nav">
        <button class="icon-btn" data-action="prev-day" aria-label="Previous day">‹</button>
        <button class="icon-btn" data-action="next-day" aria-label="Next day">›</button>
      </div>
    </div>

    <section class="score-hero ${l?"is-locked":""}">
      <div class="score-row">
        <div>
          <div class="score-value">${n.earned}</div>
          <div class="score-unit">of ${n.max||0} points</div>
        </div>
        <div class="hero-side">
          ${_i(l)}
          <div class="grade-pill">${r}</div>
        </div>
      </div>
      <div class="progress-track"><div class="progress-fill" style="width:${n.percent}%"></div></div>
      <div class="stats-grid ${a?"stats-4":"stats-3"}">
        <div class="stat"><span class="muted">Habits</span><b>${n.completedHabits}/${n.totalHabits}</b></div>
        <div class="stat"><span class="muted">Tasks</span><b>${n.completedTasks}/${n.totalTasks}</b></div>
        ${a?`<div class="stat"><span class="muted">Conscious</span><b>+${n.consciousScore||0}</b></div>`:""}
        <div class="stat"><span class="muted">Score</span><b>${n.percent}%</b></div>
      </div>
      <p class="lock-hint">
        ${l?`Submitted${t.submittedAt?` at ${Hi(t.submittedAt)}`:""}.${(n.missedHabits||0)+(n.missedTasks||0)>0?` ${(n.missedHabits||0)+(n.missedTasks||0)} missed (${n.missedHabits||0} habits, ${n.missedTasks||0} tasks) — unchecked items count as missed.`:" Nothing missed — all done."} Unlock in Settings to edit.`:`Auto-locks at ${e.lockTime}. Submit when the day is done. Unchecked items will count as missed once locked.`}
      </p>
      ${l?'<button class="ghost-btn full" data-action="goto-settings">Unlock in Settings</button>':'<button class="primary-btn full" data-action="submit-day">Submit and lock report</button>'}
      <div class="export-row">
        <span class="muted">Export:</span>
        <button class="ghost-btn compact" data-action="open-export">Excel / JSON / PDF</button>
      </div>
    </section>

    ${ji(n)}

    <section class="section">
      <div class="section-head">
        <h2>Habits</h2>
        <div class="head-actions">
          ${ca("habit",e.habitSort||"default")}
          ${Me()}
          <span class="points">+${n.habitScore}${a&&n.consciousScore?` +${n.consciousScore}🧠`:""} pts</span>
        </div>
      </div>
      ${["default","custom"].includes(e.habitSort||"default")&&s.length>1?'<p class="muted tight">Hold the grip button on a card, then drag it to a new spot.</p>':""}
      <div class="list">
        ${s.length?s.map(c=>{const m=d.habitRating(v,c.id),b=m>0,p=!b&&l,k=d.habitStreak(c.id,v),x=a&&Number(c.consciousPoints)||0;return`
                    <article class="item-card ${b?"done":""} ${p?"missed":""} ${l?"is-locked":""}" style="border-left:3px solid ${R(c.category)}" data-sortable="habit" data-id="${c.id}">
                      <button class="check" data-action="toggle-habit" data-id="${c.id}" ${l?"disabled":""}>✓</button>
                      <div class="item-body">
                        <div class="item-title">${g(c.name)} ${p?'<span class="missed-badge">Missed</span>':""}</div>
                        <div class="item-meta">${gt(c.category)} ${c.pin?wt(c.pin):"Not pinned"} · ${m?`${m}/5 ${se(m)}`:l?"Missed":"Not rated"}</div>
                        ${c.description?`<p class="item-desc">${g(c.description)}</p>`:""}
                        ${a?`<div class="item-meta">${le(k)} ${Ra(x)}</div>`:`<div class="item-meta">${le(k)}</div>`}
                        ${ce(d.habitForwardedTo(v,c.id))}
                        ${_a(d.habitReplacedFrom(v,c.id))}
                        ${st(c.tags)}
                        ${Ia(c.id,m,l)}
                      </div>
                      <div class="item-side">
                        <div class="points">+${c.points}${x?` +${x}🧠`:""}</div>
                      </div>
                      <div class="item-actions">
                        <button class="drag-handle" aria-label="Hold and drag to reorder" title="Hold and drag to reorder" ${l?"disabled":""}>${E("grip")}</button>
                        <div class="mini-actions">
                          ${Q?`<button class="mini-btn on" data-action="open-edit-habit" data-id="${c.id}" ${l?"disabled":""}>Edit</button>`:""}
                          ${qa(c.id,l)}
                          <button class="mini-btn ${c.pin?"on":""}" data-action="open-pin-habit" data-id="${c.id}" ${l?"disabled":""} title="Pin habit">${E("pin")}</button>
                          <button class="mini-btn" data-action="archive-habit" data-id="${c.id}" ${l?"disabled":""} title="Archive habit" aria-label="Archive habit">${E("archive")}</button>
                        </div>
                      </div>
                    </article>
                  `}).join(""):'<div class="empty">No habits for this day. Tap + to add one.</div>'}
      </div>
      ${Bi(l)}
    </section>

    <section class="section">
      <div class="section-head">
        <h2>Tasks</h2>
        <div class="head-actions">
          ${ca("task",e.taskSort||"default")}
          ${Me()}
          <span class="points">+${n.taskScore} pts</span>
        </div>
      </div>
      ${["default","custom"].includes(e.taskSort||"default")&&i.length>1?'<p class="muted tight">Hold the grip button on a card, then drag it to a new spot.</p>':""}
      <div class="list">
        ${i.length?i.map(c=>{const m=!!c.sourcePinId,b=m?d.findPinnedTask(c.sourcePinId):null,p=Math.max(0,Math.min(5,Number(c.rating)||0)),k=!c.done&&l;return`
                    <article class="item-card ${c.done?"done":""} ${k?"missed":""} ${l?"is-locked":""}" style="border-left:3px solid ${R(c.category)}" data-sortable="task" data-id="${c.id}">
                      <button class="check" data-action="toggle-task" data-id="${c.id}" ${l?"disabled":""}>✓</button>
                      <div class="item-body">
                        <div class="item-title">${g(c.title)} ${k?'<span class="missed-badge">Missed</span>':""}</div>
                        <div class="item-meta">${gt(c.category)} ${b?wt(b.pin):"One-time task"} · ${c.done?"Done":l?"Missed":"Pending"} · ${p?`${p}/5 ${se(p)}`:"No rating"}</div>
                        ${c.description?`<p class="item-desc">${g(c.description)}</p>`:""}
                        ${Ga(c.forwardedFrom)}
                        ${ce(c.forwardedTo)}
                        ${st(c.tags)}
                        ${c.image?'<span class="task-img-badge">📷 Photo attached</span>':""}
                        ${Oa(c)}
                        ${Fa(c.id,p,l)}
                      </div>
                      <div class="item-side">
                        <div class="points">+${c.points}</div>
                      </div>
                      <div class="item-actions">
                        <button class="drag-handle" aria-label="Hold and drag to reorder" title="Hold and drag to reorder" ${l?"disabled":""}>${E("grip")}</button>
                        <div class="mini-actions">
                          ${Q?`<button class="mini-btn on" data-action="open-edit-task" data-id="${c.id}" ${l?"disabled":""}>Edit</button>`:""}
                          <button class="mini-btn" data-action="open-forward-task" data-id="${c.id}" ${l?"disabled":""} title="Forward task to another day">${E("forward")}</button>
                          <button class="mini-btn ${m?"on":""}" data-action="open-pin-task" data-id="${c.id}" ${l?"disabled":""} title="Pin task">${E("pin")}</button>
                          <button class="mini-btn" data-action="archive-task" data-id="${c.id}" ${l?"disabled":""} title="Archive task" aria-label="Archive task">${E("archive")}</button>
                          ${Q?`<button class="mini-btn danger" data-action="remove-task" data-id="${c.id}" ${l?"disabled":""} title="Delete task" aria-label="Delete task">${E("trash")}</button>`:""}
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
      <textarea id="day-note" placeholder="How did today go? Tip: use • Bullets for lists." ${l?"disabled":""}>${g(t.note)}</textarea>
    </section>

    ${Wi()}
  `}function Wi(){const t=d.getArchivedHabits(),e=d.getArchivedTasks(),a=t.length+e.length,s=[...e.map(i=>`
      <article class="manage-card archived" style="border-left:4px solid ${R(i.category)}">
        <div class="section-head">
          <div>
            <div class="item-title">${g(i.title)} <span class="archive-kind">Task</span></div>
            <div class="item-meta">${gt(i.category)} · +${i.points} pts${i.fromDate?` · from ${g(i.fromDate)}`:""}${i.originDate&&i.originDate!==i.fromDate?` · created ${g(i.originDate)}`:""} · ${Le(i.archivedAt)}</div>
            ${i.description?`<p class="item-desc">${g(i.description)}</p>`:""}
            ${st(i.tags)}
          </div>
          <div class="mini-actions">
            <button class="mini-btn on" data-action="restore-task" data-id="${i.id}" title="Restore task to the selected day" aria-label="Restore task">${E("undo")}</button>
            ${Q?`<button class="mini-btn danger" data-action="delete-archived-task" data-id="${i.id}" title="Delete permanently" aria-label="Delete permanently">${E("trash")}</button>`:""}
          </div>
        </div>
      </article>
    `),...t.map(i=>`
      <article class="manage-card archived" style="border-left:4px solid ${R(i.category)}">
        <div class="section-head">
          <div>
            <div class="item-title">${g(i.name)} <span class="archive-kind">Habit</span></div>
            <div class="item-meta">${gt(i.category)} · +${i.points} pts${i.pin?` · ${wt(i.pin)}`:" · Pin ended"} · ${Le(i.archivedAt)}</div>
            ${i.description?`<p class="item-desc">${g(i.description)}</p>`:""}
            ${st(i.tags)}
          </div>
          <div class="mini-actions">
            <button class="mini-btn on" data-action="restore-habit" data-id="${i.id}" title="Restore habit" aria-label="Restore habit">${E("undo")}</button>
            <button class="mini-btn danger" data-action="delete-archived-habit" data-id="${i.id}" title="Delete permanently" aria-label="Delete permanently">${E("trash")}</button>
          </div>
        </div>
      </article>
    `)];return`
    <section class="section archive-section">
      <button type="button" class="archive-head" data-action="toggle-archive" aria-expanded="${mt}">
        <span class="archive-title">${E("archive")} Archive</span>
        <span class="archive-count">${a}</span>
        <span class="archive-chevron" aria-hidden="true">${mt?"▾":"▸"}</span>
      </button>
      ${mt?`<div class="archive-list">${a?s.join(""):'<div class="empty">Nothing archived yet. Use the archive button on a habit or task to set it aside here.</div>'}</div>`:""}
    </section>
  `}function Kt(t){return t==="short"?"#short":t==="medium"?"#medium":"#long"}function Ui(){const t=d.getProfile(),e=!!t.locked,a=e?"disabled":"",s=Array.isArray(t.whoAmI)?t.whoAmI:[],i=Array.isArray(t.lifeAreas)?t.lifeAreas:[],n=Array.isArray(t.pGoals)?t.pGoals:[],r=Array.isArray(t.quotes)?t.quotes:[],o=d.profileGoalDurations();o[K].includes(xt)||(xt=o[K][0]);const l=y=>n.filter(D=>D.term===y).length,c=(Qt==="all"?n:n.filter(y=>y.term===Qt)).slice().sort((y,D)=>String(y.createdAt).localeCompare(String(D.createdAt))),m=r.slice().sort((y,D)=>!!y.fav!=!!D.fav?y.fav?-1:1:String(D.createdAt).localeCompare(String(y.createdAt))),b=m.slice(0,3),p=m.slice(3),k=String(t.name||"?").trim().slice(0,1).toUpperCase()||"?",S=String(t.ideas||"").split(`
`).map(y=>y.replace(/^\s*(?:•|-|\*)\s+/,"").trim()).filter(Boolean).length;return`
    <div class="topbar">
      <div>
        <p class="kicker">Profile</p>
        <h1>${g(t.name)||"My profile"}</h1>
      </div>
      <div class="date-nav">
        ${e?'<span class="lock-badge">🔒 Locked</span>':'<span class="open-badge">Open</span>'}
        <button class="ghost-btn compact" data-action="${e?"unlock-profile":"lock-profile"}">${e?"Unlock":"Lock"}</button>
      </div>
    </div>

    ${e?'<div class="profile-lock-banner">🔒 Profile is locked — read only. Tap <b>Unlock</b> to edit.</div>':'<p class="muted tight" style="margin-bottom:14px">Everything here saves automatically on this device and is included in backups. Tap <b>Lock</b> when your profile is final.</p>'}

    <section class="score-hero profile-hero">
      <div class="profile-hero-row">
        <div class="profile-avatar">${g(k)}</div>
        <div style="flex:1;min-width:0">
          <div class="item-title" style="font-size:18px">${g(t.name)||"Your name"}</div>
          <div class="item-meta">${s.length?`${s.length} identities`:"No identities yet"} · ${i.length} life areas · ${n.length} goals · ${r.length} quotes</div>
          ${t.wantToBe?`<p class="item-desc" style="margin-top:6px">“${g(t.wantToBe.slice(0,140))}${t.wantToBe.length>140?"…":""}”</p>`:""}
        </div>
      </div>
    </section>

    <section class="manage-card" style="margin-bottom:10px">
      <h2>Identity</h2>
      <p class="muted tight">Your display name and who you want to be.</p>
      <label>Name
        <input data-profile="name" maxlength="80" value="${g(t.name)}" placeholder="Your name…" ${a} />
      </label>
      <label>Want to be
        <textarea data-profile="wantToBe" maxlength="1000" placeholder="The person I want to be…" style="min-height:76px" ${a}>${g(t.wantToBe)}</textarea>
      </label>
    </section>

    <section class="manage-card" style="margin-bottom:10px">
      <div class="section-head">
        <div>
          <h2>Who I am</h2>
          <p class="muted tight">A list — reorder with ↑ ↓.</p>
        </div>
        <span class="item-meta">${s.length}/50</span>
      </div>
      ${e?"":`
        <div style="display:flex;gap:8px;margin-bottom:10px">
          <input id="new-whoami" maxlength="120" placeholder="e.g. A disciplined father…" style="flex:1;min-width:0" />
          <button class="primary-btn compact-btn" data-action="add-whoami">Add</button>
        </div>
      `}
      <div class="habit-manage">
        ${s.length?s.map((y,D)=>`
          <article class="manage-card whoami-row">
            <span class="whoami-num">${D+1}</span>
            <input class="whoami-input" data-whoami="${y.id}" maxlength="120" value="${g(y.text)}" ${a} aria-label="Who I am ${D+1}" />
            ${e?"":`
              <div class="mini-actions">
                <button class="mini-btn" data-action="move-whoami" data-id="${y.id}" data-dir="-1" ${D===0?"disabled":""} title="Move up">↑</button>
                <button class="mini-btn" data-action="move-whoami" data-id="${y.id}" data-dir="1" ${D===s.length-1?"disabled":""} title="Move down">↓</button>
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
        <span class="item-meta">${i.length}/20</span>
      </div>
      ${e?"":`
        <div style="display:flex;gap:8px;margin-bottom:10px">
          <input id="new-lifearea" maxlength="60" placeholder="e.g. Health, Family, Career…" style="flex:1;min-width:0" />
          <button class="primary-btn compact-btn" data-action="add-lifearea">Add</button>
        </div>
      `}
      ${i.length?`
        <div class="life-grid">
          ${i.map((y,D)=>{const Wt=ht===y.id;return`
              <article class="life-card ${Wt?"open":""}">
                <div class="life-head">
                  <button type="button" class="life-toggle" data-action="toggle-lifearea" data-id="${y.id}" aria-expanded="${Wt?"true":"false"}">
                    <b>${g(y.title)}</b>
                    <span>${Wt?"▾":"▸"}</span>
                  </button>
                  ${e?"":`
                    <div class="mini-actions">
                      <button class="mini-btn" data-action="move-lifearea" data-id="${y.id}" data-dir="-1" ${D===0?"disabled":""} title="Move up">↑</button>
                      <button class="mini-btn" data-action="move-lifearea" data-id="${y.id}" data-dir="1" ${D===i.length-1?"disabled":""} title="Move down">↓</button>
                    </div>
                  `}
                </div>
                ${Wt?`
                  <div class="life-body">
                    ${e?y.description?`<p class="item-desc">${g(y.description)}</p>`:'<p class="item-meta">No description yet.</p>':`
                      <label>Title
                        <input data-lifearea-title="${y.id}" maxlength="60" value="${g(y.title)}" />
                      </label>
                      <label>Description
                        <textarea data-lifearea-desc="${y.id}" maxlength="1000" placeholder="What does this area mean to you? What is going well?" style="min-height:70px">${g(y.description)}</textarea>
                      </label>
                      <button class="ghost-btn compact danger" data-action="remove-lifearea" data-id="${y.id}">Remove area</button>
                    `}
                  </div>
                `:y.description?`<p class="item-desc life-preview">${g(y.description.slice(0,90))}${y.description.length>90?"…":""}</p>`:""}
              </article>
            `}).join("")}
        </div>
      `:'<div class="empty">No life areas yet — add Health, Family, Career, Faith…</div>'}
    </section>

    <div class="profile-duo">
      <section class="manage-card">
        <h2>My Vision</h2>
        <p class="muted tight">The future you are working toward.</p>
        <textarea data-profile="vision" maxlength="1000" placeholder="Describe your vision…" style="min-height:110px" ${a}>${g(t.vision)}</textarea>
      </section>
      <section class="manage-card">
        <h2>Core &amp; Personal Values</h2>
        <p class="muted tight">The principles you live by — one per line.</p>
        ${e?t.values.trim()?`<div class="values-list">${ja(t.values)}</div>`:'<p class="item-meta">No values yet.</p>':`
            <div class="note-toolbar">
              <button type="button" class="ghost-btn compact" data-action="values-bullets" title="Bullet list (select lines or all values)">• Bullets</button>
              <button type="button" class="ghost-btn compact" data-action="values-numbered" title="Numbered list (select lines or all values)">1. Numbered</button>
            </div>
            <textarea id="profile-values" data-profile="values" maxlength="1000" placeholder="e.g.&#10;• Honesty&#10;• Discipline&#10;• Mercy" style="min-height:110px">${g(t.values)}</textarea>
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
      ${e?S?ra(t.ideas,!0):'<p class="item-meta">No ideas yet.</p>':`
          <div class="form" style="margin-bottom:10px">
            <label>New idea
              <input id="new-idea" maxlength="200" placeholder="e.g. Build a habit tracker app" />
            </label>
            <div style="display:flex;gap:8px">
              <button class="primary-btn compact-btn" data-action="add-idea">Add idea</button>
            </div>
          </div>
          ${S?`${ra(t.ideas,!1)}
               <p class="item-meta">Edit the text below — it saves itself.</p>
               <textarea data-profile="ideas" maxlength="4000" placeholder="• Idea one&#10;• Idea two" style="min-height:110px">${g(t.ideas)}</textarea>`:'<p class="item-meta">Empty — add your first idea above.</p>'}
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
              ${["short","medium","long"].map(y=>`<button type="button" class="chip hashtag-${y} ${K===y?"on":""}" data-action="set-pgoal-term" data-term="${y}">${Kt(y)}</button>`).join("")}
            </div>
          </div>
          <div class="row-2">
            <label>Timeframe
              <select id="new-pgoal-duration">
                ${o[K].map(y=>`<option value="${g(y)}" ${xt===y?"selected":""}>${g(y)}</option>`).join("")}
              </select>
            </label>
            <label style="justify-content:flex-end">&nbsp;
              <button class="primary-btn compact-btn" data-action="add-pgoal">Add goal</button>
            </label>
          </div>
          <p class="item-meta">${K==="short"?"Short term → pick a week (1–4 weeks).":K==="medium"?"Medium term → pick a month up to 3 months.":"Long term → a year or more."}</p>
        </div>
      `}
      <div class="chip-row" style="margin-bottom:10px">
        ${[["all",`All (${n.length})`],["short",`#short (${l("short")})`],["medium",`#medium (${l("medium")})`],["long",`#long (${l("long")})`]].map(([y,D])=>`<button type="button" class="chip ${Qt===y?"on":""}" data-action="set-pgoal-filter" data-filter="${y}">${D}</button>`).join("")}
      </div>
      <div class="habit-manage">
        ${c.length?c.map(y=>`
          <article class="manage-card pgoal-card term-${y.term}">
            <div class="pgoal-top">
              <span class="hashtag hashtag-${y.term}">${Kt(y.term)}</span>
              <span class="duration-pill">⏳ ${g(y.duration)}</span>
              ${e?"":`<button class="mini-btn" data-action="remove-pgoal" data-id="${y.id}" title="Remove goal">✕</button>`}
            </div>
            ${e?`<div class="item-title" style="margin-top:6px">${g(y.text)}</div>`:`
                <input data-pgoal-text="${y.id}" maxlength="200" value="${g(y.text)}" style="margin-top:8px" aria-label="Goal text" />
                <div class="row-2" style="margin-top:8px">
                  <select data-pgoal-term="${y.id}" aria-label="Goal term">
                    ${["short","medium","long"].map(D=>`<option value="${D}" ${y.term===D?"selected":""}>${Kt(D)}</option>`).join("")}
                  </select>
                  <select data-pgoal-duration="${y.id}" aria-label="Goal duration">
                    ${o[y.term].map(D=>`<option value="${g(D)}" ${y.duration===D?"selected":""}>${g(D)}</option>`).join("")}
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
      ${m.length?`
        <div class="quote-fav-head"><span class="item-title">★ Top 3 favourites</span></div>
        <div class="habit-manage" style="margin-bottom:8px">
          ${b.map(y=>ua(y,e)).join("")}
        </div>
        ${p.length?`
          <button class="ghost-btn compact full" data-action="toggle-quotes">${It?"Show less ▴":`More (${p.length}) — see the rest ▾`}</button>
          ${It?`<div class="habit-manage" style="margin-top:8px">${p.map(y=>ua(y,e)).join("")}</div>`:""}
        `:It&&!p.length?'<p class="item-meta">No more quotes — that is all of them.</p>':""}
      `:'<div class="empty">No quotes yet — add the words that move you.</div>'}
    </section>
  `}function ua(t,e){return`
    <article class="manage-card quote-card ${t.fav?"is-fav":""}">
      <p class="quote-text">“${g(t.text)}”</p>
      ${t.author?`<p class="item-meta">— ${g(t.author)}</p>`:""}
      <div class="quote-foot">
        ${e?`<span class="item-meta">${t.fav?"★ Favourite":""}</span>`:`
            <button class="mini-btn ${t.fav?"on":""}" data-action="toggle-quote-fav" data-id="${t.id}" title="Toggle favourite">★</button>
            <button class="mini-btn" data-action="remove-quote" data-id="${t.id}" title="Remove quote">✕</button>
          `}
      </div>
    </article>
  `}function zi(){document.querySelectorAll("[data-profile]").forEach(t=>{t.addEventListener("input",()=>{d.setProfileField(t.dataset.profile,t.value)||h()})}),document.querySelectorAll("[data-lifearea-title]").forEach(t=>{t.addEventListener("change",()=>{d.updateLifeArea(t.dataset.lifeareaTitle,{title:t.value}),h()})}),document.querySelectorAll("[data-lifearea-desc]").forEach(t=>{t.addEventListener("input",()=>{d.updateLifeArea(t.dataset.lifeareaDesc,{description:t.value})})}),document.querySelectorAll("[data-pgoal-text]").forEach(t=>{t.addEventListener("change",()=>{d.updateProfileGoal(t.dataset.pgoalText,{text:t.value}),h()})}),document.querySelectorAll("[data-pgoal-term]").forEach(t=>{t.addEventListener("change",()=>{d.updateProfileGoal(t.dataset.pgoalTerm,{term:t.value}),h()})}),document.querySelectorAll("[data-pgoal-duration]").forEach(t=>{t.addEventListener("change",()=>{d.updateProfileGoal(t.dataset.pgoalDuration,{duration:t.value}),h()})})}function Yi(){const t=Wa(v,tt*7),e=d.week(new Date(`${t}T00:00:00`)),a=e.reduce((n,r)=>n+r.earned,0),s=Math.round(a/7),i=tt===0?"This week":tt===-1?"1 week back":`${-tt} weeks back`;return`
    <section class="section">
      <div class="section-head">
        <h2>Weekly score</h2>
        <div class="date-nav">
          <button class="icon-btn" data-action="week-nav" data-dir="-1" aria-label="Previous week">‹</button>
          <button class="icon-btn" data-action="week-nav" data-dir="1" aria-label="Next week" ${tt>=0?"disabled":""}>›</button>
        </div>
      </div>
      <section class="score-hero">
        <div class="score-row">
          <div>
            <div class="score-value">${a}</div>
            <div class="score-unit">points · ${i}</div>
          </div>
          <div class="grade-pill">Avg ${s} pts</div>
        </div>
        <p class="lock-hint week-range">Week starting <b>${U(e[0].date)}</b> · ${e[0].label} – ${e[6].label}, ${U(e[6].date)}</p>
        <div class="week-days">
          ${e.map(n=>`
                <button class="day-cell ${n.date===v?"active":""} ${n.earned>0?"done":""}" data-action="pick-date" data-date="${n.date}" title="${g(n.date)}: ${n.earned} pts">
                  <span>${n.label.slice(0,2)}</span>
                  <b>${n.earned}</b>
                  ${n.locked?'<i class="dot-lock"></i>':""}
                </button>
              `).join("")}
        </div>
      </section>
    </section>
  `}function Vi(){const t=re||O(v),e=qe(t),a=d.todayKey();return`
    <section class="section">
      <div class="section-head">
        <h2>Reports calendar</h2>
        <div class="date-nav">
          <button class="icon-btn" data-action="history-cal-nav" data-dir="-1" aria-label="Previous month">‹</button>
          <button class="icon-btn" data-action="history-cal-nav" data-dir="1" aria-label="Next month">›</button>
        </div>
      </div>
      <div class="pin-cal">
        <div class="pin-cal-head"><b>${me(t)}</b></div>
        <div class="pin-cal-grid pin-cal-week">
          ${_e().map(s=>`<span>${s.label.slice(0,1)}</span>`).join("")}
        </div>
        <div class="pin-cal-grid">
          ${e.map(s=>{if(!s)return"<span></span>";const i=d.scoreFor(s),n=s===v?"on-selected":i.percent>=100?"on-perfect":i.earned>0?"on":"",r=i.locked?'<i class="dot-lock"></i>':"";return`<button type="button" class="pin-cal-day hist-cal-day ${n} ${s===a?"is-today":""}" data-action="pick-date" data-date="${s}" title="${g(s)}: ${i.earned}/${i.max} pts (${i.percent}%)"><b>${Number(s.slice(8,10))}</b><span>${i.earned}</span>${r}</button>`}).join("")}
        </div>
      </div>
    </section>
  `}function Ji(t){const e=new Map((t||[]).map(n=>[n.date,n])),a=de||O(v),s=qe(a),i=d.todayKey();return`
    <div class="pin-cal">
      <div class="pin-cal-head"><b>${me(a)}</b><span class="item-meta">${e.size} locked</span></div>
      <div class="pin-cal-grid pin-cal-week">
        ${_e().map(n=>`<span>${n.label.slice(0,1)}</span>`).join("")}
      </div>
      <div class="pin-cal-grid">
        ${s.map(n=>{if(!n)return"<span></span>";const r=e.get(n),o=!!r,l=F.includes(n)?"on-selected":o?"on-locked":"on-open",c=d.scoreFor(n),m=r?r.earned:c.earned;return`<button type="button" class="pin-cal-day hist-cal-day ${l} ${n===i?"is-today":""}" data-action="toggle-locked-day" data-date="${n}" title="${g(n)}: ${o?"Locked":"Open"} — ${m} pts"><b>${Number(n.slice(8,10))}</b><span>${m}</span></button>`}).join("")}
      </div>
    </div>
  `}function Qi(){return`
    <section class="manage-card export-card">
      <div class="section-head">
        <div>
          <div class="item-title">Select &amp; export</div>
          <div class="item-meta">Pick a day, week, month or year, then a format.</div>
        </div>
      </div>
      <div class="chip-row" style="margin-bottom:10px">
        ${["day","week","month","year"].map(t=>`<button type="button" class="chip ${G===t?"on":""}" data-action="set-histexp-range" data-range="${t}">${t[0].toUpperCase()}${t.slice(1)}</button>`).join("")}
      </div>
      ${G==="day"||G==="week"?`
        <label>Which ${G==="day"?"day":"week (pick any day in it)"}
          <input id="histexp-date" type="date" value="${v}" />
        </label>
      `:""}
      ${G==="month"?`
        <label>Which month
          <input id="histexp-month" type="month" value="${v.slice(0,7)}" />
        </label>
      `:""}
      ${G==="year"?`
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
  `}function Xi(){const t=d.week(new Date(`${v}T00:00:00`)),e=d.todayKey(),a=`${U(t[0].date)} – ${U(t[6].date)}`,s=t.reduce((r,o)=>r+(o.earned||0),0),i=t.reduce((r,o)=>r+(o.max||0),0),n=t.filter(r=>r.hasRecord).length;return`
    <div class="topbar">
      <div>
        <p class="kicker">Archive</p>
        <h1>Past reports</h1>
      </div>
      <button class="ghost-btn compact" data-action="open-export">Export</button>
    </div>
    ${Vi()}
    ${Yi()}
    ${Qi()}
    <section class="section">
      <div class="section-head">
        <h2>Week</h2>
        <span class="item-meta">${a}</span>
      </div>
      <p class="item-meta">${n} of 7 days reported · ${s} of ${i} pts</p>
      <div class="history-list">
        ${t.map(r=>{const o=!r.hasRecord,l=(r.missedHabits||0)+(r.missedTasks||0),c=o?"No report":`${r.locked?"Locked":"Open"} · ${Na(r.percent)} · ${r.earned}/${r.max} pts (${r.percent}%)${r.locked&&l>0?` · ❌ ${l} missed`:""}`;return`
              <article class="history-card ${o?"is-empty":""} ${r.date===e?"is-today":""} ${r.date===v?"is-selected":""}">
                <div class="section-head">
                  <div>
                    <div class="item-title">${g(r.label)} ${U(r.date)}</div>
                    <div class="item-meta">${g(c)}</div>
                  </div>
                  <button class="ghost-btn compact" data-action="pick-date" data-date="${r.date}">${o?"Add":"Open"}</button>
                </div>
                <div class="bar"><span style="width:${r.percent}%"></span></div>
                ${r.note?Ri(r.note):`<p class="item-meta">${o?"Nothing recorded this day.":"No note."}</p>`}
              </article>
            `}).join("")}
      </div>
    </section>
  `}function Wa(t,e){const a=new Date(`${t}T00:00:00`);return a.setDate(a.getDate()+e),d.todayKey(a)}function Zi(){return J==="month"?`${Mt(O(v),it)}-15`:J==="year"?`${Number(v.slice(0,4))+it}-06-15`:Wa(v,it*7)}function Ki(t){const[e,a]=d.resolveRange(J,t);return J==="week"?`${U(e)} – ${U(a)}`:J==="month"?me(e.slice(0,7)):e.slice(0,4)}function ts(){var c;const t=Zi(),e=d.categoryChart(J,t);Z!=="all"&&!e.cats.some(m=>m.id===Z)&&(Z="all");const a=Z==="all"?e.cats:e.cats.filter(m=>m.id===Z),s=Math.max(1,...e.labels.map((m,b)=>a.reduce((p,k)=>p+(e.perCat[k.id]?e.perCat[k.id][b]:0),0))),i=a.reduce((m,b)=>m+(e.totals[b.id]||0),0),n=Z==="all"?"All categories":((c=e.cats.find(m=>m.id===Z))==null?void 0:c.label)||"",r=it===0?J==="week"?"This week":J==="month"?"This month":"This year":Ki(t),o=e.labels.map((m,b)=>{const p=a.reduce((x,S)=>x+(e.perCat[S.id]?e.perCat[S.id][b]:0),0),k=a.map(x=>({cat:x,value:e.perCat[x.id]?e.perCat[x.id][b]:0})).filter(x=>x.value>0).map((x,S)=>`<span class="chart-seg" style="height:${Math.max(2,Math.round(x.value/s*100))}%;background:${R(x.cat.id,S)}" title="${g(x.cat.label)}: ${x.value} pts"></span>`).join("");return`
      <div class="chart-col" title="${g(e.titles[b])}: ${p} pts">
        <div class="chart-bar">${k||'<span class="chart-empty"></span>'}</div>
        <span class="chart-x">${g(m)}</span>
      </div>
    `}).join(""),l=a.map((m,b)=>`
      <span class="chart-legend-item"><i style="background:${R(m.id,b)}"></i>${g(m.label)} <b>${e.totals[m.id]||0}</b></span>
    `).join("");return`
    <section class="score-hero">
      <div class="section-head" style="margin-bottom:4px">
        <div>
          <div class="item-title">Progress chart</div>
          <div class="item-meta">${r} · ${i} pts total · ${g(n)}</div>
        </div>
      </div>
      <div class="chart-nav-row">
        <button type="button" class="mini-btn" data-action="chart-nav" data-dir="-1" aria-label="Previous ${J}">‹</button>
        <div class="chip-row">
          ${["week","month","year"].map(m=>`<button type="button" class="chip ${J===m?"on":""}" data-action="set-chart-range" data-range="${m}">${m[0].toUpperCase()}${m.slice(1)}</button>`).join("")}
        </div>
        <button type="button" class="mini-btn" data-action="chart-nav" data-dir="1" aria-label="Next ${J}">›</button>
      </div>
      <div class="chip-row chart-cat-row">
        <button type="button" class="chip chart-cat-chip ${Z==="all"?"on":""}" data-action="set-chart-cat" data-cat="all">All categories</button>
        ${e.cats.map((m,b)=>`
            <button type="button" class="chip chart-cat-chip ${Z===m.id?"on":""}" data-action="set-chart-cat" data-cat="${m.id}">
              <i style="background:${R(m.id,b)}"></i>${g(m.label)}
            </button>
          `).join("")}
      </div>
      <div class="chart-wrap${e.labels.length>12?" scroll-x":""}">${o}</div>
      <div class="chart-legend">${l}</div>
    </section>
  `}function es(t,e){const{locked:a,showC:s}=e,i=t.habits.map(r=>{const o=d.habitRating(v,r.id),l=!o&&a,c=d.habitStreak(r.id,v),m=s&&Number(r.consciousPoints)||0,b=o>0?m:0,p=Math.round(r.points*o/5)+b,k=r.points+m;return`
        <article class="item-card ${o?"done":""} ${l?"missed":""} ${a?"is-locked":""}" style="border-left:3px solid ${R(r.category)}">
          <button class="check" data-action="toggle-habit" data-id="${r.id}" ${a?"disabled":""}>✓</button>
          <div class="item-body">
            <div class="item-title">${g(r.name)} ${l?'<span class="missed-badge">Missed</span>':""}</div>
            <div class="item-meta">Habit · ${o?`${o}/5 ${se(o)}`:a?"Missed":"Not rated"} · ${le(c)}${s?` ${Ra(m)}`:""}</div>
            ${r.description?`<p class="item-desc">${g(r.description)}</p>`:""}
            ${ce(d.habitForwardedTo(v,r.id))}
            ${_a(d.habitReplacedFrom(v,r.id))}
            ${st(r.tags)}
            ${Ia(r.id,o,a)}
          </div>
          <div class="item-side">
            <div class="points">${p}/${k}</div>
            <div class="mini-actions">
              ${Q?`<button class="mini-btn on" data-action="open-edit-habit" data-id="${r.id}" ${a?"disabled":""}>Edit</button>`:""}
              ${qa(r.id,a)}
            </div>
          </div>
        </article>
      `}).join(""),n=t.tasks.map(r=>{const o=Math.max(0,Math.min(5,Number(r.rating)||0)),l=!r.done&&a;return`
        <article class="item-card ${r.done?"done":""} ${l?"missed":""} ${a?"is-locked":""}" style="border-left:3px solid ${R(r.category)}">
          <button class="check" data-action="toggle-task" data-id="${r.id}" ${a?"disabled":""}>✓</button>
          <div class="item-body">
            <div class="item-title">${g(r.title)} ${l?'<span class="missed-badge">Missed</span>':""}</div>
            <div class="item-meta">Task · ${r.done?"Done":a?"Missed":"Pending"} · ${o?`${o}/5 ${se(o)}`:"No rating"}${r.description?` · ${g(r.description)}`:""}</div>
            ${Ga(r.forwardedFrom)}
            ${ce(r.forwardedTo)}
            ${st(r.tags)}
            ${r.image?'<span class="task-img-badge">📷 Photo attached</span>':""}
            ${Oa(r)}
            ${Fa(r.id,o,a)}
          </div>
          <div class="item-side">
            <div class="points">+${r.points}</div>
            <div class="mini-actions">
              ${Q?`<button class="mini-btn on" data-action="open-edit-task" data-id="${r.id}" ${a?"disabled":""}>Edit</button>`:""}
              <button class="mini-btn" data-action="open-forward-task" data-id="${r.id}" ${a?"disabled":""} title="Forward task to another day">${E("forward")}</button>
            </div>
          </div>
        </article>
      `}).join("");return`${i}${n}`}function as(){d.getDay(v);const t=d.isLocked(v),e=d.consciousEnabled(),a=d.categoryBreakdown(v),s=a.reduce((n,r)=>n+r.earned,0),i=a.reduce((n,r)=>n+r.max,0);return`
    <div class="topbar">
      <div>
        <p class="kicker">Activities</p>
        <h1>By category</h1>
      </div>
      <div class="date-nav">
        ${Me()}
        <button class="icon-btn" data-action="prev-day" aria-label="Previous day">‹</button>
        <button class="icon-btn" data-action="next-day" aria-label="Next day">›</button>
      </div>
    </div>
    <section class="score-hero">
      <div class="score-row">
        <div>
          <div class="score-value">${s}</div>
          <div class="score-unit">of ${i||0} category points</div>
        </div>
        <div class="grade-pill">${U(v)}</div>
      </div>
      <p class="lock-hint">Habits and tasks grouped by category.</p>
    </section>
    ${ts()}
    ${a.map(n=>{const r=n.max?Math.round(n.earned/n.max*100):0,o=R(n.id),l=Zt.has(n.id);return`
          <section class="section">
            <article class="manage-card cat-card cat-${n.id} ${l?"open":""}" style="border-left:4px solid ${o};background:linear-gradient(180deg, ${o}2e, ${o}14 55%, var(--card) 100%)">
              <button type="button" class="cat-activity-head" data-action="toggle-activity-cat" data-id="${n.id}" aria-expanded="${l?"true":"false"}">
                <span class="cat-activity-chev" aria-hidden="true">${l?"▾":"▸"}</span>
                <span class="cat-activity-titles">
                  <span class="item-title">${n.label}</span>
                  <span class="item-meta">${n.completed}/${n.total} done · rating ${n.habitAvg||0}/5</span>
                </span>
                <span class="points">${n.earned}/${n.max} pts</span>
              </button>
              ${l?`
                    <div class="cat-activity-body">
                      <div class="bar"><span style="width:${r}%;background:${o}"></span></div>
                    </div>`:""}
            </article>
            ${l?`
            <div class="list" style="margin-top:10px">
              ${n.habits.length||n.tasks.length?es(n,{locked:t,showC:e}):'<div class="empty">No activities in this category.</div>'}
            </div>
                `:""}
          </section>
        `}).join("")}
  `}function ue(t){return`${t||"second-mind-backup"}-${d.todayKey()}.json`}function is(){const t=d.getInstalledAt(),e=String(t).slice(0,10),a=new Date(`${e}T00:00:00`),s=new Date(`${d.todayKey()}T00:00:00`),i=Number.isNaN(a.getTime())?1:Math.max(1,Math.round((s-a)/864e5)+1),n=String(Number(e.slice(8,10))).padStart(2,"0"),r=e.slice(5,7),o=e.slice(2,4),l=/^\d{4}-\d{2}-\d{2}$/.test(e)?`${n}/${r}/${o}`:e,c=Math.floor((i-1)/365)+1;return`Using Second Mind since ${l} · day ${i} · year ${c}`}function ss(){const t=d.folderStatus();return t==="boot"?"Checking for a connected data folder…":t==="unsupported"?"Browser storage":t==="granted"?"✅ Auto-save on":"⚠️ Not connected"}function ns(){const t=d.folderStatus();if(t==="boot")return"Checking for a connected data folder…";if(t==="unsupported")return"Auto-save to a folder needs Chrome/Edge on desktop — on this device data stays in the browser, so use Export backup to protect it.";if(t==="unset")return"No data folder chosen yet — your data lives only in this browser.";if(t==="prompt")return"Tap Allow access so the app can keep saving to your folder.";if(t==="denied")return"Access was denied — choose the folder again.";if(t==="granted"){const e=d.lastFileSavedAt(),a=e?new Date(e).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit",second:"2-digit"}):"not yet";return`Auto-saving to ${d.folderName()}/${d.folderFileName()} · last saved ${a}`}return"Checking…"}async function os(){const t=await d.chooseDataFolder();if(t.status==="unsupported"){f("Folder access needs Chrome or Edge"),h();return}if(t.cancelled){h();return}if(t.status!=="granted"){f("Couldn't open that folder"),h();return}t.corrupt?f("Folder connected — the old file was unreadable, a copy was saved aside"):t.replaced?f("Folder connected — data loaded from the file"):f("Data folder set — auto-save on"),h(),Tt()}async function rs(){await d.forgetDataFolder(),f("Folder unlinked — data stays in the browser"),h(),Tt()}async function ds(){const t=await d.grantFolderAccess();if(t.status!=="granted"){f("Access denied"),h();return}t.corrupt?f("Access granted — the old file was unreadable, a copy was saved aside"):t.replaced?f("Access granted — data loaded from the file"):f("Folder access granted — auto-save on"),h(),Tt()}async function ls(){const t=d.exportBackup(),e=ue();if(d.folderStatus()==="granted"&&d.getFolderHandle())try{if((await d.writeFolderFile(e,t)).ok){f("Backup saved to your folder"),Tt();return}}catch{}At(e,t,"application/json"),f("Backup downloaded")}async function cs(){return d.listFolderBackups()}async function Tt(){const t=document.getElementById("folder-backup-list");if(!t)return;if(d.folderStatus()!=="granted"||!d.getFolderHandle()){t.innerHTML='<button class="ghost-btn compact" data-action="trigger-import">Import from a file instead</button>';return}t.innerHTML='<p class="item-meta">Loading backups…</p>';const e=await cs();if(!document.getElementById("folder-backup-list"))return;e.length?t.innerHTML=e.map(s=>`
            <div style="display:flex;gap:8px;align-items:center;margin-bottom:6px">
              <span class="item-meta" style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${g(s.name)}</span>
              <button class="ghost-btn compact" data-action="restore-backup" data-name="${g(s.name)}">Restore</button>
            </div>
          `).join(""):t.innerHTML='<p class="item-meta">Folder has no backups yet — press Export backup now to create one. The live data file is saved here automatically.</p>';const a=document.createElement("div");a.innerHTML='<button class="ghost-btn compact" data-action="trigger-import">Import from a file instead</button>',t.appendChild(a)}async function us(t){try{const e=await d.readFolderFile(t);if(e.missing||e.error||!e.raw){f("Couldn't read that backup");return}Ua(e.raw,t)}catch{f("Couldn't read that backup")}}function Ua(t,e){let a;try{a=JSON.parse(t)}catch{f("That file isn't valid JSON.");return}const s=d.backupKind(a);if(s==="ok"){if(!window.confirm(`Replace ALL app data with "${e}"?`))return;At(ue("second-mind-pre-import"),d.exportBackup(),"application/json"),d.importBackup(a),f("Backup imported"),h();return}if(s==="report-export"){const i=d.previewReport(a);if(!i.days){f("That report file has no day rows to import.");return}if(!window.confirm(`Import ${i.days} day(s) (${i.start} → ${i.end}) from "${e}" as locked history?

${i.newHabits} new habit(s) will be added to your list.
Days already in the app on those dates will be overwritten.`))return;At(ue("second-mind-pre-import"),d.exportBackup(),"application/json");const r=d.importReport(a);if(!r){f("That file doesn't look like a valid Second Mind backup.");return}f(`Imported ${r.days} day(s)${r.habits?` + ${r.habits} new habit(s)`:""}`),h();return}if(s==="wrong-app"){f("That backup belongs to another app (e.g. Iron Log) — it can’t be imported into Second Mind.");return}f("That file doesn't look like a valid Second Mind backup.")}async function ps(){if(!yt){f("Use the browser menu: Install / Add to Home Screen");return}try{yt.prompt();const t=await yt.userChoice;t&&t.outcome==="accepted"&&f("Installing Second Mind…")}catch{}yt=null,h()}async function ms(){const t=`./version.json?v=${Date.now()}`,e=await fetch(t,{cache:"no-store"});if(!e.ok)throw new Error(`http ${e.status}`);const a=await e.json(),s=a&&(a.version||a.v)||null;if(!s)throw new Error("no version field");return String(s)}async function gs(){rt=!0,oe=!1,dt="Checking for updates… (needs internet)",h();try{if("serviceWorker"in navigator&&navigator.serviceWorker.getRegistration){const e=await navigator.serviceWorker.getRegistration().catch(()=>null);e&&e.update&&e.update().catch(()=>{})}}catch{}if(typeof fetch>"u"){rt=!1,dt="This browser can’t check — but the app itself works offline. Use Export backup to protect your data.",h();return}const t=setTimeout(()=>{rt&&(rt=!1,dt="Couldn't reach the server — offline? The app itself works offline; updating needs internet.",h())},15e3);try{const e=await ms();if(clearTimeout(t),rt=!1,Ee=e,e&&e!==Ha){oe=!0,dt="Update found — updating automatically…",h(),await za(!0);return}dt="You're on the latest version. The app works offline."}catch{clearTimeout(t),rt=!1,dt="Couldn't reach the server — offline, or this file wasn't opened from the installed/hosted app. The app itself works offline; updating needs internet."}h()}function pa(t){return new Promise(e=>{if(!("serviceWorker"in navigator))return e();const a=()=>e(),s=setTimeout(()=>{try{navigator.serviceWorker.removeEventListener("controllerchange",a)}catch{}e()},t||4e3),i=()=>{clearTimeout(s);try{navigator.serviceWorker.removeEventListener("controllerchange",i)}catch{}e()};try{navigator.serviceWorker.addEventListener("controllerchange",i)}catch{e()}})}async function za(t){var a;try{At(ue("second-mind-pre-update"),d.exportBackup(),"application/json")}catch{}f("Backup saved — updating app…"),dt=`Backup saved — updating${Ee?` to ${String(Ee).slice(-8)}`:""}…`,h();const e=()=>{const s=window.location.href.includes("?")?"&":"?";try{window.location.replace(`${window.location.href.split("#")[0]}${s}v=${Date.now()}#updated`)}catch{window.location.reload()}setTimeout(()=>{try{window.location.reload()}catch{}},2500)};try{if("serviceWorker"in navigator&&navigator.serviceWorker.getRegistration){const s=await navigator.serviceWorker.getRegistration().catch(()=>null);if(s){const i=s.waiting;if(i){try{i.postMessage("SKIP_WAITING")}catch{try{s.waiting.postMessage({type:"SKIP_WAITING"})}catch{}}await pa(4e3),e();return}try{await s.update()}catch{}const n=await navigator.serviceWorker.getRegistration().catch(()=>s),r=(n||s).waiting||(n||s).installing;if(r){try{r.postMessage("SKIP_WAITING")}catch{}try{(a=(n||s).waiting)==null||a.postMessage("SKIP_WAITING")}catch{}await pa(5e3),e();return}try{const o=navigator.serviceWorker.controller;o&&o.postMessage({type:"CLEAR_APP_CACHES"})}catch{}try{if(typeof caches<"u"){const o=await caches.keys().catch(()=>[]);await Promise.all(o.filter(l=>l.startsWith("daily-report-")).map(l=>caches.delete(l).catch(()=>!1)))}}catch{}try{await fetch(`./index.html?v=${Date.now()}`,{cache:"reload"})}catch{}try{await fetch(`./version.json?v=${Date.now()}`,{cache:"reload"})}catch{}try{await(n||s).unregister()}catch{}e();return}}}catch{}try{await fetch(`./index.html?v=${Date.now()}`,{cache:"reload"})}catch{}setTimeout(e,600)}const fs=[{id:"start",icon:"🚀",title:"Getting started",summary:"How the app works in one minute",steps:[["📱","The app has five tabs at the bottom: <b>Today</b>, <b>Profile</b>, <b>History</b>, <b>Activities</b> and <b>Settings</b> — tap a tab to switch."],["⭐","Every habit and task has a <b>points value</b>. Checking it earns those points for that day."],["🧠","Some habits also award <b>conscious points</b> (🧠) on top of their normal points."],["📈","The big card on Today shows your day as points, percent and a <b>letter grade</b>."],["🔒","At your lock time the day locks itself — press <b>Submit and lock report</b> while the day is open."],["💾","Everything is saved on this device only and works fully offline."]]},{id:"today",icon:"✅",title:"Track your day (Today tab)",summary:"Habits, tasks, stars, photos and the FAB",steps:[["☑️","Tap the <b>circle check</b> on a habit or task to mark it done and earn its points."],["⭐","Tap the <b>stars</b> (1–5) to rate how well it went — a rating also counts it as done."],["🟢","Done items turn green. Unchecked items turn red as <b>Missed</b> once the day is locked."],["📷","Tasks can carry a photo — tap the thumbnail to view it full size."],["➕","Tap the big <b>+</b> button to add a habit or task for this day."],["↔️","Use the <b>‹ ›</b> arrows in the top bar to move between days."]]},{id:"edit",icon:"✏️",title:"Edit, sort & reorder",summary:"Edit Mode, drag order and archiving",steps:[["✏️","Tap <b>Edit Mode</b> in a section header to reveal the <b>Edit</b> and delete buttons."],["✋","Hold a card’s <b>grip button</b> for a moment, then drag it to a new spot in the list."],["🔃","The <b>Sort</b> selector orders the list by Points, Category, Tags or your custom drag order."],["🗂️","The <b>archive</b> button sets a habit or task aside — its history is kept and you can restore it any time from the <b>Archive</b> panel at the bottom of Today."]]},{id:"forward",icon:"🔁",title:"Forward, Replace & Pin",summary:"Moving habits and tasks between days",steps:[["↪️","<b>Forward</b> an unfinished task (➟ button) to another day — it moves there with a badge showing where it came from."],["⇄","<b>Replace</b> moves a habit’s rating to a free day before its next due date."],["📌","<b>Pin</b> a habit or task to a repeat schedule — weekly days, month dates or a custom date list — so it appears automatically. Pin it <b>forever</b> for daily essentials."],["↩️","Badges on the card (↩ Forwarded from / ⇄ Replaced from) show what moved and where — tap a badge to undo it."]]},{id:"notes",icon:"📝",title:"Day notes",summary:"Bullet and numbered lists that save themselves",steps:[["📝","The <b>Day note</b> box at the bottom of Today records how the day went."],["•","Select lines and press <b>• Bullets</b> (or <b>1. Numbered</b>) to make a list — press it again to remove the list markers."],["💾","The note saves automatically with the day and is included in exports and backups."]]},{id:"profile",icon:"👤",title:"Profile tab",summary:"Identity, life areas, goals, quotes & locking",steps:[["🪪","<b>Identity</b> — your display name and the person you want to be."],["🧬","<b>Who I am</b> — a numbered list of your roles; reorder with ↑ ↓."],["🗺️","<b>Life Areas</b> — tap a card to open it, describe it, and reorder with ↑ ↓."],["🌅","<b>My Vision</b> and <b>Core & Personal Values</b> — one value per line as a bullet list."],["💡","<b>Personal Ideas</b> — one idea per line, shown as bullets."],["🎯","<b>Goals</b> — hashtag each one: <b>#short</b> = weeks, <b>#medium</b> = 1–3 months, <b>#long</b> = a year or more."],["💬","<b>Quotes</b> — save quotes you live by and star your top 3 favourites."],["🔒","<b>Lock</b> makes the whole profile read-only; Unlock to edit again."]]},{id:"history",icon:"🕘",title:"History tab",summary:"Calendar of past days and exporting",steps:[["🗓️","History shows a month calendar colour-coded by each day’s score."],["👆","Tap any day to jump straight into that day’s report."],["📤","<b>Select & Export</b> picks a date range and exports it as <b>Excel / JSON / PDF</b> — a later import adds it back as locked history."],["☰","The list below shows recent reports with their grades."]]},{id:"activities",icon:"📊",title:"Activities tab",summary:"Charts over a week, month or year",steps:[["📊","The Activities tab charts your weekly score and progress per category."],["🗓️","Switch between <b>Week / Month / Year</b> and use <b>‹ ›</b> to step back in time."],["🎨","Each category keeps its chosen colour everywhere — charts, badges and cards."]]},{id:"rewards",icon:"🏆",title:"Goals & Rewards",summary:"Streak goals, tiers and badges",steps:[["➕","In Settings → Goals &amp; Rewards tap <b>Add goal</b>."],["🎯","Pick the target: a <b>habit or pinned-task streak of N days</b>, <b>N perfect (100%) days</b>, or a <b>List of tasks goal</b> (a checklist — no target needed)."],["📝","<b>List of tasks goal</b>: no target needed — in the goal form the <b>Attach tasks</b> picker lists <b>Archived</b> and <b>Undone</b> tasks to tick onto the goal. More can be added later from the task form’s <b>Select Goal</b>, <b>Attach to Goal List</b> when editing a task, or the goal card. When every task is done the goal shows <b>Done</b> and locks itself."],["⛔","Locking a list goal manually before its tasks are finished <b>terminates</b> it — locked goals take no new tasks until you unlock."],["🥇","Choose the tier — <b>Iron, Bronze, Silver or Gold</b> — and write the reward title you’ll earn."],["🎁","Progress bars track each goal; earned rewards become <b>badges</b> on Today’s Rewards strip."],["🏆","Any day that reaches 100% wins the <b>Gold Cup</b> on the spot."]]},{id:"cats",icon:"🗂️",title:"Categories & tags",summary:"Custom categories, colours, goals and tags",steps:[["🌈","Settings → <b>Categories</b>: add your own, tap one to open it, and pick its colour."],["📝","Type the category’s <b>goals</b> as bullet points and press Save — they reach forms, Activities and exports."],["🏷️","Tags group habits and tasks. From Settings → <b>Tags</b> you can rename or delete a tag everywhere at once."],["➕","New tags are added inside any habit or task form, or from the Tags section itself."]]},{id:"backup",icon:"💾",title:"Backup, updates & install",summary:"Keeping your data safe and the app fresh",steps:[["📁","Settings → <b>Data backup</b>: choose a folder once (desktop Chrome/Edge) and <b>Export backup now</b> saves a JSON straight into it."],["📥","<b>Import backup</b> accepts full backups (<b>second-mind-backup-*.json</b>) or month/week exports, which are added as locked history."],["🔄","<b>Check for updates</b> installs the newest version in place — a backup is saved first. Only this check needs internet."],["📲","<b>Install app</b> puts Second Mind on your home screen as a fullscreen offline app."]]},{id:"locking",icon:"🔐",title:"Locking & unlocking days",summary:"Auto-lock, submit and batch unlock",steps:[["⏰","Set the <b>auto-lock time</b> in Settings → Report lock; after that time today locks itself."],["🚫","A locked day is read-only, and anything unchecked already counted as <b>Missed</b> at lock time."],["📅","Settings → <b>Locked reports</b>: red days are locked, green days are open."],["☝️","Tap days to select them, then <b>Lock</b> or <b>Unlock</b> them all in one go."]]}];function hs(t){return`<div class="tut-steps">${t.map(e=>`
        <div class="tut-step">
          <span class="tut-step-ico" aria-hidden="true">${e[0]}</span>
          <p>${e[1]}</p>
        </div>`).join("")}</div>`}function bs(){return`
    <div class="tut-grid">
      ${fs.map(t=>{const e=Xt===t.id;return`
          <article class="tut-card ${e?"open":""}">
            <button type="button" class="tut-head" data-action="open-tutorial" data-id="${t.id}" aria-expanded="${e?"true":"false"}">
              <span class="tut-ico" aria-hidden="true">${t.icon}</span>
              <span class="tut-titles">
                <span class="tut-title">${g(t.title)}</span>
                <span class="tut-summary">${g(t.summary)}</span>
              </span>
              <span class="tut-chev" aria-hidden="true">${e?"▾":"▸"}</span>
            </button>
            ${e?`<div class="tut-body">${hs(t.steps)}</div>`:""}
          </article>
        `}).join("")}
    </div>
  `}function Ya(t){if(!t||t.kind!=="task-list")return"";const e=t.tasks||[];return e.length>0&&e.every(s=>s.done)?`Done ✅${t.locked?" 🔒":""}`:t.terminated?`Terminated ⛔${t.locked?" 🔒":""}`:t.locked?`Locked${t.locked?" 🔒":""}`:"Open"}function ys(t){const e=t.tasks||[],a=e.filter(m=>m.done).length,s=e.length>0&&a===e.length,i=!!t.locked,n=!!t.terminated,r=!i&&!n,o=Ya(t),l=e.length?Math.round(a/e.length*100):0,c=s?"gstatus-done":n?"gstatus-term":i?"gstatus-locked":"gstatus-open";return`
    <article class="manage-card task-list-goal ${s?"goal-earned":""}">
      <div class="section-head">
        <div>
          <div class="item-title">${te(t.tier)} ${g(t.title)} <span class="gstatus ${c}">${o}</span></div>
          <div class="item-meta">“${g(t.rewardTitle)}” · ${a}/${e.length} tasks${s?" · All done ✓":n?" · list closed":""}</div>
          <div class="bar"><span style="width:${l}%"></span></div>
        </div>
        <div class="mini-actions">
          ${i?"":`<button class="mini-btn on" data-action="open-edit-goal" data-id="${t.id}">Edit</button>`}
          ${i?`<button class="mini-btn" data-action="unlock-goal" data-id="${t.id}" title="Unlock to edit the goal${n?" (terminated goals still take no new tasks)":""}">🔓 Unlock</button>`:`<button class="mini-btn" data-action="lock-goal" data-id="${t.id}"${e.length&&!s?' title="Lock now — an unfinished goal stays terminated"':""}>🔒 Lock</button>`}
          <button class="mini-btn" data-action="remove-goal" data-id="${t.id}">✕</button>
        </div>
      </div>
      <div class="goal-task-list">
        ${e.length?e.map(m=>`
                    <div class="goal-task-row ${m.done?"done":""}">
                      <button type="button" class="goal-task-check ${m.done?"on":""}" data-action="toggle-goal-item" data-id="${t.id}" data-item="${m.id}" data-done="${m.done?"true":"false"}" ${i?'disabled title="Unlock the goal to edit its tasks"':""} aria-label="${m.done?"Mark not done":"Mark done"}">${m.done?"✓":""}</button>
                      <span class="goal-task-title">${g(m.title)}</span>
                      ${i?"":`<button class="mini-btn" data-action="remove-goal-item" data-id="${t.id}" data-item="${m.id}" title="Remove from goal" aria-label="Remove from goal">✕</button>`}
                    </div>
                  `).join(""):'<p class="item-meta">No tasks yet — add the first one below, or attach tasks from the task form (Select Goal).</p>'}
      </div>
      ${r?`
            <div class="goal-task-add">
              <input id="goal-item-input-${t.id}" maxlength="120" placeholder="New task for this goal…" aria-label="New task for ${g(t.title)}" />
              <button class="primary-btn compact-btn" data-action="add-goal-item" data-id="${t.id}">Add</button>
            </div>
          `:n?'<p class="item-meta">⛔ Terminated before the list was finished — no more tasks can be added, even after unlocking.</p>':'<p class="item-meta">🔒 Goal is done — unlock it to add or edit tasks.</p>'}
    </article>
  `}function Y(t,{icon:e,title:a,hint:s},i){const n=Lt.has(t);return`
    <section class="settings-sec ${n?"open":""}">
      <button type="button" class="settings-sec-head" data-action="toggle-settings-section" data-id="${t}" aria-expanded="${n?"true":"false"}">
        <span class="settings-sec-ico" aria-hidden="true">${e}</span>
        <span class="settings-sec-titles">
          <span class="settings-sec-name">${a}</span>
          ${s?`<span class="settings-sec-hint">${s}</span>`:""}
        </span>
        <span class="settings-sec-chev" aria-hidden="true">${n?"▾":"▸"}</span>
      </button>
      ${n?`<div class="settings-sec-body">${i}</div>`:""}
    </section>
  `}function vs(){const t=d.getSettings(),e=d.getAllHabits(),a=d.getPinnedHabits(),s=[...a,...e.filter(o=>!o.pin)],i=d.getArchivedHabits(),n=d.getPinnedTasks(),r=d.lockedReports();return`
    <div class="topbar">
      <div>
        <p class="kicker">Admin rules</p>
        <h1>Settings</h1>
      </div>
      <button class="ghost-btn compact ${ut?"on":""}" data-action="toggle-settings-edit" aria-pressed="${ut}">${ut?"Done":"Edit Mode"}</button>
    </div>
    <p class="muted tight settings-sec-lead">Sections are closed by default — tap a title to open and edit it.</p>

    ${Y("tutorials",{icon:"📚",title:"Tutorials",hint:"Illustrated guide to the app & its usage"},bs())}

    ${Y("report-lock",{icon:"🔒",title:"Report lock",hint:`Auto-lock at ${t.lockTime}`},`
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

    ${Y("appearance",{icon:"🎨",title:"Appearance",hint:d.getTheme()==="dark"?"🌙 Dark mode":"☀️ Light mode"},`
      <p class="muted tight">Pick Dark or Light mode. It applies everywhere, instantly.</p>
      <div class="chip-row">
        <button type="button" class="chip ${d.getTheme()==="dark"?"on":""}" data-action="set-theme" data-theme="dark">🌙 Dark</button>
        <button type="button" class="chip ${d.getTheme()==="light"?"on":""}" data-action="set-theme" data-theme="light">☀️ Light</button>
      </div>
    `)}

    ${Y("install",{icon:"📲",title:"Install app",hint:window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches?"Installed ✓":"Add to home screen"},`
      <p class="muted tight">Put Second Mind on your home screen for fullscreen offline use. Open it over http://localhost or https — it cannot install from a file:// page.</p>
      ${window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches?'<p class="item-meta">Installed — running as app ✓</p>':'<button class="primary-btn full" data-action="install-app">Install Second Mind</button>'}
    `)}

    ${Y("updates",{icon:"🔄",title:"App updates",hint:`${oe?"Update ready":g(ia)}`},`
      <p class="muted tight">The app works fully offline. Only checking for updates needs internet. Tapping Check for updates installs the newest version automatically (a JSON backup of your data is saved first). Your data stays on this device.</p>
      <p class="item-meta">Version: ${g(ia)}</p>
      <p class="item-meta">📅 ${g(is())}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
        <button class="primary-btn" data-action="check-updates" ${rt?"disabled":""}>${rt?"Checking…":"Check for updates"}</button>
        ${oe?'<button class="primary-btn" data-action="apply-update">Restart with update</button>':""}
      </div>
      <p class="item-meta">${g(dt)}</p>
    `)}

    ${Y("backup",{icon:"💾",title:"Data backup",hint:ss()},`
      <p class="muted tight"><b>Auto-save:</b> pick a folder once (Chrome/Edge on desktop) and every change is written straight to <b>second-mind.json</b> inside it — your data lives on disk and no longer depends on browser storage. The browser keeps only a fast copy; if it is ever cleared, choose the same folder again and everything comes back. On phones no folder is available, so data stays in the browser — use Export backup there. Import accepts full backups (<b>second-mind-backup-*.json</b>) or month/week report exports, which are added as locked history.</p>
      <p class="item-meta">${g(ns())}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
        ${d.folderStatus()==="prompt"||d.folderStatus()==="denied"?'<button class="primary-btn" data-action="grant-folder">Allow access</button>':""}
        ${d.folderStatus()==="unsupported"?"":d.getFolderHandle()?'<button class="ghost-btn compact" data-action="choose-folder">Change folder</button><button class="ghost-btn compact" data-action="forget-folder">Unlink</button>':'<button class="primary-btn" data-action="choose-folder">Choose data folder</button>'}
        <button class="primary-btn" data-action="backup-now">Export backup now</button>
        <button class="ghost-btn compact" data-action="trigger-import">Import backup</button>
      </div>
      <input type="file" id="backup-file" accept="application/json,.json" hidden />
      <div id="folder-backup-list" style="margin-top:10px"></div>
    `)}

    ${Y("categories",{icon:"🗂️",title:"Categories",hint:`${d.getCategories().length}`},`
      <p class="muted tight">Add your own categories — they appear in forms, Activities and exports. Tap a category to open it, set its colour, then type its goals as bullet points and press Save.</p>
      <div class="cat-expand-row">
        <button class="mini-btn" data-action="expand-cats">Expand all</button>
        <button class="mini-btn" data-action="collapse-cats">Collapse all</button>
      </div>
      <div class="habit-manage">
        ${d.getCategories().map(o=>{const l=d.getCustomCategories().some(S=>S.id===o.id),c=o.color||R(o.id),m=o.goals||"",b=Rt(m),p=St.has(o.id)?St.get(o.id):m,k=Ot(Rt(p))!==Ot(b),x=ct.has(o.id);return`
              <article class="manage-card cat-manage-card ${x?"open":""}">
                <div class="cat-manage-head">
                  <button type="button" class="cat-manage-toggle" data-action="toggle-cat" data-id="${o.id}" aria-expanded="${x?"true":"false"}" aria-controls="cat-editor-${o.id}">
                    <span class="cat-chevron" aria-hidden="true">${x?"▾":"▸"}</span>
                    <i class="cat-swatch" style="background:${g(c)}"></i>
                    <span class="cat-manage-name">${g(nt(o.id))}</span>
                    ${b.length?`<span class="cat-goal-flag">${b.length} goal${b.length===1?"":"s"}</span>`:""}
                  </button>
                  <div class="mini-actions">
                    ${l?`<button class="mini-btn on" data-action="rename-category" data-id="${o.id}">Rename</button>`:""}
                    ${l?`<button class="mini-btn" data-action="delete-category" data-id="${o.id}">✕</button>`:""}
                  </div>
                </div>
                ${x?`
                      <div class="cat-manage-body" id="cat-editor-${o.id}">
                        <div class="cat-manage-row">
                          <label>Colour
                            <input type="color" data-cat-color="${o.id}" value="${g(c)}" aria-label="Colour for ${g(o.label||nt(o.id))}" />
                          </label>
                          <div class="cat-goals-wrap">
                            <label>Goals — one per line
                              <textarea data-cat-goals="${o.id}" maxlength="1000" placeholder="• Goal one&#10;• Goal two&#10;• Goal three" style="min-height:90px">${g(p)}</textarea>
                            </label>
                            <div class="cat-save-row">
                              <button class="primary-btn compact-btn" data-action="save-cat-goals" data-id="${o.id}">${k?"Save goals":"Saved"}</button>
                              <button class="ghost-btn compact" data-action="reset-cat-goals" data-id="${o.id}" ${k?"":"hidden"}>Discard</button>
                            </div>
                            <p class="item-meta cat-goal-hint">${k?"Unsaved changes — press Save to keep them offline and in backups.":"Saved on this device and included in every backup."}</p>
                          </div>
                        </div>
                      </div>
                    `:b.length?`<ul class="note-list cat-goal-preview">${b.map(S=>`<li>${g(S)}</li>`).join("")}</ul>`:'<p class="item-meta">No goals yet — open this category to add some.</p>'}
              </article>
            `}).join("")}
      </div>
      <div style="display:flex;gap:8px;margin-top:10px">
        <input id="new-category" maxlength="30" placeholder="New category name…" style="flex:1;min-width:0" />
        <button class="primary-btn compact-btn" data-action="add-category">Add</button>
      </div>
    `)}

    ${Y("tags",{icon:"🏷️",title:"Tags",hint:`${d.getAllTags().length}`},`
      <p class="muted tight">Rename a tag everywhere at once, or delete it from all habits and tasks. New tags are added inside any habit/task form.</p>
      <div class="habit-manage">
        ${(()=>{const o=d.getAllTags();return o.length?o.map(({tag:l,count:c})=>`
              <article class="manage-card">
                <div class="section-head">
                  <div>
                    <div class="item-title">#${g(l)}</div>
                    <div class="item-meta">Used ${c} time${c===1?"":"s"}</div>
                  </div>
                  <div class="mini-actions">
                    <button class="mini-btn on" data-action="rename-tag" data-tag="${g(l)}">Rename</button>
                    <button class="mini-btn" data-action="delete-tag" data-tag="${g(l)}">✕</button>
                  </div>
                </div>
              </article>
            `).join(""):'<div class="empty">No tags yet — add some in a habit or task form.</div>'})()}
      </div>
      <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">
        <select id="tag-habit-pick" style="flex:1;min-width:0">
          ${d.getAllHabits().map(o=>`<option value="${o.id}">${g(o.name)}</option>`).join("")}
        </select>
        <input id="new-tag" maxlength="20" placeholder="New tag…" style="flex:1;min-width:0" />
        <button class="primary-btn compact-btn" data-action="add-tag">Add</button>
      </div>
    `)}

    ${Y("goals",{icon:"🏅",title:"Goals & Rewards",hint:`${d.getGoals().length} goals · ${d.getBadges().length} badges`},`
      <div class="section-head">
        <p class="muted tight" style="max-width:270px">Do a habit / pinned task N days in a row, or collect N perfect (100%) days — earn an Iron, Bronze, Silver or Gold badge with your own title.</p>
        <button class="ghost-btn compact" data-action="open-goal">Add goal</button>
      </div>
      <div class="habit-manage">
        ${d.getGoals().length?d.getGoals().map(o=>{var b,p;if(o.kind==="task-list")return ys(o);const l=d.goalProgress(o,v),c=d.getBadges().some(k=>k.goalId===o.id),m=o.kind==="habit-streak"?((b=d.findHabit(o.targetId))==null?void 0:b.name)||"Deleted habit":o.kind==="task-streak"?((p=d.findPinnedTask(o.targetId))==null?void 0:p.title)||"Deleted task":"Any day at 100%";return`
                    <article class="manage-card goal-card ${c?"goal-earned":""}">
                      <div class="section-head">
                        <div>
                          <div class="item-title">${te(o.tier)} ${g(o.title)}</div>
                          <div class="item-meta">${Aa(o.tier)} · “${g(o.rewardTitle)}” · ${g(m)}</div>
                          <div class="item-meta">${l.current}/${l.target} days ${c?"· Earned ✓":""}</div>
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
                  <div class="reward-medal">${te(o.tier)}</div>
                  <div>
                    <div class="item-title">${g(o.rewardTitle||o.title)}</div>
                    <div class="item-meta">${g(o.title)} · ${U((o.earnedAt||"").slice(0,10))}</div>
                  </div>
                  <button class="mini-btn" data-action="remove-badge" data-id="${o.id}">✕</button>
                </article>
              `).join("")}
            </div>
          `:""}
    `)}

    ${Y("locked-reports",{icon:"📅",title:"Locked reports",hint:`${r.length} locked`},`
      <div class="section-head">
        <p class="muted tight" style="max-width:260px">Red = locked, green = open. Tap days to select them, then lock or unlock all at once.</p>
        <div class="date-nav">
          <button class="icon-btn" data-action="locked-cal-nav" data-dir="-1" aria-label="Previous month">‹</button>
          <button class="icon-btn" data-action="locked-cal-nav" data-dir="1" aria-label="Next month">›</button>
        </div>
      </div>
      ${Ji(r)}
      ${F.length?`
        <div class="chip-row" style="margin-top:10px">
          ${[...F].sort().map(o=>`<button type="button" class="chip on" data-action="toggle-locked-day" data-date="${o}" title="Tap to remove">${o} ✕</button>`).join("")}
        </div>
        <div style="display:flex;gap:8px;margin-top:10px">
          <button class="primary-btn" style="flex:1" data-action="lock-selected">🔒 Lock ${F.length} day${F.length===1?"":"s"}</button>
          <button class="ghost-btn" style="flex:1" data-action="unlock-selected">🔓 Unlock ${F.length} day${F.length===1?"":"s"}</button>
        </div>
      `:""}
    `)}

    ${Y("habits",{icon:"✅",title:"Habits",hint:`${s.length}`},`
      <div class="section-head">
        <p class="muted tight" style="max-width:280px">Tap a habit to see its activity. In Edit Mode, edit habits and reorder pinned habits.</p>
        <button class="ghost-btn compact" data-action="open-add-habit">Add</button>
      </div>
      <div class="habit-manage">
        ${s.length?s.map(o=>{const l=Jt.has(o.id),c=o.pin?a.findIndex(b=>b.id===o.id):-1,m=l?d.getHabitActivity(o.id,20):[];return`
                    <article class="manage-card setting-habit-card ${l?"open":""}" style="${o.pin?`border-left:4px solid ${R(o.category)}`:""}">
                      <div class="section-head">
                        <button type="button" class="setting-habit-toggle" data-action="toggle-setting-habit" data-id="${o.id}" aria-expanded="${l?"true":"false"}">
                          <span class="setting-habit-chevron" aria-hidden="true">${l?"▾":"▸"}</span>
                          <span class="setting-habit-heading">
                            <span class="item-title">${g(o.name)}</span>
                            <span class="item-meta">${gt(o.category)} · ${o.pin?wt(o.pin):"Not pinned"} · +${o.points} pts ${t.showConscious!==!1?Number(o.consciousPoints)?`· 🧠 +${o.consciousPoints}`:"· No conscious pts":""} · ${le(d.habitStreak(o.id,v))}</span>
                          </span>
                        </button>
                        <div class="mini-actions">
                          ${ut?`
                            <button class="mini-btn on" data-action="open-edit-habit" data-id="${o.id}" aria-label="Edit ${g(o.name)}">Edit</button>
                            ${o.pin?`
                              <button class="mini-btn" data-action="move-pinned-habit" data-id="${o.id}" data-dir="-1" ${c===0?"disabled":""} aria-label="Move ${g(o.name)} up" title="Move up">↑</button>
                              <button class="mini-btn" data-action="move-pinned-habit" data-id="${o.id}" data-dir="1" ${c===a.length-1?"disabled":""} aria-label="Move ${g(o.name)} down" title="Move down">↓</button>
                            `:""}
                            <button class="mini-btn ${o.pin?"on":""}" data-action="open-pin-habit" data-id="${o.id}" aria-label="${o.pin?"Change pin schedule":"Pin habit"}">${E("pin")}</button>
                            <button class="mini-btn" data-action="remove-habit" data-id="${o.id}" aria-label="Remove ${g(o.name)}">✕</button>
                          `:""}
                        </div>
                      </div>
                      ${l?`
                        <div class="setting-habit-details">
                          ${o.description?`<p class="item-desc">${g(o.description)}</p>`:'<p class="item-meta">No description yet.</p>'}
                          ${st(o.tags)}
                          <div class="setting-habit-activity">
                            <div class="item-title">Recent activity</div>
                            ${m.length?m.map(b=>`
                              <button type="button" class="setting-habit-activity-row" data-action="open-habit-activity-date" data-date="${b.date}">
                                <span>${U(b.date)}</span>
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

    ${i.length?Y("deleted-habits",{icon:"🗑️",title:"Deleted habits",hint:`${i.length} — history kept`},`
      <p class="muted tight">Deleting a habit never erases history: days that already recorded it keep it and its points. Restore a habit to bring it back on future days.</p>
      <div class="habit-manage">
        ${i.map(o=>`
                    <article class="manage-card archived" style="border-left:4px solid ${R(o.category)}">
                      <div class="section-head">
                        <div>
                          <div class="item-title">${g(o.name)}</div>
                          <div class="item-meta">${gt(o.category)} · +${o.points} pts${o.pin?` · ${wt(o.pin)}`:" · Pin ended"} · ${Le(o.archivedAt)}</div>
                          ${o.description?`<p class="item-desc">${g(o.description)}</p>`:""}
                          ${st(o.tags)}
                        </div>
                        <div class="mini-actions">
                          <button class="mini-btn on" data-action="restore-habit" data-id="${o.id}">${E("undo")}</button>
                        </div>
                      </div>
                    </article>
                  `).join("")}
      </div>
    `):""}

    ${Y("pinned-tasks",{icon:"📌",title:"Pinned tasks",hint:`${n.length}`},`
      <p class="muted tight">Pinned tasks appear automatically on matching days.</p>
      <div class="habit-manage">
        ${n.length?n.map(o=>`
                    <article class="manage-card" style="border-left:4px solid ${R(o.category)}">
                      <div class="section-head">
                        <div>
                          <div class="item-title">${g(o.title)}</div>
                          <div class="item-meta">${gt(o.category)} · ${wt(o.pin)} · +${o.points} pts</div>
                          ${o.description?`<p class="item-desc">${g(o.description)}</p>`:""}
                          ${st(o.tags)}
                        </div>
                        <div class="mini-actions">
                          ${ut?`
                            <button class="mini-btn on" data-action="open-edit-pinned-task" data-id="${o.id}" aria-label="Edit ${g(o.title)}">Edit</button>
                            <button class="mini-btn" data-action="move-pinned-task" data-id="${o.id}" data-dir="-1" ${n.indexOf(o)===0?"disabled":""} aria-label="Move ${g(o.title)} up" title="Move up">↑</button>
                            <button class="mini-btn" data-action="move-pinned-task" data-id="${o.id}" data-dir="1" ${n.indexOf(o)===n.length-1?"disabled":""} aria-label="Move ${g(o.title)} down" title="Move down">↓</button>
                            <button class="mini-btn on" data-action="open-pin-template" data-id="${o.id}" aria-label="Change repeat schedule">${E("pin")}</button>
                            <button class="mini-btn" data-action="unpin-template" data-id="${o.id}" aria-label="Unpin ${g(o.title)}">✕</button>
                          `:""}
                        </div>
                      </div>
                    </article>
                  `).join(""):'<div class="empty">Pin a task from Today to repeat it.</div>'}
      </div>
    `)}
  `}function O(t){if(/^\d{4}-\d{2}$/.test(String(t||"")))return String(t);if(/^\d{4}-\d{2}-\d{2}$/.test(String(t||"")))return String(t).slice(0,7);const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}`}function Mt(t,e){const[a,s]=String(t).split("-").map(Number),i=new Date(a,(s||1)-1+e,1);return`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}`}function me(t){const[e,a]=String(t).split("-").map(Number);return new Date(e,(a||1)-1,1).toLocaleDateString(void 0,{month:"long",year:"numeric"})}function _e(){const t=d.getWeekStart(),e=bt.findIndex(a=>a.value===t);return e<=0?bt:[...bt.slice(e),...bt.slice(0,e)]}function qe(t){const[e,a]=String(t).split("-").map(Number),i=(new Date(e,a-1,1).getDay()-d.getWeekStart()+7)%7,n=new Date(e,a,0).getDate(),r=[];for(let o=0;o<i;o++)r.push(null);for(let o=1;o<=n;o++)r.push(`${e}-${String(a).padStart(2,"0")}-${String(o).padStart(2,"0")}`);return r}function ma(t,e,a){const s=new Set(a||[]),i=qe(e);return`
    <div class="pin-cal" data-cal="${t}">
      <div class="pin-cal-head">
        <button type="button" class="mini-btn" data-action="pin-cal-nav" data-target="${t}" data-dir="-1" aria-label="Previous month">‹</button>
        <b>${me(e)}</b>
        <button type="button" class="mini-btn" data-action="pin-cal-nav" data-target="${t}" data-dir="1" aria-label="Next month">›</button>
      </div>
      <div class="pin-cal-grid pin-cal-week">
        ${_e().map(n=>`<span>${n.label.slice(0,1)}</span>`).join("")}
      </div>
      <div class="pin-cal-grid">
        ${i.map(n=>n?`<button type="button" class="pin-cal-day ${s.has(n)?"on":""}" data-action="toggle-pin-date" data-target="${t}" data-date="${n}">${Number(n.slice(8,10))}</button>`:"<span></span>").join("")}
      </div>
    </div>
  `}function ks(t,e){const a=(t==null?void 0:t.mode)||"forever",s=(t==null?void 0:t.until)||"",i=((t==null?void 0:t.weekdays)||[]).map(Number),n=((t==null?void 0:t.monthDays)||[]).map(Number),r=Array.isArray(t==null?void 0:t.yearDays)?[...t.yearDays].sort():[],o=Array.isArray(t==null?void 0:t.customDates)?[...t.customDates].sort():[],l=Array.isArray(t==null?void 0:t.exceptDates)?[...t.exceptDates].sort():Array.isArray(t==null?void 0:t.exceptions)?[...t.exceptions].sort():[],c=e&&e._exceptCal||O(v),m=e&&e._customCal||O(v),b=e&&e._yearMonth||"01";return`
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
      <input name="until" type="date" value="${s}" />
    </label>
    <div class="pin-weekdays" style="${a==="weekly"?"":"display:none"}">
      <p class="item-meta">Repeat every</p>
      <div class="chip-row">
        ${bt.map(p=>`
            <button type="button" class="chip weekday ${i.includes(p.value)?"on":""}" data-action="toggle-weekday" data-day="${p.value}">
              ${p.label}
            </button>
          `).join("")}
      </div>
    </div>
    <div class="pin-monthdays" style="${a==="monthly"?"":"display:none"}">
      <p class="item-meta">Repeat every month on day</p>
      <div class="chip-row">
        ${Array.from({length:31},(p,k)=>k+1).map(p=>`<button type="button" class="chip monthday ${n.includes(p)?"on":""}" data-action="toggle-monthday" data-day="${p}">${p}</button>`).join("")}
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
      ${ma("custom",m,o)}
      <div class="chip-row" style="margin-top:8px">
        ${o.length?o.map(p=>`<button type="button" class="chip on" data-action="toggle-pin-date" data-target="custom" data-date="${p}" title="Tap to remove">${p} ✕</button>`).join(""):'<span class="item-meta">No extra custom dates.</span>'}
      </div>
    </div>
    <div class="pin-exceptions" style="margin-top:4px">
      <p class="item-meta"><b style="color:var(--text)">Exceptions</b> — skip these days (tap days on the calendar). Applies to every repeat mode.</p>
      ${ma("except",c,l)}
      <div class="chip-row" style="margin-top:8px">
        ${l.length?l.map(p=>`<button type="button" class="chip on" data-action="toggle-pin-date" data-target="except" data-date="${p}" title="Tap to remove">${p} ✕</button>`).join(""):'<span class="item-meta">No exceptions.</span>'}
      </div>
    </div>
  `}function $s(){if(!A)return"";if(A==="choose")return`
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
    `;if(A==="habit"||A==="task"||A==="edit-habit"||A==="edit-task"||A==="edit-pinned-task"){const t=A==="habit"||A==="edit-habit",e=A.startsWith("edit-"),a=$||{},s=a.category||(t?"physically":"mentally"),i=Math.max(0,Math.min(5,Number(a.rating)||0)),n=Array.isArray(a.tags)?a.tags.join(", "):a.tags||"",r=a.consciousPoints!=null?Number(a.consciousPoints):a.conscious!=null?Number(a.conscious):0;return`
      <div class="modal-backdrop open" data-action="close-modal">
        <form class="sheet" data-form="${A}" data-id="${a.id||""}">
          <div class="handle"></div>
          <h2>${e?"Edit":"New"} ${t?"habit":"task"}</h2>
          <div class="form" style="margin-top:14px">
            <label>
              ${t?"Habit name":"Task name"}
              <input name="title" required maxlength="60" value="${g(a.title||a.name||"")}" placeholder="${t?"Meditate":"Finish report"}" />
            </label>
            ${(()=>{const o=A==="edit-task";if(t||!(A==="task"||o)||!d.taskListGoals().length)return"";const l=o?d.openTaskListGoals():d.taskListGoals(),c=o?"Attach to Goal List":"Select Goal",m=o?"Not attached to a goal":"No goal — add to today's task list",b=o?"Picking a goal adds this task to that goal’s list as well (open goals only).":"A goal attached here puts the task on that goal’s list instead of today’s list.";return`
                <div>
                  <p class="item-meta">${c}</p>
                  ${o&&!l.length?'<p class="item-meta">No open list-of-tasks goals — unlock a goal first to attach to it.</p>':`
                  <label style="margin-top:6px">
                    Attach this task to a list-of-tasks goal (optional)
                    <select name="goalTarget">
                      <option value="">${m}</option>
                      ${l.map(p=>{const k=!p.locked;return`<option value="${p.id}" ${k?"":"disabled"}>${g(p.title)} — ${Ya(p)}</option>`}).join("")}
                    </select>
                  </label>`}
                  <p class="item-meta">${b}</p>
                </div>
              `})()}
            ${t?`
                  <label>
                    Description (optional)
                    <textarea name="description" maxlength="2000" placeholder="Why this habit matters, extra notes...">${g(a.description||"")}</textarea>
                  </label>
                `:`
                  <label>
                    Description (optional)
                    <textarea name="description" maxlength="240" placeholder="Why this matters, extra notes...">${g(a.description||"")}</textarea>
                  </label>
                  <div>
                    <p class="item-meta">Rating (optional, info only — does not change points)</p>
                    <div class="chip-row rating-row">
                      <button type="button" class="chip ${i===0?"on":""}" data-action="set-rating" data-rating="0">No rating</button>
                      ${[1,2,3,4,5].map(o=>`
                            <button type="button" class="chip ${i===o?"on":""}" data-action="set-rating" data-rating="${o}">${o}★</button>
                          `).join("")}
                    </div>
                    <input type="hidden" name="rating" value="${i}" />
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
                    <button type="button" class="chip ${s===o.id?"on":""}" data-action="set-category" data-category="${o.id}">${g(o.label)}</button>
                  `).join("")}
              </div>
              <input type="hidden" name="category" value="${s}" />
            </div>
            <label>
              Tags (optional, comma separated)
              <input name="tags" maxlength="120" value="${g(n)}" placeholder="morning, health" />
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
    `}if(A==="export"){const t=$&&$.range||"day";return`
      <div class="modal-backdrop open" data-action="close-modal">
        <div class="sheet">
          <div class="handle"></div>
          <h2>Export report</h2>
          <p class="muted tight">Date: ${U(v)}. Pick a range, then a format.</p>
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
    `}if(A==="goal"||A==="edit-goal"){const t=A==="edit-goal",e=$||{},a=e.kind||"habit-streak",s=d.getAllHabits(),i=d.getPinnedTasks(),n=e.targetId||"",r=a==="task-list"?(e.tasks||[]).filter(c=>!c.done).length:0,o=a==="task-list"?d.getArchivedTasks():[],l=a==="task-list"?d.undoneDayTasks():[];return`
      <div class="modal-backdrop open" data-action="close-modal">
        <form class="sheet" data-form="${A}" data-id="${e.id||""}">
          <div class="handle"></div>
          <h2>${t?"Edit":"New"} goal</h2>
          <div class="form" style="margin-top:14px">
            <label>
              Goal title
              <input name="title" required maxlength="60" value="${g(e.title||"")}" placeholder="Exercise every day" />
            </label>
            <div>
              <p class="item-meta">Goal type</p>
              <div class="chip-row goal-kind-row">
                ${xa.map(c=>`<button type="button" class="chip ${a===c.id?"on":""}" data-action="set-goal-kind" data-kind="${c.id}">${c.label}</button>`).join("")}
              </div>
              <input type="hidden" name="kind" value="${a}" />
              ${a==="task-list"?'<p class="item-meta">No target needed — pick the tasks to attach below. You can add more later from the task form (Select Goal) or inside Goals &amp; Rewards.</p>':""}
            </div>
            <div class="goal-attach" style="${a==="task-list"?"":"display:none"}">
              <p class="item-meta"><b style="color:var(--text)">Attach tasks</b> — tick the tasks that belong to this goal's list${r?` · already on the goal: ${r} unfinished`:""}.</p>
              ${(()=>{const c=(m,b,p)=>{const k=b.map(x=>{const S=String(x.title||"").trim();if(!S)return"";const y=x.category?`${x.category.charAt(0).toUpperCase()}${x.category.slice(1)}${x.date?` · ${x.date}`:""}`:x.date||"";return`
                        <label class="goal-attach-row">
                          <input type="checkbox" name="attachTask" value="${g(S)}" />
                          <span class="goal-attach-title">${g(S)}</span>
                          ${y?`<span class="goal-attach-meta">${g(y)}</span>`:""}
                        </label>
                      `}).filter(Boolean);return`
                    <div class="goal-attach-group">
                      <p class="goal-attach-heading">${m}</p>
                      ${k.length?k.join(""):`<p class="item-meta">${p}</p>`}
                    </div>
                  `};return`${c("Archived tasks",o,"No archived tasks yet.")}${c("Undone tasks",l,"No undone day tasks.")}`})()}
            </div>
            <label class="goal-target-habit" style="${a==="habit-streak"?"":"display:none"}">
              Habit
              <select name="habitTarget">
                ${s.map(c=>`<option value="${c.id}" ${n===c.id?"selected":""}>${g(c.name)}</option>`).join("")}
              </select>
            </label>
            <label class="goal-target-task" style="${a==="task-streak"?"":"display:none"}">
              Pinned task
              <select name="taskTarget">
                ${i.length?i.map(c=>`<option value="${c.id}" ${n===c.id?"selected":""}>${g(c.title)}</option>`).join(""):'<option value="">No pinned tasks yet</option>'}
              </select>
            </label>
            <label class="goal-target-days" style="${a==="task-list"?"display:none":""}">
              Number of days
              <input name="targetDays" type="number" min="1" max="365" value="${e.targetDays||7}" />
            </label>
            <div>
              <p class="item-meta">Badge</p>
              <div class="chip-row goal-tier-row">
                ${Bt.map(c=>`<button type="button" class="chip ${(e.tier||"bronze")===c.id?"on":""}" data-action="set-goal-tier" data-tier="${c.id}">${c.medal} ${c.label}</button>`).join("")}
              </div>
              <input type="hidden" name="tier" value="${e.tier||"bronze"}" />
            </div>
            <label>
              Reward title (yours)
              <input name="rewardTitle" required maxlength="60" value="${g(e.rewardTitle||"")}" placeholder="Champion" />
            </label>
            <button class="primary-btn" type="submit">Save goal</button>
            <button class="ghost-btn" type="button" data-action="close-modal">Cancel</button>
          </div>
        </form>
      </div>
    `}if(A==="pin"){const{kind:t,id:e,title:a,pin:s}=$||{};return`
      <div class="modal-backdrop open" data-action="close-modal">
        <form class="sheet sheet-wide" data-form="pin" data-kind="${t}" data-id="${e}">
          <div class="handle"></div>
          <h2>Pin ${t==="habit"?"habit":"task"}</h2>
          <p class="muted tight">${g(a||"")}</p>
          <div class="form" style="margin-top:14px">
            ${ks(s,$)}
            <button class="primary-btn" type="submit">Save pin</button>
            ${s?'<button class="ghost-btn danger" type="button" data-action="clear-pin">Unpin</button>':""}
            <button class="ghost-btn" type="button" data-action="close-modal">Cancel</button>
          </div>
        </form>
      </div>
    `}if(A==="forward"){const{kind:t,id:e,title:a,from:s}=$||{};return`
      <div class="modal-backdrop open" data-action="close-modal">
        <form class="sheet" data-form="forward" data-kind="${t}" data-id="${e}">
          <div class="handle"></div>
          <h2>Forward task</h2>
          <p class="muted tight">${g(a||"")}</p>
          <p class="item-meta">From ${g(s||v)} — a copy will be created on the day you pick, marked “↩ Forwarded from ${g(s||v)}”.</p>
          <div class="form" style="margin-top:14px">
            <label>
              Forward to day
              <input name="targetDate" type="date" required value="${Gi(s||v)}" />
            </label>
            <button class="primary-btn" type="submit">Forward task →</button>
            <button class="ghost-btn" type="button" data-action="close-modal">Cancel</button>
          </div>
        </form>
      </div>
    `}if(A==="replace"){const{id:t,title:e,from:a,info:s}=$||{},i=s&&s.days||[];return`
      <div class="modal-backdrop open" data-action="close-modal">
        <form class="sheet" data-form="replace" data-id="${t}">
          <div class="handle"></div>
          <h2>Replace habit day</h2>
          <p class="muted tight">${g(e||"")}</p>
          <p class="item-meta">Currently due on <b>${g(a||v)}</b>. Its next direct day is <b>${g(s&&s.next||"")}</b>, so the day may only move to one of the ${i.length} day${i.length===1?"":"s"} in between — the allowable replace days.</p>
          <div class="form" style="margin-top:14px">
            <div class="replace-day-grid">
              ${i.map(n=>`<button type="button" class="chip replace-day-chip" data-action="pick-replace-day" data-date="${n}">${g(n)}</button>`).join("")}
            </div>
            <input type="hidden" name="targetDate" value="${i[0]||""}" />
            <button class="primary-btn" type="submit" ${i.length?"":"disabled"}>Replace day ⇄</button>
            <button class="ghost-btn" type="button" data-action="close-modal">Cancel</button>
          </div>
        </form>
      </div>
    `}if(A==="image"){const{image:t,title:e}=$||{};return t?`
      <div class="lightbox-backdrop" data-action="close-modal">
        <img src="${t}" alt="${g(e||"Task photo")}" />
        <button type="button" class="ghost-btn compact lightbox-close" data-action="close-modal">✕ Close</button>
      </div>
    `:""}return""}function h(){if(be){Ge();try{const t=d.isLocked(v);be.innerHTML=`
    <div class="app-shell">
      <main class="screen active">
        ${H==="today"?qi():""}
        ${H==="profile"?Ui():""}
        ${H==="history"?Xi():""}
        ${H==="habits"?as():""}
        ${H==="settings"?vs():""}
      </main>
      ${["today","habits"].includes(H)&&!t?'<button class="fab" data-action="open-add" aria-label="Add">+</button>':""}
      ${H==="settings"?'<button class="fab" data-action="open-add-habit" aria-label="Add habit">+</button>':""}
      <nav class="tabbar tabs-5">
        <button class="tab ${H==="today"?"active":""}" data-screen="today">${E("home")}Today</button>
        <button class="tab ${H==="profile"?"active":""}" data-screen="profile">${E("profile")}Profile</button>
        <button class="tab ${H==="history"?"active":""}" data-screen="history">${E("history")}History</button>
        <button class="tab ${H==="habits"?"active":""}" data-screen="habits">${E("habit")}Activities</button>
        <button class="tab ${H==="settings"?"active":""}" data-screen="settings">${E("settings")}Settings</button>
      </nav>
    </div>
    ${$s()}
    <div class="toast" id="toast"></div>
  `,Ss(),zi(),Ds(),Ts(),Tt(),ws()}catch(t){const e=t&&t.stack?String(t.stack).slice(0,400):t&&t.message?t.message:"Unknown error";be.innerHTML=`<div class="app-shell"><section class="manage-card"><h2>Could not load (Error B)</h2><p class="muted tight">${g(e)}</p><button class="primary-btn full" data-action="reload-app">Reload</button></section></div>`}}}function ws(){if(A!=="habit"&&A!=="task")return;const t=document.querySelector(".sheet");t&&(t.scrollTop=0);const e=document.querySelector('.sheet input[name="title"]');if(e)try{e.focus({preventScroll:!0})}catch{try{e.focus()}catch{}}}function Ss(){const t=document.getElementById("day-note");t&&t.addEventListener("input",()=>{d.isLocked(v)||d.setNote(v,t.value)})}const xs=3e3,As=180,ga=10,T={list:null,card:null,timer:null,startX:0,startY:0,dragging:!1,order0:"",swallowClick:!1,fromHandle:!1,bound:!1};function Ne(){T.timer&&(clearTimeout(T.timer),T.timer=null),T.card=null,T.fromHandle=!1}function Va(t,e){return[...t.querySelectorAll(".item-card[data-sortable]")].filter(a=>a.dataset.sortable===e).map(a=>a.dataset.id)}function fa(t){const e=T.card,a=T.list;if(Ne(),T.list=null,T.dragging=!1,!e||(e.classList.remove("is-dragging"),a&&a.classList.remove("is-reordering"),document.body.classList.remove("is-reordering-body"),!t))return;const s=e.dataset.sortable,i=Va(a,s);i.join("|")!==T.order0&&(T.swallowClick=!0,setTimeout(()=>{T.swallowClick=!1},400),s==="habit"?(d.setHabitOrder(i),d.setHabitSort("custom")):s==="task"&&(d.setTaskOrder(v,i),d.setTaskSort("custom")),h(),f("Order saved"))}function Ts(){T.bound||(T.bound=!0,document.addEventListener("pointerdown",t=>{if(t.button!=null&&t.button!==0||t.target.closest("input, textarea, select, img, video, .stars, .mini-btn, .check, .fab, .tabbar"))return;const e=t.target.closest(".item-card[data-sortable]");if(!e)return;const a=e.closest(".list");if(!a||d.isLocked(v))return;const s=e.dataset.sortable,i=d.getSettings(),n=(s==="habit"?i.habitSort:i.taskSort)||"default";n!=="default"&&n!=="custom"&&(s==="habit"?d.setHabitSort("custom"):d.setTaskSort("custom"),f("Switched to Custom order so your drag sticks"));const r=t.target.closest(".drag-handle");r&&t.preventDefault(),Ne(),T.list=a,T.card=e,T.fromHandle=!!r,T.startX=t.clientX,T.startY=t.clientY,T.order0=Va(a,s).join("|"),T.timer=setTimeout(()=>{T.timer=null,!(!T.card||!T.card.isConnected)&&(T.dragging=!0,navigator.vibrate&&navigator.vibrate(15),T.card.classList.add("is-dragging"),T.list.classList.add("is-reordering"),document.body.classList.add("is-reordering-body"),f("Drag to reorder, lift to drop"))},r?As:xs)},!0),document.addEventListener("pointermove",t=>{if(T.timer&&T.card&&!T.fromHandle&&(Math.abs(t.clientX-T.startX)>ga||Math.abs(t.clientY-T.startY)>ga)){Ne(),T.list=null;return}if(!T.dragging||!T.card)return;t.preventDefault();const e=T.card,a=T.list;if(!a)return;const s=t.clientY,i=e.dataset.sortable,n=[...a.querySelectorAll(".item-card[data-sortable]")].filter(o=>o!==e&&o.dataset.sortable===i);let r=!1;for(const o of n){const l=o.getBoundingClientRect();if(s<l.top+l.height/2){a.insertBefore(e,o),r=!0;break}}r||a.appendChild(e)},{passive:!1}),document.addEventListener("pointerup",()=>fa(T.dragging)),document.addEventListener("pointercancel",()=>fa(!1)),document.addEventListener("contextmenu",t=>{(T.dragging||T.card)&&t.preventDefault()}),document.addEventListener("touchmove",t=>{T.dragging&&t.preventDefault()},{passive:!1}),document.addEventListener("click",t=>{T.swallowClick&&(t.stopPropagation(),t.preventDefault())},!0))}function Ds(){const t=document.getElementById("lock-time"),e=document.getElementById("auto-lock");t&&t.addEventListener("change",()=>{d.setLockTime(t.value),f(`Lock time set to ${t.value}`),h()}),e&&e.addEventListener("change",()=>{d.setAutoLock(e.checked),f(e.checked?"Auto-lock on":"Auto-lock off"),h()}),document.querySelectorAll("[data-cat-color]").forEach(s=>{s.addEventListener("input",()=>{var n;d.updateCategory(s.dataset.catColor,{color:s.value});const i=(n=s.closest(".cat-manage-card"))==null?void 0:n.querySelector(".cat-swatch");i&&(i.style.background=s.value)})}),document.querySelectorAll("[data-cat-goals]").forEach(s=>{const i=()=>{const n=s.dataset.catGoals,r=s.closest(".cat-manage-card");if(!r)return;const o=Rt((d.getCategories().find(p=>p.id===n)||{}).goals||""),l=Ot(Rt(s.value))!==Ot(o),c=r.querySelector('[data-action="save-cat-goals"]');c&&(c.textContent=l?"Save goals":"Saved");const m=r.querySelector('[data-action="reset-cat-goals"]');m&&(m.hidden=!l);const b=r.querySelector(".cat-goal-hint");b&&(b.textContent=l?"Unsaved changes — press Save to keep them offline and in backups.":"Saved on this device and included in every backup.")};s.addEventListener("input",()=>{St.set(s.dataset.catGoals,s.value),i()}),s.addEventListener("change",i)});const a=document.getElementById("backup-file");a&&a.addEventListener("change",()=>{const s=a.files[0];if(!s)return;const i=new FileReader;i.onload=()=>{Ua(String(i.result||""),s.name),a.value=""},i.onerror=()=>{f("Couldn't read that file."),a.value=""},i.readAsText(s)})}function f(t){const e=document.getElementById("toast");e&&(e.textContent=t,e.classList.add("show"),setTimeout(()=>e.classList.remove("show"),1800))}function We(){const t=d.getTheme();document.documentElement.dataset.theme=t;const e=document.querySelector('meta[name="theme-color"]');e&&(e.content=t==="light"?"#f3f1ea":"#0e1116")}function g(t){return String(t||"").split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;").split('"').join("&quot;")}function I(){return d.isLocked(v)?(f("This report is locked. Unlock it in Settings."),!0):!1}function Ue(t){return{mode:(t==null?void 0:t.mode)||"forever",until:(t==null?void 0:t.until)||"",weekdays:Array.isArray(t==null?void 0:t.weekdays)?t.weekdays.map(Number):[],monthDays:Array.isArray(t==null?void 0:t.monthDays)?t.monthDays.map(Number):[],yearDays:Array.isArray(t==null?void 0:t.yearDays)?[...t.yearDays]:[],customDates:Array.isArray(t==null?void 0:t.customDates)?[...t.customDates]:[],exceptDates:Array.isArray(t==null?void 0:t.exceptDates)?[...t.exceptDates]:Array.isArray(t==null?void 0:t.exceptions)?[...t.exceptions]:[]}}function Cs(t){const e=d.findHabit(t);e&&(A="pin",$={kind:"habit",id:t,title:e.name,pin:e.pin?Ue(e.pin):{mode:"forever",until:"",weekdays:[],monthDays:[],yearDays:[],customDates:[],exceptDates:[]},_exceptCal:O(v),_customCal:O(v),_yearMonth:"01"})}function Ps(t){const e=d.findTask(v,t);if(!e)return;const a=e.sourcePinId?d.findPinnedTask(e.sourcePinId):null;A="pin",$={kind:"task",id:t,title:e.title,pin:a!=null&&a.pin?Ue(a.pin):{mode:"forever",until:"",weekdays:[],monthDays:[],yearDays:[],customDates:[],exceptDates:[]},_exceptCal:O(v),_customCal:O(v),_yearMonth:"01"}}function Es(t){const e=d.findPinnedTask(t);e&&(A="pin",$={kind:"template",id:t,title:e.title,pin:e.pin?Ue(e.pin):{mode:"forever",until:"",weekdays:[],monthDays:[],yearDays:[],customDates:[],exceptDates:[]},_exceptCal:O(v),_customCal:O(v),_yearMonth:"01"})}function Ls(t){var c;const e=t.querySelector('input[name="mode"]').value,a=((c=t.querySelector('input[name="until"]'))==null?void 0:c.value)||"",s=[...t.querySelectorAll(".weekday.on")].map(m=>Number(m.dataset.day)),i=[...t.querySelectorAll(".monthday.on")].map(m=>Number(m.dataset.day)),n=$&&$.pin||{},r=Array.isArray(n.yearDays)?n.yearDays:[],o=Array.isArray(n.customDates)?n.customDates:[],l=Array.isArray(n.exceptDates)?n.exceptDates:[];return e==="until"&&!a?(f("Pick an until date"),null):e==="weekly"&&!s.length?(f("Pick at least one weekday"),null):e==="monthly"&&!i.length?(f("Pick at least one day of month"),null):e==="yearly"&&!r.length?(f("Add at least one yearly date"),null):e==="custom"&&!o.length?(f("Pick at least one custom date"),null):{mode:e,until:a,weekdays:s,monthDays:i,yearDays:r,customDates:o,exceptDates:l}}function At(t,e,a){const s=e instanceof Blob?e:new Blob([e],{type:a||"text/plain;charset=utf-8"}),i=URL.createObjectURL(s),n=document.createElement("a");n.href=i,n.download=t,document.body.appendChild(n),n.click(),setTimeout(()=>{document.body.removeChild(n),URL.revokeObjectURL(i)},500)}function Pt(t){const e=String(t??"");return/[",\n]/.test(e)?`"${e.replace(/"/g,'""')}"`:e}function ze(t,e){const[a,s]=d.resolveRange(t,e||v);return{range:t,start:a,end:s,rows:d.exportRows(a,s)}}function ha(t,e){const a=t||$&&$.range||"day",{start:s,end:i,rows:n}=ze(a,e),r=[];r.push(["Second Mind export",`${s} to ${i}`].map(Pt).join(",")),r.push(["Date","Type","Name","Category","Tags","Points","Rating","Earned","ConsciousPts","Status","Note/Description"].map(Pt).join(",")),n.forEach(o=>{o.habits.forEach(l=>{r.push([o.date,"Habit",l.name,l.category,(l.tags||[]).join("|"),l.points,l.rating,l.earned,l.consciousPoints,l.status||(l.rating>0?"done":o.locked?"missed":"pending"),l.description||""].map(Pt).join(","))}),o.tasks.forEach(l=>{r.push([o.date,"Task",l.hasImage?`${l.title} [photo]`:l.title,l.category,(l.tags||[]).join("|"),l.points,l.rating||"",l.earned,"",l.status||(l.done?"done":o.locked?"missed":"pending"),l.description||""].map(Pt).join(","))}),r.push([o.date,"Summary",`Earned ${o.earned}/${o.max} (${o.percent}%)`,"","","","","","",o.locked?"locked":"open",o.note||""].map(Pt).join(","))}),At(`second-mind-${a}-${s}-to-${i}.csv`,"\uFEFF"+r.join(`
`),"text/csv;charset=utf-8"),f("Excel (CSV) exported")}function ba(t,e){const a=t||$&&$.range||"day",{start:s,end:i,rows:n}=ze(a,e),r={app:"Second Mind",exportedAt:new Date().toISOString(),range:a,start:s,end:i,days:n};At(`second-mind-${a}-${s}-to-${i}.json`,JSON.stringify(r,null,2),"application/json"),f("JSON exported")}function ya(t,e){const a=t||$&&$.range||"day",{start:s,end:i,rows:n}=ze(a,e),r=n.map(l=>`
        <section style="margin-bottom:18px;border:1px solid #ddd;border-radius:12px;padding:12px">
          <h2 style="margin:0 0 4px;font-size:16px">${g(l.date)} — ${l.earned}/${l.max} pts (${l.percent}%)</h2>
          <p style="margin:0 0 8px;font-size:12px;color:#555">Habits ${l.habitScore} + Conscious ${l.consciousScore} + Tasks ${l.taskScore} · ${l.locked?"Locked":"Open"}${l.note?` · Note: ${g(l.note)}`:""}</p>
          <table style="width:100%;border-collapse:collapse;font-size:12px">
            <thead><tr><th align="left">Type</th><th align="left">Name</th><th align="left">Category</th><th>Points</th><th>Rating</th><th>Earned</th><th>Status</th></tr></thead>
            <tbody>
              ${l.habits.map(c=>`<tr><td>Habit</td><td>${g(c.name)}${c.description?` (${g(c.description)})`:""}</td><td>${g(c.category)}</td><td align="center">${c.points}${c.consciousPoints?`+${c.consciousPoints}🧠`:""}</td><td align="center">${c.rating||"-"}/5</td><td align="center">${c.earned}</td><td align="center">${c.status||(c.rating>0?"done":l.locked?"missed":"pending")}</td></tr>`).join("")}
              ${l.tasks.map(c=>`<tr><td>Task</td><td>${g(c.title)}${c.hasImage?" 📷":""}${c.description?` (${g(c.description)})`:""}</td><td>${g(c.category)}</td><td align="center">${c.points}</td><td align="center">${c.rating?`${c.rating}/5`:"-"}</td><td align="center">${c.earned}</td><td align="center">${c.status||(c.done?"done":l.locked?"missed":"pending")}</td></tr>`).join("")}
            </tbody>
          </table>
        </section>
      `).join(""),o=window.open("","_blank");if(!o){f("Popup blocked — allow popups to export PDF");return}o.document.write(`<!DOCTYPE html><html><head><title>Second Mind ${s} to ${i}</title></head><body style="font-family:sans-serif;padding:24px"><h1>Second Mind — ${s} to ${i}</h1>${r}<script>window.onload=function(){window.print()}<\/script></body></html>`),o.document.close(),f("PDF print view opened")}document.addEventListener("click",t=>{const e=t.target.closest("[data-screen]");if(e){H=e.dataset.screen,h();return}const a=t.target.closest("[data-action]");if(!a)return;const s=a.dataset.action;if(s==="close-modal"){if(A==="image"){A=null,$=null,h();return}(t.target.classList.contains("modal-backdrop")||a.classList.contains("ghost-btn"))&&(A=null,$=null,h());return}if(s==="note-bullets"){da("bullets");return}if(s==="note-numbered"){da("numbered");return}if(s==="values-bullets"){la("bullets");return}if(s==="values-numbered"){la("numbered");return}if(s==="pick-task-image"){const i=document.getElementById("task-image-input");i?i.click():f("Photo picking needs a browser file picker");return}if(s==="remove-task-image"){$&&($._image="",h(),f("Photo removed — save to apply"));return}if(s==="view-task-image"){const i=d.findTask(v,a.dataset.id),n=i&&i.image?i.image:$&&($._image||$.image)||"";if(!n){f("No photo on this task");return}A="image",$={image:n,title:i&&i.title||"Task photo"},h();return}if(s==="prev-day"&&sa(-1),s==="next-day"&&sa(1),s==="reload-app"){window.location.reload();return}if(s==="set-theme"){const i=a.dataset.theme==="light"?"light":"dark";d.setTheme(i),We(),f(i==="light"?"Light mode on":"Dark mode on")}if(s==="install-app"){ps();return}if(s==="check-updates"){gs();return}if(s==="apply-update"){za();return}if(s==="backup-now"){ls();return}if(s==="trigger-import"){const i=document.getElementById("backup-file");i&&i.click();return}if(s==="choose-folder"){os();return}if(s==="grant-folder"){ds();return}if(s==="forget-folder"){rs();return}if(s==="restore-backup"){us(a.dataset.name);return}if(s==="goto-settings"&&(H="settings"),s==="open-add-habit"&&(A="habit",$=null),s==="open-add-task"){if(I())return;A="task",$={category:"mentally"}}if(s==="open-add"){if(I())return;A="choose",$={category:"mentally"}}if(s==="toggle-edit"&&(Q=!Q),s==="toggle-settings-edit"){ut=!ut,h();return}if(s==="toggle-setting-habit"){const i=a.dataset.id;Jt.has(i)?Jt.delete(i):Jt.add(i),h();return}if(s==="toggle-settings-section"){const i=a.dataset.id;Lt.has(i)?Lt.delete(i):Lt.add(i),i==="tutorials"&&!Lt.has("tutorials")&&(Xt=null),h();return}if(s==="open-tutorial"){Xt=Xt===a.dataset.id?null:a.dataset.id,h();return}if(s==="toggle-activity-cat"){const i=a.dataset.id;Zt.has(i)?Zt.delete(i):Zt.add(i),h();return}if(s==="add-goal-item"){const i=a.dataset.id,n=document.getElementById(`goal-item-input-${i}`),r=d.addGoalItem(i,n?n.value:"");r.ok?f("Task added to goal"):f(r.reason||"Could not add a task"),h();return}if(s==="toggle-goal-item"){const{id:i,item:n,done:r}=a.dataset,o=d.setGoalItemDone(i,n,r!=="true");if(!o.ok){f(o.reason||"Could not update the task"),h();return}const l=o.awarded&&o.awarded.length?o.awarded:d.checkGoals(v);l.length?f(`🏅 Reward earned: ${l[0].rewardTitle}!`):o.autoLocked&&f("All tasks done — goal completed and locked 🔒"),h();return}if(s==="remove-goal-item"){const i=d.removeGoalItem(a.dataset.id,a.dataset.item);f(i.ok?"Task removed from goal":i.reason||"Could not remove"),h();return}if(s==="lock-goal"){const i=d.findGoal(a.dataset.id),n=d.setGoalLocked(a.dataset.id,!0),r=i&&n.ok&&i.tasks.length>0&&!i.tasks.every(o=>o.done);n.ok?f(r?"Goal locked and terminated ⛔":"Goal locked 🔒"):f(n.reason||"Could not lock"),h();return}if(s==="unlock-goal"){const i=d.setGoalLocked(a.dataset.id,!1);f(i.ok?"Goal unlocked":i.reason||"Could not unlock"),h();return}if(s==="move-pinned-habit"){const i=d.getPinnedHabits(),n=i.findIndex(o=>o.id===a.dataset.id),r=n+(Number(a.dataset.dir)||0);if(n>=0&&r>=0&&r<i.length){const o=i[n];i[n]=i[r],i[r]=o,d.setPinnedHabitOrder(i.map(l=>l.id))}h();return}if(s==="move-pinned-task"){const i=d.getPinnedTasks(),n=i.findIndex(o=>o.id===a.dataset.id),r=n+(Number(a.dataset.dir)||0);if(n>=0&&r>=0&&r<i.length){const o=i[n];i[n]=i[r],i[r]=o,d.setPinnedTaskOrder(i.map(l=>l.id))}h();return}if(s==="open-habit-activity-date"){v=a.dataset.date,H="today",h();return}if(s==="open-edit-habit"){const i=d.findHabit(a.dataset.id);if(!i)return;A="edit-habit",$={id:i.id,name:i.name,description:i.description||"",points:i.points,category:i.category,tags:i.tags||[],consciousPoints:Number(i.consciousPoints)||0}}if(s==="open-edit-task"){if(I())return;const i=d.findTask(v,a.dataset.id);if(!i)return;A="edit-task",$={id:i.id,title:i.title,points:i.points,description:i.description,category:i.category,tags:i.tags||[],rating:Number(i.rating)||0,image:i.image||"",_image:void 0}}if(s==="open-edit-pinned-task"){const i=d.findPinnedTask(a.dataset.id);if(!i)return;A="edit-pinned-task",$={id:i.id,title:i.title,points:i.points,description:i.description||"",category:i.category,tags:i.tags||[],rating:0,image:i.image||"",_image:void 0}}if(s==="toggle-badges"&&(ne=!ne),s==="open-goal"&&(A="goal",$={kind:"habit-streak",targetDays:7,tier:"bronze"}),s==="open-edit-goal"){const i=d.getGoals().find(n=>n.id===a.dataset.id);if(!i)return;A="edit-goal",$={...i}}if(s==="remove-goal"&&(d.removeGoal(a.dataset.id),f("Goal removed")),s==="remove-badge"&&(d.removeBadge(a.dataset.id),f("Badge removed")),s==="rate-habit"){if(I())return;const n=d.habitRating(v,a.dataset.id)===Number(a.dataset.rating)?0:Number(a.dataset.rating);d.setHabitRating(v,a.dataset.id,n)}if(s==="rate-task"){if(I())return;const i=d.findTask(v,a.dataset.id);if(!i)return;const r=(Number(i.rating)||0)===Number(a.dataset.rating)?0:Number(a.dataset.rating);d.setTaskRating(v,a.dataset.id,r)}if(s==="open-export"&&(A="export",$={range:$&&$.range||"day"}),s==="set-export-range"){A="export",$={range:a.dataset.range||"day"},h();return}if(s==="do-export"){const i=a.dataset.format,n=$&&$.range||"day";i==="csv"&&ha(n,v),i==="json"&&ba(n,v),i==="pdf"&&ya(n,v),A=null,$=null}if(s==="set-histexp-range"){G=["day","week","month","year"].includes(a.dataset.range)?a.dataset.range:"day",h();return}if(s==="histexp-do"){const i=a.dataset.format;let n=v;if(G==="day"||G==="week"){const r=document.getElementById("histexp-date");r&&/^\d{4}-\d{2}-\d{2}$/.test(r.value)&&(n=r.value)}else if(G==="month"){const r=document.getElementById("histexp-month");r&&/^\d{4}-\d{2}$/.test(r.value)&&(n=`${r.value}-15`)}else if(G==="year"){const r=document.getElementById("histexp-year"),o=Number(r&&r.value);Number.isInteger(o)&&o>=2e3&&o<=2100&&(n=`${String(o)}-06-15`)}i==="csv"&&ha(G,n),i==="json"&&ba(G,n),i==="pdf"&&ya(G,n);return}if(s==="history-cal-nav"){const i=re||O(v);re=Mt(i,Number(a.dataset.dir)||0),h();return}if(s==="locked-cal-nav"){const i=de||O(v);de=Mt(i,Number(a.dataset.dir)||0),h();return}if(s==="toggle-locked-day"){const i=a.dataset.date,n=F.indexOf(i);n>=0?F.splice(n,1):F.push(i),h();return}if(s==="lock-selected"){const i=[...F].sort();if(!i.length)return;const n=d.lockDays(i);F=[],f(n===1?`Locked ${n} day`:`Locked ${n} days`),h();return}if(s==="unlock-selected"){const i=[...F].sort();if(!i.length)return;const n=d.unlockDays(i);F=[],f(n===1?`Unlocked ${n} day`:`Unlocked ${n} days`),h();return}if(s==="submit-day"&&(d.submitDay(v),f("Report submitted and locked")),s==="unlock-day"&&(d.unlockDay(a.dataset.date),f("Report unlocked")),s==="toggle-habit"){if(I())return;d.toggleHabit(v,a.dataset.id),h()}if(s==="toggle-task"){if(I())return;d.toggleTask(v,a.dataset.id),h()}if(s==="remove-task"){if(!Q||I())return;d.removeTask(v,a.dataset.id),h()}if(s==="remove-habit"&&(d.removeHabit(a.dataset.id),h()),s==="restore-habit"){const i=d.restoreHabit(a.dataset.id);f(i.ok?"Habit restored":i.reason||"Could not restore that habit"),h()}if(s==="toggle-archive"){mt=!mt,h();return}if(s==="archive-habit"){d.removeHabit(a.dataset.id),mt=!0,f("Habit archived — restore it from the Archive"),h();return}if(s==="archive-task"){if(I())return;const i=d.archiveTask(v,a.dataset.id);if(!i.ok){f(i.reason||"Could not archive that task");return}mt=!0,f("Task archived — restore it from the Archive"),h();return}if(s==="restore-task"){const i=d.isLocked(v)?d.todayKey():v,n=d.restoreTask(a.dataset.id,i);n.ok?f(n.from&&n.from!==i?`Task restored to ${i} — forwarded from ${n.from}`:`Task restored to ${i}`):f(n.reason||"Could not restore that task"),i!==v&&(v=i),h();return}if(s==="delete-archived-task"){if(!Q||!window.confirm("Delete this archived task permanently? This cannot be undone."))return;const i=d.deleteArchivedTask(a.dataset.id);f(i.ok?"Task deleted permanently":i.reason||"Could not delete"),h();return}if(s==="delete-archived-habit"){if(!window.confirm("Delete this archived habit permanently? This cannot be undone."))return;const i=d.deleteArchivedHabit(a.dataset.id);f(i.ok?"Habit deleted permanently":i.reason||"Could not delete"),h();return}if(s==="open-pin-habit"&&Cs(a.dataset.id),s==="open-replace-habit"){if(I())return;const i=d.findHabit(a.dataset.id);if(!i)return;const n=d.habitReplaceDays(v,i.id);A="replace",$={id:i.id,title:i.name,from:v,info:n};return}if(s==="pick-replace-day"){const i=document.querySelector('.sheet input[name="targetDate"]');i&&(i.value=a.dataset.date),document.querySelectorAll(".replace-day-chip").forEach(n=>{n.classList.toggle("on",n.dataset.date===a.dataset.date)});return}if(s==="undo-replace-habit"){if(I())return;const i=d.undoReplaceHabit(a.dataset.id,a.dataset.from,a.dataset.to);f(i.ok?"Habit is due on this day again":i.reason||"Could not undo that"),h();return}if(s==="open-forward-task"){if(I())return;const i=d.findTask(v,a.dataset.id);if(!i)return;A="forward",$={kind:"task",id:i.id,title:i.title,from:v}}if(s==="open-pin-task"){if(I())return;Ps(a.dataset.id)}if(s==="open-pin-template"&&Es(a.dataset.id),s==="unpin-template"&&(d.unpinTaskTemplate(a.dataset.id),f("Task unpinned — removed from today and all upcoming days")),s==="pick-date"&&(v=a.dataset.date,tt=0,H="today"),s==="set-chart-range"){J=["week","month","year"].includes(a.dataset.range)?a.dataset.range:"week",it=0,h();return}if(s==="set-chart-cat"){Z=a.dataset.cat||"all",h();return}if(s==="week-nav"){tt+=Number(a.dataset.dir)||0,tt>0&&(tt=0),h();return}if(s==="chart-nav"){it+=Number(a.dataset.dir)||0,it>0&&(it=0),h();return}if(s==="add-category"){const i=document.getElementById("new-category"),n=d.addCategory(i?i.value:"");f(n.ok?"Category added":n.reason||"Couldn't add category"),h();return}if(s==="rename-category"){const i=d.getCustomCategories().find(o=>o.id===a.dataset.id),n=window.prompt("Rename category",i?i.label:"");if(n==null)return;const r=d.renameCategory(a.dataset.id,n);f(r.ok?"Category renamed":r.reason||"Couldn't rename"),h();return}if(s==="delete-category"){if(!window.confirm("Delete this category? Its habits and tasks move to Mentally."))return;const i=d.deleteCategory(a.dataset.id);i.ok&&ct.delete(a.dataset.id),f(i.ok?"Category deleted":i.reason||"Couldn't delete"),h();return}if(s==="rename-tag"){const i=window.prompt("Rename tag everywhere",a.dataset.tag||"");if(i==null)return;const n=d.renameTag(a.dataset.tag,i);f(n.ok?n.merged?"Tags merged":"Tag renamed everywhere":n.reason||"Couldn't rename"),h();return}if(s==="delete-tag"){if(!window.confirm(`Delete tag "#${a.dataset.tag}" from all habits and tasks?`))return;d.deleteTag(a.dataset.tag),f("Tag deleted everywhere"),h();return}if(s==="add-tag"){const i=document.getElementById("tag-habit-pick"),n=document.getElementById("new-tag"),r=d.addTagToHabit(i?i.value:"",n?n.value:"");f(r.ok?"Tag added to habit":r.reason||"Couldn't add tag"),h();return}if(s==="set-points"){const i=document.querySelector('input[name="points"]');i&&(i.value=a.dataset.points),document.querySelectorAll(".chip-row .chip[data-points]").forEach(n=>n.classList.remove("on")),a.classList.add("on");return}if(s==="set-category"){const i=a.closest("form")||a.closest(".sheet"),n=i.querySelector('input[name="category"]');n&&(n.value=a.dataset.category),i.querySelectorAll(".cat-row .chip").forEach(r=>r.classList.remove("on")),a.classList.add("on");return}if(s==="set-rating"){const i=a.closest(".sheet")||a.closest("form")||document,n=i.querySelector('input[name="rating"]');n&&(n.value=a.dataset.rating),i.querySelectorAll(".rating-row .chip").forEach(r=>r.classList.remove("on")),a.classList.add("on");return}if(s==="set-conscious"){const i=a.closest(".sheet")||a.closest("form")||document,n=i.querySelector('input[name="consciousPoints"]');n&&(n.value=a.dataset.conscious),i.querySelectorAll(".conscious-row .chip").forEach(r=>r.classList.remove("on")),a.classList.add("on");return}if(s==="set-goal-kind"){const i=a.closest(".sheet")||document,n=i.querySelector('input[name="kind"]');n&&(n.value=a.dataset.kind),i.querySelectorAll(".goal-kind-row .chip").forEach(m=>m.classList.remove("on")),a.classList.add("on");const r=a.dataset.kind,o=i.querySelector(".goal-target-habit"),l=i.querySelectorAll(".goal-target-task, .goal-target-days"),c=i.querySelector(".goal-attach");o&&(o.style.display=r==="habit-streak"?"":"none"),l.forEach(m=>{m.style.display=r==="task-streak"||r==="perfect-days"?"":"none"}),c&&(c.style.display=r==="task-list"?"":"none"),$&&($.kind=r);return}if(s==="set-goal-tier"){const i=a.closest(".sheet")||document,n=i.querySelector('input[name="tier"]');n&&(n.value=a.dataset.tier),i.querySelectorAll(".goal-tier-row .chip").forEach(r=>r.classList.remove("on")),a.classList.add("on");return}if(s==="pin-mode"){const i=a.closest("form"),n=a.dataset.mode;i.querySelector('input[name="mode"]').value=n,i.querySelectorAll(".pin-modes .chip").forEach(o=>o.classList.remove("on")),a.classList.add("on");const r=(o,l)=>{const c=i.querySelector(o);c&&(c.style.display=l?"":"none")};r(".pin-until",n==="until"),r(".pin-weekdays",n==="weekly"),r(".pin-monthdays",n==="monthly"),r(".pin-yeardays",n==="yearly"),$&&$.pin&&($.pin.mode=n);return}if(s==="toggle-weekday"){a.classList.toggle("on");return}if(s==="toggle-monthday"){a.classList.toggle("on");return}if(s==="pin-cal-nav"){if(!$)return;const i=a.dataset.target,n=Number(a.dataset.dir)||0;i==="except"?$._exceptCal=Mt($._exceptCal||O(v),n):$._customCal=Mt($._customCal||O(v),n),h();return}if(s==="toggle-pin-date"){if(!$||!$.pin)return;const i=a.dataset.target,n=a.dataset.date,r=i==="custom"?"customDates":"exceptDates",o=Array.isArray($.pin[r])?[...$.pin[r]]:[],l=o.indexOf(n);l>=0?o.splice(l,1):(o.push(n),o.length>365&&o.shift()),$.pin[r]=o.sort(),h();return}if(s==="add-year-day"){if(!$||!$.pin)return;const i=a.closest("form")||document,n=i.querySelector("#year-month-select"),r=i.querySelector("#year-day-select");n&&($._yearMonth=n.value);const o=`${n?n.value:"01"}-${r?r.value:"01"}`,l=Array.isArray($.pin.yearDays)?[...$.pin.yearDays]:[];l.includes(o)||l.push(o),$.pin.yearDays=l.sort(),h();return}if(s==="remove-year-day"){if(!$||!$.pin)return;const i=a.dataset.date;$.pin.yearDays=($.pin.yearDays||[]).filter(n=>n!==i),h();return}if(s==="clear-pin"){const i=a.closest("form"),n=i.dataset.kind,r=i.dataset.id;let o=!1;if(n==="habit"&&d.unpinHabit(r),n==="task"){const l=d.findTask(v,r);l!=null&&l.sourcePinId&&(d.unpinTaskTemplate(l.sourcePinId),o=!0)}n==="template"&&(d.unpinTaskTemplate(r),o=!0),A=null,$=null,f(o?"Task unpinned — removed from today and all upcoming days":"Unpinned"),h();return}if(s==="lock-profile"){d.setProfileLocked(!0),f("Profile locked — read only"),h();return}if(s==="unlock-profile"){d.setProfileLocked(!1),f("Profile unlocked"),h();return}if(s==="add-whoami"){const i=document.getElementById("new-whoami"),n=d.addWhoAmI(i?i.value:"");f(n.ok?"Added":n.reason||"Couldn't add"),h();return}if(s==="move-whoami"){d.moveWhoAmI(a.dataset.id,Number(a.dataset.dir)||0),h();return}if(s==="remove-whoami"){d.removeWhoAmI(a.dataset.id),f("Removed"),h();return}if(s==="add-lifearea"){const i=document.getElementById("new-lifearea"),n=d.addLifeArea(i?i.value:"");n.ok?(ht=n.id,f("Life area added")):f(n.reason||"Couldn't add"),h();return}if(s==="toggle-lifearea"){const i=a.dataset.id;ht=ht===i?null:i,h();return}if(s==="move-lifearea"){d.moveLifeArea(a.dataset.id,Number(a.dataset.dir)||0),h();return}if(s==="toggle-cat"){const i=a.dataset.id;ct.has(i)?ct.delete(i):ct.add(i),h();const n=document.querySelector(`[data-action="toggle-cat"][data-id="${CSS.escape(i)}"]`);n&&n.focus({preventScroll:!0});return}if(s==="expand-cats"){d.getCategories().forEach(i=>ct.add(i.id)),h();return}if(s==="collapse-cats"){ct.clear(),h();return}if(s==="save-cat-goals"){const i=a.dataset.id,n=document.querySelector(`[data-cat-goals="${CSS.escape(i)}"]`),r=n?n.value:St.get(i)||"",o=Rt(r);d.updateCategory(i,{goals:Ot(o)}),St.delete(i),f(o.length?`Saved ${o.length} goal${o.length===1?"":"s"} for ${nt(i)}`:`Cleared goals for ${nt(i)}`),h();return}if(s==="reset-cat-goals"){const i=a.dataset.id;St.delete(i),h();return}if(s==="remove-lifearea"){d.removeLifeArea(a.dataset.id),ht===a.dataset.id&&(ht=null),f("Life area removed"),h();return}if(s==="set-pgoal-term"){K=["short","medium","long"].includes(a.dataset.term)?a.dataset.term:"short",xt=d.profileGoalDurations()[K][0],h();return}if(s==="set-pgoal-filter"){Qt=["all","short","medium","long"].includes(a.dataset.filter)?a.dataset.filter:"all",h();return}if(s==="add-pgoal"){const i=document.getElementById("new-pgoal"),n=document.getElementById("new-pgoal-duration"),r=d.addProfileGoal(i?i.value:"",K,n?n.value:xt);f(r.ok?`Goal added ${Kt(K)}`:r.reason||"Couldn't add"),h();return}if(s==="remove-pgoal"){d.removeProfileGoal(a.dataset.id),f("Goal removed"),h();return}if(s==="add-idea"){const i=document.getElementById("new-idea"),n=String(i?i.value:"").trim().slice(0,200);if(!n){f("Write an idea first");return}if(d.isProfileLocked()){f("Profile is locked");return}const r=String(d.getProfile().ideas||"").split(`
`).map(o=>o.trim()).filter(Boolean);r.push(`• ${n}`),d.setProfileField("ideas",r.join(`
`)),f("Idea added"),h();return}if(s==="remove-idea"){if(d.isProfileLocked())return;const i=Number(a.dataset.index),n=String(d.getProfile().ideas||"").split(`
`).filter(r=>r.trim());if(!Number.isInteger(i)||i<0||i>=n.length)return;n.splice(i,1),d.setProfileField("ideas",n.join(`
`)),f("Idea removed"),h();return}if(s==="add-quote"){const i=document.getElementById("new-quote"),n=document.getElementById("new-quote-author"),r=d.addQuote(i?i.value:"",n?n.value:"");f(r.ok?"Quote added":r.reason||"Couldn't add"),h();return}if(s==="toggle-quote-fav"){d.toggleQuoteFav(a.dataset.id),h();return}if(s==="remove-quote"){d.removeQuote(a.dataset.id),f("Quote removed"),h();return}if(s==="toggle-quotes"){It=!It,h();return}h()});document.addEventListener("submit",t=>{const e=t.target.closest("[data-form]");if(!e)return;t.preventDefault();const a=e.dataset.form;if(a==="habit"||a==="task"||a==="edit-habit"||a==="edit-task"||a==="edit-pinned-task"){const s=new FormData(e),i=String(s.get("title")||""),n=Number(s.get("points")||0),r=String(s.get("category")||"mentally"),o=String(s.get("description")||""),l=String(s.get("tags")||""),c=Math.max(0,Math.min(5,Number(s.get("rating")||0))),m=Math.max(0,Math.min(100,Number(s.get("consciousPoints")||0)));if(!i.trim())return;const b=$&&$._image!==void 0?q($._image):q($&&$.image);if(a==="habit")d.addHabit(i,n,{description:o,category:r,consciousPoints:m,tags:l,startFrom:v}),f("Habit added");else if(a==="task"){const p=String(s.get("goalTarget")||"");if(p){const k=d.addGoalItem(p,i);if(!k.ok){f(k.reason||"Could not add the task to the goal");return}const x=d.findGoal(p);f(`Added to goal “${x?x.title:i}”`)}else{if(I())return;d.addTask(v,i,n,{description:o,category:r,rating:c,tags:l,image:b}),f("Task added")}}else if(a==="edit-habit")d.updateHabit(e.dataset.id,{name:i,description:o,points:n,category:r,consciousPoints:m,tags:l}),f("Habit updated");else if(a==="edit-pinned-task")d.updatePinnedTaskDetails(e.dataset.id,{title:i,description:o,points:n,category:r,tags:l,image:b}),f("Pinned task updated");else{if(I())return;d.updateTask(v,e.dataset.id,{title:i,points:n,description:o,category:r,rating:c,tags:l,image:b}),f("Task updated");const p=String(s.get("goalTarget")||"");if(p){const k=d.addGoalItems(p,[i]);k.ok&&k.added?f(`Attached to goal “${(d.findGoal(p)||{}).title}”`):k.ok?f("Already on that goal’s list"):f(k.reason||"Could not attach to the goal")}}A=null,$=null,h();return}if(a==="pin"){const s=Ls(e);if(!s)return;const i=e.dataset.kind,n=e.dataset.id;i==="habit"&&d.pinHabit(n,s),i==="task"&&d.pinTask(v,n,s),i==="template"&&d.updatePinnedTask(n,s),A=null,$=null,f("Pin saved"),h();return}if(a==="replace"){const s=new FormData(e),i=String(s.get("targetDate")||""),n=e.dataset.id,r=$&&$.from||v,o=d.replaceHabit(r,n,i);if(!o.ok){f(o.reason||"Could not replace that habit day");return}A=null,$=null,f(`Habit moved from ${o.from} to ${o.to}`),h();return}if(a==="goal"||a==="edit-goal"){const s=new FormData(e),i=String(s.get("title")||"").trim(),n=String(s.get("kind")||"habit-streak"),r=String(s.get("tier")||"bronze"),o=String(s.get("rewardTitle")||"").trim(),l=Math.max(1,Math.min(365,Number(s.get("targetDays")||7)));if(!i||!o){f("Goal title and reward title are required");return}let c="";if(n==="habit-streak"&&(c=String(s.get("habitTarget")||"")),n==="task-streak"&&(c=String(s.get("taskTarget")||"")),(n==="habit-streak"||n==="task-streak")&&!c){f(n==="habit-streak"?"Pick a habit":"Pin a task first, then pick it");return}if(a==="goal"){const b=d.addGoal({title:i,kind:n,targetId:c,targetDays:l,tier:r,rewardTitle:o});if(n==="task-list"){const p=Array.from(e.querySelectorAll('input[name="attachTask"]:checked')).map(x=>x.value),k=d.addGoalItems(b.id,p);f(k.added?`Goal added with ${k.added} task(s)`:"Goal added")}else f("Goal added")}else if(d.updateGoal(e.dataset.id,{title:i,kind:n,targetId:c,targetDays:l,tier:r,rewardTitle:o}),n==="task-list"){const b=Array.from(e.querySelectorAll('input[name="attachTask"]:checked')).map(k=>k.value),p=d.addGoalItems(e.dataset.id,b);f(p.added?`Goal updated — ${p.added} task(s) attached`:"Goal updated")}else f("Goal updated");const m=d.checkGoals(v);m.length&&f(`🏅 Reward earned: ${m[0].rewardTitle}!`),A=null,$=null,h()}});document.addEventListener("change",t=>{const e=t.target.closest(".sort-select");if(e){const a=e.dataset.sortKind;a==="habit"&&d.setHabitSort(e.value),a==="task"&&d.setTaskSort(e.value),h()}if(t.target&&t.target.id==="show-conscious"&&(d.setShowConscious(t.target.checked),f(t.target.checked?"Conscious points on":"Conscious points hidden"),h()),t.target&&t.target.id==="week-start"&&(d.setWeekStart(Number(t.target.value)),f("Week starts on "+t.target.selectedOptions[0].textContent),h()),t.target&&t.target.id==="new-pgoal-duration"){xt=t.target.value;return}if(t.target&&t.target.id==="year-month-select"&&$&&($._yearMonth=t.target.value),t.target&&t.target.id==="task-image-input"){const a=t.target.files&&t.target.files[0];if(!a)return;if(!String(a.type||"").startsWith("image/")){f("Please pick an image file"),t.target.value="";return}f("Processing photo…"),Oi(a).then(s=>{if(t.target.value="",!s){f("Photo too large or unreadable — try a smaller one");return}$&&($._image=s,h(),f("Photo attached — save to apply"))})}});function Ms(){const t=window.visualViewport;if(!t)return;const e=document.documentElement,a=()=>{e.style.setProperty("--vvh",`${Math.max(0,Math.round(t.height))}px`);const s=window.innerHeight-t.height>120;e.classList.toggle("vk-open",s)};t.addEventListener("resize",a),t.addEventListener("scroll",a),a()}Ms();if("serviceWorker"in navigator){window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js").catch(()=>{})});let t=!1;try{const e=Number(sessionStorage.getItem("dr-reload-at")||0);Date.now()-e<8e3&&(t=!0)}catch{}navigator.serviceWorker.addEventListener("controllerchange",()=>{if(!t){t=!0;try{sessionStorage.setItem("dr-reload-at",String(Date.now()))}catch{}window.location.reload()}})}function Ns(){const t=document.getElementById("boot-error");t&&(t.style.display="none")}Ns();We();h();d.initFolderSync().then(t=>{t&&(t.replaced&&(We(),f("Data loaded from your data folder")),t.corrupt&&f("The data file was unreadable — a copy was saved aside, the browser copy is in use"),Tt(),(H==="settings"||t.replaced||t.corrupt)&&h())}).catch(()=>{});window.addEventListener("pagehide",()=>{d.flushFolderWrite().catch(()=>{})});document.addEventListener("visibilitychange",()=>{document.hidden&&d.flushFolderWrite().catch(()=>{})});setInterval(()=>{!document.hidden&&Ge()&&h()},6e4);document.addEventListener("visibilitychange",()=>{!document.hidden&&Ge()&&h()});
