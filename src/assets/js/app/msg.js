define(function (require, exports, module) {
    var hallpop={};
    hallpop.float= {
        /*
         * @o.id       弹窗id
         * @content    提示文字
         * @type       弹窗样式
         * @flashTime  隐藏显示时间
         * @showTime   停留显示时间
         */
        o:{
            id:'hallPopFloat',
            content: '',
            type:'success',
            top:0,
            flashTime:200,
            showTime:1500
        },
        init: function (obj) {
            var html;
            this.o = $.extend({}, this.o, obj);
            html=this.tempCon(this.o);
            this.flash(html, this.o.id, this.o.time);
        },
        tempCon:function(obj){
            var tempHtml ='' ,
                temp='<div class="hallpop-flost-box" id=[id]>'+
                    '<div class="flost-box-right">'+
                    '<i class="float-ico float-[type]"></i>'+
                    '<span class="yahei float-p">[con]</span>'+
                    '</div>'+
                    '</div>';
            //if(!temp){
            //	return false;
            //}
            tempHtml = temp.replace("[id]", obj.id);
            tempHtml = tempHtml.replace("[con]", obj.content);
            tempHtml = tempHtml.replace("[type]", obj.type);
            return tempHtml;
        },
        flash:function(html,id){
            var obj,height,_this=this;
            $("body").append(html);
            if(id===0){
                return false;
            }
            obj=$('#'+id);
            if(this.o.top===0){
                height=($(window).height()-obj.height())/2;
            }else{
                height=$(window).height()*0.5;
            }
            obj.css({'margin-left':-obj.outerWidth()/2,'top':height});
            obj.show();
            setTimeout(function(){
                obj.animate({top:height-50,opacity:'0.2'},_this.o.flashTime,function(){obj.remove()});
            },this.o.showTime);
        }
    };

    hallpop.pop={
        /*
         * @o.id       弹窗id
         * @content    提示文字
         * @title      提示框title
         * @type       弹窗样式
         * @sim        提示小文字
         * @close      关闭后执行的事件
         * @btnL       按钮数组
         * @time       多少时间自动关闭
         */
        o:{id:'hallPopMsg',content: '',title:"", type:'success',sim:'', 'close': null, 'btnL':[],time:0},
        init:function(obj){
            var conHtml,
                parm,
                $parent,
                parent,
                id;
            parm = $.extend({}, this.o, obj);
            id = this.o.id;
            conHtml=this.tempCon(this.o.id,parm);
            $.dialog({ title: "", content: conHtml, "id": id, min: false, max: false, lock: true, fixed: true, skin: "pop-s1", close: parm.close,time:parm.time });
            $parent = $('.'+this.o.id);
            this.bind($parent,id);
            this.btnBind($parent,parm);
        },
        tempCon:function($parent,obj){
            var tempHtml ='' ,
                temp = '<div class="hallpop-msg [id]">'+
                    '<div class="msg-box">'+
                    '<div class="msgTop yahei"><span class="msgTop-txt">[title]</span><a href="javascript:;" class="msg-close msgClose J_close">×</a></div>'+
                    '<div class="msgCon ">'+
                    '<i class="msg-ico msg-ico-[type]"></i>'+
                    '<div class="msgCon-main">'+
                    '<h3 class="yahei msgCon-h3">[con]</h3>'+
                    '<p class="yahei msgCon-p">[sim]</p>'+
                    '</div>'+
                    '</div>'+
                    '[btn]'+
                    '</div>'+
                    '</div>';
            //if(!temp){
            //	return false;
            //}
            tempHtml = temp.replace("[con]", obj.content);
            tempHtml = tempHtml.replace("[id]",$parent);
            tempHtml = tempHtml.replace("[title]", obj.title);
            tempHtml = tempHtml.replace("[sim]", obj.sim);
            tempHtml = tempHtml.replace("[type]", obj.type);
            tempHtml = tempHtml.replace("[btn]",this.tempBtn(obj));
            return tempHtml;
        },
        tempBtn:function(obj){
            var BtnHtml="",cls="",temp='',html='',btnTemp,BtnHtmlL="";
            o={'html':'','css':'','url':'javascript:;','target':'','action':'javascript:;'};
            if(obj.btnL.length<=0){
                return BtnHtml;
            }
            temp='<div class="msgBtn_b">'+
                    '<div class="btnL">'+
                        '[html]'+
                    '</div>'+
                '</div>';
            $.each(obj.btnL, function (i, entry) {
                entry = $.extend({}, o, entry);
                btnTemp='<a class="btn yahei [css]" href="[url]" target="[target]" >[html]</a>';
                BtnHtml=btnTemp.replace("[html]", entry.html);
                BtnHtml=BtnHtml.replace("[css]", entry.css);
                BtnHtml=BtnHtml.replace("[url]", entry.url);
                BtnHtml=BtnHtml.replace("[target]", entry.target);
                BtnHtmlL+=BtnHtml;
            });
            html=temp.replace("[html]",BtnHtmlL);
            return html;
        },
        btnBind:function($parent,obj){
            var $obj=$parent.find(".btn");
            if(obj.btnL.length<=0){
                return false;
            }
            $.each(obj.btnL, function (i, entry) {
                if(entry.action){
                    $obj.eq(i).click(function(){
                        entry.action();
                    })
                }
            });
        },
        bind:function(parent,id){
            var $parent=parent;
            $parent.find(".J_close").click(function () {
                $.dialog.list[id].close();
            });
            $parent.find(".confirm").click(function () {
                $.dialog.list[id].close();
            });
            $parent.find(".reload").click(function () {
                window.location.reload();
            });
        }
    };
    hallpop.popClose=function(){
        if( $.dialog.list['popM0']){
            $.dialog.list['popM0'].close();
        }
    };
    module.exports = hallpop;
});
