(this["webpackJsonpexcel-time-tracking"]=this["webpackJsonpexcel-time-tracking"]||[]).push([[0],{150:function(e,t,n){},165:function(e,t,n){},166:function(e,t,n){},248:function(e,t){},298:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n(0),s=n.n(r),i=n(25),o=n.n(i),c=(n(165),n(9)),d=n(10),u=n(14),l=n(13),h=(n(166),n(16)),j=n(22),f=function(){function e(){Object(c.a)(this,e),this._storage=window.localStorage,this._callbacks=[]}return Object(d.a)(e,[{key:"fetch",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=this._storage.getItem(e);return n?JSON.parse(n):t}},{key:"update",value:function(e,t){this._storage.setItem(e,JSON.stringify(t))}},{key:"subscribe",value:function(e,t){var n=this._callbacks.push(e)-1;return console.log("subscribe",n,e.name,t),n}},{key:"unsubscribe",value:function(e,t){console.log("unsubscribe",e,t),delete this._callbacks[e]}},{key:"notify",value:function(){}}]),e}(),b=n(159),m=n(2),y=n.n(m),p=n(38),v=n(47),O=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){var e,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(c.a)(this,n),(e=t.call(this,a)).start=void 0,e.end=void 0,e.comment=void 0,Object.assign(Object(v.a)(e),a),e}return Object(d.a)(n,[{key:"getStartMoment",value:function(){var e=new Date,t=this.start.split(":"),n=Object(p.a)(t,2),a=n[0],r=n[1],s=parseInt(a,10),i=parseInt(r,10);return y()(e).hours(s).minutes(i)}},{key:"getEndMoment",value:function(){var e=new Date;if(!this.end){var t=new Date;return y()(e).hours(t.getHours()).minutes(t.getMinutes())}var n=this.end.split(":"),a=Object(p.a)(n,2),r=a[0],s=a[1],i=parseInt(r,10),o=parseInt(s,10);return y()(e).hours(i).minutes(o)}},{key:"finish",value:function(){this.end||(this.end=y()().format("HH:mm"))}},{key:"hash",value:function(){return[this.start,this.end,this.comment].join(".")}},{key:"duration",get:function(){var e=this.getStartMoment(),t=this.getEndMoment();return y.a.duration(t.diff(e))}}]),n}(function(){function e(t){Object(c.a)(this,e),Object.assign(this,t)}return Object(d.a)(e,[{key:"assignProps",value:function(e){for(var t in e)e.hasOwnProperty(t)&&(console.log("this[",t,"] = ",e[t]),this[t]=e[t])}},{key:"toJson",value:function(){return JSON.stringify(this)}}]),e}()),g=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(e){var a;Object(c.a)(this,n),(a=t.call(this,e)).storage=void 0,a.storage=new f,console.time("DaysState "+a.key);var r=a.storage.fetch(a.key,[]).map((function(e){return new O(e)})).filter((function(e){return e.start}));return console.timeEnd("DaysState "+a.key),a.state={entries:r},a}return Object(d.a)(n,[{key:"updateEntries",value:function(e){console.time("DayState WRITE "+this.key),this.storage.update(this.key,e),console.timeEnd("DayState WRITE "+this.key),this.setState({entries:e})}},{key:"updateOne",value:function(e){var t=this.state.entries,n=t.findIndex((function(t){return t===e}));-1!==n?(t[n]=e,this.updateEntries(t)):console.error("index in updateOne not found")}},{key:"remove",value:function(e){this.state.entries.splice(e,1),this.storage.update(this.key,this.state.entries),this.setState({entries:this.state.entries})}},{key:"hash",value:function(){return[this.props.date].concat(Object(b.a)(this.state.entries.map((function(e){return e.hash()})))).join(".")}},{key:"render",value:function(){return this.props.children(this)}},{key:"key",get:function(){return"date."+y()(this.props.date).format("YYYY-MM-DD")+".entries"}},{key:"sumTime",get:function(){return this.state.entries.reduce((function(e,t){return t.duration.add(e)}),y.a.duration(0))}}]),n}(s.a.Component),x=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).storage=void 0,a.state={},a.storage=new f,a.state.rate=a.storage.fetch("rate",50),a}return Object(d.a)(n,[{key:"setRate",value:function(e){this.setState({rate:e})}},{key:"getDay",value:function(e){return new g({date:e,children:function(e){return Object(a.jsx)(a.Fragment,{})}})}},{key:"render",value:function(){var e=this;return console.warn("DayProvider",y()(this.props.date).toISOString()),Object(a.jsx)(g,{date:this.props.date,children:function(t){return console.log(t.state.entries),e.props.children(t,e)}})}}]),n}(s.a.Component),k=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).storage=void 0,a.state={date:new Date},a.storage=new f,a.state.date=a.storage.fetch("date",a.state.date),a}return Object(d.a)(n,[{key:"setDate",value:function(e){console.log("setDate",y()(e).toISOString()),this.storage.update("date",e),this.setState({date:e})}},{key:"incDate",value:function(){this.setDate(y()(this.state.date).add(1,"day").toDate())}},{key:"decDate",value:function(){this.setDate(y()(this.state.date).subtract(1,"day").toDate())}},{key:"render",value:function(){return console.log("DateState render",y()(this.state.date).toISOString()),Object(a.jsx)(s.a.Fragment,{children:this.props.children(this.state.date,this.setDate.bind(this),this)},this.state.date.toString())}}]),n}(s.a.Component),w=n(55),D=n(153),S=(n(239),n(240),n(67)),E=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).context=void 0,e.state={focused:!1},e}return Object(d.a)(n,[{key:"isOutsideRange",value:function(e){return!!e.isAfter(y()().endOf("day"))}},{key:"isDayHighlighted",value:function(e){return this.props.day.state.entries.length>0}},{key:"render",value:function(){var e=this;return Object(a.jsx)("header",{className:"mb-3",children:Object(a.jsxs)(S.a,{className:"navbar navbar-expand-lg navbar-light bg-light",children:[Object(a.jsx)(S.a.Brand,{className:"navbar-brand",children:Object(a.jsx)("a",{href:".",children:"excel-time-tracking"})}),Object(a.jsx)(D.SingleDatePicker,{date:this.props.date,onDateChange:function(t){return e.setDate(t)},focused:this.state.focused,onFocusChange:function(t){return e.setState({focused:t.focused})},id:"your_unique_id",isOutsideRange:this.isOutsideRange.bind(this),isDayHighlighted:this.isDayHighlighted.bind(this),initialVisibleMonth:function(){return y()().endOf("month")}}),Object(a.jsx)("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarNav","aria-controls":"navbarNav","aria-expanded":"false","aria-label":"Toggle navigation",children:Object(a.jsx)("span",{className:"navbar-toggler-icon"})}),Object(a.jsxs)(S.a.Collapse,{className:"collapse navbar-collapse justify-content-between",id:"navbarNav",children:[Object(a.jsx)("div",{}),Object(a.jsxs)("div",{className:"navbar-nav",children:[Object(a.jsx)(w.a,{className:["nav-link","/"===this.props.location.pathname?"active":""].join(" "),to:"/",children:"Home"}),Object(a.jsx)(w.a,{className:["nav-link","/report"===this.props.location.pathname?"active":""].join(" "),to:"/report",children:"Report"})]})]})]})})}},{key:"logout",value:function(e){}},{key:"setDate",value:function(e){console.log(e),this.props.setDate(e.toDate())}}]),n}(s.a.Component),N=Object(h.f)(E),C=s.a.createContext(void 0),H=n(156),I=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).context=void 0,e.state={},e}return Object(d.a)(n,[{key:"render",value:function(){var e=this,t=y()(this.props.date).daysInMonth(),n=Array.from(new Array(t),(function(e,t){return t+1}));return Object(a.jsx)("div",{children:n.map((function(t){var n=y()(e.props.date).startOf("month").date(t),r=e.props.getDay(n.toDate());return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)("h3",{children:[n.format("YYYY-MM-DD"),0===r.sumTime.asHours()?null:": "+r.sumTime.asHours().toFixed(2)+" h"]},t),Object(a.jsx)(H.a,{as:"table",children:Object(a.jsx)("tbody",{children:r.state.entries.map((function(e){return Object(a.jsxs)("tr",{children:[Object(a.jsx)("td",{children:e.start}),Object(a.jsx)("td",{children:e.end}),Object(a.jsxs)("td",{children:[e.duration.asHours().toFixed(2)," ","h"]}),Object(a.jsx)("td",{children:e.comment})]})}))})})]})}))})}}]),n}(s.a.Component),R=(n(150),function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).context=void 0,e.state={},e}return Object(d.a)(n,[{key:"render",value:function(){return Object(a.jsxs)("div",{className:"mb-3",style:{position:"relative",height:"1.55em",border:"solid 1px silver"},children:[Object(a.jsx)("div",{style:{position:"absolute",top:0,left:0,width:"100%"},children:Object(a.jsx)("div",{className:"d-flex justify-content-between",children:Array.from(new Array(24),(function(e,t){return t})).map((function(e){return Object(a.jsx)("div",{style:{borderRight:"solid 1px silver",color:"silver",flex:"1 1 0px",height:"1.5em",textAlign:"center"},children:e%2===0?e:null},e)}))})}),Object(a.jsx)("div",{style:{position:"absolute",top:0,left:0,width:"100%"},children:this.props.workEntries.map((function(e){var t=e.getStartMoment(),n=e.getEndMoment().diff(t,"minutes")/24/60*100,r=t.clone().startOf("day"),s=t.diff(r,"minutes")/24/60*100;return Object(a.jsx)("div",{style:{background:"#009ACD",height:"1.5em",width:n+"%",position:"absolute",left:s+"%",top:0,opacity:.5}},e.start)}))})]})}}]),n}(s.a.Component)),M=n(57),T=n(293),A=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).context=void 0,e}return Object(d.a)(n,[{key:"render",value:function(){var e=T.byCountry(),t=navigator.language.substr(3),n=e.get(t),r=this.props.rate,s=this.props.hours*r,i=new Intl.NumberFormat(void 0,{style:"currency",currency:n}).format(s);return Object(a.jsx)("span",{onClick:this.askPrice.bind(this),children:i})}},{key:"askPrice",value:function(){var e=prompt("Price per Hour?");if(e){var t=parseFloat(e);t&&this.context.setRate(t)}}}]),n}(s.a.Component);A.contextType=C;var P=n(300),L=n(157),Y=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).context=void 0,e}return Object(d.a)(n,[{key:"render",value:function(){var e=this;return Object(a.jsx)(a.Fragment,{children:Object(a.jsxs)(P.a,{children:[Object(a.jsx)(L.a,{onClick:function(){return e.props.makeEditable(!0)},children:this.startValue}),Object(a.jsx)(L.a,{className:"text-right",onClick:function(){return e.props.makeEditable(!0)},children:this.endValue}),Object(a.jsx)(L.a,{className:"text-right",children:this.duration}),Object(a.jsx)(L.a,{className:"text-right",children:this.earnings}),Object(a.jsx)(L.a,{onClick:function(){return e.props.makeEditable(!0)},children:this.props.timeEntry.comment})]})})}},{key:"startValue",get:function(){return this.props.timeEntry.start?this.props.timeEntry.start:y()().format("HH:mm")}},{key:"endValue",get:function(){return this.props.timeEntry.end?this.props.timeEntry.end:""}},{key:"duration",get:function(){var e=this.props.timeEntry.duration;return e.hours().toString().padStart(2,"0")+":"+e.minutes().toString().padStart(2,"0")}},{key:"earnings",get:function(){var e=this.props.timeEntry.duration.asHours();return Object(a.jsx)(A,{hours:e,rate:50})}}]),n}(s.a.Component),F=n(302),V=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).timer=void 0,a.formRef=void 0,a.textInput=void 0,console.log("TimeEntryEdit.constructor"),a.formRef=s.a.createRef(),a.textInput=s.a.createRef(),a.keydownHandler=a.keydownHandler.bind(Object(v.a)(a)),a}return Object(d.a)(n,[{key:"keydownHandler",value:function(e){"Enter"===e.key&&e.ctrlKey&&(e.preventDefault(),this.submit()),"Backspace"===e.key&&e.ctrlKey&&(e.preventDefault(),console.log(e.key),this.props.remove())}},{key:"componentDidMount",value:function(){var e,t;console.log("addEventListener"),document.addEventListener("keydown",this.keydownHandler),null===(e=this.textInput)||void 0===e||null===(t=e.current)||void 0===t||t.focus()}},{key:"componentWillUnmount",value:function(){console.log("removeEventListener"),document.removeEventListener("keydown",this.keydownHandler)}},{key:"submit",value:function(e){e&&e.preventDefault(),console.log("formRef",this.formRef.current),this.formRef.current&&this.props.onChange(this.formRef.current),this.props.makeEditable(!1)}},{key:"render",value:function(){return Object(a.jsx)(F.a,{ref:this.formRef,onSubmit:this.submit.bind(this),children:Object(a.jsxs)(P.a,{className:"timeEntryRow",children:[Object(a.jsx)(L.a,{children:Object(a.jsx)("input",{type:"time",name:"start",form:"form1",defaultValue:this.startValue,className:"form-control",ref:this.textInput})}),Object(a.jsx)(L.a,{children:Object(a.jsx)("div",{className:"d-flex",children:this.endValue?Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("input",{type:"time",name:"end",form:"form1",defaultValue:this.endValue,className:"form-control"}),Object(a.jsx)("a",{href:"/play",className:"pl-3",onClick:this.play.bind(this),children:Object(a.jsx)(M.a,{})})]}):Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("output",{children:this.endOutput}),Object(a.jsx)("a",{href:"/stop",className:"pl-3",onClick:this.stop.bind(this),children:Object(a.jsx)(M.c,{})})]})})}),Object(a.jsx)(L.a,{className:"text-right",children:Object(a.jsx)("output",{children:this.duration})}),Object(a.jsx)(L.a,{className:"text-right",children:Object(a.jsx)("output",{children:this.earnings})}),Object(a.jsx)(L.a,{children:Object(a.jsx)("textarea",{name:"comment",placeholder:"comment",className:"form-control",form:"form1",defaultValue:this.props.timeEntry.comment})})]})})}},{key:"play",value:function(e){e.preventDefault(),this.props.timeEntry.end=void 0,this.props.day.updateOne(this.props.timeEntry),this.startTimer()}},{key:"startTimer",value:function(){var e=this;this.timer=setInterval((function(){return e.forceUpdate()}),1e3)}},{key:"stop",value:function(e){e.preventDefault(),this.props.timeEntry.end=y()().format("HH:mm"),this.props.day.updateOne(this.props.timeEntry),this.stopTimer(),this.props.makeEditable(!1)}},{key:"stopTimer",value:function(){this.timer&&clearInterval(this.timer)}},{key:"endOutput",get:function(){return y()().format("HH:mm:ss")}}]),n}(Y),W=n(301),K=n(158);var B=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).context=void 0,e.state={entries:[],editable:[]},e}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.fetch(),document.addEventListener("keydown",(function(t){return e.keydownHandler(t)}))}},{key:"componentWillUnmount",value:function(){var e=this;document.removeEventListener("keydown",(function(t){return e.keydownHandler(t)}))}},{key:"componentDidUpdate",value:function(e){e.date!==this.props.date&&this.fetch()}},{key:"fetch",value:function(){var e=this,t=this.props.day.state.entries;this.setState({entries:t},(function(){e.state.entries.length}))}},{key:"keydownHandler",value:function(e){"Insert"===e.key&&this.addRow(e),"Escape"===e.key&&this.setState({editable:[]})}},{key:"render",value:function(){var e=this;return Object(a.jsxs)(W.a,{fluid:!0,id:"timeTable",className:"py-3",children:[Object(a.jsxs)(P.a,{className:"border-top",style:{color:"#495057",backgroundColor:"#e9ecef",borderColor:"#dee2e6"},children:[Object(a.jsx)(L.a,{children:"Start Time"}),Object(a.jsx)(L.a,{className:"text-right",children:"End Time"}),Object(a.jsx)(L.a,{className:"text-right",children:"Duration"}),Object(a.jsx)(L.a,{className:"text-right",children:"Earnings"}),Object(a.jsx)(L.a,{children:"Comment"})]}),this.state.entries.map((function(t,n){return t.end&&!e.state.editable[n]?Object(a.jsx)(Y,{date:e.props.date,timeEntry:t,day:e.props.day,onChange:function(t){return e.onChange(t,n)},makeEditable:function(t){return e.makeEditable(n,t)},remove:function(){}},n):Object(a.jsx)(V,{date:e.props.date,timeEntry:t,day:e.props.day,onChange:function(t){return e.onChange(t,n)},makeEditable:function(t){return e.makeEditable(n,t)},remove:e.remove.bind(e,n,t)},n)})),Object(a.jsxs)(P.a,{className:"tfoot-light",style:{color:"#495057",backgroundColor:"#e9ecef",borderColor:"#dee2e6"},children:[Object(a.jsx)(L.a,{children:Object(a.jsx)("a",{href:"/addRow",onClick:this.addRow.bind(this),children:Object(a.jsx)(M.b,{})})}),Object(a.jsxs)(L.a,{className:"text-right",children:["\u03a3 ",this.sumTime]}),Object(a.jsxs)(L.a,{className:"text-right",children:[this.sumHours," h"]}),Object(a.jsx)(L.a,{className:"text-right",children:this.sumMoney}),Object(a.jsx)(L.a,{})]})]})}},{key:"onChange",value:function(e,t){if(console.log("onChange",t,e),null!==e){var n=function(e){return Array.from(e).map((function(e){return e.name?Object(K.a)({},e.name,e.value):{}})).reduce((function(e,t){return Object.assign(e,t)}),{})}(e.querySelectorAll("input, textarea")),a=this.state.entries;a[t]=new O(n),this.setState({entries:a}),this.props.day.updateEntries(this.state.entries)}}},{key:"addRow",value:function(e){var t=this;e&&e.preventDefault();var n=this.state.entries;n.length>0&&n[n.length-1].finish();n.push(new O({start:y()().subtract(1,"hour").format("HH:mm"),end:y()().format("HH:mm")}));var a=n.length-1,r=this.state.editable;r[a]=!0,this.setState({entries:n,editable:r},(function(){t.props.day.updateEntries(n)}))}},{key:"addPlay",value:function(e){var t=this;e&&e.preventDefault();var n=this.state.entries;n.length>0&&n[n.length-1].finish();n.push(new O({start:y()().format("HH:mm")})),this.setState({entries:n},(function(){t.props.day.updateEntries(n)}))}},{key:"makeEditable",value:function(e,t){var n=this.state.editable;n[e]=t,this.setState({editable:n})}},{key:"remove",value:function(e,t){console.log("removing",e),this.props.day.remove(e)}},{key:"sumHours",get:function(){return this.props.day.sumTime.asHours().toFixed(2)}},{key:"sumTime",get:function(){var e=this.props.day.sumTime,t=e.get("hours"),n=e.get("minutes");return t.toString().padStart(2,"0")+":"+n.toString().padStart(2,"0")}},{key:"sumMoney",get:function(){var e=this.props.day.sumTime.asHours();return Object(a.jsx)(A,{hours:e,rate:50})}}]),n}(s.a.Component),U=function(e){var t=e.children,n=e.waitBeforeShow,a=void 0===n?500:n,s=Object(r.useState)(!1),i=Object(p.a)(s,2),o=i[0],c=i[1];return Object(r.useEffect)((function(){setTimeout((function(){c(!0)}),a)}),[a]),o?t:null};function _(e){var t=e.monday,n=e.dayProvider;return(0,e.children)(function(){for(var e=[],a=0;a<7;a++){var r=n.getDay(t.clone().add(a,"days").toDate());e.push(r)}return e}())}var J=s.a.memo(_,(function(e,t){return e.monday.toISOString()===t.monday.toISOString()})),z=n(58),q=n(296),$=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).context=void 0,e}return Object(d.a)(n,[{key:"render",value:function(){var e=this.hashtags;return Object(a.jsxs)("div",{className:"card w-100",children:[Object(a.jsxs)("div",{className:"jumbotron p-3",children:[Object(a.jsxs)("h1",{className:"display-4 text-center",children:[this.sumHours,"h"]}),Object(a.jsx)("h3",{className:"lead left",children:this.sumTime}),Object(a.jsx)("h3",{className:"lead text-right",children:this.sumMoney})]}),Object(a.jsx)("div",{className:"card-body",children:this.title}),Object(a.jsx)("ul",{className:"list-group list-group-flush",children:Object.keys(e).map((function(t){return Object(a.jsxs)("li",{className:"list-group-item d-flex justify-content-between",children:[t,Object(a.jsxs)("span",{className:"badge badge-primary badge-pill",children:[e[t].toFixed(2),"h"]})]},t)}))}),Object(a.jsx)("div",{className:"text-muted",children:Math.random()})]})}},{key:"duration",get:function(){var e,t=y.a.duration(0),n=Object(z.a)(this.props.dateRange);try{for(n.s();!(e=n.n()).done;){var a=e.value;t.add(a.sumTime)}}catch(r){n.e(r)}finally{n.f()}return t}},{key:"sumHours",get:function(){return this.duration.asHours().toFixed(2)}},{key:"sumTime",get:function(){var e=this.duration.get("hours"),t=this.duration.get("minutes");return e.toString().padStart(2,"0")+":"+t.toString().padStart(2,"0")}},{key:"sumMoney",get:function(){var e=this.duration.asHours();return Object(a.jsx)(A,{hours:e,rate:50})}},{key:"hashtags",get:function(){var e,t={},n=Object(z.a)(this.props.dateRange);try{for(n.s();!(e=n.n()).done;){var a,r=e.value,s=Object(z.a)(r.state.entries);try{for(s.s();!(a=s.n()).done;){var i,o=a.value,c=q(o.comment),d=Object(z.a)(c);try{for(d.s();!(i=d.n()).done;){var u=i.value;u in t||(t[u]=0),t[u]+=o.duration.asHours()}}catch(h){d.e(h)}finally{d.f()}}}catch(h){s.e(h)}finally{s.f()}}}catch(h){n.e(h)}finally{n.f()}var l=Object.entries(t).sort((function(e,t){return t[1]-e[1]}));return Object.fromEntries(l)}},{key:"title",get:function(){return Object(a.jsxs)("h5",{style:{paddingTop:0},children:["Week #",y()(this.props.date).isoWeek()," total"]})}}]),n}(s.a.PureComponent),G=$,Q=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"title",get:function(){var e=y()(this.props.date);return Object(a.jsxs)("h5",{children:["Month ",e.format("YYYY-MM")," total"]})}}]),n}($),X=s.a.memo(Q);function Z(e){var t=Object(r.useState)([]),n=Object(p.a)(t,2),s=n[0],i=n[1],o=Object(r.useCallback)((function(t){if("c"===t.key.toLowerCase()&&t.ctrlKey){console.log("Ctrl-C");var n=e.day.state.entries;i(n.slice()),console.log(n,s)}else if("v"===t.key.toLowerCase()&&t.ctrlKey){if(console.log("Ctrl-V"),!s)return void console.log("clipboard is empty");if(e.day.state.entries.length)return void console.warn("Overwriting is dangerous");console.log(s),e.day.updateEntries(s.slice())}else t.key&&t.key}),[e.day,s]);return Object(r.useEffect)((function(){return document.addEventListener("keydown",o,!1),function(){document.removeEventListener("keydown",o,!1)}}),[e.day,s,o]),Object(a.jsx)(a.Fragment,{})}function ee(e){return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(R,{workEntries:e.dayData.state.entries}),Object(a.jsx)(B,{date:e.date,day:e.dayData,appState:e.appState}),Object(a.jsx)("div",{className:"d-flex justify-content-between",style:{gap:12},children:Object(a.jsxs)(U,{children:[Object(a.jsx)(J,{monday:y()(e.date).startOf("week"),dayProvider:e.appState,children:function(t){return Object(a.jsx)(G,{date:e.date,dateRange:t})}}),Object(a.jsx)(J,{monday:y()(e.date).startOf("month"),dayProvider:e.appState,children:function(t){return Object(a.jsx)(X,{date:e.date,dateRange:t})}})]})}),Object(a.jsx)(Z,{day:e.dayData})]})}function te(e){var t=e.date,n=e.setDate;return Object(a.jsxs)(h.c,{children:[Object(a.jsx)(h.a,{exact:!0,path:"/",children:Object(a.jsx)(ee,{date:t,setDate:n,dayData:e.dayData,appState:e.dayProvider})}),Object(a.jsx)(h.a,{path:"/report",children:Object(a.jsx)(C.Provider,{value:e.dayProvider,children:Object(a.jsx)(I,{date:t,getDay:e.dayProvider.getDay.bind(e.dayProvider)})})})]})}function ne(e){var t=Object(r.useCallback)((function(t){"ArrowLeft"===t.key&&t.ctrlKey?e.decDate():"ArrowRight"===t.key&&t.ctrlKey?e.incDate():t.key&&t.key}),[e]);return Object(r.useEffect)((function(){return document.addEventListener("keydown",t,!1),function(){document.removeEventListener("keydown",t,!1)}}),[e,t]),Object(a.jsx)(a.Fragment,{})}var ae=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).context=void 0,a.myInput=void 0,a.myInput=s.a.createRef(),a}return Object(d.a)(n,[{key:"keydownHandler",value:function(e){var t=(e.ctrlKey||e.metaKey)&&e.shiftKey;t&&"ArrowLeft"===e.key&&this.dayClick(e,y()(this.props.date).subtract("1","day")),t&&"ArrowRight"===e.key&&this.dayClick(e,y()(this.props.date).add("1","day"))}},{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.keydownHandler.bind(this)),console.log("width",this.myInput.current.offsetWidth,"rerender"),this.myInput.current&&window.addEventListener("resize",this.handleResize.bind(this)),this.forceUpdate()}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.keydownHandler.bind(this)),window.removeEventListener("resize",this.handleResize.bind(this))}},{key:"handleResize",value:function(){console.log("resize"),this.forceUpdate()}},{key:"render",value:function(){for(var e=this,t=[],n=y()(this.props.date),r=-this.range;r<=this.range;r++)t.push(n.clone().add(r,"days"));return this.myInput.current?Object(a.jsx)("div",{className:"d-flex justify-content-center mb-3",ref:this.myInput,children:t.map((function(t){var n=[6,7].includes(t.isoWeekday())?"weekend":"",r=t.isSame(e.props.date,"day")?"today":"",s=Object(a.jsx)("div",{className:"dayBox border text-center align-baseline "+[n,r].join(" "),children:t.format("DD")},t.toISOString());return t.isSame(e.props.date,"day")?s:Object(a.jsx)("a",{href:"/day/"+t.format("YYYY-MM-DD"),onClick:function(n){return e.dayClick(n,t)},style:{textDecoration:"none"},children:s},t.toISOString())}))}):Object(a.jsx)("div",{className:"d-flex justify-content-center mb-3",ref:this.myInput})}},{key:"dayClick",value:function(e,t){e.preventDefault(),this.props.setDate(t.toDate())}},{key:"range",get:function(){return this.myInput.current?Math.round(this.myInput.current.offsetWidth/32/2)-1:10}}]),n}(s.a.Component);function re(e){return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(N,{date:y()(e.date),day:e.dayData,setDate:e.setDate}),Object(a.jsx)("main",{role:"main",className:"container-fluid",children:Object(a.jsxs)("div",{className:"h-100",children:[Object(a.jsx)(ae,{date:e.date,setDate:e.setDate}),Object(a.jsx)(te,{date:e.date,setDate:e.setDate,dayData:e.dayData,dayProvider:e.dayProvider})]})}),Object(a.jsx)(ne,{incDate:e.dateState.incDate.bind(e.dateState),decDate:e.dateState.decDate.bind(e.dateState)}),Object(a.jsx)("footer",{className:"container-fluid mt-3 pt-2 border-top",children:Object(a.jsxs)("div",{className:"inner",children:[Object(a.jsxs)("div",{children:["\xa9 2021"," ",Object(a.jsx)("a",{href:"https://github.com/spidgorny/",children:"Slawa"})]}),Object(a.jsxs)(P.a,{children:[Object(a.jsxs)(L.a,{children:[Object(a.jsx)("kbd",{children:"Ins"}),": new line, ",Object(a.jsx)("kbd",{children:"Ctrl-Enter"}),": save, ",Object(a.jsx)("kbd",{children:"Ctrl-Backspace"}),": remove"]}),Object(a.jsxs)(L.a,{children:[Object(a.jsx)("kbd",{children:"Ctrl-C"}),", ",Object(a.jsx)("kbd",{children:"Ctrl-V"}),": clipboard"]})]})]})})]})}function se(e){var t=Object(r.useCallback)((function(t){if("s"===t.key&&t.ctrlKey){t.preventDefault();for(var n=2020,a=[],r=y()().year(n).startOf("year"),s=y()(r).add(1,"year");r.isBefore(s);)a.push(r.toDate()),r=r.add(1,"day");console.log("yearDates",a.length);for(var i={},o=0,c=a;o<c.length;o++){var d=c[o],u=e.dayProvider.getDay(d);u.state.entries.length&&(i[y()(d).format("YYYY-MM-DD")]=u.state.entries.slice())}!function(e,t){var n="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(e,null,2)),a=document.createElement("a");a.setAttribute("href",n),a.setAttribute("download",t+".json"),document.body.appendChild(a),a.click(),a.remove()}({signature:"excel-time-tracking",year:n,data:i},"excel-time-tracking-2020")}}),[e.dayProvider]);return Object(r.useEffect)((function(){return window.addEventListener("keydown",t),function(){window.removeEventListener("keydown",t)}}),[t]),Object(a.jsx)(a.Fragment,{})}var ie=Object(j.a)(),oe=(new Date,function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).context=void 0,e.state={},e}return Object(d.a)(n,[{key:"render",value:function(){return Object(a.jsx)(k,{children:function(e,t,n){return Object(a.jsx)(x,{date:e,children:function(r,s){return Object(a.jsxs)(h.b,{history:ie,children:[Object(a.jsx)(re,{date:e,dayData:r,setDate:t,dayProvider:s,dateState:n}),Object(a.jsx)(se,{dayProvider:s})]})}})}})}}]),n}(s.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(Object(a.jsx)(s.a.StrictMode,{children:Object(a.jsx)(oe,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[298,1,2]]]);
//# sourceMappingURL=main.7c672576.chunk.js.map