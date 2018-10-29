(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(e,t,n){e.exports=n(42)},40:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(10),l=n.n(o),s=n(11),u=n(12),i=n(14),c=n(13),m=n(15),d=n(2),h=n.n(d),f="/api/persons",p={getAll:function(){return h.a.get(f).then(function(e){return e.data})},create:function(e){return h.a.post(f,e).then(function(e){return e.data})},deletePerson:function(e){return h.a.delete("".concat(f,"/").concat(e)).then(function(e){return e.data})},update:function(e,t){return h.a.put("".concat(f,"/").concat(e),t).then(function(e){return e.data})}},g=(n(40),function(e){var t=e.name,n=e.phone,a=e.id,o=e.deletePerson;return r.a.createElement("tr",null,r.a.createElement("td",null,t),r.a.createElement("td",null,n),r.a.createElement("td",null,r.a.createElement("button",{id:a,onClick:o},"delete")))}),w=function(e){var t=e.value,n=e.onChange;return r.a.createElement("div",null,"Find: ",r.a.createElement("input",{value:t,onChange:n}))},v=function(e){var t=e.type,n=e.text;return null===n?null:r.a.createElement("div",{className:t},n)},E=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(i.a)(this,Object(c.a)(t).call(this,e))).addPerson=function(e){e.preventDefault();var t=n.state.persons.find(function(e){return e.name.toLowerCase()===n.state.newName.toLowerCase()});if(t)window.confirm(n.state.newName+" exists. Replace phone number?")&&(t.phone=n.state.newPhone,p.update(t.id,t).then(function(e){n.setState({persons:n.state.persons.map(function(t){return t.id!==e.id?t:e}),message:{type:"info",text:"Person ".concat(e.name," phone number changed.")}}),setTimeout(function(){n.setState({message:{type:null,text:null}})},5e3)}).catch(function(e){n.setState({message:{type:"error",text:"Person ".concat(t.name," is already deleted.")},persons:n.state.persons.filter(function(e){return e.id!==t.id})}),setTimeout(function(){n.setState({message:{type:null,text:null}})},5e3)}));else{var a={name:n.state.newName,phone:n.state.newPhone};p.create(a).then(function(e){n.setState({persons:n.state.persons.concat(e),newName:"",newPhone:""})}).then(function(){n.setState({message:{type:"info",text:"New person ".concat(a.name," added.")}}),setTimeout(function(){n.setState({message:{type:null,text:null}})},5e3)})}},n.deletePerson=function(e,t){return function(){window.confirm("Delete ".concat(t," ?"))&&p.deletePerson(e).then(function(a){var r=n.state.persons.filter(function(t){return t.id!==e});n.setState({persons:r,message:{type:"info",text:"Deleted person ".concat(t,".")}}),setTimeout(function(){n.setState({message:{type:null,text:null}})},5e3)})}},n.handleNameChange=function(e){n.setState({newName:e.target.value})},n.handlePhoneChange=function(e){n.setState({newPhone:e.target.value})},n.handleFilterChange=function(e){n.setState({filter:e.target.value})},n.state={persons:[],newName:"",newPhone:"",filter:"",message:{type:null,text:null}},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this;p.getAll().then(function(t){e.setState({persons:t})})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("h1",null,"Puhelinluettelo"),r.a.createElement(v,{type:this.state.message.type,text:this.state.message.text}),r.a.createElement(w,{value:this.state.filter,onChange:this.handleFilterChange}),r.a.createElement("h2",null,"Lis\xe4\xe4 uusi"),r.a.createElement("form",{onSubmit:this.addPerson},r.a.createElement("div",null,"Name: ",r.a.createElement("input",{value:this.state.newName,onChange:this.handleNameChange})),r.a.createElement("div",null,"Phone: ",r.a.createElement("input",{value:this.state.newPhone,onChange:this.handlePhoneChange})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"Lis\xe4\xe4"))),r.a.createElement("h2",null,"Numerot"),r.a.createElement("table",null,r.a.createElement("tbody",null,this.state.persons.filter(function(t){return t.name.toLowerCase().includes(e.state.filter.toLowerCase())}).map(function(t){return r.a.createElement(g,{key:t.name,name:t.name,phone:t.phone,id:t.id,deletePerson:e.deletePerson(t.id,t.name)})}))))}}]),t}(r.a.Component);l.a.render(r.a.createElement(E,null),document.getElementById("root"))}},[[16,2,1]]]);
//# sourceMappingURL=main.7a1eaa3f.chunk.js.map