import{r,R as c}from"./app-DZ9i8GeQ.js";const s=typeof window<"u"?r.useLayoutEffect:r.useEffect;function f(t,e){typeof t=="function"?t(e):t&&(t.current=e)}function a(t){const e=r.useRef(t);return s(()=>{e.current=t}),r.useRef((...o)=>(0,e.current)(...o)).current}function p(...t){return r.useMemo(()=>t.every(e=>e==null)?null:e=>{t.forEach(o=>{f(o,e)})},t)}function l(t,e){if(t==null)return{};var o={};for(var n in t)if({}.hasOwnProperty.call(t,n)){if(e.includes(n))continue;o[n]=t[n]}return o}function u(t,e){return u=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(o,n){return o.__proto__=n,o},u(t,e)}function y(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,u(t,e)}const _=c.createContext(null);export{_ as T,y as _,s as a,a as b,l as c,f as s,p as u};
