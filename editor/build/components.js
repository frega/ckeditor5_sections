/*!
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.SectionsEditor=e():t.SectionsEditor=e()}(window,function(){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=114)}({114:function(t,e,n){"use strict";n.r(e);var i=n(2),o=n.n(i);const r=new WeakMap,s=t=>"function"==typeof t&&r.has(t),a=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,l=(t,e,n=null,i=null)=>{let o=e;for(;o!==n;){const e=o.nextSibling;t.insertBefore(o,i),o=e}},c=(t,e,n=null)=>{let i=e;for(;i!==n;){const e=i.nextSibling;t.removeChild(i),i=e}},d={},h={},p=`{{lit-${String(Math.random()).slice(2)}}}`,u=`\x3c!--${p}--\x3e`,m=new RegExp(`${p}|${u}`),b="$lit$";class g{constructor(t,e){this.parts=[],this.element=e;let n=-1,i=0;const o=[],r=e=>{const s=e.content,a=document.createTreeWalker(s,133,null,!1);let l=0;for(;a.nextNode();){n++;const e=a.currentNode;if(1===e.nodeType){if(e.hasAttributes()){const o=e.attributes;let r=0;for(let t=0;t<o.length;t++)o[t].value.indexOf(p)>=0&&r++;for(;r-- >0;){const o=t.strings[i],r=y.exec(o)[2],s=r.toLowerCase()+b,a=e.getAttribute(s).split(m);this.parts.push({type:"attribute",index:n,name:r,strings:a}),e.removeAttribute(s),i+=a.length-1}}"TEMPLATE"===e.tagName&&r(e)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(p)>=0){const r=e.parentNode,s=t.split(m),a=s.length-1;for(let t=0;t<a;t++)r.insertBefore(""===s[t]?f():document.createTextNode(s[t]),e),this.parts.push({type:"node",index:++n});""===s[a]?(r.insertBefore(f(),e),o.push(e)):e.data=s[a],i+=a}}else if(8===e.nodeType)if(e.data===p){const t=e.parentNode;null!==e.previousSibling&&n!==l||(n++,t.insertBefore(f(),e)),l=n,this.parts.push({type:"node",index:n}),null===e.nextSibling?e.data="":(o.push(e),n--),i++}else{let t=-1;for(;-1!==(t=e.data.indexOf(p,t+1));)this.parts.push({type:"node",index:-1})}}};r(e);for(const t of o)t.parentNode.removeChild(t)}}const v=t=>-1!==t.index,f=()=>document.createComment(""),y=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class x{constructor(t,e,n){this._parts=[],this.template=t,this.processor=e,this.options=n}update(t){let e=0;for(const n of this._parts)void 0!==n&&n.setValue(t[e]),e++;for(const t of this._parts)void 0!==t&&t.commit()}_clone(){const t=a?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=this.template.parts;let n=0,i=0;const o=t=>{const r=document.createTreeWalker(t,133,null,!1);let s=r.nextNode();for(;n<e.length&&null!==s;){const t=e[n];if(v(t))if(i===t.index){if("node"===t.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(s.previousSibling),this._parts.push(t)}else this._parts.push(...this.processor.handleAttributeExpressions(s,t.name,t.strings,this.options));n++}else i++,"TEMPLATE"===s.nodeName&&o(s.content),s=r.nextNode();else this._parts.push(void 0),n++}};return o(t),a&&(document.adoptNode(t),customElements.upgrade(t)),t}}class _{constructor(t,e,n,i){this.strings=t,this.values=e,this.type=n,this.processor=i}getHTML(){const t=this.strings.length-1;let e="";for(let n=0;n<t;n++){const t=this.strings[n],i=y.exec(t);e+=i?t.substr(0,i.index)+i[1]+i[2]+b+i[3]+p:t+u}return e+this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}const k=t=>null===t||!("object"==typeof t||"function"==typeof t);class w{constructor(t,e,n){this.dirty=!0,this.element=t,this.name=e,this.strings=n,this.parts=[];for(let t=0;t<n.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new S(this)}_getValue(){const t=this.strings,e=t.length-1;let n="";for(let i=0;i<e;i++){n+=t[i];const e=this.parts[i];if(void 0!==e){const t=e.value;if(null!=t&&(Array.isArray(t)||"string"!=typeof t&&t[Symbol.iterator]))for(const e of t)n+="string"==typeof e?e:String(e);else n+="string"==typeof t?t:String(t)}}return n+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class S{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===d||k(t)&&t===this.value||(this.value=t,s(t)||(this.committer.dirty=!0))}commit(){for(;s(this.value);){const t=this.value;this.value=d,t(this)}this.value!==d&&this.committer.commit()}}class C{constructor(t){this.value=void 0,this._pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(f()),this.endNode=t.appendChild(f())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t._insert(this.startNode=f()),t._insert(this.endNode=f())}insertAfterPart(t){t._insert(this.startNode=f()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this._pendingValue=t}commit(){for(;s(this._pendingValue);){const t=this._pendingValue;this._pendingValue=d,t(this)}const t=this._pendingValue;t!==d&&(k(t)?t!==this.value&&this._commitText(t):t instanceof _?this._commitTemplateResult(t):t instanceof Node?this._commitNode(t):Array.isArray(t)||t[Symbol.iterator]?this._commitIterable(t):t===h?(this.value=h,this.clear()):this._commitText(t))}_insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}_commitNode(t){this.value!==t&&(this.clear(),this._insert(t),this.value=t)}_commitText(t){const e=this.startNode.nextSibling;t=null==t?"":t,e===this.endNode.previousSibling&&3===e.nodeType?e.data=t:this._commitNode(document.createTextNode("string"==typeof t?t:String(t))),this.value=t}_commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof x&&this.value.template===e)this.value.update(t.values);else{const n=new x(e,t.processor,this.options),i=n._clone();n.update(t.values),this._commitNode(i),this.value=n}}_commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let n,i=0;for(const o of t)void 0===(n=e[i])&&(n=new C(this.options),e.push(n),0===i?n.appendIntoPart(this):n.insertAfterPart(e[i-1])),n.setValue(o),n.commit(),i++;i<e.length&&(e.length=i,this.clear(n&&n.endNode))}clear(t=this.startNode){c(this.startNode.parentNode,t.nextSibling,this.endNode)}}class E{constructor(t,e,n){if(this.value=void 0,this._pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=n}setValue(t){this._pendingValue=t}commit(){for(;s(this._pendingValue);){const t=this._pendingValue;this._pendingValue=d,t(this)}if(this._pendingValue===d)return;const t=!!this._pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)),this.value=t,this._pendingValue=d}}class $ extends w{constructor(t,e,n){super(t,e,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new I(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class I extends S{}let T=!1;try{const t={get capture(){return T=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class P{constructor(t,e,n){this.value=void 0,this._pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=n,this._boundHandleEvent=(t=>this.handleEvent(t))}setValue(t){this._pendingValue=t}commit(){for(;s(this._pendingValue);){const t=this._pendingValue;this._pendingValue=d,t(this)}if(this._pendingValue===d)return;const t=this._pendingValue,e=this.value,n=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),i=null!=t&&(null==e||n);n&&this.element.removeEventListener(this.eventName,this._boundHandleEvent,this._options),i&&(this._options=z(t),this.element.addEventListener(this.eventName,this._boundHandleEvent,this._options)),this.value=t,this._pendingValue=d}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const z=t=>t&&(T?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);const A=new class{handleAttributeExpressions(t,e,n,i){const o=e[0];return"."===o?new $(t,e.slice(1),n).parts:"@"===o?[new P(t,e.slice(1),i.eventContext)]:"?"===o?[new E(t,e.slice(1),n)]:new w(t,e,n).parts}handleTextExpression(t){return new C(t)}};function H(t){let e=M.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},M.set(t.type,e));let n=e.stringsArray.get(t.strings);if(void 0!==n)return n;const i=t.strings.join(p);return void 0===(n=e.keyString.get(i))&&(n=new g(t,t.getTemplateElement()),e.keyString.set(i,n)),e.stringsArray.set(t.strings,n),n}const M=new Map,O=new WeakMap,N=(t,e,n)=>{let i=O.get(e);void 0===i&&(c(e,e.firstChild),O.set(e,i=new C(Object.assign({templateFactory:H},n))),i.appendInto(e)),i.setValue(t),i.commit()};(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.0.0");const L=(t,...e)=>new _(t,e,"html",A),V=(t,...e)=>new class extends _{getHTML(){return`<svg>${super.getHTML()}</svg>`}getTemplateElement(){const t=super.getTemplateElement(),e=t.content,n=e.firstChild;return e.removeChild(n),l(e,n.firstChild),t}}(t,e,"svg",A),B=133;function D(t,e){const{element:{content:n},parts:i}=t,o=document.createTreeWalker(n,B,null,!1);let r=U(i),s=i[r],a=-1,l=0;const c=[];let d=null;for(;o.nextNode();){a++;const t=o.currentNode;for(t.previousSibling===d&&(d=null),e.has(t)&&(c.push(t),null===d&&(d=t)),null!==d&&l++;void 0!==s&&s.index===a;)s.index=null!==d?-1:s.index-l,s=i[r=U(i,r)]}c.forEach(t=>t.parentNode.removeChild(t))}const R=t=>{let e=11===t.nodeType?0:1;const n=document.createTreeWalker(t,B,null,!1);for(;n.nextNode();)e++;return e},U=(t,e=-1)=>{for(let n=e+1;n<t.length;n++){const e=t[n];if(v(e))return n}return-1};const j=(t,e)=>`${t}--${e}`;let F=!0;void 0===window.ShadyCSS?F=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected.Please update to at least @webcomponents/webcomponentsjs@2.0.2 and@webcomponents/shadycss@1.3.1."),F=!1);const q=["html","svg"],Z=new Set,W=(t,e,n)=>{Z.add(n);const i=t.querySelectorAll("style");if(0===i.length)return void window.ShadyCSS.prepareTemplateStyles(e.element,n);const o=document.createElement("style");for(let t=0;t<i.length;t++){const e=i[t];e.parentNode.removeChild(e),o.textContent+=e.textContent}if((t=>{q.forEach(e=>{const n=M.get(j(e,t));void 0!==n&&n.keyString.forEach(t=>{const{element:{content:e}}=t,n=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{n.add(t)}),D(t,n)})})})(n),function(t,e,n=null){const{element:{content:i},parts:o}=t;if(null===n||void 0===n)return void i.appendChild(e);const r=document.createTreeWalker(i,B,null,!1);let s=U(o),a=0,l=-1;for(;r.nextNode();)for(l++,r.currentNode===n&&(a=R(e),n.parentNode.insertBefore(e,n));-1!==s&&o[s].index===l;){if(a>0){for(;-1!==s;)o[s].index+=a,s=U(o,s);return}s=U(o,s)}}(e,o,e.element.content.firstChild),window.ShadyCSS.prepareTemplateStyles(e.element,n),window.ShadyCSS.nativeShadow){const n=e.element.content.querySelector("style");t.insertBefore(n.cloneNode(!0),t.firstChild)}else{e.element.content.insertBefore(o,e.element.content.firstChild);const t=new Set;t.add(o),D(e,t)}};window.JSCompiler_renameProperty=((t,e)=>t);const J={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},X=(t,e)=>e!==t&&(e==e||t==t),Y={attribute:!0,type:String,converter:J,reflect:!1,hasChanged:X},G=Promise.resolve(!0),K=1,Q=4,tt=8,et=16,nt=32;class it extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=G,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,n)=>{const i=this._attributeNameForProperty(n,e);void 0!==i&&(this._attributeToPropertyMap.set(i,n),t.push(i))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=Y){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const n="symbol"==typeof t?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{get(){return this[n]},set(e){const i=this[t];this[n]=e,this.requestUpdate(t,i)},configurable:!0,enumerable:!0})}static finalize(){if(this.hasOwnProperty(JSCompiler_renameProperty("finalized",this))&&this.finalized)return;const t=Object.getPrototypeOf(this);if("function"==typeof t.finalize&&t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const n of e)this.createProperty(n,t[n])}}static _attributeNameForProperty(t,e){const n=e.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,n=X){return n(t,e)}static _propertyValueFromAttribute(t,e){const n=e.type,i=e.converter||J,o="function"==typeof i?i:i.fromAttribute;return o?o(t,n):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const n=e.type,i=e.converter;return(i&&i.toAttribute||J.toAttribute)(t,n)}initialize(){this._saveInstanceProperties()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|nt,this._hasConnectedResolver?(this._hasConnectedResolver(),this._hasConnectedResolver=void 0):this.requestUpdate()}disconnectedCallback(){}attributeChangedCallback(t,e,n){e!==n&&this._attributeToProperty(t,n)}_propertyToAttribute(t,e,n=Y){const i=this.constructor,o=i._attributeNameForProperty(t,n);if(void 0!==o){const t=i._propertyValueToAttribute(e,n);if(void 0===t)return;this._updateState=this._updateState|tt,null==t?this.removeAttribute(o):this.setAttribute(o,t),this._updateState=this._updateState&~tt}}_attributeToProperty(t,e){if(this._updateState&tt)return;const n=this.constructor,i=n._attributeToPropertyMap.get(t);if(void 0!==i){const t=n._classProperties.get(i)||Y;this._updateState=this._updateState|et,this[i]=n._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~et}}requestUpdate(t,e){let n=!0;if(void 0!==t&&!this._changedProperties.has(t)){const i=this.constructor,o=i._classProperties.get(t)||Y;i._valueHasChanged(this[t],e,o.hasChanged)?(this._changedProperties.set(t,e),!0!==o.reflect||this._updateState&et||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,o))):n=!1}return!this._hasRequestedUpdate&&n&&this._enqueueUpdate(),this.updateComplete}async _enqueueUpdate(){let t;this._updateState=this._updateState|Q;const e=this._updatePromise;this._updatePromise=new Promise(e=>t=e),await e,this._hasConnected||await new Promise(t=>this._hasConnectedResolver=t);const n=this.performUpdate();null!=n&&"function"==typeof n.then&&await n,t(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&nt}get _hasRequestedUpdate(){return this._updateState&Q}get hasUpdated(){return this._updateState&K}performUpdate(){if(this._instanceProperties&&this._applyInstanceProperties(),this.shouldUpdate(this._changedProperties)){const t=this._changedProperties;this.update(t),this._markUpdated(),this._updateState&K||(this._updateState=this._updateState|K,this.firstUpdated(t)),this.updated(t)}else this._markUpdated()}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~Q}get updateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0)}updated(t){}firstUpdated(t){}}it.finalized=!0;st((t,e)=>t.querySelector(e)),st((t,e)=>t.querySelectorAll(e));const ot=(t,e,n)=>{Object.defineProperty(e,n,t)},rt=(t,e)=>({kind:"method",placement:"prototype",key:e.key,descriptor:t});function st(t){return e=>(n,i)=>{const o={get(){return t(this.renderRoot,e)},enumerable:!0,configurable:!0};return void 0!==i?ot(o,n,i):rt(o,n)}}const at="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,lt=Symbol();class ct{constructor(t,e){if(e!==lt)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(at?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const dt=(t,...e)=>{const n=e.reduce((e,n,i)=>e+(t=>{if(t instanceof ct)return t.cssText;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(n)+t[i+1],t[0]);return new ct(n,lt)};(window.litElementVersions||(window.litElementVersions=[])).push("2.0.1");const ht=t=>t.flat?t.flat(1/0):function t(e,n=[]){for(let i=0,o=e.length;i<o;i++){const o=e[i];Array.isArray(o)?t(o,n):n.push(o)}return n}(t);class pt extends it{static finalize(){super.finalize(),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const t=this.styles,e=[];if(Array.isArray(t)){ht(t).reduceRight((t,e)=>(t.add(e),t),new Set).forEach(t=>e.unshift(t))}else t&&e.push(t);return e}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?at?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){super.update(t);const e=this.render();e instanceof _&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){}}pt.finalized=!0,pt.render=((t,e,n)=>{const i=n.scopeName,o=O.has(e),r=e instanceof ShadowRoot&&F&&t instanceof _,s=r&&!Z.has(i),a=s?document.createDocumentFragment():e;if(N(t,a,Object.assign({templateFactory:(t=>e=>{const n=j(e.type,t);let i=M.get(n);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},M.set(n,i));let o=i.stringsArray.get(e.strings);if(void 0!==o)return o;const r=e.strings.join(p);if(void 0===(o=i.keyString.get(r))){const n=e.getTemplateElement();F&&window.ShadyCSS.prepareTemplateDom(n,t),o=new g(e,n),i.keyString.set(r,o)}return i.stringsArray.set(e.strings,o),o})(i)},n)),s){const t=O.get(a);O.delete(a),t.value instanceof x&&W(a,t.value.template,i),c(e,e.firstChild),e.appendChild(a),O.set(e,t)}!o&&r&&window.ShadyCSS.styleElement(e.host)});var ut=n(38),mt=n.n(ut),bt=n(39),gt=n.n(bt),vt=n(40),ft=n.n(vt),yt=n(41),xt=n.n(yt),_t=n(42),kt=n.n(_t),wt=n(43),St=n.n(wt),Ct=n(44),Et=n.n(Ct),$t=n(45),It=n.n($t),Tt=n(46),Pt=n.n(Tt);const zt="ckEditorOperation";function At(t){return new CustomEvent(zt,{detail:t})}class Ht{constructor(t){this.element=t,this.operations=[]}insert(t,e,n,i=null,o=null){this.element.dispatchEvent(At({operation:"insert",section:t,parent:e,position:n,reference:i,attributes:o}))}move(t,e,n,i){this.element.dispatchEvent(At({operation:"move",parent:t,position:e,target:n,reference:i}))}replace(t,e){this.element.dispatchEvent(At({operation:"replace",section:t,target:e}))}remove(t){this.element.dispatchEvent(At({operation:"remove",target:t}))}attributes(t,e){this.element.dispatchEvent(At({operation:"attributes",target:t,attr:e}))}removeAttribute(t,e){this.element.dispatchEvent(At({operation:"removeAttribute",target:t,key:e}))}swap(t,e){this.element.dispatchEvent(At({operation:"swap",element:t,target:e}))}}class Mt extends CustomEvent{constructor(t,e,n){super(`ck-editor:${t}`,{detail:e,bubbles:!0,composed:!0}),this.callback=n}respond(t){this.callback(t)}}class Ot extends pt{constructor(){super(),this.inEditor=!1}connectedCallback(){this.inEditor=!!this.closest(".ck-editor"),super.connectedCallback()}modifyDocument(t){const e=new Ht(this);t(e),At({operation:"batch",operations:e.operations})}requestInformation(t,e,n){this.dispatchEvent(new Mt(t,e,n))}}const Nt={close:gt.a,formatted_text:xt.a,carousel:ft.a,image:kt.a,misc:St.a,text:Et.a,text_media:It.a,video:Pt.a};function Lt(t){return t.svgIcon?V([t.svgIcon]):Nt[t.icon]?V([Nt[t.icon]]):V([Nt.misc])}o.a.customElements.define("ck-placeholder",class extends Ot{static get properties(){return{collapsed:{type:Boolean},closed:{type:Boolean},isOpen:{type:Boolean},isExpanded:{type:Boolean},sections:{type:String},availableSections:{type:Array},labelOpen:{type:String},labelExpand:{type:String}}}constructor(){super(),this.closed=!1,this.collapsed=!1,this.labelOpen="Add",this.labelExpand="Insert",this.sections=[],this.availableSections=[],this.isOpen=!1,this.isExpanded=!1}connectedCallback(){super.connectedCallback(),this.requestInformation("available-sections",{},t=>{this.availableSections=t})}getSections(){return this.availableSections.filter(t=>this.sections.split(" ").includes(t.id))}render(){return L`
      <style>
        ${mt.a}
      </style>
      ${!this.collapsed||this.isExpanded?L`
            <div class="ck-placeholder__add-wrapper">
              ${this.closed?L`
                    <button
                      @click="${this.clickOpenHandler}"
                      type="button"
                      class="normalize-button ck-placeholder__add-button"
                    >
                      ${this.labelOpen}
                    </button>
                  `:null}
              ${!this.closed||this.isOpen?L`
                    <ul class="normalize-list ck-placeholder__sections-list">
                      ${this.getSections().map(t=>L`
                          <li class="ck-placeholder__section-item">
                            <button
                              @click="${e=>this.clickSectionHandler(e,t.id)}"
                              type="button"
                              class="normalize-button ck-placeholder__section-button"
                            >
                              <div class="ck-placeholder__icon-wrapper">
                                ${Lt(t)}
                              </div>
                              ${t.label}
                            </button>
                          </li>
                        `)}
                    </ul>
                    ${this.isOpen?L`
                          <button
                            @click="${this.clickCloseHandler}"
                            type="button"
                            class="normalize-button ck-placeholder__close-button"
                          >
                            <div class="ck-placeholder__icon-wrapper">
                              ${Lt({icon:"close"})}
                            </div>
                            <span class="ck-placeholder__close-button-label"
                              >Close</span
                            >
                          </button>
                        `:null}
                  `:""}
            </div>
          `:L`
            <div class="ck-placeholder__insert-wrapper">
              <button
                @click="${this.clickExpandHandler}"
                type="button"
                class="normalize-button ck-placeholder__insert-button"
              >
                ${this.labelExpand}
              </button>
            </div>
          `}
    `}clickOpenHandler(){this.isOpen=!this.isOpen}clickExpandHandler(){this.isExpanded=!this.isExpanded}clickCloseHandler(){this.isOpen=!1}clickSectionHandler(t,e){this.modifyDocument(t=>t.replace(e,this)),this.isExpanded=!1}});o.a.customElements.define("ck-container",class extends Ot{static get properties(){return{sections:{type:String,attribute:"ck-contains"},numberOfChildren:{type:Number},max:{type:Number,attribute:"ck-max"},min:{type:Number,attribute:"ck-min"}}}constructor(){super(),this.observer=null,this.observer=new MutationObserver(()=>this.processChildren()),this.observer.observe(this,{attributes:!1,childList:!0,subtree:!1})}firstUpdated(){this.processChildren()}connectedCallback(){super.connectedCallback(),this.processChildren()}processChildren(){if(this.numberOfChildren=Array.from(this.children).filter(t=>"BR"!==t.nodeName).length,this.max||(this.max=0),this.min||(this.min=0),this.numberOfChildren>=this.min)Array.from(this.children).forEach((t,e)=>{t.dispatchEvent(new CustomEvent("containerUpdate",{detail:{inContainer:!0,containerSections:this.sections,containerIndex:e,containerMax:this.max,containerItems:this.numberOfChildren||0}}))});else{const t=this.sections.split(" ");if(1===t.length){const e=t[0];this.modifyDocument(t=>{for(let n=this.numberOfChildren;n<this.min;n+=1)t.insert(e,this,"end")})}}}render(){return L`
      <div class="container"><slot></slot></div>
      ${this.inEditor&&(this.numberOfChildren<this.max||0===this.max)?L`
              <ck-placeholder
                @ckEditorOperation="${this.appendHandler}"
                closed="true"
                sections="${this.sections}"
              >
              </ck-placeholder>
            `:null}
      </ck-placeholder>
    `}appendHandler(t){this.modifyDocument(e=>e.insert(t.detail.section,this,"end"))}});const Vt=V`
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <g id="baseline-arrow_back-24px" transform="translate(24) rotate(90)">
    <path id="Path_91" data-name="Path 91" d="M20,11H7.83l5.59-5.59L12,4,4,12l8,8,1.41-1.41L7.83,13H20Z" fill="#fff"/>
  </g>
</svg>
`,Bt=V`
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <g id="baseline-arrow_forward-24px_1_" data-name="baseline-arrow_forward-24px (1)" transform="translate(24) rotate(90)">
    <path id="Path_93" data-name="Path 93" d="M12,4,10.59,5.41,16.17,11H4v2H16.17l-5.58,5.59L12,20l8-8Z" fill="#fff"/>
  </g>
</svg>
`,Dt=V`
<svg id="icon_delete" data-name="icon delete" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path id="Path_84" data-name="Path 84" d="M5.889,17.222A1.783,1.783,0,0,0,7.667,19h7.111a1.783,1.783,0,0,0,1.778-1.778V6.556H5.889ZM7.667,8.333h7.111v8.889H7.667Zm6.667-4.444L13.444,3H9l-.889.889H5V5.667H17.444V3.889Z" transform="translate(1 1)" fill="#fff"/>
</svg>
`,Rt=V`
<svg id="icon_more_vertical" data-name="icon more vertical" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path id="Path_103" data-name="Path 103" d="M12,8a2,2,0,1,0-2-2A2.006,2.006,0,0,0,12,8Zm0,2a2,2,0,1,0,2,2A2.006,2.006,0,0,0,12,10Zm0,6a2,2,0,1,0,2,2A2.006,2.006,0,0,0,12,16Z" fill="#fff"/>
</svg>
`;class Ut extends Ot{static get properties(){return{added:{type:Boolean},removed:{type:Boolean},inContainer:{type:Boolean},containerIndex:{type:Number},containerMax:{type:Number},containerItems:{type:Number},containerSections:{type:String},isHovered:{type:Boolean}}}constructor(){super(),this.added=!1,this.removed=!1,this.inContainer=!1,this.containerIndex=0,this.containerItems=0,this.containerSections=!1,this.addEventListener("containerUpdate",t=>{t.stopImmediatePropagation(),t.stopPropagation(),t.preventDefault(),this.containerUpdate(t)})}connectedCallback(){super.connectedCallback()}handleAccept(){this.added?this.modifyDocument(t=>t.removeAttribute(this,"added")):this.modifyDocument(t=>t.remove(this))}handleDecline(){this.removed?this.modifyDocument(t=>t.removeAttribute(this,"removed")):this.modifyDocument(t=>t.remove(this))}get containerFirst(){return 0===this.containerIndex}get containerLast(){return this.containerIndex===this.containerItems-1}containerUpdate({detail:{inContainer:t,containerSections:e,containerIndex:n,containerMax:i,containerItems:o}}){this.inContainer=t,this.containerSections=e,this.containerIndex=n,this.containerMax=i,this.containerItems=o}upHandler(){if(!this.containerFirst){const t=o.a.window.scrollY+this.parentElement.children[this.containerIndex-1].offsetTop-this.offsetTop;o.a.scrollTo(0,t),this.modifyDocument(t=>t.move(this.parentElement,"before",this.containerIndex,this.containerIndex-1))}}downHandler(){if(!this.containerLast){const t=o.a.scrollY+(this.containerIndex<this.containerItems-2?this.parentElement.children[this.containerIndex+2].offsetTop-this.parentElement.children[this.containerIndex+1].offsetTop:this.parentElement.children[this.containerIndex+1].offsetHeight);o.a.scrollTo(0,t),this.modifyDocument(t=>t.move(this.parentElement,"after",this.containerIndex,this.containerIndex+1))}}removeHandler(){this.modifyDocument(t=>t.remove(this))}insertHandler(t){this.modifyDocument(e=>e.insert(t.detail.section,this.parentElement,"before",this.containerIndex))}render(){const t=L`
      <button
        class="up${this.containerFirst?" disabled":""}"
        @click="${()=>this.upHandler()}"
      >
        ${Vt}
      </button>
    `,e=L`
      <button
        class="up${this.containerLast?" disabled":""}"
        @click="${()=>this.downHandler()}"
      >
        ${Bt}
      </button>
    `;return L`
      <div class="${this.isHovered?"hovered":""}">
        ${this.inContainer?L`
              ${this.containerItems<this.containerMax||0===this.containerMax?L`
                    <ck-placeholder
                      collapsed="true"
                      @ckEditorOperation="${t=>this.insertHandler(t)}"
                      sections="${this.containerSections}"
                    ></ck-placeholder>
                  `:null}
              ${this.added||this.removed?null:L`
                    <div class="controls">
                      ${this.containerFirst?null:t}
                      ${this.containerLast?null:e}
                      <button
                        class="remove"
                        @click="${()=>this.removeHandler()}"
                      >
                        ${Dt}
                      </button>
                      <button class="configure disabled">
                        ${Rt}
                      </button>
                    </div>
                  `}
            `:null}
        <div class="${this.inContainer?"item":""}">
          ${this.added||this.removed?L`
                <div class="overlay ${this.added?"added":"removed"}">
                  <slot></slot>
                  <div class="overlay__background">
                    <div class="actions">
                      <button
                        class="accept"
                        @click=${this.handleAccept.bind(this)}
                      >
                        Accept
                      </button>
                      <button
                        class="decline"
                        @click=${this.handleDecline.bind(this)}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              `:L`
                <slot></slot>
              `}
        </div>
      </div>
    `}}Ut.styles=dt`
  :host {
    --button-size: 3em;
    --button-background-color: black;
    --button-foreground-color: white;
    --outline-color: #004adc;
    --color-light-green: rgba(91, 200, 156, 0.3);
    --color-light-red: rgba(215, 34, 34, 0.3);
    --color-green: #5bc89c;
    --color-red: #d72222;
    --highlight-padding: 0px;

    position: relative;
    display: block;
  }

  .overlay {
    position: relative;
  }

  .overlay.removed {
  }

  .overlay__background {
    position: absolute;
    border: 2px solid var(--color-green);
    top: calc(var(--highlight-padding) * -1);
    left: calc(var(--highlight-padding) * -1);
    bottom: calc(var(--highlight-padding) * -1);
    right: calc(var(--highlight-padding) * -1);
    background: var(--color-light-green);
    z-index: 5;
  }

  .removed .overlay__background {
    background: var(--color-light-red);
    border: 2px solid var(--color-red);
  }

  .actions {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 200px;
    height: 20px;
    margin: auto;
  }

  .overlay:hover .actions {
    visibility: visible;
    opacity: 1;
    transition: visibility 0.35s linear, opacity 0.35s;
  }

  button {
    border: none;
    color: white;
    cursor: pointer;
    font-family: inherit;
    padding: 5px 10px;
  }

  button.accept {
    background-color: var(--color-green);
    margin-right: 20px;
  }

  button.decline {
    background-color: var(--color-red);
  }

  .controls {
    z-index: 1;
    position: absolute;
    right: 0;
    display: flex;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  /* TODO: Decide if we need a hovered class or :hover is enough. */
  :hover .item {
    outline-style: solid;
    outline-width: 2px;
    outline-color: var(--outline-color);
  }

  /* TODO: Decide if we need a hovered class or :hover is enough. */
  :hover .controls {
    opacity: 1;
  }

  .controls button {
    border: none;
    background: var(--button-background-color);
    width: var(--button-size);
    height: var(--button-size);
    padding: 2px;
    display: flex;
    cursor: pointer;
  }

  svg {
    width: 100%;
  }

  svg * {
    fill: var(--button-foreground-color);
  }

  .disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: auto;
  }
