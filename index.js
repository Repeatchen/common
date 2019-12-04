import dateConver from './script/date';
import bigNumber from './script/bignumber.min.js';

String.prototype.Trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};
String.prototype.LTrim = function() {
    return this.replace(/(^\s*)/g, "");
};
String.prototype.RTrim = function() {
    return this.replace(/(\s*$)/g, "");
};


const Tool = {
    // 判断类型
    isNumber(value) {
        return Object.prototype.toString.call(value) == "[object Number]";
    },

    isString(value) {
        return Object.prototype.toString.call(value) == "[object String]";
    },

    isObject(value) {
        return Object.prototype.toString.call(value) == "[object Object]";
    },

    isFunction (value) {
        return Object.prototype.toString.call(value) == "[object Function]";
    }, 

    isArray(value) {
        return Object.prototype.toString.call(value) == "[object Array]";
    }, 

    isBoolean(value) {
        return Object.prototype.toString.call(value) == "[object Boolean]";
    },

    // 是否为 undefined
    isUndefined(val){
        return (val == undefined || val === undefined || val.toString() == 'undefined' || typeof(val) == 'undefined' || val == null);
    },
    // 是否为空
    isEmpty(val){
        if(Tool.isObject(val)|| Tool.isArray(val)){
            val = Object.keys(val);// 把对象key转换数组，并判断当前是不是为空。
            return !val.length > 0;
        }else{
            return (val == "" || val == undefined || val== null || (val.length > 0 && val.trim().length == 0));
        }
        
    },
    
    // 去除两边空格
    frontAndEndTrim(val) {
        if (val && Tool.isString(val)) {
            return val.Trim();
        } else {
            console.warn('去除两边空格数据为   ', val);
        }
    },
    // 去除左边空格
    leftTrim(val) {
        if (val && Tool.isString(val)) {
            return val.LTrim();
        } else {
            console.warn('去除左边空格数据为  ', val);
        }
    },
    // 去除右边空格
    rightTrim(val) {
        if (val && Tool.isString(val)) {
            return val.RTrim();
        } else {
            console.warn('去除右边空格数据为  ', val);
        }
    },
    /*
     * @method: 单位换算--公里
     * @param: num:需要换算的公里数
     * @return: 
     * @ps: 
     * @Date: 2019-11-27 16:10:42
    */
     // 米换公里
     mTokm: function(num) {
        if ((Tool.isString(num) || Tool.isNumber(num)) && !isNaN(parseFloat(num))) {
            return parseFloat(num) / 1000;
        } else {
            console.warn('米转换公里数据为  ', num);
            return 0;
        }

    },
    // 公里换米
    kmTom: function(num) {
        if ((Tool.isString(num) || Tool.isNumber(num)) && !isNaN(parseFloat(num))) {
            return parseFloat(num) * 1000;
        } else {
            console.error('公里转换米数据为  ', num);
            return 0;
        }
    },
    /****************************************************************************
     -- 将字符类型转字符类型
     -- 参数：strDate：日期字符串（必须包含年月日）
     -- formatType：日期格式（1：yyyyMMdd；2：yyyyMMddHHmmss；3：yyyy-MM-dd；
        4：yyyy-MM-dd HH:mm:ss；5：yyyy年MM月dd日；6：yyyy年MM月dd日 HH:mm:ss；7：M月d日）
    ****************************************************************************/
   convertStrToStr(strDate, formatType = 'yyyy-MM-dd HH:mm:ss') {
        var strRet = null;
        var thisDate = dateConver.ConvertStrToDate(strDate);
        if (thisDate != null) {
            strRet = dateConver.ConvertDateToStr(thisDate, formatType);
        }
        return strRet;
    },
    // 时间差（天数）
    timeDiffByDay(beginDateStr, endDateStr) {
        let day =  dateConver.EquationDate(beginDateStr, endDateStr);
        return day;
    },
    // 日期类型转换为时间戳
    timestampDate(timestamp) {
        return dateConver.TimestampToDate(timestamp);
    },
    // 小数点保留后2位  解决负数问题
    bitSplit3s: function(num) {
        return new BigNumber(num).toFormat(2);
    },

    // 加￥符号  
    bitSplit3Fen2YuanAddRMB: function(num) {
        return '￥' + filter.bitSplit3Fen2Yuan(num);
    },



    //判断当前字符串的长度
    // function getStringLength(str){
    //     var realLength = 0,
    //         len = str.length,
    //         charCode = -1;
    //     for (var i = 0; i < len; i++) {
    //         charCode = str.charCodeAt(i);
    //         if (charCode >= 0 && charCode <= 128)
    //             realLength += 1;
    //         else
    //             realLength += 2;
    //     }
    //     return realLength;
    // }

    /*
     * @method: 类型转换
     * @param: val：为整体对象，state：状态值
     * @return: 返回参数为数据状态下的值
     * @ps: 对象：{1:'专车'}，对象数组:[{ label: '退车离职', value: 2 },],数组:['正常','禁用']
     * @Date: 2019-11-27 15:56:14
    */
   typeState2Text: function(val,state) {
       if(!Tool.isEmpty(val)){
            function findCherries(fruit){
                return fruit.value == state;
            }
            if(Tool.isObject(val)){
                return val[state];
            }
            if(Tool.isArray(val)){
                if(Tool.isObject(val[0])){
                    return val.find(findCherries).label;
                }
                if(Tool.isString(val[0]) || Tool.isNumber(val[0])){
                    return val[state];
                }
            }
       }
        return '--'
    },

    /*
     * @method: 
     * @param: {}
     * @return: {}
     * @ps: 
     * @Date: 2019-11-27 16:45:16
    */




}
export default Tool
