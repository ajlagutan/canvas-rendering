(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const h of o.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&i(h)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();const K=class K{constructor(t=0,e=0,i=0,s=0){this.x=t,this.y=e,this.width=i,this.height=s}static get empty(){return this._empty}get bottom(){return this.y+this.height}get left(){return this.x}get right(){return this.x+this.width}get top(){return this.y}clone(){return new K(this.x,this.y,this.width,this.height)}contains(t,e){return this.x<=t&&t<=this.x+this.width&&this.y<=e&&e<=this.y+this.height}inflate(t,e){this.x-=t,this.y-=e,this.width+=t*2,this.height+=e*2}};K._empty=new K(0,0,0,0);let wt=K;class G{constructor(t=0,e=0){this.x=t,this.y=e}}class P{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}}class Vt{constructor(t=0,e=0,i=0,s=0){this.x=t,this.y=e,this.z=i,this.w=s}}class ut{constructor(...t){this._assets=new Map,this._assetsXhr=new Map,this._assetsCount=0,this._callback=()=>{},this._count=0,this._paths=[];for(let e of t){const i=new XMLHttpRequest;i.addEventListener("loadend",this.loadend.bind(this,e)),i.open("GET",e),this._assetsXhr.set(e,i),this._paths.push(e)}this._assetsCount=t.length,this._state="ready"}get paths(){return this._paths}get state(){return this._state}static create(...t){return new ut(...t)}get(t){return this._assets.has(t)&&this._assets.get(t)||null}load(t){for(let[,e]of this._assetsXhr)try{e.send()}catch(i){console.error(i)}this._callback=t||this._callback,this._state="loading"}loadend(t,e){const i=e.currentTarget;i.status===200&&(this._assets.set(t,i.responseText),this._count++),this._count===this._assetsCount&&(this._state="done",this._callback.call(this,this._state))}}const B=class B{static get currentState(){return this._currentState}static get date(){return this._date}static get keyMapper(){return this._keyMapper}static initialize(){try{this.hookEvents()}catch{throw new Error("Input initialization failed.")}}static update(){this._latestButton&&this._currentState[this._latestButton]?this._pressedTime++:this._latestButton=null;for(let t in this._currentState)this._currentState[t]&&!this._previousState[t]&&(this._latestButton=t,this._pressedTime=0,this._date=Date.now()),this._previousState[t]=this._currentState[t]}static clear(){this._currentState={},this._previousState={},this._latestButton=null,this._pressedTime=0,this._date=0}static hookEvents(){document.addEventListener("keydown",this.eventKeyDown.bind(this)),document.addEventListener("keyup",this.eventKeyUp.bind(this)),window.addEventListener("blur",this.eventBlur.bind(this))}static eventKeyDown(t){this.shouldPreventDefault(t.code)&&t.preventDefault();const e=this.keyMapper[t.code];e&&(this._currentState[e]=!0)}static eventKeyUp(t){const e=this.keyMapper[t.code];e&&(this._currentState[e]=!1)}static eventBlur(t){this.clear()}static shouldPreventDefault(t){return!1}};B._currentState={},B._date=0,B._keyMapper={KeyA:"left",KeyD:"right",KeyS:"down",KeyW:"up"},B._latestButton=null,B._pressedTime=0,B._previousState={};let xt=B;const nt=class nt{static get x(){return this._x}static get y(){return this._y}static initialize(){this.hookWindowEvents()}static hookWindowEvents(){document.addEventListener("mousemove",this.windowMouseMoveEvent.bind(this)),document.addEventListener("mouseleave",this.windowMouseLeaveEvent.bind(this))}static windowMouseLeaveEvent(t){this._x=void 0,this._y=void 0}static windowMouseMoveEvent(t){this._x=t.x,this._y=t.y}};nt._x=void 0,nt._y=void 0;let J=nt;class Ot{constructor(){this._height=0,this._running=!0,this._width=0}get height(){return this._height}get running(){return this._running}get width(){return this._width}controller(t){}initialize(){}pause(){this._running&&(this._running=!this._running)}play(){this._running||(this._running=!this._running)}render(t){}resize(t,e){this._width=t,this._height=e}update(t){}}/*!
 * FPSMeter 0.3.1 - 9th May 2013
 * https://github.com/Darsain/fpsmeter
 *
 * Licensed under the MIT license.
 * http://opensource.org/licenses/MIT
 */(function(r,t){function e(n){return document.createElement(n)}function i(n,l){for(var a in l)try{n.style[a]=l[a]}catch{}return n}function s(n){return n==null?String(n):typeof n=="object"||typeof n=="function"?Object.prototype.toString.call(n).match(/\s([a-z]+)/i)[1].toLowerCase()||"object":typeof n}function o(n,l){if(s(l)!=="array")return-1;if(l.indexOf)return l.indexOf(n);for(var a=0,d=l.length;a<d;a++)if(l[a]===n)return a;return-1}function h(){var n=arguments;for(var l in n[1])if(n[1].hasOwnProperty(l))switch(s(n[1][l])){case"object":n[0][l]=h({},n[0][l],n[1][l]);break;case"array":n[0][l]=n[1][l].slice(0);break;default:n[0][l]=n[1][l]}return n.length>2?h.apply(null,[n[0]].concat(Array.prototype.slice.call(n,2))):n[0]}function g(n,l,a){var d,u,x,c,E,I,$,W,D;return a<=.5?c=a*(1+l):c=a+l-a*l,c===0?"#000":(E=2*a-c,I=(c-E)/c,n=6*n,$=Math.floor(n),W=n-$,D=c*I*W,$===0||$===6?(d=c,u=E+D,x=E):$===1?(d=c-D,u=c,x=E):$===2?(d=E,u=c,x=E+D):$===3?(d=E,u=c-D,x=c):$===4?(d=E+D,u=E,x=c):(d=c,u=E,x=c-D),"#"+m(d)+m(u)+m(x))}function m(n){return n=Math.round(n*255).toString(16),n.length===1?"0"+n:n}function v(n,l,a,d){n.addEventListener?n[d?"removeEventListener":"addEventListener"](l,a,!1):n.attachEvent&&n[d?"detachEvent":"attachEvent"]("on"+l,a)}var y;(function(){var n=r.performance;if(n&&(n.now||n.webkitNow)){var l=n.now?"now":"webkitNow";y=n[l].bind(n)}else y=function(){return+new Date}})();var _=r.cancelAnimationFrame||r.cancelRequestAnimationFrame,C=r.requestAnimationFrame;(function(){for(var n=["moz","webkit","o"],l=0,a=0,d=n.length;a<d&&!_;++a)_=r[n[a]+"CancelAnimationFrame"]||r[n[a]+"CancelRequestAnimationFrame"],C=_&&r[n[a]+"RequestAnimationFrame"];_||(C=function(u){var x=y(),c=Math.max(0,16-(x-l));return l=x+c,r.setTimeout(function(){u(x+c)},c)},_=function(u){clearTimeout(u)})})();var F=s(document.createElement("div").textContent)==="string"?"textContent":"innerText";function S(n,l){s(n)==="object"&&n.nodeType===t&&(l=n,n=document.body),n||(n=document.body);var a=this,d=h({},S.defaults,l||{}),u={},x=[],c,E,I=100,$=[],W=0,D=d.threshold,rt=0,Z=y()-D,R,X=[],N=[],H,at,V=d.show==="fps",ot,Q,f,z;a.options=d,a.fps=0,a.duration=0,a.isPaused=0,a.tickStart=function(){rt=y()},a.tick=function(){R=y(),W=R-Z,D+=(W-D)/d.smoothing,a.fps=1e3/D,a.duration=rt<Z?D:R-rt,Z=R},a.pause=function(){return H&&(a.isPaused=1,clearTimeout(H),_(H),_(at),H=at=0),a},a.resume=function(){return H||(a.isPaused=0,et()),a},a.set=function(k,lt){return d[k]=lt,V=d.show==="fps",o(k,L)!==-1&&bt(),o(k,O)!==-1&&vt(),a},a.showDuration=function(){return a.set("show","ms"),a},a.showFps=function(){return a.set("show","fps"),a},a.toggle=function(){return a.set("show",V?"ms":"fps"),a},a.hide=function(){return a.pause(),u.container.style.display="none",a},a.show=function(){return a.resume(),u.container.style.display="block",a};function Dt(){for(f=d.history;f--;)X[f]=f===0?a.fps:X[f-1],N[f]=f===0?a.duration:N[f-1]}function tt(k,lt,yt,Mt){return E[0|k][Math.round(Math.min((lt-yt)/(Mt-yt)*I,I))]}function gt(){u.legend.fps!==V&&(u.legend.fps=V,u.legend[F]=V?"FPS":"ms"),Q=V?a.fps:a.duration,u.count[F]=Q>999?"999+":Q.toFixed(Q>99?0:d.decimals)}function ft(){if(R=y(),Z<R-d.threshold&&(a.fps-=a.fps/Math.max(1,d.smoothing*60/d.interval),a.duration=1e3/a.fps),Dt(),gt(),d.heat){if($.length)for(f=$.length;f--;)$[f].el.style[c[$[f].name].heatOn]=V?tt(c[$[f].name].heatmap,a.fps,0,d.maxFps):tt(c[$[f].name].heatmap,a.duration,d.threshold,0);if(u.graph&&c.column.heatOn)for(f=x.length;f--;)x[f].style[c.column.heatOn]=V?tt(c.column.heatmap,X[f],0,d.maxFps):tt(c.column.heatmap,N[f],d.threshold,0)}if(u.graph)for(z=0;z<d.history;z++)x[z].style.height=(V?X[z]?Math.round(ot/d.maxFps*Math.min(X[z],d.maxFps)):0:N[z]?Math.round(ot/d.threshold*Math.min(N[z],d.threshold)):0)+"px"}function et(){d.interval<20?(H=C(et),ft()):(H=setTimeout(et,d.interval),at=C(ft))}function mt(k){k=k||window.event,k.preventDefault?(k.preventDefault(),k.stopPropagation()):(k.returnValue=!1,k.cancelBubble=!0),a.toggle()}a.destroy=function(){a.pause(),_t(),a.tick=a.tickStart=function(){}};function _t(){d.toggleOn&&v(u.container,d.toggleOn,mt,1),n.removeChild(u.container)}function Lt(){if(c=S.theme[d.theme],E=c.compiledHeatmaps||[],!E.length&&c.heatmaps.length){for(z=0;z<c.heatmaps.length;z++)for(E[z]=[],f=0;f<=I;f++)E[z][f]=g(.33/I*f,c.heatmaps[z].saturation,c.heatmaps[z].lightness);c.compiledHeatmaps=E}}function bt(){u.container&&_t(),Lt(),u.container=i(e("div"),c.container),u.count=u.container.appendChild(i(e("div"),c.count)),u.legend=u.container.appendChild(i(e("div"),c.legend)),u.graph=d.graph?u.container.appendChild(i(e("div"),c.graph)):0,$.length=0;for(var k in u)u[k]&&c[k].heatOn&&$.push({name:k,el:u[k]});if(x.length=0,u.graph)for(u.graph.style.width=d.history*c.column.width+(d.history-1)*c.column.spacing+"px",f=0;f<d.history;f++)x[f]=u.graph.appendChild(i(e("div"),c.column)),x[f].style.position="absolute",x[f].style.bottom=0,x[f].style.right=f*c.column.width+f*c.column.spacing+"px",x[f].style.width=c.column.width+"px",x[f].style.height="0px";vt(),gt(),n.appendChild(u.container),u.graph&&(ot=u.graph.clientHeight),d.toggleOn&&(d.toggleOn==="click"&&(u.container.style.cursor="pointer"),v(u.container,d.toggleOn,mt))}function vt(){i(u.container,d)}(function(){bt(),et()})()}S.extend=h,window.FPSMeter=S,S.defaults={interval:100,smoothing:10,show:"fps",toggleOn:"click",decimals:1,maxFps:60,threshold:100,position:"absolute",zIndex:10,left:"5px",top:"5px",right:"auto",bottom:"auto",margin:"0 0 0 0",theme:"dark",heat:0,graph:0,history:20};var L=["toggleOn","theme","heat","graph","history"],O=["position","zIndex","left","top","right","bottom","margin"]})(window);(function(r,t,e){t.theme={};var i=t.theme.base={heatmaps:[],container:{heatOn:null,heatmap:null,padding:"5px",minWidth:"95px",height:"30px",lineHeight:"30px",textAlign:"right",textShadow:"none"},count:{heatOn:null,heatmap:null,position:"absolute",top:0,right:0,padding:"5px 10px",height:"30px",fontSize:"24px",fontFamily:"Consolas, Andale Mono, monospace",zIndex:2},legend:{heatOn:null,heatmap:null,position:"absolute",top:0,left:0,padding:"5px 10px",height:"30px",fontSize:"12px",lineHeight:"32px",fontFamily:"sans-serif",textAlign:"left",zIndex:2},graph:{heatOn:null,heatmap:null,position:"relative",boxSizing:"padding-box",MozBoxSizing:"padding-box",height:"100%",zIndex:1},column:{width:4,spacing:1,heatOn:null,heatmap:null}};t.theme.dark=t.extend({},i,{heatmaps:[{saturation:.8,lightness:.8}],container:{background:"#222",color:"#fff",border:"1px solid #1a1a1a",textShadow:"1px 1px 0 #222"},count:{heatOn:"color"},column:{background:"#3f3f3f"}}),t.theme.light=t.extend({},i,{heatmaps:[{saturation:.5,lightness:.5}],container:{color:"#666",background:"#fff",textShadow:"1px 1px 0 rgba(255,255,255,.5), -1px -1px 0 rgba(255,255,255,.5)",boxShadow:"0 0 0 1px rgba(0,0,0,.1)"},count:{heatOn:"color"},column:{background:"#eaeaea"}}),t.theme.colorful=t.extend({},i,{heatmaps:[{saturation:.5,lightness:.6}],container:{heatOn:"backgroundColor",background:"#888",color:"#fff",textShadow:"1px 1px 0 rgba(0,0,0,.2)",boxShadow:"0 0 0 1px rgba(0,0,0,.1)"},column:{background:"#777",backgroundColor:"rgba(0,0,0,.2)"}}),t.theme.transparent=t.extend({},i,{heatmaps:[{saturation:.8,lightness:.5}],container:{padding:0,color:"#fff",textShadow:"1px 1px 0 rgba(0,0,0,.5)"},count:{padding:"0 5px",height:"40px",lineHeight:"40px"},legend:{padding:"0 5px",height:"40px",lineHeight:"42px"},graph:{height:"40px"},column:{width:5,background:"#999",heatOn:"backgroundColor",opacity:.5}})})(window,FPSMeter);/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.20.0
 * @author George Michael Brower
 * @license MIT
 */class M{constructor(t,e,i,s,o="div"){this.parent=t,this.object=e,this.property=i,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(o),this.domElement.classList.add("controller"),this.domElement.classList.add(s),this.$name=document.createElement("div"),this.$name.classList.add("name"),M.nextNameID=M.nextNameID||0,this.$name.id=`lil-gui-name-${++M.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",h=>h.stopPropagation()),this.domElement.addEventListener("keyup",h=>h.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(i)}name(t){return this._name=t,this.$name.textContent=t,this}onChange(t){return this._onChange=t,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(t=!0){return this.disable(!t)}disable(t=!0){return t===this._disabled?this:(this._disabled=t,this.domElement.classList.toggle("disabled",t),this.$disable.toggleAttribute("disabled",t),this)}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(t){const e=this.parent.add(this.object,this.property,t);return e.name(this._name),this.destroy(),e}min(t){return this}max(t){return this}step(t){return this}decimals(t){return this}listen(t=!0){return this._listening=t,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const t=this.save();t!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=t}getValue(){return this.object[this.property]}setValue(t){return this.getValue()!==t&&(this.object[this.property]=t,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(t){return this.setValue(t),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class Pt extends M{constructor(t,e,i){super(t,e,i,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function dt(r){let t,e;return(t=r.match(/(#|0x)?([a-f0-9]{6})/i))?e=t[2]:(t=r.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?e=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=r.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(e=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),e?"#"+e:!1}const Bt={isPrimitive:!0,match:r=>typeof r=="string",fromHexString:dt,toHexString:dt},U={isPrimitive:!0,match:r=>typeof r=="number",fromHexString:r=>parseInt(r.substring(1),16),toHexString:r=>"#"+r.toString(16).padStart(6,0)},It={isPrimitive:!1,match:r=>Array.isArray(r),fromHexString(r,t,e=1){const i=U.fromHexString(r);t[0]=(i>>16&255)/255*e,t[1]=(i>>8&255)/255*e,t[2]=(i&255)/255*e},toHexString([r,t,e],i=1){i=255/i;const s=r*i<<16^t*i<<8^e*i<<0;return U.toHexString(s)}},Ht={isPrimitive:!1,match:r=>Object(r)===r,fromHexString(r,t,e=1){const i=U.fromHexString(r);t.r=(i>>16&255)/255*e,t.g=(i>>8&255)/255*e,t.b=(i&255)/255*e},toHexString({r,g:t,b:e},i=1){i=255/i;const s=r*i<<16^t*i<<8^e*i<<0;return U.toHexString(s)}},Tt=[Bt,U,It,Ht];function Rt(r){return Tt.find(t=>t.match(r))}class zt extends M{constructor(t,e,i,s){super(t,e,i,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Rt(this.initialValue),this._rgbScale=s,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const o=dt(this.$text.value);o&&this._setValueFromHexString(o)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(t){if(this._format.isPrimitive){const e=this._format.fromHexString(t);this.setValue(e)}else this._format.fromHexString(t,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(t){return this._setValueFromHexString(t),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class ht extends M{constructor(t,e,i){super(t,e,i,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",s=>{s.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class jt extends M{constructor(t,e,i,s,o,h){super(t,e,i,"number"),this._initInput(),this.min(s),this.max(o);const g=h!==void 0;this.step(g?h:this._getImplicitStep(),g),this.updateDisplay()}decimals(t){return this._decimals=t,this.updateDisplay(),this}min(t){return this._min=t,this._onUpdateMinMax(),this}max(t){return this._max=t,this._onUpdateMinMax(),this}step(t,e=!0){return this._step=t,this._stepExplicit=e,this}updateDisplay(){const t=this.getValue();if(this._hasSlider){let e=(t-this._min)/(this._max-this._min);e=Math.max(0,Math.min(e,1)),this.$fill.style.width=e*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?t:t.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const e=()=>{let l=parseFloat(this.$input.value);isNaN(l)||(this._stepExplicit&&(l=this._snap(l)),this.setValue(this._clamp(l)))},i=l=>{const a=parseFloat(this.$input.value);isNaN(a)||(this._snapClampSetValue(a+l),this.$input.value=this.getValue())},s=l=>{l.key==="Enter"&&this.$input.blur(),l.code==="ArrowUp"&&(l.preventDefault(),i(this._step*this._arrowKeyMultiplier(l))),l.code==="ArrowDown"&&(l.preventDefault(),i(this._step*this._arrowKeyMultiplier(l)*-1))},o=l=>{this._inputFocused&&(l.preventDefault(),i(this._step*this._normalizeMouseWheel(l)))};let h=!1,g,m,v,y,_;const C=5,F=l=>{g=l.clientX,m=v=l.clientY,h=!0,y=this.getValue(),_=0,window.addEventListener("mousemove",S),window.addEventListener("mouseup",L)},S=l=>{if(h){const a=l.clientX-g,d=l.clientY-m;Math.abs(d)>C?(l.preventDefault(),this.$input.blur(),h=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(a)>C&&L()}if(!h){const a=l.clientY-v;_-=a*this._step*this._arrowKeyMultiplier(l),y+_>this._max?_=this._max-y:y+_<this._min&&(_=this._min-y),this._snapClampSetValue(y+_)}v=l.clientY},L=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",S),window.removeEventListener("mouseup",L)},O=()=>{this._inputFocused=!0},n=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",e),this.$input.addEventListener("keydown",s),this.$input.addEventListener("wheel",o,{passive:!1}),this.$input.addEventListener("mousedown",F),this.$input.addEventListener("focus",O),this.$input.addEventListener("blur",n)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const t=(n,l,a,d,u)=>(n-l)/(a-l)*(u-d)+d,e=n=>{const l=this.$slider.getBoundingClientRect();let a=t(n,l.left,l.right,this._min,this._max);this._snapClampSetValue(a)},i=n=>{this._setDraggingStyle(!0),e(n.clientX),window.addEventListener("mousemove",s),window.addEventListener("mouseup",o)},s=n=>{e(n.clientX)},o=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",s),window.removeEventListener("mouseup",o)};let h=!1,g,m;const v=n=>{n.preventDefault(),this._setDraggingStyle(!0),e(n.touches[0].clientX),h=!1},y=n=>{n.touches.length>1||(this._hasScrollBar?(g=n.touches[0].clientX,m=n.touches[0].clientY,h=!0):v(n),window.addEventListener("touchmove",_,{passive:!1}),window.addEventListener("touchend",C))},_=n=>{if(h){const l=n.touches[0].clientX-g,a=n.touches[0].clientY-m;Math.abs(l)>Math.abs(a)?v(n):(window.removeEventListener("touchmove",_),window.removeEventListener("touchend",C))}else n.preventDefault(),e(n.touches[0].clientX)},C=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",_),window.removeEventListener("touchend",C)},F=this._callOnFinishChange.bind(this),S=400;let L;const O=n=>{if(Math.abs(n.deltaX)<Math.abs(n.deltaY)&&this._hasScrollBar)return;n.preventDefault();const a=this._normalizeMouseWheel(n)*this._step;this._snapClampSetValue(this.getValue()+a),this.$input.value=this.getValue(),clearTimeout(L),L=setTimeout(F,S)};this.$slider.addEventListener("mousedown",i),this.$slider.addEventListener("touchstart",y,{passive:!1}),this.$slider.addEventListener("wheel",O,{passive:!1})}_setDraggingStyle(t,e="horizontal"){this.$slider&&this.$slider.classList.toggle("active",t),document.body.classList.toggle("lil-gui-dragging",t),document.body.classList.toggle(`lil-gui-${e}`,t)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(t){let{deltaX:e,deltaY:i}=t;return Math.floor(t.deltaY)!==t.deltaY&&t.wheelDelta&&(e=0,i=-t.wheelDelta/120,i*=this._stepExplicit?1:10),e+-i}_arrowKeyMultiplier(t){let e=this._stepExplicit?1:10;return t.shiftKey?e*=10:t.altKey&&(e/=10),e}_snap(t){let e=0;return this._hasMin?e=this._min:this._hasMax&&(e=this._max),t-=e,t=Math.round(t/this._step)*this._step,t+=e,t=parseFloat(t.toPrecision(15)),t}_clamp(t){return t<this._min&&(t=this._min),t>this._max&&(t=this._max),t}_snapClampSetValue(t){this.setValue(this._clamp(this._snap(t)))}get _hasScrollBar(){const t=this.parent.root.$children;return t.scrollHeight>t.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Ft extends M{constructor(t,e,i,s){super(t,e,i,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(s)}options(t){return this._values=Array.isArray(t)?t:Object.values(t),this._names=Array.isArray(t)?t:Object.keys(t),this.$select.replaceChildren(),this._names.forEach(e=>{const i=document.createElement("option");i.textContent=e,this.$select.appendChild(i)}),this.updateDisplay(),this}updateDisplay(){const t=this.getValue(),e=this._values.indexOf(t);return this.$select.selectedIndex=e,this.$display.textContent=e===-1?t:this._names[e],this}}class Yt extends M{constructor(t,e,i){super(t,e,i,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",s=>{s.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var Gt=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles, .lil-gui.allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles, .lil-gui.force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  height: var(--title-height);
  font-weight: 600;
  padding: 0 var(--padding);
  width: 100%;
  text-align: left;
  background: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "▸";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  border: none;
}
.lil-gui .controller button {
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
}
@media (hover: hover) {
  .lil-gui .controller button:hover {
    background: var(--hover-color);
  }
  .lil-gui .controller button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui .controller button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;function Wt(r){const t=document.createElement("style");t.innerHTML=r;const e=document.querySelector("head link[rel=stylesheet], head style");e?document.head.insertBefore(t,e):document.head.appendChild(t)}let At=!1;class pt{constructor({parent:t,autoPlace:e=t===void 0,container:i,width:s,title:o="Controls",closeFolders:h=!1,injectStyles:g=!0,touchStyles:m=!0}={}){if(this.parent=t,this.root=t?t.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(o),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),m&&this.domElement.classList.add("allow-touch-styles"),!At&&g&&(Wt(Gt),At=!0),i?i.appendChild(this.domElement):e&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),s&&this.domElement.style.setProperty("--width",s+"px"),this._closeFolders=h}add(t,e,i,s,o){if(Object(i)===i)return new Ft(this,t,e,i);const h=t[e];switch(typeof h){case"number":return new jt(this,t,e,i,s,o);case"boolean":return new Pt(this,t,e);case"string":return new Yt(this,t,e);case"function":return new ht(this,t,e)}console.error(`gui.add failed
	property:`,e,`
	object:`,t,`
	value:`,h)}addColor(t,e,i=1){return new zt(this,t,e,i)}addFolder(t){const e=new pt({parent:this,title:t});return this.root._closeFolders&&e.close(),e}load(t,e=!0){return t.controllers&&this.controllers.forEach(i=>{i instanceof ht||i._name in t.controllers&&i.load(t.controllers[i._name])}),e&&t.folders&&this.folders.forEach(i=>{i._title in t.folders&&i.load(t.folders[i._title])}),this}save(t=!0){const e={controllers:{},folders:{}};return this.controllers.forEach(i=>{if(!(i instanceof ht)){if(i._name in e.controllers)throw new Error(`Cannot save GUI with duplicate property "${i._name}"`);e.controllers[i._name]=i.save()}}),t&&this.folders.forEach(i=>{if(i._title in e.folders)throw new Error(`Cannot save GUI with duplicate folder "${i._title}"`);e.folders[i._title]=i.save()}),e}open(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(t){this._closed!==t&&(this._closed=t,this._callOnOpenClose(this))}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const e=this.$children.clientHeight;this.$children.style.height=e+"px",this.domElement.classList.add("transition");const i=o=>{o.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",i))};this.$children.addEventListener("transitionend",i);const s=t?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!t),requestAnimationFrame(()=>{this.$children.style.height=s+"px"})}),this}title(t){return this._title=t,this.$title.textContent=t,this}reset(t=!0){return(t?this.controllersRecursive():this.controllers).forEach(i=>i.reset()),this}onChange(t){return this._onChange=t,this}_callOnChange(t){this.parent&&this.parent._callOnChange(t),this._onChange!==void 0&&this._onChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(t){this.parent&&this.parent._callOnFinishChange(t),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onOpenClose(t){return this._onOpenClose=t,this}_callOnOpenClose(t){this.parent&&this.parent._callOnOpenClose(t),this._onOpenClose!==void 0&&this._onOpenClose.call(this,t)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(t=>t.destroy())}controllersRecursive(){let t=Array.from(this.controllers);return this.folders.forEach(e=>{t=t.concat(e.controllersRecursive())}),t}foldersRecursive(){let t=Array.from(this.folders);return this.folders.forEach(e=>{t=t.concat(e.foldersRecursive())}),t}}function b(r,t,e){return Math.min(e,Math.max(t,r))}function Xt(r,t,e,i){let s=e-r,o=i-t;return Math.sqrt(s**2+o**2)}var Ct;(r=>{function t(i,s){return new G(i.x*Math.cos(s)-i.y*Math.sin(s),i.x*Math.sin(s)+i.y*Math.cos(s))}r.rotate=t;function e(i,s){const o=i.velocity.x-s.velocity.x,h=i.velocity.y-s.velocity.y,g=s.x-i.x,m=s.y-i.y;if(o*g+h*m>=0){const v=-Math.atan2(s.y-i.y,s.x-i.x),y=i.mass,_=s.mass,C=t(i.velocity,v),F=t(s.velocity,v),S={x:C.x*(y-_)/(y+_)+F.x*2*_/(y+_),y:C.y},L={x:F.x*(_-y)/(y+_)+C.x*2*y/(y+_),y:F.y},O=t(S,-v),n=t(L,-v);i.velocity.x=O.x,i.velocity.y=O.y,s.velocity.x=n.x,s.velocity.y=n.y}}r.resolveCollision=e})(Ct||(Ct={}));function Et(r,t){if(r>=t)throw new Error("Invalid range: min must be less than max");return Math.random()*(t-r)+r}function kt(r,t){if(r=Math.ceil(r),t=Math.floor(t),r>=t)throw new Error("Invalid range: min must be less than max");return Math.floor(Math.random()*(t-r))+r}function it(r,t){if(r=Math.ceil(r),t=Math.floor(t),r>=t)throw new Error("Invalid range: min must be less than max");if(r<=0&&t>=0&&t-r===1)throw new Error("Only possible result is zero, which is not allowed");let e;do e=Math.floor(Math.random()*(t-r))+r;while(e===0);return e}const A=class A extends Vt{constructor(t,e,i,s,o=1){super(e,i,s,o),this._mode="rgb",this._mode=t}static get black(){return this._black}static get transparent(){return this._transparent}static get white(){return this._white}static fromHsla(t,e,i,s=1){return t=b(t,0,360)/360,e=b(e,0,100)/100,i=b(i,0,100)/100,s=b(s,0,1)/1,new A("hsl",t,e,i,s)}static fromHsva(t,e,i,s=1){return t=b(t,0,360)/360,e=b(e,0,100)/100,i=b(i,0,100)/100,s=b(s,0,1)/1,new A("hsv",t,e,i,s)}static fromHtmlString(t){t=t.startsWith("#")?t.substring(1):t;let e=0,i=0,s=0,o=0;return t.length===3?(e=parseInt(t.substring(0,1).repeat(2),16),i=parseInt(t.substring(1,2).repeat(2),16),s=parseInt(t.substring(2,3).repeat(2),16),A.fromRgba(e,i,s,1)):6>t.length&&t.length>3?(e=parseInt(t.substring(0,1).repeat(2),16),i=parseInt(t.substring(1,2).repeat(2),16),s=parseInt(t.substring(2,3).repeat(2),16),o=parseInt(t.substring(3,4).repeat(2),16)/255,A.fromRgba(e,i,s,o)):t.length===6?(e=parseInt(t.substring(0,2),16),i=parseInt(t.substring(2,4),16),s=parseInt(t.substring(4,6),16),A.fromRgba(e,i,s,1)):A.transparent}static fromRgba(t,e,i,s=1){return t=b(t,0,255)/255,e=b(e,0,255)/255,i=b(i,0,255)/255,s=b(s,0,1)/1,new A("rgb",t,e,i,s)}static fromVector3(t){if(t.x<256)return A.fromRgba(t.x,t.y,t.z,1);if(t.x<360)return A.fromHsla(t.x,t.y,t.z,1);throw new Error("Invalid Vector3 object passed as an argument.")}static fromVector4(t){if(t.x<256)return A.fromRgba(t.x,t.y,t.z,t.w);if(t.x<360)return A.fromHsla(t.x,t.y,t.z,t.w);throw new Error("Invalid Vector4 object passed as an argument.")}static is(t,e){return t._mode!==e._mode?!1:t.x===e.x&&t.y===e.y&&t.z===e.z}clone(t=!1){return new A(this._mode,this.x,this.y,this.z,t?this.w:1)}is(t){return A.is(this,t)}toHsla(){let t=this.x,e=this.y,i=this.z,s=0,o=0,h=0,g=Math.max(this.x,this.y,this.z),m=Math.min(this.x,this.y,this.z),v=g-m;return h=(g+m)/2,v===0&&(o=0),v!==0&&(o=v/(1-Math.abs(2*h-1))),v===0?s=0:g===t?s=60*((e-i)/v%6):g===e?s=60*((i-t)/v+2):g===i&&(s=60*((t-e)/v+4)),s=b(s,0,360),o=b(o,0,1)*100,h=b(h,0,1)*100,A.fromHsla(s,o,h,this.w)}toString(t=!1){let e={x:0,y:0,z:0,w:0},i="transparent";if(this._mode==="rgb"){if(e.x=b(this.x*255,0,255),e.y=b(this.y*255,0,255),e.z=b(this.z*255,0,255),e.w=b(this.w*1,0,1),t){e.w=b(e.w*255,0,255);let s=e.x.toString(16).padStart(2,"0"),o=e.y.toString(16).padStart(2,"0"),h=e.z.toString(16).padStart(2,"0"),g=e.w.toString(16).padStart(2,"0");return e.w===255?`#${s}${o}${h}`:`#${s}${o}${h}${g}`}i=e.w===1?"rgb(/x/,/y/,/z/)":"rgba(/x/,/y/,/z/,/w/)"}if(this._mode==="hsl"){if(t)throw new Error("Color space HSL cannot be converted to HTML string.");e.x=b(this.x*360,0,360),e.y=b(this.y*100,0,100),e.z=b(this.z*100,0,100),e.w=b(this.w*1,0,1),i=e.w===1?"hsl(/x/,/y/%,/z/%)":"hsla(/x/,/y/%,/z/%,/w/)"}if(this._mode==="hsv"){if(t)throw new Error("Color space HSV cannot be converted to HTML string.");e.x=b(this.x*360,0,360),e.y=b(this.y*100,0,100),e.z=b(this.z*100,0,100),e.w=b(this.w*1,0,1),i=e.w===1?"hsv(/x/,/y/%,/z/%)":"hsva(/x/,/y/%,/z/%,/w/)"}return i=i.replace("/x/",e.x.toFixed(1)).replace("/y/",e.y.toFixed(1)).replace("/z/",e.z.toFixed(1)).replace("/w/",e.w.toFixed(1)),i}};A._black=A.fromRgba(0,0,0,1),A._transparent=A.fromRgba(0,0,0,0),A._white=A.fromRgba(255,255,255,1);let q=A;class Nt extends G{constructor(t,e,i){super(t,e),this.mass=0,this.radius=i,this.velocity=new G(0,0)}}class Kt extends Nt{constructor(t,e,i,s,o){super(t,e,i),this._color=q.black,this._sides=s,this._color=o}get color(){return this._color}set color(t){this._color.is(t)||(this._color=t)}get path(){let t=new Path2D;if(this._sides<3)t.arc(this.x,this.y,this.radius,0,Math.PI*2);else{let e=Math.PI*2/this._sides;for(let i=0;i<=Math.PI*2;i+=e){let s=this.x+Math.cos(i)*this.radius,o=this.y+Math.sin(i)*this.radius;i===0?t.moveTo(s,o):t.lineTo(s,o)}}return t.closePath(),t}get sides(){return this._sides}set sides(t){this._sides=t}}const Y=class Y extends Ot{constructor(){super(...arguments),this._assets=null,this._backgroundColors=[],this._backgroundController=null,this._mouse=new G(0,0),this._mouseDist=new G(0,0),this._mouseInit=new G(0,0),this._palette={},this._paletteColors=[],this._paletteController=null,this._paletteSourceController=null,this._particleFill=this.particleFill,this._particleStroke=Y.DefaultParticleRender,this._particles=[],this._updatingParticles=!1}controller(t){this._paletteSourceController=t.add(p.Scene,"paletteSource",{}).onChange(this.updatePaletteSource.bind(this)).name("source"),this._paletteController=t.add(p.Scene,"palette",{}).onChange(this.updatePalette.bind(this)).name("palette");const e=t.addFolder("background");e.add(p.Scene,"usePaletteForBackground").onChange(this.updateBackgroundMode.bind(this,e)).name("use palette"),this._backgroundController=e.addColor(p.Scene,"background").name("color");const i=t.addFolder("colors"),s=new P(.25,.8,.01);i.add(p.Colors,"alphaBlended").onChange(this.updateParticles.bind(this,"colorAlpha")).name("use alpha"),i.add(p.Colors,"alpha",s.x,s.y,s.z).onChange(this.updateParticles.bind(this,"colorAlpha"));const o=t.addFolder("particles"),h=new P(1e3,1e4,1),g=new P(2,12,1),m=new P(10,200,1),v=new P(10,100,1),y=new P(200,1e3,1);o.add(p.Particles,"mode",["fill","stroke","fill+stroke","fill/stroke"]).onChange(this.updateParticleMode.bind(this)),o.add(p.Particles,"count",h.x,h.y,h.z).onChange(this.updateParticles.bind(this,"particleCount")),o.add(p.Particles,"sides",g.x,g.y,g.z).onChange(this.updateParticles.bind(this,"particleSides")),o.add(p.Particles,"maxVelocity",y.x,y.y,y.z).onChange(this.updateParticles.bind(this,"particleVelocity")).name("max. velocity");const _=o.addFolder("radius");_.add(p.Particles,"maxRadius",m.x,m.y,m.z).onChange(this.updateParticles.bind(this,"particleRadius")).name("max").listen(),_.add(p.Particles,"radiusGain",v.x,v.y,v.z).onChange(this.updateParticles.bind(this,"particleRadius")).name("gain").listen(),_.add(p.Particles,"radiusDecay",v.x,v.y,v.z).onChange(this.updateParticles.bind(this,"particleRadius")).name("decay").listen(),o.add(p.Particles,"resetRadius").name("reset radius");const C=t.addFolder("mouse"),F=new P(50,200,1),S=new P(.5,10,.1);C.add(p.Mouse,"follow"),C.add(p.Mouse,"radius",F.x,F.y,F.z).name("max. radius"),C.add(p.Mouse,"velocity",S.x,S.y,S.z).name("max. velocity")}initialize(){this._assets||(this._assets=ut.create("/assets/palette.json","/assets/palette.ladygaga.json","/assets/palette.taylorswift.json")),this._mouse.x=this.width/2,this._mouse.y=this.height/2}render(t){t.save(),t.fillStyle=p.Scene.background,t.fillRect(0,0,this.width,this.height),t.restore();for(let e of this._particles){const i=this._particles.indexOf(e);this._particleFill(t,e,i),this._particleStroke(t,e,i)}}update(t){if(this._assets&&this._assets.state==="ready"){this._assets.load(this.loaded.bind(this));return}if(!(this._assets&&this._assets.state==="loading")&&!this._updatingParticles){for(let e of this._particles)(e.x<e.radius||e.x>this.width-e.radius)&&(e.x=b(e.x,e.radius,this.width-e.radius),e.velocity.x=-e.velocity.x),(e.y<e.radius||e.y>this.height-e.radius)&&(e.y=b(e.y,e.radius,this.height-e.radius),e.velocity.y=-e.velocity.y),e.x+=e.velocity.x*t,e.y+=e.velocity.y*t,this.updateParticleRadius(e,t);this.updateMouse(t)}}loaded(t){if(this._assets&&t==="done"){let e=null;for(let i of this._assets.paths){const s=this._assets.get(i);if(!s||s==="")continue;const o={};for(let h of JSON.parse(s))o[h.name]=h.colors;i=i.replace("/assets/","").replace(".json",""),e=e||o,this._palette[i]=o}this._paletteSourceController&&this._paletteSourceController.options(this._palette).setValue(e),this.updateParticles("particleCount")}}particleFill(t,e,i){p.Particles.mode.indexOf("/")>0&&i%2!==0||(t.fillStyle=e.color.toString(),t.fill(e.path))}particleStroke(t,e,i){p.Particles.mode.indexOf("/")>0&&i%2===0||(t.lineJoin="round",t.lineWidth=3,t.strokeStyle=e.color.clone().toString(),t.stroke(e.path))}updateBackgroundMode(t,e){e?(this._backgroundController instanceof zt&&(this._backgroundController.destroy(),this._backgroundController=null),this._backgroundController=t.add(p.Scene,"background",this._backgroundColors).name("color"),this._backgroundColors.length>0&&this._backgroundController.setValue(this._backgroundColors[0])):(this._backgroundController&&(this._backgroundController.destroy(),this._backgroundController=null),this._backgroundController=t.addColor(p.Scene,"background").name("color"))}updateMouse(t){p.Mouse.follow?(this._mouseInit.x=J.x||this.width/2,this._mouseInit.y=J.y||this.height/2):(this._mouseInit.x=this.width/2,this._mouseInit.y=this.height/2),this._mouseDist.x=this._mouseInit.x-this._mouse.x,this._mouseDist.y=this._mouseInit.y-this._mouse.y,this._mouse.x+=this._mouseDist.x*p.Mouse.velocity*t,this._mouse.y+=this._mouseDist.y*p.Mouse.velocity*t}updatePalette(t){this._paletteColors.splice(0,this._paletteColors.length),this._backgroundColors.splice(0,this._backgroundColors.length);for(let e of t){const i=q.fromVector3(e);this._paletteColors.push(i),this._backgroundColors.push(i.toString(!0))}this.updateParticles("colorPalette"),this._backgroundController instanceof Ft&&(this._backgroundController.options(this._backgroundColors),this._backgroundColors.length>0&&this._backgroundController.setValue(this._backgroundColors[0]))}updatePaletteSource(t){if(this._paletteController){let e=null;for(let i in t)e||(e=t[i]);this._paletteController.options(t).setValue(e)}}updateParticleColor(t){const e=kt(0,this._paletteColors.length),i=this._paletteColors[e].clone();i.w=p.Colors.alphaBlended?p.Colors.alpha:1,t.color=i}updateParticleMode(t){if(t==="fill"){this._particleFill=this.particleFill.bind(this),this._particleStroke=Y.DefaultParticleRender;return}if(t==="stroke"){this._particleFill=Y.DefaultParticleRender,this._particleStroke=this.particleStroke.bind(this);return}this._particleFill=this.particleFill.bind(this),this._particleStroke=this.particleStroke.bind(this)}updateParticleRadius(t,e){let i=Xt(t.x,t.y,this._mouse.x,this._mouse.y),s=t.radius+p.Mouse.radius;i-s<0?t.radius+=p.Particles.radiusGain*e:t.radius-=p.Particles.radiusDecay*e,t.radius=b(t.radius,0,p.Particles.maxRadius)}updateParticles(t){if(t==="particleCount"){this._updatingParticles=!0;const e=Math.abs(this._particles.length-p.Particles.count);if(p.Particles.count>this._particles.length){const i=p.Particles.maxVelocity,s=p.Particles.sides;for(let o=0;o<e;o++){const h=Et(0,this.width),g=Et(0,this.height),m=new Kt(h,g,0,s,q.transparent);m.mass=1,m.velocity.x=it(-i,i),m.velocity.y=it(-i,i),this.updateParticleColor(m),this._particles.push(m)}}else if(p.Particles.count<this._particles.length)for(let i=0;i<e;i++){const s=kt(0,this._particles.length);this._particles.splice(s,1)}}else{this._updatingParticles=!0;const e=p.Particles.maxVelocity,i=p.Particles.sides;for(let s of this._particles){if(t==="colorAlpha"){s.color.w=p.Colors.alphaBlended?p.Colors.alpha:1;continue}if(t==="colorPalette"){this.updateParticleColor(s);continue}if(t==="particleVelocity"){s.velocity.x=it(-e,e),s.velocity.y=it(-e,e);continue}if(t==="particleSides"){s.sides=i;continue}}}this._updatingParticles=!1}};Y.DefaultParticleRender=()=>{};let ct=Y;var p;(r=>{const o=class o{};o.alpha=.7,o.alphaBlended=!0;let t=o;r.Colors=t;const h=class h{};h.follow=!1,h.radius=200,h.velocity=2.5;let e=h;r.Mouse=e;const g=class g{static resetRadius(){r.Particles.maxRadius=50,r.Particles.radiusGain=50,r.Particles.radiusDecay=50}};g.count=5e3,g.maxRadius=50,g.maxVelocity=1e3,g.mode="fill",g.radiusDecay=50,g.radiusGain=50,g.sides=6;let i=g;r.Particles=i;const m=class m{};m.background="#000000",m.usePaletteForBackground=!1;let s=m;r.Scene=s})(p||(p={}));const $t=Object.freeze(Object.defineProperty({__proto__:null,ParticleScene2:ct},Symbol.toStringTag,{value:"Module"})),T=class T{static get recording(){return this._media?this._media.state==="recording"||this._media.state==="paused":!1}static pause(){this._media&&this._media.state==="recording"&&this._media.pause()}static record(t){return this.recording?Promise.reject():(this._data=[],this._media=null,new Promise(this.execute.bind(this,t)))}static resume(){this._media&&this._media.state==="paused"&&this._media.resume()}static stop(){this._media&&this._media.state==="recording"&&this._media.stop()}static execute(t){let e=t.captureStream(60);this._media=new MediaRecorder(e,{mimeType:this._mediaType,audioBitsPerSecond:this._mediaAudioBps*1e5,videoBitsPerSecond:this._mediaVideoBps*1e6}),this._media.start(),this._media.ondataavailable=this.progress.bind(this),this._media.onstop=this.end.bind(this)}static end(){try{let t=new Blob(this._data,{type:this._mediaType}),e=URL.createObjectURL(t);this.resolve(e)}catch(t){this.reject(t)}}static progress(t){this._data.push(t.data)}static reject(t){console.error(t)}static resolve(t){window.open(t)}};T._data=[],T._media=null,T._mediaAudioBps=1.28,T._mediaType="video/mp4",T._mediaVideoBps=2.5;let j=T;var St=new Map;const w=class w{static get fpsmeterVisible(){return this._fpsmeterVisible}static set fpsmeterVisible(t){var e,i;this._fpsmeterVisible=t,this._fpsmeterVisible?(e=this._fpsmeter)==null||e.show():(i=this._fpsmeter)==null||i.hide()}static get frames(){return this._frames}static set frames(t){this._frames=t,this._frameStep=1/this._frames}static get running(){return this._running}static get scene(){return this._scene}static set scene(t){this._scene=t,this.updateController()}static get sceneCtor(){return this._sceneCtor}static set sceneCtor(t){var s,o;if(this._scene=null,this._sceneCtor=t,!this._sceneCtor||this._sceneCtor==="")return;let e=St.get(this._sceneCtor);if(e){this.scene=e;return}const i=Object.assign($t)[this._sceneCtor];e=new i,e.resize(((s=this._canvas)==null?void 0:s.width)||window.innerWidth,((o=this._canvas)==null?void 0:o.height)||window.innerHeight),e.initialize(),St.set(this._sceneCtor,e),this.scene=e}static initialize(){J.initialize(),this.initializeGraphics(),this.hookWindowEvents(),this.initializeFpsmeter(),this.initializeDebug(),this.initializeGui()}static start(){this._running||(this._running=!0,requestAnimationFrame(this.loop.bind(this)))}static initializeDebug(){this._debugCanvas=document.querySelector("canvas#debug"),this._debugCanvas||(this._debugCanvas=document.createElement("canvas"),this._debugCanvas.id="debug",this._debugCanvas.style.display=this._debugVisible?"inline":"none"),document.body.appendChild(this._debugCanvas),this._debugContext=this._debugCanvas.getContext("2d")}static initializeFpsmeter(){this._fpsmeter=new FPSMeter(document.body,{graph:1,decimals:0,theme:"transparent",toggleOn:void 0}),this._fpsmeter.hide()}static initializeGraphics(){this._canvas=document.querySelector("canvas"),this._canvas||(this._canvas=document.createElement("canvas"),this._canvas.style.backgroundColor="black",this._canvas.style.zIndex="-1",this._canvas.style.position="fixed",this._canvas.style.left="0",this._canvas.style.top="0"),document.body.insertBefore(this._canvas,document.body.firstChild),this._context=this._canvas.getContext("2d")}static initializeGui(){const t=Object.keys($t);this._controller=new pt({title:"controls"}),this._controller.add(this,"fpsmeterVisible").name("show fps").listen(),this._controller.add(this,"frames",30,165,1).name("frames/sec"),this._controller.add(this,"sceneCtor",t).name("scene").setValue(t[0])}static hookWindowEvents(){document.addEventListener("keyup",this.windowKeyUpEvent.bind(this)),window.addEventListener("blur",this.windowBlurEvent.bind(this)),window.addEventListener("focus",this.windowFocusEvent.bind(this)),window.addEventListener("resize",this.windowResizeEvent.bind(this));const t=new UIEvent("resize",{cancelable:!1,bubbles:!0});window.dispatchEvent(t)}static loop(t){this.tickStart();try{if(this._running){let e=(t-this._timeMs)/1e3;for(this._timeMs=t,this._timeAcc+=e;this._timeAcc>=this._frameStep;)this._timeAcc-=this._frameStep,this.update(this._frameStep);this.render()}}catch(e){console.error(e)}this.tickEnd(),requestAnimationFrame(this.loop.bind(this))}static render(){this._debugVisible&&this.renderDebug(),this._scene&&this._context&&this._scene.render(this._context)}static renderDebug(){for(let t in this._debugInfo)if(!this._debugContext)break}static tickEnd(){this._fpsmeter&&this._fpsmeterVisible&&this._fpsmeter.tick()}static tickStart(){this._fpsmeter&&this._fpsmeterVisible&&this._fpsmeter.tickStart()}static update(t){this.updateDebug(t),this.updateScene(t)}static updateController(){this._controller&&(this._sceneController&&this._sceneController.destroy(),this._scene&&(this._sceneController=this._controller.addFolder("scene options"),this._sceneController.open(),this._scene.controller(this._sceneController)))}static updateDebug(t){this._debugVisible&&this._debugContext?(this._debugMetrics=this._debugContext.measureText("AaBbCcXxYyZz"),this._debugInfo={fps:this._frames}):this._debugInfo={}}static updateScene(t){this._scene&&this._scene.running&&this._scene.update(t)}static windowBlurEvent(t){if(this._scene){if(!this._scene.running){this._sceneStateOnBlur="paused";return}j.recording||(this._sceneStateOnBlur="playing",this._scene.pause())}}static windowFocusEvent(t){if(this._scene&&this._sceneStateOnBlur){if(this._sceneStateOnBlur==="paused"){this._sceneStateOnBlur=null;return}this._scene.play(),this._sceneStateOnBlur=null}}static windowKeyUpEvent(t){if(t.code==="Space"||t.code==="KeyP"){if(!this._scene)return;this._scene.running?this._scene.pause():this._scene.play(),t.preventDefault()}else if(t.code==="KeyF")this.fpsmeterVisible=!this.fpsmeterVisible,t.preventDefault();else if(t.code==="KeyR"){if(!this._canvas)return;j.recording?j.stop():j.record(this._canvas),t.preventDefault()}}static windowResizeEvent(t){if(this._canvas){const e=window.innerWidth,i=window.innerHeight;this._scene&&this._scene.resize(e,i),this._canvas.style.imageRendering="pixelated",this._canvas.height=i,this._canvas.width=e}}};w._canvas=null,w._context=null,w._debugCanvas=null,w._debugContext=null,w._debugInfo={},w._debugMetrics=null,w._debugVisible=!1,w._fpsmeter=null,w._fpsmeterVisible=!1,w._frames=165,w._frameStep=1/w._frames,w._controller=null,w._running=!1,w._scene=null,w._sceneController=null,w._sceneCtor=null,w._sceneStateOnBlur=null,w._timeAcc=0,w._timeMs=0,w.state=0;let st=w;(function(){st.initialize(),st.start()})();
