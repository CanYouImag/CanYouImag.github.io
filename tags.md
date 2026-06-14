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
    <ul id="tag-detail-list" class="tag-detail-list"></ul>
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
            date: {{ post.date | date: "%Y-%m-%d" | jsonify }}
          }{%- unless forloop.last -%},{%- endunless -%}
          {%- endfor -%}
        ]
      }{%- unless forloop.last -%},{%- endunless -%}
      {%- endfor -%}
    };

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
        var li = document.createElement('li');
        li.innerHTML = '<span class="post-meta">' + post.date + '</span><a class="post-link" href="' + post.url + '">' + post.title + '</a>';
        list.appendChild(li);
      });
    }

    function onHashChange() {
      showTag(location.hash.substring(1));
    }

    window.addEventListener('hashchange', onHashChange);
    onHashChange();
  })();
</script>
