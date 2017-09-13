define(function(require) {
	var pop = require('./pop'),
		tryClothes = require('./try'),
		popmsg = require('./popmsg'),
		ajaxFlag = true,
		common = require('./common');
	function getData(id){
		var btn;
		if(!ajaxFlag){
			return false;	
		}
		ajaxFlag = false;
		btn = $('.list-items li[data-id="'+id+'"]').find('.btn-buy');
		btn.html('领取中');
		$.ajax({
			url: common.url.getClothes,
			cache: false,
			dataType: 'json',
			data:{itemId:id},
			type: 'get',
			success:function(data){
				success(data,id,btn);				
			},
			error:function(XMLHttpRequest,textStatus){	
				btn.html('领取');
				if(textStatus === 'timeout'){
					popmsg.init(-100);
					return;
				}		
				popmsg.init(-2);				
			},
			complete:function(){
				ajaxFlag = true;
			}
			
		});	
	}
	function success(data,id,btn){
		if(data.status === 1 && data.data === 1){
			popmsg.init(1);
			btn.addClass('btn-buy-no').html('已领取');
			tryClothes.wearClothes(btn.parent().find('.btn-try').attr('data-url'));
			window.location.href="tcyapp://changeclothing/";
			return;
		}	
		btn.html('领取');	
		popmsg.init(data.data,data.msg);
	}	
	return {
		getData:getData	
	};
});
