/**
 * 公共文件
 * @module
 */
define(function (require) {
    return {
        /**
         * 公用ajax地址
         */
        url: {
            list: '/FreeCloth/List',
            getClothes: '/FreeCloth/RequestCloth',
            IsMember: '/FreeCloth/IsMember'
        },
        /**
         * vip状态
         */
        tchallvip: {isLogin: false},
        /**
         * 错误提示字典
         * */
        errorTypeString: {
            '-1': '请先登录',
            '-2': '系统错误',
            '-3': '活动未开始',
            '-4': '活动未结束',
            '-5': '正在处理中',
            '-6': '当月已领取',
            '-7': '你还不是会员',
            '-8': '等级不符',
            '-9': '您当前等级已经不能再领取',
            '-100': '超时'
        }
    };
});