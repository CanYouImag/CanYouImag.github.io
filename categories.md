---
layout: page
title: 分类
permalink: /categories/
---

<div class="categories-summary">
  {%- for category in site.categories -%}
  {%- assign cat_size = category[1] | size -%}
  <a href="#{{ category[0] | slugify }}" class="category-summary-item">
    <i class="fas fa-folder-open"></i> {{ category[0] }}
    <span class="category-summary-count">{{ cat_size }}</span>
  </a>
  {%- endfor -%}
</div>

<div class="categories-divider"></div>

<div class="categories-page">
  {%- for category in site.categories -%}
  <div class="category-group">
    <h3 id="{{ category[0] | slugify }}" class="category-title">
      <i class="fas fa-folder-open"></i> {{ category[0] }}
      <span class="post-count">({{ category[1] | size }})</span>
    </h3>
    <ul class="category-posts">
      {%- for post in category[1] -%}
      <li>
        <span class="post-meta">{{ post.date | date: "%Y-%m-%d" }}</span>
        <a class="post-link" href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
      </li>
      {%- endfor -%}
    </ul>
  </div>
  {%- endfor -%}
</div>
