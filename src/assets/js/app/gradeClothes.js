define(function(require) {
	var initFlag = false,
		tryClothes = require('./try');
	
	function init(){
		if(initFlag){return;}
		initFlag = true;
		bind();
	}
	
	function bind(){		
		$('.vip-grade .btn-try').click(function(){
			tryClothes.wear($(this).attr('data-url'));
			return false;
		});	
	}
	
	return {
		init:init		
	}
});
