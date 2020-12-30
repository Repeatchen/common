import dateConver from './script/date';
import bigNumber from './script/bignumber.min.js';


const filter = {
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
        if(Tool.isObject(val) || Tool.isArray(val)){
            val = Object.keys(val);// 把对象key转换数组，并判断当前是不是为空。
            return !val.length > 0;
        }else{
            return (val == "" || val == undefined || val== null || (val.length > 0 && val.trim().length == 0));
        }
    },

    /*
     * @method: 单位换算--米换算公里
     * @param: num:需要换算的公里数
     * @return: 数据为空默认返回0，数据为string，number则走换算。
     * @ps: 
     * @Date: 2019-11-27 16:10:42
    */
     mTokm: function(num) {
        if ((Tool.isString(num) || Tool.isNumber(num))) {
            return Number(num) / 1000;
        } else {
            console.warn('mTokm 米转换公里数据为  ', num);
            return 0;
        }
    },

    /*
     * @method: 单位换算--公里换算米
     * @param: num:需要换算的公里数
     * @return: 数据为空默认返回0，数据为string，number则走换算。
     * @ps: 
     * @Date: 2019-12-10 13:55:20
    */
    kmTom: function(num) {
        if (Tool.isString(num) || Tool.isNumber(num)) {
            return Number(num) * 1000;
        } else {
            console.warn('kmTom 公里转换米数据为  ', num);
            return 0;
        }
    },

    /*
     * @method: 时间转换--日期转换集合
     * @param: strDate：日期字符串（必须包含年月日）
               formatType：日期格式（1：yyyyMMdd；2：yyyyMMddHHmmss；3：yyyy-MM-dd；
               4：yyyy-MM-dd HH:mm:ss；5：yyyy年MM月dd日；6：yyyy年MM月dd日 HH:mm:ss；7：M月d日；8:'HH:mm:ss',
               9:'HH:mm',）
     * @return: 默认返回 yyyy-MM-dd HH:mm:ss类型
     * @ps: 主要文件在./script/date.js
     * @Date: 2019-12-10 13:56:39
    */
   dateFormat(strDate, formatType = 'yyyy-MM-dd HH:mm:ss') {
        if(strDate){
            var strRet = null;
            var thisDate = dateConver.ConvertStrToDate(strDate);
            if (thisDate != null) {
            strRet = dateConver.ConvertDateToStr(thisDate, formatType);
            }
            return strRet;
        }else{
            console.warn('dateFormat 参数为  '+strDate);
            return ''
        }
        
    },

    /*
     * @method: 时间转换--日期类型转换为时间戳
     * @param: timestamp为时间戳
     * @return: 默认返回''
     * @ps: 
     * @Date: 2019-12-10 13:56:30
    */
    timestampDate(timestamp) {
        if(!timestamp){
            console.warn('timestampDate 参数为  '+timestamps);
            return '';
        }
        return dateConver.TimestampToDate(timestamp);
    },

    /*
     * @method: 类型转换
     * @param: val：为整体对象，state：状态值
     * @return: 返回参数为数据状态下的值
     * @ps: 对象：{1:'专车'}，对象数组:[{ label: '退车离职', value: 2 },],数组:['正常','禁用']
     * @Date: 2019-11-27 15:56:14
    */
   typeState2Text: function(val,state) {
       if(!Tool.isEmpty(val) && !state){
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
     * @method: 单位换算--分转元
     * @param: num为string，number类型
     * @return: number类型
     * @ps: 参数不满足String，Number类型则返回0
     * @Date: 2019-11-27 16:45:16
    */
   fen2Yuan(num) {
        if (!(Tool.isString(num) || Tool.isNumber(num))) {
            console.warn('fen2Yuan 请传入数字或字符串类型数字数据,当前数据为', num);
            return 0;
        }
        let tempNum = Number(num);
        tempNum = new BigNumber(tempNum); 
        return tempNum.div(100).toNumber();
    },

    /*
     * @method: 单位换算--元转分
     * @param: num为string，number类型
     * @return: number类型
     * @ps: 参数不满足String，Number类型则返回0
     * @Date: 2019-12-10 14:32:41
    */
    yuan2Fen(num) {
        if (!(Tool.isString(num) || Tool.isNumber(num)) ) {
            console.warn('yuan2Fen 请传入数字或字符串类型数字数据,当前数据为', num);
            return 0;
        }
        let tempNum = Number(num);
        tempNum = new BigNumber(tempNum); 
        return tempNum.multipliedBy(100).toNumber();
    },

    /*
     * @method: 单位换算--分转秒
     * @param: num为string，number类型
     * @return: number类型，截取小数后两位
     * @ps: 参数不满足String，Number类型则返回0
     * @Date: 2019-12-10 16:02:56
    */
    min2second(num) {
        if (!(Tool.isString(num) || Tool.isNumber(num))) {
            console.warn('min2second    请传入数字或字符串类型数字数据,当前数据为', num);
            return 0;
        }
        let tempNum = Number(num);
        tempNum = new BigNumber(tempNum);
        let resNum = Tool.isDecimals(tempNum.multipliedBy(60)) ? tempNum.multipliedBy(60).toFixed(2) : tempNum.multipliedBy(60).toFixed(0);

        return Number(resNum);
    },

    /*
     * @method: 单位换算--秒转分
     * @param: num为string，number类型
     * @return: number类型
     * @ps: 参数不满足String，Number类型则返回0
     * @Date: 2019-12-10 16:09:13
    */
    second2min(num) {
        if (!(Tool.isString(num) || Tool.isNumber(num))) {
            console.warn('second2min    请传入数字或字符串类型数字数据,当前数据为', num);
            return 0;
        }
        let tempNum = Number(num);
        tempNum = new BigNumber(tempNum); 
        let resNum = Tool.isDecimals(tempNum.div(60)) ? tempNum.div(60).toFixed(2) : tempNum.div(60).toFixed(0);
        return Number(resNum);
    }, 
    
    /*
     * @method: 单位换算--分转时
     * @param: num为string，number类型
     * @return: number类型
     * @ps: 参数不满足String，Number类型则返回0
     * @Date: 2019-12-10 16:09:13
    */
    min2hour(num) {
        if (!(Tool.isString(num) || Tool.isNumber(num))) {
            console.warn('min2hour    请传入数字或字符串类型数字数据,当前数据为', num);
            return 0;
        }
        let tempNum = Number(num);
        tempNum = new BigNumber(tempNum);
        let resNum = Tool.isDecimals(tempNum.div(60)) ? tempNum.div(60).toFixed(2) : tempNum.div(60).toFixed(0);
        return Number(resNum);
    },
    /*
     * @method: 判断num是小数||正整数
     * @param: num
     * @return: 返回Boolean类型
     * @ps: 参数不满足String，Number类型则返回false，目前只用于时分秒的时间转换，如单独使用也是可以。
     * @Date: 2019-12-10 16:52:56
    */
    isDecimals(num){
        num = Number(num);
        if (!(Tool.isString(num) || Tool.isNumber(num))) {
            console.warn('isDecimals   请传入数字或字符串类型数字数据,当前数据为', num);
            return false;
        }
        num = num.toString();
        return num.indexOf('.') > -1;

    },

}
export default filter
