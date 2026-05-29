---
layout: page
title: 工具
permalink: /tools/
---

<div class="tools-page">
  {%- for tool in site.data.tools -%}
  <div class="tool-card">
    <h3><i class="fas fa-{{ tool.icon }}"></i> {{ tool.name }}</h3>
    <p>{{ tool.description }}</p>
  </div>
  {%- endfor -%}
  <div class="tool-card">
    <h3><i class="fas fa-cloud-sun"></i> 天气查询</h3>
    <p>输入城市名称，查询当地实时天气</p>
    <div class="weather-widget">
      <div class="weather-input-group">
        <input type="text" id="weather-input" placeholder="如：北京市、上海市、London..." value="北京市">
        <button id="weather-btn"><i class="fas fa-search"></i> 查询</button>
      </div>
      <div id="weather-result">
        <div class="weather-placeholder">
          <i class="fas fa-map-marker-alt"></i>
          <span>输入城市即可查询天气</span>
        </div>
      </div>
    </div>
  </div>

  <div class="tool-card">
    <h3><i class="fas fa-chart-bar"></i> 编程语言排行榜</h3>
    <p>基于 GitHub 高星项目，实时统计编程语言热度排名</p>
    <div class="langrank-widget">
      <div class="langrank-toolbar">
        <button id="langrank-btn"><i class="fas fa-sync"></i> 刷新数据</button>
      </div>
      <div id="langrank-result">
        <div class="langrank-placeholder">
          <i class="fas fa-chart-simple"></i>
          <span>正在获取最新数据...</span>
        </div>
      </div>
    </div>
  </div>
</div>

<script src="/assets/weather.js"></script>
<script src="/assets/langrank.js"></script>
