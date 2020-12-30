
# FE代码规范

## JavaScript
命名规则：
- 变量和函数为小驼峰法标识, 即除第一个单词之外，其他单词首字母大写（ lowerCamelCase）
- 常量 (如 USER_INFO) 为大写 (UPPERCASE ) ＋ 下划线连接

### 变量名

变量名推荐使用驼峰法来命名(camelCase)。
```
示例：
let userName = 'lili';
```

### 常量
驼峰 ＋ 下划线连接

```
示例：
const USER_INFO = 'USER_INFO';
```

### 方法名
方法使用驼峰法来命名(camelCase)。
前缀应当为动词。可使用常见动词约定。

| 动词        | 含义    |  返回值  |
-------- | -----: | :----:
| can        | 判断是否可执行某个动作(权限)    |  函数返回一个布尔值。true：可执行；false：不可执行 |
| has        | 判断是否含有某个值    |  函数返回一个布尔值。true：含有此值；false：不含有此值  |
| is        | 判断是否为某个值    |  函数返回一个布尔值。true：为某个值；false：不为某个值  |
| get        | 获取某个值    |  函数返回一个非布尔值  |
| set        | 设置某个值    |  无返回值、返回是否设置成功或者返回链式对象  |
| load        | 加载某些数据    |  无返回值或者返回是否加载完成的结果  |

```
示例：

// 是否可阅读
function canRead() {
  return true;
}

// 获取名称
function getName(name) {
  return name;
}
```

### 空格与运算符
通常运算符 ( = + - * / ) 前后需要添加空格。
```
示例：
let x = y + z;
let arr = ["aa", "bb", "cc"];
```

### 代码缩进
通常使用 4 个空格符号来缩进代码块。

### 垂直空行
变量、if、forEach、while 等，中间应使用空行。
```
示例：
let num = 10;

if (num === 10) {
    // code
}
```

### 语句规则
简单语句的通用规则:
- 一条语句通常以分号作为结束符。
```
let arr = ["Volvo", "Saab", "Fiat"];

let userInfo = {
    firstName: "li",
    lastName: "zhong",
    age: 20
};
```
复杂语句的通用规则:
- 将左花括号放在第一行的结尾。
- 左花括号前添加一空格。
- 将右花括号独立放在一行。
- 不要以分号结束一个复杂的声明。
```
function getNum(num) {
    return num;
}
```

### 对象规则
对象定义的规则:
- 将左花括号与类名放在同一行。
- 冒号与属性值间有个空格。
- 字符串使用双引号，数字不需要。
- 最后一个属性-值对后面不要添加逗号。
- 将右花括号独立放在一行，并以分号作为结束符号。

```
let userInfo = {
    firstName: "li",
    lastName: "zhong",
    age: 20
};
```

### 每行代码字符小于 80 或者 120 字符

为了便于阅读每行字符建议小于数 80 或者 120 个。

如果一个 JavaScript 语句超过了 80 或者 120 个字符，建议在 运算符或者逗号后换行。

### 避免 == 的使用
== 会发生隐式类型转换，推荐使用 === 。
```
示例：
if (age === 20) {   
    // code
}
```


### 减少魔鬼数字
魔鬼数字的定义：在代码中没有具体含义的数字、字符串。

魔鬼数字主要影响了代码可读性，读者看到的数字无法理解其含义，从而难以理解程序的意图。当程序中出现的魔鬼数字过多时，代码的可维护性将会急剧下降，代码变得难以修改，并容易引入错误。

```
示例：
if (code === 1) {
    // code
}
```
解决办法：使用常量代替魔鬼数字；
```
示例：
if (code === NET_CODE) {
    // code
}
```

### 注释的使用规则
单行注释以 // 开头。
```
示例：
// 姓名
const userName = 'abc';
```

多行注释以 /* 开头，以 */ 结尾。
```
示例：
/*
* 这里就是注释1
* 这里就是注释2
* 这里就是注释 ...
*/
```

### 使用 ES6 简化代码
ES6 简化代码的形式很多，自行去 Google 查询；
```
let {userName = '', age = 0 } = userInfo;
```

```
let userName = 'abc';
let age = 20;
let userInfoStr = `${userName} ${age}`;
```



## CSS
CSS 采用 BEM 命名规范；
BEM 是 Block（块） Element（元素） Modifier（修饰器）的简称。

