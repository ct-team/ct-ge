/**
 * @file 滚动插件
 * @author daixl
 */
(function ($) {
    $.fn.slider = function (opts) {		
		var o = $.extend({
            speed:500,//速度
			delay:3000,//间隔
			dot:true,//出现圆点
			arrows:true,//出现箭头
			min:1,//最小数量
			prev:'.prev',
			next:'.next',
			items: '>ul',
			item: '>li',
			deviation:0,
			autoplay: true,//是否自动播放
			complete:false	//完成后事件
        }, opts);
        return this.each(function () {
			var _ = $(this),
			s={};
			function init(){
				s.ul = _.find(o.items);
				s.ul.css({left:0});
				s.li = s.ul.find(o.item);	
				s.liLen = s.li.length;
				if(s.liLen <= o.min){return;}
				s.liW = s.li.eq(0).width()+o.deviation;
				s.li.clone().appendTo(s.ul);
				s.timer = null;
				s.index = 0;				
				size();
				dot();
				arrows();
				play();
				bind();
			}
			function size(){
				s.ul.width((s.liLen*2) * s.liW + 10);				
			}
			function arrows(){
				var n;
				if(!o.arrows){
					return;
				}
				$(o.prev).unbind().click(function(){
					if(s.index-1 < 0){
						s.ul.css({left:-s.liW*s.liLen});	
						n = s.liLen-1;	
					}else{
						n = s.index-1;
					}
					to(n);	
				});
				$(o.next).unbind().click(function(){
					if(s.index+1 > s.liLen){
						n = 1;	
					}else{
						n = s.index+1;
					}
					to(n);		
				});
			}
			function dot(){
				var html='',i;
				if(!o.dot){
					return;
				}
				for (i = 1; i <= s.liLen; i++) {
					if(i == 1){
						html += '<li class="active">'+i+'</li>';
					}else{
						html += '<li>'+i+'</li>';
					}
					
				}			
				_.append('<ol>'+html+'</ol>');	
				_.find('ol li').unbind().on('mouseenter',function(){
					to(parseInt($(this).html())-1);
				});				
				
				
			}
			function stop(){
				s.ul.stop(true, true);
				window.clearTimeout(s.timer);
			}
			function to(n){
				var p;				
				p=n-s.index;	
				/*if(p <= 0){
					p=1;
				}*/
				stop();
				s.index = n;
				autoPlay();
			}
			function autoPlay() {
				s.ul.stop(true, true).animate({left: -s.liW*s.index}, o.speed,function(){
					if (s.index >= s.liLen) {
						s.index = 0;
						s.ul.css({left:0});	
						if(o.dot){
							_.find("ol li").eq(s.index).addClass("active").siblings().removeClass("active");
						}	
					}
					
					if($.isFunction(o.complete)){
						o.complete(s.index);
					}
					play();
				});	
				if(o.dot){
					_.find("ol li").eq(s.index).addClass("active").siblings().removeClass("active");
				}							
			}
	
			function play() {
				if(!o.autoplay){
					return;	
				}
				s.timer = window.setTimeout(function () {
					s.index += 1;
					autoPlay();
				}, o.delay);
			}	
			function bind(){
				if(!o.autoplay){
					return;	
				}
				s.li.on("mouseenter",function(){
					stop();
				});
				s.li.on("mouseleave",function(){
					play();
				});
			}
			init();
			_.slider.initParm=function(){
					s.liW = s.li.eq(0).width();
					s.index = 0;
					s.ul.css({left:0});
			};	
		});	

    };
})(jQuery);
