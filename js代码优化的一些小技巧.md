# js代码优化的一些小技巧

## 1. 多个条件语句
``` js
//method1
     if (color) {
         if (color === 'black') {
             printBlackBackground();
         } else if (color === 'red') {
             printRedBackground();
         } else if (color === 'blue') {
             printBlueBackground();
         } else if (color === 'green') {
             printGreenBackground();
         } else {
             printYellowBackground();
         }
     }
     
 //method2
     switch(color) {
         case 'black':
             printBlackBackground();
             break;
         case 'red':
             printRedBackground();
             break;
         case 'blue':
             printBlueBackground();
             break;
         case 'green':
             printGreenBackground();
             break;
         default:
             printYellowBackground();
     }
     
 //method3
     var colorObj = {
         'black': printBlackBackground,
         'red': printRedBackground,
         'blue': printBlueBackground,
         'green': printGreenBackground,
         'yellow': printYellowBackground
     };
     if (color in colorObj) {
       colorObj[color]();
     }
```
## 2. 取整
* 一个位操作符 ~ 将输入的32位的数字(input)转换为 -(input+1)
* 两个位操作符将输入(input)转变为 -(-(input + 1)+1) 
* 对于数字, 负数就像使用Math.ceil()方法而正数就像使用Math.floor()方法. 
转换失败时,返回0,这在Math.floor()方法转换失败返回NaN时或许会派上用场。
```js
// 单个 ~
 console.log(~1337)    // -1338
 
// 数字输入
 console.log(~~47.11)  // -> 47
 console.log(~~-12.88) // -> -12
 console.log(~~1.9999) // -> 1
 console.log(~~3)      // -> 3
 
// 转换失败
 console.log(~~[]) // -> 0
 console.log(~~NaN)  // -> 0
 console.log(~~null) // -> 0
 
// 大于32位整数时转换失败
 console.log(~~(2147483647 + 1) === (2147483647 + 1)) // -> 0
```

## 3. 链式调用
* 在面向对象的Javascript中为对象建立一个方法时，返回当前对象可以让你在一条链上调用方法。
```js
function Person(name) {
   this.name = name;
 
   this.sayName = function() {
     console.log("Hello my name is: ", this.name);
     return this;
   };
 
   this.changeName = function(name) {
     this.name = name;
     return this;
   };
 }
 
 var person = new Person("John");
 person.sayName().changeName("Timmy").sayName();
```

## 4. 转换为数字
```js
var one = '1';
var numberOne = +one; // Number 1
var one = '1';
var negativeNumberOne = -one; // Number -1

+ new Date();//1462548741
```

## 5. 短路求值
* 短路求值是说, 只有当第一个运算数的值无法确定逻辑运算的结果时，才对第二个运算数进行求值
* 当AND(&&)的第一个运算数的值为false时，其结果必定为false
* 当OR(||)的第一个运算数为true时，最后结果必定为true。
```js
// 逻辑或可以用来给参数设置默认值
function theSameOldFoo(name){
    name = name || 'Bar' ;
    console.log("My best friend's name is " + name);
}
theSameOldFoo();  // My best friend's name is Bar
theSameOldFoo('Bhaskar');  // My best friend's name is Bhaskar

//  逻辑与可以用来避免调用undefined参数的属性时报错
var dog = {
   bark: function(){
      console.log('Woof Woof');
    }
 };
 // 调用 dog.bark();
 dog.bark(); // Woof Woof.
 // 但是当dog未定义时，dog.bark() 将会抛出"Cannot read property 'bark' of undefined." 错误
 // 防止这种情况，我们可以使用 &&.
 dog&&dog.bark();   // This will only call dog.bark(), if dog is defined.
```

## 6. 异步循环
* 举个栗子：一个异步方法，每秒打印一次循环的索引值
```js
for (var i=0; i<5; i++) {
   setTimeout(function(){
       console.log(i); 
   }, 1000);
}  
// 输出的结果会是5,5,5,5,5。原因是：每次时间结束(timeout)都指向原始的i，而并非它的拷贝。所以，for循环使i增长到5，之后timeout运行并调用了当前i的值（也就是5）。

// 解决的办法是：拷贝i。最普通且常用方法的靠背方法就是通过声明函数来建立一个闭包，并将i传给此函数。我们这里使用了自调用函数。
for (var i=0; i<5; i++) {
    (function(num){
        setTimeout(function(){
            console.log(num); 
        }, 1000); 
    })(i);  
}
```

## 7. 向数组中插入元素

```js
 var arr = [1,2,3,4,5];
 //old method
 arr.push(6);
 //new method 快43%
 arr[arr.length] = 6;
     
 var arr = [1,2,3,4,5];
 //old method
 arr.unshift(0);
 //new method 快98%
 [0].concat(arr);
```

