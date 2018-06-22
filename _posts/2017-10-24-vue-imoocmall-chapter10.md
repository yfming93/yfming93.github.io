---
layout:     	post
title:       "Vue2.0+Node.js+MongoDB全栈打造商城系统（第10章）"
date:     	2017-10-24
author:     	"袁凤鸣"
categories:  vue
tags: 
    vue
mathjax: true
---

* content
{:toc}





# Vue2.0+Node.js+MongoDB全栈打造商城系统（第10章）

# 第10章 登录模块实现
## 10-1 登录功能实现

#### `ImoocMall/config/index.js`中添加代理：

    proxyTable: {
              '/goods': {
                target: 'http://localhost:3000'
              },
              '/goods/*':{
                target:'http://localhost:3000'
              },
              '/users/*':{
                target:'http://localhost:3000'
              }
        },

#### `ImoocMall/server/routes/users.js`登录接口:

    var express = require('express');
    var router = express.Router();
    var User = require("./../models/user")  //获取模型
    
    /* GET users listing. */
    router.get('/', function(req, res, next) {
      res.send('respond with a resource');
    });
    
    //登录接口
    router.post("/login", function (req,res,next) {
      var param = {
        userName:req.body.userName,
        userPwd:req.body.userPwd
      }
      User.findOne(param, function (err,doc) {
        if(err){
          res.json({
            status:"1",
            msg:err.message
          });
        }else{
          if(doc){
            res.cookie("userId",doc.userId,{
              path:'/',
              maxAge:1000*60*60
            });
            res.json({
              status:'0',
              msg:'',
              result:{
                userName:doc.userName
              }
            });
          }
        }
      });
    });
    
    module.exports = router;

#### `ImoocMall/src/views/NavHeader.vue`代码:

    <template>
      <header class="header">
        <symbol id="icon-cart" viewBox="0 0 38 32">
          <title>cart</title>
          <path class="path1" d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"></path>
          <path class="path2" d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"></path>
          <path class="path3" d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
          <path class="path4" d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
        </symbol>
        <div class="navbar">
          <div class="navbar-left-container">
            <a href="/">
              <img class="navbar-brand-logo" src="static/logo.png"></a>
          </div>
          <div class="navbar-right-container" style="display: flex;">
            <div class="navbar-menu-container">
              <!--<a href="/" class="navbar-link">我的账户</a>-->
              <span class="navbar-link"></span>
              <span v-text="nickName" v-if="nickName"></span>
              <a href="javascript:void(0)" class="navbar-link" @click="loginModalFlag=true" v-if="!nickName">Login</a>
              <a href="javascript:void(0)" class="navbar-link" @click="loginModalFlag=true" v-if="nickName" >Logout</a>
              <div class="navbar-cart-container">
                <span class="navbar-cart-count"></span>
                <a class="navbar-link navbar-cart-link" href="/#/cart">
                  <svg class="navbar-cart-logo">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
          <!--下面是登录弹框-->
        <div class="md-modal modal-msg md-modal-transition " v-bind:class="{'md-show':loginModalFlag}">
          <div class="md-modal-inner">
            <div class="md-top">
              <div class="md-title">Login in</div>
              <button class="md-close" @click="loginModalFlag=false">Close</button>
            </div>
            <div class="md-content">
              <div class="confirm-tips">
                <div class="error-wrap">
                  <span class="error error-show" v-show="errorTip">用户名或者密码错误</span>
                </div>
                <ul>
                  <li class="regi_form_input">
                    <i class="icon IconPeople"></i>
                    <input type="text" tabindex="1" name="loginname" v-model="userName" class="regi_login_input regi_login_input_left" placeholder="User Name" data-type="loginname">
                  </li>
                  <li class="regi_form_input noMargin">
                    <i class="icon IconPwd"></i>
                    <input type="password" tabindex="2"  name="password" v-model="userPwd" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="Password" @keyup.enter="login">
                  </li>
                </ul>
              </div>
              <div class="login-wrap">
                <a href="javascript:;" class="btn-login" @click="login">登  录</a>
              </div>
            </div>
          </div>
        </div>
        <div class="md-overlay" v-if="loginModalFlag" @click="loginModalFlag=false"></div>
      </header>
    </template>
    
    <style>
      .header {
        width: 100%;
        background-color: white;
        font-family: "moderat",sans-serif;
        font-size: 16px;
      }
      .navbar {
        display: flex;
        justify-content: space-between;
        align-content: center;
        width: 100%;
        height: 70px;
        max-width: 1280px;
        margin: 0 auto;
        padding: 5px 20px 10px 20px;
      }
      .navbar-left-container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: -20px;
      }
      .navbar-brand-logo {
        /*width: 120px;*/
      }
      .header a, .footer a {
        color: #666;
        text-decoration: none;
      }
      a {
        -webkit-transition: color .3s ease-out;
        transition: color .3s ease-out;
      }
      .navbar-right-container {
        display: none;
        justify-content: flex-start;
        align-items: center;
      }
      .navbar-menu-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-top: 10px;
      }
      .navbar-link {
        padding-left: 15px;
      }
      .navbar-cart-container {
        position: relative;
      }
      .navbar-cart-count {
        justify-content: center;
        align-items: center;
        position: absolute;
        top: -9px;
        right: -11px;
        width: 20px;
        border-radius: 10px;
        color: white;
        background-color: #eb767d;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
      }
      .navbar-cart-logo {
        width: 25px;
        height: 25px;
        transform: scaleX(-1);
      }
    </style>
    <script>
      import './../assets/css/login.css'
      import axios from 'axios'
      import { mapState } from 'vuex'
      export default{
        data(){
          return{
            userName:'admin',
            userPwd:'123456',
            errorTip:false,
            loginModalFlag:false,  //遮罩层开关
            nickName:""
          }
        },
        methods:{
          login(){
            if(!this.userName || !this.userPwd){  //没输入提示错误信息
              this.errorTip = true;
              return;
            }
            axios.post("/users/login",{
              userName:this.userName,
              userPwd:this.userPwd
            }).then((response)=>{
              let res = response.data;
              if(res.status=="0"){
                this.errorTip = false;
                this.loginModalFlag = false; //登录成功关闭遮罩
                this.nickName = res.result.userName;
    //            this.$store.commit("updateUserInfo",res.result.userName);
    //            this.getCartCount();
              }else{
                this.errorTip = true;
              }
            });
          },
          logOut(){
            axios.post("/users/logout").then((response)=>{
              let res = response.data;
              if(res.status=="0"){
    //                        this.nickName = '';
                this.$store.commit("updateUserInfo",res.result.userName);
              }
            })
          },
          getCartCount(){
            axios.get("users/getCartCount").then(res=>{
              var res = res.data;
              this.$store.commit("updateCartCount",res.result);
            });
          }
        }
      }
    </script>

