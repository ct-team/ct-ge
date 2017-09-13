define(function(require) {
	var tabselect = require('./tabselect'),		
		userBox = require('./userBox'),
		userVip = require('./userVip'),
		common = require('./common');
		
	function init(){
		if(typeof(tchallvip) !== 'undefined'){
			common.tchallvip = tchallvip;
		}else{
			common.tchallvip = {isLogin:false};
		}		
		userVip.init();
		userBox.init();
		tabselect.init();		
	}	
	init();
});