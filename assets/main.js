(function() {
  'use strict';

  // === Auto-hide header on scroll ===
  var siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    var lastScrollY = window.scrollY || window.pageYOffset;
    var headerTicking = false;
    var headerJumpLockUntil = 0;
    var headerJumpTimer = null;

    function setHeaderHidden(hidden) {
      siteHeader.classList.toggle('is-hidden', hidden);
    }

    function updateHeaderOnScroll() {
      headerTicking = false;
      var y = window.scrollY || window.pageYOffset;

      // Ignore the scroll events produced by a TOC jump. Otherwise a jump
      // upwards would immediately reveal the header again.
      if (Date.now() < headerJumpLockUntil) {
        lastScrollY = y;
        return;
      }

      if (y <= 8) {
        setHeaderHidden(false);
        lastScrollY = y;
        return;
      }

      var delta = y - lastScrollY;
      if (Math.abs(delta) < 4) return;

      setHeaderHidden(delta > 0);
      lastScrollY = y;
    }

    window.addEventListener('scroll', function() {
      if (!headerTicking) {
        headerTicking = true;
        window.requestAnimationFrame(updateHeaderOnScroll);
      }
    }, { passive: true });

    function hideHeaderForTocJump() {
      setHeaderHidden(true);
      headerJumpLockUntil = Date.now() + 1200;

      clearTimeout(headerJumpTimer);
      headerJumpTimer = setTimeout(function() {
        headerJumpLockUntil = 0;
        lastScrollY = window.scrollY || window.pageYOffset;
      }, 1200);
    }

    if ('onscrollend' in window) {
      window.addEventListener('scrollend', function() {
        if (Date.now() < headerJumpLockUntil) {
          headerJumpLockUntil = 0;
          lastScrollY = window.scrollY || window.pageYOffset;
        }
      }, { passive: true });
    }

    var headerTocNav = document.getElementById('toc-nav');
    if (headerTocNav) {
      headerTocNav.addEventListener('click', function(e) {
        var link = e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null;
        if (link) hideHeaderForTocJump();
      });
    }
  }

  // === Back to Top ===
  var backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', function(e) {
      e.preventDefault();
      if (window.scrollY <= 300) {
        showCatSpeech('客人已经到博客顶部了喵～');
        return;
      }
      if (backToTop.classList.contains('jumping')) return;
      backToTop.classList.add('jumping');
      backToTop.addEventListener('animationend', function handler() {
        backToTop.classList.remove('jumping');
        backToTop.removeEventListener('animationend', handler);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  // === Cat Speech Bubble (30s random phrases) ===
  var catSpeech = document.getElementById('cat-speech');
  var catSpeechText = document.getElementById('cat-speech-text');
  var speechTimeout = null;
  var speechInterval = null;
  function showCatSpeech(text, duration) {
    if (!catSpeech || !catSpeechText) return;
    duration = duration || 3000;
    if (speechTimeout) clearTimeout(speechTimeout);
    catSpeechText.textContent = text;
    catSpeech.classList.add('visible');
    speechTimeout = setTimeout(function() {
      catSpeech.classList.remove('visible');
    }, duration);
  }
  if (catSpeech && catSpeechText) {
    var phrases = [
      '客人来啦，欢迎喵～',
      '主人正在忙哦喵，请客人在此歇息～',
      '要是觉得无聊，我陪你说话喵～',
      '风儿挠脸颊，痒痒的喵～',
      '好想蹭一蹭主人衣袖喵～',
      '悄悄告诉你们，主人今天心情很不错喵～',
      '唔，肚子有点咕咕叫啦～',
      '有任何需要，随时唤我喵～',
      '问人家喜欢吃什么？唔······都行喵，人家不挑食的喵，香菜除外哟～',
      '别乱动人家的耳朵和尾巴喵！会哈气的喵！'
    ];
    var lastIndex = -1;
    function showRandomPhrase() {
      var idx;
      do { idx = Math.floor(Math.random() * phrases.length); }
      while (idx === lastIndex && phrases.length > 1);
      lastIndex = idx;
      showCatSpeech(phrases[idx]);
    }
    showRandomPhrase();
    speechInterval = setInterval(showRandomPhrase, 30000);
  }

  // === Reading Progress Bar ===
  var progressBar = document.getElementById('reading-progress');
  if (progressBar) {
    window.addEventListener('scroll', function() {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        var progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
      }
    });
  }

  // === Code Block Copy Button + Line Numbers ===
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

    // Add line numbers
    var codeEl = pre.querySelector('code');
    if (codeEl) {
      var lines = codeEl.textContent.split('\n');
      if (lines.length > 1) {
        var html = '';
        for (var i = 0; i < lines.length; i++) {
          html += '<div class="code-line">' + (lines[i] ? escapeHtml(lines[i]) : '') + '</div>';
        }
        codeEl.innerHTML = html;
      }
    }
  });

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
  }

  // === Image Lazy Loading ===
  var images = document.querySelectorAll('.post-content img, .post-card-image img');
  images.forEach(function(img) {
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
  });

  // === Responsive table wrapper ===
  var contentTables = document.querySelectorAll('.post-content table');
  contentTables.forEach(function(table) {
    if (table.parentNode && table.parentNode.classList.contains('table-wrapper')) return;

    var columnCount = table.rows.length ? table.rows[0].cells.length : 0;
    if (columnCount >= 7) {
      table.classList.add('table-wide');
    }

    var tableWrapper = document.createElement('div');
    tableWrapper.className = 'table-wrapper';
    tableWrapper.setAttribute('tabindex', '0');
    tableWrapper.setAttribute('role', 'region');
    tableWrapper.setAttribute('aria-label', '表格，可横向滚动');
    table.parentNode.insertBefore(tableWrapper, table);
    tableWrapper.appendChild(table);
  });

  // === Lightbox ===
  var lightboxOverlay = document.getElementById('lightbox-overlay');
  var lightboxImage = document.getElementById('lightbox-image');
  if (lightboxOverlay && lightboxImage) {
    document.addEventListener('click', function(e) {
      var img = e.target.closest('.post-content img');
      if (img && img.src) {
        lightboxImage.src = img.src;
        lightboxOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });

    lightboxOverlay.addEventListener('click', function(e) {
      if (e.target === lightboxOverlay || e.target.classList.contains('lightbox-close')) {
        lightboxOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && lightboxOverlay.classList.contains('active')) {
        lightboxOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // === Table of Contents ===
  var tocNav = document.getElementById('toc-nav');
  if (tocNav) {
    var headings = document.querySelectorAll('.post-content h1, .post-content h2, .post-content h3');
    if (headings.length > 1) {
      var tocHtml = '';
      headings.forEach(function(h, index) {
        if (!h.id) {
          h.id = 'heading-' + index;
        }
        var level = h.tagName.toLowerCase();
        tocHtml += '<a href="#' + h.id + '" class="toc-' + level + '">' + h.textContent + '</a>';
      });
      tocNav.innerHTML = tocHtml;

      // Active TOC highlighting
      var tocLinks = tocNav.querySelectorAll('a');
      if (tocLinks.length > 0) {
        window.addEventListener('scroll', function() {
          var scrollY = window.scrollY + 100;
          var current = null;
          headings.forEach(function(h) {
            if (h.offsetTop <= scrollY) {
              current = h;
            }
          });
          tocLinks.forEach(function(link) {
            link.classList.remove('active');
            if (current && link.getAttribute('href') === '#' + current.id) {
              link.classList.add('active');
            }
          });
        });
      }
    } else {
      var tocContainer = document.getElementById('post-toc');
      if (tocContainer) tocContainer.style.display = 'none';
    }
  }

  // === Split post/page content into scroll-reveal blocks ===
  // A single .flip-in on the whole article breaks on long posts: the
  // IntersectionObserver threshold is a fraction of the target's area,
  // so a very tall article never reaches it. Animate its top-level blocks
  // instead, so each section reveals as it enters the viewport.
  var contentContainers = document.querySelectorAll('.post-content');
  Array.prototype.forEach.call(contentContainers, function(content) {
    content.classList.remove('flip-in', 'animate');

    var blockTags = {
      H1: true, H2: true, H3: true, H4: true, H5: true, H6: true,
      P: true, UL: true, OL: true, DL: true, BLOCKQUOTE: true,
      PRE: true, TABLE: true, FIGURE: true, HR: true, DETAILS: true,
      IMG: true, IFRAME: true, VIDEO: true, AUDIO: true
    };

    Array.prototype.forEach.call(content.children, function(child) {
      var tag = child.tagName;
      var isAnimatedDiv = tag === 'DIV' && (
        child.classList.contains('code-block-wrapper') ||
        child.classList.contains('katex-display') ||
        child.classList.contains('MathJax_Display') ||
        child.classList.contains('highlight') ||
        child.classList.contains('table-wrapper')
      );

      if ((blockTags[tag] || isAnimatedDiv) && !child.classList.contains('flip-in')) {
        child.classList.add('flip-in');
      }
    });
  });

  // === Scroll-based Animations (Flip-in + Fade-in) ===
  var animElements = document.querySelectorAll('.flip-in, .animate-on-scroll');
  if (animElements.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0 });

    animElements.forEach(function(el) { observer.observe(el); });
  } else {
    animElements.forEach(function(el) { el.classList.add('animate'); });
  }

  // No timeout fallback: every content block is observed individually, so
  // article length cannot exhaust a single threshold. Browsers without
  // IntersectionObserver are handled by the else branch above.

  // Stagger delay for flip-in elements in post list
  var postItems = document.querySelectorAll('.post-list .flip-in');
  postItems.forEach(function(el, i) {
    el.style.transitionDelay = (i * 0.1) + 's';
  });

  // === Animated Counter for Stats Bar ===
  var statsBar = document.getElementById('stats-bar');
  if (statsBar && 'IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var targets = entry.target.querySelectorAll('.stat-number[data-target]');
          targets.forEach(function(el) {
            var target = parseInt(el.getAttribute('data-target'), 10);
            if (isNaN(target) || target <= 0) { el.textContent = target || 0; return; }
            var current = 0;
            var step = Math.max(1, Math.floor(target / 40));
            var duration = 1200;
            var interval = duration / Math.ceil(target / step);
            var timer = setInterval(function() {
              current += step;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              el.textContent = current;
            }, interval);
          });
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    counterObserver.observe(statsBar);
  }

  // === Typewriter Effect for Hero Description ===
  var typewriterEl = document.getElementById('typewriter-text');
  if (typewriterEl) {
    var text = '无根之水难解渴，遇到Bug莫上火。';
    var index = 0;
    var cursorEl = document.createElement('span');
    cursorEl.className = 'cursor';
    typewriterEl.appendChild(cursorEl);

    function typeNext() {
      if (index < text.length) {
        typewriterEl.insertBefore(document.createTextNode(text[index]), cursorEl);
        index++;
        setTimeout(typeNext, 80 + Math.random() * 50);
      }
    }
    setTimeout(typeNext, 800);
  }

  // === Particle Background ===
  var canvas = document.getElementById('particle-canvas');
  if (canvas && 'getContext' in canvas) {
    var ctx = canvas.getContext('2d');
    var particles = [];
    var particleCount = 50;
    var mouseX = -1000;
    var mouseY = -1000;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    for (var i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1
      });
    }

    document.addEventListener('mousemove', function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(77, 182, 172, ' + p.opacity + ')';
        ctx.fill();

        // Draw connections
        for (var j = i + 1; j < particles.length; j++) {
          var p2 = particles[j];
          var dx = p.x - p2.x;
          var dy = p.y - p2.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(77, 182, 172, ' + (0.08 * (1 - dist / 120)) + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Connect to mouse
        var mouseDx = p.x - mouseX;
        var mouseDy = p.y - mouseY;
        var mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
        if (mouseDist < 150) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = 'rgba(77, 182, 172, ' + (0.15 * (1 - mouseDist / 150)) + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      requestAnimationFrame(drawParticles);
    }

    drawParticles();
  }

  // === Search Function ===
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
               (p.categories && p.categories.some(function(c) { return c.toLowerCase().includes(q); })) ||
               (p.tags && p.tags.some(function(t) { return t.toLowerCase().includes(q); }));
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

    // Close search on outside click
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.hero-search')) {
        searchResults.classList.remove('active');
      }
    });
  }

  // === Quick Search ===
  var searchToggle = document.getElementById('search-toggle');
  var quickSearch = document.getElementById('quick-search');
  var quickSearchInput = document.getElementById('quick-search-input');
  var quickSearchResults = document.getElementById('quick-search-results');
  if (searchToggle && quickSearch) {
    var quickPosts = [];
    fetch('/search.json')
      .then(function(r) { return r.json(); })
      .then(function(data) { quickPosts = data; });

    searchToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      quickSearch.classList.toggle('active');
      if (quickSearch.classList.contains('active')) {
        quickSearchInput.focus();
      } else {
        quickSearchInput.value = '';
        quickSearchResults.innerHTML = '';
        quickSearchResults.classList.remove('active');
      }
    });

    quickSearchInput.addEventListener('input', function() {
      var q = this.value.toLowerCase().trim();
      if (!q) {
        quickSearchResults.innerHTML = '';
        quickSearchResults.classList.remove('active');
        return;
      }
      var matches = quickPosts.filter(function(p) {
        return p.title.toLowerCase().includes(q) ||
               (p.excerpt && p.excerpt.toLowerCase().includes(q)) ||
               (p.categories && p.categories.some(function(c) { return c.toLowerCase().includes(q); })) ||
               (p.tags && p.tags.some(function(t) { return t.toLowerCase().includes(q); }));
      });
      if (matches.length === 0) {
        quickSearchResults.innerHTML = '<li class="quick-search-no-result">未找到相关内容</li>';
      } else {
        quickSearchResults.innerHTML = matches.slice(0, 10).map(function(p) {
          return '<li><a href="' + p.url + '">' + p.title + '</a></li>';
        }).join('');
      }
      quickSearchResults.classList.add('active');
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && quickSearch.classList.contains('active')) {
        quickSearch.classList.remove('active');
        quickSearchResults.innerHTML = '';
        quickSearchResults.classList.remove('active');
        quickSearchInput.value = '';
      }
    });

    document.addEventListener('click', function(e) {
      if (quickSearch.classList.contains('active') &&
          !quickSearch.contains(e.target) &&
          e.target !== searchToggle &&
          !searchToggle.contains(e.target)) {
        quickSearch.classList.remove('active');
        quickSearchResults.innerHTML = '';
        quickSearchResults.classList.remove('active');
        quickSearchInput.value = '';
      }
    });
  }

  // === GitHub Contribution Chart (theme-aware color) ===
  function updateGithubChart() {
    var chart = document.getElementById('github-chart');
    if (!chart) return;
    var color = document.body.classList.contains('light-mode') ? 'EC807E' : '4db6ac';
    chart.src = 'https://ghchart.rshah.org/' + color + '/CanYouImag';
  }

  // === Theme Toggle ===
  var themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    // Auto theme by clock: light 7:00-19:00, dark 19:00-7:00.
    // A manually stored choice (light/dark) overrides the clock.
    var savedTheme = localStorage.getItem('theme');
    var autoLight;
    if (savedTheme === 'light') {
      autoLight = true;
    } else if (savedTheme === 'dark') {
      autoLight = false;
    } else {
      var hour = new Date().getHours();
      autoLight = hour >= 7 && hour < 19;
    }
    if (autoLight) {
      document.body.classList.add('light-mode');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    updateGithubChart();

    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('light-mode');
      var isLight = document.body.classList.contains('light-mode');
      themeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      updateGithubChart();

      var giscusFrame = document.querySelector('iframe.giscus-frame');
      if (giscusFrame) {
        giscusFrame.contentWindow.postMessage({
          giscus: { setConfig: { theme: isLight ? 'light' : 'dark' } }
        }, 'https://giscus.app');
      }
    });
  }

  // === Ripple Click Effect ===
  document.addEventListener('click', function(e) {
    var ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    document.body.appendChild(ripple);
    ripple.addEventListener('animationend', function() {
      ripple.parentNode.removeChild(ripple);
    });
  });

  // === Return to the position before a knowledge-point jump ===
  // Every internal link inside .post-content (same page or cross page) pushes
  // its source position onto a small session stack. The destination shows a
  // low-key floating pill; returning pops the stack, restores the exact scroll
  // position and briefly highlights the link that was clicked.
  var JUMP_STACK_KEY = 'blog:jump-stack';
  var JUMP_RESTORE_KEY = 'blog:jump-restore';
  var JUMP_TTL = 6 * 60 * 60 * 1000;
  var JUMP_STACK_LIMIT = 8;

  function jumpStorageRead(key) {
    try {
      var raw = window.sessionStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function jumpStorageWrite(key, value) {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
  }

  function jumpStorageRemove(key) {
    try {
      window.sessionStorage.removeItem(key);
    } catch (e) {}
  }

  function jumpDecode(value) {
    try {
      return decodeURIComponent(value);
    } catch (e) {
      return value;
    }
  }

  function jumpCurrentPage() {
    return jumpDecode(window.location.pathname + window.location.search);
  }

  function jumpStack() {
    var stack = jumpStorageRead(JUMP_STACK_KEY);
    if (!Array.isArray(stack)) return [];
    var fresh = [];
    var now = Date.now();
    for (var i = 0; i < stack.length; i++) {
      var entry = stack[i];
      if (!entry || !entry.url || !entry.to || !entry.ts) continue;
      if (now - entry.ts > JUMP_TTL) continue;
      fresh.push(entry);
    }
    if (fresh.length !== stack.length) jumpStorageWrite(JUMP_STACK_KEY, fresh);
    return fresh;
  }

  function jumpPush(entry) {
    var stack = jumpStack();
    var top = stack[stack.length - 1];
    if (top && top.to === entry.to && top.url === entry.url &&
        Math.abs((top.scrollY || 0) - entry.scrollY) < 4) {
      return;
    }
    stack.push(entry);
    if (stack.length > JUMP_STACK_LIMIT) {
      stack.splice(0, stack.length - JUMP_STACK_LIMIT);
    }
    jumpStorageWrite(JUMP_STACK_KEY, stack);
  }

  function jumpSectionTitle(node) {
    var headings = document.querySelectorAll(
      '.post-content h1, .post-content h2, .post-content h3, ' +
      '.post-content h4, .post-content h5, .post-content h6'
    );
    var title = '';
    for (var i = 0; i < headings.length; i++) {
      if (headings[i] === node || headings[i].contains(node)) {
        title = headings[i].textContent.trim();
        break;
      }
      if (headings[i].compareDocumentPosition(node) & Node.DOCUMENT_POSITION_FOLLOWING) {
        title = headings[i].textContent.trim();
      } else {
        break;
      }
    }
    return title || document.title;
  }

  function jumpHighlightOrigin(origin) {
    if (!origin || !origin.linkHref) return;
    var links = document.querySelectorAll('.post-content a[href]');
    var fallback = null;

    function mark(link) {
      link.classList.remove('jump-return-highlight');
      void link.offsetWidth;
      link.classList.add('jump-return-highlight');
      setTimeout(function() {
        link.classList.remove('jump-return-highlight');
      }, 2600);
    }

    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      if (link.getAttribute('href') !== origin.linkHref) continue;
      if (link.textContent.trim() === (origin.linkText || '')) {
        mark(link);
        return;
      }
      if (!fallback) fallback = link;
    }
    if (fallback) mark(fallback);
  }

  var jumpPill = null;
  var jumpPillLabel = null;
  var jumpPillShown = false;

  function buildJumpPill() {
    if (jumpPill) return;
    jumpPill = document.createElement('div');
    jumpPill.id = 'jump-back';
    jumpPill.className = 'jump-back';
    jumpPill.hidden = true;
    jumpPill.innerHTML =
      '<button type="button" class="jump-back-main">' +
        '<span class="jump-back-arrow" aria-hidden="true">←</span>' +
        '<span class="jump-back-prefix">返回</span>' +
        '<span class="jump-back-label"></span>' +
      '</button>' +
      '<button type="button" class="jump-back-close" aria-label="关闭返回提示" title="关闭">×</button>';
    document.body.appendChild(jumpPill);
    jumpPillLabel = jumpPill.querySelector('.jump-back-label');
    jumpPill.querySelector('.jump-back-main').addEventListener('click', jumpReturn);
    jumpPill.querySelector('.jump-back-close').addEventListener('click', jumpDismiss);
  }

  function jumpShow(origin) {
    buildJumpPill();
    var title = (origin.title || '跳转前的位置').replace(/\s+/g, ' ').trim();
    jumpPillLabel.textContent = title;
    var main = jumpPill.querySelector('.jump-back-main');
    main.setAttribute('aria-label', '返回到跳转前的位置：' + title);
    main.title = '返回到：' + title;
    jumpPill.hidden = false;
    window.requestAnimationFrame(function() {
      window.requestAnimationFrame(function() {
        jumpPill.classList.add('is-visible');
      });
    });
    jumpPillShown = true;
  }

  function jumpHide() {
    if (!jumpPill) return;
    jumpPill.classList.remove('is-visible');
    jumpPillShown = false;
    setTimeout(function() {
      if (jumpPill && !jumpPillShown) jumpPill.hidden = true;
    }, 240);
  }

  function jumpDismiss() {
    var stack = jumpStack();
    if (stack.length) {
      stack.pop();
      jumpStorageWrite(JUMP_STACK_KEY, stack);
    }
    jumpHide();
  }

  function jumpCheck() {
    var restore = jumpStorageRead(JUMP_RESTORE_KEY);
    if (restore) {
      if (jumpDecode(restore.url) === jumpCurrentPage()) return;
      jumpStorageRemove(JUMP_RESTORE_KEY);
    }
    var stack = jumpStack();
    if (!stack.length) {
      jumpHide();
      return;
    }
    var top = stack[stack.length - 1];
    // Keep the return option available while reading other sections of the
    // same destination note; only the page matters, not the current anchor.
    var currentPage = jumpCurrentPage();
    var targetPage = top.to.split('#')[0];
    if (targetPage !== currentPage) {
      jumpHide();
      return;
    }
    jumpShow(top);
  }

  function jumpReturn() {
    var stack = jumpStack();
    if (!stack.length) {
      jumpHide();
      return;
    }
    var origin = stack.pop();
    jumpStorageWrite(JUMP_STACK_KEY, stack);
    var samePage = origin.url === jumpCurrentPage();
    jumpHide();

    if (samePage) {
      var target = origin.url + (origin.hash || '');
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', target);
      }
      var distance = Math.abs((window.scrollY || window.pageYOffset || 0) - (origin.scrollY || 0));
      window.scrollTo({
        top: origin.scrollY || 0,
        behavior: distance > 2400 ? 'auto' : 'smooth'
      });
      setTimeout(function() {
        jumpHighlightOrigin(origin);
        jumpCheck();
      }, distance > 2400 ? 80 : 420);
    } else {
      jumpStorageWrite(JUMP_RESTORE_KEY, {
        url: origin.url,
        hash: origin.hash || '',
        scrollY: origin.scrollY || 0,
        linkHref: origin.linkHref,
        linkText: origin.linkText,
        ts: Date.now()
      });
      window.location.href = origin.url + (origin.hash || '');
    }
  }

  function jumpRestore() {
    var state = jumpStorageRead(JUMP_RESTORE_KEY);
    if (!state) return false;
    if (jumpDecode(state.url) !== jumpCurrentPage()) {
      jumpStorageRemove(JUMP_RESTORE_KEY);
      return false;
    }
    jumpStorageRemove(JUMP_RESTORE_KEY);

    var targetY = state.scrollY || 0;
    var lastSet = null;
    var userMoved = false;
    var events = ['wheel', 'touchstart', 'keydown', 'mousedown'];

    function markUser() {
      userMoved = true;
    }

    for (var i = 0; i < events.length; i++) {
      window.addEventListener(events[i], markUser, { passive: true });
    }

    function apply() {
      if (userMoved) return;
      var current = window.scrollY || window.pageYOffset || 0;
      if (lastSet !== null && Math.abs(current - lastSet) > 2) {
        userMoved = true;
        return;
      }
      window.scrollTo(0, targetY);
      lastSet = window.scrollY || window.pageYOffset || 0;
    }

    apply();
    var delays = [120, 400, 800, 1400];
    for (var d = 0; d < delays.length; d++) {
      setTimeout(apply, delays[d]);
    }
    setTimeout(function() {
      for (var j = 0; j < events.length; j++) {
        window.removeEventListener(events[j], markUser);
      }
      jumpHighlightOrigin(state);
      jumpCheck();
    }, 1600);
    return true;
  }

  if (document.querySelector('.post-content')) {
    document.addEventListener('click', function(e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var link = e.target && e.target.closest ? e.target.closest('a[href]') : null;
      if (!link || !link.closest('.post-content')) return;
      if (link.target && link.target !== '_self') return;
      if (link.hasAttribute('download') || link.getAttribute('data-jump-back') === 'off') return;

      var url;
      try {
        url = new URL(link.href, window.location.href);
      } catch (err) {
        return;
      }
      if (url.origin !== window.location.origin) return;

      // Only remember real pages, not images, PDFs and other assets.
      var lastSegment = url.pathname.slice(url.pathname.lastIndexOf('/') + 1);
      if (lastSegment.indexOf('.') !== -1 && !/\.html?$/i.test(lastSegment)) return;

      var samePath = url.pathname === window.location.pathname && url.search === window.location.search;
      if (samePath && !url.hash) return;
      if (samePath && url.hash === window.location.hash) return;

      jumpPush({
        url: window.location.pathname + window.location.search,
        hash: window.location.hash || '',
        scrollY: window.scrollY || window.pageYOffset || 0,
        title: jumpSectionTitle(link),
        linkHref: link.getAttribute('href'),
        linkText: link.textContent.trim(),
        to: jumpDecode(url.pathname + url.search + url.hash),
        ts: Date.now()
      });
    }, true);

    window.addEventListener('hashchange', function() {
      setTimeout(jumpCheck, 150);
    });

    window.addEventListener('load', function() {
      if (!jumpRestore()) setTimeout(jumpCheck, 150);
    });

    window.addEventListener('pageshow', function(e) {
      if (e.persisted) {
        jumpRestore();
        setTimeout(jumpCheck, 150);
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && jumpPillShown) jumpDismiss();
    });

    setTimeout(jumpCheck, 120);

    if (document.readyState === 'complete') {
      if (!jumpRestore()) setTimeout(jumpCheck, 150);
    }
  }

  // === Site Running Time ===
  var siteStartDate = new Date('2026-05-07T18:36:40+08:00');
  var ageDisplay = document.getElementById('site-age-display');
  if (ageDisplay) {
    function updateSiteAge() {
      var now = new Date();
      var diff = now - siteStartDate;
      var seconds = Math.floor(diff / 1000) % 60;
      var minutes = Math.floor(diff / (1000 * 60)) % 60;
      var hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
      var days = Math.floor(diff / (1000 * 60 * 60 * 24));
      ageDisplay.textContent = days + ' 天 ' + hours + ' 时 ' + minutes + ' 分 ' + seconds + ' 秒';
    }
    updateSiteAge();
    setInterval(updateSiteAge, 1000);
  }

})();
