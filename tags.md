---
layout: page
title: 标签
permalink: /tags/
---

<div class="tags-page">
  <p>所有标签，云游四方：</p>

  <div class="tag-cloud">
    {%- for tag in site.tags -%}
    {%- assign tag_size = tag[1] | size -%}
    {%- if tag_size >= 5 -%}
      {%- assign font_size = 1.4 -%}
    {%- elsif tag_size >= 3 -%}
      {%- assign font_size = 1.2 -%}
    {%- else -%}
      {%- assign font_size = 1.0 -%}
    {%- endif -%}
    <a href="#{{ tag[0] | slugify }}" class="tag-cloud-item" style="font-size: {{ font_size }}em;">
      {{ tag[0] }}<span class="tag-count">({{ tag_size }})</span>
    </a>
    {%- endfor -%}
  </div>

  {%- for tag in site.tags -%}
  <div class="tag-group">
    <h3 id="{{ tag[0] | slugify }}" class="tag-title">
      <i class="fas fa-tag"></i> {{ tag[0] }}
      <span class="post-count">({{ tag[1] | size }})</span>
    </h3>
    <ul class="tag-posts">
      {%- for post in tag[1] -%}
      <li>
        <span class="post-meta">{{ post.date | date: "%Y-%m-%d" }}</span>
        <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
      </li>
      {%- endfor -%}
    </ul>
  </div>
  {%- endfor -%}
</div>
