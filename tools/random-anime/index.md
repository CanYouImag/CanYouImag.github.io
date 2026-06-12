---
layout: tool
title: 随机二次元图片
nav_exclude: true
---

<div class="anime-image-widget">
  <div class="anime-image-toolbar">
    <select id="anime-category">
      <option value="random">随机</option>
      <option value="catgirl">Catgirl</option>
      <option value="foxgirl">Foxgirl</option>
      <option value="wolfgirl">Wolfgirl</option>
      <option value="cute">Cute</option>
      <option value="maid">Maid</option>
      <option value="vtuber">VTuber</option>
      <option value="wink">Wink</option>
      <option value="blonde">Blonde</option>
      <option value="blue-hair">蓝发</option>
      <option value="white-hair">白发</option>
      <option value="long-hair">长发</option>
      <option value="blue-eyes">蓝瞳</option>
      <option value="purple-eyes">紫瞳</option>
      <option value="heterochromia">异色瞳</option>
      <option value="ribbon">丝带</option>
      <option value="hoodie">连帽衫</option>
      <option value="uniform">制服</option>
      <option value="sailor-uniform">水手服</option>
      <option value="thigh-high-socks">过膝袜</option>
      <option value="white-tights">白丝</option>
      <option value="black-tights">黑丝</option>
      <option value="headphones">耳机</option>
      <option value="valentine">情人节</option>
      <option value="hands-forming-a-heart">比心</option>
      <option value="lying-down">躺姿</option>
      <option value="w-sitting">W坐</option>
    </select>
    <button id="anime-btn"><i class="fas fa-dice"></i> 随机来一张</button>
  </div>

  <div id="anime-result">
    <div class="anime-placeholder">
      <i class="fas fa-image"></i>
      <span>点击按钮获取随机二次元图片</span>
    </div>
  </div>

  <p class="anime-source">图片来自 <a href="https://nekosia.cat" target="_blank" rel="noopener">Nekosia API</a>，仅包含 SFW 内容</p>
</div>

<script src="/assets/random-anime.js"></script>