## 10-2 登出功能实现

#### `ImoocMall/server/routes/users.js` 登出接口:

    var express = require('express');
    var router = express.Router();
    
    var User = require("./../models/user")  //获取模型
    
    /* GET users listing. */
    router.get('/', function(req, res, next) {
      res.send('respond with a resource');
    });
    
    //登录接口
    router.post("/login", function (req,res,next) {
      var param = {
        userName:req.body.userName,
        userPwd:req.body.userPwd
      }
      User.findOne(param, function (err,doc) {
        if(err){
          res.json({
            status:"1",
            msg:err.message
          });
        }else{
          if(doc){
            res.cookie("userId",doc.userId,{
              path:'/',
              maxAge:1000*60*60
            });
            // res.cookie("userName",doc.userName,{
            //   path:'/',
            //   maxAge:1000*60*60
            // });
            // req.session.user = doc;
            res.json({
              status:'0',
              msg:'',
              result:{
                userName:doc.userName
              }
            });
          }
        }
      });
    });
    
    //登出接口
    router.post("/logout", function (req,res,next) {
      res.cookie("userId","",{
        path:"/",
        maxAge:-1
      });
      res.json({
        status:"0",
        msg:'',
        result:''
      })
    });
    
    module.exports = router;

#### `ImoocMall/src/views/NavHeader.vue`代码:

    <template>
      <header class="header">
        <symbol id="icon-cart" viewBox="0 0 38 32">
          <title>cart</title>
          <path class="path1" d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"></path>
          <path class="path2" d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"></path>
          <path class="path3" d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
          <path class="path4" d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
        </symbol>
        <div class="navbar">
          <div class="navbar-left-container">
            <a href="/">
              <img class="navbar-brand-logo" src="static/logo.png"></a>
          </div>
          <div class="navbar-right-container" style="display: flex;">
            <div class="navbar-menu-container">
              <!--<a href="/" class="navbar-link">我的账户</a>-->
              <span class="navbar-link"></span>
              <span v-text="nickName" v-if="nickName"></span>
              <a href="javascript:void(0)" class="navbar-link" @click="loginModalFlag=true" v-if="!nickName">Login</a>
              <a href="javascript:void(0)" class="navbar-link" @click="logOut" v-if="nickName" >Logout</a>
              <div class="navbar-cart-container">
                <span class="navbar-cart-count"></span>
                <a class="navbar-link navbar-cart-link" href="/#/cart">
                  <svg class="navbar-cart-logo">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
          <!--下面是登录弹框-->
        <div class="md-modal modal-msg md-modal-transition " v-bind:class="{'md-show':loginModalFlag}">
          <div class="md-modal-inner">
            <div class="md-top">
              <div class="md-title">Login in</div>
              <button class="md-close" @click="loginModalFlag=false">Close</button>
            </div>
            <div class="md-content">
              <div class="confirm-tips">
                <div class="error-wrap">
                  <span class="error error-show" v-show="errorTip">用户名或者密码错误</span>
                </div>
                <ul>
                  <li class="regi_form_input">
                    <i class="icon IconPeople"></i>
                    <input type="text" tabindex="1" name="loginname" v-model="userName" class="regi_login_input regi_login_input_left" placeholder="User Name" data-type="loginname">
                  </li>
                  <li class="regi_form_input noMargin">
                    <i class="icon IconPwd"></i>
                    <input type="password" tabindex="2"  name="password" v-model="userPwd" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="Password" @keyup.enter="login">
                  </li>
                </ul>
              </div>
              <div class="login-wrap">
                <a href="javascript:;" class="btn-login" @click="login">登  录</a>
              </div>
            </div>
          </div>
        </div>
        <div class="md-overlay" v-if="loginModalFlag" @click="loginModalFlag=false"></div>
      </header>
    </template>
    
    <style>
      .header {
        width: 100%;
        background-color: white;
        font-family: "moderat",sans-serif;
        font-size: 16px;
      }
      .navbar {
        display: flex;
        justify-content: space-between;
        align-content: center;
        width: 100%;
        height: 70px;
        max-width: 1280px;
        margin: 0 auto;
        padding: 5px 20px 10px 20px;
      }
      .navbar-left-container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: -20px;
      }
      .navbar-brand-logo {
        /*width: 120px;*/
      }
      .header a, .footer a {
        color: #666;
        text-decoration: none;
      }
      a {
        -webkit-transition: color .3s ease-out;
        transition: color .3s ease-out;
      }
      .navbar-right-container {
        display: none;
        justify-content: flex-start;
        align-items: center;
      }
      .navbar-menu-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-top: 10px;
      }
      .navbar-link {
        padding-left: 15px;
      }
      .navbar-cart-container {
        position: relative;
      }
      .navbar-cart-count {
        justify-content: center;
        align-items: center;
        position: absolute;
        top: -9px;
        right: -11px;
        width: 20px;
        border-radius: 10px;
        color: white;
        background-color: #eb767d;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
      }
      .navbar-cart-logo {
        width: 25px;
        height: 25px;
        transform: scaleX(-1);
      }
    </style>
    <script>
      import './../assets/css/login.css'
      import axios from 'axios'
      import { mapState } from 'vuex'
      export default{
        data(){
          return{
            userName:'admin',
            userPwd:'123456',
            errorTip:false,
            loginModalFlag:false,  //遮罩层开关
            nickName:""
          }
        },
    //    computed:{
    //      ...mapState(['nickName','cartCount'])
    //    },
        /*nickName(){
          return this.$store.state.nickName;
        },
        cartCount(){
          return this.$store.state.cartCount;
        }*/
        mounted(){
    //      this.checkLogin();
        },
        methods:{
          login(){
            if(!this.userName || !this.userPwd){  //没输入提示错误信息
              this.errorTip = true;
              return;
            }
            axios.post("/users/login",{
              userName:this.userName,
              userPwd:this.userPwd
            }).then((response)=>{
              let res = response.data;
              if(res.status=="0"){
                this.errorTip = false;
                this.loginModalFlag = false; //登录成功关闭遮罩
                this.nickName = res.result.userName;
    //            this.$store.commit("updateUserInfo",res.result.userName);
    //            this.getCartCount();
              }else{
                this.errorTip = true;
              }
            });
          },
          logOut(){
            axios.post("/users/logout").then((response)=>{
              let res = response.data;
              if(res.status=="0"){
                this.nickName = '';
    //            this.$store.commit("updateUserInfo",res.result.userName);
              }
            })
          },
          getCartCount(){
            axios.get("users/getCartCount").then(res=>{
              var res = res.data;
              this.$store.commit("updateCartCount",res.result);
            });
          }
        }
      }
    </script>

