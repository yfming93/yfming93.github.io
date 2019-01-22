---
layout:     	post
title:       "html 网页代码大全，总结，实用"
excerpt: 		html 网页代码大全，总结，实用。因为经常写博客用的 markdown 语法不足。收集了一些 H5标签 以便写作扩展 （markdown 兼容 HTML 语法就是牛叉。）  
date:     	2017-03-29 
author:     	"袁凤鸣"
categories:  转载
tags:
    - html
mathjax: true
---

* content
{:toc} 
 
 
 html 网页代码大全，总结，实用。因为经常写博客用的 markdown 语法不足。收集了一些 H5标签 以便写作扩展 （markdown 兼容 HTML 语法就是牛叉。）


原文 ： [html 网页代码大全](http://www.cnblogs.com/zendu/p/4991090.html)
## html 网页代码大全，总结，实用






	1)贴图：<img src="图片地址">
	2)加入连接：<a href="所要连接的相关地址">写上你想写的字</a>
	1)贴图：<img src="图片地址">
	2)加入连接：<a href="所要连接的相关地址">写上你想写的字</a>
	 
	3)在新窗口打开连接：<a href="相关地址" target="_blank">写上要写的字</a>
	 
	消除连接的下划线在新窗口打开连接：
	 
	<a href="相关地址" style="text-decoration:none" target="_blank">写上你想写的字</a>
	 
	4)移动字体(走马灯)：<marquee>写上你想写的字</marquee>
	 
	5)字体加粗：<b>写上你想写的字</b>
	 
	6)字体斜体：<i>写上你想写的字</i>
	 
	7)字体下划线: <u>写上你想写的字</u>
	 
	8)字体删除线: <s>写上你想写的字</s>
	 
	9)字体加大: <big>写上你想写的字</big>
	 
	10)字体控制大小：<h1>写上你想写的字</h1> (其中字体大小可从h1-h5,h1最大，h5最小)
	 
	11)更改字体颜色：<font color="#value">写上你想写的字</font>(其中value值在000000与ffffff(16位进制)之间
	 
	12)消除连接的下划线：<a href="相关地址" style="text-decoration:none">写上你想写的字</a>
	 
	13)贴音乐：<embed src=音乐地址 width=300 height=45 type=audio/mpeg autostart="false">
	 
	14)贴flash: <embed src="flash地址" width="宽度" height="高度">
	15)贴影视文件：<img dynsrc="文件地址" width="宽度" height="高度" start=mouseover>
	 
	16)换行：<br>
	 
	17)段落：<p>段落</p>
	 
	18)原始文字样式：<pre>正文</pre>
	 
	19)换帖子背景：<body background="背景图片地址">
	 
	20)固定帖子背景不随滚动条滚动：<body background="背景图片地址" body
	bgproperties=fixed>
	 
	21)定制帖子背景颜色：<body bgcolor="#value">(value值见10)
	 
	22)帖子背景音乐：<bgsound="背景音乐地址" loop=infinite>
	 
	23)贴网页：<iframe src="相关地址" width="宽度" height="高度"></iframe>
	 
	/----------------------------------------HTML特效代码--------------------------------/
	 
	1。忽视右键 
	 <body oncontextmenu="return false"> 
	 或 
	 <body style="overflow-y:hidden"> 
	2。加入背景音乐 
	 IE:<bgsound src="*.mid" loop=infinite> 
	 NS:<embed src="*.mid" autostart=true hidden=true loop=true> 
	 </embed> 
	 *.mid你的背景音乐的midi格式文件 
	3。简单的window.open方法 
	 <a href="#" 
	 onclick="javascript :window.open(文件路径/文件名,newwindow, 
	 toolbar=no,scrollbars=yes,resizable=no,top=0,left=0, 
	 width=400,height=300);">文字或图片</a> 
	 参数解释： 
	 <SCRIPT LANGUAGE="javascript"> js脚本开始； 
	 window.open 弹出新窗口的命令； 
	 文件路径/文件名 弹出窗口的文件名； 
	 newwindow 弹出窗口的名字（不是文件名），非必须，可用空代替； 
	 width=400 窗口宽度； 
	 height=300 窗口高度； 
	 top=0 窗口距离屏幕上方的象素值； 
	 left=0 窗口距离屏幕左侧的象素值； 
	 toolbar=no 是否显示工具栏，yes为显示； 
	 menubar，scrollbars 表示菜单栏和滚动栏。 
	 resizable=no 是否允许改变窗口大小，yes为允许； 
	 location=no 是否显示地址栏，yes为允许； 
	 status=no 是否显示状态栏内的信息（通常是文件已经打开），yes为允许； 
	 </SCRIPT> js脚本结束 
	4。简单的页面加密 
	 <script LANGUAGE="javascript"> 
	 <!-- 
	 function loopy(){ 
	 var sWord =""; 
	 while(sWord!="login"){sWord=prompt("请输入你的登陆密码");} 
	 alert("登陆成功！"); 
	 } 
	 loopy() 
	 //--> 
	 </script> 
	5。拉动页面时背景图不动 
	 <style> 
	 body{background-image:url(logo.gif); 
	 background-repeat:no-repeat;background-position:center} 
	 </style> 
	6。让浏览器在保存页面时保存失败 
	 <NOSCRIPT><iframe src="*.html"></iframe></NOSCRIPT> 
	7。随机替换图片 
	 <script> 
	 document.write(<img src="img/+parseInt(Math.random()*(5)) 
	 +.gif"height="40" width="50"> 
	 </script> 
	 图片文件名为0.gif 1.gif 2.gif 3.gif 4.gif 
	8。窗口定时关闭 
	 先将如下代码网页文件的区： 
	 <script language="javascript"> 
	 function closeit() { setTimeout("self.close()",10000) //毫秒 } 
	 </script> 
	 然后再在<body>标内加入如：<body onload="closeit()"> 
	9。网页自动关闭 
	 <html> 
	 <head> 
	 <object id=closes type="application/x-oleobject" 
	 classid="clsid:adb880a6-d8ff-11cf-9377-00aa003b7a11"> 
	 <param name="Command" value="Close"> 
	 </object> 
	 </head> 
	 <body onload="window.setTimeout(closes.Click(),10000)"> 
	 这个窗口会在10秒过后自动关闭,而且不会出现提示. 
	 </body> 
	 </html> 
	10。网页自动刷新 
	 在head部记入 
	 <META HTTP-EQUIV="Refresh" content="20"> 
	 其中20为20秒后自动刷新，你可以更改为任意值。 
	11。网页自动转页 
	 <META HTTP-EQUIV="Refresh" CONTENT="时间(秒);URL=地址"> 
	12。保持layer在最前面，而不被Iframe、Object所覆盖 
	 在Layer中再插Iframe 或 Object 设z-Index值 
	 <div z-Index:2><object xxx></object> ＃ 前面 
	 <div z-Index:1><object xxx></object> ＃ 后面 
	 <div id="Layer2" style="position:absolute; top:40;width:400px; 
	 height:95px;z-index:2"> height=100% width=100%> 
	 <iframe width=0 height=0></iframe> 
	 </div> 
	 <div id="Layer1" style="position:absolute; top:50;width:200px; 
	 height:115px;z-index:1"> 
	 <iframe height=100% width=100%></iframe> 
	 </div> 
	13。返回上一页 
	 <a href=javascript :history.back(1)>『返回上一页』</a> 
	14。关闭窗口 
	 <a href=javascript :self.close()>『关闭窗口』</a> 
	15。关于iframe的透明背景 
	 <IFRAME ID="iFrame1" SRC="iframe.htm" 
	 allowTransparency="true" 
	 style="background-color: green"></IFRAME> 
	16. oncontextmenu="window.event.returnValue=false" 将彻底屏蔽鼠标右键 
	    <table border oncontextmenu=return(false)><td>no</table> 可用于Table 
	17. <body onselectstart="return false"> 取消选取、防止复制 
	18.onpaste="return false" 不准粘贴 
	19.oncopy="return false;" oncut="return false;" 防止复制
	20. <link rel="Shortcut Icon" href="favicon.ico"> IE地址栏前换成自己的图标
	 
	21. <link rel="Bookmark" href="favicon.ico"> 可以在收藏夹中显示出你的图标
	 
	22. <input style="ime-mode:disabled"> 关闭输入法
	 
	23. 永远都会带着框架 
	<script language="JavaScript"><!-- 
	if (window == top)top.location.href = "frames.htm"; //frames.htm为框架网页 
	// --></script>
	 
	24. 防止被人frame
	 
	<SCRIPT LANGUAGE=JAVASCRIPT><!-- 
	if (top.location != self.location)top.location=self.location; 
	// --></SCRIPT>
	 
	25. 网页将不能被另存为
	 
	<noscript><iframe src=*.html></iframe></noscript>
	 
	26. 查看网页源代码
	 
	<input type=button value=查看网页源代码 onclick="window.location = "view-source:"+ "http://www.pconline.com.cn"">
	 
	27.删除时确认
	 
	<a href="javascript :if(confirm("确实要删除吗?"))location="boos.asp? &areyou=删除&page=1"">删除</a>
	 
	28.屏蔽功能键Shift,Alt,Ctrl 
	<script> 
	function look(){ 
	if(event.shiftKey) 
	alert("禁止按Shift键!"); //可以换成ALT　CTRL 
	} 
	document.onkeydown=look; 
	</script>
	 
	29. 网页不会被缓存 
	<META HTTP-EQUIV="pragma" CONTENT="no-cache"> 
	<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate"> 
	<META HTTP-EQUIV="expires" CONTENT="Wed, 26 Feb 1997 08:21:57 GMT"> 
	或者<META HTTP-EQUIV="expires" CONTENT="0">
	 
	30.怎样让表单没有凹凸感？ 
	<input type=text style="border:1 solid #000000"> 
	或 <input type=text style="border-left:none; border-right:none; border -top:none; border-bottom: 1 solid #000000"></textarea>
	 
	31.不要滚动条? 
	让竖条没有: 
	<body style="overflow:scroll;overflow-y:hidden"> 
	</body> 
	让横条没有: 
	<body style="overflow:scroll;overflow-x:hidden"> 
	</body> 
	两个都去掉？更简单了 
	<body scroll="no"> 
	</body>
	 
	32.怎样去掉图片链接点击后，图片周围的虚线？
	 
	<a href="#" onFocus="this.blur()"><img src="logo.jpg" border=0></a>
	 
	33.电子邮件处理提交表单
	 
	<form name="form1" method="post" action="mailt****@***.com" enctype="text/plain"> 
	<input type=submit> 
	</form>
	 
	34.在打开的子窗口刷新父窗口的代码里如何写？ 
	window.opener.location.reload()
	 
	35.如何设定打开页面的大小 
	<body onload="top.resizeTo(300,200);"> 
	打开页面的位置<body onload="top.moveBy(300,200);">
	 
	36.在页面中如何加入不是满铺的背景图片,拉动页面时背景图不动 
	<STYLE> 
	body 
	{background-image:url(logo.gif); background-repeat:no-repeat; 
	background-position:center;background-attachment: fixed} 
	</STYLE>
	 
	37. 检查一段字符串是否全由数字组成 
	<script language="Javascript"><!-- 
	function checkNum(str){return str.match(//D/)==null} 
	alert(checkNum("1232142141")) 
	alert(checkNum("123214214a1")) 
	// --></script>
	 
	38. 获得一个窗口的大小 
	document.body.clientWidth; document.body.clientHeight
	 
	39. 怎么判断是否是字符 
	if (/[^/x00-/xff]/g.test(s)) alert("含有汉字"); 
	else alert("全是字符");
	 
	40.TEXTAREA自适应文字行数的多少 
	<textarea rows=1 name=s1 cols=27 onpropertychange="this.style.posHeight=this.scrollHeight"> 
	</textarea>
	 
	41. 日期减去天数等于第二个日期 
	<script language=Javascript> 
	function cc(dd,dadd) 
	{ 
	//可以加上错误处理 
	var a = new Date(dd) 
	a = a.valueOf() 
	a = a - dadd * 24 * 60 * 60 * 1000 
	a = new Date(a) 
	alert(a.getFullYear() + "年" + (a.getMonth() + 1) + "月" + a.getDate() + "日") 
	} cc("12/23/2002",2) 
	</script>
	 
	42. 选择了哪一个Radio 
	<HTML><script language="vbscript"> 
	function checkme() 
	for each ob in radio1 
	if ob.checked then window.alert ob.value 
	next 
	end function 
	</script><BODY> 
	<INPUT name="radio1" type="radio" value="style" checked>Style 
	<INPUT name="radio1" type="radio" value="barcode">Barcode 
	<INPUT type="button" value="check" onclick="checkme()"> 
	</BODY></HTML>
	 
	43.脚本永不出错 
	<SCRIPT LANGUAGE="JavaScript"> 
	<!-- Hide function killErrors(){return true;} window.onerror = killErrors; // --> 
	</SCRIPT>
	 
	44.ENTER键可以让光标移到下一个输入框 
	<input onkeydown="if(event.keyCode==13)event.keyCode=9">
	45. 检测某个网站的链接速度： 
	把如下代码加入<body>区域中: 
	<script language=Javascript> 
	tim=1 
	setInterval("tim++",100) 
	b=1 
	var autourl=new Array() 
	autourl[1]="www.njcatv.net" 
	autourl[2]="javacool.3322.net" 
	autourl[3]="www.sina.com.cn" 
	autourl[4]="www.nuaa.edu.cn" 
	autourl[5]="www.cctv.com" 
	function butt(){ 
	document.write("<form name=autof>") 
	for(var i=1;i<autourl.length;i++) 
	document.write("<input type=text name=txt"+i+" size=10 value=测试中
	 
	……> =》<input type=text 
	name=url"+i+" size=40> =》<input type=button value=GO
	 
	onclick=window.open(this.form.url"+i+".value)><br>") 
	document.write("<input type=submit value=刷新></form>") 
	} 
	butt() 
	function auto(url){ 
	document.forms[0]["url"+b].value=url 
	if(tim>200) 
	{document.forms[0]["txt"+b].value="链接超时"} 
	else 
	{document.forms[0]["txt"+b].value="时间"+tim/10+"秒"} b++ } 
	function run(){for(var i=1;i<autourl.length;i++)document.write("<img src=http://"+autourl+"/"+Math.random()+" width=1 height=1 nerror=auto("http://"+autourl+"")>")} 
	run()</script>
	 
	46. 各种样式的光标 
	auto ：标准光标 
	default ：标准箭头 
	hand ：手形光标 
	wait ：等待光标 
	text ：I形光标 
	vertical-text ：水平I形光标 
	no-drop ：不可拖动光标 
	not-allowed ：无效光标 
	help ：?帮助光标 
	all-scroll ：三角方向标 
	move ：移动标 
	crosshair ：十字标 
	e-resize 
	n-resize 
	nw-resize 
	w-resize 
	s-resize 
	se-resize 
	sw-resize
	 
	47、禁止鼠标右键，把Demo的图片全都设为表格的背景，表格的大小与图片的大小一样。这样做看起来是一样的，主要是防止鼠标经过图片时会出现另存的按钮。禁止鼠标右键的代码很简单：
	<script LANGUAGE="JavaScript"> 
	function click() { if (event.button==2) 
	{alert(呵呵，不好意思，你甭想使用右键下载图片：）); } } document.onmousedown=click
	</script>
	 
	48、在网页的Head部分加入如下代码，这段代码的主要功能是屏蔽PrintScreen键，不断清空剪贴版，防止图片被用文件——另存为菜单另存。
	<script language="javascript">
	<!--
	function testclip(){
	try {
	if(clipboardData.getData("Text")||clipboardData.getData("HTML")||clipboardData.getData("URL")) 
	{
	null;
	}
	}
	catch(e){
	clipboardData.setData("Text","")
	}
	setTimeout("testclip()",500)
	}
	testclip();
	//-->
	</script>
	 
	 
	 
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	1. 将彻底屏蔽鼠标右键
	<table border oncontextmenu=return(false)><td>no</table> 可用于Table
	 
	2. <body> 取消选取、防止复制
	 
	3. 不准粘贴
	 
	4. 防止复制
	 
	5. <link rel="Shortcut Icon" href="favicon.ico"> IE地址栏前换成自己的图标
	 
	6. <link rel="Bookmark" href="favicon.ico"> 可以在收藏夹中显示出你的图标
	 
	7. <input style="ime-mode:-Disabled"> 关闭输入法
	 
	8. 永远都会带着框架
	<script language="javascript"><!--
	if (window == top)top.location.href = "frames.htm"; //frames.htm为框架网页
	// --></script>
	 
	9. 防止被人frame
	<SCRIPT LANGUAGE=javascript><!-- 
	if (top.location != self.location)top.location=self.location;
	// --></SCRIPT>
	 
	10. 网页将不能被另存为
	<noscript><iframe src=*.html></iframe></noscript> 
	 
	11. <input type=button value=查看网页源代码 
	onclick="window.location = `view-source:`+ http://www.51js.com/`";>
	 
	12.删除时确认
	<a href=`javascript:if(confirm("确实要删除吗?"location="boos.asp?&areyou=删除&page=1"`>删
	 
	除</a> 
	 
	13. 取得控件的绝对位置
	//javascript
	<script language="javascript">
	function getIE(E){
	var t=e.offsetTop;
	var l=e.offsetLeft;
	while(e=e.offsetParent){
	t+=e.offsetTop;
	l+=e.offsetLeft;
	}
	alert("top="+t+"/nleft="+l);
	}
	</script>
	 
	//VBScript
	<script language="VBScript"><!--
	function getIE()
	dim t,l,a,b
	set a=document.all.img1
	t=document.all.img1.offsetTop
	l=document.all.img1.offsetLeft
	while a.tagName<>"BODY"
	set a = a.offsetParent
	t=t+a.offsetTop
	l=l+a.offsetLeft
	wend
	msgbox "top="&t&chr(13)&"left="&l,64,"得到控件的位置"
	end function
	--></script>
	 
	14. 光标是停在文本框文字的最后
	<script language="javascript">
	function cc()
	{
	var e = event.srcElement;
	var r =e.createTextRange();
	r.moveStart(`character`,e.value.length);
	r.collapse(true);
	r.select();
	}
	</script>
	<input type=text name=text1 value="123">
	 
	15. 判断上一页的来源
	javascript:
	document.referrer
	 
	16. 最小化、最大化、关闭窗口
	<object id=hh1 classid="clsid:ADB880A6-D8FF-11CF-9377-00AA003B7A11"> 
	<param name="Command" value="Minimize"></object>
	<object id=hh2 classid="clsid:ADB880A6-D8FF-11CF-9377-00AA003B7A11"> 
	<param name="Command" value="Maximize"></object>
	<OBJECT id=hh3 classid="clsid:adb880a6-d8ff-11cf-9377-00aa003b7a11">
	<PARAM NAME="Command" value="Close"></OBJECT>
	 
	<input type=button value=最小化 onclick=hh1.Click()>
	<input type=button value=最大化 onclick=hh2.Click()>
	<input type=button value=关闭 onclick=hh3.Click()>
	本例适用于IE
	 
	17.屏蔽功能键Shift,Alt,Ctrl
	<script>
	function look(){ 
	if(event.shiftKey) 
	alert("禁止按Shift键!"; //可以换成ALT　CTRL
	} 
	document.onkeydown=look; 
	</script>
	 
	18. 网页不会被缓存
	<META HTTP-EQUIV="pragma" CONTENT="no-cache">
	<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate">
	<META HTTP-EQUIV="expires" CONTENT="Wed, 26 Feb 1997 08:21:57 GMT">
	或者<META HTTP-EQUIV="expires" CONTENT="0">
	 
	19.怎样让表单没有凹凸感？
	<input type=text style="border:1 solid #000000"> 
	或
	<input type=text style="border-left:none; border-right:none; border-top:none; border-bottom: 
	solid #000000"></textarea>
	 
	20.<div><span>&<layer>的区别？ 
	<div>(division)用来定义大段的页面元素，会产生转行 
	<span>用来定义同一行内的元素，跟<div>的唯一区别是不产生转行 
	<layer>是ns的标记，ie不支持，相当于<div>
	 
	21.让弹出窗口总是在最上面:
	<body>
	 
	22.不要滚动条? 
	让竖条没有: 
	<body style=`overflow:-Scroll;overflow-y:hidden`> 
	</body> 
	让横条没有: 
	<body style=`overflow:-Scroll;overflow-x:hidden`> 
	</body> 
	两个都去掉？更简单了 
	<body scroll="no"> 
	</body> 
	 
	23.怎样去掉图片链接点击后，图片周围的虚线？
	<a href="#"><img src="logo.jpg" border=0></a>
	 
	24.电子邮件处理提交表单
	<form name="form1" method="post" action="mailto:****@***.com" enctype="text/plain"> 
	<input type=submit>
	</form>
	 
	25.在打开的子窗口刷新父窗口的代码里如何写？
	window.opener.location.reload()
	 
	26.如何设定打开页面的大小
	<body>
	打开页面的位置<body>
	 
	27.在页面中如何加入不是满铺的背景图片,拉动页面时背景图不动 
	<style> 
	body 
	{background-image:url(logo.gif); background-repeat:no-repeat; 
	 
	background-position:center;background-attachment: fixed} 
	</style> 
	 
	28. 检查一段字符串是否全由数字组成
	<script language="javascript"><!--
	function checkNum(str){return str.match(//D/)==null}
	alert(checkNum("1232142141"
	alert(checkNum("123214214a1"
	// --></script>
	 
	29. 获得一个窗口的大小
	document.body.clientWidth; document.body.clientHeight
	 
	30. 怎么判断是否是字符
	if (/[^/x00-/xff]/g.test(s)) alert("含有汉字";
	else alert("全是字符";
	 
	31.TEXTAREA自适应文字行数的多少
	<textarea rows=1 name=s1 cols=27>
	</textarea>
	 
	32. 日期减去天数等于第二个日期
	<script language=javascript>
	function cc(dd,dadd)
	{
	//可以加上错误处理
	var a = new Date(dd)
	a = a.valueOf()
	a = a - dadd * 24 * 60 * 60 * 1000
	a = new Date(A)
	alert(a.getFullYear() + "年" + (a.getMonth() + 1) + "月" + a.getDate() + "日"
	}
	cc("12/23/2002",2)
	</script>
	 
	33. 选择了哪一个Radio
	<HTML><script language="vbscript">
	function checkme()
	for each ob in radio1
	if ob.checked then window.alert ob.value
	next
	end function
	</script><BODY>
	<INPUT name="radio1" type="radio" value="style" checked>style
	<INPUT name="radio1" type="radio" value="barcode">Barcode
	<INPUT type="button" value="check">
	</BODY></HTML>
	 
	34.脚本永不出错
	<SCRIPT LANGUAGE="javascript"> 
	<!-- Hide 
	function killErrors() { 
	return true; 
	} 
	window.onerror = killErrors; 
	// --> 
	</SCRIPT>
	 
	35.ENTER键可以让光标移到下一个输入框
	<input>
	 
	36. 检测某个网站的链接速度：
	把如下代码加入<body>区域中:
	<script language=javascript>
	tim=1
	setInterval("tim++",100)
	b=1
	 
	var autourl=new Array()
	autourl[1]="http://www.njcatv.net/";
	autourl[2]="javacool.3322.net"
	autourl[3]="http://www.sina.com.cn/";
	autourl[4]="http://www.nuaa.edu.cn/";
	autourl[5]="http://www.cctv.com/";
	 function butt(){
	document.write("<form name=autof>"
	for(var i=1;i<autourl.length;i++)
	document.write("<input type=text name=txt"+i+" size=10 value=测试中……> =》<input type=text 
	 
	name=url"+i+" size=40> =》<input type=button value=GO 
	 
	onclick=window.open(this.form.url"+i+".value)><br>"
	document.write("<input type=submit value=刷新></form>"
	}
	butt()
	function auto(url){
	document.forms[0]["url"+b].value=url
	if(tim>200)
	{document.forms[0]["txt"+b].value="链接超时"}
	else
	{document.forms[0]["txt"+b].value="时间"+tim/10+"秒"}
	b++
	}
	function run(){for(var i=1;i<autourl.length;i++)document.write("<img 
	 
	src=http://"+autourl+"/"+Math.random()+" width=1 height=1 
	 
	onerror=auto(http://";+autourl+"`)>"}
	run()</script>
	 
	37. 各种样式的光标
	auto ：标准光标
	default ：标准箭头
	hand ：手形光标
	wait ：等待光标
	text ：I形光标
	vertical-text ：水平I形光标
	no-drop ：不可拖动光标
	not-allowed ：无效光标
	help ：?帮助光标
	all-scroll ：三角方向标
	move ：移动标
	crosshair ：十字标
	e-resize
	n-resize
	nw-resize
	w-resize
	s-resize
	se-resize
	sw-resize
	 
	38.页面进入和退出的特效
	进入页面<meta http-equiv="Page-Enter" content="revealTrans(duration=x, transition=y)">
	推出页面<meta http-equiv="Page-Exit" content="revealTrans(duration=x, transition=y)"> 
	这个是页面被载入和调出时的一些特效。Duration表示特效的持续时间，以秒为单位。Transition表示使
	 
	用哪种特效，取值为1-23:
	矩形缩小 
	矩形扩大 
	圆形缩小
	圆形扩大 
	下到上刷新 
	上到下刷新
	左到右刷新 
	右到左刷新 
	竖百叶窗
	横百叶窗 
	错位横百叶窗 
	错位竖百叶窗
	点扩散 
	左右到中间刷新 
	中间到左右刷新
	中间到上下
	上下到中间 
	右下到左上
	右上到左下 
	左上到右下 
	左下到右上
	横条 
	竖条 
	以上22种随机选择一种
	 
	39.在规定时间内跳转
	<META http-equiv=V="REFRESH" content="5;URL=http://www.51js.com"> 
	 
	40.网页是否被检索
	<meta name="ROBOTS" content="属性值">
	其中属性值有以下一些:
	属性值为"all": 文件将被检索，且页上链接可被查询；
	属性值为"none": 文件不被检索，而且不查询页上的链接；
	属性值为"index": 文件将被检索；
	属性值为"follow": 查询页上的链接；
	属性值为"noindex": 文件不检索，但可被查询链接；
	属性值为"nofollow": 文件不被检索，但可查询页上的链接。 
	 
	41.变换网页的鼠标光标
	<BODY style="CURSOR: url(http://203.73.125.205/~liangmi2/farmfrog01.cur`)">
	 
	42.怎样实现在任务栏显示小图标的效果？ (要使用绝对地址)
	有些站点，访问时会在地址栏地址前显出小图标，添加到收藏夹后也在收藏栏中显示图标，
	这样很好的与其它站点有了区别。 
	要达到这个效果，先需做出这个图标文件，图像为16*16像素，不要超过16色。文件格式为ico，然后上传至你的网站。
	然后，在需要的页面中，加上以下html语句到文件的<head>和</head>之间（假设以上ico文件的地址http://happyisland.126.com/icon.ico）。
	<link REL="SHORTCUT ICON"href="http:///happyisland.126.com/icon.ico";> 
	如果访问者的浏览器是IE5.0，就不需加任何代码，只要将图标文件上传到网站的根目录下即可。
	1,META标签里的代码是什么意思？ 
	<META>是放于<HEAD>与</HEAD>之间的标记.以下是我总结它在网页中最常见的几种。 
	<meta name="Keywords" content="图片, 新闻, 音乐, 软件"> 
	该网页的关键字，作用于搜索引擎的登录，事实上它在现在的网站中并没什么用。 
	<meta http-equiv="Content-Type" content="text/html; charset=gb2312"> 
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"> 
	设定这是 HTML 文件及其编码语系，简体中文网页使用charset=gb2312，繁体中文使用charset=big5，或者不设编码也可，纯英文网页建议使用 iso-8859-1。 
	<meta name="GENERATOR" content="Microsoft FrontPage 5.0"> 
	这只表示该网页由什么编辑器写的。 
	<meta http-equiv="refresh" content="10; url=http://www.hkiwc.com"> 
	这行较为实用，能于预定秒数内自动转到指定网址。原代码中 10 表示 10秒。 
	 2，怎么改变滚动条的颜色，只有ie5.5版本以上才能支持。 
	这是使用CSS语言，在次说明一下，它和我的浏览器版本有一定的关系。 
	scrollbar-arrow-color：上下按钮上三角箭头的颜色。 
	scrollbar-base-color：滚动条的基本颜色。 
	scrollbar-dark-shadow-color：立体滚动条强阴影的颜色 
	scrollbar-face-color：立体滚动条凸出部分的颜色 
	scrollbar-highlight-color：滚动条空白部分的颜色 
	scrollbar-shadow-color立体滚动条阴影的颜色。
	scrollbar-track-color:#99CC33;
	scrollbar-3dlight-color:#A8CBF1; 
	代码如下： 
	<style> 
	<!-- 
	BODY {
	scrollbar-face-color:#99CC33;//(立体滚动条凸出部分的颜色) 
	scrollbar-highlight-color:#A8CBF1;//(滚动条空白部分的颜色) 
	scrollbar-shadow-color:#A8CBF1;//(立体滚动条阴影的颜色) 
	scrollbar-arrow-color:#FF9966;//(上下按钮上三角箭头的颜色) 
	scrollbar-base-color:#A8CBF1; //(滚动条的基本颜色) 
	scrollbar-darkshadow-color:#A8CBF1; //(立体滚动条强阴影的颜色)
	scrollbar-track-color:#99CC33;
	scrollbar-3dlight-color:#A8CBF1; 
	} 
	--> 
	</style> 
	 
	 
	//以下是其它的网页的代码
	 
	在这我补充几点： 
	1.让浏览器窗口永远都不出现滚动条。 
	<body style="overflow-x:hidden;overflow-y:hidden">或<body style="overflow:hidden"> 或<body scroll=no> 
	2，没有水平滚动条 
	<body style="overflow-x:hidden"> 
	3，没有垂直滚动条 
	<body style="overflow-y:hidden"> 
	 
	3,如何给图片抖动怎做的. 
	<SCRIPT language=javascript1.2> 
	<!-- 
	var rector=2 
	var stopit=0 
	var a=1 
	var count=0 
	function init(which){ 
	stopit=0 
	shake=which 
	shake.style.left=0 
	shake.style.top=0 
	} 
	function rattleimage(){ 
	if ((!document.all&&!document.getElementById)||stopit==1||count==100) 
	return 
	count++ 
	if (a==1){ 
	shake.style.top=parseInt(shake.style.top)+rector 
	} 
	else if (a==2){ 
	shake.style.left=parseInt(shake.style.left)+rector 
	} 
	else if (a==3){ 
	shake.style.top=parseInt(shake.style.top)-rector 
	} 
	else{ 
	shake.style.left=parseInt(shake.style.left)-rector 
	} 
	if (a<4) 
	a++ 
	else 
	a=1 
	setTimeout("rattleimage()",50) 
	} 
	function stoprattle(which){ 
	stopit=1 
	count=0 
	which.style.left=0 
	which.style.top=0 
	} 
	//--> 
	</SCRIPT> 
	<style>.shakeimage {POSITION: relative} 
	</style> 
	<img src="图片的路径" onmouseout=stoprattle(this) onmouseover=init(this);rattleimage() class=shakeimage>
	 
	 4，在DW如何给水平线加颜色。 
	在DW中没有此项设置，你只能在HTML中加入代码：<hr color=red noshade>按F12的预览在能看到。由于在NC中不支持<hr>的COLOR属性，所以在DW中没有此项设置。 
	 
	5，如何在网页中实现flash的全屏播放？ 
	只要在调用swf文件的HTML中将WIDTH和HEIGHT的参数设为100％即可，当然也可以在Flash导出HTML文件的设置中进行设置，方法是：打开File菜单；选Publish Settings弹出导出设置对话框；在HTML标签下的Dimensions选项,下拉后选中Percent（百分比）,并在WIDTH 和HEIGHT框中填100.就行了。 
	 
	6,为什么我在DW中插入的Flash动画缺看不找！ 
	如果你没有正确地安装Dreamweaver和Flash，那么在你预览的时候，Dreamweaver会提示你缺少播放的插件，请你按装InstallAXFlash.exe 并从新启动计算机。现在IE6已经捆绑这个程序。 
	 
	7，在Flash中，如果屏蔽鼠标右键?FS命令都是什么意思? 
	fscommand ("fullscreen", "true/false";（全屏设置，TRUE开，FALSE关） 
	fscommand ("showmenu", "true/false";（右键菜单设置，TRUE显示，FALSE不显示） 
	fscommand ("allowscale", "true/false";（缩放设置，TRUE自由缩放，FALSE调整画面不影响影片本身的尺寸） 
	fscommand ("trapallkeys", "true/false";（快捷键设置，TRUE快捷键开，FALSE快捷键关） 
	fscommand ("exec";（EXE程序调用） 
	fscommand ("quit";（退出关闭窗口） 
	 
	8，Flash中什么是隐形按钮。 
	利用button中的hit帧来制作只有感应区域而完全透明的按钮。 
	 
	9，如何给Flash动画做链接。 
	Dreamweaver是不能给Flash制作链接的，只能在Flash中用geturl()加链接，然后再插入Dreamweaver中。 
	 
	10，DW中的层的技巧。 
	层是可以嵌套的，我个人给大家一个技巧，在层面板中按住CTRL再拖放层到你想去成为其子层的地方就行了，我认为这是最简单直观的方法了。 
	 
	11，如何改变鼠标的形状？ 
	在Dreamweaver4中CSS样式面板： 
	按CTR+SHIFT+E--出现样式表对话框,点击NEW，出现编辑对话框,在左边最后一项extensions-cursor 选择你要改的指针形式就可以了，然后把你要想改变的地方运用样式表，如果整页都有在<body bgcolor="#003063" text="#ffffff" id=all>中加入就行了。 
	<span style="cursor:X`>样例</span> 
	这里选择（文本）作为对象，还可以自己改为其他的，如link等。 
	x可以等于=hand（手形）、crosshair（十字）、text（文本光标）、wait（顾名思义啦）、default（默认效果）、help（问号）、e-size（向右箭头）、ne-resize（向右上的箭头）、nw-resize（向左上的箭头）、w-resize（向左的箭头）、sw-resize（左下箭头）、s-resize（向下箭头）、se-resize（向右下箭头）、auto（系统自动给出效果）。 
	12，用CSS做邮票，看看吧！ 
	<input type=button value=我象不象邮票？ style="height:80px;border:2px dashed #cccccc"> 
	 
	13，经常上网的朋友可能会到过这样一些网站，一进入首页立刻会弹出一个窗口，怎么做呢！ 
	这javascript代码即可实现，摘录蓝色论坛。 
	【1、最基本的弹出窗口代码】 
	其实代码非常简单： 
	<SCRIPT LANGUAGE="javascript"> 
	<!-- 
	window.open (`page.html`) 
	--> 
	</SCRIPT> 
	因为着是一段javascripts代码，所以它们应该放在<SCRIPT LANGUAGE="javascript">标签和</script>之间。<!-- 和 -->是对一些版本低的浏览器起作用，在这些老浏览器中不会将标签中的代码作为文本显示出来。要养成这个好习惯啊。 
	window.open (`page.html`) 用于控制弹出新的窗口page.html，如果page.html不与主窗口在同一路径下，前面应写明路径，绝对路径(http://)和相对路径(../)均可。用单引号和双引号都可以，只是不要混用。 
	这一段代码可以加入HTML的任意位置，<head>和</head>之间可以，<body bgcolor="#003063" text="#ffffff" id=all>间</body>也可以，越前越早执行，尤其是页面代码长，又想使页面早点弹出就尽量往前放。 
	【2、经过设置后的弹出窗口】 
	下面再说一说弹出窗口的设置。只要再往上面的代码中加一点东西就可以了。 
	我们来定制这个弹出的窗口的外观，尺寸大小，弹出的位置以适应该页面的具体情况。 
	<SCRIPT LANGUAGE="javascript"> 
	<!-- 
	window.open (`page.html`, `newwindow`, `height=100, width=400, top=0,left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no`) 
	//写成一行 
	--> 
	</SCRIPT> 
	参数解释： 
	<SCRIPT LANGUAGE="javascript"> js脚本开始； 
	window.open 弹出新窗口的命令； 
	`page.html` 弹出窗口的文件名； 
	`newwindow` 弹出窗口的名字（不是文件名），非必须，可用空``代替； 
	height=100 窗口高度； 
	width=400 窗口宽度； 
	top=0 窗口距离屏幕上方的象素值； 
	left=0 窗口距离屏幕左侧的象素值； 
	toolbar=no 是否显示工具栏，yes为显示； 
	menubar，scrollbars 表示菜单栏和滚动栏。 
	resizable=no 是否允许改变窗口大小，yes为允许； 
	location=no 是否显示地址栏，yes为允许； 
	status=no 是否显示状态栏内的信息（通常是文件已经打开），yes为允许； 
	</SCRIPT> js脚本结束
	【3、用函数控制弹出窗口】 
	下面是一个完整的代码。 
	<html> 
	<head> 
	<script LANGUAGE="javascript"> 
	<!-- 
	function openwin() { window.open ("page.html", "newwindow", "height=100, width=400, toolbar= 
	no, menubar=no, scrollbars=no, resizable=no, location=no, status=no" 
	//写成一行 
	} 
	//--> 
	</script> 
	</head> 
	<body> 
	…任意的页面内容… 
	</body> 
	</html> 
	这里定义了一个函数openwin(),函数内容就是打开一个窗口。在调用它之前没有任何用途。 
	怎么调用呢？ 
	方法一：<body> 浏览器读页面时弹出窗口； 
	方法二：<body> 浏览器离开页面时弹出窗口； 
	方法三：用一个连接调用： 
	<a href="#">打开一个窗口</a> 
	注意：使用的“#”是虚连接。 
	方法四：用一个按钮调用： 
	<input type="button" value="打开窗口"> 
	 
	14，没有用表格写的，让大家随便看看，没什么。 
	<html> 
	<head> 
	<title>江南荷花扇面</title> 
	<meta http-equiv="Content-Type" content="text/html; charset=gb2312"> 
	<style type="text/css"> 
	<!-- 
	.font1 { font-size: 12px; color: #999999; text-decoration: none} 
	a { font-size: 12px; color: #999999; text-decoration: none} 
	a:hover { font-size: 12px; color: #000000; text-decoration: none} 
	--> 
	</style> 
	</head> 
	<body bgcolor="#FFFFFF" text="#000000"> 
	<div class="font1" style="writing-mode=tb-rl;height:200px" width=300> 
	<p>盛夏　　　　　　尚　涛　 
	<p><a href="index.htm">一夜露痕黄粉香　袁运甫 </a> 
	<p>瑶池昨夜新凉　　王金岭 
	<p>一朵白莲随意开　吴冠南 
	<p>新雨迎秋欲满塘　齐辛民 
	<p>十里荷香　　　　齐辛民 
	<p>濯清莲而不妖　　卢世曙 
	</div> 
	</body> 
	</html> 
	 
	15,IE6已支持自定义cursor! 
	语法格式 cursor:url(图标) //cur或是ani文件. 
	cur就是WINDOWS中的光标(cursor)文件，光标文件与图标（ICON)文件除了文件头有一个位置的值不同外，实际是一样的。 
	ani是WINDOWS中的动画光标（图标）文件。 
	<style type="text/css"> 
	<!-- 
	.unnamed1 { cursor:url(arrow2c.cur)} 
	--> 
	</style> 
	16,用marquee做的滚动字幕.这也我刚看到论坛的朋友在问。 
	语法： 
	align=# | top | middle| bottom //对齐方式) 
	BEHAVIOR=ALTERNATE | SCROLL | SLIDE //移动的方式 
	BGCOLOR=color//底色区域颜色 
	DIRECTION=DOWN | LEFT | RIGHT | UP //移动的方向 
	Loop=n //循环次数（默认是循环不止） 
	Scrolldelay=milliseconds//延时 
	height=# width=# //区域面积 
	hspace=# vspace=# //空白区域 
	scrollamount=# //移动的速度 
	<marquee align=top behavior=ALTERNATE BGCOLOR=#000000 height=60 width=433 scrollamount=5></marquee>
	 
	17，在FLASH5中也存在一些字体，打散后变成一团的事是为什么？有解决的办法吗。 
	这是大家很常见的问题！可能是对字库支持的不好！我个是做成透明的gif图片格式，然后倒入。 
	 
	18，flash的网页里“加入收藏夹”功能怎么实现？ 
	在as中加getUrl("java script:window.external.addFavorite(http://skydesigner.51.net`,`我的工作室`)" 
	 
	19，在Flash中，文本的动态属性和输入属性的区别。 
	input text在运行时可被用户或程序改变其值。 
	ynamic text仅允许被程序修改。 
	 
	20,怎样在IE中调用Dreamweaver进行编辑. 
	相信很多在使用WinME或Window2000的朋友，会遇见是个问题。很简单，把我们笔记本程序打开，保存为一个 *.reg 文件。双击它将信息添加到注册表即可。 
	REGEDIT4 
	[HKEY_CLASSES_ROOT\.htm\OpenWithList\Dreamweaver] 
	[HKEY_CLASSES_ROOT\.htm\OpenWithList\Dreamweaver\shell] 
	[HKEY_CLASSES_ROOT\.htm\OpenWithList\Dreamweaver\shell\edit] 
	[HKEY_CLASSES_ROOT\.htm\OpenWithList\Dreamweaver\shell\edit\command] 
	@="\"c:\\Program Files\\Macromedia\\Dreamweaver 4\\dreamweaver.exe\" \"%1\"" 
	 
	21，设置表格虚线。 
	方法一：作一个1X2的图。半黑半白，再利用表格作成线。 
	方法二：在css里面设，要IE5。5才支持这种效果。 
	style="BORDER-LEFT: #000000 1PX DASHED; BORDER-RIGHT: #000000 1PX DASHED; BORDER-TOP: #000000 1PX DASHED; BORDER-BOTTOM: #000000 1PX DASHED" 
	 
	22,看看在网页中调用HHCtrl控件效果。 
	代码如下： 
	<object id="HHC" type="application/x-oleobject" classid="clsid:adb880a6-d8ff-11cf-9377-00aa003b7a11"></object><script>HHC.TextPopup("哈哈,大家好,我是闪梦!","",50,5,128255,346751);</script> 
	 
	22，如何让一张图片有浅到深的渐变。 
	<SCRIPT language=javascript1.2> 
	<!-- 
	function high(which2){ 
	theobject=which2 
	highlighting=setInterval("highlightit(theobject)",50) 
	} 
	function low(which2){ 
	clearInterval(highlighting) 
	which2.filters.alpha.opacity=40 
	} 
	function highlightit(cur2){ 
	if (cur2.filters.alpha.opacity<100) 
	cur2.filters.alpha.opacity+=10 
	else if (window.highlighting) 
	clearInterval(highlighting) 
	} 
	</script> 
	<img onmouseout=low(this) onmouseover=high(this) style="FILTER: alpha(opacity=40)"src="logo.gif" > 
	 
	23,双击鼠标左键来滚动背景，单击停止。 
	<SCRIPT language=javascript> 
	var currentpos,timer; 
	function initialize() 
	{ 
	timer=setInterval("scrollwindow()",16); 
	} 
	function sc(){ 
	clearInterval(timer); 
	} 
	function scrollwindow() 
	{ 
	currentpos=document.body.scrollTop; 
	window.scroll(0,++currentpos); 
	if (currentpos != document.body.scrollTop) 
	sc(); 
	} 
	document.onmousedown=sc 
	document.ondblclick=initialize 
	</SCRIPT> 
	 
	24,如何在同一页面设置不同文字链接效果的样式. 
	代码如下： 
	<HTML><HEAD><TITLE>如何在同一页面设置不同文字链接效果的样式</TITLE> 
	<meta http-equiv="Content-Type" content="text/html; charset=gb2312"> 
	<style type="text/css"> 
	<!-- 
	a:hover { font-size: 9pt; color: #FF0000; text-decoration: underline} 
	a:link { font-size: 9pt; color: #006699; text-decoration: underline} 
	a:visited { font-size: 9pt; color: #006699; text-decoration: underline} 
	a:active { font-size: 9pt; color: #FF0000; text-decoration: none} 
	a.r1:hover { font-size: 9pt; color: #FF0000; text-decoration: underline overline} 
	a.r1:link { font-size: 9pt; color: #000000; text-decoration: underline overline} 
	a.r1:visited { font-size: 9pt; color: #99CC00; text-decoration: underline overline} 
	a.r1:active { font-size: 9pt; color: #000000; text-decoration: underline overline} 
	--> 
	</style> 
	</head> 
	<body bgcolor="#FFFFFF" text="#000000"> 
	<a href="#">下划线链接 </a> 
	<p></p> 
	<a href="#" class="r1">双下划线链接</a> 
	</BODY> 
	</HTML> 
	补充说明： 
	a:hover 表示鼠标划过时的样式. 
	a:link 表示链接的样式. 
	a:active 表示当前活动连接的样式. 
	a:visited 表示已经访问过的连接的样式. 
	25, 用CSS给文字加入阴影效果和文字描边效果。 
	.glow{FONT-SIZE: 9pt; FILTER: Glow(Color=#000000, Strength=1)} 
	//文字描边效果 
	.shadow {FONT-SIZE: 9pt; FILTER: DropShadow(OffX=1, OffY=1, DropShadow(OffX=1, OffY=1, color:#111111); COLOR: #ffffff; FONT-FAMILY: "宋体"} 
	//加入阴影效果 
	补充说明： 
	这两种滤镜要想实现效果，必须加在如：<td class=glow或shadow ><div>xxxxxxxxx</div></td>上 
	，并且要留有足够的空间能够显示阴影或描边，否则会出现半截的阴影或描边现象。 
	 
	26,如何给做带颜色的下拉菜单。 
	<select style="FONT-SIZE: 10px; COLOR: #ffffff; FONT-FAMILY: Verdana;BACKGROUND-COLOR: #ff6600;" size=1 > 
	<option selected>:: Dreamweaver4 ::</option> 
	<option>::Flash5::</option> 
	<option>::Firewoks4::</option> 
	</select> 
	 
	27,关于DW4的表格中的亮边框和暗边框问题。 
	在DW4的表格面板中并没有亮边框和暗边框的属性设置，因为NC不支持,只有你在代码中添加了。 
	bordercolorlight="#999999" bordercolordark="#000000" 
	你也可以用Css定义一个class。例如： 
	<style> 
	.bordercolor { bordercolorlight: #999999; bordercolordark: #000000 } 
	</style> 
	然后在要加效果的表格里加上<table class="bordercolor"> 
	 
	28,自动显示主页最后更新日期. 
	<script> 
	document.write("最后更新日期："+document.lastModified+"" 
	</script>爱电台有我  
	 
	29,如何让滚动条出现在左边？ 
	我想居然在论坛中有人发表了这段代码，很有意思，它的确照顾一些左撇子，呵呵！ 
	<html dir="rtl"> 
	<body bgcolor="#000000" text="#FFFFFF"> 
	<table height=18 width=212 align=center bgcolor=#FFFFFF dir="ltr" cellspacing="1" 　cellpadding="0"> 
	<tr> 
	<td bgcolor="#FF0000" >是不是你的滚动条在左边啊</td> 
	</tr> 
	</table> 
	</body> 
	</html> 
	 
	30,如何加入网址前面的小图标？ 
	首先,您必须了解所谓的图标（Icon）是一种特殊的图形文件格式，它是以 .ico 作为扩展名。你可用在网上找一个制作图标软件，它具有特有的规格：图标的大小为 16 * 16（以像素为单位）；颜色不得超过 16 色。 在该网页文件的 HEAD 部分加入下面的内容：<LINK REL="SHORTCUT ICON" HREF=" http://skydesigner.51.net/图标文件名">,并放在该网页的根目录下。 
	 
	31,在800*600显示器中，如何不让网页水平出现滚动条！ 
	设至<body leftmargin="0" topmargin="0">，网页中的表格宽度为778。 
	 
	32,关于<!DOTYPE>的说明解释。 
	在网页中，经常会看到〈!DOCTYPE HTML PUBLIC`-//W3C//DTD HTML 4.01//EN`>，是声明HTML文件的版本信息。 
	 
	33, 用图片来关闭窗体. 
	<A href="java script:window.close()"><IMG height=20 width=20 alt="关闭窗口" src="close.gif" border=0></A> 
	补充说明：如何使用了ACTIVEX！,不再警告窗口？ 
	<html> 
	<head> 
	<object id=closes type="application/x-oleobject" 
	classid="clsid:adb880a6-d8ff-11cf-9377-00aa003b7a11"> 
	<param name="Command" value="Close"></object> 
	</head> 
	<body bgcolor="#003063" text="#ffffff" id=all> <a href="#">关闭窗口无提示</a> 
	</body> 
	</html> 
	 
	34,禁止鼠标右键查看网页源代码。 
	<SCRIPT language=javascript> 
	function click() 
	{if (event.button==2) {alert(`你好,欢迎光临！`) }} 
	document.onmousedown=click 
	</SCRIPT> 
	补充说明： 
	鼠标完全被封锁,可以屏蔽鼠标右键和网页文字。 
	< body> 
	 
	35,通过按钮来查看网页源代码。 
	<input type="BUTTON" value="查看源代码" onClick= `window.location = "view-source:" + window.location.href` name="BUTTON"> 
	 
	36,怎么用文字联结实现按钮的SUBMIT功能？ 
	<a href="#">OK</a> 
	这段文字要放在form里。formname是这里要写在form中的name,<form name=form111>那么就应该是form111.submit() 
	 
	37,如何做一个空链接？ 
	加# 
	 
	38,利用<IFRAME>来给网页中插入网页。 
	经常我看到很多网页中又有一个网页，还以为是用了框架，其实不然，是用了<IFRAME>,它只适用于IE，NS可是不支持<IFRAME>的，但围着的字句只有在浏览器不支援 iframe 标记时才会显示，如<noframes>一样，可以放些提醒字句之类的话。 
	你注意啊！下面请和我学习它的用法。 
	分析代码：<iframe src="iframe.html" name="test" align="MIDDLE" width="300" height="100" marginwidth="1" marginheight="1" frameborder="1" scrolling="Yes"> </iframe>
	src="iframe.html" 
	用来显示<IFRAME>中的网页来源，必要加上相对或绝对路径。 
	name="test" 
	这是连结标记的 target 参数所需要的。 
	align="MIDDLE" 
	可选值为 left, right, top, middle, bottom，作用不大 。 
	width="300" height="100" 
	框窗的宽及长，以 pixels 为单位。 
	marginwidth="1" marginheight="1" 
	该插入的文件与框边所保留的空间。 
	frameborder="1" 
	使用 1 表示显示边框， 0 则不显示。（可以是 yes 或 no） 
	scrolling="Yes" 
	使用 Yes 表示容许卷动（内定）， No 则不容许卷动。 
	 39,请问＜tbody＞的用法？ 
	tbody用法据说是加强对表格的控制能力的.例如： 
	<table><tbody>……..</tbody></table> 
	tbody代码如果不是你用手写的话,只有在你用IE5打开一个网页的时候， 把它另存为 
	一下，你的另存为的文件在表格中就会生成tbody代码。(即便你的表格根本就没有 
	tbody代码，IE5另存为的时候也会给你生成)。 
	 
	40,Alt和Title都是提示性语言标签，请注意它们之间的区别。 
	在我们浏览网页时，当鼠标停留在图片对象或文字链接上时，在鼠标的右下角有时会出现一个提示信息框。对目标进行一定的注释说明。在一些场合，它的作用是很重要的。 
	alt 用来给图片来提示的。Title用来给链接文字或普通文字提示的。 
	用法如下： 
	<p Title="给链接文字提示">文字</p> 
	<a href="#" Title="给链接文字提示">文字</a> 
	<img src="图片.gif" alt="给图片提示"> 
	补充知识：<TITLE><ALT>里面如何多行换行？在源代码里Enter回车。 
	<a href="#" Title="个人简历 
	姓名：张培 
	网名：我是闪梦 
	性别：男的，不是女的。 
	爱好：网页制作，软件开发">个人简历</a> 
	例如：个人简历 
	 
	41, 用javascript代码来实现闪烁按钮。 
	<body> 
	<form method="POST" action="--WEBBOT-SELF--"> 
	<input type="button" name=SUB value="闪烁" id=flashit style="BORDER: 1px solid ;BACKGROUND-COLOR: #FFFFFF"> 
	</form> 
	<script> 
	if (document.all&&document.all.flashit) 
	{ 
	var flashelement=document.all.flashit 
	if (flashelement.length==null) 
	flashelement[0]=document.all.flashit 
	function changecolor(which) 
	{ 
	if (flashelement[which].style.color==`#800000`) 
	flashelement[which].style.color="#0063A4" 
	else 
	flashelement[which].style.color="#800000" 
	} 
	if (flashelement.length==null) 
	setInterval("changecolor(0)",1000) 
	else 
	for (i=0;i<flashelement.length;i++) 
	{ 
	var tempvariable=`setInterval("changecolor(`+i+`)",`+`1000)` 
	eval(tempvariable) 
	} 
	} 
	</script> 
	</body> 
	 
	42,CSS给图片定义颜色边框。 
	img { border: 1px solid red} 
	 
	43,在DW中如何使插入的FLASH透明。 
	方法一：选中swf,打开原代码窗口，在</object>前输入:<param name="wmode" value="transparent"> 
	方法二：在Flash中的Flie→Publist Settings→HTML→Window Mode选择transparent 
	 
	44,在DW编辑文本中，如何输入一个空格呢？ 
	输入空格的问题，在DW似乎已成了一个老生常谈的问题。通过将输入法调整到全角模式就可以避免了。本以人工智能ABC为例.按Shift+Space切换到全角状态。 
	 
	45,为何我的DW中图形显示不正常。 
	第一种：可能是因为你定义并正在使用一个site，而你的HTML文件或者图片不在这个site包含的区域之内，因此dreamweaver使用file协议来 
	描述图象的绝对路径，可惜IE不支持src中使用file协议，所以图象就显示不出来了。 
	第二种：可能是放图片的文件夹或图片名为中文，也显示不到网页中去。 
	 
	46,如何在本地机器上测试flash影片的loading？ 
	我想这可能是很多人在问的题了，其实很简单，在Test时，选选View->Show Streaming就可以看到了。 
	 
	47,在网页中做出一根竖的线有几种办法. 
	第一种方法：用一个像素图的办法！ 
	如果你用Dreamwever的Edit→Preferences…→Layout View中的Spacer Image给你创建了一个缺省名为：spacer.gif的一个像素图文件 。 
	代码中： 
	<table border="0" cellspacing="0" cellpadding="0"> 
	<tr> 
	<td bgcolor="#FF0000" height="200" ><img src="spacer.gif" width="1" height="1"></td> 
	</tr> 
	</table> 
	第二种方法：用表格填颜色的办法！把<td> </td>中的 删掉 . 
	<table border="0" cellspacing="0" cellpadding="0"> 
	<tr> 
	<td bgcolor="#FF0000" height="200" width="1"></td> 
	</tr> 
	</table> 
	第三种方法：用水平条。 
	<hr color="red" width="1" size="100%"> 
	 
	48, 关于鼠标拖动,改变层大小。──看看微软的做法. 
	<script> 
	document.execCommand("2D-position",false,true); 
	</script> 
	<DIV> 
	<DIV style="WIDTH: 300px; POSITION: absolute; HEIGHT: 100px; BACKGROUND-COLOR: red">移动层</DIV> 
	</DIV>

