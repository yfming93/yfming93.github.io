---
layout:     	post
title:       "iOS开发常用宏定义收集"
excerpt: 		旨在收集开发过程中经常使用的一些宏定义 
date:     	2017-02-08
author:     	"袁凤鸣"
categories:  iOS 
tags:
    - 宏定义    
mathjax: true
---

* content
{:toc}

 
# iOS开发中常用宏定义收集





	
	
	#pragma mark - 第一部分：必用宏
	/** 屏幕属性 */
	//主窗口
	#define KeyWindow \
	[UIApplication sharedApplication].keyWindow
	//屏幕
	#define ScreenWeight \
	[UIScreen mainScreen].bounds.size.width
	#define ScreenHeight \
	[UIScreen mainScreen].bounds.size.height
	#define UIScreen_W \
	[UIScreen mainScreen].bounds.size.width
	#define UIScreen_H \
	[UIScreen mainScreen].bounds.size.height
	//weakSelf
	#define WeakSelf(type)  __weak typeof(type) weak##type = type;
	
	
	/** 通知相关  */
	//通知中心发送通知
	#define NSNotificationPost_(yfm_Name, yfm_UserInfo) \
	[[NSNotificationCenter defaultCenter] postNotificationName:yfm_Name object:nil userInfo:(yfm_UserInfo)]
	//通知中心接收通知
	#define NSNotificationReceive_(yfm_SEL, yfm_name) \
	[[NSNotificationCenter defaultCenter] addObserver:self selector:yfm_SEL name:yfm_name object:nil]
	//移除通知
	#define NSNotificationRemove \
	[[NSNotificationCenter defaultCenter] removeObserver:self]
	
	
	//const字符串
	#define NSString_Const_H_(yfm_strName) \
	UIKIT_EXTERN NSString * const yfm_strName;
	
	#define NSString_Const_M_(yfm_strName, yfm_String) \
	NSString * const yfm_strName = yfm_String;
	
	
	#define NSUserDefaultsSave_(key,value) \
	[[NSUserDefaults standardUserDefaults] setObject:value forKey:key] //以key,value存储信息
	
	#define NSUserDefaultsGet_(key) \
	[[NSUserDefaults standardUserDefaults] objectForKey:key] //以key取出value
	
	#define NSUserDefaultsRemove_(key) \
	[[NSUserDefaults standardUserDefaults] removeObjectForKey:key] //以key删除value
	
	//立即同步
	#define NSUserDefaultsSync \
	[[NSUserDefaults standardUserDefaults] synchronize]
	
	/** 颜色  */
	//RGB颜色
	#define UIColorWithRGB_(yfm_R,yfm_G,yfm_B) \
	[UIColor colorWithRed:yfm_R green:yfm_G blue:yfm_B alpha:1]
	#define ColorRGB_(yfm_R,yfm_G,yfm_B) \
	[UIColor colorWithRed:yfm_R green:yfm_G blue:yfm_B alpha:1]
	//随机颜色
	#define UIColorWithRandom \
	[UIColor colorWithRed:arc4random_uniform(256) / 255.0 green:arc4random_uniform(256) / 255.0 blue:arc4random_uniform(256) / 255.0 alpha:1]
	#define RandomColor \
	[UIColor colorWithRed:arc4random_uniform(256) / 255.0 green:arc4random_uniform(256) / 255.0 blue:arc4random_uniform(256) / 255.0 alpha:1]
	//十六进制颜色
	#define UIColorWithHex16_(yfm_0Xefefef) \
	[UIColor colorWithRed:((yfm_0Xefefef & 0xFF0000) >> 16) / 255.0 green:((yfm_0Xefefef & 0x00FF00) >> 8) / 255.0 blue:((yfm_0Xefefef & 0x0000FF)) / 255.0 alpha:1]
	#define colorWithHex_(yfm_0Xefefef) \
	[UIColor colorWithRed:((yfm_0Xefefef & 0xFF0000) >> 16) / 255.0 green:((yfm_0Xefefef & 0x00FF00) >> 8) / 255.0 blue:((yfm_0Xefefef & 0x0000FF)) / 255.0 alpha:1]
	
	
	
	
	#pragma mark - 第二部分：定义属性
	/**
	 *     便捷定义@property属性
	 */
	
	/** copy */
	//NSString
	#define String_(name) \
	yfm_copy_property(NSString*,name)
	//NSArray
	#define Array_(name) \
	yfm_copy_property(NSArray*,name)
	//NSDictionary
	#define Dictionary_(name) \
	yfm_copy_property(NSDictionary*,name)
	//NSNumber,它没用对应的不可变类，其实用copy或strong没有区别
	#define Number_(name) \
	yfm_copy_property(NSNumber*,name)
	//NSData
	#define Data_(name) \
	yfm_copy_property(NSData*,name)
	//NSSet
	#define Set_(name) \
	yfm_copy_property(NSSet*,name)
	//NSIndexSet
	#define IndexSet_(name) \
	yfm_copy_property(NSIndexSet*,name)
	
	//带多态的数组和可变数组
	#define mArray_type(modelType, name) \
	@property(nonatomic, strong)NSMutableArray <modelType *> *name;
	#define Array_type(modelType, name) \
	@property(nonatomic, strong)NSArray <modelType *> *name;
	
	
	//代码块，名称和传参，没有传参就不填
	#define Block_(name,...) \
	yfm_set_block(void,name,__VA_ARGS__)
	//有返回值的代码块
	#define BlockReturn_(name,returnClass,...) \
	yfm_set_block(returnClass,name,__VA_ARGS__)
	
	
	/** strong */
	//UISearchBar
	#define SearchBar_(yfm_name) \
	@property (nonatomic, strong) UISearchBar *yfm_name;
	#define MapView_(yfm_name) \
	@property (nonatomic, strong) MKMapView *yfm_name;
	#define LocationManager_(yfm_name) \
	@property (nonatomic, strong)CLLocationManager *yfm_name;
	
	//UICollectionViewFlowLayout
	#define FlowLayout_(yfm_name) \
	@property(nonatomic, strong)UICollectionViewFlowLayout *yfm_name;
	//NSMutableString
	#define mString_(name,...) \
	yfm_strong_property(NSMutableString*,name,__VA_ARGS__)
	//NSMutableArray
	#define mArray_(name,...) \
	yfm_strong_property(NSMutableArray*,name,__VA_ARGS__)
	//NSMutableDictionary
	#define mDictionary_(name,...) \
	yfm_strong_property(NSMutableDictionary*,name,__VA_ARGS__)
	//NSMutableData
	#define mData_(name,...) \
	yfm_strong_property(NSMutableData*,name,__VA_ARGS__)
	//NSMutableSet
	#define mSet_(name,...) \
	yfm_strong_property(NSMutableSet*,name,__VA_ARGS__)
	//NSMutableIndexSet
	#define mIndexSet_(name,...) \
	yfm_strong_property(NSMutableIndexSet*,name,__VA_ARGS__)
	
	//UIImage
	#define Image_(name) \
	yfm_strong_property(UIImage*,name)
	//UIColor
	#define Color_(name) \
	yfm_strong_property(UIColor*,name)
	//id
	#define id_(name,...) \
	yfm_strong_property(id,name,__VA_ARGS__)
	
	//UIView
	#define View_(name,...) \
	yfm_strong_property(UIView*,name,__VA_ARGS__)
	//UIImageView
	#define ImageView_(name,...) \
	yfm_strong_property(UIImageView*,name,__VA_ARGS__)
	//UILabel
	#define Label_(name,...) \
	yfm_strong_property(UILabel*,name,__VA_ARGS__)
	//UIButton
	#define Button_(name,...) \
	yfm_strong_property(UIButton*,name,__VA_ARGS__)
	//UITableView
	#define TableView_(name,...) \
	yfm_strong_property(UITableView*,name,__VA_ARGS__)
	//UICollectionView
	#define CollectionView_(name,...) \
	yfm_strong_property(UICollectionView*,name,__VA_ARGS__)
	//UISegmentedControl
	#define SegmentedControl_(name,...) \
	yfm_strong_property(UISegmentedControl*,name,__VA_ARGS__)
	//UITextField
	#define TextField_(name,...) \
	yfm_strong_property(UITextField*,name,__VA_ARGS__)
	//UISlider
	#define Slider_(name,...) \
	yfm_strong_property(UISlider*,name,__VA_ARGS__)
	//UISwitch
	#define Switch_(name,...) \
	yfm_strong_property(UISwitch*,name,__VA_ARGS__)
	//UIActivityIndicatorView
	#define ActivityIndicatorView_(name,...) \
	yfm_strong_property(UIActivityIndicatorView*,name,__VA_ARGS__)
	//UIProgressView
	#define ProgressView_(name,...) \
	yfm_strong_property(UIProgressView*,name,__VA_ARGS__)
	//UIPageControl
	#define PageControl_(name,...) \
	yfm_strong_property(UIPageControl*,name,__VA_ARGS__)
	//UIStepper
	#define Stepper_(name,...) \
	yfm_strong_property(UIStepper*,name,__VA_ARGS__)
	//UITextView
	#define TextView_(name,...) \
	yfm_strong_property(UITextView*,name,__VA_ARGS__)
	//UIScrollView
	#define ScrollView_(name,...) \
	yfm_strong_property(UIScrollView*,name,__VA_ARGS__)
	//UIDatePicker
	#define DatePicker_(name,...) \
	yfm_strong_property(UIDatePicker*,name,__VA_ARGS__)
	//UIPickerView
	#define PickerView_(name,...) \
	yfm_strong_property(UIPickerView*,name,__VA_ARGS__)
	//UIWebView
	#define WebView_(name,...) \
	yfm_strong_property(UIWebView*,name,__VA_ARGS__)
	//自定义类
	#define DIYObj_(class,name,...) \
	yfm_strong_property(class*,name,__VA_ARGS__)
	
	
	
	
	
	/** assign */
	
	//int
	#define int_(name,...) \
	yfm_assign_property(int,name,__VA_ARGS__)
	//float
	#define float_(name,...) \
	yfm_assign_property(float,name,__VA_ARGS__)
	//double
	#define double_(name,...) \
	yfm_assign_property(double,name,__VA_ARGS__)
	//CGFloat
	#define CGFloat_(name,...) \
	yfm_assign_property(CGFloat,name,__VA_ARGS__)
	//NSInteger
	#define NSInteger_(name,...) \
	yfm_assign_property(NSInteger,name,__VA_ARGS__)
	//NSUInteger
	#define NSUInteger_(name,...) \
	yfm_assign_property(NSUInteger,name,__VA_ARGS__)
	//BOOL
	#define BOOL_(name,...) \
	yfm_assign_property(BOOL,name,__VA_ARGS__)
	//CGRect
	#define CGRect_(name,...) \
	yfm_assign_property(CGRect,name,__VA_ARGS__)
	//CGSize
	#define CGSize_(name,...) \
	yfm_assign_property(CGSize,name,__VA_ARGS__)
	//CGPoint
	#define CGPoint_(name,...) \
	yfm_assign_property(CGPoint,name,__VA_ARGS__)
	//CGAffineTransform
	#define CGAffineTransform_(name,...) \
	yfm_assign_property(CGAffineTransform,name,__VA_ARGS__)
	//NSTimeInterval
	#define NSTimeInterval_(name,...) \
	yfm_assign_property(NSTimeInterval,name,__VA_ARGS__)
	//Class
	#define Class_(name) \
	yfm_assign_property(Class,name)
	
	
	
	
	/** weak */
	
	//UIImageView
	#define weakImageView_(name,...) \
	yfm_weak_property(UIImageView*,name,__VA_ARGS__)
	//UIView
	#define weakView_(name,...) \
	yfm_weak_property(UIView*,name,__VA_ARGS__)
	//UILabel
	#define weakLabel_(name,...) \
	yfm_weak_property(UILabel*,name,__VA_ARGS__)
	//UIButton
	#define weakButton_(name,...) \
	yfm_weak_property(UIButton*,name,__VA_ARGS__)
	//UITableView
	#define weakTableView_(name,...) \
	yfm_weak_property(UITableView*,name,__VA_ARGS__)
	//UICollectionView
	#define weakCollectionView_(name,...) \
	yfm_weak_property(UICollectionView*,name,__VA_ARGS__)
	//UISegmentedControl
	#define weakSegmentedControl_(name,...) \
	yfm_weak_property(UISegmentedControl*,name,__VA_ARGS__)
	//UITextField
	#define weakTextField_(name,...) \
	yfm_weak_property(UITextField*,name,__VA_ARGS__)
	//UISlider
	#define weakSlider_(name,...) \
	yfm_weak_property(UISlider*,name,__VA_ARGS__)
	//UISwitch
	#define weakSwitch_(name,...) \
	yfm_weak_property(UISwitch*,name,__VA_ARGS__)
	//UIActivityIndicatorView
	#define weakActivityIndicatorView_(name,...) \
	yfm_weak_property(UIActivityIndicatorView*,name,__VA_ARGS__)
	//UIProgressView
	#define weakProgressView_(name,...) \
	yfm_weak_property(UIProgressView*,name,__VA_ARGS__)
	//UIPageControl
	#define weakPageControl_(name,...) \
	yfm_weak_property(UIPageControl*,name,__VA_ARGS__)
	//UIStepper
	#define weakStepper_(name,...) \
	yfm_weak_property(UIStepper*,name,__VA_ARGS__)
	//UITextView
	#define weakTextView_(name,...) \
	yfm_weak_property(UITextView*,name,__VA_ARGS__)
	//UIScrollView
	#define weakScrollView_(name,...) \
	yfm_weak_property(UIScrollView*,name,__VA_ARGS__)
	//UIDatePicker
	#define weakDatePicker_(name,...) \
	yfm_weak_property(UIDatePicker*,name,__VA_ARGS__)
	//UIPickerView
	#define weakPickerView_(name,...) \
	yfm_weak_property(UIPickerView*,name,__VA_ARGS__)
	//UIWebView
	#define weakWebView_(name,...) \
	yfm_weak_property(UIWebView*,name,__VA_ARGS__)
	//自定义类
	#define weakDIYObj_(class,name,...) \
	yfm_weak_property(class*,name,__VA_ARGS__)
	
	//delegate
	#define Delegate_(class,name) \
	yfm_weak_property(id<class>,name)
	
	
	/** base */
	
	//copy && DIY
	#define yfm_copy_property(class,var,...) \
	yfm_set_property(class,var,copy,__VA_ARGS__)
	//strong && DIY
	#define yfm_strong_property(class,var,...) \
	yfm_set_property(class,var,strong,__VA_ARGS__)
	//weak && DIY
	#define yfm_weak_property(class,var,...) \
	yfm_set_property(class,var,weak,__VA_ARGS__)
	//assign && DIY
	#define yfm_assign_property(class,var,...) \
	yfm_set_property(class,var,assign,__VA_ARGS__)
	//DIY
	#define yfm_diy_property(class,var,...) \
	yfm_set_property(class,var,__VA_ARGS__)
	//block
	#define yfm_set_block(class,name,...) \
	yfm_set_property(class,(^name)(__VA_ARGS__),copy)
	
	//baseMacro
	#define yfm_set_property(class,var,...) \
	@property (nonatomic, __VA_ARGS__) class var;
	
	
	
	/**
	 *     其他宏
	 */
	//block的调用
	#define Call(block,...) \
	!block?:block(__VA_ARGS__);
	//block的调用，并带有返回值
	#define CallRerurn(block,failReturnValue,...) \
	block?(block(__VA_ARGS__)):(failReturnValue)
	
	//打印宏
	#ifdef DEBUG
	#define NSLog(FORMAT, ...) fprintf(stderr,"%s %s:%d\t%s\n",__TIME__,[[[NSString stringWithUTF8String:__FILE__] lastPathComponent] UTF8String], __LINE__, [[NSString stringWithFormat:FORMAT, ##__VA_ARGS__] UTF8String]);
	#else
	#define NSLog(...)
	#endif
	
	/**
	 初始化属性
	 */
	#pragma mark - 第三部分：初始化控件
	//初始化Button
	#define GET_Button_(yfm_name, yfm_superView,yfm_SEL,yfm_imageName,yfm_title, yfm_font, yfm_titleColor, ...)\
	- (UIButton *)yfm_name\
	{\
	    yfm_lazy_(yfm_name,\
	             UIButton *obj = [UIButton buttonWithType:UIButtonTypeCustom]; \
	             yfm_if_(yfm_title,[obj setTitle:yfm_title forState:UIControlStateNormal];) \
	             yfm_if_(yfm_font,obj.titleLabel.font = [UIFont systemFontOfSize:yfm_font];) \
	             yfm_if_(yfm_titleColor,[obj setTitleColor:yfm_titleColor forState:UIControlStateNormal];) \
	             yfm_if_(yfm_imageName, [obj setImage:[UIImage imageNamed:yfm_imageName] forState:UIControlStateNormal];)\
	             yfm_if_(yfm_SEL, [obj addTarget:self action:yfm_SEL forControlEvents:UIControlEventTouchUpInside];)\
	             [yfm_superView addSubview:obj];\
	             __VA_ARGS__\
	             obj;\
	             )\
	}
	//初始化Label
	#define GET_Label_(yfm_name, yfm_superView, yfm_text, yfm_titleColor, yfm_font, ...) \
	-(UILabel *)yfm_name\
	{ \
	    yfm_lazy_(yfm_name,\
	            UILabel *obj = [[UILabel alloc] init]; \
	            yfm_if_(yfm_text,obj.text = yfm_text;) \
	            yfm_if_(yfm_titleColor,obj.textColor = yfm_titleColor;) \
	            yfm_if_(yfm_font,obj.font = [UIFont systemFontOfSize:yfm_font];)\
	            obj.numberOfLines = 0; \
	            [yfm_superView addSubview:obj]; \
	            __VA_ARGS__\
	            obj;\
	            )\
	}
	//初始化imageView
	#define GET_ImageView_(yfm_name, yfm_superView, yfm_imageName, ...) \
	- (UIImageView *)yfm_name \
	{ \
	    yfm_lazy_(yfm_name,\
	            UIImageView *obj = [[UIImageView alloc] init]; \
	            obj.image = [UIImage imageNamed:yfm_imageName]; \
	            obj.contentMode = UIViewContentModeScaleAspectFill; \
	            [yfm_superView addSubview:obj]; \
	            __VA_ARGS__\
	            obj; \
	            ) \
	}
	//初始化textField
	#define GET_TextField_(yfm_name, yfm_superView, yfm_UIFont,yfm_placeholder, ...) \
	-(UITextField *)yfm_name \
	{ \
	    yfm_lazy_(yfm_name,\
	            UITextField *obj = [[UITextField alloc] init]; \
	            yfm_if_(yfm_placeholder,obj.placeholder = yfm_placeholder;) \
	            obj.borderStyle = UITextBorderStyleRoundedRect; \
	            obj.font = yfm_UIFont;  \
	            [yfm_superView addSubview:obj]; \
	            __VA_ARGS__\
	            obj; \
	        ) \
	} \
	//初始化tableView (记得注册Cell)
	#define GET_TableView_(yfm_name, yfm_superView, yfm_style, ...) \
	- (UITableView *)yfm_name \
	{ \
	    yfm_lazy_(yfm_name,\
	            UITableView *obj = [[UITableView alloc] initWithFrame:CGRectZero style: yfm_style]; \
	            [yfm_superView addSubview:obj]; \
	            obj.dataSource = self; \
	            obj.delegate = self; \
	            __VA_ARGS__\
	            obj; \
	        ) \
	}
	//初始化collectionViewFlowLayout
	#define GET_FlowLayout_(yfm_name, yfm_scrollDirection, yfm_itemSize, yfm_minimumLineSpacing, yfm_minimumInteritemSpacing, ...) \
	- (UICollectionViewFlowLayout *)yfm_name \
	{ \
	    yfm_lazy_(yfm_name,\
	            UICollectionViewFlowLayout *obj = [[UICollectionViewFlowLayout alloc] init]; \
	            yfm_if_(yfm_scrollDirection,obj.scrollDirection = yfm_scrollDirection;) \
	            obj.minimumLineSpacing = yfm_minimumLineSpacing; \
	            yfm_if_(yfm_minimumInteritemSpacing,obj.minimumInteritemSpacing = yfm_minimumInteritemSpacing;) \
	            obj.itemSize = yfm_itemSize; \
	            __VA_ARGS__\
	            obj; \
	        ) \
	}
	//初始化collectionView
	#define GET_CollectionView_(yfm_name, yfm_superView, yfm_flowLayout, yfm_color, ...) \
	- (UICollectionView *)yfm_name \
	{ \
	        yfm_lazy_(yfm_name,\
	            UICollectionView *obj = [[UICollectionView alloc] initWithFrame:CGRectZero collectionViewLayout:yfm_flowLayout]; \
	            obj.dataSource = self; \
	            obj.delegate = self; \
	            [yfm_superView addSubview:obj]; \
	            obj.backgroundColor = yfm_color; \
	            __VA_ARGS__\
	            obj; \
	        )\
	}
	//初始化普通数组
	#define GET_Array_(yfm_name, ...) \
	- (NSArray *)yfm_name \
	{ \
	    yfm_lazy_(yfm_name,\
	            NSArray *obj = [NSArray array]; \
	            __VA_ARGS__\
	            obj; \
	        ) \
	}
	//初始化可变数组
	#define GET_mArray_(yfm_name, ...)\
	- (NSMutableArray *)yfm_name \
	{ \
	        yfm_lazy_(yfm_name,\
	            NSMutableArray *obj = [NSMutableArray array]; \
	            __VA_ARGS__\
	            obj; \
	        ) \
	}
	//初始化字典
	#define GET_Dictionary_(yfm_name, ...) \
	- (NSDictionary *)yfm_name \
	{ \
	    yfm_lazy_(yfm_name,\
	            NSDictionary *obj = [NSDictionary dictionary]; \
	            __VA_ARGS__\
	            obj; \
	        ) \
	}
	//初始化可变字典
	#define GET_mDictionary_(yfm_name, ...) \
	- (NSMutableDictionary *)yfm_name \
	{ \
	    yfm_lazy_(yfm_name,\
	            NSMutableDictionary *obj = [NSMutableDictionary dictionary]; \
	            __VA_ARGS__\
	            obj; \
	        ) \
	}
	//初始化自定义对象
	#define GET_DIYObj_(yfm_class, yfm_name, ...) \
	- (yfm_class *)yfm_name \
	{ \
	    yfm_lazy_(yfm_name, \
	        yfm_class *obj = [[yfm_class alloc] init]; \
	        __VA_ARGS__ \
	        obj ; \
	    )\
	}
	//初始化View
	#define GET_View_(yfm_name, yfm_superView, yfm_backgroundColor, ...) \
	- (UIView *)yfm_name \
	{ \
	    yfm_lazy_(yfm_name,\
	             UIView *obj = [[UIView alloc] init]; \
	             [yfm_superView addSubview:obj];\
	             obj.backgroundColor = yfm_backgroundColor; \
	             __VA_ARGS__\
	             obj; \
	             ) \
	}
	//初始化MapView
	#define GET_MapView_(yfm_name, yfm_superView, ...) \
	GET_DIYObj_(MKMapView, yfm_name, \
	obj.mapType = MKMapTypeStandard; \
	obj.frame = CGRectMake(0, 0, UIScreen_W, UIScreen_H); \
	obj.delegate = self; \
	[yfm_superView addSubview:obj]; \
	__VA_ARGS__\
	)
	//初始化LocationManager
	#define GET_LocationManger_(yfm_name, yfm_distanceFilter, yfm_desiredAccuracy, ...) \
	GET_DIYObj_(CLLocationManager, yfm_name, \
	            [obj requestWhenInUseAuthorization]; \
	            obj.delegate = self; \
	            if([UIDevice currentDevice].systemVersion.floatValue >= 9.0){ \
	                [obj allowsBackgroundLocationUpdates]; \
	            } \
	            obj.distanceFilter = yfm_distanceFilter; \
	            obj.desiredAccuracy = yfm_desiredAccuracy; \
	            __VA_ARGS__\
	            )
	/**************************************/
	//初始化非全局控件
	#define NEW_Class_(yfm_class,...) \
	({\
	    yfm_class *obj  = [[yfm_class alloc] init];  \
	    __VA_ARGS__\
	    obj; \
	});
	/**************************************/
	//baseif
	#define yfm_if_(name, ...) \
	if (name) { \
	__VA_ARGS__\
	}
	//baseLazy
	#define yfm_lazy_(yfm_name, ...) \
	if (!_##yfm_name) { \
	    _##yfm_name = ({ \
	        __VA_ARGS__\
	    }); \
	} \
	return _##yfm_name; \





