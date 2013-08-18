Ext.define("Ext.scroll.ScrollerRtl",{override:"Ext.scroll.Scroller",snapToBoundary:function(){var h=this.position,c=this.getMinPosition(),g=this.getMaxPosition(),e=c.x,d=c.y,b=g.x,a=g.y,f=e,j=Math.round(h.x),i=Math.round(h.y);e=-b;b=-f;if(j<e){j=e}else{if(j>b){j=b}}if(i<d){i=d}else{if(i>a){i=a}}this.scrollTo(j,i)},getAnimationEasing:function(g){if(!this.isAxisEnabled(g)){return null}var e=this.position[g],f=this.flickStartPosition[g],l=this.flickStartTime[g],d=this.getMinPosition()[g],k=this.getMaxPosition()[g],h=d,a=this.getMaxAbsoluteVelocity(),c=null,b=this.dragEndTime,m,j,i;if(g=="x"){d=-k;k=-h}if(e<d){c=d}else{if(e>k){c=k}}if(c!==null){m=this.getBounceEasing()[g];m.setConfig({startTime:b,startValue:-e,endValue:-c});return m}i=b-l;if(i===0){return null}j=(e-f)/(b-l);if(j===0){return null}if(j<-a){j=-a}else{if(j>a){j=a}}m=this.getMomentumEasing()[g];if(g=="x"){m.setConfig({startTime:b,startValue:-e,startVelocity:-j,minMomentumValue:0,maxMomentumValue:-d})}else{m.setConfig({startTime:b,startValue:-e,startVelocity:-j,minMomentumValue:-k,maxMomentumValue:0})}return m},onAxisDrag:function(d,q){if(!this.isAxisEnabled(d)){return}var l=this.flickStartPosition,r=this.flickStartTime,j=this.lastDragPosition,n=this.dragDirection,a=this.position[d],o=this.getMinPosition()[d],p=this.getMaxPosition()[d],g=o,h=this.startPosition[d],k=j[d],m=h-q,i=n[d],f=this.getOutOfBoundRestrictFactor(),b=this.getStartMomentumResetTime(),c=Ext.Date.now(),e;if(d=="x"){o=-p;p=-g;if(m<o){e=m-o;m=o+e*f}else{if(m>p){m*=f}}}else{if(m<o){m*=f}else{if(m>p){e=m-p;m=p+e*f}}}if(m>k){n[d]=1}else{if(m<k){n[d]=-1}}if((i!==0&&(n[d]!==i))||(c-r[d])>b){l[d]=a;r[d]=c}j[d]=m}});Ext.define("Ext.scroll.indicator.ScrollPositionRtl",{override:"Ext.scroll.indicator.ScrollPosition",updateValue:function(b){var a=this.getAxis();if(this.gapLength===0){if(b<1){b=b-1}if(a=="x"){b*=-1}this.setOffset(this.barLength*b)}else{if(a=="x"){}this.setOffset(this.gapLength*b)}},setLength:function(e){var c=this.getAxis(),a=this.barLength,d=this.barElement.dom,b=this.element;this.callParent(arguments);if(c==="x"){a*=-1;d.scrollRight=a;b.setRight(a)}else{d.scrollTop=a;b.setTop(a)}},});Ext.define("Ext.scroll.ViewRtl",{override:"Ext.scroll.View",setIndicatorValue:function(b,f){if(!this.isAxisEnabled(b)){return this}var a=this.getScroller(),c=a.getMaxPosition()[b],e=a.getContainerSize()[b],d;if(b==="x"){f*=-1}if(c===0){d=f/e;if(f>=0){d+=1}}else{if(f>c){d=1+((f-c)/e)}else{if(f<0){d=f/e}else{d=f/c}}}this.getIndicators()[b].setValue(d)},});Ext.define("Ext.TitleBarRtl",{override:"Ext.TitleBar",refreshTitlePosition:function(){var f=this.titleComponent.renderElement;f.setWidth(null);f.setLeft(null);var a=this.leftBox,c=a.down("button"),h,m;if(c){if(c.getWidth()==null){c.renderElement.setWidth("auto")}h=a.renderElement.getWidth();m=this.getMaxButtonWidth();if(h>m){c.renderElement.setWidth(m)}}var j=this.spacer.renderElement.getPageBox(),k=f.getPageBox(),g=k.width-j.width,d=k.left,i=k.right,b,l,e;if(g>0){f.setWidth(j.width);b=g/2;d+=b;i-=b}l=j.left-d;e=i-j.right;if(l>0){f.setRight(-l)}else{if(e>0){f.setRight(e)}}f.repaint()}});Ext.define("Ext.dataview.NestedListRtl",{override:"Ext.dataview.NestedList",config:{layout:{type:"card",animation:{type:"slide",duration:250,direction:"right"}},}});Ext.define("Ext.navigation.ViewRtl",{override:"Ext.navigation.View",config:{layout:{type:"card",animation:{duration:300,easing:"ease-out",type:"slide",direction:"right"}}}});Ext.define("Ext.navigation.BarRtl",{override:"Ext.navigation.Bar",fromBackButton:false,onBackButtonTap:function(){this.fireEvent("back",this);this.fromBackButton=true},animate:function(b,a,e){var c=this,d;b.setLeft(0);a=Ext.apply(a,{element:b,easing:"ease-in-out",duration:300,type:"slide",duration:c.getAnimation().duration||250,preserveEndState:true});d=new Ext.fx.Animation(a);if(this.fromBackButton==true){d.setDirection("left")}else{d.setDirection("right")}d.on("animationend",function(){if(e){e.call(c)}},c);Ext.Animator.run(d);c.activeAnimations.push(d)},doChangeView:function(k,c,g){var r=this,o=r.leftBox,e=o.element,f=r.titleComponent,m=f.element,n=r.getBackButton(),l=r.getTitleText(),h=r.getBackButtonText(),q=r.getAnimation()&&k.getLayout().getAnimation(),p=q&&q.isAnimation&&k.isPainted(),d,i,a,j,b;if(p){i=r.createProxy(o.element);e.setStyle("opacity","0");n.setText(h);n[c?"show":"hide"]();a=r.createProxy(f.element.getParent());m.setStyle("opacity","0");r.setTitle(l);r.refreshTitlePosition();d=r.measureView(i,a,g);j=d.left;b=d.title;r.isAnimating=true;r.animate(e,j.element);r.animate(m,b.element,function(){m.setLeft(d.titleLeft);r.isAnimating=false;this.fromBackButton=false});if(Ext.os.is.Android2&&!this.getAndroid2Transforms()){i.ghost.destroy();a.ghost.destroy()}else{r.animate(i.ghost,j.ghost);r.animate(a.ghost,b.ghost,function(){i.ghost.destroy();a.ghost.destroy()})}}else{if(c){n.setText(h);n.show()}else{n.hide()}r.setTitle(l)}}});Ext.define("Ext.tab.PanelRtl",{override:"Ext.tab.Panel",config:{layout:{type:"card",animation:{type:"slide",direction:"right"}},}});Ext.define("Ext.field.FieldRtl",{override:"Ext.field.Field",config:{labelAlign:"right"}});