const DateConver = {
    /****************************************************************************
     -- 将字符类型转日期类型
     -- 参数：strDate：日期字符串
     -- 知识点：RegExp是js内置对象，$1是RegExp的一个属性，指正则表达式匹配的第一个字符串（以括号为标志）总共可以有99个匹配
    ****************************************************************************/
    ConvertStrToDate(strDate) {
        var dateRet = null;
        if (strDate != null && strDate != "") {
            //日期格式为：yyyyMMdd
            var regA = /^(\d{4})(\d{2})(\d{2})$/;
            if (regA.test(strDate)) {
                var strArray = regA.exec(strDate);
                dateRet = new Date(RegExp.$1, Number(RegExp.$2) - 1, RegExp.$3);
                return dateRet;
            }

            //日期格式为：yyyyMMddHHmmss
            var regB = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/;
            if (regB.test(strDate)) {
                var strArray = regB.exec(strDate);
                dateRet = new Date(RegExp.$1, Number(RegExp.$2) - 1, RegExp.$3, RegExp.$4, RegExp.$5, RegExp.$6);
                return dateRet;
            }

            //日期格式为：yyyy-MM-dd
            var regC = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
            if (regC.test(strDate)) {
                var strArray = regC.exec(strDate);
                dateRet = new Date(RegExp.$1, Number(RegExp.$2) - 1, RegExp.$3);
                return dateRet;
            }

            //日期格式为：yyyy-MM-dd HH:mm:ss
            var regD = /^(\d{4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
            if (regD.test(strDate)) {
                var strArray = regD.exec(strDate);
                dateRet = new Date(RegExp.$1, Number(RegExp.$2) - 1, RegExp.$3, RegExp.$4, RegExp.$5, RegExp.$6);
                return dateRet;
            }

            //日期格式为：yyyy年MM月dd日
            var regE = /^(\d{4})年(\d{1,2})月(\d{1,2})日$/;
            if (regE.test(strDate)) {
                var strArray = regE.exec(strDate);
                dateRet = new Date(RegExp.$1, Number(RegExp.$2) - 1, RegExp.$3);
                return dateRet;
            }

            //日期格式为：yyyy年MM月dd日 HH:mm:ss
            var regF = /^(\d{4})年(\d{1,2})月(\d{1,2})日 (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
            if (regF.test(strDate)) {
                var strArray = regF.exec(strDate);
                dateRet = new Date(RegExp.$1, Number(RegExp.$2) - 1, RegExp.$3, RegExp.$4, RegExp.$5, RegExp.$6);
                return dateRet;
            }
            //时间戳格式为1位到13位，0为1970年1月1日08:00:00
            var regG = /^\d{1,13}$/;
            if(regG.test(strDate)){
                dateRet = new Date(Number(strDate));
                return dateRet;
            }
        }
        console.warn('dateFormat  当前不支持当前时间类型  '+strDate)
        return dateRet;
    },
    // 日期格式类型转换
    getCovertType(formatType){
        var stateList = {
            '1':'yyyyMMdd',
            '2':'yyyyMMddHHmmss',
            '3':'yyyy-MM-dd',
            '4':'yyyy-MM-dd HH:mm:ss',
            '5':'yyyy年MM月dd日',
            '6':'yyyy年MM月dd日 HH:mm:ss',
            '7':'M月d日',
            '8':'HH:mm:ss',
            '9':'HH:mm',
        };
        
        if(formatType.toString().length > 1){
            var state = 4;
            for(let item in stateList){
                if(stateList[item] == formatType){
                    state = item;
                }
            }
            return state;
        }
        return formatType;
        
    },
    /****************************************************************************
     -- 将日期类型转字符类型
     -- 参数：dateTime：日期类型
     -- formatType：日期格式（1：yyyyMMdd；2：yyyyMMddHHmmss；3：yyyy-MM-dd；
        4：yyyy-MM-dd HH:mm:ss；5：yyyy年MM月dd日；6：yyyy年MM月dd日 HH:mm:ss；
        7：M月d日；8：HH:mm:ss；9：mm:ss）
    ****************************************************************************/
    ConvertDateToStr(dateTime, formatType) {
        var dateRet = '';

        if (!dateTime) {
            console.warn('当前日期为： '+ dateTime);
            return null;
        }

        dateTime = new Date(dateTime);
        formatType = DateConver.getCovertType(formatType)

        var Year = dateTime.getFullYear().toString();
        var tMonth = String(dateTime.getMonth() + 1);
        var Month =  DateConver.fillUpZero(tMonth);
        var tDates = dateTime.getDate().toString();
        var Dates =  DateConver.fillUpZero(dateTime.getDate().toString());
        var Hours =  DateConver.fillUpZero(dateTime.getHours().toString());
        var Minutes =  DateConver.fillUpZero(dateTime.getMinutes().toString());
        var Seconds =  DateConver.fillUpZero(dateTime.getSeconds().toString());

        switch (formatType*1) {
            case 1:
                dateRet = Year + Month + Dates;
                break;
            case 2:
                dateRet = Year + Month + Dates + Hours + Minutes + Seconds;
                break;
            case 3:
                dateRet = Year + "-" + Month + "-" + Dates;
                break;
            case 4:
                dateRet = Year + "-" + Month + "-" + Dates + " " + Hours + ":" + Minutes + ":" + Seconds;
                break;
            case 5:
                dateRet = Year + "年" + Month + "月" + Dates + "日";
                break;
            case 6:
                dateRet = Year + "年" + Month + "月" + Dates + "日 " + Hours + ":" + Minutes + ":" + Seconds;
                break;
            case 7:
                dateRet = tMonth + "月" + tDates + "日";
                break;
            case 8:
                dateRet = Hours + ":" + Minutes+ ":" + Seconds;
                break;
            case 9:
                dateRet = Hours + ":" + Minutes;
                break;
            default:
                console.warn('当前日期格式暂时不支持~')
                break;
        }
        return dateRet;
    },

    /****************************************************************************
     -- 个位数补两位数 ps：当前月份为2月，
    ****************************************************************************/
   fillUpZero(numStr) {
        if (numStr != null && numStr.length == 1) {
            numStr = "0" + numStr;
        }
        return numStr;
    },

    /****************************************************************************
     -- 获取日期是周几
     -- 参数：strDate：日期字符串     
    ****************************************************************************/
    ConvertDay(dateStr) {
        var dayRet = null;
        var show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
        var thisDate =  DateConver.ConvertStrToDate(dateStr);
        if (thisDate != null) {
            var day = thisDate.getDay();
            dayRet = show_day[day];
        }
        return dayRet;
    },


    /****************************************************************************
     -- 计算时差（天数）
     -- 参数：beginDateStr：开始日期字符串
     --       endDateStr：结束日期字符串
    ****************************************************************************/
    EquationDate(beginDateStr, endDateStr) {
        if (!beginDateStr && !endDateStr) {
            console.warn('参数为： '+'开始时间'+beginDateStr+'  结束时间'+endDateStr);
            return null;
        }
        var numRet = null;
        var beginDate =  DateConver.ConvertStrToDate(beginDateStr);
        var endDate =  DateConver.ConvertStrToDate(endDateStr);
        if (beginDate != null && endDate != null) {
            //将时分秒毫秒设置为0
            beginDate.setHours(0);
            beginDate.setMinutes(0);
            beginDate.setSeconds(0);
            beginDate.setMilliseconds(0);
            endDate.setHours(0);
            endDate.setMinutes(0);
            endDate.setSeconds(0);
            endDate.setMilliseconds(0);

            var milliseconds = endDate.getTime() - beginDate.getTime(); //时间差的毫秒数
            numRet = Math.floor(milliseconds / (24 * 3600 * 1000)); //计算出相差天数
        }
        return numRet;
    },

    /****************************************************************************
     -- 时间转换为时间戳
     -- 参数：timestamp：时间戳
    ****************************************************************************/
   TimestampToDate(time){
        if(!time){
            console.warn('参数为  '+time);
            return '';
        }
        var timestampDate =  DateConver.ConvertStrToDate(time);
        return timestampDate.getTime();
   }
    
}

export default DateConver;