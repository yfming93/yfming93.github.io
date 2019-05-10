---
layout:     	post
title:       "Vue2.0+Node.js+MongoDB全栈打造商城系统（5—6章）"
date:     	2017-10-11
author:     	"袁凤鸣"
categories:  vue
tags: 
    vue
mathjax: true
---

* content
{:toc}





# Vue2.0+Node.js+MongoDB全栈打造商城系统（5—6章）
用前端技术开发的商城整站
项目已部署上线，你可抢先体验：[http://imooc.51purse.com/](http://imooc.51purse.com/)
收费项目介绍：[http://coding.imooc.com/class/113.html](http://coding.imooc.com/class/113.html)

# 第5章 ES6常用语法
## 5-1 ES6简介
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/cu2Uuq.jpg)

## 5-2 ES6常用命令

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>ES6Demo演示</title>
      <style>
        .log {
          background-color: black;
          color: white;
          padding: 10px 20px;
        }
      </style>
    </head>
    <body>
      <h2>ES6Demo演示</h2>
      <div id="log" class="log"></div>
    
      <script>
        //模板语言
        var str = `
        console.log("a"+a);
        var a = 1;
        console.log("b"+b);
        let b = 2;
        ------------------
        function user() {
          var a = 1;
        }
        console.log("a"+a);
        var a = 1;
        -------------------
        //块级作用域
        {
          let a = 1;
          var b = 2;
        }
    
        console.log("b:"+b);
        console.log("a:"+a); //errorr
        ---------------------
         let a  = 1;
        a = 2;
        const  b = 2 ;
    //    b  = 3;  //error ES6.html?_ijt=f1b25lpo249eskl9mi7gbhji:46 Uncaught TypeError: Assignment to constant variable.
        ------------------------
        const  c = {d:1};
        c.d = 2;
        c.e = 3;
    //    c = {f:1}; // error
        -------------
        // 模板语言  可以直接拼接 字符串和变量
    //    let  userName = "Jack";
    //    printLog(\`I'm $删除这5字{userName}\`);  //中文是分割作用看时自己删除
        --------------
        function es5(flag) {
          if (flag) {
            return " es5 true";
          }else {
            return "es5 error";
          }
        }
        console.log(es5());
        // ES6默认参数  开发中可以进行容错处理
        function es6(num1, num2 =4) {
          return num1 + num2;
        }
        console.log(es6(7)); //结果11 即使少传了一个参数也不会报错
        ---------------------------------
        //箭头函数演示
        var  arr = [3, 6, 9];
        //遍历数组 以前写法
        var  newArr = arr.map(function (item) {
          return item + 2;
        })
        console.log(newArr);
    
        // ES6箭头函数 遍历数组  当表达式只有一行时可以 直接=>接表达式。否则要用{}包着
        var  newArr1 = arr.map((item)=>item+2);
        console.log("newArr1:"+ newArr1);
    
        `;
        printLog(str);
        //数组的解构
        var [a,b,c] = [3,8,10]; //数组的分解
    
        var [x,y,z] = "Vue";  //字符串的分解
        console.log(`x:${x},y:${y},z:${z}`);
    
        var {m,n} = {m:3,n:4};  //对象的解构，对key进行拆分 (m和n的顺序不同也可以)
        console.log(`m:${m},n:${n}`);
    
        //函数解构
        function sum([x,y]) {
          return x + y;
        }
    
        var  total = sum([2,8]);
        console.log(`total:${total}`);
        
        function printLog(str) {
          document.getElementById("log").innerText = str;
        }
      </script>
    
    </body>
    </html>
    
### **注意：**
- const 声明的普通变量将会是常量，它的值不能改变，如果用 const 声明一个对象类型，那么他的指针或者说是内存地址是常量，具体的属性值可以改变
- 模板语言用的不是单引号‘ ’，而是esc下面的反引号 ` 
- {} 块级作用域。var 有变量提升的作用；let 没有变量提升的作用 是块级变量；var 函数级作用域，在函数中有效； let const 块级作用域，大括号中有效，不提升， const 定义常量，就不可以修改。 const 声明的内存中的数据不能修改，基本数据，则值不可改变，对象，则指向的对象不可改变。 var 会造成内存泄漏，建议使用let声明变量。 模板语言中输出变量名 ·膜拜语言+${变量名}· 膜拜语言可以不可以引入函数结果 声明函数的默认参数。
- ES6 的写法
    - 自定义函数  `xxx() {...}`
    - 回调函数 `(parameter)=> {...}`
- 非ES6的写法
    - 自定义函数 `function xxx() {...}`
    - 回调函数  `function (parameter) {...}`
    
## 5-3 拓展参数讲解
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/cW3M11.jpg)

`demo/ES6-2.html`:

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>ES6-2Demo演示</title>
    
    </head>
    <body>
      <h2>ES6-2Demo演示</h2>
      <script>
        function sum(x,y,z) {
          let total = 0;
          if (x) total += x;
          if (y) total += y;
          if (z) total += z;
          console.log(`total:${total}`);
        }
        sum(2,"",8);
    
        function sum2(...m) { //动态参数三个点
          let total2 = 0;
          for (var i of m) {
            total2 += i;
          }
          console.log(`total2:${total2}`);  //total2:12
        }
        sum2(2,2,4,4);
    
        //ES6写法
        let  sum3 = (...m)=>{
          let total2 = 0;
          for (var i of m) {
            total2 += i;
          }
          console.log(`total3:${total2}`); //total3:12
        };
        sum3(2,2,4,4);
    
        //数组扩展
        var [x,y] = [4,8];
        console.log(...[4,7]); //4 7
    
        var arr1 = [1,3]; var arr2 = [4,5];
        console.log("concat:"+arr1.concat(arr2)); //concat:1,3,4,5
        console.log("concat2:"+[...arr1,...arr2]); //concat2:1,3,4,5
    
        var [e,...f] = [2,3,4,5];
        console.log("f:"+f); //f:3,4,5
    
        let [a,b,c] = "ES6";
        console.log(`a:${a},b:${b},c:${c}`); //a:E,b:S,c:6
    
        let xy = [..."ES6"];
        console.log(`xy:${xy}`);//xy:E,S,6
      </script>
    </body>
    </html>


### **注意：**
- ...运算符 
    - 1） ...和参数一起代表动态参数，不确定传参个数可使用...代替；
    - 2） ...和数组一起，会拆解数组成每单个元素；
    - 3） ...三个点和数组一起解构，将代表动态数组； 
    - 4） ...和字符串一起，将拆解字符串
- ...进行数据合并 `var sum=[...arr1,...arr2]`
- 数组的遍历另一种方式是通过 of 语法 例子： `for(var i of array){}` 与`java`中`for each`等价

## 5-4 Promise讲解

`demo/Promise.js`:

    let checkLogin = function () {
      return new Promise(function (resolve,reject) {
        let  falg = document.cookie.indexOf("userId")> -1? true: false;
        if (falg = true) {
          resolve({
            satatus:0,
            result:true
          })
        }else  {
          reject("error");
        }
      })
    };
    
    let getUserInfo = ()=>{
      return new Promise((resolve,reject)=>{
        let  userInfo = {
          userId: "101"
        }
        resolve(userInfo);
      });
    };
    
    checkLogin().then((res)=>{
      if (res.satatus == 0) {
        console.log("login success")
        return getUserInfo();
      }
    }).catch((error)=>{
      console.log(`errs:${error}`)
    }).then((res2)=>{
      console.log(`userId:${res2.userId}`); //userId:101
    })
    
    Promise.all([checkLogin(),getUserInfo()]).then(([res1,res2])=>{
      console.log(`res1:${res1.satatus} ; res2:${res2.userId}`); //res1:0 ; res2:101
    
    })
    

直接写在 HTML 中会报错 ES6 语法错误,故采取引用js文件:
`Promise.html`：

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Promise</title>
        <script src="Promise.js"></script>
    </head>
    <body>
    </body>
    </html>

## 5-5 ES6模块化开发讲解

代码演示 import 和 export

`main.js`:

    // The Vue build version to load with the `import` command
    // (runtime-only or standalone) has been set in webpack.base.conf with an alias.
    import Vue from 'vue'
    import App from './App'
    import {router} from './router' //等同于下面一行
    // import {router} from {router:router}
    
    // import {sum,minus} from './util' //或者如下 minus和sum封装在util中
    import * as util from './util'
    
    Vue.config.productionTip = false
    
    //切换到工作空间。 cnpm run dev
    // console.log(`sum:${sum(1,7)}`); //sum:8
    // console.log(`minus:${minus(8,1)}`); //minus:7  //或者如下
    console.log(`sum:${util.sum(1,7)}`); //sum:8
    console.log(`minus:${util.minus(8,1)}`); //minus:7
    
    /* eslint-disable no-new */
    new Vue({
      // el: '#app',
      router,
      template: '<App/>',
      components: { App }
      // render: function (h) {
      //   return h(App);
      // }  //等同于上面两行
    }).$mount("#app"); // .$mount("#app")挂载 和 el：的效果是一样的

`util.js`:

    export let sum = (x,y)=> {
      return x + y;
    }
    
    export let minus = (m,n)=> {
      return m - n;
    }

### **说明:**
-  三种挂载方式：
    -   1）通过el属性设置挂载对象选择器 
    -   2）通过`$mount（'选择器'）`挂载
    -   3）通过底层封装的render方法
- `export let router = new Router({XXXXX})` 
    
        import {router} from './router' //等同于下面一行
        // import {router} from {router:router}
        
- 在使用过程中可以通过`import`函数进行异步加载`js`文件。 实际上`import`并不是异步加载，是按需加载，通过`import`可以实现按需加载。如:`import(文件地址)`

### **优秀问答：**
- **问：** 想问一下为什么我们在`<script>`中使用`export default`呢，比如

        export default {
            props: {
        ......

    这样，一个子组件肯定是包括前面的`template`的，那为什么不从`template`前面开始`export default`，而是在`<script>`下开始`export default`
    
    - **答:** 这个问题问得很好，但是你忽略了一个问题，这是一个`.vue`文件，不是一个`js`文件，这种格式`Vue`和`es6`根本不认识，它需要通过`Vue-loader`进行加载解析，实际上`Vue loader`底层会按照你说的格式进行封装，最后扔给`Vue`解析。

## 5-6 AMD、CMD、CommonJS和ES6差异
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/M2uXYA.jpg)
![](https://ws4.sinaimg.cn/large/006tNc79gy1fkd01unwwoj310m0na0v5.jpg)
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/4H04bK.jpg)
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/uubCWY.jpg)

- **AMD：**是`requirejs`在推广过程中对模块定义的规范化产出(异步模块) 特点：依赖前置,异步
- **CMD：**是`seajs`在推广过程中对模块定义的规范化产出（同步模块） 特点：依赖就近，在什么时候使用就在时候时候引入
- **Commonjs：**`nodejs`在推广过程中对模块定义的规范


# 第6章 商品列表模块实现
## 6-1 商品列表组件拆分

    <template>
    	<div>
        <nav-header></nav-header>
        <nav-bread>
          <span>Goods</span>
        </nav-bread>
        <div class="accessory-result-page accessory-page">
          <div class="container">
            <div class="filter-nav">
              <span class="sortby">Sort by:</span>
              <a href="javascript:void(0)" class="default cur">Default</a>
              <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
              <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
            </div>
            <div class="accessory-result">
              <!-- filter -->
              <div class="filter stopPop" id="filter">
                <dl class="filter-price">
                  <dt>Price:</dt>
                  <dd><a href="javascript:void(0)">All</a></dd>
                  <dd>
                    <a href="javascript:void(0)">0 - 100</a>
                  </dd>
    
                </dl>
              </div>
    
              <!-- search result accessories list -->
              <div class="accessory-list-wrap">
                <div class="accessory-list col-4">
                  <ul>
                    <li>
                      <div class="pic">
                        <a href="#"><img src="static/1.jpg" alt=""></a>
                      </div>
                      <div class="main">
                        <div class="name">XX</div>
                        <div class="price">999</div>
                        <div class="btn-area">
                          <a href="javascript:;" class="btn btn--m">加入购物车</a>
                        </div>
                      </div>
                    </li>
    
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <nav-footer></nav-footer>
    	</div>
    </template>
    
    <style >
    </style>
    
    <script >
      import './../assets/css/base.css'
      import './../assets/css/product.css'
      import NavHeader from './NavHeader.vue'
      import NavFooter from './NavFooter.vue'
      import NavBread from './NavBread.vue'
    
      export default {
    		data (){
    			return {
    				msg:'hello Vue!'
    			}
    		},
        components:{
    		  NavHeader,
          NavFooter,
          NavBread
        }
    	}
    </script>


### **说明：**
- **组件拆分:** 将主项目拆分成多个组件：`NavBread.vue`、`NavFooter.vue`、`NavHeader.vue`。
    
    其中的类似 `<nav-header></nav-header>`就是引用组件
-  `assets`里面的静态资源往往作用于组件，而`static`则考虑资源本身。比如`assets`里面的`img`通过`webpack`打包时文件过小就会转换为`base64`的形式，而`static`里面的`img`不会
-  `slot`插槽可能会经常使用到，详细可参考官网文档，简单说组件和页面都通过组件用`slot`标签、页面用`slot`属性的方式呼应，给`slot`标签赋上`name`属性,再在页面中给`slot`属性赋上对应的值，可区分多个的情况

## 6-2 商品列表数据渲染实现
`GoodList.vue`

    <template>
    	<div>
        <nav-header></nav-header>
        <nav-bread>
          <span>Goods</span>
        </nav-bread>
        <div class="accessory-result-page accessory-page">
          <div class="container">
            <div class="filter-nav">
              <span class="sortby">Sort by:</span>
              <a href="javascript:void(0)" class="default cur">Default</a>
              <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
              <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
            </div>
            <div class="accessory-result">
              <!-- filter -->
              <div class="filter stopPop" id="filter">
                <dl class="filter-price">
                  <dt>Price:</dt>
                  <dd><a href="javascript:void(0)">All</a></dd>
                  <dd>
                    <a href="javascript:void(0)">0 - 100</a>
                  </dd>
    
                </dl>
              </div>
    
              <!-- search result accessories list -->
              <div class="accessory-list-wrap">
                <div class="accessory-list col-4">
                  <ul>
                    <li v-for="(item,index) in goodslist">
                      <div class="pic">
                        <a href="#"><img v-bind:src="'static/' + item.productImg" alt=""></a>
                      </div>
                      <div class="main">
                        <div class="name">{{item.productName}}</div>
                        <div class="price">{{item.productPrice}}</div>
                        <div class="btn-area">
                          <a href="javascript:;" class="btn btn--m">加入购物车</a>
                        </div>
                      </div>
                    </li>
    
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <nav-footer></nav-footer>
    	</div>
    </template>
    
    <style >
    </style>
    
    <script >
      import './../assets/css/base.css'
      import './../assets/css/product.css'
      import NavHeader from './NavHeader.vue'
      import NavFooter from './NavFooter.vue'
      import NavBread from './NavBread.vue'
      import axios from 'axios'
    
    
      export default {
    		data (){
    			return {
    				goodslist:[]
    			}
    		},
        components:{
    		  NavHeader,
          NavFooter,
          NavBread
        },
        mounted:function () {
            this.getGoodsList();
        },
        methods:{
            getGoodsList:function () {
                axios.get("/goods").then((result)=>{
                  var  res = result.data;
                  this.goodslist = res.result;
                })
            }
        }
    	}
    </script>



`dev-server.js`新增:

    var app = express()
            .
            .
            .
    var router = express.Router();
    var  goodsData = require('./../mock/goods.json');
    
    router.get("/goods",function (req,res,next) {
        res.json(goodsData);
    });
    app.use(router);
            .
            .
            .
    var compiler = webpack(webpackConfig)
    

### **说明：**
- **问：**前面那节讲`AMD`、`CMD`、`commonJS`的时候，提到了`require`的写法，本章这里的`require`属于哪一种用法呢，在`node`里面，是`commonJS`吗？但是`json`文件没有`model.export`导出，不太明白
    - **答:** `var goodsData = require(...)` `Node`加载`js`必须是`common`规范，否则拿不到数据。它不仅仅可以抓取`js`，也可以加载`json`等等格式的文件，加载非`js`后缀的文件时则直接缓存到内存中。它不同于`js`文件

## 6-3 实现图片懒加载
`GoodsList.vue`

    <template>
    	<div>
        <nav-header></nav-header>
        <nav-bread>
          <span>Goods</span>
        </nav-bread>
        <div class="accessory-result-page accessory-page">
          <div class="container">
            <div class="filter-nav">
              <span class="sortby">Sort by:</span>
              <a href="javascript:void(0)" class="default cur">Default</a>
              <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
              <a href="javascript:void(0)" class="filterby stopPop" v-on:click="showFilerPop">Filter by</a>
            </div>
            <div class="accessory-result">
              <!-- filter -->
              <div class="filter stopPop" id="filter" v-lazy="{'filterby-show':filerBy}">
                <dl class="filter-price">
                  <dt>Price:</dt>
                  <dd><a href="javascript:void(0)" :class="{'cur':priceCheck=='all'}" @click="setPriceCheck('all')">All</a></dd>
                  <dd v-for="(price,index) in priceFilter">
                    <a href="javascript:void(0)" @click="setPriceCheck(index)" :class="{'cur':priceCheck == index}">{{price.startPrice}} - {{price.endPrice}}</a>
                  </dd>
    
                </dl>
              </div>
    
              <!-- search result accessories list -->
              <div class="accessory-list-wrap">
                <div class="accessory-list col-4">
                  <ul>
                    <li v-for="(item,index) in goodslist">
                      <div class="pic">
                        <a href="#"><img v-bind:src="'static/' + item.productImg" alt=""></a>
                      </div>
                      <div class="main">
                        <div class="name">{{item.productName}}</div>
                        <div class="price">{{item.productPrice}}</div>
                        <div class="btn-area">
                          <a href="javascript:;" class="btn btn--m">加入购物车</a>
                        </div>
                      </div>
                    </li>
    
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
        <nav-footer></nav-footer>
    	</div>
    </template>
    
    <style >
    </style>
    
    <script >
      import './../assets/css/base.css'
      import './../assets/css/product.css'
      import NavHeader from './NavHeader.vue'
      import NavFooter from './NavFooter.vue'
      import NavBread from './NavBread.vue'
      import axios from 'axios'
    
    
      export default {
    		data (){
    			return {
    				goodslist:[],
            priceFilter:[
              {
                startPrice:'0.00',
                endPrice:'500.00'
              },
              {
                startPrice:'500.00',
                endPrice:'1000.00'
              },
              {
                startPrice:'1000.00',
                endPrice:'2000.00'
              },
            ],
            priceCheck:'all',   //价格选中的状态
            filerBy:false,      //小屏幕价格菜单显示
            overLayFlag:false   //遮罩显示
    
    			}
    		},
        components:{
    		  NavHeader,
          NavFooter,
          NavBread
        },
        mounted:function () {
            this.getGoodsList();
        },
        methods:{
            getGoodsList:function () {
                axios.get("/goods").then((result)=>{
                  var  res = result.data;
                  this.goodslist = res.result;
                })
            },
            showFilerPop() {
               this.filerBy = true;
               this.overLayFlag = true;
    
            },
            closePop(){
              this.filerBy = false;
              this.overLayFlag = false;
            },
            setPriceCheck(index){
               this.priceCheck = index;
               this.closePop();
            }
        }
    	}
    </script>

`main.js`中新增懒加载插件：

    import VueLazyLoad from 'vue-lazyload'
    
    Vue.use(VueLazyLoad,{
      loading:"/static/loading-svg/loading-bars.svg"
    })









