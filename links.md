---
layout: page
title: 友情链接
permalink: /links/
---

<div class="links-page">
  <p>以下是与贫道交好的道友洞府，排名不分先后：</p>

  <div class="friend-links">
    {%- for link in site.data.links -%}
    <a class="friend-link" href="{{ link.url }}" target="_blank" rel="noopener">
      <img src="{{ link.avatar }}" alt="{{ link.name }}" class="friend-avatar">
      <span class="friend-info">
        <span class="friend-name">{{ link.name }}</span>
        <span class="friend-desc">{{ link.description }}</span>
      </span>
    </a>
    {%- endfor -%}
  </div>

  <div class="links-note">
    <p><i class="fas fa-handshake"></i> <strong>友链申请要求</strong></p>
    <ul class="links-requirements">
      <li>请贵站在本站添加友情链接后也添加本站为友情链接</li>
      <li>站点内容健康，无违法违规信息</li>
      <li>博客类、技术类、个人站点优先</li>
      <li>站点能正常访问，更新频率不限</li>
    </ul>
    <p>符合要求的话，请发送邮件至 <a href="mailto:{{ site.email }}">{{ site.email }}</a>，附上你的博客名称、链接和简介即可。</p>
  </div>
</div>
