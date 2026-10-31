(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function a(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=a(i);fetch(i.href,n)}})();const Ke="daily-report-v2",Et=[{id:"mentally",label:"Mentally"},{id:"psychology",label:"Psychology"},{id:"physically",label:"Physically"},{id:"spiritually",label:"Spiritually"},{id:"socially",label:"Socially"}];Et.map(t=>t.id);const ta=[{id:"h1",name:"Wake up early",points:10,icon:"sunrise",category:"physically",pin:{mode:"forever"}},{id:"h2",name:"Drink water",points:5,icon:"drop",category:"physically",pin:{mode:"forever"}},{id:"h3",name:"Exercise",points:15,icon:"bolt",category:"physically",pin:{mode:"forever"}},{id:"h4",name:"Read 20 minutes",points:10,icon:"book",category:"mentally",pin:{mode:"forever"}},{id:"h5",name:"No junk food",points:10,icon:"leaf",category:"physically",pin:{mode:"forever"}}],ea={lockTime:"21:00",autoLock:!0,showConscious:!0,habitSort:"default",taskSort:"default",theme:"dark",habitOrder:[],pinnedTaskOrder:[],weekStart:1};function de(t){const e=Number(t);return Number.isInteger(e)&&e>=0&&e<=6?e:1}const Lt=[{id:"iron",label:"Iron",medal:"🥉",rank:1},{id:"bronze",label:"Bronze",medal:"🥉",rank:2},{id:"silver",label:"Silver",medal:"🥈",rank:3},{id:"gold",label:"Gold",medal:"🥇",rank:4}],aa=[{id:"habit-streak",label:"Habit streak"},{id:"task-streak",label:"Pinned task streak"},{id:"perfect-days",label:"Perfect days (100%)"},{id:"task-list",label:"List of tasks goal"}];function Pe(t){var e;return((e=Lt.find(a=>a.id===t))==null?void 0:e.rank)||0}function qt(t){var e;return((e=Lt.find(a=>a.id===t))==null?void 0:e.medal)||"🏅"}function ia(t){var e;return((e=Lt.find(a=>a.id===t))==null?void 0:e.label)||t||"Badge"}function C(t){const e=Array.isArray(t)?t:String(t||"").split(","),a=[];return e.forEach(s=>{const i=String(s||"").trim().slice(0,20);i&&!a.some(n=>n.toLowerCase()===i.toLowerCase())&&a.push(i),a.length>=10}),a.slice(0,10)}function ie(t,e){const a=[...t];return e==="points"?a.sort((s,i)=>(Number(i.points)||0)-(Number(s.points)||0)):e==="category"?a.sort((s,i)=>nt(E(s.category)).localeCompare(nt(E(i.category)))):e==="tags"&&a.sort((s,i)=>(s.tags&&s.tags[0]||"~~~").localeCompare(i.tags&&i.tags[0]||"~~~")),a}const ft=[{value:1,label:"Mon"},{value:2,label:"Tue"},{value:3,label:"Wed"},{value:4,label:"Thu"},{value:5,label:"Fri"},{value:6,label:"Sat"},{value:0,label:"Sun"}];function B(t=new Date){const e=t.getFullYear(),a=String(t.getMonth()+1).padStart(2,"0"),s=String(t.getDate()).padStart(2,"0");return`${e}-${a}-${s}`}function ke(){return{habits:{},habitRatings:{},habitMissed:{},habitForwarded:{},tasks:[],note:"",locked:!1,lockOverride:null,submittedAt:null,lockedHabits:null,skippedPins:[]}}var F=[],K={};function Pa(t){const e=K[t.id];return e?{...t,color:e.color||t.color,goals:e.goals!==void 0?e.goals:t.goals}:t}function at(){return[...Et.map(Pa),...F]}function E(t){return at().map(a=>a.id).includes(t)?t:"mentally"}function nt(t){var e;return((e=at().find(a=>a.id===t))==null?void 0:e.label)||"Mentally"}const Ot=7e5;function q(t){const e=String(t||"");return e.startsWith("data:image/")?e.length>Ot?"":e:""}function Ee(t){const e=Math.max(0,Math.min(5,Number(t.rating)||0)),a=i=>/^\d{4}-\d{2}-\d{2}$/.test(String(i||""))?String(i):"",s=i=>Array.isArray(i)?i.filter(n=>/^\d{4}-\d{2}-\d{2}$/.test(String(n))).map(String).slice(0,50):[];return{...t,description:t.description||"",category:E(t.category),tags:C(t.tags),rating:e,done:!!t.done,missed:!!t.missed,forwardedFrom:a(t.forwardedFrom),forwardedHabitId:String(t.forwardedHabitId||""),forwardedTo:s(t.forwardedTo),image:q(t.image)}}function V(t){const e=Number(t);return!Number.isFinite(e)||e<0?0:Math.min(100,Math.round(e))}function Mt(t){const e=String(t??"").slice(0,10);return/^\d{4}-\d{2}-\d{2}$/.test(e)?e:""}function Nt(t,e){const a=Mt(t&&t.startFrom);return a?String(e)>=a:!0}function $e(t,e){return{id:String(t.id||""),name:String(t.name||"").slice(0,80),description:String(t.description||"").slice(0,2e3),points:Number(t.points)||0,icon:t.icon||"star",category:E(t.category),consciousPoints:V(t.consciousPoints),tags:C(t.tags),pin:G(t.pin),startFrom:Mt(t.startFrom),archivedAt:e||t.archivedAt||null}}function sa(t,e,a){const s=/^\d{4}-\d{2}-\d{2}$/.test(String(a||""))?String(a):"",i=/^\d{4}-\d{2}-\d{2}$/.test(String(t&&t.forwardedFrom||""))?String(t.forwardedFrom):s;return{id:String(t.id||""),title:String(t.title||"Task").slice(0,120),points:Number(t.points)||0,description:String(t.description||"").slice(0,500),category:E(t.category),tags:C(t.tags),image:q(t.image),fromDate:s,originDate:i,archivedAt:e||t.archivedAt||null,sourcePinId:String(t.sourcePinId||"")}}function Ea(t){return Array.isArray(t)?t.filter(e=>e&&typeof e=="object"&&e.id).map(e=>sa(e,e.archivedAt||null,e.fromDate)).filter(e=>e.id.length<=80).slice(0,500):[]}function G(t){if(!t||!t.mode)return null;const e=(i,n,r)=>Array.isArray(i)?i.map(Number).filter(o=>Number.isFinite(o)&&o>=n&&o<=r):[],a=i=>Array.isArray(i)?i.filter(n=>/^\d{4}-\d{2}-\d{2}$/.test(String(n))).map(String).slice(0,365):[],s=i=>Array.isArray(i)?i.filter(n=>/^\d{2}-\d{2}$/.test(String(n))).map(String).slice(0,366):[];return{mode:["forever","until","weekly","monthly","yearly","custom"].includes(t.mode)?t.mode:"forever",until:t.until||"",weekdays:e(t.weekdays,0,6),monthDays:e(t.monthDays,1,31),yearDays:s(t.yearDays),customDates:a(t.customDates),exceptDates:a(t.exceptDates||t.exceptions)}}function La(t,e){const a=`${t} ${e}`.toLowerCase();return a.includes("read")||a.includes("study")||a.includes("learn")?"mentally":a.includes("meditat")||a.includes("pray")||a.includes("journal")?"spiritually":a.includes("mood")||a.includes("calm")||a.includes("therapy")?"psychology":a.includes("friend")||a.includes("family")||a.includes("social")||a.includes("call")||a.includes("visit")?"socially":"physically"}function Ma(t){if(!Array.isArray(t))return[];const e=[];return t.forEach(a=>{if(!a||typeof a!="object")return;const s=String(a.title||a.text||"").trim().slice(0,120);s&&e.push({id:String(a.id||et("gt")),title:s,done:!!a.done,doneAt:a.doneAt||null})}),e.slice(0,100)}function le(t){const e=aa.some(i=>i.id===t.kind)?t.kind:"habit-streak",a=e==="task-list",s=a?Ma(t.tasks):[];return{id:String(t.id||`g${Date.now()}`),title:String(t.title||"").trim().slice(0,60)||"My goal",kind:e,targetId:String(t.targetId||""),targetDays:Math.max(1,Math.min(365,Number(t.targetDays)||7)),tier:Lt.some(i=>i.id===t.tier)?t.tier:"bronze",rewardTitle:String(t.rewardTitle||"").trim().slice(0,60)||"Reward",createdAt:t.createdAt||new Date().toISOString(),tasks:s,locked:a?!!t.locked:!1,terminated:a?!!t.terminated:!1}}function Na(t){if(!Array.isArray(t))return[];const e=new Set(Et.map(s=>s.id)),a=[];return t.forEach(s=>{if(!s||typeof s!="object")return;const i=String(s.id||"").trim().slice(0,40),n=String(s.label||"").trim().slice(0,30);!i||!n||e.has(i.toLowerCase())||(e.add(i.toLowerCase()),a.push({id:i,label:n,color:String(s.color||"").slice(0,20),goals:String(s.goals||"").slice(0,1e3)}))}),a.slice(0,20)}function Ha(t){const e=t&&typeof t=="object"?t:{},a={};return Et.forEach(s=>{const i=e[s.id];if(!i||typeof i!="object")return;const n=String(i.color||"").trim().slice(0,20),r=i.goals===void 0?void 0:String(i.goals||"").slice(0,1e3);!n&&r===void 0||(a[s.id]={},n&&(a[s.id].color=n),r!==void 0&&(a[s.id].goals=r))}),a}const ce={name:80,wantToBe:1e3,vision:1e3,values:1e3,ideas:4e3},ue=["short","medium","long"],St={short:["1 Week","2 Weeks","3 Weeks","4 Weeks"],medium:["1 Month","2 Months","3 Months"],long:["1 Year","2 Years","3 Years","5 Years","10+ Years"]};function W(t){return`${t||"id"}${Date.now().toString(36)}${Math.floor(Math.random()*9999)}`}function Ia(t){return Array.isArray(t)?t.map(e=>{if(typeof e=="string")return{id:W("w"),text:e.trim().slice(0,120)};if(!e||typeof e!="object")return null;const a=String(e.text||e.label||e.name||"").trim().slice(0,120);return a?{id:String(e.id||W("w")),text:a}:null}).filter(Boolean).slice(0,50):[]}function Ra(t){return typeof t=="string"?t.split(`
`).map(e=>e.trim().replace(/^[-•*]\s+/,"")).filter(Boolean).slice(0,20).map(e=>({id:W("a"),title:e.slice(0,60),description:""})):Array.isArray(t)?t.map(e=>{if(typeof e=="string"){const s=e.trim().slice(0,60);return s?{id:W("a"),title:s,description:""}:null}if(!e||typeof e!="object")return null;const a=String(e.title||e.name||"").trim().slice(0,60);return a?{id:String(e.id||W("a")),title:a,description:String(e.description||"").slice(0,1e3)}:null}).filter(Boolean).slice(0,20):[]}function Oa(t){return Array.isArray(t)?t.map(e=>{if(typeof e=="string"){const r=e.trim().slice(0,200);return r?{id:W("g"),text:r,term:"short",duration:"1 Week",createdAt:new Date().toISOString()}:null}if(!e||typeof e!="object")return null;const a=String(e.text||e.title||"").trim().slice(0,200);if(!a)return null;const s=ue.includes(e.term)?e.term:"short",i=St[s],n=i.includes(e.duration)?e.duration:i[0];return{id:String(e.id||W("g")),text:a,term:s,duration:n,createdAt:e.createdAt||new Date().toISOString()}}).filter(Boolean).slice(0,100):[]}function ja(t){return Array.isArray(t)?t.map(e=>{if(typeof e=="string"){const s=e.trim().slice(0,500);return s?{id:W("q"),text:s,author:"",fav:!1,createdAt:new Date().toISOString()}:null}if(!e||typeof e!="object")return null;const a=String(e.text||e.quote||"").trim().slice(0,500);return a?{id:String(e.id||W("q")),text:a,author:String(e.author||"").trim().slice(0,80),fav:!!(e.fav||e.favorite),createdAt:e.createdAt||new Date().toISOString()}:null}).filter(Boolean).slice(0,200):[]}function Tt(t){const e=t&&typeof t=="object"?t:{},a={};Object.entries(ce).forEach(([i,n])=>{i==="wantToBe"&&!e.wantToBe&&e.about?a[i]=String(e.about||"").slice(0,n):a[i]=String(e[i]||"").slice(0,n)}),a.locked=!!e.locked,a.whoAmI=Ia(e.whoAmI||e.whoIAm||[]),a.lifeAreas=Ra(Array.isArray(e.lifeAreas)||typeof e.lifeAreas=="string"?e.lifeAreas:[]);let s=Oa(e.pGoals||e.goalsList||e.profileGoals||[]);return s.length||[["goalsShort","short","1 Week"],["goalsMid","medium","1 Month"],["goalsLong","long","1 Year"]].forEach(([n,r,o])=>{const d=String(e[n]||"");d.trim()&&d.split(`
`).map(u=>u.trim().replace(/^[-•*]\s+/,"")).filter(Boolean).forEach(u=>{s.length>=100||s.push({id:W("g"),text:u.slice(0,200),term:r,duration:o,createdAt:new Date().toISOString()})})}),a.pGoals=s,a.quotes=ja(e.quotes||e.favQuotes||[]),a}function Ba(t,e){const a=String(t&&t.installedAt||"");if(/^\d{4}-\d{2}-\d{2}/.test(a))return a;const s=Object.keys(e||{}).sort();return s.length?`${s[0]}T00:00:00.000`:new Date().toISOString()}function Fa(t,e){if(!t)return!1;if(ee(t,e)>0)return!0;const a=t.habitForwarded&&t.habitForwarded[e];return Array.isArray(a)&&a.length>0?!0:Array.isArray(t.tasks)&&t.tasks.some(s=>String(s&&s.forwardedHabitId||"")===String(e))}function Ga(t,e){return!t||!Array.isArray(t.lockedHabits)?!1:t.lockedHabits.some(a=>String(a&&a.id||"")===String(e))}function _a(t,e,a){const s=String(t||"");for(const i of e){const n=a[i];if(Fa(n,s)||Ga(n,s))return i}return""}function qa(t,e){const a=Object.keys(e).sort(),s=a[0]||"";return t.map(i=>{const n=Mt(i&&i.startFrom);return n?{...i,startFrom:n}:{...i,startFrom:_a(i&&i.id,a,e)||s}})}function Wa(t,e){const a=Object.keys(e).sort(),s=a[0]||"",i={};return a.forEach(n=>{const r=e[n]&&e[n].tasks;Array.isArray(r)&&r.forEach(o=>{const d=String(o&&o.sourcePinId||"");!d||i[d]||(i[d]=n)})}),t.map(n=>{const r=Mt(n&&n.startFrom);if(r)return{...n,startFrom:r};const o=String(n&&n.id||"");return{...n,startFrom:i[o]||s}})}function na(t){const e=new Set,a=new Set,s=new Set;return t.filter(i=>{if(!i||typeof i!="object")return!1;const n=String(i.id||"");if(n&&e.has(n))return!1;n&&e.add(n);const r=String(i.sourcePinId||"");if(r){if(a.has(r))return!1;a.add(r)}const o=`${String(i.title||"").trim().toLowerCase()}|${Number(i.points)||0}|${String(i.category||"")}`;return s.has(o)?!1:(s.add(o),!0)})}function oa(t){F=Na(t.customCategories||[]),K=Ha(t.categoryOverrides);const e={};Object.entries(t.days||{}).forEach(([o,d])=>{e[o]={...ke(),habits:d.habits||{},habitRatings:d.habitRatings||{},habitMissed:d.habitMissed||{},habitForwarded:d.habitForwarded&&typeof d.habitForwarded=="object"?d.habitForwarded:{},tasks:na(Array.isArray(d.tasks)?d.tasks.map(Ee):[]),note:d.note||"",locked:!!d.locked,lockOverride:d.lockOverride||(d.locked?"locked":null),submittedAt:d.submittedAt||null,lockedHabits:Array.isArray(d.lockedHabits)?d.lockedHabits:null,skippedPins:Array.isArray(d.skippedPins)?d.skippedPins.map(String).filter(u=>u.length<=60).slice(0,100):[]}});const a=qa(Array.isArray(t.habits)&&t.habits.length?t.habits:ta,e).map(o=>({...o,description:String(o.description||"").slice(0,2e3),category:E(o.category||La(o.id,o.name)),consciousPoints:V(o.consciousPoints),tags:C(o.tags),pin:G(o.pin)})),s=(Array.isArray(t.archivedHabits)?t.archivedHabits:[]).filter(o=>o&&typeof o=="object"&&o.id).map(o=>$e(o,o.archivedAt||null)).filter(o=>o.id.length<=60).slice(0,500),i=Wa(Array.isArray(t.pinnedTasks)?t.pinnedTasks.map(o=>({...Ee(o),pin:G(o.pin)})):[],e),n=new Map(i.map(o=>[String(o.id),o])),r=new Map;return Object.entries(e).sort(([o],[d])=>o.localeCompare(d)).forEach(([o,d])=>{d.tasks.forEach(u=>{const p=G(u.pin);if(!p)return;const b=String(u.sourcePinId||""),m=b?n.get(b):null;if(m){m.pin||(m.pin=p);return}const $=[String(u.title||"").trim().toLowerCase(),Number(u.points)||0,String(u.category||""),String(u.description||""),JSON.stringify(C(u.tags)),q(u.image),JSON.stringify(p)].join("|"),T=r.get(b||$);if(T){u.sourcePinId=T.id;return}const S=b||`legacy-pin-${String(u.id||"task").slice(0,48)}`,y={id:S,title:String(u.title||"Task").slice(0,120),points:Number(u.points)||0,description:String(u.description||"").slice(0,500),category:E(u.category),tags:C(u.tags),pin:p,startFrom:o,image:q(u.image)};i.push(y),n.set(S,y),r.set(b||$,y),u.sourcePinId=S})}),{habits:a,archivedHabits:s,archivedTasks:Ea(t.archivedTasks),customCategories:F,categoryOverrides:K,installedAt:Ba(t,e),profile:Tt(t.profile),pinnedTasks:i,days:e,goals:Array.isArray(t.goals)?t.goals.map(le):[],badges:Array.isArray(t.badges)?t.badges.filter(o=>o&&o.id&&o.goalId).map(o=>({id:String(o.id),goalId:String(o.goalId),title:String(o.title||""),tier:o.tier||"bronze",rewardTitle:String(o.rewardTitle||""),earnedAt:o.earnedAt||new Date().toISOString()})):[],settings:{lockTime:t.settings&&t.settings.lockTime||ea.lockTime,autoLock:!t.settings||t.settings.autoLock!==!1,showConscious:!t.settings||t.settings.showConscious!==!1,habitSort:["default","points","category","tags","custom"].includes(t.settings&&t.settings.habitSort)?t.settings.habitSort:"default",taskSort:["default","points","category","tags","custom"].includes(t.settings&&t.settings.taskSort)?t.settings.taskSort:"default",theme:["light","dark"].includes(t.settings&&t.settings.theme)?t.settings.theme:"dark",weekStart:de(t.settings&&t.settings.weekStart),habitOrder:Array.isArray(t.settings&&t.settings.habitOrder)?t.settings.habitOrder.map(String).filter(Boolean).slice(0,300):[],pinnedTaskOrder:Array.isArray(t.settings&&t.settings.pinnedTaskOrder)?t.settings.pinnedTaskOrder.map(String).filter(Boolean).slice(0,300):[]}}}function Le(){const t=B();return{habits:ta.map(e=>({...e,description:"",tags:[],startFrom:t})),archivedHabits:[],archivedTasks:[],customCategories:[],categoryOverrides:{},installedAt:new Date().toISOString(),profile:Tt({}),pinnedTasks:[],days:{},goals:[],badges:[],settings:{...ea}}}function Ua(){try{const t=localStorage.getItem(Ke)||localStorage.getItem("daily-report-v1");return t?oa(JSON.parse(t)):Le()}catch{return Le()}}let l=Ua();F=l.customCategories||[];l.customCategories=F;K=l.categoryOverrides||{};l.categoryOverrides=K;let ra=0,se={key:null,value:null},pe=0;function we(){return pe>0}function ot(t){pe+=1;try{return t()}finally{pe-=1}}function w(){ra+=1;try{localStorage.setItem(Ke,JSON.stringify(l))}catch{}}let Me=0;function et(t){return Me+=1,`${t||"id"}${Date.now().toString(36)}${Me.toString(36)}${Math.floor(Math.random()*1296).toString(36)}`}function za(t){return new Date(`${t}T00:00:00`).getDay()}function Wt(t){const e=new Date(`${t}T00:00:00`);return e.setDate(e.getDate()+1),B(e)}function $t(t){const e=new Date(`${t}T00:00:00`);return e.setDate(e.getDate()-1),B(e)}function Ht(t,e){if(!t)return!0;if(Array.isArray(t.exceptDates)&&t.exceptDates.includes(e)||Array.isArray(t.exceptions)&&t.exceptions.includes(e))return!1;if((Array.isArray(t.customDates)?t.customDates:[]).includes(e)||t.mode==="forever")return!0;if(t.mode==="until")return!!t.until&&e<=t.until;if(t.mode==="weekly")return Array.isArray(t.weekdays)&&t.weekdays.includes(za(e));if(t.mode==="monthly"){const s=Array.isArray(t.monthDays)?t.monthDays.map(Number):[];return s.length?s.includes(Number(String(e).slice(8,10))):!0}if(t.mode==="yearly"){const s=Array.isArray(t.yearDays)?t.yearDays:[];return s.length?s.includes(String(e).slice(5,10)):!0}return t.mode!=="custom"}function bt(t){if(!t)return"Not pinned";const e=(t.exceptDates||t.exceptions||[]).length,a=e?` · ⛔ ${e} exception${e>1?"s":""}`:"",s=t.mode==="custom"?0:Array.isArray(t.customDates)?t.customDates.length:0,i=s?` +${s} custom`:"";if(t.mode==="forever")return`Pinned forever${i}${a}`;if(t.mode==="until")return`${t.until?`Pinned until ${t.until}`:"Pinned until a date"}${i}${a}`;if(t.mode==="weekly"){const n=Array.isArray(t.weekdays)?t.weekdays:[],r=ft.filter(o=>n.includes(o.value)).map(o=>o.label);return`${r.length?`Weekly: ${r.join(", ")}`:"Weekly (no days)"}${i}${a}`}if(t.mode==="monthly"){const n=Array.isArray(t.monthDays)?t.monthDays:[];return`${n.length?`Monthly: day${n.length>1?"s":""} ${[...n].sort((r,o)=>r-o).join(", ")}`:"Monthly"}${i}${a}`}if(t.mode==="yearly"){const n=Array.isArray(t.yearDays)?t.yearDays:[];return`${n.length?`Yearly: ${[...n].sort().join(", ")}`:"Yearly"}${i}${a}`}if(t.mode==="custom"){const n=Array.isArray(t.customDates)?t.customDates:[];return`${n.length?`Custom: ${n.length} date${n.length>1?"s":""}`:"Custom dates"}${a}`}return"Pinned"}function me(t){const[e,a]=(l.settings.lockTime||"21:00").split(":").map(Number),s=new Date(`${t}T00:00:00`);return s.setHours(e||0,a||0,0,0),s}function Ut(t){const e=l.days[t];return e?e.lockOverride==="locked"||e.locked===!0:!1}function ee(t,e){return t?t.habitRatings&&t.habitRatings[e]!=null?Number(t.habitRatings[e])||0:t.habits&&t.habits[e]?5:0:0}function ge(t,e){return ee(l.days[t],e)}function Ya(t,e){if(!t)return!1;if(ee(t,e)>0||t.habitMissed&&t.habitMissed[e])return!0;const s=t.habitForwarded&&t.habitForwarded[e];return Array.isArray(s)&&s.length>0?!0:Array.isArray(t.tasks)&&t.tasks.some(i=>String(i&&i.forwardedHabitId||"")===String(e))}function da(t){if(!t)return[...l.habits];const e=l.habits.filter(s=>Nt(s,t)&&Ht(s.pin,t)),a=l.days[t];if(a){const s=new Set(e.map(n=>n.id)),i=n=>{!n||s.has(n.id)||Ya(a,n.id)&&(s.add(n.id),e.push(n))};l.habits.forEach(i),Ut(t)&&l.archivedHabits&&l.archivedHabits.length&&l.archivedHabits.forEach(i)}return e}function Rt(t,e){if(!Array.isArray(e)||!e.length)return t;const a=new Map(e.map((s,i)=>[String(s),i]));return t.some(s=>a.has(String(s&&s.id)))?t.map((s,i)=>({item:s,i})).sort((s,i)=>{const n=a.has(String(s.item&&s.item.id))?a.get(String(s.item.id)):Number.MAX_SAFE_INTEGER,r=a.has(String(i.item&&i.item.id))?a.get(String(i.item.id)):Number.MAX_SAFE_INTEGER;return n===r?s.i-i.i:n-r}).map(s=>s.item):t}function Va(t){const e=l.habits.find(a=>a.id===t);return e||(l.archivedHabits||[]).find(a=>a.id===t)||null}function Ja(t){l.archivedHabits||(l.archivedHabits=[]),!l.archivedHabits.some(e=>e.id===t.id)&&(l.archivedHabits.push($e(t,new Date().toISOString())),l.archivedHabits.length>500&&l.archivedHabits.splice(0,l.archivedHabits.length-500))}function fe(t){const e=M(t),a=da(t);e.lockedHabits=a.map(s=>$e(s)),e.habitMissed={},a.forEach(s=>{ge(t,s.id)<=0&&(e.habitMissed[s.id]=!0)}),e.tasks.forEach(s=>{s.missed=!s.done})}function lt(t){const e=l.days[t];return!e||e.lockOverride==="unlocked"?!1:e.lockOverride==="locked"||e.locked===!0?!0:l.settings.autoLock?Date.now()>=me(t).getTime():!1}function Ne(t){if(we())return lt(t);const e=M(t);return e.lockOverride==="unlocked"?!1:e.lockOverride==="locked"||e.locked?((!Array.isArray(e.lockedHabits)||!e.habitMissed)&&fe(t),!0):l.settings.autoLock&&Date.now()>=me(t).getTime()?(e.locked=!0,e.lockOverride="locked",e.submittedAt=e.submittedAt||me(t).toISOString(),fe(t),w(),!0):!1}function M(t){if(!l.days[t]){const e=ke();if(we())return e;l.days[t]=e}return l.days[t]}function ne(t){const e=String(t);Object.values(l.days).forEach(a=>{!Array.isArray(a.skippedPins)||!a.skippedPins.includes(e)||(a.skippedPins=a.skippedPins.filter(s=>s!==e))})}function He(t){const e=M(t);if(Ut(t)||we())return e;let a=!1;const s=new Set(Array.isArray(e.skippedPins)?e.skippedPins.map(String):[]);if(e.tasks.length>1){const i=na(e.tasks);i.length!==e.tasks.length&&(e.tasks=i,a=!0)}return l.pinnedTasks.forEach(i=>{Nt(i,t)&&Ht(i.pin,t)&&(s.has(String(i.id))||e.tasks.some(n=>n.sourcePinId===i.id)||(e.tasks.push({id:`ptask-${i.id}-${t}`,title:i.title,points:i.points,description:i.description||"",category:E(i.category),tags:C(i.tags),rating:0,done:!1,missed:!1,sourcePinId:i.id,image:q(i.image)}),a=!0))}),a&&w(),e}function la(t){return!(!t||t.pin&&t.pin.mode==="forever")}function Qa(t,e){let a=Wt(e),s=0;for(;s<800;){if(s+=1,Nt(t,a)&&Ht(t.pin,a))return a;a=Wt(a)}return""}function zt(t,e,a=[],s=[]){if(!t||!/^\d{4}-\d{2}-\d{2}$/.test(String(e||"")))return{allowed:!1,next:"",days:[]};let i=t;if(a.length||s.length){const u=a.map(String),p=s.map(String),b=G(t.pin);b.exceptDates=(b.exceptDates||[]).filter(m=>!u.includes(m)),b.customDates=(b.customDates||[]).filter(m=>!p.includes(m)),i={...t,pin:b}}if(!la(i))return{allowed:!1,next:"",days:[]};if(!Nt(i,e)||!Ht(i.pin,e))return{allowed:!1,next:"",days:[]};const n=Qa(i,e);if(!n)return{allowed:!1,next:"",days:[]};const r=[];let o=Wt(e),d=0;for(;o<n&&d<400;)d+=1,r.push(o),o=Wt(o);return r.length?{allowed:!0,next:n,days:r}:{allowed:!1,next:n,days:[]}}function Xa(t,e){const a=t.pin||{},s=Array.isArray(a.exceptDates)?a.exceptDates:[];return s.includes(e)&&(Array.isArray(a.customDates)?a.customDates:[]).filter(n=>n>e).filter(n=>!s.includes(n)).sort().find(n=>zt(t,e,[e],[n]).days.includes(n))||""}function Za(t,e){const a=t.pin||{};if(!(Array.isArray(a.customDates)?a.customDates:[]).includes(e))return"";const i=Array.isArray(a.exceptDates)?a.exceptDates:[];let n="";return i.forEach(r=>{r>=e||zt(t,r,[r],[e]).days.includes(e)&&(!n||r>n)&&(n=r)}),n}function z(t){return!c.isLocked(t)}function Ie(t){const e=at().find(a=>a.label.toLowerCase()===String(t||"").trim().toLowerCase());return e?e.id:"mentally"}function Re(t){return!t||typeof t!="object"||Array.isArray(t)?[]:Array.isArray(t.days)?t.days.filter(e=>e&&/^\d{4}-\d{2}-\d{2}$/.test(String(e.date||""))):[]}const c={todayKey:B,exportBackup(){return JSON.stringify({app:"Daily Report",kind:"full-backup",version:1,exportedAt:new Date().toISOString(),data:l},null,2)},backupKind(t){if(!t||typeof t!="object"||Array.isArray(t))return"invalid";const e=t.data&&typeof t.data=="object"&&!Array.isArray(t.data)?t.data:t;return Array.isArray(e.days)?"report-export":Array.isArray(e.categories)||Array.isArray(e.plans)||Array.isArray(e.schedule)?"wrong-app":typeof e!="object"||e===null||e.habits!==void 0&&!Array.isArray(e.habits)||e.days!==void 0&&(typeof e.days!="object"||e.days===null||Array.isArray(e.days))||e.settings!==void 0&&(typeof e.settings!="object"||e.settings===null||Array.isArray(e.settings))||!["habits","pinnedTasks","days","goals","badges","settings"].some(s=>e[s]!==void 0)?"invalid":"ok"},importBackup(t){if(this.backupKind(t)!=="ok")return!1;const e=t.data&&typeof t.data=="object"&&!Array.isArray(t.data)?t.data:t;return l=oa(e),F=l.customCategories||[],l.customCategories=F,K=l.categoryOverrides||{},l.categoryOverrides=K,w(),!0},previewReport(t){const e=Re(t);if(!e.length)return{days:0,start:"",end:"",newHabits:0};const a=new Set(l.habits.map(n=>String(n.name||"").trim().toLowerCase())),s=new Set;e.forEach(n=>{(Array.isArray(n.habits)?n.habits:[]).forEach(r=>{const o=String(r&&r.name||"").trim().toLowerCase();o&&!a.has(o)&&s.add(o)})});const i=e.map(n=>String(n.date)).sort();return{days:e.length,start:i[0],end:i[i.length-1],newHabits:s.size}},importReport(t){const e=Re(t);if(!e.length)return!1;const a=e.map(o=>String(o.date)).sort(),s=a[a.length-1],i={};l.habits.forEach(o=>{i[String(o.name||"").trim().toLowerCase()]=o});let n=0;const r=Date.now();return e.forEach((o,d)=>{const u=String(o.date);(Array.isArray(o.habits)?o.habits:[]).forEach(m=>{const $=String(m&&m.name||"").trim().slice(0,80);if(!$)return;const T=$.toLowerCase();if(!i[T]){const S={id:`h${r}_${n}`,name:$,description:String(m&&m.description||"").slice(0,2e3),points:Number(m&&m.points||10)||10,icon:"star",category:Ie(m&&m.category),consciousPoints:V(m&&m.consciousPoints),tags:C(m&&m.tags),pin:{mode:"until",until:s,weekdays:[],monthDays:[],yearDays:[],customDates:[],exceptDates:[]},startFrom:a[0]};l.habits.push(S),i[T]=S,n+=1}});const p=ke();p.note=String(o.note||""),p.locked=!0,p.lockOverride="locked",p.submittedAt=null;const b=[];(Array.isArray(o.habits)?o.habits:[]).forEach(m=>{const $=i[String(m&&m.name||"").trim().toLowerCase()];if(!$)return;const T=Math.max(0,Math.min(5,Number(m&&m.rating||0)));p.habitRatings[$.id]=T,p.habits[$.id]=T>0,T<=0&&(p.habitMissed[$.id]=!0),$.startFrom&&u<$.startFrom&&($.startFrom=u),b.push({id:$.id,name:$.name,description:$.description,points:$.points,icon:$.icon||"star",category:E($.category),consciousPoints:V($.consciousPoints),tags:C($.tags),pin:G($.pin)})}),p.lockedHabits=b,p.tasks=(Array.isArray(o.tasks)?o.tasks:[]).map((m,$)=>({id:`t${r}_${d}_${$}`,title:String(m&&m.title||"Task").slice(0,120),points:Number(m&&m.points||5)||5,description:String(m&&m.description||""),category:Ie(m&&m.category),tags:C(m&&m.tags),rating:Math.max(0,Math.min(5,Number(m&&m.rating||0))),done:!!(m&&m.done),missed:!(m&&m.done),image:"",forwardedFrom:/^\d{4}-\d{2}-\d{2}$/.test(String(m&&m.forwardedFrom||""))?String(m.forwardedFrom):"",forwardedHabitId:"",forwardedTo:Array.isArray(m&&m.forwardedTo)?m.forwardedTo.filter(T=>/^\d{4}-\d{2}-\d{2}$/.test(String(T))).map(String).slice(0,50):[]})),l.days[u]=p}),w(),{days:e.length,habits:n}},getSettings(){return l.settings},setLockTime(t){l.settings.lockTime=t||"21:00",w()},setAutoLock(t){l.settings.autoLock=!!t,w()},setShowConscious(t){l.settings.showConscious=!!t,w()},consciousEnabled(){return l.settings.showConscious!==!1},setHabitSort(t){l.settings.habitSort=["default","points","category","tags","custom"].includes(t)?t:"default",w()},setTaskSort(t){l.settings.taskSort=["default","points","category","tags","custom"].includes(t)?t:"default",w()},getWeekStart(){return de(l.settings.weekStart)},setWeekStart(t){l.settings.weekStart=de(t),w()},getTheme(){return l.settings.theme==="light"?"light":"dark"},setTheme(t){l.settings.theme=t==="light"?"light":"dark",w()},getHabits(t,e){if(t&&Ut(t)){const n=l.days[t];if(n&&Array.isArray(n.lockedHabits)){const r=e||l.settings.habitSort||"default",o=[...n.lockedHabits];return r==="default"||r==="custom"?Rt(o,l.settings.habitOrder):ie(o,r)}}const a=e||l.settings.habitSort||"default",s=da(t),i=a==="default"||a==="custom"?Rt(s,l.settings.habitOrder):ie(s,a);return a==="default"||a==="custom"?i.slice().sort((n,r)=>+!!r.pin-+!!n.pin):i},getTasks(t,e){const a=this.getDay(t),s=e||l.settings.taskSort||"default";return s==="default"||s==="custom"?a.tasks:ie(a.tasks,s)},getAllHabits(){return l.habits},getPinnedHabits(){return Rt(l.habits.filter(t=>!!t.pin),l.settings.habitOrder)},setPinnedHabitOrder(t){const e=new Set(l.habits.filter(n=>n.pin).map(n=>String(n.id))),a=(Array.isArray(t)?t:[]).map(String).filter(n=>e.has(n)),s=new Set(a);e.forEach(n=>{s.has(n)||a.push(n)});const i=l.settings.habitOrder.filter(n=>!e.has(n));l.settings.habitOrder=[...a,...i].slice(0,300),w()},getHabitActivity(t,e=30){const a=String(t||"");return a?Object.keys(l.days).sort().reverse().flatMap(s=>{const i=l.days[s],n=i.habitForwarded&&i.habitForwarded[a],r=!!(i.habits&&i.habits[a])||!!(i.habitMissed&&i.habitMissed[a])||[i.habitRatings,i.habitMissed].some(u=>u&&Object.prototype.hasOwnProperty.call(u,a))||Array.isArray(n)&&n.length>0,o=Array.isArray(i.lockedHabits)&&i.lockedHabits.some(u=>String(u.id)===a);if(!r&&!o)return[];const d=ee(i,a);return[{date:s,rating:d,status:d?"Completed":i.habitMissed[a]||o&&lt(s)?"Missed":"Not rated",locked:lt(s)}]}).slice(0,Math.max(1,Math.min(365,Number(e)||30))):[]},getPinnedTasks(){return Rt(l.pinnedTasks,l.settings.pinnedTaskOrder)},setPinnedTaskOrder(t){const e=new Set(l.pinnedTasks.map(i=>String(i.id))),a=(Array.isArray(t)?t:[]).map(String).filter(i=>e.has(i)),s=new Set(a);l.pinnedTasks.forEach(i=>{const n=String(i.id);s.has(n)||a.push(n)}),l.settings.pinnedTaskOrder=a.slice(0,300),w()},getDay(t){return Ne(t),He(t)},isLocked(t){return Ne(t)},submitDay(t){const e=M(t);e.locked=!0,e.lockOverride="locked",e.submittedAt=new Date().toISOString(),fe(t),w(),this.checkGoals(t)},unlockDay(t){const e=M(t);e.locked=!1,e.lockOverride="unlocked",e.habitMissed={},e.lockedHabits=null,e.tasks.forEach(a=>{a.missed=!1}),w()},isHabitMissed(t,e){const a=l.days[t];return!a||!(a.locked||a.lockOverride==="locked")||!this.getHabits(t).some(s=>s.id===e)||ge(t,e)>0?!1:(a.habitMissed&&a.habitMissed[e],!0)},isTaskMissed(t,e){const a=l.days[t];if(!a)return!1;const s=(a.tasks||[]).find(i=>i.id===e);return s?s.missed===!0?!0:s.missed===!1?!1:!!(a.locked||a.lockOverride==="locked")&&!s.done:!1},missedCounts(t){return ot(()=>{const e=this.getDay(t),a=this.getHabits(t),s=lt(t);return{habits:a.filter(i=>e.habitMissed&&e.habitMissed[i.id]?!0:s&&ge(t,i.id)<=0).length,tasks:e.tasks.filter(i=>i.done?!1:i.missed===!0?!0:i.missed===!1?!1:s).length}})},lockDay(t){this.submitDay(t)},lockDays(t){let e=0;return t.forEach(a=>{this.isLocked(a)||(this.submitDay(a),e+=1)}),e},unlockDays(t){let e=0;return t.forEach(a=>{this.isLocked(a)&&(this.unlockDay(a),e+=1)}),e},lockedReports(){return ot(()=>Object.keys(l.days).sort().reverse().filter(t=>lt(t)).map(t=>({date:t,submittedAt:l.days[t].submittedAt,...this.scoreFor(t)})))},habitRating(t,e){const a=l.days[t];return a?a.habitRatings&&a.habitRatings[e]!=null?Number(a.habitRatings[e])||0:a.habits&&a.habits[e]?5:0:0},setHabitRating(t,e,a){if(!z(t))return;const s=M(t),i=Math.max(0,Math.min(5,Number(a)||0));s.habitRatings[e]=i,s.habits[e]=i>0,w(),this.checkGoals(t)},toggleHabit(t,e){if(!z(t))return;const a=this.habitRating(t,e)>0?0:5;this.setHabitRating(t,e,a)},addTask(t,e,a,s={}){if(!z(t))return;M(t).tasks.push({id:et("t"),title:e.trim(),points:Number(a)||5,description:String(s.description||"").trim(),category:E(s.category),tags:C(s.tags),rating:Math.max(0,Math.min(5,Number(s.rating)||0)),done:!1,missed:!1,forwardedFrom:/^\d{4}-\d{2}-\d{2}$/.test(String(s.forwardedFrom||""))?String(s.forwardedFrom):"",forwardedHabitId:String(s.forwardedHabitId||""),forwardedTo:[],image:q(s.image)}),w(),this.checkGoals(t)},setTaskRating(t,e,a){if(!z(t))return;const i=M(t).tasks.find(r=>r.id===e);if(!i)return;const n=Math.max(0,Math.min(5,Number(a)||0));i.rating=n,w()},setTaskOrder(t,e){if(!z(t))return;const a=M(t),s=(Array.isArray(e)?e:[]).map(String).filter(Boolean);if(!s.length)return;const i=new Map(s.map((r,o)=>[r,o])),n=a.tasks.slice().sort((r,o)=>{const d=i.has(r.id)?i.get(r.id):Number.MAX_SAFE_INTEGER,u=i.has(o.id)?i.get(o.id):Number.MAX_SAFE_INTEGER;return d-u});a.tasks=n,w()},setHabitOrder(t){const e=(Array.isArray(t)?t:[]).map(String).filter(Boolean);e.length&&(l.settings.habitOrder=e.slice(0,300),w())},toggleTask(t,e){if(!z(t))return;const s=M(t).tasks.find(i=>i.id===e);s&&(s.done=!s.done,w(),this.checkGoals(t))},removeTask(t,e){if(!z(t))return;const a=M(t),s=a.tasks.find(n=>n.id===e);a.tasks=a.tasks.filter(n=>n.id!==e);const i=s&&s.sourcePinId?String(s.sourcePinId):"";i&&(Array.isArray(a.skippedPins)||(a.skippedPins=[]),a.skippedPins.includes(i)||a.skippedPins.push(i),a.skippedPins.length>100&&a.skippedPins.splice(0,a.skippedPins.length-100)),w()},forwardTask(t,e,a){if(!/^\d{4}-\d{2}-\d{2}$/.test(String(a||"")))return{ok:!1,reason:"Pick a valid date"};if(t===a)return{ok:!1,reason:"Already on that day"};if(!z(t))return{ok:!1,reason:"Source day is locked"};if(this.isLocked(a))return{ok:!1,reason:"Target day is locked"};const i=M(t).tasks.find(d=>d.id===e);if(!i)return{ok:!1,reason:"Task not found"};const n=M(a),r=String(i.title||"").trim().toLowerCase();if(n.tasks.some(d=>String(d.title||"").trim().toLowerCase()===r))return{ok:!1,reason:"That task is already on that day"};n.tasks.push({id:et("t"),title:i.title,points:Number(i.points)||5,description:String(i.description||""),category:E(i.category),tags:C(i.tags),rating:0,done:!1,missed:!1,forwardedFrom:t,forwardedHabitId:String(i.forwardedHabitId||""),forwardedTo:[],image:q(i.image)});const o=Array.isArray(i.forwardedTo)?i.forwardedTo:[];return o.includes(a)||o.push(a),i.forwardedTo=o.slice(0,50),w(),this.checkGoals(a),{ok:!0}},habitForwardedTo(t,e){const a=l.days[t];if(!a||!a.habitForwarded)return[];const s=a.habitForwarded[e];return Array.isArray(s)?s:[]},habitReplaceDays(t,e){const a=l.habits.find(i=>i.id===e),s=zt(a,t);return{allowed:s.allowed,next:s.next,days:s.days.slice()}},replaceHabit(t,e,a){if(!/^\d{4}-\d{2}-\d{2}$/.test(String(a||"")))return{ok:!1,reason:"Pick a valid date"};if(String(a)===String(t))return{ok:!1,reason:"Already on that day"};const s=l.habits.find(r=>r.id===e);if(!s)return{ok:!1,reason:"Habit not found"};if(!la(s))return{ok:!1,reason:"This habit is pinned forever — every day is already its day"};if(!z(t))return{ok:!1,reason:"That day is locked"};if(this.isLocked(a))return{ok:!1,reason:"That day is locked"};const i=zt(s,t);if(!i.allowed)return{ok:!1,reason:"No replace days available for this habit"};if(!i.days.includes(a))return{ok:!1,reason:`Pick a day before ${i.next}`};const n=G(s.pin);return n.exceptDates.includes(t)||(n.exceptDates=[...n.exceptDates,t].sort()),n.customDates.includes(a)||(n.customDates=[...n.customDates,a].sort()),s.pin=n,w(),this.checkGoals(a),{ok:!0,from:t,to:a}},undoReplaceHabit(t,e,a){const s=l.habits.find(n=>n.id===t);if(!s)return{ok:!1,reason:"Habit not found"};const i=G(s.pin);return i.exceptDates=(i.exceptDates||[]).filter(n=>n!==e),i.customDates=(i.customDates||[]).filter(n=>n!==a),s.pin=i,w(),{ok:!0}},habitReplacedTo(t,e){const a=l.habits.find(s=>s.id===e);return a?Xa(a,t):""},habitReplacedFrom(t,e){const a=l.habits.find(s=>s.id===e);return a?Za(a,t):""},setNote(t,e){z(t)&&(M(t).note=e,w())},addHabit(t,e,a={}){l.habits.push({id:et("h"),name:t.trim(),description:String(a.description||"").trim().slice(0,2e3),points:Number(e)||10,icon:"star",category:E(a.category||"physically"),consciousPoints:V(a.consciousPoints),tags:C(a.tags),pin:G({mode:"forever"}),startFrom:Mt(a.startFrom)||B()}),w()},updateHabit(t,e){const a=l.habits.find(s=>s.id===t);a&&(e.name!=null&&(a.name=String(e.name).trim()||a.name),e.description!=null&&(a.description=String(e.description).trim().slice(0,2e3)),e.points!=null&&(a.points=Number(e.points)||a.points),e.category!=null&&(a.category=E(e.category)),e.consciousPoints!=null&&(a.consciousPoints=V(e.consciousPoints)),e.tags!=null&&(a.tags=C(e.tags)),w())},updateTask(t,e,a){if(!z(t))return;const i=M(t).tasks.find(n=>n.id===e);if(i){if(a.title!=null&&(i.title=String(a.title).trim()||i.title),a.points!=null&&(i.points=Number(a.points)||i.points),a.description!=null&&(i.description=String(a.description).trim()),a.category!=null&&(i.category=E(a.category)),a.tags!=null&&(i.tags=C(a.tags)),a.image!==void 0&&(i.image=q(a.image)),a.rating!=null&&(i.rating=Math.max(0,Math.min(5,Number(a.rating)||0))),i.sourcePinId){const n=l.pinnedTasks.find(r=>r.id===i.sourcePinId);n&&(n.title=i.title,n.points=i.points,n.description=i.description,n.category=i.category,a.tags!=null&&(n.tags=C(a.tags)),a.image!==void 0&&(n.image=q(a.image)))}w()}},habitStreak(t,e){const a=Va(t);if(!a)return 0;let s=e,i=0;this.habitRating(s,t)===0&&(s=$t(s));let n=0;for(;i<400;){if(i+=1,!Nt(a,s)||!Ht(a.pin,s)){s=$t(s);continue}if(this.habitRating(s,t)>0){n+=1,s=$t(s);continue}break}return n},categoryBreakdown(t){const e=this.getDay(t),a=this.getHabits(t);return at().map(s=>{const i=a.filter(S=>E(S.category)===s.id),n=e.tasks.filter(S=>E(S.category)===s.id),r=i.reduce((S,y)=>{const D=this.habitRating(t,y.id);return S+Math.round(y.points*D/5)},0),o=l.settings.showConscious!==!1,d=o?i.reduce((S,y)=>S+(this.habitRating(t,y.id)>0?V(y.consciousPoints):0),0):0,u=i.reduce((S,y)=>S+y.points,0),p=o?i.reduce((S,y)=>S+V(y.consciousPoints),0):0,b=n.reduce((S,y)=>S+(y.done?y.points:0),0),m=n.reduce((S,y)=>S+y.points,0),$=i.map(S=>this.habitRating(t,S.id)),T=$.length?Math.round($.reduce((S,y)=>S+y,0)/$.length*10)/10:0;return{...s,habits:i,tasks:n,earned:r+d+b,max:u+p+m,habitAvg:T,consciousEarned:d,consciousMax:p,completed:i.filter(S=>this.habitRating(t,S.id)>0).length+n.filter(S=>S.done).length,total:i.length+n.length}})},removeHabit(t){const e=l.habits.find(a=>a.id===t);e&&Ja(e),l.habits=l.habits.filter(a=>a.id!==t),w()},getArchivedHabits(){return(l.archivedHabits||[]).map(t=>({...t}))},deleteArchivedHabit(t){const e=(l.archivedHabits||[]).length;return l.archivedHabits=(l.archivedHabits||[]).filter(a=>a.id!==t),l.archivedHabits.length===e?{ok:!1,reason:"That habit is no longer archived"}:(w(),{ok:!0})},archiveTask(t,e){if(!z(t))return{ok:!1,reason:"Day is locked"};const a=M(t),s=a.tasks.find(n=>n.id===e);if(!s)return{ok:!1,reason:"Task not found"};l.archivedTasks||(l.archivedTasks=[]),l.archivedTasks.unshift(sa(s,new Date().toISOString(),t)),l.archivedTasks.length>500&&(l.archivedTasks.length=500),a.tasks=a.tasks.filter(n=>n.id!==e);const i=s.sourcePinId?String(s.sourcePinId):"";return i&&(Array.isArray(a.skippedPins)||(a.skippedPins=[]),a.skippedPins.includes(i)||a.skippedPins.push(i)),w(),{ok:!0}},getArchivedTasks(){return(l.archivedTasks||[]).map(t=>({...t}))},restoreTask(t,e){const a=(l.archivedTasks||[]).findIndex(u=>u.id===t);if(a<0)return{ok:!1,reason:"That task is no longer archived"};const s=l.archivedTasks[a],i=e||B();He(i);const n=M(i),r=String(s.title||"").trim().toLowerCase();if(n.tasks.some(u=>String(u.title||"").trim().toLowerCase()===r))return{ok:!1,reason:"That task is already on that day"};const d=/^\d{4}-\d{2}-\d{2}$/.test(String(s.originDate||""))?String(s.originDate):"";return n.tasks.push({id:et("t"),title:s.title,points:Number(s.points)||5,description:String(s.description||""),category:E(s.category),tags:C(s.tags),rating:0,done:!1,missed:!1,forwardedFrom:d&&d!==i?d:"",forwardedHabitId:"",forwardedTo:[],image:q(s.image),sourcePinId:String(s.sourcePinId||"")}),l.archivedTasks.splice(a,1),w(),{ok:!0,from:d,to:i}},deleteArchivedTask(t){const e=(l.archivedTasks||[]).length;return l.archivedTasks=(l.archivedTasks||[]).filter(a=>a.id!==t),l.archivedTasks.length===e?{ok:!1,reason:"That task is no longer archived"}:(w(),{ok:!0})},restoreHabit(t){const e=(l.archivedHabits||[]).findIndex(i=>i.id===t);if(e<0)return{ok:!1,reason:"That habit is no longer archived"};const a=l.archivedHabits[e];if(l.habits.some(i=>i.id===a.id))return l.archivedHabits.splice(e,1),w(),{ok:!0};const s={...a,description:String(a.description||"").slice(0,2e3),category:E(a.category),consciousPoints:V(a.consciousPoints),tags:C(a.tags),pin:G(a.pin),archivedAt:null};return l.habits.push(s),l.archivedHabits.splice(e,1),w(),{ok:!0,habit:{...s}}},pinHabit(t,e){const a=l.habits.find(s=>s.id===t);a&&(a.pin=G(e),w())},updatePinnedTaskDetails(t,e){const a=l.pinnedTasks.find(s=>s.id===t);if(a){if(e.title!=null&&(a.title=String(e.title).trim().slice(0,120)||a.title),e.points!=null){const s=Number(e.points);Number.isFinite(s)&&(a.points=Math.max(0,s))}e.description!=null&&(a.description=String(e.description).trim().slice(0,2e3)),e.category!=null&&(a.category=E(e.category)),e.tags!=null&&(a.tags=C(e.tags)),e.image!==void 0&&(a.image=q(e.image)),ne(t),w()}},unpinHabit(t){const e=l.habits.find(a=>a.id===t);e&&(e.pin=null,w())},pinTask(t,e,a){if(!z(t))return;const i=M(t).tasks.find(o=>o.id===e);if(!i)return;const n=i.sourcePinId?l.pinnedTasks.find(o=>o.id===i.sourcePinId):null;if(n){n.pin=G(a),ne(n.id),w();return}const r=et("p");l.pinnedTasks.push({id:r,title:i.title,points:i.points,description:i.description||"",category:E(i.category),tags:C(i.tags),pin:G(a),startFrom:t,image:q(i.image)}),i.sourcePinId=r,w()},unpinTaskTemplate(t){l.pinnedTasks=l.pinnedTasks.filter(a=>a.id!==t);const e=String(t);Object.entries(l.days).forEach(([a,s])=>{if(!Array.isArray(s.tasks)||!s.tasks.length||Ut(a))return;const i=s.tasks.length;s.tasks=s.tasks.filter(n=>String(n&&n.sourcePinId||"")!==e),s.tasks.length!==i&&(Array.isArray(s.skippedPins)||(s.skippedPins=[]),s.skippedPins=s.skippedPins.filter(n=>n!==e))}),w()},updatePinnedTask(t,e){const a=l.pinnedTasks.find(s=>s.id===t);a&&(a.pin=G(e),ne(t),w())},findHabit(t){return l.habits.find(e=>e.id===t)||null},findTask(t,e){return M(t).tasks.find(a=>a.id===e)||null},findPinnedTask(t){return l.pinnedTasks.find(e=>e.id===t)||null},getInstalledAt(){return String(l.installedAt||new Date().toISOString())},getProfile(){const t=Tt(l.profile);return l.profile=t,JSON.parse(JSON.stringify(t))},setProfileField(t,e){return!Object.prototype.hasOwnProperty.call(ce,t)||l.profile.locked?!1:((!l.profile||typeof l.profile!="object")&&(l.profile=Tt({})),l.profile[t]=String(e||"").slice(0,ce[t]),w(),!0)},setProfileLocked(t){(!l.profile||typeof l.profile!="object")&&(l.profile=Tt({})),l.profile.locked=!!t,w()},isProfileLocked(){return!!(l.profile&&l.profile.locked)},profileGoalDurations(){return JSON.parse(JSON.stringify(St))},addWhoAmI(t){if(l.profile.locked)return{ok:!1,reason:"Profile is locked"};const e=String(t||"").trim().slice(0,120);return e?(l.profile.whoAmI||[]).length>=50?{ok:!1,reason:"List is full (50)"}:(l.profile.whoAmI.push({id:W("w"),text:e}),w(),{ok:!0}):{ok:!1,reason:"Type something first"}},updateWhoAmI(t,e){if(l.profile.locked)return;const a=(l.profile.whoAmI||[]).find(i=>i.id===t);if(!a)return;const s=String(e||"").trim().slice(0,120);s?a.text=s:l.profile.whoAmI=l.profile.whoAmI.filter(i=>i.id!==t),w()},moveWhoAmI(t,e){if(l.profile.locked)return;const a=l.profile.whoAmI||[],s=a.findIndex(r=>r.id===t),i=s+e;if(s<0||i<0||i>=a.length)return;const[n]=a.splice(s,1);a.splice(i,0,n),w()},removeWhoAmI(t){l.profile.locked||(l.profile.whoAmI=(l.profile.whoAmI||[]).filter(e=>e.id!==t),w())},addLifeArea(t){if(l.profile.locked)return{ok:!1,reason:"Profile is locked"};const e=String(t||"").trim().slice(0,60);if(!e)return{ok:!1,reason:"Name the life area"};if((l.profile.lifeAreas||[]).length>=20)return{ok:!1,reason:"Max 20 areas"};const a={id:W("a"),title:e,description:""};return l.profile.lifeAreas.push(a),w(),{ok:!0,id:a.id}},updateLifeArea(t,e={}){if(l.profile.locked)return;const a=(l.profile.lifeAreas||[]).find(s=>s.id===t);a&&(e.title!=null&&(a.title=String(e.title).trim().slice(0,60)||a.title),e.description!=null&&(a.description=String(e.description).slice(0,1e3)),w())},moveLifeArea(t,e){if(l.profile.locked)return;const a=l.profile.lifeAreas||[],s=a.findIndex(r=>r.id===t),i=s+e;if(s<0||i<0||i>=a.length)return;const[n]=a.splice(s,1);a.splice(i,0,n),w()},removeLifeArea(t){l.profile.locked||(l.profile.lifeAreas=(l.profile.lifeAreas||[]).filter(e=>e.id!==t),w())},addProfileGoal(t,e,a){if(l.profile.locked)return{ok:!1,reason:"Profile is locked"};const s=String(t||"").trim().slice(0,200);if(!s)return{ok:!1,reason:"Write your goal first"};const i=ue.includes(e)?e:"short",n=St[i],r=n.includes(a)?a:n[0];if((l.profile.pGoals||[]).length>=100)return{ok:!1,reason:"Too many goals (100)"};const o={id:W("g"),text:s,term:i,duration:r,createdAt:new Date().toISOString()};return l.profile.pGoals.push(o),w(),{ok:!0,id:o.id}},updateProfileGoal(t,e={}){if(l.profile.locked)return;const a=(l.profile.pGoals||[]).find(s=>s.id===t);if(a){if(e.text!=null&&(a.text=String(e.text).trim().slice(0,200)||a.text),e.term!=null&&ue.includes(e.term)){a.term=e.term;const s=St[a.term];s.includes(a.duration)||(a.duration=s[0])}e.duration!=null&&St[a.term].includes(e.duration)&&(a.duration=e.duration),w()}},removeProfileGoal(t){l.profile.locked||(l.profile.pGoals=(l.profile.pGoals||[]).filter(e=>e.id!==t),w())},addQuote(t,e){if(l.profile.locked)return{ok:!1,reason:"Profile is locked"};const a=String(t||"").trim().slice(0,500);if(!a)return{ok:!1,reason:"Write the quote first"};if((l.profile.quotes||[]).length>=200)return{ok:!1,reason:"Too many quotes (200)"};const s={id:W("q"),text:a,author:String(e||"").trim().slice(0,80),fav:!1,createdAt:new Date().toISOString()};return l.profile.quotes.push(s),w(),{ok:!0,id:s.id}},updateQuote(t,e={}){if(l.profile.locked)return;const a=(l.profile.quotes||[]).find(s=>s.id===t);a&&(e.text!=null&&(a.text=String(e.text).trim().slice(0,500)||a.text),e.author!=null&&(a.author=String(e.author).trim().slice(0,80)),w())},toggleQuoteFav(t){if(l.profile.locked)return;const e=(l.profile.quotes||[]).find(a=>a.id===t);e&&(e.fav=!e.fav,w())},removeQuote(t){l.profile.locked||(l.profile.quotes=(l.profile.quotes||[]).filter(e=>e.id!==t),w())},getCategories(){return at().map(t=>({...t}))},getCustomCategories(){return F.map(t=>({...t}))},addCategory(t){const e=String(t||"").trim().slice(0,30);if(!e)return{ok:!1,reason:"Type a category name"};if(at().some(i=>i.label.toLowerCase()===e.toLowerCase()))return{ok:!1,reason:"That category already exists"};if(F.length>=20)return{ok:!1,reason:"Too many categories (max 20 custom)"};let s=`c${Date.now().toString(36)}`;return at().some(i=>i.id===s)&&(s=`c${Date.now().toString(36)}${Math.floor(Math.random()*99)}`),F.push({id:s,label:e}),w(),{ok:!0,id:s}},renameCategory(t,e){const a=F.find(n=>n.id===t);if(!a)return{ok:!1,reason:"Built-in categories can’t be renamed"};const s=String(e||"").trim().slice(0,30);return s?at().some(n=>n.id!==t&&n.label.toLowerCase()===s.toLowerCase())?{ok:!1,reason:"That category already exists"}:(a.label=s,w(),{ok:!0}):{ok:!1,reason:"Type a category name"}},updateCategory(t,e={}){const a=F.find(s=>s.id===t);if(!a){if(!Et.find(n=>n.id===t))return{ok:!1,reason:"Category not found"};const i={...K[t]||{}};return e.color!==void 0&&(i.color=String(e.color).slice(0,20)),e.goals!==void 0&&(i.goals=String(e.goals).slice(0,1e3)),K[t]=i,l.categoryOverrides=K,w(),{ok:!0}}return e.color!==void 0&&(a.color=String(e.color).slice(0,20)),e.goals!==void 0&&(a.goals=String(e.goals).slice(0,1e3)),w(),{ok:!0}},deleteCategory(t){const e=F.findIndex(a=>a.id===t);return e<0?{ok:!1,reason:"Built-in categories can’t be deleted"}:(F.splice(e,1),l.habits.forEach(a=>{a.category===t&&(a.category="mentally")}),(l.archivedHabits||[]).forEach(a=>{a.category===t&&(a.category="mentally")}),l.pinnedTasks.forEach(a=>{a.category===t&&(a.category="mentally")}),Object.values(l.days).forEach(a=>{(a.tasks||[]).forEach(s=>{s.category===t&&(s.category="mentally")})}),w(),{ok:!0})},getAllTags(){const t=new Map,e=a=>{C(a).forEach(s=>{t.set(s,(t.get(s)||0)+1)})};return l.habits.forEach(a=>e(a.tags)),(l.archivedHabits||[]).forEach(a=>e(a.tags)),l.pinnedTasks.forEach(a=>e(a.tags)),Object.values(l.days).forEach(a=>{(a.tasks||[]).forEach(s=>e(s.tags))}),[...t.entries()].map(([a,s])=>({tag:a,count:s})).sort((a,s)=>s.count-a.count||a.tag.localeCompare(s.tag))},renameTag(t,e){const a=String(t||"").trim(),s=C(e)[0]||"";if(!a||!s)return{ok:!1,reason:"Type a tag name"};if(a.toLowerCase()===s.toLowerCase()){const r=o=>C((o||[]).map(d=>String(d).toLowerCase()===a.toLowerCase()?s:d));return l.habits.forEach(o=>{o.tags=r(o.tags)}),(l.archivedHabits||[]).forEach(o=>{o.tags=r(o.tags)}),l.pinnedTasks.forEach(o=>{o.tags=r(o.tags)}),Object.values(l.days).forEach(o=>{(o.tasks||[]).forEach(d=>{d.tags=r(d.tags)})}),w(),{ok:!0}}const i=this.getAllTags().some(r=>r.tag.toLowerCase()===s.toLowerCase()),n=r=>{const o=(r||[]).map(d=>String(d).toLowerCase()===a.toLowerCase()?s:d);return C(o)};return l.habits.forEach(r=>{r.tags=n(r.tags)}),(l.archivedHabits||[]).forEach(r=>{r.tags=n(r.tags)}),l.pinnedTasks.forEach(r=>{r.tags=n(r.tags)}),Object.values(l.days).forEach(r=>{(r.tasks||[]).forEach(o=>{o.tags=n(o.tags)})}),w(),{ok:!0,merged:i}},deleteTag(t){const e=String(t||"").trim().toLowerCase();if(!e)return{ok:!1,reason:"Pick a tag first"};const a=s=>(s||[]).filter(i=>String(i).toLowerCase()!==e);return l.habits.forEach(s=>{s.tags=a(s.tags)}),(l.archivedHabits||[]).forEach(s=>{s.tags=a(s.tags)}),l.pinnedTasks.forEach(s=>{s.tags=a(s.tags)}),Object.values(l.days).forEach(s=>{(s.tasks||[]).forEach(i=>{i.tags=a(i.tags)})}),w(),{ok:!0}},addTagToHabit(t,e){const a=l.habits.find(i=>i.id===t);if(!a)return{ok:!1,reason:"Pick a habit first"};const s=C(e)[0]||"";return s?(a.tags=C([...a.tags||[],s]),w(),{ok:!0}):{ok:!1,reason:"Type a tag name"}},categoryChart(t,e){const a=["week","month","year"].includes(t)?t:"week",s=`${a}|${e}|${ra}`;return se.key===s?se.value:ot(()=>this._buildCategoryChart(a,e,s))},_buildCategoryChart(t,e,a){const s=at(),i=[];if(t==="year"){const p=String(e).slice(0,4);for(let b=0;b<12;b++){const m=String(b+1).padStart(2,"0"),$=new Date(Number(p),b+1,0).getDate();i.push({label:new Date(Number(p),b,1).toLocaleDateString(void 0,{month:"short"}),title:new Date(Number(p),b,1).toLocaleDateString(void 0,{month:"long",year:"numeric"}),keys:this.rangeKeys(`${p}-${m}-01`,`${p}-${m}-${String($).padStart(2,"0")}`)})}}else{const[p,b]=this.resolveRange(t,e);this.rangeKeys(p,b).forEach(m=>{const $=new Date(`${m}T00:00:00`);i.push({label:t==="week"?$.toLocaleDateString(void 0,{weekday:"narrow"}):String($.getDate()),title:m,keys:[m]})})}const n={},r={};s.forEach(p=>{n[p.id]=i.map(()=>0),r[p.id]=0}),i.forEach((p,b)=>{p.keys.forEach(m=>{this.categoryBreakdown(m).forEach($=>{$.id in n||(n[$.id]=i.map(()=>0),r[$.id]=0),n[$.id][b]+=$.earned||0,r[$.id]+=$.earned||0})})});const o=i.map((p,b)=>s.reduce((m,$)=>m+(n[$.id]?n[$.id][b]:0),0)),d=Math.max(1,...o),u={kind:t,labels:i.map(p=>p.label),titles:i.map(p=>p.title),cats:s.map(p=>({...p})),perCat:n,totals:r,max:d,grandTotal:o.reduce((p,b)=>p+b,0)};return se={key:a,value:u},u},getGoals(){return l.goals},getBadges(){return[...l.badges].sort((t,e)=>{const a=Pe(e.tier)-Pe(t.tier);return a!==0?a:String(e.earnedAt).localeCompare(String(t.earnedAt))})},topBadges(t=3){return this.getBadges().slice(0,t)},addGoal(t={}){const e=le({...t,id:et("g")});return l.goals.push(e),w(),this.checkGoals(B()),e},updateGoal(t,e={}){const a=l.goals.find(i=>i.id===t);if(!a)return;const s=le({...a,...e,id:t});Object.assign(a,s),w(),this.checkGoals(B())},removeGoal(t){l.goals=l.goals.filter(e=>e.id!==t),w()},findGoal(t){return l.goals.find(e=>e.id===t)||null},taskListGoals(){return l.goals.filter(t=>t.kind==="task-list")},openTaskListGoals(){return l.goals.filter(t=>t.kind==="task-list"&&!t.locked)},addGoalItem(t,e){const a=l.goals.find(i=>i.id===t);if(!a||a.kind!=="task-list")return{ok:!1,reason:"No such goal"};if(a.locked||a.terminated)return{ok:!1,reason:"This goal is locked — unlock it first"};const s=String(e||"").trim().slice(0,120);return s?a.tasks.length>=100?{ok:!1,reason:"Goal list is full (100 tasks)"}:(a.tasks.push({id:et("gt"),title:s,done:!1,doneAt:null}),w(),{ok:!0}):{ok:!1,reason:"Type a task first"}},removeGoalItem(t,e){const a=l.goals.find(s=>s.id===t);return!a||a.kind!=="task-list"||a.locked?{ok:!1,reason:"Unlock the goal to edit its tasks"}:(a.tasks=a.tasks.filter(s=>s.id!==e),w(),{ok:!0})},setGoalItemDone(t,e,a){const s=l.goals.find(o=>o.id===t);if(!s||s.kind!=="task-list")return{ok:!1,reason:"No such goal"};if(s.locked)return{ok:!1,reason:"Unlock the goal to edit its tasks"};const i=s.tasks.find(o=>o.id===e);if(!i)return{ok:!1,reason:"No such task in the goal"};i.done=!!a,i.doneAt=a?new Date().toISOString():null;const n=this._refreshTaskListGoal(s);let r=[];return n&&(r=this.checkGoals()),w(),{ok:!0,autoLocked:n,awarded:r}},setGoalLocked(t,e){const a=l.goals.find(s=>s.id===t);return!a||a.kind!=="task-list"?{ok:!1,reason:"No such goal"}:(e?(a.locked=!0,a.tasks.length>0&&a.tasks.every(i=>i.done)||(a.terminated=!0)):a.locked=!1,w(),{ok:!0})},_refreshTaskListGoal(t){return t.tasks.length>0&&t.tasks.every(a=>a.done)&&!t.locked?(t.locked=!0,!0):!1},removeBadge(t){l.badges=l.badges.filter(e=>e.id!==t),w()},perfectDaysCount(){return ot(()=>Object.keys(l.days).filter(t=>{const e=this.scoreFor(t);return e.max>0&&e.percent===100}).length)},taskStreak(t,e){let a=e,s=0;(r=>{const o=l.days[r];return!o||!Array.isArray(o.tasks)?!1:o.tasks.some(d=>d.sourcePinId===t&&d.done)})(a)||(a=$t(a));let n=0;for(;s<400;){s+=1;const r=l.days[a];if(!r||!Array.isArray(r.tasks))break;if(r.tasks.some(o=>o.sourcePinId===t&&o.done)){n+=1,a=$t(a);continue}break}return n},goalProgress(t,e){const a=e||B();if(t.kind==="habit-streak"){const i=this.habitStreak(t.targetId,a);return{current:i,target:t.targetDays,done:i>=t.targetDays}}if(t.kind==="task-streak"){const i=this.taskStreak(t.targetId,a);return{current:i,target:t.targetDays,done:i>=t.targetDays}}if(t.kind==="task-list"){const i=t.tasks||[],n=i.filter(r=>r.done).length;return{current:n,target:Math.max(i.length,1),done:i.length>0&&n===i.length}}const s=this.perfectDaysCount();return{current:s,target:t.targetDays,done:s>=t.targetDays}},checkGoals(t){const e=t||B();let a=[];return l.goals.forEach(s=>{if(l.badges.some(n=>n.goalId===s.id))return;if(this.goalProgress(s,e).done){const n={id:et("b"),goalId:s.id,title:s.title,tier:s.tier,rewardTitle:s.rewardTitle,earnedAt:new Date().toISOString()};l.badges.push(n),a.push(n)}}),a.length&&w(),a},scoreFor(t){return ot(()=>this._scoreFor(t))},_scoreFor(t){const e=this.getDay(t),a=this.getHabits(t),s=this.isLocked(t),i=l.settings.showConscious!==!1,n=a.reduce((S,y)=>{const D=this.habitRating(t,y.id);return S+Math.round(y.points*D/5)},0),r=i?a.reduce((S,y)=>S+(this.habitRating(t,y.id)>0?V(y.consciousPoints):0),0):0,o=e.tasks.reduce((S,y)=>S+(y.done?y.points:0),0),d=a.reduce((S,y)=>S+y.points,0),u=i?a.reduce((S,y)=>S+V(y.consciousPoints),0):0,p=e.tasks.reduce((S,y)=>S+y.points,0),b=n+r+o,m=d+u+p,$=a.filter(S=>e.habitMissed&&e.habitMissed[S.id]?!0:s&&this.habitRating(t,S.id)<=0).length,T=e.tasks.filter(S=>S.done?!1:S.missed===!0?!0:S.missed===!1?!1:s).length;return{earned:b,max:m,habitScore:n,consciousScore:r,maxConscious:u,taskScore:o,completedHabits:a.filter(S=>this.habitRating(t,S.id)>0).length,habitAvg:a.length?Math.round(a.reduce((S,y)=>S+this.habitRating(t,y.id),0)/a.length*10)/10:0,totalHabits:a.length,completedTasks:e.tasks.filter(S=>S.done).length,totalTasks:e.tasks.length,missedHabits:$,missedTasks:T,percent:m?Math.round(b/m*100):0,locked:s,submittedAt:e.submittedAt}},monthKeys(t){const e=String(t).slice(0,7);return Object.keys(l.days).filter(a=>a.startsWith(e)).sort()},rangeKeys(t,e){const a=[],s=new Date(`${t}T00:00:00`),i=new Date(`${e}T00:00:00`);let n=0;for(;s<=i&&n<732;)n+=1,a.push(B(s)),s.setDate(s.getDate()+1);return a},resolveRange(t,e){if(t==="day")return[e,e];if(t==="week"){const s=new Date(`${e}T00:00:00`),i=new Date(s);i.setDate(s.getDate()-(s.getDay()-this.getWeekStart()+7)%7);const n=new Date(i);return n.setDate(i.getDate()+6),[B(i),B(n)]}if(t==="month"){const[s,i]=e.split("-").map(Number),n=`${s}-${String(i).padStart(2,"0")}-01`,r=new Date(s,i,0).getDate(),o=`${s}-${String(i).padStart(2,"0")}-${String(r).padStart(2,"0")}`;return[n,o]}if(t==="year"){const s=e.slice(0,4);return[`${s}-01-01`,`${s}-12-31`]}const a=Object.keys(l.days).sort();return a.length?[a[0],a[a.length-1]>e?a[a.length-1]:e]:[e,e]},exportRows(t,e){return ot(()=>this._exportRows(t,e))},_exportRows(t,e){return this.rangeKeys(t,e).map(a=>{const s=this.getDay(a),i=this.getHabits(a),n=this.scoreFor(a),r=this.isLocked(a),o=(u,p)=>p>0?"done":r?"missed":"pending",d=u=>u.done?"done":r?"missed":"pending";return{date:a,earned:n.earned,max:n.max,percent:n.percent,habitScore:n.habitScore,consciousScore:n.consciousScore||0,taskScore:n.taskScore,locked:r,missedHabits:n.missedHabits||0,missedTasks:n.missedTasks||0,note:s.note||"",habits:i.map(u=>{const p=this.habitRating(a,u.id);return{name:u.name,description:String(u.description||""),category:nt(E(u.category)),tags:C(u.tags),points:u.points,consciousPoints:this.consciousEnabled()?V(u.consciousPoints):0,rating:p,earned:Math.round(u.points*p/5)+(p>0&&this.consciousEnabled()?V(u.consciousPoints):0),status:o(u.id,p)}}),tasks:s.tasks.map(u=>({title:u.title,category:nt(E(u.category)),tags:C(u.tags),points:u.points,rating:Math.max(0,Math.min(5,Number(u.rating)||0)),done:!!u.done,earned:u.done?u.points:0,status:u.forwardedFrom?`forwarded from ${u.forwardedFrom}`:d(u),forwardedFrom:u.forwardedFrom||"",forwardedTo:Array.isArray(u.forwardedTo)?u.forwardedTo:[],description:u.description||"",hasImage:!!u.image}))}})},history(t=14){return ot(()=>Object.keys(l.days).sort().reverse().slice(0,t).map(a=>({date:a,...this.scoreFor(a),note:l.days[a].note,locked:lt(a),submittedAt:l.days[a].submittedAt})))},week(t){return ot(()=>{const e=new Date(t);return e.setDate(e.getDate()-(e.getDay()-this.getWeekStart()+7)%7),e.setHours(0,0,0,0),Array.from({length:7},(a,s)=>{const i=new Date(e);i.setDate(e.getDate()+s);const n=B(i),r=l.days[n];return{date:n,label:i.toLocaleDateString(void 0,{weekday:"short"}),dayOfMonth:i.getDate(),hasRecord:!!r,note:String(r&&r.note||""),locked:lt(n),...this.scoreFor(n)}})})}};function ca(t){return t>=90?"Excellent":t>=75?"Great day":t>=50?"Keep going":t>0?"Started":"No score yet"}function U(t){return new Date(`${t}T00:00:00`).toLocaleDateString(void 0,{weekday:"long",month:"short",day:"numeric"})}function Ka(t){return t?new Date(t).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}):""}function Yt(t){return t>=5?"Excellent":t>=4?"Great":t>=3?"Good":t>=2?"Fair":t>=1?"Low":"Not rated"}const oe=document.getElementById("app"),ua="daily-report-2026-10-31T02-52-47-mvvt33l8",Oe=`v1.1 — Auto-update · Offline · Backup (${ua.slice(-8)})`;let v=c.todayKey(),H="today",x=null,k=null,Q=!1,ut=!1;const jt=new Set;let pt=!1,Vt=!1,ht=null,rt=!1,Jt=!1,he=null,dt="Idle.",J="week",X="all",tt=0,Qt=null,_="month",Xt=null,R=[],it=0,N=null,L="boot",gt=null;const ct=new Set,yt=new Map;let Dt=!1,Bt="all",Z="short",vt="1 Week";const xt=new Set;let Ft=null;const Gt=new Set;window.addEventListener("beforeinstallprompt",t=>{t.preventDefault(),ht=t});window.addEventListener("appinstalled",()=>{ht=null,h("Daily Report installed"),f()});const ti=[["default","Default"],["points","Points"],["category","Category"],["tags","Tags"],["custom","Custom"]];function je(t){const e=new Date(`${v}T00:00:00`);e.setDate(e.getDate()+t),v=c.todayKey(e)}let re=c.todayKey();function Se(){const t=c.todayKey();if(t===re)return!1;const e=re;return re=t,v===e&&(v=t),Qt=null,Xt=null,R=[],it=0,tt=0,!0}function P(t){return{home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z"/></svg>',profile:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/></svg>',history:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8v5l3 2"/><circle cx="12" cy="12" r="9"/></svg>',settings:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H8a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V8c.3.7.9 1.2 1.6 1.3H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1.7z"/></svg>',pin:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4h6l-1 7 3 3v2H7v-2l3-3z" fill="currentColor" stroke="none"/><path d="M12 16v5"/></svg>',forward:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',swap:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h13l-3.5-3.5M20 16H7l3.5 3.5"/></svg>',undo:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h11a5 5 0 0 1 0 10H8"/><path d="M8 5 4 9l4 4"/></svg>',habit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h10M4 17h13"/></svg>',archive:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h18v4H3zM5 11v9h14v-9M9.5 15h5"/></svg>',trash:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg>',grip:'<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><circle cx="9" cy="6" r="1.7"/><circle cx="15" cy="6" r="1.7"/><circle cx="9" cy="12" r="1.7"/><circle cx="15" cy="12" r="1.7"/><circle cx="9" cy="18" r="1.7"/><circle cx="15" cy="18" r="1.7"/></svg>'}[t]}function pa(t,e,a){return`
    <div class="stars" data-habit="${t}">
      ${[1,2,3,4,5].map(s=>`
            <button type="button" class="star ${s<=e?"on":""}" data-action="rate-habit" data-id="${t}" data-rating="${s}" ${a?"disabled":""} aria-label="${s} star">★</button>
          `).join("")}
    </div>
  `}function ma(t,e,a){return`
    <div class="stars stars-small" data-task="${t}">
      ${[1,2,3,4,5].map(s=>`
            <button type="button" class="star small ${s<=e?"on":""}" data-action="rate-task" data-id="${t}" data-rating="${s}" ${a?"disabled":""} aria-label="${s} star">★</button>
          `).join("")}
    </div>
  `}function ga(t){const e=Number(t)||0;return e?`<span class="conscious-badge">🧠 +${e}</span>`:'<span class="item-meta">No conscious pts</span>'}const ei=["mentally","psychology","physically","spiritually","socially"];function mt(t){const a=c.getCategories().find(n=>n.id===t),s=a&&a.color?a.color:O(t);return`<span class="cat-badge ${ei.includes(t)?`cat-${t}`:"cat-custom"}" style="background:${s}22;color:${s};box-shadow:inset 0 0 0 1px ${s}55">${g(nt(t))}</span>`}function be(t){const e=String(t||"");if(!e)return"Deleted";const a=new Date(e);return Number.isNaN(a.getTime())?"Deleted":`Deleted ${a.toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}`}const Be={mentally:"#5b8cff",psychology:"#a06bff",physically:"#22b07d",spiritually:"#e8a51c",socially:"#14b8a6"},Fe=["#f472b6","#38bdf8","#fb923c","#a3e635","#facc15","#e879f9"];function O(t,e){const s=c.getCategories().find(i=>i.id===t);return s&&s.color?s.color:Be[t]?Be[t]:Fe[(e??0)%Fe.length]}function st(t){const e=Array.isArray(t)?t.filter(Boolean):[];return e.length?`<div class="tag-row">${e.map(a=>`<span class="tag-chip">#${g(a)}</span>`).join("")}</div>`:""}function fa(t){return!t||!t.image?"":`<button type="button" class="task-img-thumb" data-action="view-task-image" data-id="${t.id}" aria-label="View attached photo"><img src="${t.image}" alt="Task photo" loading="lazy" /></button>`}function ha(t){const e=String(t||"");if(!e.trim())return"";const a=e.split(`
`),s=/^\s*(?:•|-|[*])\s+(.*)$/,i=/^\s*\d+[.)]\s+(.*)$/;let n="",r=null;const o=()=>{r&&(n+=r==="ul"?"</ul>":"</ol>",r=null)};return a.forEach(d=>{const u=s.exec(d),p=!u&&i.exec(d);u?(r!=="ul"&&(o(),n+='<ul class="note-list">',r="ul"),n+=`<li>${g(u[1])||"&nbsp;"}</li>`):p?(r!=="ol"&&(o(),n+='<ol class="note-list">',r="ol"),n+=`<li>${g(p[1])||"&nbsp;"}</li>`):d.trim()?(o(),n+=`<p class="note-text">${g(d)}</p>`):(o(),n+='<p class="note-text">&nbsp;</p>')}),o(),n}function ai(t){const e=ha(t);return e?`<div class="note" style="margin-top:10px">${e}</div>`:""}function Ct(t){return String(t||"").split(`
`).map(e=>e.replace(/^\s*(?:•|-|\*|\d+[.)])\s*/,"").trim()).filter(Boolean)}function Pt(t){return t.map(e=>`• ${e}`).join(`
`)}function Ge(t,e){const a=String(t||"").split(`
`).map(s=>s.replace(/^\s*(?:•|-|\*)\s+/,"").trim()).filter(Boolean);return a.length?`<ul class="note-list idea-list">${a.map((s,i)=>`
        <li>
          <span>${g(s)}</span>
          ${e?"":`<button class="idea-remove" data-action="remove-idea" data-index="${i}" title="Remove idea" aria-label="Remove idea">✕</button>`}
        </li>`).join("")}</ul>`:""}function ba(t,e,a){if(!t||t.disabled)return;const s=t.value||"",i=s.split(`
`),n=s.slice(0,t.selectionStart).split(`
`).length-1,r=s.slice(0,t.selectionEnd).split(`
`).length-1,o=t.selectionStart!==t.selectionEnd,d=o?n:0,u=o?r:i.length-1;if(e==="bullets"){const p=i.slice(d,u+1).every(b=>/^\s*(?:•|-|[*])\s+/.test(b)||!b.trim());for(let b=d;b<=u;b++)i[b].trim()&&(p?i[b]=i[b].replace(/^\s*(?:•|-|[*])\s+/,""):/^\s*(?:•|-|[*])\s+/.test(i[b])||(i[b]=`• ${i[b].replace(/^\s*/,"")}`))}else{const p=i.slice(d,u+1).every(m=>/^\s*\d+[.)]\s+/.test(m)||!m.trim());let b=1;for(let m=d;m<=u;m++){if(!i[m].trim())continue;const $=i[m].replace(/^\s*(?:\d+[.)]|•|-|[*])\s+/,"").replace(/^\s*/,"");i[m]=p?$:`${b}. ${$}`,b+=1}}t.value=i.join(`
`),a&&a(t.value);try{t.focus()}catch{}}function _e(t){ba(document.getElementById("day-note"),t,e=>c.setNote(v,e))}function qe(t){ba(document.getElementById("profile-values"),t,e=>c.setProfileField("values",e))}function ii(t){return new Promise(e=>{if(!t||!String(t.type||"").startsWith("image/"))return e(null);const a=URL.createObjectURL(t),s=new Image,i=()=>{try{URL.revokeObjectURL(a)}catch{}},n=(r,o)=>new Promise(d=>{let u=s.naturalWidth||0,p=s.naturalHeight||0;if(!u||!p)return d(null);const b=Math.min(1,r/Math.max(u,p));u=Math.max(1,Math.round(u*b)),p=Math.max(1,Math.round(p*b));const m=document.createElement("canvas");m.width=u,m.height=p;try{m.getContext("2d").drawImage(s,0,0,u,p),d(m.toDataURL("image/jpeg",o))}catch{d(null)}});s.onload=async()=>{try{let r=await n(900,.72);r&&r.length>Ot&&(r=await n(600,.62)),r&&r.length>Ot&&(r=await n(400,.55)),i(),e(r&&r.length<=Ot?r:null)}catch{i(),e(null)}},s.onerror=()=>{i(),e(null)},s.src=a})}function We(t,e){return`
    <select class="sort-select" data-sort-kind="${t}" aria-label="Sort ${t}">
      ${ti.map(([a,s])=>`<option value="${a}" ${e===a?"selected":""}>${s}</option>`).join("")}
    </select>
  `}function si(t){const e=c.getBadges(),a=c.topBadges(3),s=t.max>0&&t.percent===100,i=Vt?e:a;return`
    <section class="section rewards-section">
      <div class="section-head">
        <h2>Rewards</h2>
        ${e.length>3?`<button class="ghost-btn compact" data-action="toggle-badges">${Vt?"Show less":`More (${e.length}) ›`}</button>`:""}
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
  `}function Zt(t){return`<span class="streak-badge">${t} day streak</span>`}function ya(t){return t?`<span class="forward-badge from">↩ Forwarded from ${g(t)}</span>`:""}function Kt(t){const e=Array.isArray(t)?t.filter(Boolean):[];return e.length?`<span class="forward-badge to">↪ Forwarded to ${g(e[e.length-1])}</span>`:""}function va(t){return t?`<span class="forward-badge replace from">⇄ Replaced from ${g(t)}</span>`:""}function ni(t){const e=c.getAllHabits().map(a=>({habit:a,to:c.habitReplacedTo(v,a.id)})).filter(a=>a.to);return e.length?`
    <div class="replaced-away">
      ${e.map(({habit:a,to:s})=>`
        <button type="button" class="forward-badge replace undo" data-action="undo-replace-habit" data-id="${a.id}" data-from="${v}" data-to="${s}" ${t?"disabled":""} title="${t?"Unlock the day to undo this":`Put ${g(a.name)} back on ${g(v)}`}">
          ⇄ ${g(a.name)} → ${g(s)}
        </button>`).join("")}
    </div>
  `:""}function ka(t,e){if(e)return`<button class="mini-btn" data-action="open-replace-habit" data-id="${t}" disabled title="Unlock the day to replace it">${P("swap")}</button>`;const a=c.habitReplaceDays(v,t);if(!a.allowed){const s=c.findHabit(t),i=s&&s.pin&&s.pin.mode==="forever"?"Pinned forever — no replace option":"No replace days before its next due day";return`<button class="mini-btn" data-action="open-replace-habit" data-id="${t}" disabled title="${i}">${P("swap")}</button>`}return`<button class="mini-btn" data-action="open-replace-habit" data-id="${t}" title="Replace this day with one of the ${a.days.length} day${a.days.length===1?"":"s"} before ${a.next}">${P("swap")}</button>`}function oi(t){const e=new Date(`${t}T00:00:00`);return e.setDate(e.getDate()+1),c.todayKey(e)}function ye(){return`<button class="ghost-btn compact ${Q?"on":""}" data-action="toggle-edit">${Q?"Done":"Edit Mode"}</button>`}function ri(t){return t?'<span class="lock-badge">Locked</span>':'<span class="open-badge">Open</span>'}function di(){c.checkGoals(v);const t=c.getDay(v),e=c.getSettings(),a=e.showConscious!==!1,s=c.getHabits(v),i=c.getTasks(v),n=c.scoreFor(v),r=ca(n.percent),o=v===c.todayKey(),d=c.isLocked(v);return`
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
      <div class="stats-grid ${a?"stats-4":"stats-3"}">
        <div class="stat"><span class="muted">Habits</span><b>${n.completedHabits}/${n.totalHabits}</b></div>
        <div class="stat"><span class="muted">Tasks</span><b>${n.completedTasks}/${n.totalTasks}</b></div>
        ${a?`<div class="stat"><span class="muted">Conscious</span><b>+${n.consciousScore||0}</b></div>`:""}
        <div class="stat"><span class="muted">Score</span><b>${n.percent}%</b></div>
      </div>
      <p class="lock-hint">
        ${d?`Submitted${t.submittedAt?` at ${Ka(t.submittedAt)}`:""}.${(n.missedHabits||0)+(n.missedTasks||0)>0?` ${(n.missedHabits||0)+(n.missedTasks||0)} missed (${n.missedHabits||0} habits, ${n.missedTasks||0} tasks) — unchecked items count as missed.`:" Nothing missed — all done."} Unlock in Settings to edit.`:`Auto-locks at ${e.lockTime}. Submit when the day is done. Unchecked items will count as missed once locked.`}
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
          ${We("habit",e.habitSort||"default")}
          ${ye()}
          <span class="points">+${n.habitScore}${a&&n.consciousScore?` +${n.consciousScore}🧠`:""} pts</span>
        </div>
      </div>
      ${["default","custom"].includes(e.habitSort||"default")&&s.length>1?'<p class="muted tight">Hold the grip button on a card, then drag it to a new spot.</p>':""}
      <div class="list">
        ${s.length?s.map(u=>{const p=c.habitRating(v,u.id),b=p>0,m=!b&&d,$=c.habitStreak(u.id,v),T=a&&Number(u.consciousPoints)||0;return`
                    <article class="item-card ${b?"done":""} ${m?"missed":""} ${d?"is-locked":""}" style="border-left:3px solid ${O(u.category)}" data-sortable="habit" data-id="${u.id}">
                      <button class="check" data-action="toggle-habit" data-id="${u.id}" ${d?"disabled":""}>✓</button>
                      <div class="item-body">
                        <div class="item-title">${g(u.name)} ${m?'<span class="missed-badge">Missed</span>':""}</div>
                        <div class="item-meta">${mt(u.category)} ${u.pin?bt(u.pin):"Not pinned"} · ${p?`${p}/5 ${Yt(p)}`:d?"Missed":"Not rated"}</div>
                        ${u.description?`<p class="item-desc">${g(u.description)}</p>`:""}
                        ${a?`<div class="item-meta">${Zt($)} ${ga(T)}</div>`:`<div class="item-meta">${Zt($)}</div>`}
                        ${Kt(c.habitForwardedTo(v,u.id))}
                        ${va(c.habitReplacedFrom(v,u.id))}
                        ${st(u.tags)}
                        ${pa(u.id,p,d)}
                      </div>
                      <div class="item-side">
                        <div class="points">+${u.points}${T?` +${T}🧠`:""}</div>
                      </div>
                      <div class="item-actions">
                        <button class="drag-handle" aria-label="Hold and drag to reorder" title="Hold and drag to reorder" ${d?"disabled":""}>${P("grip")}</button>
                        <div class="mini-actions">
                          ${Q?`<button class="mini-btn on" data-action="open-edit-habit" data-id="${u.id}" ${d?"disabled":""}>Edit</button>`:""}
                          ${ka(u.id,d)}
                          <button class="mini-btn ${u.pin?"on":""}" data-action="open-pin-habit" data-id="${u.id}" ${d?"disabled":""} title="Pin habit">${P("pin")}</button>
                          <button class="mini-btn" data-action="archive-habit" data-id="${u.id}" ${d?"disabled":""} title="Archive habit" aria-label="Archive habit">${P("archive")}</button>
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
          ${We("task",e.taskSort||"default")}
          ${ye()}
          <span class="points">+${n.taskScore} pts</span>
        </div>
      </div>
      ${["default","custom"].includes(e.taskSort||"default")&&i.length>1?'<p class="muted tight">Hold the grip button on a card, then drag it to a new spot.</p>':""}
      <div class="list">
        ${i.length?i.map(u=>{const p=!!u.sourcePinId,b=p?c.findPinnedTask(u.sourcePinId):null,m=Math.max(0,Math.min(5,Number(u.rating)||0)),$=!u.done&&d;return`
                    <article class="item-card ${u.done?"done":""} ${$?"missed":""} ${d?"is-locked":""}" style="border-left:3px solid ${O(u.category)}" data-sortable="task" data-id="${u.id}">
                      <button class="check" data-action="toggle-task" data-id="${u.id}" ${d?"disabled":""}>✓</button>
                      <div class="item-body">
                        <div class="item-title">${g(u.title)} ${$?'<span class="missed-badge">Missed</span>':""}</div>
                        <div class="item-meta">${mt(u.category)} ${b?bt(b.pin):"One-time task"} · ${u.done?"Done":d?"Missed":"Pending"} · ${m?`${m}/5 ${Yt(m)}`:"No rating"}</div>
                        ${u.description?`<p class="item-desc">${g(u.description)}</p>`:""}
                        ${ya(u.forwardedFrom)}
                        ${Kt(u.forwardedTo)}
                        ${st(u.tags)}
                        ${u.image?'<span class="task-img-badge">📷 Photo attached</span>':""}
                        ${fa(u)}
                        ${ma(u.id,m,d)}
                      </div>
                      <div class="item-side">
                        <div class="points">+${u.points}</div>
                      </div>
                      <div class="item-actions">
                        <button class="drag-handle" aria-label="Hold and drag to reorder" title="Hold and drag to reorder" ${d?"disabled":""}>${P("grip")}</button>
                        <div class="mini-actions">
                          ${Q?`<button class="mini-btn on" data-action="open-edit-task" data-id="${u.id}" ${d?"disabled":""}>Edit</button>`:""}
                          <button class="mini-btn" data-action="open-forward-task" data-id="${u.id}" ${d?"disabled":""} title="Forward task to another day">${P("forward")}</button>
                          <button class="mini-btn ${p?"on":""}" data-action="open-pin-task" data-id="${u.id}" ${d?"disabled":""} title="Pin task">${P("pin")}</button>
                          <button class="mini-btn" data-action="archive-task" data-id="${u.id}" ${d?"disabled":""} title="Archive task" aria-label="Archive task">${P("archive")}</button>
                          ${Q?`<button class="mini-btn danger" data-action="remove-task" data-id="${u.id}" ${d?"disabled":""} title="Delete task" aria-label="Delete task">${P("trash")}</button>`:""}
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
  `}function li(){const t=c.getArchivedHabits(),e=c.getArchivedTasks(),a=t.length+e.length,s=[...e.map(i=>`
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
        <span class="archive-count">${a}</span>
        <span class="archive-chevron" aria-hidden="true">${pt?"▾":"▸"}</span>
      </button>
      ${pt?`<div class="archive-list">${a?s.join(""):'<div class="empty">Nothing archived yet. Use the archive button on a habit or task to set it aside here.</div>'}</div>`:""}
    </section>
  `}function _t(t){return t==="short"?"#short":t==="medium"?"#medium":"#long"}function ci(){const t=c.getProfile(),e=!!t.locked,a=e?"disabled":"",s=Array.isArray(t.whoAmI)?t.whoAmI:[],i=Array.isArray(t.lifeAreas)?t.lifeAreas:[],n=Array.isArray(t.pGoals)?t.pGoals:[],r=Array.isArray(t.quotes)?t.quotes:[],o=c.profileGoalDurations();o[Z].includes(vt)||(vt=o[Z][0]);const d=y=>n.filter(D=>D.term===y).length,u=(Bt==="all"?n:n.filter(y=>y.term===Bt)).slice().sort((y,D)=>String(y.createdAt).localeCompare(String(D.createdAt))),p=r.slice().sort((y,D)=>!!y.fav!=!!D.fav?y.fav?-1:1:String(D.createdAt).localeCompare(String(y.createdAt))),b=p.slice(0,3),m=p.slice(3),$=String(t.name||"?").trim().slice(0,1).toUpperCase()||"?",S=String(t.ideas||"").split(`
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
        <div class="profile-avatar">${g($)}</div>
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
          ${i.map((y,D)=>{const It=gt===y.id;return`
              <article class="life-card ${It?"open":""}">
                <div class="life-head">
                  <button type="button" class="life-toggle" data-action="toggle-lifearea" data-id="${y.id}" aria-expanded="${It?"true":"false"}">
                    <b>${g(y.title)}</b>
                    <span>${It?"▾":"▸"}</span>
                  </button>
                  ${e?"":`
                    <div class="mini-actions">
                      <button class="mini-btn" data-action="move-lifearea" data-id="${y.id}" data-dir="-1" ${D===0?"disabled":""} title="Move up">↑</button>
                      <button class="mini-btn" data-action="move-lifearea" data-id="${y.id}" data-dir="1" ${D===i.length-1?"disabled":""} title="Move down">↓</button>
                    </div>
                  `}
                </div>
                ${It?`
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
        ${e?t.values.trim()?`<div class="values-list">${ha(t.values)}</div>`:'<p class="item-meta">No values yet.</p>':`
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
      ${e?S?Ge(t.ideas,!0):'<p class="item-meta">No ideas yet.</p>':`
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
      ${e?"":`
        <div class="form" style="margin-bottom:10px">
          <label>Goal
            <input id="new-pgoal" maxlength="200" placeholder="e.g. Read 12 books…" />
          </label>
          <div>
            <p class="item-meta">Hashtag it</p>
            <div class="chip-row">
              ${["short","medium","long"].map(y=>`<button type="button" class="chip hashtag-${y} ${Z===y?"on":""}" data-action="set-pgoal-term" data-term="${y}">${_t(y)}</button>`).join("")}
            </div>
          </div>
          <div class="row-2">
            <label>Timeframe
              <select id="new-pgoal-duration">
                ${o[Z].map(y=>`<option value="${g(y)}" ${vt===y?"selected":""}>${g(y)}</option>`).join("")}
              </select>
            </label>
            <label style="justify-content:flex-end">&nbsp;
              <button class="primary-btn compact-btn" data-action="add-pgoal">Add goal</button>
            </label>
          </div>
          <p class="item-meta">${Z==="short"?"Short term → pick a week (1–4 weeks).":Z==="medium"?"Medium term → pick a month up to 3 months.":"Long term → a year or more."}</p>
        </div>
      `}
      <div class="chip-row" style="margin-bottom:10px">
        ${[["all",`All (${n.length})`],["short",`#short (${d("short")})`],["medium",`#medium (${d("medium")})`],["long",`#long (${d("long")})`]].map(([y,D])=>`<button type="button" class="chip ${Bt===y?"on":""}" data-action="set-pgoal-filter" data-filter="${y}">${D}</button>`).join("")}
      </div>
      <div class="habit-manage">
        ${u.length?u.map(y=>`
          <article class="manage-card pgoal-card term-${y.term}">
            <div class="pgoal-top">
              <span class="hashtag hashtag-${y.term}">${_t(y.term)}</span>
              <span class="duration-pill">⏳ ${g(y.duration)}</span>
              ${e?"":`<button class="mini-btn" data-action="remove-pgoal" data-id="${y.id}" title="Remove goal">✕</button>`}
            </div>
            ${e?`<div class="item-title" style="margin-top:6px">${g(y.text)}</div>`:`
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
      ${p.length?`
        <div class="quote-fav-head"><span class="item-title">★ Top 3 favourites</span></div>
        <div class="habit-manage" style="margin-bottom:8px">
          ${b.map(y=>Ue(y,e)).join("")}
        </div>
        ${m.length?`
          <button class="ghost-btn compact full" data-action="toggle-quotes">${Dt?"Show less ▴":`More (${m.length}) — see the rest ▾`}</button>
          ${Dt?`<div class="habit-manage" style="margin-top:8px">${m.map(y=>Ue(y,e)).join("")}</div>`:""}
        `:Dt&&!m.length?'<p class="item-meta">No more quotes — that is all of them.</p>':""}
      `:'<div class="empty">No quotes yet — add the words that move you.</div>'}
    </section>
  `}function Ue(t,e){return`
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
  `}function ui(){document.querySelectorAll("[data-profile]").forEach(t=>{t.addEventListener("input",()=>{c.setProfileField(t.dataset.profile,t.value)||f()})}),document.querySelectorAll("[data-lifearea-title]").forEach(t=>{t.addEventListener("change",()=>{c.updateLifeArea(t.dataset.lifeareaTitle,{title:t.value}),f()})}),document.querySelectorAll("[data-lifearea-desc]").forEach(t=>{t.addEventListener("input",()=>{c.updateLifeArea(t.dataset.lifeareaDesc,{description:t.value})})}),document.querySelectorAll("[data-pgoal-text]").forEach(t=>{t.addEventListener("change",()=>{c.updateProfileGoal(t.dataset.pgoalText,{text:t.value}),f()})}),document.querySelectorAll("[data-pgoal-term]").forEach(t=>{t.addEventListener("change",()=>{c.updateProfileGoal(t.dataset.pgoalTerm,{term:t.value}),f()})}),document.querySelectorAll("[data-pgoal-duration]").forEach(t=>{t.addEventListener("change",()=>{c.updateProfileGoal(t.dataset.pgoalDuration,{duration:t.value}),f()})})}function pi(){const t=$a(v,tt*7),e=c.week(new Date(`${t}T00:00:00`)),a=e.reduce((n,r)=>n+r.earned,0),s=Math.round(a/7),i=tt===0?"This week":tt===-1?"1 week back":`${-tt} weeks back`;return`
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
  `}function mi(){const t=Qt||j(v),e=Te(t),a=c.todayKey();return`
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
          ${e.map(s=>{if(!s)return"<span></span>";const i=c.scoreFor(s),n=s===v?"on-selected":i.percent>=100?"on-perfect":i.earned>0?"on":"",r=i.locked?'<i class="dot-lock"></i>':"";return`<button type="button" class="pin-cal-day hist-cal-day ${n} ${s===a?"is-today":""}" data-action="pick-date" data-date="${s}" title="${g(s)}: ${i.earned}/${i.max} pts (${i.percent}%)"><b>${Number(s.slice(8,10))}</b><span>${i.earned}</span>${r}</button>`}).join("")}
        </div>
      </div>
    </section>
  `}function gi(t){const e=new Map((t||[]).map(n=>[n.date,n])),a=Xt||j(v),s=Te(a),i=c.todayKey();return`
    <div class="pin-cal">
      <div class="pin-cal-head"><b>${ae(a)}</b><span class="item-meta">${e.size} locked</span></div>
      <div class="pin-cal-grid pin-cal-week">
        ${Ae().map(n=>`<span>${n.label.slice(0,1)}</span>`).join("")}
      </div>
      <div class="pin-cal-grid">
        ${s.map(n=>{if(!n)return"<span></span>";const r=e.get(n),o=!!r,d=R.includes(n)?"on-selected":o?"on-locked":"on-open",u=c.scoreFor(n),p=r?r.earned:u.earned;return`<button type="button" class="pin-cal-day hist-cal-day ${d} ${n===i?"is-today":""}" data-action="toggle-locked-day" data-date="${n}" title="${g(n)}: ${o?"Locked":"Open"} — ${p} pts"><b>${Number(n.slice(8,10))}</b><span>${p}</span></button>`}).join("")}
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
  `}function hi(){const t=c.week(new Date(`${v}T00:00:00`)),e=c.todayKey(),a=`${U(t[0].date)} – ${U(t[6].date)}`,s=t.reduce((r,o)=>r+(o.earned||0),0),i=t.reduce((r,o)=>r+(o.max||0),0),n=t.filter(r=>r.hasRecord).length;return`
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
        <span class="item-meta">${a}</span>
      </div>
      <p class="item-meta">${n} of 7 days reported · ${s} of ${i} pts</p>
      <div class="history-list">
        ${t.map(r=>{const o=!r.hasRecord,d=(r.missedHabits||0)+(r.missedTasks||0),u=o?"No report":`${r.locked?"Locked":"Open"} · ${ca(r.percent)} · ${r.earned}/${r.max} pts (${r.percent}%)${r.locked&&d>0?` · ❌ ${d} missed`:""}`;return`
              <article class="history-card ${o?"is-empty":""} ${r.date===e?"is-today":""} ${r.date===v?"is-selected":""}">
                <div class="section-head">
                  <div>
                    <div class="item-title">${g(r.label)} ${U(r.date)}</div>
                    <div class="item-meta">${g(u)}</div>
                  </div>
                  <button class="ghost-btn compact" data-action="pick-date" data-date="${r.date}">${o?"Add":"Open"}</button>
                </div>
                <div class="bar"><span style="width:${r.percent}%"></span></div>
                ${r.note?ai(r.note):`<p class="item-meta">${o?"Nothing recorded this day.":"No note."}</p>`}
              </article>
            `}).join("")}
      </div>
    </section>
  `}function $a(t,e){const a=new Date(`${t}T00:00:00`);return a.setDate(a.getDate()+e),c.todayKey(a)}function bi(){return J==="month"?`${At(j(v),it)}-15`:J==="year"?`${Number(v.slice(0,4))+it}-06-15`:$a(v,it*7)}function yi(t){const[e,a]=c.resolveRange(J,t);return J==="week"?`${U(e)} – ${U(a)}`:J==="month"?ae(e.slice(0,7)):e.slice(0,4)}function vi(){var u;const t=bi(),e=c.categoryChart(J,t);X!=="all"&&!e.cats.some(p=>p.id===X)&&(X="all");const a=X==="all"?e.cats:e.cats.filter(p=>p.id===X),s=Math.max(1,...e.labels.map((p,b)=>a.reduce((m,$)=>m+(e.perCat[$.id]?e.perCat[$.id][b]:0),0))),i=a.reduce((p,b)=>p+(e.totals[b.id]||0),0),n=X==="all"?"All categories":((u=e.cats.find(p=>p.id===X))==null?void 0:u.label)||"",r=it===0?J==="week"?"This week":J==="month"?"This month":"This year":yi(t),o=e.labels.map((p,b)=>{const m=a.reduce((T,S)=>T+(e.perCat[S.id]?e.perCat[S.id][b]:0),0),$=a.map(T=>({cat:T,value:e.perCat[T.id]?e.perCat[T.id][b]:0})).filter(T=>T.value>0).map((T,S)=>`<span class="chart-seg" style="height:${Math.max(2,Math.round(T.value/s*100))}%;background:${O(T.cat.id,S)}" title="${g(T.cat.label)}: ${T.value} pts"></span>`).join("");return`
      <div class="chart-col" title="${g(e.titles[b])}: ${m} pts">
        <div class="chart-bar">${$||'<span class="chart-empty"></span>'}</div>
        <span class="chart-x">${g(p)}</span>
      </div>
    `}).join(""),d=a.map((p,b)=>`
      <span class="chart-legend-item"><i style="background:${O(p.id,b)}"></i>${g(p.label)} <b>${e.totals[p.id]||0}</b></span>
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
          ${["week","month","year"].map(p=>`<button type="button" class="chip ${J===p?"on":""}" data-action="set-chart-range" data-range="${p}">${p[0].toUpperCase()}${p.slice(1)}</button>`).join("")}
        </div>
        <button type="button" class="mini-btn" data-action="chart-nav" data-dir="1" aria-label="Next ${J}">›</button>
      </div>
      <div class="chip-row chart-cat-row">
        <button type="button" class="chip chart-cat-chip ${X==="all"?"on":""}" data-action="set-chart-cat" data-cat="all">All categories</button>
        ${e.cats.map((p,b)=>`
            <button type="button" class="chip chart-cat-chip ${X===p.id?"on":""}" data-action="set-chart-cat" data-cat="${p.id}">
              <i style="background:${O(p.id,b)}"></i>${g(p.label)}
            </button>
          `).join("")}
      </div>
      <div class="chart-wrap${e.labels.length>12?" scroll-x":""}">${o}</div>
      <div class="chart-legend">${d}</div>
    </section>
  `}function ki(t,e){const{locked:a,showC:s}=e,i=t.habits.map(r=>{const o=c.habitRating(v,r.id),d=!o&&a,u=c.habitStreak(r.id,v),p=s&&Number(r.consciousPoints)||0,b=o>0?p:0,m=Math.round(r.points*o/5)+b,$=r.points+p;return`
        <article class="item-card ${o?"done":""} ${d?"missed":""} ${a?"is-locked":""}" style="border-left:3px solid ${O(r.category)}">
          <button class="check" data-action="toggle-habit" data-id="${r.id}" ${a?"disabled":""}>✓</button>
          <div class="item-body">
            <div class="item-title">${g(r.name)} ${d?'<span class="missed-badge">Missed</span>':""}</div>
            <div class="item-meta">Habit · ${o?`${o}/5 ${Yt(o)}`:a?"Missed":"Not rated"} · ${Zt(u)}${s?` ${ga(p)}`:""}</div>
            ${r.description?`<p class="item-desc">${g(r.description)}</p>`:""}
            ${Kt(c.habitForwardedTo(v,r.id))}
            ${va(c.habitReplacedFrom(v,r.id))}
            ${st(r.tags)}
            ${pa(r.id,o,a)}
          </div>
          <div class="item-side">
            <div class="points">${m}/${$}</div>
            <div class="mini-actions">
              ${Q?`<button class="mini-btn on" data-action="open-edit-habit" data-id="${r.id}" ${a?"disabled":""}>Edit</button>`:""}
              ${ka(r.id,a)}
            </div>
          </div>
        </article>
      `}).join(""),n=t.tasks.map(r=>{const o=Math.max(0,Math.min(5,Number(r.rating)||0)),d=!r.done&&a;return`
        <article class="item-card ${r.done?"done":""} ${d?"missed":""} ${a?"is-locked":""}" style="border-left:3px solid ${O(r.category)}">
          <button class="check" data-action="toggle-task" data-id="${r.id}" ${a?"disabled":""}>✓</button>
          <div class="item-body">
            <div class="item-title">${g(r.title)} ${d?'<span class="missed-badge">Missed</span>':""}</div>
            <div class="item-meta">Task · ${r.done?"Done":a?"Missed":"Pending"} · ${o?`${o}/5 ${Yt(o)}`:"No rating"}${r.description?` · ${g(r.description)}`:""}</div>
            ${ya(r.forwardedFrom)}
            ${Kt(r.forwardedTo)}
            ${st(r.tags)}
            ${r.image?'<span class="task-img-badge">📷 Photo attached</span>':""}
            ${fa(r)}
            ${ma(r.id,o,a)}
          </div>
          <div class="item-side">
            <div class="points">+${r.points}</div>
            <div class="mini-actions">
              ${Q?`<button class="mini-btn on" data-action="open-edit-task" data-id="${r.id}" ${a?"disabled":""}>Edit</button>`:""}
              <button class="mini-btn" data-action="open-forward-task" data-id="${r.id}" ${a?"disabled":""} title="Forward task to another day">${P("forward")}</button>
            </div>
          </div>
        </article>
      `}).join("");return`${i}${n}`}function $i(){c.getDay(v);const t=c.isLocked(v),e=c.consciousEnabled(),a=c.categoryBreakdown(v),s=a.reduce((n,r)=>n+r.earned,0),i=a.reduce((n,r)=>n+r.max,0);return`
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
    ${a.map(n=>{const r=n.max?Math.round(n.earned/n.max*100):0,o=O(n.id),d=Gt.has(n.id);return`
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
              ${n.habits.length||n.tasks.length?ki(n,{locked:t,showC:e}):'<div class="empty">No activities in this category.</div>'}
            </div>
                `:""}
          </section>
        `}).join("")}
  `}function te(t){return`${t||"daily-report-backup"}-${c.todayKey()}.json`}function wi(){const t=c.getInstalledAt(),e=String(t).slice(0,10),a=new Date(`${e}T00:00:00`),s=new Date(`${c.todayKey()}T00:00:00`),i=Number.isNaN(a.getTime())?1:Math.max(1,Math.round((s-a)/864e5)+1),n=String(Number(e.slice(8,10))).padStart(2,"0"),r=e.slice(5,7),o=e.slice(2,4),d=/^\d{4}-\d{2}-\d{2}$/.test(e)?`${n}/${r}/${o}`:e,u=Math.floor((i-1)/365)+1;return`Using Daily Report since ${d} · day ${i} · year ${u}`}function wa(){return typeof window.showDirectoryPicker=="function"}function xe(){return new Promise((t,e)=>{const a=indexedDB.open("daily-report-pwa",1);a.onupgradeneeded=()=>a.result.createObjectStore("kv"),a.onsuccess=()=>t(a.result),a.onerror=()=>e(a.error)})}function Si(t){return xe().then(e=>new Promise((a,s)=>{const i=e.transaction("kv","readonly").objectStore("kv").get(t);i.onsuccess=()=>a(i.result),i.onerror=()=>s(i.error)}))}function xi(t,e){return xe().then(a=>new Promise((s,i)=>{const n=a.transaction("kv","readwrite");n.objectStore("kv").put(e,t),n.oncomplete=()=>s(),n.onerror=()=>i(n.error)}))}function Ai(t){return xe().then(e=>new Promise((a,s)=>{const i=e.transaction("kv","readwrite");i.objectStore("kv").delete(t),i.oncomplete=()=>a(),i.onerror=()=>s(i.error)}))}function Ti(){return!wa()||typeof indexedDB>"u"?(L="unsupported",Promise.resolve()):Si("backupDir").then(t=>{if(N=t||null,!N){L="unset";return}return N.queryPermission({mode:"readwrite"}).then(e=>{L=e==="granted"?"granted":"prompt"}).catch(()=>{L="prompt"})}).catch(()=>{N=null,L="unset"})}function Di(){return L==="unsupported"?"Folder picking needs Chrome/Edge on desktop — on phones backups download instead.":L==="unset"?"No folder chosen yet.":L==="prompt"?"Tap Choose folder to allow access again.":L==="denied"?"Access was denied — choose the folder again.":L==="granted"&&N?`Folder: ${N.name}`:"Checking…"}async function Ci(){if(!wa()){h("Folder access needs Chrome or Edge");return}try{const t=await window.showDirectoryPicker({id:"daily-report-backup",mode:"readwrite"});await xi("backupDir",t),N=t,L="granted",h("Backup folder set")}catch(t){t&&t.name==="AbortError"||h("Couldn't open that folder")}f()}async function Pi(){try{await Ai("backupDir")}catch{h("Couldn't remove folder");return}N=null,L="unset",h("Backup folder removed"),f()}async function Ei(){if(N){try{const t=await N.requestPermission({mode:"readwrite"});L=t==="granted"?"granted":"denied",h(t==="granted"?"Folder access granted":"Access denied")}catch{L="denied"}f()}}async function Li(){const t=c.exportBackup(),e=te();if(L==="granted"&&N)try{const s=await(await N.getFileHandle(e,{create:!0})).createWritable();await s.write(t),await s.close(),h("Backup saved to your folder"),Sa();return}catch{}kt(e,t,"application/json"),h("Backup downloaded")}async function Mi(){if(L!=="granted"||!N)return[];const t=[];try{for await(const e of N.values())if(e&&e.kind==="file"&&/\.json$/i.test(e.name))try{const a=await e.getFile();t.push({name:e.name,modified:a.lastModified})}catch{}}catch{return t}return t.sort((e,a)=>a.modified-e.modified),t}async function Sa(){const t=document.getElementById("folder-backup-list");if(!t)return;if(L!=="granted"||!N){t.innerHTML='<button class="ghost-btn compact" data-action="trigger-import">Import from a file instead</button>';return}t.innerHTML='<p class="item-meta">Loading backups…</p>';const e=await Mi();if(!document.getElementById("folder-backup-list"))return;e.length?t.innerHTML=e.map(s=>`
            <div style="display:flex;gap:8px;align-items:center;margin-bottom:6px">
              <span class="item-meta" style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${g(s.name)}</span>
              <button class="ghost-btn compact" data-action="restore-backup" data-name="${g(s.name)}">Restore</button>
            </div>
          `).join(""):t.innerHTML='<p class="item-meta">Folder is empty — press Export backup now to create the first backup.</p>';const a=document.createElement("div");a.innerHTML='<button class="ghost-btn compact" data-action="trigger-import">Import from a file instead</button>',t.appendChild(a)}async function Ni(t){if(N)try{const a=await(await N.getFileHandle(t)).getFile();xa(await a.text(),t)}catch{h("Couldn't read that backup")}}function xa(t,e){let a;try{a=JSON.parse(t)}catch{h("That file isn't valid JSON.");return}const s=c.backupKind(a);if(s==="ok"){if(!window.confirm(`Replace ALL app data with "${e}"?`))return;kt(te("daily-report-pre-import"),c.exportBackup(),"application/json"),c.importBackup(a),h("Backup imported"),f();return}if(s==="report-export"){const i=c.previewReport(a);if(!i.days){h("That report file has no day rows to import.");return}if(!window.confirm(`Import ${i.days} day(s) (${i.start} → ${i.end}) from "${e}" as locked history?

${i.newHabits} new habit(s) will be added to your list.
Days already in the app on those dates will be overwritten.`))return;kt(te("daily-report-pre-import"),c.exportBackup(),"application/json");const r=c.importReport(a);if(!r){h("That file doesn't look like a valid Daily Report backup.");return}h(`Imported ${r.days} day(s)${r.habits?` + ${r.habits} new habit(s)`:""}`),f();return}if(s==="wrong-app"){h("That backup belongs to another app (e.g. Iron Log) — it can’t be imported into Daily Report.");return}h("That file doesn't look like a valid Daily Report backup.")}async function Hi(){if(!ht){h("Use the browser menu: Install / Add to Home Screen");return}try{ht.prompt();const t=await ht.userChoice;t&&t.outcome==="accepted"&&h("Installing Daily Report…")}catch{}ht=null,f()}async function Ii(){const t=`./version.json?v=${Date.now()}`,e=await fetch(t,{cache:"no-store"});if(!e.ok)throw new Error(`http ${e.status}`);const a=await e.json(),s=a&&(a.version||a.v)||null;if(!s)throw new Error("no version field");return String(s)}async function Ri(){rt=!0,Jt=!1,dt="Checking for updates… (needs internet)",f();try{if("serviceWorker"in navigator&&navigator.serviceWorker.getRegistration){const e=await navigator.serviceWorker.getRegistration().catch(()=>null);e&&e.update&&e.update().catch(()=>{})}}catch{}if(typeof fetch>"u"){rt=!1,dt="This browser can’t check — but the app itself works offline. Use Export backup to protect your data.",f();return}const t=setTimeout(()=>{rt&&(rt=!1,dt="Couldn't reach the server — offline? The app itself works offline; updating needs internet.",f())},15e3);try{const e=await Ii();if(clearTimeout(t),rt=!1,he=e,e&&e!==ua){Jt=!0,dt="Update found — updating automatically…",f(),await Aa(!0);return}dt="You're on the latest version. The app works offline."}catch{clearTimeout(t),rt=!1,dt="Couldn't reach the server — offline, or this file wasn't opened from the installed/hosted app. The app itself works offline; updating needs internet."}f()}function ze(t){return new Promise(e=>{if(!("serviceWorker"in navigator))return e();const a=()=>e(),s=setTimeout(()=>{try{navigator.serviceWorker.removeEventListener("controllerchange",a)}catch{}e()},t||4e3),i=()=>{clearTimeout(s);try{navigator.serviceWorker.removeEventListener("controllerchange",i)}catch{}e()};try{navigator.serviceWorker.addEventListener("controllerchange",i)}catch{e()}})}async function Aa(t){var a;try{kt(te("daily-report-pre-update"),c.exportBackup(),"application/json")}catch{}h("Backup saved — updating app…"),dt=`Backup saved — updating${he?` to ${String(he).slice(-8)}`:""}…`,f();const e=()=>{const s=window.location.href.includes("?")?"&":"?";try{window.location.replace(`${window.location.href.split("#")[0]}${s}v=${Date.now()}#updated`)}catch{window.location.reload()}setTimeout(()=>{try{window.location.reload()}catch{}},2500)};try{if("serviceWorker"in navigator&&navigator.serviceWorker.getRegistration){const s=await navigator.serviceWorker.getRegistration().catch(()=>null);if(s){const i=s.waiting;if(i){try{i.postMessage("SKIP_WAITING")}catch{try{s.waiting.postMessage({type:"SKIP_WAITING"})}catch{}}await ze(4e3),e();return}try{await s.update()}catch{}const n=await navigator.serviceWorker.getRegistration().catch(()=>s),r=(n||s).waiting||(n||s).installing;if(r){try{r.postMessage("SKIP_WAITING")}catch{}try{(a=(n||s).waiting)==null||a.postMessage("SKIP_WAITING")}catch{}await ze(5e3),e();return}try{const o=navigator.serviceWorker.controller;o&&o.postMessage({type:"CLEAR_APP_CACHES"})}catch{}try{if(typeof caches<"u"){const o=await caches.keys().catch(()=>[]);await Promise.all(o.filter(d=>d.startsWith("daily-report-")).map(d=>caches.delete(d).catch(()=>!1)))}}catch{}try{await fetch(`./index.html?v=${Date.now()}`,{cache:"reload"})}catch{}try{await fetch(`./version.json?v=${Date.now()}`,{cache:"reload"})}catch{}try{await(n||s).unregister()}catch{}e();return}}}catch{}try{await fetch(`./index.html?v=${Date.now()}`,{cache:"reload"})}catch{}setTimeout(e,600)}const Oi=[{id:"start",icon:"🚀",title:"Getting started",summary:"How the app works in one minute",steps:[["📱","The app has five tabs at the bottom: <b>Today</b>, <b>Profile</b>, <b>History</b>, <b>Activities</b> and <b>Settings</b> — tap a tab to switch."],["⭐","Every habit and task has a <b>points value</b>. Checking it earns those points for that day."],["🧠","Some habits also award <b>conscious points</b> (🧠) on top of their normal points."],["📈","The big card on Today shows your day as points, percent and a <b>letter grade</b>."],["🔒","At your lock time the day locks itself — press <b>Submit and lock report</b> while the day is open."],["💾","Everything is saved on this device only and works fully offline."]]},{id:"today",icon:"✅",title:"Track your day (Today tab)",summary:"Habits, tasks, stars, photos and the FAB",steps:[["☑️","Tap the <b>circle check</b> on a habit or task to mark it done and earn its points."],["⭐","Tap the <b>stars</b> (1–5) to rate how well it went — a rating also counts it as done."],["🟢","Done items turn green. Unchecked items turn red as <b>Missed</b> once the day is locked."],["📷","Tasks can carry a photo — tap the thumbnail to view it full size."],["➕","Tap the big <b>+</b> button to add a habit or task for this day."],["↔️","Use the <b>‹ ›</b> arrows in the top bar to move between days."]]},{id:"edit",icon:"✏️",title:"Edit, sort & reorder",summary:"Edit Mode, drag order and archiving",steps:[["✏️","Tap <b>Edit Mode</b> in a section header to reveal the <b>Edit</b> and delete buttons."],["✋","Hold a card’s <b>grip button</b> for a moment, then drag it to a new spot in the list."],["🔃","The <b>Sort</b> selector orders the list by Points, Category, Tags or your custom drag order."],["🗂️","The <b>archive</b> button sets a habit or task aside — its history is kept and you can restore it any time from the <b>Archive</b> panel at the bottom of Today."]]},{id:"forward",icon:"🔁",title:"Forward, Replace & Pin",summary:"Moving habits and tasks between days",steps:[["↪️","<b>Forward</b> an unfinished task (➟ button) to another day — it moves there with a badge showing where it came from."],["⇄","<b>Replace</b> moves a habit’s rating to a free day before its next due date."],["📌","<b>Pin</b> a habit or task to a repeat schedule — weekly days, month dates or a custom date list — so it appears automatically. Pin it <b>forever</b> for daily essentials."],["↩️","Badges on the card (↩ Forwarded from / ⇄ Replaced from) show what moved and where — tap a badge to undo it."]]},{id:"notes",icon:"📝",title:"Day notes",summary:"Bullet and numbered lists that save themselves",steps:[["📝","The <b>Day note</b> box at the bottom of Today records how the day went."],["•","Select lines and press <b>• Bullets</b> (or <b>1. Numbered</b>) to make a list — press it again to remove the list markers."],["💾","The note saves automatically with the day and is included in exports and backups."]]},{id:"profile",icon:"👤",title:"Profile tab",summary:"Identity, life areas, goals, quotes & locking",steps:[["🪪","<b>Identity</b> — your display name and the person you want to be."],["🧬","<b>Who I am</b> — a numbered list of your roles; reorder with ↑ ↓."],["🗺️","<b>Life Areas</b> — tap a card to open it, describe it, and reorder with ↑ ↓."],["🌅","<b>My Vision</b> and <b>Core & Personal Values</b> — one value per line as a bullet list."],["💡","<b>Personal Ideas</b> — one idea per line, shown as bullets."],["🎯","<b>Goals</b> — hashtag each one: <b>#short</b> = weeks, <b>#medium</b> = 1–3 months, <b>#long</b> = a year or more."],["💬","<b>Quotes</b> — save quotes you live by and star your top 3 favourites."],["🔒","<b>Lock</b> makes the whole profile read-only; Unlock to edit again."]]},{id:"history",icon:"🕘",title:"History tab",summary:"Calendar of past days and exporting",steps:[["🗓️","History shows a month calendar colour-coded by each day’s score."],["👆","Tap any day to jump straight into that day’s report."],["📤","<b>Select & Export</b> picks a date range and exports it as <b>Excel / JSON / PDF</b> — a later import adds it back as locked history."],["☰","The list below shows recent reports with their grades."]]},{id:"activities",icon:"📊",title:"Activities tab",summary:"Charts over a week, month or year",steps:[["📊","The Activities tab charts your weekly score and progress per category."],["🗓️","Switch between <b>Week / Month / Year</b> and use <b>‹ ›</b> to step back in time."],["🎨","Each category keeps its chosen colour everywhere — charts, badges and cards."]]},{id:"rewards",icon:"🏆",title:"Goals & Rewards",summary:"Streak goals, tiers and badges",steps:[["➕","In Settings → Goals &amp; Rewards tap <b>Add goal</b>."],["🎯","Pick the target: a <b>habit or pinned-task streak of N days</b>, <b>N perfect (100%) days</b>, or a <b>List of tasks goal</b> (a checklist — no target needed)."],["📝","<b>List of tasks goal</b>: attach tasks from the task form’s <b>Select Goal</b> list, or add them inside the goal card. When every task is done the goal shows <b>Done</b> and locks itself."],["⛔","Locking a list goal manually before its tasks are finished <b>terminates</b> it — locked goals take no new tasks until you unlock."],["🥇","Choose the tier — <b>Iron, Bronze, Silver or Gold</b> — and write the reward title you’ll earn."],["🎁","Progress bars track each goal; earned rewards become <b>badges</b> on Today’s Rewards strip."],["🏆","Any day that reaches 100% wins the <b>Gold Cup</b> on the spot."]]},{id:"cats",icon:"🗂️",title:"Categories & tags",summary:"Custom categories, colours, goals and tags",steps:[["🌈","Settings → <b>Categories</b>: add your own, tap one to open it, and pick its colour."],["📝","Type the category’s <b>goals</b> as bullet points and press Save — they reach forms, Activities and exports."],["🏷️","Tags group habits and tasks. From Settings → <b>Tags</b> you can rename or delete a tag everywhere at once."],["➕","New tags are added inside any habit or task form, or from the Tags section itself."]]},{id:"backup",icon:"💾",title:"Backup, updates & install",summary:"Keeping your data safe and the app fresh",steps:[["📁","Settings → <b>Data backup</b>: choose a folder once (desktop Chrome/Edge) and <b>Export backup now</b> saves a JSON straight into it."],["📥","<b>Import backup</b> accepts full backups (<b>daily-report-backup-*.json</b>) or month/week exports, which are added as locked history."],["🔄","<b>Check for updates</b> installs the newest version in place — a backup is saved first. Only this check needs internet."],["📲","<b>Install app</b> puts Daily Report on your home screen as a fullscreen offline app."]]},{id:"locking",icon:"🔐",title:"Locking & unlocking days",summary:"Auto-lock, submit and batch unlock",steps:[["⏰","Set the <b>auto-lock time</b> in Settings → Report lock; after that time today locks itself."],["🚫","A locked day is read-only, and anything unchecked already counted as <b>Missed</b> at lock time."],["📅","Settings → <b>Locked reports</b>: red days are locked, green days are open."],["☝️","Tap days to select them, then <b>Lock</b> or <b>Unlock</b> them all in one go."]]}];function ji(t){return`<div class="tut-steps">${t.map(e=>`
        <div class="tut-step">
          <span class="tut-step-ico" aria-hidden="true">${e[0]}</span>
          <p>${e[1]}</p>
        </div>`).join("")}</div>`}function Bi(){return`
    <div class="tut-grid">
      ${Oi.map(t=>{const e=Ft===t.id;return`
          <article class="tut-card ${e?"open":""}">
            <button type="button" class="tut-head" data-action="open-tutorial" data-id="${t.id}" aria-expanded="${e?"true":"false"}">
              <span class="tut-ico" aria-hidden="true">${t.icon}</span>
              <span class="tut-titles">
                <span class="tut-title">${g(t.title)}</span>
                <span class="tut-summary">${g(t.summary)}</span>
              </span>
              <span class="tut-chev" aria-hidden="true">${e?"▾":"▸"}</span>
            </button>
            ${e?`<div class="tut-body">${ji(t.steps)}</div>`:""}
          </article>
        `}).join("")}
    </div>
  `}function Ta(t){if(!t||t.kind!=="task-list")return"";const e=t.tasks||[];return e.length>0&&e.every(s=>s.done)?`Done ✅${t.locked?" 🔒":""}`:t.terminated?`Terminated ⛔${t.locked?" 🔒":""}`:t.locked?`Locked${t.locked?" 🔒":""}`:"Open"}function Fi(t){const e=t.tasks||[],a=e.filter(p=>p.done).length,s=e.length>0&&a===e.length,i=!!t.locked,n=!!t.terminated,r=!i&&!n,o=Ta(t),d=e.length?Math.round(a/e.length*100):0,u=s?"gstatus-done":n?"gstatus-term":i?"gstatus-locked":"gstatus-open";return`
    <article class="manage-card task-list-goal ${s?"goal-earned":""}">
      <div class="section-head">
        <div>
          <div class="item-title">${qt(t.tier)} ${g(t.title)} <span class="gstatus ${u}">${o}</span></div>
          <div class="item-meta">“${g(t.rewardTitle)}” · ${a}/${e.length} tasks${s?" · All done ✓":n?" · list closed":""}</div>
          <div class="bar"><span style="width:${d}%"></span></div>
        </div>
        <div class="mini-actions">
          ${i?"":`<button class="mini-btn on" data-action="open-edit-goal" data-id="${t.id}">Edit</button>`}
          ${i?`<button class="mini-btn" data-action="unlock-goal" data-id="${t.id}" title="Unlock to edit the goal${n?" (terminated goals still take no new tasks)":""}">🔓 Unlock</button>`:`<button class="mini-btn" data-action="lock-goal" data-id="${t.id}"${e.length&&!s?' title="Lock now — an unfinished goal stays terminated"':""}>🔒 Lock</button>`}
          <button class="mini-btn" data-action="remove-goal" data-id="${t.id}">✕</button>
        </div>
      </div>
      <div class="goal-task-list">
        ${e.length?e.map(p=>`
                    <div class="goal-task-row ${p.done?"done":""}">
                      <button type="button" class="goal-task-check ${p.done?"on":""}" data-action="toggle-goal-item" data-id="${t.id}" data-item="${p.id}" data-done="${p.done?"true":"false"}" ${i?'disabled title="Unlock the goal to edit its tasks"':""} aria-label="${p.done?"Mark not done":"Mark done"}">${p.done?"✓":""}</button>
                      <span class="goal-task-title">${g(p.title)}</span>
                      ${i?"":`<button class="mini-btn" data-action="remove-goal-item" data-id="${t.id}" data-item="${p.id}" title="Remove from goal" aria-label="Remove from goal">✕</button>`}
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
  `}function Y(t,{icon:e,title:a,hint:s},i){const n=xt.has(t);return`
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
  `}function Gi(){const t=c.getSettings(),e=c.getAllHabits(),a=c.getPinnedHabits(),s=[...a,...e.filter(o=>!o.pin)],i=c.getArchivedHabits(),n=c.getPinnedTasks(),r=c.lockedReports();return`
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
          ${[0,1,2,3,4,5,6].map(o=>{const d=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];return`<option value="${o}" ${c.getWeekStart()===o?"selected":""}>${d[o]}</option>`}).join("")}
        </select>
      </label>
      <p class="item-meta">Applies to the Week tab, week exports, and pin calendars.</p>
    `)}

    ${Y("appearance",{icon:"🎨",title:"Appearance",hint:c.getTheme()==="dark"?"🌙 Dark mode":"☀️ Light mode"},`
      <p class="muted tight">Pick Dark or Light mode. It applies everywhere, instantly.</p>
      <div class="chip-row">
        <button type="button" class="chip ${c.getTheme()==="dark"?"on":""}" data-action="set-theme" data-theme="dark">🌙 Dark</button>
        <button type="button" class="chip ${c.getTheme()==="light"?"on":""}" data-action="set-theme" data-theme="light">☀️ Light</button>
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

    ${Y("backup",{icon:"💾",title:"Data backup",hint:`${L==="granted"?"Folder connected":"Choose a folder"}`},`
      <p class="muted tight">Pick a backup folder once (Chrome/Edge on desktop) and exports save straight into it. On phones, backups download to your Downloads folder instead. Import accepts full backups (<b>daily-report-backup-*.json</b>) or month/week report exports, which are added as locked history.</p>
      <p class="item-meta">${g(Di())}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
        ${L==="prompt"?'<button class="primary-btn" data-action="grant-folder">Allow access</button>':'<button class="ghost-btn compact" data-action="choose-folder">Choose folder</button>'}
        ${N?'<button class="ghost-btn compact" data-action="forget-folder">Remove</button>':""}
        <button class="primary-btn" data-action="backup-now">Export backup now</button>
        <button class="ghost-btn compact" data-action="trigger-import">Import backup</button>
      </div>
      <input type="file" id="backup-file" accept="application/json,.json" hidden />
      <div id="folder-backup-list" style="margin-top:10px"></div>
    `)}

    ${Y("categories",{icon:"🗂️",title:"Categories",hint:`${c.getCategories().length}`},`
      <p class="muted tight">Add your own categories — they appear in forms, Activities and exports. Tap a category to open it, set its colour, then type its goals as bullet points and press Save.</p>
      <div class="cat-expand-row">
        <button class="mini-btn" data-action="expand-cats">Expand all</button>
        <button class="mini-btn" data-action="collapse-cats">Collapse all</button>
      </div>
      <div class="habit-manage">
        ${c.getCategories().map(o=>{const d=c.getCustomCategories().some(S=>S.id===o.id),u=o.color||O(o.id),p=o.goals||"",b=Ct(p),m=yt.has(o.id)?yt.get(o.id):p,$=Pt(Ct(m))!==Pt(b),T=ct.has(o.id);return`
              <article class="manage-card cat-manage-card ${T?"open":""}">
                <div class="cat-manage-head">
                  <button type="button" class="cat-manage-toggle" data-action="toggle-cat" data-id="${o.id}" aria-expanded="${T?"true":"false"}" aria-controls="cat-editor-${o.id}">
                    <span class="cat-chevron" aria-hidden="true">${T?"▾":"▸"}</span>
                    <i class="cat-swatch" style="background:${g(u)}"></i>
                    <span class="cat-manage-name">${g(nt(o.id))}</span>
                    ${b.length?`<span class="cat-goal-flag">${b.length} goal${b.length===1?"":"s"}</span>`:""}
                  </button>
                  <div class="mini-actions">
                    ${d?`<button class="mini-btn on" data-action="rename-category" data-id="${o.id}">Rename</button>`:""}
                    ${d?`<button class="mini-btn" data-action="delete-category" data-id="${o.id}">✕</button>`:""}
                  </div>
                </div>
                ${T?`
                      <div class="cat-manage-body" id="cat-editor-${o.id}">
                        <div class="cat-manage-row">
                          <label>Colour
                            <input type="color" data-cat-color="${o.id}" value="${g(u)}" aria-label="Colour for ${g(o.label||nt(o.id))}" />
                          </label>
                          <div class="cat-goals-wrap">
                            <label>Goals — one per line
                              <textarea data-cat-goals="${o.id}" maxlength="1000" placeholder="• Goal one&#10;• Goal two&#10;• Goal three" style="min-height:90px">${g(m)}</textarea>
                            </label>
                            <div class="cat-save-row">
                              <button class="primary-btn compact-btn" data-action="save-cat-goals" data-id="${o.id}">${$?"Save goals":"Saved"}</button>
                              <button class="ghost-btn compact" data-action="reset-cat-goals" data-id="${o.id}" ${$?"":"hidden"}>Discard</button>
                            </div>
                            <p class="item-meta cat-goal-hint">${$?"Unsaved changes — press Save to keep them offline and in backups.":"Saved on this device and included in every backup."}</p>
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

    ${Y("tags",{icon:"🏷️",title:"Tags",hint:`${c.getAllTags().length}`},`
      <p class="muted tight">Rename a tag everywhere at once, or delete it from all habits and tasks. New tags are added inside any habit/task form.</p>
      <div class="habit-manage">
        ${(()=>{const o=c.getAllTags();return o.length?o.map(({tag:d,count:u})=>`
              <article class="manage-card">
                <div class="section-head">
                  <div>
                    <div class="item-title">#${g(d)}</div>
                    <div class="item-meta">Used ${u} time${u===1?"":"s"}</div>
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
          ${c.getAllHabits().map(o=>`<option value="${o.id}">${g(o.name)}</option>`).join("")}
        </select>
        <input id="new-tag" maxlength="20" placeholder="New tag…" style="flex:1;min-width:0" />
        <button class="primary-btn compact-btn" data-action="add-tag">Add</button>
      </div>
    `)}

    ${Y("goals",{icon:"🏅",title:"Goals & Rewards",hint:`${c.getGoals().length} goals · ${c.getBadges().length} badges`},`
      <div class="section-head">
        <p class="muted tight" style="max-width:270px">Do a habit / pinned task N days in a row, or collect N perfect (100%) days — earn an Iron, Bronze, Silver or Gold badge with your own title.</p>
        <button class="ghost-btn compact" data-action="open-goal">Add goal</button>
      </div>
      <div class="habit-manage">
        ${c.getGoals().length?c.getGoals().map(o=>{var b,m;if(o.kind==="task-list")return Fi(o);const d=c.goalProgress(o,v),u=c.getBadges().some($=>$.goalId===o.id),p=o.kind==="habit-streak"?((b=c.findHabit(o.targetId))==null?void 0:b.name)||"Deleted habit":o.kind==="task-streak"?((m=c.findPinnedTask(o.targetId))==null?void 0:m.title)||"Deleted task":"Any day at 100%";return`
                    <article class="manage-card goal-card ${u?"goal-earned":""}">
                      <div class="section-head">
                        <div>
                          <div class="item-title">${qt(o.tier)} ${g(o.title)}</div>
                          <div class="item-meta">${ia(o.tier)} · “${g(o.rewardTitle)}” · ${g(p)}</div>
                          <div class="item-meta">${d.current}/${d.target} days ${u?"· Earned ✓":""}</div>
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
      ${c.getBadges().length?`
            <div class="section-head" style="margin-top:14px"><h2>Earned badges</h2></div>
            <div class="rewards-grid">
              ${c.getBadges().map(o=>`
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
        ${s.length?s.map(o=>{const d=jt.has(o.id),u=o.pin?a.findIndex(b=>b.id===o.id):-1,p=d?c.getHabitActivity(o.id,20):[];return`
                    <article class="manage-card setting-habit-card ${d?"open":""}" style="${o.pin?`border-left:4px solid ${O(o.category)}`:""}">
                      <div class="section-head">
                        <button type="button" class="setting-habit-toggle" data-action="toggle-setting-habit" data-id="${o.id}" aria-expanded="${d?"true":"false"}">
                          <span class="setting-habit-chevron" aria-hidden="true">${d?"▾":"▸"}</span>
                          <span class="setting-habit-heading">
                            <span class="item-title">${g(o.name)}</span>
                            <span class="item-meta">${mt(o.category)} · ${o.pin?bt(o.pin):"Not pinned"} · +${o.points} pts ${t.showConscious!==!1?Number(o.consciousPoints)?`· 🧠 +${o.consciousPoints}`:"· No conscious pts":""} · ${Zt(c.habitStreak(o.id,v))}</span>
                          </span>
                        </button>
                        <div class="mini-actions">
                          ${ut?`
                            <button class="mini-btn on" data-action="open-edit-habit" data-id="${o.id}" aria-label="Edit ${g(o.name)}">Edit</button>
                            ${o.pin?`
                              <button class="mini-btn" data-action="move-pinned-habit" data-id="${o.id}" data-dir="-1" ${u===0?"disabled":""} aria-label="Move ${g(o.name)} up" title="Move up">↑</button>
                              <button class="mini-btn" data-action="move-pinned-habit" data-id="${o.id}" data-dir="1" ${u===a.length-1?"disabled":""} aria-label="Move ${g(o.name)} down" title="Move down">↓</button>
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
                            ${p.length?p.map(b=>`
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
  `}function j(t){if(/^\d{4}-\d{2}$/.test(String(t||"")))return String(t);if(/^\d{4}-\d{2}-\d{2}$/.test(String(t||"")))return String(t).slice(0,7);const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}`}function At(t,e){const[a,s]=String(t).split("-").map(Number),i=new Date(a,(s||1)-1+e,1);return`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}`}function ae(t){const[e,a]=String(t).split("-").map(Number);return new Date(e,(a||1)-1,1).toLocaleDateString(void 0,{month:"long",year:"numeric"})}function Ae(){const t=c.getWeekStart(),e=ft.findIndex(a=>a.value===t);return e<=0?ft:[...ft.slice(e),...ft.slice(0,e)]}function Te(t){const[e,a]=String(t).split("-").map(Number),i=(new Date(e,a-1,1).getDay()-c.getWeekStart()+7)%7,n=new Date(e,a,0).getDate(),r=[];for(let o=0;o<i;o++)r.push(null);for(let o=1;o<=n;o++)r.push(`${e}-${String(a).padStart(2,"0")}-${String(o).padStart(2,"0")}`);return r}function Ye(t,e,a){const s=new Set(a||[]),i=Te(e);return`
    <div class="pin-cal" data-cal="${t}">
      <div class="pin-cal-head">
        <button type="button" class="mini-btn" data-action="pin-cal-nav" data-target="${t}" data-dir="-1" aria-label="Previous month">‹</button>
        <b>${ae(e)}</b>
        <button type="button" class="mini-btn" data-action="pin-cal-nav" data-target="${t}" data-dir="1" aria-label="Next month">›</button>
      </div>
      <div class="pin-cal-grid pin-cal-week">
        ${Ae().map(n=>`<span>${n.label.slice(0,1)}</span>`).join("")}
      </div>
      <div class="pin-cal-grid">
        ${i.map(n=>n?`<button type="button" class="pin-cal-day ${s.has(n)?"on":""}" data-action="toggle-pin-date" data-target="${t}" data-date="${n}">${Number(n.slice(8,10))}</button>`:"<span></span>").join("")}
      </div>
    </div>
  `}function _i(t,e){const a=(t==null?void 0:t.mode)||"forever",s=(t==null?void 0:t.until)||"",i=((t==null?void 0:t.weekdays)||[]).map(Number),n=((t==null?void 0:t.monthDays)||[]).map(Number),r=Array.isArray(t==null?void 0:t.yearDays)?[...t.yearDays].sort():[],o=Array.isArray(t==null?void 0:t.customDates)?[...t.customDates].sort():[],d=Array.isArray(t==null?void 0:t.exceptDates)?[...t.exceptDates].sort():Array.isArray(t==null?void 0:t.exceptions)?[...t.exceptions].sort():[],u=e&&e._exceptCal||j(v),p=e&&e._customCal||j(v),b=e&&e._yearMonth||"01";return`
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
        ${ft.map(m=>`
            <button type="button" class="chip weekday ${i.includes(m.value)?"on":""}" data-action="toggle-weekday" data-day="${m.value}">
              ${m.label}
            </button>
          `).join("")}
      </div>
    </div>
    <div class="pin-monthdays" style="${a==="monthly"?"":"display:none"}">
      <p class="item-meta">Repeat every month on day</p>
      <div class="chip-row">
        ${Array.from({length:31},(m,$)=>$+1).map(m=>`<button type="button" class="chip monthday ${n.includes(m)?"on":""}" data-action="toggle-monthday" data-day="${m}">${m}</button>`).join("")}
      </div>
    </div>
    <div class="pin-yeardays" style="${a==="yearly"?"":"display:none"}">
      <p class="item-meta">Repeat every year on (month + day)</p>
      <div class="row-2">
        <label>Month
          <select id="year-month-select">
            ${Array.from({length:12},(m,$)=>$+1).map(m=>`<option value="${String(m).padStart(2,"0")}" ${b===String(m).padStart(2,"0")?"selected":""}>${new Date(2e3,m-1,1).toLocaleDateString(void 0,{month:"long"})}</option>`).join("")}
          </select>
        </label>
        <label>Day
          <select id="year-day-select">
            ${Array.from({length:31},(m,$)=>$+1).map(m=>`<option value="${String(m).padStart(2,"0")}">${m}</option>`).join("")}
          </select>
        </label>
      </div>
      <button type="button" class="ghost-btn compact" data-action="add-year-day" style="margin-top:8px">Add yearly date</button>
      <div class="chip-row" style="margin-top:8px">
        ${r.length?r.map(m=>`<button type="button" class="chip on" data-action="remove-year-day" data-date="${m}" title="Tap to remove">${m} ✕</button>`).join(""):'<span class="item-meta">No yearly dates yet.</span>'}
      </div>
    </div>
    <div class="pin-customdays" style="margin-top:4px">
      <p class="item-meta"><b style="color:var(--text)">Extra custom dates</b> — also show on these days. Combines with Weekly / Monthly / Yearly; pick the <b style="color:var(--text)">Custom</b> mode to show <i>only</i> on these days. Tap days on the calendar.</p>
      ${Ye("custom",p,o)}
      <div class="chip-row" style="margin-top:8px">
        ${o.length?o.map(m=>`<button type="button" class="chip on" data-action="toggle-pin-date" data-target="custom" data-date="${m}" title="Tap to remove">${m} ✕</button>`).join(""):'<span class="item-meta">No extra custom dates.</span>'}
      </div>
    </div>
    <div class="pin-exceptions" style="margin-top:4px">
      <p class="item-meta"><b style="color:var(--text)">Exceptions</b> — skip these days (tap days on the calendar). Applies to every repeat mode.</p>
      ${Ye("except",u,d)}
      <div class="chip-row" style="margin-top:8px">
        ${d.length?d.map(m=>`<button type="button" class="chip on" data-action="toggle-pin-date" data-target="except" data-date="${m}" title="Tap to remove">${m} ✕</button>`).join(""):'<span class="item-meta">No exceptions.</span>'}
      </div>
    </div>
  `}function qi(){if(!x)return"";if(x==="choose")return`
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
              <input name="title" required maxlength="60" value="${g(a.title||a.name||"")}" placeholder="${t?"Meditate":"Finish report"}" />
            </label>
            ${!t&&!e&&c.taskListGoals().length?`
                  <div>
                    <p class="item-meta">Select Goal</p>
                    <label style="margin-top:6px">
                      Attach this task to a list-of-tasks goal (optional)
                      <select name="goalTarget">
                        <option value="">No goal — add to today's task list</option>
                        ${c.taskListGoals().map(o=>{const d=!o.locked;return`<option value="${o.id}" ${d?"":"disabled"}>${g(o.title)} — ${Ta(o)}</option>`}).join("")}
                      </select>
                    </label>
                    <p class="item-meta">A goal attached here puts the task on that goal's list instead of today's list.</p>
                  </div>
                `:""}
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
                ${c.getCategories().map(o=>`
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
    `}if(x==="export"){const t=k&&k.range||"day";return`
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
    `}if(x==="goal"||x==="edit-goal"){const t=x==="edit-goal",e=k||{},a=e.kind||"habit-streak",s=c.getAllHabits(),i=c.getPinnedTasks(),n=e.targetId||"";return`
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
                ${aa.map(r=>`<button type="button" class="chip ${a===r.id?"on":""}" data-action="set-goal-kind" data-kind="${r.id}">${r.label}</button>`).join("")}
              </div>
              <input type="hidden" name="kind" value="${a}" />
              ${a==="task-list"?'<p class="item-meta">No target needed — save the goal, then attach tasks to it from the task form (Select Goal) or inside Goals &amp; Rewards.</p>':""}
            </div>
            <label class="goal-target-habit" style="${a==="habit-streak"?"":"display:none"}">
              Habit
              <select name="habitTarget">
                ${s.map(r=>`<option value="${r.id}" ${n===r.id?"selected":""}>${g(r.name)}</option>`).join("")}
              </select>
            </label>
            <label class="goal-target-task" style="${a==="task-streak"?"":"display:none"}">
              Pinned task
              <select name="taskTarget">
                ${i.length?i.map(r=>`<option value="${r.id}" ${n===r.id?"selected":""}>${g(r.title)}</option>`).join(""):'<option value="">No pinned tasks yet</option>'}
              </select>
            </label>
            <label class="goal-target-days" style="${a==="task-list"?"display:none":""}">
              Number of days
              <input name="targetDays" type="number" min="1" max="365" value="${e.targetDays||7}" />
            </label>
            <div>
              <p class="item-meta">Badge</p>
              <div class="chip-row goal-tier-row">
                ${Lt.map(r=>`<button type="button" class="chip ${(e.tier||"bronze")===r.id?"on":""}" data-action="set-goal-tier" data-tier="${r.id}">${r.medal} ${r.label}</button>`).join("")}
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
    `}if(x==="pin"){const{kind:t,id:e,title:a,pin:s}=k||{};return`
      <div class="modal-backdrop open" data-action="close-modal">
        <form class="sheet sheet-wide" data-form="pin" data-kind="${t}" data-id="${e}">
          <div class="handle"></div>
          <h2>Pin ${t==="habit"?"habit":"task"}</h2>
          <p class="muted tight">${g(a||"")}</p>
          <div class="form" style="margin-top:14px">
            ${_i(s,k)}
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
          <p class="muted tight">${g(a||"")}</p>
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
    `}if(x==="replace"){const{id:t,title:e,from:a,info:s}=k||{},i=s&&s.days||[];return`
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
    `}if(x==="image"){const{image:t,title:e}=k||{};return t?`
      <div class="lightbox-backdrop" data-action="close-modal">
        <img src="${t}" alt="${g(e||"Task photo")}" />
        <button type="button" class="ghost-btn compact lightbox-close" data-action="close-modal">✕ Close</button>
      </div>
    `:""}return""}function f(){if(oe){Se();try{const t=c.isLocked(v);oe.innerHTML=`
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
  `,Ui(),ui(),Ji(),Vi(),Sa(),Wi()}catch(t){const e=t&&t.stack?String(t.stack).slice(0,400):t&&t.message?t.message:"Unknown error";oe.innerHTML=`<div class="app-shell"><section class="manage-card"><h2>Could not load (Error B)</h2><p class="muted tight">${g(e)}</p><button class="primary-btn full" data-action="reload-app">Reload</button></section></div>`}}}function Wi(){if(x!=="habit"&&x!=="task")return;const t=document.querySelector(".sheet");t&&(t.scrollTop=0);const e=document.querySelector('.sheet input[name="title"]');if(e)try{e.focus({preventScroll:!0})}catch{try{e.focus()}catch{}}}function Ui(){const t=document.getElementById("day-note");t&&t.addEventListener("input",()=>{c.isLocked(v)||c.setNote(v,t.value)})}const zi=3e3,Yi=180,Ve=10,A={list:null,card:null,timer:null,startX:0,startY:0,dragging:!1,order0:"",swallowClick:!1,fromHandle:!1,bound:!1};function ve(){A.timer&&(clearTimeout(A.timer),A.timer=null),A.card=null,A.fromHandle=!1}function Da(t,e){return[...t.querySelectorAll(".item-card[data-sortable]")].filter(a=>a.dataset.sortable===e).map(a=>a.dataset.id)}function Je(t){const e=A.card,a=A.list;if(ve(),A.list=null,A.dragging=!1,!e||(e.classList.remove("is-dragging"),a&&a.classList.remove("is-reordering"),document.body.classList.remove("is-reordering-body"),!t))return;const s=e.dataset.sortable,i=Da(a,s);i.join("|")!==A.order0&&(A.swallowClick=!0,setTimeout(()=>{A.swallowClick=!1},400),s==="habit"?(c.setHabitOrder(i),c.setHabitSort("custom")):s==="task"&&(c.setTaskOrder(v,i),c.setTaskSort("custom")),f(),h("Order saved"))}function Vi(){A.bound||(A.bound=!0,document.addEventListener("pointerdown",t=>{if(t.button!=null&&t.button!==0||t.target.closest("input, textarea, select, img, video, .stars, .mini-btn, .check, .fab, .tabbar"))return;const e=t.target.closest(".item-card[data-sortable]");if(!e)return;const a=e.closest(".list");if(!a||c.isLocked(v))return;const s=e.dataset.sortable,i=c.getSettings(),n=(s==="habit"?i.habitSort:i.taskSort)||"default";n!=="default"&&n!=="custom"&&(s==="habit"?c.setHabitSort("custom"):c.setTaskSort("custom"),h("Switched to Custom order so your drag sticks"));const r=t.target.closest(".drag-handle");r&&t.preventDefault(),ve(),A.list=a,A.card=e,A.fromHandle=!!r,A.startX=t.clientX,A.startY=t.clientY,A.order0=Da(a,s).join("|"),A.timer=setTimeout(()=>{A.timer=null,!(!A.card||!A.card.isConnected)&&(A.dragging=!0,navigator.vibrate&&navigator.vibrate(15),A.card.classList.add("is-dragging"),A.list.classList.add("is-reordering"),document.body.classList.add("is-reordering-body"),h("Drag to reorder, lift to drop"))},r?Yi:zi)},!0),document.addEventListener("pointermove",t=>{if(A.timer&&A.card&&!A.fromHandle&&(Math.abs(t.clientX-A.startX)>Ve||Math.abs(t.clientY-A.startY)>Ve)){ve(),A.list=null;return}if(!A.dragging||!A.card)return;t.preventDefault();const e=A.card,a=A.list;if(!a)return;const s=t.clientY,i=e.dataset.sortable,n=[...a.querySelectorAll(".item-card[data-sortable]")].filter(o=>o!==e&&o.dataset.sortable===i);let r=!1;for(const o of n){const d=o.getBoundingClientRect();if(s<d.top+d.height/2){a.insertBefore(e,o),r=!0;break}}r||a.appendChild(e)},{passive:!1}),document.addEventListener("pointerup",()=>Je(A.dragging)),document.addEventListener("pointercancel",()=>Je(!1)),document.addEventListener("contextmenu",t=>{(A.dragging||A.card)&&t.preventDefault()}),document.addEventListener("touchmove",t=>{A.dragging&&t.preventDefault()},{passive:!1}),document.addEventListener("click",t=>{A.swallowClick&&(t.stopPropagation(),t.preventDefault())},!0))}function Ji(){const t=document.getElementById("lock-time"),e=document.getElementById("auto-lock");t&&t.addEventListener("change",()=>{c.setLockTime(t.value),h(`Lock time set to ${t.value}`),f()}),e&&e.addEventListener("change",()=>{c.setAutoLock(e.checked),h(e.checked?"Auto-lock on":"Auto-lock off"),f()}),document.querySelectorAll("[data-cat-color]").forEach(s=>{s.addEventListener("input",()=>{var n;c.updateCategory(s.dataset.catColor,{color:s.value});const i=(n=s.closest(".cat-manage-card"))==null?void 0:n.querySelector(".cat-swatch");i&&(i.style.background=s.value)})}),document.querySelectorAll("[data-cat-goals]").forEach(s=>{const i=()=>{const n=s.dataset.catGoals,r=s.closest(".cat-manage-card");if(!r)return;const o=Ct((c.getCategories().find(m=>m.id===n)||{}).goals||""),d=Pt(Ct(s.value))!==Pt(o),u=r.querySelector('[data-action="save-cat-goals"]');u&&(u.textContent=d?"Save goals":"Saved");const p=r.querySelector('[data-action="reset-cat-goals"]');p&&(p.hidden=!d);const b=r.querySelector(".cat-goal-hint");b&&(b.textContent=d?"Unsaved changes — press Save to keep them offline and in backups.":"Saved on this device and included in every backup.")};s.addEventListener("input",()=>{yt.set(s.dataset.catGoals,s.value),i()}),s.addEventListener("change",i)});const a=document.getElementById("backup-file");a&&a.addEventListener("change",()=>{const s=a.files[0];if(!s)return;const i=new FileReader;i.onload=()=>{xa(String(i.result||""),s.name),a.value=""},i.onerror=()=>{h("Couldn't read that file."),a.value=""},i.readAsText(s)})}function h(t){const e=document.getElementById("toast");e&&(e.textContent=t,e.classList.add("show"),setTimeout(()=>e.classList.remove("show"),1800))}function Ca(){const t=c.getTheme();document.documentElement.dataset.theme=t;const e=document.querySelector('meta[name="theme-color"]');e&&(e.content=t==="light"?"#f3f1ea":"#0e1116")}function g(t){return String(t||"").split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;").split('"').join("&quot;")}function I(){return c.isLocked(v)?(h("This report is locked. Unlock it in Settings."),!0):!1}function De(t){return{mode:(t==null?void 0:t.mode)||"forever",until:(t==null?void 0:t.until)||"",weekdays:Array.isArray(t==null?void 0:t.weekdays)?t.weekdays.map(Number):[],monthDays:Array.isArray(t==null?void 0:t.monthDays)?t.monthDays.map(Number):[],yearDays:Array.isArray(t==null?void 0:t.yearDays)?[...t.yearDays]:[],customDates:Array.isArray(t==null?void 0:t.customDates)?[...t.customDates]:[],exceptDates:Array.isArray(t==null?void 0:t.exceptDates)?[...t.exceptDates]:Array.isArray(t==null?void 0:t.exceptions)?[...t.exceptions]:[]}}function Qi(t){const e=c.findHabit(t);e&&(x="pin",k={kind:"habit",id:t,title:e.name,pin:e.pin?De(e.pin):{mode:"forever",until:"",weekdays:[],monthDays:[],yearDays:[],customDates:[],exceptDates:[]},_exceptCal:j(v),_customCal:j(v),_yearMonth:"01"})}function Xi(t){const e=c.findTask(v,t);if(!e)return;const a=e.sourcePinId?c.findPinnedTask(e.sourcePinId):null;x="pin",k={kind:"task",id:t,title:e.title,pin:a!=null&&a.pin?De(a.pin):{mode:"forever",until:"",weekdays:[],monthDays:[],yearDays:[],customDates:[],exceptDates:[]},_exceptCal:j(v),_customCal:j(v),_yearMonth:"01"}}function Zi(t){const e=c.findPinnedTask(t);e&&(x="pin",k={kind:"template",id:t,title:e.title,pin:e.pin?De(e.pin):{mode:"forever",until:"",weekdays:[],monthDays:[],yearDays:[],customDates:[],exceptDates:[]},_exceptCal:j(v),_customCal:j(v),_yearMonth:"01"})}function Ki(t){var u;const e=t.querySelector('input[name="mode"]').value,a=((u=t.querySelector('input[name="until"]'))==null?void 0:u.value)||"",s=[...t.querySelectorAll(".weekday.on")].map(p=>Number(p.dataset.day)),i=[...t.querySelectorAll(".monthday.on")].map(p=>Number(p.dataset.day)),n=k&&k.pin||{},r=Array.isArray(n.yearDays)?n.yearDays:[],o=Array.isArray(n.customDates)?n.customDates:[],d=Array.isArray(n.exceptDates)?n.exceptDates:[];return e==="until"&&!a?(h("Pick an until date"),null):e==="weekly"&&!s.length?(h("Pick at least one weekday"),null):e==="monthly"&&!i.length?(h("Pick at least one day of month"),null):e==="yearly"&&!r.length?(h("Add at least one yearly date"),null):e==="custom"&&!o.length?(h("Pick at least one custom date"),null):{mode:e,until:a,weekdays:s,monthDays:i,yearDays:r,customDates:o,exceptDates:d}}function kt(t,e,a){const s=e instanceof Blob?e:new Blob([e],{type:a||"text/plain;charset=utf-8"}),i=URL.createObjectURL(s),n=document.createElement("a");n.href=i,n.download=t,document.body.appendChild(n),n.click(),setTimeout(()=>{document.body.removeChild(n),URL.revokeObjectURL(i)},500)}function wt(t){const e=String(t??"");return/[",\n]/.test(e)?`"${e.replace(/"/g,'""')}"`:e}function Ce(t,e){const[a,s]=c.resolveRange(t,e||v);return{range:t,start:a,end:s,rows:c.exportRows(a,s)}}function Qe(t,e){const a=t||k&&k.range||"day",{start:s,end:i,rows:n}=Ce(a,e),r=[];r.push(["Daily Report export",`${s} to ${i}`].map(wt).join(",")),r.push(["Date","Type","Name","Category","Tags","Points","Rating","Earned","ConsciousPts","Status","Note/Description"].map(wt).join(",")),n.forEach(o=>{o.habits.forEach(d=>{r.push([o.date,"Habit",d.name,d.category,(d.tags||[]).join("|"),d.points,d.rating,d.earned,d.consciousPoints,d.status||(d.rating>0?"done":o.locked?"missed":"pending"),d.description||""].map(wt).join(","))}),o.tasks.forEach(d=>{r.push([o.date,"Task",d.hasImage?`${d.title} [photo]`:d.title,d.category,(d.tags||[]).join("|"),d.points,d.rating||"",d.earned,"",d.status||(d.done?"done":o.locked?"missed":"pending"),d.description||""].map(wt).join(","))}),r.push([o.date,"Summary",`Earned ${o.earned}/${o.max} (${o.percent}%)`,"","","","","","",o.locked?"locked":"open",o.note||""].map(wt).join(","))}),kt(`daily-report-${a}-${s}-to-${i}.csv`,"\uFEFF"+r.join(`
`),"text/csv;charset=utf-8"),h("Excel (CSV) exported")}function Xe(t,e){const a=t||k&&k.range||"day",{start:s,end:i,rows:n}=Ce(a,e),r={app:"Daily Report",exportedAt:new Date().toISOString(),range:a,start:s,end:i,days:n};kt(`daily-report-${a}-${s}-to-${i}.json`,JSON.stringify(r,null,2),"application/json"),h("JSON exported")}function Ze(t,e){const a=t||k&&k.range||"day",{start:s,end:i,rows:n}=Ce(a,e),r=n.map(d=>`
        <section style="margin-bottom:18px;border:1px solid #ddd;border-radius:12px;padding:12px">
          <h2 style="margin:0 0 4px;font-size:16px">${g(d.date)} — ${d.earned}/${d.max} pts (${d.percent}%)</h2>
          <p style="margin:0 0 8px;font-size:12px;color:#555">Habits ${d.habitScore} + Conscious ${d.consciousScore} + Tasks ${d.taskScore} · ${d.locked?"Locked":"Open"}${d.note?` · Note: ${g(d.note)}`:""}</p>
          <table style="width:100%;border-collapse:collapse;font-size:12px">
            <thead><tr><th align="left">Type</th><th align="left">Name</th><th align="left">Category</th><th>Points</th><th>Rating</th><th>Earned</th><th>Status</th></tr></thead>
            <tbody>
              ${d.habits.map(u=>`<tr><td>Habit</td><td>${g(u.name)}${u.description?` (${g(u.description)})`:""}</td><td>${g(u.category)}</td><td align="center">${u.points}${u.consciousPoints?`+${u.consciousPoints}🧠`:""}</td><td align="center">${u.rating||"-"}/5</td><td align="center">${u.earned}</td><td align="center">${u.status||(u.rating>0?"done":d.locked?"missed":"pending")}</td></tr>`).join("")}
              ${d.tasks.map(u=>`<tr><td>Task</td><td>${g(u.title)}${u.hasImage?" 📷":""}${u.description?` (${g(u.description)})`:""}</td><td>${g(u.category)}</td><td align="center">${u.points}</td><td align="center">${u.rating?`${u.rating}/5`:"-"}</td><td align="center">${u.earned}</td><td align="center">${u.status||(u.done?"done":d.locked?"missed":"pending")}</td></tr>`).join("")}
            </tbody>
          </table>
        </section>
      `).join(""),o=window.open("","_blank");if(!o){h("Popup blocked — allow popups to export PDF");return}o.document.write(`<!DOCTYPE html><html><head><title>Daily Report ${s} to ${i}</title></head><body style="font-family:sans-serif;padding:24px"><h1>Daily Report — ${s} to ${i}</h1>${r}<script>window.onload=function(){window.print()}<\/script></body></html>`),o.document.close(),h("PDF print view opened")}document.addEventListener("click",t=>{const e=t.target.closest("[data-screen]");if(e){H=e.dataset.screen,f();return}const a=t.target.closest("[data-action]");if(!a)return;const s=a.dataset.action;if(s==="close-modal"){if(x==="image"){x=null,k=null,f();return}(t.target.classList.contains("modal-backdrop")||a.classList.contains("ghost-btn"))&&(x=null,k=null,f());return}if(s==="note-bullets"){_e("bullets");return}if(s==="note-numbered"){_e("numbered");return}if(s==="values-bullets"){qe("bullets");return}if(s==="values-numbered"){qe("numbered");return}if(s==="pick-task-image"){const i=document.getElementById("task-image-input");i?i.click():h("Photo picking needs a browser file picker");return}if(s==="remove-task-image"){k&&(k._image="",f(),h("Photo removed — save to apply"));return}if(s==="view-task-image"){const i=c.findTask(v,a.dataset.id),n=i&&i.image?i.image:k&&(k._image||k.image)||"";if(!n){h("No photo on this task");return}x="image",k={image:n,title:i&&i.title||"Task photo"},f();return}if(s==="prev-day"&&je(-1),s==="next-day"&&je(1),s==="reload-app"){window.location.reload();return}if(s==="set-theme"){const i=a.dataset.theme==="light"?"light":"dark";c.setTheme(i),Ca(),h(i==="light"?"Light mode on":"Dark mode on")}if(s==="install-app"){Hi();return}if(s==="check-updates"){Ri();return}if(s==="apply-update"){Aa();return}if(s==="backup-now"){Li();return}if(s==="trigger-import"){const i=document.getElementById("backup-file");i&&i.click();return}if(s==="choose-folder"){Ci();return}if(s==="grant-folder"){Ei();return}if(s==="forget-folder"){Pi();return}if(s==="restore-backup"){Ni(a.dataset.name);return}if(s==="goto-settings"&&(H="settings"),s==="open-add-habit"&&(x="habit",k=null),s==="open-add-task"){if(I())return;x="task",k={category:"mentally"}}if(s==="open-add"){if(I())return;x="choose",k={category:"mentally"}}if(s==="toggle-edit"&&(Q=!Q),s==="toggle-settings-edit"){ut=!ut,f();return}if(s==="toggle-setting-habit"){const i=a.dataset.id;jt.has(i)?jt.delete(i):jt.add(i),f();return}if(s==="toggle-settings-section"){const i=a.dataset.id;xt.has(i)?xt.delete(i):xt.add(i),i==="tutorials"&&!xt.has("tutorials")&&(Ft=null),f();return}if(s==="open-tutorial"){Ft=Ft===a.dataset.id?null:a.dataset.id,f();return}if(s==="toggle-activity-cat"){const i=a.dataset.id;Gt.has(i)?Gt.delete(i):Gt.add(i),f();return}if(s==="add-goal-item"){const i=a.dataset.id,n=document.getElementById(`goal-item-input-${i}`),r=c.addGoalItem(i,n?n.value:"");r.ok?h("Task added to goal"):h(r.reason||"Could not add a task"),f();return}if(s==="toggle-goal-item"){const{id:i,item:n,done:r}=a.dataset,o=c.setGoalItemDone(i,n,r!=="true");if(!o.ok){h(o.reason||"Could not update the task"),f();return}const d=o.awarded&&o.awarded.length?o.awarded:c.checkGoals(v);d.length?h(`🏅 Reward earned: ${d[0].rewardTitle}!`):o.autoLocked&&h("All tasks done — goal completed and locked 🔒"),f();return}if(s==="remove-goal-item"){const i=c.removeGoalItem(a.dataset.id,a.dataset.item);h(i.ok?"Task removed from goal":i.reason||"Could not remove"),f();return}if(s==="lock-goal"){const i=c.findGoal(a.dataset.id),n=c.setGoalLocked(a.dataset.id,!0),r=i&&n.ok&&i.tasks.length>0&&!i.tasks.every(o=>o.done);n.ok?h(r?"Goal locked and terminated ⛔":"Goal locked 🔒"):h(n.reason||"Could not lock"),f();return}if(s==="unlock-goal"){const i=c.setGoalLocked(a.dataset.id,!1);h(i.ok?"Goal unlocked":i.reason||"Could not unlock"),f();return}if(s==="move-pinned-habit"){const i=c.getPinnedHabits(),n=i.findIndex(o=>o.id===a.dataset.id),r=n+(Number(a.dataset.dir)||0);if(n>=0&&r>=0&&r<i.length){const o=i[n];i[n]=i[r],i[r]=o,c.setPinnedHabitOrder(i.map(d=>d.id))}f();return}if(s==="move-pinned-task"){const i=c.getPinnedTasks(),n=i.findIndex(o=>o.id===a.dataset.id),r=n+(Number(a.dataset.dir)||0);if(n>=0&&r>=0&&r<i.length){const o=i[n];i[n]=i[r],i[r]=o,c.setPinnedTaskOrder(i.map(d=>d.id))}f();return}if(s==="open-habit-activity-date"){v=a.dataset.date,H="today",f();return}if(s==="open-edit-habit"){const i=c.findHabit(a.dataset.id);if(!i)return;x="edit-habit",k={id:i.id,name:i.name,description:i.description||"",points:i.points,category:i.category,tags:i.tags||[],consciousPoints:Number(i.consciousPoints)||0}}if(s==="open-edit-task"){if(I())return;const i=c.findTask(v,a.dataset.id);if(!i)return;x="edit-task",k={id:i.id,title:i.title,points:i.points,description:i.description,category:i.category,tags:i.tags||[],rating:Number(i.rating)||0,image:i.image||"",_image:void 0}}if(s==="open-edit-pinned-task"){const i=c.findPinnedTask(a.dataset.id);if(!i)return;x="edit-pinned-task",k={id:i.id,title:i.title,points:i.points,description:i.description||"",category:i.category,tags:i.tags||[],rating:0,image:i.image||"",_image:void 0}}if(s==="toggle-badges"&&(Vt=!Vt),s==="open-goal"&&(x="goal",k={kind:"habit-streak",targetDays:7,tier:"bronze"}),s==="open-edit-goal"){const i=c.getGoals().find(n=>n.id===a.dataset.id);if(!i)return;x="edit-goal",k={...i}}if(s==="remove-goal"&&(c.removeGoal(a.dataset.id),h("Goal removed")),s==="remove-badge"&&(c.removeBadge(a.dataset.id),h("Badge removed")),s==="rate-habit"){if(I())return;const n=c.habitRating(v,a.dataset.id)===Number(a.dataset.rating)?0:Number(a.dataset.rating);c.setHabitRating(v,a.dataset.id,n)}if(s==="rate-task"){if(I())return;const i=c.findTask(v,a.dataset.id);if(!i)return;const r=(Number(i.rating)||0)===Number(a.dataset.rating)?0:Number(a.dataset.rating);c.setTaskRating(v,a.dataset.id,r)}if(s==="open-export"&&(x="export",k={range:k&&k.range||"day"}),s==="set-export-range"){x="export",k={range:a.dataset.range||"day"},f();return}if(s==="do-export"){const i=a.dataset.format,n=k&&k.range||"day";i==="csv"&&Qe(n,v),i==="json"&&Xe(n,v),i==="pdf"&&Ze(n,v),x=null,k=null}if(s==="set-histexp-range"){_=["day","week","month","year"].includes(a.dataset.range)?a.dataset.range:"day",f();return}if(s==="histexp-do"){const i=a.dataset.format;let n=v;if(_==="day"||_==="week"){const r=document.getElementById("histexp-date");r&&/^\d{4}-\d{2}-\d{2}$/.test(r.value)&&(n=r.value)}else if(_==="month"){const r=document.getElementById("histexp-month");r&&/^\d{4}-\d{2}$/.test(r.value)&&(n=`${r.value}-15`)}else if(_==="year"){const r=document.getElementById("histexp-year"),o=Number(r&&r.value);Number.isInteger(o)&&o>=2e3&&o<=2100&&(n=`${String(o)}-06-15`)}i==="csv"&&Qe(_,n),i==="json"&&Xe(_,n),i==="pdf"&&Ze(_,n);return}if(s==="history-cal-nav"){const i=Qt||j(v);Qt=At(i,Number(a.dataset.dir)||0),f();return}if(s==="locked-cal-nav"){const i=Xt||j(v);Xt=At(i,Number(a.dataset.dir)||0),f();return}if(s==="toggle-locked-day"){const i=a.dataset.date,n=R.indexOf(i);n>=0?R.splice(n,1):R.push(i),f();return}if(s==="lock-selected"){const i=[...R].sort();if(!i.length)return;const n=c.lockDays(i);R=[],h(n===1?`Locked ${n} day`:`Locked ${n} days`),f();return}if(s==="unlock-selected"){const i=[...R].sort();if(!i.length)return;const n=c.unlockDays(i);R=[],h(n===1?`Unlocked ${n} day`:`Unlocked ${n} days`),f();return}if(s==="submit-day"&&(c.submitDay(v),h("Report submitted and locked")),s==="unlock-day"&&(c.unlockDay(a.dataset.date),h("Report unlocked")),s==="toggle-habit"){if(I())return;c.toggleHabit(v,a.dataset.id),f()}if(s==="toggle-task"){if(I())return;c.toggleTask(v,a.dataset.id),f()}if(s==="remove-task"){if(!Q||I())return;c.removeTask(v,a.dataset.id),f()}if(s==="remove-habit"&&(c.removeHabit(a.dataset.id),f()),s==="restore-habit"){const i=c.restoreHabit(a.dataset.id);h(i.ok?"Habit restored":i.reason||"Could not restore that habit"),f()}if(s==="toggle-archive"){pt=!pt,f();return}if(s==="archive-habit"){c.removeHabit(a.dataset.id),pt=!0,h("Habit archived — restore it from the Archive"),f();return}if(s==="archive-task"){if(I())return;const i=c.archiveTask(v,a.dataset.id);if(!i.ok){h(i.reason||"Could not archive that task");return}pt=!0,h("Task archived — restore it from the Archive"),f();return}if(s==="restore-task"){const i=c.isLocked(v)?c.todayKey():v,n=c.restoreTask(a.dataset.id,i);n.ok?h(n.from&&n.from!==i?`Task restored to ${i} — forwarded from ${n.from}`:`Task restored to ${i}`):h(n.reason||"Could not restore that task"),i!==v&&(v=i),f();return}if(s==="delete-archived-task"){if(!Q||!window.confirm("Delete this archived task permanently? This cannot be undone."))return;const i=c.deleteArchivedTask(a.dataset.id);h(i.ok?"Task deleted permanently":i.reason||"Could not delete"),f();return}if(s==="delete-archived-habit"){if(!window.confirm("Delete this archived habit permanently? This cannot be undone."))return;const i=c.deleteArchivedHabit(a.dataset.id);h(i.ok?"Habit deleted permanently":i.reason||"Could not delete"),f();return}if(s==="open-pin-habit"&&Qi(a.dataset.id),s==="open-replace-habit"){if(I())return;const i=c.findHabit(a.dataset.id);if(!i)return;const n=c.habitReplaceDays(v,i.id);x="replace",k={id:i.id,title:i.name,from:v,info:n};return}if(s==="pick-replace-day"){const i=document.querySelector('.sheet input[name="targetDate"]');i&&(i.value=a.dataset.date),document.querySelectorAll(".replace-day-chip").forEach(n=>{n.classList.toggle("on",n.dataset.date===a.dataset.date)});return}if(s==="undo-replace-habit"){if(I())return;const i=c.undoReplaceHabit(a.dataset.id,a.dataset.from,a.dataset.to);h(i.ok?"Habit is due on this day again":i.reason||"Could not undo that"),f();return}if(s==="open-forward-task"){if(I())return;const i=c.findTask(v,a.dataset.id);if(!i)return;x="forward",k={kind:"task",id:i.id,title:i.title,from:v}}if(s==="open-pin-task"){if(I())return;Xi(a.dataset.id)}if(s==="open-pin-template"&&Zi(a.dataset.id),s==="unpin-template"&&(c.unpinTaskTemplate(a.dataset.id),h("Task unpinned — removed from today and all upcoming days")),s==="pick-date"&&(v=a.dataset.date,tt=0,H="today"),s==="set-chart-range"){J=["week","month","year"].includes(a.dataset.range)?a.dataset.range:"week",it=0,f();return}if(s==="set-chart-cat"){X=a.dataset.cat||"all",f();return}if(s==="week-nav"){tt+=Number(a.dataset.dir)||0,tt>0&&(tt=0),f();return}if(s==="chart-nav"){it+=Number(a.dataset.dir)||0,it>0&&(it=0),f();return}if(s==="add-category"){const i=document.getElementById("new-category"),n=c.addCategory(i?i.value:"");h(n.ok?"Category added":n.reason||"Couldn't add category"),f();return}if(s==="rename-category"){const i=c.getCustomCategories().find(o=>o.id===a.dataset.id),n=window.prompt("Rename category",i?i.label:"");if(n==null)return;const r=c.renameCategory(a.dataset.id,n);h(r.ok?"Category renamed":r.reason||"Couldn't rename"),f();return}if(s==="delete-category"){if(!window.confirm("Delete this category? Its habits and tasks move to Mentally."))return;const i=c.deleteCategory(a.dataset.id);i.ok&&ct.delete(a.dataset.id),h(i.ok?"Category deleted":i.reason||"Couldn't delete"),f();return}if(s==="rename-tag"){const i=window.prompt("Rename tag everywhere",a.dataset.tag||"");if(i==null)return;const n=c.renameTag(a.dataset.tag,i);h(n.ok?n.merged?"Tags merged":"Tag renamed everywhere":n.reason||"Couldn't rename"),f();return}if(s==="delete-tag"){if(!window.confirm(`Delete tag "#${a.dataset.tag}" from all habits and tasks?`))return;c.deleteTag(a.dataset.tag),h("Tag deleted everywhere"),f();return}if(s==="add-tag"){const i=document.getElementById("tag-habit-pick"),n=document.getElementById("new-tag"),r=c.addTagToHabit(i?i.value:"",n?n.value:"");h(r.ok?"Tag added to habit":r.reason||"Couldn't add tag"),f();return}if(s==="set-points"){const i=document.querySelector('input[name="points"]');i&&(i.value=a.dataset.points),document.querySelectorAll(".chip-row .chip[data-points]").forEach(n=>n.classList.remove("on")),a.classList.add("on");return}if(s==="set-category"){const i=a.closest("form")||a.closest(".sheet"),n=i.querySelector('input[name="category"]');n&&(n.value=a.dataset.category),i.querySelectorAll(".cat-row .chip").forEach(r=>r.classList.remove("on")),a.classList.add("on");return}if(s==="set-rating"){const i=a.closest(".sheet")||a.closest("form")||document,n=i.querySelector('input[name="rating"]');n&&(n.value=a.dataset.rating),i.querySelectorAll(".rating-row .chip").forEach(r=>r.classList.remove("on")),a.classList.add("on");return}if(s==="set-conscious"){const i=a.closest(".sheet")||a.closest("form")||document,n=i.querySelector('input[name="consciousPoints"]');n&&(n.value=a.dataset.conscious),i.querySelectorAll(".conscious-row .chip").forEach(r=>r.classList.remove("on")),a.classList.add("on");return}if(s==="set-goal-kind"){const i=a.closest(".sheet")||document,n=i.querySelector('input[name="kind"]');n&&(n.value=a.dataset.kind),i.querySelectorAll(".goal-kind-row .chip").forEach(u=>u.classList.remove("on")),a.classList.add("on");const r=a.dataset.kind,o=i.querySelector(".goal-target-habit"),d=i.querySelector(".goal-target-task");o&&(o.style.display=r==="habit-streak"?"":"none"),d&&(d.style.display=r==="task-streak"?"":"none"),k&&(k.kind=r);return}if(s==="set-goal-tier"){const i=a.closest(".sheet")||document,n=i.querySelector('input[name="tier"]');n&&(n.value=a.dataset.tier),i.querySelectorAll(".goal-tier-row .chip").forEach(r=>r.classList.remove("on")),a.classList.add("on");return}if(s==="pin-mode"){const i=a.closest("form"),n=a.dataset.mode;i.querySelector('input[name="mode"]').value=n,i.querySelectorAll(".pin-modes .chip").forEach(o=>o.classList.remove("on")),a.classList.add("on");const r=(o,d)=>{const u=i.querySelector(o);u&&(u.style.display=d?"":"none")};r(".pin-until",n==="until"),r(".pin-weekdays",n==="weekly"),r(".pin-monthdays",n==="monthly"),r(".pin-yeardays",n==="yearly"),k&&k.pin&&(k.pin.mode=n);return}if(s==="toggle-weekday"){a.classList.toggle("on");return}if(s==="toggle-monthday"){a.classList.toggle("on");return}if(s==="pin-cal-nav"){if(!k)return;const i=a.dataset.target,n=Number(a.dataset.dir)||0;i==="except"?k._exceptCal=At(k._exceptCal||j(v),n):k._customCal=At(k._customCal||j(v),n),f();return}if(s==="toggle-pin-date"){if(!k||!k.pin)return;const i=a.dataset.target,n=a.dataset.date,r=i==="custom"?"customDates":"exceptDates",o=Array.isArray(k.pin[r])?[...k.pin[r]]:[],d=o.indexOf(n);d>=0?o.splice(d,1):(o.push(n),o.length>365&&o.shift()),k.pin[r]=o.sort(),f();return}if(s==="add-year-day"){if(!k||!k.pin)return;const i=a.closest("form")||document,n=i.querySelector("#year-month-select"),r=i.querySelector("#year-day-select");n&&(k._yearMonth=n.value);const o=`${n?n.value:"01"}-${r?r.value:"01"}`,d=Array.isArray(k.pin.yearDays)?[...k.pin.yearDays]:[];d.includes(o)||d.push(o),k.pin.yearDays=d.sort(),f();return}if(s==="remove-year-day"){if(!k||!k.pin)return;const i=a.dataset.date;k.pin.yearDays=(k.pin.yearDays||[]).filter(n=>n!==i),f();return}if(s==="clear-pin"){const i=a.closest("form"),n=i.dataset.kind,r=i.dataset.id;let o=!1;if(n==="habit"&&c.unpinHabit(r),n==="task"){const d=c.findTask(v,r);d!=null&&d.sourcePinId&&(c.unpinTaskTemplate(d.sourcePinId),o=!0)}n==="template"&&(c.unpinTaskTemplate(r),o=!0),x=null,k=null,h(o?"Task unpinned — removed from today and all upcoming days":"Unpinned"),f();return}if(s==="lock-profile"){c.setProfileLocked(!0),h("Profile locked — read only"),f();return}if(s==="unlock-profile"){c.setProfileLocked(!1),h("Profile unlocked"),f();return}if(s==="add-whoami"){const i=document.getElementById("new-whoami"),n=c.addWhoAmI(i?i.value:"");h(n.ok?"Added":n.reason||"Couldn't add"),f();return}if(s==="move-whoami"){c.moveWhoAmI(a.dataset.id,Number(a.dataset.dir)||0),f();return}if(s==="remove-whoami"){c.removeWhoAmI(a.dataset.id),h("Removed"),f();return}if(s==="add-lifearea"){const i=document.getElementById("new-lifearea"),n=c.addLifeArea(i?i.value:"");n.ok?(gt=n.id,h("Life area added")):h(n.reason||"Couldn't add"),f();return}if(s==="toggle-lifearea"){const i=a.dataset.id;gt=gt===i?null:i,f();return}if(s==="move-lifearea"){c.moveLifeArea(a.dataset.id,Number(a.dataset.dir)||0),f();return}if(s==="toggle-cat"){const i=a.dataset.id;ct.has(i)?ct.delete(i):ct.add(i),f();const n=document.querySelector(`[data-action="toggle-cat"][data-id="${CSS.escape(i)}"]`);n&&n.focus({preventScroll:!0});return}if(s==="expand-cats"){c.getCategories().forEach(i=>ct.add(i.id)),f();return}if(s==="collapse-cats"){ct.clear(),f();return}if(s==="save-cat-goals"){const i=a.dataset.id,n=document.querySelector(`[data-cat-goals="${CSS.escape(i)}"]`),r=n?n.value:yt.get(i)||"",o=Ct(r);c.updateCategory(i,{goals:Pt(o)}),yt.delete(i),h(o.length?`Saved ${o.length} goal${o.length===1?"":"s"} for ${nt(i)}`:`Cleared goals for ${nt(i)}`),f();return}if(s==="reset-cat-goals"){const i=a.dataset.id;yt.delete(i),f();return}if(s==="remove-lifearea"){c.removeLifeArea(a.dataset.id),gt===a.dataset.id&&(gt=null),h("Life area removed"),f();return}if(s==="set-pgoal-term"){Z=["short","medium","long"].includes(a.dataset.term)?a.dataset.term:"short",vt=c.profileGoalDurations()[Z][0],f();return}if(s==="set-pgoal-filter"){Bt=["all","short","medium","long"].includes(a.dataset.filter)?a.dataset.filter:"all",f();return}if(s==="add-pgoal"){const i=document.getElementById("new-pgoal"),n=document.getElementById("new-pgoal-duration"),r=c.addProfileGoal(i?i.value:"",Z,n?n.value:vt);h(r.ok?`Goal added ${_t(Z)}`:r.reason||"Couldn't add"),f();return}if(s==="remove-pgoal"){c.removeProfileGoal(a.dataset.id),h("Goal removed"),f();return}if(s==="add-idea"){const i=document.getElementById("new-idea"),n=String(i?i.value:"").trim().slice(0,200);if(!n){h("Write an idea first");return}if(c.isProfileLocked()){h("Profile is locked");return}const r=String(c.getProfile().ideas||"").split(`
`).map(o=>o.trim()).filter(Boolean);r.push(`• ${n}`),c.setProfileField("ideas",r.join(`
`)),h("Idea added"),f();return}if(s==="remove-idea"){if(c.isProfileLocked())return;const i=Number(a.dataset.index),n=String(c.getProfile().ideas||"").split(`
`).filter(r=>r.trim());if(!Number.isInteger(i)||i<0||i>=n.length)return;n.splice(i,1),c.setProfileField("ideas",n.join(`
`)),h("Idea removed"),f();return}if(s==="add-quote"){const i=document.getElementById("new-quote"),n=document.getElementById("new-quote-author"),r=c.addQuote(i?i.value:"",n?n.value:"");h(r.ok?"Quote added":r.reason||"Couldn't add"),f();return}if(s==="toggle-quote-fav"){c.toggleQuoteFav(a.dataset.id),f();return}if(s==="remove-quote"){c.removeQuote(a.dataset.id),h("Quote removed"),f();return}if(s==="toggle-quotes"){Dt=!Dt,f();return}f()});document.addEventListener("submit",t=>{const e=t.target.closest("[data-form]");if(!e)return;t.preventDefault();const a=e.dataset.form;if(a==="habit"||a==="task"||a==="edit-habit"||a==="edit-task"||a==="edit-pinned-task"){const s=new FormData(e),i=String(s.get("title")||""),n=Number(s.get("points")||0),r=String(s.get("category")||"mentally"),o=String(s.get("description")||""),d=String(s.get("tags")||""),u=Math.max(0,Math.min(5,Number(s.get("rating")||0))),p=Math.max(0,Math.min(100,Number(s.get("consciousPoints")||0)));if(!i.trim())return;const b=k&&k._image!==void 0?q(k._image):q(k&&k.image);if(a==="habit")c.addHabit(i,n,{description:o,category:r,consciousPoints:p,tags:d,startFrom:v}),h("Habit added");else if(a==="task"){const m=String(s.get("goalTarget")||"");if(m){const $=c.addGoalItem(m,i);if(!$.ok){h($.reason||"Could not add the task to the goal");return}const T=c.findGoal(m);h(`Added to goal “${T?T.title:i}”`)}else{if(I())return;c.addTask(v,i,n,{description:o,category:r,rating:u,tags:d,image:b}),h("Task added")}}else if(a==="edit-habit")c.updateHabit(e.dataset.id,{name:i,description:o,points:n,category:r,consciousPoints:p,tags:d}),h("Habit updated");else if(a==="edit-pinned-task")c.updatePinnedTaskDetails(e.dataset.id,{title:i,description:o,points:n,category:r,tags:d,image:b}),h("Pinned task updated");else{if(I())return;c.updateTask(v,e.dataset.id,{title:i,points:n,description:o,category:r,rating:u,tags:d,image:b}),h("Task updated")}x=null,k=null,f();return}if(a==="pin"){const s=Ki(e);if(!s)return;const i=e.dataset.kind,n=e.dataset.id;i==="habit"&&c.pinHabit(n,s),i==="task"&&c.pinTask(v,n,s),i==="template"&&c.updatePinnedTask(n,s),x=null,k=null,h("Pin saved"),f();return}if(a==="replace"){const s=new FormData(e),i=String(s.get("targetDate")||""),n=e.dataset.id,r=k&&k.from||v,o=c.replaceHabit(r,n,i);if(!o.ok){h(o.reason||"Could not replace that habit day");return}x=null,k=null,h(`Habit moved from ${o.from} to ${o.to}`),f();return}if(a==="goal"||a==="edit-goal"){const s=new FormData(e),i=String(s.get("title")||"").trim(),n=String(s.get("kind")||"habit-streak"),r=String(s.get("tier")||"bronze"),o=String(s.get("rewardTitle")||"").trim(),d=Math.max(1,Math.min(365,Number(s.get("targetDays")||7)));if(!i||!o){h("Goal title and reward title are required");return}let u="";if(n==="habit-streak"&&(u=String(s.get("habitTarget")||"")),n==="task-streak"&&(u=String(s.get("taskTarget")||"")),(n==="habit-streak"||n==="task-streak")&&!u){h(n==="habit-streak"?"Pick a habit":"Pin a task first, then pick it");return}a==="goal"?(c.addGoal({title:i,kind:n,targetId:u,targetDays:d,tier:r,rewardTitle:o}),h("Goal added")):(c.updateGoal(e.dataset.id,{title:i,kind:n,targetId:u,targetDays:d,tier:r,rewardTitle:o}),h("Goal updated"));const p=c.checkGoals(v);p.length&&h(`🏅 Reward earned: ${p[0].rewardTitle}!`),x=null,k=null,f()}});document.addEventListener("change",t=>{const e=t.target.closest(".sort-select");if(e){const a=e.dataset.sortKind;a==="habit"&&c.setHabitSort(e.value),a==="task"&&c.setTaskSort(e.value),f()}if(t.target&&t.target.id==="show-conscious"&&(c.setShowConscious(t.target.checked),h(t.target.checked?"Conscious points on":"Conscious points hidden"),f()),t.target&&t.target.id==="week-start"&&(c.setWeekStart(Number(t.target.value)),h("Week starts on "+t.target.selectedOptions[0].textContent),f()),t.target&&t.target.id==="new-pgoal-duration"){vt=t.target.value;return}if(t.target&&t.target.id==="year-month-select"&&k&&(k._yearMonth=t.target.value),t.target&&t.target.id==="task-image-input"){const a=t.target.files&&t.target.files[0];if(!a)return;if(!String(a.type||"").startsWith("image/")){h("Please pick an image file"),t.target.value="";return}h("Processing photo…"),ii(a).then(s=>{if(t.target.value="",!s){h("Photo too large or unreadable — try a smaller one");return}k&&(k._image=s,f(),h("Photo attached — save to apply"))})}});function ts(){const t=window.visualViewport;if(!t)return;const e=document.documentElement,a=()=>{e.style.setProperty("--vvh",`${Math.max(0,Math.round(t.height))}px`);const s=window.innerHeight-t.height>120;e.classList.toggle("vk-open",s)};t.addEventListener("resize",a),t.addEventListener("scroll",a),a()}ts();if("serviceWorker"in navigator){window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js").catch(()=>{})});let t=!1;try{const e=Number(sessionStorage.getItem("dr-reload-at")||0);Date.now()-e<8e3&&(t=!0)}catch{}navigator.serviceWorker.addEventListener("controllerchange",()=>{if(!t){t=!0;try{sessionStorage.setItem("dr-reload-at",String(Date.now()))}catch{}window.location.reload()}})}function es(){const t=document.getElementById("boot-error");t&&(t.style.display="none")}es();Ca();f();Ti().then(()=>{H==="settings"&&f()});setInterval(()=>{!document.hidden&&Se()&&f()},6e4);document.addEventListener("visibilitychange",()=>{!document.hidden&&Se()&&f()});
