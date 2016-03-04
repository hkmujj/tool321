__d("widget.canlash.imageloader",[],function(){var h=0;return function(b,d,a){function g(a){function c(){b.onload=b.onerror=null;try{delete window[g]}catch(a){}!--i&&!l&&(clearTimeout(k),d(f))}var b=a.img,g=a.id;a.status="loading";b.onload=function(){f=f&&!0;a.status="loaded";c()};b.onerror=function(){f=!1;a.status="error";c()};b.src=a.src}function e(){l=!0;d(!1)}var j,c,i,f,k,l;i=0;f=!0;l=!1;for(j in b)b.hasOwnProperty(j)&&(c=b[j],"string"==typeof c&&(c=b[j]={src:c}),c&&c.src&&(i++,c.id="__img_"+
j+ ++h,c.img=window[c.id]=new Image,g(c)));i?a&&(k=setTimeout(e,a)):d(f)}});
__d("widget.canlash.effect",[],function(h,b,d){return d={linear:function(a){return a},reverce:function(a){return 1-a},parabola:function(a){return Math.pow(a,2)},antiparabola:function(a){return 1-Math.pow(1-a,2)},sinoidal:function(a){return-Math.cos(a*Math.PI)/2+0.5},wobble:function(a){return-Math.cos(a*Math.PI*9*a)/2+0.5},spring:function(a){return 1-Math.cos(4.5*a*Math.PI)*Math.exp(6*-a)},shuttle:function(a){return 1-Math.abs(1-2*a)},percent:function(a,b,e){return(a+e)%b/b}}});
__d("widget.canlash.sprite",[],function(){function h(b){this.children=[];this.rotation=this.y=this.x=0;this.scale=1;b&&(this.paint=b)}h.prototype.draw=function(b,d){var a=this.children,g=a.length,e,j=this.x,c=this.y,i=this.rotation,f=this.scale;(j||c)&&b.translate(j,c);i&&b.rotate(i);1!==f&&b.scale(f,f);this.beforePaint(b,d);this.paint(b,d);for(e=0;e<g;e++)a[e].draw(b,d);this.afterPaint(b,d);1!==f&&(f=1/f,b.scale(f,f));i&&b.rotate(-i);(j||c)&&b.translate(-j,-c)};h.prototype.beforePaint=function(){};
h.prototype.paint=function(){};h.prototype.afterPaint=function(){};h.prototype.add=function(b,d){this.children.push(b);d&&(this[d]=b);return this};h.prototype.remove=function(b){for(var d=this.children,a=d.length;a--;)b===d[a]&&d.splice(a,1);return this};return h});
__d("widget.canlash.timeline",[],function(){function h(){this.animationHandler=0}var b,d,a=1E3/60;h.prototype.onenterframe=function(){};h.prototype.start=function(g){function e(){var f=+new Date;c.animationHandler=b(e);f-i>=g&&(c.onenterframe(f-d),i=f)}var d=+new Date,c=this,i=0,g=g||a;c.startTime=d;c.interval=g;c.stop();e()};h.prototype.restart=function(){function a(){var f=+new Date;e.animationHandler=b(a);f-d>=c&&(e.onenterframe(f-i),d=f)}var e=this,d=0,c,i;e.dur&&e.interval&&(c=e.interval,i=+new Date-
e.dur,e.startTime=i,e.stop(),a())};h.prototype.stop=function(){this.startTime&&(this.dur=+new Date-this.startTime);d(this.animationHandler)};b=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||function(a){return window.setTimeout(a,1E3/60)}}();d=function(){return window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||function(a){window.clearTimeout(a)}}();
return h});
__d("widget.canlash.stage",["widget.canlash.sprite","widget.canlash.timeline"],function(h,b,d,a){function g(a,b,f,k){e.call(this,k);this.timeline=new j;a&&this.setContext(a,b,f)}var e=a("widget.canlash.sprite"),j=a("widget.canlash.timeline");g.prototype=new e;g.prototype.start=function(a){this.timeline.start(a);return this};g.prototype.restart=function(){this.timeline.restart();return this};g.prototype.stop=function(){this.timeline.stop();return this};g.prototype.setContext=function(a,b,f){var k=
this;k.context=a;k.width=b;k.height=f;k.timeline.onenterframe=function(f){k.draw(a,f)}};g.prototype.beforePaint=function(a){a.clearRect(0,0,this.width,this.height)};return g});
__d("common.js.animation",["widget.canlash.timeline","widget.canlash.imageloader"],function(h,b,d,a){function g(a){a&&a()}function e(){this.taskQueue=[];this.timeline=new j;this.state=i;this.index=0}var j=a("widget.canlash.timeline"),c=a("widget.canlash.imageloader"),i=0;e.prototype={loadImage:function(a){return this._add(function(b){c(a.slice(),b);a=null})},changePosition:function(a,b){var c=b.length,d=0,e=this;return this._add(c?function(g,i){d=i/e.interval|0;if(d>=c)d=0,g();else{var h=b[d].split(" ");
a.style.backgroundPosition=h[0]+"px "+h[1]+"px"}}:g,1)},changeSrc:function(a,b){var d=b.length,c=0,e=this;return this._add(d?function(g,h){c=h/e.interval|0;c>=d?(c=0,g()):a.src=b[c]}:g,1)},wait:function(a){return this._add(function(b){a();b()})},enterFrame:function(a){return this._add(a,1)},repeat:function(a){var b=this;return this._add(function(){a?--a?b.index--:b.index++:b.index--;b._next()})},start:function(a){if(1==this.state)return this;this.state=1;if(!this.taskQueue.length)return this;this.interval=
a;this._next();return this},pause:function(){this.state=2;this.timeline.stop()},dispose:function(){this.taskQueue=null;this.timeline&&this.timeline.stop();this.timeline=null;this.state=i},_add:function(a,b){this.taskQueue.push({task:a,type:b});return this},_next:function(){var a;this.taskQueue&&2!=this.state&&(this.index==this.taskQueue.length?this.dispose():(a=this.taskQueue[this.index],1==a.type?this._enterframe(a.task):this._excuteTask(a.task)))},_excuteTask:function(a){var b=this;a(function(){b.index++;
b._next()})},_enterframe:function(a){var b=this;this.timeline.onenterframe=function(c){a(function(){b.timeline.stop();b.index++;b._next()},c)};this.timeline.start(this.interval)},constructor:e};return function(){return new e}});window.js_MFsXRZIpdX&&window.js_MFsXRZIpdX(!0);
