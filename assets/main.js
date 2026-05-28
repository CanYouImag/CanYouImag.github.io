(function() {
  'use strict';

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
    var headings = document.querySelectorAll('.post-content h2, .post-content h3');
    if (headings.length > 1) {
      var tocHtml = '';
      headings.forEach(function(h, index) {
        if (!h.id) {
          h.id = 'heading-' + index;
        }
        var level = h.tagName.toLowerCase() === 'h2' ? 'h2' : 'h3';
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
    }, { threshold: 0.1 });

    animElements.forEach(function(el) { observer.observe(el); });
  } else {
    animElements.forEach(function(el) { el.classList.add('animate'); });
  }

  // Stagger delay for flip-in elements in post list
  var postItems = document.querySelectorAll('.post-list .flip-in');
  postItems.forEach(function(el, i) {
    el.style.transitionDelay = (i * 0.1) + 's';
  });

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

})();
