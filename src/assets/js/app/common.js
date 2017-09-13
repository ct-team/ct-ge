define(function (require) {
	return {
		url:{
			list:'/FreeCloth/List',
			getClothes:'/FreeCloth/RequestCloth',
			IsMember:'/FreeCloth/IsMember'					
		},
		tchallvip:{isLogin:false},
		errorTypeString:{
			'-1':'请先登录',
			'-2':'系统错误',
			'-3':'活动未开始',
			'-4':'活动未结束',
			'-5':'正在处理中',
			'-6':'当月已领取',
			'-7':'你还不是会员',
			'-8':'等级不符',
			'-9':'您当前等级已经不能再领取',
			'-100':'超时'
		}
	};	
});