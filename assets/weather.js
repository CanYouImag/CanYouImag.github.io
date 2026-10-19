(function() {
  var input = document.getElementById('weather-input');
  var btn = document.getElementById('weather-btn');
  var result = document.getElementById('weather-result');

  if (!input || !btn || !result) return;

  // 映射表与本脚本同目录（/assets/）
  var scriptEl = document.currentScript;
  var assetBase = (scriptEl && scriptEl.src) ? scriptEl.src.replace(/[^/]*$/, '') : '/assets/';

  // WMO 天气代码 → 描述 & 表情
  var codeMap = {
    0: { desc: '晴', emoji: '☀️' },
    1: { desc: '基本晴朗', emoji: '☀️' },
    2: { desc: '局部多云', emoji: '⛅' },
    3: { desc: '阴', emoji: '☁️' },
    45: { desc: '雾', emoji: '🌫️' },
    48: { desc: '雾凇', emoji: '🌫️' },
    51: { desc: '小毛毛雨', emoji: '🌦️' },
    53: { desc: '中等毛毛雨', emoji: '🌦️' },
    55: { desc: '大毛毛雨', emoji: '🌦️' },
    56: { desc: '冻毛毛雨', emoji: '🌦️' },
    57: { desc: '冻毛毛雨', emoji: '🌦️' },
    61: { desc: '小雨', emoji: '🌦️' },
    63: { desc: '中雨', emoji: '🌧️' },
    65: { desc: '大雨', emoji: '🌧️' },
    66: { desc: '冻雨', emoji: '🌧️' },
    67: { desc: '冻雨', emoji: '🌧️' },
    71: { desc: '小雪', emoji: '🌨️' },
    73: { desc: '中雪', emoji: '🌨️' },
    75: { desc: '大雪', emoji: '❄️' },
    77: { desc: '雪粒', emoji: '🌨️' },
    80: { desc: '小阵雨', emoji: '🌦️' },
    81: { desc: '中阵雨', emoji: '🌧️' },
    82: { desc: '强阵雨', emoji: '⛈️' },
    85: { desc: '小阵雪', emoji: '🌨️' },
    86: { desc: '大阵雪', emoji: '❄️' },
    95: { desc: '雷阵雨', emoji: '⛈️' },
    96: { desc: '雷阵雨伴小冰雹', emoji: '⛈️' },
    99: { desc: '雷阵雨伴大冰雹', emoji: '⛈️' }
  };

  var dirNames = ['北', '东北', '东', '东南', '南', '西南', '西', '西北'];

  function direction(deg) {
    return dirNames[Math.round(deg / 45) % 8];
  }

  function emojiFor(code, isDay) {
    var item = codeMap[code];
    if (!item) return '🌡️';
    if ((code === 0 || code === 1) && isDay === 0) return '🌙';
    return item.emoji;
  }

  // ---------- 国内地名映射 ----------
  // 结构：{ "北京": [lat, lon, "北京市", "北京市"], ... }
  var cityMap = null;
  var cityMapPromise = null;

  function loadCityMap() {
    if (cityMapPromise) return cityMapPromise;
    cityMapPromise = fetch(assetBase + 'china-weather-cities.json')
      .then(function(r) {
        if (!r.ok) throw new Error('map');
        return r.json();
      })
      .then(function(data) {
        cityMap = data || {};
        return cityMap;
      })
      .catch(function() {
        cityMap = {};
        return cityMap;
      });
    return cityMapPromise;
  }

  function cleanName(s) {
    return String(s).trim().replace(/[\s　]+/g, '');
  }

  function normalizeName(s) {
    return cleanName(s).replace(
      /(特别行政区|维吾尔自治区|壮族自治区|回族自治区|自治区|(?:[\u4e00-\u9fa5]{1,6}族)+自治州|自治州|地区|林区|盟|省|市)$/,
      ''
    );
  }

  function lookupLocal(raw) {
    if (!cityMap) return null;
    var key = cleanName(raw);
    var cands = [key, normalizeName(key)];

    // “北京市朝阳区”这类：退回到前面的市/州
    var m = key.match(/^(.+?(?:市|州|盟|地区|省))(.+?(?:区|县|镇|旗|街道))$/);
    if (m) cands.push(m[1]);

    for (var i = 0; i < cands.length; i++) {
      var k = cands[i];
      if (k && cityMap[k]) return cityMap[k];
    }
    return null;
  }

  // ---------- 国外城市别名（中文 → 英文/当地名 + 国家代码） ----------
  // 说明：地理编码索引以拉丁名为主，中文译名对很多城市无效，所以常用城市直接做别名。
  var foreignAliases = {
    '纽约': { q: 'New York City', c: 'US' },
    '东京': { q: 'Tokyo', c: 'JP' },
    '首尔': { q: 'Seoul', c: 'KR' },
    '伦敦': { q: 'London', c: 'GB' },
    '巴黎': { q: 'Paris', c: 'FR' },
    '莫斯科': { q: 'Moscow', c: 'RU' },
    '新加坡': { q: 'Singapore', c: 'SG' },
    '洛杉矶': { q: 'Los Angeles', c: 'US' },
    '旧金山': { q: 'San Francisco', c: 'US' },
    '华盛顿': { q: 'Washington', c: 'US' },
    '芝加哥': { q: 'Chicago', c: 'US' },
    '波士顿': { q: 'Boston', c: 'US' },
    '西雅图': { q: 'Seattle', c: 'US' },
    '多伦多': { q: 'Toronto', c: 'CA' },
    '温哥华': { q: 'Vancouver', c: 'CA' },
    '悉尼': { q: 'Sydney', c: 'AU' },
    '墨尔本': { q: 'Melbourne', c: 'AU' },
    '柏林': { q: 'Berlin', c: 'DE' },
    '罗马': { q: 'Rome', c: 'IT' },
    '马德里': { q: 'Madrid', c: 'ES' },
    '阿姆斯特丹': { q: 'Amsterdam', c: 'NL' },
    '迪拜': { q: 'Dubai', c: 'AE' },
    '曼谷': { q: 'Bangkok', c: 'TH' },
    '吉隆坡': { q: 'Kuala Lumpur', c: 'MY' },
    '新德里': { q: 'New Delhi', c: 'IN' },
    '开罗': { q: 'Cairo', c: 'EG' },
    '开普敦': { q: 'Cape Town', c: 'ZA' },
    '里约热内卢': { q: 'Rio de Janeiro', c: 'BR' },
    '圣保罗': { q: 'Sao Paulo', c: 'BR' },
    '布宜诺斯艾利斯': { q: 'Buenos Aires', c: 'AR' }
  };

  var countryCodes = {
    '中国': 'CN', '美国': 'US', '英国': 'GB', '日本': 'JP', '韩国': 'KR',
    '法国': 'FR', '德国': 'DE', '俄罗斯': 'RU', '加拿大': 'CA', '澳大利亚': 'AU',
    '新加坡': 'SG', '意大利': 'IT', '西班牙': 'ES', '泰国': 'TH', '马来西亚': 'MY',
    '印度': 'IN', '巴西': 'BR', '新西兰': 'NZ', '荷兰': 'NL', '瑞士': 'CH',
    '瑞典': 'SE', '挪威': 'NO', '丹麦': 'DK', '芬兰': 'FI', '波兰': 'PL',
    '土耳其': 'TR', '阿联酋': 'AE', '沙特阿拉伯': 'SA', '埃及': 'EG', '南非': 'ZA',
    '墨西哥': 'MX', '阿根廷': 'AR', '奥地利': 'AT', '比利时': 'BE', '葡萄牙': 'PT',
    '希腊': 'GR', '爱尔兰': 'IE', '以色列': 'IL', '印度尼西亚': 'ID', '菲律宾': 'PH',
    '越南': 'VN', '乌克兰': 'UA', '捷克': 'CZ', '匈牙利': 'HU'
  };

  function splitQuery(raw) {
    var parts = raw.split(/[,，]/);
    if (parts.length >= 2) {
      var name = parts[0].trim();
      var c = parts.slice(1).join('').trim();
      var code = countryCodes[c] || (/^[A-Za-z]{2}$/.test(c) ? c.toUpperCase() : '');
      return { name: name, code: code };
    }
    return { name: raw.trim(), code: '' };
  }

  function geocode(q) {
    var url = 'https://geocoding-api.open-meteo.com/v1/search?name=' +
      encodeURIComponent(q.name) + '&count=10&language=zh&format=json';
    if (q.code) url += '&countryCode=' + encodeURIComponent(q.code);

    return fetch(url)
      .then(function(r) {
        if (!r.ok) throw new Error('geo');
        return r.json();
      })
      .then(function(j) {
        var list = (j.results || []).slice();
        var qn = q.name.toLowerCase();
        // 同名优先，其次人口多的（避免“上海市”落到某个同名社区）
        list.sort(function(a, b) {
          var an = String(a.name || '').toLowerCase();
          var bn = String(b.name || '').toLowerCase();
          var ae = an === qn ? 1 : 0;
          var be = bn === qn ? 1 : 0;
          if (ae !== be) return be - ae;
          return (b.population || 0) - (a.population || 0);
        });
        return list;
      });
  }

  function geocodeSmart(raw) {
    var key = cleanName(raw);

    if (/^(new york|nyc)$/i.test(key)) {
      return geocode({ name: 'New York City', code: 'US' }).then(function(l) { return l[0] || null; });
    }
    if (/^washington(\.? ?d\.?c\.?)?$/i.test(key)) {
      return geocode({ name: 'Washington', code: 'US' }).then(function(l) { return l[0] || null; });
    }

    var alias = foreignAliases[key];
    var q = alias ? { name: alias.q, code: alias.c } : splitQuery(raw);
    var cjk = /[\u4e00-\u9fff]/.test(q.name);
    var cnFirst = !q.code && cjk;

    function attempt(query) {
      return geocode(query).then(function(list) { return list[0] || null; });
    }

    return attempt(cnFirst ? { name: q.name, code: 'CN' } : q).then(function(hit) {
      if (hit) return hit;
      // 中文名先按中国查，查不到再全球查
      var next = cnFirst ? attempt(q) : Promise.resolve(null);
      return next.then(function(hit2) {
        if (hit2) return hit2;
        var norm = normalizeName(q.name);
        if (norm && norm !== q.name) return attempt({ name: norm, code: q.code });
        return null;
      });
    });
  }

  // ---------- 页面 ----------
  function render(loc, data) {
    var c = data.current;
    var name = loc.name;
    var region = loc.admin1 || loc.admin2 || '';
    var country = loc.country || '';
    var code = c.weather_code;
    var desc = (codeMap[code] || {}).desc || '未知';
    var emoji = emojiFor(code, c.is_day);

    var regionText = region && region !== name ? region + ', ' : '';
    if (!regionText && !country) regionText = '';

    result.innerHTML =
      '<div class="weather-card">' +
        '<div class="weather-header">' +
          '<div class="weather-location">' +
            '<strong>' + name + '</strong>' +
            '<span class="weather-region">' + regionText + country + '</span>' +
          '</div>' +
          '<div class="weather-temp">' +
            '<span class="weather-emoji">' + emoji + '</span>' +
            '<span class="weather-temp-value">' + c.temperature_2m + '°C</span>' +
          '</div>' +
        '</div>' +
        '<div class="weather-desc">' + desc + '</div>' +
        '<div class="weather-details">' +
          '<div class="weather-detail-item"><span class="detail-label">体感温度</span><span>' + c.apparent_temperature + '°C</span></div>' +
          '<div class="weather-detail-item"><span class="detail-label">湿度</span><span>' + c.relative_humidity_2m + '%</span></div>' +
          '<div class="weather-detail-item"><span class="detail-label">风速</span><span>' + c.wind_speed_10m + ' km/h ' + direction(c.wind_direction_10m) + '</span></div>' +
          '<div class="weather-detail-item"><span class="detail-label">气压</span><span>' + c.surface_pressure + ' hPa</span></div>' +
          '<div class="weather-detail-item"><span class="detail-label">能见度</span><span>' + (c.visibility / 1000).toFixed(1) + ' km</span></div>' +
          '<div class="weather-detail-item"><span class="detail-label">紫外线</span><span>' + c.uv_index + '</span></div>' +
        '</div>' +
      '</div>';
  }

  function showNotFound() {
    result.innerHTML = '<div class="weather-error"><i class="fas fa-map-marker-alt"></i> 未找到该城市。' +
      '国内可直接输入市名（如“北京市”“连云港市”）；' +
      '国外请用英文/当地名称（如“New York”“Tokyo”），或写成“城市, 国家代码”。</div>';
  }

  function fetchWeather(loc) {
    return fetch('https://api.open-meteo.com/v1/forecast?latitude=' + loc.latitude +
      '&longitude=' + loc.longitude +
      '&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,visibility,uv_index,is_day&timezone=auto')
      .then(function(r) {
        if (!r.ok) throw new Error('weather');
        return r.json();
      });
  }

  function getWeather() {
    var raw = input.value.trim();
    if (!raw) {
      result.innerHTML = '<div class="weather-error">请输入城市名</div>';
      return;
    }

    result.innerHTML = '<div class="weather-loading"><i class="fas fa-spinner fa-spin"></i> 查询中...</div>';

    loadCityMap()
      .then(function() {
        var local = lookupLocal(raw);
        if (local) {
          return {
            latitude: local[0],
            longitude: local[1],
            name: local[2],
            admin1: local[3],
            country: '中国'
          };
        }
        return geocodeSmart(raw);
      })
      .then(function(loc) {
        if (!loc) {
          showNotFound();
          return;
        }
        return fetchWeather(loc).then(function(data) {
          render(loc, data);
        });
      })
      .catch(function() {
        result.innerHTML = '<div class="weather-error"><i class="fas fa-exclamation-triangle"></i> 查询失败，请稍后再试或检查城市名是否正确</div>';
      });
  }

  btn.addEventListener('click', getWeather);
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') getWeather();
  });

  // 默认加载北京天气
  getWeather();
})();
