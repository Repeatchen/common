# common
## CommonJS 规范
Node 由模块组成 采用的是CommonJS 
每个文件就是一个模块，自己的作用域，变量，函数，类都是私有的，对其他的文件不可见。
```js
add.js
var x = 5;
var addX = function(value){
    return value + x;
}
```
以上代码，变量x和函数addX，是当前文件add.js 私有的，其他文件不可见。
如果多个文件分享变量，需定义global对象属性。global.warning = true;所有文件都可以读取，写法不推荐。

CommonJS规范规定，每个模块内部，module变量代表当前模块，这个变量是一个对象，它的exports属性是对外的接口，加载某个模块都是加载module.exports属性。

```js
module.exports.x = x;
module.exports.addX = addX;
```
通过module.exports输出变量x和函数addX。
require方法用于加载模块。
```js
var example = require('./add.js');
```
CommonJS模块特点：
    所有代码都运行在模块作用域，不会污染全局作用域。
    模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存，以后在加载读取缓存结果，要想让模块再次运行，必须清除缓存。
    模块的加载顺序，按照其代码出现的顺序。
## Module对象
    Node内部提供一个Module构建函数，所有的模块都是Module的实例。
    每个模块内部，都有一个module对象，代表当前模块。
    module.id 模块的识别符，通常是带有绝对路径的模块文件名。
    module.filename 模块的文件名，带有绝对路径。
    module.loaded 返回一个布尔值，表示模块是否已经完成加载。
    module.parent 返回一个对象，表示调用该模块的模块。
    module.children 返回一个数组，表示该模块要用到的其他模块。
    module.exports 表示模块对外输出的值。

如果命令行调用某个模块，比如node something.js,那么 module.parent就是null，如果是在脚本中调用，比如require('./something.js'),那么module.parent就是调用模块，这一点可以判断，模块是否为入口脚本。
```js
if(!module.parent){
    app.listen(8088,function(){
        console.log('app listening on port 8088');
    })
}else{
    module.exports = app;
}
```

## module.exports 属性
module.exports 表示当前模块对外输出的接口，其他文件加载该模块，实际上就是读取module.变量。
```js
var EventEmitter = require('events').EventEmitter;
module.exports = new EventEmitter();

setTimeout(function(){
    module.exports.emit('ready');
},10000);
```
加载后1秒后，发出ready事件。
```js
var a = require('./a');
a.on('ready',function(){
    console.log('modyle a is ready')
})
```

## exports 变量

Node 为每个模块提供一个exports变量，指向module.exports。在每个模块头部都一个
```js 
    var exports = module.exports; 
```
造成的结果是，在对外输出模块接口时，可以向exports对象添加方法。
```js 
    exports.area = function (r){
        return Math.PI*r*r;
    }
```
**不能直接将exports变量指向一个值，因为切断了exports 与 module.exports的联系。
```js
    1.
    exports = function(x){
        console.log(x);
    }

    2.
    exports.hello = function(){
        return 'hello';
    };
    module.exports = 'hello world';
```
以上写法都无效。
1.exports 不在指向module.exports。
2.hello函数是无法对外输出的，因为module.exports被重新赋值。**如果一个模块的对外接口，就是单一的值，不能使用exports输出，只能使用module.exports输出。
```js
    module.exports = function(x){console.log(x);}
```
## AMD规范与CommonJS规范的兼容性
 CommonJS 规范加载是同步的，加载完成，才能执行后面的操作，AMD规范是非同步加载模块，允许制定回调函数。
 由于Node.js 主要用于服务器编程，模块文件一般都已经存在于本地硬盘，加载比较快，不用考虑异步加载方式，CommonJS规范比较适用，
 如果浏览器环境，要从服务器加载模块，必须采用异步模式，因此浏览器一般采用的AMD规范。

 AMD规范使用define方法定义模式

 ```js
    define(['package/lib'],function(){
        function foo(){
            lib.log('hello world!')
        }
        return {
            foo:foo
        }

    });

    define(function(require,exports,module)){
        var someModule = require('someModule');
        var anotherModule = require('anotherModule');

        someModule.doTehAwesome();
        anotherModule.doMoarAwesone();

        exports.asplode = function(){
            someModule.doTehAwesome();
            anotherModule.doMoarAwesone();
        }
    }
 ```

 ## require基础用法
  Node 使用CommonJS模块规范，内置require命令用于加载模块文件。
  require 命令的基本功能是，读入并执行一个js文件，然后返回exports对象，没有发现模块，会报错。
  ```js
    var invisible = function(){
        console.log('invisible');
    }
    exports.message = 'hi';

    exports.say = function(){
        console.log(message);
    }

    var example = require('./example.js');
    example
  ```
  输出exports对象。
  如果输出一个函数，那就不定义在exports对象上面，而要定在module.exports变量上面。



  require 命令调用本身，等于是执行module.exports,因此输出hello world。
  ```js
  module.exports = function(){
      console.log('hello world')
  }
  require('./example2.js')();
  ```
