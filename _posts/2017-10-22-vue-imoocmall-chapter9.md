---
layout:     	post
title:       "Vue2.0+Node.js+MongoDB全栈打造商城系统（第9章）"
date:     	2017-10-22
author:     	"袁凤鸣"
categories:  vue
tags: 
    vue
mathjax: true
---

* content
{:toc}





# Vue2.0+Node.js+MongoDB全栈打造商城系统（第9章）
# 第9章 基于Node.js开发商品列表接口
## 9-1 Node的启动和调试方式
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/SKMwiV.jpg)

- **node 方式启动：**`node ./server/bin/www` 
    - (有时候 `node server/bin/www`启动报错)
- **pm2安装** `cnpm i pm2 -g` 
- **启动 pm2** `start server/bin/www`
- **结束 pm2** `pm2 stopall`


## 9-2 基于Express实现商品列表查询接口
![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/HXCyCL.jpg)

- **安装mongoose** ：`cnpm i mongoose --save`

**注意：**

- *路由文件修改后 需要重新`node ./server/bin/www`*。然后才能查看刷新页面：`http://localhost:3000/goods`
- 设置好路由后，记得要在最后加`module.exports = router`输出
- 定义模型的时候，参数写`Good`，表的名字是goods，这里的`Good`会自动和带s的`goods`进行关联

在`config/index.js`设置代理

      proxyTable: {
          '/goods':{
            target:'http://localhost:3000'
          }
        },

`models/goods.js`代码:

    var mongoose = require('mongoose')
    var Schema = mongoose.Schema;
    
    var produtSchema = new Schema({
      "productId":{type:String},
      "productName":String,
      "salePrice":Number,
      "checked":String,
      "productNum":Number,
      "productImage":String
    });
    
    module.exports = mongoose.model('Good',produtSchema);


`routes/goods.js`代码:

    var express = require('express');
    var router = express.Router();
    var mongoose = require('mongoose');
    var  Goods = require('../models/goods')
    
    
    //连接MongoDB数据库
    mongoose.connect('mongodb://127.0.0.1:27017/dumall');
    
    mongoose.connection.on("connected", function () {
      console.log("MongoDB connected success.")
    });
    mongoose.connection.on("error", function () {
      console.log("MongoDB connected fail.")
    });
     mongoose.connection.on("disconnected", function () {
      console.log("MongoDB connected disconnected.")
    });
    router.get("/",function (req,res,next) {
      Goods.find({},function (err,doc) {
        if (err) {
          res.json ({
            status:'1',
            msg:err.mssage
          });
        }else {
          res.json({
            status:'0',
            msg:'',
            result:{
              count:doc.length,
              list:doc
            }
          });
        }
      })
    });
    module.exports = router;


## 9-3 商品列表分页和排序功能实现(上)

`server/routes/goods.js`分页功能：

    var express = require('express');
    var router = express.Router();
    var mongoose = require('mongoose');
    var  Goods = require('../models/goods')
    
    
    //连接MongoDB数据库
    mongoose.connect('mongodb://127.0.0.1:27017/dumall');
    
    mongoose.connection.on("connected", function () {
      console.log("MongoDB connected success.")
    });
    
    mongoose.connection.on("error", function () {
      console.log("MongoDB connected fail.")
    });
    
    mongoose.connection.on("disconnected", function () {
      console.log("MongoDB connected disconnected.")
    });
    
    router.get("/",function (req,res,next) {
      let page = parseInt(req.param("page"));
      let pageSize = parseInt(req.param("pageSize"));
      let sort = req.param("sort");
      let skip = (page-1)*pageSize;
      let params = {};
      let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
      goodsModel.sort({'salePrice':sort});
      goodsModel.exec(function (err,doc) {
        if (err) {
          res.json ({
            status:'1',
            msg:err.mssage
          });
        }else {
          res.json({
            status:'0',
            msg:'',
            result:{
              count:doc.length,
              list:doc
            }
          });
        }
      })
    });
    module.exports = router;