## 10-3 登录拦截

#### `ImoocMall/server/app.js`新增登录拦截

    var express = require('express');
    var path = require('path');
    var favicon = require('serve-favicon');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    var ejs = require('ejs')
    var index = require('./routes/index');
    var users = require('./routes/users');
    var goods = require('./routes/goods')
    
    var app = express();
    
    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.engine('.html',ejs.__express);
    app.set('view engine', 'html');
    
    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    
    //登录拦截
    app.use(function (req,res,next) {
      if(req.cookies.userId){
        next();
      }else{
        console.log("url:"+req.originalUrl);
        if(req.originalUrl=='/users/login' || req.originalUrl=='/users/logout' || req.originalUrl.indexOf('/goods/list')>-1){
          next();
        }else{
          res.json({
            status:'10001',
            msg:'当前未登录',
            result:''
          });
        }
      }
    });
    
    app.use('/', index);
    app.use('/users', users);
    app.use('/goods', goods);
    
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });
    
    // error handler
    app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
    
      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
    
    module.exports = app;


#### `ImoocMall/server/routes/users.js`新增检查登录接口:

    var express = require('express');
    var router = express.Router();
    
    var User = require("./../models/user")  //获取模型
    
    /* GET users listing. */
    router.get('/', function(req, res, next) {
      res.send('respond with a resource');
    });
    
    //登录接口
    router.post("/login", function (req,res,next) {
      var param = {
        userName:req.body.userName,
        userPwd:req.body.userPwd
      }
      User.findOne(param, function (err,doc) {
        if(err){
          res.json({
            status:"1",
            msg:err.message
          });
        }else{
          if(doc){
            res.cookie("userId",doc.userId,{
              path:'/',
              maxAge:1000*60*60
            });
            res.cookie("userName",doc.userName,{
              path:'/',
              maxAge:1000*60*60
            });
            // req.session.user = doc;
            res.json({
              status:'0',
              msg:'',
              result:{
                userName:doc.userName
              }
            });
          }
        }
      });
    });
    
    //登出接口
    router.post("/logout", function (req,res,next) {
      res.cookie("userId","",{
        path:"/",
        maxAge:-1
      });
      res.json({
        status:"0",
        msg:'',
        result:''
      })
    });
    
    //检查是否登录接口
    router.get("/checkLogin", function (req,res,next) {
      if(req.cookies.userId){
        res.json({
          status:'0',
          msg:'',
          result:req.cookies.userName || ''
        });
      }else{
        res.json({
          status:'1',
          msg:'未登录',
          result:''
        });
      }
    });
    
    
    module.exports = router;
    
