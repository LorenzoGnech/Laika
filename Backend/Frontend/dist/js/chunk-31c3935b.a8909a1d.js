(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-31c3935b"],{"03cb":function(t,e,i){t.exports=i.p+"img/filter.4959007c.png"},"1b06":function(t,e,i){},"2a4c":function(t,e,i){},"474a":function(t,e,i){},"49ab":function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"grid-wrap"},[i("div",{staticClass:"grid"},t._l(t.cards,(function(e){return i("li",{key:e.id},[i("HCard",{attrs:{img:e.img,width:t.getCardWidth,height:t.getCardHeight,header:e.header,content:e.content,type:t.type,id:e.id}})],1)})),0)])},a=[],r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{ref:"card",staticClass:"card-wrap",on:{click:t.handleClick,mouseenter:t.handleMouseEnter,mouseleave:t.handleMouseLeave}},[i("div",{staticClass:"card",style:t.cardStyle,attrs:{width:this.width,height:this.height}},[i("div",{staticClass:"card-bg",style:[t.cardBgTransform,t.cardBgImage]}),i("div",{staticClass:"card-info"},[i("h1",[t._v(t._s(t.header))]),i("div",{staticClass:"blueline"}),i("p",[t._v(t._s(t.content))]),t._t("content")],2)])])},n=[],c={name:"HCard",data:function(){return{mouseX:0,mouseY:0}},props:{img:String,width:Number,height:Number,header:String,content:String,type:String,id:Number},mounted(){},computed:{cardStyle(){const t=30*this.mousePX,e=-30*this.mousePY;return{transform:`rotateY(${t}deg) rotateX(${e}deg)`,"--width":this.width+"px","--height":this.height+"px"}},cardBgTransform(){const t=-40*this.mousePX,e=-40*this.mousePY;return{transform:`translateX(${t}px) translateY(${e}px)`}},cardBgImage(){return""==this.img?{backgroundImage:"url(https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2120&q=80)"}:{backgroundImage:`url(${this.img})`}}},methods:{handleClick(t){document.location.origin;let e=this.type+"/"+this.id;this.$router.push(e)},handleMouseMove(t){this.mouseX=t.pageX-this.$refs.card.offsetLeft-this.width/2,this.mouseY=t.pageY-this.$refs.card.offsetTop-this.height/2},handleMouseEnter(){clearTimeout(this.mouseLeaveDelay)},handleMouseLeave(){this.mouseLeaveDelay=setTimeout(()=>{this.mouseX=0,this.mouseY=0},100)}}},d=c,h=(i("a5b8"),i("2be6")),o=Object(h["a"])(d,r,n,!1,null,"c1e07a68",null),u=o.exports,l={name:"HCardGrid",components:{HCard:u},data:function(){return{cardHeight:300,cardWidth:1e3,parentHeight:0,parentWidth:0}},props:{cards:Array,cardsHeight:Number,cardsWidth:Number,type:String},mounted(){this.parentHeight=this.$parent.$el.offsetHeight,this.parentWidth=this.$parent.$el.offsetWidth},computed:{getCardHeight(){return null!=this.cardsHeight?this.cardsHeight:1*this.cardHeight},getCardWidth(){return null!=this.cardsWidth?this.cardsWidth:1*this.cardWidth}},methods:{}},g=l,m=(i("736d"),Object(h["a"])(g,s,a,!1,null,"1a1951b1",null));e["a"]=m.exports},5206:function(t,e,i){"use strict";i("2a4c")},"65d5":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[i("div",{directives:[{name:"sticky",rawName:"v-sticky",value:!0,expression:"true"}],staticClass:"sticky",attrs:{"sticky-offset":"{top: 0, right: 0}","sticky-side":"both","on-stick":"onStick","sticky-z-index":"20"}},[i("NavMenu")],1),t._m(0),i("div",{ref:"gridcontainer",staticClass:"container"},[i("HCardGrid",{attrs:{cards:t.computedNews,cardsHeight:t.getCardsHeight,cardsWidth:t.getCardsWidth,type:"news"}})],1)])},a=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"sectiontitle"},[s("h1",{attrs:{id:"maintitle"}},[t._v("Latest News")]),s("div",{staticClass:"blueline"}),s("img",{staticClass:"filter",attrs:{src:i("03cb")}})])}],r=i("8206"),n=i.n(r),c=i("4cc3"),d=i("49ab"),h={name:"LatestNews",components:{NavMenu:c["a"],HCardGrid:d["a"]},data:function(){return{cNews:[],news:[]}},mounted(){this.getNews()},computed:{computedNews(){return this.news.forEach((t,e)=>{var i={id:t.id,header:t.title,date:t.date,content:t.content.slice(0,100)+"...",fullContent:t.content,img:t.img,source:t.source,tags:t.tags};this.cNews.push(i)}),this.cNews},getCardsHeight(){return window.innerHeight/3.5},getCardsWidth(){return window.innerWidth/1.3}},methods:{async getNews(){n.a.get("https://laikapp.herokuapp.com/api/v1/news/").then(t=>this.news=t.data)}}},o=h,u=(i("5206"),i("2be6")),l=Object(u["a"])(o,s,a,!1,null,"2cca76cd",null);e["default"]=l.exports},"736d":function(t,e,i){"use strict";i("1b06")},a5b8:function(t,e,i){"use strict";i("474a")}}]);
//# sourceMappingURL=chunk-31c3935b.a8909a1d.js.map