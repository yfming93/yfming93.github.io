---
layout:     	post
title:       "Vue2.0+Node.js+MongoDB全栈打造商城系统（1—4章）"
date:     	2017-10-04
author:     	"袁凤鸣"
categories:  vue
tags: 
    vue
mathjax: true
---

* content
{:toc}




# Vue2.0+Node.js+MongoDB全栈打造商城系统（1—4章）
用前端技术开发的商城整站
项目已部署上线，你可抢先体验：[http://imooc.51purse.com/](http://imooc.51purse.com/)
收费项目介绍：[http://coding.imooc.com/class/113.html](http://coding.imooc.com/class/113.html)

# 1-1 课程-导学
- #### 课程安排:

    -  前两章主要介绍 Vue 基础知识
    -  第三、四章主要介绍 VueRouter 和 VueResource已经Axios
    -  第五章主要介绍 ES6 常用语法知识
    -  第六到十四章主要基于实战项目开发
    -  第十五章主要介绍webpack使用
    -  第十七章主要介绍线上部署
    
- #### 课程收获:
    - Vue 全家桶知识
    - 掌握 Vue 的 SPA应用开发
    - 掌握 ES6 知识
    - 掌握 Node+Express 的后端接口开发
    - 掌握 MongoDB 等数据库知识
    - 掌握 Vue+Node项目的线上部署

- #### 前置知识：
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/NKu7eJ.jpg)

- **项目架构：**
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/2LWZa8.jpg)

 
# 1-2 前端框架回顾
- **传统MVC框架特点：**
    - 1.`Model`和`View`解耦 
    - 2.`Controller`控制`DOM`
    -  3.完全照搬`MVC`模式 
- **基于MV*框架特点：**
    - 1.`Model`绑定`View` 
    - 2.没有控制器概念 
    - 3.数据驱动，状态管理
    
# 1-3 vue概况以及核心思想
## 1-3-1 Vue介绍:
Vue本身并不是一个框架，但结合周边生态构成一个灵活的、渐进式的框架 Vue核心思想：1.数据驱动 2.组件化

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/xH2U2A.jpg)

**vue发展历程：** 

- 1、2013年作为尤雨溪个人实验项目开始开发 
- 2、2014年2月公开发布 
- 3、2014年11月发布0.11版本 
- 4、截至目前版本：`vue 0.11`、`vue 1.0`、`vue2.0`

## 1-3-2 Vue实现双向数据绑定核心思想
`vue`数据双向绑定的原理，利用`Object.defineProperty()`方法，这个方法是给对象添加属性，并且它自身包含`get`和`set`两个`api`。通过`keyup`事件，改变`userName`属性的值去触发它的`set`方法

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
    </head>
    <body>
    <input type="text" id="userName">
    <br>
    <span id="uName"></span>
    <script>
        var obj = {
            pwd:"123456"
        };
        Object.defineProperty(obj,"userName",{
            get:function () {
                console.log("log get init");
            },
            set:function (val) {
                console.log("log set init");
                document.getElementById("uName").innerText = val;
                document.getElementById("userName").value = val;
            }
        });
        document.getElementById("userName").addEventListener("keyup",function (envet) {
            document.getElementById("uName").innerText = envet.target.value;
        })
    </script>
    </body>
    </html>
    
    

# 1-4 vue框架优缺点对比
- **Vue和React不同点：** 
    - **1）Vue：**
        - 1.模板和渲染函数的弹性选择 
        - 2.简单的语法及项目创建 
        - 3.更快的选软速度和更小的体积 
    - **2）React：**
        - 1.更适用于大型应用和更好的可测试性
        - 2.同时适用于Web端和原生App 
        - 3.更大的生态圈带来的跟多支持和工具
    - **Vue和React相同点：**
        -  1.利用虚拟DOM实现快速渲染 
        -  2.轻量级 
        -  3.响应式组件 
        -  4.服务器端渲染 
        -  5.易于集成路由工具，打包工具以及状态管理工具 
        -  6.优秀的支持和社区
        
# 2-1 nodejs和npm的安装和环境搭建
**Webpack：**代码模块化构建打包工具 
**Gulp：**基于流的自动化构建工具 
**Grunt：**`Javascript`世界的构建工具 
**Babel：**使用最新的规范来编写`js` 
**Vue：**构建数据驱动的`web`界面的渐进式框架 
**Express：**基于`Node.js`平台，快速，开放，极简的`web`开发框架