#### `ImoocMall/server/routes/goods.js`修改：
    
- `router.get("/",function (req,res,next) {`
  
    改成
`router.get("/list",function (req,res,next) {`
(一级路由改成二级路由。方便`req.originalUrl.indexOf('/goods/list')>-1`拦截)

#### `ImoocMall/src/views/GoodsList.vue`修改:
- `axios.get("/goods",{`  
    改成

    `axios.get("/goods/list",{`

#### `ImoocMall/src/views/NavHeader.vue`新增检查跟新方法：

    <template>
      <header class="header">
        <symbol id="icon-cart" viewBox="0 0 38 32">
          <title>cart</title>
          <path class="path1" d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"></path>
          <path class="path2" d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"></path>
          <path class="path3" d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
          <path class="path4" d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
        </symbol>
        <div class="navbar">
          <div class="navbar-left-container">
            <a href="/">
              <img class="navbar-brand-logo" src="static/logo.png"></a>
          </div>
          <div class="navbar-right-container" style="display: flex;">
            <div class="navbar-menu-container">
              <!--<a href="/" class="navbar-link">我的账户</a>-->
              <span class="navbar-link"></span>
              <span v-text="nickName" v-if="nickName"></span>
              <a href="javascript:void(0)" class="navbar-link" @click="loginModalFlag=true" v-if="!nickName">Login</a>
              <a href="javascript:void(0)" class="navbar-link" @click="logOut" v-if="nickName" >Logout</a>
              <div class="navbar-cart-container">
                <span class="navbar-cart-count"></span>
                <a class="navbar-link navbar-cart-link" href="/#/cart">
                  <svg class="navbar-cart-logo">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
          <!--下面是登录弹框-->
        <div class="md-modal modal-msg md-modal-transition " v-bind:class="{'md-show':loginModalFlag}">
          <div class="md-modal-inner">
            <div class="md-top">
              <div class="md-title">Login in</div>
              <button class="md-close" @click="loginModalFlag=false">Close</button>
            </div>
            <div class="md-content">
              <div class="confirm-tips">
                <div class="error-wrap">
                  <span class="error error-show" v-show="errorTip">用户名或者密码错误</span>
                </div>
                <ul>
                  <li class="regi_form_input">
                    <i class="icon IconPeople"></i>
                    <input type="text" tabindex="1" name="loginname" v-model="userName" class="regi_login_input regi_login_input_left" placeholder="User Name" data-type="loginname">
                  </li>
                  <li class="regi_form_input noMargin">
                    <i class="icon IconPwd"></i>
                    <input type="password" tabindex="2"  name="password" v-model="userPwd" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="Password" @keyup.enter="login">
                  </li>
                </ul>
              </div>
              <div class="login-wrap">
                <a href="javascript:;" class="btn-login" @click="login">登  录</a>
              </div>
            </div>
          </div>
        </div>
        <div class="md-overlay" v-if="loginModalFlag" @click="loginModalFlag=false"></div>
      </header>
    </template>
    
    <style>
      .header {
        width: 100%;
        background-color: white;
        font-family: "moderat",sans-serif;
        font-size: 16px;
      }
      .navbar {
        display: flex;
        justify-content: space-between;
        align-content: center;
        width: 100%;
        height: 70px;
        max-width: 1280px;
        margin: 0 auto;
        padding: 5px 20px 10px 20px;
      }
      .navbar-left-container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: -20px;
      }
      .navbar-brand-logo {
        /*width: 120px;*/
      }
      .header a, .footer a {
        color: #666;
        text-decoration: none;
      }
      a {
        -webkit-transition: color .3s ease-out;
        transition: color .3s ease-out;
      }
      .navbar-right-container {
        display: none;
        justify-content: flex-start;
        align-items: center;
      }
      .navbar-menu-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-top: 10px;
      }
      .navbar-link {
        padding-left: 15px;
      }
      .navbar-cart-container {
        position: relative;
      }
      .navbar-cart-count {
        justify-content: center;
        align-items: center;
        position: absolute;
        top: -9px;
        right: -11px;
        width: 20px;
        border-radius: 10px;
        color: white;
        background-color: #eb767d;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
      }
      .navbar-cart-logo {
        width: 25px;
        height: 25px;
        transform: scaleX(-1);
      }
    </style>
    <script>
      import './../assets/css/login.css'
      import axios from 'axios'
      import { mapState } from 'vuex'
      export default{
        data(){
          return{
            userName:'admin',
            userPwd:'123456',
            errorTip:false,
            loginModalFlag:false,  //遮罩层开关
            nickName:""
          }
        },
    //    computed:{
    //      ...mapState(['nickName','cartCount'])
    //    },
        /*nickName(){
          return this.$store.state.nickName;
        },
        cartCount(){
          return this.$store.state.cartCount;
        }*/
        mounted(){
          this.checkLogin();
        },
        methods:{
          checkLogin(){
            axios.get("/users/checkLogin").then((response)=>{
              var res = response.data;
    //          var path = this.$route.pathname;
              if(res.status=="0"){
                this.nickName = res.result;
    //            this.$store.commit("updateUserInfo",res.result);
    //            this.loginModalFlag = false;
              }
            });
          },
          login(){
            if(!this.userName || !this.userPwd){  //没输入提示错误信息
              this.errorTip = true;
              return;
            }
            axios.post("/users/login",{
              userName:this.userName,
              userPwd:this.userPwd
            }).then((response)=>{
              let res = response.data;
              if(res.status=="0"){
                this.errorTip = false;
                this.loginModalFlag = false; //登录成功关闭遮罩
                this.nickName = res.result.userName;
    //            this.$store.commit("updateUserInfo",res.result.userName);
    //            this.getCartCount();
              }else{
                this.errorTip = true;
              }
            });
          },
          logOut(){
            axios.post("/users/logout").then((response)=>{
              let res = response.data;
              if(res.status=="0"){
                this.nickName = '';
    //            this.$store.commit("updateUserInfo",res.result.userName);
              }
            })
          },
          getCartCount(){
            axios.get("users/getCartCount").then(res=>{
              var res = res.data;
              this.$store.commit("updateCartCount",res.result);
            });
          }
        }
      }
    </script>

