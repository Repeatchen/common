<template>
    <div>
        测试
    </div>
</template>

<script>
import filter from './index' 
import tool from './tools' 
export default {
    data(){
        return{

        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){
            // console.log(tool.timeDiffHours('',''))

            // var largeGroupPositions = function(str) {
                
            //     let arr = str.split('');
            //     let contArr = [];
            //     let cont = 0,start = 0;
            //     for(let i = 0;i < arr.length;i++){
            //         if(arr[i] == arr[i-1]){
            //             cont++;
            //         }else{
            //             cont = 0;
            //             start = i;
            //         }
            //         if(cont >= 2 && arr[i] != arr[i+1]){
            //             contArr.push([start,i]);
            //             console.log(contArr)

            //         }
            //     }
            //    return contArr
            // };

             // -1, not found
            // const arr1 = [ 4, 5, 6, 1, 1, 1, 7, 8, 10, 10, 11]
            // var ret3 = arr1.findIndex((value, index, arr) => {
            //     return value == arr[index+1]
            // })
            // debugger
            // var ret4 = arr1.lastIndexOf((value, index, arr) => {
                
            //     return value == arr[index-1]
            // })
            // console.log('%s', ret4)
            // console.log('%s', ret3)
            
            // largeGroupPositions("abbxxxxzzzy");
            // console.log(addTwoNumbers([2,4,3],[5,6,4]))
            //   let a = Tool.timeDiffByDay('0','6000');
            //   let b = Tool.convertStrToStr('1574825065992','mm:ss');
            //   let d = Tool.timestampDate('1970年01月01日 08:00:01');
            //   console.log(a)
            //   console.log(b)
            //   console.log(d)
            //   let v = Tool.bitSplit3s(12.323);
            //   console.log(v)
            // let state =  {
            //     '0':'其他',
            //     '1': '市场活动',
            //     '2': '微信平台',
            //     '3': '邀请活动',
            //     90: '人才招聘',
            //     '5': '媒体渠道',
            //     '6': '汽车生态',
            //     '7': '市场活动投放',
            //     '8': '成都司机招募活动',
            //     '9': '保定kol',
            // }
            // let operationTypeList = [
            //     { label: '退车离职', value: 2 },
            //     { label: '退车待绑定', value: 3 },
            //     { label: '在线', value: 4 },
            //     { label: '离线', value: 5 },
            // ]
            // let a = ['', '正常','禁用','面试未通过','考核未通过','待面试'];

            // // let lp = this.Fliter;
            // console.log(this.$fliter.isDecimals({'a':1}))
            // // let n = Tool.typeState2Text([],23);
            // // let n = Tool.min2second(120);
            // // let m = Tool.second2min(4354);
            // let l = Tool.isDecimals({'a':1});
            // // console.log(n)
            // // console.log(m)
            // console.log(l)
            /*
             * 首先把邮箱校验，转成小写，
             
            */
            var maskPII = function(str) {
            
                if(str.length>=8 && str.length<=40){
                    //邮箱
                    let email = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-zA-Z]{2,6}){1,3}$/;
                    let iphone  =  /^[1]([3-9])[0-9]{9}$/;
                    let isEmail = email.test(str);
                    let isIphone = iphone.test(str);
                    if(isEmail){
                        str = str.toLowerCase();
                        let emailArr = str.split('@');
                        let emailList = emailArr[0].split('');
                        let emailPII = `${emailList[0]}*****${emailList[emailList.length-1]}`
                        return `${emailPII}@${emailArr[1]}`
                        // console.log(`${emailPII}@${emailArr[1]}`)
                    }else{
                        str = str.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,'');
                        
                        if(str.length == 10){
                            return `***-***-${str.substr(str.length-4,str.length-1)}`;
                        }
                        if(str.length == 11){
                            return `+*-***-***-${str.substr(str.length-4,str.length-1)}`;
                        }
                        if(str.length == 12){
                        return `+**-***-***-${str.substr(str.length-4,str.length-1)}`;
                        }
                        if(str.length == 13){
                        return `+***-***-***-${str.substr(str.length-4,str.length-1)}`;
                        }
                    }
                    
                }
            };
            console.log(maskPII("aa@bb.ca"));
            console.log(tool.trimSpace(''))
            // var pattern = / ((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d)|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d))$)/,
            // str = '1(234)567-890';
            // console.log(pattern.test(str));


        }
    }
   
}
</script>