- **npm 指令：**
    - **升级npm：** `npm install -g npm`  
    - **查看安装的目录：**`npm list`
    - **node 运行js文件：**`node` 文件名
    - **vue 安装：** `npm i vue --save`
    - **npm安装目录**：`/usr/local/lib/node_modules`
    - **查看npm安装路径**：`npm root -g`
- **cnpm安装：**
    `npm install -g cnpm --registry=https://registry.npm.taobao.org`
    参考 [npm淘宝镜像](http://npm.taobao.org/)

# 2-2 vue环境搭建以及vue-cli使用
最简单的`Vue`实例：

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
        <!--在线引用Vuejs如下：-->
        <!--<script src="https://vuejs.org/js/vue.js"></script>-->
        <!--本地安装后引用Vuejs-->
        <script src="node_modules/vue/dist/vue.min.js"></script>    
    </head>
    <body>
        <div id="app">
            <span>{{message}}</span>
        </div>
        <script>
            new Vue ({
                el:"#app",
                data:{
                    message:"hello, Vue!"
                }
            });
        </script>
    </body>
    </html>

- **全局安装 Vue-cli ：** `cnpm i vue-cli -g`
- #### 初始化 webpack-simple 项目 ：
    利用 Vue 初始化一个简单的 webpack 项目 ：
    `vue init webpack-simple demo5`
**注意:** 项目名称必须小写

        MingodeMacBook-Pro:vueMall Mingo$ vue init webpack-simple demo5
        
        ? Project name demo5
        ? Project description A Vue.js project
        ? Author 袁凤鸣 <yfmingo@163.com>
        ? Use sass? No
        
           vue-cli · Generated "demo5".
        
           To get started:
           
             cd demo5
             npm install
             npm run dev.
        
        MingodeMacBook-Pro:vueMall Mingo$ 

**说明：**其中生成的 `.babelrc`文件是`ES6`编译插件配置。

- #### 初始化一个 webpack 项目：
`vue init webpack demo6`
    代码如下：
    
        MingodeMacBook-Pro:demo6 Mingo$ vue init webpack demo6
        
        ? Project name demo6
        ? Project description A Vue.js project
        ? Author 袁凤鸣 <yfmingo@163.com>
        ? Vue build standalone
        ? Install vue-router? Yes
        ? Use ESLint to lint your code? No
        ? Setup unit tests with Karma + Mocha? No
        ? Setup e2e tests with Nightwatch? No
        
           vue-cli · Generated "demo6".
        
           To get started:
           
             cd demo6
             npm install
             npm run dev
           
           Documentation can be found at https://vuejs-templates.github.io/webpack
           
    
    **以上说明：** 
    `? Install vue-router?`：是否需要路由
    `? Use ESLint to lint your code?`是否需要 `ESLint`（语法检查），刚开始入门建议不需要
    `? Setup unit tests with Karma + Mocha? `是否需要单元测试
    `? Setup e2e tests with Nightwatch?`是否需要端到端测试
    

通过`vue init webpack-simple demo`创建项目:
`src`是项目源码，`.babelrc`编译`ES6`插件的配置，`readme.md`说明文件，`webpack.config`配置。

**要运行项目，首先`cnpm i` 下载依赖的插件，第二步`cnpm run dev`**

# 2-3 vue配置（上）
**build**打包配置文件所在的文件夹，**config**是`webpack`对应的配置，**src**是开发项目的源码，**App.vue**是入口组件，**main.js**项目入口文件，**static**资源文件件，**babelrc**是`ES6`解析的配置，**postcssrc**是`html`添加前缀的配置，**dependencies**是项目依赖库，**devDependencies**是开发依赖库，**devDependencies**在打包的时候需要，打包后就没有了

`package.json`中的`script`是`shell`脚本命令，做`spa`开发只需要关注几个页面:
 **build/webpack.base.conf.js**打包核心配置 **config/index.js**其实可以和`build/webpack.base.conf.j`s合并成一个，但是`spa`想做一个清晰的架构，所以拆开了 以上两个核心关注，其他都是辅助关系 初学者都要有个初步认识
 
 **build/build.js**构建生产版本，项目开发完成，使用这个打生产包
 **var config = require('../config')** `require`一个文件夹，会默认加载里面的`index.js`文件，这个写的时候是可以省略，也是相当于`=require('../config/index.js')`。但如果是里面的非`index.js`文件，`require`时则不可省略。
# 2-4 vue配置（下）
[https://www.npmjs.com/package](https://www.npmjs.com/package[]()) 将npm安装的插件放在这个网址后面就可以看到插件的对应信息，例如 [https://www.npmjs.com/package/vue](https://www.npmjs.com/package/vue)
# 2-5 vue基础语法

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/L6AbSu.jpg)

- **v-bind:class="{ active: isActive }"**  这里`active`是类名，`isActive`是`true`或者`false`
- **v-bind:class="[activeClass,errorClass]"** 这里`activeClass`,`errorClass`是2个变量，具体的类名在`data`中定义
    
    ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/7xDXRD.jpg)
