/**
 * @Author: 袁凤鸣
 * @Date: 2026-09-21
 * @Description: 轻量级动态交互星空流光背景 (Interactive Stardust Background)
 * 特性：零外部依赖、响应式自适应、鼠标交互光场、页面离屏自动休眠、极致低能耗。
 */
(function () {
  'use strict';

  // 如果不支持 Canvas，则静默退出
  if (!document.createElement('canvas').getContext) return;

  var canvas = document.createElement('canvas');
  canvas.id = 'interactive-bg-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';
  canvas.style.opacity = '0.7';

  document.body.appendChild(canvas);

  var ctx = canvas.getContext('2d');
  var width = 0;
  var height = 0;
  var particles = [];
  var animFrameId = null;
  var isRunning = true;

  // 鼠标坐标与感应半径
  var mouse = {
    x: -1000,
    y: -1000,
    radius: 140
  };

  // 根据屏幕尺寸动态调整粒子总数（移动端降频以保电量）
  function getParticleCount() {
    var area = window.innerWidth * window.innerHeight;
    var isMobile = window.innerWidth < 768;
    if (isMobile) {
      return Math.floor(area / 35000) + 20; // 移动端约 25~35 个
    }
    return Math.min(Math.floor(area / 18000) + 30, 75); // 桌面端保持在 50~75 个
  }

  var dpr = 1;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  function Particle() {
    this.reset();
  }

  Particle.prototype.reset = function () {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.radius = Math.random() * 1.6 + 0.8;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    // 优雅的淡蓝、淡青与柔紫配色
    var colors = [
      'rgba(80, 140, 230, ',
      'rgba(60, 180, 220, ',
      'rgba(140, 120, 240, '
    ];
    this.baseColor = colors[Math.floor(Math.random() * colors.length)];
    this.alpha = Math.random() * 0.5 + 0.3;
  };

  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;

    // 边缘弹回或循环
    if (this.x < 0) this.x = width;
    else if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    else if (this.y > height) this.y = 0;

    // 鼠标近距离微扰互动（轻柔避让与连线吸引）
    var dx = this.x - mouse.x;
    var dy = this.y - mouse.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < mouse.radius && dist > 0) {
      var force = (mouse.radius - dist) / mouse.radius;
      this.x += (dx / dist) * force * 1.5;
      this.y += (dy / dist) * force * 1.5;
    }
  };

  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.baseColor + this.alpha + ')';
    ctx.fill();
  };

  function initParticles() {
    particles = [];
    var count = getParticleCount();
    for (var i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function render() {
    if (!isRunning) return;
    ctx.clearRect(0, 0, width, height);

    var maxDist = 120;
    var len = particles.length;

    // 绘制粒子并计算近邻粒子连线
    for (var i = 0; i < len; i++) {
      var p1 = particles[i];
      p1.update();
      p1.draw();

      for (var j = i + 1; j < len; j++) {
        var p2 = particles[j];
        var dx = p1.x - p2.x;
        var dy = p1.y - p2.y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          var linkAlpha = (1 - dist / maxDist) * 0.22;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = 'rgba(100, 150, 230, ' + linkAlpha + ')';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // 与鼠标位置的流光连线
      var mdx = p1.x - mouse.x;
      var mdy = p1.y - mouse.y;
      var mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdist < mouse.radius) {
        var mAlpha = (1 - mdist / mouse.radius) * 0.45;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = 'rgba(75, 160, 255, ' + mAlpha + ')';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    animFrameId = requestAnimationFrame(render);
  }

  // 事件监听与性能管理
  window.addEventListener('resize', function () {
    resize();
    initParticles();
  });

  window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', function () {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  // 页面离开当前标签页时休眠，返回时唤醒
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      isRunning = false;
      if (animFrameId) cancelAnimationFrame(animFrameId);
    } else {
      if (!isRunning) {
        isRunning = true;
        render();
      }
    }
  });

  // 初始化
  resize();
  initParticles();
  render();
})();