使用BEM规范来命名CSS，组织HTML中选择器的结构，利于CSS代码的维护，使得代码结构更清晰（弊端主要是名字会稍长）。

如何使用BEM：
- 1、一个独立的（语义上或视觉上），可以复用而不依赖其它组件的部分，可作为一个块（Block）
- 2、属于块的某部分，可作为一个元素（Element）
- 3、用于修饰块或元素，体现出外形行为状态等特征的，可作为一个修饰器（Modifier）

在本规范中，以横线 - 来作为块和元素的间隔，以双下划线 __ 来作为块和修饰器 或 元素和修饰器 的间隔，以中划线 - 来作为 块|元素|修饰器 名称中多个单词的间隔

保证各个部分只有一级 B-E__M  ，修饰器需要和对应的块或元素一起使用，避免单独使用。

### HTML 书写

```
示例：
<!-- 某个块 -->
<form class="search-form">
    <!-- 某个元素 -->
    <div class="search-form__content-left">
        <!-- 错误：不能出现多个元素 -->
        <h2 class="search-form__content-left__h2">标题</h2>
        <!-- 某个元素，虽然是子集，保证了只有一级元素 -->
        <input class="search-form__input">
        <!-- 某个元素，加上了hover修饰器 -->
        <button class="search-form__button search-form__button_hover">搜索</button>
        <button class="search-form__button-set search-form__button-set_hover">搜索1</button>
        <!-- 错误：不能单独使用lg修饰器 -->
        <button class="search-form__button_lg">搜索</button>
         
        <!-- 块中可嵌套着另一个块 -->
        <p class="my-img">
            <img class="my-img__logo" src="abc.png" alt="image" title="image">
        </p>
         
    </div>
</form>
 
<div class="search-result"></div>
```

### 在CSS文件中使用：
```
.search-form {
    position: relative;
}
 
.search-form__input {
    font-size: 12px;
}
 
.search-form__button_hover {}
 
/* 避免：避免使用不必要的嵌套（此处只是简单的嵌套，没有必要） */
.search-form__content-left .search-form__input {}
 
/* 稍好的嵌套（此处是在块的theme1修饰器下的子元素，某些时候有必要） */
.search-form_theme1 .search-form__input {}
 
/* 错误：使用了标签 */
button.search-form__button {}
.search-form button {}
```

### 在Stylus文件中 书写
而在Stylus文件中，也需要注意嵌套层次的意义，尽量按照 BEM三层来
```
/* 避免这样做 .search 不是一个独立的块 */
.search {
    /* 应该把这个块提取出来 */
    &-form {
        &__button {
            &_hover {}
             
            /* 应该把这个元素提取出来 */
            &-set {
                &_hover {}
            }
        }  
    }
 
    &-result {
         
    }
}
 
/* 建议这样,按照各级区分出来 */
.search-form {
    &__button {
        &_hover {}
    }
     
    &_button-set {
        &_hover {}
    }
}
 
.search-result {
 
}
 
 
/* 对于嵌套在块中的块，如果非常有必要，可以嵌套写样式 */
.search-form {
    .my-img {
        &__logo {}
    }
}
/* 但一般来说，不建议，因为这破坏了块的独立性。可转换成设置对应的 元素来表现，如 */
.search-form {}
.my-img {
    &__search-form-logo {}
}
```

### CSS网页公共样式命名

| CSS样式命名        | 说明    |  
-------- | -----: | 
| wrap        | 用于最外层    | 
| header        | 用于头部    |  
| main        | 用于主体内容（中部）    |  
| main-left        | 左侧布局    |  
| main-right        | 右侧布局    |  
| nav        | 网页菜单导航条    |  
| content        | 用于网页中部主体    |  
| footer        | 用于底部    |  
| menu        | 菜单    |  
| submenu        | 子菜单    |   
| sideBar        | 侧栏    |   
| tag        | 标签    |   
| message        | 提示信息    |   
| tips        | 小技巧    |  
| vote        | 投票   |  
| friendlink        | 友情连接    |  
| title        | 标题    |  
| summary        | 摘要    |  
| loginbar        | 登录条    |  
| hot        | 热门热点    |  
| search        | 搜索    |  
| copyright        | 版权信息    |  
| logo        | 网站LOGO标志    |  
| regsiter        | 注册    |  
| arrow        | 箭头    |  
| scroll        | 滚动    |  
| status        | 状态    |  
| banner        | 广告位    |  



