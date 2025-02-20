import{r as C,j as _}from"./app-DZ9i8GeQ.js";import{e as Mt,g as Dt,d as jt,s as Ze,u as Bt,m as st,a as kt,k as Lt,b as ht}from"./DefaultPropsProvider-0U4os2XN.js";import{b as nr,a as Wt,u as ar,G as ir}from"./Grow-DGYhAm_Z.js";import{u as sr}from"./useTheme-CVUJkYMh.js";import{u as qe}from"./useSlot-BFNUMcbd.js";import{o as gt,P as pr,g as lr}from"./Portal-DwlSCF_M.js";import{u as ot,a as yt,b as bt}from"./TransitionGroupContext-Q82QEm3H.js";import{u as Xe,T as cr,i as wt}from"./createSimplePaletteValueFilter-CHjdgL8C.js";import{u as fr}from"./useId-D-yikIoo.js";var k="top",I="bottom",U="right",L="left",pt="auto",Fe=[k,I,U,L],Oe="start",We="end",ur="clippingParents",Nt="viewport",je="popper",dr="reference",xt=Fe.reduce(function(t,e){return t.concat([e+"-"+Oe,e+"-"+We])},[]),Ft=[].concat(Fe,[pt]).reduce(function(t,e){return t.concat([e,e+"-"+Oe,e+"-"+We])},[]),vr="beforeRead",mr="read",hr="afterRead",gr="beforeMain",yr="main",br="afterMain",wr="beforeWrite",xr="write",Or="afterWrite",Pr=[vr,mr,hr,gr,yr,br,wr,xr,Or];function te(t){return t?(t.nodeName||"").toLowerCase():null}function W(t){if(t==null)return window;if(t.toString()!=="[object Window]"){var e=t.ownerDocument;return e&&e.defaultView||window}return t}function de(t){var e=W(t).Element;return t instanceof e||t instanceof Element}function H(t){var e=W(t).HTMLElement;return t instanceof e||t instanceof HTMLElement}function lt(t){if(typeof ShadowRoot>"u")return!1;var e=W(t).ShadowRoot;return t instanceof e||t instanceof ShadowRoot}function Rr(t){var e=t.state;Object.keys(e.elements).forEach(function(r){var o=e.styles[r]||{},n=e.attributes[r]||{},i=e.elements[r];!H(i)||!te(i)||(Object.assign(i.style,o),Object.keys(n).forEach(function(l){var a=n[l];a===!1?i.removeAttribute(l):i.setAttribute(l,a===!0?"":a)}))})}function Tr(t){var e=t.state,r={popper:{position:e.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(e.elements.popper.style,r.popper),e.styles=r,e.elements.arrow&&Object.assign(e.elements.arrow.style,r.arrow),function(){Object.keys(e.elements).forEach(function(o){var n=e.elements[o],i=e.attributes[o]||{},l=Object.keys(e.styles.hasOwnProperty(o)?e.styles[o]:r[o]),a=l.reduce(function(s,c){return s[c]="",s},{});!H(n)||!te(n)||(Object.assign(n.style,a),Object.keys(i).forEach(function(s){n.removeAttribute(s)}))})}}const Er={name:"applyStyles",enabled:!0,phase:"write",fn:Rr,effect:Tr,requires:["computeStyles"]};function ee(t){return t.split("-")[0]}var ue=Math.max,Qe=Math.min,Pe=Math.round;function nt(){var t=navigator.userAgentData;return t!=null&&t.brands&&Array.isArray(t.brands)?t.brands.map(function(e){return e.brand+"/"+e.version}).join(" "):navigator.userAgent}function Ht(){return!/^((?!chrome|android).)*safari/i.test(nt())}function Re(t,e,r){e===void 0&&(e=!1),r===void 0&&(r=!1);var o=t.getBoundingClientRect(),n=1,i=1;e&&H(t)&&(n=t.offsetWidth>0&&Pe(o.width)/t.offsetWidth||1,i=t.offsetHeight>0&&Pe(o.height)/t.offsetHeight||1);var l=de(t)?W(t):window,a=l.visualViewport,s=!Ht()&&r,c=(o.left+(s&&a?a.offsetLeft:0))/n,p=(o.top+(s&&a?a.offsetTop:0))/i,m=o.width/n,x=o.height/i;return{width:m,height:x,top:p,right:c+m,bottom:p+x,left:c,x:c,y:p}}function ct(t){var e=Re(t),r=t.offsetWidth,o=t.offsetHeight;return Math.abs(e.width-r)<=1&&(r=e.width),Math.abs(e.height-o)<=1&&(o=e.height),{x:t.offsetLeft,y:t.offsetTop,width:r,height:o}}function It(t,e){var r=e.getRootNode&&e.getRootNode();if(t.contains(e))return!0;if(r&&lt(r)){var o=e;do{if(o&&t.isSameNode(o))return!0;o=o.parentNode||o.host}while(o)}return!1}function ne(t){return W(t).getComputedStyle(t)}function Ar(t){return["table","td","th"].indexOf(te(t))>=0}function se(t){return((de(t)?t.ownerDocument:t.document)||window.document).documentElement}function _e(t){return te(t)==="html"?t:t.assignedSlot||t.parentNode||(lt(t)?t.host:null)||se(t)}function Ot(t){return!H(t)||ne(t).position==="fixed"?null:t.offsetParent}function $r(t){var e=/firefox/i.test(nt()),r=/Trident/i.test(nt());if(r&&H(t)){var o=ne(t);if(o.position==="fixed")return null}var n=_e(t);for(lt(n)&&(n=n.host);H(n)&&["html","body"].indexOf(te(n))<0;){var i=ne(n);if(i.transform!=="none"||i.perspective!=="none"||i.contain==="paint"||["transform","perspective"].indexOf(i.willChange)!==-1||e&&i.willChange==="filter"||e&&i.filter&&i.filter!=="none")return n;n=n.parentNode}return null}function He(t){for(var e=W(t),r=Ot(t);r&&Ar(r)&&ne(r).position==="static";)r=Ot(r);return r&&(te(r)==="html"||te(r)==="body"&&ne(r).position==="static")?e:r||$r(t)||e}function ft(t){return["top","bottom"].indexOf(t)>=0?"x":"y"}function ke(t,e,r){return ue(t,Qe(e,r))}function Cr(t,e,r){var o=ke(t,e,r);return o>r?r:o}function Ut(){return{top:0,right:0,bottom:0,left:0}}function Vt(t){return Object.assign({},Ut(),t)}function zt(t,e){return e.reduce(function(r,o){return r[o]=t,r},{})}var Sr=function(e,r){return e=typeof e=="function"?e(Object.assign({},r.rects,{placement:r.placement})):e,Vt(typeof e!="number"?e:zt(e,Fe))};function Mr(t){var e,r=t.state,o=t.name,n=t.options,i=r.elements.arrow,l=r.modifiersData.popperOffsets,a=ee(r.placement),s=ft(a),c=[L,U].indexOf(a)>=0,p=c?"height":"width";if(!(!i||!l)){var m=Sr(n.padding,r),x=ct(i),f=s==="y"?k:L,O=s==="y"?I:U,d=r.rects.reference[p]+r.rects.reference[s]-l[s]-r.rects.popper[p],v=l[s]-r.rects.reference[s],b=He(i),R=b?s==="y"?b.clientHeight||0:b.clientWidth||0:0,w=d/2-v/2,u=m[f],h=R-x[p]-m[O],g=R/2-x[p]/2+w,T=ke(u,g,h),S=s;r.modifiersData[o]=(e={},e[S]=T,e.centerOffset=T-g,e)}}function Dr(t){var e=t.state,r=t.options,o=r.element,n=o===void 0?"[data-popper-arrow]":o;n!=null&&(typeof n=="string"&&(n=e.elements.popper.querySelector(n),!n)||It(e.elements.popper,n)&&(e.elements.arrow=n))}const jr={name:"arrow",enabled:!0,phase:"main",fn:Mr,effect:Dr,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Te(t){return t.split("-")[1]}var Br={top:"auto",right:"auto",bottom:"auto",left:"auto"};function kr(t,e){var r=t.x,o=t.y,n=e.devicePixelRatio||1;return{x:Pe(r*n)/n||0,y:Pe(o*n)/n||0}}function Pt(t){var e,r=t.popper,o=t.popperRect,n=t.placement,i=t.variation,l=t.offsets,a=t.position,s=t.gpuAcceleration,c=t.adaptive,p=t.roundOffsets,m=t.isFixed,x=l.x,f=x===void 0?0:x,O=l.y,d=O===void 0?0:O,v=typeof p=="function"?p({x:f,y:d}):{x:f,y:d};f=v.x,d=v.y;var b=l.hasOwnProperty("x"),R=l.hasOwnProperty("y"),w=L,u=k,h=window;if(c){var g=He(r),T="clientHeight",S="clientWidth";if(g===W(r)&&(g=se(r),ne(g).position!=="static"&&a==="absolute"&&(T="scrollHeight",S="scrollWidth")),g=g,n===k||(n===L||n===U)&&i===We){u=I;var A=m&&g===h&&h.visualViewport?h.visualViewport.height:g[T];d-=A-o.height,d*=s?1:-1}if(n===L||(n===k||n===I)&&i===We){w=U;var P=m&&g===h&&h.visualViewport?h.visualViewport.width:g[S];f-=P-o.width,f*=s?1:-1}}var E=Object.assign({position:a},c&&Br),B=p===!0?kr({x:f,y:d},W(r)):{x:f,y:d};if(f=B.x,d=B.y,s){var $;return Object.assign({},E,($={},$[u]=R?"0":"",$[w]=b?"0":"",$.transform=(h.devicePixelRatio||1)<=1?"translate("+f+"px, "+d+"px)":"translate3d("+f+"px, "+d+"px, 0)",$))}return Object.assign({},E,(e={},e[u]=R?d+"px":"",e[w]=b?f+"px":"",e.transform="",e))}function Lr(t){var e=t.state,r=t.options,o=r.gpuAcceleration,n=o===void 0?!0:o,i=r.adaptive,l=i===void 0?!0:i,a=r.roundOffsets,s=a===void 0?!0:a,c={placement:ee(e.placement),variation:Te(e.placement),popper:e.elements.popper,popperRect:e.rects.popper,gpuAcceleration:n,isFixed:e.options.strategy==="fixed"};e.modifiersData.popperOffsets!=null&&(e.styles.popper=Object.assign({},e.styles.popper,Pt(Object.assign({},c,{offsets:e.modifiersData.popperOffsets,position:e.options.strategy,adaptive:l,roundOffsets:s})))),e.modifiersData.arrow!=null&&(e.styles.arrow=Object.assign({},e.styles.arrow,Pt(Object.assign({},c,{offsets:e.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:s})))),e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-placement":e.placement})}const Wr={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:Lr,data:{}};var Ye={passive:!0};function Nr(t){var e=t.state,r=t.instance,o=t.options,n=o.scroll,i=n===void 0?!0:n,l=o.resize,a=l===void 0?!0:l,s=W(e.elements.popper),c=[].concat(e.scrollParents.reference,e.scrollParents.popper);return i&&c.forEach(function(p){p.addEventListener("scroll",r.update,Ye)}),a&&s.addEventListener("resize",r.update,Ye),function(){i&&c.forEach(function(p){p.removeEventListener("scroll",r.update,Ye)}),a&&s.removeEventListener("resize",r.update,Ye)}}const Fr={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Nr,data:{}};var Hr={left:"right",right:"left",bottom:"top",top:"bottom"};function Je(t){return t.replace(/left|right|bottom|top/g,function(e){return Hr[e]})}var Ir={start:"end",end:"start"};function Rt(t){return t.replace(/start|end/g,function(e){return Ir[e]})}function ut(t){var e=W(t),r=e.pageXOffset,o=e.pageYOffset;return{scrollLeft:r,scrollTop:o}}function dt(t){return Re(se(t)).left+ut(t).scrollLeft}function Ur(t,e){var r=W(t),o=se(t),n=r.visualViewport,i=o.clientWidth,l=o.clientHeight,a=0,s=0;if(n){i=n.width,l=n.height;var c=Ht();(c||!c&&e==="fixed")&&(a=n.offsetLeft,s=n.offsetTop)}return{width:i,height:l,x:a+dt(t),y:s}}function Vr(t){var e,r=se(t),o=ut(t),n=(e=t.ownerDocument)==null?void 0:e.body,i=ue(r.scrollWidth,r.clientWidth,n?n.scrollWidth:0,n?n.clientWidth:0),l=ue(r.scrollHeight,r.clientHeight,n?n.scrollHeight:0,n?n.clientHeight:0),a=-o.scrollLeft+dt(t),s=-o.scrollTop;return ne(n||r).direction==="rtl"&&(a+=ue(r.clientWidth,n?n.clientWidth:0)-i),{width:i,height:l,x:a,y:s}}function vt(t){var e=ne(t),r=e.overflow,o=e.overflowX,n=e.overflowY;return/auto|scroll|overlay|hidden/.test(r+n+o)}function qt(t){return["html","body","#document"].indexOf(te(t))>=0?t.ownerDocument.body:H(t)&&vt(t)?t:qt(_e(t))}function Le(t,e){var r;e===void 0&&(e=[]);var o=qt(t),n=o===((r=t.ownerDocument)==null?void 0:r.body),i=W(o),l=n?[i].concat(i.visualViewport||[],vt(o)?o:[]):o,a=e.concat(l);return n?a:a.concat(Le(_e(l)))}function at(t){return Object.assign({},t,{left:t.x,top:t.y,right:t.x+t.width,bottom:t.y+t.height})}function zr(t,e){var r=Re(t,!1,e==="fixed");return r.top=r.top+t.clientTop,r.left=r.left+t.clientLeft,r.bottom=r.top+t.clientHeight,r.right=r.left+t.clientWidth,r.width=t.clientWidth,r.height=t.clientHeight,r.x=r.left,r.y=r.top,r}function Tt(t,e,r){return e===Nt?at(Ur(t,r)):de(e)?zr(e,r):at(Vr(se(t)))}function qr(t){var e=Le(_e(t)),r=["absolute","fixed"].indexOf(ne(t).position)>=0,o=r&&H(t)?He(t):t;return de(o)?e.filter(function(n){return de(n)&&It(n,o)&&te(n)!=="body"}):[]}function Xr(t,e,r,o){var n=e==="clippingParents"?qr(t):[].concat(e),i=[].concat(n,[r]),l=i[0],a=i.reduce(function(s,c){var p=Tt(t,c,o);return s.top=ue(p.top,s.top),s.right=Qe(p.right,s.right),s.bottom=Qe(p.bottom,s.bottom),s.left=ue(p.left,s.left),s},Tt(t,l,o));return a.width=a.right-a.left,a.height=a.bottom-a.top,a.x=a.left,a.y=a.top,a}function Xt(t){var e=t.reference,r=t.element,o=t.placement,n=o?ee(o):null,i=o?Te(o):null,l=e.x+e.width/2-r.width/2,a=e.y+e.height/2-r.height/2,s;switch(n){case k:s={x:l,y:e.y-r.height};break;case I:s={x:l,y:e.y+e.height};break;case U:s={x:e.x+e.width,y:a};break;case L:s={x:e.x-r.width,y:a};break;default:s={x:e.x,y:e.y}}var c=n?ft(n):null;if(c!=null){var p=c==="y"?"height":"width";switch(i){case Oe:s[c]=s[c]-(e[p]/2-r[p]/2);break;case We:s[c]=s[c]+(e[p]/2-r[p]/2);break}}return s}function Ne(t,e){e===void 0&&(e={});var r=e,o=r.placement,n=o===void 0?t.placement:o,i=r.strategy,l=i===void 0?t.strategy:i,a=r.boundary,s=a===void 0?ur:a,c=r.rootBoundary,p=c===void 0?Nt:c,m=r.elementContext,x=m===void 0?je:m,f=r.altBoundary,O=f===void 0?!1:f,d=r.padding,v=d===void 0?0:d,b=Vt(typeof v!="number"?v:zt(v,Fe)),R=x===je?dr:je,w=t.rects.popper,u=t.elements[O?R:x],h=Xr(de(u)?u:u.contextElement||se(t.elements.popper),s,p,l),g=Re(t.elements.reference),T=Xt({reference:g,element:w,strategy:"absolute",placement:n}),S=at(Object.assign({},w,T)),A=x===je?S:g,P={top:h.top-A.top+b.top,bottom:A.bottom-h.bottom+b.bottom,left:h.left-A.left+b.left,right:A.right-h.right+b.right},E=t.modifiersData.offset;if(x===je&&E){var B=E[n];Object.keys(P).forEach(function($){var V=[U,I].indexOf($)>=0?1:-1,z=[k,I].indexOf($)>=0?"y":"x";P[$]+=B[z]*V})}return P}function Yr(t,e){e===void 0&&(e={});var r=e,o=r.placement,n=r.boundary,i=r.rootBoundary,l=r.padding,a=r.flipVariations,s=r.allowedAutoPlacements,c=s===void 0?Ft:s,p=Te(o),m=p?a?xt:xt.filter(function(O){return Te(O)===p}):Fe,x=m.filter(function(O){return c.indexOf(O)>=0});x.length===0&&(x=m);var f=x.reduce(function(O,d){return O[d]=Ne(t,{placement:d,boundary:n,rootBoundary:i,padding:l})[ee(d)],O},{});return Object.keys(f).sort(function(O,d){return f[O]-f[d]})}function Gr(t){if(ee(t)===pt)return[];var e=Je(t);return[Rt(t),e,Rt(e)]}function Kr(t){var e=t.state,r=t.options,o=t.name;if(!e.modifiersData[o]._skip){for(var n=r.mainAxis,i=n===void 0?!0:n,l=r.altAxis,a=l===void 0?!0:l,s=r.fallbackPlacements,c=r.padding,p=r.boundary,m=r.rootBoundary,x=r.altBoundary,f=r.flipVariations,O=f===void 0?!0:f,d=r.allowedAutoPlacements,v=e.options.placement,b=ee(v),R=b===v,w=s||(R||!O?[Je(v)]:Gr(v)),u=[v].concat(w).reduce(function(X,N){return X.concat(ee(N)===pt?Yr(e,{placement:N,boundary:p,rootBoundary:m,padding:c,flipVariations:O,allowedAutoPlacements:d}):N)},[]),h=e.rects.reference,g=e.rects.popper,T=new Map,S=!0,A=u[0],P=0;P<u.length;P++){var E=u[P],B=ee(E),$=Te(E)===Oe,V=[k,I].indexOf(B)>=0,z=V?"width":"height",D=Ne(e,{placement:E,boundary:p,rootBoundary:m,altBoundary:x,padding:c}),M=V?$?U:L:$?I:k;h[z]>g[z]&&(M=Je(M));var q=Je(M),re=[];if(i&&re.push(D[B]<=0),a&&re.push(D[M]<=0,D[q]<=0),re.every(function(X){return X})){A=E,S=!1;break}T.set(E,re)}if(S)for(var Q=O?3:1,ve=function(N){var ae=u.find(function(ie){var F=T.get(ie);if(F)return F.slice(0,N).every(function(he){return he})});if(ae)return A=ae,"break"},oe=Q;oe>0;oe--){var me=ve(oe);if(me==="break")break}e.placement!==A&&(e.modifiersData[o]._skip=!0,e.placement=A,e.reset=!0)}}const Jr={name:"flip",enabled:!0,phase:"main",fn:Kr,requiresIfExists:["offset"],data:{_skip:!1}};function Et(t,e,r){return r===void 0&&(r={x:0,y:0}),{top:t.top-e.height-r.y,right:t.right-e.width+r.x,bottom:t.bottom-e.height+r.y,left:t.left-e.width-r.x}}function At(t){return[k,U,I,L].some(function(e){return t[e]>=0})}function Qr(t){var e=t.state,r=t.name,o=e.rects.reference,n=e.rects.popper,i=e.modifiersData.preventOverflow,l=Ne(e,{elementContext:"reference"}),a=Ne(e,{altBoundary:!0}),s=Et(l,o),c=Et(a,n,i),p=At(s),m=At(c);e.modifiersData[r]={referenceClippingOffsets:s,popperEscapeOffsets:c,isReferenceHidden:p,hasPopperEscaped:m},e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-reference-hidden":p,"data-popper-escaped":m})}const Zr={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:Qr};function _r(t,e,r){var o=ee(t),n=[L,k].indexOf(o)>=0?-1:1,i=typeof r=="function"?r(Object.assign({},e,{placement:t})):r,l=i[0],a=i[1];return l=l||0,a=(a||0)*n,[L,U].indexOf(o)>=0?{x:a,y:l}:{x:l,y:a}}function eo(t){var e=t.state,r=t.options,o=t.name,n=r.offset,i=n===void 0?[0,0]:n,l=Ft.reduce(function(p,m){return p[m]=_r(m,e.rects,i),p},{}),a=l[e.placement],s=a.x,c=a.y;e.modifiersData.popperOffsets!=null&&(e.modifiersData.popperOffsets.x+=s,e.modifiersData.popperOffsets.y+=c),e.modifiersData[o]=l}const to={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:eo};function ro(t){var e=t.state,r=t.name;e.modifiersData[r]=Xt({reference:e.rects.reference,element:e.rects.popper,strategy:"absolute",placement:e.placement})}const oo={name:"popperOffsets",enabled:!0,phase:"read",fn:ro,data:{}};function no(t){return t==="x"?"y":"x"}function ao(t){var e=t.state,r=t.options,o=t.name,n=r.mainAxis,i=n===void 0?!0:n,l=r.altAxis,a=l===void 0?!1:l,s=r.boundary,c=r.rootBoundary,p=r.altBoundary,m=r.padding,x=r.tether,f=x===void 0?!0:x,O=r.tetherOffset,d=O===void 0?0:O,v=Ne(e,{boundary:s,rootBoundary:c,padding:m,altBoundary:p}),b=ee(e.placement),R=Te(e.placement),w=!R,u=ft(b),h=no(u),g=e.modifiersData.popperOffsets,T=e.rects.reference,S=e.rects.popper,A=typeof d=="function"?d(Object.assign({},e.rects,{placement:e.placement})):d,P=typeof A=="number"?{mainAxis:A,altAxis:A}:Object.assign({mainAxis:0,altAxis:0},A),E=e.modifiersData.offset?e.modifiersData.offset[e.placement]:null,B={x:0,y:0};if(g){if(i){var $,V=u==="y"?k:L,z=u==="y"?I:U,D=u==="y"?"height":"width",M=g[u],q=M+v[V],re=M-v[z],Q=f?-S[D]/2:0,ve=R===Oe?T[D]:S[D],oe=R===Oe?-S[D]:-T[D],me=e.elements.arrow,X=f&&me?ct(me):{width:0,height:0},N=e.modifiersData["arrow#persistent"]?e.modifiersData["arrow#persistent"].padding:Ut(),ae=N[V],ie=N[z],F=ke(0,T[D],X[D]),he=w?T[D]/2-Q-F-ae-P.mainAxis:ve-F-ae-P.mainAxis,et=w?-T[D]/2+Q+F+ie+P.mainAxis:oe+F+ie+P.mainAxis,ge=e.elements.arrow&&He(e.elements.arrow),Y=ge?u==="y"?ge.clientTop||0:ge.clientLeft||0:0,ye=($=E==null?void 0:E[u])!=null?$:0,pe=M+he-ye-Y,be=M+et-ye,Ee=ke(f?Qe(q,pe):q,M,f?ue(re,be):re);g[u]=Ee,B[u]=Ee-M}if(a){var le,we=u==="x"?k:L,Ae=u==="x"?I:U,Z=g[h],ce=h==="y"?"height":"width",$e=Z+v[we],Ce=Z-v[Ae],Se=[k,L].indexOf(b)!==-1,Ie=(le=E==null?void 0:E[h])!=null?le:0,Ue=Se?$e:Z-T[ce]-S[ce]-Ie+P.altAxis,xe=Se?Z+T[ce]+S[ce]-Ie-P.altAxis:Ce,Ve=f&&Se?Cr(Ue,Z,xe):ke(f?Ue:$e,Z,f?xe:Ce);g[h]=Ve,B[h]=Ve-Z}e.modifiersData[o]=B}}const io={name:"preventOverflow",enabled:!0,phase:"main",fn:ao,requiresIfExists:["offset"]};function so(t){return{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}}function po(t){return t===W(t)||!H(t)?ut(t):so(t)}function lo(t){var e=t.getBoundingClientRect(),r=Pe(e.width)/t.offsetWidth||1,o=Pe(e.height)/t.offsetHeight||1;return r!==1||o!==1}function co(t,e,r){r===void 0&&(r=!1);var o=H(e),n=H(e)&&lo(e),i=se(e),l=Re(t,n,r),a={scrollLeft:0,scrollTop:0},s={x:0,y:0};return(o||!o&&!r)&&((te(e)!=="body"||vt(i))&&(a=po(e)),H(e)?(s=Re(e,!0),s.x+=e.clientLeft,s.y+=e.clientTop):i&&(s.x=dt(i))),{x:l.left+a.scrollLeft-s.x,y:l.top+a.scrollTop-s.y,width:l.width,height:l.height}}function fo(t){var e=new Map,r=new Set,o=[];t.forEach(function(i){e.set(i.name,i)});function n(i){r.add(i.name);var l=[].concat(i.requires||[],i.requiresIfExists||[]);l.forEach(function(a){if(!r.has(a)){var s=e.get(a);s&&n(s)}}),o.push(i)}return t.forEach(function(i){r.has(i.name)||n(i)}),o}function uo(t){var e=fo(t);return Pr.reduce(function(r,o){return r.concat(e.filter(function(n){return n.phase===o}))},[])}function vo(t){var e;return function(){return e||(e=new Promise(function(r){Promise.resolve().then(function(){e=void 0,r(t())})})),e}}function mo(t){var e=t.reduce(function(r,o){var n=r[o.name];return r[o.name]=n?Object.assign({},n,o,{options:Object.assign({},n.options,o.options),data:Object.assign({},n.data,o.data)}):o,r},{});return Object.keys(e).map(function(r){return e[r]})}var $t={placement:"bottom",modifiers:[],strategy:"absolute"};function Ct(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return!e.some(function(o){return!(o&&typeof o.getBoundingClientRect=="function")})}function ho(t){t===void 0&&(t={});var e=t,r=e.defaultModifiers,o=r===void 0?[]:r,n=e.defaultOptions,i=n===void 0?$t:n;return function(a,s,c){c===void 0&&(c=i);var p={placement:"bottom",orderedModifiers:[],options:Object.assign({},$t,i),modifiersData:{},elements:{reference:a,popper:s},attributes:{},styles:{}},m=[],x=!1,f={state:p,setOptions:function(b){var R=typeof b=="function"?b(p.options):b;d(),p.options=Object.assign({},i,p.options,R),p.scrollParents={reference:de(a)?Le(a):a.contextElement?Le(a.contextElement):[],popper:Le(s)};var w=uo(mo([].concat(o,p.options.modifiers)));return p.orderedModifiers=w.filter(function(u){return u.enabled}),O(),f.update()},forceUpdate:function(){if(!x){var b=p.elements,R=b.reference,w=b.popper;if(Ct(R,w)){p.rects={reference:co(R,He(w),p.options.strategy==="fixed"),popper:ct(w)},p.reset=!1,p.placement=p.options.placement,p.orderedModifiers.forEach(function(P){return p.modifiersData[P.name]=Object.assign({},P.data)});for(var u=0;u<p.orderedModifiers.length;u++){if(p.reset===!0){p.reset=!1,u=-1;continue}var h=p.orderedModifiers[u],g=h.fn,T=h.options,S=T===void 0?{}:T,A=h.name;typeof g=="function"&&(p=g({state:p,options:S,name:A,instance:f})||p)}}}},update:vo(function(){return new Promise(function(v){f.forceUpdate(),v(p)})}),destroy:function(){d(),x=!0}};if(!Ct(a,s))return f;f.setOptions(c).then(function(v){!x&&c.onFirstUpdate&&c.onFirstUpdate(v)});function O(){p.orderedModifiers.forEach(function(v){var b=v.name,R=v.options,w=R===void 0?{}:R,u=v.effect;if(typeof u=="function"){var h=u({state:p,name:b,instance:f,options:w}),g=function(){};m.push(h||g)}})}function d(){m.forEach(function(v){return v()}),m=[]}return f}}var go=[Fr,oo,Wr,Er,to,Jr,io,jr,Zr],yo=ho({defaultModifiers:go});function bo(t){return Dt("MuiPopper",t)}Mt("MuiPopper",["root"]);function wo(t,e){if(e==="ltr")return t;switch(t){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return t}}function it(t){return typeof t=="function"?t():t}function xo(t){return t.nodeType!==void 0}const Oo=t=>{const{classes:e}=t;return jt({root:["root"]},bo,e)},Po={},Ro=C.forwardRef(function(e,r){const{anchorEl:o,children:n,direction:i,disablePortal:l,modifiers:a,open:s,placement:c,popperOptions:p,popperRef:m,slotProps:x={},slots:f={},TransitionProps:O,ownerState:d,...v}=e,b=C.useRef(null),R=ot(b,r),w=C.useRef(null),u=ot(w,m),h=C.useRef(u);yt(()=>{h.current=u},[u]),C.useImperativeHandle(m,()=>w.current,[]);const g=wo(c,i),[T,S]=C.useState(g),[A,P]=C.useState(it(o));C.useEffect(()=>{w.current&&w.current.forceUpdate()}),C.useEffect(()=>{o&&P(it(o))},[o]),yt(()=>{if(!A||!s)return;const z=q=>{S(q.placement)};let D=[{name:"preventOverflow",options:{altBoundary:l}},{name:"flip",options:{altBoundary:l}},{name:"onUpdate",enabled:!0,phase:"afterWrite",fn:({state:q})=>{z(q)}}];a!=null&&(D=D.concat(a)),p&&p.modifiers!=null&&(D=D.concat(p.modifiers));const M=yo(A,b.current,{placement:g,...p,modifiers:D});return h.current(M),()=>{M.destroy(),h.current(null)}},[A,l,a,s,p,g]);const E={placement:T};O!==null&&(E.TransitionProps=O);const B=Oo(e),$=f.root??"div",V=nr({elementType:$,externalSlotProps:x.root,externalForwardedProps:v,additionalProps:{role:"tooltip",ref:R},ownerState:e,className:B.root});return _.jsx($,{...V,children:typeof n=="function"?n(E):n})}),To=C.forwardRef(function(e,r){const{anchorEl:o,children:n,container:i,direction:l="ltr",disablePortal:a=!1,keepMounted:s=!1,modifiers:c,open:p,placement:m="bottom",popperOptions:x=Po,popperRef:f,style:O,transition:d=!1,slotProps:v={},slots:b={},...R}=e,[w,u]=C.useState(!0),h=()=>{u(!1)},g=()=>{u(!0)};if(!s&&!p&&(!d||w))return null;let T;if(i)T=i;else if(o){const P=it(o);T=P&&xo(P)?gt(P).body:gt(null).body}const S=!p&&s&&(!d||w)?"none":void 0,A=d?{in:p,onEnter:h,onExited:g}:void 0;return _.jsx(pr,{disablePortal:a,container:T,children:_.jsx(Ro,{anchorEl:o,direction:l,disablePortal:a,modifiers:c,ref:r,open:d?!w:p,placement:m,popperOptions:x,popperRef:f,slotProps:v,slots:b,...R,style:{position:"fixed",top:0,left:0,display:S,...O},TransitionProps:A,children:n})})}),Eo=Ze(To,{name:"MuiPopper",slot:"Root",overridesResolver:(t,e)=>e.root})({}),Yt=C.forwardRef(function(e,r){const o=Wt(),n=Bt({props:e,name:"MuiPopper"}),{anchorEl:i,component:l,components:a,componentsProps:s,container:c,disablePortal:p,keepMounted:m,modifiers:x,open:f,placement:O,popperOptions:d,popperRef:v,transition:b,slots:R,slotProps:w,...u}=n,h=(R==null?void 0:R.root)??(a==null?void 0:a.Root),g={anchorEl:i,container:c,disablePortal:p,keepMounted:m,modifiers:x,open:f,placement:O,popperOptions:d,popperRef:v,transition:b,...u};return _.jsx(Eo,{as:l,direction:o?"rtl":"ltr",slots:{root:h},slotProps:w??s,...g,ref:r})});function Ao(t){return Dt("MuiTooltip",t)}const j=Mt("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]);function $o(t){return Math.round(t*1e5)/1e5}const Co=t=>{const{classes:e,disableInteractive:r,arrow:o,touch:n,placement:i}=t,l={popper:["popper",!r&&"popperInteractive",o&&"popperArrow"],tooltip:["tooltip",o&&"tooltipArrow",n&&"touch",`tooltipPlacement${kt(i.split("-")[0])}`],arrow:["arrow"]};return jt(l,Ao,e)},So=Ze(Yt,{name:"MuiTooltip",slot:"Popper",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[e.popper,!r.disableInteractive&&e.popperInteractive,r.arrow&&e.popperArrow,!r.open&&e.popperClose]}})(st(({theme:t})=>({zIndex:(t.vars||t).zIndex.tooltip,pointerEvents:"none",variants:[{props:({ownerState:e})=>!e.disableInteractive,style:{pointerEvents:"auto"}},{props:({open:e})=>!e,style:{pointerEvents:"none"}},{props:({ownerState:e})=>e.arrow,style:{[`&[data-popper-placement*="bottom"] .${j.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${j.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${j.arrow}`]:{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}},[`&[data-popper-placement*="left"] .${j.arrow}`]:{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}}}},{props:({ownerState:e})=>e.arrow&&!e.isRtl,style:{[`&[data-popper-placement*="right"] .${j.arrow}`]:{left:0,marginLeft:"-0.71em"}}},{props:({ownerState:e})=>e.arrow&&!!e.isRtl,style:{[`&[data-popper-placement*="right"] .${j.arrow}`]:{right:0,marginRight:"-0.71em"}}},{props:({ownerState:e})=>e.arrow&&!e.isRtl,style:{[`&[data-popper-placement*="left"] .${j.arrow}`]:{right:0,marginRight:"-0.71em"}}},{props:({ownerState:e})=>e.arrow&&!!e.isRtl,style:{[`&[data-popper-placement*="left"] .${j.arrow}`]:{left:0,marginLeft:"-0.71em"}}}]}))),Mo=Ze("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(t,e)=>{const{ownerState:r}=t;return[e.tooltip,r.touch&&e.touch,r.arrow&&e.tooltipArrow,e[`tooltipPlacement${kt(r.placement.split("-")[0])}`]]}})(st(({theme:t})=>({backgroundColor:t.vars?t.vars.palette.Tooltip.bg:Lt(t.palette.grey[700],.92),borderRadius:(t.vars||t).shape.borderRadius,color:(t.vars||t).palette.common.white,fontFamily:t.typography.fontFamily,padding:"4px 8px",fontSize:t.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:t.typography.fontWeightMedium,[`.${j.popper}[data-popper-placement*="left"] &`]:{transformOrigin:"right center"},[`.${j.popper}[data-popper-placement*="right"] &`]:{transformOrigin:"left center"},[`.${j.popper}[data-popper-placement*="top"] &`]:{transformOrigin:"center bottom",marginBottom:"14px"},[`.${j.popper}[data-popper-placement*="bottom"] &`]:{transformOrigin:"center top",marginTop:"14px"},variants:[{props:({ownerState:e})=>e.arrow,style:{position:"relative",margin:0}},{props:({ownerState:e})=>e.touch,style:{padding:"8px 16px",fontSize:t.typography.pxToRem(14),lineHeight:`${$o(16/14)}em`,fontWeight:t.typography.fontWeightRegular}},{props:({ownerState:e})=>!e.isRtl,style:{[`.${j.popper}[data-popper-placement*="left"] &`]:{marginRight:"14px"},[`.${j.popper}[data-popper-placement*="right"] &`]:{marginLeft:"14px"}}},{props:({ownerState:e})=>!e.isRtl&&e.touch,style:{[`.${j.popper}[data-popper-placement*="left"] &`]:{marginRight:"24px"},[`.${j.popper}[data-popper-placement*="right"] &`]:{marginLeft:"24px"}}},{props:({ownerState:e})=>!!e.isRtl,style:{[`.${j.popper}[data-popper-placement*="left"] &`]:{marginLeft:"14px"},[`.${j.popper}[data-popper-placement*="right"] &`]:{marginRight:"14px"}}},{props:({ownerState:e})=>!!e.isRtl&&e.touch,style:{[`.${j.popper}[data-popper-placement*="left"] &`]:{marginLeft:"24px"},[`.${j.popper}[data-popper-placement*="right"] &`]:{marginRight:"24px"}}},{props:({ownerState:e})=>e.touch,style:{[`.${j.popper}[data-popper-placement*="top"] &`]:{marginBottom:"24px"}}},{props:({ownerState:e})=>e.touch,style:{[`.${j.popper}[data-popper-placement*="bottom"] &`]:{marginTop:"24px"}}}]}))),Do=Ze("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(t,e)=>e.arrow})(st(({theme:t})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:t.vars?t.vars.palette.Tooltip.bg:Lt(t.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}})));let Ge=!1;const St=new cr;let Be={x:0,y:0};function Ke(t,e){return(r,...o)=>{e&&e(r,...o),t(r,...o)}}const Uo=C.forwardRef(function(e,r){const o=Bt({props:e,name:"MuiTooltip"}),{arrow:n=!1,children:i,classes:l,components:a={},componentsProps:s={},describeChild:c=!1,disableFocusListener:p=!1,disableHoverListener:m=!1,disableInteractive:x=!1,disableTouchListener:f=!1,enterDelay:O=100,enterNextDelay:d=0,enterTouchDelay:v=700,followCursor:b=!1,id:R,leaveDelay:w=0,leaveTouchDelay:u=1500,onClose:h,onOpen:g,open:T,placement:S="bottom",PopperComponent:A,PopperProps:P={},slotProps:E={},slots:B={},title:$,TransitionComponent:V,TransitionProps:z,...D}=o,M=C.isValidElement(i)?i:_.jsx("span",{children:i}),q=sr(),re=Wt(),[Q,ve]=C.useState(),[oe,me]=C.useState(null),X=C.useRef(!1),N=x||b,ae=Xe(),ie=Xe(),F=Xe(),he=Xe(),[et,ge]=ar({controlled:T,default:!1,name:"Tooltip",state:"open"});let Y=et;const ye=fr(R),pe=C.useRef(),be=bt(()=>{pe.current!==void 0&&(document.body.style.WebkitUserSelect=pe.current,pe.current=void 0),he.clear()});C.useEffect(()=>be,[be]);const Ee=y=>{St.clear(),Ge=!0,ge(!0),g&&!Y&&g(y)},le=bt(y=>{St.start(800+w,()=>{Ge=!1}),ge(!1),h&&Y&&h(y),ae.start(q.transitions.duration.shortest,()=>{X.current=!1})}),we=y=>{X.current&&y.type!=="touchstart"||(Q&&Q.removeAttribute("title"),ie.clear(),F.clear(),O||Ge&&d?ie.start(Ge?d:O,()=>{Ee(y)}):Ee(y))},Ae=y=>{ie.clear(),F.start(w,()=>{le(y)})},[,Z]=C.useState(!1),ce=y=>{wt(y.target)||(Z(!1),Ae(y))},$e=y=>{Q||ve(y.currentTarget),wt(y.target)&&(Z(!0),we(y))},Ce=y=>{X.current=!0;const J=M.props;J.onTouchStart&&J.onTouchStart(y)},Se=y=>{Ce(y),F.clear(),ae.clear(),be(),pe.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",he.start(v,()=>{document.body.style.WebkitUserSelect=pe.current,we(y)})},Ie=y=>{M.props.onTouchEnd&&M.props.onTouchEnd(y),be(),F.start(u,()=>{le(y)})};C.useEffect(()=>{if(!Y)return;function y(J){J.key==="Escape"&&le(J)}return document.addEventListener("keydown",y),()=>{document.removeEventListener("keydown",y)}},[le,Y]);const Ue=ot(lr(M),ve,r);!$&&$!==0&&(Y=!1);const xe=C.useRef(),Ve=y=>{const J=M.props;J.onMouseMove&&J.onMouseMove(y),Be={x:y.clientX,y:y.clientY},xe.current&&xe.current.update()},Me={},tt=typeof $=="string";c?(Me.title=!Y&&tt&&!m?$:null,Me["aria-describedby"]=Y?ye:null):(Me["aria-label"]=tt?$:null,Me["aria-labelledby"]=Y&&!tt?ye:null);const G={...Me,...D,...M.props,className:ht(D.className,M.props.className),onTouchStart:Ce,ref:Ue,...b?{onMouseMove:Ve}:{}},De={};f||(G.onTouchStart=Se,G.onTouchEnd=Ie),m||(G.onMouseOver=Ke(we,G.onMouseOver),G.onMouseLeave=Ke(Ae,G.onMouseLeave),N||(De.onMouseOver=we,De.onMouseLeave=Ae)),p||(G.onFocus=Ke($e,G.onFocus),G.onBlur=Ke(ce,G.onBlur),N||(De.onFocus=$e,De.onBlur=ce));const fe={...o,isRtl:re,arrow:n,disableInteractive:N,placement:S,PopperComponentProp:A,touch:X.current},K=typeof E.popper=="function"?E.popper(fe):E.popper,Gt=C.useMemo(()=>{var J,mt;let y=[{name:"arrow",enabled:!!oe,options:{element:oe,padding:4}}];return(J=P.popperOptions)!=null&&J.modifiers&&(y=y.concat(P.popperOptions.modifiers)),(mt=K==null?void 0:K.popperOptions)!=null&&mt.modifiers&&(y=y.concat(K.popperOptions.modifiers)),{...P.popperOptions,...K==null?void 0:K.popperOptions,modifiers:y}},[oe,P.popperOptions,K==null?void 0:K.popperOptions]),rt=Co(fe),Kt=typeof E.transition=="function"?E.transition(fe):E.transition,ze={slots:{popper:a.Popper,transition:a.Transition??V,tooltip:a.Tooltip,arrow:a.Arrow,...B},slotProps:{arrow:E.arrow??s.arrow,popper:{...P,...K??s.popper},tooltip:E.tooltip??s.tooltip,transition:{...z,...Kt??s.transition}}},[Jt,Qt]=qe("popper",{elementType:So,externalForwardedProps:ze,ownerState:fe,className:ht(rt.popper,P==null?void 0:P.className)}),[Zt,_t]=qe("transition",{elementType:ir,externalForwardedProps:ze,ownerState:fe}),[er,tr]=qe("tooltip",{elementType:Mo,className:rt.tooltip,externalForwardedProps:ze,ownerState:fe}),[rr,or]=qe("arrow",{elementType:Do,className:rt.arrow,externalForwardedProps:ze,ownerState:fe,ref:me});return _.jsxs(C.Fragment,{children:[C.cloneElement(M,G),_.jsx(Jt,{as:A??Yt,placement:S,anchorEl:b?{getBoundingClientRect:()=>({top:Be.y,left:Be.x,right:Be.x,bottom:Be.y,width:0,height:0})}:Q,popperRef:xe,open:Q?Y:!1,id:ye,transition:!0,...De,...Qt,popperOptions:Gt,children:({TransitionProps:y})=>_.jsx(Zt,{timeout:q.transitions.duration.shorter,...y,..._t,children:_.jsxs(er,{...tr,children:[$,n?_.jsx(rr,{...or}):null]})})})]})});export{Uo as T};
