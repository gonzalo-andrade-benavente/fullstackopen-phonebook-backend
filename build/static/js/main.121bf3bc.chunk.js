(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{40:function(e,n,t){"use strict";t.r(n);var c=t(2),r=t(16),o=t.n(r),s=(t(7),t(3)),i=t(0),u=function(e){e.persons;var n=e.setPersons,t=e.phonebookService;return Object(i.jsxs)("div",{children:["filter shown with ",Object(i.jsx)("input",{onChange:function(e){var c=e.target.value;t.getAll().then((function(e){n(e.filter((function(e){return e.name.includes(c)})))}))}})]})},a=t(6),d=t(4),j=t.n(d),l="/api/persons",b={getAll:function(){return j.a.get(l).then((function(e){return e.data}))},create:function(e){return j.a.post(l,e).then((function(e){return e.data}))},deletePerson:function(e){return j.a.delete("".concat(l,"/").concat(e)).then((function(e){return e.data}))},update:function(e,n){return j.a.put("".concat(l,"/").concat(e),n).then((function(e){return e.data}))}},h=function(e){var n=e.persons,t=e.setPersons,r=e.setSuccess,o=Object(c.useState)(""),u=Object(s.a)(o,2),d=u[0],j=u[1],l=Object(c.useState)(""),h=Object(s.a)(l,2),f=h[0],O=h[1];return Object(i.jsx)("div",{children:Object(i.jsxs)("form",{children:[Object(i.jsxs)("div",{children:["name: ",Object(i.jsx)("input",{value:d,onChange:function(e){j(e.target.value)}})]}),Object(i.jsxs)("div",{children:["number: ",Object(i.jsx)("input",{value:f,onChange:function(e){O(e.target.value)}})]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{type:"submit",onClick:function(e){e.preventDefault();var c={name:d,number:f};if(0===n.filter((function(e){return e.name===d})).length)b.create(c).then((function(e){t(n.concat(e)),j(""),O(""),r({msg:"ok",content:"Added ".concat(d)}),setTimeout((function(){r({msg:null,content:""})}),3e3)})).catch((function(e){var n=e.response.data.error;r({msg:"nok",content:n}),setTimeout((function(){r({msg:null,content:""})}),3e3)}));else if(window.confirm("".concat(d," is already added to phonebook, replace the old number with a new one?"))){var o=n.find((function(e){return e.name===d})),s=Object(a.a)(Object(a.a)({},o),{},{number:f});b.update(o.id,s).then((function(e){t(n.map((function(n){return n.id===o.id?e:n})))}))}},children:"add"})})]})})},f=function(e){var n=e.persons,t=e.setPersons;return Object(i.jsx)("div",{children:n.map((function(e){return Object(i.jsxs)("div",{children:[" ",e.name," ",e.number," ",Object(i.jsx)("button",{onClick:function(){return c=e.name,r=e.id,void(window.confirm(" Delete ".concat(c,"?"))&&b.deletePerson(r).then((function(e){var c=n.filter((function(e){return e.id!==r}));t(c)})));var c,r},children:" delete "})," "]},e.id)}))})},O=function(e){var n=e.message;return console.log(n),null===n.msg?null:Object(i.jsx)(i.Fragment,{children:"ok"===n.msg?Object(i.jsx)("div",{className:"success",children:n.content}):Object(i.jsx)("div",{className:"error",children:n.content})})};var m=function(){var e=Object(c.useState)([]),n=Object(s.a)(e,2),t=n[0],r=n[1],o=Object(c.useState)({msg:null,content:""}),a=Object(s.a)(o,2),d=a[0],j=a[1];return Object(c.useEffect)((function(){b.getAll().then((function(e){r(e)}))}),[]),Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Phonebook"}),Object(i.jsx)(O,{message:d},"success"),Object(i.jsx)(u,{persons:t,setPersons:r,phonebookService:b}),Object(i.jsxs)("h3",{children:["Add a ",Object(i.jsx)("b",{children:"new"})]}),Object(i.jsx)(h,{persons:t,setPersons:r,setSuccess:j}),Object(i.jsx)("h2",{children:"Numbers"}),Object(i.jsx)(f,{persons:t,setPersons:r,phonebookService:b})]})};o.a.render(Object(i.jsx)(m,{}),document.getElementById("root"))},7:function(e,n,t){}},[[40,1,2]]]);
//# sourceMappingURL=main.121bf3bc.chunk.js.map