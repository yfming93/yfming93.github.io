---
layout:     	post
title:       "Vuejs2.0学习笔记"
date:     	2017-09-21
author:     	"袁凤鸣"
categories:  vue
tags: vue
mathjax: true
---

* content
{:toc}

## Vuejs2.0学习笔记

-----------

按照慕课网的`Vuejs2.0`的学习视频零基础实践的一个demo如下:
演示页面：[袁凤鸣 | Vuejs2.0购物车demo](https://yfming93.github.io/vuejs/)
仓库地址：[https://github.com/yfming93/vuejs](https://github.com/yfming93/vuejs)
<br>

同时感谢慕课网讲师 [河畔一角](http://www.imooc.com/t/1343480) 分享的学习资料
[使用vue2.0实现购物车和地址选配功能](http://www.imooc.com/learn/796)







## (一)、基本配置命令介绍

- `cnpm install vue --save` 是将软件安装到`dependencies`里面，`--save-dev`是安装到`devDependencies`里面

    `--save`是将软件安装到开发里面去，在`package.json`文件中的`devDependencies`中

-  **Mac 电脑终端配置运行如下：**
 
         
        MingodeMacBook-Pro:~ Mingo$ cd /Users/Mingo/Desktop/VueShoppingCart
        MingodeMacBook-Pro:VueShoppingCart Mingo$ ls
           address.html	cart.html	css		data		img		js
        MingodeMacBook-Pro:VueShoppingCart Mingo$ npm init
           This utility will walk you through creating a package.json file.
           It only covers the most common items, and tries to guess sensible defaults.
           
           See `npm help json` for definitive documentation on these fields
           and exactly what they do.
           
           Use `npm install <pkg>` afterwards to install a package and
           save it as a dependency in the package.json file.
           
           Press ^C at any time to quit.
           package name: (vueshoppingcart) VueShoppingCart
           Sorry, name can no longer contain capital letters.
           package name: (vueshoppingcart) vuejs
           version: (1.0.0)
           description: 这是袁凤鸣的第一个Vuejs2.0开发的购物车程序。
           entry point: (index.js)
           test command:
           git repository:
           keywords: vue，shopping
           author: 袁凤鸣
           license: (ISC)
           About to write to /Users/Mingo/Desktop/VueShoppingCart/package.json:
           
           {
               "name": "vuejs",
               "version": "1.0.0",
               "description": "这是袁凤鸣的第一个Vuejs2.0开发的购物车程序。",
               "main": "index.js",
               "scripts": {
                   "test": "echo \"Error: no test specified\" && exit 1"
               },
               "keywords": [
                            "vue，shopping"
                            ],
               "author": "袁凤鸣",
               "license": "ISC"
           }
           
           
           Is this ok? (yes) y
           
           
           ╭─────────────────────────────────────╮
           │                                     │
           │   Update available 5.3.0 → 5.4.2    │
           │     Run npm i -g npm to update      │
           │                                     │
           ╰─────────────────────────────────────╯
           
        MingodeMacBook-Pro:VueShoppingCart Mingo$ sudo npm i -g npm
           Password:
           /usr/local/bin/npm -> /usr/local/lib/node_modules/npm/bin/npm-cli.js
           /usr/local/bin/npx -> /usr/local/lib/node_modules/npm/bin/npx-cli.js
           + npm@5.4.2
           added 21 packages, removed 111 packages and updated 19 packages in 282.892s
           
           
           ╭─────────────────────────────────────╮
           │                                     │
           │   Update available 5.3.0 → 5.4.2    │
           │     Run npm i -g npm to update      │
           │                                     │
           ╰─────────────────────────────────────╯
           
        MingodeMacBook-Pro:VueShoppingCart Mingo$ sudo npm i -g npm
           Password:
           /usr/local/bin/npx -> /usr/local/lib/node_modules/npm/bin/npx-cli.js
           /usr/local/bin/npm -> /usr/local/lib/node_modules/npm/bin/npm-cli.js
           + npm@5.4.2
           updated 1 package in 8.177s
        MingodeMacBook-Pro:VueShoppingCart Mingo$ npm -v
           5.4.2
        MingodeMacBook-Pro:VueShoppingCart Mingo$ npm install vue --save
           npm notice created a lockfile as package-lock.json. You should commit this file.
           npm WARN vuejs@1.0.0 No repository field.
           
           + vue@2.4.4
           added 1 package in 3.255s
        MingodeMacBook-Pro:VueShoppingCart Mingo$ npm install vue-resource --save
           npm WARN vuejs@1.0.0 No repository field.
           
           + vue-resource@1.3.4
           added 22 packages in 21.824s
        MingodeMacBook-Pro:VueShoppingCart Mingo$ ls -l -a
           total 96
           drwxr-xr-x  14 Mingo  staff   476  9 19 14:41 .
           drwx------+ 74 Mingo  staff  2516  9 19 14:35 ..
           -rw-r--r--@  1 Mingo  staff  6148  9 19 14:41 .DS_Store
           drwxr-xr-x   7 Mingo  staff   238  9 19 14:39 .idea
           -rwxr-xr-x@  1 Mingo  staff   363  8 31 00:57 .project
           -rwxr-xr-x@  1 Mingo  staff  9550  8 31 00:57 address.html
           -rwxr-xr-x@  1 Mingo  staff  8622  8 31 00:57 cart.html
           drwxr-xr-x@  6 Mingo  staff   204  8 31 00:57 css
           drwxr-xr-x@  5 Mingo  staff   170  8 31 00:57 data
           drwxr-xr-x@  8 Mingo  staff   272  8 31 00:57 img
           drwxr-xr-x@  5 Mingo  staff   170  9 19 14:12 js
           drwxr-xr-x  26 Mingo  staff   884  9 19 14:41 node_modules
           -rw-r--r--   1 Mingo  staff  5900  9 19 14:41 package-lock.json
           -rw-r--r--   1 Mingo  staff   389  9 19 14:41 package.json
        MingodeMacBook-Pro:VueShoppingCart Mingo$
        

-----------

## (二)、Vue 1.0 和 2.0 区别

**[从 Vue 1.x 迁移【参照官方文档】](https://cn.vuejs.org/v2/guide/migration.html)**

- `methods`负责声明方法  方法的调用写在`mounted`上
`Vue1.0`用`ready`  `Vue2.0`用`mounted`
    - 生命周期`mounted`其实可以换成`created`吧，本例用`created`也行
    - `ready` 替换，使用新的 `mounted` 钩子函数替代。应该注意的是，使用 `mounted` 并不能保证钩子函数中的 `this.$el` 在 `document` 中。为此还应该引入 `Vue.nextTick/vm.$nextTick`。例如：
        
              mounted: function () {
                  this.$nextTick(function () {
                    // 代码保证 this.$el 在 document 中
                  })
              }

- **2.0**
    - 使用图片 `v-bind:src=""`
    - `$index`已经删除 ` v-for(item,index)`使用索引
    - 2.0 不再支持用`$delete`删除
    - 2.0 取消了标签内 `属性={{ }}`   功能

- 给图片动态绑定需要用 `v-bind：src=xx.xx`  在 `vue2.0` 里 `src：{{xx.xx}}` 是无效的
    - `Mustache`既双大括号`{{}}` 不能在 `HTML` 属性中使用，应使用 `v-bind` 指令,相当于`html`的自定义属性。`v-bind:src=""`
`Mustache`内部可以使用 JS 表达式，如`{{ number + 1 }}`
。在方法里使用`this.$http.get().then()`可以使用`vue-resource`

-----------

## (三)、语法讲解
- ### **v-for** 用于循环
循环。主要用于表格，`<li> `标签。去循环一个数组。【凡是看到列表就推荐使用`v-for`】
    **使用for渲染商品时,若想加索引如下 （限vue2.0）**
     
         v-for="(item,index) in productList"
          在商品名字处 {{item.productName+index}}
              
- ### **filter** 过滤器：
   过滤器，格式化数据。主要对接口返回的字段进行业务转换，数据进行格式化如后台返回金额19数字。页面显示：`￥19.00元`。
 - 写在实例Vue内部的是局部过滤器，
 
            new Vue({
              filters:{
              formatMoney: function (value){
                  return "$"+value.toFixed(2);
               }
             }
            })
    - 写在外部的是全局过滤器(value:默认值 ，type参数)
    
            Vue.filter("money", function (vaule, type) {
                return "￥" + vaule.toFixed(2) + type;
            }) 
            
            
     eg: 例如：
     ```<div class="item-price">{ { item.productPrice | formatMoney('元') }}</div>```
        
     **注意: 全局的过滤器不要加s**
     
- ### **v-text** 文本渲染
和`{{}}`功能一样。但是`{{}}`在第一次页面`Vue`木有初始化完成会在页面上显示`{{}}`字符。故文本渲染多用`v-text`。
    
    - **注意：**`v-text`里用过滤器`filter`会失效，原因是在`vue2.0`里 管道符`|`只能用在`mousetache`和`v-bind`中。
    
- ### **v-show** 控制显示隐藏。
控制显示隐藏。`dom`是存在的。仅仅加`display block： display none`。
- ### **v-if** 控制显示隐藏
控制显示隐藏。如果dom不显示，整个dom则没有不存在。
- ### **v-model** 双向数据绑定
    **主要在表单中使用,比如文本框,下拉框,单选,复选,textarea**
   `v-model`是一个双向的功能。文本框输入以后，模型也会发生改变。反之模型改变了文本框也会改变。
- ### **v-bind** 绑定属性
    **给一个dom元素添加属性 v-bind:class="" 等价于 :class=""**
    绑定属性。给一个`dom`元素添加属性。【比如：在做图片的渲染过程中，如果图片的`src`地址是动态的，那么就需要`v-bind`去绑定`src`属性，去给这个`src`赋值。】。凡是样式变化的可用`v-bind`动态去操作`class` 【不要在原生的`class`里面去使用`{{}}`改变`class`】
    `v-bind`添加`class`属性，属性值只能为`obj`或`arr`
    
    - 不同的绑定方式：
    
            v-bind:class="{ }"; //绑定 class 时 “”中是{} 或者 []
            v-bind:src="";
- ### **v-on** 事件绑定

    - 【v-on：同等于@】 比如：`@click=""` 同等于`v-on:click=""`是支持表达式的（一元表达式、三元表达式）
- ### **component** 组件
在做单页面过程中使用多些。把每一个网页做成多个组件然后拼接。起到组件复用。如页面头部底部和轮播等。



-----------

## (四)、语法对比

- 循环遍历：


        (1)js:obj.forEach(function(value,index){});
        (2)jQuery:$.each(function(index,value){});
        (3)vue2.0:<i v-for="(value,index) in arr"></i>
- `es6`的箭头函数的`this`指向外部，里面用 `this`调用外部的变量和方法。
- `js`中`slice`与`splice`的差别：
都是截取数组，`slice`重新创建一个数组，`splice`在原先是数组的基础上

-----------        
## (五)、语法技巧
- 自动计算： `v-model="item.b" ` 直接可以`{{item.a*item.b}}`
- `toFixed`有精度缺失（四舍五入），所以价格一般有后台传入
- 这个`{{}}`花括号  页面刚出来的时候 会出现~~  这个怎么去掉呢？
    - 在整个控制模块上加 v-cloak 例如： `<div id="app"  v-cloak></div> `
- `data`中没有需要使用的数据使，使用`set`注册。

    `vue.set(object, key, value)`全局注册
    `this.$set(object, key, value)`局部注册
- 数据中是否存在某一属性，可以用此方法，`typeof item.checked==‘undefined’`

    - 如果不存在可以全局注册一个`Vue.set(item,"checked",true)`;
    或者局部注册一个`this.$set(item,"checked",true)`

- `vue`里面，全局的`Vue.set`和局部的`$.set`什么区别？
    - 全局的`set`就是在data里面创建，`$.set`可以在遍历`item`里面创建
- 删除: 通过`indexOf`获取索引,`var index = this.productList.indexOf(this.curProduct);`
然后 `splice(index,1)`从当前位置开始删除一个元素
- 对于文本框这样的值,是通过`v-model`绑定的,`v-model`具有双向数据绑定功能,通过`+`改变数量,那么文本框的值会相应的去发生变化
但是变量`{{ }}`是不会实时改变的
- 表达式使用`data`变量不要加`this`。`v-for 循环`可以控制循环的数量
-  `computed`,`filters`区别是什么？什么时候使用`computed`，什么时候使用`filters`
    -  我个人理解：`computed`是主要对数据进行实时操作，比如删除，插入等。 而`filters`主要是格式化数据。
-  `_this` 的使用 `_this.addRess=res.result;`   什么时候应该用`_this` 和 `this`  
    - `this`,在`vue`实例中指向`vue`的实例，`var vm = new Vue(){}`中的 `this` 指向 `vm`；而在 `forEach() `函数中 `this` 的指向发生了改变，不再指向`vue`实例，所以在使用 `forEach() `这个函数之外，先用` _this = this` 储存`vue`实例。不会改变`this`指向，用`this`，会改变`this`指向，例如 `forEach（）`，外部储存`this`然后在内部用 `_this` 。
- 凡是在指令里面（在页面视图里面）一定不要使用`this`，因为当前的指令的作用域已经是th``is了，直接操作即可。若再去加`this`作用域就发生变化了，故`this`就无法取得当前变量了。只有在`Vue`的实例的过程中函数里面去使用`this`，此时的`this`就是当前的`Vue`实例`data`里面的变量。

-----------

## (六)、插件使用注意
- 和后台数据交互用`vue-resource`，但是已经不被官方推荐，推荐使用`axios`作为`ajax`请求库
- `vue-resoure`插件主要用于数据交互 方面
`this.$http.get("请求 地址"，{请求参数}).then(function(res)){ 取数据 });`
- 函数内部`this`指向改变了，使用`vue resource`方法之前要定义一个内部变量`_this`保存`this`

- `this.$http.{请求方式}('请求地址'{请求的数据}).then(function (res){})`
  返回的数据并不是真正的数据 ，而是由`vue`封装的，全部包括 `body` 、`header`等 通常数据被包装在了`res.body`里面
  【最好打开浏览器调试看看，我的测试时数据在 `res.data`里面】

-----------

## (七)、调试和其他
- 谷歌浏览器中`command + option + i`打开审查元素
- 单页面用：`vue-router`；项目足够复杂用：`vuex`；构建系统用：`build`
- `webstorm`中`es6`语法报错，解决方法：

    - 打开 `Settings` => `Languages` & `Frameworks` => `Javascript`
把 `Javascript Language version `改为 `ECMAScript 6`    

-----------

## (八)、常见业务总结
- **对于`v-for`循环的 类似卡片的选中效果**
可以配合 `v-bind` 和 `@click`使用，巧妙运用下标`index`，如:
   
    `<li v-for="(address, index) in filterAddress" v-bind:class="{'check':index == curentIndex}" @click="curentIndex = index">`

- **固定`UI`业务选中效果**
    配合 `v-bind` 和 `@click` 然后设置一个固定值在``@click`中改变，如：

         <div class="shipping-method-wrap">
           <div class="shipping-method">
             <ul>
               <li v-bind:class="{'check':shippingMethod==1}" @click="shippingMethod=1">
                 <div class="name" >标准配送</div>
                 <div class="price">Free</div>
               </li>
               <li v-bind:class="{'check':shippingMethod==2}" @click="shippingMethod=2">
                 <div class="name" >高级配送</div>
                 <div class="price">180</div>
               </li>
             </ul>
           </div>
         </div>


- 常见错误
![](https://ws1.sinaimg.cn/large/006tKfTcgy1fmkrel1ybxj30vk0da0ut.jpg)

