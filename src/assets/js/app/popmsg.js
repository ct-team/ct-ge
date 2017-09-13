define(function(require) {
	var msg = require('./msg');
	function init(id,datamsg){
		if(id === 1){
			msg.float.init({
                content: '恭喜您，领取成功！',
                type: 'success'
            });	
			return;	
		}
		if(id === -100){
			msg.float.init({
				content: "网络异常，请检查网络",
				type: 'error'
			});
			return;	
		}
		if(id === -1){	
			msg.float.init({
				content: "您还没有登录",
				type: 'error'
			});
			return;			
		}
		if(id === -2){			
			msg.pop.init({
                title: '提示',
                content: 'Sorry，系统出现问题',
                type: 'error',                
                btnL: [
                    {'html': '联系客服','url':'tcynew://talk.tcy365.com/client/Index.aspx?f=6','css': 'confirm y-btn1'}
                ]
            });
			return;	
		}
		if(id === -3){			
			msg.float.init({
				content: "活动未开始，不要着急嘛",
				type: 'error'
			});
			return;	
		}
		if(id === -4){			
			msg.float.init({
				content: "活动已结束，请关注同城游其它活动",
				type: 'error'
			});
			return;	
		}
		if(id === -5){			
			msg.float.init({
				content: "正在努力处理，请稍后",
				type: 'error'
			});
			return;	
		}
		if(id === -6){			
			msg.float.init({
				content: "本月您已领取过该奖励",
				type: 'error'
			});
			return;	
		}
		
		if(id === -7){			
			msg.pop.init({
                title: '提示',
                content: '对不起，您还不是会员',
                type: 'error',                
                btnL: [
                    {'html': '成为会员','url':'tcyapp://openpay?urlparam=tab=service','css': 'confirm y-btn1'}
                ]
            });
			return;	
		}
		if(id === -8){			
			msg.pop.init({
                title: '提示',
                content: '当前等级不符合',
                type: 'error',                
                btnL: [
                    {'html': '提升等级','url':'tcyapp://openpay?urlparam=tab=service','css': 'confirm y-btn1'}
                ]
            });
			return;	
		}
		if(id === -9){			
			msg.pop.init({
                title: '提示',
                content: '您已在本月成功免费领取一套服装，到达会员等级LV2即刻享无限领取。',
                type: 'error',
                btnL: [
                    {'html': '提升等级','url':'tcyapp://openpay?urlparam=tab=service','css': 'confirm y-btn1'}
                ]
            });
			return;	
		}
		if(typeof(datamsg) === 'undefined'){
			datamsg	 = '系统繁忙，请稍后重试！';
		}
		msg.float.init({
			content: datamsg,
			type: 'error'
		});
	}
	
	return {
		init:init	
	}
});
