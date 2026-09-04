---
layout: page
title: 标签
permalink: /tags/
nav_exclude: true
---

<div id="tag-page">
  <div id="tag-grid" class="tag-grid">
    {%- for tag in site.tags -%}
    {%- assign tag_size = tag[1] | size -%}
    <a href="#{{ tag[0] | url_encode }}" class="tag-card">
      <div class="tag-card-icon">
        <i class="fas fa-tag"></i>
      </div>
      <h3>{{ tag[0] }}</h3>
      <p>{{ tag_size }} 篇文章</p>
    </a>
    {%- endfor -%}
  </div>

  <div id="tag-detail" class="tag-detail" style="display:none">
    <a href="/tags/" class="back-to-tools"><i class="fas fa-arrow-left"></i> 返回标签列表</a>
    <h2 id="tag-detail-title" class="tag-detail-title"></h2>
    <ul id="tag-detail-list" class="post-list"></ul>
  </div>
</div>

<script>
  (function() {
    var data = {
      {%- for tag in site.tags -%}
      "{{ tag[0] | url_encode }}": {
        name: {{ tag[0] | jsonify }},
        posts: [
          {%- for post in tag[1] -%}
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

    function showTag(key) {
      var grid = document.getElementById('tag-grid');
      var detail = document.getElementById('tag-detail');
      var entry = data[key];
      if (!key || !entry) {
        grid.style.display = '';
        detail.style.display = 'none';
        return;
      }
      grid.style.display = 'none';
      detail.style.display = '';
      document.getElementById('tag-detail-title').textContent = entry.name;
      var list = document.getElementById('tag-detail-list');
      list.innerHTML = '';
      entry.posts.forEach(function(post) {
        list.innerHTML += renderCard(post);
      });
    }

    function onHashChange() {
      showTag(location.hash.substring(1));
    }

    window.addEventListener('hashchange', onHashChange);
    onHashChange();
  })();
</script>
