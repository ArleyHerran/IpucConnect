import{_ as O}from"./PanelControl-7df2cc45.js";import{_ as W,u as X,b as v,P as Y,d as Z,o as d,c as x,w as n,a as l,ax as G,h as e,i as I,p as K,v as Q,f as g,s as _,ay as ee,V as M,k as T,j as s,n as z,t as i,y as N,W as D,a0 as oe,a1 as te,a2 as ae,Z as y,az as se,Y as C,aA as B,X as ne,$ as ie,a4 as le,a5 as re}from"./index-90f7fbfb.js";import{a as A,s as u}from"./VFooter-00ceb151.js";import{V as ce}from"./VForm-b35ddd23.js";import{V as ue}from"./VRow-9d2fd381.js";import{V as U}from"./VCol-fcab6052.js";import{V as de}from"./VContainer-cae74a55.js";import"./VApp-187cba23.js";import"./_commonjsHelpers-725317a4.js";import"./form-1a9ccaaf.js";const r=h=>(le("data-v-3a84a547"),h=h(),re(),h),me={class:"inputBox"},_e={key:0,type:"submit",color:"success"},fe={class:"my-3"},ve=r(()=>e("strong",null,"Tipo de Documento:",-1)),pe={class:"my-3"},he=r(()=>e("strong",null,"Número de Documento:",-1)),be={class:"my-3"},ge=r(()=>e("strong",null,"Nombre:",-1)),ye={class:"my-3"},xe=r(()=>e("strong",null,"Apellido:",-1)),Se={class:"my-3"},we=r(()=>e("strong",null,"Rol:",-1)),De={class:"my-3"},Ce=r(()=>e("strong",null,"Fecha de Nacimiento:",-1)),Ve={class:"my-3"},ke=r(()=>e("strong",null,"Celular:",-1)),Ee={class:"my-3"},Ie=r(()=>e("strong",null,"Departamento:",-1)),Ne={class:"my-3"},Pe=r(()=>e("strong",null,"Municipio:",-1)),Me={class:"my-3"},Te=r(()=>e("strong",null,"Sede:",-1)),ze={class:"my-3"},Be=r(()=>e("strong",null,"Dirección:",-1)),Ae={class:"my-3"},Ue=r(()=>e("strong",null,"Sexo:",-1)),Re={class:"my-3"},qe=r(()=>e("strong",null,"Estado Civil:",-1)),Fe={key:1,style:{color:"#ff5252","font-size":"13px"}},$e={key:2,class:"my-3"},je={key:0,style:{color:"#ff5252","font-size":"13px"}},He={key:1,style:{color:"#ff5252","font-size":"13px"}},Je={__name:"DatosMiembro",setup(h){const V=X();v("");const m=v(!1),S=v(!1),k=v(!1),f=v(""),p=v(""),t=Y({idDoc:"",estado:"Activo",tipoDocumento:"314",numeroDocumento:"",nombre:"Juan",apellido:"Pérez",rol:"Usuario",fechaNacimiento:"1990-01-15",celular:"123-456-789",direccion:"Calle Principal 123",sexo:"Masculino",estadoCivil:"Soltero",esBautizado:"Sí",fechaBautismo:"2010-06-20",nombrePastorBautismo:"Pastor Juan",referenciaPastoral:"Iglesia de la Comunidad",sede:""}),b=v({departamento:"bh",municipio:"bgg",nombre:"gg"});async function R(){await u({title:"¿Estás seguro?",text:"Esto enviará la solicitud de traslado.",icon:"warning",buttons:!0,dangerMode:!0})?(m.value=!0,setTimeout(()=>{J()},1500)):u("Cancelado","La solicitud de traslado no se ha enviado.","info")}async function q(a){await u({title:"¿Estás seguro?",text:"Esto habilitara la persona y sera visible en su base de datos.",icon:"warning",buttons:!0,dangerMode:!0})?(m.value=!0,setTimeout(()=>{L(a)},1500)):u("Cancelado","La activacion no se ha realizado.","info")}function F(){if(f.value==""){u("Campo vacio !","","info");return}t.numeroDocumento="",S.value=!0,setTimeout(()=>{$()},2e3)}async function $(){k.value=await H(f.value.toString());const a=oe(ae(y,"Membresia"),te("numeroDocumento","==",f.value.toString()));await se(a,o=>{let c=!1;o.forEach(w=>{c=!0,p.value=w.data(),console.log(p.value),j(w.data().sede);for(const E in t)w.data().hasOwnProperty(E)&&(t[E]=w.data()[E])}),c||u("","No se encontraron registros con el número de documento especificado.","info"),S.value=!1})}async function j(a){const o=C(y,"Users",a),c=await B(o);c.exists()?b.value=c.data():console.log("No such document!")}async function H(a){const o=C(y,"Solicitudes",a);return!!(await B(o)).exists()}async function J(){try{var a=p.value.numeroDocumento;console.log(a);const o=await ne(C(y,"Solicitudes",a),{miembro:a,nombre:p.value.nombre+" "+p.value.apellido,userReceptor:p.value.sede,userEmisor:D.currentUser.email,fecha:new Date().toISOString().split("T")[0],Hora:new Date().toTimeString().split(" ")[0]});u("Éxito!","Solicitud de traslado enviada con éxito.","success"),m.value=!1}catch(o){console.log(o),u("Error","Hubo un problema al enviar la solicitud de traslado.","error")}}async function L(a){console.log(a);try{const o=C(y,"Membresia",a);await ie(o,{estado:"Activo"}),u("Éxito!","Persona habilitada correctamente.","success"),m.value=!1}catch(o){console.log(o),m.value=!1,u("Error!","Hubo un problema al habilitar la persona.","error")}}function P(a){for(let o=0;o<V.solicitudes.length;o++)if(V.solicitudes[o].miembro===a)return!0;return!1}return Z(()=>f.value,(a,o)=>{a.toString().length>14&&(f.value=o)}),(a,o)=>(d(),x(de,null,{default:n(()=>[l(ce,{"validate-on":"submit lazy",onSubmit:G(F,["prevent"])},{default:n(()=>[e("div",me,[e("label",null,[l(I,{icon:"mdi-magnify",size:"20"})]),K(e("input",{"onUpdate:modelValue":o[0]||(o[0]=c=>f.value=c),type:"number",placeholder:"Usuario",maxlength:"5"},null,512),[[Q,f.value]]),e("label",null,[S.value?_("",!0):(d(),g("button",_e,"Buscar")),S.value?(d(),x(ee,{key:1,color:"primary",indeterminate:"",size:20,width:2})):_("",!0)])])]),_:1},8,["onSubmit"]),t.numeroDocumento!==""?(d(),x(ue,{key:0},{default:n(()=>[l(U,{cols:"12",sm:"6"},{default:n(()=>[l(M,{"max-height":"auto"},{default:n(()=>[l(T,null,{default:n(()=>[s("Información Personal")]),_:1}),l(z,{class:"text-h6"},{default:n(()=>[e("div",fe,[ve,s(" "+i(t.tipoDocumento),1)]),e("div",pe,[he,s(" "+i(t.numeroDocumento),1)]),e("div",be,[ge,s(" "+i(t.nombre),1)]),e("div",ye,[xe,s(" "+i(t.apellido),1)]),e("div",Se,[we,s(" "+i(t.rol),1)]),e("div",De,[Ce,s(" "+i(t.fechaNacimiento),1)])]),_:1})]),_:1})]),_:1}),l(U,{cols:"12",sm:"6"},{default:n(()=>[l(M,null,{default:n(()=>[l(T,null,{default:n(()=>[s("Información de Contacto")]),_:1}),l(z,{class:"text-h6"},{default:n(()=>[e("div",Ve,[ke,s(" "+i(t.celular),1)]),e("div",Ee,[Ie,s(" "+i(b.value.departamento),1)]),e("div",Ne,[Pe,s(" "+i(b.value.municipio),1)]),e("div",Me,[Te,s(" "+i(b.value.nombre),1)]),e("div",ze,[Be,s(" "+i(t.direccion),1)]),e("div",Ae,[Ue,s(" "+i(t.sexo),1)]),e("div",Re,[qe,s(" "+i(t.estadoCivil),1)]),t.sede===N(D).currentUser.email&&t.estado==="Inhabilitado"?(d(),x(A,{key:0,onClick:o[1]||(o[1]=c=>q(t.idDoc)),loading:m.value,class:"flex-grow-1",height:"48",variant:"flat",color:"success",disabled:m.value,style:{"text-transform":"none"}},{default:n(()=>[l(I,{left:""},{default:n(()=>[s("mdi-account-reactivate")]),_:1}),s(" Activar persona ")]),_:1},8,["loading","disabled"])):_("",!0),t.sede!==N(D).currentUser.email&&t.estado==="Inhabilitado"?(d(),g("p",Fe," Persona inactiva por ("+i(b.value.nombre)+") por ende no se puede enviar una solicitud, para ser solicitado el miembro debe ser activado por la sede a la que pertenece. ",1)):_("",!0),t.sede!==N(D).currentUser.email?(d(),g("div",$e,[P(t.numeroDocumento)?(d(),g("p",je," El botón se desactivó porque ya le envió una solicitud ")):_("",!0),k.value?(d(),g("p",He," El botón se desactivó porque otro usuario le envio una solicitud. ")):_("",!0),l(A,{style:{"text-transform":"none"},disabled:k.value||P(t.numeroDocumento)||t.estado==="Inhabilitado",onClick:R,loading:m.value,class:"flex-grow-1",height:"48",variant:"flat",color:"#6FA55A"},{default:n(()=>[l(I,{left:""},{default:n(()=>[s("mdi-send")]),_:1}),s(" Solicitar Traslado ")]),_:1},8,["disabled","loading"])])):_("",!0)]),_:1})]),_:1})]),_:1})]),_:1})):_("",!0)]),_:1}))}},Le=W(Je,[["__scopeId","data-v-3a84a547"]]),to={__name:"Consultas",setup(h){return(V,m)=>(d(),x(O,null,{default:n(()=>[l(Le)]),_:1}))}};export{to as default};
