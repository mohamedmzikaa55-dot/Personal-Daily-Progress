(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function a(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=a(i);fetch(i.href,n)}})();const Qe="daily-report-v2",Pt=[{id:"mentally",label:"Mentally"},{id:"psychology",label:"Psychology"},{id:"physically",label:"Physically"},{id:"spiritually",label:"Spiritually"},{id:"socially",label:"Socially"}];Pt.map(t=>t.id);const Xe=[{id:"h1",name:"Wake up early",points:10,icon:"sunrise",category:"physically",pin:{mode:"forever"}},{id:"h2",name:"Drink water",points:5,icon:"drop",category:"physically",pin:{mode:"forever"}},{id:"h3",name:"Exercise",points:15,icon:"bolt",category:"physically",pin:{mode:"forever"}},{id:"h4",name:"Read 20 minutes",points:10,icon:"book",category:"mentally",pin:{mode:"forever"}},{id:"h5",name:"No junk food",points:10,icon:"leaf",category:"physically",pin:{mode:"forever"}}],Ze={lockTime:"21:00",autoLock:!0,showConscious:!0,habitSort:"default",taskSort:"default",theme:"dark",habitOrder:[],pinnedTaskOrder:[],weekStart:1};function se(t){const e=Number(t);return Number.isInteger(e)&&e>=0&&e<=6?e:1}const Ct=[{id:"iron",label:"Iron",medal:"🥉",rank:1},{id:"bronze",label:"Bronze",medal:"🥉",rank:2},{id:"silver",label:"Silver",medal:"🥈",rank:3},{id:"gold",label:"Gold",medal:"🥇",rank:4}],Ke=[{id:"habit-streak",label:"Habit streak"},{id:"task-streak",label:"Pinned task streak"},{id:"perfect-days",label:"Perfect days (100%)"}];function Te(t){var e;return((e=Ct.find(a=>a.id===t))==null?void 0:e.rank)||0}function ne(t){var e;return((e=Ct.find(a=>a.id===t))==null?void 0:e.medal)||"🏅"}function ta(t){var e;return((e=Ct.find(a=>a.id===t))==null?void 0:e.label)||t||"Badge"}function D(t){const e=Array.isArray(t)?t:String(t||"").split(","),a=[];return e.forEach(s=>{const i=String(s||"").trim().slice(0,20);i&&!a.some(n=>n.toLowerCase()===i.toLowerCase())&&a.push(i),a.length>=10}),a.slice(0,10)}function Kt(t,e){const a=[...t];return e==="points"?a.sort((s,i)=>(Number(i.points)||0)-(Number(s.points)||0)):e==="category"?a.sort((s,i)=>at(E(s.category)).localeCompare(at(E(i.category)))):e==="tags"&&a.sort((s,i)=>(s.tags&&s.tags[0]||"~~~").localeCompare(i.tags&&i.tags[0]||"~~~")),a}const mt=[{value:1,label:"Mon"},{value:2,label:"Tue"},{value:3,label:"Wed"},{value:4,label:"Thu"},{value:5,label:"Fri"},{value:6,label:"Sat"},{value:0,label:"Sun"}];function j(t=new Date){const e=t.getFullYear(),a=String(t.getMonth()+1).padStart(2,"0"),s=String(t.getDate()).padStart(2,"0");return`${e}-${a}-${s}`}function be(){return{habits:{},habitRatings:{},habitMissed:{},habitForwarded:{},tasks:[],note:"",locked:!1,lockOverride:null,submittedAt:null,lockedHabits:null,skippedPins:[]}}var B=[],Z={};function xa(t){const e=Z[t.id];return e?{...t,color:e.color||t.color,goals:e.goals!==void 0?e.goals:t.goals}:t}function K(){return[...Pt.map(xa),...B]}function E(t){return K().map(a=>a.id).includes(t)?t:"mentally"}function at(t){var e;return((e=K().find(a=>a.id===t))==null?void 0:e.label)||"Mentally"}const It=7e5;function _(t){const e=String(t||"");return e.startsWith("data:image/")?e.length>It?"":e:""}function De(t){const e=Math.max(0,Math.min(5,Number(t.rating)||0)),a=i=>/^\d{4}-\d{2}-\d{2}$/.test(String(i||""))?String(i):"",s=i=>Array.isArray(i)?i.filter(n=>/^\d{4}-\d{2}-\d{2}$/.test(String(n))).map(String).slice(0,50):[];return{...t,description:t.description||"",category:E(t.category),tags:D(t.tags),rating:e,done:!!t.done,missed:!!t.missed,forwardedFrom:a(t.forwardedFrom),forwardedHabitId:String(t.forwardedHabitId||""),forwardedTo:s(t.forwardedTo),image:_(t.image)}}function Y(t){const e=Number(t);return!Number.isFinite(e)||e<0?0:Math.min(100,Math.round(e))}function Et(t){const e=String(t??"").slice(0,10);return/^\d{4}-\d{2}-\d{2}$/.test(e)?e:""}function Lt(t,e){const a=Et(t&&t.startFrom);return a?String(e)>=a:!0}function ye(t,e){return{id:String(t.id||""),name:String(t.name||"").slice(0,80),description:String(t.description||"").slice(0,2e3),points:Number(t.points)||0,icon:t.icon||"star",category:E(t.category),consciousPoints:Y(t.consciousPoints),tags:D(t.tags),pin:F(t.pin),startFrom:Et(t.startFrom),archivedAt:e||t.archivedAt||null}}function ea(t,e,a){const s=/^\d{4}-\d{2}-\d{2}$/.test(String(a||""))?String(a):"",i=/^\d{4}-\d{2}-\d{2}$/.test(String(t&&t.forwardedFrom||""))?String(t.forwardedFrom):s;return{id:String(t.id||""),title:String(t.title||"Task").slice(0,120),points:Number(t.points)||0,description:String(t.description||"").slice(0,500),category:E(t.category),tags:D(t.tags),image:_(t.image),fromDate:s,originDate:i,archivedAt:e||t.archivedAt||null,sourcePinId:String(t.sourcePinId||"")}}function Aa(t){return Array.isArray(t)?t.filter(e=>e&&typeof e=="object"&&e.id).map(e=>ea(e,e.archivedAt||null,e.fromDate)).filter(e=>e.id.length<=80).slice(0,500):[]}function F(t){if(!t||!t.mode)return null;const e=(i,n,r)=>Array.isArray(i)?i.map(Number).filter(o=>Number.isFinite(o)&&o>=n&&o<=r):[],a=i=>Array.isArray(i)?i.filter(n=>/^\d{4}-\d{2}-\d{2}$/.test(String(n))).map(String).slice(0,365):[],s=i=>Array.isArray(i)?i.filter(n=>/^\d{2}-\d{2}$/.test(String(n))).map(String).slice(0,366):[];return{mode:["forever","until","weekly","monthly","yearly","custom"].includes(t.mode)?t.mode:"forever",until:t.until||"",weekdays:e(t.weekdays,0,6),monthDays:e(t.monthDays,1,31),yearDays:s(t.yearDays),customDates:a(t.customDates),exceptDates:a(t.exceptDates||t.exceptions)}}function Ta(t,e){const a=`${t} ${e}`.toLowerCase();return a.includes("read")||a.includes("study")||a.includes("learn")?"mentally":a.includes("meditat")||a.includes("pray")||a.includes("journal")?"spiritually":a.includes("mood")||a.includes("calm")||a.includes("therapy")?"psychology":a.includes("friend")||a.includes("family")||a.includes("social")||a.includes("call")||a.includes("visit")?"socially":"physically"}function oe(t){const e=Ke.some(a=>a.id===t.kind)?t.kind:"habit-streak";return{id:String(t.id||`g${Date.now()}`),title:String(t.title||"").trim().slice(0,60)||"My goal",kind:e,targetId:String(t.targetId||""),targetDays:Math.max(1,Math.min(365,Number(t.targetDays)||7)),tier:Ct.some(a=>a.id===t.tier)?t.tier:"bronze",rewardTitle:String(t.rewardTitle||"").trim().slice(0,60)||"Reward",createdAt:t.createdAt||new Date().toISOString()}}function Da(t){if(!Array.isArray(t))return[];const e=new Set(Pt.map(s=>s.id)),a=[];return t.forEach(s=>{if(!s||typeof s!="object")return;const i=String(s.id||"").trim().slice(0,40),n=String(s.label||"").trim().slice(0,30);!i||!n||e.has(i.toLowerCase())||(e.add(i.toLowerCase()),a.push({id:i,label:n,color:String(s.color||"").slice(0,20),goals:String(s.goals||"").slice(0,1e3)}))}),a.slice(0,20)}function Pa(t){const e=t&&typeof t=="object"?t:{},a={};return Pt.forEach(s=>{const i=e[s.id];if(!i||typeof i!="object")return;const n=String(i.color||"").trim().slice(0,20),r=i.goals===void 0?void 0:String(i.goals||"").slice(0,1e3);!n&&r===void 0||(a[s.id]={},n&&(a[s.id].color=n),r!==void 0&&(a[s.id].goals=r))}),a}const re={name:80,wantToBe:1e3,vision:1e3,values:1e3,ideas:4e3},de=["short","medium","long"],$t={short:["1 Week","2 Weeks","3 Weeks","4 Weeks"],medium:["1 Month","2 Months","3 Months"],long:["1 Year","2 Years","3 Years","5 Years","10+ Years"]};function q(t){return`${t||"id"}${Date.now().toString(36)}${Math.floor(Math.random()*9999)}`}function Ca(t){return Array.isArray(t)?t.map(e=>{if(typeof e=="string")return{id:q("w"),text:e.trim().slice(0,120)};if(!e||typeof e!="object")return null;const a=String(e.text||e.label||e.name||"").trim().slice(0,120);return a?{id:String(e.id||q("w")),text:a}:null}).filter(Boolean).slice(0,50):[]}function Ea(t){return typeof t=="string"?t.split(`
`).map(e=>e.trim().replace(/^[-•*]\s+/,"")).filter(Boolean).slice(0,20).map(e=>({id:q("a"),title:e.slice(0,60),description:""})):Array.isArray(t)?t.map(e=>{if(typeof e=="string"){const s=e.trim().slice(0,60);return s?{id:q("a"),title:s,description:""}:null}if(!e||typeof e!="object")return null;const a=String(e.title||e.name||"").trim().slice(0,60);return a?{id:String(e.id||q("a")),title:a,description:String(e.description||"").slice(0,1e3)}:null}).filter(Boolean).slice(0,20):[]}function La(t){return Array.isArray(t)?t.map(e=>{if(typeof e=="string"){const r=e.trim().slice(0,200);return r?{id:q("g"),text:r,term:"short",duration:"1 Week",createdAt:new Date().toISOString()}:null}if(!e||typeof e!="object")return null;const a=String(e.text||e.title||"").trim().slice(0,200);if(!a)return null;const s=de.includes(e.term)?e.term:"short",i=$t[s],n=i.includes(e.duration)?e.duration:i[0];return{id:String(e.id||q("g")),text:a,term:s,duration:n,createdAt:e.createdAt||new Date().toISOString()}}).filter(Boolean).slice(0,100):[]}function Ma(t){return Array.isArray(t)?t.map(e=>{if(typeof e=="string"){const s=e.trim().slice(0,500);return s?{id:q("q"),text:s,author:"",fav:!1,createdAt:new Date().toISOString()}:null}if(!e||typeof e!="object")return null;const a=String(e.text||e.quote||"").trim().slice(0,500);return a?{id:String(e.id||q("q")),text:a,author:String(e.author||"").trim().slice(0,80),fav:!!(e.fav||e.favorite),createdAt:e.createdAt||new Date().toISOString()}:null}).filter(Boolean).slice(0,200):[]}function xt(t){const e=t&&typeof t=="object"?t:{},a={};Object.entries(re).forEach(([i,n])=>{i==="wantToBe"&&!e.wantToBe&&e.about?a[i]=String(e.about||"").slice(0,n):a[i]=String(e[i]||"").slice(0,n)}),a.locked=!!e.locked,a.whoAmI=Ca(e.whoAmI||e.whoIAm||[]),a.lifeAreas=Ea(Array.isArray(e.lifeAreas)||typeof e.lifeAreas=="string"?e.lifeAreas:[]);let s=La(e.pGoals||e.goalsList||e.profileGoals||[]);return s.length||[["goalsShort","short","1 Week"],["goalsMid","medium","1 Month"],["goalsLong","long","1 Year"]].forEach(([n,r,o])=>{const d=String(e[n]||"");d.trim()&&d.split(`
`).map(c=>c.trim().replace(/^[-•*]\s+/,"")).filter(Boolean).forEach(c=>{s.length>=100||s.push({id:q("g"),text:c.slice(0,200),term:r,duration:o,createdAt:new Date().toISOString()})})}),a.pGoals=s,a.quotes=Ma(e.quotes||e.favQuotes||[]),a}function Ha(t,e){const a=String(t&&t.installedAt||"");if(/^\d{4}-\d{2}-\d{2}/.test(a))return a;const s=Object.keys(e||{}).sort();return s.length?`${s[0]}T00:00:00.000`:new Date().toISOString()}function Na(t,e){if(!t)return!1;if(Xt(t,e)>0)return!0;const a=t.habitForwarded&&t.habitForwarded[e];return Array.isArray(a)&&a.length>0?!0:Array.isArray(t.tasks)&&t.tasks.some(s=>String(s&&s.forwardedHabitId||"")===String(e))}function Ia(t,e){return!t||!Array.isArray(t.lockedHabits)?!1:t.lockedHabits.some(a=>String(a&&a.id||"")===String(e))}function Ra(t,e,a){const s=String(t||"");for(const i of e){const n=a[i];if(Na(n,s)||Ia(n,s))return i}return""}function Oa(t,e){const a=Object.keys(e).sort(),s=a[0]||"";return t.map(i=>{const n=Et(i&&i.startFrom);return n?{...i,startFrom:n}:{...i,startFrom:Ra(i&&i.id,a,e)||s}})}function ja(t,e){const a=Object.keys(e).sort(),s=a[0]||"",i={};return a.forEach(n=>{const r=e[n]&&e[n].tasks;Array.isArray(r)&&r.forEach(o=>{const d=String(o&&o.sourcePinId||"");!d||i[d]||(i[d]=n)})}),t.map(n=>{const r=Et(n&&n.startFrom);if(r)return{...n,startFrom:r};const o=String(n&&n.id||"");return{...n,startFrom:i[o]||s}})}function aa(t){const e=new Set,a=new Set,s=new Set;return t.filter(i=>{if(!i||typeof i!="object")return!1;const n=String(i.id||"");if(n&&e.has(n))return!1;n&&e.add(n);const r=String(i.sourcePinId||"");if(r){if(a.has(r))return!1;a.add(r)}const o=`${String(i.title||"").trim().toLowerCase()}|${Number(i.points)||0}|${String(i.category||"")}`;return s.has(o)?!1:(s.add(o),!0)})}function ia(t){B=Da(t.customCategories||[]),Z=Pa(t.categoryOverrides);const e={};Object.entries(t.days||{}).forEach(([o,d])=>{e[o]={...be(),habits:d.habits||{},habitRatings:d.habitRatings||{},habitMissed:d.habitMissed||{},habitForwarded:d.habitForwarded&&typeof d.habitForwarded=="object"?d.habitForwarded:{},tasks:aa(Array.isArray(d.tasks)?d.tasks.map(De):[]),note:d.note||"",locked:!!d.locked,lockOverride:d.lockOverride||(d.locked?"locked":null),submittedAt:d.submittedAt||null,lockedHabits:Array.isArray(d.lockedHabits)?d.lockedHabits:null,skippedPins:Array.isArray(d.skippedPins)?d.skippedPins.map(String).filter(c=>c.length<=60).slice(0,100):[]}});const a=Oa(Array.isArray(t.habits)&&t.habits.length?t.habits:Xe,e).map(o=>({...o,description:String(o.description||"").slice(0,2e3),category:E(o.category||Ta(o.id,o.name)),consciousPoints:Y(o.consciousPoints),tags:D(o.tags),pin:F(o.pin)})),s=(Array.isArray(t.archivedHabits)?t.archivedHabits:[]).filter(o=>o&&typeof o=="object"&&o.id).map(o=>ye(o,o.archivedAt||null)).filter(o=>o.id.length<=60).slice(0,500),i=ja(Array.isArray(t.pinnedTasks)?t.pinnedTasks.map(o=>({...De(o),pin:F(o.pin)})):[],e),n=new Map(i.map(o=>[String(o.id),o])),r=new Map;return Object.entries(e).sort(([o],[d])=>o.localeCompare(d)).forEach(([o,d])=>{d.tasks.forEach(c=>{const g=F(c.pin);if(!g)return;const v=String(c.sourcePinId||""),p=v?n.get(v):null;if(p){p.pin||(p.pin=g);return}const w=[String(c.title||"").trim().toLowerCase(),Number(c.points)||0,String(c.category||""),String(c.description||""),JSON.stringify(D(c.tags)),_(c.image),JSON.stringify(g)].join("|"),P=r.get(v||w);if(P){c.sourcePinId=P.id;return}const S=v||`legacy-pin-${String(c.id||"task").slice(0,48)}`,f={id:S,title:String(c.title||"Task").slice(0,120),points:Number(c.points)||0,description:String(c.description||"").slice(0,500),category:E(c.category),tags:D(c.tags),pin:g,startFrom:o,image:_(c.image)};i.push(f),n.set(S,f),r.set(v||w,f),c.sourcePinId=S})}),{habits:a,archivedHabits:s,archivedTasks:Aa(t.archivedTasks),customCategories:B,categoryOverrides:Z,installedAt:Ha(t,e),profile:xt(t.profile),pinnedTasks:i,days:e,goals:Array.isArray(t.goals)?t.goals.map(oe):[],badges:Array.isArray(t.badges)?t.badges.filter(o=>o&&o.id&&o.goalId).map(o=>({id:String(o.id),goalId:String(o.goalId),title:String(o.title||""),tier:o.tier||"bronze",rewardTitle:String(o.rewardTitle||""),earnedAt:o.earnedAt||new Date().toISOString()})):[],settings:{lockTime:t.settings&&t.settings.lockTime||Ze.lockTime,autoLock:!t.settings||t.settings.autoLock!==!1,showConscious:!t.settings||t.settings.showConscious!==!1,habitSort:["default","points","category","tags","custom"].includes(t.settings&&t.settings.habitSort)?t.settings.habitSort:"default",taskSort:["default","points","category","tags","custom"].includes(t.settings&&t.settings.taskSort)?t.settings.taskSort:"default",theme:["light","dark"].includes(t.settings&&t.settings.theme)?t.settings.theme:"dark",weekStart:se(t.settings&&t.settings.weekStart),habitOrder:Array.isArray(t.settings&&t.settings.habitOrder)?t.settings.habitOrder.map(String).filter(Boolean).slice(0,300):[],pinnedTaskOrder:Array.isArray(t.settings&&t.settings.pinnedTaskOrder)?t.settings.pinnedTaskOrder.map(String).filter(Boolean).slice(0,300):[]}}}function Pe(){const t=j();return{habits:Xe.map(e=>({...e,description:"",tags:[],startFrom:t})),archivedHabits:[],archivedTasks:[],customCategories:[],categoryOverrides:{},installedAt:new Date().toISOString(),profile:xt({}),pinnedTasks:[],days:{},goals:[],badges:[],settings:{...Ze}}}function Ba(){try{const t=localStorage.getItem(Qe)||localStorage.getItem("daily-report-v1");return t?ia(JSON.parse(t)):Pe()}catch{return Pe()}}let l=Ba();B=l.customCategories||[];l.customCategories=B;Z=l.categoryOverrides||{};l.categoryOverrides=Z;let sa=0,te={key:null,value:null},ce=0;function ve(){return ce>0}function it(t){ce+=1;try{return t()}finally{ce-=1}}function $(){sa+=1;try{localStorage.setItem(Qe,JSON.stringify(l))}catch{}}let Ce=0;function ot(t){return Ce+=1,`${t||"id"}${Date.now().toString(36)}${Ce.toString(36)}${Math.floor(Math.random()*1296).toString(36)}`}function Fa(t){return new Date(`${t}T00:00:00`).getDay()}function Ft(t){const e=new Date(`${t}T00:00:00`);return e.setDate(e.getDate()+1),j(e)}function vt(t){const e=new Date(`${t}T00:00:00`);return e.setDate(e.getDate()-1),j(e)}function Mt(t,e){if(!t)return!0;if(Array.isArray(t.exceptDates)&&t.exceptDates.includes(e)||Array.isArray(t.exceptions)&&t.exceptions.includes(e))return!1;if((Array.isArray(t.customDates)?t.customDates:[]).includes(e)||t.mode==="forever")return!0;if(t.mode==="until")return!!t.until&&e<=t.until;if(t.mode==="weekly")return Array.isArray(t.weekdays)&&t.weekdays.includes(Fa(e));if(t.mode==="monthly"){const s=Array.isArray(t.monthDays)?t.monthDays.map(Number):[];return s.length?s.includes(Number(String(e).slice(8,10))):!0}if(t.mode==="yearly"){const s=Array.isArray(t.yearDays)?t.yearDays:[];return s.length?s.includes(String(e).slice(5,10)):!0}return t.mode!=="custom"}function ft(t){if(!t)return"Not pinned";const e=(t.exceptDates||t.exceptions||[]).length,a=e?` · ⛔ ${e} exception${e>1?"s":""}`:"",s=t.mode==="custom"?0:Array.isArray(t.customDates)?t.customDates.length:0,i=s?` +${s} custom`:"";if(t.mode==="forever")return`Pinned forever${i}${a}`;if(t.mode==="until")return`${t.until?`Pinned until ${t.until}`:"Pinned until a date"}${i}${a}`;if(t.mode==="weekly"){const n=Array.isArray(t.weekdays)?t.weekdays:[],r=mt.filter(o=>n.includes(o.value)).map(o=>o.label);return`${r.length?`Weekly: ${r.join(", ")}`:"Weekly (no days)"}${i}${a}`}if(t.mode==="monthly"){const n=Array.isArray(t.monthDays)?t.monthDays:[];return`${n.length?`Monthly: day${n.length>1?"s":""} ${[...n].sort((r,o)=>r-o).join(", ")}`:"Monthly"}${i}${a}`}if(t.mode==="yearly"){const n=Array.isArray(t.yearDays)?t.yearDays:[];return`${n.length?`Yearly: ${[...n].sort().join(", ")}`:"Yearly"}${i}${a}`}if(t.mode==="custom"){const n=Array.isArray(t.customDates)?t.customDates:[];return`${n.length?`Custom: ${n.length} date${n.length>1?"s":""}`:"Custom dates"}${a}`}return"Pinned"}function le(t){const[e,a]=(l.settings.lockTime||"21:00").split(":").map(Number),s=new Date(`${t}T00:00:00`);return s.setHours(e||0,a||0,0,0),s}function Gt(t){const e=l.days[t];return e?e.lockOverride==="locked"||e.locked===!0:!1}function Xt(t,e){return t?t.habitRatings&&t.habitRatings[e]!=null?Number(t.habitRatings[e])||0:t.habits&&t.habits[e]?5:0:0}function ue(t,e){return Xt(l.days[t],e)}function Ga(t,e){if(!t)return!1;if(Xt(t,e)>0||t.habitMissed&&t.habitMissed[e])return!0;const s=t.habitForwarded&&t.habitForwarded[e];return Array.isArray(s)&&s.length>0?!0:Array.isArray(t.tasks)&&t.tasks.some(i=>String(i&&i.forwardedHabitId||"")===String(e))}function na(t){if(!t)return[...l.habits];const e=l.habits.filter(s=>Lt(s,t)&&Mt(s.pin,t)),a=l.days[t];if(a){const s=new Set(e.map(n=>n.id)),i=n=>{!n||s.has(n.id)||Ga(a,n.id)&&(s.add(n.id),e.push(n))};l.habits.forEach(i),Gt(t)&&l.archivedHabits&&l.archivedHabits.length&&l.archivedHabits.forEach(i)}return e}function Nt(t,e){if(!Array.isArray(e)||!e.length)return t;const a=new Map(e.map((s,i)=>[String(s),i]));return t.some(s=>a.has(String(s&&s.id)))?t.map((s,i)=>({item:s,i})).sort((s,i)=>{const n=a.has(String(s.item&&s.item.id))?a.get(String(s.item.id)):Number.MAX_SAFE_INTEGER,r=a.has(String(i.item&&i.item.id))?a.get(String(i.item.id)):Number.MAX_SAFE_INTEGER;return n===r?s.i-i.i:n-r}).map(s=>s.item):t}function _a(t){const e=l.habits.find(a=>a.id===t);return e||(l.archivedHabits||[]).find(a=>a.id===t)||null}function qa(t){l.archivedHabits||(l.archivedHabits=[]),!l.archivedHabits.some(e=>e.id===t.id)&&(l.archivedHabits.push(ye(t,new Date().toISOString())),l.archivedHabits.length>500&&l.archivedHabits.splice(0,l.archivedHabits.length-500))}function pe(t){const e=M(t),a=na(t);e.lockedHabits=a.map(s=>ye(s)),e.habitMissed={},a.forEach(s=>{ue(t,s.id)<=0&&(e.habitMissed[s.id]=!0)}),e.tasks.forEach(s=>{s.missed=!s.done})}function rt(t){const e=l.days[t];return!e||e.lockOverride==="unlocked"?!1:e.lockOverride==="locked"||e.locked===!0?!0:l.settings.autoLock?Date.now()>=le(t).getTime():!1}function Ee(t){if(ve())return rt(t);const e=M(t);return e.lockOverride==="unlocked"?!1:e.lockOverride==="locked"||e.locked?((!Array.isArray(e.lockedHabits)||!e.habitMissed)&&pe(t),!0):l.settings.autoLock&&Date.now()>=le(t).getTime()?(e.locked=!0,e.lockOverride="locked",e.submittedAt=e.submittedAt||le(t).toISOString(),pe(t),$(),!0):!1}function M(t){if(!l.days[t]){const e=be();if(ve())return e;l.days[t]=e}return l.days[t]}function ee(t){const e=String(t);Object.values(l.days).forEach(a=>{!Array.isArray(a.skippedPins)||!a.skippedPins.includes(e)||(a.skippedPins=a.skippedPins.filter(s=>s!==e))})}function Le(t){const e=M(t);if(Gt(t)||ve())return e;let a=!1;const s=new Set(Array.isArray(e.skippedPins)?e.skippedPins.map(String):[]);if(e.tasks.length>1){const i=aa(e.tasks);i.length!==e.tasks.length&&(e.tasks=i,a=!0)}return l.pinnedTasks.forEach(i=>{Lt(i,t)&&Mt(i.pin,t)&&(s.has(String(i.id))||e.tasks.some(n=>n.sourcePinId===i.id)||(e.tasks.push({id:`ptask-${i.id}-${t}`,title:i.title,points:i.points,description:i.description||"",category:E(i.category),tags:D(i.tags),rating:0,done:!1,missed:!1,sourcePinId:i.id,image:_(i.image)}),a=!0))}),a&&$(),e}function oa(t){return!(!t||t.pin&&t.pin.mode==="forever")}function Wa(t,e){let a=Ft(e),s=0;for(;s<800;){if(s+=1,Lt(t,a)&&Mt(t.pin,a))return a;a=Ft(a)}return""}function _t(t,e,a=[],s=[]){if(!t||!/^\d{4}-\d{2}-\d{2}$/.test(String(e||"")))return{allowed:!1,next:"",days:[]};let i=t;if(a.length||s.length){const c=a.map(String),g=s.map(String),v=F(t.pin);v.exceptDates=(v.exceptDates||[]).filter(p=>!c.includes(p)),v.customDates=(v.customDates||[]).filter(p=>!g.includes(p)),i={...t,pin:v}}if(!oa(i))return{allowed:!1,next:"",days:[]};if(!Lt(i,e)||!Mt(i.pin,e))return{allowed:!1,next:"",days:[]};const n=Wa(i,e);if(!n)return{allowed:!1,next:"",days:[]};const r=[];let o=Ft(e),d=0;for(;o<n&&d<400;)d+=1,r.push(o),o=Ft(o);return r.length?{allowed:!0,next:n,days:r}:{allowed:!1,next:n,days:[]}}function Ua(t,e){const a=t.pin||{},s=Array.isArray(a.exceptDates)?a.exceptDates:[];return s.includes(e)&&(Array.isArray(a.customDates)?a.customDates:[]).filter(n=>n>e).filter(n=>!s.includes(n)).sort().find(n=>_t(t,e,[e],[n]).days.includes(n))||""}function za(t,e){const a=t.pin||{};if(!(Array.isArray(a.customDates)?a.customDates:[]).includes(e))return"";const i=Array.isArray(a.exceptDates)?a.exceptDates:[];let n="";return i.forEach(r=>{r>=e||_t(t,r,[r],[e]).days.includes(e)&&(!n||r>n)&&(n=r)}),n}function U(t){return!u.isLocked(t)}function Me(t){const e=K().find(a=>a.label.toLowerCase()===String(t||"").trim().toLowerCase());return e?e.id:"mentally"}function He(t){return!t||typeof t!="object"||Array.isArray(t)?[]:Array.isArray(t.days)?t.days.filter(e=>e&&/^\d{4}-\d{2}-\d{2}$/.test(String(e.date||""))):[]}const u={todayKey:j,exportBackup(){return JSON.stringify({app:"Daily Report",kind:"full-backup",version:1,exportedAt:new Date().toISOString(),data:l},null,2)},backupKind(t){if(!t||typeof t!="object"||Array.isArray(t))return"invalid";const e=t.data&&typeof t.data=="object"&&!Array.isArray(t.data)?t.data:t;return Array.isArray(e.days)?"report-export":Array.isArray(e.categories)||Array.isArray(e.plans)||Array.isArray(e.schedule)?"wrong-app":typeof e!="object"||e===null||e.habits!==void 0&&!Array.isArray(e.habits)||e.days!==void 0&&(typeof e.days!="object"||e.days===null||Array.isArray(e.days))||e.settings!==void 0&&(typeof e.settings!="object"||e.settings===null||Array.isArray(e.settings))||!["habits","pinnedTasks","days","goals","badges","settings"].some(s=>e[s]!==void 0)?"invalid":"ok"},importBackup(t){if(this.backupKind(t)!=="ok")return!1;const e=t.data&&typeof t.data=="object"&&!Array.isArray(t.data)?t.data:t;return l=ia(e),B=l.customCategories||[],l.customCategories=B,Z=l.categoryOverrides||{},l.categoryOverrides=Z,$(),!0},previewReport(t){const e=He(t);if(!e.length)return{days:0,start:"",end:"",newHabits:0};const a=new Set(l.habits.map(n=>String(n.name||"").trim().toLowerCase())),s=new Set;e.forEach(n=>{(Array.isArray(n.habits)?n.habits:[]).forEach(r=>{const o=String(r&&r.name||"").trim().toLowerCase();o&&!a.has(o)&&s.add(o)})});const i=e.map(n=>String(n.date)).sort();return{days:e.length,start:i[0],end:i[i.length-1],newHabits:s.size}},importReport(t){const e=He(t);if(!e.length)return!1;const a=e.map(o=>String(o.date)).sort(),s=a[a.length-1],i={};l.habits.forEach(o=>{i[String(o.name||"").trim().toLowerCase()]=o});let n=0;const r=Date.now();return e.forEach((o,d)=>{const c=String(o.date);(Array.isArray(o.habits)?o.habits:[]).forEach(p=>{const w=String(p&&p.name||"").trim().slice(0,80);if(!w)return;const P=w.toLowerCase();if(!i[P]){const S={id:`h${r}_${n}`,name:w,description:String(p&&p.description||"").slice(0,2e3),points:Number(p&&p.points||10)||10,icon:"star",category:Me(p&&p.category),consciousPoints:Y(p&&p.consciousPoints),tags:D(p&&p.tags),pin:{mode:"until",until:s,weekdays:[],monthDays:[],yearDays:[],customDates:[],exceptDates:[]},startFrom:a[0]};l.habits.push(S),i[P]=S,n+=1}});const g=be();g.note=String(o.note||""),g.locked=!0,g.lockOverride="locked",g.submittedAt=null;const v=[];(Array.isArray(o.habits)?o.habits:[]).forEach(p=>{const w=i[String(p&&p.name||"").trim().toLowerCase()];if(!w)return;const P=Math.max(0,Math.min(5,Number(p&&p.rating||0)));g.habitRatings[w.id]=P,g.habits[w.id]=P>0,P<=0&&(g.habitMissed[w.id]=!0),w.startFrom&&c<w.startFrom&&(w.startFrom=c),v.push({id:w.id,name:w.name,description:w.description,points:w.points,icon:w.icon||"star",category:E(w.category),consciousPoints:Y(w.consciousPoints),tags:D(w.tags),pin:F(w.pin)})}),g.lockedHabits=v,g.tasks=(Array.isArray(o.tasks)?o.tasks:[]).map((p,w)=>({id:`t${r}_${d}_${w}`,title:String(p&&p.title||"Task").slice(0,120),points:Number(p&&p.points||5)||5,description:String(p&&p.description||""),category:Me(p&&p.category),tags:D(p&&p.tags),rating:Math.max(0,Math.min(5,Number(p&&p.rating||0))),done:!!(p&&p.done),missed:!(p&&p.done),image:"",forwardedFrom:/^\d{4}-\d{2}-\d{2}$/.test(String(p&&p.forwardedFrom||""))?String(p.forwardedFrom):"",forwardedHabitId:"",forwardedTo:Array.isArray(p&&p.forwardedTo)?p.forwardedTo.filter(P=>/^\d{4}-\d{2}-\d{2}$/.test(String(P))).map(String).slice(0,50):[]})),l.days[c]=g}),$(),{days:e.length,habits:n}},getSettings(){return l.settings},setLockTime(t){l.settings.lockTime=t||"21:00",$()},setAutoLock(t){l.settings.autoLock=!!t,$()},setShowConscious(t){l.settings.showConscious=!!t,$()},consciousEnabled(){return l.settings.showConscious!==!1},setHabitSort(t){l.settings.habitSort=["default","points","category","tags","custom"].includes(t)?t:"default",$()},setTaskSort(t){l.settings.taskSort=["default","points","category","tags","custom"].includes(t)?t:"default",$()},getWeekStart(){return se(l.settings.weekStart)},setWeekStart(t){l.settings.weekStart=se(t),$()},getTheme(){return l.settings.theme==="light"?"light":"dark"},setTheme(t){l.settings.theme=t==="light"?"light":"dark",$()},getHabits(t,e){if(t&&Gt(t)){const n=l.days[t];if(n&&Array.isArray(n.lockedHabits)){const r=e||l.settings.habitSort||"default",o=[...n.lockedHabits];return r==="default"||r==="custom"?Nt(o,l.settings.habitOrder):Kt(o,r)}}const a=e||l.settings.habitSort||"default",s=na(t),i=a==="default"||a==="custom"?Nt(s,l.settings.habitOrder):Kt(s,a);return a==="default"||a==="custom"?i.slice().sort((n,r)=>+!!r.pin-+!!n.pin):i},getTasks(t,e){const a=this.getDay(t),s=e||l.settings.taskSort||"default";return s==="default"||s==="custom"?a.tasks:Kt(a.tasks,s)},getAllHabits(){return l.habits},getPinnedHabits(){return Nt(l.habits.filter(t=>!!t.pin),l.settings.habitOrder)},setPinnedHabitOrder(t){const e=new Set(l.habits.filter(n=>n.pin).map(n=>String(n.id))),a=(Array.isArray(t)?t:[]).map(String).filter(n=>e.has(n)),s=new Set(a);e.forEach(n=>{s.has(n)||a.push(n)});const i=l.settings.habitOrder.filter(n=>!e.has(n));l.settings.habitOrder=[...a,...i].slice(0,300),$()},getHabitActivity(t,e=30){const a=String(t||"");return a?Object.keys(l.days).sort().reverse().flatMap(s=>{const i=l.days[s],n=i.habitForwarded&&i.habitForwarded[a],r=!!(i.habits&&i.habits[a])||!!(i.habitMissed&&i.habitMissed[a])||[i.habitRatings,i.habitMissed].some(c=>c&&Object.prototype.hasOwnProperty.call(c,a))||Array.isArray(n)&&n.length>0,o=Array.isArray(i.lockedHabits)&&i.lockedHabits.some(c=>String(c.id)===a);if(!r&&!o)return[];const d=Xt(i,a);return[{date:s,rating:d,status:d?"Completed":i.habitMissed[a]||o&&rt(s)?"Missed":"Not rated",locked:rt(s)}]}).slice(0,Math.max(1,Math.min(365,Number(e)||30))):[]},getPinnedTasks(){return Nt(l.pinnedTasks,l.settings.pinnedTaskOrder)},setPinnedTaskOrder(t){const e=new Set(l.pinnedTasks.map(i=>String(i.id))),a=(Array.isArray(t)?t:[]).map(String).filter(i=>e.has(i)),s=new Set(a);l.pinnedTasks.forEach(i=>{const n=String(i.id);s.has(n)||a.push(n)}),l.settings.pinnedTaskOrder=a.slice(0,300),$()},getDay(t){return Ee(t),Le(t)},isLocked(t){return Ee(t)},submitDay(t){const e=M(t);e.locked=!0,e.lockOverride="locked",e.submittedAt=new Date().toISOString(),pe(t),$(),this.checkGoals(t)},unlockDay(t){const e=M(t);e.locked=!1,e.lockOverride="unlocked",e.habitMissed={},e.lockedHabits=null,e.tasks.forEach(a=>{a.missed=!1}),$()},isHabitMissed(t,e){const a=l.days[t];return!a||!(a.locked||a.lockOverride==="locked")||!this.getHabits(t).some(s=>s.id===e)||ue(t,e)>0?!1:(a.habitMissed&&a.habitMissed[e],!0)},isTaskMissed(t,e){const a=l.days[t];if(!a)return!1;const s=(a.tasks||[]).find(i=>i.id===e);return s?s.missed===!0?!0:s.missed===!1?!1:!!(a.locked||a.lockOverride==="locked")&&!s.done:!1},missedCounts(t){return it(()=>{const e=this.getDay(t),a=this.getHabits(t),s=rt(t);return{habits:a.filter(i=>e.habitMissed&&e.habitMissed[i.id]?!0:s&&ue(t,i.id)<=0).length,tasks:e.tasks.filter(i=>i.done?!1:i.missed===!0?!0:i.missed===!1?!1:s).length}})},lockDay(t){this.submitDay(t)},lockDays(t){let e=0;return t.forEach(a=>{this.isLocked(a)||(this.submitDay(a),e+=1)}),e},unlockDays(t){let e=0;return t.forEach(a=>{this.isLocked(a)&&(this.unlockDay(a),e+=1)}),e},lockedReports(){return it(()=>Object.keys(l.days).sort().reverse().filter(t=>rt(t)).map(t=>({date:t,submittedAt:l.days[t].submittedAt,...this.scoreFor(t)})))},habitRating(t,e){const a=l.days[t];return a?a.habitRatings&&a.habitRatings[e]!=null?Number(a.habitRatings[e])||0:a.habits&&a.habits[e]?5:0:0},setHabitRating(t,e,a){if(!U(t))return;const s=M(t),i=Math.max(0,Math.min(5,Number(a)||0));s.habitRatings[e]=i,s.habits[e]=i>0,$(),this.checkGoals(t)},toggleHabit(t,e){if(!U(t))return;const a=this.habitRating(t,e)>0?0:5;this.setHabitRating(t,e,a)},addTask(t,e,a,s={}){if(!U(t))return;M(t).tasks.push({id:ot("t"),title:e.trim(),points:Number(a)||5,description:String(s.description||"").trim(),category:E(s.category),tags:D(s.tags),rating:Math.max(0,Math.min(5,Number(s.rating)||0)),done:!1,missed:!1,forwardedFrom:/^\d{4}-\d{2}-\d{2}$/.test(String(s.forwardedFrom||""))?String(s.forwardedFrom):"",forwardedHabitId:String(s.forwardedHabitId||""),forwardedTo:[],image:_(s.image)}),$(),this.checkGoals(t)},setTaskRating(t,e,a){if(!U(t))return;const i=M(t).tasks.find(r=>r.id===e);if(!i)return;const n=Math.max(0,Math.min(5,Number(a)||0));i.rating=n,$()},setTaskOrder(t,e){if(!U(t))return;const a=M(t),s=(Array.isArray(e)?e:[]).map(String).filter(Boolean);if(!s.length)return;const i=new Map(s.map((r,o)=>[r,o])),n=a.tasks.slice().sort((r,o)=>{const d=i.has(r.id)?i.get(r.id):Number.MAX_SAFE_INTEGER,c=i.has(o.id)?i.get(o.id):Number.MAX_SAFE_INTEGER;return d-c});a.tasks=n,$()},setHabitOrder(t){const e=(Array.isArray(t)?t:[]).map(String).filter(Boolean);e.length&&(l.settings.habitOrder=e.slice(0,300),$())},toggleTask(t,e){if(!U(t))return;const s=M(t).tasks.find(i=>i.id===e);s&&(s.done=!s.done,$(),this.checkGoals(t))},removeTask(t,e){if(!U(t))return;const a=M(t),s=a.tasks.find(n=>n.id===e);a.tasks=a.tasks.filter(n=>n.id!==e);const i=s&&s.sourcePinId?String(s.sourcePinId):"";i&&(Array.isArray(a.skippedPins)||(a.skippedPins=[]),a.skippedPins.includes(i)||a.skippedPins.push(i),a.skippedPins.length>100&&a.skippedPins.splice(0,a.skippedPins.length-100)),$()},forwardTask(t,e,a){if(!/^\d{4}-\d{2}-\d{2}$/.test(String(a||"")))return{ok:!1,reason:"Pick a valid date"};if(t===a)return{ok:!1,reason:"Already on that day"};if(!U(t))return{ok:!1,reason:"Source day is locked"};if(this.isLocked(a))return{ok:!1,reason:"Target day is locked"};const i=M(t).tasks.find(d=>d.id===e);if(!i)return{ok:!1,reason:"Task not found"};const n=M(a),r=String(i.title||"").trim().toLowerCase();if(n.tasks.some(d=>String(d.title||"").trim().toLowerCase()===r))return{ok:!1,reason:"That task is already on that day"};n.tasks.push({id:ot("t"),title:i.title,points:Number(i.points)||5,description:String(i.description||""),category:E(i.category),tags:D(i.tags),rating:0,done:!1,missed:!1,forwardedFrom:t,forwardedHabitId:String(i.forwardedHabitId||""),forwardedTo:[],image:_(i.image)});const o=Array.isArray(i.forwardedTo)?i.forwardedTo:[];return o.includes(a)||o.push(a),i.forwardedTo=o.slice(0,50),$(),this.checkGoals(a),{ok:!0}},habitForwardedTo(t,e){const a=l.days[t];if(!a||!a.habitForwarded)return[];const s=a.habitForwarded[e];return Array.isArray(s)?s:[]},habitReplaceDays(t,e){const a=l.habits.find(i=>i.id===e),s=_t(a,t);return{allowed:s.allowed,next:s.next,days:s.days.slice()}},replaceHabit(t,e,a){if(!/^\d{4}-\d{2}-\d{2}$/.test(String(a||"")))return{ok:!1,reason:"Pick a valid date"};if(String(a)===String(t))return{ok:!1,reason:"Already on that day"};const s=l.habits.find(r=>r.id===e);if(!s)return{ok:!1,reason:"Habit not found"};if(!oa(s))return{ok:!1,reason:"This habit is pinned forever — every day is already its day"};if(!U(t))return{ok:!1,reason:"That day is locked"};if(this.isLocked(a))return{ok:!1,reason:"That day is locked"};const i=_t(s,t);if(!i.allowed)return{ok:!1,reason:"No replace days available for this habit"};if(!i.days.includes(a))return{ok:!1,reason:`Pick a day before ${i.next}`};const n=F(s.pin);return n.exceptDates.includes(t)||(n.exceptDates=[...n.exceptDates,t].sort()),n.customDates.includes(a)||(n.customDates=[...n.customDates,a].sort()),s.pin=n,$(),this.checkGoals(a),{ok:!0,from:t,to:a}},undoReplaceHabit(t,e,a){const s=l.habits.find(n=>n.id===t);if(!s)return{ok:!1,reason:"Habit not found"};const i=F(s.pin);return i.exceptDates=(i.exceptDates||[]).filter(n=>n!==e),i.customDates=(i.customDates||[]).filter(n=>n!==a),s.pin=i,$(),{ok:!0}},habitReplacedTo(t,e){const a=l.habits.find(s=>s.id===e);return a?Ua(a,t):""},habitReplacedFrom(t,e){const a=l.habits.find(s=>s.id===e);return a?za(a,t):""},setNote(t,e){U(t)&&(M(t).note=e,$())},addHabit(t,e,a={}){l.habits.push({id:ot("h"),name:t.trim(),description:String(a.description||"").trim().slice(0,2e3),points:Number(e)||10,icon:"star",category:E(a.category||"physically"),consciousPoints:Y(a.consciousPoints),tags:D(a.tags),pin:F({mode:"forever"}),startFrom:Et(a.startFrom)||j()}),$()},updateHabit(t,e){const a=l.habits.find(s=>s.id===t);a&&(e.name!=null&&(a.name=String(e.name).trim()||a.name),e.description!=null&&(a.description=String(e.description).trim().slice(0,2e3)),e.points!=null&&(a.points=Number(e.points)||a.points),e.category!=null&&(a.category=E(e.category)),e.consciousPoints!=null&&(a.consciousPoints=Y(e.consciousPoints)),e.tags!=null&&(a.tags=D(e.tags)),$())},updateTask(t,e,a){if(!U(t))return;const i=M(t).tasks.find(n=>n.id===e);if(i){if(a.title!=null&&(i.title=String(a.title).trim()||i.title),a.points!=null&&(i.points=Number(a.points)||i.points),a.description!=null&&(i.description=String(a.description).trim()),a.category!=null&&(i.category=E(a.category)),a.tags!=null&&(i.tags=D(a.tags)),a.image!==void 0&&(i.image=_(a.image)),a.rating!=null&&(i.rating=Math.max(0,Math.min(5,Number(a.rating)||0))),i.sourcePinId){const n=l.pinnedTasks.find(r=>r.id===i.sourcePinId);n&&(n.title=i.title,n.points=i.points,n.description=i.description,n.category=i.category,a.tags!=null&&(n.tags=D(a.tags)),a.image!==void 0&&(n.image=_(a.image)))}$()}},habitStreak(t,e){const a=_a(t);if(!a)return 0;let s=e,i=0;this.habitRating(s,t)===0&&(s=vt(s));let n=0;for(;i<400;){if(i+=1,!Lt(a,s)||!Mt(a.pin,s)){s=vt(s);continue}if(this.habitRating(s,t)>0){n+=1,s=vt(s);continue}break}return n},categoryBreakdown(t){const e=this.getDay(t),a=this.getHabits(t);return K().map(s=>{const i=a.filter(S=>E(S.category)===s.id),n=e.tasks.filter(S=>E(S.category)===s.id),r=i.reduce((S,f)=>{const T=this.habitRating(t,f.id);return S+Math.round(f.points*T/5)},0),o=l.settings.showConscious!==!1,d=o?i.reduce((S,f)=>S+(this.habitRating(t,f.id)>0?Y(f.consciousPoints):0),0):0,c=i.reduce((S,f)=>S+f.points,0),g=o?i.reduce((S,f)=>S+Y(f.consciousPoints),0):0,v=n.reduce((S,f)=>S+(f.done?f.points:0),0),p=n.reduce((S,f)=>S+f.points,0),w=i.map(S=>this.habitRating(t,S.id)),P=w.length?Math.round(w.reduce((S,f)=>S+f,0)/w.length*10)/10:0;return{...s,habits:i,tasks:n,earned:r+d+v,max:c+g+p,habitAvg:P,consciousEarned:d,consciousMax:g,completed:i.filter(S=>this.habitRating(t,S.id)>0).length+n.filter(S=>S.done).length,total:i.length+n.length}})},removeHabit(t){const e=l.habits.find(a=>a.id===t);e&&qa(e),l.habits=l.habits.filter(a=>a.id!==t),$()},getArchivedHabits(){return(l.archivedHabits||[]).map(t=>({...t}))},deleteArchivedHabit(t){const e=(l.archivedHabits||[]).length;return l.archivedHabits=(l.archivedHabits||[]).filter(a=>a.id!==t),l.archivedHabits.length===e?{ok:!1,reason:"That habit is no longer archived"}:($(),{ok:!0})},archiveTask(t,e){if(!U(t))return{ok:!1,reason:"Day is locked"};const a=M(t),s=a.tasks.find(n=>n.id===e);if(!s)return{ok:!1,reason:"Task not found"};l.archivedTasks||(l.archivedTasks=[]),l.archivedTasks.unshift(ea(s,new Date().toISOString(),t)),l.archivedTasks.length>500&&(l.archivedTasks.length=500),a.tasks=a.tasks.filter(n=>n.id!==e);const i=s.sourcePinId?String(s.sourcePinId):"";return i&&(Array.isArray(a.skippedPins)||(a.skippedPins=[]),a.skippedPins.includes(i)||a.skippedPins.push(i)),$(),{ok:!0}},getArchivedTasks(){return(l.archivedTasks||[]).map(t=>({...t}))},restoreTask(t,e){const a=(l.archivedTasks||[]).findIndex(c=>c.id===t);if(a<0)return{ok:!1,reason:"That task is no longer archived"};const s=l.archivedTasks[a],i=e||j();Le(i);const n=M(i),r=String(s.title||"").trim().toLowerCase();if(n.tasks.some(c=>String(c.title||"").trim().toLowerCase()===r))return{ok:!1,reason:"That task is already on that day"};const d=/^\d{4}-\d{2}-\d{2}$/.test(String(s.originDate||""))?String(s.originDate):"";return n.tasks.push({id:ot("t"),title:s.title,points:Number(s.points)||5,description:String(s.description||""),category:E(s.category),tags:D(s.tags),rating:0,done:!1,missed:!1,forwardedFrom:d&&d!==i?d:"",forwardedHabitId:"",forwardedTo:[],image:_(s.image),sourcePinId:String(s.sourcePinId||"")}),l.archivedTasks.splice(a,1),$(),{ok:!0,from:d,to:i}},deleteArchivedTask(t){const e=(l.archivedTasks||[]).length;return l.archivedTasks=(l.archivedTasks||[]).filter(a=>a.id!==t),l.archivedTasks.length===e?{ok:!1,reason:"That task is no longer archived"}:($(),{ok:!0})},restoreHabit(t){const e=(l.archivedHabits||[]).findIndex(i=>i.id===t);if(e<0)return{ok:!1,reason:"That habit is no longer archived"};const a=l.archivedHabits[e];if(l.habits.some(i=>i.id===a.id))return l.archivedHabits.splice(e,1),$(),{ok:!0};const s={...a,description:String(a.description||"").slice(0,2e3),category:E(a.category),consciousPoints:Y(a.consciousPoints),tags:D(a.tags),pin:F(a.pin),archivedAt:null};return l.habits.push(s),l.archivedHabits.splice(e,1),$(),{ok:!0,habit:{...s}}},pinHabit(t,e){const a=l.habits.find(s=>s.id===t);a&&(a.pin=F(e),$())},updatePinnedTaskDetails(t,e){const a=l.pinnedTasks.find(s=>s.id===t);if(a){if(e.title!=null&&(a.title=String(e.title).trim().slice(0,120)||a.title),e.points!=null){const s=Number(e.points);Number.isFinite(s)&&(a.points=Math.max(0,s))}e.description!=null&&(a.description=String(e.description).trim().slice(0,2e3)),e.category!=null&&(a.category=E(e.category)),e.tags!=null&&(a.tags=D(e.tags)),e.image!==void 0&&(a.image=_(e.image)),ee(t),$()}},unpinHabit(t){const e=l.habits.find(a=>a.id===t);e&&(e.pin=null,$())},pinTask(t,e,a){if(!U(t))return;const i=M(t).tasks.find(o=>o.id===e);if(!i)return;const n=i.sourcePinId?l.pinnedTasks.find(o=>o.id===i.sourcePinId):null;if(n){n.pin=F(a),ee(n.id),$();return}const r=ot("p");l.pinnedTasks.push({id:r,title:i.title,points:i.points,description:i.description||"",category:E(i.category),tags:D(i.tags),pin:F(a),startFrom:t,image:_(i.image)}),i.sourcePinId=r,$()},unpinTaskTemplate(t){l.pinnedTasks=l.pinnedTasks.filter(a=>a.id!==t);const e=String(t);Object.entries(l.days).forEach(([a,s])=>{if(!Array.isArray(s.tasks)||!s.tasks.length||Gt(a))return;const i=s.tasks.length;s.tasks=s.tasks.filter(n=>String(n&&n.sourcePinId||"")!==e),s.tasks.length!==i&&(Array.isArray(s.skippedPins)||(s.skippedPins=[]),s.skippedPins=s.skippedPins.filter(n=>n!==e))}),$()},updatePinnedTask(t,e){const a=l.pinnedTasks.find(s=>s.id===t);a&&(a.pin=F(e),ee(t),$())},findHabit(t){return l.habits.find(e=>e.id===t)||null},findTask(t,e){return M(t).tasks.find(a=>a.id===e)||null},findPinnedTask(t){return l.pinnedTasks.find(e=>e.id===t)||null},getInstalledAt(){return String(l.installedAt||new Date().toISOString())},getProfile(){const t=xt(l.profile);return l.profile=t,JSON.parse(JSON.stringify(t))},setProfileField(t,e){return!Object.prototype.hasOwnProperty.call(re,t)||l.profile.locked?!1:((!l.profile||typeof l.profile!="object")&&(l.profile=xt({})),l.profile[t]=String(e||"").slice(0,re[t]),$(),!0)},setProfileLocked(t){(!l.profile||typeof l.profile!="object")&&(l.profile=xt({})),l.profile.locked=!!t,$()},isProfileLocked(){return!!(l.profile&&l.profile.locked)},profileGoalDurations(){return JSON.parse(JSON.stringify($t))},addWhoAmI(t){if(l.profile.locked)return{ok:!1,reason:"Profile is locked"};const e=String(t||"").trim().slice(0,120);return e?(l.profile.whoAmI||[]).length>=50?{ok:!1,reason:"List is full (50)"}:(l.profile.whoAmI.push({id:q("w"),text:e}),$(),{ok:!0}):{ok:!1,reason:"Type something first"}},updateWhoAmI(t,e){if(l.profile.locked)return;const a=(l.profile.whoAmI||[]).find(i=>i.id===t);if(!a)return;const s=String(e||"").trim().slice(0,120);s?a.text=s:l.profile.whoAmI=l.profile.whoAmI.filter(i=>i.id!==t),$()},moveWhoAmI(t,e){if(l.profile.locked)return;const a=l.profile.whoAmI||[],s=a.findIndex(r=>r.id===t),i=s+e;if(s<0||i<0||i>=a.length)return;const[n]=a.splice(s,1);a.splice(i,0,n),$()},removeWhoAmI(t){l.profile.locked||(l.profile.whoAmI=(l.profile.whoAmI||[]).filter(e=>e.id!==t),$())},addLifeArea(t){if(l.profile.locked)return{ok:!1,reason:"Profile is locked"};const e=String(t||"").trim().slice(0,60);if(!e)return{ok:!1,reason:"Name the life area"};if((l.profile.lifeAreas||[]).length>=20)return{ok:!1,reason:"Max 20 areas"};const a={id:q("a"),title:e,description:""};return l.profile.lifeAreas.push(a),$(),{ok:!0,id:a.id}},updateLifeArea(t,e={}){if(l.profile.locked)return;const a=(l.profile.lifeAreas||[]).find(s=>s.id===t);a&&(e.title!=null&&(a.title=String(e.title).trim().slice(0,60)||a.title),e.description!=null&&(a.description=String(e.description).slice(0,1e3)),$())},moveLifeArea(t,e){if(l.profile.locked)return;const a=l.profile.lifeAreas||[],s=a.findIndex(r=>r.id===t),i=s+e;if(s<0||i<0||i>=a.length)return;const[n]=a.splice(s,1);a.splice(i,0,n),$()},removeLifeArea(t){l.profile.locked||(l.profile.lifeAreas=(l.profile.lifeAreas||[]).filter(e=>e.id!==t),$())},addProfileGoal(t,e,a){if(l.profile.locked)return{ok:!1,reason:"Profile is locked"};const s=String(t||"").trim().slice(0,200);if(!s)return{ok:!1,reason:"Write your goal first"};const i=de.includes(e)?e:"short",n=$t[i],r=n.includes(a)?a:n[0];if((l.profile.pGoals||[]).length>=100)return{ok:!1,reason:"Too many goals (100)"};const o={id:q("g"),text:s,term:i,duration:r,createdAt:new Date().toISOString()};return l.profile.pGoals.push(o),$(),{ok:!0,id:o.id}},updateProfileGoal(t,e={}){if(l.profile.locked)return;const a=(l.profile.pGoals||[]).find(s=>s.id===t);if(a){if(e.text!=null&&(a.text=String(e.text).trim().slice(0,200)||a.text),e.term!=null&&de.includes(e.term)){a.term=e.term;const s=$t[a.term];s.includes(a.duration)||(a.duration=s[0])}e.duration!=null&&$t[a.term].includes(e.duration)&&(a.duration=e.duration),$()}},removeProfileGoal(t){l.profile.locked||(l.profile.pGoals=(l.profile.pGoals||[]).filter(e=>e.id!==t),$())},addQuote(t,e){if(l.profile.locked)return{ok:!1,reason:"Profile is locked"};const a=String(t||"").trim().slice(0,500);if(!a)return{ok:!1,reason:"Write the quote first"};if((l.profile.quotes||[]).length>=200)return{ok:!1,reason:"Too many quotes (200)"};const s={id:q("q"),text:a,author:String(e||"").trim().slice(0,80),fav:!1,createdAt:new Date().toISOString()};return l.profile.quotes.push(s),$(),{ok:!0,id:s.id}},updateQuote(t,e={}){if(l.profile.locked)return;const a=(l.profile.quotes||[]).find(s=>s.id===t);a&&(e.text!=null&&(a.text=String(e.text).trim().slice(0,500)||a.text),e.author!=null&&(a.author=String(e.author).trim().slice(0,80)),$())},toggleQuoteFav(t){if(l.profile.locked)return;const e=(l.profile.quotes||[]).find(a=>a.id===t);e&&(e.fav=!e.fav,$())},removeQuote(t){l.profile.locked||(l.profile.quotes=(l.profile.quotes||[]).filter(e=>e.id!==t),$())},getCategories(){return K().map(t=>({...t}))},getCustomCategories(){return B.map(t=>({...t}))},addCategory(t){const e=String(t||"").trim().slice(0,30);if(!e)return{ok:!1,reason:"Type a category name"};if(K().some(i=>i.label.toLowerCase()===e.toLowerCase()))return{ok:!1,reason:"That category already exists"};if(B.length>=20)return{ok:!1,reason:"Too many categories (max 20 custom)"};let s=`c${Date.now().toString(36)}`;return K().some(i=>i.id===s)&&(s=`c${Date.now().toString(36)}${Math.floor(Math.random()*99)}`),B.push({id:s,label:e}),$(),{ok:!0,id:s}},renameCategory(t,e){const a=B.find(n=>n.id===t);if(!a)return{ok:!1,reason:"Built-in categories can’t be renamed"};const s=String(e||"").trim().slice(0,30);return s?K().some(n=>n.id!==t&&n.label.toLowerCase()===s.toLowerCase())?{ok:!1,reason:"That category already exists"}:(a.label=s,$(),{ok:!0}):{ok:!1,reason:"Type a category name"}},updateCategory(t,e={}){const a=B.find(s=>s.id===t);if(!a){if(!Pt.find(n=>n.id===t))return{ok:!1,reason:"Category not found"};const i={...Z[t]||{}};return e.color!==void 0&&(i.color=String(e.color).slice(0,20)),e.goals!==void 0&&(i.goals=String(e.goals).slice(0,1e3)),Z[t]=i,l.categoryOverrides=Z,$(),{ok:!0}}return e.color!==void 0&&(a.color=String(e.color).slice(0,20)),e.goals!==void 0&&(a.goals=String(e.goals).slice(0,1e3)),$(),{ok:!0}},deleteCategory(t){const e=B.findIndex(a=>a.id===t);return e<0?{ok:!1,reason:"Built-in categories can’t be deleted"}:(B.splice(e,1),l.habits.forEach(a=>{a.category===t&&(a.category="mentally")}),(l.archivedHabits||[]).forEach(a=>{a.category===t&&(a.category="mentally")}),l.pinnedTasks.forEach(a=>{a.category===t&&(a.category="mentally")}),Object.values(l.days).forEach(a=>{(a.tasks||[]).forEach(s=>{s.category===t&&(s.category="mentally")})}),$(),{ok:!0})},getAllTags(){const t=new Map,e=a=>{D(a).forEach(s=>{t.set(s,(t.get(s)||0)+1)})};return l.habits.forEach(a=>e(a.tags)),(l.archivedHabits||[]).forEach(a=>e(a.tags)),l.pinnedTasks.forEach(a=>e(a.tags)),Object.values(l.days).forEach(a=>{(a.tasks||[]).forEach(s=>e(s.tags))}),[...t.entries()].map(([a,s])=>({tag:a,count:s})).sort((a,s)=>s.count-a.count||a.tag.localeCompare(s.tag))},renameTag(t,e){const a=String(t||"").trim(),s=D(e)[0]||"";if(!a||!s)return{ok:!1,reason:"Type a tag name"};if(a.toLowerCase()===s.toLowerCase()){const r=o=>D((o||[]).map(d=>String(d).toLowerCase()===a.toLowerCase()?s:d));return l.habits.forEach(o=>{o.tags=r(o.tags)}),(l.archivedHabits||[]).forEach(o=>{o.tags=r(o.tags)}),l.pinnedTasks.forEach(o=>{o.tags=r(o.tags)}),Object.values(l.days).forEach(o=>{(o.tasks||[]).forEach(d=>{d.tags=r(d.tags)})}),$(),{ok:!0}}const i=this.getAllTags().some(r=>r.tag.toLowerCase()===s.toLowerCase()),n=r=>{const o=(r||[]).map(d=>String(d).toLowerCase()===a.toLowerCase()?s:d);return D(o)};return l.habits.forEach(r=>{r.tags=n(r.tags)}),(l.archivedHabits||[]).forEach(r=>{r.tags=n(r.tags)}),l.pinnedTasks.forEach(r=>{r.tags=n(r.tags)}),Object.values(l.days).forEach(r=>{(r.tasks||[]).forEach(o=>{o.tags=n(o.tags)})}),$(),{ok:!0,merged:i}},deleteTag(t){const e=String(t||"").trim().toLowerCase();if(!e)return{ok:!1,reason:"Pick a tag first"};const a=s=>(s||[]).filter(i=>String(i).toLowerCase()!==e);return l.habits.forEach(s=>{s.tags=a(s.tags)}),(l.archivedHabits||[]).forEach(s=>{s.tags=a(s.tags)}),l.pinnedTasks.forEach(s=>{s.tags=a(s.tags)}),Object.values(l.days).forEach(s=>{(s.tasks||[]).forEach(i=>{i.tags=a(i.tags)})}),$(),{ok:!0}},addTagToHabit(t,e){const a=l.habits.find(i=>i.id===t);if(!a)return{ok:!1,reason:"Pick a habit first"};const s=D(e)[0]||"";return s?(a.tags=D([...a.tags||[],s]),$(),{ok:!0}):{ok:!1,reason:"Type a tag name"}},categoryChart(t,e){const a=["week","month","year"].includes(t)?t:"week",s=`${a}|${e}|${sa}`;return te.key===s?te.value:it(()=>this._buildCategoryChart(a,e,s))},_buildCategoryChart(t,e,a){const s=K(),i=[];if(t==="year"){const g=String(e).slice(0,4);for(let v=0;v<12;v++){const p=String(v+1).padStart(2,"0"),w=new Date(Number(g),v+1,0).getDate();i.push({label:new Date(Number(g),v,1).toLocaleDateString(void 0,{month:"short"}),title:new Date(Number(g),v,1).toLocaleDateString(void 0,{month:"long",year:"numeric"}),keys:this.rangeKeys(`${g}-${p}-01`,`${g}-${p}-${String(w).padStart(2,"0")}`)})}}else{const[g,v]=this.resolveRange(t,e);this.rangeKeys(g,v).forEach(p=>{const w=new Date(`${p}T00:00:00`);i.push({label:t==="week"?w.toLocaleDateString(void 0,{weekday:"narrow"}):String(w.getDate()),title:p,keys:[p]})})}const n={},r={};s.forEach(g=>{n[g.id]=i.map(()=>0),r[g.id]=0}),i.forEach((g,v)=>{g.keys.forEach(p=>{this.categoryBreakdown(p).forEach(w=>{w.id in n||(n[w.id]=i.map(()=>0),r[w.id]=0),n[w.id][v]+=w.earned||0,r[w.id]+=w.earned||0})})});const o=i.map((g,v)=>s.reduce((p,w)=>p+(n[w.id]?n[w.id][v]:0),0)),d=Math.max(1,...o),c={kind:t,labels:i.map(g=>g.label),titles:i.map(g=>g.title),cats:s.map(g=>({...g})),perCat:n,totals:r,max:d,grandTotal:o.reduce((g,v)=>g+v,0)};return te={key:a,value:c},c},getGoals(){return l.goals},getBadges(){return[...l.badges].sort((t,e)=>{const a=Te(e.tier)-Te(t.tier);return a!==0?a:String(e.earnedAt).localeCompare(String(t.earnedAt))})},topBadges(t=3){return this.getBadges().slice(0,t)},addGoal(t={}){const e=oe({...t,id:ot("g")});return l.goals.push(e),$(),this.checkGoals(j()),e},updateGoal(t,e={}){const a=l.goals.find(i=>i.id===t);if(!a)return;const s=oe({...a,...e,id:t});Object.assign(a,s),$(),this.checkGoals(j())},removeGoal(t){l.goals=l.goals.filter(e=>e.id!==t),$()},removeBadge(t){l.badges=l.badges.filter(e=>e.id!==t),$()},perfectDaysCount(){return it(()=>Object.keys(l.days).filter(t=>{const e=this.scoreFor(t);return e.max>0&&e.percent===100}).length)},taskStreak(t,e){let a=e,s=0;(r=>{const o=l.days[r];return!o||!Array.isArray(o.tasks)?!1:o.tasks.some(d=>d.sourcePinId===t&&d.done)})(a)||(a=vt(a));let n=0;for(;s<400;){s+=1;const r=l.days[a];if(!r||!Array.isArray(r.tasks))break;if(r.tasks.some(o=>o.sourcePinId===t&&o.done)){n+=1,a=vt(a);continue}break}return n},goalProgress(t,e){const a=e||j();if(t.kind==="habit-streak"){const i=this.habitStreak(t.targetId,a);return{current:i,target:t.targetDays,done:i>=t.targetDays}}if(t.kind==="task-streak"){const i=this.taskStreak(t.targetId,a);return{current:i,target:t.targetDays,done:i>=t.targetDays}}const s=this.perfectDaysCount();return{current:s,target:t.targetDays,done:s>=t.targetDays}},checkGoals(t){const e=t||j();let a=[];return l.goals.forEach(s=>{if(l.badges.some(n=>n.goalId===s.id))return;if(this.goalProgress(s,e).done){const n={id:ot("b"),goalId:s.id,title:s.title,tier:s.tier,rewardTitle:s.rewardTitle,earnedAt:new Date().toISOString()};l.badges.push(n),a.push(n)}}),a.length&&$(),a},scoreFor(t){return it(()=>this._scoreFor(t))},_scoreFor(t){const e=this.getDay(t),a=this.getHabits(t),s=this.isLocked(t),i=l.settings.showConscious!==!1,n=a.reduce((S,f)=>{const T=this.habitRating(t,f.id);return S+Math.round(f.points*T/5)},0),r=i?a.reduce((S,f)=>S+(this.habitRating(t,f.id)>0?Y(f.consciousPoints):0),0):0,o=e.tasks.reduce((S,f)=>S+(f.done?f.points:0),0),d=a.reduce((S,f)=>S+f.points,0),c=i?a.reduce((S,f)=>S+Y(f.consciousPoints),0):0,g=e.tasks.reduce((S,f)=>S+f.points,0),v=n+r+o,p=d+c+g,w=a.filter(S=>e.habitMissed&&e.habitMissed[S.id]?!0:s&&this.habitRating(t,S.id)<=0).length,P=e.tasks.filter(S=>S.done?!1:S.missed===!0?!0:S.missed===!1?!1:s).length;return{earned:v,max:p,habitScore:n,consciousScore:r,maxConscious:c,taskScore:o,completedHabits:a.filter(S=>this.habitRating(t,S.id)>0).length,habitAvg:a.length?Math.round(a.reduce((S,f)=>S+this.habitRating(t,f.id),0)/a.length*10)/10:0,totalHabits:a.length,completedTasks:e.tasks.filter(S=>S.done).length,totalTasks:e.tasks.length,missedHabits:w,missedTasks:P,percent:p?Math.round(v/p*100):0,locked:s,submittedAt:e.submittedAt}},monthKeys(t){const e=String(t).slice(0,7);return Object.keys(l.days).filter(a=>a.startsWith(e)).sort()},rangeKeys(t,e){const a=[],s=new Date(`${t}T00:00:00`),i=new Date(`${e}T00:00:00`);let n=0;for(;s<=i&&n<732;)n+=1,a.push(j(s)),s.setDate(s.getDate()+1);return a},resolveRange(t,e){if(t==="day")return[e,e];if(t==="week"){const s=new Date(`${e}T00:00:00`),i=new Date(s);i.setDate(s.getDate()-(s.getDay()-this.getWeekStart()+7)%7);const n=new Date(i);return n.setDate(i.getDate()+6),[j(i),j(n)]}if(t==="month"){const[s,i]=e.split("-").map(Number),n=`${s}-${String(i).padStart(2,"0")}-01`,r=new Date(s,i,0).getDate(),o=`${s}-${String(i).padStart(2,"0")}-${String(r).padStart(2,"0")}`;return[n,o]}if(t==="year"){const s=e.slice(0,4);return[`${s}-01-01`,`${s}-12-31`]}const a=Object.keys(l.days).sort();return a.length?[a[0],a[a.length-1]>e?a[a.length-1]:e]:[e,e]},exportRows(t,e){return it(()=>this._exportRows(t,e))},_exportRows(t,e){return this.rangeKeys(t,e).map(a=>{const s=this.getDay(a),i=this.getHabits(a),n=this.scoreFor(a),r=this.isLocked(a),o=(c,g)=>g>0?"done":r?"missed":"pending",d=c=>c.done?"done":r?"missed":"pending";return{date:a,earned:n.earned,max:n.max,percent:n.percent,habitScore:n.habitScore,consciousScore:n.consciousScore||0,taskScore:n.taskScore,locked:r,missedHabits:n.missedHabits||0,missedTasks:n.missedTasks||0,note:s.note||"",habits:i.map(c=>{const g=this.habitRating(a,c.id);return{name:c.name,description:String(c.description||""),category:at(E(c.category)),tags:D(c.tags),points:c.points,consciousPoints:this.consciousEnabled()?Y(c.consciousPoints):0,rating:g,earned:Math.round(c.points*g/5)+(g>0&&this.consciousEnabled()?Y(c.consciousPoints):0),status:o(c.id,g)}}),tasks:s.tasks.map(c=>({title:c.title,category:at(E(c.category)),tags:D(c.tags),points:c.points,rating:Math.max(0,Math.min(5,Number(c.rating)||0)),done:!!c.done,earned:c.done?c.points:0,status:c.forwardedFrom?`forwarded from ${c.forwardedFrom}`:d(c),forwardedFrom:c.forwardedFrom||"",forwardedTo:Array.isArray(c.forwardedTo)?c.forwardedTo:[],description:c.description||"",hasImage:!!c.image}))}})},history(t=14){return it(()=>Object.keys(l.days).sort().reverse().slice(0,t).map(a=>({date:a,...this.scoreFor(a),note:l.days[a].note,locked:rt(a),submittedAt:l.days[a].submittedAt})))},week(t){return it(()=>{const e=new Date(t);return e.setDate(e.getDate()-(e.getDay()-this.getWeekStart()+7)%7),e.setHours(0,0,0,0),Array.from({length:7},(a,s)=>{const i=new Date(e);i.setDate(e.getDate()+s);const n=j(i),r=l.days[n];return{date:n,label:i.toLocaleDateString(void 0,{weekday:"short"}),dayOfMonth:i.getDate(),hasRecord:!!r,note:String(r&&r.note||""),locked:rt(n),...this.scoreFor(n)}})})}};function ra(t){return t>=90?"Excellent":t>=75?"Great day":t>=50?"Keep going":t>0?"Started":"No score yet"}function Q(t){return new Date(`${t}T00:00:00`).toLocaleDateString(void 0,{weekday:"long",month:"short",day:"numeric"})}function Ya(t){return t?new Date(t).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}):""}function qt(t){return t>=5?"Excellent":t>=4?"Great":t>=3?"Good":t>=2?"Fair":t>=1?"Low":"Not rated"}const ae=document.getElementById("app"),da="daily-report-2026-10-31T01-32-19-mvvq7m5r",Ne=`v1.1 — Auto-update · Offline · Backup (${da.slice(-8)})`;let b=u.todayKey(),N="today",x=null,k=null,J=!1,ct=!1;const Rt=new Set;let lt=!1,Wt=!1,gt=null,st=!1,Ut=!1,me=null,nt="Idle.",V="week",zt=null,G="month",Yt=null,R=[],tt=0,H=null,L="boot",pt=null;const dt=new Set,ht=new Map;let At=!1,Ot="all",X="short",bt="1 Week";const wt=new Set;let jt=null;window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),gt=t});window.addEventListener("appinstalled",()=>{gt=null,y("Daily Report installed"),h()});const Va=[["default","Default"],["points","Points"],["category","Category"],["tags","Tags"],["custom","Custom"]];function Ie(t){const e=new Date(`${b}T00:00:00`);e.setDate(e.getDate()+t),b=u.todayKey(e)}let ie=u.todayKey();function ke(){const t=u.todayKey();if(t===ie)return!1;const e=ie;return ie=t,b===e&&(b=t),zt=null,Yt=null,R=[],tt=0,!0}function C(t){return{home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z"/></svg>',profile:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/></svg>',history:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8v5l3 2"/><circle cx="12" cy="12" r="9"/></svg>',settings:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H8a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V8c.3.7.9 1.2 1.6 1.3H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1.7z"/></svg>',pin:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4h6l-1 7 3 3v2H7v-2l3-3z" fill="currentColor" stroke="none"/><path d="M12 16v5"/></svg>',forward:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',swap:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h13l-3.5-3.5M20 16H7l3.5 3.5"/></svg>',undo:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h11a5 5 0 0 1 0 10H8"/><path d="M8 5 4 9l4 4"/></svg>',habit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h10M4 17h13"/></svg>',archive:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h18v4H3zM5 11v9h14v-9M9.5 15h5"/></svg>',trash:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg>',grip:'<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><circle cx="9" cy="6" r="1.7"/><circle cx="15" cy="6" r="1.7"/><circle cx="9" cy="12" r="1.7"/><circle cx="15" cy="12" r="1.7"/><circle cx="9" cy="18" r="1.7"/><circle cx="15" cy="18" r="1.7"/></svg>'}[t]}function ca(t,e,a){return`
    <div class="stars" data-habit="${t}">
      ${[1,2,3,4,5].map(s=>`
            <button type="button" class="star ${s<=e?"on":""}" data-action="rate-habit" data-id="${t}" data-rating="${s}" ${a?"disabled":""} aria-label="${s} star">★</button>
          `).join("")}
    </div>
  `}function la(t,e,a){return`
    <div class="stars stars-small" data-task="${t}">
      ${[1,2,3,4,5].map(s=>`
            <button type="button" class="star small ${s<=e?"on":""}" data-action="rate-task" data-id="${t}" data-rating="${s}" ${a?"disabled":""} aria-label="${s} star">★</button>
          `).join("")}
    </div>
  `}function ua(t){const e=Number(t)||0;return e?`<span class="conscious-badge">🧠 +${e}</span>`:'<span class="item-meta">No conscious pts</span>'}const Ja=["mentally","psychology","physically","spiritually","socially"];function ut(t){const a=u.getCategories().find(n=>n.id===t),s=a&&a.color?a.color:W(t);return`<span class="cat-badge ${Ja.includes(t)?`cat-${t}`:"cat-custom"}" style="background:${s}22;color:${s};box-shadow:inset 0 0 0 1px ${s}55">${m(at(t))}</span>`}function ge(t){const e=String(t||"");if(!e)return"Deleted";const a=new Date(e);return Number.isNaN(a.getTime())?"Deleted":`Deleted ${a.toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}`}const Re={mentally:"#5b8cff",psychology:"#a06bff",physically:"#22b07d",spiritually:"#e8a51c",socially:"#14b8a6"},Oe=["#f472b6","#38bdf8","#fb923c","#a3e635","#facc15","#e879f9"];function W(t,e){const s=u.getCategories().find(i=>i.id===t);return s&&s.color?s.color:Re[t]?Re[t]:Oe[(e??0)%Oe.length]}function et(t){const e=Array.isArray(t)?t.filter(Boolean):[];return e.length?`<div class="tag-row">${e.map(a=>`<span class="tag-chip">#${m(a)}</span>`).join("")}</div>`:""}function pa(t){return!t||!t.image?"":`<button type="button" class="task-img-thumb" data-action="view-task-image" data-id="${t.id}" aria-label="View attached photo"><img src="${t.image}" alt="Task photo" loading="lazy" /></button>`}function ma(t){const e=String(t||"");if(!e.trim())return"";const a=e.split(`
`),s=/^\s*(?:•|-|[*])\s+(.*)$/,i=/^\s*\d+[.)]\s+(.*)$/;let n="",r=null;const o=()=>{r&&(n+=r==="ul"?"</ul>":"</ol>",r=null)};return a.forEach(d=>{const c=s.exec(d),g=!c&&i.exec(d);c?(r!=="ul"&&(o(),n+='<ul class="note-list">',r="ul"),n+=`<li>${m(c[1])||"&nbsp;"}</li>`):g?(r!=="ol"&&(o(),n+='<ol class="note-list">',r="ol"),n+=`<li>${m(g[1])||"&nbsp;"}</li>`):d.trim()?(o(),n+=`<p class="note-text">${m(d)}</p>`):(o(),n+='<p class="note-text">&nbsp;</p>')}),o(),n}function Qa(t){const e=ma(t);return e?`<div class="note" style="margin-top:10px">${e}</div>`:""}function Tt(t){return String(t||"").split(`
`).map(e=>e.replace(/^\s*(?:•|-|\*|\d+[.)])\s*/,"").trim()).filter(Boolean)}function Dt(t){return t.map(e=>`• ${e}`).join(`
`)}function je(t,e){const a=String(t||"").split(`
`).map(s=>s.replace(/^\s*(?:•|-|\*)\s+/,"").trim()).filter(Boolean);return a.length?`<ul class="note-list idea-list">${a.map((s,i)=>`
        <li>
          <span>${m(s)}</span>
          ${e?"":`<button class="idea-remove" data-action="remove-idea" data-index="${i}" title="Remove idea" aria-label="Remove idea">✕</button>`}
        </li>`).join("")}</ul>`:""}function ga(t,e,a){if(!t||t.disabled)return;const s=t.value||"",i=s.split(`
`),n=s.slice(0,t.selectionStart).split(`
`).length-1,r=s.slice(0,t.selectionEnd).split(`
`).length-1,o=t.selectionStart!==t.selectionEnd,d=o?n:0,c=o?r:i.length-1;if(e==="bullets"){const g=i.slice(d,c+1).every(v=>/^\s*(?:•|-|[*])\s+/.test(v)||!v.trim());for(let v=d;v<=c;v++)i[v].trim()&&(g?i[v]=i[v].replace(/^\s*(?:•|-|[*])\s+/,""):/^\s*(?:•|-|[*])\s+/.test(i[v])||(i[v]=`• ${i[v].replace(/^\s*/,"")}`))}else{const g=i.slice(d,c+1).every(p=>/^\s*\d+[.)]\s+/.test(p)||!p.trim());let v=1;for(let p=d;p<=c;p++){if(!i[p].trim())continue;const w=i[p].replace(/^\s*(?:\d+[.)]|•|-|[*])\s+/,"").replace(/^\s*/,"");i[p]=g?w:`${v}. ${w}`,v+=1}}t.value=i.join(`
`),a&&a(t.value);try{t.focus()}catch{}}function Be(t){ga(document.getElementById("day-note"),t,e=>u.setNote(b,e))}function Fe(t){ga(document.getElementById("profile-values"),t,e=>u.setProfileField("values",e))}function Xa(t){return new Promise(e=>{if(!t||!String(t.type||"").startsWith("image/"))return e(null);const a=URL.createObjectURL(t),s=new Image,i=()=>{try{URL.revokeObjectURL(a)}catch{}},n=(r,o)=>new Promise(d=>{let c=s.naturalWidth||0,g=s.naturalHeight||0;if(!c||!g)return d(null);const v=Math.min(1,r/Math.max(c,g));c=Math.max(1,Math.round(c*v)),g=Math.max(1,Math.round(g*v));const p=document.createElement("canvas");p.width=c,p.height=g;try{p.getContext("2d").drawImage(s,0,0,c,g),d(p.toDataURL("image/jpeg",o))}catch{d(null)}});s.onload=async()=>{try{let r=await n(900,.72);r&&r.length>It&&(r=await n(600,.62)),r&&r.length>It&&(r=await n(400,.55)),i(),e(r&&r.length<=It?r:null)}catch{i(),e(null)}},s.onerror=()=>{i(),e(null)},s.src=a})}function Ge(t,e){return`
    <select class="sort-select" data-sort-kind="${t}" aria-label="Sort ${t}">
      ${Va.map(([a,s])=>`<option value="${a}" ${e===a?"selected":""}>${s}</option>`).join("")}
    </select>
  `}function Za(t){const e=u.getBadges(),a=u.topBadges(3),s=t.max>0&&t.percent===100,i=Wt?e:a;return`
    <section class="section rewards-section">
      <div class="section-head">
        <h2>Rewards</h2>
        ${e.length>3?`<button class="ghost-btn compact" data-action="toggle-badges">${Wt?"Show less":`More (${e.length}) ›`}</button>`:""}
      </div>
      ${s?`
        <div class="trophy-card">
          <div class="trophy-cup">🏆</div>
          <div>
            <div class="item-title">Gold Cup — Perfect day!</div>
            <div class="item-meta">100% of points on ${Q(b)}</div>
          </div>
        </div>
      `:""}
      ${e.length?`
        <div class="rewards-grid">
          ${i.map(n=>`
            <article class="reward-card tier-${n.tier}">
              <div class="reward-medal">${ne(n.tier)}</div>
              <div>
                <div class="item-title">${m(n.rewardTitle||n.title)}</div>
                <div class="item-meta">${m(n.title)} · ${ta(n.tier)} · ${Q((n.earnedAt||"").slice(0,10))}</div>
              </div>
            </article>
          `).join("")}
        </div>
      `:'<div class="empty">No rewards yet. Set a goal in Settings → Goals &amp; Rewards.</div>'}
    </section>
  `}function Vt(t){return`<span class="streak-badge">${t} day streak</span>`}function fa(t){return t?`<span class="forward-badge from">↩ Forwarded from ${m(t)}</span>`:""}function Jt(t){const e=Array.isArray(t)?t.filter(Boolean):[];return e.length?`<span class="forward-badge to">↪ Forwarded to ${m(e[e.length-1])}</span>`:""}function ha(t){return t?`<span class="forward-badge replace from">⇄ Replaced from ${m(t)}</span>`:""}function Ka(t){const e=u.getAllHabits().map(a=>({habit:a,to:u.habitReplacedTo(b,a.id)})).filter(a=>a.to);return e.length?`
    <div class="replaced-away">
      ${e.map(({habit:a,to:s})=>`
        <button type="button" class="forward-badge replace undo" data-action="undo-replace-habit" data-id="${a.id}" data-from="${b}" data-to="${s}" ${t?"disabled":""} title="${t?"Unlock the day to undo this":`Put ${m(a.name)} back on ${m(b)}`}">
          ⇄ ${m(a.name)} → ${m(s)}
        </button>`).join("")}
    </div>
  `:""}function ba(t,e){if(e)return`<button class="mini-btn" data-action="open-replace-habit" data-id="${t}" disabled title="Unlock the day to replace it">${C("swap")}</button>`;const a=u.habitReplaceDays(b,t);if(!a.allowed){const s=u.findHabit(t),i=s&&s.pin&&s.pin.mode==="forever"?"Pinned forever — no replace option":"No replace days before its next due day";return`<button class="mini-btn" data-action="open-replace-habit" data-id="${t}" disabled title="${i}">${C("swap")}</button>`}return`<button class="mini-btn" data-action="open-replace-habit" data-id="${t}" title="Replace this day with one of the ${a.days.length} day${a.days.length===1?"":"s"} before ${a.next}">${C("swap")}</button>`}function ti(t){const e=new Date(`${t}T00:00:00`);return e.setDate(e.getDate()+1),u.todayKey(e)}function fe(){return`<button class="ghost-btn compact ${J?"on":""}" data-action="toggle-edit">${J?"Done":"Edit Mode"}</button>`}function ei(t){return t?'<span class="lock-badge">Locked</span>':'<span class="open-badge">Open</span>'}function ai(){u.checkGoals(b);const t=u.getDay(b),e=u.getSettings(),a=e.showConscious!==!1,s=u.getHabits(b),i=u.getTasks(b),n=u.scoreFor(b),r=ra(n.percent),o=b===u.todayKey(),d=u.isLocked(b);return`
    <div class="topbar">
      <div>
        <p class="kicker">${o?"Today":"Daily report"}</p>
        <h1>${Q(b)}</h1>
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
          ${ei(d)}
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
        ${d?`Submitted${t.submittedAt?` at ${Ya(t.submittedAt)}`:""}.${(n.missedHabits||0)+(n.missedTasks||0)>0?` ${(n.missedHabits||0)+(n.missedTasks||0)} missed (${n.missedHabits||0} habits, ${n.missedTasks||0} tasks) — unchecked items count as missed.`:" Nothing missed — all done."} Unlock in Settings to edit.`:`Auto-locks at ${e.lockTime}. Submit when the day is done. Unchecked items will count as missed once locked.`}
      </p>
      ${d?'<button class="ghost-btn full" data-action="goto-settings">Unlock in Settings</button>':'<button class="primary-btn full" data-action="submit-day">Submit and lock report</button>'}
      <div class="export-row">
        <span class="muted">Export:</span>
        <button class="ghost-btn compact" data-action="open-export">Excel / JSON / PDF</button>
      </div>
    </section>

    ${Za(n)}

    <section class="section">
      <div class="section-head">
        <h2>Habits</h2>
        <div class="head-actions">
          ${Ge("habit",e.habitSort||"default")}
          ${fe()}
          <span class="points">+${n.habitScore}${a&&n.consciousScore?` +${n.consciousScore}🧠`:""} pts</span>
        </div>
      </div>
      ${["default","custom"].includes(e.habitSort||"default")&&s.length>1?'<p class="muted tight">Hold the grip button on a card, then drag it to a new spot.</p>':""}
      <div class="list">
        ${s.length?s.map(c=>{const g=u.habitRating(b,c.id),v=g>0,p=!v&&d,w=u.habitStreak(c.id,b),P=a&&Number(c.consciousPoints)||0;return`
                    <article class="item-card ${v?"done":""} ${p?"missed":""} ${d?"is-locked":""}" style="border-left:3px solid ${W(c.category)}" data-sortable="habit" data-id="${c.id}">
                      <button class="check" data-action="toggle-habit" data-id="${c.id}" ${d?"disabled":""}>✓</button>
                      <div class="item-body">
                        <div class="item-title">${m(c.name)} ${p?'<span class="missed-badge">Missed</span>':""}</div>
                        <div class="item-meta">${ut(c.category)} ${c.pin?ft(c.pin):"Not pinned"} · ${g?`${g}/5 ${qt(g)}`:d?"Missed":"Not rated"}</div>
                        ${c.description?`<p class="item-desc">${m(c.description)}</p>`:""}
                        ${a?`<div class="item-meta">${Vt(w)} ${ua(P)}</div>`:`<div class="item-meta">${Vt(w)}</div>`}
                        ${Jt(u.habitForwardedTo(b,c.id))}
                        ${ha(u.habitReplacedFrom(b,c.id))}
                        ${et(c.tags)}
                        ${ca(c.id,g,d)}
                      </div>
                      <div class="item-side">
                        <div class="points">+${c.points}${P?` +${P}🧠`:""}</div>
                      </div>
                      <div class="item-actions">
                        <button class="drag-handle" aria-label="Hold and drag to reorder" title="Hold and drag to reorder" ${d?"disabled":""}>${C("grip")}</button>
                        <div class="mini-actions">
                          ${J?`<button class="mini-btn on" data-action="open-edit-habit" data-id="${c.id}" ${d?"disabled":""}>Edit</button>`:""}
                          ${ba(c.id,d)}
                          <button class="mini-btn ${c.pin?"on":""}" data-action="open-pin-habit" data-id="${c.id}" ${d?"disabled":""} title="Pin habit">${C("pin")}</button>
                          <button class="mini-btn" data-action="archive-habit" data-id="${c.id}" ${d?"disabled":""} title="Archive habit" aria-label="Archive habit">${C("archive")}</button>
                        </div>
                      </div>
                    </article>
                  `}).join(""):'<div class="empty">No habits for this day. Tap + to add one.</div>'}
      </div>
      ${Ka(d)}
    </section>

    <section class="section">
      <div class="section-head">
        <h2>Tasks</h2>
        <div class="head-actions">
          ${Ge("task",e.taskSort||"default")}
          ${fe()}
          <span class="points">+${n.taskScore} pts</span>
        </div>
      </div>
      ${["default","custom"].includes(e.taskSort||"default")&&i.length>1?'<p class="muted tight">Hold the grip button on a card, then drag it to a new spot.</p>':""}
      <div class="list">
        ${i.length?i.map(c=>{const g=!!c.sourcePinId,v=g?u.findPinnedTask(c.sourcePinId):null,p=Math.max(0,Math.min(5,Number(c.rating)||0)),w=!c.done&&d;return`
                    <article class="item-card ${c.done?"done":""} ${w?"missed":""} ${d?"is-locked":""}" style="border-left:3px solid ${W(c.category)}" data-sortable="task" data-id="${c.id}">
                      <button class="check" data-action="toggle-task" data-id="${c.id}" ${d?"disabled":""}>✓</button>
                      <div class="item-body">
                        <div class="item-title">${m(c.title)} ${w?'<span class="missed-badge">Missed</span>':""}</div>
                        <div class="item-meta">${ut(c.category)} ${v?ft(v.pin):"One-time task"} · ${c.done?"Done":d?"Missed":"Pending"} · ${p?`${p}/5 ${qt(p)}`:"No rating"}</div>
                        ${c.description?`<p class="item-desc">${m(c.description)}</p>`:""}
                        ${fa(c.forwardedFrom)}
                        ${Jt(c.forwardedTo)}
                        ${et(c.tags)}
                        ${c.image?'<span class="task-img-badge">📷 Photo attached</span>':""}
                        ${pa(c)}
                        ${la(c.id,p,d)}
                      </div>
                      <div class="item-side">
                        <div class="points">+${c.points}</div>
                      </div>
                      <div class="item-actions">
                        <button class="drag-handle" aria-label="Hold and drag to reorder" title="Hold and drag to reorder" ${d?"disabled":""}>${C("grip")}</button>
                        <div class="mini-actions">
                          ${J?`<button class="mini-btn on" data-action="open-edit-task" data-id="${c.id}" ${d?"disabled":""}>Edit</button>`:""}
                          <button class="mini-btn" data-action="open-forward-task" data-id="${c.id}" ${d?"disabled":""} title="Forward task to another day">${C("forward")}</button>
                          <button class="mini-btn ${g?"on":""}" data-action="open-pin-task" data-id="${c.id}" ${d?"disabled":""} title="Pin task">${C("pin")}</button>
                          <button class="mini-btn" data-action="archive-task" data-id="${c.id}" ${d?"disabled":""} title="Archive task" aria-label="Archive task">${C("archive")}</button>
                          ${J?`<button class="mini-btn danger" data-action="remove-task" data-id="${c.id}" ${d?"disabled":""} title="Delete task" aria-label="Delete task">${C("trash")}</button>`:""}
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
      <textarea id="day-note" placeholder="How did today go? Tip: use • Bullets for lists." ${d?"disabled":""}>${m(t.note)}</textarea>
    </section>

    ${ii()}
  `}function ii(){const t=u.getArchivedHabits(),e=u.getArchivedTasks(),a=t.length+e.length,s=[...e.map(i=>`
      <article class="manage-card archived" style="border-left:4px solid ${W(i.category)}">
        <div class="section-head">
          <div>
            <div class="item-title">${m(i.title)} <span class="archive-kind">Task</span></div>
            <div class="item-meta">${ut(i.category)} · +${i.points} pts${i.fromDate?` · from ${m(i.fromDate)}`:""}${i.originDate&&i.originDate!==i.fromDate?` · created ${m(i.originDate)}`:""} · ${ge(i.archivedAt)}</div>
            ${i.description?`<p class="item-desc">${m(i.description)}</p>`:""}
            ${et(i.tags)}
          </div>
          <div class="mini-actions">
            <button class="mini-btn on" data-action="restore-task" data-id="${i.id}" title="Restore task to the selected day" aria-label="Restore task">${C("undo")}</button>
            ${J?`<button class="mini-btn danger" data-action="delete-archived-task" data-id="${i.id}" title="Delete permanently" aria-label="Delete permanently">${C("trash")}</button>`:""}
          </div>
        </div>
      </article>
    `),...t.map(i=>`
      <article class="manage-card archived" style="border-left:4px solid ${W(i.category)}">
        <div class="section-head">
          <div>
            <div class="item-title">${m(i.name)} <span class="archive-kind">Habit</span></div>
            <div class="item-meta">${ut(i.category)} · +${i.points} pts${i.pin?` · ${ft(i.pin)}`:" · Pin ended"} · ${ge(i.archivedAt)}</div>
            ${i.description?`<p class="item-desc">${m(i.description)}</p>`:""}
            ${et(i.tags)}
          </div>
          <div class="mini-actions">
            <button class="mini-btn on" data-action="restore-habit" data-id="${i.id}" title="Restore habit" aria-label="Restore habit">${C("undo")}</button>
            <button class="mini-btn danger" data-action="delete-archived-habit" data-id="${i.id}" title="Delete permanently" aria-label="Delete permanently">${C("trash")}</button>
          </div>
        </div>
      </article>
    `)];return`
    <section class="section archive-section">
      <button type="button" class="archive-head" data-action="toggle-archive" aria-expanded="${lt}">
        <span class="archive-title">${C("archive")} Archive</span>
        <span class="archive-count">${a}</span>
        <span class="archive-chevron" aria-hidden="true">${lt?"▾":"▸"}</span>
      </button>
      ${lt?`<div class="archive-list">${a?s.join(""):'<div class="empty">Nothing archived yet. Use the archive button on a habit or task to set it aside here.</div>'}</div>`:""}
    </section>
  `}function Bt(t){return t==="short"?"#short":t==="medium"?"#medium":"#long"}function si(){const t=u.getProfile(),e=!!t.locked,a=e?"disabled":"",s=Array.isArray(t.whoAmI)?t.whoAmI:[],i=Array.isArray(t.lifeAreas)?t.lifeAreas:[],n=Array.isArray(t.pGoals)?t.pGoals:[],r=Array.isArray(t.quotes)?t.quotes:[],o=u.profileGoalDurations();o[X].includes(bt)||(bt=o[X][0]);const d=f=>n.filter(T=>T.term===f).length,c=(Ot==="all"?n:n.filter(f=>f.term===Ot)).slice().sort((f,T)=>String(f.createdAt).localeCompare(String(T.createdAt))),g=r.slice().sort((f,T)=>!!f.fav!=!!T.fav?f.fav?-1:1:String(T.createdAt).localeCompare(String(f.createdAt))),v=g.slice(0,3),p=g.slice(3),w=String(t.name||"?").trim().slice(0,1).toUpperCase()||"?",S=String(t.ideas||"").split(`
`).map(f=>f.replace(/^\s*(?:•|-|\*)\s+/,"").trim()).filter(Boolean).length;return`
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
        <div class="profile-avatar">${m(w)}</div>
        <div style="flex:1;min-width:0">
          <div class="item-title" style="font-size:18px">${m(t.name)||"Your name"}</div>
          <div class="item-meta">${s.length?`${s.length} identities`:"No identities yet"} · ${i.length} life areas · ${n.length} goals · ${r.length} quotes</div>
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
        <span class="item-meta">${s.length}/50</span>
      </div>
      ${e?"":`
        <div style="display:flex;gap:8px;margin-bottom:10px">
          <input id="new-whoami" maxlength="120" placeholder="e.g. A disciplined father…" style="flex:1;min-width:0" />
          <button class="primary-btn compact-btn" data-action="add-whoami">Add</button>
        </div>
      `}
      <div class="habit-manage">
        ${s.length?s.map((f,T)=>`
          <article class="manage-card whoami-row">
            <span class="whoami-num">${T+1}</span>
            <input class="whoami-input" data-whoami="${f.id}" maxlength="120" value="${m(f.text)}" ${a} aria-label="Who I am ${T+1}" />
            ${e?"":`
              <div class="mini-actions">
                <button class="mini-btn" data-action="move-whoami" data-id="${f.id}" data-dir="-1" ${T===0?"disabled":""} title="Move up">↑</button>
                <button class="mini-btn" data-action="move-whoami" data-id="${f.id}" data-dir="1" ${T===s.length-1?"disabled":""} title="Move down">↓</button>
                <button class="mini-btn" data-action="remove-whoami" data-id="${f.id}" title="Remove">✕</button>
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
          ${i.map((f,T)=>{const Ht=pt===f.id;return`
              <article class="life-card ${Ht?"open":""}">
                <div class="life-head">
                  <button type="button" class="life-toggle" data-action="toggle-lifearea" data-id="${f.id}" aria-expanded="${Ht?"true":"false"}">
                    <b>${m(f.title)}</b>
                    <span>${Ht?"▾":"▸"}</span>
                  </button>
                  ${e?"":`
                    <div class="mini-actions">
                      <button class="mini-btn" data-action="move-lifearea" data-id="${f.id}" data-dir="-1" ${T===0?"disabled":""} title="Move up">↑</button>
                      <button class="mini-btn" data-action="move-lifearea" data-id="${f.id}" data-dir="1" ${T===i.length-1?"disabled":""} title="Move down">↓</button>
                    </div>
                  `}
                </div>
                ${Ht?`
                  <div class="life-body">
                    ${e?f.description?`<p class="item-desc">${m(f.description)}</p>`:'<p class="item-meta">No description yet.</p>':`
                      <label>Title
                        <input data-lifearea-title="${f.id}" maxlength="60" value="${m(f.title)}" />
                      </label>
                      <label>Description
                        <textarea data-lifearea-desc="${f.id}" maxlength="1000" placeholder="What does this area mean to you? What is going well?" style="min-height:70px">${m(f.description)}</textarea>
                      </label>
                      <button class="ghost-btn compact danger" data-action="remove-lifearea" data-id="${f.id}">Remove area</button>
                    `}
                  </div>
                `:f.description?`<p class="item-desc life-preview">${m(f.description.slice(0,90))}${f.description.length>90?"…":""}</p>`:""}
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
        ${e?t.values.trim()?`<div class="values-list">${ma(t.values)}</div>`:'<p class="item-meta">No values yet.</p>':`
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
      ${e?S?je(t.ideas,!0):'<p class="item-meta">No ideas yet.</p>':`
          <div class="form" style="margin-bottom:10px">
            <label>New idea
              <input id="new-idea" maxlength="200" placeholder="e.g. Build a habit tracker app" />
            </label>
            <div style="display:flex;gap:8px">
              <button class="primary-btn compact-btn" data-action="add-idea">Add idea</button>
            </div>
          </div>
          ${S?`${je(t.ideas,!1)}
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
              ${["short","medium","long"].map(f=>`<button type="button" class="chip hashtag-${f} ${X===f?"on":""}" data-action="set-pgoal-term" data-term="${f}">${Bt(f)}</button>`).join("")}
            </div>
          </div>
          <div class="row-2">
            <label>Timeframe
              <select id="new-pgoal-duration">
                ${o[X].map(f=>`<option value="${m(f)}" ${bt===f?"selected":""}>${m(f)}</option>`).join("")}
              </select>
            </label>
            <label style="justify-content:flex-end">&nbsp;
              <button class="primary-btn compact-btn" data-action="add-pgoal">Add goal</button>
            </label>
          </div>
          <p class="item-meta">${X==="short"?"Short term → pick a week (1–4 weeks).":X==="medium"?"Medium term → pick a month up to 3 months.":"Long term → a year or more."}</p>
        </div>
      `}
      <div class="chip-row" style="margin-bottom:10px">
        ${[["all",`All (${n.length})`],["short",`#short (${d("short")})`],["medium",`#medium (${d("medium")})`],["long",`#long (${d("long")})`]].map(([f,T])=>`<button type="button" class="chip ${Ot===f?"on":""}" data-action="set-pgoal-filter" data-filter="${f}">${T}</button>`).join("")}
      </div>
      <div class="habit-manage">
        ${c.length?c.map(f=>`
          <article class="manage-card pgoal-card term-${f.term}">
            <div class="pgoal-top">
              <span class="hashtag hashtag-${f.term}">${Bt(f.term)}</span>
              <span class="duration-pill">⏳ ${m(f.duration)}</span>
              ${e?"":`<button class="mini-btn" data-action="remove-pgoal" data-id="${f.id}" title="Remove goal">✕</button>`}
            </div>
            ${e?`<div class="item-title" style="margin-top:6px">${m(f.text)}</div>`:`
                <input data-pgoal-text="${f.id}" maxlength="200" value="${m(f.text)}" style="margin-top:8px" aria-label="Goal text" />
                <div class="row-2" style="margin-top:8px">
                  <select data-pgoal-term="${f.id}" aria-label="Goal term">
                    ${["short","medium","long"].map(T=>`<option value="${T}" ${f.term===T?"selected":""}>${Bt(T)}</option>`).join("")}
                  </select>
                  <select data-pgoal-duration="${f.id}" aria-label="Goal duration">
                    ${o[f.term].map(T=>`<option value="${m(T)}" ${f.duration===T?"selected":""}>${m(T)}</option>`).join("")}
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
        <span class="item-meta">★ ${r.filter(f=>f.fav).length} · ${r.length} total</span>
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
      ${g.length?`
        <div class="quote-fav-head"><span class="item-title">★ Top 3 favourites</span></div>
        <div class="habit-manage" style="margin-bottom:8px">
          ${v.map(f=>_e(f,e)).join("")}
        </div>
        ${p.length?`
          <button class="ghost-btn compact full" data-action="toggle-quotes">${At?"Show less ▴":`More (${p.length}) — see the rest ▾`}</button>
          ${At?`<div class="habit-manage" style="margin-top:8px">${p.map(f=>_e(f,e)).join("")}</div>`:""}
        `:At&&!p.length?'<p class="item-meta">No more quotes — that is all of them.</p>':""}
      `:'<div class="empty">No quotes yet — add the words that move you.</div>'}
    </section>
  `}function _e(t,e){return`
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
  `}function ni(){document.querySelectorAll("[data-profile]").forEach(t=>{t.addEventListener("input",()=>{u.setProfileField(t.dataset.profile,t.value)||h()})}),document.querySelectorAll("[data-lifearea-title]").forEach(t=>{t.addEventListener("change",()=>{u.updateLifeArea(t.dataset.lifeareaTitle,{title:t.value}),h()})}),document.querySelectorAll("[data-lifearea-desc]").forEach(t=>{t.addEventListener("input",()=>{u.updateLifeArea(t.dataset.lifeareaDesc,{description:t.value})})}),document.querySelectorAll("[data-pgoal-text]").forEach(t=>{t.addEventListener("change",()=>{u.updateProfileGoal(t.dataset.pgoalText,{text:t.value}),h()})}),document.querySelectorAll("[data-pgoal-term]").forEach(t=>{t.addEventListener("change",()=>{u.updateProfileGoal(t.dataset.pgoalTerm,{term:t.value}),h()})}),document.querySelectorAll("[data-pgoal-duration]").forEach(t=>{t.addEventListener("change",()=>{u.updateProfileGoal(t.dataset.pgoalDuration,{duration:t.value}),h()})})}function oi(){const t=u.week(new Date(`${b}T00:00:00`)),e=t.reduce((s,i)=>s+i.earned,0),a=Math.round(e/7);return`
    <section class="section">
      <div class="section-head"><h2>Weekly score</h2></div>
      <section class="score-hero">
        <div class="score-row">
          <div>
            <div class="score-value">${e}</div>
            <div class="score-unit">points this week</div>
          </div>
          <div class="grade-pill">Avg ${a} pts</div>
        </div>
        <div class="week-days">
          ${t.map(s=>`
                <button class="day-cell ${s.date===b?"active":""} ${s.earned>0?"done":""}" data-action="pick-date" data-date="${s.date}">
                  <span>${s.label.slice(0,2)}</span>
                  <b>${s.earned}</b>
                  ${s.locked?'<i class="dot-lock"></i>':""}
                </button>
              `).join("")}
        </div>
      </section>
    </section>
  `}function ri(){const t=zt||O(b),e=Se(t),a=u.todayKey();return`
    <section class="section">
      <div class="section-head">
        <h2>Reports calendar</h2>
        <div class="date-nav">
          <button class="icon-btn" data-action="history-cal-nav" data-dir="-1" aria-label="Previous month">‹</button>
          <button class="icon-btn" data-action="history-cal-nav" data-dir="1" aria-label="Next month">›</button>
        </div>
      </div>
      <div class="pin-cal">
        <div class="pin-cal-head"><b>${Zt(t)}</b></div>
        <div class="pin-cal-grid pin-cal-week">
          ${we().map(s=>`<span>${s.label.slice(0,1)}</span>`).join("")}
        </div>
        <div class="pin-cal-grid">
          ${e.map(s=>{if(!s)return"<span></span>";const i=u.scoreFor(s),n=s===b?"on-selected":i.percent>=100?"on-perfect":i.earned>0?"on":"",r=i.locked?'<i class="dot-lock"></i>':"";return`<button type="button" class="pin-cal-day hist-cal-day ${n} ${s===a?"is-today":""}" data-action="pick-date" data-date="${s}" title="${m(s)}: ${i.earned}/${i.max} pts (${i.percent}%)"><b>${Number(s.slice(8,10))}</b><span>${i.earned}</span>${r}</button>`}).join("")}
        </div>
      </div>
    </section>
  `}function di(t){const e=new Map((t||[]).map(n=>[n.date,n])),a=Yt||O(b),s=Se(a),i=u.todayKey();return`
    <div class="pin-cal">
      <div class="pin-cal-head"><b>${Zt(a)}</b><span class="item-meta">${e.size} locked</span></div>
      <div class="pin-cal-grid pin-cal-week">
        ${we().map(n=>`<span>${n.label.slice(0,1)}</span>`).join("")}
      </div>
      <div class="pin-cal-grid">
        ${s.map(n=>{if(!n)return"<span></span>";const r=e.get(n),o=!!r,d=R.includes(n)?"on-selected":o?"on-locked":"on-open",c=u.scoreFor(n),g=r?r.earned:c.earned;return`<button type="button" class="pin-cal-day hist-cal-day ${d} ${n===i?"is-today":""}" data-action="toggle-locked-day" data-date="${n}" title="${m(n)}: ${o?"Locked":"Open"} — ${g} pts"><b>${Number(n.slice(8,10))}</b><span>${g}</span></button>`}).join("")}
      </div>
    </div>
  `}function ci(){return`
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
          <input id="histexp-date" type="date" value="${b}" />
        </label>
      `:""}
      ${G==="month"?`
        <label>Which month
          <input id="histexp-month" type="month" value="${b.slice(0,7)}" />
        </label>
      `:""}
      ${G==="year"?`
        <label>Which year
          <input id="histexp-year" type="number" min="2000" max="2100" value="${b.slice(0,4)}" />
        </label>
      `:""}
      <div class="export-grid" style="margin-top:10px">
        <button class="choose-card" data-action="histexp-do" data-format="csv"><b>Excel (CSV)</b><span>Opens in Excel / Sheets</span></button>
        <button class="choose-card" data-action="histexp-do" data-format="json"><b>JSON</b><span>Raw data backup</span></button>
        <button class="choose-card" data-action="histexp-do" data-format="pdf"><b>PDF</b><span>Print / save as PDF</span></button>
      </div>
    </section>
  `}function li(){const t=u.week(new Date(`${b}T00:00:00`)),e=u.todayKey(),a=`${Q(t[0].date)} – ${Q(t[6].date)}`,s=t.reduce((r,o)=>r+(o.earned||0),0),i=t.reduce((r,o)=>r+(o.max||0),0),n=t.filter(r=>r.hasRecord).length;return`
    <div class="topbar">
      <div>
        <p class="kicker">Archive</p>
        <h1>Past reports</h1>
      </div>
      <button class="ghost-btn compact" data-action="open-export">Export</button>
    </div>
    ${ri()}
    ${oi()}
    ${ci()}
    <section class="section">
      <div class="section-head">
        <h2>Week</h2>
        <span class="item-meta">${a}</span>
      </div>
      <p class="item-meta">${n} of 7 days reported · ${s} of ${i} pts</p>
      <div class="history-list">
        ${t.map(r=>{const o=!r.hasRecord,d=(r.missedHabits||0)+(r.missedTasks||0),c=o?"No report":`${r.locked?"Locked":"Open"} · ${ra(r.percent)} · ${r.earned}/${r.max} pts (${r.percent}%)${r.locked&&d>0?` · ❌ ${d} missed`:""}`;return`
              <article class="history-card ${o?"is-empty":""} ${r.date===e?"is-today":""} ${r.date===b?"is-selected":""}">
                <div class="section-head">
                  <div>
                    <div class="item-title">${m(r.label)} ${Q(r.date)}</div>
                    <div class="item-meta">${m(c)}</div>
                  </div>
                  <button class="ghost-btn compact" data-action="pick-date" data-date="${r.date}">${o?"Add":"Open"}</button>
                </div>
                <div class="bar"><span style="width:${r.percent}%"></span></div>
                ${r.note?Qa(r.note):`<p class="item-meta">${o?"Nothing recorded this day.":"No note."}</p>`}
              </article>
            `}).join("")}
      </div>
    </section>
  `}function ui(t,e){const a=new Date(`${t}T00:00:00`);return a.setDate(a.getDate()+e),u.todayKey(a)}function pi(){return V==="month"?`${St(O(b),tt)}-15`:V==="year"?`${Number(b.slice(0,4))+tt}-06-15`:ui(b,tt*7)}function mi(t){const[e,a]=u.resolveRange(V,t);return V==="week"?`${Q(e)} – ${Q(a)}`:V==="month"?Zt(e.slice(0,7)):e.slice(0,4)}function gi(){const t=pi(),e=u.categoryChart(V,t),a=tt===0?V==="week"?"This week":V==="month"?"This month":"This year":mi(t),s=e.labels.map((n,r)=>{const o=e.cats.reduce((c,g)=>c+(e.perCat[g.id]?e.perCat[g.id][r]:0),0),d=e.cats.map((c,g)=>({cat:c,value:e.perCat[c.id]?e.perCat[c.id][r]:0,ci:g})).filter(c=>c.value>0).map(c=>`<span class="chart-seg" style="height:${Math.max(2,Math.round(c.value/e.max*100))}%;background:${W(c.cat.id,c.ci)}" title="${m(c.cat.label)}: ${c.value} pts"></span>`).join("");return`
      <div class="chart-col" title="${m(e.titles[r])}: ${o} pts">
        <div class="chart-bar">${d||'<span class="chart-empty"></span>'}</div>
        <span class="chart-x">${m(n)}</span>
      </div>
    `}).join(""),i=e.cats.map((n,r)=>`
      <span class="chart-legend-item"><i style="background:${W(n.id,r)}"></i>${m(n.label)} <b>${e.totals[n.id]||0}</b></span>
    `).join("");return`
    <section class="score-hero">
      <div class="section-head" style="margin-bottom:4px">
        <div>
          <div class="item-title">Progress chart</div>
          <div class="item-meta">${a} · ${e.grandTotal} pts total</div>
        </div>
      </div>
      <div class="chart-nav-row">
        <button type="button" class="mini-btn" data-action="chart-nav" data-dir="-1" aria-label="Previous ${V}">‹</button>
        <div class="chip-row">
          ${["week","month","year"].map(n=>`<button type="button" class="chip ${V===n?"on":""}" data-action="set-chart-range" data-range="${n}">${n[0].toUpperCase()}${n.slice(1)}</button>`).join("")}
        </div>
        <button type="button" class="mini-btn" data-action="chart-nav" data-dir="1" aria-label="Next ${V}">›</button>
      </div>
      <div class="chart-wrap${e.labels.length>12?" scroll-x":""}">${s}</div>
      <div class="chart-legend">${i}</div>
    </section>
  `}function fi(){u.getDay(b);const t=u.isLocked(b),e=u.consciousEnabled(),a=u.categoryBreakdown(b),s=a.reduce((n,r)=>n+r.earned,0),i=a.reduce((n,r)=>n+r.max,0);return`
    <div class="topbar">
      <div>
        <p class="kicker">Activities</p>
        <h1>By category</h1>
      </div>
      <div class="date-nav">
        ${fe()}
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
        <div class="grade-pill">${Q(b)}</div>
      </div>
      <p class="lock-hint">Habits and tasks grouped by category.</p>
    </section>
    ${gi()}
    ${a.map(n=>{const r=n.max?Math.round(n.earned/n.max*100):0,o=W(n.id);return`
          <section class="section">
            <article class="manage-card cat-card cat-${n.id}" style="border-left:4px solid ${o};background:linear-gradient(180deg, ${o}2e, ${o}14 55%, var(--card) 100%)">
              <div class="section-head">
                <div>
                  <div class="item-title">${n.label}</div>
                  <div class="item-meta">${n.completed}/${n.total} done · rating ${n.habitAvg||0}/5</div>
                </div>
                <div class="points">${n.earned}/${n.max} pts</div>
              </div>
              <div class="bar"><span style="width:${r}%;background:${o}"></span></div>
            </article>
            <div class="list" style="margin-top:10px">
              ${n.habits.length||n.tasks.length?`
                    ${n.habits.map(d=>{const c=u.habitRating(b,d.id),g=!c&&t,v=u.habitStreak(d.id,b),p=e&&Number(d.consciousPoints)||0,w=c>0?p:0,P=Math.round(d.points*c/5)+w,S=d.points+p;return`
                           <article class="item-card ${c?"done":""} ${g?"missed":""} ${t?"is-locked":""}" style="border-left:3px solid ${W(d.category)}">
                             <button class="check" data-action="toggle-habit" data-id="${d.id}" ${t?"disabled":""}>✓</button>
                             <div class="item-body">
                               <div class="item-title">${m(d.name)} ${g?'<span class="missed-badge">Missed</span>':""}</div>
                               <div class="item-meta">Habit · ${c?`${c}/5 ${qt(c)}`:t?"Missed":"Not rated"} · ${Vt(v)}${e?` ${ua(p)}`:""}</div>
                              ${d.description?`<p class="item-desc">${m(d.description)}</p>`:""}
                              ${Jt(u.habitForwardedTo(b,d.id))}
                              ${ha(u.habitReplacedFrom(b,d.id))}
                              ${et(d.tags)}
                              ${ca(d.id,c,t)}
                            </div>
                            <div class="item-side">
                              <div class="points">${P}/${S}</div>
                              <div class="mini-actions">
                                ${J?`<button class="mini-btn on" data-action="open-edit-habit" data-id="${d.id}" ${t?"disabled":""}>Edit</button>`:""}
                                ${ba(d.id,t)}
                              </div>
                            </div>
                          </article>
                        `}).join("")}
                    ${n.tasks.map(d=>{const c=Math.max(0,Math.min(5,Number(d.rating)||0)),g=!d.done&&t;return`
                           <article class="item-card ${d.done?"done":""} ${g?"missed":""} ${t?"is-locked":""}" style="border-left:3px solid ${W(d.category)}">
                             <button class="check" data-action="toggle-task" data-id="${d.id}" ${t?"disabled":""}>✓</button>
                             <div class="item-body">
                               <div class="item-title">${m(d.title)} ${g?'<span class="missed-badge">Missed</span>':""}</div>
                               <div class="item-meta">Task · ${d.done?"Done":t?"Missed":"Pending"} · ${c?`${c}/5 ${qt(c)}`:"No rating"}${d.description?` · ${m(d.description)}`:""}</div>
                              ${fa(d.forwardedFrom)}
                              ${Jt(d.forwardedTo)}
                              ${et(d.tags)}
                              ${d.image?'<span class="task-img-badge">📷 Photo attached</span>':""}
                              ${pa(d)}
                              ${la(d.id,c,t)}
                            </div>
                            <div class="item-side">
                              <div class="points">+${d.points}</div>
                              <div class="mini-actions">
                                ${J?`<button class="mini-btn on" data-action="open-edit-task" data-id="${d.id}" ${t?"disabled":""}>Edit</button>`:""}
                                <button class="mini-btn" data-action="open-forward-task" data-id="${d.id}" ${t?"disabled":""} title="Forward task to another day">${C("forward")}</button>
                              </div>
                            </div>
                          </article>
                        `}).join("")}
                  `:'<div class="empty">No activities in this category.</div>'}
            </div>
          </section>
        `}).join("")}
  `}function Qt(t){return`${t||"daily-report-backup"}-${u.todayKey()}.json`}function hi(){const t=u.getInstalledAt(),e=String(t).slice(0,10),a=new Date(`${e}T00:00:00`),s=new Date(`${u.todayKey()}T00:00:00`),i=Number.isNaN(a.getTime())?1:Math.max(1,Math.round((s-a)/864e5)+1),n=String(Number(e.slice(8,10))).padStart(2,"0"),r=e.slice(5,7),o=e.slice(2,4),d=/^\d{4}-\d{2}-\d{2}$/.test(e)?`${n}/${r}/${o}`:e,c=Math.floor((i-1)/365)+1;return`Using Daily Report since ${d} · day ${i} · year ${c}`}function ya(){return typeof window.showDirectoryPicker=="function"}function $e(){return new Promise((t,e)=>{const a=indexedDB.open("daily-report-pwa",1);a.onupgradeneeded=()=>a.result.createObjectStore("kv"),a.onsuccess=()=>t(a.result),a.onerror=()=>e(a.error)})}function bi(t){return $e().then(e=>new Promise((a,s)=>{const i=e.transaction("kv","readonly").objectStore("kv").get(t);i.onsuccess=()=>a(i.result),i.onerror=()=>s(i.error)}))}function yi(t,e){return $e().then(a=>new Promise((s,i)=>{const n=a.transaction("kv","readwrite");n.objectStore("kv").put(e,t),n.oncomplete=()=>s(),n.onerror=()=>i(n.error)}))}function vi(t){return $e().then(e=>new Promise((a,s)=>{const i=e.transaction("kv","readwrite");i.objectStore("kv").delete(t),i.oncomplete=()=>a(),i.onerror=()=>s(i.error)}))}function ki(){return!ya()||typeof indexedDB>"u"?(L="unsupported",Promise.resolve()):bi("backupDir").then(t=>{if(H=t||null,!H){L="unset";return}return H.queryPermission({mode:"readwrite"}).then(e=>{L=e==="granted"?"granted":"prompt"}).catch(()=>{L="prompt"})}).catch(()=>{H=null,L="unset"})}function $i(){return L==="unsupported"?"Folder picking needs Chrome/Edge on desktop — on phones backups download instead.":L==="unset"?"No folder chosen yet.":L==="prompt"?"Tap Choose folder to allow access again.":L==="denied"?"Access was denied — choose the folder again.":L==="granted"&&H?`Folder: ${H.name}`:"Checking…"}async function wi(){if(!ya()){y("Folder access needs Chrome or Edge");return}try{const t=await window.showDirectoryPicker({id:"daily-report-backup",mode:"readwrite"});await yi("backupDir",t),H=t,L="granted",y("Backup folder set")}catch(t){t&&t.name==="AbortError"||y("Couldn't open that folder")}h()}async function Si(){try{await vi("backupDir")}catch{y("Couldn't remove folder");return}H=null,L="unset",y("Backup folder removed"),h()}async function xi(){if(H){try{const t=await H.requestPermission({mode:"readwrite"});L=t==="granted"?"granted":"denied",y(t==="granted"?"Folder access granted":"Access denied")}catch{L="denied"}h()}}async function Ai(){const t=u.exportBackup(),e=Qt();if(L==="granted"&&H)try{const s=await(await H.getFileHandle(e,{create:!0})).createWritable();await s.write(t),await s.close(),y("Backup saved to your folder"),va();return}catch{}yt(e,t,"application/json"),y("Backup downloaded")}async function Ti(){if(L!=="granted"||!H)return[];const t=[];try{for await(const e of H.values())if(e&&e.kind==="file"&&/\.json$/i.test(e.name))try{const a=await e.getFile();t.push({name:e.name,modified:a.lastModified})}catch{}}catch{return t}return t.sort((e,a)=>a.modified-e.modified),t}async function va(){const t=document.getElementById("folder-backup-list");if(!t)return;if(L!=="granted"||!H){t.innerHTML='<button class="ghost-btn compact" data-action="trigger-import">Import from a file instead</button>';return}t.innerHTML='<p class="item-meta">Loading backups…</p>';const e=await Ti();if(!document.getElementById("folder-backup-list"))return;e.length?t.innerHTML=e.map(s=>`
            <div style="display:flex;gap:8px;align-items:center;margin-bottom:6px">
              <span class="item-meta" style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${m(s.name)}</span>
              <button class="ghost-btn compact" data-action="restore-backup" data-name="${m(s.name)}">Restore</button>
            </div>
          `).join(""):t.innerHTML='<p class="item-meta">Folder is empty — press Export backup now to create the first backup.</p>';const a=document.createElement("div");a.innerHTML='<button class="ghost-btn compact" data-action="trigger-import">Import from a file instead</button>',t.appendChild(a)}async function Di(t){if(H)try{const a=await(await H.getFileHandle(t)).getFile();ka(await a.text(),t)}catch{y("Couldn't read that backup")}}function ka(t,e){let a;try{a=JSON.parse(t)}catch{y("That file isn't valid JSON.");return}const s=u.backupKind(a);if(s==="ok"){if(!window.confirm(`Replace ALL app data with "${e}"?`))return;yt(Qt("daily-report-pre-import"),u.exportBackup(),"application/json"),u.importBackup(a),y("Backup imported"),h();return}if(s==="report-export"){const i=u.previewReport(a);if(!i.days){y("That report file has no day rows to import.");return}if(!window.confirm(`Import ${i.days} day(s) (${i.start} → ${i.end}) from "${e}" as locked history?

${i.newHabits} new habit(s) will be added to your list.
Days already in the app on those dates will be overwritten.`))return;yt(Qt("daily-report-pre-import"),u.exportBackup(),"application/json");const r=u.importReport(a);if(!r){y("That file doesn't look like a valid Daily Report backup.");return}y(`Imported ${r.days} day(s)${r.habits?` + ${r.habits} new habit(s)`:""}`),h();return}if(s==="wrong-app"){y("That backup belongs to another app (e.g. Iron Log) — it can’t be imported into Daily Report.");return}y("That file doesn't look like a valid Daily Report backup.")}async function Pi(){if(!gt){y("Use the browser menu: Install / Add to Home Screen");return}try{gt.prompt();const t=await gt.userChoice;t&&t.outcome==="accepted"&&y("Installing Daily Report…")}catch{}gt=null,h()}async function Ci(){const t=`./version.json?v=${Date.now()}`,e=await fetch(t,{cache:"no-store"});if(!e.ok)throw new Error(`http ${e.status}`);const a=await e.json(),s=a&&(a.version||a.v)||null;if(!s)throw new Error("no version field");return String(s)}async function Ei(){st=!0,Ut=!1,nt="Checking for updates… (needs internet)",h();try{if("serviceWorker"in navigator&&navigator.serviceWorker.getRegistration){const e=await navigator.serviceWorker.getRegistration().catch(()=>null);e&&e.update&&e.update().catch(()=>{})}}catch{}if(typeof fetch>"u"){st=!1,nt="This browser can’t check — but the app itself works offline. Use Export backup to protect your data.",h();return}const t=setTimeout(()=>{st&&(st=!1,nt="Couldn't reach the server — offline? The app itself works offline; updating needs internet.",h())},15e3);try{const e=await Ci();if(clearTimeout(t),st=!1,me=e,e&&e!==da){Ut=!0,nt="Update found — updating automatically…",h(),await $a(!0);return}nt="You're on the latest version. The app works offline."}catch{clearTimeout(t),st=!1,nt="Couldn't reach the server — offline, or this file wasn't opened from the installed/hosted app. The app itself works offline; updating needs internet."}h()}function qe(t){return new Promise(e=>{if(!("serviceWorker"in navigator))return e();const a=()=>e(),s=setTimeout(()=>{try{navigator.serviceWorker.removeEventListener("controllerchange",a)}catch{}e()},t||4e3),i=()=>{clearTimeout(s);try{navigator.serviceWorker.removeEventListener("controllerchange",i)}catch{}e()};try{navigator.serviceWorker.addEventListener("controllerchange",i)}catch{e()}})}async function $a(t){var a;try{yt(Qt("daily-report-pre-update"),u.exportBackup(),"application/json")}catch{}y("Backup saved — updating app…"),nt=`Backup saved — updating${me?` to ${String(me).slice(-8)}`:""}…`,h();const e=()=>{const s=window.location.href.includes("?")?"&":"?";try{window.location.replace(`${window.location.href.split("#")[0]}${s}v=${Date.now()}#updated`)}catch{window.location.reload()}setTimeout(()=>{try{window.location.reload()}catch{}},2500)};try{if("serviceWorker"in navigator&&navigator.serviceWorker.getRegistration){const s=await navigator.serviceWorker.getRegistration().catch(()=>null);if(s){const i=s.waiting;if(i){try{i.postMessage("SKIP_WAITING")}catch{try{s.waiting.postMessage({type:"SKIP_WAITING"})}catch{}}await qe(4e3),e();return}try{await s.update()}catch{}const n=await navigator.serviceWorker.getRegistration().catch(()=>s),r=(n||s).waiting||(n||s).installing;if(r){try{r.postMessage("SKIP_WAITING")}catch{}try{(a=(n||s).waiting)==null||a.postMessage("SKIP_WAITING")}catch{}await qe(5e3),e();return}try{const o=navigator.serviceWorker.controller;o&&o.postMessage({type:"CLEAR_APP_CACHES"})}catch{}try{if(typeof caches<"u"){const o=await caches.keys().catch(()=>[]);await Promise.all(o.filter(d=>d.startsWith("daily-report-")).map(d=>caches.delete(d).catch(()=>!1)))}}catch{}try{await fetch(`./index.html?v=${Date.now()}`,{cache:"reload"})}catch{}try{await fetch(`./version.json?v=${Date.now()}`,{cache:"reload"})}catch{}try{await(n||s).unregister()}catch{}e();return}}}catch{}try{await fetch(`./index.html?v=${Date.now()}`,{cache:"reload"})}catch{}setTimeout(e,600)}const Li=[{id:"start",icon:"🚀",title:"Getting started",summary:"How the app works in one minute",steps:[["📱","The app has five tabs at the bottom: <b>Today</b>, <b>Profile</b>, <b>History</b>, <b>Activities</b> and <b>Settings</b> — tap a tab to switch."],["⭐","Every habit and task has a <b>points value</b>. Checking it earns those points for that day."],["🧠","Some habits also award <b>conscious points</b> (🧠) on top of their normal points."],["📈","The big card on Today shows your day as points, percent and a <b>letter grade</b>."],["🔒","At your lock time the day locks itself — press <b>Submit and lock report</b> while the day is open."],["💾","Everything is saved on this device only and works fully offline."]]},{id:"today",icon:"✅",title:"Track your day (Today tab)",summary:"Habits, tasks, stars, photos and the FAB",steps:[["☑️","Tap the <b>circle check</b> on a habit or task to mark it done and earn its points."],["⭐","Tap the <b>stars</b> (1–5) to rate how well it went — a rating also counts it as done."],["🟢","Done items turn green. Unchecked items turn red as <b>Missed</b> once the day is locked."],["📷","Tasks can carry a photo — tap the thumbnail to view it full size."],["➕","Tap the big <b>+</b> button to add a habit or task for this day."],["↔️","Use the <b>‹ ›</b> arrows in the top bar to move between days."]]},{id:"edit",icon:"✏️",title:"Edit, sort & reorder",summary:"Edit Mode, drag order and archiving",steps:[["✏️","Tap <b>Edit Mode</b> in a section header to reveal the <b>Edit</b> and delete buttons."],["✋","Hold a card’s <b>grip button</b> for a moment, then drag it to a new spot in the list."],["🔃","The <b>Sort</b> selector orders the list by Points, Category, Tags or your custom drag order."],["🗂️","The <b>archive</b> button sets a habit or task aside — its history is kept and you can restore it any time from the <b>Archive</b> panel at the bottom of Today."]]},{id:"forward",icon:"🔁",title:"Forward, Replace & Pin",summary:"Moving habits and tasks between days",steps:[["↪️","<b>Forward</b> an unfinished task (➟ button) to another day — it moves there with a badge showing where it came from."],["⇄","<b>Replace</b> moves a habit’s rating to a free day before its next due date."],["📌","<b>Pin</b> a habit or task to a repeat schedule — weekly days, month dates or a custom date list — so it appears automatically. Pin it <b>forever</b> for daily essentials."],["↩️","Badges on the card (↩ Forwarded from / ⇄ Replaced from) show what moved and where — tap a badge to undo it."]]},{id:"notes",icon:"📝",title:"Day notes",summary:"Bullet and numbered lists that save themselves",steps:[["📝","The <b>Day note</b> box at the bottom of Today records how the day went."],["•","Select lines and press <b>• Bullets</b> (or <b>1. Numbered</b>) to make a list — press it again to remove the list markers."],["💾","The note saves automatically with the day and is included in exports and backups."]]},{id:"profile",icon:"👤",title:"Profile tab",summary:"Identity, life areas, goals, quotes & locking",steps:[["🪪","<b>Identity</b> — your display name and the person you want to be."],["🧬","<b>Who I am</b> — a numbered list of your roles; reorder with ↑ ↓."],["🗺️","<b>Life Areas</b> — tap a card to open it, describe it, and reorder with ↑ ↓."],["🌅","<b>My Vision</b> and <b>Core & Personal Values</b> — one value per line as a bullet list."],["💡","<b>Personal Ideas</b> — one idea per line, shown as bullets."],["🎯","<b>Goals</b> — hashtag each one: <b>#short</b> = weeks, <b>#medium</b> = 1–3 months, <b>#long</b> = a year or more."],["💬","<b>Quotes</b> — save quotes you live by and star your top 3 favourites."],["🔒","<b>Lock</b> makes the whole profile read-only; Unlock to edit again."]]},{id:"history",icon:"🕘",title:"History tab",summary:"Calendar of past days and exporting",steps:[["🗓️","History shows a month calendar colour-coded by each day’s score."],["👆","Tap any day to jump straight into that day’s report."],["📤","<b>Select & Export</b> picks a date range and exports it as <b>Excel / JSON / PDF</b> — a later import adds it back as locked history."],["☰","The list below shows recent reports with their grades."]]},{id:"activities",icon:"📊",title:"Activities tab",summary:"Charts over a week, month or year",steps:[["📊","The Activities tab charts your weekly score and progress per category."],["🗓️","Switch between <b>Week / Month / Year</b> and use <b>‹ ›</b> to step back in time."],["🎨","Each category keeps its chosen colour everywhere — charts, badges and cards."]]},{id:"rewards",icon:"🏆",title:"Goals & Rewards",summary:"Streak goals, tiers and badges",steps:[["➕","In Settings → Goals &amp; Rewards tap <b>Add goal</b>."],["🎯","Pick the target: a <b>habit or pinned-task streak of N days</b>, or <b>N perfect (100%) days</b>."],["🥇","Choose the tier — <b>Iron, Bronze, Silver or Gold</b> — and write the reward title you’ll earn."],["🎁","Progress bars track each goal; earned rewards become <b>badges</b> on Today’s Rewards strip."],["🏆","Any day that reaches 100% wins the <b>Gold Cup</b> on the spot."]]},{id:"cats",icon:"🗂️",title:"Categories & tags",summary:"Custom categories, colours, goals and tags",steps:[["🌈","Settings → <b>Categories</b>: add your own, tap one to open it, and pick its colour."],["📝","Type the category’s <b>goals</b> as bullet points and press Save — they reach forms, Activities and exports."],["🏷️","Tags group habits and tasks. From Settings → <b>Tags</b> you can rename or delete a tag everywhere at once."],["➕","New tags are added inside any habit or task form, or from the Tags section itself."]]},{id:"backup",icon:"💾",title:"Backup, updates & install",summary:"Keeping your data safe and the app fresh",steps:[["📁","Settings → <b>Data backup</b>: choose a folder once (desktop Chrome/Edge) and <b>Export backup now</b> saves a JSON straight into it."],["📥","<b>Import backup</b> accepts full backups (<b>daily-report-backup-*.json</b>) or month/week exports, which are added as locked history."],["🔄","<b>Check for updates</b> installs the newest version in place — a backup is saved first. Only this check needs internet."],["📲","<b>Install app</b> puts Daily Report on your home screen as a fullscreen offline app."]]},{id:"locking",icon:"🔐",title:"Locking & unlocking days",summary:"Auto-lock, submit and batch unlock",steps:[["⏰","Set the <b>auto-lock time</b> in Settings → Report lock; after that time today locks itself."],["🚫","A locked day is read-only, and anything unchecked already counted as <b>Missed</b> at lock time."],["📅","Settings → <b>Locked reports</b>: red days are locked, green days are open."],["☝️","Tap days to select them, then <b>Lock</b> or <b>Unlock</b> them all in one go."]]}];function Mi(t){return`<div class="tut-steps">${t.map(e=>`
        <div class="tut-step">
          <span class="tut-step-ico" aria-hidden="true">${e[0]}</span>
          <p>${e[1]}</p>
        </div>`).join("")}</div>`}function Hi(){return`
    <div class="tut-grid">
      ${Li.map(t=>{const e=jt===t.id;return`
          <article class="tut-card ${e?"open":""}">
            <button type="button" class="tut-head" data-action="open-tutorial" data-id="${t.id}" aria-expanded="${e?"true":"false"}">
              <span class="tut-ico" aria-hidden="true">${t.icon}</span>
              <span class="tut-titles">
                <span class="tut-title">${m(t.title)}</span>
                <span class="tut-summary">${m(t.summary)}</span>
              </span>
              <span class="tut-chev" aria-hidden="true">${e?"▾":"▸"}</span>
            </button>
            ${e?`<div class="tut-body">${Mi(t.steps)}</div>`:""}
          </article>
        `}).join("")}
    </div>
  `}function z(t,{icon:e,title:a,hint:s},i){const n=wt.has(t);return`
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
  `}function Ni(){const t=u.getSettings(),e=u.getAllHabits(),a=u.getPinnedHabits(),s=[...a,...e.filter(o=>!o.pin)],i=u.getArchivedHabits(),n=u.getPinnedTasks(),r=u.lockedReports();return`
    <div class="topbar">
      <div>
        <p class="kicker">Admin rules</p>
        <h1>Settings</h1>
      </div>
      <button class="ghost-btn compact ${ct?"on":""}" data-action="toggle-settings-edit" aria-pressed="${ct}">${ct?"Done":"Edit Mode"}</button>
    </div>
    <p class="muted tight settings-sec-lead">Sections are closed by default — tap a title to open and edit it.</p>

    ${z("tutorials",{icon:"📚",title:"Tutorials",hint:"Illustrated guide to the app & its usage"},Hi())}

    ${z("report-lock",{icon:"🔒",title:"Report lock",hint:`Auto-lock at ${t.lockTime}`},`
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
          ${[0,1,2,3,4,5,6].map(o=>{const d=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];return`<option value="${o}" ${u.getWeekStart()===o?"selected":""}>${d[o]}</option>`}).join("")}
        </select>
      </label>
      <p class="item-meta">Applies to the Week tab, week exports, and pin calendars.</p>
    `)}

    ${z("appearance",{icon:"🎨",title:"Appearance",hint:u.getTheme()==="dark"?"🌙 Dark mode":"☀️ Light mode"},`
      <p class="muted tight">Pick Dark or Light mode. It applies everywhere, instantly.</p>
      <div class="chip-row">
        <button type="button" class="chip ${u.getTheme()==="dark"?"on":""}" data-action="set-theme" data-theme="dark">🌙 Dark</button>
        <button type="button" class="chip ${u.getTheme()==="light"?"on":""}" data-action="set-theme" data-theme="light">☀️ Light</button>
      </div>
    `)}

    ${z("install",{icon:"📲",title:"Install app",hint:window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches?"Installed ✓":"Add to home screen"},`
      <p class="muted tight">Put Daily Report on your home screen for fullscreen offline use. Open it over http://localhost or https — it cannot install from a file:// page.</p>
      ${window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches?'<p class="item-meta">Installed — running as app ✓</p>':'<button class="primary-btn full" data-action="install-app">Install Daily Report</button>'}
    `)}

    ${z("updates",{icon:"🔄",title:"App updates",hint:`${Ut?"Update ready":m(Ne)}`},`
      <p class="muted tight">The app works fully offline. Only checking for updates needs internet. Tapping Check for updates installs the newest version automatically (a JSON backup of your data is saved first). Your data stays on this device.</p>
      <p class="item-meta">Version: ${m(Ne)}</p>
      <p class="item-meta">📅 ${m(hi())}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
        <button class="primary-btn" data-action="check-updates" ${st?"disabled":""}>${st?"Checking…":"Check for updates"}</button>
        ${Ut?'<button class="primary-btn" data-action="apply-update">Restart with update</button>':""}
      </div>
      <p class="item-meta">${m(nt)}</p>
    `)}

    ${z("backup",{icon:"💾",title:"Data backup",hint:`${L==="granted"?"Folder connected":"Choose a folder"}`},`
      <p class="muted tight">Pick a backup folder once (Chrome/Edge on desktop) and exports save straight into it. On phones, backups download to your Downloads folder instead. Import accepts full backups (<b>daily-report-backup-*.json</b>) or month/week report exports, which are added as locked history.</p>
      <p class="item-meta">${m($i())}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
        ${L==="prompt"?'<button class="primary-btn" data-action="grant-folder">Allow access</button>':'<button class="ghost-btn compact" data-action="choose-folder">Choose folder</button>'}
        ${H?'<button class="ghost-btn compact" data-action="forget-folder">Remove</button>':""}
        <button class="primary-btn" data-action="backup-now">Export backup now</button>
        <button class="ghost-btn compact" data-action="trigger-import">Import backup</button>
      </div>
      <input type="file" id="backup-file" accept="application/json,.json" hidden />
      <div id="folder-backup-list" style="margin-top:10px"></div>
    `)}

    ${z("categories",{icon:"🗂️",title:"Categories",hint:`${u.getCategories().length}`},`
      <p class="muted tight">Add your own categories — they appear in forms, Activities and exports. Tap a category to open it, set its colour, then type its goals as bullet points and press Save.</p>
      <div class="cat-expand-row">
        <button class="mini-btn" data-action="expand-cats">Expand all</button>
        <button class="mini-btn" data-action="collapse-cats">Collapse all</button>
      </div>
      <div class="habit-manage">
        ${u.getCategories().map(o=>{const d=u.getCustomCategories().some(S=>S.id===o.id),c=o.color||W(o.id),g=o.goals||"",v=Tt(g),p=ht.has(o.id)?ht.get(o.id):g,w=Dt(Tt(p))!==Dt(v),P=dt.has(o.id);return`
              <article class="manage-card cat-manage-card ${P?"open":""}">
                <div class="cat-manage-head">
                  <button type="button" class="cat-manage-toggle" data-action="toggle-cat" data-id="${o.id}" aria-expanded="${P?"true":"false"}" aria-controls="cat-editor-${o.id}">
                    <span class="cat-chevron" aria-hidden="true">${P?"▾":"▸"}</span>
                    <i class="cat-swatch" style="background:${m(c)}"></i>
                    <span class="cat-manage-name">${m(at(o.id))}</span>
                    ${v.length?`<span class="cat-goal-flag">${v.length} goal${v.length===1?"":"s"}</span>`:""}
                  </button>
                  <div class="mini-actions">
                    ${d?`<button class="mini-btn on" data-action="rename-category" data-id="${o.id}">Rename</button>`:""}
                    ${d?`<button class="mini-btn" data-action="delete-category" data-id="${o.id}">✕</button>`:""}
                  </div>
                </div>
                ${P?`
                      <div class="cat-manage-body" id="cat-editor-${o.id}">
                        <div class="cat-manage-row">
                          <label>Colour
                            <input type="color" data-cat-color="${o.id}" value="${m(c)}" aria-label="Colour for ${m(o.label||at(o.id))}" />
                          </label>
                          <div class="cat-goals-wrap">
                            <label>Goals — one per line
                              <textarea data-cat-goals="${o.id}" maxlength="1000" placeholder="• Goal one&#10;• Goal two&#10;• Goal three" style="min-height:90px">${m(p)}</textarea>
                            </label>
                            <div class="cat-save-row">
                              <button class="primary-btn compact-btn" data-action="save-cat-goals" data-id="${o.id}">${w?"Save goals":"Saved"}</button>
                              <button class="ghost-btn compact" data-action="reset-cat-goals" data-id="${o.id}" ${w?"":"hidden"}>Discard</button>
                            </div>
                            <p class="item-meta cat-goal-hint">${w?"Unsaved changes — press Save to keep them offline and in backups.":"Saved on this device and included in every backup."}</p>
                          </div>
                        </div>
                      </div>
                    `:v.length?`<ul class="note-list cat-goal-preview">${v.map(S=>`<li>${m(S)}</li>`).join("")}</ul>`:'<p class="item-meta">No goals yet — open this category to add some.</p>'}
              </article>
            `}).join("")}
      </div>
      <div style="display:flex;gap:8px;margin-top:10px">
        <input id="new-category" maxlength="30" placeholder="New category name…" style="flex:1;min-width:0" />
        <button class="primary-btn compact-btn" data-action="add-category">Add</button>
      </div>
    `)}

    ${z("tags",{icon:"🏷️",title:"Tags",hint:`${u.getAllTags().length}`},`
      <p class="muted tight">Rename a tag everywhere at once, or delete it from all habits and tasks. New tags are added inside any habit/task form.</p>
      <div class="habit-manage">
        ${(()=>{const o=u.getAllTags();return o.length?o.map(({tag:d,count:c})=>`
              <article class="manage-card">
                <div class="section-head">
                  <div>
                    <div class="item-title">#${m(d)}</div>
                    <div class="item-meta">Used ${c} time${c===1?"":"s"}</div>
                  </div>
                  <div class="mini-actions">
                    <button class="mini-btn on" data-action="rename-tag" data-tag="${m(d)}">Rename</button>
                    <button class="mini-btn" data-action="delete-tag" data-tag="${m(d)}">✕</button>
                  </div>
                </div>
              </article>
            `).join(""):'<div class="empty">No tags yet — add some in a habit or task form.</div>'})()}
      </div>
      <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">
        <select id="tag-habit-pick" style="flex:1;min-width:0">
          ${u.getAllHabits().map(o=>`<option value="${o.id}">${m(o.name)}</option>`).join("")}
        </select>
        <input id="new-tag" maxlength="20" placeholder="New tag…" style="flex:1;min-width:0" />
        <button class="primary-btn compact-btn" data-action="add-tag">Add</button>
      </div>
    `)}

    ${z("goals",{icon:"🏅",title:"Goals & Rewards",hint:`${u.getGoals().length} goals · ${u.getBadges().length} badges`},`
      <div class="section-head">
        <p class="muted tight" style="max-width:270px">Do a habit / pinned task N days in a row, or collect N perfect (100%) days — earn an Iron, Bronze, Silver or Gold badge with your own title.</p>
        <button class="ghost-btn compact" data-action="open-goal">Add goal</button>
      </div>
      <div class="habit-manage">
        ${u.getGoals().length?u.getGoals().map(o=>{var v,p;const d=u.goalProgress(o,b),c=u.getBadges().some(w=>w.goalId===o.id),g=o.kind==="habit-streak"?((v=u.findHabit(o.targetId))==null?void 0:v.name)||"Deleted habit":o.kind==="task-streak"?((p=u.findPinnedTask(o.targetId))==null?void 0:p.title)||"Deleted task":"Any day at 100%";return`
                    <article class="manage-card goal-card ${c?"goal-earned":""}">
                      <div class="section-head">
                        <div>
                          <div class="item-title">${ne(o.tier)} ${m(o.title)}</div>
                          <div class="item-meta">${ta(o.tier)} · “${m(o.rewardTitle)}” · ${m(g)}</div>
                          <div class="item-meta">${d.current}/${d.target} days ${c?"· Earned ✓":""}</div>
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
      ${u.getBadges().length?`
            <div class="section-head" style="margin-top:14px"><h2>Earned badges</h2></div>
            <div class="rewards-grid">
              ${u.getBadges().map(o=>`
                <article class="reward-card tier-${o.tier}">
                  <div class="reward-medal">${ne(o.tier)}</div>
                  <div>
                    <div class="item-title">${m(o.rewardTitle||o.title)}</div>
                    <div class="item-meta">${m(o.title)} · ${Q((o.earnedAt||"").slice(0,10))}</div>
                  </div>
                  <button class="mini-btn" data-action="remove-badge" data-id="${o.id}">✕</button>
                </article>
              `).join("")}
            </div>
          `:""}
    `)}

    ${z("locked-reports",{icon:"📅",title:"Locked reports",hint:`${r.length} locked`},`
      <div class="section-head">
        <p class="muted tight" style="max-width:260px">Red = locked, green = open. Tap days to select them, then lock or unlock all at once.</p>
        <div class="date-nav">
          <button class="icon-btn" data-action="locked-cal-nav" data-dir="-1" aria-label="Previous month">‹</button>
          <button class="icon-btn" data-action="locked-cal-nav" data-dir="1" aria-label="Next month">›</button>
        </div>
      </div>
      ${di(r)}
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

    ${z("habits",{icon:"✅",title:"Habits",hint:`${s.length}`},`
      <div class="section-head">
        <p class="muted tight" style="max-width:280px">Tap a habit to see its activity. In Edit Mode, edit habits and reorder pinned habits.</p>
        <button class="ghost-btn compact" data-action="open-add-habit">Add</button>
      </div>
      <div class="habit-manage">
        ${s.length?s.map(o=>{const d=Rt.has(o.id),c=o.pin?a.findIndex(v=>v.id===o.id):-1,g=d?u.getHabitActivity(o.id,20):[];return`
                    <article class="manage-card setting-habit-card ${d?"open":""}" style="${o.pin?`border-left:4px solid ${W(o.category)}`:""}">
                      <div class="section-head">
                        <button type="button" class="setting-habit-toggle" data-action="toggle-setting-habit" data-id="${o.id}" aria-expanded="${d?"true":"false"}">
                          <span class="setting-habit-chevron" aria-hidden="true">${d?"▾":"▸"}</span>
                          <span class="setting-habit-heading">
                            <span class="item-title">${m(o.name)}</span>
                            <span class="item-meta">${ut(o.category)} · ${o.pin?ft(o.pin):"Not pinned"} · +${o.points} pts ${t.showConscious!==!1?Number(o.consciousPoints)?`· 🧠 +${o.consciousPoints}`:"· No conscious pts":""} · ${Vt(u.habitStreak(o.id,b))}</span>
                          </span>
                        </button>
                        <div class="mini-actions">
                          ${ct?`
                            <button class="mini-btn on" data-action="open-edit-habit" data-id="${o.id}" aria-label="Edit ${m(o.name)}">Edit</button>
                            ${o.pin?`
                              <button class="mini-btn" data-action="move-pinned-habit" data-id="${o.id}" data-dir="-1" ${c===0?"disabled":""} aria-label="Move ${m(o.name)} up" title="Move up">↑</button>
                              <button class="mini-btn" data-action="move-pinned-habit" data-id="${o.id}" data-dir="1" ${c===a.length-1?"disabled":""} aria-label="Move ${m(o.name)} down" title="Move down">↓</button>
                            `:""}
                            <button class="mini-btn ${o.pin?"on":""}" data-action="open-pin-habit" data-id="${o.id}" aria-label="${o.pin?"Change pin schedule":"Pin habit"}">${C("pin")}</button>
                            <button class="mini-btn" data-action="remove-habit" data-id="${o.id}" aria-label="Remove ${m(o.name)}">✕</button>
                          `:""}
                        </div>
                      </div>
                      ${d?`
                        <div class="setting-habit-details">
                          ${o.description?`<p class="item-desc">${m(o.description)}</p>`:'<p class="item-meta">No description yet.</p>'}
                          ${et(o.tags)}
                          <div class="setting-habit-activity">
                            <div class="item-title">Recent activity</div>
                            ${g.length?g.map(v=>`
                              <button type="button" class="setting-habit-activity-row" data-action="open-habit-activity-date" data-date="${v.date}">
                                <span>${Q(v.date)}</span>
                                <span>${v.rating?`${v.rating}/5 · ${v.status}`:v.status}</span>
                                ${v.locked?'<span class="lock-badge">Locked</span>':""}
                              </button>
                            `).join(""):'<p class="item-meta">No recorded activity yet.</p>'}
                          </div>
                        </div>
                      `:""}
                    </article>
                  `}).join(""):'<div class="empty">No habits yet.</div>'}
      </div>
    `)}

    ${i.length?z("deleted-habits",{icon:"🗑️",title:"Deleted habits",hint:`${i.length} — history kept`},`
      <p class="muted tight">Deleting a habit never erases history: days that already recorded it keep it and its points. Restore a habit to bring it back on future days.</p>
      <div class="habit-manage">
        ${i.map(o=>`
                    <article class="manage-card archived" style="border-left:4px solid ${W(o.category)}">
                      <div class="section-head">
                        <div>
                          <div class="item-title">${m(o.name)}</div>
                          <div class="item-meta">${ut(o.category)} · +${o.points} pts${o.pin?` · ${ft(o.pin)}`:" · Pin ended"} · ${ge(o.archivedAt)}</div>
                          ${o.description?`<p class="item-desc">${m(o.description)}</p>`:""}
                          ${et(o.tags)}
                        </div>
                        <div class="mini-actions">
                          <button class="mini-btn on" data-action="restore-habit" data-id="${o.id}">${C("undo")}</button>
                        </div>
                      </div>
                    </article>
                  `).join("")}
      </div>
    `):""}

    ${z("pinned-tasks",{icon:"📌",title:"Pinned tasks",hint:`${n.length}`},`
      <p class="muted tight">Pinned tasks appear automatically on matching days.</p>
      <div class="habit-manage">
        ${n.length?n.map(o=>`
                    <article class="manage-card" style="border-left:4px solid ${W(o.category)}">
                      <div class="section-head">
                        <div>
                          <div class="item-title">${m(o.title)}</div>
                          <div class="item-meta">${ut(o.category)} · ${ft(o.pin)} · +${o.points} pts</div>
                          ${o.description?`<p class="item-desc">${m(o.description)}</p>`:""}
                          ${et(o.tags)}
                        </div>
                        <div class="mini-actions">
                          ${ct?`
                            <button class="mini-btn on" data-action="open-edit-pinned-task" data-id="${o.id}" aria-label="Edit ${m(o.title)}">Edit</button>
                            <button class="mini-btn" data-action="move-pinned-task" data-id="${o.id}" data-dir="-1" ${n.indexOf(o)===0?"disabled":""} aria-label="Move ${m(o.title)} up" title="Move up">↑</button>
                            <button class="mini-btn" data-action="move-pinned-task" data-id="${o.id}" data-dir="1" ${n.indexOf(o)===n.length-1?"disabled":""} aria-label="Move ${m(o.title)} down" title="Move down">↓</button>
                            <button class="mini-btn on" data-action="open-pin-template" data-id="${o.id}" aria-label="Change repeat schedule">${C("pin")}</button>
                            <button class="mini-btn" data-action="unpin-template" data-id="${o.id}" aria-label="Unpin ${m(o.title)}">✕</button>
                          `:""}
                        </div>
                      </div>
                    </article>
                  `).join(""):'<div class="empty">Pin a task from Today to repeat it.</div>'}
      </div>
    `)}
  `}function O(t){if(/^\d{4}-\d{2}$/.test(String(t||"")))return String(t);if(/^\d{4}-\d{2}-\d{2}$/.test(String(t||"")))return String(t).slice(0,7);const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}`}function St(t,e){const[a,s]=String(t).split("-").map(Number),i=new Date(a,(s||1)-1+e,1);return`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}`}function Zt(t){const[e,a]=String(t).split("-").map(Number);return new Date(e,(a||1)-1,1).toLocaleDateString(void 0,{month:"long",year:"numeric"})}function we(){const t=u.getWeekStart(),e=mt.findIndex(a=>a.value===t);return e<=0?mt:[...mt.slice(e),...mt.slice(0,e)]}function Se(t){const[e,a]=String(t).split("-").map(Number),i=(new Date(e,a-1,1).getDay()-u.getWeekStart()+7)%7,n=new Date(e,a,0).getDate(),r=[];for(let o=0;o<i;o++)r.push(null);for(let o=1;o<=n;o++)r.push(`${e}-${String(a).padStart(2,"0")}-${String(o).padStart(2,"0")}`);return r}function We(t,e,a){const s=new Set(a||[]),i=Se(e);return`
    <div class="pin-cal" data-cal="${t}">
      <div class="pin-cal-head">
        <button type="button" class="mini-btn" data-action="pin-cal-nav" data-target="${t}" data-dir="-1" aria-label="Previous month">‹</button>
        <b>${Zt(e)}</b>
        <button type="button" class="mini-btn" data-action="pin-cal-nav" data-target="${t}" data-dir="1" aria-label="Next month">›</button>
      </div>
      <div class="pin-cal-grid pin-cal-week">
        ${we().map(n=>`<span>${n.label.slice(0,1)}</span>`).join("")}
      </div>
      <div class="pin-cal-grid">
        ${i.map(n=>n?`<button type="button" class="pin-cal-day ${s.has(n)?"on":""}" data-action="toggle-pin-date" data-target="${t}" data-date="${n}">${Number(n.slice(8,10))}</button>`:"<span></span>").join("")}
      </div>
    </div>
  `}function Ii(t,e){const a=(t==null?void 0:t.mode)||"forever",s=(t==null?void 0:t.until)||"",i=((t==null?void 0:t.weekdays)||[]).map(Number),n=((t==null?void 0:t.monthDays)||[]).map(Number),r=Array.isArray(t==null?void 0:t.yearDays)?[...t.yearDays].sort():[],o=Array.isArray(t==null?void 0:t.customDates)?[...t.customDates].sort():[],d=Array.isArray(t==null?void 0:t.exceptDates)?[...t.exceptDates].sort():Array.isArray(t==null?void 0:t.exceptions)?[...t.exceptions].sort():[],c=e&&e._exceptCal||O(b),g=e&&e._customCal||O(b),v=e&&e._yearMonth||"01";return`
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
        ${mt.map(p=>`
            <button type="button" class="chip weekday ${i.includes(p.value)?"on":""}" data-action="toggle-weekday" data-day="${p.value}">
              ${p.label}
            </button>
          `).join("")}
      </div>
    </div>
    <div class="pin-monthdays" style="${a==="monthly"?"":"display:none"}">
      <p class="item-meta">Repeat every month on day</p>
      <div class="chip-row">
        ${Array.from({length:31},(p,w)=>w+1).map(p=>`<button type="button" class="chip monthday ${n.includes(p)?"on":""}" data-action="toggle-monthday" data-day="${p}">${p}</button>`).join("")}
      </div>
    </div>
    <div class="pin-yeardays" style="${a==="yearly"?"":"display:none"}">
      <p class="item-meta">Repeat every year on (month + day)</p>
      <div class="row-2">
        <label>Month
          <select id="year-month-select">
            ${Array.from({length:12},(p,w)=>w+1).map(p=>`<option value="${String(p).padStart(2,"0")}" ${v===String(p).padStart(2,"0")?"selected":""}>${new Date(2e3,p-1,1).toLocaleDateString(void 0,{month:"long"})}</option>`).join("")}
          </select>
        </label>
        <label>Day
          <select id="year-day-select">
            ${Array.from({length:31},(p,w)=>w+1).map(p=>`<option value="${String(p).padStart(2,"0")}">${p}</option>`).join("")}
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
      ${We("custom",g,o)}
      <div class="chip-row" style="margin-top:8px">
        ${o.length?o.map(p=>`<button type="button" class="chip on" data-action="toggle-pin-date" data-target="custom" data-date="${p}" title="Tap to remove">${p} ✕</button>`).join(""):'<span class="item-meta">No extra custom dates.</span>'}
      </div>
    </div>
    <div class="pin-exceptions" style="margin-top:4px">
      <p class="item-meta"><b style="color:var(--text)">Exceptions</b> — skip these days (tap days on the calendar). Applies to every repeat mode.</p>
      ${We("except",c,d)}
      <div class="chip-row" style="margin-top:8px">
        ${d.length?d.map(p=>`<button type="button" class="chip on" data-action="toggle-pin-date" data-target="except" data-date="${p}" title="Tap to remove">${p} ✕</button>`).join(""):'<span class="item-meta">No exceptions.</span>'}
      </div>
    </div>
  `}function Ri(){if(!x)return"";if(x==="choose")return`
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
    `;if(x==="habit"||x==="task"||x==="edit-habit"||x==="edit-task"||x==="edit-pinned-task"){const t=x==="habit"||x==="edit-habit",e=x.startsWith("edit-"),a=k||{},s=a.category||(t?"physically":"mentally"),i=Math.max(0,Math.min(5,Number(a.rating)||0)),n=Array.isArray(a.tags)?a.tags.join(", "):a.tags||"",r=a.consciousPoints!=null?Number(a.consciousPoints):a.conscious!=null?Number(a.conscious):0;return`
      <div class="modal-backdrop open" data-action="close-modal">
        <form class="sheet" data-form="${x}" data-id="${a.id||""}">
          <div class="handle"></div>
          <h2>${e?"Edit":"New"} ${t?"habit":"task"}</h2>
          <div class="form" style="margin-top:14px">
            <label>
              ${t?"Habit name":"Task name"}
              <input name="title" required maxlength="60" value="${m(a.title||a.name||"")}" placeholder="${t?"Meditate":"Finish report"}" />
            </label>
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
                ${u.getCategories().map(o=>`
                    <button type="button" class="chip ${s===o.id?"on":""}" data-action="set-category" data-category="${o.id}">${m(o.label)}</button>
                  `).join("")}
              </div>
              <input type="hidden" name="category" value="${s}" />
            </div>
            <label>
              Tags (optional, comma separated)
              <input name="tags" maxlength="120" value="${m(n)}" placeholder="morning, health" />
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
    `}if(x==="export"){const t=k&&k.range||"day";return`
      <div class="modal-backdrop open" data-action="close-modal">
        <div class="sheet">
          <div class="handle"></div>
          <h2>Export report</h2>
          <p class="muted tight">Date: ${Q(b)}. Pick a range, then a format.</p>
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
    `}if(x==="goal"||x==="edit-goal"){const t=x==="edit-goal",e=k||{},a=e.kind||"habit-streak",s=u.getAllHabits(),i=u.getPinnedTasks(),n=e.targetId||"";return`
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
                ${Ke.map(r=>`<button type="button" class="chip ${a===r.id?"on":""}" data-action="set-goal-kind" data-kind="${r.id}">${r.label}</button>`).join("")}
              </div>
              <input type="hidden" name="kind" value="${a}" />
            </div>
            <label class="goal-target-habit" style="${a==="habit-streak"?"":"display:none"}">
              Habit
              <select name="habitTarget">
                ${s.map(r=>`<option value="${r.id}" ${n===r.id?"selected":""}>${m(r.name)}</option>`).join("")}
              </select>
            </label>
            <label class="goal-target-task" style="${a==="task-streak"?"":"display:none"}">
              Pinned task
              <select name="taskTarget">
                ${i.length?i.map(r=>`<option value="${r.id}" ${n===r.id?"selected":""}>${m(r.title)}</option>`).join(""):'<option value="">No pinned tasks yet</option>'}
              </select>
            </label>
            <label>
              Number of days
              <input name="targetDays" type="number" min="1" max="365" value="${e.targetDays||7}" />
            </label>
            <div>
              <p class="item-meta">Badge</p>
              <div class="chip-row goal-tier-row">
                ${Ct.map(r=>`<button type="button" class="chip ${(e.tier||"bronze")===r.id?"on":""}" data-action="set-goal-tier" data-tier="${r.id}">${r.medal} ${r.label}</button>`).join("")}
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
    `}if(x==="pin"){const{kind:t,id:e,title:a,pin:s}=k||{};return`
      <div class="modal-backdrop open" data-action="close-modal">
        <form class="sheet sheet-wide" data-form="pin" data-kind="${t}" data-id="${e}">
          <div class="handle"></div>
          <h2>Pin ${t==="habit"?"habit":"task"}</h2>
          <p class="muted tight">${m(a||"")}</p>
          <div class="form" style="margin-top:14px">
            ${Ii(s,k)}
            <button class="primary-btn" type="submit">Save pin</button>
            ${s?'<button class="ghost-btn danger" type="button" data-action="clear-pin">Unpin</button>':""}
            <button class="ghost-btn" type="button" data-action="close-modal">Cancel</button>
          </div>
        </form>
      </div>
    `}if(x==="forward"){const{kind:t,id:e,title:a,from:s}=k||{};return`
      <div class="modal-backdrop open" data-action="close-modal">
        <form class="sheet" data-form="forward" data-kind="${t}" data-id="${e}">
          <div class="handle"></div>
          <h2>Forward task</h2>
          <p class="muted tight">${m(a||"")}</p>
          <p class="item-meta">From ${m(s||b)} — a copy will be created on the day you pick, marked “↩ Forwarded from ${m(s||b)}”.</p>
          <div class="form" style="margin-top:14px">
            <label>
              Forward to day
              <input name="targetDate" type="date" required value="${ti(s||b)}" />
            </label>
            <button class="primary-btn" type="submit">Forward task →</button>
            <button class="ghost-btn" type="button" data-action="close-modal">Cancel</button>
          </div>
        </form>
      </div>
    `}if(x==="replace"){const{id:t,title:e,from:a,info:s}=k||{},i=s&&s.days||[];return`
      <div class="modal-backdrop open" data-action="close-modal">
        <form class="sheet" data-form="replace" data-id="${t}">
          <div class="handle"></div>
          <h2>Replace habit day</h2>
          <p class="muted tight">${m(e||"")}</p>
          <p class="item-meta">Currently due on <b>${m(a||b)}</b>. Its next direct day is <b>${m(s&&s.next||"")}</b>, so the day may only move to one of the ${i.length} day${i.length===1?"":"s"} in between — the allowable replace days.</p>
          <div class="form" style="margin-top:14px">
            <div class="replace-day-grid">
              ${i.map(n=>`<button type="button" class="chip replace-day-chip" data-action="pick-replace-day" data-date="${n}">${m(n)}</button>`).join("")}
            </div>
            <input type="hidden" name="targetDate" value="${i[0]||""}" />
            <button class="primary-btn" type="submit" ${i.length?"":"disabled"}>Replace day ⇄</button>
            <button class="ghost-btn" type="button" data-action="close-modal">Cancel</button>
          </div>
        </form>
      </div>
    `}if(x==="image"){const{image:t,title:e}=k||{};return t?`
      <div class="lightbox-backdrop" data-action="close-modal">
        <img src="${t}" alt="${m(e||"Task photo")}" />
        <button type="button" class="ghost-btn compact lightbox-close" data-action="close-modal">✕ Close</button>
      </div>
    `:""}return""}function h(){if(ae){ke();try{const t=u.isLocked(b);ae.innerHTML=`
    <div class="app-shell">
      <main class="screen active">
        ${N==="today"?ai():""}
        ${N==="profile"?si():""}
        ${N==="history"?li():""}
        ${N==="habits"?fi():""}
        ${N==="settings"?Ni():""}
      </main>
      ${["today","habits"].includes(N)&&!t?'<button class="fab" data-action="open-add" aria-label="Add">+</button>':""}
      ${N==="settings"?'<button class="fab" data-action="open-add-habit" aria-label="Add habit">+</button>':""}
      <nav class="tabbar tabs-5">
        <button class="tab ${N==="today"?"active":""}" data-screen="today">${C("home")}Today</button>
        <button class="tab ${N==="profile"?"active":""}" data-screen="profile">${C("profile")}Profile</button>
        <button class="tab ${N==="history"?"active":""}" data-screen="history">${C("history")}History</button>
        <button class="tab ${N==="habits"?"active":""}" data-screen="habits">${C("habit")}Activities</button>
        <button class="tab ${N==="settings"?"active":""}" data-screen="settings">${C("settings")}Settings</button>
      </nav>
    </div>
    ${Ri()}
    <div class="toast" id="toast"></div>
  `,ji(),ni(),_i(),Gi(),va(),Oi()}catch(t){const e=t&&t.stack?String(t.stack).slice(0,400):t&&t.message?t.message:"Unknown error";ae.innerHTML=`<div class="app-shell"><section class="manage-card"><h2>Could not load (Error B)</h2><p class="muted tight">${m(e)}</p><button class="primary-btn full" data-action="reload-app">Reload</button></section></div>`}}}function Oi(){if(x!=="habit"&&x!=="task")return;const t=document.querySelector(".sheet");t&&(t.scrollTop=0);const e=document.querySelector('.sheet input[name="title"]');if(e)try{e.focus({preventScroll:!0})}catch{try{e.focus()}catch{}}}function ji(){const t=document.getElementById("day-note");t&&t.addEventListener("input",()=>{u.isLocked(b)||u.setNote(b,t.value)})}const Bi=3e3,Fi=180,Ue=10,A={list:null,card:null,timer:null,startX:0,startY:0,dragging:!1,order0:"",swallowClick:!1,fromHandle:!1,bound:!1};function he(){A.timer&&(clearTimeout(A.timer),A.timer=null),A.card=null,A.fromHandle=!1}function wa(t,e){return[...t.querySelectorAll(".item-card[data-sortable]")].filter(a=>a.dataset.sortable===e).map(a=>a.dataset.id)}function ze(t){const e=A.card,a=A.list;if(he(),A.list=null,A.dragging=!1,!e||(e.classList.remove("is-dragging"),a&&a.classList.remove("is-reordering"),document.body.classList.remove("is-reordering-body"),!t))return;const s=e.dataset.sortable,i=wa(a,s);i.join("|")!==A.order0&&(A.swallowClick=!0,setTimeout(()=>{A.swallowClick=!1},400),s==="habit"?(u.setHabitOrder(i),u.setHabitSort("custom")):s==="task"&&(u.setTaskOrder(b,i),u.setTaskSort("custom")),h(),y("Order saved"))}function Gi(){A.bound||(A.bound=!0,document.addEventListener("pointerdown",t=>{if(t.button!=null&&t.button!==0||t.target.closest("input, textarea, select, img, video, .stars, .mini-btn, .check, .fab, .tabbar"))return;const e=t.target.closest(".item-card[data-sortable]");if(!e)return;const a=e.closest(".list");if(!a||u.isLocked(b))return;const s=e.dataset.sortable,i=u.getSettings(),n=(s==="habit"?i.habitSort:i.taskSort)||"default";n!=="default"&&n!=="custom"&&(s==="habit"?u.setHabitSort("custom"):u.setTaskSort("custom"),y("Switched to Custom order so your drag sticks"));const r=t.target.closest(".drag-handle");r&&t.preventDefault(),he(),A.list=a,A.card=e,A.fromHandle=!!r,A.startX=t.clientX,A.startY=t.clientY,A.order0=wa(a,s).join("|"),A.timer=setTimeout(()=>{A.timer=null,!(!A.card||!A.card.isConnected)&&(A.dragging=!0,navigator.vibrate&&navigator.vibrate(15),A.card.classList.add("is-dragging"),A.list.classList.add("is-reordering"),document.body.classList.add("is-reordering-body"),y("Drag to reorder, lift to drop"))},r?Fi:Bi)},!0),document.addEventListener("pointermove",t=>{if(A.timer&&A.card&&!A.fromHandle&&(Math.abs(t.clientX-A.startX)>Ue||Math.abs(t.clientY-A.startY)>Ue)){he(),A.list=null;return}if(!A.dragging||!A.card)return;t.preventDefault();const e=A.card,a=A.list;if(!a)return;const s=t.clientY,i=e.dataset.sortable,n=[...a.querySelectorAll(".item-card[data-sortable]")].filter(o=>o!==e&&o.dataset.sortable===i);let r=!1;for(const o of n){const d=o.getBoundingClientRect();if(s<d.top+d.height/2){a.insertBefore(e,o),r=!0;break}}r||a.appendChild(e)},{passive:!1}),document.addEventListener("pointerup",()=>ze(A.dragging)),document.addEventListener("pointercancel",()=>ze(!1)),document.addEventListener("contextmenu",t=>{(A.dragging||A.card)&&t.preventDefault()}),document.addEventListener("touchmove",t=>{A.dragging&&t.preventDefault()},{passive:!1}),document.addEventListener("click",t=>{A.swallowClick&&(t.stopPropagation(),t.preventDefault())},!0))}function _i(){const t=document.getElementById("lock-time"),e=document.getElementById("auto-lock");t&&t.addEventListener("change",()=>{u.setLockTime(t.value),y(`Lock time set to ${t.value}`),h()}),e&&e.addEventListener("change",()=>{u.setAutoLock(e.checked),y(e.checked?"Auto-lock on":"Auto-lock off"),h()}),document.querySelectorAll("[data-cat-color]").forEach(s=>{s.addEventListener("input",()=>{var n;u.updateCategory(s.dataset.catColor,{color:s.value});const i=(n=s.closest(".cat-manage-card"))==null?void 0:n.querySelector(".cat-swatch");i&&(i.style.background=s.value)})}),document.querySelectorAll("[data-cat-goals]").forEach(s=>{const i=()=>{const n=s.dataset.catGoals,r=s.closest(".cat-manage-card");if(!r)return;const o=Tt((u.getCategories().find(p=>p.id===n)||{}).goals||""),d=Dt(Tt(s.value))!==Dt(o),c=r.querySelector('[data-action="save-cat-goals"]');c&&(c.textContent=d?"Save goals":"Saved");const g=r.querySelector('[data-action="reset-cat-goals"]');g&&(g.hidden=!d);const v=r.querySelector(".cat-goal-hint");v&&(v.textContent=d?"Unsaved changes — press Save to keep them offline and in backups.":"Saved on this device and included in every backup.")};s.addEventListener("input",()=>{ht.set(s.dataset.catGoals,s.value),i()}),s.addEventListener("change",i)});const a=document.getElementById("backup-file");a&&a.addEventListener("change",()=>{const s=a.files[0];if(!s)return;const i=new FileReader;i.onload=()=>{ka(String(i.result||""),s.name),a.value=""},i.onerror=()=>{y("Couldn't read that file."),a.value=""},i.readAsText(s)})}function y(t){const e=document.getElementById("toast");e&&(e.textContent=t,e.classList.add("show"),setTimeout(()=>e.classList.remove("show"),1800))}function Sa(){const t=u.getTheme();document.documentElement.dataset.theme=t;const e=document.querySelector('meta[name="theme-color"]');e&&(e.content=t==="light"?"#f3f1ea":"#0e1116")}function m(t){return String(t||"").split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;").split('"').join("&quot;")}function I(){return u.isLocked(b)?(y("This report is locked. Unlock it in Settings."),!0):!1}function xe(t){return{mode:(t==null?void 0:t.mode)||"forever",until:(t==null?void 0:t.until)||"",weekdays:Array.isArray(t==null?void 0:t.weekdays)?t.weekdays.map(Number):[],monthDays:Array.isArray(t==null?void 0:t.monthDays)?t.monthDays.map(Number):[],yearDays:Array.isArray(t==null?void 0:t.yearDays)?[...t.yearDays]:[],customDates:Array.isArray(t==null?void 0:t.customDates)?[...t.customDates]:[],exceptDates:Array.isArray(t==null?void 0:t.exceptDates)?[...t.exceptDates]:Array.isArray(t==null?void 0:t.exceptions)?[...t.exceptions]:[]}}function qi(t){const e=u.findHabit(t);e&&(x="pin",k={kind:"habit",id:t,title:e.name,pin:e.pin?xe(e.pin):{mode:"forever",until:"",weekdays:[],monthDays:[],yearDays:[],customDates:[],exceptDates:[]},_exceptCal:O(b),_customCal:O(b),_yearMonth:"01"})}function Wi(t){const e=u.findTask(b,t);if(!e)return;const a=e.sourcePinId?u.findPinnedTask(e.sourcePinId):null;x="pin",k={kind:"task",id:t,title:e.title,pin:a!=null&&a.pin?xe(a.pin):{mode:"forever",until:"",weekdays:[],monthDays:[],yearDays:[],customDates:[],exceptDates:[]},_exceptCal:O(b),_customCal:O(b),_yearMonth:"01"}}function Ui(t){const e=u.findPinnedTask(t);e&&(x="pin",k={kind:"template",id:t,title:e.title,pin:e.pin?xe(e.pin):{mode:"forever",until:"",weekdays:[],monthDays:[],yearDays:[],customDates:[],exceptDates:[]},_exceptCal:O(b),_customCal:O(b),_yearMonth:"01"})}function zi(t){var c;const e=t.querySelector('input[name="mode"]').value,a=((c=t.querySelector('input[name="until"]'))==null?void 0:c.value)||"",s=[...t.querySelectorAll(".weekday.on")].map(g=>Number(g.dataset.day)),i=[...t.querySelectorAll(".monthday.on")].map(g=>Number(g.dataset.day)),n=k&&k.pin||{},r=Array.isArray(n.yearDays)?n.yearDays:[],o=Array.isArray(n.customDates)?n.customDates:[],d=Array.isArray(n.exceptDates)?n.exceptDates:[];return e==="until"&&!a?(y("Pick an until date"),null):e==="weekly"&&!s.length?(y("Pick at least one weekday"),null):e==="monthly"&&!i.length?(y("Pick at least one day of month"),null):e==="yearly"&&!r.length?(y("Add at least one yearly date"),null):e==="custom"&&!o.length?(y("Pick at least one custom date"),null):{mode:e,until:a,weekdays:s,monthDays:i,yearDays:r,customDates:o,exceptDates:d}}function yt(t,e,a){const s=e instanceof Blob?e:new Blob([e],{type:a||"text/plain;charset=utf-8"}),i=URL.createObjectURL(s),n=document.createElement("a");n.href=i,n.download=t,document.body.appendChild(n),n.click(),setTimeout(()=>{document.body.removeChild(n),URL.revokeObjectURL(i)},500)}function kt(t){const e=String(t??"");return/[",\n]/.test(e)?`"${e.replace(/"/g,'""')}"`:e}function Ae(t,e){const[a,s]=u.resolveRange(t,e||b);return{range:t,start:a,end:s,rows:u.exportRows(a,s)}}function Ye(t,e){const a=t||k&&k.range||"day",{start:s,end:i,rows:n}=Ae(a,e),r=[];r.push(["Daily Report export",`${s} to ${i}`].map(kt).join(",")),r.push(["Date","Type","Name","Category","Tags","Points","Rating","Earned","ConsciousPts","Status","Note/Description"].map(kt).join(",")),n.forEach(o=>{o.habits.forEach(d=>{r.push([o.date,"Habit",d.name,d.category,(d.tags||[]).join("|"),d.points,d.rating,d.earned,d.consciousPoints,d.status||(d.rating>0?"done":o.locked?"missed":"pending"),d.description||""].map(kt).join(","))}),o.tasks.forEach(d=>{r.push([o.date,"Task",d.hasImage?`${d.title} [photo]`:d.title,d.category,(d.tags||[]).join("|"),d.points,d.rating||"",d.earned,"",d.status||(d.done?"done":o.locked?"missed":"pending"),d.description||""].map(kt).join(","))}),r.push([o.date,"Summary",`Earned ${o.earned}/${o.max} (${o.percent}%)`,"","","","","","",o.locked?"locked":"open",o.note||""].map(kt).join(","))}),yt(`daily-report-${a}-${s}-to-${i}.csv`,"\uFEFF"+r.join(`
`),"text/csv;charset=utf-8"),y("Excel (CSV) exported")}function Ve(t,e){const a=t||k&&k.range||"day",{start:s,end:i,rows:n}=Ae(a,e),r={app:"Daily Report",exportedAt:new Date().toISOString(),range:a,start:s,end:i,days:n};yt(`daily-report-${a}-${s}-to-${i}.json`,JSON.stringify(r,null,2),"application/json"),y("JSON exported")}function Je(t,e){const a=t||k&&k.range||"day",{start:s,end:i,rows:n}=Ae(a,e),r=n.map(d=>`
        <section style="margin-bottom:18px;border:1px solid #ddd;border-radius:12px;padding:12px">
          <h2 style="margin:0 0 4px;font-size:16px">${m(d.date)} — ${d.earned}/${d.max} pts (${d.percent}%)</h2>
          <p style="margin:0 0 8px;font-size:12px;color:#555">Habits ${d.habitScore} + Conscious ${d.consciousScore} + Tasks ${d.taskScore} · ${d.locked?"Locked":"Open"}${d.note?` · Note: ${m(d.note)}`:""}</p>
          <table style="width:100%;border-collapse:collapse;font-size:12px">
            <thead><tr><th align="left">Type</th><th align="left">Name</th><th align="left">Category</th><th>Points</th><th>Rating</th><th>Earned</th><th>Status</th></tr></thead>
            <tbody>
              ${d.habits.map(c=>`<tr><td>Habit</td><td>${m(c.name)}${c.description?` (${m(c.description)})`:""}</td><td>${m(c.category)}</td><td align="center">${c.points}${c.consciousPoints?`+${c.consciousPoints}🧠`:""}</td><td align="center">${c.rating||"-"}/5</td><td align="center">${c.earned}</td><td align="center">${c.status||(c.rating>0?"done":d.locked?"missed":"pending")}</td></tr>`).join("")}
              ${d.tasks.map(c=>`<tr><td>Task</td><td>${m(c.title)}${c.hasImage?" 📷":""}${c.description?` (${m(c.description)})`:""}</td><td>${m(c.category)}</td><td align="center">${c.points}</td><td align="center">${c.rating?`${c.rating}/5`:"-"}</td><td align="center">${c.earned}</td><td align="center">${c.status||(c.done?"done":d.locked?"missed":"pending")}</td></tr>`).join("")}
            </tbody>
          </table>
        </section>
      `).join(""),o=window.open("","_blank");if(!o){y("Popup blocked — allow popups to export PDF");return}o.document.write(`<!DOCTYPE html><html><head><title>Daily Report ${s} to ${i}</title></head><body style="font-family:sans-serif;padding:24px"><h1>Daily Report — ${s} to ${i}</h1>${r}<script>window.onload=function(){window.print()}<\/script></body></html>`),o.document.close(),y("PDF print view opened")}document.addEventListener("click",t=>{const e=t.target.closest("[data-screen]");if(e){N=e.dataset.screen,h();return}const a=t.target.closest("[data-action]");if(!a)return;const s=a.dataset.action;if(s==="close-modal"){if(x==="image"){x=null,k=null,h();return}(t.target.classList.contains("modal-backdrop")||a.classList.contains("ghost-btn"))&&(x=null,k=null,h());return}if(s==="note-bullets"){Be("bullets");return}if(s==="note-numbered"){Be("numbered");return}if(s==="values-bullets"){Fe("bullets");return}if(s==="values-numbered"){Fe("numbered");return}if(s==="pick-task-image"){const i=document.getElementById("task-image-input");i?i.click():y("Photo picking needs a browser file picker");return}if(s==="remove-task-image"){k&&(k._image="",h(),y("Photo removed — save to apply"));return}if(s==="view-task-image"){const i=u.findTask(b,a.dataset.id),n=i&&i.image?i.image:k&&(k._image||k.image)||"";if(!n){y("No photo on this task");return}x="image",k={image:n,title:i&&i.title||"Task photo"},h();return}if(s==="prev-day"&&Ie(-1),s==="next-day"&&Ie(1),s==="reload-app"){window.location.reload();return}if(s==="set-theme"){const i=a.dataset.theme==="light"?"light":"dark";u.setTheme(i),Sa(),y(i==="light"?"Light mode on":"Dark mode on")}if(s==="install-app"){Pi();return}if(s==="check-updates"){Ei();return}if(s==="apply-update"){$a();return}if(s==="backup-now"){Ai();return}if(s==="trigger-import"){const i=document.getElementById("backup-file");i&&i.click();return}if(s==="choose-folder"){wi();return}if(s==="grant-folder"){xi();return}if(s==="forget-folder"){Si();return}if(s==="restore-backup"){Di(a.dataset.name);return}if(s==="goto-settings"&&(N="settings"),s==="open-add-habit"&&(x="habit",k=null),s==="open-add-task"){if(I())return;x="task",k={category:"mentally"}}if(s==="open-add"){if(I())return;x="choose",k={category:"mentally"}}if(s==="toggle-edit"&&(J=!J),s==="toggle-settings-edit"){ct=!ct,h();return}if(s==="toggle-setting-habit"){const i=a.dataset.id;Rt.has(i)?Rt.delete(i):Rt.add(i),h();return}if(s==="toggle-settings-section"){const i=a.dataset.id;wt.has(i)?wt.delete(i):wt.add(i),i==="tutorials"&&!wt.has("tutorials")&&(jt=null),h();return}if(s==="open-tutorial"){jt=jt===a.dataset.id?null:a.dataset.id,h();return}if(s==="move-pinned-habit"){const i=u.getPinnedHabits(),n=i.findIndex(o=>o.id===a.dataset.id),r=n+(Number(a.dataset.dir)||0);if(n>=0&&r>=0&&r<i.length){const o=i[n];i[n]=i[r],i[r]=o,u.setPinnedHabitOrder(i.map(d=>d.id))}h();return}if(s==="move-pinned-task"){const i=u.getPinnedTasks(),n=i.findIndex(o=>o.id===a.dataset.id),r=n+(Number(a.dataset.dir)||0);if(n>=0&&r>=0&&r<i.length){const o=i[n];i[n]=i[r],i[r]=o,u.setPinnedTaskOrder(i.map(d=>d.id))}h();return}if(s==="open-habit-activity-date"){b=a.dataset.date,N="today",h();return}if(s==="open-edit-habit"){const i=u.findHabit(a.dataset.id);if(!i)return;x="edit-habit",k={id:i.id,name:i.name,description:i.description||"",points:i.points,category:i.category,tags:i.tags||[],consciousPoints:Number(i.consciousPoints)||0}}if(s==="open-edit-task"){if(I())return;const i=u.findTask(b,a.dataset.id);if(!i)return;x="edit-task",k={id:i.id,title:i.title,points:i.points,description:i.description,category:i.category,tags:i.tags||[],rating:Number(i.rating)||0,image:i.image||"",_image:void 0}}if(s==="open-edit-pinned-task"){const i=u.findPinnedTask(a.dataset.id);if(!i)return;x="edit-pinned-task",k={id:i.id,title:i.title,points:i.points,description:i.description||"",category:i.category,tags:i.tags||[],rating:0,image:i.image||"",_image:void 0}}if(s==="toggle-badges"&&(Wt=!Wt),s==="open-goal"&&(x="goal",k={kind:"habit-streak",targetDays:7,tier:"bronze"}),s==="open-edit-goal"){const i=u.getGoals().find(n=>n.id===a.dataset.id);if(!i)return;x="edit-goal",k={...i}}if(s==="remove-goal"&&(u.removeGoal(a.dataset.id),y("Goal removed")),s==="remove-badge"&&(u.removeBadge(a.dataset.id),y("Badge removed")),s==="rate-habit"){if(I())return;const n=u.habitRating(b,a.dataset.id)===Number(a.dataset.rating)?0:Number(a.dataset.rating);u.setHabitRating(b,a.dataset.id,n)}if(s==="rate-task"){if(I())return;const i=u.findTask(b,a.dataset.id);if(!i)return;const r=(Number(i.rating)||0)===Number(a.dataset.rating)?0:Number(a.dataset.rating);u.setTaskRating(b,a.dataset.id,r)}if(s==="open-export"&&(x="export",k={range:k&&k.range||"day"}),s==="set-export-range"){x="export",k={range:a.dataset.range||"day"},h();return}if(s==="do-export"){const i=a.dataset.format,n=k&&k.range||"day";i==="csv"&&Ye(n,b),i==="json"&&Ve(n,b),i==="pdf"&&Je(n,b),x=null,k=null}if(s==="set-histexp-range"){G=["day","week","month","year"].includes(a.dataset.range)?a.dataset.range:"day",h();return}if(s==="histexp-do"){const i=a.dataset.format;let n=b;if(G==="day"||G==="week"){const r=document.getElementById("histexp-date");r&&/^\d{4}-\d{2}-\d{2}$/.test(r.value)&&(n=r.value)}else if(G==="month"){const r=document.getElementById("histexp-month");r&&/^\d{4}-\d{2}$/.test(r.value)&&(n=`${r.value}-15`)}else if(G==="year"){const r=document.getElementById("histexp-year"),o=Number(r&&r.value);Number.isInteger(o)&&o>=2e3&&o<=2100&&(n=`${String(o)}-06-15`)}i==="csv"&&Ye(G,n),i==="json"&&Ve(G,n),i==="pdf"&&Je(G,n);return}if(s==="history-cal-nav"){const i=zt||O(b);zt=St(i,Number(a.dataset.dir)||0),h();return}if(s==="locked-cal-nav"){const i=Yt||O(b);Yt=St(i,Number(a.dataset.dir)||0),h();return}if(s==="toggle-locked-day"){const i=a.dataset.date,n=R.indexOf(i);n>=0?R.splice(n,1):R.push(i),h();return}if(s==="lock-selected"){const i=[...R].sort();if(!i.length)return;const n=u.lockDays(i);R=[],y(n===1?`Locked ${n} day`:`Locked ${n} days`),h();return}if(s==="unlock-selected"){const i=[...R].sort();if(!i.length)return;const n=u.unlockDays(i);R=[],y(n===1?`Unlocked ${n} day`:`Unlocked ${n} days`),h();return}if(s==="submit-day"&&(u.submitDay(b),y("Report submitted and locked")),s==="unlock-day"&&(u.unlockDay(a.dataset.date),y("Report unlocked")),s==="toggle-habit"){if(I())return;u.toggleHabit(b,a.dataset.id),h()}if(s==="toggle-task"){if(I())return;u.toggleTask(b,a.dataset.id),h()}if(s==="remove-task"){if(!J||I())return;u.removeTask(b,a.dataset.id),h()}if(s==="remove-habit"&&(u.removeHabit(a.dataset.id),h()),s==="restore-habit"){const i=u.restoreHabit(a.dataset.id);y(i.ok?"Habit restored":i.reason||"Could not restore that habit"),h()}if(s==="toggle-archive"){lt=!lt,h();return}if(s==="archive-habit"){u.removeHabit(a.dataset.id),lt=!0,y("Habit archived — restore it from the Archive"),h();return}if(s==="archive-task"){if(I())return;const i=u.archiveTask(b,a.dataset.id);if(!i.ok){y(i.reason||"Could not archive that task");return}lt=!0,y("Task archived — restore it from the Archive"),h();return}if(s==="restore-task"){const i=u.isLocked(b)?u.todayKey():b,n=u.restoreTask(a.dataset.id,i);n.ok?y(n.from&&n.from!==i?`Task restored to ${i} — forwarded from ${n.from}`:`Task restored to ${i}`):y(n.reason||"Could not restore that task"),i!==b&&(b=i),h();return}if(s==="delete-archived-task"){if(!J||!window.confirm("Delete this archived task permanently? This cannot be undone."))return;const i=u.deleteArchivedTask(a.dataset.id);y(i.ok?"Task deleted permanently":i.reason||"Could not delete"),h();return}if(s==="delete-archived-habit"){if(!window.confirm("Delete this archived habit permanently? This cannot be undone."))return;const i=u.deleteArchivedHabit(a.dataset.id);y(i.ok?"Habit deleted permanently":i.reason||"Could not delete"),h();return}if(s==="open-pin-habit"&&qi(a.dataset.id),s==="open-replace-habit"){if(I())return;const i=u.findHabit(a.dataset.id);if(!i)return;const n=u.habitReplaceDays(b,i.id);x="replace",k={id:i.id,title:i.name,from:b,info:n};return}if(s==="pick-replace-day"){const i=document.querySelector('.sheet input[name="targetDate"]');i&&(i.value=a.dataset.date),document.querySelectorAll(".replace-day-chip").forEach(n=>{n.classList.toggle("on",n.dataset.date===a.dataset.date)});return}if(s==="undo-replace-habit"){if(I())return;const i=u.undoReplaceHabit(a.dataset.id,a.dataset.from,a.dataset.to);y(i.ok?"Habit is due on this day again":i.reason||"Could not undo that"),h();return}if(s==="open-forward-task"){if(I())return;const i=u.findTask(b,a.dataset.id);if(!i)return;x="forward",k={kind:"task",id:i.id,title:i.title,from:b}}if(s==="open-pin-task"){if(I())return;Wi(a.dataset.id)}if(s==="open-pin-template"&&Ui(a.dataset.id),s==="unpin-template"&&(u.unpinTaskTemplate(a.dataset.id),y("Task unpinned — removed from today and all upcoming days")),s==="pick-date"&&(b=a.dataset.date,N="today"),s==="set-chart-range"){V=["week","month","year"].includes(a.dataset.range)?a.dataset.range:"week",tt=0,h();return}if(s==="chart-nav"){tt+=Number(a.dataset.dir)||0,tt>0&&(tt=0),h();return}if(s==="add-category"){const i=document.getElementById("new-category"),n=u.addCategory(i?i.value:"");y(n.ok?"Category added":n.reason||"Couldn't add category"),h();return}if(s==="rename-category"){const i=u.getCustomCategories().find(o=>o.id===a.dataset.id),n=window.prompt("Rename category",i?i.label:"");if(n==null)return;const r=u.renameCategory(a.dataset.id,n);y(r.ok?"Category renamed":r.reason||"Couldn't rename"),h();return}if(s==="delete-category"){if(!window.confirm("Delete this category? Its habits and tasks move to Mentally."))return;const i=u.deleteCategory(a.dataset.id);i.ok&&dt.delete(a.dataset.id),y(i.ok?"Category deleted":i.reason||"Couldn't delete"),h();return}if(s==="rename-tag"){const i=window.prompt("Rename tag everywhere",a.dataset.tag||"");if(i==null)return;const n=u.renameTag(a.dataset.tag,i);y(n.ok?n.merged?"Tags merged":"Tag renamed everywhere":n.reason||"Couldn't rename"),h();return}if(s==="delete-tag"){if(!window.confirm(`Delete tag "#${a.dataset.tag}" from all habits and tasks?`))return;u.deleteTag(a.dataset.tag),y("Tag deleted everywhere"),h();return}if(s==="add-tag"){const i=document.getElementById("tag-habit-pick"),n=document.getElementById("new-tag"),r=u.addTagToHabit(i?i.value:"",n?n.value:"");y(r.ok?"Tag added to habit":r.reason||"Couldn't add tag"),h();return}if(s==="set-points"){const i=document.querySelector('input[name="points"]');i&&(i.value=a.dataset.points),document.querySelectorAll(".chip-row .chip[data-points]").forEach(n=>n.classList.remove("on")),a.classList.add("on");return}if(s==="set-category"){const i=a.closest("form")||a.closest(".sheet"),n=i.querySelector('input[name="category"]');n&&(n.value=a.dataset.category),i.querySelectorAll(".cat-row .chip").forEach(r=>r.classList.remove("on")),a.classList.add("on");return}if(s==="set-rating"){const i=a.closest(".sheet")||a.closest("form")||document,n=i.querySelector('input[name="rating"]');n&&(n.value=a.dataset.rating),i.querySelectorAll(".rating-row .chip").forEach(r=>r.classList.remove("on")),a.classList.add("on");return}if(s==="set-conscious"){const i=a.closest(".sheet")||a.closest("form")||document,n=i.querySelector('input[name="consciousPoints"]');n&&(n.value=a.dataset.conscious),i.querySelectorAll(".conscious-row .chip").forEach(r=>r.classList.remove("on")),a.classList.add("on");return}if(s==="set-goal-kind"){const i=a.closest(".sheet")||document,n=i.querySelector('input[name="kind"]');n&&(n.value=a.dataset.kind),i.querySelectorAll(".goal-kind-row .chip").forEach(c=>c.classList.remove("on")),a.classList.add("on");const r=a.dataset.kind,o=i.querySelector(".goal-target-habit"),d=i.querySelector(".goal-target-task");o&&(o.style.display=r==="habit-streak"?"":"none"),d&&(d.style.display=r==="task-streak"?"":"none"),k&&(k.kind=r);return}if(s==="set-goal-tier"){const i=a.closest(".sheet")||document,n=i.querySelector('input[name="tier"]');n&&(n.value=a.dataset.tier),i.querySelectorAll(".goal-tier-row .chip").forEach(r=>r.classList.remove("on")),a.classList.add("on");return}if(s==="pin-mode"){const i=a.closest("form"),n=a.dataset.mode;i.querySelector('input[name="mode"]').value=n,i.querySelectorAll(".pin-modes .chip").forEach(o=>o.classList.remove("on")),a.classList.add("on");const r=(o,d)=>{const c=i.querySelector(o);c&&(c.style.display=d?"":"none")};r(".pin-until",n==="until"),r(".pin-weekdays",n==="weekly"),r(".pin-monthdays",n==="monthly"),r(".pin-yeardays",n==="yearly"),k&&k.pin&&(k.pin.mode=n);return}if(s==="toggle-weekday"){a.classList.toggle("on");return}if(s==="toggle-monthday"){a.classList.toggle("on");return}if(s==="pin-cal-nav"){if(!k)return;const i=a.dataset.target,n=Number(a.dataset.dir)||0;i==="except"?k._exceptCal=St(k._exceptCal||O(b),n):k._customCal=St(k._customCal||O(b),n),h();return}if(s==="toggle-pin-date"){if(!k||!k.pin)return;const i=a.dataset.target,n=a.dataset.date,r=i==="custom"?"customDates":"exceptDates",o=Array.isArray(k.pin[r])?[...k.pin[r]]:[],d=o.indexOf(n);d>=0?o.splice(d,1):(o.push(n),o.length>365&&o.shift()),k.pin[r]=o.sort(),h();return}if(s==="add-year-day"){if(!k||!k.pin)return;const i=a.closest("form")||document,n=i.querySelector("#year-month-select"),r=i.querySelector("#year-day-select");n&&(k._yearMonth=n.value);const o=`${n?n.value:"01"}-${r?r.value:"01"}`,d=Array.isArray(k.pin.yearDays)?[...k.pin.yearDays]:[];d.includes(o)||d.push(o),k.pin.yearDays=d.sort(),h();return}if(s==="remove-year-day"){if(!k||!k.pin)return;const i=a.dataset.date;k.pin.yearDays=(k.pin.yearDays||[]).filter(n=>n!==i),h();return}if(s==="clear-pin"){const i=a.closest("form"),n=i.dataset.kind,r=i.dataset.id;let o=!1;if(n==="habit"&&u.unpinHabit(r),n==="task"){const d=u.findTask(b,r);d!=null&&d.sourcePinId&&(u.unpinTaskTemplate(d.sourcePinId),o=!0)}n==="template"&&(u.unpinTaskTemplate(r),o=!0),x=null,k=null,y(o?"Task unpinned — removed from today and all upcoming days":"Unpinned"),h();return}if(s==="lock-profile"){u.setProfileLocked(!0),y("Profile locked — read only"),h();return}if(s==="unlock-profile"){u.setProfileLocked(!1),y("Profile unlocked"),h();return}if(s==="add-whoami"){const i=document.getElementById("new-whoami"),n=u.addWhoAmI(i?i.value:"");y(n.ok?"Added":n.reason||"Couldn't add"),h();return}if(s==="move-whoami"){u.moveWhoAmI(a.dataset.id,Number(a.dataset.dir)||0),h();return}if(s==="remove-whoami"){u.removeWhoAmI(a.dataset.id),y("Removed"),h();return}if(s==="add-lifearea"){const i=document.getElementById("new-lifearea"),n=u.addLifeArea(i?i.value:"");n.ok?(pt=n.id,y("Life area added")):y(n.reason||"Couldn't add"),h();return}if(s==="toggle-lifearea"){const i=a.dataset.id;pt=pt===i?null:i,h();return}if(s==="move-lifearea"){u.moveLifeArea(a.dataset.id,Number(a.dataset.dir)||0),h();return}if(s==="toggle-cat"){const i=a.dataset.id;dt.has(i)?dt.delete(i):dt.add(i),h();const n=document.querySelector(`[data-action="toggle-cat"][data-id="${CSS.escape(i)}"]`);n&&n.focus({preventScroll:!0});return}if(s==="expand-cats"){u.getCategories().forEach(i=>dt.add(i.id)),h();return}if(s==="collapse-cats"){dt.clear(),h();return}if(s==="save-cat-goals"){const i=a.dataset.id,n=document.querySelector(`[data-cat-goals="${CSS.escape(i)}"]`),r=n?n.value:ht.get(i)||"",o=Tt(r);u.updateCategory(i,{goals:Dt(o)}),ht.delete(i),y(o.length?`Saved ${o.length} goal${o.length===1?"":"s"} for ${at(i)}`:`Cleared goals for ${at(i)}`),h();return}if(s==="reset-cat-goals"){const i=a.dataset.id;ht.delete(i),h();return}if(s==="remove-lifearea"){u.removeLifeArea(a.dataset.id),pt===a.dataset.id&&(pt=null),y("Life area removed"),h();return}if(s==="set-pgoal-term"){X=["short","medium","long"].includes(a.dataset.term)?a.dataset.term:"short",bt=u.profileGoalDurations()[X][0],h();return}if(s==="set-pgoal-filter"){Ot=["all","short","medium","long"].includes(a.dataset.filter)?a.dataset.filter:"all",h();return}if(s==="add-pgoal"){const i=document.getElementById("new-pgoal"),n=document.getElementById("new-pgoal-duration"),r=u.addProfileGoal(i?i.value:"",X,n?n.value:bt);y(r.ok?`Goal added ${Bt(X)}`:r.reason||"Couldn't add"),h();return}if(s==="remove-pgoal"){u.removeProfileGoal(a.dataset.id),y("Goal removed"),h();return}if(s==="add-idea"){const i=document.getElementById("new-idea"),n=String(i?i.value:"").trim().slice(0,200);if(!n){y("Write an idea first");return}if(u.isProfileLocked()){y("Profile is locked");return}const r=String(u.getProfile().ideas||"").split(`
`).map(o=>o.trim()).filter(Boolean);r.push(`• ${n}`),u.setProfileField("ideas",r.join(`
`)),y("Idea added"),h();return}if(s==="remove-idea"){if(u.isProfileLocked())return;const i=Number(a.dataset.index),n=String(u.getProfile().ideas||"").split(`
`).filter(r=>r.trim());if(!Number.isInteger(i)||i<0||i>=n.length)return;n.splice(i,1),u.setProfileField("ideas",n.join(`
`)),y("Idea removed"),h();return}if(s==="add-quote"){const i=document.getElementById("new-quote"),n=document.getElementById("new-quote-author"),r=u.addQuote(i?i.value:"",n?n.value:"");y(r.ok?"Quote added":r.reason||"Couldn't add"),h();return}if(s==="toggle-quote-fav"){u.toggleQuoteFav(a.dataset.id),h();return}if(s==="remove-quote"){u.removeQuote(a.dataset.id),y("Quote removed"),h();return}if(s==="toggle-quotes"){At=!At,h();return}h()});document.addEventListener("submit",t=>{const e=t.target.closest("[data-form]");if(!e)return;t.preventDefault();const a=e.dataset.form;if(a==="habit"||a==="task"||a==="edit-habit"||a==="edit-task"||a==="edit-pinned-task"){const s=new FormData(e),i=String(s.get("title")||""),n=Number(s.get("points")||0),r=String(s.get("category")||"mentally"),o=String(s.get("description")||""),d=String(s.get("tags")||""),c=Math.max(0,Math.min(5,Number(s.get("rating")||0))),g=Math.max(0,Math.min(100,Number(s.get("consciousPoints")||0)));if(!i.trim())return;const v=k&&k._image!==void 0?_(k._image):_(k&&k.image);if(a==="habit")u.addHabit(i,n,{description:o,category:r,consciousPoints:g,tags:d,startFrom:b}),y("Habit added");else if(a==="task"){if(I())return;u.addTask(b,i,n,{description:o,category:r,rating:c,tags:d,image:v}),y("Task added")}else if(a==="edit-habit")u.updateHabit(e.dataset.id,{name:i,description:o,points:n,category:r,consciousPoints:g,tags:d}),y("Habit updated");else if(a==="edit-pinned-task")u.updatePinnedTaskDetails(e.dataset.id,{title:i,description:o,points:n,category:r,tags:d,image:v}),y("Pinned task updated");else{if(I())return;u.updateTask(b,e.dataset.id,{title:i,points:n,description:o,category:r,rating:c,tags:d,image:v}),y("Task updated")}x=null,k=null,h();return}if(a==="pin"){const s=zi(e);if(!s)return;const i=e.dataset.kind,n=e.dataset.id;i==="habit"&&u.pinHabit(n,s),i==="task"&&u.pinTask(b,n,s),i==="template"&&u.updatePinnedTask(n,s),x=null,k=null,y("Pin saved"),h();return}if(a==="replace"){const s=new FormData(e),i=String(s.get("targetDate")||""),n=e.dataset.id,r=k&&k.from||b,o=u.replaceHabit(r,n,i);if(!o.ok){y(o.reason||"Could not replace that habit day");return}x=null,k=null,y(`Habit moved from ${o.from} to ${o.to}`),h();return}if(a==="goal"||a==="edit-goal"){const s=new FormData(e),i=String(s.get("title")||"").trim(),n=String(s.get("kind")||"habit-streak"),r=String(s.get("tier")||"bronze"),o=String(s.get("rewardTitle")||"").trim(),d=Math.max(1,Math.min(365,Number(s.get("targetDays")||7)));if(!i||!o){y("Goal title and reward title are required");return}let c="";if(n==="habit-streak"&&(c=String(s.get("habitTarget")||"")),n==="task-streak"&&(c=String(s.get("taskTarget")||"")),(n==="habit-streak"||n==="task-streak")&&!c){y(n==="habit-streak"?"Pick a habit":"Pin a task first, then pick it");return}a==="goal"?(u.addGoal({title:i,kind:n,targetId:c,targetDays:d,tier:r,rewardTitle:o}),y("Goal added")):(u.updateGoal(e.dataset.id,{title:i,kind:n,targetId:c,targetDays:d,tier:r,rewardTitle:o}),y("Goal updated"));const g=u.checkGoals(b);g.length&&y(`🏅 Reward earned: ${g[0].rewardTitle}!`),x=null,k=null,h()}});document.addEventListener("change",t=>{const e=t.target.closest(".sort-select");if(e){const a=e.dataset.sortKind;a==="habit"&&u.setHabitSort(e.value),a==="task"&&u.setTaskSort(e.value),h()}if(t.target&&t.target.id==="show-conscious"&&(u.setShowConscious(t.target.checked),y(t.target.checked?"Conscious points on":"Conscious points hidden"),h()),t.target&&t.target.id==="week-start"&&(u.setWeekStart(Number(t.target.value)),y("Week starts on "+t.target.selectedOptions[0].textContent),h()),t.target&&t.target.id==="new-pgoal-duration"){bt=t.target.value;return}if(t.target&&t.target.id==="year-month-select"&&k&&(k._yearMonth=t.target.value),t.target&&t.target.id==="task-image-input"){const a=t.target.files&&t.target.files[0];if(!a)return;if(!String(a.type||"").startsWith("image/")){y("Please pick an image file"),t.target.value="";return}y("Processing photo…"),Xa(a).then(s=>{if(t.target.value="",!s){y("Photo too large or unreadable — try a smaller one");return}k&&(k._image=s,h(),y("Photo attached — save to apply"))})}});if("serviceWorker"in navigator){window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js").catch(()=>{})});let t=!1;try{const e=Number(sessionStorage.getItem("dr-reload-at")||0);Date.now()-e<8e3&&(t=!0)}catch{}navigator.serviceWorker.addEventListener("controllerchange",()=>{if(!t){t=!0;try{sessionStorage.setItem("dr-reload-at",String(Date.now()))}catch{}window.location.reload()}})}function Yi(){const t=document.getElementById("boot-error");t&&(t.style.display="none")}Yi();Sa();h();ki().then(()=>{N==="settings"&&h()});setInterval(()=>{!document.hidden&&ke()&&h()},6e4);document.addEventListener("visibilitychange",()=>{!document.hidden&&ke()&&h()});
