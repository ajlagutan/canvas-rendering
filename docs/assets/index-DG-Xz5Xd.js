(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const h of a.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&i(h)}).observe(document,{childList:!0,subtree:!0});function e(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=e(s);fetch(s.href,a)}})();const Z=class Z{constructor(t=0,e=0,i=0,s=0){this.x=t,this.y=e,this.width=i,this.height=s}static get empty(){return this._empty}get bottom(){return this.y+this.height}get left(){return this.x}get right(){return this.x+this.width}get top(){return this.y}clone(){return new Z(this.x,this.y,this.width,this.height)}contains(t,e){return this.x<=t&&t<=this.x+this.width&&this.y<=e&&e<=this.y+this.height}inflate(t,e){this.x-=t,this.y-=e,this.width+=t*2,this.height+=e*2}};Z._empty=new Z(0,0,0,0);let Et=Z;class W{constructor(t=0,e=0){this.x=t,this.y=e}}class D{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}}class Tt{constructor(t=0,e=0,i=0,s=0){this.x=t,this.y=e,this.z=i,this.w=s}}const kt={d:"debug",f:"fps",g:"gui",p:"control"},St=24,Rt=6;class q{static initialize(){this.clear(),this.setupEventHandlers()}static longPressed(t){return this._latestButton===t&&this._pressedTime>=St}static pressed(t){return!!this._currentState[t]}static repeated(t){return this._latestButton===t&&(this._pressedTime===0||this._pressedTime>=St&&this._pressedTime%Rt===0)}static trigger(t){return this._latestButton===t&&this._pressedTime===0}static update(){this._latestButton&&this._currentState[this._latestButton]?this._pressedTime++:this._latestButton=null;for(let t in this._currentState)this._currentState[t]&&!this._previousState[t]&&(this._latestButton=t,this._pressedTime=0),this._previousState[t]=this._currentState[t]}static clear(){this._currentState={},this._previousState={},this._latestButton=null,this._pressedTime=0}static onLostFocus(t){this.clear()}static onKeyDown(t){this.shouldPreventDefault(t.key)&&t.preventDefault(),t.key==="NumLock"&&this.clear();const e=kt[t.key];e&&(this._currentState[e]=!0)}static onKeyUp(t){const e=kt[t.key];e&&(this._currentState[e]=!1)}static setupEventHandlers(){document.addEventListener("keydown",this.onKeyDown.bind(this)),document.addEventListener("keyup",this.onKeyUp.bind(this)),window.addEventListener("blur",this.onLostFocus.bind(this))}static shouldPreventDefault(t){return!1}}const $t={1:"left",2:"right",4:"middle",8:"back",16:"forward"},Pt=24,jt=6;class nt{static get x(){return this._x}static get y(){return this._y}static initialize(){this.clear(),this.setupEventHandlers()}static longPressed(t){return this._latestButton===t&&this._pressedTime>=Pt}static pressed(t){return!!this._currentState[t]}static repeated(t){return this._latestButton===t&&(this._pressedTime===0||this._pressedTime>=Pt&&this._pressedTime%jt===0)}static trigger(t){return this._latestButton===t&&this._pressedTime===0}static update(){this._latestButton&&this._currentState[this._latestButton]?this._pressedTime++:this._latestButton=null;for(let t in this._currentState)this._currentState[t]&&!this._previousState[t]&&(this._latestButton=t,this._pressedTime=0),this._previousState[t]=this._currentState[t]}static clear(){this._currentState={},this._previousState={},this._latestButton=null,this._pressedTime=0,this._x=void 0,this._y=void 0}static onLostFocus(t){this.clear()}static onMouseDown(t){this.shouldPreventDefault(t.buttons)&&t.preventDefault();const e=$t[t.buttons];e&&(this._currentState[e]=!0)}static onMouseLeave(t){this.clear()}static onMouseMove(t){this._x=t.x,this._y=t.y}static onMouseUp(t){const e=$t[t.buttons];e&&(this._currentState[e]=!1)}static setupEventHandlers(){document.addEventListener("mousedown",this.onMouseDown.bind(this)),document.addEventListener("mouseleave",this.onMouseLeave.bind(this)),document.addEventListener("mousemove",this.onMouseMove.bind(this)),document.addEventListener("mouseup",this.onMouseUp.bind(this)),window.addEventListener("blur",this.onLostFocus.bind(this))}static shouldPreventDefault(t){return!1}}class gt{constructor(...t){this._assets=new Map,this._assetsXhr=new Map,this._assetsCount=0,this._callback=()=>{},this._count=0,this._paths=[];for(let e of t){const i=new XMLHttpRequest;i.addEventListener("loadend",this.loadend.bind(this,e)),i.open("GET",e),this._assetsXhr.set(e,i),this._paths.push(e)}this._assetsCount=t.length,this._state="ready"}get paths(){return this._paths}get state(){return this._state}static create(...t){return new gt(...t)}get(t){return this._assets.has(t)&&this._assets.get(t)||null}load(t){for(let[,e]of this._assetsXhr)try{e.send()}catch(i){console.error(i)}this._callback=t||this._callback,this._state="loading"}loadend(t,e){const i=e.currentTarget;i.status===200&&(this._assets.set(t,i.responseText),this._count++),this._count===this._assetsCount&&(this._state="done",this._callback.call(this,this._state))}}class mt{constructor(){this._height=0,this._running=!1,this._width=0}get displayAuthor(){return null}get displayDescription(){return null}get displayTitle(){return null}get height(){return this._height}get running(){return this._running}get width(){return this._width}controller(t){t.hide()}initialize(){}pause(){this._running&&(this._running=!this._running)}play(){this._running||(this._running=!this._running)}render(t){}resize(t,e){this._width=t,this._height=e}update(t){}}/*!
 * FPSMeter 0.3.1 - 9th May 2013
 * https://github.com/Darsain/fpsmeter
 *
 * Licensed under the MIT license.
 * http://opensource.org/licenses/MIT
 */(function(r,t){function e(n){return document.createElement(n)}function i(n,l){for(var o in l)try{n.style[o]=l[o]}catch{}return n}function s(n){return n==null?String(n):typeof n=="object"||typeof n=="function"?Object.prototype.toString.call(n).match(/\s([a-z]+)/i)[1].toLowerCase()||"object":typeof n}function a(n,l){if(s(l)!=="array")return-1;if(l.indexOf)return l.indexOf(n);for(var o=0,c=l.length;o<c;o++)if(l[o]===n)return o;return-1}function h(){var n=arguments;for(var l in n[1])if(n[1].hasOwnProperty(l))switch(s(n[1][l])){case"object":n[0][l]=h({},n[0][l],n[1][l]);break;case"array":n[0][l]=n[1][l].slice(0);break;default:n[0][l]=n[1][l]}return n.length>2?h.apply(null,[n[0]].concat(Array.prototype.slice.call(n,2))):n[0]}function d(n,l,o){var c,p,w,u,E,T,S,K,M;return o<=.5?u=o*(1+l):u=o+l-o*l,u===0?"#000":(E=2*o-u,T=(u-E)/u,n=6*n,S=Math.floor(n),K=n-S,M=u*T*K,S===0||S===6?(c=u,p=E+M,w=E):S===1?(c=u-M,p=u,w=E):S===2?(c=E,p=u,w=E+M):S===3?(c=E,p=u-M,w=u):S===4?(c=E+M,p=E,w=u):(c=u,p=E,w=u-M),"#"+g(c)+g(p)+g(w))}function g(n){return n=Math.round(n*255).toString(16),n.length===1?"0"+n:n}function y(n,l,o,c){n.addEventListener?n[c?"removeEventListener":"addEventListener"](l,o,!1):n.attachEvent&&n[c?"detachEvent":"attachEvent"]("on"+l,o)}var b;(function(){var n=r.performance;if(n&&(n.now||n.webkitNow)){var l=n.now?"now":"webkitNow";b=n[l].bind(n)}else b=function(){return+new Date}})();var v=r.cancelAnimationFrame||r.cancelRequestAnimationFrame,C=r.requestAnimationFrame;(function(){for(var n=["moz","webkit","o"],l=0,o=0,c=n.length;o<c&&!v;++o)v=r[n[o]+"CancelAnimationFrame"]||r[n[o]+"CancelRequestAnimationFrame"],C=v&&r[n[o]+"RequestAnimationFrame"];v||(C=function(p){var w=b(),u=Math.max(0,16-(w-l));return l=w+u,r.setTimeout(function(){p(w+u)},u)},v=function(p){clearTimeout(p)})})();var L=s(document.createElement("div").textContent)==="string"?"textContent":"innerText";function P(n,l){s(n)==="object"&&n.nodeType===t&&(l=n,n=document.body),n||(n=document.body);var o=this,c=h({},P.defaults,l||{}),p={},w=[],u,E,T=100,S=[],K=0,M=c.threshold,at=0,tt=b()-M,Y,J=[],U=[],R,ot,O=c.show==="fps",lt,et,_,F;o.options=c,o.fps=0,o.duration=0,o.isPaused=0,o.tickStart=function(){at=b()},o.tick=function(){Y=b(),K=Y-tt,M+=(K-M)/c.smoothing,o.fps=1e3/M,o.duration=at<tt?M:Y-at,tt=Y},o.pause=function(){return R&&(o.isPaused=1,clearTimeout(R),v(R),v(ot),R=ot=0),o},o.resume=function(){return R||(o.isPaused=0,st()),o},o.set=function(k,ht){return c[k]=ht,O=c.show==="fps",a(k,B)!==-1&&wt(),a(k,I)!==-1&&At(),o},o.showDuration=function(){return o.set("show","ms"),o},o.showFps=function(){return o.set("show","fps"),o},o.toggle=function(){return o.set("show",O?"ms":"fps"),o},o.hide=function(){return o.pause(),p.container.style.display="none",o},o.show=function(){return o.resume(),p.container.style.display="block",o};function Ot(){for(_=c.history;_--;)J[_]=_===0?o.fps:J[_-1],U[_]=_===0?o.duration:U[_-1]}function it(k,ht,Ct,Ht){return E[0|k][Math.round(Math.min((ht-Ct)/(Ht-Ct)*T,T))]}function bt(){p.legend.fps!==O&&(p.legend.fps=O,p.legend[L]=O?"FPS":"ms"),et=O?o.fps:o.duration,p.count[L]=et>999?"999+":et.toFixed(et>99?0:c.decimals)}function yt(){if(Y=b(),tt<Y-c.threshold&&(o.fps-=o.fps/Math.max(1,c.smoothing*60/c.interval),o.duration=1e3/o.fps),Ot(),bt(),c.heat){if(S.length)for(_=S.length;_--;)S[_].el.style[u[S[_].name].heatOn]=O?it(u[S[_].name].heatmap,o.fps,0,c.maxFps):it(u[S[_].name].heatmap,o.duration,c.threshold,0);if(p.graph&&u.column.heatOn)for(_=w.length;_--;)w[_].style[u.column.heatOn]=O?it(u.column.heatmap,J[_],0,c.maxFps):it(u.column.heatmap,U[_],c.threshold,0)}if(p.graph)for(F=0;F<c.history;F++)w[F].style.height=(O?J[F]?Math.round(lt/c.maxFps*Math.min(J[F],c.maxFps)):0:U[F]?Math.round(lt/c.threshold*Math.min(U[F],c.threshold)):0)+"px"}function st(){c.interval<20?(R=C(st),yt()):(R=setTimeout(st,c.interval),ot=C(yt))}function vt(k){k=k||window.event,k.preventDefault?(k.preventDefault(),k.stopPropagation()):(k.returnValue=!1,k.cancelBubble=!0),o.toggle()}o.destroy=function(){o.pause(),xt(),o.tick=o.tickStart=function(){}};function xt(){c.toggleOn&&y(p.container,c.toggleOn,vt,1),n.removeChild(p.container)}function It(){if(u=P.theme[c.theme],E=u.compiledHeatmaps||[],!E.length&&u.heatmaps.length){for(F=0;F<u.heatmaps.length;F++)for(E[F]=[],_=0;_<=T;_++)E[F][_]=d(.33/T*_,u.heatmaps[F].saturation,u.heatmaps[F].lightness);u.compiledHeatmaps=E}}function wt(){p.container&&xt(),It(),p.container=i(e("div"),u.container),p.count=p.container.appendChild(i(e("div"),u.count)),p.legend=p.container.appendChild(i(e("div"),u.legend)),p.graph=c.graph?p.container.appendChild(i(e("div"),u.graph)):0,S.length=0;for(var k in p)p[k]&&u[k].heatOn&&S.push({name:k,el:p[k]});if(w.length=0,p.graph)for(p.graph.style.width=c.history*u.column.width+(c.history-1)*u.column.spacing+"px",_=0;_<c.history;_++)w[_]=p.graph.appendChild(i(e("div"),u.column)),w[_].style.position="absolute",w[_].style.bottom=0,w[_].style.right=_*u.column.width+_*u.column.spacing+"px",w[_].style.width=u.column.width+"px",w[_].style.height="0px";At(),bt(),n.appendChild(p.container),p.graph&&(lt=p.graph.clientHeight),c.toggleOn&&(c.toggleOn==="click"&&(p.container.style.cursor="pointer"),y(p.container,c.toggleOn,vt))}function At(){i(p.container,c)}(function(){wt(),st()})()}P.extend=h,window.FPSMeter=P,P.defaults={interval:100,smoothing:10,show:"fps",toggleOn:"click",decimals:1,maxFps:60,threshold:100,position:"absolute",zIndex:10,left:"5px",top:"5px",right:"auto",bottom:"auto",margin:"0 0 0 0",theme:"dark",heat:0,graph:0,history:20};var B=["toggleOn","theme","heat","graph","history"],I=["position","zIndex","left","top","right","bottom","margin"]})(window);(function(r,t,e){t.theme={};var i=t.theme.base={heatmaps:[],container:{heatOn:null,heatmap:null,padding:"5px",minWidth:"95px",height:"30px",lineHeight:"30px",textAlign:"right",textShadow:"none"},count:{heatOn:null,heatmap:null,position:"absolute",top:0,right:0,padding:"5px 10px",height:"30px",fontSize:"24px",fontFamily:"Consolas, Andale Mono, monospace",zIndex:2},legend:{heatOn:null,heatmap:null,position:"absolute",top:0,left:0,padding:"5px 10px",height:"30px",fontSize:"12px",lineHeight:"32px",fontFamily:"sans-serif",textAlign:"left",zIndex:2},graph:{heatOn:null,heatmap:null,position:"relative",boxSizing:"padding-box",MozBoxSizing:"padding-box",height:"100%",zIndex:1},column:{width:4,spacing:1,heatOn:null,heatmap:null}};t.theme.dark=t.extend({},i,{heatmaps:[{saturation:.8,lightness:.8}],container:{background:"#222",color:"#fff",border:"1px solid #1a1a1a",textShadow:"1px 1px 0 #222"},count:{heatOn:"color"},column:{background:"#3f3f3f"}}),t.theme.light=t.extend({},i,{heatmaps:[{saturation:.5,lightness:.5}],container:{color:"#666",background:"#fff",textShadow:"1px 1px 0 rgba(255,255,255,.5), -1px -1px 0 rgba(255,255,255,.5)",boxShadow:"0 0 0 1px rgba(0,0,0,.1)"},count:{heatOn:"color"},column:{background:"#eaeaea"}}),t.theme.colorful=t.extend({},i,{heatmaps:[{saturation:.5,lightness:.6}],container:{heatOn:"backgroundColor",background:"#888",color:"#fff",textShadow:"1px 1px 0 rgba(0,0,0,.2)",boxShadow:"0 0 0 1px rgba(0,0,0,.1)"},column:{background:"#777",backgroundColor:"rgba(0,0,0,.2)"}}),t.theme.transparent=t.extend({},i,{heatmaps:[{saturation:.8,lightness:.5}],container:{padding:0,color:"#fff",textShadow:"1px 1px 0 rgba(0,0,0,.5)"},count:{padding:"0 5px",height:"40px",lineHeight:"40px"},legend:{padding:"0 5px",height:"40px",lineHeight:"42px"},graph:{height:"40px"},column:{width:5,background:"#999",heatOn:"backgroundColor",opacity:.5}})})(window,FPSMeter);/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.20.0
 * @author George Michael Brower
 * @license MIT
 */class V{constructor(t,e,i,s,a="div"){this.parent=t,this.object=e,this.property=i,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(a),this.domElement.classList.add("controller"),this.domElement.classList.add(s),this.$name=document.createElement("div"),this.$name.classList.add("name"),V.nextNameID=V.nextNameID||0,this.$name.id=`lil-gui-name-${++V.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",h=>h.stopPropagation()),this.domElement.addEventListener("keyup",h=>h.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(i)}name(t){return this._name=t,this.$name.textContent=t,this}onChange(t){return this._onChange=t,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(t=!0){return this.disable(!t)}disable(t=!0){return t===this._disabled?this:(this._disabled=t,this.domElement.classList.toggle("disabled",t),this.$disable.toggleAttribute("disabled",t),this)}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(t){const e=this.parent.add(this.object,this.property,t);return e.name(this._name),this.destroy(),e}min(t){return this}max(t){return this}step(t){return this}decimals(t){return this}listen(t=!0){return this._listening=t,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const t=this.save();t!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=t}getValue(){return this.object[this.property]}setValue(t){return this.getValue()!==t&&(this.object[this.property]=t,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(t){return this.setValue(t),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class Gt extends V{constructor(t,e,i){super(t,e,i,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function dt(r){let t,e;return(t=r.match(/(#|0x)?([a-f0-9]{6})/i))?e=t[2]:(t=r.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?e=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=r.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(e=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),e?"#"+e:!1}const Yt={isPrimitive:!0,match:r=>typeof r=="string",fromHexString:dt,toHexString:dt},Q={isPrimitive:!0,match:r=>typeof r=="number",fromHexString:r=>parseInt(r.substring(1),16),toHexString:r=>"#"+r.toString(16).padStart(6,0)},Nt={isPrimitive:!1,match:r=>Array.isArray(r),fromHexString(r,t,e=1){const i=Q.fromHexString(r);t[0]=(i>>16&255)/255*e,t[1]=(i>>8&255)/255*e,t[2]=(i&255)/255*e},toHexString([r,t,e],i=1){i=255/i;const s=r*i<<16^t*i<<8^e*i<<0;return Q.toHexString(s)}},Wt={isPrimitive:!1,match:r=>Object(r)===r,fromHexString(r,t,e=1){const i=Q.fromHexString(r);t.r=(i>>16&255)/255*e,t.g=(i>>8&255)/255*e,t.b=(i&255)/255*e},toHexString({r,g:t,b:e},i=1){i=255/i;const s=r*i<<16^t*i<<8^e*i<<0;return Q.toHexString(s)}},Xt=[Yt,Q,Nt,Wt];function Kt(r){return Xt.find(t=>t.match(r))}class Dt extends V{constructor(t,e,i,s){super(t,e,i,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Kt(this.initialValue),this._rgbScale=s,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const a=dt(this.$text.value);a&&this._setValueFromHexString(a)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(t){if(this._format.isPrimitive){const e=this._format.fromHexString(t);this.setValue(e)}else this._format.fromHexString(t,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(t){return this._setValueFromHexString(t),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class ct extends V{constructor(t,e,i){super(t,e,i,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",s=>{s.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class Jt extends V{constructor(t,e,i,s,a,h){super(t,e,i,"number"),this._initInput(),this.min(s),this.max(a);const d=h!==void 0;this.step(d?h:this._getImplicitStep(),d),this.updateDisplay()}decimals(t){return this._decimals=t,this.updateDisplay(),this}min(t){return this._min=t,this._onUpdateMinMax(),this}max(t){return this._max=t,this._onUpdateMinMax(),this}step(t,e=!0){return this._step=t,this._stepExplicit=e,this}updateDisplay(){const t=this.getValue();if(this._hasSlider){let e=(t-this._min)/(this._max-this._min);e=Math.max(0,Math.min(e,1)),this.$fill.style.width=e*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?t:t.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const e=()=>{let l=parseFloat(this.$input.value);isNaN(l)||(this._stepExplicit&&(l=this._snap(l)),this.setValue(this._clamp(l)))},i=l=>{const o=parseFloat(this.$input.value);isNaN(o)||(this._snapClampSetValue(o+l),this.$input.value=this.getValue())},s=l=>{l.key==="Enter"&&this.$input.blur(),l.code==="ArrowUp"&&(l.preventDefault(),i(this._step*this._arrowKeyMultiplier(l))),l.code==="ArrowDown"&&(l.preventDefault(),i(this._step*this._arrowKeyMultiplier(l)*-1))},a=l=>{this._inputFocused&&(l.preventDefault(),i(this._step*this._normalizeMouseWheel(l)))};let h=!1,d,g,y,b,v;const C=5,L=l=>{d=l.clientX,g=y=l.clientY,h=!0,b=this.getValue(),v=0,window.addEventListener("mousemove",P),window.addEventListener("mouseup",B)},P=l=>{if(h){const o=l.clientX-d,c=l.clientY-g;Math.abs(c)>C?(l.preventDefault(),this.$input.blur(),h=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(o)>C&&B()}if(!h){const o=l.clientY-y;v-=o*this._step*this._arrowKeyMultiplier(l),b+v>this._max?v=this._max-b:b+v<this._min&&(v=this._min-b),this._snapClampSetValue(b+v)}y=l.clientY},B=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",P),window.removeEventListener("mouseup",B)},I=()=>{this._inputFocused=!0},n=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",e),this.$input.addEventListener("keydown",s),this.$input.addEventListener("wheel",a,{passive:!1}),this.$input.addEventListener("mousedown",L),this.$input.addEventListener("focus",I),this.$input.addEventListener("blur",n)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const t=(n,l,o,c,p)=>(n-l)/(o-l)*(p-c)+c,e=n=>{const l=this.$slider.getBoundingClientRect();let o=t(n,l.left,l.right,this._min,this._max);this._snapClampSetValue(o)},i=n=>{this._setDraggingStyle(!0),e(n.clientX),window.addEventListener("mousemove",s),window.addEventListener("mouseup",a)},s=n=>{e(n.clientX)},a=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",s),window.removeEventListener("mouseup",a)};let h=!1,d,g;const y=n=>{n.preventDefault(),this._setDraggingStyle(!0),e(n.touches[0].clientX),h=!1},b=n=>{n.touches.length>1||(this._hasScrollBar?(d=n.touches[0].clientX,g=n.touches[0].clientY,h=!0):y(n),window.addEventListener("touchmove",v,{passive:!1}),window.addEventListener("touchend",C))},v=n=>{if(h){const l=n.touches[0].clientX-d,o=n.touches[0].clientY-g;Math.abs(l)>Math.abs(o)?y(n):(window.removeEventListener("touchmove",v),window.removeEventListener("touchend",C))}else n.preventDefault(),e(n.touches[0].clientX)},C=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",v),window.removeEventListener("touchend",C)},L=this._callOnFinishChange.bind(this),P=400;let B;const I=n=>{if(Math.abs(n.deltaX)<Math.abs(n.deltaY)&&this._hasScrollBar)return;n.preventDefault();const o=this._normalizeMouseWheel(n)*this._step;this._snapClampSetValue(this.getValue()+o),this.$input.value=this.getValue(),clearTimeout(B),B=setTimeout(L,P)};this.$slider.addEventListener("mousedown",i),this.$slider.addEventListener("touchstart",b,{passive:!1}),this.$slider.addEventListener("wheel",I,{passive:!1})}_setDraggingStyle(t,e="horizontal"){this.$slider&&this.$slider.classList.toggle("active",t),document.body.classList.toggle("lil-gui-dragging",t),document.body.classList.toggle(`lil-gui-${e}`,t)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(t){let{deltaX:e,deltaY:i}=t;return Math.floor(t.deltaY)!==t.deltaY&&t.wheelDelta&&(e=0,i=-t.wheelDelta/120,i*=this._stepExplicit?1:10),e+-i}_arrowKeyMultiplier(t){let e=this._stepExplicit?1:10;return t.shiftKey?e*=10:t.altKey&&(e/=10),e}_snap(t){let e=0;return this._hasMin?e=this._min:this._hasMax&&(e=this._max),t-=e,t=Math.round(t/this._step)*this._step,t+=e,t=parseFloat(t.toPrecision(15)),t}_clamp(t){return t<this._min&&(t=this._min),t>this._max&&(t=this._max),t}_snapClampSetValue(t){this.setValue(this._clamp(this._snap(t)))}get _hasScrollBar(){const t=this.parent.root.$children;return t.scrollHeight>t.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Bt extends V{constructor(t,e,i,s){super(t,e,i,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(s)}options(t){return this._values=Array.isArray(t)?t:Object.values(t),this._names=Array.isArray(t)?t:Object.keys(t),this.$select.replaceChildren(),this._names.forEach(e=>{const i=document.createElement("option");i.textContent=e,this.$select.appendChild(i)}),this.updateDisplay(),this}updateDisplay(){const t=this.getValue(),e=this._values.indexOf(t);return this.$select.selectedIndex=e,this.$display.textContent=e===-1?t:this._names[e],this}}class Ut extends V{constructor(t,e,i){super(t,e,i,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",s=>{s.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var qt=`.lil-gui {
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
}`;function Zt(r){const t=document.createElement("style");t.innerHTML=r;const e=document.querySelector("head link[rel=stylesheet], head style");e?document.head.insertBefore(t,e):document.head.appendChild(t)}let Ft=!1;class _t{constructor({parent:t,autoPlace:e=t===void 0,container:i,width:s,title:a="Controls",closeFolders:h=!1,injectStyles:d=!0,touchStyles:g=!0}={}){if(this.parent=t,this.root=t?t.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(a),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),g&&this.domElement.classList.add("allow-touch-styles"),!Ft&&d&&(Zt(qt),Ft=!0),i?i.appendChild(this.domElement):e&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),s&&this.domElement.style.setProperty("--width",s+"px"),this._closeFolders=h}add(t,e,i,s,a){if(Object(i)===i)return new Bt(this,t,e,i);const h=t[e];switch(typeof h){case"number":return new Jt(this,t,e,i,s,a);case"boolean":return new Gt(this,t,e);case"string":return new Ut(this,t,e);case"function":return new ct(this,t,e)}console.error(`gui.add failed
	property:`,e,`
	object:`,t,`
	value:`,h)}addColor(t,e,i=1){return new Dt(this,t,e,i)}addFolder(t){const e=new _t({parent:this,title:t});return this.root._closeFolders&&e.close(),e}load(t,e=!0){return t.controllers&&this.controllers.forEach(i=>{i instanceof ct||i._name in t.controllers&&i.load(t.controllers[i._name])}),e&&t.folders&&this.folders.forEach(i=>{i._title in t.folders&&i.load(t.folders[i._title])}),this}save(t=!0){const e={controllers:{},folders:{}};return this.controllers.forEach(i=>{if(!(i instanceof ct)){if(i._name in e.controllers)throw new Error(`Cannot save GUI with duplicate property "${i._name}"`);e.controllers[i._name]=i.save()}}),t&&this.folders.forEach(i=>{if(i._title in e.folders)throw new Error(`Cannot save GUI with duplicate folder "${i._title}"`);e.folders[i._title]=i.save()}),e}open(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(t){this._closed!==t&&(this._closed=t,this._callOnOpenClose(this))}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const e=this.$children.clientHeight;this.$children.style.height=e+"px",this.domElement.classList.add("transition");const i=a=>{a.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",i))};this.$children.addEventListener("transitionend",i);const s=t?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!t),requestAnimationFrame(()=>{this.$children.style.height=s+"px"})}),this}title(t){return this._title=t,this.$title.textContent=t,this}reset(t=!0){return(t?this.controllersRecursive():this.controllers).forEach(i=>i.reset()),this}onChange(t){return this._onChange=t,this}_callOnChange(t){this.parent&&this.parent._callOnChange(t),this._onChange!==void 0&&this._onChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(t){this.parent&&this.parent._callOnFinishChange(t),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onOpenClose(t){return this._onOpenClose=t,this}_callOnOpenClose(t){this.parent&&this.parent._callOnOpenClose(t),this._onOpenClose!==void 0&&this._onOpenClose.call(this,t)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(t=>t.destroy())}controllersRecursive(){let t=Array.from(this.controllers);return this.folders.forEach(e=>{t=t.concat(e.controllersRecursive())}),t}foldersRecursive(){let t=Array.from(this.folders);return this.folders.forEach(e=>{t=t.concat(e.foldersRecursive())}),t}}function m(r,t,e){return Math.min(e,Math.max(t,r))}function ut(r,t,e,i){let s=e-r,a=i-t;return Math.sqrt(s**2+a**2)}var pt;(r=>{function t(i,s){return new W(i.x*Math.cos(s)-i.y*Math.sin(s),i.x*Math.sin(s)+i.y*Math.cos(s))}r.rotate=t;function e(i,s){const a=i.velocity.x-s.velocity.x,h=i.velocity.y-s.velocity.y,d=s.x-i.x,g=s.y-i.y;if(a*d+h*g>=0){const y=-Math.atan2(s.y-i.y,s.x-i.x),b=i.mass,v=s.mass,C=t(i.velocity,y),L=t(s.velocity,y),P={x:C.x*(b-v)/(b+v)+L.x*2*v/(b+v),y:C.y},B={x:L.x*(v-b)/(b+v)+C.x*2*b/(b+v),y:L.y},I=t(P,-y),n=t(B,-y);i.velocity.x=I.x,i.velocity.y=I.y,s.velocity.x=n.x,s.velocity.y=n.y}}r.resolveCollision=e})(pt||(pt={}));function X(r,t){if(r>=t)throw new Error("Invalid range: min must be less than max");return Math.random()*(t-r)+r}function zt(r,t){if(r=Math.ceil(r),t=Math.floor(t),r>=t)throw new Error("Invalid range: min must be less than max");return Math.floor(Math.random()*(t-r))+r}function H(r,t){if(r=Math.ceil(r),t=Math.floor(t),r>=t)throw new Error("Invalid range: min must be less than max");if(r<=0&&t>=0&&t-r===1)throw new Error("Only possible result is zero, which is not allowed");let e;do e=Math.floor(Math.random()*(t-r))+r;while(e===0);return e}class Qt extends mt{constructor(){super(...arguments),this.size=25,this._x=0,this._y=0,this._dx=1,this._dy=1,this._vx=1e3,this._vy=1e3,this._initial=!0}controller(t){t.add(this,"size",15,150,5)}render(t){t.clearRect(0,0,this.width,this.height),t.save(),t.fillStyle="red",t.fillRect(this._x,this._y,this.size,this.size),t.restore()}update(t){if(this._initial){this._x=X(0,this.width-this.size),this._y=X(0,this.height-this.size),this._initial=!1;return}(this._x<0||this._x>this.width-this.size)&&(this._x=m(this._x,0,this.width-this.size),this._dx=-this._dx),(this._y<0||this._y>this.height-this.size)&&(this._y=m(this._y,0,this.height-this.size),this._dy=-this._dy),this._x+=this._vx*this._dx*t,this._y+=this._vy*this._dy*t}}const A=class A extends Tt{constructor(t,e,i,s,a=1){super(e,i,s,a),this._mode="rgb",this._mode=t}static get black(){return this._black}static get transparent(){return this._transparent}static get white(){return this._white}static fromHsla(t,e,i,s=1){return t=m(t,0,360)/360,e=m(e,0,100)/100,i=m(i,0,100)/100,s=m(s,0,1)/1,new A("hsl",t,e,i,s)}static fromHsva(t,e,i,s=1){return t=m(t,0,360)/360,e=m(e,0,100)/100,i=m(i,0,100)/100,s=m(s,0,1)/1,new A("hsv",t,e,i,s)}static fromHtmlString(t){t=t.startsWith("#")?t.substring(1):t;let e=0,i=0,s=0,a=0;return t.length===3?(e=parseInt(t.substring(0,1).repeat(2),16),i=parseInt(t.substring(1,2).repeat(2),16),s=parseInt(t.substring(2,3).repeat(2),16),A.fromRgba(e,i,s,1)):6>t.length&&t.length>3?(e=parseInt(t.substring(0,1).repeat(2),16),i=parseInt(t.substring(1,2).repeat(2),16),s=parseInt(t.substring(2,3).repeat(2),16),a=parseInt(t.substring(3,4).repeat(2),16)/255,A.fromRgba(e,i,s,a)):t.length===6?(e=parseInt(t.substring(0,2),16),i=parseInt(t.substring(2,4),16),s=parseInt(t.substring(4,6),16),A.fromRgba(e,i,s,1)):A.transparent}static fromRgba(t,e,i,s=1){return t=m(t,0,255)/255,e=m(e,0,255)/255,i=m(i,0,255)/255,s=m(s,0,1)/1,new A("rgb",t,e,i,s)}static fromVector3(t){if(t.x<256)return A.fromRgba(t.x,t.y,t.z,1);if(t.x<360)return A.fromHsla(t.x,t.y,t.z,1);throw new Error("Invalid Vector3 object passed as an argument.")}static fromVector4(t){if(t.x<256)return A.fromRgba(t.x,t.y,t.z,t.w);if(t.x<360)return A.fromHsla(t.x,t.y,t.z,t.w);throw new Error("Invalid Vector4 object passed as an argument.")}static is(t,e){return t._mode!==e._mode?!1:t.x===e.x&&t.y===e.y&&t.z===e.z}clone(t=!1){return new A(this._mode,this.x,this.y,this.z,t?this.w:1)}is(t){return A.is(this,t)}toHsla(){let t=this.x,e=this.y,i=this.z,s=0,a=0,h=0,d=Math.max(this.x,this.y,this.z),g=Math.min(this.x,this.y,this.z),y=d-g;return h=(d+g)/2,y===0&&(a=0),y!==0&&(a=y/(1-Math.abs(2*h-1))),y===0?s=0:d===t?s=60*((e-i)/y%6):d===e?s=60*((i-t)/y+2):d===i&&(s=60*((t-e)/y+4)),s=m(s,0,360),a=m(a,0,1)*100,h=m(h,0,1)*100,A.fromHsla(s,a,h,this.w)}toString(t=!1){let e={x:0,y:0,z:0,w:0},i="transparent";if(this._mode==="rgb"){if(e.x=m(this.x*255,0,255),e.y=m(this.y*255,0,255),e.z=m(this.z*255,0,255),e.w=m(this.w*1,0,1),t){e.w=m(e.w*255,0,255);let s=e.x.toString(16).padStart(2,"0"),a=e.y.toString(16).padStart(2,"0"),h=e.z.toString(16).padStart(2,"0"),d=e.w.toString(16).padStart(2,"0");return e.w===255?`#${s}${a}${h}`:`#${s}${a}${h}${d}`}i=e.w===1?"rgb(/x/,/y/,/z/)":"rgba(/x/,/y/,/z/,/w/)"}if(this._mode==="hsl"){if(t)throw new Error("Color space HSL cannot be converted to HTML string.");e.x=m(this.x*360,0,360),e.y=m(this.y*100,0,100),e.z=m(this.z*100,0,100),e.w=m(this.w*1,0,1),i=e.w===1?"hsl(/x/,/y/%,/z/%)":"hsla(/x/,/y/%,/z/%,/w/)"}if(this._mode==="hsv"){if(t)throw new Error("Color space HSV cannot be converted to HTML string.");e.x=m(this.x*360,0,360),e.y=m(this.y*100,0,100),e.z=m(this.z*100,0,100),e.w=m(this.w*1,0,1),i=e.w===1?"hsv(/x/,/y/%,/z/%)":"hsva(/x/,/y/%,/z/%,/w/)"}return i=i.replace("/x/",e.x.toFixed(1)).replace("/y/",e.y.toFixed(1)).replace("/z/",e.z.toFixed(1)).replace("/w/",e.w.toFixed(1)),i}};A._black=A.fromRgba(0,0,0,1),A._transparent=A.fromRgba(0,0,0,0),A._white=A.fromRgba(255,255,255,1);let G=A;class te extends W{constructor(t,e,i){super(t,e),this.mass=0,this.radius=i,this.velocity=new W(0,0)}}class Vt extends te{constructor(t,e,i,s,a){super(t,e,i),this._color=G.black,this._sides=s,this._color=a}get color(){return this._color}set color(t){this._color.is(t)||(this._color=t)}get path(){let t=new Path2D;if(this._sides<3)t.arc(this.x,this.y,this.radius,0,Math.PI*2);else{let e=Math.PI*2/this._sides;for(let i=0;i<=Math.PI*2;i+=e){let s=this.x+Math.cos(i)*this.radius,a=this.y+Math.sin(i)*this.radius;i===0?t.moveTo(s,a):t.lineTo(s,a)}}return t.closePath(),t}get sides(){return this._sides}set sides(t){this._sides=t}}class ee extends mt{constructor(){super(...arguments),this._particles=[],this._updatingParticles=!1}controller(t){t.addColor(x.Scene,"background"),t.addColor(x.Scene,"foreground");const e=t.addFolder("particles"),i=new D(5,100,1),s=new D(10,60,1),a=new D(3,9,1),h=new D(50,1e3,1),d=new D(100,1e3,1);e.add(x.Particles,"count",i.x,i.y,i.z).onFinishChange(this.updateParticles.bind(this,"particleCount")),e.add(x.Particles,"radius",s.x,s.y,s.z).onChange(this.updateParticles.bind(this,"particleRadius")),e.add(x.Particles,"sides",a.x,a.y,a.z).onChange(this.updateParticles.bind(this,"particleSides")),e.add(x.Particles,"maxDistance",h.x,h.y,h.z).name("max. distance"),e.add(x.Particles,"maxVelocity",d.x,d.y,d.z).onFinishChange(this.updateParticles.bind(this,"particleVelocity")).name("max. velocity")}initialize(){this.updateParticles("particleCount")}render(t){t.save(),t.fillStyle=x.Scene.background,t.fillRect(0,0,this.width,this.height),t.restore();for(let e of this._particles){for(let i of this._particles){if(e===i)continue;let s=ut(e.x,e.y,i.x,i.y),a=e.radius+i.radius,d=1-(s-a)/x.Particles.maxDistance,g=G.fromHtmlString(x.Scene.foreground);g.w=m(d,0,1),t.beginPath(),t.moveTo(e.x,e.y),t.lineTo(i.x,i.y),t.closePath(),t.save(),t.lineWidth=3*d,t.strokeStyle=g.toString(),t.stroke(),t.restore()}t.save(),t.fillStyle=x.Scene.foreground,t.fill(e.path),t.restore()}}update(t){if(!this._updatingParticles)for(let e of this._particles){for(let i of this._particles)e!==i&&ut(e.x,e.y,i.x,i.y)-(e.radius+i.radius)<0&&pt.resolveCollision(e,i);(e.x<e.radius||e.x>this.width-e.radius)&&(e.x=m(e.x,e.radius,this.width-e.radius),e.velocity.x=-e.velocity.x),(e.y<e.radius||e.y>this.height-e.radius)&&(e.y=m(e.y,e.radius,this.height-e.radius),e.velocity.y=-e.velocity.y),e.x+=e.velocity.x*t,e.y+=e.velocity.y*t}}updateParticles(t){if(t==="particleCount"){this._updatingParticles=!0;const e=Math.abs(x.Particles.count-this._particles.length);if(x.Particles.count>this._particles.length){const i=G.transparent,s=x.Particles.radius,a=x.Particles.sides,h=x.Particles.maxVelocity;for(let d=0;d<e;d++){const g=X(s,this.width-s),y=X(s,this.height-s),b=new Vt(g,y,s,a,i);b.mass=1,b.velocity.x=H(-1,2)*h,b.velocity.y=H(-1,2)*h,this._particles.push(b)}}else if(x.Particles.count<this._particles.length)for(let i=0;i<e;i++){const s=this._particles.length-1;this._particles.splice(s,1)}}else{this._updatingParticles=!0;for(let e of this._particles){if(t==="particleRadius"){e.radius=x.Particles.radius;continue}if(t==="particleSides"){e.sides=x.Particles.sides;continue}if(t==="particleVelocity"){e.velocity.x=H(-1,2)*x.Particles.maxVelocity,e.velocity.y=H(-1,2)*x.Particles.maxVelocity;continue}}}this._updatingParticles=!1}}var x;(r=>{const i=class i{};i.count=100,i.maxDistance=150,i.maxVelocity=300,i.radius=10,i.sides=6;let t=i;r.Particles=t;const s=class s{};s.background="#ffffff",s.foreground="#000000";let e=s;r.Scene=e})(x||(x={}));const N=class N extends mt{constructor(){super(...arguments),this._assets=null,this._backgroundColors=[],this._backgroundController=null,this._mouse=new W(0,0),this._mouseDist=new W(0,0),this._mouseInit=new W(0,0),this._palette={},this._paletteColors=[],this._paletteController=null,this._paletteSourceController=null,this._particleFill=this.particleFill,this._particleStroke=N.DefaultParticleRender,this._particles=[],this._updatingParticles=!1}controller(t){this._paletteSourceController=t.add(f.Scene,"paletteSource",{}).onChange(this.updatePaletteSource.bind(this)).name("source"),this._paletteController=t.add(f.Scene,"palette",{}).onChange(this.updatePalette.bind(this)).name("palette");const e=t.addFolder("background");e.add(f.Scene,"usePaletteForBackground").onChange(this.updateBackgroundMode.bind(this,e)).name("use palette"),this._backgroundController=e.addColor(f.Scene,"background").name("color");const i=t.addFolder("colors"),s=new D(.25,.8,.01);i.add(f.Colors,"alphaBlended").onChange(this.updateParticles.bind(this,"colorAlpha")).name("use alpha"),i.add(f.Colors,"alpha",s.x,s.y,s.z).onChange(this.updateParticles.bind(this,"colorAlpha"));const a=t.addFolder("particles"),h=new D(1e3,1e4,1),d=new D(2,12,1),g=new D(10,200,1),y=new D(10,100,1),b=new D(200,1e3,1);a.add(f.Particles,"mode",["fill","stroke","fill+stroke","fill/stroke"]).onChange(this.updateParticleMode.bind(this)),a.add(f.Particles,"count",h.x,h.y,h.z).onChange(this.updateParticles.bind(this,"particleCount")),a.add(f.Particles,"sides",d.x,d.y,d.z).onChange(this.updateParticles.bind(this,"particleSides")),a.add(f.Particles,"maxVelocity",b.x,b.y,b.z).onChange(this.updateParticles.bind(this,"particleVelocity")).name("max. velocity");const v=a.addFolder("radius");v.add(f.Particles,"maxRadius",g.x,g.y,g.z).onChange(this.updateParticles.bind(this,"particleRadius")).name("max").listen(),v.add(f.Particles,"radiusGain",y.x,y.y,y.z).onChange(this.updateParticles.bind(this,"particleRadius")).name("gain").listen(),v.add(f.Particles,"radiusDecay",y.x,y.y,y.z).onChange(this.updateParticles.bind(this,"particleRadius")).name("decay").listen(),a.add(f.Particles,"resetRadius").name("reset radius");const C=t.addFolder("mouse"),L=new D(50,200,1),P=new D(.5,10,.1);C.add(f.Mouse,"follow"),C.add(f.Mouse,"radius",L.x,L.y,L.z).name("max. radius"),C.add(f.Mouse,"velocity",P.x,P.y,P.z).name("max. velocity")}initialize(){this._assets||(this._assets=gt.create("./assets/palette.json","./assets/palette.ladygaga.json","./assets/palette.taylorswift.json")),this._mouse.x=this.width/2,this._mouse.y=this.height/2}render(t){t.save(),t.fillStyle=f.Scene.background,t.fillRect(0,0,this.width,this.height),t.restore();for(let e of this._particles){const i=this._particles.indexOf(e);this._particleFill(t,e,i),this._particleStroke(t,e,i)}}update(t){if(this._assets&&this._assets.state==="ready"){this._assets.load(this.loaded.bind(this));return}if(!(this._assets&&this._assets.state==="loading")&&!this._updatingParticles){for(let e of this._particles)(e.x<e.radius||e.x>this.width-e.radius)&&(e.x=m(e.x,e.radius,this.width-e.radius),e.velocity.x=-e.velocity.x),(e.y<e.radius||e.y>this.height-e.radius)&&(e.y=m(e.y,e.radius,this.height-e.radius),e.velocity.y=-e.velocity.y),e.x+=e.velocity.x*t,e.y+=e.velocity.y*t,this.updateParticleRadius(e,t);this.updateMouse(t)}}loaded(t){if(this._assets&&t==="done"){let e=null;for(let i of this._assets.paths){const s=this._assets.get(i);if(!s||s==="")continue;const a={};for(let h of JSON.parse(s))a[h.name]=h.colors;i=i.replace("./assets/","").replace(".json",""),e=e||a,this._palette[i]=a}this._paletteSourceController&&this._paletteSourceController.options(this._palette).setValue(e),this.updateParticles("particleCount")}}particleFill(t,e,i){f.Particles.mode.indexOf("/")>0&&i%2!==0||(t.fillStyle=e.color.toString(),t.fill(e.path))}particleStroke(t,e,i){f.Particles.mode.indexOf("/")>0&&i%2===0||(t.lineJoin="round",t.lineWidth=3,t.strokeStyle=e.color.clone().toString(),t.stroke(e.path))}updateBackgroundMode(t,e){e?(this._backgroundController instanceof Dt&&(this._backgroundController.destroy(),this._backgroundController=null),this._backgroundController=t.add(f.Scene,"background",this._backgroundColors).name("color"),this._backgroundColors.length>0&&this._backgroundController.setValue(this._backgroundColors[0])):(this._backgroundController&&(this._backgroundController.destroy(),this._backgroundController=null),this._backgroundController=t.addColor(f.Scene,"background").name("color"))}updateMouse(t){f.Mouse.follow?(this._mouseInit.x=nt.x||this.width/2,this._mouseInit.y=nt.y||this.height/2):(this._mouseInit.x=this.width/2,this._mouseInit.y=this.height/2),this._mouseDist.x=this._mouseInit.x-this._mouse.x,this._mouseDist.y=this._mouseInit.y-this._mouse.y,this._mouse.x+=this._mouseDist.x*f.Mouse.velocity*t,this._mouse.y+=this._mouseDist.y*f.Mouse.velocity*t}updatePalette(t){this._paletteColors.splice(0,this._paletteColors.length),this._backgroundColors.splice(0,this._backgroundColors.length);for(let e of t){const i=G.fromVector3(e);this._paletteColors.push(i),this._backgroundColors.push(i.toString(!0))}this.updateParticles("colorPalette"),this._backgroundController instanceof Bt&&(this._backgroundController.options(this._backgroundColors),this._backgroundColors.length>0&&this._backgroundController.setValue(this._backgroundColors[0]))}updatePaletteSource(t){if(this._paletteController){let e=null;for(let i in t)e||(e=t[i]);this._paletteController.options(t).setValue(e)}}updateParticleColor(t){const e=zt(0,this._paletteColors.length),i=this._paletteColors[e].clone();i.w=f.Colors.alphaBlended?f.Colors.alpha:1,t.color=i}updateParticleMode(t){if(t==="fill"){this._particleFill=this.particleFill.bind(this),this._particleStroke=N.DefaultParticleRender;return}if(t==="stroke"){this._particleFill=N.DefaultParticleRender,this._particleStroke=this.particleStroke.bind(this);return}this._particleFill=this.particleFill.bind(this),this._particleStroke=this.particleStroke.bind(this)}updateParticleRadius(t,e){let i=ut(t.x,t.y,this._mouse.x,this._mouse.y),s=t.radius+f.Mouse.radius;i-s<0?t.radius+=f.Particles.radiusGain*e:t.radius-=f.Particles.radiusDecay*e,t.radius=m(t.radius,0,f.Particles.maxRadius)}updateParticles(t){if(t==="particleCount"){this._updatingParticles=!0;const e=Math.abs(this._particles.length-f.Particles.count);if(f.Particles.count>this._particles.length){const i=f.Particles.maxVelocity,s=f.Particles.sides;for(let a=0;a<e;a++){const h=X(0,this.width),d=X(0,this.height),g=new Vt(h,d,0,s,G.transparent);g.mass=1,g.velocity.x=H(-i,i),g.velocity.y=H(-i,i),this.updateParticleColor(g),this._particles.push(g)}}else if(f.Particles.count<this._particles.length)for(let i=0;i<e;i++){const s=zt(0,this._particles.length);this._particles.splice(s,1)}}else{this._updatingParticles=!0;const e=f.Particles.maxVelocity,i=f.Particles.sides;for(let s of this._particles){if(t==="colorAlpha"){s.color.w=f.Colors.alphaBlended?f.Colors.alpha:1;continue}if(t==="colorPalette"){this.updateParticleColor(s);continue}if(t==="particleVelocity"){s.velocity.x=H(-e,e),s.velocity.y=H(-e,e);continue}if(t==="particleSides"){s.sides=i;continue}}}this._updatingParticles=!1}};N.DefaultParticleRender=()=>{};let ft=N;var f;(r=>{const a=class a{};a.alpha=.7,a.alphaBlended=!0;let t=a;r.Colors=t;const h=class h{};h.follow=!1,h.radius=200,h.velocity=2.5;let e=h;r.Mouse=e;const d=class d{static resetRadius(){r.Particles.maxRadius=50,r.Particles.radiusGain=50,r.Particles.radiusDecay=50}};d.count=5e3,d.maxRadius=50,d.maxVelocity=1e3,d.mode="fill",d.radiusDecay=50,d.radiusGain=50,d.sides=6;let i=d;r.Particles=i;const g=class g{};g.background="#000000",g.usePaletteForBackground=!1;let s=g;r.Scene=s})(f||(f={}));const Lt=Object.freeze(Object.defineProperty({__proto__:null,ParticleScene1:ee,ParticleScene2:ft,TestScene:Qt},Symbol.toStringTag,{value:"Module"})),$=class ${static get scene(){return this._scene}static set scene(t){var e,i;if(this._scene&&this._scene!==t&&(this.destroySceneControlPanel(),this._scene.pause(),this._scene=null),t){const s=((e=this._canvas)==null?void 0:e.width)??window.innerWidth,a=((i=this._canvas)==null?void 0:i.height)??window.innerHeight;t.resize(s,a),t.initialize(),t.play()}this._scene=t,this.createSceneControlPanel()}static initialize(t){this.initializeCanvas(),this.setupEventHandlers(),this.initializeFpsmeter(),this.initializeControlPanel(),this.initializeInput()}static start(){this._running||(this._running=!0,requestAnimationFrame(this.mainLoop.bind(this)))}static createCanvasBuffer(){z.Graphics.buffer||(this._bufferCanvas=document.createElement("canvas"),this._bufferContext=this._bufferCanvas.getContext("2d"))}static createSceneControlPanel(){this._controlPanel&&(this._sceneControlPanel=this._controlPanel.addFolder("scene settings"),this._sceneControlPanel.open(),this._scene&&this._scene.constructor&&this._scene.controller(this._sceneControlPanel))}static destroyCanvasBuffer(){this._bufferCanvas&&(this._bufferCanvas=null,this._bufferContext=null)}static destroySceneControlPanel(){this._sceneControlPanel&&(this._sceneControlPanel.destroy(),this._sceneControlPanel=null)}static initializeCanvas(){let t=document.body.querySelector("canvas");t||(t=document.createElement("canvas"),t.style.imageRendering="pixelated",t.style.backgroundColor="black",t.style.position="fixed",t.style.zIndex="-1",t.style.left="0",t.style.top="0",document.body.appendChild(t)),this._canvas=t,this._context=this._canvas.getContext("2d"),this.createCanvasBuffer(),this.resize(window.innerWidth,window.innerHeight)}static initializeControlPanel(){try{this._controlPanel=new _t({title:"control panel"}),this._controlPanel.add(z.Debug,"visible").name("show debug"),this._controlPanel.add(z.Frame,"visible").onFinishChange(this.toggleFpsmeter.bind(this)).name("show fpsmeter").listen(),this._controlPanel.add(z.Frame,"fps",30,250,1).onFinishChange(this.setFixedStep.bind(this)).name("frame rate"),this._stageControlPanel=this._controlPanel.addFolder("stage").onFinishChange(this.save.bind(this)),this._stageControlPanel.add(z.Graphics,"buffer").onFinishChange(this.toggleCanvasBuffer.bind(this)).name("use buffer");let t={},e=null;for(let i in Lt){const s=Object.assign(Lt)[i],a=new s;t[a.displayTitle??i]=a,e??(e=a)}this._stageControlPanel.add(this,"scene",t).name("scene").listen(),this.scene=e}catch(t){console.error(t)}}static initializeFpsmeter(){const t={left:"20px",graph:1,decimals:0,theme:"transparent",toggleOn:void 0};this._fpsmeterBox=document.createElement("div"),this._fpsmeterBox.id="fpsmeter-box",this._fpsmeterBox.style.position="absolute",this._fpsmeterBox.style.top="0",this._fpsmeterBox.style.left="15px",this._fpsmeterBox.style.width="129px",this._fpsmeterBox.style.height="50px",this._fpsmeterBox.style.zIndex="9",this._fpsmeter=new FPSMeter(document.body,t),document.body.appendChild(this._fpsmeterBox),this.toggleFpsmeter(z.Frame.visible)}static initializeInput(){q.initialize(),nt.initialize()}static mainLoop(t){try{this._running&&(this.tickStart(),this.updateInput(t),this.update(t),this.tickEnd()),requestAnimationFrame(this.mainLoop.bind(this))}catch(e){console.error(e)}}static onFocus(t){if(this._scene){if(!this._sceneStateOnBlur||this._sceneStateOnBlur==="paused"){this._sceneStateOnBlur=null;return}this._scene.play(),this._sceneStateOnBlur=null}}static onLostFocus(t){if(this._scene&&!this._scene.running){this._sceneStateOnBlur="paused";return}}static onResize(t){const e=window.innerWidth,i=window.innerHeight;this.resize(e,i)}static render(){if(!this._scene)return;const t=z.Graphics.buffer?this._bufferContext:this._context;t&&(this._scene.render(t),z.Graphics.buffer&&this._context&&this._bufferCanvas&&this._context.drawImage(this._bufferCanvas,0,0,this._bufferCanvas.width,this._bufferCanvas.height))}static resize(t,e){this._canvas&&(this._canvas.width=t,this._canvas.height=e,this._canvas.style.width=t+"px",this._canvas.style.height=e+"px"),this._bufferCanvas&&(this._bufferCanvas.width=t,this._bufferCanvas.height=e,this._bufferCanvas.style.width=t+"px",this._bufferCanvas.style.height=e+"px"),this._scene&&this._scene.resize(t,e)}static save(){}static setFixedStep(t){this._fixedStep=1/t}static setupEventHandlers(){window.addEventListener("blur",this.onLostFocus.bind(this)),window.addEventListener("focus",this.onFocus.bind(this)),window.addEventListener("resize",this.onResize.bind(this))}static tickEnd(){z.Frame.visible&&this._fpsmeter&&this._fpsmeter.tick()}static tickStart(){z.Frame.visible&&this._fpsmeter&&this._fpsmeter.tickStart()}static toggleCanvasBuffer(t){t?this.createCanvasBuffer():this.destroyCanvasBuffer()}static toggleFpsmeter(t){!this._fpsmeter||!this._fpsmeterBox||(t?(this._fpsmeter.show(),this._fpsmeterBox.style.display="block"):(this._fpsmeter.hide(),this._fpsmeterBox.style.display="none"))}static toggleGui(){this._controlPanelVisible=!this._controlPanelVisible,this._controlPanel&&(this._controlPanelVisible?this._controlPanel.hide():this._controlPanel.show())}static toggleScene(){this._scene&&(this._scene.running?this._scene.pause():this._scene.play())}static update(t){let e=(t-this._time)/1e3;for(this._time=t,this._timeAcc+=e;this._timeAcc>=this._fixedStep;)this._timeAcc-=this._fixedStep,this._scene&&this._scene.running&&this._scene.update(this._fixedStep);this.render()}static updateInput(t){q.update(),nt.update(),q.trigger("control")&&this.toggleScene(),q.trigger("fps")&&(z.Frame.visible=!z.Frame.visible,this.toggleFpsmeter(z.Frame.visible)),q.trigger("gui")&&this.toggleGui()}};$._bufferCanvas=null,$._bufferContext=null,$._canvas=null,$._context=null,$._controlPanel=null,$._controlPanelVisible=!0,$._fixedStep=1/165,$._fpsmeter=null,$._fpsmeterBox=null,$._running=!1,$._scene=null,$._sceneControlPanel=null,$._stageControlPanel=null,$._time=0,$._timeAcc=0;let rt=$;var z;(r=>{const s=class s{};s.visible=!1;let t=s;r.Debug=t;const a=class a{};a.buffer=!1;let e=a;r.Graphics=e;const h=class h{};h.fps=165,h.visible=!1;let i=h;r.Frame=i})(z||(z={}));const j=class j{static get recording(){return this._media?this._media.state==="recording"||this._media.state==="paused":!1}static pause(){this._media&&this._media.state==="recording"&&this._media.pause()}static record(t){return this.recording?Promise.reject():(this._data=[],this._media=null,new Promise(this.execute.bind(this,t)))}static resume(){this._media&&this._media.state==="paused"&&this._media.resume()}static stop(){this._media&&this._media.state==="recording"&&this._media.stop()}static execute(t){let e=t.captureStream(60);this._media=new MediaRecorder(e,{mimeType:this._mediaType,audioBitsPerSecond:this._mediaAudioBps*1e5,videoBitsPerSecond:this._mediaVideoBps*1e6}),this._media.start(),this._media.ondataavailable=this.progress.bind(this),this._media.onstop=this.end.bind(this)}static end(){try{let t=new Blob(this._data,{type:this._mediaType}),e=URL.createObjectURL(t);this.resolve(e)}catch(t){this.reject(t)}}static progress(t){this._data.push(t.data)}static reject(t){console.error(t)}static resolve(t){window.open(t)}};j._data=[],j._media=null,j._mediaAudioBps=1.28,j._mediaType="video/mp4",j._mediaVideoBps=2.5;let Mt=j;(function(){rt.initialize(),rt.start()})();
