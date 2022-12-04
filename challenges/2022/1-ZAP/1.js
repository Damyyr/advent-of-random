(() => {
'use strict'; return _z_ = {
sum(e,t){return this._sum(!1,e,this._callback(t))},
array(...e){const t=[];for(let r of e)if("string"!=typeof r&&r&&r[Symbol.iterator])for(let e of r)t.push(e);else t.push(r);return t},
print(e){return console.log(e),e},
max(e,t){return this._minMax(!0,e,this._callback(t))},
order(e,t,r){return[...e].sort(this._compare(t,r))},
_callback(e=(e=>e)){return"function"==typeof e?e:t=>t[e]},
_sum(e,t,r){let n=0,s=0;for(let e of t)n+=+r(e,s,t),s++;return e?n/s:n},
_minMax(e,t,r){let n,s=NaN,o=0,i=e?(e,t)=>e<=t:(e,t)=>e>=t;for(let e of t){let a=+r(e,o++,t);if(isNaN(a))return;i(a,s)||(s=a,n=e)}return n},
_compare(e=((e,t)=>e-t),t){return"asc"===e?void 0===t?(e,t)=>e-t:(e,r)=>e[t]-r[t]:"desc"===e?void 0===t?(e,t)=>t-e:(e,r)=>r[t]-e[t]:e},
},
fs = require('fs'), readline = require('readline'), Inventory = (class {constructor(items) {this.items = items; ; }}), Inventory["prototype"]['countItems'] = (function() {return _z_.sum((this["items"])); }), Inventory["prototype"]['addItem'] = (function(item) {return (this["items"]) = _z_.array((this["items"]),item); }), Inventory["prototype"]['printItems'] = (function() {return (_z_x => {for (let i of _z_x) {_z_.print(i)} return _z_x})((this["items"])); }), inputData = fs["readFileSync"]('1-input.txt','utf8'), splitted = inputData["split"]('\n\n'), inventories = ((_z_x => {let _z_i = -1; let _z_m = []; for (let d of _z_x) {++_z_i; _z_m[_z_i] = ((((d==='\n'))?(_z_.print(obj)):void 0), (new (Inventory)((d["split"]('\n')))))} return _z_m})(splitted)), _z_.print(_z_.max(inventories,(function(a,b,c) {return a["countItems"](); }))["countItems"]()), f = (function(a,b,c) {return ((b["countItems"]())-(a["countItems"]())); }), ordered = _z_.order(inventories,f), _z_.print(ordered), first = ordered["shift"](), second = ordered["shift"](), third = ordered["shift"](), _z_.print(('1: '+(first["countItems"]()))), _z_.print(('2: '+(second["countItems"]()))), _z_.print(('3: '+(third["countItems"]()))), _z_.print(_z_.sum(_z_.array(first,second,third),(function(a,b,c) {return a["countItems"](); }))); var fs,readline,Inventory,inputData,splitted,inventories,f,ordered,first,second,third,_z_;
})();