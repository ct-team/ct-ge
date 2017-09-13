define(function(require) {
	var userClothes = '',
		currClothes = '';
	function setUserClothes(src){
		userClothes = src;	
	}
	function setCurrClothes(src){
		currClothes = src;	
	}
	function getUserClothes(){
		return userClothes;	
	}
	function getCurrClothes(){
		return currClothes;	
	}
	
	return {
		setUserClothes:setUserClothes,
		setCurrClothes:setCurrClothes,
		getUserClothes:getUserClothes,
		getCurrClothes:getCurrClothes	
	}
});