## 9-4 商品列表分页和排序功能实现（下）
- **滚动加载数据插件：** `cnpm install vue-infinite-scroll --save
`
    - **在 ImoocMall/src/main.js 导入：** 
        - `import infiniteScroll from  'vue-infinite-scroll'`
    - **使用：** `Vue.use(infiniteScroll);`

`src/views/GoodsList.vue` 代码:

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
              <a href="javascript:void(0)" class="price" @click="sortGoods">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
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
                          <a href="javascript:;" class="btn btn--m">加入购物车</a>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                    加载中...
                  </div>
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
    .load-more {
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
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
            sortFlag:true, //排序
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
            overLayFlag:false,   //遮罩显示
            page:1,
            pageSize:8,
            busy:true       //默认禁止滚动加载
    			}
    		},
        components:{
    		  NavHeader,
          NavFooter,
          NavBread
        },
        mounted:function () {
            this.getGoodsList(false);
        },
        methods:{
            getGoodsList:function (flag) {
              var param = {
                page:this.page,
                pageSize:this.pageSize,
                sort:this.sortFlag?1:-1
    //            priceLevel:this.priceChecked
              };
    
              axios.get("/goods",{
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
            }
        }
    	}
    </script>
    
## 9-5 价格过滤功能实现

#### `ImoocMall/server/routes/goods.js`代码：

    var express = require('express');
    var router = express.Router();
    var mongoose = require('mongoose');
    var  Goods = require('../models/goods')
    
    
    //连接MongoDB数据库
    mongoose.connect('mongodb://127.0.0.1:27017/dumall');
    
    mongoose.connection.on("connected", function () {
      console.log("MongoDB connected success.")
    });
    
    mongoose.connection.on("error", function () {
      console.log("MongoDB connected fail.")
    });
    
    mongoose.connection.on("disconnected", function () {
      console.log("MongoDB connected disconnected.")
    });
    
    
    router.get("/",function (req,res,next) {
      let page = parseInt(req.param("page"));
      let pageSize = parseInt(req.param("pageSize"));
      let priceLevel = req.param("priceLevel"); //价格级别
      let sort = req.param("sort");
      let skip = (page-1)*pageSize;
      //条件查询
      var priceGt = '',priceLte = '';
      let params = {};
      if(priceLevel!='all'){
        switch (priceLevel){
          case '0':priceGt = 0;priceLte=100;break;
          case '1':priceGt = 100;priceLte=500;break;
          case '2':priceGt = 500;priceLte=1000;break;
          case '3':priceGt = 1000;priceLte=5000;break;
        }
        params = {
          salePrice:{
            $gt:priceGt,
            $lte:priceLte
          }
        }
      }
      let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
      goodsModel.sort({'salePrice':sort});
      goodsModel.exec(function (err,doc) {
        if (err) {
          res.json ({
            status:'1',
            msg:err.mssage
          });
        }else {
          res.json({
            status:'0',
            msg:'',
            result:{
              count:doc.length,
              list:doc
            }
          });
        }
      })
    });
    module.exports = router;



####  `ImoocMall/src/views/GoodsList.vue`代码：


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
              <a href="javascript:void(0)" class="price" @click="sortGoods">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
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
                          <a href="javascript:;" class="btn btn--m">加入购物车</a>
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
        <nav-footer></nav-footer>
    	</div>
    </template>
    
    <style >
    .load-more {
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
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
            busy:true       //默认禁止滚动加载
    
    			}
    		},
        components:{
    		  NavHeader,
          NavFooter,
          NavBread
        },
        mounted:function () {
            this.getGoodsList(false);
        },
        methods:{
            getGoodsList:function (flag) {
              var param = {
                page:this.page,
                pageSize:this.pageSize,
                sort:this.sortFlag?1:-1,   //升降排序
                priceLevel:this.priceCheck //价格级别
              };
    
              axios.get("/goods",{
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
            }
        }
    	}
    </script>
    

## 9-6 加入购物车功能实现

#### `ImoocMall/server/routes/goods.js`中代码


```
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var  Goods = require('../models/goods')


//连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/dumall');

mongoose.connection.on("connected", function () {
  console.log("MongoDB connected success.")
});

mongoose.connection.on("error", function () {
  console.log("MongoDB connected fail.")
});

mongoose.connection.on("disconnected", function () {
  console.log("MongoDB connected disconnected.")
});


router.get("/",function (req,res,next) {
  let page = parseInt(req.param("page"));
  let pageSize = parseInt(req.param("pageSize"));
  let priceLevel = req.param("priceLevel"); //价格级别
  let sort = req.param("sort");
  let skip = (page-1)*pageSize;
  //条件查询
  var priceGt = '',priceLte = '';
  let params = {};
  if(priceLevel!='all'){
    switch (priceLevel){
      case '0':priceGt = 0;priceLte=100;break;
      case '1':priceGt = 100;priceLte=500;break;
      case '2':priceGt = 500;priceLte=1000;break;
      case '3':priceGt = 1000;priceLte=5000;break;
    }
    params = {
      salePrice:{
        $gt:priceGt,
        $lte:priceLte
      }
    }
  }
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
  goodsModel.sort({'salePrice':sort});
  goodsModel.exec(function (err,doc) {
    if (err) {
      res.json ({
        status:'1',
        msg:err.mssage
      });
    }else {
      res.json({
        status:'0',
        msg:'',
        result:{
          count:doc.length,
          list:doc
        }
      });
    }
  })
});

//加入到购物车
router.post("/addCart", function (req,res,next) {
  var userId = '100000077',productId = req.body.productId;
  var User = require('../models/user');
  User.findOne({userId:userId}, function (err,userDoc) {
    if(err){
      res.json({
        status:"1",
        msg:err.message
      })
    }else{
      console.log("userDoc:"+userDoc);
      if(userDoc){
        var goodsItem = '';
        userDoc.cartList.forEach(function (item) {
          if(item.productId == productId){
            goodsItem = item;
            item.productNum ++;
          }
        });
        if(goodsItem){
          userDoc.save(function (err2,doc2) {
            if(err2){
              res.json({
                status:"1",
                msg:err2.message
              })
            }else{
              res.json({
                status:'0',
                msg:'',
                result:'suc'
              })
            }
          })
        }else{
          Goods.findOne({productId:productId}, function (err1,doc) {
            if(err1){
              res.json({
                status:"1",
                msg:err1.message
              })
            }else{
              if(doc){
                doc.productNum = 1;
                doc.checked = 1;
                userDoc.cartList.push(doc);
                userDoc.save(function (err2,doc2) {
                  if(err2){
                    res.json({
                      status:"1",
                      msg:err2.message
                    })
                  }else{
                    res.json({
                      status:'0',
                      msg:'',
                      result:'suc'
                    })
                  }
                })
              }
            }
          });
        }
      }
    }
  })
});

module.exports = router;

```


#### `ImoocMall/src/views/GoodsList.vue`中代码：

```
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
          <a href="javascript:void(0)" class="price" @click="sortGoods">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
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
    <nav-footer></nav-footer>
	</div>
</template>

<style >
.load-more {
  height: 100px;
  line-height: 100px;
  text-align: center;
}
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
        busy:true       //默认禁止滚动加载

			}
		},
    components:{
		  NavHeader,
      NavFooter,
      NavBread
    },
    mounted:function () {
        this.getGoodsList(false);
    },
    methods:{
        getGoodsList:function (flag) {
          var param = {
            page:this.page,
            pageSize:this.pageSize,
            sort:this.sortFlag?1:-1,   //升降排序
            priceLevel:this.priceCheck //价格级别
          };

          axios.get("/goods",{
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
//              this.mdShowCart = true;
//              this.$store.commit("updateCartCount",1);
              alert("加入购物车成功");
            }else{
//              this.mdShow = true;
              alert("加入购物车失败");
            }
          });
        }
    }
	}
</script>

```





