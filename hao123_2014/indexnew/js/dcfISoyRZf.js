__d("widget.loginlink.loginlink","widget.popup.login,common.js.events,common.js.config,common.js.browser,common.js.cookie,widget.popup.getTpl".split(","),function(k,r,o,e){e("widget.popup.login");var i=e("common.js.events"),g=e("common.js.config"),d=e("common.js.browser"),c=e("common.js.cookie");e("widget.popup.getTpl");var a=this;$.widget("hao123.loginlink",{_create:function(){a=this;1==g.get("isStatic")&&a.element.hide();i.on("login.signin",a._onSignin);i.on("login.otherSignin",a._onOtherSignin);
$("#signin").click(this._onSigninClick);var b=a._fixIe6();b&&$(".username",a.element).css("width",b);$(".js_loginout",a.element).attr("href","/url/logout?gotourl="+g.get("userinfo").gotourl+"&c="+c.getCSRFId())},_onSigninClick:function(){i.emit("login.show");return!1},_onOtherSignin:function(){},_onSignin:function(b){a._showSignin(b)},_showSignin:function(b){var f=[];f.push('<span class="g-fc3 text">\u4f60\u597d,</span><span class="username g-bg3h" title="'+b.userName+'">'+b.userName+"</span>");f.push('<a class="g-bg3h menu" href="/url/logout?gotourl='+
g.get("userinfo").gotourl+"&c="+c.getCSRFId()+'" target="_self">\u9000\u51fa</a>');a.element.html(f.join(""))},_fixIe6:function(){if(6==d.ie){var b=$(".username",a.element).attr("title")||"";if(16<a._getEnglishLength(b))return'100"'}},_getEnglishLength:function(b){return b.replace(/[^0-9,a-z,A-Z]/g,"aa").length}});return o});
__d("widget.skin.hooks",["common.js.storage","common.js.pageEvents","common.js.swf","common.js.browser","common.js.jquery"],function(k,r,o,e,i,g){function d(){6==q.ie&&j("#gvmusic").stop(!0,!0).animate({top:j(window).scrollTop()+j(window).height()-56+"px"},200)}function c(a,c,q){q=q||0;n.version&&b.get(a,function(b,n){b||(n?c=0:""==n&&(c=1),u={artist:a,play:c,type:q},f.emit("autofalse",u))})}function a(){j("#gvmusic")&&(j("#gvmusic").remove(),6==q.ie&&f.un("viewport.deferchange",d))}var b=e("common.js.storage"),
f=e("common.js.pageEvents"),n=e("common.js.swf"),q=e("common.js.browser"),j=e("common.js.jquery"),u={};f.on("autofalse",function(a){var c;j("#hao123-bodyct");var n=j('<div id="gvmusic"></div>');c=1==a.type?"http://play.baidu.com/widget/hao123/skin/?artistId="+a.artist+"&autoplay="+a.play:"http://play.baidu.com/widget/hao123/skin/hsy.html?artist="+a.artist+"&autoplay="+a.play;var e=document.createElement("iframe");e.id="gvmusic";e.src=c;e.width=120;e.height=56;e.scrolling="no";e.frameBorder=0;n.css({position:"fixed",
_position:"absolute",height:"56px",width:"120px",display:"block",left:"2px",bottom:"2px","z-index":999}).html(e).prependTo(j("#layoutContainer"));6==q.ie&&n.css({position:"absolute",top:j(window).scrollTop()+j(window).height()-56+"px"});f.on("viewport.deferchange",d);b.set(a.artist,"1")});return o={_add:function(b,a){this[b]=this[b]?function(f){this[b](f);a()}:a},voiceyuchengqing:function(b){b?c("ycq","1"):a()},voicenaying:function(b){b?c("ny","1"):a()},voicezhanghuimei:function(b){b?c("zhm","1"):
a()},voicewangfeng:function(b){b?c("wf","1"):a()},thevoiceofchina:function(b){b?c("xy","1"):a()},huxia:function(b){b?c("10622","1",1):a()},wanting:function(b){b?c("687850","1",1):a()},momo:function(b){b?c("16422084","1",1):a()},"paper-plane":function(b){g(["common.js.browser"],function(a){a.canvasSupport&&g(["widget.coolskin.paperplane"],function(a){b?a.init("layoutContainer"):a.stop()})})},mylovefromstar:function(b){var a=j("#hao123-bodyct"),c={position:"fixed",_position:"absolute",height:"151px",
width:"119px",display:"block",left:"50%","margin-left":"-625px",top:"270px",cursor:"pointer","z-index":1,background:"url(http://s0.hao123img.com/res/coolskin/xing/button.png) -130px 0 no-repeat"},q;q=j('<a class="xinglink" monkey="xing" alog-text="\u6765\u81ea\u661f\u661f\u7684\u4f60" href="http://topic.hao123.com/lzxxdn?src=hao123"></a>');g(["common.js.browser"],function(n){function d(){6==n.ie&&q.stop(!0,!0).animate({top:j(window).scrollTop()+parseInt(c.top)+"px"})}b?(q.css(c).prependTo(j("#layoutContainer")),
6==n.ie&&q.css({position:"absolute",top:j(window).scrollTop()+parseInt(c.top)+"px"}),q.hover(function(){j(this).css("background-position","0 0")},function(){j(this).css("background-position","-130px 0")}),f.on("viewport.deferchange",d)):(f.un("viewport.deferchange",d),j(".xinglink").hide().remove());n.canvasSupport&&g(["widget.coolskin.mylovefromstar"],function(f){b?(a.css("position","relative"),f.init("layoutContainer")):(f.stop(),a.css("position",""))})})},xmas:function(b){var a=j("#hao123-bodyct");
g(["common.js.browser"],function(f){f.canvasSupport&&g(["widget.coolskin.xmas"],function(f){b?(a.css("position","relative"),f.init("layoutContainer")):(f.stop(),a.css("position",""))})})}}});
__d("widget.skin.service","common.js.log,common.js.profile,common.js.events,common.js.cookie,common.js.JSON,common.js.config,widget.skin.hooks".split(","),function(k,r,o,e){function i(){var b=v.length*Math.random()|0,a="";if(0<v.length&&v[b]!=h.curSkin)return a=v[b],v.splice(b,1),a;0>=v.length&&(v=p.slice());return i()}function g(a){a=a||h.curSkin;x||h.userSkin==f&&a!=f&&q({type:"newskin"});x=!0;a&&h.userSkin!=a&&(j.set(b,a),h.lastSkin=s=h.userSkin,h.userSkin=h.curSkin=a,u.emit("skin.save",a))}function d(b,
f){var q=document,d=q.getElementsByTagName("body")[0],j="",e,g=h.curSkin;b&&h.curSkin!=b&&(j=n+"?c="+t.getCSRFId()+"&skin="+b,document.getElementById("userSkin")?document.getElementById("userSkin").setAttribute("href",j):(e=q.createElement("link"),q=q.getElementsByTagName("head")[0],e.setAttribute("rel","stylesheet"),e.setAttribute("type","text/css"),e.setAttribute("id","userSkin"),q.appendChild(e),e.setAttribute("href",j)),h.curSkin=b);d.className=b;f&&f.src&&(h.src=f.src);a(h.curSkin,"saveskin");
u.emit(g+"unload");c(g,h.curSkin)}function c(b,a){if(l&&l[b])l[b](!1);if(l&&l[a])l[a](!0)}function a(b,a){var c=!1;try{c="hao123Browser"==window.external.GetHao123Version()?!0:!1}catch(q){}try{c="hao123Browser"==window.external.GetVersion("version")?!0:!1}catch(n){}try{var d=window.external.GetNextReqID("id");c&&(b=b==f?"default":b,window.external.StartRequest(d,"bdbrowser.pageCmd.hao123Cmd","",m.stringify({cmd:a||"setskin",name:b}),window,""))}catch(j){}}var b="skin",f="skin-color-green",n="/api/getskins/",
q=e("common.js.log"),j=e("common.js.profile"),u=e("common.js.events"),t=e("common.js.cookie"),m=e("common.js.JSON"),h=e("common.js.config"),l=e("widget.skin.hooks"),k=h.get("allskin"),p=[],v=[],B=!1,x=!1,h={userSkin:f,curSkin:f,recommendSkin:f,lastSkin:f,src:"init"},s=f,y=window.location.search.match(/\?key=([^<>&]+)&taskid=9/),z;for(z in k)k.hasOwnProperty(z)&&p.push(k[z]);v=p.slice();if(y&&y[1])u.on("skin.save",function(){t.set(y[1],1,{expires:0})});return o={init:function(b){B||(h.curSkin=h.userSkin=
h.lastSkin=b.userSkin,h.recommendSkin=b.recommendSkin,h.src=b.src||h.src,a(h.userSkin,"saveskin"),B=!0);try{c(null,h.curSkin)}catch(f){}u.on("quanjiafu.setskin",function(){d("wxqjf2014");g("wxqjf2014")})},get:function(b){return 0<=arguments.length?h[b]?h[b]:void 0:h},resetLastSkin:function(b){d(h.lastSkin,{src:b||"resetLast"});g(h.lastSkin)},config:h,setSkin:g,viewSkin:d,canselSkin:function(){d(h.userSkin,{src:"cansel"})},resetSkin:function(){d(f,{src:"reset"});g(f)},randomSkin:function(){var b=i();
d(b,{src:"random"});g(b);u.emit("skinbtn.click",{skin:h.userSkin})},xuanSkin:a,isDefaultSkin:function(){return h.userSkin==f},getLastSkin:function(){return s}}});
__d("widget.tip.tip",["common.js.widget","common.js.pageEvents","common.js.format"],function(k,r,o,e){e("common.js.widget");var i=e("common.js.pageEvents"),g=e("common.js.format"),d=['<div id="#{id}" class="tip-box">#{html}</div>'],c='<div id="#{id}" class="tip-box">,<table cellspacing="0" cellpadding="0">,<tr class="tip-border-top">,<td class="br-top-left"></td>,<td class="br-top"></td>,<td class="br-top-right"></td>,</tr>,<tr>,<td class="tip-border-left br-left"></td>,<td class="tip-ct #{ifClose}">,<div class="tip-txt">#{html}</div>,<div class="tip-arrow #{arrow}"></div>,<div class="tip-close"></div>,</td>,<td class="tip-border-right br-right"></td>,</tr>,<tr class="tip-border-bottom">,<td class="br-bottom-left"></td>,<td class="br-bottom"></td>,<td class="br-bottom-right"></td>,</tr>,</table>,</div>'.split(",");$.widget("hao123.tip",
{options:{offsetX:0,offsetY:0,pos:["left","top"],direction:"bottom",html:"",zIndex:0,special:!1,close:!1,inner:!1,id:""},_parsData:function(){var a="";this.options.direction="tip-arrow-"+this.options.direction;this.options.close||(a="no-close");return{html:this.options.html,arrow:this.options.direction,id:this._getId(),ifClose:a}},_getId:function(){return this.options.id||"tibBox_"+ +new Date},_create:function(){var a=this._parsData(),b="",b=this.options.special?g(d.join(""),a):g(c.join(""),a);this.options.inner?
("static"==this.element.css("position")&&this.element.css({position:"relative"}),this.element.css({overflow:"visible"}),this.options.tibBox=$(b).appendTo(this.element)):this.options.tibBox=$(b).appendTo($("body"));this.options.closeEl=$(".tip-close",this.options.tibBox);this.options.ctEl=$(".tip-txt",this.options.tibBox);"number"==typeof this.options.zIndex&&0<this.options.zIndex&&this.options.tibBox.css("z-index",this.options.zIndex);this._setPos();this.options.tibBox.show()},_init:function(){var a=
this;a.display=!0;i.on("viewport.deferchange",function(){a._setPos()});this.options.close&&this.options.closeEl.bind("click",function(b){a._trigger("close",b,{})&&a.hide()});var b=0;i.on("page.startchange",function(){b=setTimeout(function(){!a.options.inner&&a.display&&(a.hide(),a.display=!0)},0)});i.on("page.endchange",function(){clearTimeout(b);!a.options.inner&&a.display&&(a._setPos(),a.show())})},hide:function(){this.display=!1;this.options.tibBox.hide()},show:function(){this.display=!0;this.options.tibBox.show()},
html:function(a){a&&(this.options.special?this.options.tibBox.html(a):this.options.ctEl.html(a))},_setPos:function(){var a=this.element.offset(),b=a.left,f=a.top,c=["left","top"],c=this.options.pos;this.options.inner?(b=this.options.offsetX,f=this.options.offsetY):(b=a.left+this.options.offsetX,f=a.top+this.options.offsetY);a={};a[c[0]]=b;a[c[1]]=f;this.options.tibBox.css(a)}});return o});
__d("widget.skin.init","widget.tip.tip,common.js.jquery,widget.skin.service,common.js.events,common.js.browser,common.js.cookie".split(","),function(k,r,o,e){e("widget.tip.tip");var i=e("common.js.jquery"),g=e("widget.skin.service"),d=e("common.js.events"),c=i("#skin-recommond");e("common.js.cookie");var a=!1;return function(){c.click(function(b){var f=i(b.target).attr("action"),b=i(b.target).attr("clicktitle");d.emit("skinchange.click");f&&(!a&&!c.attr("data")?(g.viewSkin(f,{src:"recommond"}),g.setSkin(f),
d.emit("skinbtn.click",{skin:f}),c.html(b.split("|")[0]+'<i class="g_icon pointer"></i>'),c.attr("title",b.split("|")[1]),a=!0):g.randomSkin());return!1})}});
__d("widget.skin.skin",["common.js.widget","common.js.log","common.js.pageEvents","widget.skin.service"],function(k,r,o,e){e("common.js.widget");var i=e("common.js.log"),g=e("common.js.pageEvents"),d=e("widget.skin.service"),c=d.config;$.widget("hao123.skin",{options:{curPage:1,actionMap:{},hook:{},catchLinks:{},stop:!0,userSkin:"skin-color-green",SELECT_CLS:"item-select",SCREEN_WITH:948,SCREEN_COUNT:6},_create:function(){this.options.count=parseInt(this.element.attr("count"));this.options.items=
$(".item",this.element);this.options.screens=$(".screens",this.element);this.options.itemsLi=$("li",this.options.screens);this._creatHtml();this.options.items=$(".item",this.element);this.options.itemsLi=$("li",this.options.screens);var a=this;this.options.actionMap={prev:function(){a._prev()},next:function(){a._next()},skin:function(b){a._veiwSkin(b)},save:function(){a._saveSkin()},cansel:function(){a._canselSkin()},reset:function(){a._resetSkin()}}},_init:function(){var a=this;this.element.click(function(b){var f=
$(b.target).attr("action")||$(b.target).parent("[action]").attr("action")||$(b.target).parent().parent("[action]").attr("action");if(f)return a._processAction(f,b),!1});g.on("skinbtn.click",function(b){a._toggleSelect(b.skin)});a.options.userSkin=a.options.curSkin=$("body").attr("class");a._toggleSelect(a.options.userSkin)},_creatHtml:function(){var a=this.options.itemsLi.length,b=0;0!=a%this.options.SCREEN_COUNT&&(b=this.options.SCREEN_COUNT-a%this.options.SCREEN_COUNT);for(a=0;a<b;a++)this.options.screens.append('<li class="g-ib"></li>');
$(this.options.itemsLi.slice(0,6)).clone().appendTo(this.options.screens)},_processAction:function(a){a=a.split("|");if(1<a.length)this.options.actionMap[a[0]](a[1]);else this.options.actionMap[a[0]]()},_prev:function(){var a=this;1<a.options.count&&a.options.stop&&(a._prevRollScreen(),a.options.stop=!1,a.options.screens.animate({marginLeft:"+="+a.options.SCREEN_WITH},500,function(){a.options.curPage--;a._prevRollScreen();a.options.stop=!0}))},_next:function(){var a=this;1<a.options.count&&a.options.stop&&
(a._nextRollScreen(),a.options.stop=!1,a.options.screens.animate({marginLeft:"-="+a.options.SCREEN_WITH},500,function(){a.options.curPage++;a._nextRollScreen();a.options.stop=!0}))},_nextRollScreen:function(){this.options.curPage>=this.options.count+1&&(this.options.screens.css({marginLeft:0}),this.options.curPage=1)},_prevRollScreen:function(){1>=this.options.curPage&&(this.options.screens.css({marginLeft:-this.options.count*this.options.SCREEN_WITH}),this.options.curPage=this.options.count+1)},
_callBackHook:function(a){a=a||c.curSkin;try{if(this.options.hook[a]){var b=null;(b=new Function(this.options.hook[a]))&&b()}}catch(f){}},_veiwSkin:function(a){d.viewSkin(a,{src:"lib"});this._toggleSelect(a);i({skin:a,type:"skin"})},_saveSkin:function(){d.setSkin();this._hideSkinLib()},_canselSkin:function(){d.canselSkin();this._toggleSelect(c.userSkin);this._hideSkinLib()},_resetSkin:function(){d.resetSkin();this._toggleSelect("");this._hideSkinLib()},_hideSkinLib:function(){g.emitPageChange(null,
350);this.element.parent().slideUp(350);var a=$("#skin-btn");a.removeClass("g-bg5 opener");a.text(a.attr("closeTxt"))},_toggleSelect:function(a){for(var b=this.options.items,f=b.length,c=null,q=0;q<f;q++)c=$(b[q]),c.attr("action").split("|")[1]==a?c.addClass(this.options.SELECT_CLS):c.removeClass(this.options.SELECT_CLS)}});return o});
__d("common.js.date",[],function(){var k=function(b,a,f){b=b.split(f||"|");if(a)for(f=b.length;f--;)b[f]=parseInt(b[f],a);return b},r={"1-1":"\u5143\u65e6\u8282","2-14":"\u60c5\u4eba\u8282","3-5":"\u96f7\u950b\u65e5","3-8":"\u5987\u5973\u8282","3-12":"\u690d\u6811\u8282","3-15":"\u6d88\u8d39\u65e5","4-1":"\u611a\u4eba\u8282","4-4":"\u6e05\u660e\u8282","5-1":"\u52b3\u52a8\u8282","5-4":"\u9752\u5e74\u8282","5-12":"\u6bcd\u4eb2\u8282","6-1":"\u513f\u7ae5\u8282","6-16":"\u7236\u4eb2\u8282","7-1":"\u5efa\u515a\u65e5",
"8-1":"\u5efa\u519b\u8282","9-10":"\u6559\u5e08\u8282","10-1":"\u56fd\u5e86\u8282","11-11":"\u5149\u68cd\u8282","11-28":"\u611f\u6069\u8282","12-24":"\u5e73\u5b89\u591c","12-25":"\u5723\u8bde\u8282"},o=k("ezc|esg|wog|gr9|15k0|16xc|1yl0|h40|ukw|gya|esg|wqe|wk0|15jk|2k45|zsw|16e8|yaq|tkg|1t2v|ei8|wj4|zp1|l00|lkw|2ces|8kg|tio|gdu|ei8|k12|1600|1aa8|lud|hxs|8kg|257n|t0g|2i8n|13rk|1600|2ld2|ztc|h40|2bas|7gw|t00|15ma|xg0|ztj|lgg|ztc|1v11|fc0|wr4|1sab|gcw|xig|1a34|l28|yhy|xu8|ew0|xr8|wog|g9s|1bvn|16xc|i1j|h40|tsg|fdh|es0|wk0|161g|15jk|1654|zsw|zvk|284m|tkg|ek0|xh0|wj4|z96|l00|lkw|yme|xuo|tio|et1|ei8|jw0|n1f|1aa8|l7c|gxs|xuo|tsl|t0g|13s0|16xg|1600|174g|n6a|h40|xx3|7gw|t00|141h|xg0|zog|10v8|y8g|gyh|exs|wq8|1unq|gc0|xf4|nys|l28|y8g|i1e|ew0|wyu|wkg|15k0|1aat|1640|hwg|nfn|tsg|ezb|es0|wk0|2jsm|15jk|163k|17ph|zvk|h5c|gxe|ek0|won|wj4|xn4|2dsl|lk0|yao",
36),e=k("0|gd4|wrn|1d98|1tuh|2akm|2rfn|38g9|3plp|46vz|4o9k|55px|5n73|64o5|6m37|73fd|7kna|81qe|8io7|8zgq|9g4b|9wnk|ad3g|ath2|",36),i=k("\u5c0f\u5bd2|\u5927\u5bd2|\u7acb\u6625|\u96e8\u6c34|\u60ca\u86f0|\u6625\u5206|\u6e05\u660e|\u8c37\u96e8|\u7acb\u590f|\u5c0f\u6ee1|\u8292\u79cd|\u590f\u81f3|\u5c0f\u6691|\u5927\u6691|\u7acb\u79cb|\u5904\u6691|\u767d\u9732|\u79cb\u5206|\u5bd2\u9732|\u971c\u964d|\u7acb\u51ac|\u5c0f\u96ea|\u5927\u96ea|\u51ac\u81f3"),g=k("|\u4e00|\u4e8c|\u4e09|\u56db|\u4e94|\u516d|\u4e03|\u516b|\u4e5d|\u5341"),
d=k("\u521d|\u5341|\u5eff|\u5345|"),c={"1-1":"\u6625\u8282","1-15":"\u5143\u5bb5\u8282","5-5":"\u7aef\u5348\u8282","7-15":"\u4e2d\u5143\u8282","7-7":"\u4e03\u5915\u8282","8-15":"\u4e2d\u79cb\u8282","9-9":"\u91cd\u9633\u8282","12-8":"\u814a\u516b\u8282","12-23":"\u5c0f\u5e74","12-29":"\u9664\u5915"},a=function(b){return o[b-1900]&15?o[b-1900]&65536?30:29:0},b=function(b,a){var f=new Date(3.15569259747E10*(b-1900)+6E4*e[a]+Date.UTC(1900,0,6,2,5));return{m:f.getUTCMonth()+1,d:f.getUTCDate()}},f=function(b,
a,f,n){var d=(f?c:r)[b+"-"+a]||"";f&&n&&12==b&&(o[n-1900]&16?30:29)==a&&(d="\u9664\u5915");return d},n=function(b){return"\u7532\u4e59\u4e19\u4e01\u620a\u5df1\u5e9a\u8f9b\u58ec\u7678".charAt(b%10)+"\u5b50\u4e11\u5bc5\u536f\u8fb0\u5df3\u5348\u672a\u7533\u9149\u620c\u4ea5".charAt(b%12)};return function(c,j,e){var t,m,h,l,p,k,r,x,s;s=j-1;r=2<=s||1==s&&e>=b(c,2).d?n(c-1864):n(c-1865);x=e>=b(c,2*s).d?n(12*(c-1900)+s+13):n(12*(c-1900)+s+12);s=n(Date.UTC(c,s,1,0,0,0,0)/864E5+25576+e);l=1900;m=0;p=(new Date(c,
j-1,e)-new Date(1900,0,31))/864E5;t=o[c-1900]&15;for(k=!1;2050>l&&0<p;l++){m=32768;for(h=348;8<m;m>>=1)h+=o[l-1900]&m?1:0;m=h+a(l);p-=m}0>p&&(p+=m,l--);h=l;for(l=1;13>l&&0<p;l++)0<t&&l==t+1&&!1===k?(--l,k=!0,m=a(h)):m=o[h-1900]&65536>>l?30:29,!0==k&&l==t+1&&(k=!1),p-=m;0==p&&0<t&&l==t+1&&!k&&--l;0>p&&(p+=m,--l);0==p&&(k=l==t);p+=1;t=c-(j<l?1:0);m=l;h=p;l=(k?"\u95f0":"")+((9<l?"\u5341":"")+g[l%10]).replace("\u5341\u4e8c","\u814a").replace(/^\u4e00/,"\u6b63")+"\u6708";p={10:"\u521d\u5341",20:"\u4e8c\u5341",
30:"\u4e09\u5341"}[p]||d[Math.floor(p/10)]+g[~~(p%10)];var y=(new Date(c,j-1,e)).getDay(),z="\u65e5\u4e00\u4e8c\u4e09\u56db\u4e94\u516d".charAt(y);r+="\u5e74";x+="\u6708";s+="\u65e5";var w;a:{w=i.length;for(var A;w--;)if(A=b(c,w),A.m==j&&A.d==e){w=i[w];break a}w=""}c={y:c,m:j,d:e,w:y,W:z,cm:m,cd:h,CM:l,CD:p,gy:r,gm:x,gd:s,so:w,cf:f(m,h,1,t),gf:f(j,e),sx:"\u9f20\u725b\u864e\u5154\u9f99\u86c7\u9a6c\u7f8a\u7334\u9e21\u72d7\u732a".charAt((t-4)%12),isleap:k};j&&e&&1==parseInt(j)&&29==parseInt(e)&&(c.cf=
"");return c}});
__d("widget.mail.mail",["common.js.widget","common.js.format","common.js.log","common.js.cookie"],function(k,r,o,e){e("common.js.widget");var i=e("common.js.format"),g=e("common.js.log"),d=e("common.js.cookie");$.widget("hao123.mail",{options:{curIndex:0,mails:[{mail:"163",name:"@163.com",action:"http://reg.163.com/CheckUser.jsp",params:{url:"http://entry.mail.163.com/coremail/fcg/ntesdoor2?lightweight=1&verifycookie=1&language=-1&style=15",username:"#{u|e}",password:"#{p|e}"}},{mail:"126",name:"@126.com",
action:"https://reg.163.com/logins.jsp",params:{domain:"126.com",username:"#{u|e}@126.com",password:"#{p|e}",url:"http://entry.mail.126.com/cgi/ntesdoor?lightweight%3D1%26verifycookie%3D1%26language%3D0%26style%3D-1"}},{mail:"sina",name:"@sina.com",action:"https://login.sina.com.cn/sso/login.php",params:{username:"#{u|e}@sina.com",password:"#{p|e}",entry:"freemail",gateway:0,encoding:"UTF-8",url:"http://mail.sina.com.cn/",returntype:"META"}},{mail:"sohu",name:"@sohu.com",action:"https://passport.sohu.com/act/loginjs",
params:{userid:"#{u|e}@sohu.com",password:"#{p|e}",t:+new Date,appid:"1113",ru:"http://mail.sohu.com/",ct:"1173080990",persistentcookie:2}},{mail:"yeah",name:"@yeah.net",action:"https://reg.163.com/logins.jsp",params:{domain:"yeah.net",username:"#{u|e}@yeah.net",password:"#{p|e}",url:"http://entry.mail.yeah.net/cgi/ntesdoor?lightweight%3D1%26verifycookie%3D1%26style%3D-1"}},{mail:"139",name:"@139.com",action:"https://mail.10086.cn/Login/Login.ashx",params:{UserName:"#{u|e}",Password:"#{p|e}",clientid:"5015"}},
{mail:"21cn",name:"@21cn.com",action:"http://passport.21cn.com/maillogin.jsp",params:{UserName:"#{u|e}@21cn.com",passwd:"#{p|e}",domainname:"21cn.com"}},{mail:"renren",name:"\u4eba\u4eba\u7f51",action:"http://passport.renren.com/PLogin.do",params:{email:"#{u|e}",password:"#{p|e}",origURL:"http://www.renren.com/Home.do",domain:"renren.com"}}],links:[{name:"\u652f\u4ed8\u5b9d",url:"https://www.alipay.com/user/login.htm"},{name:"\u767b\u5f55\u767e\u5ea6",url:"https://passport.baidu.com/v2/?login"},{name:"QQ\u90ae\u7bb1",
url:"http://mail.qq.com"},{name:"QQ\u7a7a\u95f4",url:"http://qzone.qq.com/index.html"},{name:"\u65b0\u6d6a\u5fae\u535a",url:"http://weibo.com/login.php"},{name:"gmail.com",url:"http://mail.google.com/mail/"},{name:"hotmail.com",url:"http://www.hotmail.com"},{name:"\u963f\u91cc\u4e91\u90ae\u7bb1",url:"https://passport.alipay.com/login/login.htm?return_url=http%3A%2F%2Fmail.aliyun.com%2Falimail%2Fauth%2FcallbackForHavana%3Freurl%3D%252Falimail%252F&fromSite=9"},{name:"189\u90ae\u7bb1",url:"http://mail.189.cn"},
{name:"\u5f00\u5fc3\u7f51",url:"http://www.kaixin001.com"}],hoverCls:"mailsubmit-hover"},_create:function(){var c=this.element;this._createMailList();this.options.mailSelect=$(".suffixal",c);this.options.mailList=$(".maillist",c);this.options.paramsBox=$(".mailParas",c);this.options.formEl=$("#mailForm",c);this.options.mailEl=$("#mailName",c);this.options.pwdEl=$("#mailPwd",c);this.options.mailHolderEl=$("#mailHolder",c);this.$mailLogin=$("#mailLogin",c);this.$mailTriggerHolder=$("#mailTriggerHolder",
c);this.$mailTrigger=$(".mailtrriger",c);this.$mailSubmit=$("#mailSubmit",c)},_init:function(){var c=d.get("HCD_0")||"",c=c.split(","),a=d.get("HUM")||"",b=d.get("HUN")||"";this._initPlaceHolder();this._initMailDown();this._bindSubmit();this._bindTrigger();this._initTrigger();if(!b&&!a){for(var f in c)-1<c[f].indexOf("HAOMAILSV")&&(a=c[f].split("|")[1]),-1<c[f].indexOf("HAOMAILUN")&&(b=c[f].split("|")[1]);d.set("HUM",a);d.set("HUN",b)}b&&(b=b||"",this.options.mailEl.val(b),""!=b&&this.options.mailHolderEl.hide(),
this.options.mailSelect.text(this._getMailText(a)),this.options.pwdEl.val(""))},_initTrigger:function(){var c=d.get("HUN")||"";c&&(c=c||"",this.$mailTrigger.val(c),""!=c&&this.$mailTriggerHolder.hide())},_bindTrigger:function(){function c(){a.$mailLogin.show();""!=a.options.mailEl.val()?a.options.pwdEl.focus():(a.options.mailEl.focus(),""!=a.options.pwdEl.val()&&a.options.pwdEl.prev().hide())}var a=this;this.$mailTrigger.focus(function(){c()});this.$mailTrigger.click(function(){c()})},_inMailBox:function(c){for(var a=
!1;c;){if("mailLogin"==c.id||"mailTriggerBox"==c.id){a=!0;break}c=c.parentNode}return a},_getMailText:function(c){for(var a in this.options.mails)if(this.options.mails[a].mail==c)return this.options.curIndex=a,this.options.formEl.attr("action",this.options.mails[a].action),9<this.options.mails[a].name.length?this.options.mails[a].name.substr(0,6)+"...":this.options.mails[a].name;return this.options.mails[0].name},_bindSubmit:function(){var c=this.options.mailEl,a=this.options.pwdEl,b=this.options.hoverCls,
f=this;this.options.formEl.submit(function(){var b=f._valInput();b&&(f._createParams(c.val(),a.val()),g({type:"mail",index:f.options.mails[f.options.curIndex].name}),f._clear());return b});this.$mailSubmit.hover(function(){$(this).addClass(b)},function(){$(this).removeClass(b)})},_valInput:function(){var c=this.options.mailEl,a=this.options.pwdEl;if(""==c.val())return this._showValTip({msg:"\u8bf7\u8f93\u5165\u60a8\u7684\u90ae\u7bb1\u5e10\u53f7!",style:""}),!1;if(""==a.val())return this._showValTip({msg:"\u8bf7\u8f93\u5165\u60a8\u7684\u90ae\u7bb1\u5bc6\u7801!",
style:"msgpwd"}),!1;d.set("HUM",this.options.mails[this.options.curIndex].mail);d.set("HUN",c.val());return!0},_showValTip:function(c){var a=this.options.mailEl,b=this.options.pwdEl;0>=$(".msg",this.element).length?this.element.append(i('<div class="g-bg9 g-fc1 msg #{style}" style="display:none;">#{msg}</div>',c)):""!=c.style?$(".msg",this.element).addClass("msgpwd").html(c.msg):$(".msg",this.element).removeClass("msgpwd").html(c.msg);c=$(".msg",this.element);c.hasClass("msgpwd")?b.focus():a.focus();
c.show()},_hideValTip:function(){$(".msg",this.element).hide()},_createMailList:function(){for(var c=this.options.mails,a=this.options.links,b="",f=0;f<c.length;f++)b+=i('<li><a class="item g-fc0 g-fc0h g-bg10h #{style}" href="#{url}" index="#{index}">#{title}</a></li>',{style:"item-mail",url:c[f].action,title:c[f].name,index:f});b+=i('<li><a class="item g-fc0 g-fc0h g-bg10h #{style}" href="#{url}" index="#{index}">#{title}</a></li>',{style:"g-bg4 item-tip",url:"#",title:"\u4ee5\u4e0b\u4e3a\u5f39\u51fa\u767b\u5f55",
index:"1000"});for(f=0;f<a.length;f++)b+=i('<li><a class="item g-fc0 g-fc0h g-bg10h #{style}" href="#{url}" index="#{index}">#{title}</a></li>',{style:"item-link",url:a[f].url,title:a[f].name,index:f});this.element.append('<ul class="g-bg11 g-br9 g-sd0 maillist" style="display: none;">'+b+"</ul>")},_initMailDown:function(){var c=this,a=!1,b=this.options.mailSelect,f=this.options.mailList,n=$(".item",f);b.click(function(){(a=!a)?f.show():f.hide();return!1});n.click(function(){if($(this).hasClass("item-mail"))return 9<
$(this).text().length?b.text($(this).text().substr(0,6)+"..."):b.text($(this).text()),c.options.curIndex=$(this).attr("index"),c.options.mails[c.options.curIndex]&&c.options.formEl.attr("action",c.options.mails[c.options.curIndex].action),a=!1,f.hide(),!1;if($(this).hasClass("item-tip"))return!1;$(this).hasClass("item-link")&&($(this).attr("index"),g({type:"mail",index:$(this).text()}),a=!1)});$(document).click(function(b){c._inMailBox(b.target)||(a=!1,c.$mailLogin.hide(),c.options.mailList.hide(),
c._initTrigger())})},_initPlaceHolder:function(){var c=this,a=$(".input",this.element);a.focusin(function(){$(this).prev().hide();$(this).hasClass("mailname")});a.focusout(function(){""!=$(this).val()?$(this).prev().hide():$(this).prev().show();c._hideValTip()})},_createParams:function(c,a){var b=this.options.mails,f=[],n=this.options.curIndex,d;for(d in b[n].params)f.push('<input name="'+d+'" value="'+i(b[n].params[d]+"",{u:c,p:a})+'" type="hidden">');this.options.paramsBox.html(f.join(""))},_clear:function(){var c=
null,a=this;this.options.pwdEl.val("");this.options.pwdEl.blur();c=setTimeout(function(){a.options.paramsBox.html("");clearTimeout(c)},3E3)}});return o});
__d("widget.calendar.calendar",["common.js.widget","common.js.format","common.js.date"],function(k,r,o,e){e("common.js.widget");var i=e("common.js.format"),g=e("common.js.date");$.widget("hao123.calendar",{options:{serverTime:0,intervalDelay:3E4,url:"/images/timer.gif",tpl:'#{m}\u6708#{d}\u65e5  \u5468#{W}<i>#{CM}#{CD}</i><span style="display:none">#{hh}:#{mm}</span>',tpl1:'#{m}\u6708#{d}\u65e5 \u5468#{W}<i>#{so}</i> <span style="display:none">#{hh}:#{mm}</span>',tpl2:'#{m}\u6708#{d}\u65e5 \u5468#{W}<i>#{cf}</i><span style="display:none">#{hh}:#{mm}</span>',
tpl3:'#{m}\u6708#{d}\u65e5 \u5468#{W}<i>#{gf}</i><span style="display:none">#{hh}:#{mm}</span>'},_create:function(){var d=this;d.options.serverTime=+new Date;d.correction=0;d.render();var c=+new Date,a=c;$.ajax({cache:!1,url:d.options.url,type:"GET",complete:function(b){a=+new Date;b=b.getResponseHeader("Date")?(new Date(b.getResponseHeader("Date"))).getTime()+(a-c):d.options.serverTime+(a-c);d.options.serverTime=b;d.correction=d.options.serverTime-a;d.render()}});d.intervalID=setInterval(function(){d._check()},
d.options.intervalDelay)},_check:function(){var d=this,c=+new Date;if(Math.abs(c+d.correction-d.options.serverTime)>d.options.intervalDelay+3E4){var a=+new Date,b=a;$.ajax({cache:!1,url:d.options.url,type:"GET",complete:function(f){b=+new Date;f=f.getResponseHeader("Date")?(new Date(f.getResponseHeader("Date"))).getTime()+(b-a):d.options.serverTime+(b-a);d.options.serverTime=f;d.correction=d.options.serverTime-b;d.render()}})}else d.options.serverTime=c+d.correction,d.render()},destroy:function(){clearInterval(me.intervalID);
$.Widget.prototype.destroy.call(this)},getDate:function(d){d=d||new Date;return{y:d.getFullYear(),m:d.getMonth()+1,d:d.getDate()}},format:function(d){var c=this.getDate(d),a=this.options.tpl,c=g(c.y,c.m,c.d);c.hh=this.pad(d.getHours(),2);c.mm=this.pad(d.getMinutes(),2);c.ss=this.pad(d.getSeconds(),2);a=c.so?this.options.tpl:c.cf?this.options.tpl2:c.gf?2012==c.y&11==c.m&&28==c.d?this.options.tpl:this.options.tpl3:this.options.tpl;return this.formatStr(a,c)},render:function(d){var d=this.format(new Date(d||
this.options.serverTime)||new Date),c=this.element.html();d!=c&&this.element.html(d)},pad:function(d,c){var a="",b=0>d,f=""+Math.abs(d);f.length<c&&(a=Array(c-f.length+1).join("0"));return(b?"-":"")+a+f},formatStr:function(d,c){return i(d,c)}});return o});
__d("widget.weather.weather","common.js.widget,widget.tip.tip,common.js.format,common.js.fixpng,common.js.cookie,common.js.browser".split(","),function(k,r,o,e){e("common.js.widget");e("widget.tip.tip");var i=e("common.js.format"),g=e("common.js.fixpng"),d=e("common.js.cookie"),c=e("common.js.browser"),a=["info-err","info-msg"];$.widget("hao123.weather",{options:{tpl:'<div class="card info info-hook"></div><div class="card view view-hook"><span class="item city city-hook"><a href="#" class="modify-hook g-fc3 g-fc3h s-wea"><span class="name-hook"></span></a><br /><a href="#" class="modify-hook g-fc3 g-fc3h s-wea"><span class="change">[\u66f4\u6362]</span></a></span><a href="http://www.hao123.com/tianqi" class="item item-hl g-br1h g-fc3 g-fc3h s-wea weather-icon today today-hook"></a><a href="http://www.hao123.com/tianqi" class="item item-hl g-br1h g-fc3 g-fc3h s-wea weather-icon tomorrow tomorrow-hook"></a><a href="http://www.hao123.com/tianqi" class="item item-hl g-br1h g-fc3 g-fc3h s-wea more more-hook">\u4e94\u65e5<br />\u5929\u6c14</a></div><div class="card control control-hook"><select class="select select-province province-hook"></select><select class="select select-city city-hook"></select><select class="select select-district district-hook"></select><br /><button class="save-hook btn-save">\u786e\u5b9a</button><a href="#" class="cancle-hook btn-cancle">\u53d6\u6d88</a><a class="g-fc1 help" href="http://hi.baidu.com/hao123/item/73cd6f3274a70f5b81f1a788">\u6211\u9009\u7684\u57ce\u5e02\u4e0d\u89c1\u4e86</a></div>',
forecastUrl:"http://www.hao123.com/api/newforecast?callback=?",areaUrl:"http://www.hao123.com/api/citymenu?callback=?",loadingTpl:"",errorTpl:'\u5929\u6c14\u6570\u636e\u672a\u627e\u5230\uff0c\u8bf7<a href="#" class="g-fc1 reset-hook">\u91cd\u8bbe\u5730\u5740</a>',timeoutTpl:'\u52a0\u8f7d\u8d85\u65f6\uff0c\u8bf7<a href="#" class="g-fc1 retry-hook">\u91cd\u8bd5</a>',selectTpl:"<option value=#{id|e}>#{firstchar|e} #{name|e}</option>",selectEmptyTpl:"<option>\u52a0\u8f7d\u4e2d...</option>",timeout:5E3,
province:void 0,city:void 0,district:void 0},_create:function(){var b=this.element,a=this.options;this.areaMap={};b.html(a.tpl);this.$info=$(".info-hook",b);this.$view=$(".view-hook",b);this.$control=$(".control-hook",b);this.$city=$(".city-hook",this.$view);this.$name=$(".name-hook",this.$view);this.$edit=$(".modify-hook",this.$view);this.$today=$(".today-hook",this.$view).weathericon();this.$tomorrow=$(".tomorrow-hook",this.$view).weathericon();this.$more=$(".more-hook",this.$view);this.$provinceSelect=
$(".province-hook",this.$control);this.$citySelect=$(".city-hook",this.$control);this.$districtSelect=$(".district-hook",this.$control);this.$saveBtn=$(".save-hook",this.$control);this.$cancleBtn=$(".cancle-hook",this.$control);this._bindEvent();this.$tip=null},_init:function(){var b=this,a=b.options;if(!d.has("tp1"))b.$today.on("weathericonafterrender",function(a,f){var c=f.desc,e=!1;/\u96e8$/.test(c)&&(e="\u4eca\u5929\u6709\u96e8\uff0c\u8bb0\u5f97\u5e26\u4f1e");/\u96ea$/.test(c)&&(e="\u4eca\u5929\u6709\u96ea\uff0c\u5c0f\u5fc3\u8def\u6ed1");
/\u973e$/.test(c)&&(e="\u96fe\u973e\u5929\u6c14\uff0c\u6ce8\u610f\u9632\u62a4");/\u6c99/.test(c)&&(e="\u6c99\u5c18\u5929\u6c14\uff0c\u51cf\u5c11\u51fa\u884c");/\u96fe/.test(c)&&(e="\u4eca\u5929\u6709\u96fe\uff0c\u5c0f\u5fc3\u6162\u884c");e&&(b.$tip=b.$tip||b.element.tip({offsetX:60,offsetY:-25,close:!0}).on("tipclose",function(){d.set("tp1",1,{expires:1})}),b.$tip.tip("html",e).tip("show"))});b.load(a.province,a.city,a.district)},destroy:function(){$.Widget.prototype.destroy.call(this)},_bindEvent:function(){var b=
this,a=b.options;b.element.bind("weatherbeforload",function(){b._info(a.loadingTpl)}).bind("weatherafterload",function(c,d){var e=b._parseData(d);e?(b._setOption("province",e.province),b._setOption("city",e.city),b._setOption("district",e.district),b._render(e),b._switchView(1)):b._info(a.errorTpl,0,!0,function(){$(".reset-hook",b.$info).click(function(a){b._trigger("selectchange",a);b._switchView(2);return!1})})}).bind("weathertimeout",function(c,d){b._info(a.timeoutTpl,0,!0,function(){$(".retry-hook",
b.$info).click(function(){b.load(d.province,d.city,d.district);return!1})})}).bind("weatherselectchange",function(a,f){void 0===f.province?b._loadProvince():void 0===f.city?b._loadCity(f.province):void 0===f.district&&b._loadDistrict(f.province,f.city)});b.$edit.click(function(){var c={};b._loadSelect(b.$provinceSelect,c,a.province);c.province=a.province;b._loadSelect(b.$citySelect,c,a.city);c.city=a.city;b._loadSelect(b.$districtSelect,c,a.district);b._switchView(2);return!1});b.$saveBtn.click(function(){var a=
b._getSelect();b.load(a.province,a.city,a.district)});b.$cancleBtn.click(function(){b._switchView(1);return!1});b.$provinceSelect.change(function(a){b._trigger("selectchange",a,{province:b.$provinceSelect.val()})});b.$citySelect.change(function(a){b._trigger("selectchange",a,{province:b.$provinceSelect.val(),city:b.$citySelect.val()})})},_switchView:function(b){var a=this,d;1!=b&&a.$tip&&a.$tip.tip("hide");$.each([a.$info,a.$view,a.$control],function(a,c){a==b?d=c:c.hide()});6!=c.ie&&1==b&&(a.$city.css({left:-60}),
a.$today.css({top:60}),a.$tomorrow.css({top:-60}),a.$more.css({left:40}),setTimeout(function(){a.$city.animate({left:0})},0),setTimeout(function(){a.$today.animate({top:0})},80),setTimeout(function(){a.$tomorrow.animate({top:0})},160),setTimeout(function(){a.$more.animate({left:0})},240));d.show()},_info:function(b,c,d,e){c=parseInt(c,10);c=a[c]||a[1];this.$info.removeClass(a.join(" ")).addClass(c);d?this.$info.html(b):this.$info.text(b);$.isFunction(e)&&e();this._switchView(0)},_getAreaName:function(b,
a,c){var d=this.areaMap,e,g,i,m;switch(arguments.length){case 0:return;case 1:e=this._genAreaId();g=b;break;case 2:e=this._genAreaId(b);g=a;break;default:e=this._genAreaId(b,a),g=c}i=!1;void 0!==d[e]&&$.each(d[e],function(b,a){a.id==g&&(m=a.name,i=!0);return!i});return i?m:void 0},load:function(b,a,c){var d=this,e=d.options,g=e.forecastUrl,i,m,h;d._trigger("beforload");i=void 0!==b&&void 0!==a&&void 0!==c?{t:2,provice:d._getAreaName(b),city:d._getAreaName(b,a),district:d._getAreaName(b,a,c)}:{t:1};
m=!1;$.getJSON(g,i,function(b){clearTimeout(h);m||d._trigger("afterload",null,b)});h=setTimeout(function(){m=!0;d._trigger("timeout",null,{provice:b,city:a,district:c})},e.timeout)},_parseData:function(b){var a,c,d;if(!b||!(a=b.cityinfo)||!(c=b.forecast5d)||!((d=c.f.f1)&&1<d.length))return!1;b=(c=b.aqi)?c.url:void 0;a={province:a.pid,city:a.cid,district:a.zid,name:a.dist,url:b,forecast:[],pm:c?{value:c.value,level:c.level,levelnum:c.levelnum}:void 0};a.forecast[0]={weather:d[0].fa?d[0].fa:d[0].fb,
temperaMin:d[0].fd,temperaMax:d[0].fc,url:b,day:"\u4eca\u5929"};a.forecast[1]={weather:d[1].fa,temperaMin:d[1].fd,temperaMax:d[1].fc,url:b,day:"\u660e\u5929"};return a},_render:function(b){this.$name.text(b.name);this.$today.weathericon("render",b.forecast[0],b.pm);this.$tomorrow.weathericon("render",b.forecast[1])},_loadProvince:function(b){var a=this,c=a.$provinceSelect;a._loadSelect(c,{},b,function(){a._trigger("selectchange",null,{province:c.val()})})},_loadCity:function(b,a){var c=this,d=c.$citySelect;
c._loadSelect(d,{province:b},a,function(){c._trigger("selectchange",null,{province:b,city:d.val()})})},_loadDistrict:function(b,a,c){var d=this,e=d.$districtSelect;d._loadSelect(e,{province:b,city:a},c,function(){d._trigger("selectchange",null,{province:b,city:a,district:e.val()})})},_loadSelect:function(b,a,c,d){var e=this.options;this._loadArea(a.province,a.city,function(a){var f=[];$.each(a,function(a,b){f.push(i(e.selectTpl,b))});b.html(f.join(""));void 0!==c&&setTimeout(function(){b.val(c)},
0);$.isFunction(d)&&d()})},_genAreaId:function(a,c){var d=["ROOT"];void 0!==a&&(d.push(a),void 0!==c&&d.push(c));return d.join()},_loadArea:function(a,c,d){var e=this.options,g=this.areaMap,i={},k=this._genAreaId(a,c);void 0!==g[k]?d(g[k]):(void 0!==a&&(i.pid=a,void 0!==c&&(i.cid=c)),$.getJSON(e.areaUrl,i,function(a){a&&(g[k]=a);d(a)}))},_getSelect:function(){return{province:this.$provinceSelect.val(),city:this.$citySelect.val(),district:this.$districtSelect.val()}}});$.widget("hao123.weathericon",
{options:{tpl:'<img class="img img-hook" width="48" height="48" src="#{icon|e}"/>#{day} #{weather}<br /><span class="desc-hook">#{desc}</span>',iconTpl:"http://s0.hao123img.com/index/images/weather/icon/#{id}.png",defaultIcon:"a0",confMap:{"00":["\u6674","a0"],"01":["\u591a\u4e91","a1"],"02":["\u9634","a2"],53:["\u973e","a2"],"03":["\u9635\u96e8","a3"],"04":["\u96f7\u9635\u96e8","a4"],"05":["\u96f7\u9635\u96e8","a5"],"06":["\u96e8\u5939\u96ea","a6"],"07":["\u5c0f\u96e8","a7"],"08":["\u4e2d\u96e8",
"a8"],"09":["\u5927\u96e8","a9"],10:["\u66b4\u96e8","a10"],11:["\u5927\u66b4\u96e8","a11"],12:["\u5927\u66b4\u96e8","a12"],13:["\u9635\u96ea","a13"],14:["\u5c0f\u96ea","a14"],15:["\u4e2d\u96ea","a15"],16:["\u5927\u96ea","a16"],17:["\u66b4\u96ea","a17"],18:["\u96fe","a18"],19:["\u51bb\u96e8","a19"],20:["\u6c99\u5c18\u66b4","a20"],21:["\u5c0f\u96e8","a21"],22:["\u4e2d\u96e8","a22"],23:["\u5927\u96e8","a23"],24:["\u66b4\u96e8","a24"],25:["\u5927\u66b4\u96e8","a25"],26:["\u5c0f\u96ea","a26"],27:["\u4e2d\u96ea",
"a27"],28:["\u5927\u96ea","a28"],29:["\u6d6e\u5c18","a29"],30:["\u626c\u6c99","a30"],31:["\u6c99\u5c18\u66b4","a31"]}},render:function(a,c){var d=this,e=d.options,j=a.weather,k=d._getWeather(j),o=d._getIcon(j),j=d._getDesc(j),m=d._getTempera(a.temperaMin,a.temperaMax),h=c&&c.level,c=c&&d._getPM25(c);d.element.html(i(e.tpl,{day:a.day,weather:j,icon:o,desc:c||m})).attr({title:a.day+k+" "+m+(h?" \u7a7a\u6c14\u8d28\u91cf\uff1a"+h:"")});d.pmid&&clearTimeout(d.pmid);c&&(d.pmid=setTimeout(function(){$(".desc-hook",
d.element).text(m)},1E4));g($(".img-hook",d.element));d._trigger("afterrender",null,{weather:k,tempera:m,desc:j,pm:c})},_getIcon:function(a){var c=this.options;return i(c.iconTpl,{id:(c.confMap[a]||[c.defaultIcon])[1]})},_getDesc:function(a){var c=this.options.confMap[a];return c=c?c[0]||a:\u65e0},_getTempera:function(a,c){a=$.trim(a);return(c=$.trim(c))?c+" ~ "+a+"\u2103":a+"\u2103"},_getWeather:function(a){return this._getDesc(a)},_getPM25:function(a){return!a||!a.level?!1:i('#{label}:<span class="#{cls}">#{level}</span>',
{label:function(){return 3>a.levelnum?"\u7a7a\u6c14\u8d28\u91cf":"\u7a7a\u6c14\u6c61\u67d3"},level:function(){return{1:"\u4f18",2:"\u826f",3:"\u8f7b\u5ea6",4:"\u4e2d\u5ea6",5:"\u91cd\u5ea6",6:"\u4e25\u91cd"}[a.levelnum]||"\u4e00\u822c"},cls:function(){return"pm-level pm-level"+a.levelnum}})}});return o});
__d("site.indexLogo",["common.js.refer","common.js.home","common.js.events","widget.skin.service","widget.skin.hooks"],function(k,r,o,e){var i=e("common.js.refer"),g=e("common.js.home"),d=e("common.js.events"),c=e("widget.skin.service");e("widget.skin.hooks");var a,b;return o={check:function(){return i.isIENotHome()},getSrc:function(a){return a.imgurl},onClick:function(){g.set(this,"http://www.6164.com/?f=hao123",1);return!1},changeSkin:function(d){if(!a&&(b=c.config.lastSkin=d,a=!0,c.config.userSkin==
d)||c.config.userSkin==d&&"logo"!=c.config.src)return!0;c.config.lastSkin!=b&&c.config.userSkin!=b?(c.viewSkin(b,{src:"logo"}),c.setSkin(b)):c.resetLastSkin("logo");return c.config.lastSkin==b?"":"skin-color-green"==c.config.lastSkin?"-def":"-last"},initGame:function(){d.emit("initGame");return!1}}});window.js_dcfISoyRZf&&window.js_dcfISoyRZf(!0);