`,o.a.customElements.define("ck-section",Ut);var jt=n(47),Ft=n.n(jt),qt=n(48),Zt=n.n(qt),Wt=n(49),Jt=n.n(Wt),Xt=n(50),Yt=n.n(Xt);o.a.customElements.define("ck-gallery",class extends Ot{static get properties(){return{items:Array,currentItem:{type:Number,attribute:"ck-current-item"},numberOfChildren:{type:Number},maxItems:{type:Number,attribute:"ck-max"},sections:{type:String,attribute:"ck-contains"}}}constructor(){super(),this.items=[],this.currentItem=0}connectedCallback(){super.connectedCallback(),this.shadowRoot.addEventListener("slotchange",()=>{this.numberOfChildren=Array.from(this.children).filter(t=>"BR"!==t.nodeName).length,this.items=Array.from(this.children).filter(t=>"BR"!==t.nodeName).map((t,e)=>({title:e+1,index:e}))}),this.numberOfChildren=Array.from(this.children).filter(t=>"BR"!==t.nodeName).length,this.maxItems=this.maxItems||0,this.items=Array.from(this.children).filter(t=>"BR"!==t.nodeName).map((t,e)=>({title:e+1,index:e})),this.setGalleryItem(this.currentItem)}render(){return L`
      <style>
        ${Ft.a}
      </style>

      <div class="ck-gallery">
        <div
          class="ck-gallery__rail"
          style="transform: translateX(${-100*this.currentItem}%)"
        >
          <slot></slot>
          ${this.numberOfChildren<this.maxItems||0===this.maxItems?L`
                <ck-placeholder
                  @ckEditorOperation="${this.appendHandler}"
                  sections=${this.sections}
                ></ck-placeholder>
              `:null}
        </div>

        <div class="ck-gallery__controls">
          <div class="ck-gallery__pager">
            <div class="ck-gallery__dots">
              ${this.items.map(t=>this.button(t))}
              ${this.inEditor&&(this.numberOfChildren<this.maxItems||0===this.maxItems)?L`
                    <span
                      @click="${()=>this.addItem()}"
                      class="ck-gallery__add ${this.currentItem===this.numberOfChildren?"active":"inactive"}"
                    >
                      +
                    </span>
                  `:null}
            </div>
          </div>
          ${this.inEditor?L`
                <div class="ck-gallery__actions">
                  <span>Edit active element</span>
                  <div class="ck-gallery__icons">
                    <div
                      @click="${()=>this.moveItem("left")}"
                      data-tooltip="Move element to the left"
                      class="ck-gallery__icon ck-gallery__icon--arrow-left ${0===this.currentItem||this.currentItem===this.items.length?"disabled":""}"
                    >
                      ${V([Zt.a])}
                    </div>
                    <div
                      @click="${()=>this.moveItem("right")}"
                      data-tooltip="Move element to the right"
                      class="ck-gallery__icon ck-gallery__icon--arrow-right ${this.currentItem>=this.items.length-1?"disabled":""}"
                    >
                      ${V([Jt.a])}
                    </div>
                    <div
                      @click="${()=>this.deleteItem()}"
                      data-tooltip="Delete slide"
                      class="ck-gallery__icon ck-gallery__icon--arrow-trash ${0===this.items.length||this.currentItem===this.numberOfChildren?"disabled":""}"
                    >
                      ${V([Yt.a])}
                    </div>
                  </div>
                </div>
              `:null}
        </div>
      </div>
    `}appendHandler(t){this.modifyDocument(e=>e.insert(t.detail.section,this,"end"))}addItem(){this.currentItem=this.items.length}deleteItem(){this.currentItem!==this.numberOfChildren&&this.modifyDocument(t=>t.remove(this.children[this.currentItem]))}moveItem(t){"left"===t&&this.currentItem>0&&this.currentItem<this.numberOfChildren&&(this.modifyDocument(t=>t.move(this,"before",this.currentItem,this.currentItem-1)),this.currentItem-=1),"right"===t&&this.currentItem<this.numberOfChildren-1&&(this.currentItem<this.numberOfChildren-2?this.modifyDocument(t=>t.move(this,"before",this.currentItem,this.currentItem+2)):this.modifyDocument(t=>t.move(this,"end",this.currentItem)),this.currentItem+=1)}button(t){return L`
      <span
        @click="${()=>this.setGalleryItem(t.index)}"
        class="ck-gallery__dot-item ${this.currentItem===t.index?"active":""}"
        >${t.title}</span
      >
    `}setGalleryItem(t){this.children.length<=t||!this.children[t]||(this.currentItem=t)}});var Gt=n(51),Kt=n.n(Gt),Qt=n(52),te=n.n(Qt),ee=n(53),ne=n.n(ee);o.a.customElements.define("ck-tabs",class extends Ot{static get properties(){return{sections:{type:String,attribute:"ck-contains"},items:Array,numberOfChildren:Number,currentTab:Number,modalIsOpen:Boolean}}constructor(){super(),this.items=[],this.currentTab=0,this.modalIsOpen=!1,this.section=null}connectedCallback(){super.connectedCallback(),this.ownerDocument.body.querySelector("#ck-tabs-modal")?this.modal=this.ownerDocument.body.querySelector("#ck-tabs-modal"):(this.modal=this.ownerDocument.createElement("div"),this.modal.setAttribute("id","ck-tabs-modal"),this.ownerDocument.body.appendChild(this.modal)),new MutationObserver(()=>this.processItems()).observe(this,{attributes:!0,childList:!0,subtree:!0}),this.processItems(),this.numberOfChildren=Array.from(this.children).filter(t=>"BR"!==t.nodeName).length,this.numberOfChildren>0&&(this.currentTab=0)}processItems(){this.items=Array.from(this.children).filter(t=>"BR"!==t.nodeName).map((t,e)=>({title:(t.dataset.titleAttribute?t.getAttribute(t.dataset.titleAttribute):null)||t.dataset.tabTitle||"Untitled Tab",default:t.dataset.defaultTab,index:e})),this.setTabsItem(this.currentTab),this.numberOfChildren=Array.from(this.children).filter(t=>"BR"!==t.nodeName).length}openModal(){this.modalIsOpen=!0,N(this.renderModal(),this.modal)}closeModal(){this.modalIsOpen=!1,N(this.renderModal(),this.modal)}renderModal(){return L`
      <ck-tabs-modal
        @eventCloseModal="${()=>{this.closeModal()}}"
        @eventSaveModal="${t=>{this.updateItem(t.detail)}}"
        @deleteTab="${()=>this.deleteItem()}"
        currentTitle="${this.items[this.currentTab].title}"
        currentDefault="${this.items[this.currentTab].default}"
        currentIndex="${this.currentTab}"
        data-visible="${this.modalIsOpen?"true":"false"}"
      >
      </ck-tabs-modal>
    `}appendHandler(t){this.modifyDocument(e=>e.insert(t.detail.section,this,"end"))}render(){return L`
      <style>
        ::slotted(*) {
          display: none !important;
        }
        ::slotted(:nth-child(${this.currentTab+1})) {
          display: block !important;
        }
        ${Kt.a}
      </style>
      <div class="ck-tabs">
        <div class="ck-tabs__header">
          <ul class="ck-tabs__header-tab-list">
            ${this.items.map(t=>this.tabTitle(t))}
            ${this.inEditor?L`
                  <li
                    @click="${()=>this.addItem()}"
                    class="ck-tabs__header-tab-add"
                  ></li>
                `:null}
          </ul>
        </div>
        <div class="ck-tabs__content">
          <slot></slot>
          ${this.inEditor&&this.currentTab===this.numberOfChildren?L`
                <ck-placeholder
                  @ckEditorOperation="${this.appendHandler}"
                  sections="${this.sections}"
                >
                </ck-placeholder>
              `:null}
        </div>
      </div>
    `}tabTitle(t){return L`
      <li
        @click="${()=>this.setTabsItem(t.index)}"
        class="ck-tabs__header-tab-item ${this.currentTab===t.index?"active":""}
        ${"true"===t.default?"default":""}"
      >
        ${t.title}
        ${this.inEditor?L`
              <span
                @click="${()=>this.openModal(t)}"
                class="ck-tabs__header-icon"
              >
                ${V([ne.a])}
              </span>
            `:null}
      </li>
    `}deleteItem(){this.items.length>=2&&(this.modifyDocument(t=>t.remove(this.children[this.currentTab])),this.currentTab===this.items.length-1&&(this.currentTab-=1))}setTabsItem(t){this.children.length<=t||!this.children[t]||(this.currentTab=t)}addItem(){this.currentTab=this.items.length}updateItem(t){this.modifyDocument(e=>e.attributes(this.children[t.index],{"data-tab-title":t.title,"data-default-tab":t.default})),t.default&&Array.from(this.children).filter(e=>"true"===e.dataset.defaultTab&&e!==this.children[t.index]).forEach(t=>this.modifyDocument(e=>e.attributes(t,{"data-default-tab":"false"})))}}),o.a.customElements.define("ck-tabs-modal",class extends pt{static get properties(){return{isVisible:{type:Boolean,reflect:!0},inputText:String,items:Array,isDefault:Boolean,currentDefault:String,currentIndex:String,currentTitle:String}}constructor(){super(),this.isVisible=!1,this.inputText="",this.isDefault=!1}connectedCallback(){super.connectedCallback();const t=this;new MutationObserver(e=>{e.forEach(e=>{"attributes"===e.type&&"true"===t.dataset.visible&&(t.isVisible=!0,t.isDefault="true"===t.currentDefault,t.inputText=t.currentTitle)})}).observe(t,{attributes:!0,childList:!0,subtree:!1}),t.isDefault="true"===t.currentDefault,t.isVisible="true"===t.dataset.visible}closeModal(){this.dispatchEvent(new Event("eventCloseModal")),this.isVisible=!1}handleInput(t){this.inputText=t.target.value}saveModal(){const t={index:this.currentIndex,title:this.inputText,default:this.isDefault};this.dispatchEvent(new CustomEvent("eventSaveModal",{detail:t})),this.closeModal()}handleSwitch(t){this.isDefault=t.target.checked}deleteTab(){this.dispatchEvent(new CustomEvent("deleteTab",{detail:this.currentTab})),this.closeModal()}render(){return L`
      <style>
        ${te.a}
      </style>
      <div class="modal ${this.isVisible?"visible":""}">
        <div class="modal__item">
          <h3 class="modal__title">Edit tab</h3>
          <div class="modal__content">
            <label class="modal__label" for="${this.currentIndex}">
              Variation name
            </label>
            <input
              class="modal__input"
              id="${this.currentIndex}"
              @input=${this.handleInput}
              .value=${this.currentTitle}
            />
            <div class="modal__toggle">
              <label class="switch">
                <input
                  type="checkbox"
                  .checked="${this.isDefault}"
                  @input="${t=>this.handleSwitch(t)}"
                />
                <span class="slider"></span>
              </label>
              <span class="modal__toggle-label">Set as default</span>
            </div>
          </div>
          <div class="modal__actions">
            <div class="modal__action-wrap-delete">
              <span
                class="modal__action modal__action--delete"
                @click="${()=>this.deleteTab()}"
              >
                Delete
              </span>
            </div>
            <span class="modal__action" @click="${()=>this.closeModal()}">
              Cancel
            </span>
            <span
              class="modal__action modal__action--primary"
              @click="${()=>this.saveModal()}"
            >
              save
            </span>
          </div>
        </div>
      </div>
    `}});const ie=V`
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
    <path d="M7.8 24c0-3.42 2.78-6.2 6.2-6.2h8V14h-8C8.48 14 4 18.48 4 24s4.48 10 10 10h8v-3.8h-8c-3.42 0-6.2-2.78-6.2-6.2zm8.2 2h16v-4H16v4zm18-12h-8v3.8h8c3.42 0 6.2 2.78 6.2 6.2s-2.78 6.2-6.2 6.2h-8V34h8c5.52 0 10-4.48 10-10s-4.48-10-10-10z"/>
