define(function(require) {
	var common = require('./common');
	function init(){
		vipAjax();
	}
	function vipAjax(){
		var $vip = $('.J_user_vip');
		$.ajax({
			url: common.url.IsMember,
			cache: false,
			dataType: 'json',
			type: 'get',
			success:function(data){		
				if(data.status === 1 && data.data){
					$vip.addClass('ico-member-on');
				}								
			}
		});	
	}
	return {
		init:init
	}
});
