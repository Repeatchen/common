<template>
    <div>
        测试
    </div>
</template>

<script>
import Tool from './index' 
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
            //   let a = Tool.timeDiffByDay('0','6000');
            //   let b = Tool.convertStrToStr('1574825065992','mm:ss');
            //   let d = Tool.timestampDate('1970年01月01日 08:00:01');
            //   console.log(a)
            //   console.log(b)
            //   console.log(d)
            //   let v = Tool.bitSplit3s(12.323);
            //   console.log(v)
            let state =  {
                '0':'其他',
                '1': '市场活动',
                '2': '微信平台',
                '3': '邀请活动',
                90: '人才招聘',
                '5': '媒体渠道',
                '6': '汽车生态',
                '7': '市场活动投放',
                '8': '成都司机招募活动',
                '9': '保定kol',
            }
            let operationTypeList = [
                { label: '退车离职', value: 2 },
                { label: '退车待绑定', value: 3 },
                { label: '在线', value: 4 },
                { label: '离线', value: 5 },
            ]
            let a = ['', '正常','禁用','面试未通过','考核未通过','待面试']




            let n = Tool.typeState2Text([],23);
            console.log(n)


        }
    }
   
}
</script>