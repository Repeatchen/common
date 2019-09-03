const tools = {
 // 去除两边空格
 Trim: function(val) {
    if (val && Object.prototype.toString.call(val) === '[object String]') {
        return val.Trim();
    } else {
        console.error('tools.js   Trim   请传入字符串类型数据,当前数据为', val);
    }
},
// 去除左边空格
LTrim: function(val) {
    if (val && Object.prototype.toString.call(val) === '[object String]') {
        return val.LTrim();
    } else {
        console.error('tools.js   LTrim   请传入字符串类型数据,当前数据为', val);
    }
},
// 去除右边空格
RTrim: function(val) {
    if (val && Object.prototype.toString.call(val) === '[object String]') {
        return val.RTrim();
    } else {
        console.error('tools.js   RTrim   请传入字符串类型数据,当前数据为', val);
    }
},
}


export default tools;