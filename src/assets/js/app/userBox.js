define(function(require) {
	var tryClothes = require('./try'),
		user = require('./user'),
		common = require('./common');
	function init(){
		showContent(common.tchallvip);
		bind();
	}
	function showContent(obj){
		if(obj.isLogin){
			$('.J_user_box').show();	
			$('.try-on-hd-username').html(obj.userName);
			user.setUserClothes(obj.portrait);
			tryClothes.wearClothes(obj.portrait);
			$('.login-state').hide();
		}
	}
	function bind(){
		$('.try-on-hd-refresh').click(function(){
			window.location.reload();
		});	
	}
	return {
		init:init	
	}
});
