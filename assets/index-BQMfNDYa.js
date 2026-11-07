(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function a(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=a(s);fetch(s.href,n)}})();const $t="second-mind.json",Se="daily-report.json",wa="second-mind-corrupt",Ka="daily-report-fs",ht="kv",je=["dataDir","backupDir"];function Et(){return typeof window<"u"&&typeof window.showDirectoryPicker=="function"&&typeof indexedDB<"u"}function ts(){return window.showDirectoryPicker({id:"second-mind-data",mode:"readwrite"})}function es(t){return!t||typeof t.queryPermission!="function"?Promise.resolve("granted"):t.queryPermission({mode:"readwrite"}).then(e=>["granted","denied","prompt"].includes(e)?e:"prompt",()=>"prompt")}function Qe(t){return!t||typeof t.requestPermission!="function"?Promise.resolve("granted"):t.requestPermission({mode:"readwrite"}).then(e=>["granted","denied","prompt"].includes(e)?e:"prompt",()=>"prompt")}function Be(){return new Promise((t,e)=>{if(typeof indexedDB>"u"){e(new Error("no-indexeddb"));return}const a=indexedDB.open(Ka,1);a.onupgradeneeded=()=>{try{a.result.createObjectStore(ht)}catch{}},a.onsuccess=()=>t(a.result),a.onerror=()=>e(a.error)})}function as(t){return Be().then(e=>new Promise((a,i)=>{const s=e.transaction(ht,"readonly").objectStore(ht).get(t);s.onsuccess=()=>a(s.result),s.onerror=()=>i(s.error)}))}function ss(t,e){return Be().then(a=>new Promise((i,s)=>{const n=a.transaction(ht,"readwrite");n.objectStore(ht).put(e,t),n.oncomplete=()=>i(),n.onerror=()=>s(n.error),n.onabort=()=>s(n.error)}))}function is(t){return Be().then(e=>new Promise((a,i)=>{const s=e.transaction(ht,"readwrite");s.objectStore(ht).delete(t),s.oncomplete=()=>a(),s.onerror=()=>i(s.error),s.onabort=()=>i(s.error)}))}async function ns(){for(const t of je)try{const e=await as(t);if(e)return e}catch{}return null}async function os(t){await ss(je[0],t)}async function rs(){await Promise.all(je.map(t=>is(t).catch(()=>{})))}async function Ae(t,e){if(!t)return{missing:!0,raw:"",modified:0,error:"no-folder"};try{const i=await(await t.getFileHandle(e)).getFile();return{missing:!1,raw:await i.text(),modified:Number(i.lastModified)||0,error:""}}catch(a){return a&&(a.name==="NotFoundError"||a.name==="TypeMismatchError")?{missing:!0,raw:"",modified:0,error:""}:{missing:!1,raw:"",modified:0,error:String(a&&a.message||a)}}}async function ds(t){const e=await Ae(t,$t);if(!e.missing)return{...e,name:$t};const a=await Ae(t,Se);return!a.missing&&!a.error?{...a,name:Se}:{...e,name:$t}}async function Ge(t,e,a){if(!t)return{ok:!1,denied:!1,error:"no-folder"};try{const s=await(await t.getFileHandle(e,{create:!0})).createWritable();return await s.write(a),await s.close(),{ok:!0,denied:!1,error:""}}catch(i){return{ok:!1,denied:!!(i&&(i.name==="NotAllowedError"||i.name==="SecurityError")),error:String(i&&i.message||i)}}}function ls(t,e){return Ge(t,`${wa}-${Date.now()}.json`,e)}async function cs(t){const e=[];if(!t||typeof t.values!="function")return e;try{for await(const a of t.values())if(!(!a||a.kind!=="file"||!/\.json$/i.test(a.name)))try{const i=await a.getFile();e.push({name:a.name,modified:Number(i.lastModified)||0})}catch{}}catch{return e}return e}function us(t){const e=String(t||"");return!(!/\.json$/i.test(e)||e===$t||e===Se||e.startsWith(wa))}const Sa="daily-report-v2",Aa="daily-report-v2-meta",Gt=[{id:"mentally",label:"Mentally"},{id:"psychology",label:"Psychology"},{id:"physically",label:"Physically"},{id:"spiritually",label:"Spiritually"},{id:"socially",label:"Socially"}];Gt.map(t=>t.id);const xa=[{id:"h1",name:"Wake up early",points:10,icon:"sunrise",category:"physically",pin:{mode:"forever"}},{id:"h2",name:"Drink water",points:5,icon:"drop",category:"physically",pin:{mode:"forever"}},{id:"h3",name:"Exercise",points:15,icon:"bolt",category:"physically",pin:{mode:"forever"}},{id:"h4",name:"Read 20 minutes",points:10,icon:"book",category:"mentally",pin:{mode:"forever"}},{id:"h5",name:"No junk food",points:10,icon:"leaf",category:"physically",pin:{mode:"forever"}}],Ta={lockTime:"21:00",autoLock:!0,showConscious:!0,habitSort:"default",taskSort:"default",theme:"dark",habitOrder:[],pinnedTaskOrder:[],weekStart:1};function xe(t){const e=Number(t);return Number.isInteger(e)&&e>=0&&e<=6?e:1}const _t=[{id:"iron",label:"Iron",medal:"🥉",rank:1},{id:"bronze",label:"Bronze",medal:"🥉",rank:2},{id:"silver",label:"Silver",medal:"🥈",rank:3},{id:"gold",label:"Gold",medal:"🥇",rank:4}],Da=[{id:"habit-streak",label:"Habit streak"},{id:"task-streak",label:"Pinned task streak"},{id:"perfect-days",label:"Perfect days (100%)"},{id:"task-list",label:"List of tasks goal"}];function Xe(t){var e;return((e=_t.find(a=>a.id===t))==null?void 0:e.rank)||0}function se(t){var e;return((e=_t.find(a=>a.id===t))==null?void 0:e.medal)||"🏅"}function Ca(t){var e;return((e=_t.find(a=>a.id===t))==null?void 0:e.label)||t||"Badge"}function C(t){const e=Array.isArray(t)?t:String(t||"").split(","),a=[];return e.forEach(i=>{const s=String(i||"").trim().slice(0,20);s&&!a.some(n=>n.toLowerCase()===s.toLowerCase())&&a.push(s),a.length>=10}),a.slice(0,10)}function ye(t,e){const a=[...t];return e==="points"?a.sort((i,s)=>(Number(s.points)||0)-(Number(i.points)||0)):e==="category"?a.sort((i,s)=>nt(L(i.category)).localeCompare(nt(L(s.category)))):e==="tags"&&a.sort((i,s)=>(i.tags&&i.tags[0]||"~~~").localeCompare(s.tags&&s.tags[0]||"~~~")),a}const pt=[{value:1,label:"Mon"},{value:2,label:"Tue"},{value:3,label:"Wed"},{value:4,label:"Thu"},{value:5,label:"Fri"},{value:6,label:"Sat"},{value:0,label:"Sun"}];function B(t=new Date){const e=t.getFullYear(),a=String(t.getMonth()+1).padStart(2,"0"),i=String(t.getDate()).padStart(2,"0");return`${e}-${a}-${i}`}function _e(){return{habits:{},habitRatings:{},habitMissed:{},habitForwarded:{},tasks:[],note:"",locked:!1,lockOverride:null,submittedAt:null,lockedHabits:null,skippedPins:[]}}var q=[],et={};function ps(t){const e=et[t.id];return e?{...t,color:e.color||t.color,goals:e.goals!==void 0?e.goals:t.goals}:t}function at(){return[...Gt.map(ps),...q]}function L(t){return at().map(a=>a.id).includes(t)?t:"mentally"}function nt(t){var e;return((e=at().find(a=>a.id===t))==null?void 0:e.label)||"Mentally"}const Jt=7e5;function W(t){const e=String(t||"");return e.startsWith("data:image/")?e.length>Jt?"":e:""}function Ze(t){const e=Math.max(0,Math.min(5,Number(t.rating)||0)),a=s=>/^\d{4}-\d{2}-\d{2}$/.test(String(s||""))?String(s):"",i=s=>Array.isArray(s)?s.filter(n=>/^\d{4}-\d{2}-\d{2}$/.test(String(n))).map(String).slice(0,50):[];return{...t,description:t.description||"",category:L(t.category),tags:C(t.tags),rating:e,done:!!t.done,missed:!!t.missed,forwardedFrom:a(t.forwardedFrom),forwardedHabitId:String(t.forwardedHabitId||""),forwardedTo:i(t.forwardedTo),image:W(t.image)}}function V(t){const e=Number(t);return!Number.isFinite(e)||e<0?0:Math.min(100,Math.round(e))}function qt(t){const e=String(t??"").slice(0,10);return/^\d{4}-\d{2}-\d{2}$/.test(e)?e:""}function Wt(t,e){const a=qt(t&&t.startFrom);return a?String(e)>=a:!0}function qe(t,e){return{id:String(t.id||""),name:String(t.name||"").slice(0,80),description:String(t.description||"").slice(0,2e3),points:Number(t.points)||0,icon:t.icon||"star",category:L(t.category),consciousPoints:V(t.consciousPoints),tags:C(t.tags),pin:G(t.pin),startFrom:qt(t.startFrom),archivedAt:e||t.archivedAt||null}}function Pa(t,e,a){const i=/^\d{4}-\d{2}-\d{2}$/.test(String(a||""))?String(a):"",s=/^\d{4}-\d{2}-\d{2}$/.test(String(t&&t.forwardedFrom||""))?String(t.forwardedFrom):i;return{id:String(t.id||""),title:String(t.title||"Task").slice(0,120),points:Number(t.points)||0,description:String(t.description||"").slice(0,500),category:L(t.category),tags:C(t.tags),image:W(t.image),fromDate:i,originDate:s,archivedAt:e||t.archivedAt||null,sourcePinId:String(t.sourcePinId||"")}}function ms(t){return Array.isArray(t)?t.filter(e=>e&&typeof e=="object"&&e.id).map(e=>Pa(e,e.archivedAt||null,e.fromDate)).filter(e=>e.id.length<=80).slice(0,500):[]}function G(t){if(!t||!t.mode)return null;const e=(s,n,r)=>Array.isArray(s)?s.map(Number).filter(o=>Number.isFinite(o)&&o>=n&&o<=r):[],a=s=>Array.isArray(s)?s.filter(n=>/^\d{4}-\d{2}-\d{2}$/.test(String(n))).map(String).slice(0,365):[],i=s=>Array.isArray(s)?s.filter(n=>/^\d{2}-\d{2}$/.test(String(n))).map(String).slice(0,366):[];return{mode:["forever","until","weekly","monthly","yearly","custom"].includes(t.mode)?t.mode:"forever",until:t.until||"",weekdays:e(t.weekdays,0,6),monthDays:e(t.monthDays,1,31),yearDays:i(t.yearDays),customDates:a(t.customDates),exceptDates:a(t.exceptDates||t.exceptions)}}function gs(t,e){const a=`${t} ${e}`.toLowerCase();return a.includes("read")||a.includes("study")||a.includes("learn")?"mentally":a.includes("meditat")||a.includes("pray")||a.includes("journal")?"spiritually":a.includes("mood")||a.includes("calm")||a.includes("therapy")?"psychology":a.includes("friend")||a.includes("family")||a.includes("social")||a.includes("call")||a.includes("visit")?"socially":"physically"}function fs(t){if(!Array.isArray(t))return[];const e=[];return t.forEach(a=>{if(!a||typeof a!="object")return;const i=String(a.title||a.text||"").trim().slice(0,120);i&&e.push({id:String(a.id||X("gt")),title:i,done:!!a.done,doneAt:a.doneAt||null,checked:Array.isArray(a.checked)?[...new Set(a.checked.map(String).filter(s=>s.length<=24))].slice(0,64):[]})}),e.slice(0,100)}function Te(t){const e=Da.some(s=>s.id===t.kind)?t.kind:"habit-streak",a=e==="task-list",i=a?fs(t.tasks):[];return{id:String(t.id||`g${Date.now()}`),title:String(t.title||"").trim().slice(0,60)||"My goal",kind:e,targetId:String(t.targetId||""),targetDays:Math.max(1,Math.min(365,Number(t.targetDays)||7)),tier:_t.some(s=>s.id===t.tier)?t.tier:"bronze",rewardTitle:String(t.rewardTitle||"").trim().slice(0,60)||"Reward",createdAt:t.createdAt||new Date().toISOString(),tasks:i,locked:a?!!t.locked:!1,terminated:a?!!t.terminated:!1}}function hs(t){if(!Array.isArray(t))return[];const e=new Set(Gt.map(i=>i.id)),a=[];return t.forEach(i=>{if(!i||typeof i!="object")return;const s=String(i.id||"").trim().slice(0,40),n=String(i.label||"").trim().slice(0,30);!s||!n||e.has(s.toLowerCase())||(e.add(s.toLowerCase()),a.push({id:s,label:n,color:String(i.color||"").slice(0,20),goals:String(i.goals||"").slice(0,1e3)}))}),a.slice(0,20)}function bs(t){const e=t&&typeof t=="object"?t:{},a={};return Gt.forEach(i=>{const s=e[i.id];if(!s||typeof s!="object")return;const n=String(s.color||"").trim().slice(0,20),r=s.goals===void 0?void 0:String(s.goals||"").slice(0,1e3);!n&&r===void 0||(a[i.id]={},n&&(a[i.id].color=n),r!==void 0&&(a[i.id].goals=r))}),a}const De={name:80,wantToBe:1e3,vision:1e3,values:1e3,ideas:4e3},Ce=["short","medium","long"],Mt={short:["1 Week","2 Weeks","3 Weeks","4 Weeks"],medium:["1 Month","2 Months","3 Months"],long:["1 Year","2 Years","3 Years","5 Years","10+ Years"]};function U(t){return`${t||"id"}${Date.now().toString(36)}${Math.floor(Math.random()*9999)}`}function ys(t){return Array.isArray(t)?t.map(e=>{if(typeof e=="string")return{id:U("w"),text:e.trim().slice(0,120)};if(!e||typeof e!="object")return null;const a=String(e.text||e.label||e.name||"").trim().slice(0,120);return a?{id:String(e.id||U("w")),text:a}:null}).filter(Boolean).slice(0,50):[]}function vs(t){return typeof t=="string"?t.split(`
`).map(e=>e.trim().replace(/^[-•*]\s+/,"")).filter(Boolean).slice(0,20).map(e=>({id:U("a"),title:e.slice(0,60),description:""})):Array.isArray(t)?t.map(e=>{if(typeof e=="string"){const i=e.trim().slice(0,60);return i?{id:U("a"),title:i,description:""}:null}if(!e||typeof e!="object")return null;const a=String(e.title||e.name||"").trim().slice(0,60);return a?{id:String(e.id||U("a")),title:a,description:String(e.description||"").slice(0,1e3)}:null}).filter(Boolean).slice(0,20):[]}function ks(t){return Array.isArray(t)?t.map(e=>{if(typeof e=="string"){const r=e.trim().slice(0,200);return r?{id:U("g"),text:r,term:"short",duration:"1 Week",createdAt:new Date().toISOString()}:null}if(!e||typeof e!="object")return null;const a=String(e.text||e.title||"").trim().slice(0,200);if(!a)return null;const i=Ce.includes(e.term)?e.term:"short",s=Mt[i],n=s.includes(e.duration)?e.duration:s[0];return{id:String(e.id||U("g")),text:a,term:i,duration:n,createdAt:e.createdAt||new Date().toISOString()}}).filter(Boolean).slice(0,100):[]}function $s(t){return Array.isArray(t)?t.map(e=>{if(typeof e=="string"){const i=e.trim().slice(0,500);return i?{id:U("q"),text:i,author:"",fav:!1,createdAt:new Date().toISOString()}:null}if(!e||typeof e!="object")return null;const a=String(e.text||e.quote||"").trim().slice(0,500);return a?{id:String(e.id||U("q")),text:a,author:String(e.author||"").trim().slice(0,80),fav:!!(e.fav||e.favorite),createdAt:e.createdAt||new Date().toISOString()}:null}).filter(Boolean).slice(0,200):[]}function Ht(t){const e=t&&typeof t=="object"?t:{},a={};Object.entries(De).forEach(([s,n])=>{s==="wantToBe"&&!e.wantToBe&&e.about?a[s]=String(e.about||"").slice(0,n):a[s]=String(e[s]||"").slice(0,n)}),a.locked=!!e.locked,a.whoAmI=ys(e.whoAmI||e.whoIAm||[]),a.lifeAreas=vs(Array.isArray(e.lifeAreas)||typeof e.lifeAreas=="string"?e.lifeAreas:[]);let i=ks(e.pGoals||e.goalsList||e.profileGoals||[]);return i.length||[["goalsShort","short","1 Week"],["goalsMid","medium","1 Month"],["goalsLong","long","1 Year"]].forEach(([n,r,o])=>{const d=String(e[n]||"");d.trim()&&d.split(`
`).map(c=>c.trim().replace(/^[-•*]\s+/,"")).filter(Boolean).forEach(c=>{i.length>=100||i.push({id:U("g"),text:c.slice(0,200),term:r,duration:o,createdAt:new Date().toISOString()})})}),a.pGoals=i,a.quotes=$s(e.quotes||e.favQuotes||[]),a}function ws(t,e){const a=String(t&&t.installedAt||"");if(/^\d{4}-\d{2}-\d{2}/.test(a))return a;const i=Object.keys(e||{}).sort();return i.length?`${i[0]}T00:00:00.000`:new Date().toISOString()}function Ss(t,e){if(!t)return!1;if(fe(t,e)>0)return!0;const a=t.habitForwarded&&t.habitForwarded[e];return Array.isArray(a)&&a.length>0?!0:Array.isArray(t.tasks)&&t.tasks.some(i=>String(i&&i.forwardedHabitId||"")===String(e))}function As(t,e){return!t||!Array.isArray(t.lockedHabits)?!1:t.lockedHabits.some(a=>String(a&&a.id||"")===String(e))}function xs(t,e,a){const i=String(t||"");for(const s of e){const n=a[s];if(Ss(n,i)||As(n,i))return s}return""}function Ts(t,e){const a=Object.keys(e).sort(),i=a[0]||"";return t.map(s=>{const n=qt(s&&s.startFrom);return n?{...s,startFrom:n}:{...s,startFrom:xs(s&&s.id,a,e)||i}})}function Ds(t,e){const a=Object.keys(e).sort(),i=a[0]||"",s={};return a.forEach(n=>{const r=e[n]&&e[n].tasks;Array.isArray(r)&&r.forEach(o=>{const d=String(o&&o.sourcePinId||"");!d||s[d]||(s[d]=n)})}),t.map(n=>{const r=qt(n&&n.startFrom);if(r)return{...n,startFrom:r};const o=String(n&&n.id||"");return{...n,startFrom:s[o]||i}})}function Ea(t){const e=new Set,a=new Set,i=new Set;return t.filter(s=>{if(!s||typeof s!="object")return!1;const n=String(s.id||"");if(n&&e.has(n))return!1;n&&e.add(n);const r=String(s.sourcePinId||"");if(r){if(a.has(r))return!1;a.add(r)}const o=`${String(s.title||"").trim().toLowerCase()}|${Number(s.points)||0}|${String(s.category||"")}`;return i.has(o)?!1:(i.add(o),!0)})}function We(t){q=hs(t.customCategories||[]),et=bs(t.categoryOverrides);const e={};Object.entries(t.days||{}).forEach(([o,d])=>{e[o]={..._e(),habits:d.habits||{},habitRatings:d.habitRatings||{},habitMissed:d.habitMissed||{},habitForwarded:d.habitForwarded&&typeof d.habitForwarded=="object"?d.habitForwarded:{},tasks:Ea(Array.isArray(d.tasks)?d.tasks.map(Ze):[]),note:d.note||"",locked:!!d.locked,lockOverride:d.lockOverride||(d.locked?"locked":null),submittedAt:d.submittedAt||null,lockedHabits:Array.isArray(d.lockedHabits)?d.lockedHabits:null,skippedPins:Array.isArray(d.skippedPins)?d.skippedPins.map(String).filter(c=>c.length<=60).slice(0,100):[]}});const a=Ts(Array.isArray(t.habits)&&t.habits.length?t.habits:xa,e).map(o=>({...o,description:String(o.description||"").slice(0,2e3),category:L(o.category||gs(o.id,o.name)),consciousPoints:V(o.consciousPoints),tags:C(o.tags),pin:G(o.pin)})),i=(Array.isArray(t.archivedHabits)?t.archivedHabits:[]).filter(o=>o&&typeof o=="object"&&o.id).map(o=>qe(o,o.archivedAt||null)).filter(o=>o.id.length<=60).slice(0,500),s=Ds(Array.isArray(t.pinnedTasks)?t.pinnedTasks.map(o=>({...Ze(o),pin:G(o.pin)})):[],e),n=new Map(s.map(o=>[String(o.id),o])),r=new Map;return Object.entries(e).sort(([o],[d])=>o.localeCompare(d)).forEach(([o,d])=>{d.tasks.forEach(c=>{const m=G(c.pin);if(!m)return;const f=String(c.sourcePinId||""),p=f?n.get(f):null;if(p){p.pin||(p.pin=m);return}const k=[String(c.title||"").trim().toLowerCase(),Number(c.points)||0,String(c.category||""),String(c.description||""),JSON.stringify(C(c.tags)),W(c.image),JSON.stringify(m)].join("|"),A=r.get(f||k);if(A){c.sourcePinId=A.id;return}const S=f||`legacy-pin-${String(c.id||"task").slice(0,48)}`,y={id:S,title:String(c.title||"Task").slice(0,120),points:Number(c.points)||0,description:String(c.description||"").slice(0,500),category:L(c.category),tags:C(c.tags),pin:m,startFrom:o,image:W(c.image)};s.push(y),n.set(S,y),r.set(f||k,y),c.sourcePinId=S})}),{habits:a,archivedHabits:i,archivedTasks:ms(t.archivedTasks),customCategories:q,categoryOverrides:et,installedAt:ws(t,e),profile:Ht(t.profile),pinnedTasks:s,days:e,goals:Array.isArray(t.goals)?t.goals.map(Te):[],badges:Array.isArray(t.badges)?t.badges.filter(o=>o&&o.id&&o.goalId).map(o=>({id:String(o.id),goalId:String(o.goalId),title:String(o.title||""),tier:o.tier||"bronze",rewardTitle:String(o.rewardTitle||""),earnedAt:o.earnedAt||new Date().toISOString()})):[],settings:{lockTime:t.settings&&t.settings.lockTime||Ta.lockTime,autoLock:!t.settings||t.settings.autoLock!==!1,showConscious:!t.settings||t.settings.showConscious!==!1,habitSort:["default","points","category","tags","custom"].includes(t.settings&&t.settings.habitSort)?t.settings.habitSort:"default",taskSort:["default","points","category","tags","custom"].includes(t.settings&&t.settings.taskSort)?t.settings.taskSort:"default",theme:["light","dark"].includes(t.settings&&t.settings.theme)?t.settings.theme:"dark",weekStart:xe(t.settings&&t.settings.weekStart),habitOrder:Array.isArray(t.settings&&t.settings.habitOrder)?t.settings.habitOrder.map(String).filter(Boolean).slice(0,300):[],pinnedTaskOrder:Array.isArray(t.settings&&t.settings.pinnedTaskOrder)?t.settings.pinnedTaskOrder.map(String).filter(Boolean).slice(0,300):[]}}}function Ke(){const t=B();return{habits:xa.map(e=>({...e,description:"",tags:[],startFrom:t})),archivedHabits:[],archivedTasks:[],customCategories:[],categoryOverrides:{},installedAt:new Date().toISOString(),profile:Ht({}),pinnedTasks:[],days:{},goals:[],badges:[],settings:{...Ta}}}function Cs(){try{const t=localStorage.getItem(Sa)||localStorage.getItem("daily-report-v1");return t?We(JSON.parse(t)):Ke()}catch{return Ke()}}let u=Cs();q=u.customCategories||[];u.customCategories=q;et=u.categoryOverrides||{};u.categoryOverrides=et;function Qt(){u.goals.forEach(t=>{t.kind!=="task-list"||!Array.isArray(t.tasks)||t.tasks.forEach(e=>{if(!e||!e.done||Array.isArray(e.checked)&&e.checked.length)return;const a=Ia(e);a&&(e.checked=a.slots.map(i=>i.key))})})}Qt();let N=null,P="boot",Ot=Ps(),La=0,wt=!1,Pe=0,mt=null,Xt=0,ta=Promise.resolve();function Ps(){try{const t=JSON.parse(localStorage.getItem(Aa)||"null"),e=t&&Number(t.savedAt);return Number.isFinite(e)&&e>0?e:0}catch{return 0}}function Na(t){u=t,q=u.customCategories||[],u.customCategories=q,et=u.categoryOverrides||{},u.categoryOverrides=et}function St(){return!!N&&P==="granted"}function Es(){if(!St())return;const t=Date.now();Xt||(Xt=t);const e=t-Xt,a=e>=3e3?0:Math.max(400,Math.min(900,900-e));mt&&clearTimeout(mt),mt=setTimeout(()=>{mt=null,Ft().catch(()=>{})},a)}function Ft(){if(mt&&(clearTimeout(mt),mt=null),Xt=0,!St()||!wt)return Promise.resolve(!1);const t=Pe;let e="";try{e=JSON.stringify(u)}catch{return Promise.resolve(!1)}const a=N,i=ta.then(async()=>{try{const s=await Ge(a,$t,e);return s.ok?(La=Date.now(),Pe===t&&(wt=!1),!0):(s.denied&&(P="prompt"),!1)}catch{return!1}});return ta=i.then(()=>{},()=>{}),i}async function Yt(){if(!St())return{status:P};const t=await ds(N);if(t.error)return{status:"granted",error:t.error};if(t.missing)return wt=!0,await Ft(),{status:"granted",seeded:!0};let e=null;try{e=JSON.parse(t.raw)}catch{e=null}if(!e||l.backupKind(e)!=="ok")return await ls(N,t.raw),wt=!0,await Ft(),{status:"granted",corrupt:!0};const a=Number(t.modified)||0;if(!Ot||a>Ot+2e3){const i=e.data&&typeof e.data=="object"&&!Array.isArray(e.data)?e.data:e;return Na(We(i)),w(),{status:"granted",replaced:!0}}return wt=!0,await Ft(),{status:"granted",pushed:!0}}let Ma=0,ve={key:null,value:null},Ee=0;function Ue(){return Ee>0}function ot(t){Ee+=1;try{return t()}finally{Ee-=1}}function w(){Ma+=1,Pe+=1,wt=!0;try{localStorage.setItem(Sa,JSON.stringify(u)),Ot=Date.now(),localStorage.setItem(Aa,JSON.stringify({savedAt:Ot}))}catch{}Es()}let ea=0;function X(t){return ea+=1,`${t||"id"}${Date.now().toString(36)}${ea.toString(36)}${Math.floor(Math.random()*1296).toString(36)}`}function Ls(t){return new Date(`${t}T00:00:00`).getDay()}function ie(t){const e=new Date(`${t}T00:00:00`);return e.setDate(e.getDate()+1),B(e)}function Lt(t){const e=new Date(`${t}T00:00:00`);return e.setDate(e.getDate()-1),B(e)}function Ut(t,e){if(!t)return!0;if(Array.isArray(t.exceptDates)&&t.exceptDates.includes(e)||Array.isArray(t.exceptions)&&t.exceptions.includes(e))return!1;if((Array.isArray(t.customDates)?t.customDates:[]).includes(e)||t.mode==="forever")return!0;if(t.mode==="until")return!!t.until&&e<=t.until;if(t.mode==="weekly")return Array.isArray(t.weekdays)&&t.weekdays.includes(Ls(e));if(t.mode==="monthly"){const i=Array.isArray(t.monthDays)?t.monthDays.map(Number):[];return i.length?i.includes(Number(String(e).slice(8,10))):!0}if(t.mode==="yearly"){const i=Array.isArray(t.yearDays)?t.yearDays:[];return i.length?i.includes(String(e).slice(5,10)):!0}return t.mode!=="custom"}function At(t){if(!t)return"Not pinned";const e=(t.exceptDates||t.exceptions||[]).length,a=e?` · ⛔ ${e} exception${e>1?"s":""}`:"",i=t.mode==="custom"?0:Array.isArray(t.customDates)?t.customDates.length:0,s=i?` +${i} custom`:"";if(t.mode==="forever")return`Pinned forever${s}${a}`;if(t.mode==="until")return`${t.until?`Pinned until ${t.until}`:"Pinned until a date"}${s}${a}`;if(t.mode==="weekly"){const n=Array.isArray(t.weekdays)?t.weekdays:[],r=pt.filter(o=>n.includes(o.value)).map(o=>o.label);return`${r.length?`Weekly: ${r.join(", ")}`:"Weekly (no days)"}${s}${a}`}if(t.mode==="monthly"){const n=Array.isArray(t.monthDays)?t.monthDays:[];return`${n.length?`Monthly: day${n.length>1?"s":""} ${[...n].sort((r,o)=>r-o).join(", ")}`:"Monthly"}${s}${a}`}if(t.mode==="yearly"){const n=Array.isArray(t.yearDays)?t.yearDays:[];return`${n.length?`Yearly: ${[...n].sort().join(", ")}`:"Yearly"}${s}${a}`}if(t.mode==="custom"){const n=Array.isArray(t.customDates)?t.customDates:[];return`${n.length?`Custom: ${n.length} date${n.length>1?"s":""}`:"Custom dates"}${a}`}return"Pinned"}function Ns(t){if(!t)return[];const e=[],a=(s,n)=>{e.some(r=>r.key===s)||e.push({key:s,label:n})},i=s=>(pt.find(n=>n.value===s)||{label:`Day ${s}`}).label;return t.mode==="forever"?a("daily","Every day"):t.mode==="until"?a("daily",t.until?`Daily until ${t.until}`:"Daily"):t.mode==="weekly"?[...t.weekdays||[]].sort((s,n)=>(s+6)%7-(n+6)%7).forEach(s=>a(`w${s}`,i(s))):t.mode==="monthly"?[...t.monthDays||[]].sort((s,n)=>s-n).forEach(s=>a(`m${s}`,`Day ${s}`)):t.mode==="yearly"&&[...t.yearDays||[]].sort().forEach(s=>a(`y${s}`,s)),(t.customDates||[]).forEach(s=>a(`d${s}`,String(s).slice(5))),e}function Ia(t){if(!t||typeof t!="object")return null;const e=String(t.title||"").trim().toLowerCase();if(!e)return null;const a=u.pinnedTasks.find(s=>String(s&&s.title||"").trim().toLowerCase()===e);if(!a)return null;const i=Ns(a.pin);return i.length?{pin:a.pin,title:a.title,slots:i}:null}function Le(t){const[e,a]=(u.settings.lockTime||"21:00").split(":").map(Number),i=new Date(`${t}T00:00:00`);return i.setHours(e||0,a||0,0,0),i}function ne(t){const e=u.days[t];return e?e.lockOverride==="locked"||e.locked===!0:!1}function fe(t,e){return t?t.habitRatings&&t.habitRatings[e]!=null?Number(t.habitRatings[e])||0:t.habits&&t.habits[e]?5:0:0}function Ne(t,e){return fe(u.days[t],e)}function Ms(t,e){if(!t)return!1;if(fe(t,e)>0||t.habitMissed&&t.habitMissed[e])return!0;const i=t.habitForwarded&&t.habitForwarded[e];return Array.isArray(i)&&i.length>0?!0:Array.isArray(t.tasks)&&t.tasks.some(s=>String(s&&s.forwardedHabitId||"")===String(e))}function Ha(t){if(!t)return[...u.habits];const e=u.habits.filter(i=>Wt(i,t)&&Ut(i.pin,t)),a=u.days[t];if(a){const i=new Set(e.map(n=>n.id)),s=n=>{!n||i.has(n.id)||Ms(a,n.id)&&(i.add(n.id),e.push(n))};u.habits.forEach(s),ne(t)&&u.archivedHabits&&u.archivedHabits.length&&u.archivedHabits.forEach(s)}return e}function Vt(t,e){if(!Array.isArray(e)||!e.length)return t;const a=new Map(e.map((i,s)=>[String(i),s]));return t.some(i=>a.has(String(i&&i.id)))?t.map((i,s)=>({item:i,i:s})).sort((i,s)=>{const n=a.has(String(i.item&&i.item.id))?a.get(String(i.item.id)):Number.MAX_SAFE_INTEGER,r=a.has(String(s.item&&s.item.id))?a.get(String(s.item.id)):Number.MAX_SAFE_INTEGER;return n===r?i.i-s.i:n-r}).map(i=>i.item):t}function Is(t){const e=u.habits.find(a=>a.id===t);return e||(u.archivedHabits||[]).find(a=>a.id===t)||null}function Hs(t){u.archivedHabits||(u.archivedHabits=[]),!u.archivedHabits.some(e=>e.id===t.id)&&(u.archivedHabits.push(qe(t,new Date().toISOString())),u.archivedHabits.length>500&&u.archivedHabits.splice(0,u.archivedHabits.length-500))}function Me(t){const e=M(t),a=Ha(t);e.lockedHabits=a.map(i=>qe(i)),e.habitMissed={},a.forEach(i=>{Ne(t,i.id)<=0&&(e.habitMissed[i.id]=!0)}),e.tasks.forEach(i=>{i.missed=!i.done})}function lt(t){const e=u.days[t];return!e||e.lockOverride==="unlocked"?!1:e.lockOverride==="locked"||e.locked===!0?!0:u.settings.autoLock?Date.now()>=Le(t).getTime():!1}function aa(t){if(Ue())return lt(t);const e=M(t);return e.lockOverride==="unlocked"?!1:e.lockOverride==="locked"||e.locked?((!Array.isArray(e.lockedHabits)||!e.habitMissed)&&Me(t),!0):u.settings.autoLock&&Date.now()>=Le(t).getTime()?(e.locked=!0,e.lockOverride="locked",e.submittedAt=e.submittedAt||Le(t).toISOString(),Me(t),w(),!0):!1}function M(t){if(!u.days[t]){const e=_e();if(Ue())return e;u.days[t]=e}return u.days[t]}function ke(t){const e=String(t);Object.values(u.days).forEach(a=>{!Array.isArray(a.skippedPins)||!a.skippedPins.includes(e)||(a.skippedPins=a.skippedPins.filter(i=>i!==e))})}function sa(t){const e=M(t);if(ne(t)||Ue())return e;let a=!1;const i=new Set(Array.isArray(e.skippedPins)?e.skippedPins.map(String):[]);if(e.tasks.length>1){const s=Ea(e.tasks);s.length!==e.tasks.length&&(e.tasks=s,a=!0)}return u.pinnedTasks.forEach(s=>{Wt(s,t)&&Ut(s.pin,t)&&(i.has(String(s.id))||e.tasks.some(n=>n.sourcePinId===s.id)||(e.tasks.push({id:`ptask-${s.id}-${t}`,title:s.title,points:s.points,description:s.description||"",category:L(s.category),tags:C(s.tags),rating:0,done:!1,missed:!1,sourcePinId:s.id,image:W(s.image)}),a=!0))}),a&&w(),e}function Fa(t){return!(!t||t.pin&&t.pin.mode==="forever")}function Fs(t,e){let a=ie(e),i=0;for(;i<800;){if(i+=1,Wt(t,a)&&Ut(t.pin,a))return a;a=ie(a)}return""}function oe(t,e,a=[],i=[]){if(!t||!/^\d{4}-\d{2}-\d{2}$/.test(String(e||"")))return{allowed:!1,next:"",days:[]};let s=t;if(a.length||i.length){const c=a.map(String),m=i.map(String),f=G(t.pin);f.exceptDates=(f.exceptDates||[]).filter(p=>!c.includes(p)),f.customDates=(f.customDates||[]).filter(p=>!m.includes(p)),s={...t,pin:f}}if(!Fa(s))return{allowed:!1,next:"",days:[]};if(!Wt(s,e)||!Ut(s.pin,e))return{allowed:!1,next:"",days:[]};const n=Fs(s,e);if(!n)return{allowed:!1,next:"",days:[]};const r=[];let o=ie(e),d=0;for(;o<n&&d<400;)d+=1,r.push(o),o=ie(o);return r.length?{allowed:!0,next:n,days:r}:{allowed:!1,next:n,days:[]}}function Rs(t,e){const a=t.pin||{},i=Array.isArray(a.exceptDates)?a.exceptDates:[];return i.includes(e)&&(Array.isArray(a.customDates)?a.customDates:[]).filter(n=>n>e).filter(n=>!i.includes(n)).sort().find(n=>oe(t,e,[e],[n]).days.includes(n))||""}function Os(t,e){const a=t.pin||{};if(!(Array.isArray(a.customDates)?a.customDates:[]).includes(e))return"";const s=Array.isArray(a.exceptDates)?a.exceptDates:[];let n="";return s.forEach(r=>{r>=e||oe(t,r,[r],[e]).days.includes(e)&&(!n||r>n)&&(n=r)}),n}function z(t){return!l.isLocked(t)}function ia(t){const e=at().find(a=>a.label.toLowerCase()===String(t||"").trim().toLowerCase());return e?e.id:"mentally"}function na(t){return!t||typeof t!="object"||Array.isArray(t)?[]:Array.isArray(t.days)?t.days.filter(e=>e&&/^\d{4}-\d{2}-\d{2}$/.test(String(e.date||""))):[]}const l={todayKey:B,exportBackup(){return JSON.stringify({app:"Second Mind",kind:"full-backup",version:1,exportedAt:new Date().toISOString(),data:u},null,2)},backupKind(t){if(!t||typeof t!="object"||Array.isArray(t))return"invalid";const e=t.data&&typeof t.data=="object"&&!Array.isArray(t.data)?t.data:t;return Array.isArray(e.days)?"report-export":Array.isArray(e.categories)||Array.isArray(e.plans)||Array.isArray(e.schedule)?"wrong-app":typeof e!="object"||e===null||e.habits!==void 0&&!Array.isArray(e.habits)||e.days!==void 0&&(typeof e.days!="object"||e.days===null||Array.isArray(e.days))||e.settings!==void 0&&(typeof e.settings!="object"||e.settings===null||Array.isArray(e.settings))||!["habits","pinnedTasks","days","goals","badges","settings"].some(i=>e[i]!==void 0)?"invalid":"ok"},importBackup(t){if(this.backupKind(t)!=="ok")return!1;const e=t.data&&typeof t.data=="object"&&!Array.isArray(t.data)?t.data:t;return Na(We(e)),w(),!0},folderStatus(){return P},folderName(){return N&&N.name?String(N.name):""},folderFileName(){return $t},lastFileSavedAt(){return La},lastCacheSavedAt(){return Ot},getFolderHandle(){return N},async initFolderSync(){if(!Et())return P="unsupported",{status:"unsupported"};try{const e=typeof navigator<"u"&&navigator.storage&&navigator.storage.persist?navigator.storage.persist():null;e&&typeof e.catch=="function"&&e.catch(()=>{})}catch{}const t=await this.refreshFolder();if(t==="granted")return Yt();if(t==="prompt"||t==="denied"){try{P=await Qe(N)}catch{P="prompt"}if(P==="granted")return Yt()}return{status:P}},async refreshFolder(){if(!Et())return P="unsupported",P;if(!N)try{N=await ns()}catch{N=null}return N?(P=await es(N),P):(P="unset",P)},async chooseDataFolder(){if(!Et())return P="unsupported",{status:"unsupported"};let t=null;try{t=await ts()}catch(a){return a&&a.name==="AbortError"?{status:P,cancelled:!0}:{status:P,error:String(a&&a.message||a)}}if(!t)return{status:P,error:"no-folder"};try{await os(t)}catch{}return N=t,P="granted",{...await Yt(),name:String(t.name||"")}},async grantFolderAccess(){if(!Et())return P="unsupported",{status:"unsupported"};if(!N){const e=await this.refreshFolder();if(e!=="granted")return{status:e}}return P=await Qe(N),P!=="granted"?{status:P}:{...await Yt(),name:this.folderName()}},async forgetDataFolder(){try{await rs()}catch{}return N=null,P=Et()?"unset":"unsupported",{status:P}},async writeFolderFile(t,e){if(!St())return{ok:!1,denied:!1,error:"no-folder"};const a=await Ge(N,t,e);return a.denied&&(P="prompt"),a},async readFolderFile(t){return St()?Ae(N,t):{missing:!0,raw:"",modified:0,error:"no-folder"}},async listFolderBackups(){return St()?(await cs(N)).filter(e=>us(e.name)).sort((e,a)=>a.modified-e.modified).map(e=>({name:e.name,modified:e.modified})):[]},flushFolderWrite(){return Ft()},previewReport(t){const e=na(t);if(!e.length)return{days:0,start:"",end:"",newHabits:0};const a=new Set(u.habits.map(n=>String(n.name||"").trim().toLowerCase())),i=new Set;e.forEach(n=>{(Array.isArray(n.habits)?n.habits:[]).forEach(r=>{const o=String(r&&r.name||"").trim().toLowerCase();o&&!a.has(o)&&i.add(o)})});const s=e.map(n=>String(n.date)).sort();return{days:e.length,start:s[0],end:s[s.length-1],newHabits:i.size}},importReport(t){const e=na(t);if(!e.length)return!1;const a=e.map(o=>String(o.date)).sort(),i=a[a.length-1],s={};u.habits.forEach(o=>{s[String(o.name||"").trim().toLowerCase()]=o});let n=0;const r=Date.now();return e.forEach((o,d)=>{const c=String(o.date);(Array.isArray(o.habits)?o.habits:[]).forEach(p=>{const k=String(p&&p.name||"").trim().slice(0,80);if(!k)return;const A=k.toLowerCase();if(!s[A]){const S={id:`h${r}_${n}`,name:k,description:String(p&&p.description||"").slice(0,2e3),points:Number(p&&p.points||10)||10,icon:"star",category:ia(p&&p.category),consciousPoints:V(p&&p.consciousPoints),tags:C(p&&p.tags),pin:{mode:"until",until:i,weekdays:[],monthDays:[],yearDays:[],customDates:[],exceptDates:[]},startFrom:a[0]};u.habits.push(S),s[A]=S,n+=1}});const m=_e();m.note=String(o.note||""),m.locked=!0,m.lockOverride="locked",m.submittedAt=null;const f=[];(Array.isArray(o.habits)?o.habits:[]).forEach(p=>{const k=s[String(p&&p.name||"").trim().toLowerCase()];if(!k)return;const A=Math.max(0,Math.min(5,Number(p&&p.rating||0)));m.habitRatings[k.id]=A,m.habits[k.id]=A>0,A<=0&&(m.habitMissed[k.id]=!0),k.startFrom&&c<k.startFrom&&(k.startFrom=c),f.push({id:k.id,name:k.name,description:k.description,points:k.points,icon:k.icon||"star",category:L(k.category),consciousPoints:V(k.consciousPoints),tags:C(k.tags),pin:G(k.pin)})}),m.lockedHabits=f,m.tasks=(Array.isArray(o.tasks)?o.tasks:[]).map((p,k)=>({id:`t${r}_${d}_${k}`,title:String(p&&p.title||"Task").slice(0,120),points:Number(p&&p.points||5)||5,description:String(p&&p.description||""),category:ia(p&&p.category),tags:C(p&&p.tags),rating:Math.max(0,Math.min(5,Number(p&&p.rating||0))),done:!!(p&&p.done),missed:!(p&&p.done),image:"",forwardedFrom:/^\d{4}-\d{2}-\d{2}$/.test(String(p&&p.forwardedFrom||""))?String(p.forwardedFrom):"",forwardedHabitId:"",forwardedTo:Array.isArray(p&&p.forwardedTo)?p.forwardedTo.filter(A=>/^\d{4}-\d{2}-\d{2}$/.test(String(A))).map(String).slice(0,50):[]})),u.days[c]=m}),w(),{days:e.length,habits:n}},getSettings(){return u.settings},setLockTime(t){u.settings.lockTime=t||"21:00",w()},setAutoLock(t){u.settings.autoLock=!!t,w()},setShowConscious(t){u.settings.showConscious=!!t,w()},consciousEnabled(){return u.settings.showConscious!==!1},setHabitSort(t){u.settings.habitSort=["default","points","category","tags","custom"].includes(t)?t:"default",w()},setTaskSort(t){u.settings.taskSort=["default","points","category","tags","custom"].includes(t)?t:"default",w()},getWeekStart(){return xe(u.settings.weekStart)},setWeekStart(t){u.settings.weekStart=xe(t),w()},getTheme(){return u.settings.theme==="light"?"light":"dark"},setTheme(t){u.settings.theme=t==="light"?"light":"dark",w()},getHabits(t,e){if(t&&ne(t)){const n=u.days[t];if(n&&Array.isArray(n.lockedHabits)){const r=e||u.settings.habitSort||"default",o=[...n.lockedHabits];return r==="default"||r==="custom"?Vt(o,u.settings.habitOrder):ye(o,r)}}const a=e||u.settings.habitSort||"default",i=Ha(t),s=a==="default"||a==="custom"?Vt(i,u.settings.habitOrder):ye(i,a);return a==="default"||a==="custom"?s.slice().sort((n,r)=>+!!r.pin-+!!n.pin):s},getTasks(t,e){const a=this.getDay(t),i=e||u.settings.taskSort||"default";return i==="default"||i==="custom"?a.tasks:ye(a.tasks,i)},getAllHabits(){return u.habits},getPinnedHabits(){return Vt(u.habits.filter(t=>!!t.pin),u.settings.habitOrder)},setPinnedHabitOrder(t){const e=new Set(u.habits.filter(n=>n.pin).map(n=>String(n.id))),a=(Array.isArray(t)?t:[]).map(String).filter(n=>e.has(n)),i=new Set(a);e.forEach(n=>{i.has(n)||a.push(n)});const s=u.settings.habitOrder.filter(n=>!e.has(n));u.settings.habitOrder=[...a,...s].slice(0,300),w()},getHabitActivity(t,e=30){const a=String(t||"");return a?Object.keys(u.days).sort().reverse().flatMap(i=>{const s=u.days[i],n=s.habitForwarded&&s.habitForwarded[a],r=!!(s.habits&&s.habits[a])||!!(s.habitMissed&&s.habitMissed[a])||[s.habitRatings,s.habitMissed].some(c=>c&&Object.prototype.hasOwnProperty.call(c,a))||Array.isArray(n)&&n.length>0,o=Array.isArray(s.lockedHabits)&&s.lockedHabits.some(c=>String(c.id)===a);if(!r&&!o)return[];const d=fe(s,a);return[{date:i,rating:d,status:d?"Completed":s.habitMissed[a]||o&&lt(i)?"Missed":"Not rated",locked:lt(i)}]}).slice(0,Math.max(1,Math.min(365,Number(e)||30))):[]},getPinnedTasks(){return Vt(u.pinnedTasks,u.settings.pinnedTaskOrder)},setPinnedTaskOrder(t){const e=new Set(u.pinnedTasks.map(s=>String(s.id))),a=(Array.isArray(t)?t:[]).map(String).filter(s=>e.has(s)),i=new Set(a);u.pinnedTasks.forEach(s=>{const n=String(s.id);i.has(n)||a.push(n)}),u.settings.pinnedTaskOrder=a.slice(0,300),w()},getDay(t){return aa(t),sa(t)},isLocked(t){return aa(t)},submitDay(t){const e=M(t);e.locked=!0,e.lockOverride="locked",e.submittedAt=new Date().toISOString(),Me(t),w(),this.checkGoals(t)},unlockDay(t){const e=M(t);e.locked=!1,e.lockOverride="unlocked",e.habitMissed={},e.lockedHabits=null,e.tasks.forEach(a=>{a.missed=!1}),w()},isHabitMissed(t,e){const a=u.days[t];return!a||!(a.locked||a.lockOverride==="locked")||!this.getHabits(t).some(i=>i.id===e)||Ne(t,e)>0?!1:(a.habitMissed&&a.habitMissed[e],!0)},isTaskMissed(t,e){const a=u.days[t];if(!a)return!1;const i=(a.tasks||[]).find(s=>s.id===e);return i?i.missed===!0?!0:i.missed===!1?!1:!!(a.locked||a.lockOverride==="locked")&&!i.done:!1},missedCounts(t){return ot(()=>{const e=this.getDay(t),a=this.getHabits(t),i=lt(t);return{habits:a.filter(s=>e.habitMissed&&e.habitMissed[s.id]?!0:i&&Ne(t,s.id)<=0).length,tasks:e.tasks.filter(s=>s.done?!1:s.missed===!0?!0:s.missed===!1?!1:i).length}})},lockDay(t){this.submitDay(t)},lockDays(t){let e=0;return t.forEach(a=>{this.isLocked(a)||(this.submitDay(a),e+=1)}),e},unlockDays(t){let e=0;return t.forEach(a=>{this.isLocked(a)&&(this.unlockDay(a),e+=1)}),e},lockedReports(){return ot(()=>Object.keys(u.days).sort().reverse().filter(t=>lt(t)).map(t=>({date:t,submittedAt:u.days[t].submittedAt,...this.scoreFor(t)})))},habitRating(t,e){const a=u.days[t];return a?a.habitRatings&&a.habitRatings[e]!=null?Number(a.habitRatings[e])||0:a.habits&&a.habits[e]?5:0:0},setHabitRating(t,e,a){if(!z(t))return;const i=M(t),s=Math.max(0,Math.min(5,Number(a)||0));i.habitRatings[e]=s,i.habits[e]=s>0,w(),this.checkGoals(t)},toggleHabit(t,e){if(!z(t))return;const a=this.habitRating(t,e)>0?0:5;this.setHabitRating(t,e,a)},addTask(t,e,a,i={}){if(!z(t))return;M(t).tasks.push({id:X("t"),title:e.trim(),points:Number(a)||5,description:String(i.description||"").trim(),category:L(i.category),tags:C(i.tags),rating:Math.max(0,Math.min(5,Number(i.rating)||0)),done:!1,missed:!1,forwardedFrom:/^\d{4}-\d{2}-\d{2}$/.test(String(i.forwardedFrom||""))?String(i.forwardedFrom):"",forwardedHabitId:String(i.forwardedHabitId||""),forwardedTo:[],image:W(i.image)}),w(),this.checkGoals(t)},setTaskRating(t,e,a){if(!z(t))return;const s=M(t).tasks.find(r=>r.id===e);if(!s)return;const n=Math.max(0,Math.min(5,Number(a)||0));s.rating=n,w()},setTaskOrder(t,e){if(!z(t))return;const a=M(t),i=(Array.isArray(e)?e:[]).map(String).filter(Boolean);if(!i.length)return;const s=new Map(i.map((r,o)=>[r,o])),n=a.tasks.slice().sort((r,o)=>{const d=s.has(r.id)?s.get(r.id):Number.MAX_SAFE_INTEGER,c=s.has(o.id)?s.get(o.id):Number.MAX_SAFE_INTEGER;return d-c});a.tasks=n,w()},setHabitOrder(t){const e=(Array.isArray(t)?t:[]).map(String).filter(Boolean);e.length&&(u.settings.habitOrder=e.slice(0,300),w())},toggleTask(t,e){if(!z(t))return;const i=M(t).tasks.find(s=>s.id===e);i&&(i.done=!i.done,w(),this.checkGoals(t))},removeTask(t,e){if(!z(t))return;const a=M(t),i=a.tasks.find(n=>n.id===e);a.tasks=a.tasks.filter(n=>n.id!==e);const s=i&&i.sourcePinId?String(i.sourcePinId):"";s&&(Array.isArray(a.skippedPins)||(a.skippedPins=[]),a.skippedPins.includes(s)||a.skippedPins.push(s),a.skippedPins.length>100&&a.skippedPins.splice(0,a.skippedPins.length-100)),w()},forwardTask(t,e,a){if(!/^\d{4}-\d{2}-\d{2}$/.test(String(a||"")))return{ok:!1,reason:"Pick a valid date"};if(t===a)return{ok:!1,reason:"Already on that day"};if(!z(t))return{ok:!1,reason:"Source day is locked"};if(this.isLocked(a))return{ok:!1,reason:"Target day is locked"};const s=M(t).tasks.find(d=>d.id===e);if(!s)return{ok:!1,reason:"Task not found"};const n=M(a),r=String(s.title||"").trim().toLowerCase();if(n.tasks.some(d=>String(d.title||"").trim().toLowerCase()===r))return{ok:!1,reason:"That task is already on that day"};n.tasks.push({id:X("t"),title:s.title,points:Number(s.points)||5,description:String(s.description||""),category:L(s.category),tags:C(s.tags),rating:0,done:!1,missed:!1,forwardedFrom:t,forwardedHabitId:String(s.forwardedHabitId||""),forwardedTo:[],image:W(s.image)});const o=Array.isArray(s.forwardedTo)?s.forwardedTo:[];return o.includes(a)||o.push(a),s.forwardedTo=o.slice(0,50),w(),this.checkGoals(a),{ok:!0}},habitForwardedTo(t,e){const a=u.days[t];if(!a||!a.habitForwarded)return[];const i=a.habitForwarded[e];return Array.isArray(i)?i:[]},habitReplaceDays(t,e){const a=u.habits.find(s=>s.id===e),i=oe(a,t);return{allowed:i.allowed,next:i.next,days:i.days.slice()}},replaceHabit(t,e,a){if(!/^\d{4}-\d{2}-\d{2}$/.test(String(a||"")))return{ok:!1,reason:"Pick a valid date"};if(String(a)===String(t))return{ok:!1,reason:"Already on that day"};const i=u.habits.find(r=>r.id===e);if(!i)return{ok:!1,reason:"Habit not found"};if(!Fa(i))return{ok:!1,reason:"This habit is pinned forever — every day is already its day"};if(!z(t))return{ok:!1,reason:"That day is locked"};if(this.isLocked(a))return{ok:!1,reason:"That day is locked"};const s=oe(i,t);if(!s.allowed)return{ok:!1,reason:"No replace days available for this habit"};if(!s.days.includes(a))return{ok:!1,reason:`Pick a day before ${s.next}`};const n=G(i.pin);return n.exceptDates.includes(t)||(n.exceptDates=[...n.exceptDates,t].sort()),n.customDates.includes(a)||(n.customDates=[...n.customDates,a].sort()),i.pin=n,w(),this.checkGoals(a),{ok:!0,from:t,to:a}},undoReplaceHabit(t,e,a){const i=u.habits.find(n=>n.id===t);if(!i)return{ok:!1,reason:"Habit not found"};const s=G(i.pin);return s.exceptDates=(s.exceptDates||[]).filter(n=>n!==e),s.customDates=(s.customDates||[]).filter(n=>n!==a),i.pin=s,w(),{ok:!0}},habitReplacedTo(t,e){const a=u.habits.find(i=>i.id===e);return a?Rs(a,t):""},habitReplacedFrom(t,e){const a=u.habits.find(i=>i.id===e);return a?Os(a,t):""},setNote(t,e){z(t)&&(M(t).note=e,w())},noteFor(t){const e=u.days[String(t||"")];return e?String(e.note||""):""},notedDays(t){const e=t?`${t}-`:"";return Object.keys(u.days).filter(a=>a.startsWith(e)&&String(u.days[a].note||"").trim()).sort()},addHabit(t,e,a={}){u.habits.push({id:X("h"),name:t.trim(),description:String(a.description||"").trim().slice(0,2e3),points:Number(e)||10,icon:"star",category:L(a.category||"physically"),consciousPoints:V(a.consciousPoints),tags:C(a.tags),pin:G({mode:"forever"}),startFrom:qt(a.startFrom)||B()}),w()},updateHabit(t,e){const a=u.habits.find(i=>i.id===t);a&&(e.name!=null&&(a.name=String(e.name).trim()||a.name),e.description!=null&&(a.description=String(e.description).trim().slice(0,2e3)),e.points!=null&&(a.points=Number(e.points)||a.points),e.category!=null&&(a.category=L(e.category)),e.consciousPoints!=null&&(a.consciousPoints=V(e.consciousPoints)),e.tags!=null&&(a.tags=C(e.tags)),w())},updateTask(t,e,a){if(!z(t))return;const s=M(t).tasks.find(n=>n.id===e);if(s){if(a.title!=null&&(s.title=String(a.title).trim()||s.title),a.points!=null&&(s.points=Number(a.points)||s.points),a.description!=null&&(s.description=String(a.description).trim()),a.category!=null&&(s.category=L(a.category)),a.tags!=null&&(s.tags=C(a.tags)),a.image!==void 0&&(s.image=W(a.image)),a.rating!=null&&(s.rating=Math.max(0,Math.min(5,Number(a.rating)||0))),s.sourcePinId){const n=u.pinnedTasks.find(r=>r.id===s.sourcePinId);n&&(n.title=s.title,n.points=s.points,n.description=s.description,n.category=s.category,a.tags!=null&&(n.tags=C(a.tags)),a.image!==void 0&&(n.image=W(a.image)))}w()}},habitStreak(t,e){const a=Is(t);if(!a)return 0;let i=e,s=0;this.habitRating(i,t)===0&&(i=Lt(i));let n=0;for(;s<400;){if(s+=1,!Wt(a,i)||!Ut(a.pin,i)){i=Lt(i);continue}if(this.habitRating(i,t)>0){n+=1,i=Lt(i);continue}break}return n},categoryBreakdown(t){const e=this.getDay(t),a=this.getHabits(t);return at().map(i=>{const s=a.filter(S=>L(S.category)===i.id),n=e.tasks.filter(S=>L(S.category)===i.id),r=s.reduce((S,y)=>{const D=this.habitRating(t,y.id);return S+Math.round(y.points*D/5)},0),o=u.settings.showConscious!==!1,d=o?s.reduce((S,y)=>S+(this.habitRating(t,y.id)>0?V(y.consciousPoints):0),0):0,c=s.reduce((S,y)=>S+y.points,0),m=o?s.reduce((S,y)=>S+V(y.consciousPoints),0):0,f=n.reduce((S,y)=>S+(y.done?y.points:0),0),p=n.reduce((S,y)=>S+y.points,0),k=s.map(S=>this.habitRating(t,S.id)),A=k.length?Math.round(k.reduce((S,y)=>S+y,0)/k.length*10)/10:0;return{...i,habits:s,tasks:n,earned:r+d+f,max:c+m+p,habitAvg:A,consciousEarned:d,consciousMax:m,completed:s.filter(S=>this.habitRating(t,S.id)>0).length+n.filter(S=>S.done).length,total:s.length+n.length}})},removeHabit(t){const e=u.habits.find(a=>a.id===t);e&&Hs(e),u.habits=u.habits.filter(a=>a.id!==t),w()},getArchivedHabits(){return(u.archivedHabits||[]).map(t=>({...t}))},deleteArchivedHabit(t){const e=(u.archivedHabits||[]).length;return u.archivedHabits=(u.archivedHabits||[]).filter(a=>a.id!==t),u.archivedHabits.length===e?{ok:!1,reason:"That habit is no longer archived"}:(w(),{ok:!0})},archiveTask(t,e){if(!z(t))return{ok:!1,reason:"Day is locked"};const a=M(t),i=a.tasks.find(n=>n.id===e);if(!i)return{ok:!1,reason:"Task not found"};u.archivedTasks||(u.archivedTasks=[]),u.archivedTasks.unshift(Pa(i,new Date().toISOString(),t)),u.archivedTasks.length>500&&(u.archivedTasks.length=500),a.tasks=a.tasks.filter(n=>n.id!==e);const s=i.sourcePinId?String(i.sourcePinId):"";return s&&(Array.isArray(a.skippedPins)||(a.skippedPins=[]),a.skippedPins.includes(s)||a.skippedPins.push(s)),w(),{ok:!0}},getArchivedTasks(){return(u.archivedTasks||[]).map(t=>({...t}))},restoreTask(t,e){const a=(u.archivedTasks||[]).findIndex(c=>c.id===t);if(a<0)return{ok:!1,reason:"That task is no longer archived"};const i=u.archivedTasks[a],s=e||B();sa(s);const n=M(s),r=String(i.title||"").trim().toLowerCase();if(n.tasks.some(c=>String(c.title||"").trim().toLowerCase()===r))return{ok:!1,reason:"That task is already on that day"};const d=/^\d{4}-\d{2}-\d{2}$/.test(String(i.originDate||""))?String(i.originDate):"";return n.tasks.push({id:X("t"),title:i.title,points:Number(i.points)||5,description:String(i.description||""),category:L(i.category),tags:C(i.tags),rating:0,done:!1,missed:!1,forwardedFrom:d&&d!==s?d:"",forwardedHabitId:"",forwardedTo:[],image:W(i.image),sourcePinId:String(i.sourcePinId||"")}),u.archivedTasks.splice(a,1),w(),{ok:!0,from:d,to:s}},deleteArchivedTask(t){const e=(u.archivedTasks||[]).length;return u.archivedTasks=(u.archivedTasks||[]).filter(a=>a.id!==t),u.archivedTasks.length===e?{ok:!1,reason:"That task is no longer archived"}:(w(),{ok:!0})},restoreHabit(t){const e=(u.archivedHabits||[]).findIndex(s=>s.id===t);if(e<0)return{ok:!1,reason:"That habit is no longer archived"};const a=u.archivedHabits[e];if(u.habits.some(s=>s.id===a.id))return u.archivedHabits.splice(e,1),w(),{ok:!0};const i={...a,description:String(a.description||"").slice(0,2e3),category:L(a.category),consciousPoints:V(a.consciousPoints),tags:C(a.tags),pin:G(a.pin),archivedAt:null};return u.habits.push(i),u.archivedHabits.splice(e,1),w(),{ok:!0,habit:{...i}}},pinHabit(t,e){const a=u.habits.find(i=>i.id===t);a&&(a.pin=G(e),w())},updatePinnedTaskDetails(t,e){const a=u.pinnedTasks.find(i=>i.id===t);if(a){if(e.title!=null&&(a.title=String(e.title).trim().slice(0,120)||a.title),e.points!=null){const i=Number(e.points);Number.isFinite(i)&&(a.points=Math.max(0,i))}e.description!=null&&(a.description=String(e.description).trim().slice(0,2e3)),e.category!=null&&(a.category=L(e.category)),e.tags!=null&&(a.tags=C(e.tags)),e.image!==void 0&&(a.image=W(e.image)),ke(t),w()}},unpinHabit(t){const e=u.habits.find(a=>a.id===t);e&&(e.pin=null,w())},pinTask(t,e,a){if(!z(t))return;const s=M(t).tasks.find(o=>o.id===e);if(!s)return;const n=s.sourcePinId?u.pinnedTasks.find(o=>o.id===s.sourcePinId):null;if(n){n.pin=G(a),ke(n.id),Qt(),w();return}const r=X("p");u.pinnedTasks.push({id:r,title:s.title,points:s.points,description:s.description||"",category:L(s.category),tags:C(s.tags),pin:G(a),startFrom:t,image:W(s.image)}),s.sourcePinId=r,Qt(),w()},unpinTaskTemplate(t){u.pinnedTasks=u.pinnedTasks.filter(a=>a.id!==t);const e=String(t);Object.entries(u.days).forEach(([a,i])=>{if(!Array.isArray(i.tasks)||!i.tasks.length||ne(a))return;const s=i.tasks.length;i.tasks=i.tasks.filter(n=>String(n&&n.sourcePinId||"")!==e),i.tasks.length!==s&&(Array.isArray(i.skippedPins)||(i.skippedPins=[]),i.skippedPins=i.skippedPins.filter(n=>n!==e))}),w()},updatePinnedTask(t,e){const a=u.pinnedTasks.find(i=>i.id===t);a&&(a.pin=G(e),ke(t),Qt(),w())},findHabit(t){return u.habits.find(e=>e.id===t)||null},findTask(t,e){return M(t).tasks.find(a=>a.id===e)||null},findPinnedTask(t){return u.pinnedTasks.find(e=>e.id===t)||null},getInstalledAt(){return String(u.installedAt||new Date().toISOString())},getProfile(){const t=Ht(u.profile);return u.profile=t,JSON.parse(JSON.stringify(t))},setProfileField(t,e){return!Object.prototype.hasOwnProperty.call(De,t)||u.profile.locked?!1:((!u.profile||typeof u.profile!="object")&&(u.profile=Ht({})),u.profile[t]=String(e||"").slice(0,De[t]),w(),!0)},setProfileLocked(t){(!u.profile||typeof u.profile!="object")&&(u.profile=Ht({})),u.profile.locked=!!t,w()},isProfileLocked(){return!!(u.profile&&u.profile.locked)},profileGoalDurations(){return JSON.parse(JSON.stringify(Mt))},addWhoAmI(t){if(u.profile.locked)return{ok:!1,reason:"Profile is locked"};const e=String(t||"").trim().slice(0,120);return e?(u.profile.whoAmI||[]).length>=50?{ok:!1,reason:"List is full (50)"}:(u.profile.whoAmI.push({id:U("w"),text:e}),w(),{ok:!0}):{ok:!1,reason:"Type something first"}},updateWhoAmI(t,e){if(u.profile.locked)return;const a=(u.profile.whoAmI||[]).find(s=>s.id===t);if(!a)return;const i=String(e||"").trim().slice(0,120);i?a.text=i:u.profile.whoAmI=u.profile.whoAmI.filter(s=>s.id!==t),w()},moveWhoAmI(t,e){if(u.profile.locked)return;const a=u.profile.whoAmI||[],i=a.findIndex(r=>r.id===t),s=i+e;if(i<0||s<0||s>=a.length)return;const[n]=a.splice(i,1);a.splice(s,0,n),w()},removeWhoAmI(t){u.profile.locked||(u.profile.whoAmI=(u.profile.whoAmI||[]).filter(e=>e.id!==t),w())},addLifeArea(t){if(u.profile.locked)return{ok:!1,reason:"Profile is locked"};const e=String(t||"").trim().slice(0,60);if(!e)return{ok:!1,reason:"Name the life area"};if((u.profile.lifeAreas||[]).length>=20)return{ok:!1,reason:"Max 20 areas"};const a={id:U("a"),title:e,description:""};return u.profile.lifeAreas.push(a),w(),{ok:!0,id:a.id}},updateLifeArea(t,e={}){if(u.profile.locked)return;const a=(u.profile.lifeAreas||[]).find(i=>i.id===t);a&&(e.title!=null&&(a.title=String(e.title).trim().slice(0,60)||a.title),e.description!=null&&(a.description=String(e.description).slice(0,1e3)),w())},moveLifeArea(t,e){if(u.profile.locked)return;const a=u.profile.lifeAreas||[],i=a.findIndex(r=>r.id===t),s=i+e;if(i<0||s<0||s>=a.length)return;const[n]=a.splice(i,1);a.splice(s,0,n),w()},removeLifeArea(t){u.profile.locked||(u.profile.lifeAreas=(u.profile.lifeAreas||[]).filter(e=>e.id!==t),w())},addProfileGoal(t,e,a){if(u.profile.locked)return{ok:!1,reason:"Profile is locked"};const i=String(t||"").trim().slice(0,200);if(!i)return{ok:!1,reason:"Write your goal first"};const s=Ce.includes(e)?e:"short",n=Mt[s],r=n.includes(a)?a:n[0];if((u.profile.pGoals||[]).length>=100)return{ok:!1,reason:"Too many goals (100)"};const o={id:U("g"),text:i,term:s,duration:r,createdAt:new Date().toISOString()};return u.profile.pGoals.push(o),w(),{ok:!0,id:o.id}},updateProfileGoal(t,e={}){if(u.profile.locked)return;const a=(u.profile.pGoals||[]).find(i=>i.id===t);if(a){if(e.text!=null&&(a.text=String(e.text).trim().slice(0,200)||a.text),e.term!=null&&Ce.includes(e.term)){a.term=e.term;const i=Mt[a.term];i.includes(a.duration)||(a.duration=i[0])}e.duration!=null&&Mt[a.term].includes(e.duration)&&(a.duration=e.duration),w()}},removeProfileGoal(t){u.profile.locked||(u.profile.pGoals=(u.profile.pGoals||[]).filter(e=>e.id!==t),w())},addQuote(t,e){if(u.profile.locked)return{ok:!1,reason:"Profile is locked"};const a=String(t||"").trim().slice(0,500);if(!a)return{ok:!1,reason:"Write the quote first"};if((u.profile.quotes||[]).length>=200)return{ok:!1,reason:"Too many quotes (200)"};const i={id:U("q"),text:a,author:String(e||"").trim().slice(0,80),fav:!1,createdAt:new Date().toISOString()};return u.profile.quotes.push(i),w(),{ok:!0,id:i.id}},updateQuote(t,e={}){if(u.profile.locked)return;const a=(u.profile.quotes||[]).find(i=>i.id===t);a&&(e.text!=null&&(a.text=String(e.text).trim().slice(0,500)||a.text),e.author!=null&&(a.author=String(e.author).trim().slice(0,80)),w())},toggleQuoteFav(t){if(u.profile.locked)return;const e=(u.profile.quotes||[]).find(a=>a.id===t);e&&(e.fav=!e.fav,w())},removeQuote(t){u.profile.locked||(u.profile.quotes=(u.profile.quotes||[]).filter(e=>e.id!==t),w())},getCategories(){return at().map(t=>({...t}))},getCustomCategories(){return q.map(t=>({...t}))},addCategory(t){const e=String(t||"").trim().slice(0,30);if(!e)return{ok:!1,reason:"Type a category name"};if(at().some(s=>s.label.toLowerCase()===e.toLowerCase()))return{ok:!1,reason:"That category already exists"};if(q.length>=20)return{ok:!1,reason:"Too many categories (max 20 custom)"};let i=`c${Date.now().toString(36)}`;return at().some(s=>s.id===i)&&(i=`c${Date.now().toString(36)}${Math.floor(Math.random()*99)}`),q.push({id:i,label:e}),w(),{ok:!0,id:i}},renameCategory(t,e){const a=q.find(n=>n.id===t);if(!a)return{ok:!1,reason:"Built-in categories can’t be renamed"};const i=String(e||"").trim().slice(0,30);return i?at().some(n=>n.id!==t&&n.label.toLowerCase()===i.toLowerCase())?{ok:!1,reason:"That category already exists"}:(a.label=i,w(),{ok:!0}):{ok:!1,reason:"Type a category name"}},updateCategory(t,e={}){const a=q.find(i=>i.id===t);if(!a){if(!Gt.find(n=>n.id===t))return{ok:!1,reason:"Category not found"};const s={...et[t]||{}};return e.color!==void 0&&(s.color=String(e.color).slice(0,20)),e.goals!==void 0&&(s.goals=String(e.goals).slice(0,1e3)),et[t]=s,u.categoryOverrides=et,w(),{ok:!0}}return e.color!==void 0&&(a.color=String(e.color).slice(0,20)),e.goals!==void 0&&(a.goals=String(e.goals).slice(0,1e3)),w(),{ok:!0}},deleteCategory(t){const e=q.findIndex(a=>a.id===t);return e<0?{ok:!1,reason:"Built-in categories can’t be deleted"}:(q.splice(e,1),u.habits.forEach(a=>{a.category===t&&(a.category="mentally")}),(u.archivedHabits||[]).forEach(a=>{a.category===t&&(a.category="mentally")}),u.pinnedTasks.forEach(a=>{a.category===t&&(a.category="mentally")}),Object.values(u.days).forEach(a=>{(a.tasks||[]).forEach(i=>{i.category===t&&(i.category="mentally")})}),w(),{ok:!0})},getAllTags(){const t=new Map,e=a=>{C(a).forEach(i=>{t.set(i,(t.get(i)||0)+1)})};return u.habits.forEach(a=>e(a.tags)),(u.archivedHabits||[]).forEach(a=>e(a.tags)),u.pinnedTasks.forEach(a=>e(a.tags)),Object.values(u.days).forEach(a=>{(a.tasks||[]).forEach(i=>e(i.tags))}),[...t.entries()].map(([a,i])=>({tag:a,count:i})).sort((a,i)=>i.count-a.count||a.tag.localeCompare(i.tag))},renameTag(t,e){const a=String(t||"").trim(),i=C(e)[0]||"";if(!a||!i)return{ok:!1,reason:"Type a tag name"};if(a.toLowerCase()===i.toLowerCase()){const r=o=>C((o||[]).map(d=>String(d).toLowerCase()===a.toLowerCase()?i:d));return u.habits.forEach(o=>{o.tags=r(o.tags)}),(u.archivedHabits||[]).forEach(o=>{o.tags=r(o.tags)}),u.pinnedTasks.forEach(o=>{o.tags=r(o.tags)}),Object.values(u.days).forEach(o=>{(o.tasks||[]).forEach(d=>{d.tags=r(d.tags)})}),w(),{ok:!0}}const s=this.getAllTags().some(r=>r.tag.toLowerCase()===i.toLowerCase()),n=r=>{const o=(r||[]).map(d=>String(d).toLowerCase()===a.toLowerCase()?i:d);return C(o)};return u.habits.forEach(r=>{r.tags=n(r.tags)}),(u.archivedHabits||[]).forEach(r=>{r.tags=n(r.tags)}),u.pinnedTasks.forEach(r=>{r.tags=n(r.tags)}),Object.values(u.days).forEach(r=>{(r.tasks||[]).forEach(o=>{o.tags=n(o.tags)})}),w(),{ok:!0,merged:s}},deleteTag(t){const e=String(t||"").trim().toLowerCase();if(!e)return{ok:!1,reason:"Pick a tag first"};const a=i=>(i||[]).filter(s=>String(s).toLowerCase()!==e);return u.habits.forEach(i=>{i.tags=a(i.tags)}),(u.archivedHabits||[]).forEach(i=>{i.tags=a(i.tags)}),u.pinnedTasks.forEach(i=>{i.tags=a(i.tags)}),Object.values(u.days).forEach(i=>{(i.tasks||[]).forEach(s=>{s.tags=a(s.tags)})}),w(),{ok:!0}},addTagToHabit(t,e){const a=u.habits.find(s=>s.id===t);if(!a)return{ok:!1,reason:"Pick a habit first"};const i=C(e)[0]||"";return i?(a.tags=C([...a.tags||[],i]),w(),{ok:!0}):{ok:!1,reason:"Type a tag name"}},categoryChart(t,e){const a=["week","month","year"].includes(t)?t:"week",i=`${a}|${e}|${Ma}`;return ve.key===i?ve.value:ot(()=>this._buildCategoryChart(a,e,i))},_buildCategoryChart(t,e,a){const i=at(),s=[];if(t==="year"){const m=String(e).slice(0,4);for(let f=0;f<12;f++){const p=String(f+1).padStart(2,"0"),k=new Date(Number(m),f+1,0).getDate();s.push({label:new Date(Number(m),f,1).toLocaleDateString(void 0,{month:"short"}),title:new Date(Number(m),f,1).toLocaleDateString(void 0,{month:"long",year:"numeric"}),keys:this.rangeKeys(`${m}-${p}-01`,`${m}-${p}-${String(k).padStart(2,"0")}`)})}}else{const[m,f]=this.resolveRange(t,e);this.rangeKeys(m,f).forEach(p=>{const k=new Date(`${p}T00:00:00`);s.push({label:t==="week"?k.toLocaleDateString(void 0,{weekday:"narrow"}):String(k.getDate()),title:p,keys:[p]})})}const n={},r={};i.forEach(m=>{n[m.id]=s.map(()=>0),r[m.id]=0}),s.forEach((m,f)=>{m.keys.forEach(p=>{this.categoryBreakdown(p).forEach(k=>{k.id in n||(n[k.id]=s.map(()=>0),r[k.id]=0),n[k.id][f]+=k.earned||0,r[k.id]+=k.earned||0})})});const o=s.map((m,f)=>i.reduce((p,k)=>p+(n[k.id]?n[k.id][f]:0),0)),d=Math.max(1,...o),c={kind:t,labels:s.map(m=>m.label),titles:s.map(m=>m.title),cats:i.map(m=>({...m})),perCat:n,totals:r,max:d,grandTotal:o.reduce((m,f)=>m+f,0)};return ve={key:a,value:c},c},getGoals(){return u.goals},getBadges(){return[...u.badges].sort((t,e)=>{const a=Xe(e.tier)-Xe(t.tier);return a!==0?a:String(e.earnedAt).localeCompare(String(t.earnedAt))})},topBadges(t=3){return this.getBadges().slice(0,t)},addGoal(t={}){const e=Te({...t,id:X("g")});return u.goals.push(e),w(),this.checkGoals(B()),e},updateGoal(t,e={}){const a=u.goals.find(s=>s.id===t);if(!a)return;const i=Te({...a,...e,id:t});Object.assign(a,i),w(),this.checkGoals(B())},removeGoal(t){u.goals=u.goals.filter(e=>e.id!==t),w()},findGoal(t){return u.goals.find(e=>e.id===t)||null},taskListGoals(){return u.goals.filter(t=>t.kind==="task-list")},openTaskListGoals(){return u.goals.filter(t=>t.kind==="task-list"&&!t.locked)},undoneDayTasks(t=60){const e=[],a=new Set;return Object.keys(u.days).sort().reverse().forEach(i=>{(u.days[i]&&u.days[i].tasks||[]).forEach(n=>{if(!n||n.done)return;const r=String(n.title||"").trim();if(!r)return;const o=r.toLowerCase();a.has(o)||(a.add(o),e.push({title:r,category:n.category,points:Number(n.points)||0,date:i}))})}),e.slice(0,t)},addGoalItem(t,e){const a=u.goals.find(s=>s.id===t);if(!a||a.kind!=="task-list")return{ok:!1,reason:"No such goal"};if(a.locked||a.terminated)return{ok:!1,reason:"This goal is locked — unlock it first"};const i=String(e||"").trim().slice(0,120);return i?a.tasks.length>=100?{ok:!1,reason:"Goal list is full (100 tasks)"}:(a.tasks.push({id:X("gt"),title:i,done:!1,doneAt:null}),w(),{ok:!0}):{ok:!1,reason:"Type a task first"}},addGoalItems(t,e){const a=u.goals.find(n=>n.id===t);if(!a||a.kind!=="task-list")return{ok:!1,reason:"No such goal"};if(a.locked||a.terminated)return{ok:!1,reason:"This goal is locked — unlock it first"};const i=new Set(a.tasks.map(n=>n.title.toLowerCase())),s=[];return(Array.isArray(e)?e:[]).forEach(n=>{const r=String(n||"").trim().slice(0,120);if(!r)return;const o=r.toLowerCase();i.has(o)||a.tasks.length>=100||(i.add(o),a.tasks.push({id:X("gt"),title:r,done:!1,doneAt:null}),s.push(r))}),w(),{ok:!0,added:s.length}},removeGoalItem(t,e){const a=u.goals.find(i=>i.id===t);return!a||a.kind!=="task-list"||a.locked?{ok:!1,reason:"Unlock the goal to edit its tasks"}:(a.tasks=a.tasks.filter(i=>i.id!==e),w(),{ok:!0})},goalTaskSchedule(t){return Ia(t)},goalTaskDone(t){const e=this.goalTaskSchedule(t);if(!e)return!!(t&&t.done);const a=t&&Array.isArray(t.checked)?t.checked:[];return e.slots.every(i=>a.includes(i.key))},_goalDoneCount(t){return(t.tasks||[]).filter(e=>this.goalTaskDone(e)).length},setGoalItemDone(t,e,a){const i=u.goals.find(c=>c.id===t);if(!i||i.kind!=="task-list")return{ok:!1,reason:"No such goal"};if(i.locked)return{ok:!1,reason:"Unlock the goal to edit its tasks"};const s=i.tasks.find(c=>c.id===e);if(!s)return{ok:!1,reason:"No such task in the goal"};const n=this.goalTaskSchedule(s);if(n){if(a){const c=Array.isArray(s.checked)?s.checked:[];return{ok:!1,reason:`Tick every pinned day first: ${n.slots.filter(f=>!c.includes(f.key)).map(f=>f.label).join(", ")}`}}s.checked=[],s.done=!1,s.doneAt=null}else s.done=!!a,s.doneAt=a?new Date().toISOString():null;const r=this._refreshTaskListGoal(i),{awarded:o,revoked:d}=this.checkGoalsDetailed();return w(),{ok:!0,autoLocked:r,awarded:o,revoked:d}},setGoalItemSlot(t,e,a,i){const s=u.goals.find(f=>f.id===t);if(!s||s.kind!=="task-list")return{ok:!1,reason:"No such goal"};if(s.locked)return{ok:!1,reason:"Unlock the goal to edit its tasks"};const n=s.tasks.find(f=>f.id===e);if(!n)return{ok:!1,reason:"No such task in the goal"};const r=this.goalTaskSchedule(n);if(!r)return{ok:!1,reason:"This task has no repeat schedule"};if(!r.slots.some(f=>f.key===a))return{ok:!1,reason:"Not a day of this task"};const o=new Set(Array.isArray(n.checked)?n.checked:[]);i?o.add(a):o.delete(a),n.checked=[...o],n.done=r.slots.every(f=>n.checked.includes(f.key)),n.doneAt=n.done?n.doneAt||new Date().toISOString():null;const d=this._refreshTaskListGoal(s),{awarded:c,revoked:m}=this.checkGoalsDetailed();return w(),{ok:!0,autoLocked:d,done:n.done,awarded:c,revoked:m}},setGoalLocked(t,e){const a=u.goals.find(i=>i.id===t);return!a||a.kind!=="task-list"?{ok:!1,reason:"No such goal"}:(e?(a.locked=!0,a.tasks.length>0&&a.tasks.every(s=>this.goalTaskDone(s))||(a.terminated=!0)):a.locked=!1,w(),{ok:!0})},_refreshTaskListGoal(t){return t.tasks.length>0&&t.tasks.every(a=>this.goalTaskDone(a))&&!t.locked?(t.locked=!0,!0):!1},removeBadge(t){u.badges=u.badges.filter(e=>e.id!==t),w()},perfectDaysCount(){return ot(()=>Object.keys(u.days).filter(t=>{const e=this.scoreFor(t);return e.max>0&&e.percent===100}).length)},taskStreak(t,e){let a=e,i=0;(r=>{const o=u.days[r];return!o||!Array.isArray(o.tasks)?!1:o.tasks.some(d=>d.sourcePinId===t&&d.done)})(a)||(a=Lt(a));let n=0;for(;i<400;){i+=1;const r=u.days[a];if(!r||!Array.isArray(r.tasks))break;if(r.tasks.some(o=>o.sourcePinId===t&&o.done)){n+=1,a=Lt(a);continue}break}return n},goalProgress(t,e){const a=e||B();if(t.kind==="habit-streak"){const s=this.habitStreak(t.targetId,a);return{current:s,target:t.targetDays,done:s>=t.targetDays}}if(t.kind==="task-streak"){const s=this.taskStreak(t.targetId,a);return{current:s,target:t.targetDays,done:s>=t.targetDays}}if(t.kind==="task-list"){const s=t.tasks||[],n=this._goalDoneCount(t);return{current:n,target:Math.max(s.length,1),done:s.length>0&&n===s.length}}const i=this.perfectDaysCount();return{current:i,target:t.targetDays,done:i>=t.targetDays}},checkGoalsDetailed(t){const e=t||B(),a=[],i=[];return u.goals.forEach(s=>{const n=this.goalProgress(s,e),r=u.badges.find(o=>o.goalId===s.id);if(n.done){if(r)return;const o={id:X("b"),goalId:s.id,title:s.title,tier:s.tier,rewardTitle:s.rewardTitle,earnedAt:new Date().toISOString()};u.badges.push(o),a.push(o);return}r&&(u.badges=u.badges.filter(o=>o.goalId!==s.id),i.push(r))}),(a.length||i.length)&&w(),{awarded:a,revoked:i}},checkGoals(t){return this.checkGoalsDetailed(t).awarded},scoreFor(t){return ot(()=>this._scoreFor(t))},_scoreFor(t){const e=this.getDay(t),a=this.getHabits(t),i=this.isLocked(t),s=u.settings.showConscious!==!1,n=a.reduce((S,y)=>{const D=this.habitRating(t,y.id);return S+Math.round(y.points*D/5)},0),r=s?a.reduce((S,y)=>S+(this.habitRating(t,y.id)>0?V(y.consciousPoints):0),0):0,o=e.tasks.reduce((S,y)=>S+(y.done?y.points:0),0),d=a.reduce((S,y)=>S+y.points,0),c=s?a.reduce((S,y)=>S+V(y.consciousPoints),0):0,m=e.tasks.reduce((S,y)=>S+y.points,0),f=n+r+o,p=d+c+m,k=a.filter(S=>e.habitMissed&&e.habitMissed[S.id]?!0:i&&this.habitRating(t,S.id)<=0).length,A=e.tasks.filter(S=>S.done?!1:S.missed===!0?!0:S.missed===!1?!1:i).length;return{earned:f,max:p,habitScore:n,consciousScore:r,maxConscious:c,taskScore:o,completedHabits:a.filter(S=>this.habitRating(t,S.id)>0).length,habitAvg:a.length?Math.round(a.reduce((S,y)=>S+this.habitRating(t,y.id),0)/a.length*10)/10:0,totalHabits:a.length,completedTasks:e.tasks.filter(S=>S.done).length,totalTasks:e.tasks.length,missedHabits:k,missedTasks:A,percent:p?Math.round(f/p*100):0,locked:i,submittedAt:e.submittedAt}},monthKeys(t){const e=String(t).slice(0,7);return Object.keys(u.days).filter(a=>a.startsWith(e)).sort()},rangeKeys(t,e){const a=[],i=new Date(`${t}T00:00:00`),s=new Date(`${e}T00:00:00`);let n=0;for(;i<=s&&n<732;)n+=1,a.push(B(i)),i.setDate(i.getDate()+1);return a},resolveRange(t,e){if(t==="day")return[e,e];if(t==="week"){const i=new Date(`${e}T00:00:00`),s=new Date(i);s.setDate(i.getDate()-(i.getDay()-this.getWeekStart()+7)%7);const n=new Date(s);return n.setDate(s.getDate()+6),[B(s),B(n)]}if(t==="month"){const[i,s]=e.split("-").map(Number),n=`${i}-${String(s).padStart(2,"0")}-01`,r=new Date(i,s,0).getDate(),o=`${i}-${String(s).padStart(2,"0")}-${String(r).padStart(2,"0")}`;return[n,o]}if(t==="year"){const i=e.slice(0,4);return[`${i}-01-01`,`${i}-12-31`]}const a=Object.keys(u.days).sort();return a.length?[a[0],a[a.length-1]>e?a[a.length-1]:e]:[e,e]},exportRows(t,e){return ot(()=>this._exportRows(t,e))},_exportRows(t,e){return this.rangeKeys(t,e).map(a=>{const i=this.getDay(a),s=this.getHabits(a),n=this.scoreFor(a),r=this.isLocked(a),o=(c,m)=>m>0?"done":r?"missed":"pending",d=c=>c.done?"done":r?"missed":"pending";return{date:a,earned:n.earned,max:n.max,percent:n.percent,habitScore:n.habitScore,consciousScore:n.consciousScore||0,taskScore:n.taskScore,locked:r,missedHabits:n.missedHabits||0,missedTasks:n.missedTasks||0,note:i.note||"",habits:s.map(c=>{const m=this.habitRating(a,c.id);return{name:c.name,description:String(c.description||""),category:nt(L(c.category)),tags:C(c.tags),points:c.points,consciousPoints:this.consciousEnabled()?V(c.consciousPoints):0,rating:m,earned:Math.round(c.points*m/5)+(m>0&&this.consciousEnabled()?V(c.consciousPoints):0),status:o(c.id,m)}}),tasks:i.tasks.map(c=>({title:c.title,category:nt(L(c.category)),tags:C(c.tags),points:c.points,rating:Math.max(0,Math.min(5,Number(c.rating)||0)),done:!!c.done,earned:c.done?c.points:0,status:c.forwardedFrom?`forwarded from ${c.forwardedFrom}`:d(c),forwardedFrom:c.forwardedFrom||"",forwardedTo:Array.isArray(c.forwardedTo)?c.forwardedTo:[],description:c.description||"",hasImage:!!c.image}))}})},history(t=14){return ot(()=>Object.keys(u.days).sort().reverse().slice(0,t).map(a=>({date:a,...this.scoreFor(a),note:u.days[a].note,locked:lt(a),submittedAt:u.days[a].submittedAt})))},week(t){return ot(()=>{const e=new Date(t);return e.setDate(e.getDate()-(e.getDay()-this.getWeekStart()+7)%7),e.setHours(0,0,0,0),Array.from({length:7},(a,i)=>{const s=new Date(e);s.setDate(e.getDate()+i);const n=B(s),r=u.days[n];return{date:n,label:s.toLocaleDateString(void 0,{weekday:"short"}),dayOfMonth:s.getDate(),hasRecord:!!r,note:String(r&&r.note||""),locked:lt(n),...this.scoreFor(n)}})})}};function Ra(t){return t>=90?"Excellent":t>=75?"Great day":t>=50?"Keep going":t>0?"Started":"No score yet"}function j(t){return new Date(`${t}T00:00:00`).toLocaleDateString(void 0,{weekday:"long",month:"short",day:"numeric"})}function js(t){return t?new Date(t).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}):""}function re(t){return t>=5?"Excellent":t>=4?"Great":t>=3?"Good":t>=2?"Fair":t>=1?"Low":"Not rated"}const $e=document.getElementById("app"),Oa="daily-report-2026-11-06T23-29-22-mw5lwggo",oa=`v1.1 — Auto-update · Offline · Backup (${Oa.slice(-8)})`;let v=l.todayKey(),I="today",x=null,$=null,Q=!1,ut=!1;const Zt=new Set;let gt=!1,de=!1,kt=null,rt=!1,le=!1,Ie=null,dt="Idle.",J="week",Z="all",tt=0,ce=null,_="month",ue=null,R=[],st=0,bt=null;const ct=new Set,xt=new Map;let Rt=!1,Kt="all",K="short",Tt="1 Week";const It=new Set;let te=null;const ee=new Set;let He=null,yt=null;window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),kt=t});window.addEventListener("appinstalled",()=>{kt=null,h("Second Mind installed"),b()});const Bs=[["default","Default"],["points","Points"],["category","Category"],["tags","Tags"],["custom","Custom"]];function ra(t){const e=new Date(`${v}T00:00:00`);e.setDate(e.getDate()+t),v=l.todayKey(e)}let we=l.todayKey();function ze(){const t=l.todayKey();if(t===we)return!1;const e=we;return we=t,v===e&&(v=t),ce=null,ue=null,R=[],st=0,tt=0,!0}function E(t){return{home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z"/></svg>',profile:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/></svg>',history:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8v5l3 2"/><circle cx="12" cy="12" r="9"/></svg>',settings:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H8a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V8c.3.7.9 1.2 1.6 1.3H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1.7z"/></svg>',pin:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4h6l-1 7 3 3v2H7v-2l3-3z" fill="currentColor" stroke="none"/><path d="M12 16v5"/></svg>',forward:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',swap:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h13l-3.5-3.5M20 16H7l3.5 3.5"/></svg>',undo:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h11a5 5 0 0 1 0 10H8"/><path d="M8 5 4 9l4 4"/></svg>',habit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h10M4 17h13"/></svg>',archive:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h18v4H3zM5 11v9h14v-9M9.5 15h5"/></svg>',trash:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg>',grip:'<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><circle cx="9" cy="6" r="1.7"/><circle cx="15" cy="6" r="1.7"/><circle cx="9" cy="12" r="1.7"/><circle cx="15" cy="12" r="1.7"/><circle cx="9" cy="18" r="1.7"/><circle cx="15" cy="18" r="1.7"/></svg>'}[t]}function ja(t,e,a){return`
    <div class="stars" data-habit="${t}">
      ${[1,2,3,4,5].map(i=>`
            <button type="button" class="star ${i<=e?"on":""}" data-action="rate-habit" data-id="${t}" data-rating="${i}" ${a?"disabled":""} aria-label="${i} star">★</button>
          `).join("")}
    </div>
  `}function Ba(t,e,a){return`
    <div class="stars stars-small" data-task="${t}">
      ${[1,2,3,4,5].map(i=>`
            <button type="button" class="star small ${i<=e?"on":""}" data-action="rate-task" data-id="${t}" data-rating="${i}" ${a?"disabled":""} aria-label="${i} star">★</button>
          `).join("")}
    </div>
  `}function Ga(t){const e=Number(t)||0;return e?`<span class="conscious-badge">🧠 +${e}</span>`:'<span class="item-meta">No conscious pts</span>'}const Gs=["mentally","psychology","physically","spiritually","socially"];function ft(t){const a=l.getCategories().find(n=>n.id===t),i=a&&a.color?a.color:O(t);return`<span class="cat-badge ${Gs.includes(t)?`cat-${t}`:"cat-custom"}" style="background:${i}22;color:${i};box-shadow:inset 0 0 0 1px ${i}55">${g(nt(t))}</span>`}function Fe(t){const e=String(t||"");if(!e)return"Deleted";const a=new Date(e);return Number.isNaN(a.getTime())?"Deleted":`Deleted ${a.toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}`}const da={mentally:"#5b8cff",psychology:"#a06bff",physically:"#22b07d",spiritually:"#e8a51c",socially:"#14b8a6"},la=["#f472b6","#38bdf8","#fb923c","#a3e635","#facc15","#e879f9"];function O(t,e){const i=l.getCategories().find(s=>s.id===t);return i&&i.color?i.color:da[t]?da[t]:la[(e??0)%la.length]}function it(t){const e=Array.isArray(t)?t.filter(Boolean):[];return e.length?`<div class="tag-row">${e.map(a=>`<span class="tag-chip">#${g(a)}</span>`).join("")}</div>`:""}function _a(t){return!t||!t.image?"":`<button type="button" class="task-img-thumb" data-action="view-task-image" data-id="${t.id}" aria-label="View attached photo"><img src="${t.image}" alt="Task photo" loading="lazy" /></button>`}function qa(t){const e=String(t||"");if(!e.trim())return"";const a=e.split(`
`),i=/^\s*(?:•|-|[*])\s+(.*)$/,s=/^\s*\d+[.)]\s+(.*)$/;let n="",r=null;const o=()=>{r&&(n+=r==="ul"?"</ul>":"</ol>",r=null)};return a.forEach(d=>{const c=i.exec(d),m=!c&&s.exec(d);c?(r!=="ul"&&(o(),n+='<ul class="note-list">',r="ul"),n+=`<li>${g(c[1])||"&nbsp;"}</li>`):m?(r!=="ol"&&(o(),n+='<ol class="note-list">',r="ol"),n+=`<li>${g(m[1])||"&nbsp;"}</li>`):d.trim()?(o(),n+=`<p class="note-text">${g(d)}</p>`):(o(),n+='<p class="note-text">&nbsp;</p>')}),o(),n}function _s(t){const e=qa(t);return e?`<div class="note" style="margin-top:10px">${e}</div>`:""}function jt(t){return String(t||"").split(`
`).map(e=>e.replace(/^\s*(?:•|-|\*|\d+[.)])\s*/,"").trim()).filter(Boolean)}function Bt(t){return t.map(e=>`• ${e}`).join(`
`)}function ca(t,e){const a=String(t||"").split(`
`).map(i=>i.replace(/^\s*(?:•|-|\*)\s+/,"").trim()).filter(Boolean);return a.length?`<ul class="note-list idea-list">${a.map((i,s)=>`
        <li>
          <span>${g(i)}</span>
          ${e?"":`<button class="idea-remove" data-action="remove-idea" data-index="${s}" title="Remove idea" aria-label="Remove idea">✕</button>`}
        </li>`).join("")}</ul>`:""}function Wa(t,e,a){if(!t||t.disabled)return;const i=t.value||"",s=i.split(`
`),n=i.slice(0,t.selectionStart).split(`
`).length-1,r=i.slice(0,t.selectionEnd).split(`
`).length-1,o=t.selectionStart!==t.selectionEnd,d=o?n:0,c=o?r:s.length-1;if(e==="bullets"){const m=s.slice(d,c+1).every(f=>/^\s*(?:•|-|[*])\s+/.test(f)||!f.trim());for(let f=d;f<=c;f++)s[f].trim()&&(m?s[f]=s[f].replace(/^\s*(?:•|-|[*])\s+/,""):/^\s*(?:•|-|[*])\s+/.test(s[f])||(s[f]=`• ${s[f].replace(/^\s*/,"")}`))}else{const m=s.slice(d,c+1).every(p=>/^\s*\d+[.)]\s+/.test(p)||!p.trim());let f=1;for(let p=d;p<=c;p++){if(!s[p].trim())continue;const k=s[p].replace(/^\s*(?:\d+[.)]|•|-|[*])\s+/,"").replace(/^\s*/,"");s[p]=m?k:`${f}. ${k}`,f+=1}}t.value=s.join(`
`),a&&a(t.value);try{t.focus()}catch{}}function ua(t){Wa(document.getElementById("day-note"),t,e=>l.setNote(v,e))}function pa(t){Wa(document.getElementById("profile-values"),t,e=>l.setProfileField("values",e))}function qs(t){return new Promise(e=>{if(!t||!String(t.type||"").startsWith("image/"))return e(null);const a=URL.createObjectURL(t),i=new Image,s=()=>{try{URL.revokeObjectURL(a)}catch{}},n=(r,o)=>new Promise(d=>{let c=i.naturalWidth||0,m=i.naturalHeight||0;if(!c||!m)return d(null);const f=Math.min(1,r/Math.max(c,m));c=Math.max(1,Math.round(c*f)),m=Math.max(1,Math.round(m*f));const p=document.createElement("canvas");p.width=c,p.height=m;try{p.getContext("2d").drawImage(i,0,0,c,m),d(p.toDataURL("image/jpeg",o))}catch{d(null)}});i.onload=async()=>{try{let r=await n(900,.72);r&&r.length>Jt&&(r=await n(600,.62)),r&&r.length>Jt&&(r=await n(400,.55)),s(),e(r&&r.length<=Jt?r:null)}catch{s(),e(null)}},i.onerror=()=>{s(),e(null)},i.src=a})}function ma(t,e){return`
    <select class="sort-select" data-sort-kind="${t}" aria-label="Sort ${t}">
      ${Bs.map(([a,i])=>`<option value="${a}" ${e===a?"selected":""}>${i}</option>`).join("")}
    </select>
  `}function Ws(t){const e=l.getBadges(),a=l.topBadges(3),i=t.max>0&&t.percent===100,s=de?e:a;return`
    <section class="section rewards-section">
      <div class="section-head">
        <h2>Rewards</h2>
        ${e.length>3?`<button class="ghost-btn compact" data-action="toggle-badges">${de?"Show less":`More (${e.length}) ›`}</button>`:""}
      </div>
      ${i?`
        <div class="trophy-card">
          <div class="trophy-cup">🏆</div>
          <div>
            <div class="item-title">Gold Cup — Perfect day!</div>
            <div class="item-meta">100% of points on ${j(v)}</div>
          </div>
        </div>
      `:""}
      ${e.length?`
        <div class="rewards-grid">
          ${s.map(n=>`
            <article class="reward-card tier-${n.tier}">
              <div class="reward-medal">${se(n.tier)}</div>
              <div>
                <div class="item-title">${g(n.rewardTitle||n.title)}</div>
                <div class="item-meta">${g(n.title)} · ${Ca(n.tier)} · ${j((n.earnedAt||"").slice(0,10))}</div>
              </div>
            </article>
          `).join("")}
        </div>
      `:'<div class="empty">No rewards yet. Set a goal in Settings → Goals &amp; Rewards.</div>'}
    </section>
  `}function pe(t){return`<span class="streak-badge">${t} day streak</span>`}function Ua(t){return t?`<span class="forward-badge from">↩ Forwarded from ${g(t)}</span>`:""}function me(t){const e=Array.isArray(t)?t.filter(Boolean):[];return e.length?`<span class="forward-badge to">↪ Forwarded to ${g(e[e.length-1])}</span>`:""}function za(t){return t?`<span class="forward-badge replace from">⇄ Replaced from ${g(t)}</span>`:""}function Us(t){const e=l.getAllHabits().map(a=>({habit:a,to:l.habitReplacedTo(v,a.id)})).filter(a=>a.to);return e.length?`
    <div class="replaced-away">
      ${e.map(({habit:a,to:i})=>`
        <button type="button" class="forward-badge replace undo" data-action="undo-replace-habit" data-id="${a.id}" data-from="${v}" data-to="${i}" ${t?"disabled":""} title="${t?"Unlock the day to undo this":`Put ${g(a.name)} back on ${g(v)}`}">
          ⇄ ${g(a.name)} → ${g(i)}
        </button>`).join("")}
    </div>
  `:""}function Ya(t,e){if(e)return`<button class="mini-btn" data-action="open-replace-habit" data-id="${t}" disabled title="Unlock the day to replace it">${E("swap")}</button>`;const a=l.habitReplaceDays(v,t);if(!a.allowed){const i=l.findHabit(t),s=i&&i.pin&&i.pin.mode==="forever"?"Pinned forever — no replace option":"No replace days before its next due day";return`<button class="mini-btn" data-action="open-replace-habit" data-id="${t}" disabled title="${s}">${E("swap")}</button>`}return`<button class="mini-btn" data-action="open-replace-habit" data-id="${t}" title="Replace this day with one of the ${a.days.length} day${a.days.length===1?"":"s"} before ${a.next}">${E("swap")}</button>`}function zs(t){const e=new Date(`${t}T00:00:00`);return e.setDate(e.getDate()+1),l.todayKey(e)}function Re(){return`<button class="ghost-btn compact ${Q?"on":""}" data-action="toggle-edit">${Q?"Done":"Edit Mode"}</button>`}function Ys(t){return t?'<span class="lock-badge">Locked</span>':'<span class="open-badge">Open</span>'}function Vs(){l.checkGoals(v);const t=l.getDay(v),e=l.getSettings(),a=e.showConscious!==!1,i=l.getHabits(v),s=l.getTasks(v),n=l.scoreFor(v),r=Ra(n.percent),o=v===l.todayKey(),d=l.isLocked(v);return`
    <div class="topbar">
      <div>
        <p class="kicker">${o?"Today":"Daily report"}</p>
        <h1>${j(v)}</h1>
      </div>
      <div class="date-nav">
        <button class="icon-btn" data-action="prev-day" aria-label="Previous day">‹</button>
        <button class="icon-btn" data-action="next-day" aria-label="Next day">›</button>
      </div>
    </div>

    <section class="score-hero ${d?"is-locked":""}">
      <div class="score-row">
        <div>
          <div class="score-value">${n.earned}</div>
          <div class="score-unit">of ${n.max||0} points</div>
        </div>
        <div class="hero-side">
          ${Ys(d)}
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
        ${d?`Submitted${t.submittedAt?` at ${js(t.submittedAt)}`:""}.${(n.missedHabits||0)+(n.missedTasks||0)>0?` ${(n.missedHabits||0)+(n.missedTasks||0)} missed (${n.missedHabits||0} habits, ${n.missedTasks||0} tasks) — unchecked items count as missed.`:" Nothing missed — all done."} Unlock in Settings to edit.`:`Auto-locks at ${e.lockTime}. Submit when the day is done. Unchecked items will count as missed once locked.`}
      </p>
      ${d?'<button class="ghost-btn full" data-action="goto-settings">Unlock in Settings</button>':'<button class="primary-btn full" data-action="submit-day">Submit and lock report</button>'}
      <div class="export-row">
        <span class="muted">Export:</span>
        <button class="ghost-btn compact" data-action="open-export">Excel / JSON / PDF</button>
      </div>
    </section>

    ${Ws(n)}

    <section class="section">
      <div class="section-head">
        <h2>Habits</h2>
        <div class="head-actions">
          ${ma("habit",e.habitSort||"default")}
          ${Re()}
          <span class="points">+${n.habitScore}${a&&n.consciousScore?` +${n.consciousScore}🧠`:""} pts</span>
        </div>
      </div>
      ${["default","custom"].includes(e.habitSort||"default")&&i.length>1?'<p class="muted tight">Hold the grip button on a card, then drag it to a new spot.</p>':""}
      <div class="list">
        ${i.length?i.map(c=>{const m=l.habitRating(v,c.id),f=m>0,p=!f&&d,k=l.habitStreak(c.id,v),A=a&&Number(c.consciousPoints)||0;return`
                    <article class="item-card ${f?"done":""} ${p?"missed":""} ${d?"is-locked":""}" style="border-left:3px solid ${O(c.category)}" data-sortable="habit" data-id="${c.id}">
                      <button class="check" data-action="toggle-habit" data-id="${c.id}" ${d?"disabled":""}>✓</button>
                      <div class="item-body">
                        <div class="item-title">${g(c.name)} ${p?'<span class="missed-badge">Missed</span>':""}</div>
                        <div class="item-meta">${ft(c.category)} ${c.pin?At(c.pin):"Not pinned"} · ${m?`${m}/5 ${re(m)}`:d?"Missed":"Not rated"}</div>
                        ${c.description?`<p class="item-desc">${g(c.description)}</p>`:""}
                        ${a?`<div class="item-meta">${pe(k)} ${Ga(A)}</div>`:`<div class="item-meta">${pe(k)}</div>`}
                        ${me(l.habitForwardedTo(v,c.id))}
                        ${za(l.habitReplacedFrom(v,c.id))}
                        ${it(c.tags)}
                        ${ja(c.id,m,d)}
                      </div>
                      <div class="item-side">
                        <div class="points">+${c.points}${A?` +${A}🧠`:""}</div>
                      </div>
                      <div class="item-actions">
                        <button class="drag-handle" aria-label="Hold and drag to reorder" title="Hold and drag to reorder" ${d?"disabled":""}>${E("grip")}</button>
                        <div class="mini-actions">
                          ${Q?`<button class="mini-btn on" data-action="open-edit-habit" data-id="${c.id}" ${d?"disabled":""}>Edit</button>`:""}
                          ${Ya(c.id,d)}
                          <button class="mini-btn ${c.pin?"on":""}" data-action="open-pin-habit" data-id="${c.id}" ${d?"disabled":""} title="Pin habit">${E("pin")}</button>
                          <button class="mini-btn" data-action="archive-habit" data-id="${c.id}" ${d?"disabled":""} title="Archive habit" aria-label="Archive habit">${E("archive")}</button>
                        </div>
                      </div>
                    </article>
                  `}).join(""):'<div class="empty">No habits for this day. Tap + to add one.</div>'}
      </div>
      ${Us(d)}
    </section>

    <section class="section">
      <div class="section-head">
        <h2>Tasks</h2>
        <div class="head-actions">
          ${ma("task",e.taskSort||"default")}
          ${Re()}
          <span class="points">+${n.taskScore} pts</span>
        </div>
      </div>
      ${["default","custom"].includes(e.taskSort||"default")&&s.length>1?'<p class="muted tight">Hold the grip button on a card, then drag it to a new spot.</p>':""}
      <div class="list">
        ${s.length?s.map(c=>{const m=!!c.sourcePinId,f=m?l.findPinnedTask(c.sourcePinId):null,p=Math.max(0,Math.min(5,Number(c.rating)||0)),k=!c.done&&d;return`
                    <article class="item-card ${c.done?"done":""} ${k?"missed":""} ${d?"is-locked":""}" style="border-left:3px solid ${O(c.category)}" data-sortable="task" data-id="${c.id}">
                      <button class="check" data-action="toggle-task" data-id="${c.id}" ${d?"disabled":""}>✓</button>
                      <div class="item-body">
                        <div class="item-title">${g(c.title)} ${k?'<span class="missed-badge">Missed</span>':""}</div>
                        <div class="item-meta">${ft(c.category)} ${f?At(f.pin):"One-time task"} · ${c.done?"Done":d?"Missed":"Pending"} · ${p?`${p}/5 ${re(p)}`:"No rating"}</div>
                        ${c.description?`<p class="item-desc">${g(c.description)}</p>`:""}
                        ${Ua(c.forwardedFrom)}
                        ${me(c.forwardedTo)}
                        ${it(c.tags)}
                        ${c.image?'<span class="task-img-badge">📷 Photo attached</span>':""}
                        ${_a(c)}
                        ${Ba(c.id,p,d)}
                      </div>
                      <div class="item-side">
                        <div class="points">+${c.points}</div>
                      </div>
                      <div class="item-actions">
                        <button class="drag-handle" aria-label="Hold and drag to reorder" title="Hold and drag to reorder" ${d?"disabled":""}>${E("grip")}</button>
                        <div class="mini-actions">
                          ${Q?`<button class="mini-btn on" data-action="open-edit-task" data-id="${c.id}" ${d?"disabled":""}>Edit</button>`:""}
                          <button class="mini-btn" data-action="open-forward-task" data-id="${c.id}" ${d?"disabled":""} title="Forward task to another day">${E("forward")}</button>
                          <button class="mini-btn ${m?"on":""}" data-action="open-pin-task" data-id="${c.id}" ${d?"disabled":""} title="Pin task">${E("pin")}</button>
                          <button class="mini-btn" data-action="archive-task" data-id="${c.id}" ${d?"disabled":""} title="Archive task" aria-label="Archive task">${E("archive")}</button>
                          ${Q?`<button class="mini-btn danger" data-action="remove-task" data-id="${c.id}" ${d?"disabled":""} title="Delete task" aria-label="Delete task">${E("trash")}</button>`:""}
                        </div>
                      </div>
                    </article>
                  `}).join(""):'<div class="empty">No tasks yet. Tap + to add one.</div>'}
      </div>
    </section>

    <section class="section">
      <div class="section-head"><h2>Day note</h2></div>
      ${d?"":`
        <div class="note-toolbar">
          <button type="button" class="ghost-btn compact" data-action="note-bullets" title="Bullet list (select lines or whole note)">• Bullets</button>
          <button type="button" class="ghost-btn compact" data-action="note-numbered" title="Numbered list (select lines or whole note)">1. Numbered</button>
        </div>
      `}
      <textarea id="day-note" placeholder="How did today go? Tip: use • Bullets for lists." ${d?"disabled":""}>${g(t.note)}</textarea>
    </section>

    ${Js()}
  `}function Js(){const t=l.getArchivedHabits(),e=l.getArchivedTasks(),a=t.length+e.length,i=[...e.map(s=>`
      <article class="manage-card archived" style="border-left:4px solid ${O(s.category)}">
        <div class="section-head">
          <div>
            <div class="item-title">${g(s.title)} <span class="archive-kind">Task</span></div>
            <div class="item-meta">${ft(s.category)} · +${s.points} pts${s.fromDate?` · from ${g(s.fromDate)}`:""}${s.originDate&&s.originDate!==s.fromDate?` · created ${g(s.originDate)}`:""} · ${Fe(s.archivedAt)}</div>
            ${s.description?`<p class="item-desc">${g(s.description)}</p>`:""}
            ${it(s.tags)}
          </div>
          <div class="mini-actions">
            <button class="mini-btn on" data-action="restore-task" data-id="${s.id}" title="Restore task to the selected day" aria-label="Restore task">${E("undo")}</button>
            ${Q?`<button class="mini-btn danger" data-action="delete-archived-task" data-id="${s.id}" title="Delete permanently" aria-label="Delete permanently">${E("trash")}</button>`:""}
          </div>
        </div>
      </article>
    `),...t.map(s=>`
      <article class="manage-card archived" style="border-left:4px solid ${O(s.category)}">
        <div class="section-head">
          <div>
            <div class="item-title">${g(s.name)} <span class="archive-kind">Habit</span></div>
            <div class="item-meta">${ft(s.category)} · +${s.points} pts${s.pin?` · ${At(s.pin)}`:" · Pin ended"} · ${Fe(s.archivedAt)}</div>
            ${s.description?`<p class="item-desc">${g(s.description)}</p>`:""}
            ${it(s.tags)}
          </div>
          <div class="mini-actions">
            <button class="mini-btn on" data-action="restore-habit" data-id="${s.id}" title="Restore habit" aria-label="Restore habit">${E("undo")}</button>
            <button class="mini-btn danger" data-action="delete-archived-habit" data-id="${s.id}" title="Delete permanently" aria-label="Delete permanently">${E("trash")}</button>
          </div>
        </div>
      </article>
    `)];return`
    <section class="section archive-section">
      <button type="button" class="archive-head" data-action="toggle-archive" aria-expanded="${gt}">
        <span class="archive-title">${E("archive")} Archive</span>
        <span class="archive-count">${a}</span>
        <span class="archive-chevron" aria-hidden="true">${gt?"▾":"▸"}</span>
      </button>
      ${gt?`<div class="archive-list">${a?i.join(""):'<div class="empty">Nothing archived yet. Use the archive button on a habit or task to set it aside here.</div>'}</div>`:""}
    </section>
  `}function ae(t){return t==="short"?"#short":t==="medium"?"#medium":"#long"}function Qs(){const t=l.getProfile(),e=!!t.locked,a=e?"disabled":"",i=Array.isArray(t.whoAmI)?t.whoAmI:[],s=Array.isArray(t.lifeAreas)?t.lifeAreas:[],n=Array.isArray(t.pGoals)?t.pGoals:[],r=Array.isArray(t.quotes)?t.quotes:[],o=l.profileGoalDurations();o[K].includes(Tt)||(Tt=o[K][0]);const d=y=>n.filter(D=>D.term===y).length,c=(Kt==="all"?n:n.filter(y=>y.term===Kt)).slice().sort((y,D)=>String(y.createdAt).localeCompare(String(D.createdAt))),m=r.slice().sort((y,D)=>!!y.fav!=!!D.fav?y.fav?-1:1:String(D.createdAt).localeCompare(String(y.createdAt))),f=m.slice(0,3),p=m.slice(3),k=String(t.name||"?").trim().slice(0,1).toUpperCase()||"?",S=String(t.ideas||"").split(`
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
          <div class="item-meta">${i.length?`${i.length} identities`:"No identities yet"} · ${s.length} life areas · ${n.length} goals · ${r.length} quotes</div>
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
        <span class="item-meta">${i.length}/50</span>
      </div>
      ${e?"":`
        <div style="display:flex;gap:8px;margin-bottom:10px">
          <input id="new-whoami" maxlength="120" placeholder="e.g. A disciplined father…" style="flex:1;min-width:0" />
          <button class="primary-btn compact-btn" data-action="add-whoami">Add</button>
        </div>
      `}
      <div class="habit-manage">
        ${i.length?i.map((y,D)=>`
          <article class="manage-card whoami-row">
            <span class="whoami-num">${D+1}</span>
            <input class="whoami-input" data-whoami="${y.id}" maxlength="120" value="${g(y.text)}" ${a} aria-label="Who I am ${D+1}" />
            ${e?"":`
              <div class="mini-actions">
                <button class="mini-btn" data-action="move-whoami" data-id="${y.id}" data-dir="-1" ${D===0?"disabled":""} title="Move up">↑</button>
                <button class="mini-btn" data-action="move-whoami" data-id="${y.id}" data-dir="1" ${D===i.length-1?"disabled":""} title="Move down">↓</button>
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
        <span class="item-meta">${s.length}/20</span>
      </div>
      ${e?"":`
        <div style="display:flex;gap:8px;margin-bottom:10px">
          <input id="new-lifearea" maxlength="60" placeholder="e.g. Health, Family, Career…" style="flex:1;min-width:0" />
          <button class="primary-btn compact-btn" data-action="add-lifearea">Add</button>
        </div>
      `}
      ${s.length?`
        <div class="life-grid">
          ${s.map((y,D)=>{const zt=bt===y.id;return`
              <article class="life-card ${zt?"open":""}">
                <div class="life-head">
                  <button type="button" class="life-toggle" data-action="toggle-lifearea" data-id="${y.id}" aria-expanded="${zt?"true":"false"}">
                    <b>${g(y.title)}</b>
                    <span>${zt?"▾":"▸"}</span>
                  </button>
                  ${e?"":`
                    <div class="mini-actions">
                      <button class="mini-btn" data-action="move-lifearea" data-id="${y.id}" data-dir="-1" ${D===0?"disabled":""} title="Move up">↑</button>
                      <button class="mini-btn" data-action="move-lifearea" data-id="${y.id}" data-dir="1" ${D===s.length-1?"disabled":""} title="Move down">↓</button>
                    </div>
                  `}
                </div>
                ${zt?`
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
        ${e?t.values.trim()?`<div class="values-list">${qa(t.values)}</div>`:'<p class="item-meta">No values yet.</p>':`
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
      ${e?S?ca(t.ideas,!0):'<p class="item-meta">No ideas yet.</p>':`
          <div class="form" style="margin-bottom:10px">
            <label>New idea
              <input id="new-idea" maxlength="200" placeholder="e.g. Build a habit tracker app" />
            </label>
            <div style="display:flex;gap:8px">
              <button class="primary-btn compact-btn" data-action="add-idea">Add idea</button>
            </div>
          </div>
          ${S?`${ca(t.ideas,!1)}
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
              ${["short","medium","long"].map(y=>`<button type="button" class="chip hashtag-${y} ${K===y?"on":""}" data-action="set-pgoal-term" data-term="${y}">${ae(y)}</button>`).join("")}
            </div>
          </div>
          <div class="row-2">
            <label>Timeframe
              <select id="new-pgoal-duration">
                ${o[K].map(y=>`<option value="${g(y)}" ${Tt===y?"selected":""}>${g(y)}</option>`).join("")}
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
        ${[["all",`All (${n.length})`],["short",`#short (${d("short")})`],["medium",`#medium (${d("medium")})`],["long",`#long (${d("long")})`]].map(([y,D])=>`<button type="button" class="chip ${Kt===y?"on":""}" data-action="set-pgoal-filter" data-filter="${y}">${D}</button>`).join("")}
      </div>
      <div class="habit-manage">
        ${c.length?c.map(y=>`
          <article class="manage-card pgoal-card term-${y.term}">
            <div class="pgoal-top">
              <span class="hashtag hashtag-${y.term}">${ae(y.term)}</span>
              <span class="duration-pill">⏳ ${g(y.duration)}</span>
              ${e?"":`<button class="mini-btn" data-action="remove-pgoal" data-id="${y.id}" title="Remove goal">✕</button>`}
            </div>
            ${e?`<div class="item-title" style="margin-top:6px">${g(y.text)}</div>`:`
                <input data-pgoal-text="${y.id}" maxlength="200" value="${g(y.text)}" style="margin-top:8px" aria-label="Goal text" />
                <div class="row-2" style="margin-top:8px">
                  <select data-pgoal-term="${y.id}" aria-label="Goal term">
                    ${["short","medium","long"].map(D=>`<option value="${D}" ${y.term===D?"selected":""}>${ae(D)}</option>`).join("")}
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
          ${f.map(y=>ga(y,e)).join("")}
        </div>
        ${p.length?`
          <button class="ghost-btn compact full" data-action="toggle-quotes">${Rt?"Show less ▴":`More (${p.length}) — see the rest ▾`}</button>
          ${Rt?`<div class="habit-manage" style="margin-top:8px">${p.map(y=>ga(y,e)).join("")}</div>`:""}
        `:Rt&&!p.length?'<p class="item-meta">No more quotes — that is all of them.</p>':""}
      `:'<div class="empty">No quotes yet — add the words that move you.</div>'}
    </section>
  `}function ga(t,e){return`
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
  `}function Xs(){document.querySelectorAll("[data-profile]").forEach(t=>{t.addEventListener("input",()=>{l.setProfileField(t.dataset.profile,t.value)||b()})}),document.querySelectorAll("[data-lifearea-title]").forEach(t=>{t.addEventListener("change",()=>{l.updateLifeArea(t.dataset.lifeareaTitle,{title:t.value}),b()})}),document.querySelectorAll("[data-lifearea-desc]").forEach(t=>{t.addEventListener("input",()=>{l.updateLifeArea(t.dataset.lifeareaDesc,{description:t.value})})}),document.querySelectorAll("[data-pgoal-text]").forEach(t=>{t.addEventListener("change",()=>{l.updateProfileGoal(t.dataset.pgoalText,{text:t.value}),b()})}),document.querySelectorAll("[data-pgoal-term]").forEach(t=>{t.addEventListener("change",()=>{l.updateProfileGoal(t.dataset.pgoalTerm,{term:t.value}),b()})}),document.querySelectorAll("[data-pgoal-duration]").forEach(t=>{t.addEventListener("change",()=>{l.updateProfileGoal(t.dataset.pgoalDuration,{duration:t.value}),b()})})}function Zs(){const t=Va(v,tt*7),e=l.week(new Date(`${t}T00:00:00`)),a=e.reduce((n,r)=>n+r.earned,0),i=Math.round(a/7),s=tt===0?"This week":tt===-1?"1 week back":`${-tt} weeks back`;return`
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
            <div class="score-unit">points · ${s}</div>
          </div>
          <div class="grade-pill">Avg ${i} pts</div>
        </div>
        <p class="lock-hint week-range">Week starting <b>${j(e[0].date)}</b> · ${e[0].label} – ${e[6].label}, ${j(e[6].date)}</p>
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
  `}function Ks(){const t=ce||H(v),e=be(t),a=l.todayKey();return`
    <section class="section">
      <div class="section-head">
        <h2>Reports calendar</h2>
        <div class="date-nav">
          <button class="icon-btn" data-action="history-cal-nav" data-dir="-1" aria-label="Previous month">‹</button>
          <button class="icon-btn" data-action="history-cal-nav" data-dir="1" aria-label="Next month">›</button>
        </div>
      </div>
      <div class="pin-cal">
        <div class="pin-cal-head"><b>${Dt(t)}</b></div>
        <div class="pin-cal-grid pin-cal-week">
          ${he().map(i=>`<span>${i.label.slice(0,1)}</span>`).join("")}
        </div>
        <div class="pin-cal-grid">
          ${e.map(i=>{if(!i)return"<span></span>";const s=l.scoreFor(i),n=i===v?"on-selected":s.percent>=100?"on-perfect":s.earned>0?"on":"",r=s.locked?'<i class="dot-lock"></i>':"";return`<button type="button" class="pin-cal-day hist-cal-day ${n} ${i===a?"is-today":""}" data-action="pick-date" data-date="${i}" title="${g(i)}: ${s.earned}/${s.max} pts (${s.percent}%)"><b>${Number(i.slice(8,10))}</b><span>${s.earned}</span>${r}</button>`}).join("")}
        </div>
      </div>
    </section>
  `}function ti(t){const e=new Map((t||[]).map(n=>[n.date,n])),a=ue||H(v),i=be(a),s=l.todayKey();return`
    <div class="pin-cal">
      <div class="pin-cal-head"><b>${Dt(a)}</b><span class="item-meta">${e.size} locked</span></div>
      <div class="pin-cal-grid pin-cal-week">
        ${he().map(n=>`<span>${n.label.slice(0,1)}</span>`).join("")}
      </div>
      <div class="pin-cal-grid">
        ${i.map(n=>{if(!n)return"<span></span>";const r=e.get(n),o=!!r,d=R.includes(n)?"on-selected":o?"on-locked":"on-open",c=l.scoreFor(n),m=r?r.earned:c.earned;return`<button type="button" class="pin-cal-day hist-cal-day ${d} ${n===s?"is-today":""}" data-action="toggle-locked-day" data-date="${n}" title="${g(n)}: ${o?"Locked":"Open"} — ${m} pts"><b>${Number(n.slice(8,10))}</b><span>${m}</span></button>`}).join("")}
      </div>
    </div>
  `}function ei(){const t=He||H(v),e=be(t),a=l.todayKey(),i=new Set(l.notedDays(t)),n=yt&&yt.startsWith(`${t}-`)&&i.has(yt)?yt:[...i].sort().pop()||null;yt=n;const r=n?l.noteFor(n):"";return`
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
        <div class="pin-cal-head"><b>${Dt(t)}</b><span class="item-meta">${i.size} noted</span></div>
        <div class="pin-cal-grid pin-cal-week">
          ${he().map(o=>`<span>${o.label.slice(0,1)}</span>`).join("")}
        </div>
        <div class="pin-cal-grid">
          ${e.map(o=>{if(!o)return"<span></span>";const d=i.has(o),c=o===n?"on-selected":d?"on-noted":"",m=d?`${o}: note`:`${o}: no note`;return`<button type="button" class="pin-cal-day notes-cal-day ${c} ${o===a?"is-today":""}" data-action="show-day-note" data-date="${o}" ${d?"":"disabled"} title="${g(m)}"><b>${Number(o.slice(8,10))}</b><span class="note-dot ${d?"":"off"}">●</span></button>`}).join("")}
        </div>
      </div>
      <div class="notes-cal-note">
        ${n?`
              <div class="notes-cal-note-head">
                <span class="item-title">${j(n)}</span>
                <span class="badge">Note</span>
              </div>
              <p class="notes-cal-note-body">${g(r)}</p>
            `:`<p class="item-meta">No notes in ${Dt(t)} yet — write one on a day’s report and it will appear here.</p>`}
      </div>
    </section>
  `}function ai(){return`
    <section class="manage-card export-card">
      <div class="section-head">
        <div>
          <div class="item-title">Select &amp; export</div>
          <div class="item-meta">Pick a day, week, month or year, then a format.</div>
        </div>
      </div>
      <div class="chip-row" style="margin-bottom:10px">
        ${["day","week","month","year"].map(t=>`<button type="button" class="chip ${_===t?"on":""}" data-action="set-histexp-range" data-range="${t}">${t[0].toUpperCase()}${t.slice(1)}</button>`).join("")}
      </div>
      ${_==="day"||_==="week"?`
        <label>Which ${_==="day"?"day":"week (pick any day in it)"}
          <input id="histexp-date" type="date" value="${v}" />
        </label>
      `:""}
      ${_==="month"?`
        <label>Which month
          <input id="histexp-month" type="month" value="${v.slice(0,7)}" />
        </label>
      `:""}
      ${_==="year"?`
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
  `}function si(){const t=l.week(new Date(`${v}T00:00:00`)),e=l.todayKey(),a=`${j(t[0].date)} – ${j(t[6].date)}`,i=t.reduce((r,o)=>r+(o.earned||0),0),s=t.reduce((r,o)=>r+(o.max||0),0),n=t.filter(r=>r.hasRecord).length;return`
    <div class="topbar">
      <div>
        <p class="kicker">Archive</p>
        <h1>Past reports</h1>
      </div>
      <button class="ghost-btn compact" data-action="open-export">Export</button>
    </div>
    ${Ks()}
    ${Zs()}
    ${ai()}
    <section class="section">
      <div class="section-head">
        <h2>Week</h2>
        <span class="item-meta">${a}</span>
      </div>
      <p class="item-meta">${n} of 7 days reported · ${i} of ${s} pts</p>
      <div class="history-list">
        ${t.map(r=>{const o=!r.hasRecord,d=(r.missedHabits||0)+(r.missedTasks||0),c=o?"No report":`${r.locked?"Locked":"Open"} · ${Ra(r.percent)} · ${r.earned}/${r.max} pts (${r.percent}%)${r.locked&&d>0?` · ❌ ${d} missed`:""}`;return`
              <article class="history-card ${o?"is-empty":""} ${r.date===e?"is-today":""} ${r.date===v?"is-selected":""}">
                <div class="section-head">
                  <div>
                    <div class="item-title">${g(r.label)} ${j(r.date)}</div>
                    <div class="item-meta">${g(c)}</div>
                  </div>
                  <button class="ghost-btn compact" data-action="pick-date" data-date="${r.date}">${o?"Add":"Open"}</button>
                </div>
                <div class="bar"><span style="width:${r.percent}%"></span></div>
                ${r.note?_s(r.note):`<p class="item-meta">${o?"Nothing recorded this day.":"No note."}</p>`}
              </article>
            `}).join("")}
      </div>
    </section>
  `}function Va(t,e){const a=new Date(`${t}T00:00:00`);return a.setDate(a.getDate()+e),l.todayKey(a)}function ii(){return J==="month"?`${vt(H(v),st)}-15`:J==="year"?`${Number(v.slice(0,4))+st}-06-15`:Va(v,st*7)}function ni(t){const[e,a]=l.resolveRange(J,t);return J==="week"?`${j(e)} – ${j(a)}`:J==="month"?Dt(e.slice(0,7)):e.slice(0,4)}function oi(){var c;const t=ii(),e=l.categoryChart(J,t);Z!=="all"&&!e.cats.some(m=>m.id===Z)&&(Z="all");const a=Z==="all"?e.cats:e.cats.filter(m=>m.id===Z),i=Math.max(1,...e.labels.map((m,f)=>a.reduce((p,k)=>p+(e.perCat[k.id]?e.perCat[k.id][f]:0),0))),s=a.reduce((m,f)=>m+(e.totals[f.id]||0),0),n=Z==="all"?"All categories":((c=e.cats.find(m=>m.id===Z))==null?void 0:c.label)||"",r=st===0?J==="week"?"This week":J==="month"?"This month":"This year":ni(t),o=e.labels.map((m,f)=>{const p=a.reduce((A,S)=>A+(e.perCat[S.id]?e.perCat[S.id][f]:0),0),k=a.map(A=>({cat:A,value:e.perCat[A.id]?e.perCat[A.id][f]:0})).filter(A=>A.value>0).map((A,S)=>`<span class="chart-seg" style="height:${Math.max(2,Math.round(A.value/i*100))}%;background:${O(A.cat.id,S)}" title="${g(A.cat.label)}: ${A.value} pts"></span>`).join("");return`
      <div class="chart-col" title="${g(e.titles[f])}: ${p} pts">
        <div class="chart-bar">${k||'<span class="chart-empty"></span>'}</div>
        <span class="chart-x">${g(m)}</span>
      </div>
    `}).join(""),d=a.map((m,f)=>`
      <span class="chart-legend-item"><i style="background:${O(m.id,f)}"></i>${g(m.label)} <b>${e.totals[m.id]||0}</b></span>
    `).join("");return`
    <section class="score-hero">
      <div class="section-head" style="margin-bottom:4px">
        <div>
          <div class="item-title">Progress chart</div>
          <div class="item-meta">${r} · ${s} pts total · ${g(n)}</div>
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
        ${e.cats.map((m,f)=>`
            <button type="button" class="chip chart-cat-chip ${Z===m.id?"on":""}" data-action="set-chart-cat" data-cat="${m.id}">
              <i style="background:${O(m.id,f)}"></i>${g(m.label)}
            </button>
          `).join("")}
      </div>
      <div class="chart-wrap${e.labels.length>12?" scroll-x":""}">${o}</div>
      <div class="chart-legend">${d}</div>
    </section>
  `}function ri(t,e){const{locked:a,showC:i}=e,s=t.habits.map(r=>{const o=l.habitRating(v,r.id),d=!o&&a,c=l.habitStreak(r.id,v),m=i&&Number(r.consciousPoints)||0,f=o>0?m:0,p=Math.round(r.points*o/5)+f,k=r.points+m;return`
        <article class="item-card ${o?"done":""} ${d?"missed":""} ${a?"is-locked":""}" style="border-left:3px solid ${O(r.category)}">
          <button class="check" data-action="toggle-habit" data-id="${r.id}" ${a?"disabled":""}>✓</button>
          <div class="item-body">
            <div class="item-title">${g(r.name)} ${d?'<span class="missed-badge">Missed</span>':""}</div>
            <div class="item-meta">Habit · ${o?`${o}/5 ${re(o)}`:a?"Missed":"Not rated"} · ${pe(c)}${i?` ${Ga(m)}`:""}</div>
            ${r.description?`<p class="item-desc">${g(r.description)}</p>`:""}
            ${me(l.habitForwardedTo(v,r.id))}
            ${za(l.habitReplacedFrom(v,r.id))}
            ${it(r.tags)}
            ${ja(r.id,o,a)}
          </div>
          <div class="item-side">
            <div class="points">${p}/${k}</div>
            <div class="mini-actions">
              ${Q?`<button class="mini-btn on" data-action="open-edit-habit" data-id="${r.id}" ${a?"disabled":""}>Edit</button>`:""}
              ${Ya(r.id,a)}
            </div>
          </div>
        </article>
      `}).join(""),n=t.tasks.map(r=>{const o=Math.max(0,Math.min(5,Number(r.rating)||0)),d=!r.done&&a;return`
        <article class="item-card ${r.done?"done":""} ${d?"missed":""} ${a?"is-locked":""}" style="border-left:3px solid ${O(r.category)}">
          <button class="check" data-action="toggle-task" data-id="${r.id}" ${a?"disabled":""}>✓</button>
          <div class="item-body">
            <div class="item-title">${g(r.title)} ${d?'<span class="missed-badge">Missed</span>':""}</div>
            <div class="item-meta">Task · ${r.done?"Done":a?"Missed":"Pending"} · ${o?`${o}/5 ${re(o)}`:"No rating"}${r.description?` · ${g(r.description)}`:""}</div>
            ${Ua(r.forwardedFrom)}
            ${me(r.forwardedTo)}
            ${it(r.tags)}
            ${r.image?'<span class="task-img-badge">📷 Photo attached</span>':""}
            ${_a(r)}
            ${Ba(r.id,o,a)}
          </div>
          <div class="item-side">
            <div class="points">+${r.points}</div>
            <div class="mini-actions">
              ${Q?`<button class="mini-btn on" data-action="open-edit-task" data-id="${r.id}" ${a?"disabled":""}>Edit</button>`:""}
              <button class="mini-btn" data-action="open-forward-task" data-id="${r.id}" ${a?"disabled":""} title="Forward task to another day">${E("forward")}</button>
            </div>
          </div>
        </article>
      `}).join("");return`${s}${n}`}function di(){l.getDay(v);const t=l.isLocked(v),e=l.consciousEnabled(),a=l.categoryBreakdown(v),i=a.reduce((n,r)=>n+r.earned,0),s=a.reduce((n,r)=>n+r.max,0);return`
    <div class="topbar">
      <div>
        <p class="kicker">Activities</p>
        <h1>By category</h1>
      </div>
      <div class="date-nav">
        ${Re()}
        <button class="icon-btn" data-action="prev-day" aria-label="Previous day">‹</button>
        <button class="icon-btn" data-action="next-day" aria-label="Next day">›</button>
      </div>
    </div>
    <section class="score-hero">
      <div class="score-row">
        <div>
          <div class="score-value">${i}</div>
          <div class="score-unit">of ${s||0} category points</div>
        </div>
        <div class="grade-pill">${j(v)}</div>
      </div>
      <p class="lock-hint">Habits and tasks grouped by category.</p>
    </section>
    ${oi()}
    ${ei()}
    ${a.map(n=>{const r=n.max?Math.round(n.earned/n.max*100):0,o=O(n.id),d=ee.has(n.id);return`
          <section class="section">
            <article class="manage-card cat-card cat-${n.id} ${d?"open":""}" style="border-left:4px solid ${o};background:linear-gradient(180deg, ${o}2e, ${o}14 55%, var(--card) 100%)">
              <button type="button" class="cat-activity-head" data-action="toggle-activity-cat" data-id="${n.id}" aria-expanded="${d?"true":"false"}">
                <span class="cat-activity-chev" aria-hidden="true">${d?"▾":"▸"}</span>
                <span class="cat-activity-titles">
                  <span class="item-title">${n.label}</span>
                  <span class="item-meta">${n.completed}/${n.total} done · rating ${n.habitAvg||0}/5</span>
                </span>
                <span class="points">${n.earned}/${n.max} pts</span>
              </button>
              ${d?`
                    <div class="cat-activity-body">
                      <div class="bar"><span style="width:${r}%;background:${o}"></span></div>
                    </div>`:""}
            </article>
            ${d?`
            <div class="list" style="margin-top:10px">
              ${n.habits.length||n.tasks.length?ri(n,{locked:t,showC:e}):'<div class="empty">No activities in this category.</div>'}
            </div>
                `:""}
          </section>
        `}).join("")}
  `}function ge(t){return`${t||"second-mind-backup"}-${l.todayKey()}.json`}function li(){const t=l.getInstalledAt(),e=String(t).slice(0,10),a=new Date(`${e}T00:00:00`),i=new Date(`${l.todayKey()}T00:00:00`),s=Number.isNaN(a.getTime())?1:Math.max(1,Math.round((i-a)/864e5)+1),n=String(Number(e.slice(8,10))).padStart(2,"0"),r=e.slice(5,7),o=e.slice(2,4),d=/^\d{4}-\d{2}-\d{2}$/.test(e)?`${n}/${r}/${o}`:e,c=Math.floor((s-1)/365)+1;return`Using Second Mind since ${d} · day ${s} · year ${c}`}function ci(){const t=l.folderStatus();return t==="boot"?"Checking for a connected data folder…":t==="unsupported"?"Browser storage":t==="granted"?"✅ Auto-save on":"⚠️ Not connected"}function ui(){const t=l.folderStatus();if(t==="boot")return"Checking for a connected data folder…";if(t==="unsupported")return"Auto-save to a folder needs Chrome/Edge on desktop — on this device data stays in the browser, so use Export backup to protect it.";if(t==="unset")return"No data folder chosen yet — your data lives only in this browser.";if(t==="prompt")return"Tap Allow access so the app can keep saving to your folder.";if(t==="denied")return"Access was denied — choose the folder again.";if(t==="granted"){const e=l.lastFileSavedAt(),a=e?new Date(e).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit",second:"2-digit"}):"not yet";return`Auto-saving to ${l.folderName()}/${l.folderFileName()} · last saved ${a}`}return"Checking…"}async function pi(){const t=await l.chooseDataFolder();if(t.status==="unsupported"){h("Folder access needs Chrome or Edge"),b();return}if(t.cancelled){b();return}if(t.status!=="granted"){h("Couldn't open that folder"),b();return}t.corrupt?h("Folder connected — the old file was unreadable, a copy was saved aside"):t.replaced?h("Folder connected — data loaded from the file"):h("Data folder set — auto-save on"),b(),Pt()}async function mi(){await l.forgetDataFolder(),h("Folder unlinked — data stays in the browser"),b(),Pt()}async function gi(){const t=await l.grantFolderAccess();if(t.status!=="granted"){h("Access denied"),b();return}t.corrupt?h("Access granted — the old file was unreadable, a copy was saved aside"):t.replaced?h("Access granted — data loaded from the file"):h("Folder access granted — auto-save on"),b(),Pt()}async function fi(){const t=l.exportBackup(),e=ge();if(l.folderStatus()==="granted"&&l.getFolderHandle())try{if((await l.writeFolderFile(e,t)).ok){h("Backup saved to your folder"),Pt();return}}catch{}Ct(e,t,"application/json"),h("Backup downloaded")}async function hi(){return l.listFolderBackups()}async function Pt(){const t=document.getElementById("folder-backup-list");if(!t)return;if(l.folderStatus()!=="granted"||!l.getFolderHandle()){t.innerHTML='<button class="ghost-btn compact" data-action="trigger-import">Import from a file instead</button>';return}t.innerHTML='<p class="item-meta">Loading backups…</p>';const e=await hi();if(!document.getElementById("folder-backup-list"))return;e.length?t.innerHTML=e.map(i=>`
            <div style="display:flex;gap:8px;align-items:center;margin-bottom:6px">
              <span class="item-meta" style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${g(i.name)}</span>
              <button class="ghost-btn compact" data-action="restore-backup" data-name="${g(i.name)}">Restore</button>
            </div>
          `).join(""):t.innerHTML='<p class="item-meta">Folder has no backups yet — press Export backup now to create one. The live data file is saved here automatically.</p>';const a=document.createElement("div");a.innerHTML='<button class="ghost-btn compact" data-action="trigger-import">Import from a file instead</button>',t.appendChild(a)}async function bi(t){try{const e=await l.readFolderFile(t);if(e.missing||e.error||!e.raw){h("Couldn't read that backup");return}Ja(e.raw,t)}catch{h("Couldn't read that backup")}}function Ja(t,e){let a;try{a=JSON.parse(t)}catch{h("That file isn't valid JSON.");return}const i=l.backupKind(a);if(i==="ok"){if(!window.confirm(`Replace ALL app data with "${e}"?`))return;Ct(ge("second-mind-pre-import"),l.exportBackup(),"application/json"),l.importBackup(a),h("Backup imported"),b();return}if(i==="report-export"){const s=l.previewReport(a);if(!s.days){h("That report file has no day rows to import.");return}if(!window.confirm(`Import ${s.days} day(s) (${s.start} → ${s.end}) from "${e}" as locked history?

${s.newHabits} new habit(s) will be added to your list.
Days already in the app on those dates will be overwritten.`))return;Ct(ge("second-mind-pre-import"),l.exportBackup(),"application/json");const r=l.importReport(a);if(!r){h("That file doesn't look like a valid Second Mind backup.");return}h(`Imported ${r.days} day(s)${r.habits?` + ${r.habits} new habit(s)`:""}`),b();return}if(i==="wrong-app"){h("That backup belongs to another app (e.g. Iron Log) — it can’t be imported into Second Mind.");return}h("That file doesn't look like a valid Second Mind backup.")}async function yi(){if(!kt){h("Use the browser menu: Install / Add to Home Screen");return}try{kt.prompt();const t=await kt.userChoice;t&&t.outcome==="accepted"&&h("Installing Second Mind…")}catch{}kt=null,b()}async function vi(){const t=`./version.json?v=${Date.now()}`,e=await fetch(t,{cache:"no-store"});if(!e.ok)throw new Error(`http ${e.status}`);const a=await e.json(),i=a&&(a.version||a.v)||null;if(!i)throw new Error("no version field");return String(i)}async function ki(){rt=!0,le=!1,dt="Checking for updates… (needs internet)",b();try{if("serviceWorker"in navigator&&navigator.serviceWorker.getRegistration){const e=await navigator.serviceWorker.getRegistration().catch(()=>null);e&&e.update&&e.update().catch(()=>{})}}catch{}if(typeof fetch>"u"){rt=!1,dt="This browser can’t check — but the app itself works offline. Use Export backup to protect your data.",b();return}const t=setTimeout(()=>{rt&&(rt=!1,dt="Couldn't reach the server — offline? The app itself works offline; updating needs internet.",b())},15e3);try{const e=await vi();if(clearTimeout(t),rt=!1,Ie=e,e&&e!==Oa){le=!0,dt="Update found — updating automatically…",b(),await Qa(!0);return}dt="You're on the latest version. The app works offline."}catch{clearTimeout(t),rt=!1,dt="Couldn't reach the server — offline, or this file wasn't opened from the installed/hosted app. The app itself works offline; updating needs internet."}b()}function fa(t){return new Promise(e=>{if(!("serviceWorker"in navigator))return e();const a=()=>e(),i=setTimeout(()=>{try{navigator.serviceWorker.removeEventListener("controllerchange",a)}catch{}e()},t||4e3),s=()=>{clearTimeout(i);try{navigator.serviceWorker.removeEventListener("controllerchange",s)}catch{}e()};try{navigator.serviceWorker.addEventListener("controllerchange",s)}catch{e()}})}async function Qa(t){var a;try{Ct(ge("second-mind-pre-update"),l.exportBackup(),"application/json")}catch{}h("Backup saved — updating app…"),dt=`Backup saved — updating${Ie?` to ${String(Ie).slice(-8)}`:""}…`,b();const e=()=>{const i=window.location.href.includes("?")?"&":"?";try{window.location.replace(`${window.location.href.split("#")[0]}${i}v=${Date.now()}#updated`)}catch{window.location.reload()}setTimeout(()=>{try{window.location.reload()}catch{}},2500)};try{if("serviceWorker"in navigator&&navigator.serviceWorker.getRegistration){const i=await navigator.serviceWorker.getRegistration().catch(()=>null);if(i){const s=i.waiting;if(s){try{s.postMessage("SKIP_WAITING")}catch{try{i.waiting.postMessage({type:"SKIP_WAITING"})}catch{}}await fa(4e3),e();return}try{await i.update()}catch{}const n=await navigator.serviceWorker.getRegistration().catch(()=>i),r=(n||i).waiting||(n||i).installing;if(r){try{r.postMessage("SKIP_WAITING")}catch{}try{(a=(n||i).waiting)==null||a.postMessage("SKIP_WAITING")}catch{}await fa(5e3),e();return}try{const o=navigator.serviceWorker.controller;o&&o.postMessage({type:"CLEAR_APP_CACHES"})}catch{}try{if(typeof caches<"u"){const o=await caches.keys().catch(()=>[]);await Promise.all(o.filter(d=>d.startsWith("daily-report-")).map(d=>caches.delete(d).catch(()=>!1)))}}catch{}try{await fetch(`./index.html?v=${Date.now()}`,{cache:"reload"})}catch{}try{await fetch(`./version.json?v=${Date.now()}`,{cache:"reload"})}catch{}try{await(n||i).unregister()}catch{}e();return}}}catch{}try{await fetch(`./index.html?v=${Date.now()}`,{cache:"reload"})}catch{}setTimeout(e,600)}const $i=[{id:"start",icon:"🚀",title:"Getting started",summary:"How the app works in one minute",steps:[["📱","The app has five tabs at the bottom: <b>Today</b>, <b>Profile</b>, <b>History</b>, <b>Activities</b> and <b>Settings</b> — tap a tab to switch."],["⭐","Every habit and task has a <b>points value</b>. Checking it earns those points for that day."],["🧠","Some habits also award <b>conscious points</b> (🧠) on top of their normal points."],["📈","The big card on Today shows your day as points, percent and a <b>letter grade</b>."],["🔒","At your lock time the day locks itself — press <b>Submit and lock report</b> while the day is open."],["💾","Everything is saved on this device only and works fully offline."]]},{id:"today",icon:"✅",title:"Track your day (Today tab)",summary:"Habits, tasks, stars, photos and the FAB",steps:[["☑️","Tap the <b>circle check</b> on a habit or task to mark it done and earn its points."],["⭐","Tap the <b>stars</b> (1–5) to rate how well it went — a rating also counts it as done."],["🟢","Done items turn green. Unchecked items turn red as <b>Missed</b> once the day is locked."],["📷","Tasks can carry a photo — tap the thumbnail to view it full size."],["➕","Tap the big <b>+</b> button to add a habit or task for this day."],["↔️","Use the <b>‹ ›</b> arrows in the top bar to move between days."]]},{id:"edit",icon:"✏️",title:"Edit, sort & reorder",summary:"Edit Mode, drag order and archiving",steps:[["✏️","Tap <b>Edit Mode</b> in a section header to reveal the <b>Edit</b> and delete buttons."],["✋","Hold a card’s <b>grip button</b> for a moment, then drag it to a new spot in the list."],["🔃","The <b>Sort</b> selector orders the list by Points, Category, Tags or your custom drag order."],["🗂️","The <b>archive</b> button sets a habit or task aside — its history is kept and you can restore it any time from the <b>Archive</b> panel at the bottom of Today."]]},{id:"forward",icon:"🔁",title:"Forward, Replace & Pin",summary:"Moving habits and tasks between days",steps:[["↪️","<b>Forward</b> an unfinished task (➟ button) to another day — it moves there with a badge showing where it came from."],["⇄","<b>Replace</b> moves a habit’s rating to a free day before its next due date."],["📌","<b>Pin</b> a habit or task to a repeat schedule — weekly days, month dates or a custom date list — so it appears automatically. Pin it <b>forever</b> for daily essentials."],["↩️","Badges on the card (↩ Forwarded from / ⇄ Replaced from) show what moved and where — tap a badge to undo it."]]},{id:"notes",icon:"📝",title:"Day notes",summary:"Bullet and numbered lists that save themselves",steps:[["📝","The <b>Day note</b> box at the bottom of Today records how the day went."],["•","Select lines and press <b>• Bullets</b> (or <b>1. Numbered</b>) to make a list — press it again to remove the list markers."],["💾","The note saves automatically with the day and is included in exports and backups."]]},{id:"profile",icon:"👤",title:"Profile tab",summary:"Identity, life areas, goals, quotes & locking",steps:[["🪪","<b>Identity</b> — your display name and the person you want to be."],["🧬","<b>Who I am</b> — a numbered list of your roles; reorder with ↑ ↓."],["🗺️","<b>Life Areas</b> — tap a card to open it, describe it, and reorder with ↑ ↓."],["🌅","<b>My Vision</b> and <b>Core & Personal Values</b> — one value per line as a bullet list."],["💡","<b>Personal Ideas</b> — one idea per line, shown as bullets."],["🎯","<b>Goals</b> — hashtag each one: <b>#short</b> = weeks, <b>#medium</b> = 1–3 months, <b>#long</b> = a year or more."],["💬","<b>Quotes</b> — save quotes you live by and star your top 3 favourites."],["🔒","<b>Lock</b> makes the whole profile read-only; Unlock to edit again."]]},{id:"history",icon:"🕘",title:"History tab",summary:"Calendar of past days and exporting",steps:[["🗓️","History shows a month calendar colour-coded by each day’s score."],["👆","Tap any day to jump straight into that day’s report."],["📤","<b>Select & Export</b> picks a date range and exports it as <b>Excel / JSON / PDF</b> — a later import adds it back as locked history."],["☰","The list below shows recent reports with their grades."]]},{id:"activities",icon:"📊",title:"Activities tab",summary:"Charts over a week, month or year",steps:[["📊","The Activities tab charts your weekly score and progress per category."],["🗓️","Switch between <b>Week / Month / Year</b> and use <b>‹ ›</b> to step back in time."],["📝","Below the chart, <b>Noted days</b> is a month calendar of every day that carries a note — marked days have a gold dot. Press one and its date and note appear right under the calendar; use ‹ › to move between months."],["🎨","Each category keeps its chosen colour everywhere — charts, badges and cards."]]},{id:"rewards",icon:"🏆",title:"Goals & Rewards",summary:"Streak goals, tiers and badges",steps:[["➕","In Settings → Goals &amp; Rewards tap <b>Add goal</b>."],["🎯","Pick the target: a <b>habit or pinned-task streak of N days</b>, <b>N perfect (100%) days</b>, or a <b>List of tasks goal</b> (a checklist — no target needed)."],["📝","<b>List of tasks goal</b>: no target needed — in the goal form the <b>Attach tasks</b> picker lists <b>Archived</b> and <b>Undone</b> tasks to tick onto the goal. More can be added later from the task form’s <b>Select Goal</b>, <b>Attach to Goal List</b> when editing a task, or the goal card. When every task is done the goal shows <b>Done</b> and locks itself."],["🔁","A goal task whose title matches one of your <b>pinned tasks</b> shows that task’s <b>repeat times</b> — e.g. <b>↻ Mon, Wed, Fri · 3×/week</b> — and its days as chips. Tick <b>every pinned day</b> before the task counts as done; the row’s ✓ only clears it again."],["⛔","Locking a list goal manually before its tasks are finished <b>terminates</b> it — locked goals take no new tasks until you unlock."],["🥇","Choose the tier — <b>Iron, Bronze, Silver or Gold</b> — and write the reward title you’ll earn."],["🎁","Progress bars track each goal; earned rewards become <b>badges</b> on Today’s Rewards strip. A badge only exists while its goal is still complete — un-tick a task or break a streak and it drops back to <b>Not earned yet</b>, and returns when you earn it again."],["🏆","Any day that reaches 100% wins the <b>Gold Cup</b> on the spot."]]},{id:"cats",icon:"🗂️",title:"Categories & tags",summary:"Custom categories, colours, goals and tags",steps:[["🌈","Settings → <b>Categories</b>: add your own, tap one to open it, and pick its colour."],["📝","Type the category’s <b>goals</b> as bullet points and press Save — they reach forms, Activities and exports."],["🏷️","Tags group habits and tasks. From Settings → <b>Tags</b> you can rename or delete a tag everywhere at once."],["➕","New tags are added inside any habit or task form, or from the Tags section itself."]]},{id:"backup",icon:"💾",title:"Backup, updates & install",summary:"Keeping your data safe and the app fresh",steps:[["📁","Settings → <b>Data backup</b>: choose a folder once (desktop Chrome/Edge) and <b>Export backup now</b> saves a JSON straight into it."],["📥","<b>Import backup</b> accepts full backups (<b>second-mind-backup-*.json</b>) or month/week exports, which are added as locked history."],["🔄","<b>Check for updates</b> installs the newest version in place — a backup is saved first. Only this check needs internet."],["📲","<b>Install app</b> puts Second Mind on your home screen as a fullscreen offline app."]]},{id:"locking",icon:"🔐",title:"Locking & unlocking days",summary:"Auto-lock, submit and batch unlock",steps:[["⏰","Set the <b>auto-lock time</b> in Settings → Report lock; after that time today locks itself."],["🚫","A locked day is read-only, and anything unchecked already counted as <b>Missed</b> at lock time."],["📅","Settings → <b>Locked reports</b>: red days are locked, green days are open."],["☝️","Tap days to select them, then <b>Lock</b> or <b>Unlock</b> them all in one go."]]}];function wi(t){return`<div class="tut-steps">${t.map(e=>`
        <div class="tut-step">
          <span class="tut-step-ico" aria-hidden="true">${e[0]}</span>
          <p>${e[1]}</p>
        </div>`).join("")}</div>`}function Si(){return`
    <div class="tut-grid">
      ${$i.map(t=>{const e=te===t.id;return`
          <article class="tut-card ${e?"open":""}">
            <button type="button" class="tut-head" data-action="open-tutorial" data-id="${t.id}" aria-expanded="${e?"true":"false"}">
              <span class="tut-ico" aria-hidden="true">${t.icon}</span>
              <span class="tut-titles">
                <span class="tut-title">${g(t.title)}</span>
                <span class="tut-summary">${g(t.summary)}</span>
              </span>
              <span class="tut-chev" aria-hidden="true">${e?"▾":"▸"}</span>
            </button>
            ${e?`<div class="tut-body">${wi(t.steps)}</div>`:""}
          </article>
        `}).join("")}
    </div>
  `}function Xa(t){if(!t||t.kind!=="task-list")return"";const e=t.tasks||[];return e.length>0&&e.every(i=>l.goalTaskDone(i))?`Done ✅${t.locked?" 🔒":""}`:t.terminated?`Terminated ⛔${t.locked?" 🔒":""}`:t.locked?`Locked${t.locked?" 🔒":""}`:"Open"}function Ai(t){const{pin:e,slots:a}=t,i=a.map(s=>s.label);return e.mode==="forever"?"↻ Every day · 1×/day":e.mode==="until"?`↻ ${i.join(", ")}`:e.mode==="weekly"?`↻ ${i.join(", ")} · ${a.length}×/week`:e.mode==="monthly"?`↻ ${i.join(", ")} · ${a.length}×/month`:e.mode==="yearly"?`↻ ${i.join(", ")} · ${a.length}×/year`:`↻ ${i.join(", ")} · ${a.length} date${a.length===1?"":"s"}`}function xi(t,e,a){const i=l.goalTaskDone(e),s=l.goalTaskSchedule(e),n=Array.isArray(e.checked)?e.checked:[],r=a?'disabled title="Unlock the goal to edit its tasks"':"";return`
    <div class="goal-task-row ${i?"done":""}">
      <div class="goal-task-head">
        <button type="button" class="goal-task-check ${i?"on":""}" data-action="toggle-goal-item" data-id="${t.id}" data-item="${e.id}" data-done="${i?"true":"false"}" ${r} aria-label="${i?"Mark not done":"Mark done"}">${i?"✓":""}</button>
        <span class="goal-task-title">${g(e.title)}</span>
        ${a?"":`<button class="mini-btn" data-action="remove-goal-item" data-id="${t.id}" data-item="${e.id}" title="Remove from goal" aria-label="Remove from goal">✕</button>`}
      </div>
      ${s?`
            <div class="goal-task-repeat">
              <span class="repeat-line">${Ai(s)} — tick all ${s.slots.length} to finish</span>
              <div class="repeat-chips">
                ${s.slots.map(o=>{const d=n.includes(o.key);return`<button type="button" class="repeat-chip ${d?"on":""}" data-action="toggle-goal-slot" data-id="${t.id}" data-item="${e.id}" data-slot="${g(o.key)}" data-on="${d?"true":"false"}" aria-pressed="${d?"true":"false"}" ${r}>${d?"✓ ":""}${g(o.label)}</button>`}).join("")}
              </div>
            </div>
          `:""}
    </div>
  `}function Ti(t){const e=t.tasks||[],a=e.filter(f=>l.goalTaskDone(f)).length,i=e.length>0&&a===e.length,s=!!t.locked,n=!!t.terminated,r=!s&&!n,o=Xa(t),d=e.length?Math.round(a/e.length*100):0,c=i?"gstatus-done":n?"gstatus-term":s?"gstatus-locked":"gstatus-open",m=l.getBadges().some(f=>f.goalId===t.id);return`
    <article class="manage-card task-list-goal ${i?"goal-earned":""}">
      <div class="section-head">
        <div>
          <div class="item-title">${se(t.tier)} ${g(t.title)} <span class="gstatus ${c}">${o}</span></div>
          <div class="item-meta">“${g(t.rewardTitle)}” · ${a}/${e.length} tasks · ${m?"Badge earned ✓":"Not earned yet"}${i?" · All done ✓":n?" · list closed":""}</div>
          <div class="bar"><span style="width:${d}%"></span></div>
        </div>
        <div class="mini-actions">
          ${s?"":`<button class="mini-btn on" data-action="open-edit-goal" data-id="${t.id}">Edit</button>`}
          ${s?`<button class="mini-btn" data-action="unlock-goal" data-id="${t.id}" title="Unlock to edit the goal${n?" (terminated goals still take no new tasks)":""}">🔓 Unlock</button>`:`<button class="mini-btn" data-action="lock-goal" data-id="${t.id}"${e.length&&!i?' title="Lock now — an unfinished goal stays terminated"':""}>🔒 Lock</button>`}
          <button class="mini-btn" data-action="remove-goal" data-id="${t.id}">✕</button>
        </div>
      </div>
      <div class="goal-task-list">
        ${e.length?e.map(f=>xi(t,f,s)).join(""):'<p class="item-meta">No tasks yet — add the first one below, or attach tasks from the task form (Select Goal).</p>'}
      </div>
      ${r?`
            <div class="goal-task-add">
              <input id="goal-item-input-${t.id}" maxlength="120" placeholder="New task for this goal…" aria-label="New task for ${g(t.title)}" />
              <button class="primary-btn compact-btn" data-action="add-goal-item" data-id="${t.id}">Add</button>
            </div>
          `:n?'<p class="item-meta">⛔ Terminated before the list was finished — no more tasks can be added, even after unlocking.</p>':'<p class="item-meta">🔒 Goal is done — unlock it to add or edit tasks.</p>'}
    </article>
  `}function Y(t,{icon:e,title:a,hint:i},s){const n=It.has(t);return`
    <section class="settings-sec ${n?"open":""}">
      <button type="button" class="settings-sec-head" data-action="toggle-settings-section" data-id="${t}" aria-expanded="${n?"true":"false"}">
        <span class="settings-sec-ico" aria-hidden="true">${e}</span>
        <span class="settings-sec-titles">
          <span class="settings-sec-name">${a}</span>
          ${i?`<span class="settings-sec-hint">${i}</span>`:""}
        </span>
        <span class="settings-sec-chev" aria-hidden="true">${n?"▾":"▸"}</span>
      </button>
      ${n?`<div class="settings-sec-body">${s}</div>`:""}
    </section>
  `}function Di(){const t=l.getSettings(),e=l.getAllHabits(),a=l.getPinnedHabits(),i=[...a,...e.filter(o=>!o.pin)],s=l.getArchivedHabits(),n=l.getPinnedTasks(),r=l.lockedReports();return`
    <div class="topbar">
      <div>
        <p class="kicker">Admin rules</p>
        <h1>Settings</h1>
      </div>
      <button class="ghost-btn compact ${ut?"on":""}" data-action="toggle-settings-edit" aria-pressed="${ut}">${ut?"Done":"Edit Mode"}</button>
    </div>
    <p class="muted tight settings-sec-lead">Sections are closed by default — tap a title to open and edit it.</p>

    ${Y("tutorials",{icon:"📚",title:"Tutorials",hint:"Illustrated guide to the app & its usage"},Si())}

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
          ${[0,1,2,3,4,5,6].map(o=>{const d=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];return`<option value="${o}" ${l.getWeekStart()===o?"selected":""}>${d[o]}</option>`}).join("")}
        </select>
      </label>
      <p class="item-meta">Applies to the Week tab, week exports, and pin calendars.</p>
    `)}

    ${Y("appearance",{icon:"🎨",title:"Appearance",hint:l.getTheme()==="dark"?"🌙 Dark mode":"☀️ Light mode"},`
      <p class="muted tight">Pick Dark or Light mode. It applies everywhere, instantly.</p>
      <div class="chip-row">
        <button type="button" class="chip ${l.getTheme()==="dark"?"on":""}" data-action="set-theme" data-theme="dark">🌙 Dark</button>
        <button type="button" class="chip ${l.getTheme()==="light"?"on":""}" data-action="set-theme" data-theme="light">☀️ Light</button>
      </div>
    `)}

    ${Y("install",{icon:"📲",title:"Install app",hint:window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches?"Installed ✓":"Add to home screen"},`
      <p class="muted tight">Put Second Mind on your home screen for fullscreen offline use. Open it over http://localhost or https — it cannot install from a file:// page.</p>
      ${window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches?'<p class="item-meta">Installed — running as app ✓</p>':'<button class="primary-btn full" data-action="install-app">Install Second Mind</button>'}
    `)}

    ${Y("updates",{icon:"🔄",title:"App updates",hint:`${le?"Update ready":g(oa)}`},`
      <p class="muted tight">The app works fully offline. Only checking for updates needs internet. Tapping Check for updates installs the newest version automatically (a JSON backup of your data is saved first). Your data stays on this device.</p>
      <p class="item-meta">Version: ${g(oa)}</p>
      <p class="item-meta">📅 ${g(li())}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
        <button class="primary-btn" data-action="check-updates" ${rt?"disabled":""}>${rt?"Checking…":"Check for updates"}</button>
        ${le?'<button class="primary-btn" data-action="apply-update">Restart with update</button>':""}
      </div>
      <p class="item-meta">${g(dt)}</p>
    `)}

    ${Y("backup",{icon:"💾",title:"Data backup",hint:ci()},`
      <p class="muted tight"><b>Auto-save:</b> pick a folder once (Chrome/Edge on desktop) and every change is written straight to <b>second-mind.json</b> inside it — your data lives on disk and no longer depends on browser storage. The browser keeps only a fast copy; if it is ever cleared, choose the same folder again and everything comes back. On phones no folder is available, so data stays in the browser — use Export backup there. Import accepts full backups (<b>second-mind-backup-*.json</b>) or month/week report exports, which are added as locked history.</p>
      <p class="item-meta">${g(ui())}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
        ${l.folderStatus()==="prompt"||l.folderStatus()==="denied"?'<button class="primary-btn" data-action="grant-folder">Allow access</button>':""}
        ${l.folderStatus()==="unsupported"?"":l.getFolderHandle()?'<button class="ghost-btn compact" data-action="choose-folder">Change folder</button><button class="ghost-btn compact" data-action="forget-folder">Unlink</button>':'<button class="primary-btn" data-action="choose-folder">Choose data folder</button>'}
        <button class="primary-btn" data-action="backup-now">Export backup now</button>
        <button class="ghost-btn compact" data-action="trigger-import">Import backup</button>
      </div>
      <input type="file" id="backup-file" accept="application/json,.json" hidden />
      <div id="folder-backup-list" style="margin-top:10px"></div>
    `)}

    ${Y("categories",{icon:"🗂️",title:"Categories",hint:`${l.getCategories().length}`},`
      <p class="muted tight">Add your own categories — they appear in forms, Activities and exports. Tap a category to open it, set its colour, then type its goals as bullet points and press Save.</p>
      <div class="cat-expand-row">
        <button class="mini-btn" data-action="expand-cats">Expand all</button>
        <button class="mini-btn" data-action="collapse-cats">Collapse all</button>
      </div>
      <div class="habit-manage">
        ${l.getCategories().map(o=>{const d=l.getCustomCategories().some(S=>S.id===o.id),c=o.color||O(o.id),m=o.goals||"",f=jt(m),p=xt.has(o.id)?xt.get(o.id):m,k=Bt(jt(p))!==Bt(f),A=ct.has(o.id);return`
              <article class="manage-card cat-manage-card ${A?"open":""}">
                <div class="cat-manage-head">
                  <button type="button" class="cat-manage-toggle" data-action="toggle-cat" data-id="${o.id}" aria-expanded="${A?"true":"false"}" aria-controls="cat-editor-${o.id}">
                    <span class="cat-chevron" aria-hidden="true">${A?"▾":"▸"}</span>
                    <i class="cat-swatch" style="background:${g(c)}"></i>
                    <span class="cat-manage-name">${g(nt(o.id))}</span>
                    ${f.length?`<span class="cat-goal-flag">${f.length} goal${f.length===1?"":"s"}</span>`:""}
                  </button>
                  <div class="mini-actions">
                    ${d?`<button class="mini-btn on" data-action="rename-category" data-id="${o.id}">Rename</button>`:""}
                    ${d?`<button class="mini-btn" data-action="delete-category" data-id="${o.id}">✕</button>`:""}
                  </div>
                </div>
                ${A?`
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
                    `:f.length?`<ul class="note-list cat-goal-preview">${f.map(S=>`<li>${g(S)}</li>`).join("")}</ul>`:'<p class="item-meta">No goals yet — open this category to add some.</p>'}
              </article>
            `}).join("")}
      </div>
      <div style="display:flex;gap:8px;margin-top:10px">
        <input id="new-category" maxlength="30" placeholder="New category name…" style="flex:1;min-width:0" />
        <button class="primary-btn compact-btn" data-action="add-category">Add</button>
      </div>
    `)}

    ${Y("tags",{icon:"🏷️",title:"Tags",hint:`${l.getAllTags().length}`},`
      <p class="muted tight">Rename a tag everywhere at once, or delete it from all habits and tasks. New tags are added inside any habit/task form.</p>
      <div class="habit-manage">
        ${(()=>{const o=l.getAllTags();return o.length?o.map(({tag:d,count:c})=>`
              <article class="manage-card">
                <div class="section-head">
                  <div>
                    <div class="item-title">#${g(d)}</div>
                    <div class="item-meta">Used ${c} time${c===1?"":"s"}</div>
                  </div>
                  <div class="mini-actions">
                    <button class="mini-btn on" data-action="rename-tag" data-tag="${g(d)}">Rename</button>
                    <button class="mini-btn" data-action="delete-tag" data-tag="${g(d)}">✕</button>
                  </div>
                </div>
              </article>
            `).join(""):'<div class="empty">No tags yet — add some in a habit or task form.</div>'})()}
      </div>
      <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">
        <select id="tag-habit-pick" style="flex:1;min-width:0">
          ${l.getAllHabits().map(o=>`<option value="${o.id}">${g(o.name)}</option>`).join("")}
        </select>
        <input id="new-tag" maxlength="20" placeholder="New tag…" style="flex:1;min-width:0" />
        <button class="primary-btn compact-btn" data-action="add-tag">Add</button>
      </div>
    `)}

    ${Y("goals",{icon:"🏅",title:"Goals & Rewards",hint:`${l.getGoals().length} goals · ${l.getBadges().length} badges`},`
      <div class="section-head goals-intro">
        <p class="muted tight" style="max-width:270px">Do a habit / pinned task N days in a row, or collect N perfect (100%) days — earn an Iron, Bronze, Silver or Gold badge with your own title.</p>
        <button class="ghost-btn compact" data-action="open-goal">Add goal</button>
      </div>
      <div class="habit-manage">
        ${l.getGoals().length?l.getGoals().map(o=>{var f,p;if(o.kind==="task-list")return Ti(o);const d=l.goalProgress(o,v),c=l.getBadges().some(k=>k.goalId===o.id),m=o.kind==="habit-streak"?((f=l.findHabit(o.targetId))==null?void 0:f.name)||"Deleted habit":o.kind==="task-streak"?((p=l.findPinnedTask(o.targetId))==null?void 0:p.title)||"Deleted task":"Any day at 100%";return`
                    <article class="manage-card goal-card ${c?"goal-earned":""}">
                      <div class="section-head">
                        <div>
                          <div class="item-title">${se(o.tier)} ${g(o.title)}</div>
                          <div class="item-meta">${Ca(o.tier)} · “${g(o.rewardTitle)}” · ${g(m)}</div>
                          <div class="item-meta">${d.current}/${d.target} days · ${c?"Earned ✓":"Not earned yet"}</div>
                          <div class="bar"><span style="width:${Math.min(100,Math.round(d.current/d.target*100))}%"></span></div>
                        </div>
                        <div class="mini-actions">
                          <button class="mini-btn on" data-action="open-edit-goal" data-id="${o.id}">Edit</button>
                          <button class="mini-btn" data-action="remove-goal" data-id="${o.id}">✕</button>
                        </div>
                      </div>
                    </article>
                  `}).join(""):'<div class="empty">No goals yet. Tap Add goal to create your first reward.</div>'}
      </div>
      ${l.getBadges().length?`
            <div class="section-head" style="margin-top:14px"><h2>Earned badges</h2></div>
            <div class="rewards-grid">
              ${l.getBadges().map(o=>`
                <article class="reward-card tier-${o.tier}">
                  <div class="reward-medal">${se(o.tier)}</div>
                  <div>
                    <div class="item-title">${g(o.rewardTitle||o.title)}</div>
                    <div class="item-meta">${g(o.title)} · ${j((o.earnedAt||"").slice(0,10))}</div>
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
      ${ti(r)}
      ${R.length?`
        <div class="chip-row" style="margin-top:10px">
          ${[...R].sort().map(o=>`<button type="button" class="chip on" data-action="toggle-locked-day" data-date="${o}" title="Tap to remove">${o} ✕</button>`).join("")}
        </div>
        <div style="display:flex;gap:8px;margin-top:10px">
          <button class="primary-btn" style="flex:1" data-action="lock-selected">🔒 Lock ${R.length} day${R.length===1?"":"s"}</button>
          <button class="ghost-btn" style="flex:1" data-action="unlock-selected">🔓 Unlock ${R.length} day${R.length===1?"":"s"}</button>
        </div>
      `:""}
    `)}

    ${Y("habits",{icon:"✅",title:"Habits",hint:`${i.length}`},`
      <div class="section-head">
        <p class="muted tight" style="max-width:280px">Tap a habit to see its activity. In Edit Mode, edit habits and reorder pinned habits.</p>
        <button class="ghost-btn compact" data-action="open-add-habit">Add</button>
      </div>
      <div class="habit-manage">
        ${i.length?i.map(o=>{const d=Zt.has(o.id),c=o.pin?a.findIndex(f=>f.id===o.id):-1,m=d?l.getHabitActivity(o.id,20):[];return`
                    <article class="manage-card setting-habit-card ${d?"open":""}" style="${o.pin?`border-left:4px solid ${O(o.category)}`:""}">
                      <div class="section-head">
                        <button type="button" class="setting-habit-toggle" data-action="toggle-setting-habit" data-id="${o.id}" aria-expanded="${d?"true":"false"}">
                          <span class="setting-habit-chevron" aria-hidden="true">${d?"▾":"▸"}</span>
                          <span class="setting-habit-heading">
                            <span class="item-title">${g(o.name)}</span>
                            <span class="item-meta">${ft(o.category)} · ${o.pin?At(o.pin):"Not pinned"} · +${o.points} pts ${t.showConscious!==!1?Number(o.consciousPoints)?`· 🧠 +${o.consciousPoints}`:"· No conscious pts":""} · ${pe(l.habitStreak(o.id,v))}</span>
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
                      ${d?`
                        <div class="setting-habit-details">
                          ${o.description?`<p class="item-desc">${g(o.description)}</p>`:'<p class="item-meta">No description yet.</p>'}
                          ${it(o.tags)}
                          <div class="setting-habit-activity">
                            <div class="item-title">Recent activity</div>
                            ${m.length?m.map(f=>`
                              <button type="button" class="setting-habit-activity-row" data-action="open-habit-activity-date" data-date="${f.date}">
                                <span>${j(f.date)}</span>
                                <span>${f.rating?`${f.rating}/5 · ${f.status}`:f.status}</span>
                                ${f.locked?'<span class="lock-badge">Locked</span>':""}
                              </button>
                            `).join(""):'<p class="item-meta">No recorded activity yet.</p>'}
                          </div>
                        </div>
                      `:""}
                    </article>
                  `}).join(""):'<div class="empty">No habits yet.</div>'}
      </div>
    `)}

    ${s.length?Y("deleted-habits",{icon:"🗑️",title:"Deleted habits",hint:`${s.length} — history kept`},`
      <p class="muted tight">Deleting a habit never erases history: days that already recorded it keep it and its points. Restore a habit to bring it back on future days.</p>
      <div class="habit-manage">
        ${s.map(o=>`
                    <article class="manage-card archived" style="border-left:4px solid ${O(o.category)}">
                      <div class="section-head">
                        <div>
                          <div class="item-title">${g(o.name)}</div>
                          <div class="item-meta">${ft(o.category)} · +${o.points} pts${o.pin?` · ${At(o.pin)}`:" · Pin ended"} · ${Fe(o.archivedAt)}</div>
                          ${o.description?`<p class="item-desc">${g(o.description)}</p>`:""}
                          ${it(o.tags)}
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
                    <article class="manage-card" style="border-left:4px solid ${O(o.category)}">
                      <div class="section-head">
                        <div>
                          <div class="item-title">${g(o.title)}</div>
                          <div class="item-meta">${ft(o.category)} · ${At(o.pin)} · +${o.points} pts</div>
                          ${o.description?`<p class="item-desc">${g(o.description)}</p>`:""}
                          ${it(o.tags)}
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
  `}function H(t){if(/^\d{4}-\d{2}$/.test(String(t||"")))return String(t);if(/^\d{4}-\d{2}-\d{2}$/.test(String(t||"")))return String(t).slice(0,7);const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}`}function vt(t,e){const[a,i]=String(t).split("-").map(Number),s=new Date(a,(i||1)-1+e,1);return`${s.getFullYear()}-${String(s.getMonth()+1).padStart(2,"0")}`}function Dt(t){const[e,a]=String(t).split("-").map(Number);return new Date(e,(a||1)-1,1).toLocaleDateString(void 0,{month:"long",year:"numeric"})}function he(){const t=l.getWeekStart(),e=pt.findIndex(a=>a.value===t);return e<=0?pt:[...pt.slice(e),...pt.slice(0,e)]}function be(t){const[e,a]=String(t).split("-").map(Number),s=(new Date(e,a-1,1).getDay()-l.getWeekStart()+7)%7,n=new Date(e,a,0).getDate(),r=[];for(let o=0;o<s;o++)r.push(null);for(let o=1;o<=n;o++)r.push(`${e}-${String(a).padStart(2,"0")}-${String(o).padStart(2,"0")}`);return r}function ha(t,e,a){const i=new Set(a||[]),s=be(e);return`
    <div class="pin-cal" data-cal="${t}">
      <div class="pin-cal-head">
        <button type="button" class="mini-btn" data-action="pin-cal-nav" data-target="${t}" data-dir="-1" aria-label="Previous month">‹</button>
        <b>${Dt(e)}</b>
        <button type="button" class="mini-btn" data-action="pin-cal-nav" data-target="${t}" data-dir="1" aria-label="Next month">›</button>
      </div>
      <div class="pin-cal-grid pin-cal-week">
        ${he().map(n=>`<span>${n.label.slice(0,1)}</span>`).join("")}
      </div>
      <div class="pin-cal-grid">
        ${s.map(n=>n?`<button type="button" class="pin-cal-day ${i.has(n)?"on":""}" data-action="toggle-pin-date" data-target="${t}" data-date="${n}">${Number(n.slice(8,10))}</button>`:"<span></span>").join("")}
      </div>
    </div>
  `}function Ci(t,e){const a=(t==null?void 0:t.mode)||"forever",i=(t==null?void 0:t.until)||"",s=((t==null?void 0:t.weekdays)||[]).map(Number),n=((t==null?void 0:t.monthDays)||[]).map(Number),r=Array.isArray(t==null?void 0:t.yearDays)?[...t.yearDays].sort():[],o=Array.isArray(t==null?void 0:t.customDates)?[...t.customDates].sort():[],d=Array.isArray(t==null?void 0:t.exceptDates)?[...t.exceptDates].sort():Array.isArray(t==null?void 0:t.exceptions)?[...t.exceptions].sort():[],c=e&&e._exceptCal||H(v),m=e&&e._customCal||H(v),f=e&&e._yearMonth||"01";return`
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
        ${pt.map(p=>`
            <button type="button" class="chip weekday ${s.includes(p.value)?"on":""}" data-action="toggle-weekday" data-day="${p.value}">
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
            ${Array.from({length:12},(p,k)=>k+1).map(p=>`<option value="${String(p).padStart(2,"0")}" ${f===String(p).padStart(2,"0")?"selected":""}>${new Date(2e3,p-1,1).toLocaleDateString(void 0,{month:"long"})}</option>`).join("")}
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
      ${ha("custom",m,o)}
      <div class="chip-row" style="margin-top:8px">
        ${o.length?o.map(p=>`<button type="button" class="chip on" data-action="toggle-pin-date" data-target="custom" data-date="${p}" title="Tap to remove">${p} ✕</button>`).join(""):'<span class="item-meta">No extra custom dates.</span>'}
      </div>
    </div>
    <div class="pin-exceptions" style="margin-top:4px">
      <p class="item-meta"><b style="color:var(--text)">Exceptions</b> — skip these days (tap days on the calendar). Applies to every repeat mode.</p>
      ${ha("except",c,d)}
      <div class="chip-row" style="margin-top:8px">
        ${d.length?d.map(p=>`<button type="button" class="chip on" data-action="toggle-pin-date" data-target="except" data-date="${p}" title="Tap to remove">${p} ✕</button>`).join(""):'<span class="item-meta">No exceptions.</span>'}
      </div>
    </div>
  `}function Pi(){if(!x)return"";if(x==="choose")return`
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
    `;if(x==="habit"||x==="task"||x==="edit-habit"||x==="edit-task"||x==="edit-pinned-task"){const t=x==="habit"||x==="edit-habit",e=x.startsWith("edit-"),a=$||{},i=a.category||(t?"physically":"mentally"),s=Math.max(0,Math.min(5,Number(a.rating)||0)),n=Array.isArray(a.tags)?a.tags.join(", "):a.tags||"",r=a.consciousPoints!=null?Number(a.consciousPoints):a.conscious!=null?Number(a.conscious):0;return`
      <div class="modal-backdrop open" data-action="close-modal">
        <form class="sheet" data-form="${x}" data-id="${a.id||""}">
          <div class="handle"></div>
          <h2>${e?"Edit":"New"} ${t?"habit":"task"}</h2>
          <div class="form" style="margin-top:14px">
            <label>
              ${t?"Habit name":"Task name"}
              <input name="title" required maxlength="60" value="${g(a.title||a.name||"")}" placeholder="${t?"Meditate":"Finish report"}" />
            </label>
            ${(()=>{const o=x==="edit-task";if(t||!(x==="task"||o)||!l.taskListGoals().length)return"";const d=o?l.openTaskListGoals():l.taskListGoals(),c=o?"Attach to Goal List":"Select Goal",m=o?"Not attached to a goal":"No goal — add to today's task list",f=o?"Picking a goal adds this task to that goal’s list as well (open goals only).":"A goal attached here puts the task on that goal’s list instead of today’s list.";return`
                <div>
                  <p class="item-meta">${c}</p>
                  ${o&&!d.length?'<p class="item-meta">No open list-of-tasks goals — unlock a goal first to attach to it.</p>':`
                  <label style="margin-top:6px">
                    Attach this task to a list-of-tasks goal (optional)
                    <select name="goalTarget">
                      <option value="">${m}</option>
                      ${d.map(p=>{const k=!p.locked;return`<option value="${p.id}" ${k?"":"disabled"}>${g(p.title)} — ${Xa(p)}</option>`}).join("")}
                    </select>
                  </label>`}
                  <p class="item-meta">${f}</p>
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
                      <button type="button" class="chip ${s===0?"on":""}" data-action="set-rating" data-rating="0">No rating</button>
                      ${[1,2,3,4,5].map(o=>`
                            <button type="button" class="chip ${s===o?"on":""}" data-action="set-rating" data-rating="${o}">${o}★</button>
                          `).join("")}
                    </div>
                    <input type="hidden" name="rating" value="${s}" />
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
                ${l.getCategories().map(o=>`
                    <button type="button" class="chip ${i===o.id?"on":""}" data-action="set-category" data-category="${o.id}">${g(o.label)}</button>
                  `).join("")}
              </div>
              <input type="hidden" name="category" value="${i}" />
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
    `}if(x==="export"){const t=$&&$.range||"day";return`
      <div class="modal-backdrop open" data-action="close-modal">
        <div class="sheet">
          <div class="handle"></div>
          <h2>Export report</h2>
          <p class="muted tight">Date: ${j(v)}. Pick a range, then a format.</p>
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
    `}if(x==="goal"||x==="edit-goal"){const t=x==="edit-goal",e=$||{},a=e.kind||"habit-streak",i=l.getAllHabits(),s=l.getPinnedTasks(),n=e.targetId||"",r=a==="task-list"?(e.tasks||[]).filter(c=>!l.goalTaskDone(c)).length:0,o=a==="task-list"?l.getArchivedTasks():[],d=a==="task-list"?l.undoneDayTasks():[];return`
      <div class="modal-backdrop open" data-action="close-modal">
        <form class="sheet" data-form="${x}" data-id="${e.id||""}">
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
                ${Da.map(c=>`<button type="button" class="chip ${a===c.id?"on":""}" data-action="set-goal-kind" data-kind="${c.id}">${c.label}</button>`).join("")}
              </div>
              <input type="hidden" name="kind" value="${a}" />
              ${a==="task-list"?'<p class="item-meta">No target needed — pick the tasks to attach below. You can add more later from the task form (Select Goal) or inside Goals &amp; Rewards.</p>':""}
            </div>
            <div class="goal-attach" style="${a==="task-list"?"":"display:none"}">
              <p class="item-meta"><b style="color:var(--text)">Attach tasks</b> — tick the tasks that belong to this goal's list${r?` · already on the goal: ${r} unfinished`:""}.</p>
              ${(()=>{const c=(m,f,p)=>{const k=f.map(A=>{const S=String(A.title||"").trim();if(!S)return"";const y=A.category?`${A.category.charAt(0).toUpperCase()}${A.category.slice(1)}${A.date?` · ${A.date}`:""}`:A.date||"";return`
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
                  `};return`${c("Archived tasks",o,"No archived tasks yet.")}${c("Undone tasks",d,"No undone day tasks.")}`})()}
            </div>
            <label class="goal-target-habit" style="${a==="habit-streak"?"":"display:none"}">
              Habit
              <select name="habitTarget">
                ${i.map(c=>`<option value="${c.id}" ${n===c.id?"selected":""}>${g(c.name)}</option>`).join("")}
              </select>
            </label>
            <label class="goal-target-task" style="${a==="task-streak"?"":"display:none"}">
              Pinned task
              <select name="taskTarget">
                ${s.length?s.map(c=>`<option value="${c.id}" ${n===c.id?"selected":""}>${g(c.title)}</option>`).join(""):'<option value="">No pinned tasks yet</option>'}
              </select>
            </label>
            <label class="goal-target-days" style="${a==="task-list"?"display:none":""}">
              Number of days
              <input name="targetDays" type="number" min="1" max="365" value="${e.targetDays||7}" />
            </label>
            <div>
              <p class="item-meta">Badge</p>
              <div class="chip-row goal-tier-row">
                ${_t.map(c=>`<button type="button" class="chip ${(e.tier||"bronze")===c.id?"on":""}" data-action="set-goal-tier" data-tier="${c.id}">${c.medal} ${c.label}</button>`).join("")}
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
    `}if(x==="pin"){const{kind:t,id:e,title:a,pin:i}=$||{};return`
      <div class="modal-backdrop open" data-action="close-modal">
        <form class="sheet sheet-wide" data-form="pin" data-kind="${t}" data-id="${e}">
          <div class="handle"></div>
          <h2>Pin ${t==="habit"?"habit":"task"}</h2>
          <p class="muted tight">${g(a||"")}</p>
          <div class="form" style="margin-top:14px">
            ${Ci(i,$)}
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
          <p class="muted tight">${g(a||"")}</p>
          <p class="item-meta">From ${g(i||v)} — a copy will be created on the day you pick, marked “↩ Forwarded from ${g(i||v)}”.</p>
          <div class="form" style="margin-top:14px">
            <label>
              Forward to day
              <input name="targetDate" type="date" required value="${zs(i||v)}" />
            </label>
            <button class="primary-btn" type="submit">Forward task →</button>
            <button class="ghost-btn" type="button" data-action="close-modal">Cancel</button>
          </div>
        </form>
      </div>
    `}if(x==="replace"){const{id:t,title:e,from:a,info:i}=$||{},s=i&&i.days||[];return`
      <div class="modal-backdrop open" data-action="close-modal">
        <form class="sheet" data-form="replace" data-id="${t}">
          <div class="handle"></div>
          <h2>Replace habit day</h2>
          <p class="muted tight">${g(e||"")}</p>
          <p class="item-meta">Currently due on <b>${g(a||v)}</b>. Its next direct day is <b>${g(i&&i.next||"")}</b>, so the day may only move to one of the ${s.length} day${s.length===1?"":"s"} in between — the allowable replace days.</p>
          <div class="form" style="margin-top:14px">
            <div class="replace-day-grid">
              ${s.map(n=>`<button type="button" class="chip replace-day-chip" data-action="pick-replace-day" data-date="${n}">${g(n)}</button>`).join("")}
            </div>
            <input type="hidden" name="targetDate" value="${s[0]||""}" />
            <button class="primary-btn" type="submit" ${s.length?"":"disabled"}>Replace day ⇄</button>
            <button class="ghost-btn" type="button" data-action="close-modal">Cancel</button>
          </div>
        </form>
      </div>
    `}if(x==="image"){const{image:t,title:e}=$||{};return t?`
      <div class="lightbox-backdrop" data-action="close-modal">
        <img src="${t}" alt="${g(e||"Task photo")}" />
        <button type="button" class="ghost-btn compact lightbox-close" data-action="close-modal">✕ Close</button>
      </div>
    `:""}return""}function b(){if($e){ze();try{const t=l.isLocked(v);$e.innerHTML=`
    <div class="app-shell">
      <main class="screen active">
        ${I==="today"?Vs():""}
        ${I==="profile"?Qs():""}
        ${I==="history"?si():""}
        ${I==="habits"?di():""}
        ${I==="settings"?Di():""}
      </main>
      ${["today","habits"].includes(I)&&!t?'<button class="fab" data-action="open-add" aria-label="Add">+</button>':""}
      ${I==="settings"?'<button class="fab" data-action="open-add-habit" aria-label="Add habit">+</button>':""}
      <nav class="tabbar tabs-5">
        <button class="tab ${I==="today"?"active":""}" data-screen="today">${E("home")}Today</button>
        <button class="tab ${I==="profile"?"active":""}" data-screen="profile">${E("profile")}Profile</button>
        <button class="tab ${I==="history"?"active":""}" data-screen="history">${E("history")}History</button>
        <button class="tab ${I==="habits"?"active":""}" data-screen="habits">${E("habit")}Activities</button>
        <button class="tab ${I==="settings"?"active":""}" data-screen="settings">${E("settings")}Settings</button>
      </nav>
    </div>
    ${Pi()}
    <div class="toast" id="toast"></div>
  `,Li(),Xs(),Hi(),Ii(),Pt(),Ei()}catch(t){const e=t&&t.stack?String(t.stack).slice(0,400):t&&t.message?t.message:"Unknown error";$e.innerHTML=`<div class="app-shell"><section class="manage-card"><h2>Could not load (Error B)</h2><p class="muted tight">${g(e)}</p><button class="primary-btn full" data-action="reload-app">Reload</button></section></div>`}}}function Ei(){if(x!=="habit"&&x!=="task")return;const t=document.querySelector(".sheet");t&&(t.scrollTop=0);const e=document.querySelector('.sheet input[name="title"]');if(e)try{e.focus({preventScroll:!0})}catch{try{e.focus()}catch{}}}function Li(){const t=document.getElementById("day-note");t&&t.addEventListener("input",()=>{l.isLocked(v)||l.setNote(v,t.value)})}const Ni=3e3,Mi=180,ba=10,T={list:null,card:null,timer:null,startX:0,startY:0,dragging:!1,order0:"",swallowClick:!1,fromHandle:!1,bound:!1};function Oe(){T.timer&&(clearTimeout(T.timer),T.timer=null),T.card=null,T.fromHandle=!1}function Za(t,e){return[...t.querySelectorAll(".item-card[data-sortable]")].filter(a=>a.dataset.sortable===e).map(a=>a.dataset.id)}function ya(t){const e=T.card,a=T.list;if(Oe(),T.list=null,T.dragging=!1,!e||(e.classList.remove("is-dragging"),a&&a.classList.remove("is-reordering"),document.body.classList.remove("is-reordering-body"),!t))return;const i=e.dataset.sortable,s=Za(a,i);s.join("|")!==T.order0&&(T.swallowClick=!0,setTimeout(()=>{T.swallowClick=!1},400),i==="habit"?(l.setHabitOrder(s),l.setHabitSort("custom")):i==="task"&&(l.setTaskOrder(v,s),l.setTaskSort("custom")),b(),h("Order saved"))}function Ii(){T.bound||(T.bound=!0,document.addEventListener("pointerdown",t=>{if(t.button!=null&&t.button!==0||t.target.closest("input, textarea, select, img, video, .stars, .mini-btn, .check, .fab, .tabbar"))return;const e=t.target.closest(".item-card[data-sortable]");if(!e)return;const a=e.closest(".list");if(!a||l.isLocked(v))return;const i=e.dataset.sortable,s=l.getSettings(),n=(i==="habit"?s.habitSort:s.taskSort)||"default";n!=="default"&&n!=="custom"&&(i==="habit"?l.setHabitSort("custom"):l.setTaskSort("custom"),h("Switched to Custom order so your drag sticks"));const r=t.target.closest(".drag-handle");r&&t.preventDefault(),Oe(),T.list=a,T.card=e,T.fromHandle=!!r,T.startX=t.clientX,T.startY=t.clientY,T.order0=Za(a,i).join("|"),T.timer=setTimeout(()=>{T.timer=null,!(!T.card||!T.card.isConnected)&&(T.dragging=!0,navigator.vibrate&&navigator.vibrate(15),T.card.classList.add("is-dragging"),T.list.classList.add("is-reordering"),document.body.classList.add("is-reordering-body"),h("Drag to reorder, lift to drop"))},r?Mi:Ni)},!0),document.addEventListener("pointermove",t=>{if(T.timer&&T.card&&!T.fromHandle&&(Math.abs(t.clientX-T.startX)>ba||Math.abs(t.clientY-T.startY)>ba)){Oe(),T.list=null;return}if(!T.dragging||!T.card)return;t.preventDefault();const e=T.card,a=T.list;if(!a)return;const i=t.clientY,s=e.dataset.sortable,n=[...a.querySelectorAll(".item-card[data-sortable]")].filter(o=>o!==e&&o.dataset.sortable===s);let r=!1;for(const o of n){const d=o.getBoundingClientRect();if(i<d.top+d.height/2){a.insertBefore(e,o),r=!0;break}}r||a.appendChild(e)},{passive:!1}),document.addEventListener("pointerup",()=>ya(T.dragging)),document.addEventListener("pointercancel",()=>ya(!1)),document.addEventListener("contextmenu",t=>{(T.dragging||T.card)&&t.preventDefault()}),document.addEventListener("touchmove",t=>{T.dragging&&t.preventDefault()},{passive:!1}),document.addEventListener("click",t=>{T.swallowClick&&(t.stopPropagation(),t.preventDefault())},!0))}function Hi(){const t=document.getElementById("lock-time"),e=document.getElementById("auto-lock");t&&t.addEventListener("change",()=>{l.setLockTime(t.value),h(`Lock time set to ${t.value}`),b()}),e&&e.addEventListener("change",()=>{l.setAutoLock(e.checked),h(e.checked?"Auto-lock on":"Auto-lock off"),b()}),document.querySelectorAll("[data-cat-color]").forEach(i=>{i.addEventListener("input",()=>{var n;l.updateCategory(i.dataset.catColor,{color:i.value});const s=(n=i.closest(".cat-manage-card"))==null?void 0:n.querySelector(".cat-swatch");s&&(s.style.background=i.value)})}),document.querySelectorAll("[data-cat-goals]").forEach(i=>{const s=()=>{const n=i.dataset.catGoals,r=i.closest(".cat-manage-card");if(!r)return;const o=jt((l.getCategories().find(p=>p.id===n)||{}).goals||""),d=Bt(jt(i.value))!==Bt(o),c=r.querySelector('[data-action="save-cat-goals"]');c&&(c.textContent=d?"Save goals":"Saved");const m=r.querySelector('[data-action="reset-cat-goals"]');m&&(m.hidden=!d);const f=r.querySelector(".cat-goal-hint");f&&(f.textContent=d?"Unsaved changes — press Save to keep them offline and in backups.":"Saved on this device and included in every backup.")};i.addEventListener("input",()=>{xt.set(i.dataset.catGoals,i.value),s()}),i.addEventListener("change",s)});const a=document.getElementById("backup-file");a&&a.addEventListener("change",()=>{const i=a.files[0];if(!i)return;const s=new FileReader;s.onload=()=>{Ja(String(s.result||""),i.name),a.value=""},s.onerror=()=>{h("Couldn't read that file."),a.value=""},s.readAsText(i)})}function h(t){const e=document.getElementById("toast");e&&(e.textContent=t,e.classList.add("show"),setTimeout(()=>e.classList.remove("show"),1800))}function Ye(){const t=l.getTheme();document.documentElement.dataset.theme=t;const e=document.querySelector('meta[name="theme-color"]');e&&(e.content=t==="light"?"#f3f1ea":"#0e1116")}function g(t){return String(t||"").split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;").split('"').join("&quot;")}function F(){return l.isLocked(v)?(h("This report is locked. Unlock it in Settings."),!0):!1}function Ve(t){return{mode:(t==null?void 0:t.mode)||"forever",until:(t==null?void 0:t.until)||"",weekdays:Array.isArray(t==null?void 0:t.weekdays)?t.weekdays.map(Number):[],monthDays:Array.isArray(t==null?void 0:t.monthDays)?t.monthDays.map(Number):[],yearDays:Array.isArray(t==null?void 0:t.yearDays)?[...t.yearDays]:[],customDates:Array.isArray(t==null?void 0:t.customDates)?[...t.customDates]:[],exceptDates:Array.isArray(t==null?void 0:t.exceptDates)?[...t.exceptDates]:Array.isArray(t==null?void 0:t.exceptions)?[...t.exceptions]:[]}}function Fi(t){const e=l.findHabit(t);e&&(x="pin",$={kind:"habit",id:t,title:e.name,pin:e.pin?Ve(e.pin):{mode:"forever",until:"",weekdays:[],monthDays:[],yearDays:[],customDates:[],exceptDates:[]},_exceptCal:H(v),_customCal:H(v),_yearMonth:"01"})}function Ri(t){const e=l.findTask(v,t);if(!e)return;const a=e.sourcePinId?l.findPinnedTask(e.sourcePinId):null;x="pin",$={kind:"task",id:t,title:e.title,pin:a!=null&&a.pin?Ve(a.pin):{mode:"forever",until:"",weekdays:[],monthDays:[],yearDays:[],customDates:[],exceptDates:[]},_exceptCal:H(v),_customCal:H(v),_yearMonth:"01"}}function Oi(t){const e=l.findPinnedTask(t);e&&(x="pin",$={kind:"template",id:t,title:e.title,pin:e.pin?Ve(e.pin):{mode:"forever",until:"",weekdays:[],monthDays:[],yearDays:[],customDates:[],exceptDates:[]},_exceptCal:H(v),_customCal:H(v),_yearMonth:"01"})}function ji(t){var c;const e=t.querySelector('input[name="mode"]').value,a=((c=t.querySelector('input[name="until"]'))==null?void 0:c.value)||"",i=[...t.querySelectorAll(".weekday.on")].map(m=>Number(m.dataset.day)),s=[...t.querySelectorAll(".monthday.on")].map(m=>Number(m.dataset.day)),n=$&&$.pin||{},r=Array.isArray(n.yearDays)?n.yearDays:[],o=Array.isArray(n.customDates)?n.customDates:[],d=Array.isArray(n.exceptDates)?n.exceptDates:[];return e==="until"&&!a?(h("Pick an until date"),null):e==="weekly"&&!i.length?(h("Pick at least one weekday"),null):e==="monthly"&&!s.length?(h("Pick at least one day of month"),null):e==="yearly"&&!r.length?(h("Add at least one yearly date"),null):e==="custom"&&!o.length?(h("Pick at least one custom date"),null):{mode:e,until:a,weekdays:i,monthDays:s,yearDays:r,customDates:o,exceptDates:d}}function Ct(t,e,a){const i=e instanceof Blob?e:new Blob([e],{type:a||"text/plain;charset=utf-8"}),s=URL.createObjectURL(i),n=document.createElement("a");n.href=s,n.download=t,document.body.appendChild(n),n.click(),setTimeout(()=>{document.body.removeChild(n),URL.revokeObjectURL(s)},500)}function Nt(t){const e=String(t??"");return/[",\n]/.test(e)?`"${e.replace(/"/g,'""')}"`:e}function Je(t,e){const[a,i]=l.resolveRange(t,e||v);return{range:t,start:a,end:i,rows:l.exportRows(a,i)}}function va(t,e){const a=t||$&&$.range||"day",{start:i,end:s,rows:n}=Je(a,e),r=[];r.push(["Second Mind export",`${i} to ${s}`].map(Nt).join(",")),r.push(["Date","Type","Name","Category","Tags","Points","Rating","Earned","ConsciousPts","Status","Note/Description"].map(Nt).join(",")),n.forEach(o=>{o.habits.forEach(d=>{r.push([o.date,"Habit",d.name,d.category,(d.tags||[]).join("|"),d.points,d.rating,d.earned,d.consciousPoints,d.status||(d.rating>0?"done":o.locked?"missed":"pending"),d.description||""].map(Nt).join(","))}),o.tasks.forEach(d=>{r.push([o.date,"Task",d.hasImage?`${d.title} [photo]`:d.title,d.category,(d.tags||[]).join("|"),d.points,d.rating||"",d.earned,"",d.status||(d.done?"done":o.locked?"missed":"pending"),d.description||""].map(Nt).join(","))}),r.push([o.date,"Summary",`Earned ${o.earned}/${o.max} (${o.percent}%)`,"","","","","","",o.locked?"locked":"open",o.note||""].map(Nt).join(","))}),Ct(`second-mind-${a}-${i}-to-${s}.csv`,"\uFEFF"+r.join(`
`),"text/csv;charset=utf-8"),h("Excel (CSV) exported")}function ka(t,e){const a=t||$&&$.range||"day",{start:i,end:s,rows:n}=Je(a,e),r={app:"Second Mind",exportedAt:new Date().toISOString(),range:a,start:i,end:s,days:n};Ct(`second-mind-${a}-${i}-to-${s}.json`,JSON.stringify(r,null,2),"application/json"),h("JSON exported")}function $a(t,e){const a=t||$&&$.range||"day",{start:i,end:s,rows:n}=Je(a,e),r=n.map(d=>`
        <section style="margin-bottom:18px;border:1px solid #ddd;border-radius:12px;padding:12px">
          <h2 style="margin:0 0 4px;font-size:16px">${g(d.date)} — ${d.earned}/${d.max} pts (${d.percent}%)</h2>
          <p style="margin:0 0 8px;font-size:12px;color:#555">Habits ${d.habitScore} + Conscious ${d.consciousScore} + Tasks ${d.taskScore} · ${d.locked?"Locked":"Open"}${d.note?` · Note: ${g(d.note)}`:""}</p>
          <table style="width:100%;border-collapse:collapse;font-size:12px">
            <thead><tr><th align="left">Type</th><th align="left">Name</th><th align="left">Category</th><th>Points</th><th>Rating</th><th>Earned</th><th>Status</th></tr></thead>
            <tbody>
              ${d.habits.map(c=>`<tr><td>Habit</td><td>${g(c.name)}${c.description?` (${g(c.description)})`:""}</td><td>${g(c.category)}</td><td align="center">${c.points}${c.consciousPoints?`+${c.consciousPoints}🧠`:""}</td><td align="center">${c.rating||"-"}/5</td><td align="center">${c.earned}</td><td align="center">${c.status||(c.rating>0?"done":d.locked?"missed":"pending")}</td></tr>`).join("")}
              ${d.tasks.map(c=>`<tr><td>Task</td><td>${g(c.title)}${c.hasImage?" 📷":""}${c.description?` (${g(c.description)})`:""}</td><td>${g(c.category)}</td><td align="center">${c.points}</td><td align="center">${c.rating?`${c.rating}/5`:"-"}</td><td align="center">${c.earned}</td><td align="center">${c.status||(c.done?"done":d.locked?"missed":"pending")}</td></tr>`).join("")}
            </tbody>
          </table>
        </section>
      `).join(""),o=window.open("","_blank");if(!o){h("Popup blocked — allow popups to export PDF");return}o.document.write(`<!DOCTYPE html><html><head><title>Second Mind ${i} to ${s}</title></head><body style="font-family:sans-serif;padding:24px"><h1>Second Mind — ${i} to ${s}</h1>${r}<script>window.onload=function(){window.print()}<\/script></body></html>`),o.document.close(),h("PDF print view opened")}document.addEventListener("click",t=>{const e=t.target.closest("[data-screen]");if(e){I=e.dataset.screen,b();return}const a=t.target.closest("[data-action]");if(!a)return;const i=a.dataset.action;if(i==="close-modal"){if(x==="image"){x=null,$=null,b();return}(t.target.classList.contains("modal-backdrop")||a.classList.contains("ghost-btn"))&&(x=null,$=null,b());return}if(i==="note-bullets"){ua("bullets");return}if(i==="note-numbered"){ua("numbered");return}if(i==="values-bullets"){pa("bullets");return}if(i==="values-numbered"){pa("numbered");return}if(i==="pick-task-image"){const s=document.getElementById("task-image-input");s?s.click():h("Photo picking needs a browser file picker");return}if(i==="remove-task-image"){$&&($._image="",b(),h("Photo removed — save to apply"));return}if(i==="view-task-image"){const s=l.findTask(v,a.dataset.id),n=s&&s.image?s.image:$&&($._image||$.image)||"";if(!n){h("No photo on this task");return}x="image",$={image:n,title:s&&s.title||"Task photo"},b();return}if(i==="prev-day"&&ra(-1),i==="next-day"&&ra(1),i==="reload-app"){window.location.reload();return}if(i==="set-theme"){const s=a.dataset.theme==="light"?"light":"dark";l.setTheme(s),Ye(),h(s==="light"?"Light mode on":"Dark mode on")}if(i==="install-app"){yi();return}if(i==="check-updates"){ki();return}if(i==="apply-update"){Qa();return}if(i==="backup-now"){fi();return}if(i==="trigger-import"){const s=document.getElementById("backup-file");s&&s.click();return}if(i==="choose-folder"){pi();return}if(i==="grant-folder"){gi();return}if(i==="forget-folder"){mi();return}if(i==="restore-backup"){bi(a.dataset.name);return}if(i==="goto-settings"&&(I="settings"),i==="open-add-habit"&&(x="habit",$=null),i==="open-add-task"){if(F())return;x="task",$={category:"mentally"}}if(i==="open-add"){if(F())return;x="choose",$={category:"mentally"}}if(i==="toggle-edit"&&(Q=!Q),i==="toggle-settings-edit"){ut=!ut,b();return}if(i==="toggle-setting-habit"){const s=a.dataset.id;Zt.has(s)?Zt.delete(s):Zt.add(s),b();return}if(i==="toggle-settings-section"){const s=a.dataset.id;It.has(s)?It.delete(s):It.add(s),s==="tutorials"&&!It.has("tutorials")&&(te=null),b();return}if(i==="open-tutorial"){te=te===a.dataset.id?null:a.dataset.id,b();return}if(i==="toggle-activity-cat"){const s=a.dataset.id;ee.has(s)?ee.delete(s):ee.add(s),b();return}if(i==="add-goal-item"){const s=a.dataset.id,n=document.getElementById(`goal-item-input-${s}`),r=l.addGoalItem(s,n?n.value:"");r.ok?h("Task added to goal"):h(r.reason||"Could not add a task"),b();return}if(i==="toggle-goal-item"){const{id:s,item:n,done:r}=a.dataset,o=l.setGoalItemDone(s,n,r!=="true");if(!o.ok){h(o.reason||"Could not update the task"),b();return}const d=o.awarded&&o.awarded.length?o.awarded:l.checkGoals(v);d.length?h(`🏅 Reward earned: ${d[0].rewardTitle}!`):o.revoked&&o.revoked.length?h("Badge returned — not earned yet"):o.autoLocked&&h("All tasks done — goal completed and locked 🔒"),b();return}if(i==="toggle-goal-slot"){const{id:s,item:n,slot:r,on:o}=a.dataset,d=l.setGoalItemSlot(s,n,r,o!=="true");if(!d.ok){h(d.reason||"Could not update the day"),b();return}const c=d.awarded||[];c.length?h(`🏅 Reward earned: ${c[0].rewardTitle}!`):d.autoLocked?h("All days ticked — goal completed and locked 🔒"):d.revoked&&d.revoked.length?h("Badge returned — not earned yet"):d.done&&h("Task complete ✓ — every pinned day ticked"),b();return}if(i==="remove-goal-item"){const s=l.removeGoalItem(a.dataset.id,a.dataset.item);h(s.ok?"Task removed from goal":s.reason||"Could not remove"),b();return}if(i==="lock-goal"){const s=l.findGoal(a.dataset.id),n=l.setGoalLocked(a.dataset.id,!0),r=s&&n.ok&&s.tasks.length>0&&!s.tasks.every(o=>l.goalTaskDone(o));n.ok?h(r?"Goal locked and terminated ⛔":"Goal locked 🔒"):h(n.reason||"Could not lock"),b();return}if(i==="unlock-goal"){const s=l.setGoalLocked(a.dataset.id,!1);h(s.ok?"Goal unlocked":s.reason||"Could not unlock"),b();return}if(i==="move-pinned-habit"){const s=l.getPinnedHabits(),n=s.findIndex(o=>o.id===a.dataset.id),r=n+(Number(a.dataset.dir)||0);if(n>=0&&r>=0&&r<s.length){const o=s[n];s[n]=s[r],s[r]=o,l.setPinnedHabitOrder(s.map(d=>d.id))}b();return}if(i==="move-pinned-task"){const s=l.getPinnedTasks(),n=s.findIndex(o=>o.id===a.dataset.id),r=n+(Number(a.dataset.dir)||0);if(n>=0&&r>=0&&r<s.length){const o=s[n];s[n]=s[r],s[r]=o,l.setPinnedTaskOrder(s.map(d=>d.id))}b();return}if(i==="open-habit-activity-date"){v=a.dataset.date,I="today",b();return}if(i==="open-edit-habit"){const s=l.findHabit(a.dataset.id);if(!s)return;x="edit-habit",$={id:s.id,name:s.name,description:s.description||"",points:s.points,category:s.category,tags:s.tags||[],consciousPoints:Number(s.consciousPoints)||0}}if(i==="open-edit-task"){if(F())return;const s=l.findTask(v,a.dataset.id);if(!s)return;x="edit-task",$={id:s.id,title:s.title,points:s.points,description:s.description,category:s.category,tags:s.tags||[],rating:Number(s.rating)||0,image:s.image||"",_image:void 0}}if(i==="open-edit-pinned-task"){const s=l.findPinnedTask(a.dataset.id);if(!s)return;x="edit-pinned-task",$={id:s.id,title:s.title,points:s.points,description:s.description||"",category:s.category,tags:s.tags||[],rating:0,image:s.image||"",_image:void 0}}if(i==="toggle-badges"&&(de=!de),i==="open-goal"&&(x="goal",$={kind:"habit-streak",targetDays:7,tier:"bronze"}),i==="open-edit-goal"){const s=l.getGoals().find(n=>n.id===a.dataset.id);if(!s)return;x="edit-goal",$={...s}}if(i==="remove-goal"&&(l.removeGoal(a.dataset.id),h("Goal removed")),i==="remove-badge"&&(l.removeBadge(a.dataset.id),h("Badge removed")),i==="rate-habit"){if(F())return;const n=l.habitRating(v,a.dataset.id)===Number(a.dataset.rating)?0:Number(a.dataset.rating);l.setHabitRating(v,a.dataset.id,n)}if(i==="rate-task"){if(F())return;const s=l.findTask(v,a.dataset.id);if(!s)return;const r=(Number(s.rating)||0)===Number(a.dataset.rating)?0:Number(a.dataset.rating);l.setTaskRating(v,a.dataset.id,r)}if(i==="open-export"&&(x="export",$={range:$&&$.range||"day"}),i==="set-export-range"){x="export",$={range:a.dataset.range||"day"},b();return}if(i==="do-export"){const s=a.dataset.format,n=$&&$.range||"day";s==="csv"&&va(n,v),s==="json"&&ka(n,v),s==="pdf"&&$a(n,v),x=null,$=null}if(i==="set-histexp-range"){_=["day","week","month","year"].includes(a.dataset.range)?a.dataset.range:"day",b();return}if(i==="histexp-do"){const s=a.dataset.format;let n=v;if(_==="day"||_==="week"){const r=document.getElementById("histexp-date");r&&/^\d{4}-\d{2}-\d{2}$/.test(r.value)&&(n=r.value)}else if(_==="month"){const r=document.getElementById("histexp-month");r&&/^\d{4}-\d{2}$/.test(r.value)&&(n=`${r.value}-15`)}else if(_==="year"){const r=document.getElementById("histexp-year"),o=Number(r&&r.value);Number.isInteger(o)&&o>=2e3&&o<=2100&&(n=`${String(o)}-06-15`)}s==="csv"&&va(_,n),s==="json"&&ka(_,n),s==="pdf"&&$a(_,n);return}if(i==="history-cal-nav"){const s=ce||H(v);ce=vt(s,Number(a.dataset.dir)||0),b();return}if(i==="locked-cal-nav"){const s=ue||H(v);ue=vt(s,Number(a.dataset.dir)||0),b();return}if(i==="notes-cal-nav"){const s=He||H(v);He=vt(s,Number(a.dataset.dir)||0),b();return}if(i==="show-day-note"){const s=a.dataset.date;if(!l.noteFor(s))return;yt=s,b();return}if(i==="toggle-locked-day"){const s=a.dataset.date,n=R.indexOf(s);n>=0?R.splice(n,1):R.push(s),b();return}if(i==="lock-selected"){const s=[...R].sort();if(!s.length)return;const n=l.lockDays(s);R=[],h(n===1?`Locked ${n} day`:`Locked ${n} days`),b();return}if(i==="unlock-selected"){const s=[...R].sort();if(!s.length)return;const n=l.unlockDays(s);R=[],h(n===1?`Unlocked ${n} day`:`Unlocked ${n} days`),b();return}if(i==="submit-day"&&(l.submitDay(v),h("Report submitted and locked")),i==="unlock-day"&&(l.unlockDay(a.dataset.date),h("Report unlocked")),i==="toggle-habit"){if(F())return;l.toggleHabit(v,a.dataset.id),b()}if(i==="toggle-task"){if(F())return;l.toggleTask(v,a.dataset.id),b()}if(i==="remove-task"){if(!Q||F())return;l.removeTask(v,a.dataset.id),b()}if(i==="remove-habit"&&(l.removeHabit(a.dataset.id),b()),i==="restore-habit"){const s=l.restoreHabit(a.dataset.id);h(s.ok?"Habit restored":s.reason||"Could not restore that habit"),b()}if(i==="toggle-archive"){gt=!gt,b();return}if(i==="archive-habit"){l.removeHabit(a.dataset.id),gt=!0,h("Habit archived — restore it from the Archive"),b();return}if(i==="archive-task"){if(F())return;const s=l.archiveTask(v,a.dataset.id);if(!s.ok){h(s.reason||"Could not archive that task");return}gt=!0,h("Task archived — restore it from the Archive"),b();return}if(i==="restore-task"){const s=l.isLocked(v)?l.todayKey():v,n=l.restoreTask(a.dataset.id,s);n.ok?h(n.from&&n.from!==s?`Task restored to ${s} — forwarded from ${n.from}`:`Task restored to ${s}`):h(n.reason||"Could not restore that task"),s!==v&&(v=s),b();return}if(i==="delete-archived-task"){if(!Q||!window.confirm("Delete this archived task permanently? This cannot be undone."))return;const s=l.deleteArchivedTask(a.dataset.id);h(s.ok?"Task deleted permanently":s.reason||"Could not delete"),b();return}if(i==="delete-archived-habit"){if(!window.confirm("Delete this archived habit permanently? This cannot be undone."))return;const s=l.deleteArchivedHabit(a.dataset.id);h(s.ok?"Habit deleted permanently":s.reason||"Could not delete"),b();return}if(i==="open-pin-habit"&&Fi(a.dataset.id),i==="open-replace-habit"){if(F())return;const s=l.findHabit(a.dataset.id);if(!s)return;const n=l.habitReplaceDays(v,s.id);x="replace",$={id:s.id,title:s.name,from:v,info:n};return}if(i==="pick-replace-day"){const s=document.querySelector('.sheet input[name="targetDate"]');s&&(s.value=a.dataset.date),document.querySelectorAll(".replace-day-chip").forEach(n=>{n.classList.toggle("on",n.dataset.date===a.dataset.date)});return}if(i==="undo-replace-habit"){if(F())return;const s=l.undoReplaceHabit(a.dataset.id,a.dataset.from,a.dataset.to);h(s.ok?"Habit is due on this day again":s.reason||"Could not undo that"),b();return}if(i==="open-forward-task"){if(F())return;const s=l.findTask(v,a.dataset.id);if(!s)return;x="forward",$={kind:"task",id:s.id,title:s.title,from:v}}if(i==="open-pin-task"){if(F())return;Ri(a.dataset.id)}if(i==="open-pin-template"&&Oi(a.dataset.id),i==="unpin-template"&&(l.unpinTaskTemplate(a.dataset.id),h("Task unpinned — removed from today and all upcoming days")),i==="pick-date"&&(v=a.dataset.date,tt=0,I="today"),i==="set-chart-range"){J=["week","month","year"].includes(a.dataset.range)?a.dataset.range:"week",st=0,b();return}if(i==="set-chart-cat"){Z=a.dataset.cat||"all",b();return}if(i==="week-nav"){tt+=Number(a.dataset.dir)||0,tt>0&&(tt=0),b();return}if(i==="chart-nav"){st+=Number(a.dataset.dir)||0,st>0&&(st=0),b();return}if(i==="add-category"){const s=document.getElementById("new-category"),n=l.addCategory(s?s.value:"");h(n.ok?"Category added":n.reason||"Couldn't add category"),b();return}if(i==="rename-category"){const s=l.getCustomCategories().find(o=>o.id===a.dataset.id),n=window.prompt("Rename category",s?s.label:"");if(n==null)return;const r=l.renameCategory(a.dataset.id,n);h(r.ok?"Category renamed":r.reason||"Couldn't rename"),b();return}if(i==="delete-category"){if(!window.confirm("Delete this category? Its habits and tasks move to Mentally."))return;const s=l.deleteCategory(a.dataset.id);s.ok&&ct.delete(a.dataset.id),h(s.ok?"Category deleted":s.reason||"Couldn't delete"),b();return}if(i==="rename-tag"){const s=window.prompt("Rename tag everywhere",a.dataset.tag||"");if(s==null)return;const n=l.renameTag(a.dataset.tag,s);h(n.ok?n.merged?"Tags merged":"Tag renamed everywhere":n.reason||"Couldn't rename"),b();return}if(i==="delete-tag"){if(!window.confirm(`Delete tag "#${a.dataset.tag}" from all habits and tasks?`))return;l.deleteTag(a.dataset.tag),h("Tag deleted everywhere"),b();return}if(i==="add-tag"){const s=document.getElementById("tag-habit-pick"),n=document.getElementById("new-tag"),r=l.addTagToHabit(s?s.value:"",n?n.value:"");h(r.ok?"Tag added to habit":r.reason||"Couldn't add tag"),b();return}if(i==="set-points"){const s=document.querySelector('input[name="points"]');s&&(s.value=a.dataset.points),document.querySelectorAll(".chip-row .chip[data-points]").forEach(n=>n.classList.remove("on")),a.classList.add("on");return}if(i==="set-category"){const s=a.closest("form")||a.closest(".sheet"),n=s.querySelector('input[name="category"]');n&&(n.value=a.dataset.category),s.querySelectorAll(".cat-row .chip").forEach(r=>r.classList.remove("on")),a.classList.add("on");return}if(i==="set-rating"){const s=a.closest(".sheet")||a.closest("form")||document,n=s.querySelector('input[name="rating"]');n&&(n.value=a.dataset.rating),s.querySelectorAll(".rating-row .chip").forEach(r=>r.classList.remove("on")),a.classList.add("on");return}if(i==="set-conscious"){const s=a.closest(".sheet")||a.closest("form")||document,n=s.querySelector('input[name="consciousPoints"]');n&&(n.value=a.dataset.conscious),s.querySelectorAll(".conscious-row .chip").forEach(r=>r.classList.remove("on")),a.classList.add("on");return}if(i==="set-goal-kind"){const s=a.closest(".sheet")||document,n=s.querySelector('input[name="kind"]');n&&(n.value=a.dataset.kind),s.querySelectorAll(".goal-kind-row .chip").forEach(m=>m.classList.remove("on")),a.classList.add("on");const r=a.dataset.kind,o=s.querySelector(".goal-target-habit"),d=s.querySelectorAll(".goal-target-task, .goal-target-days"),c=s.querySelector(".goal-attach");o&&(o.style.display=r==="habit-streak"?"":"none"),d.forEach(m=>{m.style.display=r==="task-streak"||r==="perfect-days"?"":"none"}),c&&(c.style.display=r==="task-list"?"":"none"),$&&($.kind=r);return}if(i==="set-goal-tier"){const s=a.closest(".sheet")||document,n=s.querySelector('input[name="tier"]');n&&(n.value=a.dataset.tier),s.querySelectorAll(".goal-tier-row .chip").forEach(r=>r.classList.remove("on")),a.classList.add("on");return}if(i==="pin-mode"){const s=a.closest("form"),n=a.dataset.mode;s.querySelector('input[name="mode"]').value=n,s.querySelectorAll(".pin-modes .chip").forEach(o=>o.classList.remove("on")),a.classList.add("on");const r=(o,d)=>{const c=s.querySelector(o);c&&(c.style.display=d?"":"none")};r(".pin-until",n==="until"),r(".pin-weekdays",n==="weekly"),r(".pin-monthdays",n==="monthly"),r(".pin-yeardays",n==="yearly"),$&&$.pin&&($.pin.mode=n);return}if(i==="toggle-weekday"){a.classList.toggle("on");return}if(i==="toggle-monthday"){a.classList.toggle("on");return}if(i==="pin-cal-nav"){if(!$)return;const s=a.dataset.target,n=Number(a.dataset.dir)||0;s==="except"?$._exceptCal=vt($._exceptCal||H(v),n):$._customCal=vt($._customCal||H(v),n),b();return}if(i==="toggle-pin-date"){if(!$||!$.pin)return;const s=a.dataset.target,n=a.dataset.date,r=s==="custom"?"customDates":"exceptDates",o=Array.isArray($.pin[r])?[...$.pin[r]]:[],d=o.indexOf(n);d>=0?o.splice(d,1):(o.push(n),o.length>365&&o.shift()),$.pin[r]=o.sort(),b();return}if(i==="add-year-day"){if(!$||!$.pin)return;const s=a.closest("form")||document,n=s.querySelector("#year-month-select"),r=s.querySelector("#year-day-select");n&&($._yearMonth=n.value);const o=`${n?n.value:"01"}-${r?r.value:"01"}`,d=Array.isArray($.pin.yearDays)?[...$.pin.yearDays]:[];d.includes(o)||d.push(o),$.pin.yearDays=d.sort(),b();return}if(i==="remove-year-day"){if(!$||!$.pin)return;const s=a.dataset.date;$.pin.yearDays=($.pin.yearDays||[]).filter(n=>n!==s),b();return}if(i==="clear-pin"){const s=a.closest("form"),n=s.dataset.kind,r=s.dataset.id;let o=!1;if(n==="habit"&&l.unpinHabit(r),n==="task"){const d=l.findTask(v,r);d!=null&&d.sourcePinId&&(l.unpinTaskTemplate(d.sourcePinId),o=!0)}n==="template"&&(l.unpinTaskTemplate(r),o=!0),x=null,$=null,h(o?"Task unpinned — removed from today and all upcoming days":"Unpinned"),b();return}if(i==="lock-profile"){l.setProfileLocked(!0),h("Profile locked — read only"),b();return}if(i==="unlock-profile"){l.setProfileLocked(!1),h("Profile unlocked"),b();return}if(i==="add-whoami"){const s=document.getElementById("new-whoami"),n=l.addWhoAmI(s?s.value:"");h(n.ok?"Added":n.reason||"Couldn't add"),b();return}if(i==="move-whoami"){l.moveWhoAmI(a.dataset.id,Number(a.dataset.dir)||0),b();return}if(i==="remove-whoami"){l.removeWhoAmI(a.dataset.id),h("Removed"),b();return}if(i==="add-lifearea"){const s=document.getElementById("new-lifearea"),n=l.addLifeArea(s?s.value:"");n.ok?(bt=n.id,h("Life area added")):h(n.reason||"Couldn't add"),b();return}if(i==="toggle-lifearea"){const s=a.dataset.id;bt=bt===s?null:s,b();return}if(i==="move-lifearea"){l.moveLifeArea(a.dataset.id,Number(a.dataset.dir)||0),b();return}if(i==="toggle-cat"){const s=a.dataset.id;ct.has(s)?ct.delete(s):ct.add(s),b();const n=document.querySelector(`[data-action="toggle-cat"][data-id="${CSS.escape(s)}"]`);n&&n.focus({preventScroll:!0});return}if(i==="expand-cats"){l.getCategories().forEach(s=>ct.add(s.id)),b();return}if(i==="collapse-cats"){ct.clear(),b();return}if(i==="save-cat-goals"){const s=a.dataset.id,n=document.querySelector(`[data-cat-goals="${CSS.escape(s)}"]`),r=n?n.value:xt.get(s)||"",o=jt(r);l.updateCategory(s,{goals:Bt(o)}),xt.delete(s),h(o.length?`Saved ${o.length} goal${o.length===1?"":"s"} for ${nt(s)}`:`Cleared goals for ${nt(s)}`),b();return}if(i==="reset-cat-goals"){const s=a.dataset.id;xt.delete(s),b();return}if(i==="remove-lifearea"){l.removeLifeArea(a.dataset.id),bt===a.dataset.id&&(bt=null),h("Life area removed"),b();return}if(i==="set-pgoal-term"){K=["short","medium","long"].includes(a.dataset.term)?a.dataset.term:"short",Tt=l.profileGoalDurations()[K][0],b();return}if(i==="set-pgoal-filter"){Kt=["all","short","medium","long"].includes(a.dataset.filter)?a.dataset.filter:"all",b();return}if(i==="add-pgoal"){const s=document.getElementById("new-pgoal"),n=document.getElementById("new-pgoal-duration"),r=l.addProfileGoal(s?s.value:"",K,n?n.value:Tt);h(r.ok?`Goal added ${ae(K)}`:r.reason||"Couldn't add"),b();return}if(i==="remove-pgoal"){l.removeProfileGoal(a.dataset.id),h("Goal removed"),b();return}if(i==="add-idea"){const s=document.getElementById("new-idea"),n=String(s?s.value:"").trim().slice(0,200);if(!n){h("Write an idea first");return}if(l.isProfileLocked()){h("Profile is locked");return}const r=String(l.getProfile().ideas||"").split(`
`).map(o=>o.trim()).filter(Boolean);r.push(`• ${n}`),l.setProfileField("ideas",r.join(`
`)),h("Idea added"),b();return}if(i==="remove-idea"){if(l.isProfileLocked())return;const s=Number(a.dataset.index),n=String(l.getProfile().ideas||"").split(`
`).filter(r=>r.trim());if(!Number.isInteger(s)||s<0||s>=n.length)return;n.splice(s,1),l.setProfileField("ideas",n.join(`
`)),h("Idea removed"),b();return}if(i==="add-quote"){const s=document.getElementById("new-quote"),n=document.getElementById("new-quote-author"),r=l.addQuote(s?s.value:"",n?n.value:"");h(r.ok?"Quote added":r.reason||"Couldn't add"),b();return}if(i==="toggle-quote-fav"){l.toggleQuoteFav(a.dataset.id),b();return}if(i==="remove-quote"){l.removeQuote(a.dataset.id),h("Quote removed"),b();return}if(i==="toggle-quotes"){Rt=!Rt,b();return}b()});document.addEventListener("submit",t=>{const e=t.target.closest("[data-form]");if(!e)return;t.preventDefault();const a=e.dataset.form;if(a==="habit"||a==="task"||a==="edit-habit"||a==="edit-task"||a==="edit-pinned-task"){const i=new FormData(e),s=String(i.get("title")||""),n=Number(i.get("points")||0),r=String(i.get("category")||"mentally"),o=String(i.get("description")||""),d=String(i.get("tags")||""),c=Math.max(0,Math.min(5,Number(i.get("rating")||0))),m=Math.max(0,Math.min(100,Number(i.get("consciousPoints")||0)));if(!s.trim())return;const f=$&&$._image!==void 0?W($._image):W($&&$.image);if(a==="habit")l.addHabit(s,n,{description:o,category:r,consciousPoints:m,tags:d,startFrom:v}),h("Habit added");else if(a==="task"){const p=String(i.get("goalTarget")||"");if(p){const k=l.addGoalItem(p,s);if(!k.ok){h(k.reason||"Could not add the task to the goal");return}const A=l.findGoal(p);h(`Added to goal “${A?A.title:s}”`)}else{if(F())return;l.addTask(v,s,n,{description:o,category:r,rating:c,tags:d,image:f}),h("Task added")}}else if(a==="edit-habit")l.updateHabit(e.dataset.id,{name:s,description:o,points:n,category:r,consciousPoints:m,tags:d}),h("Habit updated");else if(a==="edit-pinned-task")l.updatePinnedTaskDetails(e.dataset.id,{title:s,description:o,points:n,category:r,tags:d,image:f}),h("Pinned task updated");else{if(F())return;l.updateTask(v,e.dataset.id,{title:s,points:n,description:o,category:r,rating:c,tags:d,image:f}),h("Task updated");const p=String(i.get("goalTarget")||"");if(p){const k=l.addGoalItems(p,[s]);k.ok&&k.added?h(`Attached to goal “${(l.findGoal(p)||{}).title}”`):k.ok?h("Already on that goal’s list"):h(k.reason||"Could not attach to the goal")}}x=null,$=null,b();return}if(a==="pin"){const i=ji(e);if(!i)return;const s=e.dataset.kind,n=e.dataset.id;s==="habit"&&l.pinHabit(n,i),s==="task"&&l.pinTask(v,n,i),s==="template"&&l.updatePinnedTask(n,i),x=null,$=null,h("Pin saved"),b();return}if(a==="replace"){const i=new FormData(e),s=String(i.get("targetDate")||""),n=e.dataset.id,r=$&&$.from||v,o=l.replaceHabit(r,n,s);if(!o.ok){h(o.reason||"Could not replace that habit day");return}x=null,$=null,h(`Habit moved from ${o.from} to ${o.to}`),b();return}if(a==="goal"||a==="edit-goal"){const i=new FormData(e),s=String(i.get("title")||"").trim(),n=String(i.get("kind")||"habit-streak"),r=String(i.get("tier")||"bronze"),o=String(i.get("rewardTitle")||"").trim(),d=Math.max(1,Math.min(365,Number(i.get("targetDays")||7)));if(!s||!o){h("Goal title and reward title are required");return}let c="";if(n==="habit-streak"&&(c=String(i.get("habitTarget")||"")),n==="task-streak"&&(c=String(i.get("taskTarget")||"")),(n==="habit-streak"||n==="task-streak")&&!c){h(n==="habit-streak"?"Pick a habit":"Pin a task first, then pick it");return}if(a==="goal"){const f=l.addGoal({title:s,kind:n,targetId:c,targetDays:d,tier:r,rewardTitle:o});if(n==="task-list"){const p=Array.from(e.querySelectorAll('input[name="attachTask"]:checked')).map(A=>A.value),k=l.addGoalItems(f.id,p);h(k.added?`Goal added with ${k.added} task(s)`:"Goal added")}else h("Goal added")}else if(l.updateGoal(e.dataset.id,{title:s,kind:n,targetId:c,targetDays:d,tier:r,rewardTitle:o}),n==="task-list"){const f=Array.from(e.querySelectorAll('input[name="attachTask"]:checked')).map(k=>k.value),p=l.addGoalItems(e.dataset.id,f);h(p.added?`Goal updated — ${p.added} task(s) attached`:"Goal updated")}else h("Goal updated");const m=l.checkGoals(v);m.length&&h(`🏅 Reward earned: ${m[0].rewardTitle}!`),x=null,$=null,b()}});document.addEventListener("change",t=>{const e=t.target.closest(".sort-select");if(e){const a=e.dataset.sortKind;a==="habit"&&l.setHabitSort(e.value),a==="task"&&l.setTaskSort(e.value),b()}if(t.target&&t.target.id==="show-conscious"&&(l.setShowConscious(t.target.checked),h(t.target.checked?"Conscious points on":"Conscious points hidden"),b()),t.target&&t.target.id==="week-start"&&(l.setWeekStart(Number(t.target.value)),h("Week starts on "+t.target.selectedOptions[0].textContent),b()),t.target&&t.target.id==="new-pgoal-duration"){Tt=t.target.value;return}if(t.target&&t.target.id==="year-month-select"&&$&&($._yearMonth=t.target.value),t.target&&t.target.id==="task-image-input"){const a=t.target.files&&t.target.files[0];if(!a)return;if(!String(a.type||"").startsWith("image/")){h("Please pick an image file"),t.target.value="";return}h("Processing photo…"),qs(a).then(i=>{if(t.target.value="",!i){h("Photo too large or unreadable — try a smaller one");return}$&&($._image=i,b(),h("Photo attached — save to apply"))})}});function Bi(){const t=window.visualViewport;if(!t)return;const e=document.documentElement,a=()=>{e.style.setProperty("--vvh",`${Math.max(0,Math.round(t.height))}px`);const i=window.innerHeight-t.height>120;e.classList.toggle("vk-open",i)};t.addEventListener("resize",a),t.addEventListener("scroll",a),a()}Bi();if("serviceWorker"in navigator){window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js").catch(()=>{})});let t=!1;try{const e=Number(sessionStorage.getItem("dr-reload-at")||0);Date.now()-e<8e3&&(t=!0)}catch{}navigator.serviceWorker.addEventListener("controllerchange",()=>{if(!t){t=!0;try{sessionStorage.setItem("dr-reload-at",String(Date.now()))}catch{}window.location.reload()}})}function Gi(){const t=document.getElementById("boot-error");t&&(t.style.display="none")}Gi();Ye();b();l.initFolderSync().then(t=>{t&&(t.replaced&&(Ye(),h("Data loaded from your data folder")),t.corrupt&&h("The data file was unreadable — a copy was saved aside, the browser copy is in use"),Pt(),(I==="settings"||t.replaced||t.corrupt)&&b())}).catch(()=>{});window.addEventListener("pagehide",()=>{l.flushFolderWrite().catch(()=>{})});document.addEventListener("visibilitychange",()=>{document.hidden&&l.flushFolderWrite().catch(()=>{})});setInterval(()=>{!document.hidden&&ze()&&b()},6e4);document.addEventListener("visibilitychange",()=>{!document.hidden&&ze()&&b()});
