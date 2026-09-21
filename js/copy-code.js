/**
 * @Author: 袁凤鸣
 * @Date: 2026-09-21
 * @Description: 原生轻量级代码一键复制功能 (Code Copy to Clipboard)
 * 特性：零外部依赖、自动扫描代码块、点击即拷、提供优雅视觉动效反馈。
 */
(function () {
  'use strict';

  function initCodeCopy() {
    var codeBlocks = document.querySelectorAll('pre');

    codeBlocks.forEach(function (pre) {
      var code = pre.querySelector('code');
      if (!code) return;

      // 避免重复挂载
      if (pre.getAttribute('data-copy-inited') === 'true') return;
      pre.setAttribute('data-copy-inited', 'true');

      // 寻找最适合作为定位容器的父级（通常是 .highlight 或 pre 自身）
      var container = pre.parentElement;
      if (container && container.classList.contains('highlight')) {
        container.classList.add('code-block-wrapper');
      } else {
        pre.classList.add('code-block-wrapper');
        container = pre;
      }

      var button = document.createElement('button');
      button.className = 'code-copy-btn';
      button.type = 'button';
      button.innerText = '复制';
      button.setAttribute('aria-label', '复制代码至剪贴板');

      var copyTimer = null;
      button.addEventListener('click', function () {
        var text = code.innerText || code.textContent || '';
        // 过滤末尾多余空行
        text = text.replace(/\n+$/, '');

        function showSuccess() {
          if (copyTimer) clearTimeout(copyTimer);
          button.innerText = '已复制 ✓';
          button.classList.add('copied');
          copyTimer = setTimeout(function () {
            button.innerText = '复制';
            button.classList.remove('copied');
            copyTimer = null;
          }, 1600);
        }

        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(text).then(showSuccess).catch(function () {
            fallbackCopy(text, showSuccess);
          });
        } else {
          fallbackCopy(text, showSuccess);
        }
      });

      container.appendChild(button);
    });
  }

  function fallbackCopy(text, callback) {
    var textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      var successful = document.execCommand('copy');
      if (successful && callback) callback();
    } catch (err) {}
    document.body.removeChild(textArea);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCodeCopy);
  } else {
    initCodeCopy();
  }
})();