- **v-cloak** 的作用是防止页面刷新太快，部分页面没有刷新出来，`v-cloak`可以进行隐
- **.stop** 阻止冒泡，**.prevent** 阻止默认事件，**.self** 只给本身绑定事件（如果有子元素，点击子元素没有作用），**.once** 只给事件绑定一次

    ![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/neKvwm.jpg)

- #### 父子组件通讯-数据传输
    - 组件往父组件传输。 通过`this.$emit("incre")`自定义了一个`incre`事件，在父组件中绑定`@incre="increment"`，而`increment`这个方法是写在父组件中的。也就是说父组件绑定了子组件的事件来控制父组件的方法来操作父组件的元素
    - 子组件操作父组件数据。通过给父组件绑定自定义事件，子组件方法中使用 **this.$emit(自定义事件名)**（此方法相当于`jquery`里面的`trigger`）来执行父组件的函数，从而改变父组件数据。 如果想要子组件传值给父组件，通过  **this.$emit('自定义事件名','想传的值'）**传递给父组件，父组件的该自定义事件回调方法的入参，即为你想传递的值。
    - 父组件往子组件传递参数，父组件中定义好，子组件使用**props:["num"]**来接受，`props`必须为数组
- **v-on:click.self** 阻止事件代理； **v-on:click.once** 只生效一次 `vue`的核心思想：数据驱动，组件开发。 在`webpack.base.config`配置后，引入`.vue`文件，可以省略`.vue` **this.$emit('chuandi')** 父组件可以监听到子组件的`chuandi`事件 **methods:{ incre(){} }**
- **v-if** 如果不渲染，整个`dom`都没有，**v-show** 只是`display:none`


# 3-1 路由基础介绍
- 单页面没法缓存和记住滚动条位置，浏览器前进后退都是重新加载。
- **router-link** 就当做a标签使用，**router-view** 是跳转后渲染的位置
- 请问这么做版本号控制？
    - 实际上单页面应用只输出一个html一个js，每次如果内容变动了，就会产生对应的hash值加在文件的里面，hash就相当于文件的版本。
- 想问个问题，C组件为A B两组件的共用的子组件，这个时候如果我在A页面中的C组件触发事件，如果A B两个父组件和C组件的通信规则是一样的，是不是B组件也能同时接收到相同的事件？
    - 不能，你当前页面是A组件，加载了C组件，那么C组件内部事件触发，可以通过emit传递到A组件，这个时候B组件并没有加载，相当于B组件根本就没有初始化，所以不会同时触发B组件。
- 表单都有下拉框，下拉框的选项在另一页，然后跳转过去的时候这边表单都清空了，通常有什么方法？实在不行是不是就要用模态框的形式
    - 这是两个页面之间的交互了，最后做成组件来实现，这样父子组件可以通信

# 3-2 动态路由匹配
- `components`文件夹一般放复用的组件，同时可以新建一个 `views` 放单独的页面
- 组件有且只有一个根元素
- 路由模式可配置，默认`hash`，路由带`#`号，改为`history`后，可去掉`#`号，表现为常见的路由形式
- 在`router`文件夹下的`index.js`修改路由 `src`里的`views`文件夹放页面，里面也是.vue结尾的文件，本质上一样的。 `router`里面配置默认渲染的组件，可以修改让它加载其他页面，`@`被配置成了一个别名，映射到了`src`文件夹目录 **{{$route.params.goodsId}}**拿到路径`path:'/goods/:goodsId'`,中的参数 **{{$route.params.name}}**`path: '/goods/:goodsId/user/:name'`, 路由是对`history`的封装 路由模式有`mode:'history' `和 `mode:'hash'`两种

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/R1SrVE.jpg)
演示代码：

`index.js` ：

    import Vue from 'vue'
    import Router from 'vue-router'
    import GoodsList from './../views/GoodsList'
    
    Vue.use(Router)
    
    export default new Router({
    	mode:'history',
      routes: [
        {
          path: '/goods/:goodsId/user/:name',
          name: 'GoodsList',
          component: GoodsList
        }
      ]
    })