## 加载规则
    require 命令用于加载文件，后缀名默认为js。
    根据不同的格式，require命令去不同路径寻找模块文件。
    1. 以/开头，表示加载是绝对路径模块文件，ps:require('/home/marco/foo.js')将加载/home/marco/foo.js。
    2. 以‘./’开头，表示位于相对路径（跟当前执行脚本的位置相比）。
    3.参数不以‘./’或‘/’开头，加载的是默认提供核心模块（位于Node的系统安装目录中）或者一个位于各级node_modules目录的已安装模块（全局安装或局部安装）
        ps：require('bar.js'); Node会依次搜索下文件。
        1-/usr/local/lib/node/bar.js
        2-/home/user/projects/node_modules/bar.js
        3-/home/user/node_modules/bar.js
        4-/home/node_modules/bar.js
        5-/node_modules/bar.js
    目的是，使不同的模块可以将所依赖的模块本地化。
    4.字符串没有以‘./’或‘/‘开头，而且一个路径，ps：require('example-module/path/to/file'),则先找到example-module位置，在以它为参数，找到后续路径。
    5. 制定模块文件没有发现，Node会尝试为文件名添加.js .json .node后，再去搜索，.js会以文本格式js脚本文件解析，.json文件会以JSON格式文本文件解析，.node文件会以编译后的二进制文件解析。
    6.得到require命令加载的确切文件名，使用require.resolve()方法。
## 目录加载规则
    会把相关文件放在一个目录里面，便于组织，require通过设置好的入口文件加载整个目录。
    在目录中放置一个package.json，将入口文件写入main字段
    ps：
    ```js
    {
        'name':'some-lib',
        'main':'./lib/some-lib.js'
    }
    ```
    require发现参数字符串指向一个目录，会自动查看目录的package.json文件，然后加载main字段指定入口文件，如package.json文件没有main字段，或者没有package.json文件，会加载该目录下index.js文件或index.node文件。

## 模块的缓存
```js 
    require('./example.js');
    require('./example.js').massage = 'hello';
    require('./example.js').massage;
```

连续三次使用require命令，加载同一个模块，第二次加载添加message属性，第三次加载，message属性依然存在，证明require命令并没有重新加载，而是输出缓存。
多次执行某一个模块，可以return一个函数，然后多次require这个模块，重新执行输出函数。

所有的环迅保存在require.cache之中，删除模块缓存。ps：
```js
    //删除指定模块的缓存
    delete require.cache[moduleName];
    //删除所有模块的缓存
    Objuect.keys(require.cache).forEach(function(key){
        delete require.cache[key];
    });
```
ps:缓存是根据绝对路径识别模块的，如果同样的模块名，但是保存在不同的路径，require命令还会重新加载该模块。

## 环境变量NODE_PATH
Node执行脚本时，先查看环境变量NODE_PATH,一组以冒号分隔的绝对路径，在其他位置找不到指定模块时，Node会去这些路径中寻找。
可以将NODE_PATH添加到.bashrc。

两种解决方法，1.将该文件加入node_modules目录，2.修改NODE_PATH环境变量，package.json。
2.package.json写法
    {
        'name':'node_path',
        ....
        'scripts':{
            'start':'NODE_PATH=lib node index.js'
        }
    }
    NODE_PATH 是历史遗留的路径解决方案，通常不应该使用，而使用node_modules目录机制。

