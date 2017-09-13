define(function (require) {
	var $item = $('.nav .nav-item'),
		clothes = require('./clothes'),
		gradeClothes = require('./gradeClothes'),
		tabList = {clothes:1,gradeClothes:1};
	function init(str){
		select(str);
		bind();
	}
	function navClass(str){
		$item.each(function(index, element) {
            if($(this).attr('data-type') === str){
				$(this).addClass('nav-item-on');
			}else{
				$(this).removeClass('nav-item-on');
			}
        });
	}
	function select(str){
		if(!tabList[str]){
			str = 'clothes';	
		}
		show(str);
		navClass(str);
		if(str === 'clothes'){
			clothes.init();
		}
		if(str === 'gradeClothes'){
			gradeClothes.init();
		}
		
	}
	function show(str){
		var $wrap = $('.J_wrap'),
			$gradeClass = $('.list-box-type'),
			$content = $('.list-box-content'),
			$grade = $('.vip-grade'),
			$page = $('#page');
		if(str === 'clothes'){
			$wrap.removeClass('tcshopvip');	
			$content.show();
			$grade.hide();
			$gradeClass.show();
			$page.show();
		}
		if(str === 'gradeClothes'){
			$wrap.addClass('tcshopvip');	
			$content.hide();
			$grade.show();
			$gradeClass.hide();
			$page.hide();
		}
		
	}
	function bind(){
		var type;
		$item.click(function(){
			type = $(this).attr('data-type');
			select(type);	
		});			
	}
	return {
		init:init		
	}
});