`GoodsList.vue :`

    <template>
    	<div>
    		这个商品列表页面
    		<span>{{$route.params.goodsId}}</span><br>
    		<span>{{$route.params.name}}</span>
    	</div>
    </template>
    
    <style >
    </style>
    
    <script >
    	export default {	
    		data (){
    			return {
    				msg:'hello Vue!'
    			}
    		}
    	}
    </script>

# 3-3 嵌套路由
- **使用场景：**主菜单中嵌套子菜单，点击各个子菜单显示各个区域。
    - 打开了用户信息页面。用户信息左边有个菜单，分为用户的基本信息和用户的教育方式等等资料信息。有很多菜单，这些菜单不需要页面进行刷新。这样可以在用户信息页面做两个嵌套子路由。这样形成嵌套路由。

- `import Vue from 'vue' `是es6的语法，用来导入模块 `webpach`里的别名配置：`@`: `resolve('src')  `其中`@`就代表了`src`文件夹的绝对路径 用`children:[{},{}]`的方式定义子组件 

演示代码：
`GoodsList.vue`中代码：

    <template>
    	<div>
    		这个商品列表页面
    		<span>{{$route.params.goodsId}}</span><br>
    		<span>{{$route.params.name}}</span>
    		<router-link to="/goods/Title">显示商品标题</router-link>
    		<router-link to="/goods/Img">显示商品图片</router-link>
    		<div>
    			<router-view> </router-view>
    		</div>
    	</div>
    </template>
    
    <style >
    </style>
    
    <script >
    	export default {	
    		data (){
    			return {
    				msg:'hello Vue!'
    			}
    		}
    	}
    </script>
**特别注意：** `<router-link to="/goods/Title">`中的 to 地址不要写错了 。to 地址一定写绝对地址（就是子路由最终会映射到的地址）

其demo中 `Title.vue ` 和 `Image.vue` 一样只是文字不同：

    <template>
    	<div>
    		这里是商品标题子组件
    	</div>
    </template>
    
    <style >
    </style>
    
    <script >
    	export default {	
    		data (){
    			return {
    				msg:'hello Vue!'
    			}
    		}
    	}
    </script>

# 3-4 编程式路由
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/WjnWJF.jpg)

编程路由常用方式方法总结（附已知路由间切换的2个方式）：

-  ①.**router-link to="/cart"** 通过a链接的形式，进行跳转。
-  ②.绑定点击事件，**jump(){ this.$router.push("/cart") }**

代码演示:
`GoodsList.vue`中：

    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Title</title>
      <!-- 最新版本的 Bootstrap 核心 CSS 文件 -->
      <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
      <script src="node_modules/vue/dist/vue.js"></script>
      <script src="node_modules/vue-resource/dist/vue-resource.js"></script>
    </head>
    
    <body>
      <div id="app" class="container">
        <h1>vue-resource插件请求讲解</h1>
        <a href="javascript:;" class="btn btn-primary" v-on:click="get">Get请求</a>
        <a href="javascript:;" class="btn btn-primary">Post请求</a>
        <a href="javascript:;" class="btn btn-primary">JSONP请求</a>
        <div>
          <span>{{msg}}</span>
        </div>
      </div>
      <script>
        new Vue ({
          el:"#app",
          data:{
            msg:""
          },
          methods:{
            get:function () {
              this.$http.get("package1.json",{
                params:{
                  userId:"101"
                },
                headers:{
                  token:"abcd"
                }
              }).then(res=>{
                this.msg = res.data;
              },error=>{
                this.msg = error;
              });
            }
          }
        });
      </script>
    
    </body>
    </html>


# 3-5 命名路由和命名视图
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/5e21em.jpg)

- **app.vue**是路由的根文件
- 动态路由参数：**$route.params.xxx** 
- 页面之间路由参数:**$route.query.xxx**
- 只写 **to** 相当于后面赋的是一个运算好的值，而在 **to** 前加上**v-bind:**或者只加上“`:`”这是会对等号后面的值先运算编译再赋值

代码演示:
`app.vue`中代码:

    <template>
      <div id="app">
        <img src="./assets/logo.png">
        <router-view class="main"></router-view>
        <router-view class="left" name="title"></router-view>
        <router-view class="right" name="img"></router-view>
    
      </div>
    </template>
    
    <script>
    export default {
      name: 'app'
    }
    </script>
    
    <style>
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      margin-top: 60px;
    }
      .left,.right {
        float: left;
        width: 49%;
        border: 1px solid gray;
      }
    </style>

