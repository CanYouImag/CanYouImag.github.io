---
layout: tool
title: 天气查询
nav_exclude: true
---

<div class="weather-widget">
  <div class="weather-input-group">
    <input type="text" id="weather-input" placeholder="如：北京市、连云港市、New York..." value="北京市">
    <button id="weather-btn"><i class="fas fa-search"></i> 查询</button>
  </div>

  <p class="weather-hint">国内直接输入市名（“市”字可省略）；国外请用英文/当地名，或写成“城市, 国家代码”。</p>

  <details class="weather-help">
    <summary><i class="fas fa-circle-info"></i> 使用说明与示例</summary>
    <div class="weather-help-body">
      <p><strong>国内城市</strong>：直接输入市名即可，“市”字可加可不加。例如：<code>北京</code>、<code>北京市</code>、<code>连云港</code>、<code>乌鲁木齐</code>。</p>
      <ul>
        <li>输入<strong>省名</strong>会查询省会：<code>河北</code> → 石家庄，<code>吉林</code> → 长春。</li>
        <li>输入<strong>自治州 / 盟 / 地区</strong>会查询驻地：<code>延边</code> → 延吉，<code>伊犁</code> → 伊宁，<code>阿拉善</code> → 巴彦浩特。</li>
        <li><strong>同名消歧</strong>：<code>吉林市</code> → 吉林市，<code>吉林</code> → 长春；<code>海南</code> → 海口，<code>海南州</code> → 共和县。</li>
        <li>也可以输入“市 + 区/县”：<code>北京市朝阳区</code> 会按北京市查询。</li>
      </ul>
      <p><strong>国外城市</strong>：请使用英文或当地名称；中文译名只支持部分常见城市。</p>
      <ul>
        <li>推荐写法：<code>Tokyo</code>、<code>Paris</code>、<code>London, GB</code>、<code>New York City, US</code>。</li>
        <li>纽约请写 <code>New York City</code>（或中文 <code>纽约</code>）；只写 <code>New York</code> 会先匹配到其他同名小镇。</li>
        <li>中文别名已支持：纽约、东京、首尔、伦敦、巴黎、莫斯科、新加坡、洛杉矶、旧金山、多伦多、温哥华、悉尼、柏林、迪拜、曼谷等。</li>
        <li>“城市, 国家代码”中的国家代码用 ISO 两位字母：US、GB、JP、FR、DE、AU…</li>
      </ul>
      <p class="weather-help-note">单独的区/县/街道名（如“朝阳区”）不在本地映射内，会回退到在线地理编码，结果可能不如市级准确。</p>
    </div>
  </details>

  <div id="weather-result">
    <div class="weather-placeholder">
      <i class="fas fa-map-marker-alt"></i>
      <span>输入城市后点击查询，或按回车</span>
    </div>
  </div>
</div>

<script src="/assets/weather.js"></script>
