import{D,b2 as U,ae as L,aj as R,ak as E,al as F,G as T,an as z,aq as W,at as r,K as Y,a as l,Q as y,ba as B,ad as Z,af as ee,ag as ae,ah as le,bn as te,ai as ne,bl as se,H as ie,aF as ce,bo as de,av as oe,aH as ue,aK as re,bp as ve,I as fe,bq as pe,m as C,p as G,aN as me,br as ke,i as v,b7 as f,aR as he,F as _,T as x,q as be}from"./index-18f30046.js";import{e as ye,u as Ce,m as Ve,b as Ie,d as ge}from"./VFooter-1975de81.js";const $=Symbol.for("vuetify:v-chip-group"),Pe=D({column:Boolean,filter:Boolean,valueComparator:{type:Function,default:U},...L(),...ye({selectedClass:"v-chip--selected"}),...R(),...E(),...F({variant:"tonal"})},"VChipGroup"),Ge=T()({name:"VChipGroup",props:Pe(),emits:{"update:modelValue":e=>!0},setup(e,p){let{slots:c}=p;const{themeClasses:o}=z(e),{isSelected:t,select:m,next:k,prev:h,selected:b}=Ce(e,$);return W({VChip:{color:r(e,"color"),disabled:r(e,"disabled"),filter:r(e,"filter"),variant:r(e,"variant")}}),Y(()=>l(e.tag,{class:["v-chip-group",{"v-chip-group--column":e.column},o.value,e.class],style:e.style},{default:()=>{var u;return[(u=c.default)==null?void 0:u.call(c,{isSelected:t,select:m,next:k,prev:h,selected:b.value})]}})),{}}}),Se=D({activeClass:String,appendAvatar:String,appendIcon:y,closable:Boolean,closeIcon:{type:y,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:{type:Boolean,default:void 0},pill:Boolean,prependAvatar:String,prependIcon:y,ripple:{type:[Boolean,Object],default:!0},text:String,modelValue:{type:Boolean,default:!0},onClick:B(),onClickOnce:B(),...Z(),...L(),...ee(),...ae(),...Ve(),...le(),...te(),...ne(),...R({tag:"span"}),...E(),...F({variant:"tonal"})},"VChip"),_e=T()({name:"VChip",directives:{Ripple:se},props:Se(),emits:{"click:close":e=>!0,"update:modelValue":e=>!0,"group:selected":e=>!0,click:e=>!0},setup(e,p){let{attrs:c,emit:o,slots:t}=p;const{t:m}=ie(),{borderClasses:k}=ce(e),{colorClasses:h,colorStyles:b,variantClasses:u}=de(e),{densityClasses:q}=oe(e),{elevationClasses:w}=ue(e),{roundedClasses:K}=re(e),{sizeClasses:M}=ve(e),{themeClasses:O}=z(e),V=fe(e,"modelValue"),a=Ie(e,$,!1),s=pe(e,c),j=C(()=>e.link!==!1&&s.isLink.value),i=C(()=>!e.disabled&&e.link!==!1&&(!!a||e.link||s.isClickable.value)),H=C(()=>({"aria-label":m(e.closeLabel),onClick(n){n.stopPropagation(),V.value=!1,o("click:close",n)}}));function I(n){var d;o("click",n),i.value&&((d=s.navigate)==null||d.call(s,n),a==null||a.toggle())}function N(n){(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),I(n))}return()=>{const n=s.isLink.value?"a":e.tag,d=!!(e.appendIcon||e.appendAvatar),Q=!!(d||t.append),X=!!(t.close||e.closable),g=!!(t.filter||e.filter)&&a,P=!!(e.prependIcon||e.prependAvatar),J=!!(P||t.prepend),S=!a||a.isSelected.value;return V.value&&G(l(n,{class:["v-chip",{"v-chip--disabled":e.disabled,"v-chip--label":e.label,"v-chip--link":i.value,"v-chip--filter":g,"v-chip--pill":e.pill},O.value,k.value,S?h.value:void 0,q.value,w.value,K.value,M.value,u.value,a==null?void 0:a.selectedClass.value,e.class],style:[S?b.value:void 0,e.style],disabled:e.disabled||void 0,draggable:e.draggable,href:s.href.value,tabindex:i.value?0:void 0,onClick:I,onKeydown:i.value&&!j.value&&N},{default:()=>{var A;return[ke(i.value,"v-chip"),g&&l(ge,{key:"filter"},{default:()=>[G(l("div",{class:"v-chip__filter"},[t.filter?l(f,{key:"filter-defaults",disabled:!e.filterIcon,defaults:{VIcon:{icon:e.filterIcon}}},t.filter):l(v,{key:"filter-icon",icon:e.filterIcon},null)]),[[he,a.isSelected.value]])]}),J&&l("div",{key:"prepend",class:"v-chip__prepend"},[t.prepend?l(f,{key:"prepend-defaults",disabled:!P,defaults:{VAvatar:{image:e.prependAvatar,start:!0},VIcon:{icon:e.prependIcon,start:!0}}},t.prepend):l(_,null,[e.prependIcon&&l(v,{key:"prepend-icon",icon:e.prependIcon,start:!0},null),e.prependAvatar&&l(x,{key:"prepend-avatar",image:e.prependAvatar,start:!0},null)])]),l("div",{class:"v-chip__content"},[((A=t.default)==null?void 0:A.call(t,{isSelected:a==null?void 0:a.isSelected.value,selectedClass:a==null?void 0:a.selectedClass.value,select:a==null?void 0:a.select,toggle:a==null?void 0:a.toggle,value:a==null?void 0:a.value.value,disabled:e.disabled}))??e.text]),Q&&l("div",{key:"append",class:"v-chip__append"},[t.append?l(f,{key:"append-defaults",disabled:!d,defaults:{VAvatar:{end:!0,image:e.appendAvatar},VIcon:{end:!0,icon:e.appendIcon}}},t.append):l(_,null,[e.appendIcon&&l(v,{key:"append-icon",end:!0,icon:e.appendIcon},null),e.appendAvatar&&l(x,{key:"append-avatar",end:!0,image:e.appendAvatar},null)])]),X&&l("div",be({key:"close",class:"v-chip__close"},H.value),[t.close?l(f,{key:"close-defaults",defaults:{VIcon:{icon:e.closeIcon,size:"x-small"}}},t.close):l(v,{key:"close-icon",icon:e.closeIcon,size:"x-small"},null)])]}}),[[me("ripple"),i.value&&e.ripple,null]])}}});export{_e as V,Ge as a};