`GoodsList.vue`中代码:

    <template>
    	<div>
    		这个商品列表页面
    		<span>{{$route.params.goodsId}}</span><br>
    		<span>{{$route.params.name}}</span>
    		<router-link to="/goods/Title">显示商品标题</router-link>
    		<router-link to="/goods/Img">显示商品图片</router-link>
    		<div>
    			<router-view> </router-view>
    		</div>
    		<!-- 带参数的命名路由 -->
    		<router-link v-bind:to="{name:'cart',params:{cartId:123}}">跳转到购物车页面</router-link>
    		
    	</div>
    </template>
    
    <style >
    </style>
    
    <script >
    	export default {	
    		data (){
    			return {
    				msg:'hello Vue!'
    			}
    		},
    		methods:{
    			jump(){
    				// this.$router.push("/cart")
    				this.$router.push({path:'/cart?goodsId=123'})
    				// this.$router.go(-2) //后退两步
    			}
    		}
    	}
    </script>


# 4-1 Vue-Resource使用（上）
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/twit8U.jpg)

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/CB79pL.jpg)

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/CRldjn.jpg)

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/PAWjY3.jpg)

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/HRagJ1.jpg)

### Get、Post、JsonP 、配置http参数  四种请求演示：
`vue-resource.html`中代码:

    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Title</title>
      <!-- 最新版本的 Bootstrap 核心 CSS 文件 -->
      <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
      <script src="node_modules/vue/dist/vue.js"></script>
      <script src="node_modules/vue-resource/dist/vue-resource.js"></script>
    </head>
    
    <body>
      <div id="app" class="container">
        <h1>vue-resource插件请求讲解</h1>
        <a href="javascript:;" class="btn btn-primary" v-on:click="get">Get请求</a>
        <a href="javascript:;" class="btn btn-primary" v-on:click="post">Post请求</a>
        <a href="javascript:;" class="btn btn-primary" v-on:click="jsonp">JSONP请求</a>
        <a href="javascript:;" class="btn btn-primary" v-on:click="http">http配置参数请求</a>
    
        <div>
          <span>{{msg}}</span>
        </div>
      </div>
      <script>
        new Vue ({
          el:"#app",
          data:{
            msg:""
          },
          mounted:function () {
    //        全局拦截器处理。可以拦截请求前和请求后的事件。可用在请求前加loding HUD
            Vue.http.interceptors.push(function (request,next) {
              console.log("request init");
              next(function (respose) {
                console.log("respose init");
                return respose;
              });
    
            });
          },
          http:{
    //        root:"这里面可以放主域名头地址"
          },
          methods:{
            get:function () {
              this.$http.get("package.json",{
                params:{
                  userId:"101"
                },
                headers:{
                  token:"abcd"
                }
              }).then(res=>{
                this.msg = res.data;
              },error=>{
                this.msg = error;s
              });
            },
            post:function () {
              this.$http.post("package.json",{
                userId:"102"
              },{
                headers:{
                  access_token:"abd"
                }
              }).then(res=>{
                this.msg = res.data;
              },error=>{
                this.msg = error;
              })
            },
            jsonp:function () {
              this.$http.jsonp("http://www.imooc.com/course/AjaxCourseMembers?ids=796").then(res=>{
                this.msg = res.data;
              })
            },
            http:function () {
              this.$http({
                url:"package.json",
                method:"GET",
                params:{
                  userId:"103"
                },
                headers:{
                  token:"abc123"
                },
                timeout:50,
                before:function () {
                  console.log("before init")
                }
              }).then(function (res) {
                this.msg = res.data;
              });
            }
          }
        });
      </script>
    </body>
    </html>



**Get调试结果：**

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/xJh3k4.jpg)

**Post调试结果：**
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/3tp6Md.jpg)

**JsonP调试结果：**

- jsonp: 跨域请求

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/VxFGX0.jpg) 

**http配置参数请求调试结果：**
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/bqD7b2.jpg)



# 4-2 Vue-Resource使用（下）
**全局拦截器使用：可以拦截请求前后的事件。一般正在加载loading HUD 需要用。**

