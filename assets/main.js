(function() {
  // === 回到顶部 ===
  var backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    backToTop.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // === 代码块复制按钮 ===
  var codeBlocks = document.querySelectorAll('pre');
  codeBlocks.forEach(function(pre) {
    var wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    var btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = '复制';
    wrapper.appendChild(btn);

    btn.addEventListener('click', function() {
      var code = pre.querySelector('code');
      var text = code ? code.textContent : pre.textContent;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() {
          btn.textContent = '已复制!';
          setTimeout(function() { btn.textContent = '复制'; }, 2000);
        });
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        btn.textContent = '已复制!';
        setTimeout(function() { btn.textContent = '复制'; }, 2000);
      }
    });
  });

  // === 图片懒加载 ===
  var images = document.querySelectorAll('.post-content img');
  images.forEach(function(img) {
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
  });

  // === 搜索功能 ===
  var searchInput = document.getElementById('search-input');
  var searchResults = document.getElementById('search-results');
  if (searchInput && searchResults) {
    var posts = [];
    fetch('/search.json')
      .then(function(r) { return r.json(); })
      .then(function(data) {
        posts = data;
      });

    searchInput.addEventListener('input', function() {
      var q = this.value.toLowerCase().trim();
      if (!q) {
        searchResults.innerHTML = '';
        searchResults.classList.remove('active');
        return;
      }
      var matches = posts.filter(function(p) {
        return p.title.toLowerCase().includes(q) ||
               (p.excerpt && p.excerpt.toLowerCase().includes(q)) ||
               (p.categories && p.categories.some(function(c) { return c.toLowerCase().includes(q); }));
      });
      if (matches.length === 0) {
        searchResults.innerHTML = '<li class="search-no-result">未找到相关内容</li>';
      } else {
        searchResults.innerHTML = matches.slice(0, 10).map(function(p) {
          return '<li><a href="' + p.url + '">' +
                 '<span class="search-title">' + p.title + '</span>' +
                 '<span class="search-meta">' + p.date + '</span></a></li>';
        }).join('');
      }
      searchResults.classList.add('active');
    });
  }
})();
