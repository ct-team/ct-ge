define(function (require) {
	function showPop(title){
		var html = '<div class="tcpopbox J_tcpopbox"><div class="tcpopbox-hd"><span class="tcpopbox-hd-til">'+title+'</span><a href="javascript:;" class="tcpopbox-hd-close">×</a></div><div class="tcpopbox-md"><div class="tcpopbox-md-loading loading"></div></div></div>';
		$.dialog({id:'shopPopBox',title: '提示', content: html, min: false, max: false, lock: true, skin: "pop-s1" });	
		$('.tcpopbox-hd-close').click(function(){
			$.dialog.list['shopPopBox'].close();	
		});
	}
	function showContent(str,type){		
		var html = type?popTemp(str,type):str;
		$('.J_tcpopbox .tcpopbox-md').html(html);			
	}
	function popTemp(str){
		//var typeClass = type ?'tcpopbox-ico-ico-ok':'tcpopbox-ico-ico-error';
		return '<div class="tcpopbox-md-content"><s class="tcpopbox-ico tcpopbox-ico-error"></s><p>'+str+'</p> </div>';
	}
	return {
		showPop:showPop,
		showContent:showContent		
	};
});