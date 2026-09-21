/**
 * some JavaScript code for this blog theme
 */
/* jshint asi:true */

/////////////////////////header////////////////////////////
/**
 * 导航菜单与智能 Active 高亮校准
 */
(function() {
  var path = window.location.pathname;
  var navLinks = document.querySelectorAll('#headerNav ul li a');
  if (navLinks && navLinks.length > 0) {
    var hasActive = false;
    navLinks.forEach(function(link) {
      if (link.classList.contains('active')) {
        hasActive = true;
      }
    });

    if (!hasActive) {
      navLinks.forEach(function(link) {
        var href = link.getAttribute('href');
        var dataNav = link.getAttribute('data-nav');
        if (dataNav === 'home' && (path === '/' || path === '/index.html' || /^\/page\d+/i.test(path))) {
          link.classList.add('active');
          hasActive = true;
        } else if (href && href !== '/' && href !== '' && path.indexOf(href) === 0) {
          link.classList.add('active');
          hasActive = true;
        }
      });
    }
  }

  // 移动端菜单按钮安全监听
  var menuBtn = document.querySelector('#headerMenu');
  var nav = document.querySelector('#headerNav');
  if (menuBtn && nav) {
    menuBtn.onclick = function(e) {
      e.stopPropagation();
      menuBtn.classList.toggle('active');
      nav.classList.toggle('nav-show');
    };
  }
}());

//////////////////////////back to top////////////////////////////
(function() {
  var backToTop = document.querySelector('.back-to-top')
  var backToTopA = document.querySelector('.back-to-top a')
  // console.log(backToTop);
  window.addEventListener('scroll', function() {

    // 页面顶部滚进去的距离
    var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)

    if (scrollTop > 200) {
      backToTop.classList.add('back-to-top-show')
    } else {
      backToTop.classList.remove('back-to-top-show')
    }
  })

  // backToTopA.addEventListener('click',function (e) {
  //     e.preventDefault()
  //     window.scrollTo(0,0)
  // })
}());

//////////////////////////hover on demo//////////////////////////////
(function() {
  var demoItems = document.querySelectorAll('.grid-item')
}());
