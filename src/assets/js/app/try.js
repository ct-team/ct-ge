define(function(require) {
	var user = require('./user'),
		$close = $('.try-on-md-closetry'),
		$clothes = $('.try-on-md-clothes');
	function wearClothes(url){
		if(!url){
			return;	
		}
		$clothes.find('img').attr('src',url);
	}
	function wear(url){
		if(url === ''){
			return;	
		}
		if(url === user.getCurrClothes()){
			clear();
			user.setCurrClothes('');
			return;	
		}
		wearClothes(url);	
		user.setCurrClothes(url);
		$close.show();
		$close.unbind().click(function(){
			clear();	
		});		
	}
	function clear(){
		$close.hide();
		wearClothes(user.getUserClothes());
	}
	return {
		wear:wear,
		wearClothes:wearClothes
	}
});
