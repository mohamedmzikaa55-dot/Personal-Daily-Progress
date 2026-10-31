(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function e(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=e(i);fetch(i.href,n)}})();const Ke="daily-report-v2",Lt=[{id:"mentally",label:"Mentally"},{id:"psychology",label:"Psychology"},{id:"physically",label:"Physically"},{id:"spiritually",label:"Spiritually"},{id:"socially",label:"Socially"}];Lt.map(t=>t.id);const ta=[{id:"h1",name:"Wake up early",points:10,icon:"sunrise",category:"physically",pin:{mode:"forever"}},{id:"h2",name:"Drink water",points:5,icon:"drop",category:"physically",pin:{mode:"forever"}},{id:"h3",name:"Exercise",points:15,icon:"bolt",category:"physically",pin:{mode:"forever"}},{id:"h4",name:"Read 20 minutes",points:10,icon:"book",category:"mentally",pin:{mode:"forever"}},{id:"h5",name:"No junk food",points:10,icon:"leaf",category:"physically",pin:{mode:"forever"}}],ea={lockTime:"21:00",autoLock:!0,showConscious:!0,habitSort:"default",taskSort:"default",theme:"dark",habitOrder:[],pinnedTaskOrder:[],weekStart:1};function de(t){const a=Number(t);return Number.isInteger(a)&&a>=0&&a<=6?a:1}const Et=[{id:"iron",label:"Iron",medal:"🥉",rank:1},{id:"bronze",label:"Bronze",medal:"🥉",rank:2},{id:"silver",label:"Silver",medal:"🥈",rank:3},{id:"gold",label:"Gold",medal:"🥇",rank:4}],aa=[{id:"habit-streak",label:"Habit streak"},{id:"task-streak",label:"Pinned task streak"},{id:"perfect-days",label:"Perfect days (100%)"},{id:"task-list",label:"List of tasks goal"}];function Pe(t){var a;return((a=Et.find(e=>e.id===t))==null?void 0:a.rank)||0}function qt(t){var a;return((a=Et.find(e=>e.id===t))==null?void 0:a.medal)||"🏅"}function ia(t){var a;return((a=Et.find(e=>e.id===t))==null?void 0:a.label)||t||"Badge"}function C(t){const a=Array.isArray(t)?t:String(t||"").split(","),e=[];return a.forEach(s=>{const i=String(s||"").trim().slice(0,20);i&&!e.some(n=>n.toLowerCase()===i.toLowerCase())&&e.push(i),e.length>=10}),e.slice(0,10)}function ie(t,a){const e=[...t];return a==="points"?e.sort((s,i)=>(Number(i.points)||0)-(Number(s.points)||0)):a==="category"?e.sort((s,i)=>nt(L(s.category)).localeCompare(nt(L(i.category)))):a==="tags"&&e.sort((s,i)=>(s.tags&&s.tags[0]||"~~~").localeCompare(i.tags&&i.tags[0]||"~~~")),e}const ft=[{value:1,label:"Mon"},{value:2,label:"Tue"},{value:3,label:"Wed"},{value:4,label:"Thu"},{value:5,label:"Fri"},{value:6,label:"Sat"},{value:0,label:"Sun"}];function B(t=new Date){const a=t.getFullYear(),e=String(t.getMonth()+1).padStart(2,"0"),s=String(t.getDate()).padStart(2,"0");return`${a}-${e}-${s}`}function ke(){return{habits:{},habitRatings:{},habitMissed:{},habitForwarded:{},tasks:[],note:"",locked:!1,lockOverride:null,submittedAt:null,lockedHabits:null,skippedPins:[]}}var F=[],tt={};function Pa(t){const a=tt[t.id];return a?{...t,color:a.color||t.color,goals:a.goals!==void 0?a.goals:t.goals}:t}function at(){return[...Lt.map(Pa),...F]}function L(t){return at().map(e=>e.id).includes(t)?t:"mentally"}function nt(t){var a;return((a=at().find(e=>e.id===t))==null?void 0:a.label)||"Mentally"}const Ot=7e5;function q(t){const a=String(t||"");return a.startsWith("data:image/")?a.length>Ot?"":a:""}function Le(t){const a=Math.max(0,Math.min(5,Number(t.rating)||0)),e=i=>/^\d{4}-\d{2}-\d{2}$/.test(String(i||""))?String(i):"",s=i=>Array.isArray(i)?i.filter(n=>/^\d{4}-\d{2}-\d{2}$/.test(String(n))).map(String).slice(0,50):[];return{...t,description:t.description||"",category:L(t.category),tags:C(t.tags),rating:a,done:!!t.done,missed:!!t.missed,forwardedFrom:e(t.forwardedFrom),forwardedHabitId:String(t.forwardedHabitId||""),forwardedTo:s(t.forwardedTo),image:q(t.image)}}function V(t){const a=Number(t);return!Number.isFinite(a)||a<0?0:Math.min(100,Math.round(a))}function Mt(t){const a=String(t??"").slice(0,10);return/^\d{4}-\d{2}-\d{2}$/.test(a)?a:""}function Nt(t,a){const e=Mt(t&&t.startFrom);return e?String(a)>=e:!0}function $e(t,a){return{id:String(t.id||""),name:String(t.name||"").slice(0,80),description:String(t.description||"").slice(0,2e3),points:Number(t.points)||0,icon:t.icon||"star",category:L(t.category),consciousPoints:V(t.consciousPoints),tags:C(t.tags),pin:G(t.pin),startFrom:Mt(t.startFrom),archivedAt:a||t.archivedAt||null}}function sa(t,a,e){const s=/^\d{4}-\d{2}-\d{2}$/.test(String(e||""))?String(e):"",i=/^\d{4}-\d{2}-\d{2}$/.test(String(t&&t.forwardedFrom||""))?String(t.forwardedFrom):s;return{id:String(t.id||""),title:String(t.title||"Task").slice(0,120),points:Number(t.points)||0,description:String(t.description||"").slice(0,500),category:L(t.category),tags:C(t.tags),image:q(t.image),fromDate:s,originDate:i,archivedAt:a||t.archivedAt||null,sourcePinId:String(t.sourcePinId||"")}}function La(t){return Array.isArray(t)?t.filter(a=>a&&typeof a=="object"&&a.id).map(a=>sa(a,a.archivedAt||null,a.fromDate)).filter(a=>a.id.length<=80).slice(0,500):[]}function G(t){if(!t||!t.mode)return null;const a=(i,n,r)=>Array.isArray(i)?i.map(Number).filter(o=>Number.isFinite(o)&&o>=n&&o<=r):[],e=i=>Array.isArray(i)?i.filter(n=>/^\d{4}-\d{2}-\d{2}$/.test(String(n))).map(String).slice(0,365):[],s=i=>Array.isArray(i)?i.filter(n=>/^\d{2}-\d{2}$/.test(String(n))).map(String).slice(0,366):[];return{mode:["forever","until","weekly","monthly","yearly","custom"].includes(t.mode)?t.mode:"forever",until:t.until||"",weekdays:a(t.weekdays,0,6),monthDays:a(t.monthDays,1,31),yearDays:s(t.yearDays),customDates:e(t.customDates),exceptDates:e(t.exceptDates||t.exceptions)}}function Ea(t,a){const e=`${t} ${a}`.toLowerCase();return e.includes("read")||e.includes("study")||e.includes("learn")?"mentally":e.includes("meditat")||e.includes("pray")||e.includes("journal")?"spiritually":e.includes("mood")||e.includes("calm")||e.includes("therapy")?"psychology":e.includes("friend")||e.includes("family")||e.includes("social")||e.includes("call")||e.includes("visit")?"socially":"physically"}function Ma(t){if(!Array.isArray(t))return[];const a=[];return t.forEach(e=>{if(!e||typeof e!="object")return;const s=String(e.title||e.text||"").trim().slice(0,120);s&&a.push({id:String(e.id||X("gt")),title:s,done:!!e.done,doneAt:e.doneAt||null})}),a.slice(0,100)}function le(t){const a=aa.some(i=>i.id===t.kind)?t.kind:"habit-streak",e=a==="task-list",s=e?Ma(t.tasks):[];return{id:String(t.id||`g${Date.now()}`),title:String(t.title||"").trim().slice(0,60)||"My goal",kind:a,targetId:String(t.targetId||""),targetDays:Math.max(1,Math.min(365,Number(t.targetDays)||7)),tier:Et.some(i=>i.id===t.tier)?t.tier:"bronze",rewardTitle:String(t.rewardTitle||"").trim().slice(0,60)||"Reward",createdAt:t.createdAt||new Date().toISOString(),tasks:s,locked:e?!!t.locked:!1,terminated:e?!!t.terminated:!1}}function Na(t){if(!Array.isArray(t))return[];const a=new Set(Lt.map(s=>s.id)),e=[];return t.forEach(s=>{if(!s||typeof s!="object")return;const i=String(s.id||"").trim().slice(0,40),n=String(s.label||"").trim().slice(0,30);!i||!n||a.has(i.toLowerCase())||(a.add(i.toLowerCase()),e.push({id:i,label:n,color:String(s.color||"").slice(0,20),goals:String(s.goals||"").slice(0,1e3)}))}),e.slice(0,20)}function Ha(t){const a=t&&typeof t=="object"?t:{},e={};return Lt.forEach(s=>{const i=a[s.id];if(!i||typeof i!="object")return;const n=String(i.color||"").trim().slice(0,20),r=i.goals===void 0?void 0:String(i.goals||"").slice(0,1e3);!n&&r===void 0||(e[s.id]={},n&&(e[s.id].color=n),r!==void 0&&(e[s.id].goals=r))}),e}const ce={name:80,wantToBe:1e3,vision:1e3,values:1e3,ideas:4e3},ue=["short","medium","long"],St={short:["1 Week","2 Weeks","3 Weeks","4 Weeks"],medium:["1 Month","2 Months","3 Months"],long:["1 Year","2 Years","3 Years","5 Years","10+ Years"]};function W(t){return`${t||"id"}${Date.now().toString(36)}${Math.floor(Math.random()*9999)}`}function Ia(t){return Array.isArray(t)?t.map(a=>{if(typeof a=="string")return{id:W("w"),text:a.trim().slice(0,120)};if(!a||typeof a!="object")return null;const e=String(a.text||a.label||a.name||"").trim().slice(0,120);return e?{id:String(a.id||W("w")),text:e}:null}).filter(Boolean).slice(0,50):[]}function Ra(t){return typeof t=="string"?t.split(`
`).map(a=>a.trim().replace(/^[-•*]\s+/,"")).filter(Boolean).slice(0,20).map(a=>({id:W("a"),title:a.slice(0,60),description:""})):Array.isArray(t)?t.map(a=>{if(typeof a=="string"){const s=a.trim().slice(0,60);return s?{id:W("a"),title:s,description:""}:null}if(!a||typeof a!="object")return null;const e=String(a.title||a.name||"").trim().slice(0,60);return e?{id:String(a.id||W("a")),title:e,description:String(a.description||"").slice(0,1e3)}:null}).filter(Boolean).slice(0,20):[]}function Oa(t){return Array.isArray(t)?t.map(a=>{if(typeof a=="string"){const r=a.trim().slice(0,200);return r?{id:W("g"),text:r,term:"short",duration:"1 Week",createdAt:new Date().toISOString()}:null}if(!a||typeof a!="object")return null;const e=String(a.text||a.title||"").trim().slice(0,200);if(!e)return null;const s=ue.includes(a.term)?a.term:"short",i=St[s],n=i.includes(a.duration)?a.duration:i[0];return{id:String(a.id||W("g")),text:e,term:s,duration:n,createdAt:a.createdAt||new Date().toISOString()}}).filter(Boolean).slice(0,100):[]}function ja(t){return Array.isArray(t)?t.map(a=>{if(typeof a=="string"){const s=a.trim().slice(0,500);return s?{id:W("q"),text:s,author:"",fav:!1,createdAt:new Date().toISOString()}:null}if(!a||typeof a!="object")return null;const e=String(a.text||a.quote||"").trim().slice(0,500);return e?{id:String(a.id||W("q")),text:e,author:String(a.author||"").trim().slice(0,80),fav:!!(a.fav||a.favorite),createdAt:a.createdAt||new Date().toISOString()}:null}).filter(Boolean).slice(0,200):[]}function Tt(t){const a=t&&typeof t=="object"?t:{},e={};Object.entries(ce).forEach(([i,n])=>{i==="wantToBe"&&!a.wantToBe&&a.about?e[i]=String(a.about||"").slice(0,n):e[i]=String(a[i]||"").slice(0,n)}),e.locked=!!a.locked,e.whoAmI=Ia(a.whoAmI||a.whoIAm||[]),e.lifeAreas=Ra(Array.isArray(a.lifeAreas)||typeof a.lifeAreas=="string"?a.lifeAreas:[]);let s=Oa(a.pGoals||a.goalsList||a.profileGoals||[]);return s.length||[["goalsShort","short","1 Week"],["goalsMid","medium","1 Month"],["goalsLong","long","1 Year"]].forEach(([n,r,o])=>{const d=String(a[n]||"");d.trim()&&d.split(`
`).map(l=>l.trim().replace(/^[-•*]\s+/,"")).filter(Boolean).forEach(l=>{s.length>=100||s.push({id:W("g"),text:l.slice(0,200),term:r,duration:o,createdAt:new Date().toISOString()})})}),e.pGoals=s,e.quotes=ja(a.quotes||a.favQuotes||[]),e}function Ba(t,a){const e=String(t&&t.installedAt||"");if(/^\d{4}-\d{2}-\d{2}/.test(e))return e;const s=Object.keys(a||{}).sort();return s.length?`${s[0]}T00:00:00.000`:new Date().toISOString()}function Fa(t,a){if(!t)return!1;if(ee(t,a)>0)return!0;const e=t.habitForwarded&&t.habitForwarded[a];return Array.isArray(e)&&e.length>0?!0:Array.isArray(t.tasks)&&t.tasks.some(s=>String(s&&s.forwardedHabitId||"")===String(a))}function Ga(t,a){return!t||!Array.isArray(t.lockedHabits)?!1:t.lockedHabits.some(e=>String(e&&e.id||"")===String(a))}function _a(t,a,e){const s=String(t||"");for(const i of a){const n=e[i];if(Fa(n,s)||Ga(n,s))return i}return""}function qa(t,a){const e=Object.keys(a).sort(),s=e[0]||"";return t.map(i=>{const n=Mt(i&&i.startFrom);return n?{...i,startFrom:n}:{...i,startFrom:_a(i&&i.id,e,a)||s}})}function Wa(t,a){const e=Object.keys(a).sort(),s=e[0]||"",i={};return e.forEach(n=>{const r=a[n]&&a[n].tasks;Array.isArray(r)&&r.forEach(o=>{const d=String(o&&o.sourcePinId||"");!d||i[d]||(i[d]=n)})}),t.map(n=>{const r=Mt(n&&n.startFrom);if(r)return{...n,startFrom:r};const o=String(n&&n.id||"");return{...n,startFrom:i[o]||s}})}function na(t){const a=new Set,e=new Set,s=new Set;return t.filter(i=>{if(!i||typeof i!="object")return!1;const n=String(i.id||"");if(n&&a.has(n))return!1;n&&a.add(n);const r=String(i.sourcePinId||"");if(r){if(e.has(r))return!1;e.add(r)}const o=`${String(i.title||"").trim().toLowerCase()}|${Number(i.points)||0}|${String(i.category||"")}`;return s.has(o)?!1:(s.add(o),!0)})}function oa(t){F=Na(t.customCategories||[]),tt=Ha(t.categoryOverrides);const a={};Object.entries(t.days||{}).forEach(([o,d])=>{a[o]={...ke(),habits:d.habits||{},habitRatings:d.habitRatings||{},habitMissed:d.habitMissed||{},habitForwarded:d.habitForwarded&&typeof d.habitForwarded=="object"?d.habitForwarded:{},tasks:na(Array.isArray(d.tasks)?d.tasks.map(Le):[]),note:d.note||"",locked:!!d.locked,lockOverride:d.lockOverride||(d.locked?"locked":null),submittedAt:d.submittedAt||null,lockedHabits:Array.isArray(d.lockedHabits)?d.lockedHabits:null,skippedPins:Array.isArray(d.skippedPins)?d.skippedPins.map(String).filter(l=>l.length<=60).slice(0,100):[]}});const e=qa(Array.isArray(t.habits)&&t.habits.length?t.habits:ta,a).map(o=>({...o,description:String(o.description||"").slice(0,2e3),category:L(o.category||Ea(o.id,o.name)),consciousPoints:V(o.consciousPoints),tags:C(o.tags),pin:G(o.pin)})),s=(Array.isArray(t.archivedHabits)?t.archivedHabits:[]).filter(o=>o&&typeof o=="object"&&o.id).map(o=>$e(o,o.archivedAt||null)).filter(o=>o.id.length<=60).slice(0,500),i=Wa(Array.isArray(t.pinnedTasks)?t.pinnedTasks.map(o=>({...Le(o),pin:G(o.pin)})):[],a),n=new Map(i.map(o=>[String(o.id),o])),r=new Map;return Object.entries(a).sort(([o],[d])=>o.localeCompare(d)).forEach(([o,d])=>{d.tasks.forEach(l=>{const m=G(l.pin);if(!m)return;const h=String(l.sourcePinId||""),p=h?n.get(h):null;if(p){p.pin||(p.pin=m);return}const k=[String(l.title||"").trim().toLowerCase(),Number(l.points)||0,String(l.category||""),String(l.description||""),JSON.stringify(C(l.tags)),q(l.image),JSON.stringify(m)].join("|"),x=r.get(h||k);if(x){l.sourcePinId=x.id;return}const S=h||`legacy-pin-${String(l.id||"task").slice(0,48)}`,y={id:S,title:String(l.title||"Task").slice(0,120),points:Number(l.points)||0,description:String(l.description||"").slice(0,500),category:L(l.category),tags:C(l.tags),pin:m,startFrom:o,image:q(l.image)};i.push(y),n.set(S,y),r.set(h||k,y),l.sourcePinId=S})}),{habits:e,archivedHabits:s,archivedTasks:La(t.archivedTasks),customCategories:F,categoryOverrides:tt,installedAt:Ba(t,a),profile:Tt(t.profile),pinnedTasks:i,days:a,goals:Array.isArray(t.goals)?t.goals.map(le):[],badges:Array.isArray(t.badges)?t.badges.filter(o=>o&&o.id&&o.goalId).map(o=>({id:String(o.id),goalId:String(o.goalId),title:String(o.title||""),tier:o.tier||"bronze",rewardTitle:String(o.rewardTitle||""),earnedAt:o.earnedAt||new Date().toISOString()})):[],settings:{lockTime:t.settings&&t.settings.lockTime||ea.lockTime,autoLock:!t.settings||t.settings.autoLock!==!1,showConscious:!t.settings||t.settings.showConscious!==!1,habitSort:["default","points","category","tags","custom"].includes(t.settings&&t.settings.habitSort)?t.settings.habitSort:"default",taskSort:["default","points","category","tags","custom"].includes(t.settings&&t.settings.taskSort)?t.settings.taskSort:"default",theme:["light","dark"].includes(t.settings&&t.settings.theme)?t.settings.theme:"dark",weekStart:de(t.settings&&t.settings.weekStart),habitOrder:Array.isArray(t.settings&&t.settings.habitOrder)?t.settings.habitOrder.map(String).filter(Boolean).slice(0,300):[],pinnedTaskOrder:Array.isArray(t.settings&&t.settings.pinnedTaskOrder)?t.settings.pinnedTaskOrder.map(String).filter(Boolean).slice(0,300):[]}}}function Ee(){const t=B();return{habits:ta.map(a=>({...a,description:"",tags:[],startFrom:t})),archivedHabits:[],archivedTasks:[],customCategories:[],categoryOverrides:{},installedAt:new Date().toISOString(),profile:Tt({}),pinnedTasks:[],days:{},goals:[],badges:[],settings:{...ea}}}function Ua(){try{const t=localStorage.getItem(Ke)||localStorage.getItem("daily-report-v1");return t?oa(JSON.parse(t)):Ee()}catch{return Ee()}}let c=Ua();F=c.customCategories||[];c.customCategories=F;tt=c.categoryOverrides||{};c.categoryOverrides=tt;let ra=0,se={key:null,value:null},pe=0;function we(){return pe>0}function ot(t){pe+=1;try{return t()}finally{pe-=1}}function w(){ra+=1;try{localStorage.setItem(Ke,JSON.stringify(c))}catch{}}let Me=0;function X(t){return Me+=1,`${t||"id"}${Date.now().toString(36)}${Me.toString(36)}${Math.floor(Math.random()*1296).toString(36)}`}function za(t){return new Date(`${t}T00:00:00`).getDay()}function Wt(t){const a=new Date(`${t}T00:00:00`);return a.setDate(a.getDate()+1),B(a)}function $t(t){const a=new Date(`${t}T00:00:00`);return a.setDate(a.getDate()-1),B(a)}function Ht(t,a){if(!t)return!0;if(Array.isArray(t.exceptDates)&&t.exceptDates.includes(a)||Array.isArray(t.exceptions)&&t.exceptions.includes(a))return!1;if((Array.isArray(t.customDates)?t.customDates:[]).includes(a)||t.mode==="forever")return!0;if(t.mode==="until")return!!t.until&&a<=t.until;if(t.mode==="weekly")return Array.isArray(t.weekdays)&&t.weekdays.includes(za(a));if(t.mode==="monthly"){const s=Array.isArray(t.monthDays)?t.monthDays.map(Number):[];return s.length?s.includes(Number(String(a).slice(8,10))):!0}if(t.mode==="yearly"){const s=Array.isArray(t.yearDays)?t.yearDays:[];return s.length?s.includes(String(a).slice(5,10)):!0}return t.mode!=="custom"}function bt(t){if(!t)return"Not pinned";const a=(t.exceptDates||t.exceptions||[]).length,e=a?` · ⛔ ${a} exception${a>1?"s":""}`:"",s=t.mode==="custom"?0:Array.isArray(t.customDates)?t.customDates.length:0,i=s?` +${s} custom`:"";if(t.mode==="forever")return`Pinned forever${i}${e}`;if(t.mode==="until")return`${t.until?`Pinned until ${t.until}`:"Pinned until a date"}${i}${e}`;if(t.mode==="weekly"){const n=Array.isArray(t.weekdays)?t.weekdays:[],r=ft.filter(o=>n.includes(o.value)).map(o=>o.label);return`${r.length?`Weekly: ${r.join(", ")}`:"Weekly (no days)"}${i}${e}`}if(t.mode==="monthly"){const n=Array.isArray(t.monthDays)?t.monthDays:[];return`${n.length?`Monthly: day${n.length>1?"s":""} ${[...n].sort((r,o)=>r-o).join(", ")}`:"Monthly"}${i}${e}`}if(t.mode==="yearly"){const n=Array.isArray(t.yearDays)?t.yearDays:[];return`${n.length?`Yearly: ${[...n].sort().join(", ")}`:"Yearly"}${i}${e}`}if(t.mode==="custom"){const n=Array.isArray(t.customDates)?t.customDates:[];return`${n.length?`Custom: ${n.length} date${n.length>1?"s":""}`:"Custom dates"}${e}`}return"Pinned"}function me(t){const[a,e]=(c.settings.lockTime||"21:00").split(":").map(Number),s=new Date(`${t}T00:00:00`);return s.setHours(a||0,e||0,0,0),s}function Ut(t){const a=c.days[t];return a?a.lockOverride==="locked"||a.locked===!0:!1}function ee(t,a){return t?t.habitRatings&&t.habitRatings[a]!=null?Number(t.habitRatings[a])||0:t.habits&&t.habits[a]?5:0:0}function ge(t,a){return ee(c.days[t],a)}function Ya(t,a){if(!t)return!1;if(ee(t,a)>0||t.habitMissed&&t.habitMissed[a])return!0;const s=t.habitForwarded&&t.habitForwarded[a];return Array.isArray(s)&&s.length>0?!0:Array.isArray(t.tasks)&&t.tasks.some(i=>String(i&&i.forwardedHabitId||"")===String(a))}function da(t){if(!t)return[...c.habits];const a=c.habits.filter(s=>Nt(s,t)&&Ht(s.pin,t)),e=c.days[t];if(e){const s=new Set(a.map(n=>n.id)),i=n=>{!n||s.has(n.id)||Ya(e,n.id)&&(s.add(n.id),a.push(n))};c.habits.forEach(i),Ut(t)&&c.archivedHabits&&c.archivedHabits.length&&c.archivedHabits.forEach(i)}return a}function Rt(t,a){if(!Array.isArray(a)||!a.length)return t;const e=new Map(a.map((s,i)=>[String(s),i]));return t.some(s=>e.has(String(s&&s.id)))?t.map((s,i)=>({item:s,i})).sort((s,i)=>{const n=e.has(String(s.item&&s.item.id))?e.get(String(s.item.id)):Number.MAX_SAFE_INTEGER,r=e.has(String(i.item&&i.item.id))?e.get(String(i.item.id)):Number.MAX_SAFE_INTEGER;return n===r?s.i-i.i:n-r}).map(s=>s.item):t}function Va(t){const a=c.habits.find(e=>e.id===t);return a||(c.archivedHabits||[]).find(e=>e.id===t)||null}function Ja(t){c.archivedHabits||(c.archivedHabits=[]),!c.archivedHabits.some(a=>a.id===t.id)&&(c.archivedHabits.push($e(t,new Date().toISOString())),c.archivedHabits.length>500&&c.archivedHabits.splice(0,c.archivedHabits.length-500))}function fe(t){const a=M(t),e=da(t);a.lockedHabits=e.map(s=>$e(s)),a.habitMissed={},e.forEach(s=>{ge(t,s.id)<=0&&(a.habitMissed[s.id]=!0)}),a.tasks.forEach(s=>{s.missed=!s.done})}function lt(t){const a=c.days[t];return!a||a.lockOverride==="unlocked"?!1:a.lockOverride==="locked"||a.locked===!0?!0:c.settings.autoLock?Date.now()>=me(t).getTime():!1}function Ne(t){if(we())return lt(t);const a=M(t);return a.lockOverride==="unlocked"?!1:a.lockOverride==="locked"||a.locked?((!Array.isArray(a.lockedHabits)||!a.habitMissed)&&fe(t),!0):c.settings.autoLock&&Date.now()>=me(t).getTime()?(a.locked=!0,a.lockOverride="locked",a.submittedAt=a.submittedAt||me(t).toISOString(),fe(t),w(),!0):!1}function M(t){if(!c.days[t]){const a=ke();if(we())return a;c.days[t]=a}return c.days[t]}function ne(t){const a=String(t);Object.values(c.days).forEach(e=>{!Array.isArray(e.skippedPins)||!e.skippedPins.includes(a)||(e.skippedPins=e.skippedPins.filter(s=>s!==a))})}function He(t){const a=M(t);if(Ut(t)||we())return a;let e=!1;const s=new Set(Array.isArray(a.skippedPins)?a.skippedPins.map(String):[]);if(a.tasks.length>1){const i=na(a.tasks);i.length!==a.tasks.length&&(a.tasks=i,e=!0)}return c.pinnedTasks.forEach(i=>{Nt(i,t)&&Ht(i.pin,t)&&(s.has(String(i.id))||a.tasks.some(n=>n.sourcePinId===i.id)||(a.tasks.push({id:`ptask-${i.id}-${t}`,title:i.title,points:i.points,description:i.description||"",category:L(i.category),tags:C(i.tags),rating:0,done:!1,missed:!1,sourcePinId:i.id,image:q(i.image)}),e=!0))}),e&&w(),a}function la(t){return!(!t||t.pin&&t.pin.mode==="forever")}function Qa(t,a){let e=Wt(a),s=0;for(;s<800;){if(s+=1,Nt(t,e)&&Ht(t.pin,e))return e;e=Wt(e)}return""}function zt(t,a,e=[],s=[]){if(!t||!/^\d{4}-\d{2}-\d{2}$/.test(String(a||"")))return{allowed:!1,next:"",days:[]};let i=t;if(e.length||s.length){const l=e.map(String),m=s.map(String),h=G(t.pin);h.exceptDates=(h.exceptDates||[]).filter(p=>!l.includes(p)),h.customDates=(h.customDates||[]).filter(p=>!m.includes(p)),i={...t,pin:h}}if(!la(i))return{allowed:!1,next:"",days:[]};if(!Nt(i,a)||!Ht(i.pin,a))return{allowed:!1,next:"",days:[]};const n=Qa(i,a);if(!n)return{allowed:!1,next:"",days:[]};const r=[];let o=Wt(a),d=0;for(;o<n&&d<400;)d+=1,r.push(o),o=Wt(o);return r.length?{allowed:!0,next:n,days:r}:{allowed:!1,next:n,days:[]}}function Xa(t,a){const e=t.pin||{},s=Array.isArray(e.exceptDates)?e.exceptDates:[];return s.includes(a)&&(Array.isArray(e.customDates)?e.customDates:[]).filter(n=>n>a).filter(n=>!s.includes(n)).sort().find(n=>zt(t,a,[a],[n]).days.includes(n))||""}function Za(t,a){const e=t.pin||{};if(!(Array.isArray(e.customDates)?e.customDates:[]).includes(a))return"";const i=Array.isArray(e.exceptDates)?e.exceptDates:[];let n="";return i.forEach(r=>{r>=a||zt(t,r,[r],[a]).days.includes(a)&&(!n||r>n)&&(n=r)}),n}function z(t){return!u.isLocked(t)}function Ie(t){const a=at().find(e=>e.label.toLowerCase()===String(t||"").trim().toLowerCase());return a?a.id:"mentally"}function Re(t){return!t||typeof t!="object"||Array.isArray(t)?[]:Array.isArray(t.days)?t.days.filter(a=>a&&/^\d{4}-\d{2}-\d{2}$/.test(String(a.date||""))):[]}const u={todayKey:B,exportBackup(){return JSON.stringify({app:"Daily Report",kind:"full-backup",version:1,exportedAt:new Date().toISOString(),data:c},null,2)},backupKind(t){if(!t||typeof t!="object"||Array.isArray(t))return"invalid";const a=t.data&&typeof t.data=="object"&&!Array.isArray(t.data)?t.data:t;return Array.isArray(a.days)?"report-export":Array.isArray(a.categories)||Array.isArray(a.plans)||Array.isArray(a.schedule)?"wrong-app":typeof a!="object"||a===null||a.habits!==void 0&&!Array.isArray(a.habits)||a.days!==void 0&&(typeof a.days!="object"||a.days===null||Array.isArray(a.days))||a.settings!==void 0&&(typeof a.settings!="object"||a.settings===null||Array.isArray(a.settings))||!["habits","pinnedTasks","days","goals","badges","settings"].some(s=>a[s]!==void 0)?"invalid":"ok"},importBackup(t){if(this.backupKind(t)!=="ok")return!1;const a=t.data&&typeof t.data=="object"&&!Array.isArray(t.data)?t.data:t;return c=oa(a),F=c.customCategories||[],c.customCategories=F,tt=c.categoryOverrides||{},c.categoryOverrides=tt,w(),!0},previewReport(t){const a=Re(t);if(!a.length)return{days:0,start:"",end:"",newHabits:0};const e=new Set(c.habits.map(n=>String(n.name||"").trim().toLowerCase())),s=new Set;a.forEach(n=>{(Array.isArray(n.habits)?n.habits:[]).forEach(r=>{const o=String(r&&r.name||"").trim().toLowerCase();o&&!e.has(o)&&s.add(o)})});const i=a.map(n=>String(n.date)).sort();return{days:a.length,start:i[0],end:i[i.length-1],newHabits:s.size}},importReport(t){const a=Re(t);if(!a.length)return!1;const e=a.map(o=>String(o.date)).sort(),s=e[e.length-1],i={};c.habits.forEach(o=>{i[String(o.name||"").trim().toLowerCase()]=o});let n=0;const r=Date.now();return a.forEach((o,d)=>{const l=String(o.date);(Array.isArray(o.habits)?o.habits:[]).forEach(p=>{const k=String(p&&p.name||"").trim().slice(0,80);if(!k)return;const x=k.toLowerCase();if(!i[x]){const S={id:`h${r}_${n}`,name:k,description:String(p&&p.description||"").slice(0,2e3),points:Number(p&&p.points||10)||10,icon:"star",category:Ie(p&&p.category),consciousPoints:V(p&&p.consciousPoints),tags:C(p&&p.tags),pin:{mode:"until",until:s,weekdays:[],monthDays:[],yearDays:[],customDates:[],exceptDates:[]},startFrom:e[0]};c.habits.push(S),i[x]=S,n+=1}});const m=ke();m.note=String(o.note||""),m.locked=!0,m.lockOverride="locked",m.submittedAt=null;const h=[];(Array.isArray(o.habits)?o.habits:[]).forEach(p=>{const k=i[String(p&&p.name||"").trim().toLowerCase()];if(!k)return;const x=Math.max(0,Math.min(5,Number(p&&p.rating||0)));m.habitRatings[k.id]=x,m.habits[k.id]=x>0,x<=0&&(m.habitMissed[k.id]=!0),k.startFrom&&l<k.startFrom&&(k.startFrom=l),h.push({id:k.id,name:k.name,description:k.description,points:k.points,icon:k.icon||"star",category:L(k.category),consciousPoints:V(k.consciousPoints),tags:C(k.tags),pin:G(k.pin)})}),m.lockedHabits=h,m.tasks=(Array.isArray(o.tasks)?o.tasks:[]).map((p,k)=>({id:`t${r}_${d}_${k}`,title:String(p&&p.title||"Task").slice(0,120),points:Number(p&&p.points||5)||5,description:String(p&&p.description||""),category:Ie(p&&p.category),tags:C(p&&p.tags),rating:Math.max(0,Math.min(5,Number(p&&p.rating||0))),done:!!(p&&p.done),missed:!(p&&p.done),image:"",forwardedFrom:/^\d{4}-\d{2}-\d{2}$/.test(String(p&&p.forwardedFrom||""))?String(p.forwardedFrom):"",forwardedHabitId:"",forwardedTo:Array.isArray(p&&p.forwardedTo)?p.forwardedTo.filter(x=>/^\d{4}-\d{2}-\d{2}$/.test(String(x))).map(String).slice(0,50):[]})),c.days[l]=m}),w(),{days:a.length,habits:n}},getSettings(){return c.settings},setLockTime(t){c.settings.lockTime=t||"21:00",w()},setAutoLock(t){c.settings.autoLock=!!t,w()},setShowConscious(t){c.settings.showConscious=!!t,w()},consciousEnabled(){return c.settings.showConscious!==!1},setHabitSort(t){c.settings.habitSort=["default","points","category","tags","custom"].includes(t)?t:"default",w()},setTaskSort(t){c.settings.taskSort=["default","points","category","tags","custom"].includes(t)?t:"default",w()},getWeekStart(){return de(c.settings.weekStart)},setWeekStart(t){c.settings.weekStart=de(t),w()},getTheme(){return c.settings.theme==="light"?"light":"dark"},setTheme(t){c.settings.theme=t==="light"?"light":"dark",w()},getHabits(t,a){if(t&&Ut(t)){const n=c.days[t];if(n&&Array.isArray(n.lockedHabits)){const r=a||c.settings.habitSort||"default",o=[...n.lockedHabits];return r==="default"||r==="custom"?Rt(o,c.settings.habitOrder):ie(o,r)}}const e=a||c.settings.habitSort||"default",s=da(t),i=e==="default"||e==="custom"?Rt(s,c.settings.habitOrder):ie(s,e);return e==="default"||e==="custom"?i.slice().sort((n,r)=>+!!r.pin-+!!n.pin):i},getTasks(t,a){const e=this.getDay(t),s=a||c.settings.taskSort||"default";return s==="default"||s==="custom"?e.tasks:ie(e.tasks,s)},getAllHabits(){return c.habits},getPinnedHabits(){return Rt(c.habits.filter(t=>!!t.pin),c.settings.habitOrder)},setPinnedHabitOrder(t){const a=new Set(c.habits.filter(n=>n.pin).map(n=>String(n.id))),e=(Array.isArray(t)?t:[]).map(String).filter(n=>a.has(n)),s=new Set(e);a.forEach(n=>{s.has(n)||e.push(n)});const i=c.settings.habitOrder.filter(n=>!a.has(n));c.settings.habitOrder=[...e,...i].slice(0,300),w()},getHabitActivity(t,a=30){const e=String(t||"");return e?Object.keys(c.days).sort().reverse().flatMap(s=>{const i=c.days[s],n=i.habitForwarded&&i.habitForwarded[e],r=!!(i.habits&&i.habits[e])||!!(i.habitMissed&&i.habitMissed[e])||[i.habitRatings,i.habitMissed].some(l=>l&&Object.prototype.hasOwnProperty.call(l,e))||Array.isArray(n)&&n.length>0,o=Array.isArray(i.lockedHabits)&&i.lockedHabits.some(l=>String(l.id)===e);if(!r&&!o)return[];const d=ee(i,e);return[{date:s,rating:d,status:d?"Completed":i.habitMissed[e]||o&&lt(s)?"Missed":"Not rated",locked:lt(s)}]}).slice(0,Math.max(1,Math.min(365,Number(a)||30))):[]},getPinnedTasks(){return Rt(c.pinnedTasks,c.settings.pinnedTaskOrder)},setPinnedTaskOrder(t){const a=new Set(c.pinnedTasks.map(i=>String(i.id))),e=(Array.isArray(t)?t:[]).map(String).filter(i=>a.has(i)),s=new Set(e);c.pinnedTasks.forEach(i=>{const n=String(i.id);s.has(n)||e.push(n)}),c.settings.pinnedTaskOrder=e.slice(0,300),w()},getDay(t){return Ne(t),He(t)},isLocked(t){return Ne(t)},submitDay(t){const a=M(t);a.locked=!0,a.lockOverride="locked",a.submittedAt=new Date().toISOString(),fe(t),w(),this.checkGoals(t)},unlockDay(t){const a=M(t);a.locked=!1,a.lockOverride="unlocked",a.habitMissed={},a.lockedHabits=null,a.tasks.forEach(e=>{e.missed=!1}),w()},isHabitMissed(t,a){const e=c.days[t];return!e||!(e.locked||e.lockOverride==="locked")||!this.getHabits(t).some(s=>s.id===a)||ge(t,a)>0?!1:(e.habitMissed&&e.habitMissed[a],!0)},isTaskMissed(t,a){const e=c.days[t];if(!e)return!1;const s=(e.tasks||[]).find(i=>i.id===a);return s?s.missed===!0?!0:s.missed===!1?!1:!!(e.locked||e.lockOverride==="locked")&&!s.done:!1},missedCounts(t){return ot(()=>{const a=this.getDay(t),e=this.getHabits(t),s=lt(t);return{habits:e.filter(i=>a.habitMissed&&a.habitMissed[i.id]?!0:s&&ge(t,i.id)<=0).length,tasks:a.tasks.filter(i=>i.done?!1:i.missed===!0?!0:i.missed===!1?!1:s).length}})},lockDay(t){this.submitDay(t)},lockDays(t){let a=0;return t.forEach(e=>{this.isLocked(e)||(this.submitDay(e),a+=1)}),a},unlockDays(t){let a=0;return t.forEach(e=>{this.isLocked(e)&&(this.unlockDay(e),a+=1)}),a},lockedReports(){return ot(()=>Object.keys(c.days).sort().reverse().filter(t=>lt(t)).map(t=>({date:t,submittedAt:c.days[t].submittedAt,...this.scoreFor(t)})))},habitRating(t,a){const e=c.days[t];return e?e.habitRatings&&e.habitRatings[a]!=null?Number(e.habitRatings[a])||0:e.habits&&e.habits[a]?5:0:0},setHabitRating(t,a,e){if(!z(t))return;const s=M(t),i=Math.max(0,Math.min(5,Number(e)||0));s.habitRatings[a]=i,s.habits[a]=i>0,w(),this.checkGoals(t)},toggleHabit(t,a){if(!z(t))return;const e=this.habitRating(t,a)>0?0:5;this.setHabitRating(t,a,e)},addTask(t,a,e,s={}){if(!z(t))return;M(t).tasks.push({id:X("t"),title:a.trim(),points:Number(e)||5,description:String(s.description||"").trim(),category:L(s.category),tags:C(s.tags),rating:Math.max(0,Math.min(5,Number(s.rating)||0)),done:!1,missed:!1,forwardedFrom:/^\d{4}-\d{2}-\d{2}$/.test(String(s.forwardedFrom||""))?String(s.forwardedFrom):"",forwardedHabitId:String(s.forwardedHabitId||""),forwardedTo:[],image:q(s.image)}),w(),this.checkGoals(t)},setTaskRating(t,a,e){if(!z(t))return;const i=M(t).tasks.find(r=>r.id===a);if(!i)return;const n=Math.max(0,Math.min(5,Number(e)||0));i.rating=n,w()},setTaskOrder(t,a){if(!z(t))return;const e=M(t),s=(Array.isArray(a)?a:[]).map(String).filter(Boolean);if(!s.length)return;const i=new Map(s.map((r,o)=>[r,o])),n=e.tasks.slice().sort((r,o)=>{const d=i.has(r.id)?i.get(r.id):Number.MAX_SAFE_INTEGER,l=i.has(o.id)?i.get(o.id):Number.MAX_SAFE_INTEGER;return d-l});e.tasks=n,w()},setHabitOrder(t){const a=(Array.isArray(t)?t:[]).map(String).filter(Boolean);a.length&&(c.settings.habitOrder=a.slice(0,300),w())},toggleTask(t,a){if(!z(t))return;const s=M(t).tasks.find(i=>i.id===a);s&&(s.done=!s.done,w(),this.checkGoals(t))},removeTask(t,a){if(!z(t))return;const e=M(t),s=e.tasks.find(n=>n.id===a);e.tasks=e.tasks.filter(n=>n.id!==a);const i=s&&s.sourcePinId?String(s.sourcePinId):"";i&&(Array.isArray(e.skippedPins)||(e.skippedPins=[]),e.skippedPins.includes(i)||e.skippedPins.push(i),e.skippedPins.length>100&&e.skippedPins.splice(0,e.skippedPins.length-100)),w()},forwardTask(t,a,e){if(!/^\d{4}-\d{2}-\d{2}$/.test(String(e||"")))return{ok:!1,reason:"Pick a valid date"};if(t===e)return{ok:!1,reason:"Already on that day"};if(!z(t))return{ok:!1,reason:"Source day is locked"};if(this.isLocked(e))return{ok:!1,reason:"Target day is locked"};const i=M(t).tasks.find(d=>d.id===a);if(!i)return{ok:!1,reason:"Task not found"};const n=M(e),r=String(i.title||"").trim().toLowerCase();if(n.tasks.some(d=>String(d.title||"").trim().toLowerCase()===r))return{ok:!1,reason:"That task is already on that day"};n.tasks.push({id:X("t"),title:i.title,points:Number(i.points)||5,description:String(i.description||""),category:L(i.category),tags:C(i.tags),rating:0,done:!1,missed:!1,forwardedFrom:t,forwardedHabitId:String(i.forwardedHabitId||""),forwardedTo:[],image:q(i.image)});const o=Array.isArray(i.forwardedTo)?i.forwardedTo:[];return o.includes(e)||o.push(e),i.forwardedTo=o.slice(0,50),w(),this.checkGoals(e),{ok:!0}},habitForwardedTo(t,a){const e=c.days[t];if(!e||!e.habitForwarded)return[];const s=e.habitForwarded[a];return Array.isArray(s)?s:[]},habitReplaceDays(t,a){const e=c.habits.find(i=>i.id===a),s=zt(e,t);return{allowed:s.allowed,next:s.next,days:s.days.slice()}},replaceHabit(t,a,e){if(!/^\d{4}-\d{2}-\d{2}$/.test(String(e||"")))return{ok:!1,reason:"Pick a valid date"};if(String(e)===String(t))return{ok:!1,reason:"Already on that day"};const s=c.habits.find(r=>r.id===a);if(!s)return{ok:!1,reason:"Habit not found"};if(!la(s))return{ok:!1,reason:"This habit is pinned forever — every day is already its day"};if(!z(t))return{ok:!1,reason:"That day is locked"};if(this.isLocked(e))return{ok:!1,reason:"That day is locked"};const i=zt(s,t);if(!i.allowed)return{ok:!1,reason:"No replace days available for this habit"};if(!i.days.includes(e))return{ok:!1,reason:`Pick a day before ${i.next}`};const n=G(s.pin);return n.exceptDates.includes(t)||(n.exceptDates=[...n.exceptDates,t].sort()),n.customDates.includes(e)||(n.customDates=[...n.customDates,e].sort()),s.pin=n,w(),this.checkGoals(e),{ok:!0,from:t,to:e}},undoReplaceHabit(t,a,e){const s=c.habits.find(n=>n.id===t);if(!s)return{ok:!1,reason:"Habit not found"};const i=G(s.pin);return i.exceptDates=(i.exceptDates||[]).filter(n=>n!==a),i.customDates=(i.customDates||[]).filter(n=>n!==e),s.pin=i,w(),{ok:!0}},habitReplacedTo(t,a){const e=c.habits.find(s=>s.id===a);return e?Xa(e,t):""},habitReplacedFrom(t,a){const e=c.habits.find(s=>s.id===a);return e?Za(e,t):""},setNote(t,a){z(t)&&(M(t).note=a,w())},addHabit(t,a,e={}){c.habits.push({id:X("h"),name:t.trim(),description:String(e.description||"").trim().slice(0,2e3),points:Number(a)||10,icon:"star",category:L(e.category||"physically"),consciousPoints:V(e.consciousPoints),tags:C(e.tags),pin:G({mode:"forever"}),startFrom:Mt(e.startFrom)||B()}),w()},updateHabit(t,a){const e=c.habits.find(s=>s.id===t);e&&(a.name!=null&&(e.name=String(a.name).trim()||e.name),a.description!=null&&(e.description=String(a.description).trim().slice(0,2e3)),a.points!=null&&(e.points=Number(a.points)||e.points),a.category!=null&&(e.category=L(a.category)),a.consciousPoints!=null&&(e.consciousPoints=V(a.consciousPoints)),a.tags!=null&&(e.tags=C(a.tags)),w())},updateTask(t,a,e){if(!z(t))return;const i=M(t).tasks.find(n=>n.id===a);if(i){if(e.title!=null&&(i.title=String(e.title).trim()||i.title),e.points!=null&&(i.points=Number(e.points)||i.points),e.description!=null&&(i.description=String(e.description).trim()),e.category!=null&&(i.category=L(e.category)),e.tags!=null&&(i.tags=C(e.tags)),e.image!==void 0&&(i.image=q(e.image)),e.rating!=null&&(i.rating=Math.max(0,Math.min(5,Number(e.rating)||0))),i.sourcePinId){const n=c.pinnedTasks.find(r=>r.id===i.sourcePinId);n&&(n.title=i.title,n.points=i.points,n.description=i.description,n.category=i.category,e.tags!=null&&(n.tags=C(e.tags)),e.image!==void 0&&(n.image=q(e.image)))}w()}},habitStreak(t,a){const e=Va(t);if(!e)return 0;let s=a,i=0;this.habitRating(s,t)===0&&(s=$t(s));let n=0;for(;i<400;){if(i+=1,!Nt(e,s)||!Ht(e.pin,s)){s=$t(s);continue}if(this.habitRating(s,t)>0){n+=1,s=$t(s);continue}break}return n},categoryBreakdown(t){const a=this.getDay(t),e=this.getHabits(t);return at().map(s=>{const i=e.filter(S=>L(S.category)===s.id),n=a.tasks.filter(S=>L(S.category)===s.id),r=i.reduce((S,y)=>{const D=this.habitRating(t,y.id);return S+Math.round(y.points*D/5)},0),o=c.settings.showConscious!==!1,d=o?i.reduce((S,y)=>S+(this.habitRating(t,y.id)>0?V(y.consciousPoints):0),0):0,l=i.reduce((S,y)=>S+y.points,0),m=o?i.reduce((S,y)=>S+V(y.consciousPoints),0):0,h=n.reduce((S,y)=>S+(y.done?y.points:0),0),p=n.reduce((S,y)=>S+y.points,0),k=i.map(S=>this.habitRating(t,S.id)),x=k.length?Math.round(k.reduce((S,y)=>S+y,0)/k.length*10)/10:0;return{...s,habits:i,tasks:n,earned:r+d+h,max:l+m+p,habitAvg:x,consciousEarned:d,consciousMax:m,completed:i.filter(S=>this.habitRating(t,S.id)>0).length+n.filter(S=>S.done).length,total:i.length+n.length}})},removeHabit(t){const a=c.habits.find(e=>e.id===t);a&&Ja(a),c.habits=c.habits.filter(e=>e.id!==t),w()},getArchivedHabits(){return(c.archivedHabits||[]).map(t=>({...t}))},deleteArchivedHabit(t){const a=(c.archivedHabits||[]).length;return c.archivedHabits=(c.archivedHabits||[]).filter(e=>e.id!==t),c.archivedHabits.length===a?{ok:!1,reason:"That habit is no longer archived"}:(w(),{ok:!0})},archiveTask(t,a){if(!z(t))return{ok:!1,reason:"Day is locked"};const e=M(t),s=e.tasks.find(n=>n.id===a);if(!s)return{ok:!1,reason:"Task not found"};c.archivedTasks||(c.archivedTasks=[]),c.archivedTasks.unshift(sa(s,new Date().toISOString(),t)),c.archivedTasks.length>500&&(c.archivedTasks.length=500),e.tasks=e.tasks.filter(n=>n.id!==a);const i=s.sourcePinId?String(s.sourcePinId):"";return i&&(Array.isArray(e.skippedPins)||(e.skippedPins=[]),e.skippedPins.includes(i)||e.skippedPins.push(i)),w(),{ok:!0}},getArchivedTasks(){return(c.archivedTasks||[]).map(t=>({...t}))},restoreTask(t,a){const e=(c.archivedTasks||[]).findIndex(l=>l.id===t);if(e<0)return{ok:!1,reason:"That task is no longer archived"};const s=c.archivedTasks[e],i=a||B();He(i);const n=M(i),r=String(s.title||"").trim().toLowerCase();if(n.tasks.some(l=>String(l.title||"").trim().toLowerCase()===r))return{ok:!1,reason:"That task is already on that day"};const d=/^\d{4}-\d{2}-\d{2}$/.test(String(s.originDate||""))?String(s.originDate):"";return n.tasks.push({id:X("t"),title:s.title,points:Number(s.points)||5,description:String(s.description||""),category:L(s.category),tags:C(s.tags),rating:0,done:!1,missed:!1,forwardedFrom:d&&d!==i?d:"",forwardedHabitId:"",forwardedTo:[],image:q(s.image),sourcePinId:String(s.sourcePinId||"")}),c.archivedTasks.splice(e,1),w(),{ok:!0,from:d,to:i}},deleteArchivedTask(t){const a=(c.archivedTasks||[]).length;return c.archivedTasks=(c.archivedTasks||[]).filter(e=>e.id!==t),c.archivedTasks.length===a?{ok:!1,reason:"That task is no longer archived"}:(w(),{ok:!0})},restoreHabit(t){const a=(c.archivedHabits||[]).findIndex(i=>i.id===t);if(a<0)return{ok:!1,reason:"That habit is no longer archived"};const e=c.archivedHabits[a];if(c.habits.some(i=>i.id===e.id))return c.archivedHabits.splice(a,1),w(),{ok:!0};const s={...e,description:String(e.description||"").slice(0,2e3),category:L(e.category),consciousPoints:V(e.consciousPoints),tags:C(e.tags),pin:G(e.pin),archivedAt:null};return c.habits.push(s),c.archivedHabits.splice(a,1),w(),{ok:!0,habit:{...s}}},pinHabit(t,a){const e=c.habits.find(s=>s.id===t);e&&(e.pin=G(a),w())},updatePinnedTaskDetails(t,a){const e=c.pinnedTasks.find(s=>s.id===t);if(e){if(a.title!=null&&(e.title=String(a.title).trim().slice(0,120)||e.title),a.points!=null){const s=Number(a.points);Number.isFinite(s)&&(e.points=Math.max(0,s))}a.description!=null&&(e.description=String(a.description).trim().slice(0,2e3)),a.category!=null&&(e.category=L(a.category)),a.tags!=null&&(e.tags=C(a.tags)),a.image!==void 0&&(e.image=q(a.image)),ne(t),w()}},unpinHabit(t){const a=c.habits.find(e=>e.id===t);a&&(a.pin=null,w())},pinTask(t,a,e){if(!z(t))return;const i=M(t).tasks.find(o=>o.id===a);if(!i)return;const n=i.sourcePinId?c.pinnedTasks.find(o=>o.id===i.sourcePinId):null;if(n){n.pin=G(e),ne(n.id),w();return}const r=X("p");c.pinnedTasks.push({id:r,title:i.title,points:i.points,description:i.description||"",category:L(i.category),tags:C(i.tags),pin:G(e),startFrom:t,image:q(i.image)}),i.sourcePinId=r,w()},unpinTaskTemplate(t){c.pinnedTasks=c.pinnedTasks.filter(e=>e.id!==t);const a=String(t);Object.entries(c.days).forEach(([e,s])=>{if(!Array.isArray(s.tasks)||!s.tasks.length||Ut(e))return;const i=s.tasks.length;s.tasks=s.tasks.filter(n=>String(n&&n.sourcePinId||"")!==a),s.tasks.length!==i&&(Array.isArray(s.skippedPins)||(s.skippedPins=[]),s.skippedPins=s.skippedPins.filter(n=>n!==a))}),w()},updatePinnedTask(t,a){const e=c.pinnedTasks.find(s=>s.id===t);e&&(e.pin=G(a),ne(t),w())},findHabit(t){return c.habits.find(a=>a.id===t)||null},findTask(t,a){return M(t).tasks.find(e=>e.id===a)||null},findPinnedTask(t){return c.pinnedTasks.find(a=>a.id===t)||null},getInstalledAt(){return String(c.installedAt||new Date().toISOString())},getProfile(){const t=Tt(c.profile);return c.profile=t,JSON.parse(JSON.stringify(t))},setProfileField(t,a){return!Object.prototype.hasOwnProperty.call(ce,t)||c.profile.locked?!1:((!c.profile||typeof c.profile!="object")&&(c.profile=Tt({})),c.profile[t]=String(a||"").slice(0,ce[t]),w(),!0)},setProfileLocked(t){(!c.profile||typeof c.profile!="object")&&(c.profile=Tt({})),c.profile.locked=!!t,w()},isProfileLocked(){return!!(c.profile&&c.profile.locked)},profileGoalDurations(){return JSON.parse(JSON.stringify(St))},addWhoAmI(t){if(c.profile.locked)return{ok:!1,reason:"Profile is locked"};const a=String(t||"").trim().slice(0,120);return a?(c.profile.whoAmI||[]).length>=50?{ok:!1,reason:"List is full (50)"}:(c.profile.whoAmI.push({id:W("w"),text:a}),w(),{ok:!0}):{ok:!1,reason:"Type something first"}},updateWhoAmI(t,a){if(c.profile.locked)return;const e=(c.profile.whoAmI||[]).find(i=>i.id===t);if(!e)return;const s=String(a||"").trim().slice(0,120);s?e.text=s:c.profile.whoAmI=c.profile.whoAmI.filter(i=>i.id!==t),w()},moveWhoAmI(t,a){if(c.profile.locked)return;const e=c.profile.whoAmI||[],s=e.findIndex(r=>r.id===t),i=s+a;if(s<0||i<0||i>=e.length)return;const[n]=e.splice(s,1);e.splice(i,0,n),w()},removeWhoAmI(t){c.profile.locked||(c.profile.whoAmI=(c.profile.whoAmI||[]).filter(a=>a.id!==t),w())},addLifeArea(t){if(c.profile.locked)return{ok:!1,reason:"Profile is locked"};const a=String(t||"").trim().slice(0,60);if(!a)return{ok:!1,reason:"Name the life area"};if((c.profile.lifeAreas||[]).length>=20)return{ok:!1,reason:"Max 20 areas"};const e={id:W("a"),title:a,description:""};return c.profile.lifeAreas.push(e),w(),{ok:!0,id:e.id}},updateLifeArea(t,a={}){if(c.profile.locked)return;const e=(c.profile.lifeAreas||[]).find(s=>s.id===t);e&&(a.title!=null&&(e.title=String(a.title).trim().slice(0,60)||e.title),a.description!=null&&(e.description=String(a.description).slice(0,1e3)),w())},moveLifeArea(t,a){if(c.profile.locked)return;const e=c.profile.lifeAreas||[],s=e.findIndex(r=>r.id===t),i=s+a;if(s<0||i<0||i>=e.length)return;const[n]=e.splice(s,1);e.splice(i,0,n),w()},removeLifeArea(t){c.profile.locked||(c.profile.lifeAreas=(c.profile.lifeAreas||[]).filter(a=>a.id!==t),w())},addProfileGoal(t,a,e){if(c.profile.locked)return{ok:!1,reason:"Profile is locked"};const s=String(t||"").trim().slice(0,200);if(!s)return{ok:!1,reason:"Write your goal first"};const i=ue.includes(a)?a:"short",n=St[i],r=n.includes(e)?e:n[0];if((c.profile.pGoals||[]).length>=100)return{ok:!1,reason:"Too many goals (100)"};const o={id:W("g"),text:s,term:i,duration:r,createdAt:new Date().toISOString()};return c.profile.pGoals.push(o),w(),{ok:!0,id:o.id}},updateProfileGoal(t,a={}){if(c.profile.locked)return;const e=(c.profile.pGoals||[]).find(s=>s.id===t);if(e){if(a.text!=null&&(e.text=String(a.text).trim().slice(0,200)||e.text),a.term!=null&&ue.includes(a.term)){e.term=a.term;const s=St[e.term];s.includes(e.duration)||(e.duration=s[0])}a.duration!=null&&St[e.term].includes(a.duration)&&(e.duration=a.duration),w()}},removeProfileGoal(t){c.profile.locked||(c.profile.pGoals=(c.profile.pGoals||[]).filter(a=>a.id!==t),w())},addQuote(t,a){if(c.profile.locked)return{ok:!1,reason:"Profile is locked"};const e=String(t||"").trim().slice(0,500);if(!e)return{ok:!1,reason:"Write the quote first"};if((c.profile.quotes||[]).length>=200)return{ok:!1,reason:"Too many quotes (200)"};const s={id:W("q"),text:e,author:String(a||"").trim().slice(0,80),fav:!1,createdAt:new Date().toISOString()};return c.profile.quotes.push(s),w(),{ok:!0,id:s.id}},updateQuote(t,a={}){if(c.profile.locked)return;const e=(c.profile.quotes||[]).find(s=>s.id===t);e&&(a.text!=null&&(e.text=String(a.text).trim().slice(0,500)||e.text),a.author!=null&&(e.author=String(a.author).trim().slice(0,80)),w())},toggleQuoteFav(t){if(c.profile.locked)return;const a=(c.profile.quotes||[]).find(e=>e.id===t);a&&(a.fav=!a.fav,w())},removeQuote(t){c.profile.locked||(c.profile.quotes=(c.profile.quotes||[]).filter(a=>a.id!==t),w())},getCategories(){return at().map(t=>({...t}))},getCustomCategories(){return F.map(t=>({...t}))},addCategory(t){const a=String(t||"").trim().slice(0,30);if(!a)return{ok:!1,reason:"Type a category name"};if(at().some(i=>i.label.toLowerCase()===a.toLowerCase()))return{ok:!1,reason:"That category already exists"};if(F.length>=20)return{ok:!1,reason:"Too many categories (max 20 custom)"};let s=`c${Date.now().toString(36)}`;return at().some(i=>i.id===s)&&(s=`c${Date.now().toString(36)}${Math.floor(Math.random()*99)}`),F.push({id:s,label:a}),w(),{ok:!0,id:s}},renameCategory(t,a){const e=F.find(n=>n.id===t);if(!e)return{ok:!1,reason:"Built-in categories can’t be renamed"};const s=String(a||"").trim().slice(0,30);return s?at().some(n=>n.id!==t&&n.label.toLowerCase()===s.toLowerCase())?{ok:!1,reason:"That category already exists"}:(e.label=s,w(),{ok:!0}):{ok:!1,reason:"Type a category name"}},updateCategory(t,a={}){const e=F.find(s=>s.id===t);if(!e){if(!Lt.find(n=>n.id===t))return{ok:!1,reason:"Category not found"};const i={...tt[t]||{}};return a.color!==void 0&&(i.color=String(a.color).slice(0,20)),a.goals!==void 0&&(i.goals=String(a.goals).slice(0,1e3)),tt[t]=i,c.categoryOverrides=tt,w(),{ok:!0}}return a.color!==void 0&&(e.color=String(a.color).slice(0,20)),a.goals!==void 0&&(e.goals=String(a.goals).slice(0,1e3)),w(),{ok:!0}},deleteCategory(t){const a=F.findIndex(e=>e.id===t);return a<0?{ok:!1,reason:"Built-in categories can’t be deleted"}:(F.splice(a,1),c.habits.forEach(e=>{e.category===t&&(e.category="mentally")}),(c.archivedHabits||[]).forEach(e=>{e.category===t&&(e.category="mentally")}),c.pinnedTasks.forEach(e=>{e.category===t&&(e.category="mentally")}),Object.values(c.days).forEach(e=>{(e.tasks||[]).forEach(s=>{s.category===t&&(s.category="mentally")})}),w(),{ok:!0})},getAllTags(){const t=new Map,a=e=>{C(e).forEach(s=>{t.set(s,(t.get(s)||0)+1)})};return c.habits.forEach(e=>a(e.tags)),(c.archivedHabits||[]).forEach(e=>a(e.tags)),c.pinnedTasks.forEach(e=>a(e.tags)),Object.values(c.days).forEach(e=>{(e.tasks||[]).forEach(s=>a(s.tags))}),[...t.entries()].map(([e,s])=>({tag:e,count:s})).sort((e,s)=>s.count-e.count||e.tag.localeCompare(s.tag))},renameTag(t,a){const e=String(t||"").trim(),s=C(a)[0]||"";if(!e||!s)return{ok:!1,reason:"Type a tag name"};if(e.toLowerCase()===s.toLowerCase()){const r=o=>C((o||[]).map(d=>String(d).toLowerCase()===e.toLowerCase()?s:d));return c.habits.forEach(o=>{o.tags=r(o.tags)}),(c.archivedHabits||[]).forEach(o=>{o.tags=r(o.tags)}),c.pinnedTasks.forEach(o=>{o.tags=r(o.tags)}),Object.values(c.days).forEach(o=>{(o.tasks||[]).forEach(d=>{d.tags=r(d.tags)})}),w(),{ok:!0}}const i=this.getAllTags().some(r=>r.tag.toLowerCase()===s.toLowerCase()),n=r=>{const o=(r||[]).map(d=>String(d).toLowerCase()===e.toLowerCase()?s:d);return C(o)};return c.habits.forEach(r=>{r.tags=n(r.tags)}),(c.archivedHabits||[]).forEach(r=>{r.tags=n(r.tags)}),c.pinnedTasks.forEach(r=>{r.tags=n(r.tags)}),Object.values(c.days).forEach(r=>{(r.tasks||[]).forEach(o=>{o.tags=n(o.tags)})}),w(),{ok:!0,merged:i}},deleteTag(t){const a=String(t||"").trim().toLowerCase();if(!a)return{ok:!1,reason:"Pick a tag first"};const e=s=>(s||[]).filter(i=>String(i).toLowerCase()!==a);return c.habits.forEach(s=>{s.tags=e(s.tags)}),(c.archivedHabits||[]).forEach(s=>{s.tags=e(s.tags)}),c.pinnedTasks.forEach(s=>{s.tags=e(s.tags)}),Object.values(c.days).forEach(s=>{(s.tasks||[]).forEach(i=>{i.tags=e(i.tags)})}),w(),{ok:!0}},addTagToHabit(t,a){const e=c.habits.find(i=>i.id===t);if(!e)return{ok:!1,reason:"Pick a habit first"};const s=C(a)[0]||"";return s?(e.tags=C([...e.tags||[],s]),w(),{ok:!0}):{ok:!1,reason:"Type a tag name"}},categoryChart(t,a){const e=["week","month","year"].includes(t)?t:"week",s=`${e}|${a}|${ra}`;return se.key===s?se.value:ot(()=>this._buildCategoryChart(e,a,s))},_buildCategoryChart(t,a,e){const s=at(),i=[];if(t==="year"){const m=String(a).slice(0,4);for(let h=0;h<12;h++){const p=String(h+1).padStart(2,"0"),k=new Date(Number(m),h+1,0).getDate();i.push({label:new Date(Number(m),h,1).toLocaleDateString(void 0,{month:"short"}),title:new Date(Number(m),h,1).toLocaleDateString(void 0,{month:"long",year:"numeric"}),keys:this.rangeKeys(`${m}-${p}-01`,`${m}-${p}-${String(k).padStart(2,"0")}`)})}}else{const[m,h]=this.resolveRange(t,a);this.rangeKeys(m,h).forEach(p=>{const k=new Date(`${p}T00:00:00`);i.push({label:t==="week"?k.toLocaleDateString(void 0,{weekday:"narrow"}):String(k.getDate()),title:p,keys:[p]})})}const n={},r={};s.forEach(m=>{n[m.id]=i.map(()=>0),r[m.id]=0}),i.forEach((m,h)=>{m.keys.forEach(p=>{this.categoryBreakdown(p).forEach(k=>{k.id in n||(n[k.id]=i.map(()=>0),r[k.id]=0),n[k.id][h]+=k.earned||0,r[k.id]+=k.earned||0})})});const o=i.map((m,h)=>s.reduce((p,k)=>p+(n[k.id]?n[k.id][h]:0),0)),d=Math.max(1,...o),l={kind:t,labels:i.map(m=>m.label),titles:i.map(m=>m.title),cats:s.map(m=>({...m})),perCat:n,totals:r,max:d,grandTotal:o.reduce((m,h)=>m+h,0)};return se={key:e,value:l},l},getGoals(){return c.goals},getBadges(){return[...c.badges].sort((t,a)=>{const e=Pe(a.tier)-Pe(t.tier);return e!==0?e:String(a.earnedAt).localeCompare(String(t.earnedAt))})},topBadges(t=3){return this.getBadges().slice(0,t)},addGoal(t={}){const a=le({...t,id:X("g")});return c.goals.push(a),w(),this.checkGoals(B()),a},updateGoal(t,a={}){const e=c.goals.find(i=>i.id===t);if(!e)return;const s=le({...e,...a,id:t});Object.assign(e,s),w(),this.checkGoals(B())},removeGoal(t){c.goals=c.goals.filter(a=>a.id!==t),w()},findGoal(t){return c.goals.find(a=>a.id===t)||null},taskListGoals(){return c.goals.filter(t=>t.kind==="task-list")},openTaskListGoals(){return c.goals.filter(t=>t.kind==="task-list"&&!t.locked)},undoneDayTasks(t=60){const a=[],e=new Set;return Object.keys(c.days).sort().reverse().forEach(s=>{(c.days[s]&&c.days[s].tasks||[]).forEach(n=>{if(!n||n.done)return;const r=String(n.title||"").trim();if(!r)return;const o=r.toLowerCase();e.has(o)||(e.add(o),a.push({title:r,category:n.category,points:Number(n.points)||0,date:s}))})}),a.slice(0,t)},addGoalItem(t,a){const e=c.goals.find(i=>i.id===t);if(!e||e.kind!=="task-list")return{ok:!1,reason:"No such goal"};if(e.locked||e.terminated)return{ok:!1,reason:"This goal is locked — unlock it first"};const s=String(a||"").trim().slice(0,120);return s?e.tasks.length>=100?{ok:!1,reason:"Goal list is full (100 tasks)"}:(e.tasks.push({id:X("gt"),title:s,done:!1,doneAt:null}),w(),{ok:!0}):{ok:!1,reason:"Type a task first"}},addGoalItems(t,a){const e=c.goals.find(n=>n.id===t);if(!e||e.kind!=="task-list")return{ok:!1,reason:"No such goal"};if(e.locked||e.terminated)return{ok:!1,reason:"This goal is locked — unlock it first"};const s=new Set(e.tasks.map(n=>n.title.toLowerCase())),i=[];return(Array.isArray(a)?a:[]).forEach(n=>{const r=String(n||"").trim().slice(0,120);if(!r)return;const o=r.toLowerCase();s.has(o)||e.tasks.length>=100||(s.add(o),e.tasks.push({id:X("gt"),title:r,done:!1,doneAt:null}),i.push(r))}),w(),{ok:!0,added:i.length}},removeGoalItem(t,a){const e=c.goals.find(s=>s.id===t);return!e||e.kind!=="task-list"||e.locked?{ok:!1,reason:"Unlock the goal to edit its tasks"}:(e.tasks=e.tasks.filter(s=>s.id!==a),w(),{ok:!0})},setGoalItemDone(t,a,e){const s=c.goals.find(o=>o.id===t);if(!s||s.kind!=="task-list")return{ok:!1,reason:"No such goal"};if(s.locked)return{ok:!1,reason:"Unlock the goal to edit its tasks"};const i=s.tasks.find(o=>o.id===a);if(!i)return{ok:!1,reason:"No such task in the goal"};i.done=!!e,i.doneAt=e?new Date().toISOString():null;const n=this._refreshTaskListGoal(s);let r=[];return n&&(r=this.checkGoals()),w(),{ok:!0,autoLocked:n,awarded:r}},setGoalLocked(t,a){const e=c.goals.find(s=>s.id===t);return!e||e.kind!=="task-list"?{ok:!1,reason:"No such goal"}:(a?(e.locked=!0,e.tasks.length>0&&e.tasks.every(i=>i.done)||(e.terminated=!0)):e.locked=!1,w(),{ok:!0})},_refreshTaskListGoal(t){return t.tasks.length>0&&t.tasks.every(e=>e.done)&&!t.locked?(t.locked=!0,!0):!1},removeBadge(t){c.badges=c.badges.filter(a=>a.id!==t),w()},perfectDaysCount(){return ot(()=>Object.keys(c.days).filter(t=>{const a=this.scoreFor(t);return a.max>0&&a.percent===100}).length)},taskStreak(t,a){let e=a,s=0;(r=>{const o=c.days[r];return!o||!Array.isArray(o.tasks)?!1:o.tasks.some(d=>d.sourcePinId===t&&d.done)})(e)||(e=$t(e));let n=0;for(;s<400;){s+=1;const r=c.days[e];if(!r||!Array.isArray(r.tasks))break;if(r.tasks.some(o=>o.sourcePinId===t&&o.done)){n+=1,e=$t(e);continue}break}return n},goalProgress(t,a){const e=a||B();if(t.kind==="habit-streak"){const i=this.habitStreak(t.targetId,e);return{current:i,target:t.targetDays,done:i>=t.targetDays}}if(t.kind==="task-streak"){const i=this.taskStreak(t.targetId,e);return{current:i,target:t.targetDays,done:i>=t.targetDays}}if(t.kind==="task-list"){const i=t.tasks||[],n=i.filter(r=>r.done).length;return{current:n,target:Math.max(i.length,1),done:i.length>0&&n===i.length}}const s=this.perfectDaysCount();return{current:s,target:t.targetDays,done:s>=t.targetDays}},checkGoals(t){const a=t||B();let e=[];return c.goals.forEach(s=>{if(c.badges.some(n=>n.goalId===s.id))return;if(this.goalProgress(s,a).done){const n={id:X("b"),goalId:s.id,title:s.title,tier:s.tier,rewardTitle:s.rewardTitle,earnedAt:new Date().toISOString()};c.badges.push(n),e.push(n)}}),e.length&&w(),e},scoreFor(t){return ot(()=>this._scoreFor(t))},_scoreFor(t){const a=this.getDay(t),e=this.getHabits(t),s=this.isLocked(t),i=c.settings.showConscious!==!1,n=e.reduce((S,y)=>{const D=this.habitRating(t,y.id);return S+Math.round(y.points*D/5)},0),r=i?e.reduce((S,y)=>S+(this.habitRating(t,y.id)>0?V(y.consciousPoints):0),0):0,o=a.tasks.reduce((S,y)=>S+(y.done?y.points:0),0),d=e.reduce((S,y)=>S+y.points,0),l=i?e.reduce((S,y)=>S+V(y.consciousPoints),0):0,m=a.tasks.reduce((S,y)=>S+y.points,0),h=n+r+o,p=d+l+m,k=e.filter(S=>a.habitMissed&&a.habitMissed[S.id]?!0:s&&this.habitRating(t,S.id)<=0).length,x=a.tasks.filter(S=>S.done?!1:S.missed===!0?!0:S.missed===!1?!1:s).length;return{earned:h,max:p,habitScore:n,consciousScore:r,maxConscious:l,taskScore:o,completedHabits:e.filter(S=>this.habitRating(t,S.id)>0).length,habitAvg:e.length?Math.round(e.reduce((S,y)=>S+this.habitRating(t,y.id),0)/e.length*10)/10:0,totalHabits:e.length,completedTasks:a.tasks.filter(S=>S.done).length,totalTasks:a.tasks.length,missedHabits:k,missedTasks:x,percent:p?Math.round(h/p*100):0,locked:s,submittedAt:a.submittedAt}},monthKeys(t){const a=String(t).slice(0,7);return Object.keys(c.days).filter(e=>e.startsWith(a)).sort()},rangeKeys(t,a){const e=[],s=new Date(`${t}T00:00:00`),i=new Date(`${a}T00:00:00`);let n=0;for(;s<=i&&n<732;)n+=1,e.push(B(s)),s.setDate(s.getDate()+1);return e},resolveRange(t,a){if(t==="day")return[a,a];if(t==="week"){const s=new Date(`${a}T00:00:00`),i=new Date(s);i.setDate(s.getDate()-(s.getDay()-this.getWeekStart()+7)%7);const n=new Date(i);return n.setDate(i.getDate()+6),[B(i),B(n)]}if(t==="month"){const[s,i]=a.split("-").map(Number),n=`${s}-${String(i).padStart(2,"0")}-01`,r=new Date(s,i,0).getDate(),o=`${s}-${String(i).padStart(2,"0")}-${String(r).padStart(2,"0")}`;return[n,o]}if(t==="year"){const s=a.slice(0,4);return[`${s}-01-01`,`${s}-12-31`]}const e=Object.keys(c.days).sort();return e.length?[e[0],e[e.length-1]>a?e[e.length-1]:a]:[a,a]},exportRows(t,a){return ot(()=>this._exportRows(t,a))},_exportRows(t,a){return this.rangeKeys(t,a).map(e=>{const s=this.getDay(e),i=this.getHabits(e),n=this.scoreFor(e),r=this.isLocked(e),o=(l,m)=>m>0?"done":r?"missed":"pending",d=l=>l.done?"done":r?"missed":"pending";return{date:e,earned:n.earned,max:n.max,percent:n.percent,habitScore:n.habitScore,consciousScore:n.consciousScore||0,taskScore:n.taskScore,locked:r,missedHabits:n.missedHabits||0,missedTasks:n.missedTasks||0,note:s.note||"",habits:i.map(l=>{const m=this.habitRating(e,l.id);return{name:l.name,description:String(l.description||""),category:nt(L(l.category)),tags:C(l.tags),points:l.points,consciousPoints:this.consciousEnabled()?V(l.consciousPoints):0,rating:m,earned:Math.round(l.points*m/5)+(m>0&&this.consciousEnabled()?V(l.consciousPoints):0),status:o(l.id,m)}}),tasks:s.tasks.map(l=>({title:l.title,category:nt(L(l.category)),tags:C(l.tags),points:l.points,rating:Math.max(0,Math.min(5,Number(l.rating)||0)),done:!!l.done,earned:l.done?l.points:0,status:l.forwardedFrom?`forwarded from ${l.forwardedFrom}`:d(l),forwardedFrom:l.forwardedFrom||"",forwardedTo:Array.isArray(l.forwardedTo)?l.forwardedTo:[],description:l.description||"",hasImage:!!l.image}))}})},history(t=14){return ot(()=>Object.keys(c.days).sort().reverse().slice(0,t).map(e=>({date:e,...this.scoreFor(e),note:c.days[e].note,locked:lt(e),submittedAt:c.days[e].submittedAt})))},week(t){return ot(()=>{const a=new Date(t);return a.setDate(a.getDate()-(a.getDay()-this.getWeekStart()+7)%7),a.setHours(0,0,0,0),Array.from({length:7},(e,s)=>{const i=new Date(a);i.setDate(a.getDate()+s);const n=B(i),r=c.days[n];return{date:n,label:i.toLocaleDateString(void 0,{weekday:"short"}),dayOfMonth:i.getDate(),hasRecord:!!r,note:String(r&&r.note||""),locked:lt(n),...this.scoreFor(n)}})})}};function ca(t){return t>=90?"Excellent":t>=75?"Great day":t>=50?"Keep going":t>0?"Started":"No score yet"}function U(t){return new Date(`${t}T00:00:00`).toLocaleDateString(void 0,{weekday:"long",month:"short",day:"numeric"})}function Ka(t){return t?new Date(t).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}):""}function Yt(t){return t>=5?"Excellent":t>=4?"Great":t>=3?"Good":t>=2?"Fair":t>=1?"Low":"Not rated"}const oe=document.getElementById("app"),ua="daily-report-2026-10-31T13-05-47-mvwezfbr",Oe=`v1.1 — Auto-update · Offline · Backup (${ua.slice(-8)})`;let v=u.todayKey(),H="today",A=null,$=null,Q=!1,ut=!1;const jt=new Set;let pt=!1,Vt=!1,ht=null,rt=!1,Jt=!1,he=null,dt="Idle.",J="week",Z="all",et=0,Qt=null,_="month",Xt=null,R=[],it=0,N=null,E="boot",gt=null;const ct=new Set,yt=new Map;let Dt=!1,Bt="all",K="short",vt="1 Week";const xt=new Set;let Ft=null;const Gt=new Set;window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),ht=t});window.addEventListener("appinstalled",()=>{ht=null,f("Daily Report installed"),b()});const ti=[["default","Default"],["points","Points"],["category","Category"],["tags","Tags"],["custom","Custom"]];function je(t){const a=new Date(`${v}T00:00:00`);a.setDate(a.getDate()+t),v=u.todayKey(a)}let re=u.todayKey();function Se(){const t=u.todayKey();if(t===re)return!1;const a=re;return re=t,v===a&&(v=t),Qt=null,Xt=null,R=[],it=0,et=0,!0}function P(t){return{home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z"/></svg>',profile:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/></svg>',history:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8v5l3 2"/><circle cx="12" cy="12" r="9"/></svg>',settings:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H8a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V8c.3.7.9 1.2 1.6 1.3H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1.7z"/></svg>',pin:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4h6l-1 7 3 3v2H7v-2l3-3z" fill="currentColor" stroke="none"/><path d="M12 16v5"/></svg>',forward:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',swap:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h13l-3.5-3.5M20 16H7l3.5 3.5"/></svg>',undo:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h11a5 5 0 0 1 0 10H8"/><path d="M8 5 4 9l4 4"/></svg>',habit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h10M4 17h13"/></svg>',archive:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h18v4H3zM5 11v9h14v-9M9.5 15h5"/></svg>',trash:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg>',grip:'<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><circle cx="9" cy="6" r="1.7"/><circle cx="15" cy="6" r="1.7"/><circle cx="9" cy="12" r="1.7"/><circle cx="15" cy="12" r="1.7"/><circle cx="9" cy="18" r="1.7"/><circle cx="15" cy="18" r="1.7"/></svg>'}[t]}function pa(t,a,e){return`
    <div class="stars" data-habit="${t}">
      ${[1,2,3,4,5].map(s=>`
            <button type="button" class="star ${s<=a?"on":""}" data-action="rate-habit" data-id="${t}" data-rating="${s}" ${e?"disabled":""} aria-label="${s} star">★</button>
          `).join("")}
    </div>
  `}function ma(t,a,e){return`
    <div class="stars stars-small" data-task="${t}">
      ${[1,2,3,4,5].map(s=>`
            <button type="button" class="star small ${s<=a?"on":""}" data-action="rate-task" data-id="${t}" data-rating="${s}" ${e?"disabled":""} aria-label="${s} star">★</button>
          `).join("")}
    </div>
  `}function ga(t){const a=Number(t)||0;return a?`<span class="conscious-badge">🧠 +${a}</span>`:'<span class="item-meta">No conscious pts</span>'}const ei=["mentally","psychology","physically","spiritually","socially"];function mt(t){const e=u.getCategories().find(n=>n.id===t),s=e&&e.color?e.color:O(t);return`<span class="cat-badge ${ei.includes(t)?`cat-${t}`:"cat-custom"}" style="background:${s}22;color:${s};box-shadow:inset 0 0 0 1px ${s}55">${g(nt(t))}</span>`}function be(t){const a=String(t||"");if(!a)return"Deleted";const e=new Date(a);return Number.isNaN(e.getTime())?"Deleted":`Deleted ${e.toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}`}const Be={mentally:"#5b8cff",psychology:"#a06bff",physically:"#22b07d",spiritually:"#e8a51c",socially:"#14b8a6"},Fe=["#f472b6","#38bdf8","#fb923c","#a3e635","#facc15","#e879f9"];function O(t,a){const s=u.getCategories().find(i=>i.id===t);return s&&s.color?s.color:Be[t]?Be[t]:Fe[(a??0)%Fe.length]}function st(t){const a=Array.isArray(t)?t.filter(Boolean):[];return a.length?`<div class="tag-row">${a.map(e=>`<span class="tag-chip">#${g(e)}</span>`).join("")}</div>`:""}function fa(t){return!t||!t.image?"":`<button type="button" class="task-img-thumb" data-action="view-task-image" data-id="${t.id}" aria-label="View attached photo"><img src="${t.image}" alt="Task photo" loading="lazy" /></button>`}function ha(t){const a=String(t||"");if(!a.trim())return"";const e=a.split(`
`),s=/^\s*(?:•|-|[*])\s+(.*)$/,i=/^\s*\d+[.)]\s+(.*)$/;let n="",r=null;const o=()=>{r&&(n+=r==="ul"?"</ul>":"</ol>",r=null)};return e.forEach(d=>{const l=s.exec(d),m=!l&&i.exec(d);l?(r!=="ul"&&(o(),n+='<ul class="note-list">',r="ul"),n+=`<li>${g(l[1])||"&nbsp;"}</li>`):m?(r!=="ol"&&(o(),n+='<ol class="note-list">',r="ol"),n+=`<li>${g(m[1])||"&nbsp;"}</li>`):d.trim()?(o(),n+=`<p class="note-text">${g(d)}</p>`):(o(),n+='<p class="note-text">&nbsp;</p>')}),o(),n}function ai(t){const a=ha(t);return a?`<div class="note" style="margin-top:10px">${a}</div>`:""}function Ct(t){return String(t||"").split(`
`).map(a=>a.replace(/^\s*(?:•|-|\*|\d+[.)])\s*/,"").trim()).filter(Boolean)}function Pt(t){return t.map(a=>`• ${a}`).join(`
`)}function Ge(t,a){const e=String(t||"").split(`
`).map(s=>s.replace(/^\s*(?:•|-|\*)\s+/,"").trim()).filter(Boolean);return e.length?`<ul class="note-list idea-list">${e.map((s,i)=>`
        <li>
          <span>${g(s)}</span>
          ${a?"":`<button class="idea-remove" data-action="remove-idea" data-index="${i}" title="Remove idea" aria-label="Remove idea">✕</button>`}
        </li>`).join("")}</ul>`:""}function ba(t,a,e){if(!t||t.disabled)return;const s=t.value||"",i=s.split(`
`),n=s.slice(0,t.selectionStart).split(`
`).length-1,r=s.slice(0,t.selectionEnd).split(`
`).length-1,o=t.selectionStart!==t.selectionEnd,d=o?n:0,l=o?r:i.length-1;if(a==="bullets"){const m=i.slice(d,l+1).every(h=>/^\s*(?:•|-|[*])\s+/.test(h)||!h.trim());for(let h=d;h<=l;h++)i[h].trim()&&(m?i[h]=i[h].replace(/^\s*(?:•|-|[*])\s+/,""):/^\s*(?:•|-|[*])\s+/.test(i[h])||(i[h]=`• ${i[h].replace(/^\s*/,"")}`))}else{const m=i.slice(d,l+1).every(p=>/^\s*\d+[.)]\s+/.test(p)||!p.trim());let h=1;for(let p=d;p<=l;p++){if(!i[p].trim())continue;const k=i[p].replace(/^\s*(?:\d+[.)]|•|-|[*])\s+/,"").replace(/^\s*/,"");i[p]=m?k:`${h}. ${k}`,h+=1}}t.value=i.join(`
`),e&&e(t.value);try{t.focus()}catch{}}function _e(t){ba(document.getElementById("day-note"),t,a=>u.setNote(v,a))}function qe(t){ba(document.getElementById("profile-values"),t,a=>u.setProfileField("values",a))}function ii(t){return new Promise(a=>{if(!t||!String(t.type||"").startsWith("image/"))return a(null);const e=URL.createObjectURL(t),s=new Image,i=()=>{try{URL.revokeObjectURL(e)}catch{}},n=(r,o)=>new Promise(d=>{let l=s.naturalWidth||0,m=s.naturalHeight||0;if(!l||!m)return d(null);const h=Math.min(1,r/Math.max(l,m));l=Math.max(1,Math.round(l*h)),m=Math.max(1,Math.round(m*h));const p=document.createElement("canvas");p.width=l,p.height=m;try{p.getContext("2d").drawImage(s,0,0,l,m),d(p.toDataURL("image/jpeg",o))}catch{d(null)}});s.onload=async()=>{try{let r=await n(900,.72);r&&r.length>Ot&&(r=await n(600,.62)),r&&r.length>Ot&&(r=await n(400,.55)),i(),a(r&&r.length<=Ot?r:null)}catch{i(),a(null)}},s.onerror=()=>{i(),a(null)},s.src=e})}function We(t,a){return`
    <select class="sort-select" data-sort-kind="${t}" aria-label="Sort ${t}">
      ${ti.map(([e,s])=>`<option value="${e}" ${a===e?"selected":""}>${s}</option>`).join("")}
    </select>
  `}function si(t){const a=u.getBadges(),e=u.topBadges(3),s=t.max>0&&t.percent===100,i=Vt?a:e;return`
    <section class="section rewards-section">
      <div class="section-head">
        <h2>Rewards</h2>
        ${a.length>3?`<button class="ghost-btn compact" data-action="toggle-badges">${Vt?"Show less":`More (${a.length}) ›`}</button>`:""}
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
      ${a.length?`
        <div class="rewards-grid">
          ${i.map(n=>`
            <article class="reward-card tier-${n.tier}">
              <div class="reward-medal">${qt(n.tier)}</div>
              <div>
                <div class="item-title">${g(n.rewardTitle||n.title)}</div>
                <div class="item-meta">${g(n.title)} · ${ia(n.tier)} · ${U((n.earnedAt||"").slice(0,10))}</div>
              </div>
            </article>
          `).join("")}
        </div>
      `:'<div class="empty">No rewards yet. Set a goal in Settings → Goals &amp; Rewards.</div>'}
    </section>
  `}function Zt(t){return`<span class="streak-badge">${t} day streak</span>`}function ya(t){return t?`<span class="forward-badge from">↩ Forwarded from ${g(t)}</span>`:""}function Kt(t){const a=Array.isArray(t)?t.filter(Boolean):[];return a.length?`<span class="forward-badge to">↪ Forwarded to ${g(a[a.length-1])}</span>`:""}function va(t){return t?`<span class="forward-badge replace from">⇄ Replaced from ${g(t)}</span>`:""}function ni(t){const a=u.getAllHabits().map(e=>({habit:e,to:u.habitReplacedTo(v,e.id)})).filter(e=>e.to);return a.length?`
    <div class="replaced-away">
      ${a.map(({habit:e,to:s})=>`
        <button type="button" class="forward-badge replace undo" data-action="undo-replace-habit" data-id="${e.id}" data-from="${v}" data-to="${s}" ${t?"disabled":""} title="${t?"Unlock the day to undo this":`Put ${g(e.name)} back on ${g(v)}`}">
          ⇄ ${g(e.name)} → ${g(s)}
        </button>`).join("")}
    </div>
  `:""}function ka(t,a){if(a)return`<button class="mini-btn" data-action="open-replace-habit" data-id="${t}" disabled title="Unlock the day to replace it">${P("swap")}</button>`;const e=u.habitReplaceDays(v,t);if(!e.allowed){const s=u.findHabit(t),i=s&&s.pin&&s.pin.mode==="forever"?"Pinned forever — no replace option":"No replace days before its next due day";return`<button class="mini-btn" data-action="open-replace-habit" data-id="${t}" disabled title="${i}">${P("swap")}</button>`}return`<button class="mini-btn" data-action="open-replace-habit" data-id="${t}" title="Replace this day with one of the ${e.days.length} day${e.days.length===1?"":"s"} before ${e.next}">${P("swap")}</button>`}function oi(t){const a=new Date(`${t}T00:00:00`);return a.setDate(a.getDate()+1),u.todayKey(a)}function ye(){return`<button class="ghost-btn compact ${Q?"on":""}" data-action="toggle-edit">${Q?"Done":"Edit Mode"}</button>`}function ri(t){return t?'<span class="lock-badge">Locked</span>':'<span class="open-badge">Open</span>'}function di(){u.checkGoals(v);const t=u.getDay(v),a=u.getSettings(),e=a.showConscious!==!1,s=u.getHabits(v),i=u.getTasks(v),n=u.scoreFor(v),r=ca(n.percent),o=v===u.todayKey(),d=u.isLocked(v);return`
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

    <section class="score-hero ${d?"is-locked":""}">
      <div class="score-row">
        <div>
          <div class="score-value">${n.earned}</div>
          <div class="score-unit">of ${n.max||0} points</div>
        </div>
        <div class="hero-side">
          ${ri(d)}
          <div class="grade-pill">${r}</div>
        </div>
      </div>
      <div class="progress-track"><div class="progress-fill" style="width:${n.percent}%"></div></div>
      <div class="stats-grid ${e?"stats-4":"stats-3"}">
        <div class="stat"><span class="muted">Habits</span><b>${n.completedHabits}/${n.totalHabits}</b></div>
        <div class="stat"><span class="muted">Tasks</span><b>${n.completedTasks}/${n.totalTasks}</b></div>
        ${e?`<div class="stat"><span class="muted">Conscious</span><b>+${n.consciousScore||0}</b></div>`:""}
        <div class="stat"><span class="muted">Score</span><b>${n.percent}%</b></div>
      </div>
      <p class="lock-hint">
        ${d?`Submitted${t.submittedAt?` at ${Ka(t.submittedAt)}`:""}.${(n.missedHabits||0)+(n.missedTasks||0)>0?` ${(n.missedHabits||0)+(n.missedTasks||0)} missed (${n.missedHabits||0} habits, ${n.missedTasks||0} tasks) — unchecked items count as missed.`:" Nothing missed — all done."} Unlock in Settings to edit.`:`Auto-locks at ${a.lockTime}. Submit when the day is done. Unchecked items will count as missed once locked.`}
      </p>
      ${d?'<button class="ghost-btn full" data-action="goto-settings">Unlock in Settings</button>':'<button class="primary-btn full" data-action="submit-day">Submit and lock report</button>'}
      <div class="export-row">
        <span class="muted">Export:</span>
        <button class="ghost-btn compact" data-action="open-export">Excel / JSON / PDF</button>
      </div>
    </section>

    ${si(n)}

    <section class="section">
      <div class="section-head">
        <h2>Habits</h2>
        <div class="head-actions">
          ${We("habit",a.habitSort||"default")}
          ${ye()}
          <span class="points">+${n.habitScore}${e&&n.consciousScore?` +${n.consciousScore}🧠`:""} pts</span>
        </div>
      </div>
      ${["default","custom"].includes(a.habitSort||"default")&&s.length>1?'<p class="muted tight">Hold the grip button on a card, then drag it to a new spot.</p>':""}
      <div class="list">
        ${s.length?s.map(l=>{const m=u.habitRating(v,l.id),h=m>0,p=!h&&d,k=u.habitStreak(l.id,v),x=e&&Number(l.consciousPoints)||0;return`
                    <article class="item-card ${h?"done":""} ${p?"missed":""} ${d?"is-locked":""}" style="border-left:3px solid ${O(l.category)}" data-sortable="habit" data-id="${l.id}">
                      <button class="check" data-action="toggle-habit" data-id="${l.id}" ${d?"disabled":""}>✓</button>
                      <div class="item-body">
                        <div class="item-title">${g(l.name)} ${p?'<span class="missed-badge">Missed</span>':""}</div>
                        <div class="item-meta">${mt(l.category)} ${l.pin?bt(l.pin):"Not pinned"} · ${m?`${m}/5 ${Yt(m)}`:d?"Missed":"Not rated"}</div>
                        ${l.description?`<p class="item-desc">${g(l.description)}</p>`:""}
                        ${e?`<div class="item-meta">${Zt(k)} ${ga(x)}</div>`:`<div class="item-meta">${Zt(k)}</div>`}
                        ${Kt(u.habitForwardedTo(v,l.id))}
                        ${va(u.habitReplacedFrom(v,l.id))}
                        ${st(l.tags)}
                        ${pa(l.id,m,d)}
                      </div>
                      <div class="item-side">
                        <div class="points">+${l.points}${x?` +${x}🧠`:""}</div>
                      </div>
                      <div class="item-actions">
                        <button class="drag-handle" aria-label="Hold and drag to reorder" title="Hold and drag to reorder" ${d?"disabled":""}>${P("grip")}</button>
                        <div class="mini-actions">
                          ${Q?`<button class="mini-btn on" data-action="open-edit-habit" data-id="${l.id}" ${d?"disabled":""}>Edit</button>`:""}
                          ${ka(l.id,d)}
                          <button class="mini-btn ${l.pin?"on":""}" data-action="open-pin-habit" data-id="${l.id}" ${d?"disabled":""} title="Pin habit">${P("pin")}</button>
                          <button class="mini-btn" data-action="archive-habit" data-id="${l.id}" ${d?"disabled":""} title="Archive habit" aria-label="Archive habit">${P("archive")}</button>
                        </div>
                      </div>
                    </article>
                  `}).join(""):'<div class="empty">No habits for this day. Tap + to add one.</div>'}
      </div>
      ${ni(d)}
    </section>

    <section class="section">
      <div class="section-head">
        <h2>Tasks</h2>
        <div class="head-actions">
          ${We("task",a.taskSort||"default")}
          ${ye()}
          <span class="points">+${n.taskScore} pts</span>
        </div>
      </div>
      ${["default","custom"].includes(a.taskSort||"default")&&i.length>1?'<p class="muted tight">Hold the grip button on a card, then drag it to a new spot.</p>':""}
      <div class="list">
        ${i.length?i.map(l=>{const m=!!l.sourcePinId,h=m?u.findPinnedTask(l.sourcePinId):null,p=Math.max(0,Math.min(5,Number(l.rating)||0)),k=!l.done&&d;return`
                    <article class="item-card ${l.done?"done":""} ${k?"missed":""} ${d?"is-locked":""}" style="border-left:3px solid ${O(l.category)}" data-sortable="task" data-id="${l.id}">
                      <button class="check" data-action="toggle-task" data-id="${l.id}" ${d?"disabled":""}>✓</button>
                      <div class="item-body">
                        <div class="item-title">${g(l.title)} ${k?'<span class="missed-badge">Missed</span>':""}</div>
                        <div class="item-meta">${mt(l.category)} ${h?bt(h.pin):"One-time task"} · ${l.done?"Done":d?"Missed":"Pending"} · ${p?`${p}/5 ${Yt(p)}`:"No rating"}</div>
                        ${l.description?`<p class="item-desc">${g(l.description)}</p>`:""}
                        ${ya(l.forwardedFrom)}
                        ${Kt(l.forwardedTo)}
                        ${st(l.tags)}
                        ${l.image?'<span class="task-img-badge">📷 Photo attached</span>':""}
                        ${fa(l)}
                        ${ma(l.id,p,d)}
                      </div>
                      <div class="item-side">
                        <div class="points">+${l.points}</div>
                      </div>
                      <div class="item-actions">
                        <button class="drag-handle" aria-label="Hold and drag to reorder" title="Hold and drag to reorder" ${d?"disabled":""}>${P("grip")}</button>
                        <div class="mini-actions">
                          ${Q?`<button class="mini-btn on" data-action="open-edit-task" data-id="${l.id}" ${d?"disabled":""}>Edit</button>`:""}
                          <button class="mini-btn" data-action="open-forward-task" data-id="${l.id}" ${d?"disabled":""} title="Forward task to another day">${P("forward")}</button>
                          <button class="mini-btn ${m?"on":""}" data-action="open-pin-task" data-id="${l.id}" ${d?"disabled":""} title="Pin task">${P("pin")}</button>
                          <button class="mini-btn" data-action="archive-task" data-id="${l.id}" ${d?"disabled":""} title="Archive task" aria-label="Archive task">${P("archive")}</button>
                          ${Q?`<button class="mini-btn danger" data-action="remove-task" data-id="${l.id}" ${d?"disabled":""} title="Delete task" aria-label="Delete task">${P("trash")}</button>`:""}
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

    ${li()}
  `}function li(){const t=u.getArchivedHabits(),a=u.getArchivedTasks(),e=t.length+a.length,s=[...a.map(i=>`
      <article class="manage-card archived" style="border-left:4px solid ${O(i.category)}">
        <div class="section-head">
          <div>
            <div class="item-title">${g(i.title)} <span class="archive-kind">Task</span></div>
            <div class="item-meta">${mt(i.category)} · +${i.points} pts${i.fromDate?` · from ${g(i.fromDate)}`:""}${i.originDate&&i.originDate!==i.fromDate?` · created ${g(i.originDate)}`:""} · ${be(i.archivedAt)}</div>
            ${i.description?`<p class="item-desc">${g(i.description)}</p>`:""}
            ${st(i.tags)}
          </div>
          <div class="mini-actions">
            <button class="mini-btn on" data-action="restore-task" data-id="${i.id}" title="Restore task to the selected day" aria-label="Restore task">${P("undo")}</button>
            ${Q?`<button class="mini-btn danger" data-action="delete-archived-task" data-id="${i.id}" title="Delete permanently" aria-label="Delete permanently">${P("trash")}</button>`:""}
          </div>
        </div>
      </article>
    `),...t.map(i=>`
      <article class="manage-card archived" style="border-left:4px solid ${O(i.category)}">
        <div class="section-head">
          <div>
            <div class="item-title">${g(i.name)} <span class="archive-kind">Habit</span></div>
            <div class="item-meta">${mt(i.category)} · +${i.points} pts${i.pin?` · ${bt(i.pin)}`:" · Pin ended"} · ${be(i.archivedAt)}</div>
            ${i.description?`<p class="item-desc">${g(i.description)}</p>`:""}
            ${st(i.tags)}
          </div>
          <div class="mini-actions">
            <button class="mini-btn on" data-action="restore-habit" data-id="${i.id}" title="Restore habit" aria-label="Restore habit">${P("undo")}</button>
            <button class="mini-btn danger" data-action="delete-archived-habit" data-id="${i.id}" title="Delete permanently" aria-label="Delete permanently">${P("trash")}</button>
          </div>
        </div>
      </article>
    `)];return`
    <section class="section archive-section">
      <button type="button" class="archive-head" data-action="toggle-archive" aria-expanded="${pt}">
        <span class="archive-title">${P("archive")} Archive</span>
        <span class="archive-count">${e}</span>
        <span class="archive-chevron" aria-hidden="true">${pt?"▾":"▸"}</span>
      </button>
      ${pt?`<div class="archive-list">${e?s.join(""):'<div class="empty">Nothing archived yet. Use the archive button on a habit or task to set it aside here.</div>'}</div>`:""}
    </section>
  `}function _t(t){return t==="short"?"#short":t==="medium"?"#medium":"#long"}function ci(){const t=u.getProfile(),a=!!t.locked,e=a?"disabled":"",s=Array.isArray(t.whoAmI)?t.whoAmI:[],i=Array.isArray(t.lifeAreas)?t.lifeAreas:[],n=Array.isArray(t.pGoals)?t.pGoals:[],r=Array.isArray(t.quotes)?t.quotes:[],o=u.profileGoalDurations();o[K].includes(vt)||(vt=o[K][0]);const d=y=>n.filter(D=>D.term===y).length,l=(Bt==="all"?n:n.filter(y=>y.term===Bt)).slice().sort((y,D)=>String(y.createdAt).localeCompare(String(D.createdAt))),m=r.slice().sort((y,D)=>!!y.fav!=!!D.fav?y.fav?-1:1:String(D.createdAt).localeCompare(String(y.createdAt))),h=m.slice(0,3),p=m.slice(3),k=String(t.name||"?").trim().slice(0,1).toUpperCase()||"?",S=String(t.ideas||"").split(`
`).map(y=>y.replace(/^\s*(?:•|-|\*)\s+/,"").trim()).filter(Boolean).length;return`
    <div class="topbar">
      <div>
        <p class="kicker">Profile</p>
        <h1>${g(t.name)||"My profile"}</h1>
      </div>
      <div class="date-nav">
        ${a?'<span class="lock-badge">🔒 Locked</span>':'<span class="open-badge">Open</span>'}
        <button class="ghost-btn compact" data-action="${a?"unlock-profile":"lock-profile"}">${a?"Unlock":"Lock"}</button>
      </div>
    </div>

    ${a?'<div class="profile-lock-banner">🔒 Profile is locked — read only. Tap <b>Unlock</b> to edit.</div>':'<p class="muted tight" style="margin-bottom:14px">Everything here saves automatically on this device and is included in backups. Tap <b>Lock</b> when your profile is final.</p>'}

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
        <input data-profile="name" maxlength="80" value="${g(t.name)}" placeholder="Your name…" ${e} />
      </label>
      <label>Want to be
        <textarea data-profile="wantToBe" maxlength="1000" placeholder="The person I want to be…" style="min-height:76px" ${e}>${g(t.wantToBe)}</textarea>
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
      ${a?"":`
        <div style="display:flex;gap:8px;margin-bottom:10px">
          <input id="new-whoami" maxlength="120" placeholder="e.g. A disciplined father…" style="flex:1;min-width:0" />
          <button class="primary-btn compact-btn" data-action="add-whoami">Add</button>
        </div>
      `}
      <div class="habit-manage">
        ${s.length?s.map((y,D)=>`
          <article class="manage-card whoami-row">
            <span class="whoami-num">${D+1}</span>
            <input class="whoami-input" data-whoami="${y.id}" maxlength="120" value="${g(y.text)}" ${e} aria-label="Who I am ${D+1}" />
            ${a?"":`
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
      ${a?"":`
        <div style="display:flex;gap:8px;margin-bottom:10px">
          <input id="new-lifearea" maxlength="60" placeholder="e.g. Health, Family, Career…" style="flex:1;min-width:0" />
          <button class="primary-btn compact-btn" data-action="add-lifearea">Add</button>
        </div>
      `}
      ${i.length?`
        <div class="life-grid">
          ${i.map((y,D)=>{const It=gt===y.id;return`
              <article class="life-card ${It?"open":""}">
                <div class="life-head">
                  <button type="button" class="life-toggle" data-action="toggle-lifearea" data-id="${y.id}" aria-expanded="${It?"true":"false"}">
                    <b>${g(y.title)}</b>
                    <span>${It?"▾":"▸"}</span>
                  </button>
                  ${a?"":`
                    <div class="mini-actions">
                      <button class="mini-btn" data-action="move-lifearea" data-id="${y.id}" data-dir="-1" ${D===0?"disabled":""} title="Move up">↑</button>
                      <button class="mini-btn" data-action="move-lifearea" data-id="${y.id}" data-dir="1" ${D===i.length-1?"disabled":""} title="Move down">↓</button>
                    </div>
                  `}
                </div>
                ${It?`
                  <div class="life-body">
                    ${a?y.description?`<p class="item-desc">${g(y.description)}</p>`:'<p class="item-meta">No description yet.</p>':`
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
        <textarea data-profile="vision" maxlength="1000" placeholder="Describe your vision…" style="min-height:110px" ${e}>${g(t.vision)}</textarea>
      </section>
      <section class="manage-card">
        <h2>Core &amp; Personal Values</h2>
        <p class="muted tight">The principles you live by — one per line.</p>
        ${a?t.values.trim()?`<div class="values-list">${ha(t.values)}</div>`:'<p class="item-meta">No values yet.</p>':`
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
      ${a?S?Ge(t.ideas,!0):'<p class="item-meta">No ideas yet.</p>':`
          <div class="form" style="margin-bottom:10px">
            <label>New idea
              <input id="new-idea" maxlength="200" placeholder="e.g. Build a habit tracker app" />
            </label>
            <div style="display:flex;gap:8px">
              <button class="primary-btn compact-btn" data-action="add-idea">Add idea</button>
            </div>
          </div>
          ${S?`${Ge(t.ideas,!1)}
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
      ${a?"":`
        <div class="form" style="margin-bottom:10px">
          <label>Goal
            <input id="new-pgoal" maxlength="200" placeholder="e.g. Read 12 books…" />
          </label>
          <div>
            <p class="item-meta">Hashtag it</p>
            <div class="chip-row">
              ${["short","medium","long"].map(y=>`<button type="button" class="chip hashtag-${y} ${K===y?"on":""}" data-action="set-pgoal-term" data-term="${y}">${_t(y)}</button>`).join("")}
            </div>
          </div>
          <div class="row-2">
            <label>Timeframe
              <select id="new-pgoal-duration">
                ${o[K].map(y=>`<option value="${g(y)}" ${vt===y?"selected":""}>${g(y)}</option>`).join("")}
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
        ${[["all",`All (${n.length})`],["short",`#short (${d("short")})`],["medium",`#medium (${d("medium")})`],["long",`#long (${d("long")})`]].map(([y,D])=>`<button type="button" class="chip ${Bt===y?"on":""}" data-action="set-pgoal-filter" data-filter="${y}">${D}</button>`).join("")}
      </div>
      <div class="habit-manage">
        ${l.length?l.map(y=>`
          <article class="manage-card pgoal-card term-${y.term}">
            <div class="pgoal-top">
              <span class="hashtag hashtag-${y.term}">${_t(y.term)}</span>
              <span class="duration-pill">⏳ ${g(y.duration)}</span>
              ${a?"":`<button class="mini-btn" data-action="remove-pgoal" data-id="${y.id}" title="Remove goal">✕</button>`}
            </div>
            ${a?`<div class="item-title" style="margin-top:6px">${g(y.text)}</div>`:`
                <input data-pgoal-text="${y.id}" maxlength="200" value="${g(y.text)}" style="margin-top:8px" aria-label="Goal text" />
                <div class="row-2" style="margin-top:8px">
                  <select data-pgoal-term="${y.id}" aria-label="Goal term">
                    ${["short","medium","long"].map(D=>`<option value="${D}" ${y.term===D?"selected":""}>${_t(D)}</option>`).join("")}
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
      ${a?"":`
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
          ${h.map(y=>Ue(y,a)).join("")}
        </div>
        ${p.length?`
          <button class="ghost-btn compact full" data-action="toggle-quotes">${Dt?"Show less ▴":`More (${p.length}) — see the rest ▾`}</button>
          ${Dt?`<div class="habit-manage" style="margin-top:8px">${p.map(y=>Ue(y,a)).join("")}</div>`:""}
        `:Dt&&!p.length?'<p class="item-meta">No more quotes — that is all of them.</p>':""}
      `:'<div class="empty">No quotes yet — add the words that move you.</div>'}
    </section>
  `}function Ue(t,a){return`
    <article class="manage-card quote-card ${t.fav?"is-fav":""}">
      <p class="quote-text">“${g(t.text)}”</p>
      ${t.author?`<p class="item-meta">— ${g(t.author)}</p>`:""}
      <div class="quote-foot">
        ${a?`<span class="item-meta">${t.fav?"★ Favourite":""}</span>`:`
            <button class="mini-btn ${t.fav?"on":""}" data-action="toggle-quote-fav" data-id="${t.id}" title="Toggle favourite">★</button>
            <button class="mini-btn" data-action="remove-quote" data-id="${t.id}" title="Remove quote">✕</button>
          `}
      </div>
    </article>
  `}function ui(){document.querySelectorAll("[data-profile]").forEach(t=>{t.addEventListener("input",()=>{u.setProfileField(t.dataset.profile,t.value)||b()})}),document.querySelectorAll("[data-lifearea-title]").forEach(t=>{t.addEventListener("change",()=>{u.updateLifeArea(t.dataset.lifeareaTitle,{title:t.value}),b()})}),document.querySelectorAll("[data-lifearea-desc]").forEach(t=>{t.addEventListener("input",()=>{u.updateLifeArea(t.dataset.lifeareaDesc,{description:t.value})})}),document.querySelectorAll("[data-pgoal-text]").forEach(t=>{t.addEventListener("change",()=>{u.updateProfileGoal(t.dataset.pgoalText,{text:t.value}),b()})}),document.querySelectorAll("[data-pgoal-term]").forEach(t=>{t.addEventListener("change",()=>{u.updateProfileGoal(t.dataset.pgoalTerm,{term:t.value}),b()})}),document.querySelectorAll("[data-pgoal-duration]").forEach(t=>{t.addEventListener("change",()=>{u.updateProfileGoal(t.dataset.pgoalDuration,{duration:t.value}),b()})})}function pi(){const t=$a(v,et*7),a=u.week(new Date(`${t}T00:00:00`)),e=a.reduce((n,r)=>n+r.earned,0),s=Math.round(e/7),i=et===0?"This week":et===-1?"1 week back":`${-et} weeks back`;return`
    <section class="section">
      <div class="section-head">
        <h2>Weekly score</h2>
        <div class="date-nav">
          <button class="icon-btn" data-action="week-nav" data-dir="-1" aria-label="Previous week">‹</button>
          <button class="icon-btn" data-action="week-nav" data-dir="1" aria-label="Next week" ${et>=0?"disabled":""}>›</button>
        </div>
      </div>
      <section class="score-hero">
        <div class="score-row">
          <div>
            <div class="score-value">${e}</div>
            <div class="score-unit">points · ${i}</div>
          </div>
          <div class="grade-pill">Avg ${s} pts</div>
        </div>
        <p class="lock-hint week-range">Week starting <b>${U(a[0].date)}</b> · ${a[0].label} – ${a[6].label}, ${U(a[6].date)}</p>
        <div class="week-days">
          ${a.map(n=>`
                <button class="day-cell ${n.date===v?"active":""} ${n.earned>0?"done":""}" data-action="pick-date" data-date="${n.date}" title="${g(n.date)}: ${n.earned} pts">
                  <span>${n.label.slice(0,2)}</span>
                  <b>${n.earned}</b>
                  ${n.locked?'<i class="dot-lock"></i>':""}
                </button>
              `).join("")}
        </div>
      </section>
    </section>
  `}function mi(){const t=Qt||j(v),a=Te(t),e=u.todayKey();return`
    <section class="section">
      <div class="section-head">
        <h2>Reports calendar</h2>
        <div class="date-nav">
          <button class="icon-btn" data-action="history-cal-nav" data-dir="-1" aria-label="Previous month">‹</button>
          <button class="icon-btn" data-action="history-cal-nav" data-dir="1" aria-label="Next month">›</button>
        </div>
      </div>
      <div class="pin-cal">
        <div class="pin-cal-head"><b>${ae(t)}</b></div>
        <div class="pin-cal-grid pin-cal-week">
          ${Ae().map(s=>`<span>${s.label.slice(0,1)}</span>`).join("")}
        </div>
        <div class="pin-cal-grid">
          ${a.map(s=>{if(!s)return"<span></span>";const i=u.scoreFor(s),n=s===v?"on-selected":i.percent>=100?"on-perfect":i.earned>0?"on":"",r=i.locked?'<i class="dot-lock"></i>':"";return`<button type="button" class="pin-cal-day hist-cal-day ${n} ${s===e?"is-today":""}" data-action="pick-date" data-date="${s}" title="${g(s)}: ${i.earned}/${i.max} pts (${i.percent}%)"><b>${Number(s.slice(8,10))}</b><span>${i.earned}</span>${r}</button>`}).join("")}
        </div>
      </div>
    </section>
  `}function gi(t){const a=new Map((t||[]).map(n=>[n.date,n])),e=Xt||j(v),s=Te(e),i=u.todayKey();return`
    <div class="pin-cal">
      <div class="pin-cal-head"><b>${ae(e)}</b><span class="item-meta">${a.size} locked</span></div>
      <div class="pin-cal-grid pin-cal-week">
        ${Ae().map(n=>`<span>${n.label.slice(0,1)}</span>`).join("")}
      </div>
      <div class="pin-cal-grid">
        ${s.map(n=>{if(!n)return"<span></span>";const r=a.get(n),o=!!r,d=R.includes(n)?"on-selected":o?"on-locked":"on-open",l=u.scoreFor(n),m=r?r.earned:l.earned;return`<button type="button" class="pin-cal-day hist-cal-day ${d} ${n===i?"is-today":""}" data-action="toggle-locked-day" data-date="${n}" title="${g(n)}: ${o?"Locked":"Open"} — ${m} pts"><b>${Number(n.slice(8,10))}</b><span>${m}</span></button>`}).join("")}
      </div>
    </div>
  `}function fi(){return`
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
  `}function hi(){const t=u.week(new Date(`${v}T00:00:00`)),a=u.todayKey(),e=`${U(t[0].date)} – ${U(t[6].date)}`,s=t.reduce((r,o)=>r+(o.earned||0),0),i=t.reduce((r,o)=>r+(o.max||0),0),n=t.filter(r=>r.hasRecord).length;return`
    <div class="topbar">
      <div>
        <p class="kicker">Archive</p>
        <h1>Past reports</h1>
      </div>
      <button class="ghost-btn compact" data-action="open-export">Export</button>
    </div>
    ${mi()}
    ${pi()}
    ${fi()}
    <section class="section">
      <div class="section-head">
        <h2>Week</h2>
        <span class="item-meta">${e}</span>
      </div>
      <p class="item-meta">${n} of 7 days reported · ${s} of ${i} pts</p>
      <div class="history-list">
        ${t.map(r=>{const o=!r.hasRecord,d=(r.missedHabits||0)+(r.missedTasks||0),l=o?"No report":`${r.locked?"Locked":"Open"} · ${ca(r.percent)} · ${r.earned}/${r.max} pts (${r.percent}%)${r.locked&&d>0?` · ❌ ${d} missed`:""}`;return`
              <article class="history-card ${o?"is-empty":""} ${r.date===a?"is-today":""} ${r.date===v?"is-selected":""}">
                <div class="section-head">
                  <div>
                    <div class="item-title">${g(r.label)} ${U(r.date)}</div>
                    <div class="item-meta">${g(l)}</div>
                  </div>
                  <button class="ghost-btn compact" data-action="pick-date" data-date="${r.date}">${o?"Add":"Open"}</button>
                </div>
                <div class="bar"><span style="width:${r.percent}%"></span></div>
                ${r.note?ai(r.note):`<p class="item-meta">${o?"Nothing recorded this day.":"No note."}</p>`}
              </article>
            `}).join("")}
      </div>
    </section>
  `}function $a(t,a){const e=new Date(`${t}T00:00:00`);return e.setDate(e.getDate()+a),u.todayKey(e)}function bi(){return J==="month"?`${At(j(v),it)}-15`:J==="year"?`${Number(v.slice(0,4))+it}-06-15`:$a(v,it*7)}function yi(t){const[a,e]=u.resolveRange(J,t);return J==="week"?`${U(a)} – ${U(e)}`:J==="month"?ae(a.slice(0,7)):a.slice(0,4)}function vi(){var l;const t=bi(),a=u.categoryChart(J,t);Z!=="all"&&!a.cats.some(m=>m.id===Z)&&(Z="all");const e=Z==="all"?a.cats:a.cats.filter(m=>m.id===Z),s=Math.max(1,...a.labels.map((m,h)=>e.reduce((p,k)=>p+(a.perCat[k.id]?a.perCat[k.id][h]:0),0))),i=e.reduce((m,h)=>m+(a.totals[h.id]||0),0),n=Z==="all"?"All categories":((l=a.cats.find(m=>m.id===Z))==null?void 0:l.label)||"",r=it===0?J==="week"?"This week":J==="month"?"This month":"This year":yi(t),o=a.labels.map((m,h)=>{const p=e.reduce((x,S)=>x+(a.perCat[S.id]?a.perCat[S.id][h]:0),0),k=e.map(x=>({cat:x,value:a.perCat[x.id]?a.perCat[x.id][h]:0})).filter(x=>x.value>0).map((x,S)=>`<span class="chart-seg" style="height:${Math.max(2,Math.round(x.value/s*100))}%;background:${O(x.cat.id,S)}" title="${g(x.cat.label)}: ${x.value} pts"></span>`).join("");return`
      <div class="chart-col" title="${g(a.titles[h])}: ${p} pts">
        <div class="chart-bar">${k||'<span class="chart-empty"></span>'}</div>
        <span class="chart-x">${g(m)}</span>
      </div>
    `}).join(""),d=e.map((m,h)=>`
      <span class="chart-legend-item"><i style="background:${O(m.id,h)}"></i>${g(m.label)} <b>${a.totals[m.id]||0}</b></span>
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
        ${a.cats.map((m,h)=>`
            <button type="button" class="chip chart-cat-chip ${Z===m.id?"on":""}" data-action="set-chart-cat" data-cat="${m.id}">
              <i style="background:${O(m.id,h)}"></i>${g(m.label)}
            </button>
          `).join("")}
      </div>
      <div class="chart-wrap${a.labels.length>12?" scroll-x":""}">${o}</div>
      <div class="chart-legend">${d}</div>
    </section>
  `}function ki(t,a){const{locked:e,showC:s}=a,i=t.habits.map(r=>{const o=u.habitRating(v,r.id),d=!o&&e,l=u.habitStreak(r.id,v),m=s&&Number(r.consciousPoints)||0,h=o>0?m:0,p=Math.round(r.points*o/5)+h,k=r.points+m;return`
        <article class="item-card ${o?"done":""} ${d?"missed":""} ${e?"is-locked":""}" style="border-left:3px solid ${O(r.category)}">
          <button class="check" data-action="toggle-habit" data-id="${r.id}" ${e?"disabled":""}>✓</button>
          <div class="item-body">
            <div class="item-title">${g(r.name)} ${d?'<span class="missed-badge">Missed</span>':""}</div>
            <div class="item-meta">Habit · ${o?`${o}/5 ${Yt(o)}`:e?"Missed":"Not rated"} · ${Zt(l)}${s?` ${ga(m)}`:""}</div>
            ${r.description?`<p class="item-desc">${g(r.description)}</p>`:""}
            ${Kt(u.habitForwardedTo(v,r.id))}
            ${va(u.habitReplacedFrom(v,r.id))}
            ${st(r.tags)}
            ${pa(r.id,o,e)}
          </div>
          <div class="item-side">
            <div class="points">${p}/${k}</div>
            <div class="mini-actions">
              ${Q?`<button class="mini-btn on" data-action="open-edit-habit" data-id="${r.id}" ${e?"disabled":""}>Edit</button>`:""}
              ${ka(r.id,e)}
            </div>
          </div>
        </article>
      `}).join(""),n=t.tasks.map(r=>{const o=Math.max(0,Math.min(5,Number(r.rating)||0)),d=!r.done&&e;return`
        <article class="item-card ${r.done?"done":""} ${d?"missed":""} ${e?"is-locked":""}" style="border-left:3px solid ${O(r.category)}">
          <button class="check" data-action="toggle-task" data-id="${r.id}" ${e?"disabled":""}>✓</button>
          <div class="item-body">
            <div class="item-title">${g(r.title)} ${d?'<span class="missed-badge">Missed</span>':""}</div>
            <div class="item-meta">Task · ${r.done?"Done":e?"Missed":"Pending"} · ${o?`${o}/5 ${Yt(o)}`:"No rating"}${r.description?` · ${g(r.description)}`:""}</div>
            ${ya(r.forwardedFrom)}
            ${Kt(r.forwardedTo)}
            ${st(r.tags)}
            ${r.image?'<span class="task-img-badge">📷 Photo attached</span>':""}
            ${fa(r)}
            ${ma(r.id,o,e)}
          </div>
          <div class="item-side">
            <div class="points">+${r.points}</div>
            <div class="mini-actions">
              ${Q?`<button class="mini-btn on" data-action="open-edit-task" data-id="${r.id}" ${e?"disabled":""}>Edit</button>`:""}
              <button class="mini-btn" data-action="open-forward-task" data-id="${r.id}" ${e?"disabled":""} title="Forward task to another day">${P("forward")}</button>
            </div>
          </div>
        </article>
      `}).join("");return`${i}${n}`}function $i(){u.getDay(v);const t=u.isLocked(v),a=u.consciousEnabled(),e=u.categoryBreakdown(v),s=e.reduce((n,r)=>n+r.earned,0),i=e.reduce((n,r)=>n+r.max,0);return`
    <div class="topbar">
      <div>
        <p class="kicker">Activities</p>
        <h1>By category</h1>
      </div>
      <div class="date-nav">
        ${ye()}
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
    ${vi()}
    ${e.map(n=>{const r=n.max?Math.round(n.earned/n.max*100):0,o=O(n.id),d=Gt.has(n.id);return`
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
              ${n.habits.length||n.tasks.length?ki(n,{locked:t,showC:a}):'<div class="empty">No activities in this category.</div>'}
            </div>
                `:""}
          </section>
        `}).join("")}
  `}function te(t){return`${t||"daily-report-backup"}-${u.todayKey()}.json`}function wi(){const t=u.getInstalledAt(),a=String(t).slice(0,10),e=new Date(`${a}T00:00:00`),s=new Date(`${u.todayKey()}T00:00:00`),i=Number.isNaN(e.getTime())?1:Math.max(1,Math.round((s-e)/864e5)+1),n=String(Number(a.slice(8,10))).padStart(2,"0"),r=a.slice(5,7),o=a.slice(2,4),d=/^\d{4}-\d{2}-\d{2}$/.test(a)?`${n}/${r}/${o}`:a,l=Math.floor((i-1)/365)+1;return`Using Daily Report since ${d} · day ${i} · year ${l}`}function wa(){return typeof window.showDirectoryPicker=="function"}function xe(){return new Promise((t,a)=>{const e=indexedDB.open("daily-report-pwa",1);e.onupgradeneeded=()=>e.result.createObjectStore("kv"),e.onsuccess=()=>t(e.result),e.onerror=()=>a(e.error)})}function Si(t){return xe().then(a=>new Promise((e,s)=>{const i=a.transaction("kv","readonly").objectStore("kv").get(t);i.onsuccess=()=>e(i.result),i.onerror=()=>s(i.error)}))}function xi(t,a){return xe().then(e=>new Promise((s,i)=>{const n=e.transaction("kv","readwrite");n.objectStore("kv").put(a,t),n.oncomplete=()=>s(),n.onerror=()=>i(n.error)}))}function Ai(t){return xe().then(a=>new Promise((e,s)=>{const i=a.transaction("kv","readwrite");i.objectStore("kv").delete(t),i.oncomplete=()=>e(),i.onerror=()=>s(i.error)}))}function Ti(){return!wa()||typeof indexedDB>"u"?(E="unsupported",Promise.resolve()):Si("backupDir").then(t=>{if(N=t||null,!N){E="unset";return}return N.queryPermission({mode:"readwrite"}).then(a=>{E=a==="granted"?"granted":"prompt"}).catch(()=>{E="prompt"})}).catch(()=>{N=null,E="unset"})}function Di(){return E==="unsupported"?"Folder picking needs Chrome/Edge on desktop — on phones backups download instead.":E==="unset"?"No folder chosen yet.":E==="prompt"?"Tap Choose folder to allow access again.":E==="denied"?"Access was denied — choose the folder again.":E==="granted"&&N?`Folder: ${N.name}`:"Checking…"}async function Ci(){if(!wa()){f("Folder access needs Chrome or Edge");return}try{const t=await window.showDirectoryPicker({id:"daily-report-backup",mode:"readwrite"});await xi("backupDir",t),N=t,E="granted",f("Backup folder set")}catch(t){t&&t.name==="AbortError"||f("Couldn't open that folder")}b()}async function Pi(){try{await Ai("backupDir")}catch{f("Couldn't remove folder");return}N=null,E="unset",f("Backup folder removed"),b()}async function Li(){if(N){try{const t=await N.requestPermission({mode:"readwrite"});E=t==="granted"?"granted":"denied",f(t==="granted"?"Folder access granted":"Access denied")}catch{E="denied"}b()}}async function Ei(){const t=u.exportBackup(),a=te();if(E==="granted"&&N)try{const s=await(await N.getFileHandle(a,{create:!0})).createWritable();await s.write(t),await s.close(),f("Backup saved to your folder"),Sa();return}catch{}kt(a,t,"application/json"),f("Backup downloaded")}async function Mi(){if(E!=="granted"||!N)return[];const t=[];try{for await(const a of N.values())if(a&&a.kind==="file"&&/\.json$/i.test(a.name))try{const e=await a.getFile();t.push({name:a.name,modified:e.lastModified})}catch{}}catch{return t}return t.sort((a,e)=>e.modified-a.modified),t}async function Sa(){const t=document.getElementById("folder-backup-list");if(!t)return;if(E!=="granted"||!N){t.innerHTML='<button class="ghost-btn compact" data-action="trigger-import">Import from a file instead</button>';return}t.innerHTML='<p class="item-meta">Loading backups…</p>';const a=await Mi();if(!document.getElementById("folder-backup-list"))return;a.length?t.innerHTML=a.map(s=>`
            <div style="display:flex;gap:8px;align-items:center;margin-bottom:6px">
              <span class="item-meta" style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${g(s.name)}</span>
              <button class="ghost-btn compact" data-action="restore-backup" data-name="${g(s.name)}">Restore</button>
            </div>
          `).join(""):t.innerHTML='<p class="item-meta">Folder is empty — press Export backup now to create the first backup.</p>';const e=document.createElement("div");e.innerHTML='<button class="ghost-btn compact" data-action="trigger-import">Import from a file instead</button>',t.appendChild(e)}async function Ni(t){if(N)try{const e=await(await N.getFileHandle(t)).getFile();xa(await e.text(),t)}catch{f("Couldn't read that backup")}}function xa(t,a){let e;try{e=JSON.parse(t)}catch{f("That file isn't valid JSON.");return}const s=u.backupKind(e);if(s==="ok"){if(!window.confirm(`Replace ALL app data with "${a}"?`))return;kt(te("daily-report-pre-import"),u.exportBackup(),"application/json"),u.importBackup(e),f("Backup imported"),b();return}if(s==="report-export"){const i=u.previewReport(e);if(!i.days){f("That report file has no day rows to import.");return}if(!window.confirm(`Import ${i.days} day(s) (${i.start} → ${i.end}) from "${a}" as locked history?

${i.newHabits} new habit(s) will be added to your list.
Days already in the app on those dates will be overwritten.`))return;kt(te("daily-report-pre-import"),u.exportBackup(),"application/json");const r=u.importReport(e);if(!r){f("That file doesn't look like a valid Daily Report backup.");return}f(`Imported ${r.days} day(s)${r.habits?` + ${r.habits} new habit(s)`:""}`),b();return}if(s==="wrong-app"){f("That backup belongs to another app (e.g. Iron Log) — it can’t be imported into Daily Report.");return}f("That file doesn't look like a valid Daily Report backup.")}async function Hi(){if(!ht){f("Use the browser menu: Install / Add to Home Screen");return}try{ht.prompt();const t=await ht.userChoice;t&&t.outcome==="accepted"&&f("Installing Daily Report…")}catch{}ht=null,b()}async function Ii(){const t=`./version.json?v=${Date.now()}`,a=await fetch(t,{cache:"no-store"});if(!a.ok)throw new Error(`http ${a.status}`);const e=await a.json(),s=e&&(e.version||e.v)||null;if(!s)throw new Error("no version field");return String(s)}async function Ri(){rt=!0,Jt=!1,dt="Checking for updates… (needs internet)",b();try{if("serviceWorker"in navigator&&navigator.serviceWorker.getRegistration){const a=await navigator.serviceWorker.getRegistration().catch(()=>null);a&&a.update&&a.update().catch(()=>{})}}catch{}if(typeof fetch>"u"){rt=!1,dt="This browser can’t check — but the app itself works offline. Use Export backup to protect your data.",b();return}const t=setTimeout(()=>{rt&&(rt=!1,dt="Couldn't reach the server — offline? The app itself works offline; updating needs internet.",b())},15e3);try{const a=await Ii();if(clearTimeout(t),rt=!1,he=a,a&&a!==ua){Jt=!0,dt="Update found — updating automatically…",b(),await Aa(!0);return}dt="You're on the latest version. The app works offline."}catch{clearTimeout(t),rt=!1,dt="Couldn't reach the server — offline, or this file wasn't opened from the installed/hosted app. The app itself works offline; updating needs internet."}b()}function ze(t){return new Promise(a=>{if(!("serviceWorker"in navigator))return a();const e=()=>a(),s=setTimeout(()=>{try{navigator.serviceWorker.removeEventListener("controllerchange",e)}catch{}a()},t||4e3),i=()=>{clearTimeout(s);try{navigator.serviceWorker.removeEventListener("controllerchange",i)}catch{}a()};try{navigator.serviceWorker.addEventListener("controllerchange",i)}catch{a()}})}async function Aa(t){var e;try{kt(te("daily-report-pre-update"),u.exportBackup(),"application/json")}catch{}f("Backup saved — updating app…"),dt=`Backup saved — updating${he?` to ${String(he).slice(-8)}`:""}…`,b();const a=()=>{const s=window.location.href.includes("?")?"&":"?";try{window.location.replace(`${window.location.href.split("#")[0]}${s}v=${Date.now()}#updated`)}catch{window.location.reload()}setTimeout(()=>{try{window.location.reload()}catch{}},2500)};try{if("serviceWorker"in navigator&&navigator.serviceWorker.getRegistration){const s=await navigator.serviceWorker.getRegistration().catch(()=>null);if(s){const i=s.waiting;if(i){try{i.postMessage("SKIP_WAITING")}catch{try{s.waiting.postMessage({type:"SKIP_WAITING"})}catch{}}await ze(4e3),a();return}try{await s.update()}catch{}const n=await navigator.serviceWorker.getRegistration().catch(()=>s),r=(n||s).waiting||(n||s).installing;if(r){try{r.postMessage("SKIP_WAITING")}catch{}try{(e=(n||s).waiting)==null||e.postMessage("SKIP_WAITING")}catch{}await ze(5e3),a();return}try{const o=navigator.serviceWorker.controller;o&&o.postMessage({type:"CLEAR_APP_CACHES"})}catch{}try{if(typeof caches<"u"){const o=await caches.keys().catch(()=>[]);await Promise.all(o.filter(d=>d.startsWith("daily-report-")).map(d=>caches.delete(d).catch(()=>!1)))}}catch{}try{await fetch(`./index.html?v=${Date.now()}`,{cache:"reload"})}catch{}try{await fetch(`./version.json?v=${Date.now()}`,{cache:"reload"})}catch{}try{await(n||s).unregister()}catch{}a();return}}}catch{}try{await fetch(`./index.html?v=${Date.now()}`,{cache:"reload"})}catch{}setTimeout(a,600)}const Oi=[{id:"start",icon:"🚀",title:"Getting started",summary:"How the app works in one minute",steps:[["📱","The app has five tabs at the bottom: <b>Today</b>, <b>Profile</b>, <b>History</b>, <b>Activities</b> and <b>Settings</b> — tap a tab to switch."],["⭐","Every habit and task has a <b>points value</b>. Checking it earns those points for that day."],["🧠","Some habits also award <b>conscious points</b> (🧠) on top of their normal points."],["📈","The big card on Today shows your day as points, percent and a <b>letter grade</b>."],["🔒","At your lock time the day locks itself — press <b>Submit and lock report</b> while the day is open."],["💾","Everything is saved on this device only and works fully offline."]]},{id:"today",icon:"✅",title:"Track your day (Today tab)",summary:"Habits, tasks, stars, photos and the FAB",steps:[["☑️","Tap the <b>circle check</b> on a habit or task to mark it done and earn its points."],["⭐","Tap the <b>stars</b> (1–5) to rate how well it went — a rating also counts it as done."],["🟢","Done items turn green. Unchecked items turn red as <b>Missed</b> once the day is locked."],["📷","Tasks can carry a photo — tap the thumbnail to view it full size."],["➕","Tap the big <b>+</b> button to add a habit or task for this day."],["↔️","Use the <b>‹ ›</b> arrows in the top bar to move between days."]]},{id:"edit",icon:"✏️",title:"Edit, sort & reorder",summary:"Edit Mode, drag order and archiving",steps:[["✏️","Tap <b>Edit Mode</b> in a section header to reveal the <b>Edit</b> and delete buttons."],["✋","Hold a card’s <b>grip button</b> for a moment, then drag it to a new spot in the list."],["🔃","The <b>Sort</b> selector orders the list by Points, Category, Tags or your custom drag order."],["🗂️","The <b>archive</b> button sets a habit or task aside — its history is kept and you can restore it any time from the <b>Archive</b> panel at the bottom of Today."]]},{id:"forward",icon:"🔁",title:"Forward, Replace & Pin",summary:"Moving habits and tasks between days",steps:[["↪️","<b>Forward</b> an unfinished task (➟ button) to another day — it moves there with a badge showing where it came from."],["⇄","<b>Replace</b> moves a habit’s rating to a free day before its next due date."],["📌","<b>Pin</b> a habit or task to a repeat schedule — weekly days, month dates or a custom date list — so it appears automatically. Pin it <b>forever</b> for daily essentials."],["↩️","Badges on the card (↩ Forwarded from / ⇄ Replaced from) show what moved and where — tap a badge to undo it."]]},{id:"notes",icon:"📝",title:"Day notes",summary:"Bullet and numbered lists that save themselves",steps:[["📝","The <b>Day note</b> box at the bottom of Today records how the day went."],["•","Select lines and press <b>• Bullets</b> (or <b>1. Numbered</b>) to make a list — press it again to remove the list markers."],["💾","The note saves automatically with the day and is included in exports and backups."]]},{id:"profile",icon:"👤",title:"Profile tab",summary:"Identity, life areas, goals, quotes & locking",steps:[["🪪","<b>Identity</b> — your display name and the person you want to be."],["🧬","<b>Who I am</b> — a numbered list of your roles; reorder with ↑ ↓."],["🗺️","<b>Life Areas</b> — tap a card to open it, describe it, and reorder with ↑ ↓."],["🌅","<b>My Vision</b> and <b>Core & Personal Values</b> — one value per line as a bullet list."],["💡","<b>Personal Ideas</b> — one idea per line, shown as bullets."],["🎯","<b>Goals</b> — hashtag each one: <b>#short</b> = weeks, <b>#medium</b> = 1–3 months, <b>#long</b> = a year or more."],["💬","<b>Quotes</b> — save quotes you live by and star your top 3 favourites."],["🔒","<b>Lock</b> makes the whole profile read-only; Unlock to edit again."]]},{id:"history",icon:"🕘",title:"History tab",summary:"Calendar of past days and exporting",steps:[["🗓️","History shows a month calendar colour-coded by each day’s score."],["👆","Tap any day to jump straight into that day’s report."],["📤","<b>Select & Export</b> picks a date range and exports it as <b>Excel / JSON / PDF</b> — a later import adds it back as locked history."],["☰","The list below shows recent reports with their grades."]]},{id:"activities",icon:"📊",title:"Activities tab",summary:"Charts over a week, month or year",steps:[["📊","The Activities tab charts your weekly score and progress per category."],["🗓️","Switch between <b>Week / Month / Year</b> and use <b>‹ ›</b> to step back in time."],["🎨","Each category keeps its chosen colour everywhere — charts, badges and cards."]]},{id:"rewards",icon:"🏆",title:"Goals & Rewards",summary:"Streak goals, tiers and badges",steps:[["➕","In Settings → Goals &amp; Rewards tap <b>Add goal</b>."],["🎯","Pick the target: a <b>habit or pinned-task streak of N days</b>, <b>N perfect (100%) days</b>, or a <b>List of tasks goal</b> (a checklist — no target needed)."],["📝","<b>List of tasks goal</b>: no target needed — in the goal form the <b>Attach tasks</b> picker lists <b>Archived</b> and <b>Undone</b> tasks to tick onto the goal. More can be added later from the task form’s <b>Select Goal</b>, <b>Attach to Goal List</b> when editing a task, or the goal card. When every task is done the goal shows <b>Done</b> and locks itself."],["⛔","Locking a list goal manually before its tasks are finished <b>terminates</b> it — locked goals take no new tasks until you unlock."],["🥇","Choose the tier — <b>Iron, Bronze, Silver or Gold</b> — and write the reward title you’ll earn."],["🎁","Progress bars track each goal; earned rewards become <b>badges</b> on Today’s Rewards strip."],["🏆","Any day that reaches 100% wins the <b>Gold Cup</b> on the spot."]]},{id:"cats",icon:"🗂️",title:"Categories & tags",summary:"Custom categories, colours, goals and tags",steps:[["🌈","Settings → <b>Categories</b>: add your own, tap one to open it, and pick its colour."],["📝","Type the category’s <b>goals</b> as bullet points and press Save — they reach forms, Activities and exports."],["🏷️","Tags group habits and tasks. From Settings → <b>Tags</b> you can rename or delete a tag everywhere at once."],["➕","New tags are added inside any habit or task form, or from the Tags section itself."]]},{id:"backup",icon:"💾",title:"Backup, updates & install",summary:"Keeping your data safe and the app fresh",steps:[["📁","Settings → <b>Data backup</b>: choose a folder once (desktop Chrome/Edge) and <b>Export backup now</b> saves a JSON straight into it."],["📥","<b>Import backup</b> accepts full backups (<b>daily-report-backup-*.json</b>) or month/week exports, which are added as locked history."],["🔄","<b>Check for updates</b> installs the newest version in place — a backup is saved first. Only this check needs internet."],["📲","<b>Install app</b> puts Daily Report on your home screen as a fullscreen offline app."]]},{id:"locking",icon:"🔐",title:"Locking & unlocking days",summary:"Auto-lock, submit and batch unlock",steps:[["⏰","Set the <b>auto-lock time</b> in Settings → Report lock; after that time today locks itself."],["🚫","A locked day is read-only, and anything unchecked already counted as <b>Missed</b> at lock time."],["📅","Settings → <b>Locked reports</b>: red days are locked, green days are open."],["☝️","Tap days to select them, then <b>Lock</b> or <b>Unlock</b> them all in one go."]]}];function ji(t){return`<div class="tut-steps">${t.map(a=>`
        <div class="tut-step">
          <span class="tut-step-ico" aria-hidden="true">${a[0]}</span>
          <p>${a[1]}</p>
        </div>`).join("")}</div>`}function Bi(){return`
    <div class="tut-grid">
      ${Oi.map(t=>{const a=Ft===t.id;return`
          <article class="tut-card ${a?"open":""}">
            <button type="button" class="tut-head" data-action="open-tutorial" data-id="${t.id}" aria-expanded="${a?"true":"false"}">
              <span class="tut-ico" aria-hidden="true">${t.icon}</span>
              <span class="tut-titles">
                <span class="tut-title">${g(t.title)}</span>
                <span class="tut-summary">${g(t.summary)}</span>
              </span>
              <span class="tut-chev" aria-hidden="true">${a?"▾":"▸"}</span>
            </button>
            ${a?`<div class="tut-body">${ji(t.steps)}</div>`:""}
          </article>
        `}).join("")}
    </div>
  `}function Ta(t){if(!t||t.kind!=="task-list")return"";const a=t.tasks||[];return a.length>0&&a.every(s=>s.done)?`Done ✅${t.locked?" 🔒":""}`:t.terminated?`Terminated ⛔${t.locked?" 🔒":""}`:t.locked?`Locked${t.locked?" 🔒":""}`:"Open"}function Fi(t){const a=t.tasks||[],e=a.filter(m=>m.done).length,s=a.length>0&&e===a.length,i=!!t.locked,n=!!t.terminated,r=!i&&!n,o=Ta(t),d=a.length?Math.round(e/a.length*100):0,l=s?"gstatus-done":n?"gstatus-term":i?"gstatus-locked":"gstatus-open";return`
    <article class="manage-card task-list-goal ${s?"goal-earned":""}">
      <div class="section-head">
        <div>
          <div class="item-title">${qt(t.tier)} ${g(t.title)} <span class="gstatus ${l}">${o}</span></div>
          <div class="item-meta">“${g(t.rewardTitle)}” · ${e}/${a.length} tasks${s?" · All done ✓":n?" · list closed":""}</div>
          <div class="bar"><span style="width:${d}%"></span></div>
        </div>
        <div class="mini-actions">
          ${i?"":`<button class="mini-btn on" data-action="open-edit-goal" data-id="${t.id}">Edit</button>`}
          ${i?`<button class="mini-btn" data-action="unlock-goal" data-id="${t.id}" title="Unlock to edit the goal${n?" (terminated goals still take no new tasks)":""}">🔓 Unlock</button>`:`<button class="mini-btn" data-action="lock-goal" data-id="${t.id}"${a.length&&!s?' title="Lock now — an unfinished goal stays terminated"':""}>🔒 Lock</button>`}
          <button class="mini-btn" data-action="remove-goal" data-id="${t.id}">✕</button>
        </div>
      </div>
      <div class="goal-task-list">
        ${a.length?a.map(m=>`
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
  `}function Y(t,{icon:a,title:e,hint:s},i){const n=xt.has(t);return`
    <section class="settings-sec ${n?"open":""}">
      <button type="button" class="settings-sec-head" data-action="toggle-settings-section" data-id="${t}" aria-expanded="${n?"true":"false"}">
        <span class="settings-sec-ico" aria-hidden="true">${a}</span>
        <span class="settings-sec-titles">
          <span class="settings-sec-name">${e}</span>
          ${s?`<span class="settings-sec-hint">${s}</span>`:""}
        </span>
        <span class="settings-sec-chev" aria-hidden="true">${n?"▾":"▸"}</span>
      </button>
      ${n?`<div class="settings-sec-body">${i}</div>`:""}
    </section>
  `}function Gi(){const t=u.getSettings(),a=u.getAllHabits(),e=u.getPinnedHabits(),s=[...e,...a.filter(o=>!o.pin)],i=u.getArchivedHabits(),n=u.getPinnedTasks(),r=u.lockedReports();return`
    <div class="topbar">
      <div>
        <p class="kicker">Admin rules</p>
        <h1>Settings</h1>
      </div>
      <button class="ghost-btn compact ${ut?"on":""}" data-action="toggle-settings-edit" aria-pressed="${ut}">${ut?"Done":"Edit Mode"}</button>
    </div>
    <p class="muted tight settings-sec-lead">Sections are closed by default — tap a title to open and edit it.</p>

    ${Y("tutorials",{icon:"📚",title:"Tutorials",hint:"Illustrated guide to the app & its usage"},Bi())}

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
          ${[0,1,2,3,4,5,6].map(o=>{const d=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];return`<option value="${o}" ${u.getWeekStart()===o?"selected":""}>${d[o]}</option>`}).join("")}
        </select>
      </label>
      <p class="item-meta">Applies to the Week tab, week exports, and pin calendars.</p>
    `)}

    ${Y("appearance",{icon:"🎨",title:"Appearance",hint:u.getTheme()==="dark"?"🌙 Dark mode":"☀️ Light mode"},`
      <p class="muted tight">Pick Dark or Light mode. It applies everywhere, instantly.</p>
      <div class="chip-row">
        <button type="button" class="chip ${u.getTheme()==="dark"?"on":""}" data-action="set-theme" data-theme="dark">🌙 Dark</button>
        <button type="button" class="chip ${u.getTheme()==="light"?"on":""}" data-action="set-theme" data-theme="light">☀️ Light</button>
      </div>
    `)}

    ${Y("install",{icon:"📲",title:"Install app",hint:window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches?"Installed ✓":"Add to home screen"},`
      <p class="muted tight">Put Daily Report on your home screen for fullscreen offline use. Open it over http://localhost or https — it cannot install from a file:// page.</p>
      ${window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches?'<p class="item-meta">Installed — running as app ✓</p>':'<button class="primary-btn full" data-action="install-app">Install Daily Report</button>'}
    `)}

    ${Y("updates",{icon:"🔄",title:"App updates",hint:`${Jt?"Update ready":g(Oe)}`},`
      <p class="muted tight">The app works fully offline. Only checking for updates needs internet. Tapping Check for updates installs the newest version automatically (a JSON backup of your data is saved first). Your data stays on this device.</p>
      <p class="item-meta">Version: ${g(Oe)}</p>
      <p class="item-meta">📅 ${g(wi())}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
        <button class="primary-btn" data-action="check-updates" ${rt?"disabled":""}>${rt?"Checking…":"Check for updates"}</button>
        ${Jt?'<button class="primary-btn" data-action="apply-update">Restart with update</button>':""}
      </div>
      <p class="item-meta">${g(dt)}</p>
    `)}

    ${Y("backup",{icon:"💾",title:"Data backup",hint:`${E==="granted"?"Folder connected":"Choose a folder"}`},`
      <p class="muted tight">Pick a backup folder once (Chrome/Edge on desktop) and exports save straight into it. On phones, backups download to your Downloads folder instead. Import accepts full backups (<b>daily-report-backup-*.json</b>) or month/week report exports, which are added as locked history.</p>
      <p class="item-meta">${g(Di())}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
        ${E==="prompt"?'<button class="primary-btn" data-action="grant-folder">Allow access</button>':'<button class="ghost-btn compact" data-action="choose-folder">Choose folder</button>'}
        ${N?'<button class="ghost-btn compact" data-action="forget-folder">Remove</button>':""}
        <button class="primary-btn" data-action="backup-now">Export backup now</button>
        <button class="ghost-btn compact" data-action="trigger-import">Import backup</button>
      </div>
      <input type="file" id="backup-file" accept="application/json,.json" hidden />
      <div id="folder-backup-list" style="margin-top:10px"></div>
    `)}

    ${Y("categories",{icon:"🗂️",title:"Categories",hint:`${u.getCategories().length}`},`
      <p class="muted tight">Add your own categories — they appear in forms, Activities and exports. Tap a category to open it, set its colour, then type its goals as bullet points and press Save.</p>
      <div class="cat-expand-row">
        <button class="mini-btn" data-action="expand-cats">Expand all</button>
        <button class="mini-btn" data-action="collapse-cats">Collapse all</button>
      </div>
      <div class="habit-manage">
        ${u.getCategories().map(o=>{const d=u.getCustomCategories().some(S=>S.id===o.id),l=o.color||O(o.id),m=o.goals||"",h=Ct(m),p=yt.has(o.id)?yt.get(o.id):m,k=Pt(Ct(p))!==Pt(h),x=ct.has(o.id);return`
              <article class="manage-card cat-manage-card ${x?"open":""}">
                <div class="cat-manage-head">
                  <button type="button" class="cat-manage-toggle" data-action="toggle-cat" data-id="${o.id}" aria-expanded="${x?"true":"false"}" aria-controls="cat-editor-${o.id}">
                    <span class="cat-chevron" aria-hidden="true">${x?"▾":"▸"}</span>
                    <i class="cat-swatch" style="background:${g(l)}"></i>
                    <span class="cat-manage-name">${g(nt(o.id))}</span>
                    ${h.length?`<span class="cat-goal-flag">${h.length} goal${h.length===1?"":"s"}</span>`:""}
                  </button>
                  <div class="mini-actions">
                    ${d?`<button class="mini-btn on" data-action="rename-category" data-id="${o.id}">Rename</button>`:""}
                    ${d?`<button class="mini-btn" data-action="delete-category" data-id="${o.id}">✕</button>`:""}
                  </div>
                </div>
                ${x?`
                      <div class="cat-manage-body" id="cat-editor-${o.id}">
                        <div class="cat-manage-row">
                          <label>Colour
                            <input type="color" data-cat-color="${o.id}" value="${g(l)}" aria-label="Colour for ${g(o.label||nt(o.id))}" />
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
                    `:h.length?`<ul class="note-list cat-goal-preview">${h.map(S=>`<li>${g(S)}</li>`).join("")}</ul>`:'<p class="item-meta">No goals yet — open this category to add some.</p>'}
              </article>
            `}).join("")}
      </div>
      <div style="display:flex;gap:8px;margin-top:10px">
        <input id="new-category" maxlength="30" placeholder="New category name…" style="flex:1;min-width:0" />
        <button class="primary-btn compact-btn" data-action="add-category">Add</button>
      </div>
    `)}

    ${Y("tags",{icon:"🏷️",title:"Tags",hint:`${u.getAllTags().length}`},`
      <p class="muted tight">Rename a tag everywhere at once, or delete it from all habits and tasks. New tags are added inside any habit/task form.</p>
      <div class="habit-manage">
        ${(()=>{const o=u.getAllTags();return o.length?o.map(({tag:d,count:l})=>`
              <article class="manage-card">
                <div class="section-head">
                  <div>
                    <div class="item-title">#${g(d)}</div>
                    <div class="item-meta">Used ${l} time${l===1?"":"s"}</div>
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
          ${u.getAllHabits().map(o=>`<option value="${o.id}">${g(o.name)}</option>`).join("")}
        </select>
        <input id="new-tag" maxlength="20" placeholder="New tag…" style="flex:1;min-width:0" />
        <button class="primary-btn compact-btn" data-action="add-tag">Add</button>
      </div>
    `)}

    ${Y("goals",{icon:"🏅",title:"Goals & Rewards",hint:`${u.getGoals().length} goals · ${u.getBadges().length} badges`},`
      <div class="section-head">
        <p class="muted tight" style="max-width:270px">Do a habit / pinned task N days in a row, or collect N perfect (100%) days — earn an Iron, Bronze, Silver or Gold badge with your own title.</p>
        <button class="ghost-btn compact" data-action="open-goal">Add goal</button>
      </div>
      <div class="habit-manage">
        ${u.getGoals().length?u.getGoals().map(o=>{var h,p;if(o.kind==="task-list")return Fi(o);const d=u.goalProgress(o,v),l=u.getBadges().some(k=>k.goalId===o.id),m=o.kind==="habit-streak"?((h=u.findHabit(o.targetId))==null?void 0:h.name)||"Deleted habit":o.kind==="task-streak"?((p=u.findPinnedTask(o.targetId))==null?void 0:p.title)||"Deleted task":"Any day at 100%";return`
                    <article class="manage-card goal-card ${l?"goal-earned":""}">
                      <div class="section-head">
                        <div>
                          <div class="item-title">${qt(o.tier)} ${g(o.title)}</div>
                          <div class="item-meta">${ia(o.tier)} · “${g(o.rewardTitle)}” · ${g(m)}</div>
                          <div class="item-meta">${d.current}/${d.target} days ${l?"· Earned ✓":""}</div>
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
                  <div class="reward-medal">${qt(o.tier)}</div>
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
      ${gi(r)}
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

    ${Y("habits",{icon:"✅",title:"Habits",hint:`${s.length}`},`
      <div class="section-head">
        <p class="muted tight" style="max-width:280px">Tap a habit to see its activity. In Edit Mode, edit habits and reorder pinned habits.</p>
        <button class="ghost-btn compact" data-action="open-add-habit">Add</button>
      </div>
      <div class="habit-manage">
        ${s.length?s.map(o=>{const d=jt.has(o.id),l=o.pin?e.findIndex(h=>h.id===o.id):-1,m=d?u.getHabitActivity(o.id,20):[];return`
                    <article class="manage-card setting-habit-card ${d?"open":""}" style="${o.pin?`border-left:4px solid ${O(o.category)}`:""}">
                      <div class="section-head">
                        <button type="button" class="setting-habit-toggle" data-action="toggle-setting-habit" data-id="${o.id}" aria-expanded="${d?"true":"false"}">
                          <span class="setting-habit-chevron" aria-hidden="true">${d?"▾":"▸"}</span>
                          <span class="setting-habit-heading">
                            <span class="item-title">${g(o.name)}</span>
                            <span class="item-meta">${mt(o.category)} · ${o.pin?bt(o.pin):"Not pinned"} · +${o.points} pts ${t.showConscious!==!1?Number(o.consciousPoints)?`· 🧠 +${o.consciousPoints}`:"· No conscious pts":""} · ${Zt(u.habitStreak(o.id,v))}</span>
                          </span>
                        </button>
                        <div class="mini-actions">
                          ${ut?`
                            <button class="mini-btn on" data-action="open-edit-habit" data-id="${o.id}" aria-label="Edit ${g(o.name)}">Edit</button>
                            ${o.pin?`
                              <button class="mini-btn" data-action="move-pinned-habit" data-id="${o.id}" data-dir="-1" ${l===0?"disabled":""} aria-label="Move ${g(o.name)} up" title="Move up">↑</button>
                              <button class="mini-btn" data-action="move-pinned-habit" data-id="${o.id}" data-dir="1" ${l===e.length-1?"disabled":""} aria-label="Move ${g(o.name)} down" title="Move down">↓</button>
                            `:""}
                            <button class="mini-btn ${o.pin?"on":""}" data-action="open-pin-habit" data-id="${o.id}" aria-label="${o.pin?"Change pin schedule":"Pin habit"}">${P("pin")}</button>
                            <button class="mini-btn" data-action="remove-habit" data-id="${o.id}" aria-label="Remove ${g(o.name)}">✕</button>
                          `:""}
                        </div>
                      </div>
                      ${d?`
                        <div class="setting-habit-details">
                          ${o.description?`<p class="item-desc">${g(o.description)}</p>`:'<p class="item-meta">No description yet.</p>'}
                          ${st(o.tags)}
                          <div class="setting-habit-activity">
                            <div class="item-title">Recent activity</div>
                            ${m.length?m.map(h=>`
                              <button type="button" class="setting-habit-activity-row" data-action="open-habit-activity-date" data-date="${h.date}">
                                <span>${U(h.date)}</span>
                                <span>${h.rating?`${h.rating}/5 · ${h.status}`:h.status}</span>
                                ${h.locked?'<span class="lock-badge">Locked</span>':""}
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
                    <article class="manage-card archived" style="border-left:4px solid ${O(o.category)}">
                      <div class="section-head">
                        <div>
                          <div class="item-title">${g(o.name)}</div>
                          <div class="item-meta">${mt(o.category)} · +${o.points} pts${o.pin?` · ${bt(o.pin)}`:" · Pin ended"} · ${be(o.archivedAt)}</div>
                          ${o.description?`<p class="item-desc">${g(o.description)}</p>`:""}
                          ${st(o.tags)}
                        </div>
                        <div class="mini-actions">
                          <button class="mini-btn on" data-action="restore-habit" data-id="${o.id}">${P("undo")}</button>
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
                          <div class="item-meta">${mt(o.category)} · ${bt(o.pin)} · +${o.points} pts</div>
                          ${o.description?`<p class="item-desc">${g(o.description)}</p>`:""}
                          ${st(o.tags)}
                        </div>
                        <div class="mini-actions">
                          ${ut?`
                            <button class="mini-btn on" data-action="open-edit-pinned-task" data-id="${o.id}" aria-label="Edit ${g(o.title)}">Edit</button>
                            <button class="mini-btn" data-action="move-pinned-task" data-id="${o.id}" data-dir="-1" ${n.indexOf(o)===0?"disabled":""} aria-label="Move ${g(o.title)} up" title="Move up">↑</button>
                            <button class="mini-btn" data-action="move-pinned-task" data-id="${o.id}" data-dir="1" ${n.indexOf(o)===n.length-1?"disabled":""} aria-label="Move ${g(o.title)} down" title="Move down">↓</button>
                            <button class="mini-btn on" data-action="open-pin-template" data-id="${o.id}" aria-label="Change repeat schedule">${P("pin")}</button>
                            <button class="mini-btn" data-action="unpin-template" data-id="${o.id}" aria-label="Unpin ${g(o.title)}">✕</button>
                          `:""}
                        </div>
                      </div>
                    </article>
                  `).join(""):'<div class="empty">Pin a task from Today to repeat it.</div>'}
      </div>
    `)}
  `}function j(t){if(/^\d{4}-\d{2}$/.test(String(t||"")))return String(t);if(/^\d{4}-\d{2}-\d{2}$/.test(String(t||"")))return String(t).slice(0,7);const a=new Date;return`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}`}function At(t,a){const[e,s]=String(t).split("-").map(Number),i=new Date(e,(s||1)-1+a,1);return`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}`}function ae(t){const[a,e]=String(t).split("-").map(Number);return new Date(a,(e||1)-1,1).toLocaleDateString(void 0,{month:"long",year:"numeric"})}function Ae(){const t=u.getWeekStart(),a=ft.findIndex(e=>e.value===t);return a<=0?ft:[...ft.slice(a),...ft.slice(0,a)]}function Te(t){const[a,e]=String(t).split("-").map(Number),i=(new Date(a,e-1,1).getDay()-u.getWeekStart()+7)%7,n=new Date(a,e,0).getDate(),r=[];for(let o=0;o<i;o++)r.push(null);for(let o=1;o<=n;o++)r.push(`${a}-${String(e).padStart(2,"0")}-${String(o).padStart(2,"0")}`);return r}function Ye(t,a,e){const s=new Set(e||[]),i=Te(a);return`
    <div class="pin-cal" data-cal="${t}">
      <div class="pin-cal-head">
        <button type="button" class="mini-btn" data-action="pin-cal-nav" data-target="${t}" data-dir="-1" aria-label="Previous month">‹</button>
        <b>${ae(a)}</b>
        <button type="button" class="mini-btn" data-action="pin-cal-nav" data-target="${t}" data-dir="1" aria-label="Next month">›</button>
      </div>
      <div class="pin-cal-grid pin-cal-week">
        ${Ae().map(n=>`<span>${n.label.slice(0,1)}</span>`).join("")}
      </div>
      <div class="pin-cal-grid">
        ${i.map(n=>n?`<button type="button" class="pin-cal-day ${s.has(n)?"on":""}" data-action="toggle-pin-date" data-target="${t}" data-date="${n}">${Number(n.slice(8,10))}</button>`:"<span></span>").join("")}
      </div>
    </div>
  `}function _i(t,a){const e=(t==null?void 0:t.mode)||"forever",s=(t==null?void 0:t.until)||"",i=((t==null?void 0:t.weekdays)||[]).map(Number),n=((t==null?void 0:t.monthDays)||[]).map(Number),r=Array.isArray(t==null?void 0:t.yearDays)?[...t.yearDays].sort():[],o=Array.isArray(t==null?void 0:t.customDates)?[...t.customDates].sort():[],d=Array.isArray(t==null?void 0:t.exceptDates)?[...t.exceptDates].sort():Array.isArray(t==null?void 0:t.exceptions)?[...t.exceptions].sort():[],l=a&&a._exceptCal||j(v),m=a&&a._customCal||j(v),h=a&&a._yearMonth||"01";return`
    <div class="chip-row pin-modes">
      <button type="button" class="chip ${e==="forever"?"on":""}" data-action="pin-mode" data-mode="forever">Forever</button>
      <button type="button" class="chip ${e==="until"?"on":""}" data-action="pin-mode" data-mode="until">Until date</button>
      <button type="button" class="chip ${e==="weekly"?"on":""}" data-action="pin-mode" data-mode="weekly">Weekly</button>
      <button type="button" class="chip ${e==="monthly"?"on":""}" data-action="pin-mode" data-mode="monthly">Monthly</button>
      <button type="button" class="chip ${e==="yearly"?"on":""}" data-action="pin-mode" data-mode="yearly">Yearly</button>
      <button type="button" class="chip ${e==="custom"?"on":""}" data-action="pin-mode" data-mode="custom">Custom</button>
    </div>
    <input type="hidden" name="mode" value="${e}" />
    <label class="pin-until" style="${e==="until"?"":"display:none"}">
      Until
      <input name="until" type="date" value="${s}" />
    </label>
    <div class="pin-weekdays" style="${e==="weekly"?"":"display:none"}">
      <p class="item-meta">Repeat every</p>
      <div class="chip-row">
        ${ft.map(p=>`
            <button type="button" class="chip weekday ${i.includes(p.value)?"on":""}" data-action="toggle-weekday" data-day="${p.value}">
              ${p.label}
            </button>
          `).join("")}
      </div>
    </div>
    <div class="pin-monthdays" style="${e==="monthly"?"":"display:none"}">
      <p class="item-meta">Repeat every month on day</p>
      <div class="chip-row">
        ${Array.from({length:31},(p,k)=>k+1).map(p=>`<button type="button" class="chip monthday ${n.includes(p)?"on":""}" data-action="toggle-monthday" data-day="${p}">${p}</button>`).join("")}
      </div>
    </div>
    <div class="pin-yeardays" style="${e==="yearly"?"":"display:none"}">
      <p class="item-meta">Repeat every year on (month + day)</p>
      <div class="row-2">
        <label>Month
          <select id="year-month-select">
            ${Array.from({length:12},(p,k)=>k+1).map(p=>`<option value="${String(p).padStart(2,"0")}" ${h===String(p).padStart(2,"0")?"selected":""}>${new Date(2e3,p-1,1).toLocaleDateString(void 0,{month:"long"})}</option>`).join("")}
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
      ${Ye("custom",m,o)}
      <div class="chip-row" style="margin-top:8px">
        ${o.length?o.map(p=>`<button type="button" class="chip on" data-action="toggle-pin-date" data-target="custom" data-date="${p}" title="Tap to remove">${p} ✕</button>`).join(""):'<span class="item-meta">No extra custom dates.</span>'}
      </div>
    </div>
    <div class="pin-exceptions" style="margin-top:4px">
      <p class="item-meta"><b style="color:var(--text)">Exceptions</b> — skip these days (tap days on the calendar). Applies to every repeat mode.</p>
      ${Ye("except",l,d)}
      <div class="chip-row" style="margin-top:8px">
        ${d.length?d.map(p=>`<button type="button" class="chip on" data-action="toggle-pin-date" data-target="except" data-date="${p}" title="Tap to remove">${p} ✕</button>`).join(""):'<span class="item-meta">No exceptions.</span>'}
      </div>
    </div>
  `}function qi(){if(!A)return"";if(A==="choose")return`
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
    `;if(A==="habit"||A==="task"||A==="edit-habit"||A==="edit-task"||A==="edit-pinned-task"){const t=A==="habit"||A==="edit-habit",a=A.startsWith("edit-"),e=$||{},s=e.category||(t?"physically":"mentally"),i=Math.max(0,Math.min(5,Number(e.rating)||0)),n=Array.isArray(e.tags)?e.tags.join(", "):e.tags||"",r=e.consciousPoints!=null?Number(e.consciousPoints):e.conscious!=null?Number(e.conscious):0;return`
      <div class="modal-backdrop open" data-action="close-modal">
        <form class="sheet" data-form="${A}" data-id="${e.id||""}">
          <div class="handle"></div>
          <h2>${a?"Edit":"New"} ${t?"habit":"task"}</h2>
          <div class="form" style="margin-top:14px">
            <label>
              ${t?"Habit name":"Task name"}
              <input name="title" required maxlength="60" value="${g(e.title||e.name||"")}" placeholder="${t?"Meditate":"Finish report"}" />
            </label>
            ${(()=>{const o=A==="edit-task";if(t||!(A==="task"||o)||!u.taskListGoals().length)return"";const d=o?u.openTaskListGoals():u.taskListGoals(),l=o?"Attach to Goal List":"Select Goal",m=o?"Not attached to a goal":"No goal — add to today's task list",h=o?"Picking a goal adds this task to that goal’s list as well (open goals only).":"A goal attached here puts the task on that goal’s list instead of today’s list.";return`
                <div>
                  <p class="item-meta">${l}</p>
                  ${o&&!d.length?'<p class="item-meta">No open list-of-tasks goals — unlock a goal first to attach to it.</p>':`
                  <label style="margin-top:6px">
                    Attach this task to a list-of-tasks goal (optional)
                    <select name="goalTarget">
                      <option value="">${m}</option>
                      ${d.map(p=>{const k=!p.locked;return`<option value="${p.id}" ${k?"":"disabled"}>${g(p.title)} — ${Ta(p)}</option>`}).join("")}
                    </select>
                  </label>`}
                  <p class="item-meta">${h}</p>
                </div>
              `})()}
            ${t?`
                  <label>
                    Description (optional)
                    <textarea name="description" maxlength="2000" placeholder="Why this habit matters, extra notes...">${g(e.description||"")}</textarea>
                  </label>
                `:`
                  <label>
                    Description (optional)
                    <textarea name="description" maxlength="240" placeholder="Why this matters, extra notes...">${g(e.description||"")}</textarea>
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
                      <button type="button" class="ghost-btn compact" data-action="pick-task-image">📷 ${(e._image!==void 0?e._image:e.image)?"Change photo":"Attach photo"}</button>
                      ${(e._image!==void 0?e._image:e.image)?'<button type="button" class="ghost-btn compact danger" data-action="remove-task-image">Remove</button>':""}
                    </div>
                    <input type="file" id="task-image-input" accept="image/*" hidden />
                    ${(e._image!==void 0?e._image:e.image)?`<div class="img-picker-preview"><img src="${e._image!==void 0?e._image:e.image}" alt="Attached photo preview" /><button type="button" class="mini-btn" data-action="remove-task-image" title="Remove photo">✕</button></div>`:""}
                  </div>
                `}
            <div>
              <p class="item-meta">Category</p>
              <div class="chip-row cat-row">
                ${u.getCategories().map(o=>`
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
              <input name="points" type="number" min="1" max="100" value="${e.points||(t?10:5)}" />
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
              ${[["day","Day"],["week","Week"],["month","Month"],["year","Year"],["all","All"]].map(([a,e])=>`<button type="button" class="chip ${t===a?"on":""}" data-action="set-export-range" data-range="${a}">${e}</button>`).join("")}
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
    `}if(A==="goal"||A==="edit-goal"){const t=A==="edit-goal",a=$||{},e=a.kind||"habit-streak",s=u.getAllHabits(),i=u.getPinnedTasks(),n=a.targetId||"",r=e==="task-list"?(a.tasks||[]).filter(l=>!l.done).length:0,o=e==="task-list"?u.getArchivedTasks():[],d=e==="task-list"?u.undoneDayTasks():[];return`
      <div class="modal-backdrop open" data-action="close-modal">
        <form class="sheet" data-form="${A}" data-id="${a.id||""}">
          <div class="handle"></div>
          <h2>${t?"Edit":"New"} goal</h2>
          <div class="form" style="margin-top:14px">
            <label>
              Goal title
              <input name="title" required maxlength="60" value="${g(a.title||"")}" placeholder="Exercise every day" />
            </label>
            <div>
              <p class="item-meta">Goal type</p>
              <div class="chip-row goal-kind-row">
                ${aa.map(l=>`<button type="button" class="chip ${e===l.id?"on":""}" data-action="set-goal-kind" data-kind="${l.id}">${l.label}</button>`).join("")}
              </div>
              <input type="hidden" name="kind" value="${e}" />
              ${e==="task-list"?'<p class="item-meta">No target needed — pick the tasks to attach below. You can add more later from the task form (Select Goal) or inside Goals &amp; Rewards.</p>':""}
            </div>
            <div class="goal-attach" style="${e==="task-list"?"":"display:none"}">
              <p class="item-meta"><b style="color:var(--text)">Attach tasks</b> — tick the tasks that belong to this goal's list${r?` · already on the goal: ${r} unfinished`:""}.</p>
              ${(()=>{const l=(m,h,p)=>{const k=h.map(x=>{const S=String(x.title||"").trim();if(!S)return"";const y=x.category?`${x.category.charAt(0).toUpperCase()}${x.category.slice(1)}${x.date?` · ${x.date}`:""}`:x.date||"";return`
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
                  `};return`${l("Archived tasks",o,"No archived tasks yet.")}${l("Undone tasks",d,"No undone day tasks.")}`})()}
            </div>
            <label class="goal-target-habit" style="${e==="habit-streak"?"":"display:none"}">
              Habit
              <select name="habitTarget">
                ${s.map(l=>`<option value="${l.id}" ${n===l.id?"selected":""}>${g(l.name)}</option>`).join("")}
              </select>
            </label>
            <label class="goal-target-task" style="${e==="task-streak"?"":"display:none"}">
              Pinned task
              <select name="taskTarget">
                ${i.length?i.map(l=>`<option value="${l.id}" ${n===l.id?"selected":""}>${g(l.title)}</option>`).join(""):'<option value="">No pinned tasks yet</option>'}
              </select>
            </label>
            <label class="goal-target-days" style="${e==="task-list"?"display:none":""}">
              Number of days
              <input name="targetDays" type="number" min="1" max="365" value="${a.targetDays||7}" />
            </label>
            <div>
              <p class="item-meta">Badge</p>
              <div class="chip-row goal-tier-row">
                ${Et.map(l=>`<button type="button" class="chip ${(a.tier||"bronze")===l.id?"on":""}" data-action="set-goal-tier" data-tier="${l.id}">${l.medal} ${l.label}</button>`).join("")}
              </div>
              <input type="hidden" name="tier" value="${a.tier||"bronze"}" />
            </div>
            <label>
              Reward title (yours)
              <input name="rewardTitle" required maxlength="60" value="${g(a.rewardTitle||"")}" placeholder="Champion" />
            </label>
            <button class="primary-btn" type="submit">Save goal</button>
            <button class="ghost-btn" type="button" data-action="close-modal">Cancel</button>
          </div>
        </form>
      </div>
    `}if(A==="pin"){const{kind:t,id:a,title:e,pin:s}=$||{};return`
      <div class="modal-backdrop open" data-action="close-modal">
        <form class="sheet sheet-wide" data-form="pin" data-kind="${t}" data-id="${a}">
          <div class="handle"></div>
          <h2>Pin ${t==="habit"?"habit":"task"}</h2>
          <p class="muted tight">${g(e||"")}</p>
          <div class="form" style="margin-top:14px">
            ${_i(s,$)}
            <button class="primary-btn" type="submit">Save pin</button>
            ${s?'<button class="ghost-btn danger" type="button" data-action="clear-pin">Unpin</button>':""}
            <button class="ghost-btn" type="button" data-action="close-modal">Cancel</button>
          </div>
        </form>
      </div>
    `}if(A==="forward"){const{kind:t,id:a,title:e,from:s}=$||{};return`
      <div class="modal-backdrop open" data-action="close-modal">
        <form class="sheet" data-form="forward" data-kind="${t}" data-id="${a}">
          <div class="handle"></div>
          <h2>Forward task</h2>
          <p class="muted tight">${g(e||"")}</p>
          <p class="item-meta">From ${g(s||v)} — a copy will be created on the day you pick, marked “↩ Forwarded from ${g(s||v)}”.</p>
          <div class="form" style="margin-top:14px">
            <label>
              Forward to day
              <input name="targetDate" type="date" required value="${oi(s||v)}" />
            </label>
            <button class="primary-btn" type="submit">Forward task →</button>
            <button class="ghost-btn" type="button" data-action="close-modal">Cancel</button>
          </div>
        </form>
      </div>
    `}if(A==="replace"){const{id:t,title:a,from:e,info:s}=$||{},i=s&&s.days||[];return`
      <div class="modal-backdrop open" data-action="close-modal">
        <form class="sheet" data-form="replace" data-id="${t}">
          <div class="handle"></div>
          <h2>Replace habit day</h2>
          <p class="muted tight">${g(a||"")}</p>
          <p class="item-meta">Currently due on <b>${g(e||v)}</b>. Its next direct day is <b>${g(s&&s.next||"")}</b>, so the day may only move to one of the ${i.length} day${i.length===1?"":"s"} in between — the allowable replace days.</p>
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
    `}if(A==="image"){const{image:t,title:a}=$||{};return t?`
      <div class="lightbox-backdrop" data-action="close-modal">
        <img src="${t}" alt="${g(a||"Task photo")}" />
        <button type="button" class="ghost-btn compact lightbox-close" data-action="close-modal">✕ Close</button>
      </div>
    `:""}return""}function b(){if(oe){Se();try{const t=u.isLocked(v);oe.innerHTML=`
    <div class="app-shell">
      <main class="screen active">
        ${H==="today"?di():""}
        ${H==="profile"?ci():""}
        ${H==="history"?hi():""}
        ${H==="habits"?$i():""}
        ${H==="settings"?Gi():""}
      </main>
      ${["today","habits"].includes(H)&&!t?'<button class="fab" data-action="open-add" aria-label="Add">+</button>':""}
      ${H==="settings"?'<button class="fab" data-action="open-add-habit" aria-label="Add habit">+</button>':""}
      <nav class="tabbar tabs-5">
        <button class="tab ${H==="today"?"active":""}" data-screen="today">${P("home")}Today</button>
        <button class="tab ${H==="profile"?"active":""}" data-screen="profile">${P("profile")}Profile</button>
        <button class="tab ${H==="history"?"active":""}" data-screen="history">${P("history")}History</button>
        <button class="tab ${H==="habits"?"active":""}" data-screen="habits">${P("habit")}Activities</button>
        <button class="tab ${H==="settings"?"active":""}" data-screen="settings">${P("settings")}Settings</button>
      </nav>
    </div>
    ${qi()}
    <div class="toast" id="toast"></div>
  `,Ui(),ui(),Ji(),Vi(),Sa(),Wi()}catch(t){const a=t&&t.stack?String(t.stack).slice(0,400):t&&t.message?t.message:"Unknown error";oe.innerHTML=`<div class="app-shell"><section class="manage-card"><h2>Could not load (Error B)</h2><p class="muted tight">${g(a)}</p><button class="primary-btn full" data-action="reload-app">Reload</button></section></div>`}}}function Wi(){if(A!=="habit"&&A!=="task")return;const t=document.querySelector(".sheet");t&&(t.scrollTop=0);const a=document.querySelector('.sheet input[name="title"]');if(a)try{a.focus({preventScroll:!0})}catch{try{a.focus()}catch{}}}function Ui(){const t=document.getElementById("day-note");t&&t.addEventListener("input",()=>{u.isLocked(v)||u.setNote(v,t.value)})}const zi=3e3,Yi=180,Ve=10,T={list:null,card:null,timer:null,startX:0,startY:0,dragging:!1,order0:"",swallowClick:!1,fromHandle:!1,bound:!1};function ve(){T.timer&&(clearTimeout(T.timer),T.timer=null),T.card=null,T.fromHandle=!1}function Da(t,a){return[...t.querySelectorAll(".item-card[data-sortable]")].filter(e=>e.dataset.sortable===a).map(e=>e.dataset.id)}function Je(t){const a=T.card,e=T.list;if(ve(),T.list=null,T.dragging=!1,!a||(a.classList.remove("is-dragging"),e&&e.classList.remove("is-reordering"),document.body.classList.remove("is-reordering-body"),!t))return;const s=a.dataset.sortable,i=Da(e,s);i.join("|")!==T.order0&&(T.swallowClick=!0,setTimeout(()=>{T.swallowClick=!1},400),s==="habit"?(u.setHabitOrder(i),u.setHabitSort("custom")):s==="task"&&(u.setTaskOrder(v,i),u.setTaskSort("custom")),b(),f("Order saved"))}function Vi(){T.bound||(T.bound=!0,document.addEventListener("pointerdown",t=>{if(t.button!=null&&t.button!==0||t.target.closest("input, textarea, select, img, video, .stars, .mini-btn, .check, .fab, .tabbar"))return;const a=t.target.closest(".item-card[data-sortable]");if(!a)return;const e=a.closest(".list");if(!e||u.isLocked(v))return;const s=a.dataset.sortable,i=u.getSettings(),n=(s==="habit"?i.habitSort:i.taskSort)||"default";n!=="default"&&n!=="custom"&&(s==="habit"?u.setHabitSort("custom"):u.setTaskSort("custom"),f("Switched to Custom order so your drag sticks"));const r=t.target.closest(".drag-handle");r&&t.preventDefault(),ve(),T.list=e,T.card=a,T.fromHandle=!!r,T.startX=t.clientX,T.startY=t.clientY,T.order0=Da(e,s).join("|"),T.timer=setTimeout(()=>{T.timer=null,!(!T.card||!T.card.isConnected)&&(T.dragging=!0,navigator.vibrate&&navigator.vibrate(15),T.card.classList.add("is-dragging"),T.list.classList.add("is-reordering"),document.body.classList.add("is-reordering-body"),f("Drag to reorder, lift to drop"))},r?Yi:zi)},!0),document.addEventListener("pointermove",t=>{if(T.timer&&T.card&&!T.fromHandle&&(Math.abs(t.clientX-T.startX)>Ve||Math.abs(t.clientY-T.startY)>Ve)){ve(),T.list=null;return}if(!T.dragging||!T.card)return;t.preventDefault();const a=T.card,e=T.list;if(!e)return;const s=t.clientY,i=a.dataset.sortable,n=[...e.querySelectorAll(".item-card[data-sortable]")].filter(o=>o!==a&&o.dataset.sortable===i);let r=!1;for(const o of n){const d=o.getBoundingClientRect();if(s<d.top+d.height/2){e.insertBefore(a,o),r=!0;break}}r||e.appendChild(a)},{passive:!1}),document.addEventListener("pointerup",()=>Je(T.dragging)),document.addEventListener("pointercancel",()=>Je(!1)),document.addEventListener("contextmenu",t=>{(T.dragging||T.card)&&t.preventDefault()}),document.addEventListener("touchmove",t=>{T.dragging&&t.preventDefault()},{passive:!1}),document.addEventListener("click",t=>{T.swallowClick&&(t.stopPropagation(),t.preventDefault())},!0))}function Ji(){const t=document.getElementById("lock-time"),a=document.getElementById("auto-lock");t&&t.addEventListener("change",()=>{u.setLockTime(t.value),f(`Lock time set to ${t.value}`),b()}),a&&a.addEventListener("change",()=>{u.setAutoLock(a.checked),f(a.checked?"Auto-lock on":"Auto-lock off"),b()}),document.querySelectorAll("[data-cat-color]").forEach(s=>{s.addEventListener("input",()=>{var n;u.updateCategory(s.dataset.catColor,{color:s.value});const i=(n=s.closest(".cat-manage-card"))==null?void 0:n.querySelector(".cat-swatch");i&&(i.style.background=s.value)})}),document.querySelectorAll("[data-cat-goals]").forEach(s=>{const i=()=>{const n=s.dataset.catGoals,r=s.closest(".cat-manage-card");if(!r)return;const o=Ct((u.getCategories().find(p=>p.id===n)||{}).goals||""),d=Pt(Ct(s.value))!==Pt(o),l=r.querySelector('[data-action="save-cat-goals"]');l&&(l.textContent=d?"Save goals":"Saved");const m=r.querySelector('[data-action="reset-cat-goals"]');m&&(m.hidden=!d);const h=r.querySelector(".cat-goal-hint");h&&(h.textContent=d?"Unsaved changes — press Save to keep them offline and in backups.":"Saved on this device and included in every backup.")};s.addEventListener("input",()=>{yt.set(s.dataset.catGoals,s.value),i()}),s.addEventListener("change",i)});const e=document.getElementById("backup-file");e&&e.addEventListener("change",()=>{const s=e.files[0];if(!s)return;const i=new FileReader;i.onload=()=>{xa(String(i.result||""),s.name),e.value=""},i.onerror=()=>{f("Couldn't read that file."),e.value=""},i.readAsText(s)})}function f(t){const a=document.getElementById("toast");a&&(a.textContent=t,a.classList.add("show"),setTimeout(()=>a.classList.remove("show"),1800))}function Ca(){const t=u.getTheme();document.documentElement.dataset.theme=t;const a=document.querySelector('meta[name="theme-color"]');a&&(a.content=t==="light"?"#f3f1ea":"#0e1116")}function g(t){return String(t||"").split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;").split('"').join("&quot;")}function I(){return u.isLocked(v)?(f("This report is locked. Unlock it in Settings."),!0):!1}function De(t){return{mode:(t==null?void 0:t.mode)||"forever",until:(t==null?void 0:t.until)||"",weekdays:Array.isArray(t==null?void 0:t.weekdays)?t.weekdays.map(Number):[],monthDays:Array.isArray(t==null?void 0:t.monthDays)?t.monthDays.map(Number):[],yearDays:Array.isArray(t==null?void 0:t.yearDays)?[...t.yearDays]:[],customDates:Array.isArray(t==null?void 0:t.customDates)?[...t.customDates]:[],exceptDates:Array.isArray(t==null?void 0:t.exceptDates)?[...t.exceptDates]:Array.isArray(t==null?void 0:t.exceptions)?[...t.exceptions]:[]}}function Qi(t){const a=u.findHabit(t);a&&(A="pin",$={kind:"habit",id:t,title:a.name,pin:a.pin?De(a.pin):{mode:"forever",until:"",weekdays:[],monthDays:[],yearDays:[],customDates:[],exceptDates:[]},_exceptCal:j(v),_customCal:j(v),_yearMonth:"01"})}function Xi(t){const a=u.findTask(v,t);if(!a)return;const e=a.sourcePinId?u.findPinnedTask(a.sourcePinId):null;A="pin",$={kind:"task",id:t,title:a.title,pin:e!=null&&e.pin?De(e.pin):{mode:"forever",until:"",weekdays:[],monthDays:[],yearDays:[],customDates:[],exceptDates:[]},_exceptCal:j(v),_customCal:j(v),_yearMonth:"01"}}function Zi(t){const a=u.findPinnedTask(t);a&&(A="pin",$={kind:"template",id:t,title:a.title,pin:a.pin?De(a.pin):{mode:"forever",until:"",weekdays:[],monthDays:[],yearDays:[],customDates:[],exceptDates:[]},_exceptCal:j(v),_customCal:j(v),_yearMonth:"01"})}function Ki(t){var l;const a=t.querySelector('input[name="mode"]').value,e=((l=t.querySelector('input[name="until"]'))==null?void 0:l.value)||"",s=[...t.querySelectorAll(".weekday.on")].map(m=>Number(m.dataset.day)),i=[...t.querySelectorAll(".monthday.on")].map(m=>Number(m.dataset.day)),n=$&&$.pin||{},r=Array.isArray(n.yearDays)?n.yearDays:[],o=Array.isArray(n.customDates)?n.customDates:[],d=Array.isArray(n.exceptDates)?n.exceptDates:[];return a==="until"&&!e?(f("Pick an until date"),null):a==="weekly"&&!s.length?(f("Pick at least one weekday"),null):a==="monthly"&&!i.length?(f("Pick at least one day of month"),null):a==="yearly"&&!r.length?(f("Add at least one yearly date"),null):a==="custom"&&!o.length?(f("Pick at least one custom date"),null):{mode:a,until:e,weekdays:s,monthDays:i,yearDays:r,customDates:o,exceptDates:d}}function kt(t,a,e){const s=a instanceof Blob?a:new Blob([a],{type:e||"text/plain;charset=utf-8"}),i=URL.createObjectURL(s),n=document.createElement("a");n.href=i,n.download=t,document.body.appendChild(n),n.click(),setTimeout(()=>{document.body.removeChild(n),URL.revokeObjectURL(i)},500)}function wt(t){const a=String(t??"");return/[",\n]/.test(a)?`"${a.replace(/"/g,'""')}"`:a}function Ce(t,a){const[e,s]=u.resolveRange(t,a||v);return{range:t,start:e,end:s,rows:u.exportRows(e,s)}}function Qe(t,a){const e=t||$&&$.range||"day",{start:s,end:i,rows:n}=Ce(e,a),r=[];r.push(["Daily Report export",`${s} to ${i}`].map(wt).join(",")),r.push(["Date","Type","Name","Category","Tags","Points","Rating","Earned","ConsciousPts","Status","Note/Description"].map(wt).join(",")),n.forEach(o=>{o.habits.forEach(d=>{r.push([o.date,"Habit",d.name,d.category,(d.tags||[]).join("|"),d.points,d.rating,d.earned,d.consciousPoints,d.status||(d.rating>0?"done":o.locked?"missed":"pending"),d.description||""].map(wt).join(","))}),o.tasks.forEach(d=>{r.push([o.date,"Task",d.hasImage?`${d.title} [photo]`:d.title,d.category,(d.tags||[]).join("|"),d.points,d.rating||"",d.earned,"",d.status||(d.done?"done":o.locked?"missed":"pending"),d.description||""].map(wt).join(","))}),r.push([o.date,"Summary",`Earned ${o.earned}/${o.max} (${o.percent}%)`,"","","","","","",o.locked?"locked":"open",o.note||""].map(wt).join(","))}),kt(`daily-report-${e}-${s}-to-${i}.csv`,"\uFEFF"+r.join(`
`),"text/csv;charset=utf-8"),f("Excel (CSV) exported")}function Xe(t,a){const e=t||$&&$.range||"day",{start:s,end:i,rows:n}=Ce(e,a),r={app:"Daily Report",exportedAt:new Date().toISOString(),range:e,start:s,end:i,days:n};kt(`daily-report-${e}-${s}-to-${i}.json`,JSON.stringify(r,null,2),"application/json"),f("JSON exported")}function Ze(t,a){const e=t||$&&$.range||"day",{start:s,end:i,rows:n}=Ce(e,a),r=n.map(d=>`
        <section style="margin-bottom:18px;border:1px solid #ddd;border-radius:12px;padding:12px">
          <h2 style="margin:0 0 4px;font-size:16px">${g(d.date)} — ${d.earned}/${d.max} pts (${d.percent}%)</h2>
          <p style="margin:0 0 8px;font-size:12px;color:#555">Habits ${d.habitScore} + Conscious ${d.consciousScore} + Tasks ${d.taskScore} · ${d.locked?"Locked":"Open"}${d.note?` · Note: ${g(d.note)}`:""}</p>
          <table style="width:100%;border-collapse:collapse;font-size:12px">
            <thead><tr><th align="left">Type</th><th align="left">Name</th><th align="left">Category</th><th>Points</th><th>Rating</th><th>Earned</th><th>Status</th></tr></thead>
            <tbody>
              ${d.habits.map(l=>`<tr><td>Habit</td><td>${g(l.name)}${l.description?` (${g(l.description)})`:""}</td><td>${g(l.category)}</td><td align="center">${l.points}${l.consciousPoints?`+${l.consciousPoints}🧠`:""}</td><td align="center">${l.rating||"-"}/5</td><td align="center">${l.earned}</td><td align="center">${l.status||(l.rating>0?"done":d.locked?"missed":"pending")}</td></tr>`).join("")}
              ${d.tasks.map(l=>`<tr><td>Task</td><td>${g(l.title)}${l.hasImage?" 📷":""}${l.description?` (${g(l.description)})`:""}</td><td>${g(l.category)}</td><td align="center">${l.points}</td><td align="center">${l.rating?`${l.rating}/5`:"-"}</td><td align="center">${l.earned}</td><td align="center">${l.status||(l.done?"done":d.locked?"missed":"pending")}</td></tr>`).join("")}
            </tbody>
          </table>
        </section>
      `).join(""),o=window.open("","_blank");if(!o){f("Popup blocked — allow popups to export PDF");return}o.document.write(`<!DOCTYPE html><html><head><title>Daily Report ${s} to ${i}</title></head><body style="font-family:sans-serif;padding:24px"><h1>Daily Report — ${s} to ${i}</h1>${r}<script>window.onload=function(){window.print()}<\/script></body></html>`),o.document.close(),f("PDF print view opened")}document.addEventListener("click",t=>{const a=t.target.closest("[data-screen]");if(a){H=a.dataset.screen,b();return}const e=t.target.closest("[data-action]");if(!e)return;const s=e.dataset.action;if(s==="close-modal"){if(A==="image"){A=null,$=null,b();return}(t.target.classList.contains("modal-backdrop")||e.classList.contains("ghost-btn"))&&(A=null,$=null,b());return}if(s==="note-bullets"){_e("bullets");return}if(s==="note-numbered"){_e("numbered");return}if(s==="values-bullets"){qe("bullets");return}if(s==="values-numbered"){qe("numbered");return}if(s==="pick-task-image"){const i=document.getElementById("task-image-input");i?i.click():f("Photo picking needs a browser file picker");return}if(s==="remove-task-image"){$&&($._image="",b(),f("Photo removed — save to apply"));return}if(s==="view-task-image"){const i=u.findTask(v,e.dataset.id),n=i&&i.image?i.image:$&&($._image||$.image)||"";if(!n){f("No photo on this task");return}A="image",$={image:n,title:i&&i.title||"Task photo"},b();return}if(s==="prev-day"&&je(-1),s==="next-day"&&je(1),s==="reload-app"){window.location.reload();return}if(s==="set-theme"){const i=e.dataset.theme==="light"?"light":"dark";u.setTheme(i),Ca(),f(i==="light"?"Light mode on":"Dark mode on")}if(s==="install-app"){Hi();return}if(s==="check-updates"){Ri();return}if(s==="apply-update"){Aa();return}if(s==="backup-now"){Ei();return}if(s==="trigger-import"){const i=document.getElementById("backup-file");i&&i.click();return}if(s==="choose-folder"){Ci();return}if(s==="grant-folder"){Li();return}if(s==="forget-folder"){Pi();return}if(s==="restore-backup"){Ni(e.dataset.name);return}if(s==="goto-settings"&&(H="settings"),s==="open-add-habit"&&(A="habit",$=null),s==="open-add-task"){if(I())return;A="task",$={category:"mentally"}}if(s==="open-add"){if(I())return;A="choose",$={category:"mentally"}}if(s==="toggle-edit"&&(Q=!Q),s==="toggle-settings-edit"){ut=!ut,b();return}if(s==="toggle-setting-habit"){const i=e.dataset.id;jt.has(i)?jt.delete(i):jt.add(i),b();return}if(s==="toggle-settings-section"){const i=e.dataset.id;xt.has(i)?xt.delete(i):xt.add(i),i==="tutorials"&&!xt.has("tutorials")&&(Ft=null),b();return}if(s==="open-tutorial"){Ft=Ft===e.dataset.id?null:e.dataset.id,b();return}if(s==="toggle-activity-cat"){const i=e.dataset.id;Gt.has(i)?Gt.delete(i):Gt.add(i),b();return}if(s==="add-goal-item"){const i=e.dataset.id,n=document.getElementById(`goal-item-input-${i}`),r=u.addGoalItem(i,n?n.value:"");r.ok?f("Task added to goal"):f(r.reason||"Could not add a task"),b();return}if(s==="toggle-goal-item"){const{id:i,item:n,done:r}=e.dataset,o=u.setGoalItemDone(i,n,r!=="true");if(!o.ok){f(o.reason||"Could not update the task"),b();return}const d=o.awarded&&o.awarded.length?o.awarded:u.checkGoals(v);d.length?f(`🏅 Reward earned: ${d[0].rewardTitle}!`):o.autoLocked&&f("All tasks done — goal completed and locked 🔒"),b();return}if(s==="remove-goal-item"){const i=u.removeGoalItem(e.dataset.id,e.dataset.item);f(i.ok?"Task removed from goal":i.reason||"Could not remove"),b();return}if(s==="lock-goal"){const i=u.findGoal(e.dataset.id),n=u.setGoalLocked(e.dataset.id,!0),r=i&&n.ok&&i.tasks.length>0&&!i.tasks.every(o=>o.done);n.ok?f(r?"Goal locked and terminated ⛔":"Goal locked 🔒"):f(n.reason||"Could not lock"),b();return}if(s==="unlock-goal"){const i=u.setGoalLocked(e.dataset.id,!1);f(i.ok?"Goal unlocked":i.reason||"Could not unlock"),b();return}if(s==="move-pinned-habit"){const i=u.getPinnedHabits(),n=i.findIndex(o=>o.id===e.dataset.id),r=n+(Number(e.dataset.dir)||0);if(n>=0&&r>=0&&r<i.length){const o=i[n];i[n]=i[r],i[r]=o,u.setPinnedHabitOrder(i.map(d=>d.id))}b();return}if(s==="move-pinned-task"){const i=u.getPinnedTasks(),n=i.findIndex(o=>o.id===e.dataset.id),r=n+(Number(e.dataset.dir)||0);if(n>=0&&r>=0&&r<i.length){const o=i[n];i[n]=i[r],i[r]=o,u.setPinnedTaskOrder(i.map(d=>d.id))}b();return}if(s==="open-habit-activity-date"){v=e.dataset.date,H="today",b();return}if(s==="open-edit-habit"){const i=u.findHabit(e.dataset.id);if(!i)return;A="edit-habit",$={id:i.id,name:i.name,description:i.description||"",points:i.points,category:i.category,tags:i.tags||[],consciousPoints:Number(i.consciousPoints)||0}}if(s==="open-edit-task"){if(I())return;const i=u.findTask(v,e.dataset.id);if(!i)return;A="edit-task",$={id:i.id,title:i.title,points:i.points,description:i.description,category:i.category,tags:i.tags||[],rating:Number(i.rating)||0,image:i.image||"",_image:void 0}}if(s==="open-edit-pinned-task"){const i=u.findPinnedTask(e.dataset.id);if(!i)return;A="edit-pinned-task",$={id:i.id,title:i.title,points:i.points,description:i.description||"",category:i.category,tags:i.tags||[],rating:0,image:i.image||"",_image:void 0}}if(s==="toggle-badges"&&(Vt=!Vt),s==="open-goal"&&(A="goal",$={kind:"habit-streak",targetDays:7,tier:"bronze"}),s==="open-edit-goal"){const i=u.getGoals().find(n=>n.id===e.dataset.id);if(!i)return;A="edit-goal",$={...i}}if(s==="remove-goal"&&(u.removeGoal(e.dataset.id),f("Goal removed")),s==="remove-badge"&&(u.removeBadge(e.dataset.id),f("Badge removed")),s==="rate-habit"){if(I())return;const n=u.habitRating(v,e.dataset.id)===Number(e.dataset.rating)?0:Number(e.dataset.rating);u.setHabitRating(v,e.dataset.id,n)}if(s==="rate-task"){if(I())return;const i=u.findTask(v,e.dataset.id);if(!i)return;const r=(Number(i.rating)||0)===Number(e.dataset.rating)?0:Number(e.dataset.rating);u.setTaskRating(v,e.dataset.id,r)}if(s==="open-export"&&(A="export",$={range:$&&$.range||"day"}),s==="set-export-range"){A="export",$={range:e.dataset.range||"day"},b();return}if(s==="do-export"){const i=e.dataset.format,n=$&&$.range||"day";i==="csv"&&Qe(n,v),i==="json"&&Xe(n,v),i==="pdf"&&Ze(n,v),A=null,$=null}if(s==="set-histexp-range"){_=["day","week","month","year"].includes(e.dataset.range)?e.dataset.range:"day",b();return}if(s==="histexp-do"){const i=e.dataset.format;let n=v;if(_==="day"||_==="week"){const r=document.getElementById("histexp-date");r&&/^\d{4}-\d{2}-\d{2}$/.test(r.value)&&(n=r.value)}else if(_==="month"){const r=document.getElementById("histexp-month");r&&/^\d{4}-\d{2}$/.test(r.value)&&(n=`${r.value}-15`)}else if(_==="year"){const r=document.getElementById("histexp-year"),o=Number(r&&r.value);Number.isInteger(o)&&o>=2e3&&o<=2100&&(n=`${String(o)}-06-15`)}i==="csv"&&Qe(_,n),i==="json"&&Xe(_,n),i==="pdf"&&Ze(_,n);return}if(s==="history-cal-nav"){const i=Qt||j(v);Qt=At(i,Number(e.dataset.dir)||0),b();return}if(s==="locked-cal-nav"){const i=Xt||j(v);Xt=At(i,Number(e.dataset.dir)||0),b();return}if(s==="toggle-locked-day"){const i=e.dataset.date,n=R.indexOf(i);n>=0?R.splice(n,1):R.push(i),b();return}if(s==="lock-selected"){const i=[...R].sort();if(!i.length)return;const n=u.lockDays(i);R=[],f(n===1?`Locked ${n} day`:`Locked ${n} days`),b();return}if(s==="unlock-selected"){const i=[...R].sort();if(!i.length)return;const n=u.unlockDays(i);R=[],f(n===1?`Unlocked ${n} day`:`Unlocked ${n} days`),b();return}if(s==="submit-day"&&(u.submitDay(v),f("Report submitted and locked")),s==="unlock-day"&&(u.unlockDay(e.dataset.date),f("Report unlocked")),s==="toggle-habit"){if(I())return;u.toggleHabit(v,e.dataset.id),b()}if(s==="toggle-task"){if(I())return;u.toggleTask(v,e.dataset.id),b()}if(s==="remove-task"){if(!Q||I())return;u.removeTask(v,e.dataset.id),b()}if(s==="remove-habit"&&(u.removeHabit(e.dataset.id),b()),s==="restore-habit"){const i=u.restoreHabit(e.dataset.id);f(i.ok?"Habit restored":i.reason||"Could not restore that habit"),b()}if(s==="toggle-archive"){pt=!pt,b();return}if(s==="archive-habit"){u.removeHabit(e.dataset.id),pt=!0,f("Habit archived — restore it from the Archive"),b();return}if(s==="archive-task"){if(I())return;const i=u.archiveTask(v,e.dataset.id);if(!i.ok){f(i.reason||"Could not archive that task");return}pt=!0,f("Task archived — restore it from the Archive"),b();return}if(s==="restore-task"){const i=u.isLocked(v)?u.todayKey():v,n=u.restoreTask(e.dataset.id,i);n.ok?f(n.from&&n.from!==i?`Task restored to ${i} — forwarded from ${n.from}`:`Task restored to ${i}`):f(n.reason||"Could not restore that task"),i!==v&&(v=i),b();return}if(s==="delete-archived-task"){if(!Q||!window.confirm("Delete this archived task permanently? This cannot be undone."))return;const i=u.deleteArchivedTask(e.dataset.id);f(i.ok?"Task deleted permanently":i.reason||"Could not delete"),b();return}if(s==="delete-archived-habit"){if(!window.confirm("Delete this archived habit permanently? This cannot be undone."))return;const i=u.deleteArchivedHabit(e.dataset.id);f(i.ok?"Habit deleted permanently":i.reason||"Could not delete"),b();return}if(s==="open-pin-habit"&&Qi(e.dataset.id),s==="open-replace-habit"){if(I())return;const i=u.findHabit(e.dataset.id);if(!i)return;const n=u.habitReplaceDays(v,i.id);A="replace",$={id:i.id,title:i.name,from:v,info:n};return}if(s==="pick-replace-day"){const i=document.querySelector('.sheet input[name="targetDate"]');i&&(i.value=e.dataset.date),document.querySelectorAll(".replace-day-chip").forEach(n=>{n.classList.toggle("on",n.dataset.date===e.dataset.date)});return}if(s==="undo-replace-habit"){if(I())return;const i=u.undoReplaceHabit(e.dataset.id,e.dataset.from,e.dataset.to);f(i.ok?"Habit is due on this day again":i.reason||"Could not undo that"),b();return}if(s==="open-forward-task"){if(I())return;const i=u.findTask(v,e.dataset.id);if(!i)return;A="forward",$={kind:"task",id:i.id,title:i.title,from:v}}if(s==="open-pin-task"){if(I())return;Xi(e.dataset.id)}if(s==="open-pin-template"&&Zi(e.dataset.id),s==="unpin-template"&&(u.unpinTaskTemplate(e.dataset.id),f("Task unpinned — removed from today and all upcoming days")),s==="pick-date"&&(v=e.dataset.date,et=0,H="today"),s==="set-chart-range"){J=["week","month","year"].includes(e.dataset.range)?e.dataset.range:"week",it=0,b();return}if(s==="set-chart-cat"){Z=e.dataset.cat||"all",b();return}if(s==="week-nav"){et+=Number(e.dataset.dir)||0,et>0&&(et=0),b();return}if(s==="chart-nav"){it+=Number(e.dataset.dir)||0,it>0&&(it=0),b();return}if(s==="add-category"){const i=document.getElementById("new-category"),n=u.addCategory(i?i.value:"");f(n.ok?"Category added":n.reason||"Couldn't add category"),b();return}if(s==="rename-category"){const i=u.getCustomCategories().find(o=>o.id===e.dataset.id),n=window.prompt("Rename category",i?i.label:"");if(n==null)return;const r=u.renameCategory(e.dataset.id,n);f(r.ok?"Category renamed":r.reason||"Couldn't rename"),b();return}if(s==="delete-category"){if(!window.confirm("Delete this category? Its habits and tasks move to Mentally."))return;const i=u.deleteCategory(e.dataset.id);i.ok&&ct.delete(e.dataset.id),f(i.ok?"Category deleted":i.reason||"Couldn't delete"),b();return}if(s==="rename-tag"){const i=window.prompt("Rename tag everywhere",e.dataset.tag||"");if(i==null)return;const n=u.renameTag(e.dataset.tag,i);f(n.ok?n.merged?"Tags merged":"Tag renamed everywhere":n.reason||"Couldn't rename"),b();return}if(s==="delete-tag"){if(!window.confirm(`Delete tag "#${e.dataset.tag}" from all habits and tasks?`))return;u.deleteTag(e.dataset.tag),f("Tag deleted everywhere"),b();return}if(s==="add-tag"){const i=document.getElementById("tag-habit-pick"),n=document.getElementById("new-tag"),r=u.addTagToHabit(i?i.value:"",n?n.value:"");f(r.ok?"Tag added to habit":r.reason||"Couldn't add tag"),b();return}if(s==="set-points"){const i=document.querySelector('input[name="points"]');i&&(i.value=e.dataset.points),document.querySelectorAll(".chip-row .chip[data-points]").forEach(n=>n.classList.remove("on")),e.classList.add("on");return}if(s==="set-category"){const i=e.closest("form")||e.closest(".sheet"),n=i.querySelector('input[name="category"]');n&&(n.value=e.dataset.category),i.querySelectorAll(".cat-row .chip").forEach(r=>r.classList.remove("on")),e.classList.add("on");return}if(s==="set-rating"){const i=e.closest(".sheet")||e.closest("form")||document,n=i.querySelector('input[name="rating"]');n&&(n.value=e.dataset.rating),i.querySelectorAll(".rating-row .chip").forEach(r=>r.classList.remove("on")),e.classList.add("on");return}if(s==="set-conscious"){const i=e.closest(".sheet")||e.closest("form")||document,n=i.querySelector('input[name="consciousPoints"]');n&&(n.value=e.dataset.conscious),i.querySelectorAll(".conscious-row .chip").forEach(r=>r.classList.remove("on")),e.classList.add("on");return}if(s==="set-goal-kind"){const i=e.closest(".sheet")||document,n=i.querySelector('input[name="kind"]');n&&(n.value=e.dataset.kind),i.querySelectorAll(".goal-kind-row .chip").forEach(m=>m.classList.remove("on")),e.classList.add("on");const r=e.dataset.kind,o=i.querySelector(".goal-target-habit"),d=i.querySelectorAll(".goal-target-task, .goal-target-days"),l=i.querySelector(".goal-attach");o&&(o.style.display=r==="habit-streak"?"":"none"),d.forEach(m=>{m.style.display=r==="task-streak"||r==="perfect-days"?"":"none"}),l&&(l.style.display=r==="task-list"?"":"none"),$&&($.kind=r);return}if(s==="set-goal-tier"){const i=e.closest(".sheet")||document,n=i.querySelector('input[name="tier"]');n&&(n.value=e.dataset.tier),i.querySelectorAll(".goal-tier-row .chip").forEach(r=>r.classList.remove("on")),e.classList.add("on");return}if(s==="pin-mode"){const i=e.closest("form"),n=e.dataset.mode;i.querySelector('input[name="mode"]').value=n,i.querySelectorAll(".pin-modes .chip").forEach(o=>o.classList.remove("on")),e.classList.add("on");const r=(o,d)=>{const l=i.querySelector(o);l&&(l.style.display=d?"":"none")};r(".pin-until",n==="until"),r(".pin-weekdays",n==="weekly"),r(".pin-monthdays",n==="monthly"),r(".pin-yeardays",n==="yearly"),$&&$.pin&&($.pin.mode=n);return}if(s==="toggle-weekday"){e.classList.toggle("on");return}if(s==="toggle-monthday"){e.classList.toggle("on");return}if(s==="pin-cal-nav"){if(!$)return;const i=e.dataset.target,n=Number(e.dataset.dir)||0;i==="except"?$._exceptCal=At($._exceptCal||j(v),n):$._customCal=At($._customCal||j(v),n),b();return}if(s==="toggle-pin-date"){if(!$||!$.pin)return;const i=e.dataset.target,n=e.dataset.date,r=i==="custom"?"customDates":"exceptDates",o=Array.isArray($.pin[r])?[...$.pin[r]]:[],d=o.indexOf(n);d>=0?o.splice(d,1):(o.push(n),o.length>365&&o.shift()),$.pin[r]=o.sort(),b();return}if(s==="add-year-day"){if(!$||!$.pin)return;const i=e.closest("form")||document,n=i.querySelector("#year-month-select"),r=i.querySelector("#year-day-select");n&&($._yearMonth=n.value);const o=`${n?n.value:"01"}-${r?r.value:"01"}`,d=Array.isArray($.pin.yearDays)?[...$.pin.yearDays]:[];d.includes(o)||d.push(o),$.pin.yearDays=d.sort(),b();return}if(s==="remove-year-day"){if(!$||!$.pin)return;const i=e.dataset.date;$.pin.yearDays=($.pin.yearDays||[]).filter(n=>n!==i),b();return}if(s==="clear-pin"){const i=e.closest("form"),n=i.dataset.kind,r=i.dataset.id;let o=!1;if(n==="habit"&&u.unpinHabit(r),n==="task"){const d=u.findTask(v,r);d!=null&&d.sourcePinId&&(u.unpinTaskTemplate(d.sourcePinId),o=!0)}n==="template"&&(u.unpinTaskTemplate(r),o=!0),A=null,$=null,f(o?"Task unpinned — removed from today and all upcoming days":"Unpinned"),b();return}if(s==="lock-profile"){u.setProfileLocked(!0),f("Profile locked — read only"),b();return}if(s==="unlock-profile"){u.setProfileLocked(!1),f("Profile unlocked"),b();return}if(s==="add-whoami"){const i=document.getElementById("new-whoami"),n=u.addWhoAmI(i?i.value:"");f(n.ok?"Added":n.reason||"Couldn't add"),b();return}if(s==="move-whoami"){u.moveWhoAmI(e.dataset.id,Number(e.dataset.dir)||0),b();return}if(s==="remove-whoami"){u.removeWhoAmI(e.dataset.id),f("Removed"),b();return}if(s==="add-lifearea"){const i=document.getElementById("new-lifearea"),n=u.addLifeArea(i?i.value:"");n.ok?(gt=n.id,f("Life area added")):f(n.reason||"Couldn't add"),b();return}if(s==="toggle-lifearea"){const i=e.dataset.id;gt=gt===i?null:i,b();return}if(s==="move-lifearea"){u.moveLifeArea(e.dataset.id,Number(e.dataset.dir)||0),b();return}if(s==="toggle-cat"){const i=e.dataset.id;ct.has(i)?ct.delete(i):ct.add(i),b();const n=document.querySelector(`[data-action="toggle-cat"][data-id="${CSS.escape(i)}"]`);n&&n.focus({preventScroll:!0});return}if(s==="expand-cats"){u.getCategories().forEach(i=>ct.add(i.id)),b();return}if(s==="collapse-cats"){ct.clear(),b();return}if(s==="save-cat-goals"){const i=e.dataset.id,n=document.querySelector(`[data-cat-goals="${CSS.escape(i)}"]`),r=n?n.value:yt.get(i)||"",o=Ct(r);u.updateCategory(i,{goals:Pt(o)}),yt.delete(i),f(o.length?`Saved ${o.length} goal${o.length===1?"":"s"} for ${nt(i)}`:`Cleared goals for ${nt(i)}`),b();return}if(s==="reset-cat-goals"){const i=e.dataset.id;yt.delete(i),b();return}if(s==="remove-lifearea"){u.removeLifeArea(e.dataset.id),gt===e.dataset.id&&(gt=null),f("Life area removed"),b();return}if(s==="set-pgoal-term"){K=["short","medium","long"].includes(e.dataset.term)?e.dataset.term:"short",vt=u.profileGoalDurations()[K][0],b();return}if(s==="set-pgoal-filter"){Bt=["all","short","medium","long"].includes(e.dataset.filter)?e.dataset.filter:"all",b();return}if(s==="add-pgoal"){const i=document.getElementById("new-pgoal"),n=document.getElementById("new-pgoal-duration"),r=u.addProfileGoal(i?i.value:"",K,n?n.value:vt);f(r.ok?`Goal added ${_t(K)}`:r.reason||"Couldn't add"),b();return}if(s==="remove-pgoal"){u.removeProfileGoal(e.dataset.id),f("Goal removed"),b();return}if(s==="add-idea"){const i=document.getElementById("new-idea"),n=String(i?i.value:"").trim().slice(0,200);if(!n){f("Write an idea first");return}if(u.isProfileLocked()){f("Profile is locked");return}const r=String(u.getProfile().ideas||"").split(`
`).map(o=>o.trim()).filter(Boolean);r.push(`• ${n}`),u.setProfileField("ideas",r.join(`
`)),f("Idea added"),b();return}if(s==="remove-idea"){if(u.isProfileLocked())return;const i=Number(e.dataset.index),n=String(u.getProfile().ideas||"").split(`
`).filter(r=>r.trim());if(!Number.isInteger(i)||i<0||i>=n.length)return;n.splice(i,1),u.setProfileField("ideas",n.join(`
`)),f("Idea removed"),b();return}if(s==="add-quote"){const i=document.getElementById("new-quote"),n=document.getElementById("new-quote-author"),r=u.addQuote(i?i.value:"",n?n.value:"");f(r.ok?"Quote added":r.reason||"Couldn't add"),b();return}if(s==="toggle-quote-fav"){u.toggleQuoteFav(e.dataset.id),b();return}if(s==="remove-quote"){u.removeQuote(e.dataset.id),f("Quote removed"),b();return}if(s==="toggle-quotes"){Dt=!Dt,b();return}b()});document.addEventListener("submit",t=>{const a=t.target.closest("[data-form]");if(!a)return;t.preventDefault();const e=a.dataset.form;if(e==="habit"||e==="task"||e==="edit-habit"||e==="edit-task"||e==="edit-pinned-task"){const s=new FormData(a),i=String(s.get("title")||""),n=Number(s.get("points")||0),r=String(s.get("category")||"mentally"),o=String(s.get("description")||""),d=String(s.get("tags")||""),l=Math.max(0,Math.min(5,Number(s.get("rating")||0))),m=Math.max(0,Math.min(100,Number(s.get("consciousPoints")||0)));if(!i.trim())return;const h=$&&$._image!==void 0?q($._image):q($&&$.image);if(e==="habit")u.addHabit(i,n,{description:o,category:r,consciousPoints:m,tags:d,startFrom:v}),f("Habit added");else if(e==="task"){const p=String(s.get("goalTarget")||"");if(p){const k=u.addGoalItem(p,i);if(!k.ok){f(k.reason||"Could not add the task to the goal");return}const x=u.findGoal(p);f(`Added to goal “${x?x.title:i}”`)}else{if(I())return;u.addTask(v,i,n,{description:o,category:r,rating:l,tags:d,image:h}),f("Task added")}}else if(e==="edit-habit")u.updateHabit(a.dataset.id,{name:i,description:o,points:n,category:r,consciousPoints:m,tags:d}),f("Habit updated");else if(e==="edit-pinned-task")u.updatePinnedTaskDetails(a.dataset.id,{title:i,description:o,points:n,category:r,tags:d,image:h}),f("Pinned task updated");else{if(I())return;u.updateTask(v,a.dataset.id,{title:i,points:n,description:o,category:r,rating:l,tags:d,image:h}),f("Task updated");const p=String(s.get("goalTarget")||"");if(p){const k=u.addGoalItems(p,[i]);k.ok&&k.added?f(`Attached to goal “${(u.findGoal(p)||{}).title}”`):k.ok?f("Already on that goal’s list"):f(k.reason||"Could not attach to the goal")}}A=null,$=null,b();return}if(e==="pin"){const s=Ki(a);if(!s)return;const i=a.dataset.kind,n=a.dataset.id;i==="habit"&&u.pinHabit(n,s),i==="task"&&u.pinTask(v,n,s),i==="template"&&u.updatePinnedTask(n,s),A=null,$=null,f("Pin saved"),b();return}if(e==="replace"){const s=new FormData(a),i=String(s.get("targetDate")||""),n=a.dataset.id,r=$&&$.from||v,o=u.replaceHabit(r,n,i);if(!o.ok){f(o.reason||"Could not replace that habit day");return}A=null,$=null,f(`Habit moved from ${o.from} to ${o.to}`),b();return}if(e==="goal"||e==="edit-goal"){const s=new FormData(a),i=String(s.get("title")||"").trim(),n=String(s.get("kind")||"habit-streak"),r=String(s.get("tier")||"bronze"),o=String(s.get("rewardTitle")||"").trim(),d=Math.max(1,Math.min(365,Number(s.get("targetDays")||7)));if(!i||!o){f("Goal title and reward title are required");return}let l="";if(n==="habit-streak"&&(l=String(s.get("habitTarget")||"")),n==="task-streak"&&(l=String(s.get("taskTarget")||"")),(n==="habit-streak"||n==="task-streak")&&!l){f(n==="habit-streak"?"Pick a habit":"Pin a task first, then pick it");return}if(e==="goal"){const h=u.addGoal({title:i,kind:n,targetId:l,targetDays:d,tier:r,rewardTitle:o});if(n==="task-list"){const p=Array.from(a.querySelectorAll('input[name="attachTask"]:checked')).map(x=>x.value),k=u.addGoalItems(h.id,p);f(k.added?`Goal added with ${k.added} task(s)`:"Goal added")}else f("Goal added")}else if(u.updateGoal(a.dataset.id,{title:i,kind:n,targetId:l,targetDays:d,tier:r,rewardTitle:o}),n==="task-list"){const h=Array.from(a.querySelectorAll('input[name="attachTask"]:checked')).map(k=>k.value),p=u.addGoalItems(a.dataset.id,h);f(p.added?`Goal updated — ${p.added} task(s) attached`:"Goal updated")}else f("Goal updated");const m=u.checkGoals(v);m.length&&f(`🏅 Reward earned: ${m[0].rewardTitle}!`),A=null,$=null,b()}});document.addEventListener("change",t=>{const a=t.target.closest(".sort-select");if(a){const e=a.dataset.sortKind;e==="habit"&&u.setHabitSort(a.value),e==="task"&&u.setTaskSort(a.value),b()}if(t.target&&t.target.id==="show-conscious"&&(u.setShowConscious(t.target.checked),f(t.target.checked?"Conscious points on":"Conscious points hidden"),b()),t.target&&t.target.id==="week-start"&&(u.setWeekStart(Number(t.target.value)),f("Week starts on "+t.target.selectedOptions[0].textContent),b()),t.target&&t.target.id==="new-pgoal-duration"){vt=t.target.value;return}if(t.target&&t.target.id==="year-month-select"&&$&&($._yearMonth=t.target.value),t.target&&t.target.id==="task-image-input"){const e=t.target.files&&t.target.files[0];if(!e)return;if(!String(e.type||"").startsWith("image/")){f("Please pick an image file"),t.target.value="";return}f("Processing photo…"),ii(e).then(s=>{if(t.target.value="",!s){f("Photo too large or unreadable — try a smaller one");return}$&&($._image=s,b(),f("Photo attached — save to apply"))})}});function ts(){const t=window.visualViewport;if(!t)return;const a=document.documentElement,e=()=>{a.style.setProperty("--vvh",`${Math.max(0,Math.round(t.height))}px`);const s=window.innerHeight-t.height>120;a.classList.toggle("vk-open",s)};t.addEventListener("resize",e),t.addEventListener("scroll",e),e()}ts();if("serviceWorker"in navigator){window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js").catch(()=>{})});let t=!1;try{const a=Number(sessionStorage.getItem("dr-reload-at")||0);Date.now()-a<8e3&&(t=!0)}catch{}navigator.serviceWorker.addEventListener("controllerchange",()=>{if(!t){t=!0;try{sessionStorage.setItem("dr-reload-at",String(Date.now()))}catch{}window.location.reload()}})}function es(){const t=document.getElementById("boot-error");t&&(t.style.display="none")}es();Ca();b();Ti().then(()=>{H==="settings"&&b()});setInterval(()=>{!document.hidden&&Se()&&b()},6e4);document.addEventListener("visibilitychange",()=>{!document.hidden&&Se()&&b()});