</svg>
`;class oe extends Ot{static get properties(){return{target:{type:String,attribute:"link-target"}}}constructor(){super(),this.target=null}render(){return L`
      <div class="button ${this.target?"linked":"not-linked"}">
        <div class="button__content">
          <slot></slot>
        </div>
        <button @click="${this.inEditor?this.selectLink:()=>{}}">
          ${ie}
        </button>
      </div>
    `}selectLink(){this.requestInformation("select-link",{target:this.target},t=>{null!==t?this.modifyDocument(e=>e.attributes(this,{"link-target":t})):this.modifyDocument(t=>t.removeAttribute(this,"link-target"))})}}oe.styles=dt`
  :host {
    display: inline-block;
    --icon-size: 2em;
    --icon-color: black;
    --background-color: #ffbb15;
    background: var(--background-color);
    border-radius: 3em;
    font-weight: bold;
  }

  .button {
    display: flex;
    align-items: center;
    padding: 0 1em;
  }

  .button__content {
    width: 100%;
  }

  .button button {
    width: var(--icon-size);
    border: none;
    padding: 0;
    background: none;
    flex-grow: 0;
    cursor: pointer;
    transition: transform 0.5s ease;
    outline: none;
    margin-left: 0.5em;
  }

  .button svg {
    padding: 0;
    display: block;
    fill: var(--icon-color);
    width: var(--icon-size);
  }

  .button.not-linked svg {
    opacity: 0.5;
  }
