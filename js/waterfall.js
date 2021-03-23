/* jshint asi:true */
//先等图片都加载完成
//再执行布局函数

/**
 * 执行主函数
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
(function() {

  /**
     * 内容JSON
     */
  var demoContent = [
  {
      demo_link: 'https://pub.dev/packages/app_debug',
      img_link: 'https://yfmingo.oss-cn-beijing.aliyuncs.com/images/app_debug2.gif',
      code_link: 'https://github.com/yfming93/app_debug',
      title: 'Flutter app 内部调试工具。包含接口日志打印，版本环境切换等',
      core_tech: 'flutter dart',
      description: 'A useful debug tool for flutter developer. Easy to use. Show anywhere where to want. You will look over the request log without computer. It‘s a quick way to chose the api host.'
    },
    {
      demo_link: 'https://github.com/yfming93/FMListPlaceholder',
      img_link: 'https://yfmingo.oss-cn-beijing.aliyuncs.com/images/006tNc79ly1fz7ly8x5feg30gx0dokjm.gif',
      code_link: 'https://github.com/yfming93/FMListPlaceholder',
      title: '空列表占位图逻辑超级封装',
      core_tech: 'Cocoapods 公有pods  OC',
      description: 'A delightful Placeholder for List View (UITableView,UICollectionView). 一行代码自动处理空列表占位图逻辑。'
    },
    {
      demo_link: 'https://github.com/yfming93/PagingButton',
      img_link: 'https://yfmingo.oss-cn-beijing.aliyuncs.com/images/page.gif',
      code_link: 'https://github.com/yfming93/PagingButton',
      title: '左右分页按钮的集合视图控件。',
      core_tech: 'PagingButton Cocoapods 公有pods  OC ',
      description: '这是一个左右分页按钮的集合视图控件。用于快速编写出集合视图上分页多按钮点击事件！'
    },
    {
      demo_link: 'https://yfming93.github.io/vuejs/VueShoppingCart/after/cart.html',
      img_link: 'https://yfmingo.oss-cn-beijing.aliyuncs.com/images/vue.gif',
      code_link: 'https://github.com/yfming93/vuejs',
      title: 'Vuejs2.0购物车和地址选配学习实践demo。',
      core_tech: 'Vue2.0 Css Html  JavaScript ',
      description: '按照慕课网的Vue2.0的学习视频零基础实践的一个demo'
    }
  ];

  contentInit(demoContent) //内容初始化
  waitImgsLoad() //等待图片加载，并执行布局初始化
}());

/**
 * 内容初始化
 * @return {[type]} [description]
 */
function contentInit(content) {
  // var htmlArr = [];
  // for (var i = 0; i < content.length; i++) {
  //     htmlArr.push('<div class="grid-item">')
  //     htmlArr.push('<a class="a-img" href="'+content[i].demo_link+'">')
  //     htmlArr.push('<img src="'+content[i].img_link+'">')
  //     htmlArr.push('</a>')
  //     htmlArr.push('<h3 class="demo-title">')
  //     htmlArr.push('<a href="'+content[i].demo_link+'">'+content[i].title+'</a>')
  //     htmlArr.push('</h3>')
  //     htmlArr.push('<p>主要技术：'+content[i].core_tech+'</p>')
  //     htmlArr.push('<p>'+content[i].description)
  //     htmlArr.push('<a href="'+content[i].code_link+'">源代码 <i class="fa fa-code" aria-hidden="true"></i></a>')
  //     htmlArr.push('</p>')
  //     htmlArr.push('</div>')
  // }
  // var htmlStr = htmlArr.join('')
  var htmlStr = ''
  for (var i = 0; i < content.length; i++) {
    htmlStr += '<div class="grid-item">' + '   <a class="a-img" href="' + content[i].demo_link + '">' + '       <img src="' + content[i].img_link + '">' + '   </a>' + '   <h3 class="demo-title">' + '       <a href="' + content[i].demo_link + '">' + content[i].title + '</a>' + '   </h3>' + '   <p>主要技术：' + content[i].core_tech + '</p>' + '   <p>' + content[i].description + '       <a href="' + content[i].code_link + '">源代码 <i class="fa fa-code" aria-hidden="true"></i></a>' + '   </p>' + '</div>'
  }
  var grid = document.querySelector('.grid')
  grid.insertAdjacentHTML('afterbegin', htmlStr)
}

/**
 * 等待图片加载
 * @return {[type]} [description]
 */
function waitImgsLoad() {
  var imgs = document.querySelectorAll('.grid img')
  var totalImgs = imgs.length
  var count = 0
  //console.log(imgs)
  for (var i = 0; i < totalImgs; i++) {
    if (imgs[i].complete) {
      //console.log('complete');
      count++
    } else {
      imgs[i].onload = function() {
        // alert('onload')
        count++
        //console.log('onload' + count)
        if (count == totalImgs) {
          //console.log('onload---bbbbbbbb')
          initGrid()
        }
      }
    }
  }
  if (count == totalImgs) {
    //console.log('---bbbbbbbb')
    initGrid()
  }
}

/**
 * 初始化栅格布局
 * @return {[type]} [description]
 */
function initGrid() {
  var msnry = new Masonry('.grid', {
    // options
    itemSelector: '.grid-item',
    columnWidth: 250,
    isFitWidth: true,
    gutter: 20
  })
}
