---
layout: page
title: 工具
permalink: /tools/
---

<div class="tools-page">
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
</div>

<script src="/assets/weather.js"></script>