`,o.a.customElements.define("ck-button",oe);var re=n(54),se=n.n(re);class ae extends Ot{static get properties(){return{label:{type:String},resolved:{type:Boolean},isResolving:{type:Boolean}}}constructor(){super(),this.label=ae.label,this.resolved=!1,this.isResolving=!1}connectedCallback(){super.connectedCallback(),Array.from(this.children).forEach(t=>t.addEventListener("optionSelected",this.selectOptionHandler.bind(this))),document.addEventListener("click",t=>{!this.contains(t.target)&&this.isResolving&&(this.isResolving=!1)})}render(){return L`
      <style>
        ${se.a}
      </style>
      <div class="text-conflict">
        <span
          class="text-conflict__label ${this.resolved?"":"resolve"}"
          @click=${this.clickResolvingHandler}
          >${this.label}</span
        >
        <div
          class="text-conflict__options ${this.isResolving?"visible":""}"
        >
          <slot></slot>
        </div>
      </div>
    `}clickResolvingHandler(){this.isResolving=!0}selectOptionHandler(t){this.resolved=!0,this.isResolving=!1,this.modifyDocument(e=>e.swap(t.detail,this))}}ae.label="Conflict needs resolving";var le=n(55),ce=n.n(le);class de extends pt{static get properties(){return{from:{type:String},content:{type:String}}}connectedCallback(){super.connectedCallback(),this.content=this.innerText}render(){return L`
      <style>
        ${ce.a}
      </style>
      <div class="option" @click="${this.optionSelected}">
        <span class="option__label"
          >${de.labels[this.from]}</span
        >
        <span class="option__content">${this.content}</span>
      </div>
    `}optionSelected(){this.dispatchEvent(new CustomEvent("optionSelected",{detail:this.children.item(0)}))}}de.labels={left:"Left version",right:"Right version",source:"Source version",empty:"Clear"},o.a.customElements.define("ck-conflict-text",ae),o.a.customElements.define("ck-conflict-option",de);var he=n(56),pe=n.n(he);class ue extends Ot{static get properties(){return{from:{type:String}}}connectedCallback(){super.connectedCallback(),Array.from(this.children).forEach(t=>{t.addEventListener("optionSelected",this.selectOptionHandler.bind(this))}),this.children.item(0).setAttribute("position","left"),this.children.item(1).setAttribute("position","right"),this.touchStart=!1,this.addEventListener("mousedown",this.touchStartHandler,!1),this.addEventListener("mouseup",this.touchEndHandler,!1),this.addEventListener("mouseover",this.touchEndHandler,!1),this.addEventListener("mousemove",this.eventHandler,!1),this.addEventListener("touchmove",this.eventHandler,!1)}render(){return L`
      <style>
        ${pe.a}
      </style>
      <div class="media-conflict">
        <div class="media-conflict-switcher"></div>
        <slot></slot>
      </div>
    `}selectOptionHandler(t){this.modifyDocument(e=>e.swap(t.detail,this))}touchStartHandler(t){this.touchStart=!0,this.eventHandler(t)}touchEndHandler(){this.touchStart=!1}eventHandler(t){if(!this.touchStart)return;const{target:e}=t;let n=0,i=0;const o=e;if("CK-CONFLICT-MEDIA"!==o.tagName)return;let r=o;do{i+=r.offsetLeft-r.scrollLeft}while(r=r.offsetParent);n=t.pageX-i,"touchmove"===t.type&&(n=t.touches[0].pageX-i),o.getElementsByTagName("ck-conflict-media-option")[0].style.width=`${n}px`}}ue.labels={left:"Left version",right:"Right version",source:"Source version",empty:"Clear"};var me=n(57),be=n.n(me);class ge extends pt{static get properties(){return{from:{type:String},position:{type:String}}}connectedCallback(){super.connectedCallback()}render(){return L`
      <style>
        ${be.a}
      </style>
      <div class="media-conflict-option">
        <button class="${this.position}" @click=${this.optionSelected}>
          ${this.from}
        </button>
        <slot></slot>
      </div>
    `}firstUpdated(){"left"===this.position&&(this.style.width="50%",setTimeout(()=>{this.shadowRoot.querySelector(".media-conflict-option").style.minWidth=`${2*this.offsetWidth}px`},100))}optionSelected(){this.dispatchEvent(new CustomEvent("optionSelected",{detail:this.children.item(0)}))}}ge.labels={left:"Left version",right:"Right version",source:"Source version",empty:"Clear"},o.a.customElements.define("ck-conflict-media",ue),o.a.customElements.define("ck-conflict-media-option",ge);var ve=n(58),fe=n.n(ve);const ye=V`
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
`,xe=V`
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/></svg>
`,_e=V`
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
`,ke=L`
  <div class="ck-media__loader">
    <div class="ck-media__spinner">
      <div class="ck-media__bounce ck-media__bounce--1"></div>
      <div class="ck-media__bounce ck-media__bounce--2"></div>
      <div class="ck-media__bounce ck-media__bounce--3"></div>
    </div>
  </div>
