import dateConver from './script/date';
import bigNumber from './script/bignumber.min.js';


const Tool = {
    /*
     * @method: 数组--并集
     * @param: {Array} arr1 arr2
     * @ps: 只支持一维数组
     * @Date: 2019-12-19 17:22:51
    */
    arrAndSet: function(arr1, arr2) {
        return arr1.concat(arr2.filter(v => !arr1.includes(v)));
    },
    /*
     * @method: 数组--交集
     * @param: {Array} arr1 arr2
     * @ps: 只支持一维数组
     * @Date: 2019-12-19 17:45:13
    */
    arrIntersection: function(arr1, arr2) {
        return arr1.filter(v => arr2.includes(v));
    },
    /*
     * @method: 数组--去重
     * @param: {Array} arr 
     * @Date: 2019-12-20 10:41:08
    */
    arrRemoveRepeat: function (arr) {
        return Array.from(new Set(arr));
    },
    /*
     * @method: 数组--排序
     * @param: {Array} arr 
     * @Date: 2019-12-20 15:34:14
    */
    arrOrderAscend: function (arr, ascendFlag=true) {
        return arr.sort((a, b) => {
            return ascendFlag ? a - b : b - a
        })
    },
    /*
     * @method: 数组--去重并且排序
     * @param: {Array} arr 
     * @Date: 2019-12-20 15:38:23
    */
   repeatAndAscend: function (arr, ascendFlag=true){
        return Tool.arrOrderAscend(Tool.arrRemoveRepeat(arr),ascendFlag);
   },

   /*
    * @method: 存储--localStorage存储
    * @param: {String} kay属性 {*} value值
    * @Date: 2019-12-20 18:02:17
   */
    setLocalStorage:function (key, value){
        if (typeof (value) === 'object') value = JSON.stringify(value);
        localStorage.setItem(key, value);
    },
    /*
     * @method: 存储--获取localStorage
     * @param: {String} key属性
     * @Date: 2019-12-20 18:12:19
    */
    localStorageGet:function (key){
        return localStorage.getItem(key);
    },
    /*
     * @method: 存储--移除localStorage
     * @param: {String} key属性
     * @Date: 2019-12-20 18:13:26
    */
    localStorageRemove: function (key){
        localStorage.removeItem(key);
    },
    /*
     * @method: 存储--sessionStorage存储
     * @param: {String} key 属性 {*} value
     * @Date: 2019-12-20 18:33:01
    */
    sessionStorageSet:function (key, value) {
        if (typeof (value) === 'object') value = JSON.stringify(value)
        sessionStorage.setItem(key, value)
    },
    /*
     * @method: 存储--sessionStorage获取
     * @param: {String} key 属性 {*} value
     * @Date: 2019-12-23 14:28:26
    */
    sessionStorageGet: function(key) {
        return sessionStorage.getItem(key)
    },
    /*
     * @method: 存储--cookie存储
     * @param: {string} key {*} value 值 {string} expire 过期时间（天）
     * @Date: 2019-12-23 14:35:53
    */

    cookieSet: function (key, value, expire){
        const d = new Date()
        d.setDate(d.getDate() + expire)
        document.cookie = `${key}=${value};expires=${d.toGMTString()}`
    },
    /*
     * @method: 存储--cookie获取
     * @param: {string} key
     * @Date: 2019-12-23 15:11:23
    */
    cookieGet: function (key) {
        const cookieStr = unescape(document.cookie)
        const arr = cookieStr.split('; ')
        let cookieValue = ''
        for (var i = 0; i < arr.length; i++) {
            const temp = arr[i].split('=')
            if (temp[0] === key) {
                cookieValue = temp[1]
                break
            }
        }
        return cookieValue
    },
    /*
     * @method: 存储--cookie删除
     * @param: {string} key
     * @Date: 2019-12-23 15:13:24
    */
    cookieRemove:function(key) {
        document.cookie = `${encodeURIComponent(key)}=;expires=${new Date()}`
    },

    /*
     * @method: 字符串--去除左右空格
     * @param: {String} key
     * @ps: 去除左右其中一方可以用trimStart/trimEnd单独操作。
     * @Date: 2019-12-23 15:52:26
    */
    trimSpace:function(key){
        return key.trimStart().trimEnd();
    },

    /*
     * @method: 数值--3位分隔，两位小数
     * @param: {Number} key  
     * @Date: 2019-12-20 17:21:59
    */
    bitSplit3:function(key){
        return key.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');

    },

    /*
     * @method: 数值--数字前面特殊符号
     * @param: {}
     * @Date: 2019-12-23 18:47:04
    */
    //TODO 需要在考虑一次啊～
    symbolAdd:function(key,symbol){
        key = Number(key);
        if(key>0){
            return '+'+key
        }
        let keyString = key+'';
        if(key<0 && keyString.indexOf('-') > -1){
            return key;
        }
        return '0.00';
    },

    /*
     * @method: 数值--个位数添0
     * @param: {String,Number} key 
     * @ps: 如果传入bu zheng
     * @Date: 2019-12-24 18:04:15
    */
    //TODO 多测试
    fillUpZero:function(key){
        let numStr = key + '';

        if (numStr != 'null' && numStr != 'undefined' && numStr.length == 1) {
            numStr = "0" + numStr;
        }
        return key ? numStr : '';
    },

    /*
     * @method: 时间--时间差/天
     * @param: {}
     * @return: {}
     * @ps: 
     * @Date: 2019-12-24 18:29:09
    */
    timeDiffDay(beginDateStr, endDateStr) {
        let day =  dateConver.EquationDate(beginDateStr, endDateStr,1);
        return day;
    },

    /*
     * @method: 时间--时间差/时
     * @param: {}
     * @return: {}
     * @ps: 
     * @Date: 2019-12-24 19:13:59
    */
    timeDiffHours(beginDateStr, endDateStr) {
        let hours =  dateConver.EquationDate(beginDateStr, endDateStr,2);
        return hours;
    },

    /*
     * @method: 时间--时间差/分
     * @param: {}
     * @return: {}
     * @ps: 
     * @Date: 2019-12-24 19:14:21
    */
    timeDiffMinutes(beginDateStr, endDateStr) {
        let minutes =  dateConver.EquationDate(beginDateStr, endDateStr,3);
        return minutes;
    },

    /*
     * @method: 时间--时间差/秒
     * @param: {}
     * @return: {}
     * @ps: 
     * @Date: 2019-12-24 19:14:42
    */
    timeDiffSeconds(beginDateStr, endDateStr) {
        let seconds =  dateConver.EquationDate(beginDateStr, endDateStr,4);
        return seconds;
    },
    /*
     * @method: 登录--判断是否登录
     * @param: {}
     * @return: {}
     * @ps: 
     * @Date: 2019-12-30 14:57:15
    */
    isLogin: function() {
        if (storage.get('token') && storage.get('user')) {
            return true;
        } else {
            return false;
        }
    },
    /*
     * @method: 登录--推出登录
     * @param: {}
     * @return: {}
     * @ps: 
     * @Date: 2019-12-30 15:17:55
    */
    logOut: function(isRedirect = true) {
        storage.set('token', "");
        storage.set('user', "");
        storage.set('menuList', "");
        storage.set('leftNav', "");
        setTimeout(() => {
            if (isRedirect) {
                let redirect = window.location.href;
                window.location.href = '/#/login?redirect=' + encodeURIComponent(redirect);
            } else {
                window.location.href = '/#/login';
            }
        }, 1000)
    },
    /*
     * @method: 新窗口
     * @param: {}
     * @return: {}
     * @ps: 
     * @Date: 2019-12-30 15:23:04
    */
   findUrlByRouterParmas: function(parmas = { name: '' }) {
        if (Object.prototype.toString.call(parmas.name) !== '[object String]') {
            console.warn('router.name入参错误,请传入string类型,当前值为:    ', parmas.name);
            return false;
        }
        if (tool.trimSpace(parmas.name) == '') {
            console.warn('跳转name传值不能为空字符串');
            return false;
        }
        let routeData = this.$router.resolve(parmas);
        return routeData;
    },

    windowOpenByRouterParmas: function(parmas = { name: '' }) {
        let routeData = tools.findUrlByRouterParmas.call(this, parmas);
        if (routeData && routeData.href) {
            window.open(routeData.href, '_blank');
        } else {
            console.warn('router没有对应的href，当前值为:         ', routeData);
        }
    },

    /*
     * @method: 
     * @param: {}
     * @return: {}
     * @ps: 
     * @Date: 2019-12-30 15:36:48
    */



}
export default Tool
