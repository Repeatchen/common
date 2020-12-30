### 教程
 首先安装yrm管理工具，可以查看当前镜像源。
 切换到 https://nexus.olafuwu.com/repository/npm-public/镜像源。
 npm install ola-fliter
 
 ```js
    //在main.js中
    import Fliter from 'ola-fliter';
    Vue.prototype.$fliter = window.$fliter = Fliter;//不挂载window也可以。
 ```
 ```js
    //应用
    this.$fliter.方法名();
 ```
 ### 方法列表
    ```js
      /*
      * @method: 单位换算--米换算公里
      * @param: num:需要换算的公里数
      * @return: 数据为空默认返回0，数据为string，number则走换算。
      */
      let km = this.$fliter.mTokm(89);
      /*
      * @method: 单位换算--公里换算米
      * @param: num:需要换算的公里数
      * @return: 数据为空默认返回0，数据为string，number则走换算。
      */
      let m = this.$fliter.kmTom(89);
      /*
      * @method: 时间转换--日期转换集合
      * @param: strDate：日期字符串（必须包含年月日）
               formatType：日期格式（1：yyyyMMdd；2：yyyyMMddHHmmss；3：yyyy-MM-dd；
               4：yyyy-MM-dd HH:mm:ss；5：yyyy年MM月dd日；6：yyyy年MM月dd日 HH:mm:ss；7：M月d日；8:'HH:mm:ss',
               9:'HH:mm',）
      * @return: 默认返回 yyyy-MM-dd HH:mm:ss类型
      */
      let date = this.$fliter.dateFormat(item,yyyy年MM月dd日);
      let date = this.$fliter.dateFormat(item,5);

      /*
      * @method: 时间转换--日期类型转换为时间戳
      * @param: timestamp为时间戳
      * @return: 默认返回''
      */
      let timestamp = this.$fliter.timestampDate(20180909);
      let timestamp = this.$fliter.timestampDate(2019-8-1);

      /*
      * @method: 类型转换
      * @param: val：为整体对象，state：状态值
      * @return: 返回参数为数据状态下的值
      * @ps: 对象：{1:'专车'}，对象数组:[{ label: '退车离职', value: 2 },],数组:['正常','禁用'],
      *       可以在这基础上封装业务方法。
      */
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
      let state = this.$fliter.typeState2Text(state,90);

      /*
      * @method: 单位换算--分转元
      * @param: num为string，number类型
      * @return: number类型
      * @ps: 参数不满足String，Number类型,则返回0
      */
      let yuan = this.$fliter.fen2Yuan(10);

      /*
      * @method: 单位换算--元转分
      * @param: num为string，number类型
      * @return: number类型
      * @ps: 参数不满足String，Number类型,则返回0
      */
      let fen = this.$fliter.yuan2Fen(10);

      /*
      * @method: 单位换算--分转秒
      * @param: num为string，number类型
      * @return: number类型，截取小数后两位
      * @ps: 参数不满足String，Number类型,则返回0
      */
      let second = this.$fliter.min2second(1);

      /*
      * @method: 单位换算--秒转分
      * @param: num为string，number类型
      * @return: number类型
      * @ps: 参数不满足String，Number类型,则返回0
      */
      let min = this.$fliter.second2min(60);
      /*
      * @method: 单位换算--分转时
      * @param: num为string，number类型
      * @return: number类型
      * @ps: 参数不满足String，Number类型则返回0
      */
      let min = this.$fliter.min2hour(60);
      
    ```

    
 


