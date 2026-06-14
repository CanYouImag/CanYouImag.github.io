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
    <ul class="archive-list">
      {%- for post in year_group.items -%}
      <li>
        <span class="post-meta">{{ post.date | date: "%m-%d" }}</span>
        <a class="post-link" href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
      </li>
      {%- endfor -%}
    </ul>
  </div>
  {%- endfor -%}
</div>
