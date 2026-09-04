---
layout: page
title: 归档
permalink: /archive/
nav_exclude: true
---

<div class="archive-page">
  {%- assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" -%}
  {%- for year_group in posts_by_year -%}
  <div class="archive-year">
    <h3 class="year-title">{{ year_group.name }}</h3>
    <ul class="post-list">
      {%- for post in year_group.items -%}
      <li>
        <div class="post-card">
          {%- if post.cover_image -%}
          <div class="post-card-image">
            <a href="{{ post.url | relative_url }}">
              <img src="{{ post.cover_image }}" alt="{{ post.title | escape }}" loading="lazy">
            </a>
          </div>
          {%- endif -%}
          <div class="post-card-content">
            <span class="post-meta">{{ post.date | date: "%m-%d" }}</span>
            <h3>
              <a class="post-link" href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
            </h3>
            {%- if post.tags.size > 0 -%}
            <div class="post-card-tags">
              {%- for tag in post.tags -%}
              <span class="tag-badge">{{ tag }}</span>
              {%- endfor -%}
            </div>
            {%- endif -%}
          </div>
        </div>
      </li>
      {%- endfor -%}
    </ul>
  </div>
  {%- endfor -%}
</div>
