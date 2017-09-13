(function () {
    $.fn.pages = function (opts) {
        var option = $.extend({
            currPage: 0, //当前页数
            pageLen: 5, //每页数量
            totleNum: 0,
            form: true,//显示跳页页面
            spage: 5,//页面几页后省略
            topPage: 1,//省略号前显示页数
            afterPage: 1,//省略号后显示页数
			tpl:{
				up:'&lt; 上一页'	,
				down:'下一页 &gt;'
			},
            callback: function () {
                return false;
            }
        }, opts);
        return this.each(function () {
            var $page = $(this);

            function jumpTmp(n) {
                return '<div class="d-pages-total">共<label></label>页，</div><div class="d-pages-form"><span class="d-pages-form-text">到第</span><input class="d-pages-form-input" type="number" value="'+n+'" min="1" ><span class="d-pages-form-text">页</span><a class="d-pages-form-btn" href="javascript:;">确定</a></div>'
            }
			function subPageNum(totleNum,totlePage,currNum) {
                return '<div class="d-pages-pageshow"><span>共'+totleNum+'件</span><span>第'+currNum+'/'+totlePage+'页</span></div>'
            }
            function init() {
                pageSum();
                creatPage();
				setTimeout(function(){
					bind();
				},1);
                
            }

            function pageSum() {
                option.pageNum = parseInt(Math.ceil(option.totleNum / option.pageLen));
            }

            function creatPage() {
                var html = "",
                    arr = [],
                    i,
                    len = 0,
                    num = parseInt(option.currPage),
                    pageNum = option.pageNum,
                    cs = 0,
                    inputNum = 1,
                    dot = '<span class = "item dot">...</span>',
                    spage = option.spage,
                    showPage = 0;
                $page.empty().hide();

                if (!num || option.totleNum <= option.pageLen) {
                    return false;
                }

                $page.show();
                if (num <= 1) {
                    html += '<span class="item disabled">'+option.tpl.up+'</span>';
                } else {
                    html += '<a class="item" data-page="' + (num - 1) + '" href="javascript:;">'+option.tpl.up+'</a>';
                }
                arr = listArr(num, pageNum, spage);
                len = arr.length;

                if (arr[0] > 1) {
                    showPage = arr[0] <= option.topPage ? arr[0] - 1 : option.topPage;
                    for (i = 1; i <= showPage; i++) {
                        html += '<a class="item" data-page="' + i + '" href="javascript:;">' + i + "</a>";
                    }
                }

                if (arr[0] > option.topPage + 1) {
                    html += dot;
                }


                for (i = 0; i < len; i++) {
                    if (arr[i] == num) {
                        html += '<a class="current item" data-page="' + arr[i] + '" href="javascript:;">' + arr[i] + "</a>";
                    } else {
                        html += '<a class="item" data-page="' + arr[i] + '" href="javascript:;">' + arr[i] + "</a>";
                    }
                }

                if (arr[len - 1] < pageNum - option.afterPage) {
                    html += dot;
                }

                if (arr[len - 1] < pageNum) {
                    showPage = arr[len - 1] >= pageNum - option.afterPage ? pageNum - arr[len - 1] : option.afterPage;
                    for (i = pageNum - showPage + 1; i <= pageNum; i++) {
                        html += '<a class="item" data-page="' + i + '" href="javascript:;">' + i + "</a>";
                    }
                }


                if (num >= pageNum) {
                    html += '<span class="item disabled">'+option.tpl.down+'</span>';
                } else {
                    html += '<a class="item" data-page="' + (num + 1) + '" href="javascript:;">'+option.tpl.down+'</a>';
                }

                html = '<div class="d-pages-list">' + html + '</div>';
                if (option.form) {
					inputNum = num + 1;
                    if (inputNum > pageNum) {
                        inputNum = pageNum;
                    }
                    html += jumpTmp(inputNum);
                }
				html = subPageNum(option.totleNum,option.pageNum,option.currPage) + html;
                html = '<div class="d-pages">' + html + '</div>';
                $page.append(html);
                $page.find('.d-pages-total label').html(pageNum);
                if (option.form) {
                    
                    $page.find('.d-pages-form-input').attr('max', pageNum);

                }

            }

            function selectItem(n) {
				if(!n || n < 1 || n > option.pageNum){
					return;	
				}
                option.currPage = n;
                option.callback(n);
                init();
            }

            function bind() {
                var $submit = $page.find('.d-pages-form-btn'),
                    $input = $page.find('.d-pages-form-input'),
                    page,
                    v,
                    num;
                $page.find("a").click(function () {
                    page = parseInt($(this).attr('data-page'));
                    selectItem(page);
                });

                if (option.form) {
                    $submit.bind('click', function () {						
                        selectItem($input.val());
                    });
                    $input.click(function () {
                        $(this).select();
                    });
                    $input.bind('keyup', function () {
                        v = parseInt($(this).val());
                        num = option.pageNum;
                        if (!v) {
                            v = 1;
                        } else {
                            v = parseInt(v);
                            if (v > num) {
                                v = num;
                            }
                            if (v < 1) {
                                v = 1
                            }
                        }
					
                        $(this).val(v);
                    });

                }
            }

            function listArr(page, totle, len) {
                var arr = [], cs, i, flag = true;
                cs = parseInt(len / 2);
                if (flag && totle <= len) {
                    for (i = 1; i <= totle; i++) {
                        arr.push(i);
                    }
                    flag = false;
                }
                if (flag && page <= len - cs) {
                    for (i = 1; i <= len; i++) {
                        arr.push(i);
                    }
                    flag = false;
                }
                if (flag && page + cs >= totle) {
                    for (i = totle - len + 1; i <= totle; i++) {
                        arr.push(i);
                    }
                    flag = false;
                }
                if (flag) {
                    for (i = page - cs; i <= page + cs; i++) {
                        arr.push(i);
                    }
                }
                return arr;
            }


            init();
        });

    };

})();