define(function(require) {
	var initFlag = false,
		list = require('../../tpl/list'),
		common = require('./common'),
		getClothes = require('./getClothes'),
		tryClothes = require('./try'),
		grade = require('./grade'),
		$content = $('.list-box-content');
	function init(){
		if(initFlag){return;}
		initFlag = true;
		grade.init(gradeCallback);
		getData(1,0);
	}
	function gradeCallback(level){
		getData(1,level);
	}
	function loading(flag){		
		if(flag){
			$content.empty();
			$content.addClass('loading');	
		}else{
			$content.removeClass('loading');
		}		
	}
	function getData(currPage,level){
		loading(true);
		$.ajax({
			url: common.url.list,
			cache: false,
			dataType: 'json',
			data:{page:currPage,pageSize:8,filterLevel:level},
			type: 'get',
			success:function(data){
				success(data);				
			},
			error:function(){
				showErrorTip("系统繁忙，请稍后重试！");
			},
			complete: function(){
				loading(false);
			}	
		});	
	}
	function success(data){
		var render,html;
		if(data.status === 1){
			if(data.data){
				render = template.compile(list);
				html = render(data.data);
				$content.html(html);			
				page(data.data.truePageIndex,data.data.totalRecord);
				bind();	
			}else{
				showErrorTip("没有内容");	
			}
							
		}else{
			showErrorTip(data.msg);	
		}		
	}	
	function page(currPage,totleNum){
		$("#page").pages({
			form:false,
			tpl:{up:'&lt;',down:'&gt;'},
			currPage:currPage, //当前页码
			pageLen:8,//每页数量
			totleNum:totleNum, //总数量            
			callback:function(n){
				getData(n,grade.getLevel());
			}
		});	
	}
	function showErrorTip(str){
		$content.html('<div class="error-tip">'+str+'</div>');
	}
	function bind(){
		var id,title,url,subid;
		$('.J_btn_buy').click(function(){
			if($(this).hasClass('btn-buy-no')){
				return false;	
			}
			id = $(this).parents('li').attr('data-id');
			title = $(this).parents('li').find('.J_list_name').html();
			getClothes.getData(id);
			return false;
		});
		$('.J_btn_try').click(function(){
			tryClothes.wear($(this).attr('data-url'));
			return false;
		});
	}
	
	return {
		init:init		
	};
});
