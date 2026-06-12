---
layout: page
title: 工具
permalink: /tools/
---

<div class="tools-page">
  <p>以下是为道友准备的法器工具，点击进入即可使用：</p>

  <div class="tool-grid">
    {%- for tool in site.data.tools -%}
    <div class="tool-card">
      <div class="tool-card-icon">
        <i class="fas fa-{{ tool.icon }}"></i>
      </div>
      <h3>{{ tool.name }}</h3>
      <p>{{ tool.description }}</p>
      <a href="{{ tool.permalink }}" class="tool-btn">
        <i class="fas fa-arrow-right"></i> 进入工具
      </a>
    </div>
    {%- endfor -%}
  </div>
</div>
