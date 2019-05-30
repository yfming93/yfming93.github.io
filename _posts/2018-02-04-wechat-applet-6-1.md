---
layout: post
title:  "微信小程序入门与实战(6-1)"
date:   2018-02-04
categories: 微信小程序
author: "袁凤鸣"
tags: 
 - 微信小程序
excerpt: 6-1 从文章列表跳转到新闻详情页面（组件自定义属性及获取属性）
mathjax: true
---
* content
{:toc}

<!--{% raw %}-->


[微信小程序入门与实战 常用组件API开发技巧项目实战](https://coding.imooc.com/class/75.html)

## 6-1 从文章列表跳转到新闻详情页面（组件自定义属性及获取属性）

- 详情页面事件绑定
    

``` html
<view wx:for="{{postList}}" wx:key="idx" >
  <view catchtap="onPostTap" >
      <template is="postItem" data="{{...item}}" />
  </view>
</view>
```

**注意：**
   
- `catchtap="onPostTap"`    事件不能直接绑定到`template`标签中，`template`只是一个占位符，编译以后就不存在`template`标签了。
    
- 页面之间自定义传值
 

    ``` html
    <view wx:for="{{postList}}" wx:key="idx" >
      <view catchtap="onPostTap" data-postId="{{item.postId}}">
          <template is="postItem" data="{{...item}}" />
      </view>
    </view>
    ```


    - `data-自定义变量名称="{{要传入的值}}"`
    - 在自定义函数`onPostTap`中接收传过来的值：
    
      
        ```
       onPostTap: function (event) {
           var postId = event.currentTarget.dataset.postid;
           console.log("onPostTap id is" + postId);
       }
        ```

    - 使用`event.currentTarget.dataset.自定义变量名称`接收。`dataset`中包含多个传过来的值集合

## 注意：

- 出现问题：**appservice:1187 pages/posts/post-detail/post-detail.js 出现脚本错误或者未正确调用 Page()**
    - 这是因为`post-detail.js`中未加入`Page({})`方法。
- 出现问题：**VM2947:2 pages/posts/post-detail/post-detail.json 文件解析错误  SyntaxError: Unexpected end of JSON input**
    - 这是因为新建`post-detail.json`后为加入`{}`


<!--  {% endraw %}-->