## 10-4 全局模态框组件实现

#### `ImoocMall/src/components/Modal.vue`代码:

    <template>
      <!--template 中必须有一个根元素。若直接放多个元素在 template 中会报错-->
      <!-- modal弹框 -->
      <div>
        <div class="md-modal modal-msg md-modal-transition " v-bind:class="{'md-show':mdShow}">
          <div class="md-modal-inner">
            <div class="md-top">
    
              <button class="md-close" @click="cosleModal">Close</button>
            </div>
            <div class="md-content">
              <div class="confirm-tips">
                <slot name="message"></slot>
              </div>
              <div class="btn-wrap">
                <slot name="btnGroup"></slot>
              </div>
            </div>
          </div>
        </div>
        <div class="md-overlay" v-if="mdShow" @click="cosleModal"></div>
      </div>
    </template>
    
    <script>
      export default {
        props:["mdShow"],
        data () {
          return {
            msg: 'Welcome to Your Vue.js App'
          }
        },
        methods:{
          cosleModal () {
            this.$emit("close")    //调用父组件的close方法
          }
        }
      }
    </script>
    
    <style>
    </style>

#### `ImoocMall/src/views/GoodsList.vue`代码:

    <template>
    	<div>
        <!-- icon-arrow-short 价格筛选的上下箭头 -->
        <symbol id="icon-arrow-short" viewBox="0 0 25 32">
          <title>arrow-short</title>
          <path class="path1" d="M24.487 18.922l-1.948-1.948-8.904 8.904v-25.878h-2.783v25.878l-8.904-8.904-1.948 1.948 12.243 12.243z"></path>
        </symbol>
        <symbol id="icon-status-ok" viewBox="0 0 32 32">
          <title>status-ok</title>
          <path class="path1" d="M22.361 10.903l-9.71 9.063-2.998-2.998c-0.208-0.209-0.546-0.209-0.754 0s-0.208 0.546 0 0.754l3.363 3.363c0.104 0.104 0.241 0.156 0.377 0.156 0.131 0 0.261-0.048 0.364-0.143l10.087-9.414c0.215-0.201 0.227-0.539 0.026-0.754s-0.539-0.226-0.754-0.026z"></path>
          <path class="path2" d="M16 30.933c-8.234 0-14.933-6.699-14.933-14.933s6.699-14.933 14.933-14.933c8.234 0 14.933 6.699 14.933 14.933s-6.699 14.933-14.933 14.933zM16 0c-8.822 0-16 7.178-16 16 0 8.823 7.178 16 16 16s16-7.177 16-16c0-8.822-7.178-16-16-16z"></path>
        </symbol>
        <nav-header></nav-header>
        <nav-bread>
          <span>Goods</span>
        </nav-bread>
        <div class="accessory-result-page accessory-page">
          <div class="container">
            <div class="filter-nav">
              <span class="sortby">Sort by:</span>
              <a href="javascript:void(0)" class="default cur">Default</a>
              <a href="javascript:void(0)" class="price" @click="sortGoods">Price
                <svg class="icon icon-arrow-short" v-bind:class="{'sort-up':!sortFlag}">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-arrow-short"></use>
                </svg>
    
              </a>
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
                        <a href="#"><img v-bind:src="'static/' + item.productImage" alt=""></a>
                      </div>
                      <div class="main">
                        <div class="name">{{item.productName}}</div>
                        <div class="price">{{item.salePrice}}</div>
                        <div class="btn-area">
                          <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <!--// 利用 busy 控制隐藏加载HUD-->
                  <div v-show="!busy" class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                    <img src="static/loading-svg/loading-bubbles.svg" alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
        <modal v-bind:mdShow="mdShow" v-on:close="cosleModal">
          <p slot="message">
            请先登录，否则无法加入购物车！
          </p>
          <div slot="btnGroup">
            <a class="btn btn--m" href="javascript:;" @click="mdShow = false">关闭</a>
          </div>
        </modal>
    
        <modal v-bind:mdShow="mdShowCart" v-on:close="cosleModal">
          <p slot="message">
            <svg class="icon icon-status-ok" >
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
            </svg>
            <span>加入购物车成功！</span>
          </p>
          <div slot="btnGroup">
            <a class="btn btn--m" href="javascript:;" @click="mdShowCart = false">继续购物</a>
            <router-link class="btn btn--m" href="javascript:;" to="/cart">查看购物车</router-link>
          </div>
        </modal>
        <nav-footer></nav-footer>
    	</div>
    </template>
    
    <style >
    .load-more {
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
      .sort-up{
        transform: rotate(180deg);
        transition: all 0.3s ease-out;
      }
    </style>
    
    <script >
      import './../assets/css/base.css'
      import './../assets/css/product.css'
      import NavHeader from './NavHeader.vue'
      import NavFooter from './NavFooter.vue'
      import NavBread from './NavBread.vue'
      import Modal from './../components/Modal.vue'
      import axios from 'axios'
    
    
      export default {
    		data (){
    			return {
    				goodslist:[],
            sortFlag:true, //排序
            priceFilter:[
              {
                startPrice:'0.00',
                endPrice:'100.00'
              },
              {
                startPrice:'100.00',
                endPrice:'500.00'
              },
              {
                startPrice:'500.00',
                endPrice:'1000.00'
              }, {
                startPrice:'1000.00',
                endPrice:'5000.00'
              }
            ],
            priceCheck:'all',   //价格选中的状态
            filerBy:false,      //小屏幕价格菜单显示
            overLayFlag:false,   //遮罩显示
            page:1,
            pageSize:8,
            busy:true,       //默认禁止滚动加载
            mdShow:false,  //登录模态框显示
            mdShowCart:false
    
    			}
    		},
        components:{
    		  NavHeader,
          NavFooter,
          NavBread,
          Modal
        },
        mounted:function () {
            this.getGoodsList(false);
        },
        methods:{
            getGoodsList:function (flag) {    //获取商品列表
              var param = {
                page:this.page,
                pageSize:this.pageSize,
                sort:this.sortFlag?1:-1,   //升降排序
                priceLevel:this.priceCheck //价格级别
              };
    
              axios.get("/goods/list",{
                params:param
              }).then((result)=>{
                var  res = result.data;
                if (res.status=="0") {
                  if (flag) { //累加
                    this.goodslist = this.goodslist.concat(res.result.list);
                    if (res.result.count==0) {
                      this.busy = true; //没数据时禁止滚动到底部自动请求
                    }else {
                      this.busy = false;
                    }
                  }else { //不累加
                    this.goodslist = res.result.list;
                    this.busy = false; //首次请求成功后开启
    
                  }
                }else {
                  this.goodslist = [];
                };
    
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
               this.page = 1;
               this.getGoodsList();
            },
            sortGoods (){ //排序
              this.sortFlag = !this.sortFlag;
              this.page = 1;
              this.getGoodsList();
            },
            loadMore () {
              this.bus = true;
              //第一请求完成后才会执行第二个请求，防止鼠标滚动时请求过多
              setTimeout(()=>{
                this.page++;
                this.getGoodsList(true); //传个true表示要列表数组累加
              },500)
            },
            addCart (productId){
              axios.post("/goods/addCart",{
                productId:productId
              }).then((res)=>{
                var res = res.data;
                if(res.status==0){
                  this.mdShowCart = true;
    //              this.$store.commit("updateCartCount",1);
    //              alert("加入购物车成功");
                }else{
                  this.mdShow = true;
    //              alert(res.msg);
                }
              });
            },
            cosleModal () {  //关闭模态框
              this.mdShow = false;
            }
        }
    	}
    </script>