## 模块的循环加载
    如果发生模块的循环加载，即A加载B，B又加载A，则B将加载A的不完整版本。

    ```js
        // a.js 
        exports.x = 'a1';
        console.log('a.js',require('./b.js').x);
        exports.x = 'a2';

        // b.js
        exports.x = 'b1';
        console.log('b.js',require('./a.js').x);
        exports.x = 'b2';

        // main.js
        console.log('main.js',require(./a.js).x);
        console.log('main.js',require(./b.js).x);
    ```
    执行结果如下：
    $node main.js
    b.js a1
    a.js b2
    main.js a2
    main.js b2

    修改main.js,再次加载a.js和b.js

    ```js

        console.log('main.js',require('./a.js').x);
        console.log('main.js',require('./b.js').x);
        console.log('main.js',require('./a.js').x);
        console.log('main.js',require('./b.js').x);
    ```
    执行结果如下：
    $node main.js
    b.js a1
    a.js b2
    main.js a2
    main.js b2
    main.js a2
    main.js b2

    第二次加载a.js和b.js时，会直接从缓存读取exports属性，所以a.js和b.js内部的console.log语句都不会执行。

## require.main
require方法有一个main属性，可以用来判断模块是直接执行，还是被调用执行。
直接执行（node module.js）,require.main属性指向模块本身。
require.main === module;//true
调用执行的时候（通过require加载该脚本执行），上面的表达式返回false。

## 模块的加载机制

    CommonJS模块输入的是被输出的值的拷贝，一旦输出的一个值，模块内部的变化印象不到这个值。

    ```js

        var counter = 3;
        function incCounter(){
            counter++;
        }
        module.exports = {
            counter:counter,
            incCounter:incCounter,
        }

        var counter = require('./lib').counter;
        var incCounter = require('./lib').incCounter;

        console.log(counter); //3
        incCounter();
        console.log(counter);//3
    ```
    输出内部变量counter和改写这个变量的内部方法incCounter,
    counter输出以后，lib.js模块内部变化影响不到counter。


## require的内部处理流程
 require命令是CommonJs规范之中，用来加载其他模块的命令，不是一个全局命令，
 而是指向当前模块的module.require命令，而后者又调用Node的内部命令Module._load。
 //Module._load()
 Module._load = function(request,parent,isMain){
    1.检查Module._cache,是否缓存之中有指定模块。
    2.如果缓存之中没有，就创建一个新的Module实例。
    3.将它保存到缓存
    4.使用module.load()加载指定的模块文件，读取文件内容之后，使用module.compile()执行文件代码
    5.如果加载/解析过程报错，就从缓存删除该模块
    6.返回该模块的module.exports
 }

 //module.compile()
 Module.prototype._compile = function(content,filename){
     1.生成一个require函数，指向module.require.
     2.加载其他辅助方法到require。
     3.将文件内容放到一个函数之中，该函数可调用require
     4.执行该函数
 }


require函数及其辅助方法：
    1.require()加载外部模块
    2.require.resolve:将模块名解析到一个绝对路径
    3.require.main:指向主模版
    4.require.cache:指向所有缓存的模块
    5.require.extensions:根据文件后缀名，调用不同的执行函数
一旦require函数准备完毕，整个所要加载的脚本内容，就会放到一个新的函数里面，可以避免污染全局环境，函数参数包括require，module，exports以及其他函数。
```js

(function(exports,require,module,__filename,__dirname){

})
```
Module._compile方法是同步进行的，所以要等Module._load等它执行完成，才能返回module.exports的值。


## import
import 被javaScript引擎静态分析，在其他模块内的其他语句执行，
so：
```js
    //错误
    if(x===2){
        import aa from './aa'
    }

```
import 和 export只能在模块顶部，不能在代码块之中。
有利于编译器提高效率，也导致无法运行时加载模块，在语法上，条件加载不可能实现，
import 可以做到按需加载 
http://es6.ruanyifeng.com/#docs/module#export-%E4%B8%8E-import-%E7%9A%84%E5%A4%8D%E5%90%88%E5%86%99%E6%B3%95