## 8. 测量javascript代码块性能的小知识

```js
 console.time("Array initialize");
 var arr = new Array(100),
     len = arr.length,
     i;
 
 for (i = 0; i < len; i++) {
     arr[i] = new Object();
 };
 console.timeEnd("Array initialize"); // 0.711ms
```

## 9. 使用indexOf实现contains功能
* JavaScript并未提供contains方法。检测子字符串是否存在于字符串或者变量是否存在于数组你可能会这样做
* !!（双重否定运算符），他能自动的将任何类型的数据转换为布尔值，只有这样变量才会返回false：0，null,"",undefined或NaN，其他的值都返回true
```js
// method1
 var someText = 'javascript rules';
 if (someText.indexOf('javascript') !== -1) {
 }
 // or
 if (someText.indexOf('javascript') >= 0) {
 }

// method2
var someText = 'text';
!!~someText.indexOf('tex'); // someText contains "tex" - true
!~someText.indexOf('tex'); // someText NOT contains "tex" - false
~someText.indexOf('asd'); // someText doesn't contain "asd" - false
~someText.indexOf('ext'); // someText contains "ext" - true

```

## 10. 数组截断 
* 这个技术可以锁定数组的大小，这对于删除数组中固定数量的元素是非常有用的。
```js
var array = [1,2,3,4,5,6]; 
console.log(array.length);//6 
array.length = 3; 
console.log(array.length);//3 
console.log(array);//[1,2,3] 
```

## 11. 全部替换 
```js
var str ="  ab ac c "; 
console.log(str.replace(/a/,"1"));
console.log(str.replace(/a/g,"1"));
console.log(str.replace(/\s/g,"1"));
console.log(str.replace(/^\s+|\s+$/g,""));

```

## 12. 把NodeList转换成数组 
```js
[].slice.call(elements); 
```

## 13. 金钱格式化
* https://juejin.im/post/5b026bbb5188256720345bb4
```js
var test1 = '1234567890'
var format = test1.replace(/\B(?=(\d{3})+(?!\d))/g, ',')//1,234,567,890
```

## 14. 数组去重、并集、交集、差集
* map set 集合中的元素不能重复
```js
// map set 集合 放的东西不能重复 可以被迭代
let arr1 =[1,2,3,4,4]
let arr2 =[1,2,3,6,7]

// 去重
console.log(new Set(arr1))//Set { 1, 2, 3, 4 }

// 并集
let s=new Set([...arr1,...arr2])
console.log(s)//Set { 1, 2, 3, 4, 6, 7 }

s=[...new Set([...arr1,...arr2])]//Symbol.iterator
console.log(s)//[ 1, 2, 3, 4, 6, 7 ]

// 交集
let s1=new Set(arr1)
let s2=new Set(arr2)

let r=[...s1].filter(m=>{
    return s2.has(m)//s2是否含有m
})
console.log(r)//[ 1, 2, 3 ]

// 差集
// 6,7  4
let c=[...s1].filter(m=>{
    return !s2.has(m)//s2是否含有m
})
console.log(c)//[ 4 ]

// delete
let y=new Set([1,2,4])
y.delete(2)
console.log(y)//Set { 1, 4 }

// map
let map=new Map()
map.set('a',['aaa'])
map.set('a',['bbb'])
console.log(map)//Map { 'a' => [ 'bbb' ] }

map.forEach((m,k)=>{
    console.log(m,k)//[ 'bbb' ] 'a'
})
```

## 15. 取出一个数组中的最大值和最小值
```js
    var numbers = [5, 458 , 120 , -215 , 228 , 400 , '122205', -85411];
    var maxInNumbers = Math.max.apply(Math, numbers); 
    var minInNumbers = Math.min.apply(Math, numbers);
```

## 16. 随机数
```js
//(0.0<=x<1.0)
Math.random()
//0<=r<=max
Math.floor(Math.random()*(max+1))
//min<=r<=max
Math.floor(Math.random()*(max+1-min))+min
```
## 17. 


## 30. 适可而止
```js
 console.log('(!(~+[])+{})[--[~+""][+[]]*[~+[]] + ~~!+[]]+({}+[])[[~!+[]]*~+[]]',(!(~+[])+{})[--[~+""][+[]]*[~+[]] + ~~!+[]]+({}+[])[[~!+[]]*~+[]]);
 console.log('([][[]]+[])[+!![]]+([]+{})[!+[]+!![]]',([][[]]+[])[+!![]]+([]+{})[!+[]+!![]]);
```