**演示代码:**

    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Title</title>
      <!-- 最新版本的 Bootstrap 核心 CSS 文件 -->
      <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
      <script src="node_modules/vue/dist/vue.js"></script>
      <script src="node_modules/vue-resource/dist/vue-resource.js"></script>
    </head>
    
    <body>
      <div id="app" class="container">
        <h1>vue-resource插件请求讲解</h1>
        <a href="javascript:;" class="btn btn-primary" v-on:click="get">Get请求</a>
        <a href="javascript:;" class="btn btn-primary" v-on:click="post">Post请求</a>
        <a href="javascript:;" class="btn btn-primary" v-on:click="jsonp">JSONP请求</a>
        <div>
          <span>{{msg}}</span>
        </div>
      </div>
      <script>
        new Vue ({
          el:"#app",
          data:{
            msg:""
          },
          mounted:function () {
    //        全局拦截器处理。可以拦截请求前和请求后的事件。可用在请求前加loding HUD
            Vue.http.interceptors.push(function (request,next) {
              console.log("request init");
              next(function (respose) {
                console.log("respose init");
                return respose;
              });
    
            });
          },
          http:{
    //        root:"这里面可以放主域名头地址，做到提取接口主域名的作用"
          },
          methods:{
            get:function () {
              this.$http.get("package.json",{
                params:{
                  userId:"101"
                },
                headers:{
                  token:"abcd"
                }
              }).then(res=>{
                this.msg = res.data;
              },error=>{
                this.msg = error;s
              });
            },
            post:function () {
              this.$http.post("package.json",{
                userId:"102"
              },{
                headers:{
                  access_token:"abd"
                }
              }).then(res=>{
                this.msg = res.data;
              },error=>{
                this.msg = error;
              })
            },
            jsonp:function () {
              this.$http.jsonp("http://www.imooc.com/course/AjaxCourseMembers?ids=796").then(res=>{
                this.msg = res.data;
              })
            }
          }
        });
      </script>
    
    </body>
    </html>


**结果调试:**
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/BLpDqU.jpg)

**提取接口主域名头:**
    (使用可见上面演示代码)
    
    http:{
    //root:"这里面可以放主域名头地址，做到提取接口主域名的作用"
     }

# 4-3 axios基础介绍
- `axios.all`可一起调用和处理多个接口的返回
- ` vue-resources`是挂在`vue`上的，而`axios`没有挂在`vue`

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/uYR3Hk.jpg)

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/OJfmKu.jpg)
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/36qTCV.jpg)

### axios 中 GET、POST、HTTP配置参数 三种请求演示

    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Title</title>
      <!-- 最新版本的 Bootstrap 核心 CSS 文件 -->
      <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
      <script src="node_modules/vue/dist/vue.js"></script>
      <script src="node_modules/axios/dist/axios.js"></script>
    </head>
    
    <body>
    <div id="app" class="container">
      <h1>axios插件请求讲解</h1>
      <a href="javascript:;" class="btn btn-primary" v-on:click="get">Get请求</a>
      <a href="javascript:;" class="btn btn-primary" v-on:click="post">Post请求</a>
      <a href="javascript:;" class="btn btn-primary" v-on:click="http">http配置参数请求</a>
    
      <div>
        <span>{{msg}}</span>
      </div>
    </div>
    <script>
      new Vue ({
        el:"#app",
        data:{
          msg:""
        },
        mounted:function () {
    
        },
        methods:{
          get:function () {
            axios.get("package.json",{
              params:{
                userId:"999"
              },
              headers:{
                token:"Jack"
              }
            }).then(res=>{
              this.msg = res.data;
            }).catch(error=>{
              console.log("error init"+error)
            });
          },
          post:function () {
            axios.post("package.json",{
              userId:"666"
            },{
              headers:{
                token:"www.yfming.cn"
              }
            }).then(res=>{
              this.msg = res.data;
            }).catch(error=>{
              console.log("error init"+error)
            });
          },
          http:function () {
            axios({
              url:"package.json",
              method:"POST",
              data:{
                userId:"111"
              },
    //          // 注意： POST请求时参数在data里面定义；GET请求时参数要在 params 中定义
    //          params:{
    //            userId:"222"
    //          },
              headers:{
                token:"eeeee"
              }
            }).then(res=>{
              this.msg = res.data;
            })
          }
        }
      });
    </script>
    </body>
    </html>


**axios的GET调试：**
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/efws1E.jpg)
**axios的POST调试：**
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/9ccAYj.jpg)

### 全局拦截器

    mounted:function () {
      //全局拦截器：
      //请求前拦截
      axios.interceptors.request.use(function (config) {
        console.log("可以在这里写加载HUD");
        return config;
      })
      // 请求后拦截
      axios.interceptors.response.use(function (response) {
        console.log("response init ");
        return response;
      })
    },