`;o.a.customElements.define("ck-media",class extends Ot{static get properties(){return{loaderIsVisible:Boolean,mediaType:{attribute:"data-media-type",type:String},mediaUuid:{attribute:"data-media-uuid",type:String},mediaDisplay:{attribute:"data-media-display",type:String},enableUpload:{attribute:"ck-upload",type:Boolean},enableEdit:{attribute:"ck-edit",type:Boolean},buttonPosition:{attribute:"ck-button-position",type:String},preview:String,error:Boolean}}connectedCallback(){super.connectedCallback(),this.requestInformation("show-errors",{},t=>{t&&(this.error=!this.mediaUuid)})}renderPreview(){this.loaderIsVisible=!0,this.requestInformation("media-preview",{type:this.mediaType,uuid:this.mediaUuid,display:this.mediaDisplay},t=>{this.preview=t,this.loaderIsVisible=!1})}updated(t){this.previewPane=this.shadowRoot.querySelector(".ck-media__preview"),t.has("mediaUuid")&&this.mediaUuid&&(this.error=!this.mediaUuid,this.renderPreview()),t.has("preview")&&this.preview&&(this.previewPane.innerHTML=this.preview)}render(){return L`
      <style>
        ${fe.a}
      </style>
      <div class="ck-media ${this.error?"error":"no-error"}">
        <div
          class="ck-media__preview ${this.preview?"visible":"hidden"}"
        ></div>
        <div
          class="ck-media__placeholder ${this.preview?"hidden":"visible"}"
        ></div>
        ${this.loaderIsVisible?ke:null}
        ${this.inEditor?L`
              <div
                class="ck-media__buttons ${this.buttonPosition||"bottom-right"}"
              >
                <button class="select" @click=${this.selectHandler}>
                  ${ye}
                </button>
                ${this.enableUpload?L`
                      <button class="upload" @click=${this.uploadHandler}>
                        ${xe}
                      </button>
                    `:null}
                ${this.enableEdit?L`
                      <button class="edit" @click=${this.editHandler}>
                        ${_e}
                      </button>
                    `:null}
              </div>
            `:null}
      </div>
    `}selectHandler(){this.requestInformation("media-select",{type:this.mediaType,uuid:this.mediaUuid},t=>{this.modifyDocument(e=>{e.attributes(this,{"data-media-uuid":t})})})}uploadHandler(){this.requestInformation("media-upload",{type:this.mediaType,uuid:this.mediaUuid},t=>{this.mediaUuid=t})}editHandler(){this.requestInformation("media-edit",{type:this.mediaType,uuid:this.mediaUuid},()=>{this.renderPreview()})}});var we=n(59),Se=n.n(we);class Ce extends Ot{static get properties(){return{pattern:{attribute:"ck-pattern",type:String},hasPatternError:{type:Boolean},errorMessage:{attribute:"ck-error-message",type:String},minLength:{attribute:"ck-min",type:Number},maxLength:{attribute:"ck-max",type:Number},hasLengthError:{type:Boolean},hasHelper:{type:Boolean},helper:{attribute:"ck-message-helper",type:String}}}connectedCallback(){super.connectedCallback(),this.querySelectorAll(["[contenteditable]"]).forEach(t=>{new MutationObserver(this.validate).observe(t,{childList:!0,subtree:!0,characterData:!0}),t.addEventListener("focus",this.setHelper.bind(this)),t.addEventListener("blur",()=>{this.validate(),this.hasHelper=!1}),this.maxLength&&!this.minLength&&t.addEventListener("input",this.handleMax.bind(this)),this.maxLength&&this.minLength&&t.addEventListener("input",this.rangeValidation.bind(this))}),this.requestInformation("show-errors",{},t=>{t&&this.validate()})}handleMax(){this.helper=`${this.maxLength-this.innerText.length} letters remaining.`,this.setHelper(),this.maxValidation()}validate(){this.hasAttribute("ck-max")&&this.maxValidation(),this.hasAttribute("ck-min")&&this.minValidation(),this.hasAttribute("ck-max")&&this.hasAttribute("ck-min")&&this.rangeValidation(),this.hasAttribute("ck-pattern")&&this.patternValidation()}updated(t){(t.has("minLength")||t.has("maxLength")||t.has("pattern"))&&this.requestInformation("show-errors",{},t=>{t&&this.validate()})}maxValidation(){this.innerText.length>this.maxLength&&!this.minLength?(this.errorMessage||(this.errorMessage=`Please enter no more than \n          ${this.maxLength} letters.`),this.hasLengthError=!0):this.hasLengthError=!1,this.setHelper()}minValidation(){this.innerText.length<this.minLength?(this.errorMessage||(this.errorMessage=`Please enter at least \n          ${this.minLength} letters.`),this.hasLengthError=!0):this.hasLengthError=!1}rangeValidation(){this.innerText.length>this.minLength&&this.innerText.length<this.maxLength?this.hasLengthError=!1:(this.errorMessage||(this.errorMessage=`Please enter ${this.minLength} to ${this.maxLength} letters.`),this.hasLengthError=!0)}patternValidation(){new RegExp(this.pattern).test(this.innerText)?this.hasPatternError=!1:this.hasPatternError=!0}setHelper(){this.helper&&(this.hasPatternError||this.hasLengthError?this.hasHelper=!1:this.hasHelper=!0)}render(){return L`
      <style>
        ${Se.a}
      </style>

      <div
        class="ck-textfield ${this.hasPatternError||this.hasLengthError?"error":""}"
      >
        ${this.hasHelper?L`
              <div class="ck-tooltip ck-tooltip--helper">${this.helper}</div>
            `:null}
        ${this.hasLengthError?L`
              <div class="ck-tooltip ck-tooltip--error">
                ${this.errorMessage?this.errorMessage:"Length error"}
              </div>
            `:null}
        ${this.hasPatternError?L`
              <div class="ck-tooltip ck-tooltip--error">
                ${this.errorMessage?this.errorMessage:"Pattern error"}
              </div>
            `:null}
        <div
          class="${this.hasPatternError||this.hasLengthError?"is-valid":"is-invalid"}"
        >
          <slot></slot>
        </div>
      </div>
    `}}Ce.initializeWithErrors=!1,o.a.customElements.define("ck-textfield",Ce)},2:function(t,e,n){(function(e){var n;n="undefined"!=typeof window?window:void 0!==e?e:"undefined"!=typeof self?self:{},t.exports=n}).call(this,n(8))},38:function(t,e){t.exports=":host {\n  --color-blue: #004adc;\n  --color-black: #222330;\n  --color-grey-light: #B8B8B8;\n  --align-buttons: left;\n  display: block;\n  font-family: var(--font-family, sans-serif);\n  --transition: 0.3s ease;\n}\n\nbutton {\n  background: rgba(0, 0, 0, 0);\n  border: none;\n  cursor: pointer;\n  font-family: inherit;\n  font-size: inherit;\n  padding: 0;\n}\n\nul {\n  list-style-type: none;\n  width: 100%;\n}\n\nul,\nli {\n  margin: 0;\n  padding: 0;\n}\n\n.ck-placeholder__insert-wrapper {\n  border-bottom: 1px dashed var(--color-black, #222330);\n  font-size: 12px;\n  line-height: 1;\n  margin: 1em 0 2em;\n  text-align: center;\n  opacity: 0;\n  transition: opacity var(--transition);\n}\n\n.ck-placeholder__insert-wrapper:hover,\n.ck-placeholder__insert-wrapper:focus {\n  opacity: 1;\n}\n\n.ck-placeholder__insert-button {\n  background: #fff;\n  color: var(--color-black, #222330);\n  display: inline-block;\n  font-size: 12px;\n  line-height: 1;\n  font-weight: bold;\n  letter-spacing: 0.03em;\n  margin: 0;\n  padding: 0 1em;\n  position: relative;\n  top: 0.5em;\n}\n\n\n.ck-placeholder__insert-button:hover,\n.ck-placeholder__insert-button:focus {\n  color: var(--color-blue, #004adc);\n}\n\n.ck-placeholder__add-wrapper {\n  background: #f5f5f5;\n  box-sizing: border-box;\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: center;\n  font-size: 14px;\n  min-height: 80px;\n  padding: 0.5em 1.8em 0.6em;\n  height: 100%;\n  transition: border var(--transition);\n}\n\n.ck-placeholder__add-button {\n  color: var(--color-black, #222330);\n  font-weight: bold;\n  margin-right: 40px;\n  text-transform: uppercase;\n}\n\n.ck-placeholder__add-button:hover,\n.ck-placeholder__add-button:focus {\n  color: var(--color-blue, #004adc);\n}\n\n.ck-placeholder__sections-list {\n  text-align: var(--align-buttons);\n}\n\n.ck-placeholder__section-item {\n  color: var(--color-black, #222330);\n  display: inline-block;\n  font-size: 12px;\n  margin-right: 20px;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n\n.ck-placeholder__icon-wrapper {\n  color: var(--color-grey-light, #B8B8B8);\n  margin-bottom: 8px;\n  width: 18px;\n}\n\n.ck-placeholder__section-button {\n  align-items: center;\n  display: flex;\n  flex-flow: column wrap;\n  text-transform: uppercase;\n}\n\n.ck-placeholder__section-button:hover,\n.ck-placeholder__section-button:focus {\n  color: var(--color-blue, #004adc);\n}\n\n.ck-placeholder__section-button:hover .ck-placeholder__icon-wrapper,\n.ck-placeholder__section-button:focus .ck-placeholder__icon-wrapper {\n  color: var(--color-blue, #004adc);\n}\n\n.ck-placeholder__close-button {\n  margin-left: auto;\n  position: relative;\n}\n\n.ck-placeholder__close-button .ck-placeholder__icon-wrapper {\n  margin-bottom: 0;\n}\n\n.ck-placeholder__close-button:hover .ck-placeholder__icon-wrapper,\n.ck-placeholder__close-button:focus .ck-placeholder__icon-wrapper {\n  color: var(--color-black, #222330);\n}\n\n.ck-placeholder__close-button-label {\n  left: 0;\n  opacity: 0;\n  position: absolute;\n  top: 0;\n}\n"},39:function(t,e){t.exports='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n  <path fill="currentColor"\n        d="M21,6.611,19.389,5,13,11.389,6.611,5,5,6.611,11.389,13,5,19.389,6.611,21,13,14.611,19.389,21,21,19.389,14.611,13Z"\n        transform="translate(-1 -1)"/>\n  <path d="M0,0H24V24H0Z" fill="none"/>\n</svg>\n'},40:function(t,e){t.exports='<svg viewBox="0 0 18.862 15.09" xmlns="http://www.w3.org/2000/svg">\n  <g fill="currentColor">\n    <path d="m1.572 1.257h.943v12.575h-.943z"/>\n    <path d="m16.347 1.257h.943v12.575h-.943z"/>\n    <path d="m17.919 2.515h.943v10.06h-.943z"/>\n    <path d="m0 2.515h.943v10.06h-.943z"/>\n    <path d="m10 6v15.09h12.575v-15.09zm11 13.518h-9.428v-11.946h9.428z" transform="translate(-6.856 -6)"/>\n  </g>\n</svg>\n'},41:function(t,e){t.exports='<svg viewBox="0 0 26 20" xmlns="http://www.w3.org/2000/svg">\n  <g fill="currentColor">\n    <path d="m295.991 66.055v-.88h-3.785v.88h1.452v14.814h-1.452v.88h3.785v-.88h-1.452v-14.814z"\n          transform="translate(-269.117 -65.175)"/>\n    <path\n        d="m.163 100.069 4.43-10a1.728 1.728 0 0 1 1.634-1.108h.163a1.7 1.7 0 0 1 1.616 1.108l4.43 10a1.363 1.363 0 0 1 .145.563 1.325 1.325 0 0 1 -1.326 1.344 1.423 1.423 0 0 1 -1.344-.962l-.853-2h-5.59l-.89 2.088a1.373 1.373 0 0 1 -1.289.871 1.286 1.286 0 0 1 -1.289-1.305 1.483 1.483 0 0 1 .163-.599zm7.862-3.522-1.761-4.195-1.764 4.195z"\n        transform="translate(0 -87.078)"/>\n    <path\n        d="m176.011 134.837v-.037c0-2.124 1.616-3.1 3.922-3.1a6.915 6.915 0 0 1 2.379.4v-.163c0-1.144-.708-1.779-2.088-1.779a6.328 6.328 0 0 0 -1.907.272 1.168 1.168 0 0 1 -.4.073 1.124 1.124 0 0 1 -1.144-1.126 1.144 1.144 0 0 1 .744-1.071 8.474 8.474 0 0 1 3.105-.508 4.494 4.494 0 0 1 3.287 1.089 4.242 4.242 0 0 1 1.053 3.1v4.43a1.325 1.325 0 0 1 -1.344 1.326 1.236 1.236 0 0 1 -1.325-1.144v-.018a3.742 3.742 0 0 1 -2.941 1.235c-1.834-.001-3.341-1.054-3.341-2.979zm6.337-.636v-.49a4.28 4.28 0 0 0 -1.761-.363c-1.18 0-1.906.472-1.906 1.344v.036c0 .744.617 1.18 1.507 1.18 1.288 0 2.16-.708 2.16-1.708z"\n        transform="translate(-162.103 -122.844)"/>\n  </g>\n</svg>\n'},42:function(t,e){t.exports='<svg viewBox="0 0 17.304 13.724" xmlns="http://www.w3.org/2000/svg">\n  <path\n      d="m17.005 6h-16.705a.3.3 0 0 0 -.3.3v13.125a.3.3 0 0 0 .3.3h16.705a.3.3 0 0 0 .3-.3v-13.125a.3.3 0 0 0 -.3-.3zm-12.232 3.282a1.661 1.661 0 1 1 -1.661 1.661 1.663 1.663 0 0 1 1.661-1.661zm10.96 5.572a.3.3 0 0 1 -.422.018l-3.36-3.08-2.739 3 1.434 1.434a.3.3 0 1 1 -.422.422l-3.072-3.074-4.866 4.285a.3.3 0 1 1 -.394-.448l5.077-4.47a.3.3 0 0 1 .408.013l1.414 1.416 2.922-3.2a.3.3 0 0 1 .207-.1.307.307 0 0 1 .215.078l3.58 3.282a.3.3 0 0 1 .018.423z"\n      fill="currentColor" transform="translate(0 -6)"/>\n</svg>\n'},43:function(t,e){t.exports='<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">\n  <g fill="currentColor">\n    <path\n        d="m158.2 149.935h-.733a.6.6 0 0 1 -.5-.392 5.813 5.813 0 0 0 -.244-.583.6.6 0 0 1 .078-.631l.522-.522a.939.939 0 0 0 0-1.326l-.847-.847a.937.937 0 0 0 -1.326 0l-.522.522a.535.535 0 0 1 -.373.134.6.6 0 0 1 -.258-.055 5.836 5.836 0 0 0 -.584-.244.6.6 0 0 1 -.392-.5v-.733a.939.939 0 0 0 -.937-.937h-1.2a.939.939 0 0 0 -.937.937v.733a.6.6 0 0 1 -.392.5 5.833 5.833 0 0 0 -.583.244.6.6 0 0 1 -.257.055.536.536 0 0 1 -.374-.134l-.521-.521a.938.938 0 0 0 -1.326 0l-.848.847a.937.937 0 0 0 0 1.326l.522.522a.6.6 0 0 1 .079.631 5.8 5.8 0 0 0 -.243.582.6.6 0 0 1 -.5.392h-.733a.939.939 0 0 0 -.937.937v1.2a.939.939 0 0 0 .937.937h.733a.6.6 0 0 1 .5.392 5.8 5.8 0 0 0 .244.582.6.6 0 0 1 -.079.631l-.522.522a.939.939 0 0 0 0 1.326l.848.848a.937.937 0 0 0 1.326 0l.522-.522a.536.536 0 0 1 .374-.134.594.594 0 0 1 .257.055 5.817 5.817 0 0 0 .583.244.6.6 0 0 1 .392.5v.733a.938.938 0 0 0 .937.937h1.2a.938.938 0 0 0 .937-.937v-.733a.6.6 0 0 1 .392-.5 5.834 5.834 0 0 0 .583-.244.6.6 0 0 1 .257-.055.536.536 0 0 1 .374.134l.522.522a.937.937 0 0 0 1.326 0l.847-.848a.939.939 0 0 0 0-1.326l-.521-.522a.6.6 0 0 1 -.079-.631 5.808 5.808 0 0 0 .244-.583.6.6 0 0 1 .5-.392h.733a.939.939 0 0 0 .937-.937v-1.2a.939.939 0 0 0 -.938-.936zm-3.971 1.536a2.747 2.747 0 1 1 -2.747-2.747 2.75 2.75 0 0 1 2.752 2.748z"\n        transform="translate(-139.142 -139.128)"/>\n    <path\n        d="m6.871 5.006a.153.153 0 0 1 .1-.092h.367a.626.626 0 0 0 .625-.625v-.6a.626.626 0 0 0 -.625-.625h-.362a.152.152 0 0 1 -.1-.092 3.031 3.031 0 0 0 -.129-.307.149.149 0 0 1 .009-.137l.261-.261a.626.626 0 0 0 0-.884l-.427-.422a.625.625 0 0 0 -.884 0l-.261.261a.121.121 0 0 1 -.076.021.144.144 0 0 1 -.061-.012 3.033 3.033 0 0 0 -.308-.131.153.153 0 0 1 -.091-.1v-.369a.626.626 0 0 0 -.625-.625h-.6a.626.626 0 0 0 -.624.625v.369a.152.152 0 0 1 -.092.1 3.043 3.043 0 0 0 -.307.129.146.146 0 0 1 -.061.012.121.121 0 0 1 -.076-.021l-.261-.259a.625.625 0 0 0 -.884 0l-.423.423a.626.626 0 0 0 0 .884l.261.261a.149.149 0 0 1 .009.137 3.043 3.043 0 0 0 -.129.307.153.153 0 0 1 -.1.092h-.372a.626.626 0 0 0 -.625.626v.6a.626.626 0 0 0 .625.625h.367a.153.153 0 0 1 .1.092 3.022 3.022 0 0 0 .129.307.149.149 0 0 1 -.009.137l-.261.261a.625.625 0 0 0 0 .884l.423.423a.625.625 0 0 0 .884 0l.261-.261a.121.121 0 0 1 .081-.022.145.145 0 0 1 .061.012 3.04 3.04 0 0 0 .307.128.153.153 0 0 1 .092.1v.367a.626.626 0 0 0 .625.625h.6a.626.626 0 0 0 .625-.625v-.362a.152.152 0 0 1 .09-.105 3.041 3.041 0 0 0 .307-.129.145.145 0 0 1 .061-.012.121.121 0 0 1 .076.021l.261.261a.625.625 0 0 0 .884 0l.424-.418a.626.626 0 0 0 0-.884l-.261-.261a.149.149 0 0 1 -.009-.137 3.079 3.079 0 0 0 .128-.312zm-1.671-1.016a1.217 1.217 0 1 1 -1.216-1.218 1.219 1.219 0 0 1 1.216 1.218z"\n        transform="translate(0 -.006)"/>\n  </g>\n</svg>\n'},44:function(t,e){t.exports='<svg viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">\n  <path\n      d="m91.93 13.877a2.346 2.346 0 0 1 -1.262-.334 1.217 1.217 0 0 1 -.561-.647 6.709 6.709 0 0 1 -.151-1.856v-4.253h3.928v-2.6h-3.928v-4.187h-2.363a6.615 6.615 0 0 1 -.583 2.115 4.6 4.6 0 0 1 -1.11 1.424 4.974 4.974 0 0 1 -1.673.906v2.342h1.833v5.813a4.847 4.847 0 0 0 .237 1.737 3 3 0 0 0 .853 1.133 4.394 4.394 0 0 0 1.489.809 6.34 6.34 0 0 0 2.007.292 7.809 7.809 0 0 0 1.867-.205 9.536 9.536 0 0 0 1.921-.7v-2.61a4.5 4.5 0 0 1 -2.504.821z"\n      fill="currentColor" transform="translate(-84.226)"/>\n</svg>\n'},45:function(t,e){t.exports='<svg viewBox="0 0 20.26 16.073" xmlns="http://www.w3.org/2000/svg">\n  <g fill="currentColor">\n    <path\n        d="m9.229 136.932-2.307-2.307-2.336 2.335 1.814 1.813h1.181v.659h-1.319a.33.33 0 0 1 -.233-.1l-3.063-3.063-2.966 2.97v.852a.989.989 0 0 0 .989.989h7.251a.989.989 0 0 0 .989-.989zm0 0"\n        transform="translate(0 -131.852)"/>\n    <path d="m176.659 64.33a.33.33 0 1 1 -.33-.33.33.33 0 0 1 .33.33zm0 0" transform="translate(-172.374 -62.682)"/>\n    <path\n        d="m9.229.989a.989.989 0 0 0 -.989-.989h-7.251a.989.989 0 0 0 -.989.989v5.466l2.733-2.733a.33.33 0 0 1 .466 0l.921.921 2.568-2.569a.33.33 0 0 1 .466 0l2.075 2.074zm-5.274 1.648a.989.989 0 1 1 .989-.989.989.989 0 0 1 -.989.989zm0 0"/>\n    <path d="m11.109.102h9.151v1.141h-9.151z"/>\n    <path d="m0 11.51h20.26v1.141h-20.26z"/>\n    <path d="m11.109 3.525h9.151v1.141h-9.151z"/>\n    <path d="m0 14.932h12.275v1.141h-12.275z"/>\n    <path d="m11.109 6.947h9.151v1.141h-9.151z"/>\n  </g>\n</svg>\n'},46:function(t,e){t.exports='<svg viewBox="0 0 19.45 13" xmlns="http://www.w3.org/2000/svg">\n  <path\n      d="m-130.878 73.4a.585.585 0 0 0 -.21-.042.5.5 0 0 0 -.378.16l-3.382 3.374v-1.385a2.328 2.328 0 0 0 -.709-1.708 2.328 2.328 0 0 0 -1.708-.709h-10.318a2.329 2.329 0 0 0 -1.708.709 2.329 2.329 0 0 0 -.709 1.708v5.909a2.328 2.328 0 0 0 .709 1.708 2.328 2.328 0 0 0 1.708.709h10.318a2.328 2.328 0 0 0 1.708-.709 2.328 2.328 0 0 0 .709-1.708v-1.394l3.382 3.382a.5.5 0 0 0 .378.159.586.586 0 0 0 .21-.042.5.5 0 0 0 .327-.5v-9.121a.5.5 0 0 0 -.327-.5z"\n      fill="currentColor" transform="translate(150 -73.09)"/>\n</svg>\n'},47:function(t,e){t.exports=":host {\n  --color-blue: #004adc;\n  --color-black: #222330;\n  --color-black-80: rgba(0, 0, 0, 0.8);\n  --color-black-60: rgba(0, 0, 0, 0.6);\n  --color-black-30: rgba(0, 0, 0, 0.3);\n  --color-grey-light: #CCC;\n  --color-white: #FFF;\n  --align-buttons: left;\n  font-family: var(--font-family, sans-serif);\n  font-style: initial;\n  font-weight: initial;\n  --gallery-position-top: auto;\n  --gallery-position-left: 50%;\n  --gallery-position-right: auto;\n  --gallery-position-bottom: 40px;\n  --gallery-transform: translate(-50%, 0);\n}\n\n.ck-gallery {\n  position: relative;\n  width: 100%;\n  display: inline-block;\n  margin: auto;\n  overflow: hidden;\n}\n\n.disabled {\n  opacity: 0.3;\n}\n\n.ck-gallery__rail {\n  display: flex;\n  transition: transform 0.7s ease;\n}\n\n::slotted(*), ck-placeholder {\n  display: block;\n  width: 100%;\n  flex-shrink: 0;\n  --align-buttons: center;\n  min-height: 300px;\n}\n\n\n.ck-gallery__controls {\n  position: absolute;\n  top: var(--gallery-position-top);\n  bottom: var(--gallery-position-bottom);\n  left: var(--gallery-position-left);\n  right: var(--gallery-position-right);\n  transform: var(--gallery-transform);\n  background-color: var(--color-white);\n  display: flex;\n  min-width: 40px;\n  max-height: 60px;\n  justify-content: space-between;\n  align-items: flex-end;\n  padding: 10px 20px;\n  border-radius: 10px;\n}\n\n.ck-gallery__actions {\n  min-width: 130px;\n  padding-left: 20px;\n  margin-left: 20px;\n  border-left: 1px solid var(--color-grey-light);\n  font-size: 14px;\n}\n\n.ck-gallery__pager {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 5px;\n}\n\n.ck-gallery__dots {\n  margin-right: 10px;\n  display: flex;\n}\n\n.ck-gallery__dot-item {\n  display: inline-block;\n  height: 20px;\n  width: 20px;\n  border-radius: 100%;\n  margin-right: 5px;\n  background-color: var(--color-black-30);\n  text-align: center;\n  line-height: 20px;\n  color: var(--color-white);\n  cursor: pointer;\n  font-size: 12px;\n  transition: background-color 0.35s ease;\n}\n\n.ck-gallery__add {\n  display: inline-block;\n  box-sizing: border-box;\n  height: 20px;\n  width: 20px;\n  border-radius: 100%;\n  background-color: var(--color-white);\n  text-align: center;\n  color: var(--color-blue);\n  line-height: 16px;\n  font-size: 16px;\n  cursor: pointer;\n  transition: background-color 0.35s ease;\n  border: 1px solid var(--color-blue);\n}\n\n.ck-gallery__add.active {\n  background-color: var(--color-blue);\n  color: var(--color-white);\n}\n\n.ck-gallery__dot-item.active {\n  background-color: var(--color-black-80);\n}\n\n\n.ck-gallery__add-slide:hover {\n  background-color: var(--color-blue);\n  color: var(--color-white);\n}\n\n.ck-gallery__icons {\n  max-width: 110px;\n  display: flex;\n  justify-content: space-between;\n  margin-top: 5px;\n}\n\n.ck-gallery__icon {\n  cursor: pointer;\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  transition: background-color 0.35s ease;\n  background-color: transparent;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.ck-gallery__icon:hover {\n  background-color: #f0f0f0;\n}\n\n.ck-gallery__icon > * {\n  width: 14px;\n  height: 14px;\n}\n\n[data-tooltip] {\n  position: relative;\n  cursor: pointer;\n  text-align: center;\n}\n\n/* Base styles for the entire tooltip */\n[data-tooltip]:before,\n[data-tooltip]:after {\n  position: absolute;\n  visibility: hidden;\n  transition:\n        opacity 0.2s ease-in-out,\n        visibility 0.2s ease-in-out,\n        transform 0.2s cubic-bezier(0.71, 1.7, 0.77, 1.24);\n  transform: translate3d(0, 0, 0);\n  pointer-events: none;\n}\n\n.disabled[data-tooltip]:before,\n.disabled[data-tooltip]:after {\n  display: none;\n}\n\n/* Show the entire tooltip on hover and focus */\n[data-tooltip]:hover:before,\n[data-tooltip]:hover:after,\n[data-tooltip]:focus:before,\n[data-tooltip]:focus:after {\n  visibility: visible;\n  opacity: 1;\n}\n\n/* Base styles for the tooltip's directional arrow */\n[data-tooltip]:before {\n  z-index: 1001;\n  border: 6px solid transparent;\n  background: transparent;\n  content: \"\";\n}\n\n/* Base styles for the tooltip's content area */\n[data-tooltip]:after {\n  z-index: 1000;\n  padding: 8px;\n  display: inline-block;\n  width: 160px;\n  background-color: var(--color-black-60);\n  color: var(--color-white);\n  content: attr(data-tooltip);\n  font-size: 13px;\n  line-height: 1;\n}\n\n/* Horizontally align top/bottom tooltips */\n[data-tooltip]:after {\n  margin-left: -80px;\n}\n\n[data-tooltip]:hover:before,\n[data-tooltip]:hover:after,\n[data-tooltip]:focus:before,\n[data-tooltip]:focus:after {\n  transform: translateY(-12px);\n}\n\n\n[data-tooltip]:before,\n[data-tooltip]:after {\n  top: 80%;\n  bottom: auto;\n  left: 50%;\n}\n\n[data-tooltip]:before {\n  margin-top: -12px;\n  margin-left: -6px;\n  margin-bottom: 0;\n  border-top-color: transparent;\n  border-bottom-color: var(--color-black-60);\n}\n\n[data-tooltip]:hover:before,\n[data-tooltip]:hover:after,\n[data-tooltip]:focus:before,\n[data-tooltip]:focus:after {\n  transform: translateY(12px);\n}\n\n"},48:function(t,e){t.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n  <path d="M20,11H7.83l5.59-5.59L12,4,4,12l8,8,1.41-1.41L7.83,13H20Z"/>\n</svg>\n'},49:function(t,e){t.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n  <path d="M12,4,10.59,5.41,16.17,11H4v2H16.17l-5.58,5.59L12,20l8-8Z"/>\n</svg>\n'},50:function(t,e){t.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n  <path d="M6,19a2.006,2.006,0,0,0,2,2h8a2.006,2.006,0,0,0,2-2V7H6ZM8,9h8V19H8Zm7.5-5-1-1h-5l-1,1H5V6H19V4Z"/>\n</svg>\n'},51:function(t,e){t.exports=":host {\n  --color-blue: #004adc;\n  --color-black: #222330;\n  --color-black-80: rgba(0, 0, 0, 0.8);\n  --color-black-60: rgba(0, 0, 0, 0.6);\n  --color-black-30: rgba(0, 0, 0, 0.3);\n  --color-grey-light: #CCC;\n  --color-white: #FFF;\n  --font-size-text: 16px;\n  --baseline: 8px;\n  --baseline2: 16px;\n  --baseline3: 24px;\n  --baseline4: 32px;\n  --baseline5: 40px;\n  font-style: initial;\n  font-weight: initial;\n  font-family: var(--font-family, sans-serif);\n}\n\n.ck-tabs {\n  width: 100%;\n  display: block;\n  margin: auto;\n}\n\n.ck-tabs__header-tab-list {\n  list-style: none;\n  display: flex;\n  padding-left: 0;\n  border-bottom: 1px solid var(--color-grey-light);\n}\n\n\n.ck-tabs__header-tab-item {\n  padding: 0 var(--baseline3) 0 var(--baseline3);\n  border-bottom: 1px solid var(--color-grey-light);\n  margin-bottom: -1px;\n  cursor: pointer;\n  position: relative;\n  font-size: var(--font-size-text);\n  position: relative;\n}\n\n.ck-tabs__header-icon {\n  height: 0;\n  width: 0;\n  cursor: pointer;\n  opacity: 0;\n  visibility: hidden;\n  position: absolute;\n  top: 0;\n  right: 0;\n}\n\n.ck-tabs__header-tab-item.active {\n  border-bottom: 2px solid var(--color-blue);\n  color: var(--color-blue);\n  font-weight: bold;\n  cursor: default;\n}\n\n.ck-tabs__header-tab-item.active .ck-tabs__header-icon {\n  width: var(--baseline2);\n  height: var(--baseline2);\n}\n\n.ck-tabs__header-tab-item.active:hover .ck-tabs__header-icon {\n  opacity: 1;\n  visibility: visible;\n}\n\n.ck-tabs__header-tab-item.default:before {\n  content: '*';\n  margin-right: 5px;\n  font-size: 19px;\n  height: var(--baseline2);\n  position: absolute;\n  left: 5px;\n  top: 0;\n}\n\n.ck-tabs__header-tab-add {\n  margin-left: var(--baseline3);\n  cursor: pointer;\n  height: 20px;\n  width: 20px;\n  background-color: var(--color-black-80);\n  text-align: center;\n  color: var(--color-white);\n  border-radius: 50%;\n  transition: background-color 0.35s ease;\n  position: relative;\n  margin-bottom: 15px;\n}\n\n.ck-tabs__header-tab-add::before {\n  content: '+';\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -54%)\n}\n\n.ck-tabs__header-tab-add:hover {\n  background-color: var(--color-blue);\n}\n\n::slotted(*) {\n  display: block;\n  width: 100%;\n  flex-shrink: 0;\n}\n"},52:function(t,e){t.exports=':host {\n  --color-blue: #004adc;\n  --color-blue-60: rgba(0, 74, 220, 0.6);\n  --color-black: #222330;\n  --color-black-80: rgba(0, 0, 0, 0.8);\n  --color-black-60: rgba(0, 0, 0, 0.6);\n  --color-black-30: rgba(0, 0, 0, 0.3);\n  --color-grey-light: #CCC;\n  --color-white: #FFF;\n  --font-size-small: 12px;\n  --font-size-text: 16px;\n  --baseline: 8px;\n  --baseline2: 16px;\n  --baseline3: 24px;\n  --baseline4: 32px;\n  --baseline5: 40px;\n  font-family: var(--font-family, sans-serif);\n}\n\n.modal {\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background-color: var(--color-black-30);\n  opacity: 0;\n  visibility: hidden;\n  transform: scale(1.1);\n  transition: visibility 0s linear .35s,opacity .35s 0s,transform .35s;\n  z-index: 1;\n}\n.visible {\n  opacity: 1;\n  visibility: visible;\n  transform: scale(1);\n  transition: visibility 0s linear 0s,opacity .35s 0s,transform .35s;\n}\n\n.modal__item {\n  background-color: var(--color-white);\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  border-radius: 4px;\n  min-width: 300px;\n  box-shadow: 0px 5px 40px 1px rgba(0,0,0,0.35);\n}\n\n.modal__content, .modal__actions, .modal__title {\n  padding: var(--baseline2);\n}\n\n.modal__actions {\n  display: flex;\n  justify-content: flex-end;\n}\n\n.modal__action {\n  text-transform: uppercase;\n  cursor: pointer;\n  margin-left: 20px;\n  font-size: var(--font-size-small);\n}\n\n.modal__action--primary {\n  color: var(--color-blue);\n}\n\n.modal__action-wrap-delete {\n  flex: 1;\n}\n\n.modal__action--delete {\n  margin: 0;\n  transition: 0.35s color ease;\n}\n\n.modal__action--delete:hover {\n  color: red;\n}\n\n.modal__title {\n  font-size: var(--font-size-text);\n  background-color: var(--color-blue);\n  color: var(--color-white);\n  margin: 0;\n  border-top-left-radius: 4px; \n  border-top-right-radius: 4px; \n}\n\n.modal__button-container {\n  text-align: right;\n}\n\n.modal__label {\n  font-size: var(--font-size-small);\n  color: var(--color-black-30);\n}\n\n.modal__input {\n  margin: 5px 0 20px 0;\n  display: block;\n  border: none;\n  border-bottom: 1px solid  var(--color-black-30);\n  padding: 5px 0;\n  outline: none;\n  width: 100%;\n  transition: border-color 0.35s;\n  font-size: var(--font-size-text);\n}\n\n.modal__input:focus {\n  border-color: var(--color-blue);\n}\n\n.modal__toggle {\n  display: flex;\n  align-items: center;\n}\n\n.modal__toggle-label {\n  margin-left: 15px;\n  font-size: var(--font-size-small);\n}\n\n/* The switch - the box around the slider */\n.switch {\n  position: relative;\n  display: inline-block;\n  width: 30px;\n  height: 8px;\n}\n\n/* Hide default HTML checkbox */\n.switch input {\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n\n/* The slider */\n.slider {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: var(--color-black-30);\n  transition: all 0.35s ease;\n  border-radius: 20px;\n}\n\n.slider:before {\n  position: absolute;\n  content: "";\n  height: 15px;\n  width: 15px;\n  left: 0px;\n  bottom: -3px;\n  background-color: var(--color-white);\n  transition: all 0.35s ease;\n  box-shadow: 0px 3px 15px 0px rgba(0,0,0,0.3);\n  border-radius: 50%;\n}\n\ninput:checked + .slider {\n  background-color: var(--color-blue-60);\n}\n\n\ninput:checked + .slider:before {\n  transform: translateX(15px);\n  background-color: var(--color-blue);\n}\n'},53:function(t,e){t.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n  <path\n      d="M3,17.25V21H6.75L17.81,9.94,14.06,6.19ZM20.71,7.04a1,1,0,0,0,0-1.41L18.37,3.29a1,1,0,0,0-1.41,0L15.13,5.12l3.75,3.75,1.83-1.83Z"/>\n</svg>\n'},54:function(t,e){t.exports=":host {\n  --color-red: #ff0000;\n  --color-grey-light: #ccc;\n}\n.text-conflict {\n  position: relative;\n}\nspan {\n  cursor: pointer;\n}\nspan.resolve {\n  text-decoration: underline;\n  text-decoration-color: var(--color-red);\n}\n.text-conflict__options {\n  visibility: hidden;\n  z-index: 5;\n  opacity: 0;\n  max-width: 400px;\n  background: white;\n  box-shadow: 0px 0px 5px var(--color-grey-light);\n  border-radius: 3px;\n  position: absolute;\n  top: 0;\n}\n.visible {\n  opacity: 1;\n  visibility: visible;\n  transform: scale(1);\n  transition: visibility 0s linear 0s,opacity .35s 0s,transform .35s;\n}\n"},55:function(t,e){t.exports=":host {\n  --color-grey-light: #ccc;\n  --color-grey-dark: #515151;\n}\n.option {\n  display: flex;\n  border-bottom: 1px solid var(--color-grey-light);\n  cursor: pointer;\n  align-items: center;\n}\n\n.option:hover {\n  background-color: #f6f6f6;\n  transition: background-color .35s linear 0s;\n}\n\n.option > span {\n  padding: 5px;\n  display: inline-block;\n}\n\n.option > span.option__label {\n  width: 150px;\n  color: var(--color-grey-dark);\n  padding: 25px 10px;\n  font-size: 14px;\n}\n.option > span.option__content {\n  padding: 0 20px;\n  text-align: left;\n}\n"},56:function(t,e){t.exports=":host {\n  display: block;\n  width: 100%;\n}\n\n.media-conflict {\n  position: relative;\n  overflow: hidden;\n  background: rgba(0, 0, 0, 0.5);\n}\n\n.media-conflict ::slotted(ck-conflict-media-option) {\n  line-height: 0;\n  display: block;\n  pointer-events: none;\n}\n\n.media-conflict ::slotted(ck-conflict-media-option:first-child) {\n  position: absolute;\n  left: 0;\n  top: 0;\n  overflow: hidden;\n  z-index: 2;\n  height: 100%;\n  border-right: 3px solid rgb(255, 255, 255);\n}\n\n.media-conflict ::slotted(ck-conflict-media-option:last-child) {\n  float: right;\n  width: 100%;\n}\n"},57:function(t,e){t.exports="\nbutton {\n  position: absolute;\n  top: 0;\n  right: 0;\n  z-index: 3;\n  display: block;\n  pointer-events: auto;\n  border: none;\n  color: white;\n  cursor: pointer;\n  font-family: inherit;\n  font-size: inherit;\n  background: rgba(0, 0, 0, 0.5);\n  padding: 10px 20px;\n  width: 150px;\n}\n\nbutton.left {\n  left: 0;\n}\n\n.media-conflict-option {\n  height: 100%;\n}\n"},58:function(t,e){t.exports=":host {\n  --color-red: #d32323;\n  --color-blue: #004adc;\n  --color-black: #222330;\n  --color-black-80: rgba(0, 0, 0, 0.8);\n  --color-black-60: rgba(0, 0, 0, 0.6);\n  --color-black-30: rgba(0, 0, 0, 0.3);\n  --color-black-10: rgba(0, 0, 0, 0.1);\n  --color-black-05: rgba(0, 0, 0, 0.05);\n  --color-spinner: rgba(0, 0, 0, 0.4);\n  --color-grey-light: #CCC;\n  --color-white: #FFF;\n  --align-buttons: left;\n  --height-ratio: 50%;\n  font-family: var(--font-family, sans-serif);\n  --button-padding: 5px;\n}\n\nimg {\n  display: block;\n  height: auto !important;\n}\n\n* {\n  max-width: 100%;\n}\n\n.hidden {\n  display: none;\n}\n\n.ck-media {\n  width: 100%;\n  border: 1px solid var(--color-black-10);\n  position: relative;\n}\n\n.ck-media__placeholder {\n  width: 100%;\n  padding-bottom: var(--height-ratio);\n  background: repeating-linear-gradient(\n  45deg,\n  var(--color-white),\n  var(--color-white) 30px,\n  var(--color-grey-light) 30px,\n  var(--color-grey-light) 60px\n  );\n}\n\n.ck-media.error {\n  border: 1px solid var(--color-red);\n}\n\n.ck-media.error .ck-media__placeholder {\n  width: 100%;\n  padding-bottom: var(--height-ratio);\n  background: repeating-linear-gradient(\n      45deg,\n      var(--color-white),\n      var(--color-white) 30px,\n      var(--color-red) 30px,\n      var(--color-red) 60px\n  );\n}\n\n.ck-media__preview {\n  width: 100%;\n  height: 100%;\n}\n\n.ck-media__loader {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n\nck-media-loader {\n  opacity: 1;\n  visibility: visible;\n  transition: all 0.2s ease;\n  pointer-events: none;\n}\n\n.ck-media__spinner {\n  width: 100px;\n  text-align: center;\n}\n\n.ck-media__spinner > .ck-media__bounce {\n  width: 16px;\n  height: 16px;\n  background-color: var(--color-spinner);\n\n  border-radius: 100%;\n  display: inline-block;\n  -webkit-animation: ck-bounce 1.4s infinite ease-in-out both;\n  animation: ck-bounce 1.4s infinite ease-in-out both;\n}\n\n.ck-media__spinner .ck-media__bounce--1 {\n  -webkit-animation-delay: -0.32s;\n  animation-delay: -0.32s;\n}\n\n.ck-media__spinner .ck-media__bounce--2 {\n  -webkit-animation-delay: -0.16s;\n  animation-delay: -0.16s;\n}\n\n@-webkit-keyframes ck-bounce {\n  0%, 80%, 100% { -webkit-transform: scale(0) }\n  40% { -webkit-transform: scale(1.0) }\n}\n\n@keyframes ck-bounce {\n  0%, 80%, 100% {\n    -webkit-transform: scale(0);\n    transform: scale(0);\n  } 40% {\n    -webkit-transform: scale(1.0);\n    transform: scale(1.0);\n  }\n}\n\n.ck-media {\n  position: relative;\n}\n\n.ck-media__buttons {\n  position: absolute;\n  display: flex;\n}\n\n.ck-media__buttons button {\n  display: block;\n  outline: none;\n  border: none;\n  width: 30px;\n  height: 30px;\n  padding: 5px;\n  border-radius: 3px;\n  cursor: pointer;\n}\n\n.ck-media__buttons button:not(:last-child) {\n  margin-right: 5px;\n}\n\n.ck-media__buttons svg {\n  margin-top: -1px;\n  display: block;\n}\n\n.top-left {\n  top: var(--button-padding);\n  left: 5px;\n}\n\n.top {\n  top: var(--button-padding);\n  width: 100%;\n  justify-content: center;\n}\n\n.top-right {\n  top: var(--button-padding);\n  right: var(--button-padding);\n}\n\n.right {\n  top: 0;\n  right: var(--button-padding);\n  height: 100%;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.bottom-right {\n  bottom: var(--button-padding);\n  right: var(--button-padding);\n}\n\n.bottom {\n  bottom: var(--button-padding);\n  width: 100%;\n  justify-content: center;\n}\n\n.bottom-left {\n  bottom: var(--button-padding);\n  left: var(--button-padding);\n}\n\n.left {\n  top: 0;\n  left: var(--button-padding);\n  height: 100%;\n  flex-direction: column;\n  justify-content: center;\n}\n\n\n.ck-media__buttons button {\n  background: rgba(255, 255, 255, 0.5);\n  transition: 0.3s ease;\n  border: none;\n}\n\n.ck-media__buttons button:hover{\n  background: rgba(255, 255, 255, 0.8);\n  transform: scale(1.2);\n  border: none;\n}\n"},59:function(t,e){t.exports=":host {\n  --color-red: #d32323;\n  --color-black: #222330;\n  --color-black-80: rgba(0, 0, 0, 0.8);\n  --color-black-60: rgba(0, 0, 0, 0.6);\n  --color-black-15: rgba(0, 0, 0, 0.15);\n  --color-grey-light: #CCC;\n  --color-white: #FFF;\n  --align-buttons: left;\n  --font-size-small: 14px;\n  --font-size-text: 16px;\n  --baseline: 8px;\n  --baseline2: 16px;\n  position: relative;\n  display: block;\n  outline: none;\n}\n\n.ck-textfield {\n  position: relative;\n  margin-top: 40px;\n}\n.ck-textfield:before, .ck-textfield:after {\n  content: '';\n  display: table;\n  clear: both;\n}\n\n.ck-textfield.error {\n  outline: 1px solid var(--color-red);\n}\n\n.ck-tooltip {\n  font-family: var(--font-family, sans-serif);\n  font-style: initial;\n  font-weight: initial;\n  position: absolute;\n  top: 0;\n  left: 0;\n  transform: translate(-1px, -100%);\n  padding: var(--baseline) var(--baseline2);\n  border-radius: var(--baseline);\n  border-bottom-left-radius: 0;\n  font-size: var(--font-size-small);\n}\n\n.ck-tooltip--error {\n  background-color: var(--color-red);\n  color: var(--color-white);\n}\n\n.ck-tooltip--helper {\n  transform: translate(0, -100%);\n  background-color: var(--color-white);\n  box-shadow: 0px 0px 3px 1px var(--color-black-15);\n}\n"},8:function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n}}).default});
//# sourceMappingURL=components.js.map