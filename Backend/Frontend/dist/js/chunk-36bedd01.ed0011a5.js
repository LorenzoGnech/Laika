(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-36bedd01"],{"486a":function(s,t,i){"use strict";i.r(t);var e=function(){var s=this,t=s.$createElement,i=s._self._c||t;return i("div",{attrs:{id:"app"}},[i("div",{directives:[{name:"sticky",rawName:"v-sticky",value:!0,expression:"true"}],staticClass:"sticky",attrs:{"sticky-offset":"{top: 0, right: 0}","sticky-side":"both","on-stick":"onStick","sticky-z-index":"20"}},[i("NavMenu")],1),i("div",{staticClass:"header"},[i("div",{staticClass:"blueline"}),i("div",{staticClass:"newsTitle",style:s.bgImage},[i("h1",{staticClass:"newsH1"},[s._v(s._s(s.mission.title))])]),i("div",{staticClass:"blueline"})]),i("div",{staticClass:"container"},[i("p",{staticClass:"newsContent"},[s._v(s._s(s.mission.content))]),i("div",{staticClass:"newsFooter"},[i("p",{staticClass:"footerText"},[s._v("Date: "+s._s(s.mission.date)+" ")]),i("p",{staticClass:"footerText"},[s._v("Source: "+s._s(s.mission.source))])])])])},a=[],n=i("8206"),o=i.n(n),c=i("4cc3"),r={name:"News",components:{NavMenu:c["a"]},data:function(){return{mission:{}}},mounted(){var s=parseInt(this.$route.params.value);if(Number.isInteger(s)){let t="https://laikapp.herokuapp.com/api/v1/missions/"+s;o.a.get(t).then(s=>this.mission=s.data)}},computed:{bgImage(){return""==this.mission.img?{backgroundImage:"url(https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2120&q=80)"}:{backgroundImage:`url(${this.mission.img})`}}}},u=r,l=(i("89bd"),i("2be6")),d=Object(l["a"])(u,e,a,!1,null,"5688145c",null);t["default"]=d.exports},"83e4":function(s,t,i){},"89bd":function(s,t,i){"use strict";i("83e4")}}]);
//# sourceMappingURL=chunk-36bedd01.ed0011a5.js.map