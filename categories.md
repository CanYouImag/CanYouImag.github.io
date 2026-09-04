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
    <ul id="category-detail-list" class="post-list"></ul>
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
            date: {{ post.date | date: "%Y-%m-%d" | jsonify }},
            cover_image: {{ post.cover_image | jsonify }},
            tags: {{ post.tags | jsonify }}
          }{%- unless forloop.last -%},{%- endunless -%}
          {%- endfor -%}
        ]
      }{%- unless forloop.last -%},{%- endunless -%}
      {%- endfor -%}
    };

    function renderCard(post) {
      var tagsHtml = '';
      if (post.tags && post.tags.length > 0) {
        tagsHtml = '<div class="post-card-tags">';
        post.tags.forEach(function(tag) {
          tagsHtml += '<span class="tag-badge">' + tag + '</span>';
        });
        tagsHtml += '</div>';
      }
      var imageHtml = '';
      if (post.cover_image) {
        imageHtml = '<div class="post-card-image"><a href="' + post.url + '"><img src="' + post.cover_image + '" alt="' + post.title + '" loading="lazy"></a></div>';
      }
      return '<li><div class="post-card">' + imageHtml +
        '<div class="post-card-content">' +
        '<span class="post-meta">' + post.date + '</span>' +
        '<h3><a class="post-link" href="' + post.url + '">' + post.title + '</a></h3>' +
        tagsHtml +
        '</div></div></li>';
    }

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
        list.innerHTML += renderCard(post);
      });
    }

    function onHashChange() {
      showCategory(location.hash.substring(1));
    }

    window.addEventListener('hashchange', onHashChange);
    onHashChange();
  })();
</script>
