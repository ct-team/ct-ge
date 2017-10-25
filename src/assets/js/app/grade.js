/**
 * 等级模块
 * @module
 */
define(function(require) {
	var level = 0;
	function init(callback){
		bind(callback);
	}	
	function bind(callback){	
		var grade = 0;
		$('.type-grade a').click(function(){
			$(this).addClass('on').siblings().removeClass('on');
			level = parseInt($(this).attr('data-id'));
			if($.isFunction(callback)){
				callback(level);	
			}
		});	
	}	
	function getLevel(){
		return level;	
	}
	return {
        /**
         * 初始化
         */
		init:init,
        /**
         * 获得等级
         */
		getLevel:getLevel		
	}
});
