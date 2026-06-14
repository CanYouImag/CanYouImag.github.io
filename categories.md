---
layout: page
title: 分类
permalink: /categories/
nav_exclude: true
---

<div id="category-page">
  <div id="category-grid" class="category-grid">
    {%- for category in site.categories -%}
    {%- assign cat_size = category[1] | size -%}
    <a href="#{{ category[0] | url_encode }}" class="category-card">
      <div class="category-card-icon">
        <i class="fas fa-folder-open"></i>
      </div>
      <h3>{{ category[0] }}</h3>
      <p>{{ cat_size }} 篇文章</p>
    </a>
    {%- endfor -%}
  </div>

  <div id="category-detail" class="category-detail" style="display:none">
    <a href="/categories/" class="back-to-tools"><i class="fas fa-arrow-left"></i> 返回分类列表</a>
    <h2 id="category-detail-title" class="category-detail-title"></h2>
    <ul id="category-detail-list" class="category-detail-list"></ul>
  </div>
</div>

<script>
  (function() {
    var data = {
      {%- for category in site.categories -%}
      "{{ category[0] | url_encode }}": {
        name: {{ category[0] | jsonify }},
        posts: [
          {%- for post in category[1] -%}
          {
            title: {{ post.title | jsonify }},
            url: {{ post.url | relative_url | jsonify }},
            date: {{ post.date | date: "%Y-%m-%d" | jsonify }}
          }{%- unless forloop.last -%},{%- endunless -%}
          {%- endfor -%}
        ]
      }{%- unless forloop.last -%},{%- endunless -%}
      {%- endfor -%}
    };

    function showCategory(key) {
      var grid = document.getElementById('category-grid');
      var detail = document.getElementById('category-detail');
      var entry = data[key];
      if (!key || !entry) {
        grid.style.display = '';
        detail.style.display = 'none';
        return;
      }
      grid.style.display = 'none';
      detail.style.display = '';
      document.getElementById('category-detail-title').textContent = entry.name;
      var list = document.getElementById('category-detail-list');
      list.innerHTML = '';
      entry.posts.forEach(function(post) {
        var li = document.createElement('li');
        li.innerHTML = '<span class="post-meta">' + post.date + '</span><a class="post-link" href="' + post.url + '">' + post.title + '</a>';
        list.appendChild(li);
      });
    }

    function onHashChange() {
      showCategory(location.hash.substring(1));
    }

    window.addEventListener('hashchange', onHashChange);
    onHashChange();
  })();
</script>
