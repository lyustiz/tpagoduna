import{b as C}from"./DefaultPropsProvider-0U4os2XN.js";import{u as O}from"./TransitionGroupContext-Q82QEm3H.js";function R(e){return typeof e=="string"}function A(e,c,t){return e===void 0||R(e)?c:{...c,ownerState:{...c.ownerState,...t}}}function T(e,c=[]){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>n.match(/^on[A-Z]/)&&typeof e[n]=="function"&&!c.includes(n)).forEach(n=>{t[n]=e[n]}),t}function E(e){if(e===void 0)return{};const c={};return Object.keys(e).filter(t=>!(t.match(/^on[A-Z]/)&&typeof e[t]=="function")).forEach(t=>{c[t]=e[t]}),c}function W(e){const{getSlotProps:c,additionalProps:t,externalSlotProps:n,externalForwardedProps:s,className:m}=e;if(!c){const l=C(t==null?void 0:t.className,m,s==null?void 0:s.className,n==null?void 0:n.className),o={...t==null?void 0:t.style,...s==null?void 0:s.style,...n==null?void 0:n.style},i={...t,...s,...n};return l.length>0&&(i.className=l),Object.keys(o).length>0&&(i.style=o),{props:i,internalRef:void 0}}const y=T({...s,...n}),a=E(n),g=E(s),f=c(y),u=C(f==null?void 0:f.className,t==null?void 0:t.className,m,s==null?void 0:s.className,n==null?void 0:n.className),h={...f==null?void 0:f.style,...t==null?void 0:t.style,...s==null?void 0:s.style,...n==null?void 0:n.style},r={...f,...t,...g,...a};return u.length>0&&(r.className=u),Object.keys(h).length>0&&(r.style=h),{props:r,internalRef:f.ref}}function Z(e,c,t){return typeof e=="function"?e(c,t):e}function S(e,c){const{className:t,elementType:n,ownerState:s,externalForwardedProps:m,internalForwardedProps:y,shouldForwardComponentProp:a=!1,...g}=c,{component:f,slots:u={[e]:void 0},slotProps:h={[e]:void 0},...r}=m,l=u[e]||n,o=Z(h[e],s),{props:{component:i,...H},internalRef:d}=W({className:t,...g,externalForwardedProps:e==="root"?r:void 0,externalSlotProps:o}),k=O(d,o==null?void 0:o.ref,c.ref),N=e==="root"?i||f:i,v=A(l,{...e==="root"&&!f&&!u[e]&&y,...e!=="root"&&!u[e]&&y,...H,...N&&!a&&{as:N},...N&&a&&{component:N},ref:k},s);return[l,v]}export{A as a,T as e,W as m,Z as r,S as u};
