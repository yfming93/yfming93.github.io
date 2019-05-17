---
layout: post
title:  "AFN 设置 POST 请求将参数设置在 form-data 中"
date:   2018-06-01
author: "袁凤鸣"
excerpt:
categories: iOS
tags: 
    - AFN
    - form-data
mathjax: true
---
* content
{:toc}

---
## （一）、背景:
- 后台返回一个菜谱网站[美食街：https://m.meishij.net/html5/search.php](https://m.meishij.net/html5/search.php) 的主页地址。
- APP 端根据用户给的关键字 自行将参数设置到对应的键`p`中。
- 后台解释说：将参数设置在 `Body` 中利用 `post` 请求自行拿数据。





---
## （二）、采坑
咋一听，好简单啊。立马用 `AFN` 开始搞起。试了半天，咦，怎么老是调不通啊。

遂本能反应到 用我神器 `postman` 来试试。结果是了半天发现 在`Body`中的 `form-data`栏调试成功。得到如下`HTML`数据。

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/h2nBR0.jpg)

然后将 拿到的数据写进一个本地的`index.html`文件，用浏览器打开如下：

![](https://yfmingo.oss-cn-beijing.aliyuncs.com/images/TAXwLI.jpg)

Nice ！！！ 这就是我要的效果。

--- 

## （三）、解决：
通过上面的步骤。才想到是应该吧参数设置到 `AFN` 的 `form-data` 在用 POST请求拿数据。

于是是开始折腾怎么把参数写到`form-data`中了。经过一份查资料了解后。
封装了一个 `AFN`的 `post` 请求。专门用于将参数写到`form-data`中进行请求的接口

``` objc
+ (void)fm_postWithFormData:(NSString *)url
      params:(NSDictionary *)params
    progress:(TDRequestProgress)progress
     success:(TDRequestSuccess)success failure:(TDRequestFailure)failure{
    
    NSMutableURLRequest *request = [[AFHTTPRequestSerializer serializer] multipartFormRequestWithMethod:@"POST" URLString:url parameters:nil constructingBodyWithBlock:^(id<AFMultipartFormData> formData) {
    
        for (NSString *key in params.allKeys) {
            // 循环拿到所有参数进行拼接
            [formData appendPartWithFormData:[params[key] dataUsingEncoding:NSUTF8StringEncoding] name:key];
        }
    } error:nil];
    
    AFURLSessionManager *manager = [[AFURLSessionManager alloc] initWithSessionConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]];
    AFHTTPResponseSerializer *responseSerializer = [AFHTTPResponseSerializer serializer];
    responseSerializer.acceptableContentTypes = [NSSet setWithObjects:@"application/json", @"text/html",  @"text/json", @"text/javascript", @"text/plain", nil];
    manager.responseSerializer = responseSerializer;
    
    NSURLSessionUploadTask *uploadTask;
    uploadTask = [manager uploadTaskWithStreamedRequest:request  progress:^(NSProgress * _Nonnull uploadProgress) {
        
    } completionHandler:^(NSURLResponse * _Nonnull response, id  _Nullable responseObject, NSError * _Nullable error) {
          if (error) {
              !failure?:failure(error);
              NSLog(@"Error: %@", error);
          } else {
               !success?:success(responseObject);
              NSLog(@"%@ %@", response, responseObject);
          }
    }];   
    [uploadTask resume];
}
```


**说明：**

- 此时用我刚才封装的接口请求拿到的是 `HTML`的二进制数据`NSData`数据。需要转成`HTML`字符数据。
    
    ```
    NSString *result = [[NSString alloc] initWithData:obj  encoding:NSUTF8StringEncoding];
    ```
- 然后利用 `UIWebView` 的 `- (void)loadHTMLString:(NSString *)string baseURL:(nullable NSURL *)baseURL;
`接口传入转化的`result`


经过这一系列的折腾后。满足了后台说的那一句话需求。才会得到如上图的菜谱列表。

参考资料：[iOS http的表单请求](https://www.jianshu.com/p/63ec9b0fadfb)

