(this.webpackJsonpown=this.webpackJsonpown||[]).push([[0],{18:function(t,n,e){"use strict";e.r(n);var c=e(1),o=e(8),r=e.n(o),a=e(4),u=e(2),l=e(0),i=function(t){var n=t.text;return Object(l.jsx)("header",{className:"sheet__header",children:Object(l.jsx)("h1",{className:"sheet__title",children:n})})};var s=function(t){var n=Object(c.useState)(t.count),e=Object(u.a)(n,2),o=e[0],r=e[1],a=Object(c.useRef)(null),i=Object(c.useState)(t.content.val),s=Object(u.a)(i,2),b=s[0],f=s[1],j=Object(c.useState)("hidden"),d=Object(u.a)(j,2),h=d[0],O=d[1],v=Object(c.useState)(t.content.val),x=Object(u.a)(v,2),m=x[0],g=x[1],y=Object(c.useState)(0),k=Object(u.a)(y,2),N=k[0],p=k[1];function _(){return 0===t.content.c||0===t.content.r}return function(){if(t.count!==o)r(t.count),console.log("rerender:, ".concat(t.content.val,",").concat(m)),g(t.content.val),f(t.content.val)}(),Object(l.jsx)(l.Fragment,{children:Object(l.jsxs)("td",{tabindex:"0",id:-(t.colNumber*t.content.r+t.content.c),className:0===t.content.r||0===t.content.c?"td_gray":-1!==t.C&&t.content.c===t.C||-1!==t.R&&t.content.r===t.R?"td_cfocus":"td",onFocus:_()?function(){}:function(){console.log("".concat(b,",").concat(m)),t.handlerOnClick(t.content.c,t.content.r),O(""),""!=m&&f(m),g(""),console.log("hOnFocus",b,"1",m)},onKeyDown:_()?function(){}:function(n){if("Enter"===n.key&&t.content.r+1<t.rowNumber){console.log("get enter");var e=t.colNumber*(t.content.r+1)+t.content.c,c=document.getElementById(-e);return a.current.blur(),void c.focus()}"Delet"!==n.key&&"Backspace"!==n.key||p(2),a.current.focus(),console.log("key",n.key)},onBlur:_()?function(){}:function(){t.handlerOnBlur(t.content.c,t.content.r,b),g(b),O("hidden"),console.log("handlerOnBlurs",b,"1",m)},onDoubleClick:_()?function(){}:function(){console.log("tdDOUBLE"),a.current.focus()},children:[Object(l.jsx)("input",{ref:a,id:t.colNumber*t.content.r+t.content.c,className:0===t.content.r||0===t.content.c?"in_gray":-1!==t.C&&t.content.c===t.C||-1!==t.R&&t.content.r===t.R?"in_cfocus":"in",type:h,value:b,onChange:_()?function(){}:function(t){console.log("hi",t.target.value,t.key),console.log("update",b,",",m),0==N?(f(t.target.value.slice(-1)),p(1)):2==N?(f(""),p(1)):f((function(n){return t.target.value}))},onBlur:_()?function(){}:function(){t.handlerOnBlur(t.content.c,t.content.r),O("hidden"),p(0),console.log("oB",b,"1",m)},onFocus:_()?function(){}:function(){console.log("input focus")},onKeyDown:_()?function(){}:function(t){}}),m]})})};var b=function(t){return Object(l.jsx)(l.Fragment,{children:Object(l.jsx)("tr",{tabindex:"1",children:t.grid.map((function(n){return Object(l.jsx)(s,{content:n,rowNumber:t.rowNumber,colNumber:t.colNumber,handlerOnClick:t.handlerOnClick,handlerOnBlur:t.handlerOnBlur,C:t.C,R:t.R,count:t.count})}))})})},f=e(7),j=e.n(f),d=e(9),h=e(10),O=e(11),v=function(){function t(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"ABCDEFGHIJKLMNOPQRSTUVWXYZ";Object(h.a)(this,t),this._chars=n,this._nextId=[0]}return Object(O.a)(t,[{key:"next",value:function(){var t,n=[],e=Object(d.a)(this._nextId);try{for(e.s();!(t=e.n()).done;){var c=t.value;n.unshift(this._chars[c])}}catch(o){e.e(o)}finally{e.f()}return this._increment(),n.join("")}},{key:"_increment",value:function(){for(var t=0;t<this._nextId.length;t++){if(!(++this._nextId[t]>=this._chars.length))return;this._nextId[t]=0}this._nextId.push(0)}},{key:Symbol.iterator,value:j.a.mark((function t(){return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=3,this.next();case 3:t.next=0;break;case 5:case"end":return t.stop()}}),t,this)}))}]),t}(),x=-1,m=-1;var g=function(t){for(var n=new v,e=[],o=0;o<702;o++)e.push(n.next());var r=Object(c.useState)(100),s=Object(u.a)(r,2),f=s[0],j=(s[1],Object(c.useState)(26)),d=Object(u.a)(j,2),h=d[0],O=d[1],g=Object(c.useState)(Array.from(Array(101),(function(){return new Array(27)}))),y=Object(u.a)(g,2),k=y[0],N=y[1],p=Object(c.useState)(0),_=Object(u.a)(p,2),C=_[0],w=_[1];0===C&&(!function(){var t,n,c=Object(a.a)(k);for(c[0][0]={val:"",r:0,c:0},t=1;t<=f;t++)c[t][0]={val:"".concat(t),r:t,c:0};for(t=1;t<=h;t++)c[0][t]={val:e[t-1],r:0,c:t};for(t=1;t<=f;t++)for(n=1;n<=h;n++)c[t][n]={val:"",r:t,c:n}}(),w(1));var B=Object(c.useState)(-1),S=Object(u.a)(B,2),I=S[0],R=S[1],F=Object(c.useState)(-1),D=Object(u.a)(F,2),E=D[0],A=D[1],J=function(t,n,e){R(-1),A(-1),Object(a.a)(k)[n][t].val=e},K=function(t,n){R(t),x=t,A(n),m=n};return console.log(k),Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)(i,{text:"MySheet"}),Object(l.jsxs)("div",{className:"container",children:[Object(l.jsxs)("div",{id:"top",children:[Object(l.jsx)("button",{className:"button",onClick:function(){if(console.log("".concat(x,",").concat(m)),-1!==x&&-1!==m){O((function(t){return t+1})),w((function(t){return t+1}));for(var t=Object(a.a)(k),n=0;n<=f;n++)t[n].splice(x,0,{val:"",r:n,c:x});for(n=1;n<=h+1;n++)t[0][n]={val:e[n-1],r:0,c:n};for(n=1;n<=f;n++)for(var c=h+1;c>x;c--)t[n][c].c=c,t[n][c].r=n;N(t)}},children:"+"}),Object(l.jsx)("button",{className:"button",onClick:function(){if(-1!==x&&-1!==m){O((function(t){return t-1})),w((function(t){return t+1}));for(var t=Object(a.a)(k),n=0;n<=f;n++)t[n].splice(x,1);for(n=1;n<=h-1;n++)t[0][n]={val:e[n-1],r:0,c:n};for(n=1;n<=f;n++)for(var c=h-1;c>=x;c--)t[n][c].c=c,t[n][c].r=n;N(t)}},children:"-"})]}),Object(l.jsxs)("div",{id:"sidebar_left",children:[Object(l.jsx)("button",{className:"button",children:"+"}),Object(l.jsx)("button",{className:"button",children:"-"})]}),Object(l.jsx)("div",{id:"content",children:Object(l.jsx)("table",{className:"table",children:Object(l.jsx)("tbody",{children:k.map((function(t){return Object(l.jsx)(b,{rowNumber:f+1,colNumber:h+1,grid:t,handlerOnClick:K,handlerOnBlur:J,C:I,R:E,count:C})}))})})})]})]})};r.a.render(Object(l.jsx)(g,{}),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.dfc23f7c.chunk.js.map